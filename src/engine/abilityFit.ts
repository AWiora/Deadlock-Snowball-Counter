import { getAbilityTraits, type AbilityTrait } from '../data/abilityTraits';
import type {
  CounterActionVerb,
  DamageProfile,
  DeadlockAbility,
  EnemyModifier,
  ThreatMechanic,
} from '../types/deadlock';

/**
 * What an enemy ability has to do for a counter item to work on it. Checked against the game
 * data (damage types) and ABILITY_TRAITS, so a card never claims e.g. that Metal Skin blocks a
 * spirit ult or that a barrier absorbs an ability without damage.
 */
export type AbilityFit =
  | 'damage' // deals damage (any type, incl. buffing the gun)
  | 'weapon' // weapon damage, gun buff or on-hit effect from bullets
  | 'spirit' // spirit damage
  | 'sustained' // damage over time or repeatable poke (healing back makes sense)
  | 'dodgeable' // projectile, telegraph or zone you can sidestep or walk out of
  | 'mobility' // movement ability (a movement silence stops it)
  | 'dash' // movement a slow really shortens (no teleport)
  | 'channel' // interruptible channel
  | 'airborne' // caster fights from the air
  | 'active' // not passive: a silence stops it
  | 'heals' // heals the caster or allies
  | 'buff' // non-ultimate buff / barrier that can be removed
  | 'debuff' // lingering negative effect that a cleanse removes
  | 'hardCc' // Stun, Sleep, Silence, Immobilize, Chain, Fear
  | 'ccImmune' // what Unstoppable makes you immune to
  | 'holds' // locks a target in place, so an ally pull or heal saves them
  | 'slow' // movement slow
  | 'targetsYou' // hits you with damage or an effect (a spell parry blocks it)
  | 'anyNegative'; // any negative effect at all (debuff duration items)

const CC_HARD: AbilityTrait[] = ['stun', 'sleep', 'silence', 'immobilize', 'chain', 'fear'];
const CC_UNSTOPPABLE: AbilityTrait[] = ['stun', 'sleep', 'silence', 'immobilize', 'disarm'];
const CC_HOLDS: AbilityTrait[] = ['stun', 'immobilize', 'chain', 'pull', 'sleep', 'petrify', 'hex'];
const CLEANSEABLE: AbilityTrait[] = [
  'delayed',
  'slow',
  'dot',
  'debuff',
  'silence',
  'immobilize',
  'disarm',
  'hex',
  'chain',
  'fear',
  'moveLock',
];
/** Effects with a duration a Debuff Resist item shortens (not bombs, not knockbacks) */
const ANY_NEGATIVE: AbilityTrait[] = [
  ...CLEANSEABLE.filter((x) => x !== 'delayed'),
  'stun',
  'sleep',
  'petrify',
];

/** Default requirement per verb; null = the verb never names an enemy ability */
const VERB_FIT: Record<CounterActionVerb, AbilityFit[] | null> = {
  cancels: ['channel'],
  grounds: ['airborne'],
  cleanses: ['debuff'],
  parries: ['targetsYou'],
  blocks: ['damage'],
  absorbs: ['damage'],
  reflects: ['damage'],
  silences: ['active'],
  disarms: ['weapon'],
  cuts_heal: ['heals'],
  shortens: ['anyNegative'],
  shreds: null,
  punishes: ['damage'],
  controls: ['mobility'],
  weakens: ['damage'],
  escapes: ['dodgeable'],
  sustains: ['sustained'],
  mitigates: ['damage'],
  strips: ['buff'],
  bursts: null,
  counters: null,
  survives: ['damage'],
  rescues: ['holds'],
};

function hasAny(traits: ReadonlySet<AbilityTrait>, list: AbilityTrait[]): boolean {
  return list.some((t) => traits.has(t));
}

export function abilityHasFit(
  ability: DeadlockAbility,
  traits: ReadonlySet<AbilityTrait>,
  fit: AbilityFit,
): boolean {
  // Without damage data (old cache) damage checks pass, like before
  const dmg = ability.damage;
  const hasDamage = dmg === undefined || dmg.length > 0;
  switch (fit) {
    case 'damage':
      return hasDamage || Boolean(ability.empowersWeapon) || hasAny(traits, ['dot', 'gun']);
    case 'weapon':
      return (
        dmg === undefined ||
        Boolean(ability.empowersWeapon) ||
        traits.has('gun') ||
        dmg.some((d) => d.type === 'weapon')
      );
    case 'spirit':
      return dmg === undefined || dmg.some((d) => d.type === 'spirit');
    case 'sustained':
      // lane-long chip damage, not an ult burst
      return hasAny(traits, ['dot', 'poke']) && !ability.isUltimate;
    case 'dodgeable':
      return traits.has('dodge');
    case 'mobility':
      return traits.has('mobility');
    case 'dash':
      return traits.has('mobility') && !traits.has('teleport');
    case 'channel':
      return traits.has('channel');
    case 'airborne':
      return traits.has('airborne');
    case 'active':
      return !traits.has('passive');
    case 'heals':
      return traits.has('heal');
    case 'buff':
      return traits.has('buff') && !ability.isUltimate;
    case 'debuff':
      return hasAny(traits, CLEANSEABLE);
    case 'hardCc':
      return hasAny(traits, CC_HARD);
    case 'ccImmune':
      return hasAny(traits, CC_UNSTOPPABLE);
    case 'holds':
      return hasAny(traits, CC_HOLDS);
    case 'slow':
      return traits.has('slow');
    case 'targetsYou':
      return (
        !traits.has('passive') &&
        !traits.has('gun') &&
        ((dmg !== undefined && dmg.length > 0) || hasAny(traits, [...ANY_NEGATIVE, 'delayed', 'pull', 'knock']))
      );
    case 'anyNegative':
      return hasAny(traits, ANY_NEGATIVE);
  }
}

/**
 * Can an item with this verb (and optional damage focus) honestly be shown against this
 * enemy ability? Unknown heroes (no traits yet) pass, so a brand-new hero still gets cards.
 */
export function abilityFitsCounter(
  ability: DeadlockAbility,
  heroClass: string,
  verb: CounterActionVerb,
  options: { fits?: AbilityFit[]; focus?: 'weapon' | 'spirit' } = {},
): boolean {
  const required = options.fits ?? VERB_FIT[verb];
  if (!required) return false;
  const traits = getAbilityTraits(heroClass, ability.slot);
  if (!traits) return true;
  if (!required.some((f) => abilityHasFit(ability, traits, f))) return false;
  if (options.focus && !abilityHasFit(ability, traits, options.focus)) return false;
  return true;
}

/** Threat labels a verb can honestly be paired with ("Burstet: Wenig HP", not "Burstet: Poke") */
const THREAT_CHIP_VERBS: Partial<Record<CounterActionVerb, ThreatMechanic[]>> = {
  bursts: ['fragile_glass_cannon'],
  shreds: ['buff_shield_stacker'],
  punishes: ['close_range_dive', 'melee_brawler', 'ability_spam', 'sustained_spirit'],
  controls: ['high_mobility', 'close_range_dive', 'airborne', 'melee_brawler'],
  cancels: ['channeled_ult'],
  grounds: ['airborne'],
  silences: ['high_mobility', 'ability_spam', 'telegraphed_burst', 'close_range_dive', 'heavy_healing'],
  absorbs: ['telegraphed_burst', 'rapid_fire', 'bullet_ult', 'ability_spam', 'sustained_spirit', 'long_range_poke', 'close_range_dive'],
  mitigates: ['telegraphed_burst', 'rapid_fire', 'bullet_ult', 'ability_spam', 'sustained_spirit', 'long_range_poke', 'close_range_dive'],
  blocks: ['telegraphed_burst', 'rapid_fire', 'bullet_ult', 'on_hit_procs', 'hard_cc'],
  survives: ['telegraphed_burst', 'bullet_ult', 'close_range_dive'],
  reflects: ['rapid_fire', 'bullet_ult'],
  weakens: ['rapid_fire', 'bullet_ult', 'on_hit_procs', 'sustained_spirit', 'ability_spam', 'telegraphed_burst', 'heavy_healing'],
  escapes: ['close_range_dive', 'hard_cc', 'channeled_ult', 'melee_brawler', 'telegraphed_burst'],
  sustains: ['long_range_poke', 'sustained_spirit', 'ability_spam'],
  cuts_heal: ['heavy_healing'],
  shortens: ['cleanseable_debuff', 'hard_cc'],
  cleanses: ['cleanseable_debuff'],
  parries: ['telegraphed_burst', 'hard_cc', 'ability_spam'],
  disarms: ['rapid_fire', 'bullet_ult', 'on_hit_procs', 'long_range_poke'],
  strips: ['buff_shield_stacker'],
  rescues: ['hard_cc', 'channeled_ult'],
};

/** Does this verb ever name an enemy ability? (bursts / shreds only name mechanics) */
export function verbNamesAbilities(verb: CounterActionVerb): boolean {
  return VERB_FIT[verb] !== null;
}

export function threatChipAllowed(verb: CounterActionVerb, threat: ThreatMechanic): boolean {
  return THREAT_CHIP_VERBS[verb]?.includes(threat) ?? false;
}

/** Build toggles ("Stackt zusätzlich") a verb can be paired with */
const MODIFIER_CHIP_VERBS: Partial<Record<CounterActionVerb, EnemyModifier[]>> = {
  shreds: ['tanky'],
  bursts: ['tanky'],
  cuts_heal: ['healing'],
  weakens: ['healing', 'tanky'],
  punishes: ['melee'],
  escapes: ['melee', 'cc', 'mobility'],
  controls: ['mobility', 'melee'],
  silences: ['mobility', 'healing'],
  grounds: ['mobility'],
  cancels: ['mobility'],
  absorbs: ['cc', 'melee'],
  blocks: ['cc', 'melee'],
  mitigates: ['melee'],
  shortens: ['cc'],
  cleanses: ['cc'],
  parries: ['cc', 'melee'],
  rescues: ['cc'],
};

export function modifierChipAllowed(verb: CounterActionVerb, mod: EnemyModifier): boolean {
  return MODIFIER_CHIP_VERBS[verb]?.includes(mod) ?? false;
}

/** Verbs where naming the enemy's damage type is a real reason ("Absorbiert: Spirit-Schaden") */
const DAMAGE_CHIP_VERBS: CounterActionVerb[] = [
  'absorbs',
  'blocks',
  'mitigates',
  'reflects',
  'weakens',
  'sustains',
  'punishes',
  'parries',
  'survives',
  'disarms',
  'silences',
];

export function damageChipAllowed(verb: CounterActionVerb, damage: DamageProfile): boolean {
  if (!DAMAGE_CHIP_VERBS.includes(verb)) return false;
  if (verb === 'disarms') return damage === 'bullet';
  if (verb === 'silences') return damage === 'spirit';
  return true;
}
