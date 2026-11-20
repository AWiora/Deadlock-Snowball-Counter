import { COUNTER_ITEM_RULES, HERO_SPECIFIC_COUNTERS } from '../data/counterItems';
import {
  getItemDamageFocus,
  HERO_ABILITY_TAGS,
  HERO_OVERRIDE_STRUCTURED,
  ITEM_ACTION_PROFILES,
} from '../data/heroAbilityTags';
import { getHeroProfile } from '../data/heroProfiles';
import { getAbilityTraits, type AbilityTrait } from '../data/abilityTraits';
import { KIT_AMPLIFIER_RULES } from '../data/kitAmplifiers';
import {
  HERO_HEADLINES_DE,
  HERO_OVERRIDE_TIPS_DE,
  ITEM_CONTEXT_TIPS_DE,
  ITEM_COPY_DE,
} from '../i18n/contentDe';
import { getHeroDisplayName, getItemDisplayName, UI_TEXT } from '../i18n/translations';
import {
  getAbilityDisplayName,
  localizeAbilityMentions,
  resolveHeroAbility,
} from '../utils/abilities';
import type {
  CounterActionGroup,
  CounterActionVerb,
  CounterItemRule,
  CounterRecommendation,
  CounterRole,
  CounterStance,
  CounterTargetChip,
  DamageProfile,
  DeadlockAbility,
  DeadlockHero,
  DeadlockItem,
  EnemyCounterReason,
  EnemyModifier,
  EnemyTargetConfig,
  HeroKitCounter,
  KitAmplifierMeta,
  Language,
  MatchupInput,
  PlayerAffinity,
  RecommendationResult,
  ThreatMechanic,
  UpgradeHint,
} from '../types/deadlock';
import {
  abilityFitsCounter,
  damageChipAllowed,
  modifierChipAllowed,
  threatChipAllowed,
  verbNamesAbilities,
} from './abilityFit';

export function getBaseKitTags(heroClassName: string, lang: Language = 'de'): string[] {
  const profile = getHeroProfile(heroClassName);
  const dict = UI_TEXT[lang].threats;
  return profile.threats.slice(0, 4).map((t) => dict[t]);
}

/**
 * Linear upgrade lineages verified against the live Deadlock Curiosity Shop:
 * if both a component and its direct upgrade score well in the same tier ("all"),
 * keep only the higher-scoring one so the top picks aren't redundant, and expose the build path hint.
 */
const UPGRADE_FAMILIES: string[][] = [
  ['upgrade_withering_whip', 'upgrade_greater_withering_whip'], // Rusted Barrel -> Disarming Hex
  ['upgrade_debuff_reducer', 'upgrade_unstoppable'], // Debuff Reducer -> Unstoppable
  ['upgrade_guardian_ward', 'upgrade_divine_barrier'], // Guardian Ward -> Divine Barrier
  ['upgrade_health_stimpak', 'upgrade_rescue_beam'], // Healing Rite -> Rescue Beam
  ['upgrade_vex_barrier', 'upgrade_auto_cleanse'], // Reactive Barrier -> Indomitable
  ['upgrade_cardio_calibrator', 'upgrade_juggernaut'], // Enduring Speed -> Juggernaut
  ['upgrade_containment', 'upgrade_aoe_root'], // Slowing Hex -> Vortex Web
  ['upgrade_spirit_sap', 'upgrade_focus_lens'], // Spirit Sap -> Focus Lens
  ['upgrade_magic_vulnerability', 'upgrade_escalating_exposure'], // Mystic Vulnerability -> Escalating Exposure
  ['upgrade_headshot_booster', 'upgrade_headhunter'], // Headshot Booster -> Headhunter
  ['upgrade_headshot_booster2', 'upgrade_banshee_slugs'], // Weakening Headshot -> Crippling Headshot
  ['upgrade_magic_burst', 'upgrade_magic_shock'], // Mystic Burst -> Tankbuster
  ['upgrade_cold_front', 'upgrade_arctic_blast'], // Cold Front -> Arctic Blast
  ['upgrade_magic_tempo', 'upgrade_cooldown_reduction', 'upgrade_transcendent_cooldown'], // Compress -> Superior -> Transcendent Cooldown
  ['upgrade_magic_reach', 'upgrade_tech_range'], // Mystic Expansion -> Greater Expansion
  ['upgrade_arcane_extension', 'upgrade_imbued_duration_extender'], // Duration Extender -> Superior Duration
  ['upgrade_extra_charge', 'upgrade_rapid_recharge'], // Extra Charge -> Rapid Recharge
];

/**
 * Branching component origins for items whose base component upgrades into multiple distinct counters
 * (e.g. Grit -> Weapon/Spirit Shielding/Reactive Barrier/Guardian Ward, Debuff Reducer -> Spellbreaker/Unstoppable).
 * Exposes the "Builds from" hint without falsely deduplicating sibling branches against each other.
 */
const BRANCH_COMPONENT_FROM: Record<string, string> = {
  upgrade_weapon_shielding: 'upgrade_grit',
  upgrade_spirit_bubble: 'upgrade_grit',
  upgrade_vex_barrier: 'upgrade_grit',
  upgrade_guardian_ward: 'upgrade_grit',
  upgrade_spellbreaker: 'upgrade_debuff_reducer',
};

const UPGRADE_FAMILY_MAP = new Map<string, number>();
UPGRADE_FAMILIES.forEach((family, idx) => {
  family.forEach((className) => UPGRADE_FAMILY_MAP.set(className, idx));
});

function resolveUpgradeHint(
  className: string,
  itemsByClass: Map<string, DeadlockItem>,
  lang: Language,
): UpgradeHint | null {
  const familyId = UPGRADE_FAMILY_MAP.get(className);
  if (familyId !== undefined) {
    const family = UPGRADE_FAMILIES[familyId];
    const idx = family.indexOf(className);
    if (idx === 0 && family[1]) {
      const target = itemsByClass.get(family[1]);
      if (!target) return null;
      return {
        direction: 'to',
        itemClassName: target.className,
        itemName: getItemDisplayName(target, lang),
        cost: target.cost,
        icon: target.icon,
      };
    }
    if (idx > 0 && family[idx - 1]) {
      const base = itemsByClass.get(family[idx - 1]);
      if (!base) return null;
      return {
        direction: 'from',
        itemClassName: base.className,
        itemName: getItemDisplayName(base, lang),
        cost: base.cost,
        icon: base.icon,
      };
    }
  }

  const branchBaseClass = BRANCH_COMPONENT_FROM[className];
  if (branchBaseClass) {
    const base = itemsByClass.get(branchBaseClass);
    if (!base) return null;
    return {
      direction: 'from',
      itemClassName: base.className,
      itemName: getItemDisplayName(base, lang),
      cost: base.cost,
      icon: base.icon,
    };
  }
  return null;
}

const BULLET_ONLY_ITEMS = new Set([
  'upgrade_withering_whip',
  'upgrade_greater_withering_whip',
  'upgrade_weapon_shielding',
  'upgrade_return_fire',
  'upgrade_metal_skin',
  'upgrade_improved_bullet_armor',
  'upgrade_deflecting_armor',
  'upgrade_reinforcing_casings',
  'upgrade_suppressor',
]);

const SPIRIT_ONLY_ITEMS = new Set([
  'upgrade_spirit_bubble',
  'upgrade_spirit_sap',
  'upgrade_tech_purge',
  'upgrade_spellbreaker',
  'upgrade_absorbing_armor',
]);

/** Diminishing weights for matched threat mechanics so surgical counters beat multi-tag generalists */
const THREAT_DIMINISHING_WEIGHTS = [1.0, 0.72, 0.5, 0.35, 0.25];
const SECONDARY_THREAT_SCALE = 0.45;
const THIRD_SLOT_MIN_RATIO = 0.6;

function computePlayerSynergy(
  rule: CounterItemRule,
  affinity: PlayerAffinity | null,
  myHeroClass: string | null,
  myHeroName: string | null,
  lang: Language,
): { delta: number; multiplier: number; note: string | null } {
  if (!affinity || !rule.playerSynergy) {
    return { delta: 0, multiplier: 1, note: null };
  }

  const syn = rule.playerSynergy;
  const s = UI_TEXT[lang].synergy;
  let delta = 0;
  let multiplier = 1;
  let note: string | null = null;
  const heroLabel = myHeroName ?? (lang === 'de' ? 'deinem Helden' : 'your hero');

  if (syn.preferDamageStyle === 'gun') {
    if (affinity.damageStyle === 'gun') {
      delta += 14;
      note = s.gun(heroLabel);
    } else if (affinity.damageStyle === 'hybrid') {
      delta += 6;
    } else {
      delta -= 12;
      multiplier *= 0.72;
    }
  }

  if (syn.preferDamageStyle === 'spirit') {
    if (affinity.damageStyle === 'spirit') {
      delta += 14;
      note = s.spirit(heroLabel);
    } else if (affinity.damageStyle === 'hybrid') {
      delta += 6;
    } else {
      delta -= 12;
      multiplier *= 0.72;
    }
  }

  if (syn.preferFastFirerate && affinity.fastFirerate) {
    delta += 10;
    if (!note) note = s.firerate(heroLabel);
  }
  if (syn.penalizeSlowFirerate && !affinity.fastFirerate) {
    delta -= 18;
    multiplier *= 0.42;
  }

  if (syn.preferSpiritProccer && affinity.spiritProccer) {
    delta += 10;
    if (!note) note = s.spiritProccer(heroLabel);
  }
  if (syn.penalizeNonSpiritProccer && !affinity.spiritProccer) {
    delta -= 22;
    multiplier *= 0.32;
  }

  if (syn.preferRange && affinity.range === syn.preferRange) {
    delta += 8;
    if (!note && syn.preferRange === 'close') {
      note = s.closeRange(heroLabel);
    } else if (!note && syn.preferRange === 'long') {
      note = s.longRange(heroLabel);
    }
  }

  if (syn.penalizeLongRange && affinity.range === 'long') {
    delta -= 18;
    multiplier *= 0.55;
  }

  if (syn.preferSupportive && affinity.supportive) {
    delta += 10;
    if (!note) note = s.supportive(heroLabel);
  }

  // Built-in kit redundancy awareness (e.g. Pocket Satchel / Viscous Cube vs Ethereal Shift)
  if (syn.redundantWithTool && affinity.builtInTools?.includes(syn.redundantWithTool)) {
    delta -= 10;
    multiplier *= 0.84;
  }

  // Explicit kit anti-synergy (e.g. Lady Geist Soul Exchange vs Return Fire)
  if (myHeroClass && syn.avoidHeroClasses?.includes(myHeroClass)) {
    delta -= 22;
    multiplier *= 0.55;
  }

  return { delta, multiplier, note };
}

function getModifierMatchCount(rule: CounterItemRule, modifiers: EnemyModifier[]): number {
  if (!rule.modifierCounters) return 0;
  let total = 0;
  for (const mod of modifiers) {
    total += rule.modifierCounters[mod] ?? 0;
  }
  return total;
}

function scoreThreatMechanics(
  rule: CounterItemRule,
  primaryThreats: ThreatMechanic[],
  secondaryThreats: ThreatMechanic[],
  isOffMetaSpirit: boolean,
  isOffMetaBullet: boolean,
): number {
  if (!rule.threatCounters) return 0;

  const contributions: number[] = [];
  const seen = new Set<ThreatMechanic>();

  const collect = (threats: ThreatMechanic[], tierScale: number) => {
    for (const threat of threats) {
      if (seen.has(threat)) continue;
      seen.add(threat);
      let weight = (rule.threatCounters?.[threat] ?? 0) * tierScale;
      if (!weight) continue;

      if (
        isOffMetaSpirit &&
        (threat === 'rapid_fire' || threat === 'bullet_ult' || threat === 'on_hit_procs')
      ) {
        weight *= 0.35;
      }
      if (
        isOffMetaBullet &&
        (threat === 'sustained_spirit' || threat === 'ability_spam')
      ) {
        weight *= 0.45;
      }

      contributions.push(weight);
    }
  };

  collect(primaryThreats, 1.0);
  collect(secondaryThreats, SECONDARY_THREAT_SCALE);

  if (contributions.length === 0) return 0;

  contributions.sort((a, b) => b - a);
  let total = 0;
  for (let i = 0; i < contributions.length; i++) {
    const dim = THREAT_DIMINISHING_WEIGHTS[i] ?? 0.2;
    total += contributions[i] * dim;
  }
  return total;
}

function resolveContextTip(
  rule: CounterItemRule,
  modifiers: EnemyModifier[],
  lang: Language,
): string | null {
  const deTips = lang === 'de' ? ITEM_CONTEXT_TIPS_DE[rule.className] : undefined;
  const enTips = rule.contextTips;
  if (!deTips && !enTips) return null;

  let bestMod: EnemyModifier | null = null;
  let bestWeight = -1;
  for (const mod of modifiers) {
    const tip = lang === 'de' ? deTips?.[mod] : enTips?.[mod];
    if (!tip) continue;
    const w = rule.modifierCounters?.[mod] ?? 0;
    if (w > bestWeight) {
      bestWeight = w;
      bestMod = mod;
    }
  }

  if (bestMod) {
    return (lang === 'de' ? deTips?.[bestMod] : enTips?.[bestMod]) ?? null;
  }
  return null;
}

function collectMatchedTriggers(
  rule: CounterItemRule,
  target: EnemyTargetConfig,
  primaryThreats: ThreatMechanic[],
  secondaryThreats: ThreatMechanic[],
  isOffMetaSpirit: boolean,
  isOffMetaBullet: boolean,
  lang: Language,
): string[] {
  const t = UI_TEXT[lang];
  const scoredTriggers: { label: string; weight: number }[] = [];

  // 1. Active user modifiers (strongest signal)
  if (rule.modifierCounters) {
    for (const mod of target.modifiers) {
      const w = rule.modifierCounters[mod] ?? 0;
      if (w >= 10) {
        scoredTriggers.push({ label: t.modifiers[mod].label, weight: w * 2.2 });
      }
    }
  }

  // 2. Matched damage profile
  if (rule.damageCounters) {
    const dmgW = rule.damageCounters[target.damageProfile] ?? 0;
    if (dmgW >= 16) {
      scoredTriggers.push({
        label: t.damageReasonLabel[target.damageProfile],
        weight: dmgW * 1.05,
      });
    }
  }

  // 3. Matched intrinsic threats
  if (rule.threatCounters) {
    const seen = new Set<ThreatMechanic>();
    const addThreats = (list: ThreatMechanic[], scale: number) => {
      for (const threat of list) {
        if (seen.has(threat)) continue;
        seen.add(threat);
        let w = (rule.threatCounters?.[threat] ?? 0) * scale;
        if (
          isOffMetaSpirit &&
          (threat === 'rapid_fire' || threat === 'bullet_ult' || threat === 'on_hit_procs')
        ) {
          w *= 0.35;
        }
        if (
          isOffMetaBullet &&
          (threat === 'sustained_spirit' || threat === 'ability_spam')
        ) {
          w *= 0.45;
        }
        if (w >= 12) {
          scoredTriggers.push({ label: t.threats[threat], weight: w });
        }
      }
    };
    addThreats(primaryThreats, 1.0);
    addThreats(secondaryThreats, SECONDARY_THREAT_SCALE);
  }

  scoredTriggers.sort((a, b) => b.weight - a.weight);
  const uniqueLabels: string[] = [];
  for (const item of scoredTriggers) {
    if (!uniqueLabels.includes(item.label)) {
      uniqueLabels.push(item.label);
    }
    if (uniqueLabels.length >= 2) break;
  }
  return uniqueLabels;
}

function pushChipToGroup(
  groups: CounterActionGroup[],
  verb: CounterActionVerb,
  verbLabel: string,
  chip: CounterTargetChip,
): void {
  let group = groups.find((g) => g.verb === verb);
  if (!group) {
    group = { verb, verbLabel, targets: [] };
    groups.push(group);
  }
  const alreadyPresent = group.targets.some((existing) => {
    if (existing.kind !== chip.kind) return false;
    if (existing.kind === 'ability' && chip.kind === 'ability') {
      return (
        existing.ability.className === chip.ability.className &&
        existing.heroClass === chip.heroClass
      );
    }
    if (existing.kind === 'mechanic' && chip.kind === 'mechanic') {
      return existing.label === chip.label;
    }
    return false;
  });
  if (!alreadyPresent) {
    group.targets.push(chip);
  }
}

/**
 * Does an item that only works against one damage type (Metal Skin: bullets) actually help
 * against this ability? Uses the game data; without data (old cache) the ability passes.
 * Kept for callers that only know the damage focus; the engine uses abilityFitsCounter.
 */
export function abilityFitsDamageFocus(
  ability: DeadlockAbility,
  focus: 'weapon' | 'spirit' | undefined,
): boolean {
  if (!focus || !ability.damage) return true;
  if (focus === 'weapon' && ability.empowersWeapon) return true;
  return ability.damage.some((d) => d.type === focus);
}

/** Can this item, with this verb, honestly be shown against this enemy ability? */
export function itemFitsAbility(
  itemClassName: string,
  verb: CounterActionVerb,
  ability: DeadlockAbility,
  heroClass: string,
): boolean {
  return abilityFitsCounter(ability, heroClass, verb, {
    fits: ITEM_ACTION_PROFILES[itemClassName]?.fits,
    focus: getItemDamageFocus(itemClassName),
  });
}

function resolveEnemyActionGroups(
  rule: CounterItemRule,
  target: EnemyTargetConfig,
  enemyHero: DeadlockHero | undefined,
  primaryThreats: ThreatMechanic[],
  secondaryThreats: ThreatMechanic[],
  isOffMetaSpirit: boolean,
  isOffMetaBullet: boolean,
  isHeroSpecific: boolean,
  lang: Language,
): CounterActionGroup[] {
  const t = UI_TEXT[lang];
  const profile = ITEM_ACTION_PROFILES[rule.className];
  const defaultVerb: CounterActionVerb = profile?.defaultVerb ?? 'counters';
  const abilityBySlot = new Map<number, DeadlockAbility>(
    (enemyHero?.abilities ?? []).map((ab) => [ab.slot, ab]),
  );
  const heroTags = HERO_ABILITY_TAGS[target.heroClass] ?? [];
  const tagBySlot = new Map(heroTags.map((tag) => [tag.slot, tag]));
  const damageFocus = getItemDamageFocus(rule.className);
  // Only abilities the item really works on (game data + ABILITY_TRAITS), e.g. no Metal Skin vs
  // a spirit ult, no barrier vs an ability without damage, no slow vs a passive
  const abilityFits = (ab: DeadlockAbility, verb: CounterActionVerb) =>
    itemFitsAbility(rule.className, verb, ab, target.heroClass);
  // "Weapon-Schaden" / "Spirit-Schaden" as a target, labelled by the item's focus if it has one
  const damageChip = (verb: CounterActionVerb, damage: DamageProfile): CounterTargetChip | null => {
    if (profile?.damageChip === false) return null;
    const shown: DamageProfile = damageFocus === 'weapon' ? 'bullet' : damageFocus === 'spirit' ? 'spirit' : damage;
    if (!damageChipAllowed(verb, shown)) return null;
    const label =
      shown === 'bullet'
        ? t.mechanicFallbacks.bullet_dps
        : shown === 'spirit'
          ? t.mechanicFallbacks.spirit_dps
          : t.damageReasonLabel.equal;
    return { kind: 'mechanic', label, tone: 'damage', damageType: shown };
  };

  // A threat label ("Stuns & Roots") is only a reason if at least one ability of this enemy with
  // that threat is one the item works on (no "escapes Stuns & Roots" vs a point-and-click stun)
  const threatTrueForHero = (verb: CounterActionVerb, threat: ThreatMechanic): boolean => {
    if (!verbNamesAbilities(verb)) return true;
    const tagged = heroTags.filter((tag) => tag.threats.includes(threat));
    if (tagged.length === 0) return true;
    // The damage focus doesn't matter here: "Bestraft: Springt dich an" is about where the
    // enemy ends up, not about the damage type of the dive
    return tagged.some((tag) => {
      const ab = abilityBySlot.get(tag.slot);
      return ab ? abilityFitsCounter(ab, target.heroClass, verb, { fits: profile?.fits }) : false;
    });
  };

  const groups: CounterActionGroup[] = [];
  const coveredModifiers = new Set<EnemyModifier>();

  const appendUncoveredModifiers = (maxAdded: number) => {
    if (!rule.modifierCounters || target.modifiers.length === 0) return;
    let added = 0;
    const sortedMods = [...target.modifiers]
      .map((mod) => ({ mod, w: rule.modifierCounters?.[mod] ?? 0 }))
      .filter((m) => m.w >= 16 && !coveredModifiers.has(m.mod))
      .sort((a, b) => b.w - a.w);
    for (const { mod } of sortedMods) {
      if (added >= maxAdded) break;
      const verb = profile?.verbByModifier?.[mod] ?? defaultVerb;
      if (!modifierChipAllowed(verb, mod)) continue;
      pushChipToGroup(groups, verb, t.actionVerbs[verb], {
        kind: 'mechanic',
        label: t.modifiers[mod].label,
        tone: 'modifier',
      });
      coveredModifiers.add(mod);
      added++;
    }
  };

  // 1. Curated structured override (highest precision for nuanced Deadlock edge cases)
  const overrideMeta = isHeroSpecific
    ? HERO_OVERRIDE_STRUCTURED[target.heroClass]?.[rule.className]
    : undefined;

  if (overrideMeta && (overrideMeta.slots?.length || overrideMeta.mechanicFallback)) {
    const primaryVerb = overrideMeta.verb ?? defaultVerb;
    for (const slot of overrideMeta.slots ?? []) {
      const ab = abilityBySlot.get(slot);
      if (!ab || !abilityFits(ab, primaryVerb)) continue;
      pushChipToGroup(groups, primaryVerb, t.actionVerbs[primaryVerb], {
        kind: 'ability',
        ability: ab,
        heroClass: target.heroClass,
      });
      for (const m of tagBySlot.get(slot)?.modifiers ?? []) {
        coveredModifiers.add(m);
      }
    }
    if (overrideMeta.mechanicFallback) {
      const fb = overrideMeta.mechanicFallback;
      let chip: CounterTargetChip | null = null;
      if (fb === 'bullet_dps' || fb === 'spirit_dps') {
        chip = damageChip(primaryVerb, fb === 'bullet_dps' ? 'bullet' : 'spirit');
      } else if (fb === 'low_hp') {
        if (threatChipAllowed(primaryVerb, 'fragile_glass_cannon')) {
          chip = { kind: 'mechanic', label: t.mechanicFallbacks.low_hp, tone: 'threat' };
        }
      } else if (fb === 'melee' ? threatChipAllowed(primaryVerb, 'melee_brawler') : modifierChipAllowed(primaryVerb, fb)) {
        chip = { kind: 'mechanic', label: t.mechanicFallbacks[fb], tone: 'modifier' };
      }
      if (chip) {
        pushChipToGroup(groups, primaryVerb, t.actionVerbs[primaryVerb], chip);
        if (fb === 'melee') coveredModifiers.add('melee');
        if (fb === 'tanky') coveredModifiers.add('tanky');
        if (fb === 'healing') coveredModifiers.add('healing');
      }
    }
    if (overrideMeta.extraGroup) {
      const extraVerb = overrideMeta.extraGroup.verb;
      for (const slot of overrideMeta.extraGroup.slots) {
        const ab = abilityBySlot.get(slot);
        if (!ab || !abilityFits(ab, extraVerb)) continue;
        pushChipToGroup(groups, extraVerb, t.actionVerbs[extraVerb], {
          kind: 'ability',
          ability: ab,
          heroClass: target.heroClass,
        });
        for (const m of tagBySlot.get(slot)?.modifiers ?? []) {
          coveredModifiers.add(m);
        }
      }
    }
    appendUncoveredModifiers(1);
    if (groups.length > 0) return groups;
  }

  // 2. Automatic resolution from hero ability tags × item abilityMatchThreats
  if (
    profile &&
    !profile.preferMechanicFallback &&
    profile.abilityMatchThreats &&
    profile.abilityMatchThreats.length > 0 &&
    heroTags.length > 0
  ) {
    interface AbilityCandidate {
      ability: DeadlockAbility;
      slot: 1 | 2 | 3 | 4;
      score: number;
      verb: CounterActionVerb;
      modifiers: EnemyModifier[];
    }
    const candidates: AbilityCandidate[] = [];

    for (const tag of heroTags) {
      const ab = abilityBySlot.get(tag.slot);
      if (!ab) continue;
      if (profile.skipUltimatesForCleanse && (ab.isUltimate || tag.cleanseable === false)) {
        continue;
      }
      if (profile.matchParryableMeleeOnly && !tag.parryableMelee) {
        continue;
      }

      let bestScore = 0;
      let bestVerb: CounterActionVerb | null = null;

      for (let i = 0; i < profile.abilityMatchThreats.length; i++) {
        const threat = profile.abilityMatchThreats[i];
        if (!tag.threats.includes(threat)) continue;
        const verb = profile.verbByThreat?.[threat] ?? defaultVerb;
        if (!abilityFits(ab, verb)) continue;

        let w = (rule.threatCounters?.[threat] ?? 16) + Math.max(0, 6 - i * 2);
        if (
          isOffMetaSpirit &&
          (threat === 'rapid_fire' || threat === 'bullet_ult' || threat === 'on_hit_procs')
        ) {
          w *= 0.25;
        }
        if (
          isOffMetaBullet &&
          (threat === 'sustained_spirit' || threat === 'ability_spam')
        ) {
          w *= 0.3;
        }
        if (ab.isUltimate) w += 3;

        if (w > bestScore) {
          bestScore = w;
          bestVerb = verb;
        }
      }

      if (bestVerb && bestScore >= 12) {
        candidates.push({
          ability: ab,
          slot: tag.slot,
          score: bestScore,
          verb: bestVerb,
          modifiers: tag.modifiers ?? [],
        });
      }
    }

    candidates.sort((a, b) => b.score - a.score || a.slot - b.slot);
    const maxChips = profile.maxAbilityChips ?? 2;
    const picked = candidates.slice(0, maxChips);

    if (picked.length > 0) {
      for (const p of picked) {
        pushChipToGroup(groups, p.verb, t.actionVerbs[p.verb], {
          kind: 'ability',
          ability: p.ability,
          heroClass: target.heroClass,
        });
        for (const m of p.modifiers) {
          coveredModifiers.add(m);
        }
      }
      appendUncoveredModifiers(1);
      return groups;
    }
  }

  // 3. Mechanic targets: only pairs that are true for this item ("Burstet: Wenig HP")
  const fallbackChips: { verb: CounterActionVerb; chip: CounterTargetChip; weight: number }[] = [];

  if (rule.className === 'upgrade_melee_rebuttal') {
    fallbackChips.push({
      verb: 'punishes',
      chip: { kind: 'mechanic', label: t.mechanicFallbacks.melee, tone: 'modifier' },
      weight: 100,
    });
  }

  if (rule.modifierCounters) {
    for (const mod of target.modifiers) {
      const w = rule.modifierCounters[mod] ?? 0;
      const verb = profile?.verbByModifier?.[mod] ?? defaultVerb;
      if (w >= 14 && modifierChipAllowed(verb, mod)) {
        fallbackChips.push({
          verb,
          chip: { kind: 'mechanic', label: t.modifiers[mod].label, tone: 'modifier' },
          weight: w * 2.1,
        });
      }
    }
  }

  if (rule.damageCounters) {
    const dmgW = rule.damageCounters[target.damageProfile] ?? 0;
    const chip = dmgW >= 16 ? damageChip(defaultVerb, target.damageProfile) : null;
    if (chip) {
      fallbackChips.push({ verb: defaultVerb, chip, weight: dmgW * 1.15 });
    }
  }

  if (rule.threatCounters) {
    const seen = new Set<ThreatMechanic>();
    const addThreats = (list: ThreatMechanic[], scale: number) => {
      for (const threat of list) {
        if (seen.has(threat)) continue;
        seen.add(threat);
        let w = (rule.threatCounters?.[threat] ?? 0) * scale;
        if (
          isOffMetaSpirit &&
          (threat === 'rapid_fire' || threat === 'bullet_ult' || threat === 'on_hit_procs')
        ) {
          w *= 0.35;
        }
        if (
          isOffMetaBullet &&
          (threat === 'sustained_spirit' || threat === 'ability_spam')
        ) {
          w *= 0.45;
        }
        const verb = profile?.verbByThreat?.[threat] ?? defaultVerb;
        if (w >= 14 && threatChipAllowed(verb, threat) && threatTrueForHero(verb, threat)) {
          fallbackChips.push({
            verb,
            chip: {
              kind: 'mechanic',
              label: t.threats[threat],
              tone: 'threat',
              damageType: threat === 'sustained_spirit' ? 'spirit' : undefined,
            },
            weight: w,
          });
        }
      }
    };
    addThreats(primaryThreats, 1.0);
    addThreats(secondaryThreats, SECONDARY_THREAT_SCALE);
  }

  fallbackChips.sort((a, b) => b.weight - a.weight);
  const usedLabels = new Set<string>();
  // "Spirit-Schaden" and "Konstanter Spirit-Schaden" say the same thing twice: keep the stronger one
  const usedDamageTypes = new Set<DamageProfile>();
  for (const g of groups) {
    for (const c of g.targets) {
      if (c.kind === 'mechanic' && c.damageType) usedDamageTypes.add(c.damageType);
    }
  }
  let totalAdded = 0;
  for (const fc of fallbackChips) {
    if (fc.chip.kind === 'mechanic' && usedLabels.has(fc.chip.label)) continue;
    if (fc.chip.kind === 'mechanic' && fc.chip.damageType && usedDamageTypes.has(fc.chip.damageType)) continue;
    if (fc.chip.kind === 'mechanic') usedLabels.add(fc.chip.label);
    if (fc.chip.kind === 'mechanic' && fc.chip.damageType) usedDamageTypes.add(fc.chip.damageType);
    pushChipToGroup(groups, fc.verb, t.actionVerbs[fc.verb], fc.chip);
    totalAdded++;
    if (totalAdded >= 2) break;
  }

  // No true reason against this enemy: no groups, and the caller drops the item for them
  return groups;
}

/** Own abilities whose counter verb can't be read from role + threat alone */
const KIT_VERB_OVERRIDE: Record<string, CounterActionVerb> = {
  'Riposte:defense': 'parries',
  'Time Wall:defense': 'blocks',
  'Dust Devil:defense': 'mitigates',
  'Soul Exchange:defense': 'punishes',
};

/** What YOUR ability does against this enemy threat, from what the ability really does */
export function kitVerbForThreat(
  kitAbility: HeroKitCounter,
  threat: ThreatMechanic | undefined,
  myTraits: ReadonlySet<AbilityTrait>,
): CounterActionVerb {
  const fixed = KIT_VERB_OVERRIDE[`${kitAbility.abilityName}:${kitAbility.stance}`];
  if (fixed) return fixed;
  const interrupts = ['stun', 'sleep', 'knock', 'pull', 'petrify'].some((x) =>
    myTraits.has(x as AbilityTrait),
  );
  if (kitAbility.stance === 'offense') {
    if (threat === 'channeled_ult') return 'cancels';
    if (threat === 'bullet_ult' && interrupts) return 'cancels';
    if (threat === 'airborne') return 'grounds';
    if (threat === 'heavy_healing') return myTraits.has('silence') ? 'silences' : 'cuts_heal';
    if (threat === 'fragile_glass_cannon') return 'bursts';
    if (threat === 'long_range_poke') return 'punishes';
    if (threat === 'rapid_fire' || threat === 'on_hit_procs' || threat === 'bullet_ult') {
      return myTraits.has('disarm') ? 'disarms' : 'weakens';
    }
    if (threat === 'ability_spam') {
      return myTraits.has('silence') || myTraits.has('hex') ? 'silences' : 'controls';
    }
    return 'controls';
  }
  if (threat === 'cleanseable_debuff') return 'cleanses';
  if (myTraits.has('buff')) return threat === 'hard_cc' ? 'blocks' : 'absorbs';
  if (myTraits.has('heal')) return 'sustains';
  if (myTraits.has('mobility')) return 'escapes';
  return 'blocks';
}

function resolveKitEnemyActionGroups(
  kitAbility: HeroKitCounter,
  myTraits: ReadonlySet<AbilityTrait>,
  enemyHeroClass: string,
  enemyHero: DeadlockHero | undefined,
  matchedThreats: ThreatMechanic[],
  matchedModifierLabels: string[],
  lang: Language,
): CounterActionGroup[] {
  const t = UI_TEXT[lang];
  const groups: CounterActionGroup[] = [];
  const abilityBySlot = new Map<number, DeadlockAbility>(
    (enemyHero?.abilities ?? []).map((ab) => [ab.slot, ab]),
  );
  const heroTags = HERO_ABILITY_TAGS[enemyHeroClass] ?? [];

  if (heroTags.length > 0 && matchedThreats.length > 0) {
    const scoredAbilities: { ability: DeadlockAbility; slot: number; verb: CounterActionVerb; score: number }[] = [];
    for (const tag of heroTags) {
      const ab = abilityBySlot.get(tag.slot);
      if (!ab) continue;
      for (let i = 0; i < matchedThreats.length; i++) {
        const th = matchedThreats[i];
        if (!tag.threats.includes(th)) continue;
        const verb = kitVerbForThreat(kitAbility, th, myTraits);
        // Only enemy abilities your ability really answers (no "cancels" vs a non-channel)
        if (!abilityFitsCounter(ab, enemyHeroClass, verb)) continue;
        scoredAbilities.push({
          ability: ab,
          slot: tag.slot,
          verb,
          score: (10 - i) + (ab.isUltimate ? 2 : 0),
        });
        break;
      }
    }
    scoredAbilities.sort((a, b) => b.score - a.score || a.slot - b.slot);
    for (const match of scoredAbilities.slice(0, 2)) {
      pushChipToGroup(groups, match.verb, t.actionVerbs[match.verb], {
        kind: 'ability',
        ability: match.ability,
        heroClass: enemyHeroClass,
      });
    }
  }

  if (groups.length === 0) {
    let added = 0;
    for (const threat of matchedThreats) {
      const verb = kitVerbForThreat(kitAbility, threat, myTraits);
      if (!threatChipAllowed(verb, threat)) continue;
      if (verbNamesAbilities(verb)) {
        const tagged = heroTags.filter((tag) => tag.threats.includes(threat));
        const anyFits = tagged.some((tag) => {
          const ab = abilityBySlot.get(tag.slot);
          return ab ? abilityFitsCounter(ab, enemyHeroClass, verb) : false;
        });
        if (tagged.length > 0 && !anyFits) continue;
      }
      pushChipToGroup(groups, verb, t.actionVerbs[verb], {
        kind: 'mechanic',
        label: t.threats[threat],
        tone: 'threat',
        damageType: threat === 'sustained_spirit' ? 'spirit' : undefined,
      });
      if (++added >= 2) break;
    }
    if (added === 0 && matchedModifierLabels.length > 0) {
      const verb = kitVerbForThreat(kitAbility, undefined, myTraits);
      for (const label of matchedModifierLabels.slice(0, 2)) {
        pushChipToGroup(groups, verb, t.actionVerbs[verb], { kind: 'mechanic', label, tone: 'modifier' });
      }
    }
  }

  return groups;
}

export function recommendCounters(
  input: MatchupInput,
  itemsByClass: Map<string, DeadlockItem>,
  heroesByClass: Map<string, DeadlockHero>,
): RecommendationResult {
  const lang: Language = input.language ?? 'en';
  const itemLang: Language = input.itemLanguage ?? lang;
  const targets: EnemyTargetConfig[] =
    input.enemyTargets && input.enemyTargets.length > 0
      ? input.enemyTargets.slice(0, 3)
      : [
          {
            heroClass: input.enemyHeroClass,
            damageProfile: input.damageProfile,
            modifiers: input.modifiers,
          },
        ];

  const primaryTarget = targets[0];
  const primaryEnemyProfile = getHeroProfile(primaryTarget.heroClass);
  const myProfile = input.myHeroClass ? getHeroProfile(input.myHeroClass) : null;
  const myHero = input.myHeroClass ? heroesByClass.get(input.myHeroClass) ?? null : null;
  const myHeroDisplayName = myHero ? getHeroDisplayName(myHero, lang) : null;

  interface PerEnemyEvaluation {
    heroClass: string;
    score: number;
    isHeroSpecific: boolean;
    overrideTip: string | null;
    overrideUseTip: string | null;
    contextTip: string | null;
    matchedTriggers: string[];
    actionGroups: CounterActionGroup[];
    roleOverride?: CounterRole;
  }

  interface ScoredCandidate {
    item: DeadlockItem;
    stance: CounterStance;
    role: CounterRole;
    score: number;
    why: string;
    reasons: EnemyCounterReason[];
    whenToUse: string;
    synergyNote: string | null;
    isHeroSpecific: boolean;
    isKitAmplifier?: boolean;
    kitAmplifier?: KitAmplifierMeta;
    counteredEnemies: string[];
    upgradeHint: UpgradeHint | null;
  }

  const scored: ScoredCandidate[] = [];

  const targetCost = input.priceTier === 'all' ? null : Number(input.priceTier);

  for (const rule of COUNTER_ITEM_RULES) {
    const item = itemsByClass.get(rule.className);
    if (!item) continue;

    if (targetCost !== null && item.cost !== targetCost) continue;

    // Player hero kit affinity & built-in tool redundancy
    const {
      delta: synergyDelta,
      multiplier: synergyMult,
      note: synergyNote,
    } = computePlayerSynergy(
      rule,
      myProfile?.playerAffinity ?? null,
      input.myHeroClass,
      myHeroDisplayName,
      lang,
    );

    const evals: PerEnemyEvaluation[] = [];

    for (const target of targets) {
      const eProfile = getHeroProfile(target.heroClass);
      const eHeroObj = heroesByClass.get(target.heroClass);
      const overrides = HERO_SPECIFIC_COUNTERS[target.heroClass] ?? [];
      const override = overrides.find((o) => o.itemClassName === rule.className);

      const isOffMetaSpirit =
        target.damageProfile === 'spirit' && eProfile.defaultDamage === 'bullet';
      const isOffMetaBullet =
        target.damageProfile === 'bullet' && eProfile.defaultDamage === 'spirit';

      let rawScore = 0;

      // 1. Damage profile alignment
      if (rule.damageCounters) {
        rawScore += rule.damageCounters[target.damageProfile] ?? 0;
      }

      // 2. Explicit "Building Extra..." toggles
      rawScore += getModifierMatchCount(rule, target.modifiers) * 2.0;

      // 3. Intrinsic enemy hero base-kit threat mechanics
      rawScore += scoreThreatMechanics(
        rule,
        eProfile.threats,
        eProfile.secondaryThreats ?? [],
        isOffMetaSpirit,
        isOffMetaBullet,
      );

      // 4. Hero-specific hard-counter override
      let isHeroSpecific = false;
      let overrideTip: string | null = null;
      let overrideUseTip: string | null = null;
      let roleOverride: CounterRole | undefined;
      if (override) {
        let overrideBonus = override.bonus;
        if (target.damageProfile === 'spirit' && BULLET_ONLY_ITEMS.has(rule.className)) {
          overrideBonus *= 0.25;
        } else if (target.damageProfile === 'bullet' && SPIRIT_ONLY_ITEMS.has(rule.className)) {
          overrideBonus *= 0.25;
        }

        if (overrideBonus >= 14) {
          isHeroSpecific = true;
          roleOverride = override.roleOverride;
          const rawTip =
            lang === 'de'
              ? HERO_OVERRIDE_TIPS_DE[target.heroClass]?.[rule.className] ?? override.tip
              : override.tip;
          overrideTip = eHeroObj
            ? localizeAbilityMentions(rawTip, [eHeroObj], itemLang)
            : rawTip;
          const structuredMeta = HERO_OVERRIDE_STRUCTURED[target.heroClass]?.[rule.className];
          const rawUseTip =
            lang === 'de'
              ? structuredMeta?.useTipDe ?? override.useTipDe ?? null
              : structuredMeta?.useTip ?? override.useTip ?? null;
          if (rawUseTip) {
            overrideUseTip = eHeroObj
              ? localizeAbilityMentions(rawUseTip, [eHeroObj], itemLang)
              : rawUseTip;
          }
        }
        rawScore += overrideBonus;
      }

      if (target.damageProfile === 'spirit' && BULLET_ONLY_ITEMS.has(rule.className)) {
        rawScore *= 0.45;
      }
      if (target.damageProfile === 'bullet' && SPIRIT_ONLY_ITEMS.has(rule.className)) {
        rawScore *= 0.45;
      }

      // 5. Gentle empirical calibration from precomputed 30-day match analytics (bounded ±15%)
      const rawLift = eHeroObj?.counterLifts?.[rule.className] ?? 1.0;
      const clampedLift = Math.max(0.88, Math.min(1.15, rawLift));
      const empiricalMult =
        isOffMetaSpirit || isOffMetaBullet
          ? 1 + (clampedLift - 1) * 0.25
          : clampedLift;

      const enemyScore = (rawScore * synergyMult + synergyDelta) * empiricalMult;
      const contextTip = overrideTip
        ? null
        : resolveContextTip(rule, target.modifiers, lang);
      const matchedTriggers = collectMatchedTriggers(
        rule,
        target,
        eProfile.threats,
        eProfile.secondaryThreats ?? [],
        isOffMetaSpirit,
        isOffMetaBullet,
        lang,
      );
      const actionGroups = resolveEnemyActionGroups(
        rule,
        target,
        eHeroObj,
        eProfile.threats,
        eProfile.secondaryThreats ?? [],
        isOffMetaSpirit,
        isOffMetaBullet,
        isHeroSpecific,
        lang,
      );

      // Nothing on the card would be true against this enemy: it is no counter for them
      const hasRealReason = actionGroups.length > 0;

      evals.push({
        heroClass: target.heroClass,
        score: hasRealReason ? enemyScore : 0,
        isHeroSpecific: hasRealReason && isHeroSpecific,
        overrideTip,
        overrideUseTip,
        contextTip,
        matchedTriggers,
        actionGroups,
        roleOverride,
      });
    }

    // Sort enemy evaluations strongest first
    evals.sort((a, b) => b.score - a.score);
    const bestEval = evals[0];
    if (!bestEval) continue;

    // Which selected enemies does this item genuinely counter? (Strong threshold >= 28 or hero-specific hard counter)
    const counteredEvals = evals.filter((e) => e.score >= 28 || e.isHeroSpecific);
    const counteredEnemies = counteredEvals.map((e) => e.heroClass);
    const hardCounterCount = evals.filter((e) => e.isHeroSpecific).length;

    let combinedScore = bestEval.score;
    if (targets.length > 1) {
      const s1 = Math.max(0, evals[1]?.score ?? 0);
      const s2 = Math.max(0, evals[2]?.score ?? 0);
      combinedScore = bestEval.score + s1 * 0.48 + s2 * 0.34;
      if (counteredEnemies.length === 2) {
        combinedScore *= 1.15;
      } else if (counteredEnemies.length >= 3) {
        combinedScore *= 1.28;
      }
      if (hardCounterCount >= 2) {
        combinedScore *= 1 + (hardCounterCount - 1) * 0.1;
      }
    }

    if (combinedScore < 14) continue;

    const deCopy = lang === 'de' ? ITEM_COPY_DE[rule.className] : undefined;
    const baseWhy = deCopy?.why ?? rule.why;
    const anyHeroSpecific = evals.some((e) => e.isHeroSpecific);
    const uiDict = UI_TEXT[lang];

    // One reason per countered enemy, so multi-enemy picks explain EVERY countered hero
    const explainEvals = counteredEvals.length > 0 ? counteredEvals : [bestEval];
    const reasons: EnemyCounterReason[] = [];

    if (explainEvals.length === 1) {
      const e = explainEvals[0];
      if (e.overrideTip) {
        reasons.push({
          heroClasses: [e.heroClass],
          text: e.overrideTip,
          isHeroSpecific: true,
          actionGroups: e.actionGroups,
        });
      } else if (e.contextTip) {
        reasons.push({
          heroClasses: [e.heroClass],
          triggerSummary: e.matchedTriggers.join(' · ') || undefined,
          text: e.contextTip,
          isHeroSpecific: false,
          actionGroups: e.actionGroups,
        });
      } else {
        reasons.push({
          heroClasses: [e.heroClass],
          triggerSummary: e.matchedTriggers.join(' · ') || undefined,
          text: baseWhy,
          isHeroSpecific: false,
          actionGroups: e.actionGroups,
        });
      }
    } else {
      // One reason per countered enemy, so every enemy line shows its own portrait and its own
      // targets (a merged line can't say which mechanic belongs to whom). Curated override /
      // context tip where available, dynamic mechanics otherwise.
      for (const e of explainEvals) {
        if (e.overrideTip) {
          reasons.push({
            heroClasses: [e.heroClass],
            text: e.overrideTip,
            isHeroSpecific: true,
            actionGroups: e.actionGroups,
          });
        } else if (e.contextTip) {
          reasons.push({
            heroClasses: [e.heroClass],
            text: e.contextTip,
            isHeroSpecific: false,
            actionGroups: e.actionGroups,
          });
        } else {
          const triggerList =
            e.matchedTriggers.length > 0
              ? e.matchedTriggers.join(' & ')
              : uiDict.damageReasonLabel[
                  targets.find((t) => t.heroClass === e.heroClass)?.damageProfile ?? 'equal'
                ];
          reasons.push({
            heroClasses: [e.heroClass],
            text: uiDict.dynamicMechanicReason(triggerList),
            isHeroSpecific: false,
            actionGroups: e.actionGroups,
          });
        }
      }
    }

    const matchupUseTip =
      explainEvals.length === 1 && explainEvals[0].overrideUseTip
        ? explainEvals[0].overrideUseTip
        : deCopy?.whenToUse ?? rule.whenToUse;

    scored.push({
      item,
      stance: rule.stance,
      role: bestEval.roleOverride ?? rule.role,
      score: Math.round(combinedScore * 10) / 10,
      why: reasons[0]?.text ?? baseWhy,
      reasons,
      whenToUse: matchupUseTip,
      synergyNote,
      isHeroSpecific: anyHeroSpecific,
      counteredEnemies:
        counteredEnemies.length > 0 ? counteredEnemies : [bestEval.heroClass],
      upgradeHint: resolveUpgradeHint(rule.className, itemsByClass, itemLang),
    });
  }

  // Sort highest score first; tie-break by multi-enemy counter count, hero-specific, then lower cost
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (targets.length > 1 && b.counteredEnemies.length !== a.counteredEnemies.length) {
      return b.counteredEnemies.length - a.counteredEnemies.length;
    }
    if (a.isHeroSpecific !== b.isHeroSpecific) return a.isHeroSpecific ? -1 : 1;
    return a.item.cost - b.item.cost;
  });

  // Deduplicate upgrade families (keep highest-scoring item per family)
  const deduped: ScoredCandidate[] = [];
  const seenFamilies = new Set<number>();
  for (const cand of scored) {
    const familyId = UPGRADE_FAMILY_MAP.get(cand.item.className);
    if (familyId !== undefined) {
      if (seenFamilies.has(familyId)) continue;
      seenFamilies.add(familyId);
    }
    deduped.push(cand);
  }

  // Evaluate smart Kit-Amplifiers for YOUR selected hero (only if hero has matching kit counter abilities)
  const kitAmplifiersByStance: Record<CounterStance, ScoredCandidate[]> = {
    offense: [],
    defense: [],
  };

  const myKitCounters = myProfile?.kitCounters ?? [];
  if (myKitCounters.length > 0 && myHeroDisplayName) {
    const uiDict = UI_TEXT[lang];
    const axisPrefBonus = [12, 7, 3, 0];

    interface KitEnemyMatch {
      heroClass: string;
      ability: HeroKitCounter;
      score: number;
      matchedThreats: ThreatMechanic[];
      matchedTriggers: string[];
    }

    for (const stance of ['offense', 'defense'] as const) {
      const stanceAbilities = myKitCounters.filter((kc) => kc.stance === stance);
      if (stanceAbilities.length === 0) continue;

      const rawAmpCandidates: ScoredCandidate[] = [];

      for (const ampRule of KIT_AMPLIFIER_RULES) {
        const item = itemsByClass.get(ampRule.className);
        if (!item) continue;
        if (targetCost !== null && item.cost !== targetCost) continue;

        const compatibleAbilities = stanceAbilities.filter(
          (kc) =>
            kc.amplifiers.includes(ampRule.axis) &&
            !(ampRule.axis === 'echo' && kc.isUltimate),
        );
        if (compatibleAbilities.length === 0) continue;

        const enemyMatches: KitEnemyMatch[] = [];

        for (const target of targets) {
          const eProfile = getHeroProfile(target.heroClass);
          const isOffMetaSpirit =
            target.damageProfile === 'spirit' && eProfile.defaultDamage === 'bullet';
          const isOffMetaBullet =
            target.damageProfile === 'bullet' && eProfile.defaultDamage === 'spirit';

          let bestForEnemy: KitEnemyMatch | null = null;

          for (const kc of compatibleAbilities) {
            const matchedTriggers: { label: string; weight: number }[] = [];
            const matchedThreatList: ThreatMechanic[] = [];
            let bestThreatAxisBonus = 0;

            // Match ONLY primary defining threats of the enemy (no noisy secondary tags)
            for (const threat of eProfile.threats) {
              if (!kc.countersThreats.includes(threat)) continue;
              let w = 22;
              if (
                isOffMetaSpirit &&
                (threat === 'rapid_fire' || threat === 'bullet_ult' || threat === 'on_hit_procs')
              ) {
                w *= 0.35;
              }
              if (
                isOffMetaBullet &&
                (threat === 'sustained_spirit' || threat === 'ability_spam')
              ) {
                w *= 0.45;
              }
              if (w >= 12) {
                matchedTriggers.push({ label: uiDict.threats[threat], weight: w });
                matchedThreatList.push(threat);
                bestThreatAxisBonus = Math.max(
                  bestThreatAxisBonus,
                  ampRule.threatAxisBonus?.[threat] ?? 0,
                );
              }
            }

            // Match explicit enemy build toggles
            if (kc.countersModifiers) {
              for (const mod of target.modifiers) {
                if (!kc.countersModifiers.includes(mod)) continue;
                matchedTriggers.push({
                  label: uiDict.modifiers[mod].label,
                  weight: 26,
                });
              }
            }

            if (matchedTriggers.length === 0) continue;

            matchedTriggers.sort((a, b) => b.weight - a.weight);
            const matchScore =
              matchedTriggers[0].weight +
              (matchedTriggers[1]?.weight ?? 0) * 0.45 +
              (matchedTriggers[2]?.weight ?? 0) * 0.25;

            const axisIdx = kc.amplifiers.indexOf(ampRule.axis);
            const prefBonus = axisPrefBonus[axisIdx] ?? 0;
            const ultResetBonus = kc.isUltimate && ampRule.axis === 'refresher' ? 4 : 0;
            const tierMult = targetCost === null ? ampRule.tierWeight : 1.0;
            const totalEnemyScore =
              (matchScore + prefBonus + bestThreatAxisBonus + ultResetBonus) * tierMult;

            if (totalEnemyScore < 30) continue;

            const uniqueTriggerLabels: string[] = [];
            for (const mt of matchedTriggers) {
              if (!uniqueTriggerLabels.includes(mt.label)) {
                uniqueTriggerLabels.push(mt.label);
              }
              if (uniqueTriggerLabels.length >= 2) break;
            }

            if (!bestForEnemy || totalEnemyScore > bestForEnemy.score) {
              bestForEnemy = {
                heroClass: target.heroClass,
                ability: kc,
                score: totalEnemyScore,
                matchedThreats: matchedThreatList,
                matchedTriggers: uniqueTriggerLabels,
              };
            }
          }

          if (bestForEnemy) {
            enemyMatches.push(bestForEnemy);
          }
        }

        // Strict Multi-Enemy Guardrail: when 2-3 enemies are selected, kit amplifier must counter at least 2 of them
        if (targets.length >= 2 && enemyMatches.length < 2) continue;
        if (targets.length === 1 && enemyMatches.length === 0) continue;

        enemyMatches.sort((a, b) => b.score - a.score);
        let combinedScore = enemyMatches[0].score;
        if (targets.length > 1) {
          const s1 = enemyMatches[1]?.score ?? 0;
          const s2 = enemyMatches[2]?.score ?? 0;
          combinedScore = enemyMatches[0].score + s1 * 0.48 + s2 * 0.34;
          if (enemyMatches.length === 2) {
            combinedScore *= 1.15;
          } else if (enemyMatches.length >= 3) {
            combinedScore *= 1.28;
          }
        }

        // Group enemy matches by ability so shared abilities collapse cleanly without boilerplate
        const abilityGroups = new Map<string, KitEnemyMatch[]>();
        for (const em of enemyMatches) {
          const key = `${em.ability.abilityName}:${em.ability.stance}`;
          const list = abilityGroups.get(key) ?? [];
          list.push(em);
          abilityGroups.set(key, list);
        }

        const resolveKitAbilityName = (ab: HeroKitCounter): string => {
          const official = resolveHeroAbility(myHero, ab.abilityName);
          if (official) return getAbilityDisplayName(official, itemLang);
          return itemLang === 'de' ? ab.abilityNameDe : ab.abilityName;
        };

        // One reason per enemy (grouped by the own ability it answers), each with its own targets
        const reasons: EnemyCounterReason[] = [];
        for (const group of abilityGroups.values()) {
          const ab = group[0].ability;
          const abName = resolveKitAbilityName(ab);
          const effect = lang === 'de' ? ab.effectDe : ab.effectEn;
          const text = uiDict.kitAmplifierReason(ampRule.axis, abName, myHeroDisplayName, effect);
          const ownAbility = resolveHeroAbility(myHero, ab.abilityName);
          const myTraits =
            (input.myHeroClass && ownAbility
              ? getAbilityTraits(input.myHeroClass, ownAbility.slot)
              : undefined) ?? new Set<AbilityTrait>();
          const threatLabels = new Set(Object.values(uiDict.threats));
          for (const g of group) {
            const enemyGroups = resolveKitEnemyActionGroups(
              ab,
              myTraits,
              g.heroClass,
              heroesByClass.get(g.heroClass),
              g.matchedThreats,
              g.matchedTriggers.filter((label) => !threatLabels.has(label)),
              lang,
            );
            const actionGroups: CounterActionGroup[] = [];
            for (const eg of enemyGroups) {
              for (const chip of eg.targets) {
                pushChipToGroup(actionGroups, eg.verb, eg.verbLabel, chip);
              }
            }
            reasons.push({
              heroClasses: [g.heroClass],
              triggerSummary: g.matchedTriggers.slice(0, 3).join(' · ') || undefined,
              text,
              isHeroSpecific: false,
              actionGroups,
            });
          }
        }

        const primaryAbility = enemyMatches[0].ability;
        const primaryAbilityName = resolveKitAbilityName(primaryAbility);
        const primaryOfficialAbility = resolveHeroAbility(myHero, primaryAbility.abilityName);

        rawAmpCandidates.push({
          item,
          stance,
          role: primaryAbility.role,
          score: Math.round(combinedScore * 10) / 10,
          why: reasons[0]?.text ?? '',
          reasons,
          whenToUse: uiDict.kitAmplifierUse(
            ampRule.axis,
            primaryAbilityName,
            ampRule.isImbue,
          ),
          synergyNote: uiDict.kitAmplifierSynergyNote(myHeroDisplayName, primaryAbilityName),
          isHeroSpecific: false,
          isKitAmplifier: true,
          kitAmplifier: {
            ability: primaryOfficialAbility,
            abilityName: primaryAbilityName,
            axis: ampRule.axis,
            boostLabel: uiDict.kitBoostAxisLabel[ampRule.axis],
          },
          counteredEnemies: enemyMatches.map((em) => em.heroClass),
          upgradeHint: resolveUpgradeHint(ampRule.className, itemsByClass, itemLang),
        });
      }

      rawAmpCandidates.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (targets.length > 1 && b.counteredEnemies.length !== a.counteredEnemies.length) {
          return b.counteredEnemies.length - a.counteredEnemies.length;
        }
        return a.item.cost - b.item.cost;
      });

      // Deduplicate upgrade families among kit amplifiers
      const seenAmpFamilies = new Set<number>();
      for (const cand of rawAmpCandidates) {
        const familyId = UPGRADE_FAMILY_MAP.get(cand.item.className);
        if (familyId !== undefined) {
          if (seenAmpFamilies.has(familyId)) continue;
          seenAmpFamilies.add(familyId);
        }
        kitAmplifiersByStance[stance].push(cand);
      }
    }
  }

  // Dynamic quality selector: always keep up to 2 top picks; only include #3 if truly strong
  const selectTopForStance = (list: ScoredCandidate[]): ScoredCandidate[] => {
    if (list.length <= 2) return list;
    const topScore = list[0].score;
    const picked = [list[0], list[1]];
    const third = list[2];
    if (
      third &&
      (third.score >= topScore * THIRD_SLOT_MIN_RATIO ||
        third.isHeroSpecific ||
        (targets.length > 1 && third.counteredEnemies.length >= 2))
    ) {
      picked.push(third);
    }
    return picked;
  };

  /**
   * Integrates at most ONE Kit-Amplifier into a stance column, strictly on Rank #2 or #3
   * (Rank #1 always belongs to a direct counter item).
   */
  const mergeKitAmplifierIntoStance = (
    directPicked: ScoredCandidate[],
    bestAmp: ScoredCandidate | null,
  ): ScoredCandidate[] => {
    if (!bestAmp || directPicked.length === 0) return directPicked;
    if (directPicked.some((c) => c.item.className === bestAmp.item.className)) {
      return directPicked;
    }
    // Keep score ordering strictly below Rank #1 direct counter
    const cappedAmp: ScoredCandidate = {
      ...bestAmp,
      score: Math.min(bestAmp.score, Math.round((directPicked[0].score - 0.5) * 10) / 10),
    };
    if (directPicked.length === 1) {
      return [directPicked[0], cappedAmp];
    }
    if (!directPicked[1].isHeroSpecific && bestAmp.score > directPicked[1].score) {
      return [directPicked[0], cappedAmp, directPicked[1]];
    }
    return [directPicked[0], directPicked[1], cappedAmp];
  };

  let hiddenActiveCount = 0;
  let filtered = deduped;
  let offenseAmpList = kitAmplifiersByStance.offense;
  let defenseAmpList = kitAmplifiersByStance.defense;

  if (input.activeSlotsFull) {
    const topOffenseBefore = mergeKitAmplifierIntoStance(
      selectTopForStance(deduped.filter((c) => c.stance === 'offense')),
      offenseAmpList[0] ?? null,
    );
    const topDefenseBefore = mergeKitAmplifierIntoStance(
      selectTopForStance(deduped.filter((c) => c.stance === 'defense')),
      defenseAmpList[0] ?? null,
    );
    hiddenActiveCount = [...topOffenseBefore, ...topDefenseBefore].filter(
      (c) => c.item.isActive,
    ).length;
    filtered = deduped.filter((c) => !c.item.isActive);
    offenseAmpList = offenseAmpList.filter((c) => !c.item.isActive);
    defenseAmpList = defenseAmpList.filter((c) => !c.item.isActive);
  }

  const toRecommendations = (list: ScoredCandidate[]): CounterRecommendation[] => {
    const topScore = list[0]?.score ?? 1;
    return list.map((c, idx) => {
      let tierLabel: CounterRecommendation['tierLabel'] = 'Strong Pick';
      if (idx === 0) {
        tierLabel = 'Best Counter';
      } else if (c.score >= topScore * 0.8 || c.isHeroSpecific) {
        tierLabel = 'Core Counter';
      }

      return {
        item: c.item,
        stance: c.stance,
        rank: idx + 1,
        score: c.score,
        tierLabel,
        role: c.role,
        why: c.why,
        reasons: c.reasons,
        whenToUse: c.whenToUse,
        synergyNote: c.synergyNote,
        isHeroSpecific: c.isHeroSpecific,
        isKitAmplifier: c.isKitAmplifier,
        kitAmplifier: c.kitAmplifier,
        counteredEnemies: c.counteredEnemies,
        upgradeHint: c.upgradeHint,
      };
    });
  };

  const offense = toRecommendations(
    mergeKitAmplifierIntoStance(
      selectTopForStance(filtered.filter((c) => c.stance === 'offense')),
      offenseAmpList[0] ?? null,
    ),
  );
  const defense = toRecommendations(
    mergeKitAmplifierIntoStance(
      selectTopForStance(filtered.filter((c) => c.stance === 'defense')),
      defenseAmpList[0] ?? null,
    ),
  );
  const recommendations = toRecommendations(filtered.slice(0, 5));

  // Determine recommended tactical stance (Offense vs Defense vs Balanced)
  const topOffScore = offense[0]?.score ?? 0;
  const topDefScore = defense[0]?.score ?? 0;
  const isGlassCannon =
    (primaryEnemyProfile.threats.includes('fragile_glass_cannon') ||
      Boolean(primaryEnemyProfile.secondaryThreats?.includes('fragile_glass_cannon'))) &&
    !primaryTarget.modifiers.includes('tanky');

  let recommendedStance: 'offense' | 'defense' | 'balanced' = 'balanced';
  if (
    (isGlassCannon && topOffScore >= topDefScore - 8) ||
    topOffScore >= topDefScore + 12
  ) {
    recommendedStance = 'offense';
  } else if (topDefScore >= topOffScore + 12) {
    recommendedStance = 'defense';
  }

  const enemyNames = targets
    .map((t) => {
      const h = heroesByClass.get(t.heroClass);
      return h ? getHeroDisplayName(h, lang) : t.heroClass;
    })
    .join(' + ');
  const t = UI_TEXT[lang];
  const stanceReason =
    recommendedStance === 'offense'
      ? t.stanceReasonOffense(enemyNames)
      : recommendedStance === 'defense'
        ? t.stanceReasonDefense(enemyNames)
        : t.stanceReasonBalanced(enemyNames);

  const enemyThreatHeadline =
    lang === 'de'
      ? HERO_HEADLINES_DE[primaryTarget.heroClass] ??
        'Vielseitige Bedrohung — stell oben Schadensfokus und „Stackt zusätzlich“ ein, um seinen Build gezielt zu kontern.'
      : primaryEnemyProfile.threatHeadline;

  return {
    offense,
    defense,
    recommendations,
    recommendedStance,
    stanceReason,
    hiddenActiveCount,
    enemyThreatHeadline,
  };
}
