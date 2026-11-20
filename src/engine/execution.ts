import { getAbilityTiming } from '../data/abilityTiming';
import { getAbilityTraits } from '../data/abilityTraits';
import type { CounterActionGroup, CounterActionVerb, DeadlockAbility, Language } from '../types/deadlock';
import { getAbilityDisplayName } from '../utils/abilities';

/**
 * How likely you are to actually land an item's answer to an ability in a fight. An item that
 * only works with a perfect read is worth less than one that works on reaction, so the score of
 * that item against that enemy is multiplied by this factor (1 = easy, ~0.35 = rarely works).
 *
 * Wiki facts this is built on:
 * - Unstoppable and Dispel Magic "cannot be used while Stunned or Slept"; a stun, sleep, petrify
 *   or hex takes away all actions, so every self-cast item has to be used before it lands.
 *   Silence, disarm, roots, slows and chains do not block items.
 * - Knockdown stuns 2s after the cast; Cursed Relic's projectile needs ~0.6s at max range.
 * - Counterspell / Rebuttal only work if the parry is timed onto the hit.
 */

/** Items you cast on yourself: useless once a stun / sleep has already landed */
const SELF_CAST = new Set([
  'upgrade_unstoppable',
  'upgrade_self_bubble', // Ethereal Shift
  'upgrade_reduce_debuff_duration', // Dispel Magic
  'upgrade_divine_barrier',
  'upgrade_guardian_ward',
  'upgrade_grit',
  'upgrade_metal_skin',
  'upgrade_colossus',
  'upgrade_warp_stone',
  'upgrade_fleetfoot_boots',
  'upgrade_health_stimpak', // Healing Rite
  'upgrade_return_fire',
  'upgrade_restorative_locket',
]);

/** Parry items: the parry has to be timed onto the hit */
const PARRY = new Set(['upgrade_counterspell', 'upgrade_melee_rebuttal']);

/** Seconds from casting the item until its interrupt lands on the channeling enemy */
const CANCEL_DELAY: Record<string, number> = {
  upgrade_glitch: 0.6, // Cursed Relic: ~33 m/s projectile
  upgrade_target_stun: 2, // Knockdown: stun after 2s
};

/** Reaction time to notice the cast and press the item */
const REACTION = 0.5;

const LOCKOUT = ['stun', 'sleep', 'petrify', 'hex'] as const;

export type ExecutionIssue = 'guess' | 'tight' | 'parry' | 'tightCancel' | 'lateCancel';

export interface ExecutionCheck {
  factor: number;
  issue?: ExecutionIssue;
  /** Seconds of reaction window (warn or channel) behind the issue */
  window?: number;
}

export function executionCheck(
  itemClassName: string,
  verb: CounterActionVerb,
  ability: DeadlockAbility,
  heroClass: string,
): ExecutionCheck {
  const traits = getAbilityTraits(heroClass, ability.slot);
  if (!traits) return { factor: 1 };
  const timing = getAbilityTiming(heroClass, ability.slot);

  if (verb === 'cancels' && CANCEL_DELAY[itemClassName] !== undefined) {
    const channel = timing?.channel ?? (traits.has('channel') ? 1.5 : 0);
    const margin = channel - CANCEL_DELAY[itemClassName] - REACTION;
    if (margin >= 1) return { factor: 1 };
    if (margin >= 0.3) return { factor: 0.8, issue: 'tightCancel', window: channel };
    if (margin >= 0) return { factor: 0.6, issue: 'tightCancel', window: channel };
    return { factor: 0.35, issue: 'lateCancel', window: channel };
  }

  const warn = timing?.warn ?? (traits.has('delayed') ? 1.5 : 0.3);

  if (PARRY.has(itemClassName)) {
    return warn >= 1.5 ? { factor: 0.9 } : { factor: 0.7, issue: 'parry' };
  }

  if (SELF_CAST.has(itemClassName) && LOCKOUT.some((t) => traits.has(t))) {
    if (warn >= 1.5) return { factor: 1 };
    if (warn >= 0.8) return { factor: 0.85, issue: 'tight', window: warn };
    if (warn >= 0.3) return { factor: 0.65, issue: 'guess', window: warn };
    return { factor: 0.5, issue: 'guess', window: warn };
  }

  return { factor: 1 };
}

export interface CardExecution extends ExecutionCheck {
  ability?: DeadlockAbility;
}

/**
 * The item is as good as its easiest answer on the card: the best factor over all named
 * abilities. Cards that name no ability (only mechanics) are not penalised.
 */
export function cardExecution(
  itemClassName: string,
  groups: CounterActionGroup[],
): CardExecution {
  let best: CardExecution | null = null;
  for (const g of groups) {
    for (const t of g.targets) {
      if (t.kind !== 'ability') continue;
      const check = executionCheck(itemClassName, g.verb, t.ability, t.heroClass);
      if (!best || check.factor > best.factor) best = { ...check, ability: t.ability };
    }
  }
  return best ?? { factor: 1 };
}

const fmt = (n: number, lang: Language) =>
  lang === 'de' ? String(Math.round(n * 10) / 10).replace('.', ',') : String(Math.round(n * 10) / 10);

/** One honest sentence for the card when the item is hard to land */
export function executionNote(
  exec: CardExecution,
  itemClassName: string,
  lang: Language,
  itemLang: Language,
): string | null {
  if (!exec.issue || !exec.ability || exec.factor >= 0.85) return null;
  const name = getAbilityDisplayName(exec.ability, itemLang);
  const w = exec.window ?? 0;
  switch (exec.issue) {
    case 'guess':
      return lang === 'de'
        ? `Schwer zu treffen: ${name} nimmt dir ${w >= 0.3 ? 'fast ' : ''}sofort die Kontrolle. Du musst vorher zünden, betäubt geht es nicht mehr.`
        : `Hard to land: ${name} takes control away ${w >= 0.3 ? 'almost ' : ''}instantly. Use it beforehand, it can't be used while stunned.`;
    case 'tight':
      return lang === 'de'
        ? `Knappes Fenster: Gegen ${name} bleiben dir nur etwa ${fmt(w, lang)} s.`
        : `Tight window: against ${name} you only get about ${fmt(w, lang)}s.`;
    case 'parry':
      return lang === 'de'
        ? `Braucht genaues Timing: Die Parade muss genau beim Treffer von ${name} kommen.`
        : `Needs exact timing: the parry has to land right as ${name} hits.`;
    case 'tightCancel':
      return lang === 'de'
        ? `Knappes Fenster: ${name} kanalisiert nur ${fmt(w, lang)} s, ${itemClassName === 'upgrade_target_stun' ? 'Knockdown betäubt erst nach 2 s' : 'das Geschoss braucht bis zu 0,6 s'}. Sofort einsetzen.`
        : `Tight window: ${name} only channels for ${fmt(w, lang)}s and ${itemClassName === 'upgrade_target_stun' ? 'Knockdown stuns after 2s' : 'the projectile needs up to 0.6s'}. Use it instantly.`;
    case 'lateCancel':
      return itemClassName === 'upgrade_target_stun'
        ? lang === 'de'
          ? `Selbst sofort geworfen kommt es meist zu spät: Knockdown betäubt erst nach 2 s, ${name} kanalisiert nur ${fmt(w, lang)} s.`
          : `Even thrown instantly it is usually too late: Knockdown stuns after 2s, ${name} only channels for ${fmt(w, lang)}s.`
        : lang === 'de'
          ? `Kommt meist zu spät: ${name} kanalisiert nur ${fmt(w, lang)} s.`
          : `Usually too late: ${name} only channels for ${fmt(w, lang)}s.`;
  }
  return null;
}
