import type {
  AbilitySlot,
  CounterActionVerb,
  EnemyModifier,
  HeroAbilityThreatTag,
  ThreatMechanic,
} from '../types/deadlock';
import type { AbilityFit } from '../engine/abilityFit';

export interface ItemActionProfile {
  defaultVerb: CounterActionVerb;
  /** Threat mechanics on enemy abilities that this item specifically counters (ordered by priority) */
  abilityMatchThreats?: ThreatMechanic[];
  /** Override action verb when a specific threat mechanic matched */
  verbByThreat?: Partial<Record<ThreatMechanic, CounterActionVerb>>;
  /** Override action verb when a specific user-toggled modifier matched */
  verbByModifier?: Partial<Record<EnemyModifier, CounterActionVerb>>;
  /** Skip ultimate abilities & non-cleanseable abilities (e.g. Dispel Magic) */
  skipUltimatesForCleanse?: boolean;
  /** Only match enemy abilities flagged `parryableMelee: true` (e.g. Rebuttal) */
  matchParryableMeleeOnly?: boolean;
  /** Prefer clean mechanic/stat target pills over ability matching (e.g. Tankbuster, Armor Piercer, Opening Rounds) */
  preferMechanicFallback?: boolean;
  /** Max ability chips per enemy row (default 2) */
  maxAbilityChips?: number;
  /**
   * What an enemy ability must do for this item to work on it (any of). Overrides the verb's
   * default requirement (see VERB_FIT in src/engine/abilityFit.ts), e.g. Reactive Barrier
   * triggers on hard CC, not on damage.
   */
  fits?: AbilityFit[];
  /** Like fits, but only for one verb (e.g. Divine Barrier: cleanses vs absorbs) */
  fitsByVerb?: Partial<Record<CounterActionVerb, AbilityFit[]>>;
  /** false: never label the enemy's damage type ("Weapon-Schaden") as this item's target */
  damageChip?: false;
}

/**
 * Items that only help against one damage type (e.g. Metal Skin: bullets). Their ability chips
 * show only abilities that, per the game data, deal that damage (or, for weapon, boost the gun).
 */
const DAMAGE_FOCUS: Record<string, 'weapon' | 'spirit'> = {
  upgrade_metal_skin: 'weapon',
  upgrade_weapon_shielding: 'weapon',
  upgrade_deflecting_armor: 'weapon', // Plated Armor
  upgrade_improved_bullet_armor: 'weapon', // Bullet Resilience
  upgrade_regenerating_bullet_shield: 'weapon', // Battle Vest: +18% Bullet Resist
  upgrade_withering_whip: 'weapon', // Rusted Barrel: Fire Rate & Bullet Resist
  upgrade_greater_withering_whip: 'weapon', // Disarming Hex
  upgrade_suppressor: 'weapon', // Fire Rate cut
  upgrade_juggernaut: 'weapon',
  upgrade_bullet_armor_reduction_aura: 'weapon', // Hunter's Aura: only cuts their Fire Rate & Bullet Resist
  upgrade_spirit_bubble: 'spirit', // Spirit Shielding
  upgrade_tech_purge: 'spirit', // Spirit Resilience
  upgrade_spellbreaker: 'spirit',
  upgrade_absorbing_armor: 'spirit', // Witchmail
  upgrade_magic_shield: 'spirit', // Enchanter's Emblem: +18% Spirit Resist
  upgrade_spirit_sap: 'spirit', // Spirit Power & Spirit Resist cut
};

export function getItemDamageFocus(className: string): 'weapon' | 'spirit' | undefined {
  return DAMAGE_FOCUS[className];
}

export interface StructuredOverrideMeta {
  /** Explicit ability slots on this hero that this item counters */
  slots?: AbilitySlot[];
  /** Explicit action verb override */
  verb?: CounterActionVerb;
  /** Optional secondary verb group (e.g. Cursed Relic: Cancels [Ult] + Strips [Shield]) */
  extraGroup?: {
    verb: CounterActionVerb;
    slots: AbilitySlot[];
  };
  /** Optional explicit mechanic pill to include alongside or instead of abilities */
  mechanicFallback?: 'melee' | 'bullet_dps' | 'spirit_dps' | 'tanky' | 'healing' | 'low_hp';
  /** Matchup-specific English timing/interaction caveat for the "Use:" line */
  useTip?: string;
  /** Matchup-specific German timing/interaction caveat for the "Use:" line */
  useTipDe?: string;
}

/**
 * Handcrafted Deadlock ability-to-threat tags across all 44 live heroes (slots 1-4).
 * Drives automatic structured ability chips for BOTH curated hard counters and generic recommendations.
 */
export const HERO_ABILITY_TAGS: Record<string, HeroAbilityThreatTag[]> = {
  hero_atlas: [
    { slot: 1, threats: ['heavy_healing', 'sustained_spirit', 'close_range_dive'], modifiers: ['healing'] },
    { slot: 2, threats: ['hard_cc', 'close_range_dive'], modifiers: ['cc'] },
    { slot: 3, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 4, threats: ['hard_cc', 'telegraphed_burst', 'close_range_dive'], modifiers: ['cc'] },
  ],
  hero_fencer: [
    { slot: 1, threats: ['high_mobility', 'telegraphed_burst'], modifiers: ['mobility'] },
    { slot: 2, threats: ['buff_shield_stacker'] },
    { slot: 3, threats: ['high_mobility', 'close_range_dive', 'melee_brawler'], modifiers: ['mobility', 'melee'], parryableMelee: true },
    { slot: 4, threats: ['telegraphed_burst', 'hard_cc'], modifiers: ['cc'] },
  ],
  hero_baba: [
    { slot: 1, threats: ['sustained_spirit', 'ability_spam'] },
    { slot: 2, threats: ['high_mobility', 'buff_shield_stacker'], modifiers: ['mobility'] },
    { slot: 3, threats: ['cleanseable_debuff', 'hard_cc', 'sustained_spirit', 'buff_shield_stacker'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['channeled_ult', 'hard_cc', 'sustained_spirit'], modifiers: ['cc'], cleanseable: false },
  ],
  hero_bebop: [
    { slot: 1, threats: ['hard_cc', 'close_range_dive', 'melee_brawler'], modifiers: ['cc'] },
    { slot: 2, threats: ['cleanseable_debuff', 'telegraphed_burst'], cleanseable: true },
    { slot: 3, threats: ['hard_cc'], modifiers: ['cc'] },
    { slot: 4, threats: ['channeled_ult', 'sustained_spirit'] },
  ],
  hero_punkgoat: [
    { slot: 1, threats: ['melee_brawler', 'close_range_dive', 'hard_cc'], modifiers: ['melee', 'cc'], parryableMelee: true },
    { slot: 2, threats: ['hard_cc', 'close_range_dive', 'high_mobility'], modifiers: ['cc'] },
    { slot: 3, threats: ['melee_brawler'], modifiers: ['melee'] },
    { slot: 4, threats: ['hard_cc', 'close_range_dive'], modifiers: ['cc'] },
  ],
  hero_nano: [
    { slot: 1, threats: ['telegraphed_burst', 'ability_spam'] },
    { slot: 2, threats: ['high_mobility', 'close_range_dive', 'melee_brawler', 'heavy_healing'], modifiers: ['mobility', 'melee', 'healing'], parryableMelee: true },
    { slot: 3, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 4, threats: ['high_mobility', 'telegraphed_burst'], modifiers: ['mobility'] },
  ],
  hero_unicorn: [
    { slot: 1, threats: ['cleanseable_debuff', 'ability_spam'], cleanseable: true },
    { slot: 2, threats: ['buff_shield_stacker', 'cleanseable_debuff', 'hard_cc'], modifiers: ['cc'], cleanseable: true },
    { slot: 3, threats: ['telegraphed_burst', 'ability_spam'] },
    { slot: 4, threats: ['telegraphed_burst', 'sustained_spirit'], cleanseable: false },
  ],
  hero_deadpack: [
    { slot: 1, threats: ['telegraphed_burst', 'ability_spam'] },
    { slot: 2, threats: ['airborne', 'high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['rapid_fire', 'close_range_dive'] },
    { slot: 4, threats: ['hard_cc', 'airborne', 'close_range_dive'], modifiers: ['cc'] },
  ],
  hero_drifter: [
    { slot: 1, threats: ['melee_brawler', 'close_range_dive'], modifiers: ['melee'], parryableMelee: true },
    { slot: 2, threats: ['cleanseable_debuff', 'close_range_dive'], cleanseable: true },
    { slot: 4, threats: ['close_range_dive', 'hard_cc'], cleanseable: false },
  ],
  hero_dynamo: [
    { slot: 1, threats: ['hard_cc'], modifiers: ['cc'] },
    { slot: 2, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 4, threats: ['channeled_ult', 'hard_cc', 'sustained_spirit'], modifiers: ['cc'] },
  ],
  hero_necro: [
    { slot: 1, threats: ['ability_spam', 'sustained_spirit'] },
    { slot: 2, threats: ['hard_cc', 'sustained_spirit', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
    { slot: 3, threats: ['on_hit_procs', 'sustained_spirit'] },
    { slot: 4, threats: ['sustained_spirit', 'ability_spam'] },
  ],
  hero_orion: [
    { slot: 1, threats: ['telegraphed_burst', 'long_range_poke'] },
    { slot: 2, threats: ['airborne', 'rapid_fire'] },
    { slot: 3, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['telegraphed_burst', 'hard_cc', 'long_range_poke'], modifiers: ['cc'] },
  ],
  hero_haze: [
    { slot: 1, threats: ['hard_cc'], modifiers: ['cc'] },
    { slot: 2, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['on_hit_procs', 'rapid_fire'] },
    { slot: 4, threats: ['bullet_ult', 'channeled_ult', 'rapid_fire'] },
  ],
  hero_astro: [
    { slot: 1, threats: ['telegraphed_burst', 'hard_cc'], modifiers: ['cc'] },
    { slot: 2, threats: ['high_mobility', 'airborne'], modifiers: ['mobility'] },
    { slot: 4, threats: ['hard_cc', 'channeled_ult'], modifiers: ['cc'] },
  ],
  hero_inferno: [
    { slot: 1, threats: ['cleanseable_debuff', 'sustained_spirit'], cleanseable: true },
    { slot: 2, threats: ['high_mobility', 'sustained_spirit'], modifiers: ['mobility'] },
    { slot: 3, threats: ['cleanseable_debuff', 'on_hit_procs', 'sustained_spirit'], cleanseable: true },
    { slot: 4, threats: ['hard_cc', 'telegraphed_burst'], modifiers: ['cc'] },
  ],
  hero_tengu: [
    { slot: 1, threats: ['sustained_spirit', 'ability_spam'] },
    { slot: 2, threats: ['heavy_healing', 'rapid_fire'], modifiers: ['healing'] },
    { slot: 3, threats: ['hard_cc', 'heavy_healing'], modifiers: ['cc', 'healing'] },
    { slot: 4, threats: ['airborne', 'high_mobility'], modifiers: ['mobility'] },
  ],
  hero_kelvin: [
    { slot: 1, threats: ['heavy_healing', 'ability_spam'], modifiers: ['healing'] },
    { slot: 2, threats: ['high_mobility', 'airborne'], modifiers: ['mobility'] },
    { slot: 3, threats: ['sustained_spirit', 'channeled_ult'] },
    { slot: 4, threats: ['heavy_healing'], modifiers: ['healing'] },
  ],
  hero_ghost: [
    { slot: 1, threats: ['telegraphed_burst', 'ability_spam', 'sustained_spirit'] },
    { slot: 2, threats: ['heavy_healing', 'sustained_spirit'], modifiers: ['healing'] },
    { slot: 3, threats: ['cleanseable_debuff', 'ability_spam'], cleanseable: true },
    { slot: 4, threats: ['telegraphed_burst', 'heavy_healing'], modifiers: ['healing'] },
  ],
  hero_lash: [
    { slot: 1, threats: ['telegraphed_burst', 'close_range_dive'] },
    { slot: 2, threats: ['airborne', 'high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 4, threats: ['channeled_ult', 'hard_cc', 'telegraphed_burst', 'airborne'], modifiers: ['cc'] },
  ],
  hero_forge: [
    { slot: 1, threats: ['ability_spam', 'sustained_spirit'] },
    { slot: 2, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 3, threats: ['hard_cc'], modifiers: ['cc'] },
    { slot: 4, threats: ['channeled_ult', 'sustained_spirit'] },
  ],
  hero_vampirebat: [
    { slot: 1, threats: ['heavy_healing', 'telegraphed_burst', 'close_range_dive'], modifiers: ['healing'] },
    { slot: 2, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['on_hit_procs', 'telegraphed_burst'] },
    { slot: 4, threats: ['hard_cc', 'sustained_spirit', 'channeled_ult'], modifiers: ['cc'] },
  ],
  hero_mirage: [
    { slot: 1, threats: ['cleanseable_debuff', 'heavy_healing'], modifiers: ['healing'], cleanseable: true },
    { slot: 2, threats: ['hard_cc', 'high_mobility'], modifiers: ['cc', 'mobility'] },
    { slot: 3, threats: ['cleanseable_debuff', 'on_hit_procs', 'telegraphed_burst'], cleanseable: true },
    { slot: 4, threats: ['channeled_ult', 'high_mobility'] },
  ],
  hero_krill: [
    { slot: 1, threats: ['heavy_healing', 'close_range_dive'], modifiers: ['healing'] },
    { slot: 2, threats: ['high_mobility', 'close_range_dive', 'sustained_spirit'], modifiers: ['mobility'] },
    { slot: 3, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['channeled_ult', 'hard_cc'], modifiers: ['cc'] },
  ],
  hero_nurse: [
    { slot: 1, threats: ['cleanseable_debuff', 'heavy_healing', 'sustained_spirit'], modifiers: ['healing'], cleanseable: true },
    { slot: 2, threats: ['buff_shield_stacker'] },
    { slot: 3, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 4, threats: ['hard_cc', 'sustained_spirit'], modifiers: ['cc'], cleanseable: false },
  ],
  hero_bookworm: [
    { slot: 1, threats: ['ability_spam', 'sustained_spirit'] },
    { slot: 2, threats: ['buff_shield_stacker'] },
    { slot: 3, threats: ['hard_cc', 'cleanseable_debuff', 'telegraphed_burst'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['heavy_healing', 'hard_cc'], modifiers: ['healing', 'cc'] },
  ],
  hero_chrono: [
    { slot: 1, threats: ['sustained_spirit', 'ability_spam'] },
    { slot: 3, threats: ['hard_cc', 'telegraphed_burst', 'long_range_poke'], modifiers: ['cc'] },
    { slot: 4, threats: ['hard_cc', 'telegraphed_burst'], modifiers: ['cc'] },
  ],
  hero_synth: [
    { slot: 1, threats: ['sustained_spirit', 'ability_spam'] },
    { slot: 2, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['telegraphed_burst', 'high_mobility'] },
    { slot: 4, threats: ['sustained_spirit', 'telegraphed_burst', 'cleanseable_debuff'], cleanseable: false },
  ],
  hero_ratking: [
    { slot: 1, threats: ['ability_spam', 'sustained_spirit'] },
    { slot: 2, threats: ['cleanseable_debuff', 'sustained_spirit'], cleanseable: true },
    { slot: 3, threats: ['buff_shield_stacker'] },
    { slot: 4, threats: ['buff_shield_stacker'] },
  ],
  hero_familiar: [
    { slot: 1, threats: ['hard_cc', 'ability_spam'], modifiers: ['cc'] },
    { slot: 2, threats: ['heavy_healing', 'high_mobility'], modifiers: ['healing', 'mobility'] },
    { slot: 4, threats: ['hard_cc'], modifiers: ['cc'] },
  ],
  hero_gigawatt: [
    { slot: 1, threats: ['sustained_spirit', 'ability_spam'] },
    { slot: 2, threats: ['cleanseable_debuff', 'hard_cc', 'telegraphed_burst'], modifiers: ['cc'], cleanseable: true },
    { slot: 3, threats: ['on_hit_procs', 'buff_shield_stacker', 'sustained_spirit'] },
    { slot: 4, threats: ['channeled_ult', 'sustained_spirit'] },
  ],
  hero_shiv: [
    { slot: 1, threats: ['cleanseable_debuff', 'ability_spam', 'sustained_spirit'], cleanseable: true },
    { slot: 2, threats: ['high_mobility', 'close_range_dive'], modifiers: ['mobility'] },
    { slot: 3, threats: ['heavy_healing', 'buff_shield_stacker'], modifiers: ['healing'] },
    { slot: 4, threats: ['telegraphed_burst', 'close_range_dive', 'high_mobility'] },
  ],
  hero_werewolf: [
    { slot: 1, threats: ['rapid_fire', 'bullet_ult'] },
    { slot: 2, threats: ['melee_brawler', 'close_range_dive', 'high_mobility'], modifiers: ['melee', 'mobility'], parryableMelee: true },
    { slot: 3, threats: ['cleanseable_debuff', 'hard_cc'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['rapid_fire', 'bullet_ult', 'heavy_healing'], modifiers: ['healing'] },
    // Lycan Curse form: these replace Slam Fire, Boot Kick and Entangling Bola while transformed
    { slot: 5, threats: ['melee_brawler', 'heavy_healing'], modifiers: ['melee', 'healing'] },
    { slot: 6, threats: ['close_range_dive', 'melee_brawler', 'high_mobility', 'cleanseable_debuff'], modifiers: ['melee', 'mobility'], cleanseable: true },
    { slot: 7, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
  ],
  hero_magician: [
    { slot: 1, threats: ['telegraphed_burst', 'long_range_poke', 'ability_spam'] },
    { slot: 2, threats: ['ability_spam', 'sustained_spirit'] },
    { slot: 3, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: false },
    { slot: 4, threats: ['telegraphed_burst'] },
  ],
  hero_chessmaster: [
    { slot: 1, threats: ['cleanseable_debuff', 'ability_spam', 'sustained_spirit'], cleanseable: true },
    { slot: 2, threats: ['buff_shield_stacker'] },
    { slot: 3, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['telegraphed_burst', 'sustained_spirit'] },
  ],
  hero_doorman: [
    { slot: 1, threats: ['telegraphed_burst', 'ability_spam'] },
    { slot: 2, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['hard_cc', 'telegraphed_burst'], modifiers: ['cc'] },
    { slot: 4, threats: ['hard_cc', 'telegraphed_burst'], modifiers: ['cc'] },
  ],
  hero_priest: [
    { slot: 1, threats: ['cleanseable_debuff', 'telegraphed_burst'], cleanseable: true },
    { slot: 2, threats: ['hard_cc', 'close_range_dive'], modifiers: ['cc'] },
    { slot: 3, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['bullet_ult', 'rapid_fire'] },
  ],
  hero_frank: [
    { slot: 1, threats: ['telegraphed_burst'] },
    { slot: 2, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 3, threats: ['sustained_spirit', 'close_range_dive'] },
    { slot: 4, threats: ['heavy_healing', 'telegraphed_burst'], modifiers: ['healing'] },
  ],
  hero_hornet: [
    { slot: 1, threats: ['hard_cc', 'cleanseable_debuff'], modifiers: ['cc'], cleanseable: true },
    { slot: 2, threats: ['airborne', 'rapid_fire'] },
    { slot: 3, threats: ['cleanseable_debuff', 'sustained_spirit'], cleanseable: true },
    { slot: 4, threats: ['telegraphed_burst', 'long_range_poke'] },
  ],
  hero_artist: [
    { slot: 1, threats: ['ability_spam'] },
    { slot: 2, threats: ['ability_spam', 'sustained_spirit', 'cleanseable_debuff', 'high_mobility'], cleanseable: true },
    { slot: 3, threats: ['cleanseable_debuff', 'hard_cc', 'sustained_spirit'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['hard_cc', 'sustained_spirit'], modifiers: ['cc'], cleanseable: false },
  ],
  hero_viscous: [
    { slot: 1, threats: ['ability_spam', 'sustained_spirit'] },
    { slot: 2, threats: ['heavy_healing', 'buff_shield_stacker'], modifiers: ['healing'] },
    { slot: 3, threats: ['melee_brawler', 'high_mobility', 'hard_cc'], modifiers: ['melee', 'mobility'], parryableMelee: true },
    { slot: 4, threats: ['high_mobility', 'hard_cc', 'buff_shield_stacker'], modifiers: ['mobility', 'cc'] },
  ],
  hero_viper: [
    { slot: 1, threats: ['cleanseable_debuff', 'ability_spam'], cleanseable: true },
    { slot: 2, threats: ['cleanseable_debuff', 'telegraphed_burst'], cleanseable: true },
    { slot: 3, threats: ['high_mobility', 'close_range_dive'], modifiers: ['mobility'] },
    { slot: 4, threats: ['hard_cc', 'telegraphed_burst'], modifiers: ['cc'] },
  ],
  hero_warden: [
    { slot: 1, threats: ['cleanseable_debuff'], cleanseable: true },
    { slot: 2, threats: ['buff_shield_stacker'] },
    { slot: 3, threats: ['cleanseable_debuff', 'hard_cc'], modifiers: ['cc'], cleanseable: true },
    { slot: 4, threats: ['channeled_ult', 'heavy_healing', 'sustained_spirit'], modifiers: ['healing'] },
  ],
  hero_wraith: [
    { slot: 1, threats: ['ability_spam', 'telegraphed_burst'] },
    { slot: 2, threats: ['high_mobility'], modifiers: ['mobility'] },
    { slot: 3, threats: ['rapid_fire', 'bullet_ult'] },
    { slot: 4, threats: ['hard_cc', 'telegraphed_burst'], modifiers: ['cc'] },
  ],
  hero_yamato: [
    { slot: 1, threats: ['telegraphed_burst'] },
    { slot: 2, threats: ['high_mobility', 'close_range_dive'], modifiers: ['mobility'] },
    { slot: 3, threats: ['heavy_healing'], modifiers: ['healing'] },
    { slot: 4, threats: ['buff_shield_stacker', 'heavy_healing'], modifiers: ['healing'] },
  ],
};

/**
 * Per-item action verb and ability-matching semantics for all 74 counter items.
 */
export const ITEM_ACTION_PROFILES: Record<string, ItemActionProfile> = {
  // Tier 1 (800)
  upgrade_withering_whip: {
    defaultVerb: 'weakens',
    abilityMatchThreats: ['bullet_ult', 'on_hit_procs', 'rapid_fire'],
  },
  upgrade_melee_rebuttal: {
    defaultVerb: 'punishes',
    abilityMatchThreats: ['melee_brawler'],
    matchParryableMeleeOnly: true,
    maxAbilityChips: 1,
  },
  upgrade_grit: {
    defaultVerb: 'absorbs',
    abilityMatchThreats: ['telegraphed_burst', 'close_range_dive'],
  },
  upgrade_health_stimpak: {
    defaultVerb: 'sustains',
    abilityMatchThreats: ['long_range_poke', 'ability_spam', 'sustained_spirit'],
  },
  upgrade_medic_bullets: {
    defaultVerb: 'sustains',
    abilityMatchThreats: ['long_range_poke', 'ability_spam'],
  },
  upgrade_endurance: {
    defaultVerb: 'sustains',
    abilityMatchThreats: ['long_range_poke', 'sustained_spirit', 'ability_spam'],
  },
  upgrade_improved_stamina: {
    defaultVerb: 'escapes',
    abilityMatchThreats: ['hard_cc', 'telegraphed_burst', 'close_range_dive'],
  },
  upgrade_mystic_regeneration: {
    defaultVerb: 'sustains',
    abilityMatchThreats: ['long_range_poke', 'sustained_spirit', 'ability_spam'],
  },
  upgrade_headshot_booster: {
    defaultVerb: 'bursts',
    preferMechanicFallback: true,
  },
  upgrade_magic_burst: {
    defaultVerb: 'bursts',
    preferMechanicFallback: true,
  },
  upgrade_close_range: {
    defaultVerb: 'punishes',
    preferMechanicFallback: true,
  },

  // Tier 2 (1600)
  upgrade_weapon_shielding: {
    defaultVerb: 'absorbs',
    abilityMatchThreats: ['bullet_ult', 'rapid_fire'],
  },
  upgrade_spirit_bubble: {
    defaultVerb: 'absorbs',
    abilityMatchThreats: ['telegraphed_burst', 'sustained_spirit', 'ability_spam', 'long_range_poke'],
  },
  upgrade_regenerating_bullet_shield: {
    defaultVerb: 'mitigates',
    preferMechanicFallback: true,
  },
  upgrade_magic_shield: {
    defaultVerb: 'mitigates',
    preferMechanicFallback: true,
  },
  upgrade_return_fire: {
    defaultVerb: 'reflects',
    abilityMatchThreats: ['bullet_ult', 'rapid_fire'],
  },
  upgrade_vex_barrier: {
    defaultVerb: 'absorbs',
    abilityMatchThreats: ['hard_cc'],
    fits: ['reactiveBarrier'], // wiki: abilities that trigger Reactive Barrier
    damageChip: false,
  },
  upgrade_debuff_reducer: {
    defaultVerb: 'shortens',
    fits: ['debuffResist'], // wiki: shortened by Debuff Resist
    abilityMatchThreats: ['cleanseable_debuff', 'hard_cc'],
  },
  upgrade_healbane: {
    defaultVerb: 'cuts_heal',
    abilityMatchThreats: ['heavy_healing'],
    verbByModifier: { healing: 'cuts_heal' },
  },
  upgrade_restorative_locket: {
    defaultVerb: 'punishes',
    abilityMatchThreats: ['ability_spam', 'sustained_spirit'],
    fits: ['active'], // any enemy ability cast near you stores a stack
  },
  upgrade_containment: {
    defaultVerb: 'controls',
    fits: ['slowingHex'], // wiki: disabled by Slowing Hex
    abilityMatchThreats: ['high_mobility', 'airborne', 'close_range_dive'],
  },
  upgrade_suppressor: {
    defaultVerb: 'weakens',
    abilityMatchThreats: ['rapid_fire', 'on_hit_procs', 'bullet_ult'],
  },
  upgrade_spirit_sap: {
    defaultVerb: 'weakens',
    abilityMatchThreats: ['telegraphed_burst', 'sustained_spirit', 'ability_spam'],
  },
  upgrade_magic_slow: {
    defaultVerb: 'controls',
    abilityMatchThreats: ['high_mobility', 'close_range_dive'],
    fits: ['dash'], // a slow does not stop teleports
  },
  upgrade_slowing_bullets: {
    defaultVerb: 'controls',
    abilityMatchThreats: ['high_mobility', 'close_range_dive'],
    fits: ['dash'], // a slow does not stop teleports
  },
  upgrade_headshot_booster2: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_magic_vulnerability: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_cardio_calibrator: {
    defaultVerb: 'escapes',
    abilityMatchThreats: ['sustained_spirit', 'close_range_dive'],
    fits: ['slow'], // only Slow Resist
    damageChip: false,
  },
  upgrade_guardian_ward: {
    defaultVerb: 'absorbs',
    abilityMatchThreats: ['telegraphed_burst', 'close_range_dive'],
  },
  upgrade_fleetfoot_boots: {
    defaultVerb: 'escapes',
    abilityMatchThreats: ['close_range_dive', 'sustained_spirit'],
    fits: ['dodgeable', 'slow'],
  },
  upgrade_bullet_resist_shredder: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_tech_defense_shredders: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_cold_front: {
    defaultVerb: 'bursts',
    preferMechanicFallback: true,
    verbByThreat: { high_mobility: 'controls', close_range_dive: 'controls' },
  },
  upgrade_pristine_emblem: {
    defaultVerb: 'bursts',
    preferMechanicFallback: true,
  },

  // Tier 3 (3200)
  upgrade_metal_skin: {
    defaultVerb: 'blocks',
    abilityMatchThreats: ['bullet_ult', 'rapid_fire'],
  },
  upgrade_greater_withering_whip: {
    defaultVerb: 'disarms',
    abilityMatchThreats: ['bullet_ult', 'rapid_fire', 'on_hit_procs'],
  },
  upgrade_target_stun: {
    defaultVerb: 'cancels',
    abilityMatchThreats: ['channeled_ult', 'airborne'],
    verbByThreat: {
      channeled_ult: 'cancels',
      airborne: 'grounds',
      high_mobility: 'controls',
    },
    damageChip: false,
  },
  upgrade_reduce_debuff_duration: {
    defaultVerb: 'cleanses',
    fits: ['dispel'], // wiki: effect can be dispelled
    abilityMatchThreats: ['cleanseable_debuff'],
    skipUltimatesForCleanse: true,
  },
  upgrade_counterspell: {
    defaultVerb: 'parries',
    abilityMatchThreats: ['telegraphed_burst', 'hard_cc'],
  },
  upgrade_targeted_silence: {
    defaultVerb: 'silences',
    abilityMatchThreats: ['high_mobility', 'telegraphed_burst', 'ability_spam', 'heavy_healing'],
  },
  upgrade_rupture: {
    defaultVerb: 'cuts_heal',
    abilityMatchThreats: ['heavy_healing'],
    verbByModifier: { tanky: 'shreds', healing: 'cuts_heal' },
  },
  upgrade_toxic_bullets: {
    defaultVerb: 'cuts_heal',
    abilityMatchThreats: ['heavy_healing'],
    verbByModifier: { tanky: 'shreds', healing: 'cuts_heal' },
  },
  upgrade_magic_shock: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_improved_bullet_armor: {
    defaultVerb: 'mitigates',
    preferMechanicFallback: true,
  },
  upgrade_tech_purge: {
    defaultVerb: 'mitigates',
    preferMechanicFallback: true,
  },
  upgrade_warp_stone: {
    defaultVerb: 'escapes',
    abilityMatchThreats: ['hard_cc', 'channeled_ult', 'close_range_dive'],
  },
  upgrade_bullet_armor_reduction_aura: {
    defaultVerb: 'weakens',
    // The aura weakens their gun, not a dive: a diver just ends up inside it
    abilityMatchThreats: ['rapid_fire', 'bullet_ult'],
    verbByThreat: { close_range_dive: 'punishes' },
  },
  upgrade_reinforcing_casings: {
    defaultVerb: 'mitigates',
    preferMechanicFallback: true,
  },
  upgrade_rescue_beam: {
    defaultVerb: 'rescues',
    abilityMatchThreats: ['channeled_ult', 'hard_cc'],
  },
  upgrade_headhunter: {
    defaultVerb: 'bursts',
    preferMechanicFallback: true,
  },

  // Tier 4 (6400)
  upgrade_deflecting_armor: {
    defaultVerb: 'blocks',
    fits: ['platedArmor'], // wiki: deflected bullets / prevented on-shot effects
    abilityMatchThreats: ['on_hit_procs', 'bullet_ult', 'rapid_fire'],
  },
  upgrade_juggernaut: {
    defaultVerb: 'weakens',
    abilityMatchThreats: ['rapid_fire', 'bullet_ult'],
  },
  upgrade_spellbreaker: {
    defaultVerb: 'mitigates',
    abilityMatchThreats: ['telegraphed_burst', 'long_range_poke', 'ability_spam'],
  },
  upgrade_absorbing_armor: {
    defaultVerb: 'punishes',
    abilityMatchThreats: ['sustained_spirit', 'ability_spam'],
  },
  upgrade_glitch: {
    defaultVerb: 'silences',
    abilityMatchThreats: ['channeled_ult', 'buff_shield_stacker', 'high_mobility', 'bullet_ult', 'heavy_healing'],
    verbByThreat: {
      channeled_ult: 'cancels',
      buff_shield_stacker: 'strips',
      high_mobility: 'silences',
      bullet_ult: 'cancels',
      heavy_healing: 'silences',
    },
  },
  upgrade_unstoppable: {
    defaultVerb: 'blocks',
    abilityMatchThreats: ['hard_cc', 'channeled_ult', 'cleanseable_debuff'],
    fits: ['unstoppable'], // wiki: CC suppressed by Unstoppable
    damageChip: false,
  },
  upgrade_auto_cleanse: {
    defaultVerb: 'cleanses',
    abilityMatchThreats: ['hard_cc', 'cleanseable_debuff'],
    fits: ['indomitable'], // wiki: disable prevented by Indomitable
  },
  upgrade_self_bubble: {
    defaultVerb: 'blocks',
    abilityMatchThreats: ['telegraphed_burst', 'bullet_ult', 'channeled_ult', 'hard_cc'],
    fits: ['damage', 'hardCc'], // invulnerable
  },
  upgrade_inhibitor: {
    defaultVerb: 'weakens',
    abilityMatchThreats: ['heavy_healing', 'rapid_fire', 'close_range_dive'],
    fits: ['damage', 'heals'], // cuts their outgoing damage and healing
  },
  upgrade_spirit_burn: {
    defaultVerb: 'cuts_heal',
    abilityMatchThreats: ['heavy_healing'],
    verbByModifier: { tanky: 'shreds', healing: 'cuts_heal' },
  },
  upgrade_banshee_slugs: {
    defaultVerb: 'shreds',
    abilityMatchThreats: ['heavy_healing'],
    verbByModifier: { tanky: 'shreds', healing: 'cuts_heal' },
  },
  upgrade_aprounds: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_escalating_exposure: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_siphon_bullets: {
    defaultVerb: 'shreds',
    preferMechanicFallback: true,
  },
  upgrade_capacitor: {
    defaultVerb: 'controls',
    fits: ['slowingHex'], // silences movement abilities like Slowing Hex
    abilityMatchThreats: ['high_mobility', 'airborne', 'close_range_dive'],
  },
  upgrade_phantom_strike: {
    defaultVerb: 'grounds',
    abilityMatchThreats: ['airborne', 'rapid_fire', 'long_range_poke'],
    verbByThreat: {
      airborne: 'grounds',
      rapid_fire: 'disarms',
      long_range_poke: 'disarms',
    },
    damageChip: false,
  },
  upgrade_focus_lens: {
    defaultVerb: 'silences',
    abilityMatchThreats: ['high_mobility', 'telegraphed_burst', 'heavy_healing', 'ability_spam'],
    verbByThreat: {
      fragile_glass_cannon: 'bursts',
    },
  },
  upgrade_proc_silence: {
    defaultVerb: 'silences',
    abilityMatchThreats: ['ability_spam', 'high_mobility', 'telegraphed_burst'],
  },
  upgrade_aoe_root: {
    defaultVerb: 'controls',
    fits: ['slowingHex'], // applies Slowing Hex
    abilityMatchThreats: ['high_mobility', 'airborne', 'close_range_dive'],
  },
  upgrade_divine_barrier: {
    defaultVerb: 'cleanses',
    abilityMatchThreats: ['cleanseable_debuff', 'telegraphed_burst'],
    verbByThreat: { telegraphed_burst: 'absorbs' },
    fitsByVerb: { cleanses: ['divineBarrier'] },
  },
  upgrade_colossus: {
    defaultVerb: 'mitigates',
    abilityMatchThreats: ['close_range_dive', 'rapid_fire'],
  },
  upgrade_discord: {
    defaultVerb: 'mitigates',
    abilityMatchThreats: ['sustained_spirit', 'close_range_dive'],
    verbByModifier: { tanky: 'shreds' },
    fits: ['spirit', 'debuffResist'], // Spirit Resist + Debuff Resist
  },
  upgrade_arctic_blast: {
    defaultVerb: 'controls',
    abilityMatchThreats: ['high_mobility', 'close_range_dive'],
    fits: ['dash'], // freeze + slow, no movement silence
    verbByThreat: {
      fragile_glass_cannon: 'bursts',
      high_mobility: 'controls',
      close_range_dive: 'controls',
    },
  },
  upgrade_cheat_death: {
    defaultVerb: 'survives',
    abilityMatchThreats: ['telegraphed_burst', 'bullet_ult'],
  },
  upgrade_fervor: {
    defaultVerb: 'shortens',
    fits: ['debuffResist'], // reduces existing debuffs
    abilityMatchThreats: ['cleanseable_debuff', 'hard_cc'],
    damageChip: false,
  },
};

/**
 * Curated edge-case ability mappings & matchup-specific "Use:" timing caveats (EN + DE).
 * Preserves critical Deadlock matchup nuances that generic item usage tips don't cover.
 */
export const HERO_OVERRIDE_STRUCTURED: Record<string, Partial<Record<string, StructuredOverrideMeta>>> = {
  hero_haze: {
    upgrade_withering_whip: {
      slots: [3],
      verb: 'weakens',
      useTip: 'Cast as lane trades start so Haze cannot stack Fixation.',
      useTipDe: 'Zu Beginn des Schlagabtauschs drücken, damit Haze keine Fixation-Stacks aufbaut.',
    },
    upgrade_return_fire: {
      slots: [4],
      verb: 'reflects',
      useTip: 'Pop the moment Haze channels Bullet Dance or sprays you.',
      useTipDe: 'Sofort zünden, sobald Haze Bullet Dance startet oder auf dich schießt.',
    },
    upgrade_metal_skin: {
      slots: [4],
      verb: 'blocks',
      useTip: 'Pop immediately during Bullet Dance to ignore 100% of her damage.',
      useTipDe: 'Sofort bei Bullet Dance zünden. Ihre Kugeln machen dann keinen Schaden.',
    },
    upgrade_greater_withering_whip: {
      slots: [3],
      verb: 'disarms',
      useTip: 'Disarm as she engages so she cannot shoot or stack Fixation.',
      useTipDe: 'Sofort beim Angriff drücken, damit sie weder schießen noch Fixation stapeln kann.',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
      useTip: 'Cast from safe range during Bullet Dance (before she builds Unstoppable).',
      useTipDe: 'Aus sicherer Entfernung bei Bullet Dance werfen, solange sie noch kein Unstoppable hat.',
    },
    upgrade_deflecting_armor: {
      slots: [3, 4],
      verb: 'blocks',
      useTip: 'Passive — deflects bullets and blocks Fixation on-hit stacks automatically.',
      useTipDe: 'Passiv — wehrt Kugeln ab und verhindert Fixation-Stacks komplett.',
    },
    upgrade_glitch: {
      slots: [4, 2],
      verb: 'cancels',
      useTip: 'Cancels Bullet Dance and blocks Unstoppable / Smoke Bomb escapes.',
      useTipDe: 'Bricht Bullet Dance ab und verhindert Unstoppable und Smoke Bomb.',
    },
  },
  hero_atlas: {
    upgrade_melee_rebuttal: {
      verb: 'punishes',
      mechanicFallback: 'melee',
      useTip: 'Hold Parry for Abrams\'s post-charge heavy melee to heal and chunk him.',
      useTipDe: 'Nach Abrams\' Charge seinen schweren Nahkampfschlag parieren. Das heilt dich und bestraft ihn hart.',
    },
    upgrade_vex_barrier: {
      slots: [2, 4],
      verb: 'absorbs',
      useTip: 'Passive — auto-triggers a barrier when Shoulder Charge or Seismic Impact lands.',
      useTipDe: 'Passiv — gibt dir sofort eine Barriere bei Shoulder Charge oder Seismic Impact.',
    },
    upgrade_debuff_reducer: {
      slots: [2],
      verb: 'shortens',
      useTip: 'Passive — shortens the Shoulder Charge wall stun so you recover sooner.',
      useTipDe: 'Passiv — verkürzt die Betäubung von Shoulder Charge, damit du schneller wieder handeln kannst.',
    },
    upgrade_healbane: {
      slots: [1, 3],
      verb: 'cuts_heal',
    },
    upgrade_rupture: {
      slots: [1, 3],
      verb: 'cuts_heal',
    },
    upgrade_glitch: {
      slots: [2, 4, 1],
      verb: 'silences',
    },
  },
  hero_bebop: {
    upgrade_reduce_debuff_duration: {
      slots: [2],
      verb: 'cleanses',
      useTip: 'Press right after Sticky Bomb attaches, then run: it drops to the ground and still explodes.',
      useTipDe: 'Direkt nachdem Sticky Bomb an dir klebt drücken und weglaufen: Sie fällt zu Boden und explodiert dort trotzdem.',
    },
    upgrade_counterspell: {
      slots: [2, 3],
      verb: 'parries',
      useTip: 'Tap Parry right before Sticky Bomb detonates (or as Grapple Arm arrives).',
      useTipDe: 'Kurz vor der Explosion von Sticky Bomb oder beim Treffer von Grapple Arm parieren.',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
    },
    upgrade_divine_barrier: {
      slots: [2],
      verb: 'cleanses',
      useTip: 'Cleanses Sticky Bomb off yourself or a hooked teammate while granting a huge barrier.',
      useTipDe: 'Entfernt Sticky Bomb von dir oder einem gehookten Teammate und gibt eine starke Barriere.',
    },
    upgrade_vex_barrier: {
      slots: [3, 1],
      verb: 'absorbs',
      useTip: 'Passive — Grapple Arm triggers the barrier automatically to soak Uppercut + Sticky Bomb.',
      useTipDe: 'Passiv — Grapple Arm löst die Barriere automatisch aus und fängt Uppercut und Sticky Bomb ab.',
    },
  },
  hero_gigawatt: {
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
      useTip: 'Cast from long range the instant Seven channels Storm Cloud.',
      useTipDe: 'Sofort aus sicherer Entfernung werfen, sobald Seven Storm Cloud startet.',
    },
    upgrade_reduce_debuff_duration: {
      slots: [2],
      verb: 'cleanses',
      useTip: 'Press before Static Charge finishes ticking to prevent the AoE stun.',
      useTipDe: 'Drücken, bevor Static Charge abläuft. Dann betäubt sie niemanden.',
    },
    upgrade_counterspell: {
      slots: [2],
      verb: 'parries',
      useTip: 'Tap Parry right as Static Charge ticks to zero to block the stun and burst.',
      useTipDe: 'Genau am Ende von Static Charge parieren. Das blockt Betäubung und Schaden.',
    },
    upgrade_spirit_bubble: {
      slots: [1, 3],
      verb: 'absorbs',
    },
    upgrade_glitch: {
      slots: [4],
      verb: 'cancels',
      extraGroup: { verb: 'strips', slots: [3] },
      useTip: 'Cancels Storm Cloud immediately even through item casts and strips Power Surge.',
      useTipDe: 'Bricht Storm Cloud sofort ab, sperrt auch Items und entfernt Power Surge.',
    },
  },
  hero_hornet: {
    upgrade_target_stun: {
      slots: [2],
      verb: 'grounds',
      useTip: 'Cast as soon as Vindicta lifts into Flight for extended airborne stun.',
      useTipDe: 'Sofort drücken, sobald Vindicta abhebt. In der Luft betäubt es besonders lange.',
    },
    upgrade_phantom_strike: {
      slots: [2],
      verb: 'grounds',
      useTip: 'Teleport onto flying Vindicta to yank her down and disarm her immediately.',
      useTipDe: 'Direkt zur fliegenden Vindicta teleportieren. Holt sie runter und entwaffnet sie.',
    },
    upgrade_weapon_shielding: {
      slots: [2, 4],
      verb: 'absorbs',
      useTip: 'Passive — soaks early Flight harass to keep you above Assassinate execute HP.',
      useTipDe: 'Passiv — fängt Beschuss aus der Luft ab, damit du nicht in Reichweite von Assassinate fällst.',
    },
    upgrade_metal_skin: {
      slots: [2],
      verb: 'blocks',
    },
    upgrade_deflecting_armor: {
      slots: [2],
      verb: 'blocks',
    },
  },
  hero_orion: {
    upgrade_target_stun: {
      slots: [2],
      verb: 'grounds',
      useTip: 'Cast when Grey Talon takes off with Rain of Arrows for extended airborne stun.',
      useTipDe: 'Sofort bei Rain of Arrows werfen. Holt ihn mit langer Betäubung aus der Luft.',
    },
    upgrade_spirit_bubble: {
      slots: [1, 4],
      verb: 'absorbs',
    },
    upgrade_spellbreaker: {
      slots: [1, 4],
      verb: 'mitigates',
    },
    upgrade_counterspell: {
      slots: [4, 1],
      verb: 'parries',
      useTip: 'Tap Parry right as Guided Owl or Charged Shot arrives to negate the nuke and heal.',
      useTipDe: 'Kurz vor dem Einschlag von Guided Owl oder Charged Shot parieren.',
    },
    upgrade_phantom_strike: {
      slots: [2],
      verb: 'grounds',
    },
  },
  hero_inferno: {
    upgrade_reduce_debuff_duration: {
      slots: [3, 1],
      verb: 'cleanses',
      useTip: 'Press as soon as Afterburn ignites to stop the burn damage.',
      useTipDe: 'Sofort zünden, sobald Afterburn auslöst. Stoppt den Schaden über Zeit.',
    },
    upgrade_debuff_reducer: {
      slots: [3, 4],
      verb: 'shortens',
    },
    upgrade_deflecting_armor: {
      slots: [3],
      verb: 'blocks',
      useTip: 'Passive — deflects bullets and blocks on-hit procs so Afterburn barely stacks.',
      useTipDe: 'Passiv — verhindert Treffer-Effekte, Infernus kann Afterburn kaum noch auslösen.',
    },
    upgrade_spirit_bubble: {
      slots: [3],
      verb: 'absorbs',
    },
    upgrade_healbane: {
      slots: [1, 4],
      verb: 'cuts_heal',
    },
  },
  hero_ghost: {
    upgrade_healbane: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_rupture: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_targeted_silence: {
      slots: [4],
      verb: 'silences',
      useTip: 'Hold Silence until Lady Geist drops low so she CANNOT cast Soul Exchange.',
      useTipDe: 'Aufheben, bis Lady Geist wenig HP hat. Dann kann sie Soul Exchange nicht nutzen.',
    },
    upgrade_focus_lens: {
      slots: [4],
      verb: 'silences',
      useTip: 'Cast as Lady Geist hits low HP to lock out Soul Exchange and burst her down.',
      useTipDe: 'Bei wenig HP auf Lady Geist drücken, um Soul Exchange zu sperren und sie zu erledigen.',
    },
    upgrade_reduce_debuff_duration: {
      slots: [3],
      verb: 'cleanses',
      useTip: 'Cleanse stacked Malice shards before she lands an Essence Bomb nuke.',
      useTipDe: 'Malice-Stacks früh entfernen, bevor ihre Essence Bomb einschlägt.',
    },
    upgrade_restorative_locket: {
      slots: [3, 1],
      verb: 'punishes',
    },
  },
  hero_lash: {
    upgrade_containment: {
      slots: [2],
      verb: 'controls',
      useTip: 'Cast before Lash can Grapple up for Ground Strike or escape.',
      useTipDe: 'Drücken, bevor Lash sich per Grapple hochzieht oder flüchtet.',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
      useTip: 'Cast the instant Lash leaps up for Death Slam before he throws your team.',
      useTipDe: 'Sofort werfen, sobald Lash für Death Slam hochspringt.',
    },
    upgrade_counterspell: {
      slots: [4, 1],
      verb: 'parries',
      useTip: 'Tap Parry right as Death Slam grabs you or Ground Strike slams down.',
      useTipDe: 'Genau beim Griff von Death Slam oder beim Aufprall von Ground Strike parieren.',
    },
    upgrade_self_bubble: {
      slots: [4, 1],
      verb: 'blocks',
    },
    upgrade_spellbreaker: {
      slots: [1],
      verb: 'mitigates',
    },
  },
  hero_synth: {
    upgrade_divine_barrier: {
      slots: [4],
      verb: 'cleanses',
      useTip: 'One of the few cleanses that purges Pocket\'s Affliction ultimate off you or an ally.',
      useTipDe: 'Eins der wenigen Items, das Pockets Affliction von dir oder Teammates entfernt.',
    },
    upgrade_counterspell: {
      slots: [4, 3],
      verb: 'parries',
      useTip: 'Tap Parry right as Pocket pops Affliction or exits Enchanter\'s Satchel.',
      useTipDe: 'Genau beim Wirken von Affliction oder beim Platzen von Enchanter\'s Satchel parieren.',
    },
    upgrade_containment: {
      slots: [2],
      verb: 'controls',
    },
    upgrade_targeted_silence: {
      slots: [3, 2],
      verb: 'silences',
    },
    upgrade_tech_purge: {
      slots: [4],
      verb: 'mitigates',
      useTip: 'Passive — strongest reliable mitigation against Pocket\'s Affliction DoT.',
      useTipDe: 'Passiv — der zuverlässigste Schutz gegen Pockets Affliction-Schaden.',
    },
    upgrade_focus_lens: {
      slots: [3, 2],
      verb: 'silences',
    },
  },
  hero_shiv: {
    upgrade_healbane: {
      slots: [3],
      verb: 'cuts_heal',
    },
    upgrade_reduce_debuff_duration: {
      slots: [1],
      verb: 'cleanses',
      useTip: 'Cleanse stacked Serrated Knives bleeds before you drop into Killing Blow execute range.',
      useTipDe: 'Stacks von Serrated Knives entfernen, bevor du unter die Killing-Blow-Schwelle fällst.',
    },
    upgrade_containment: {
      slots: [2, 4],
      verb: 'controls',
    },
    upgrade_rupture: {
      slots: [3],
      verb: 'cuts_heal',
    },
    upgrade_glitch: {
      slots: [3, 4],
      verb: 'silences',
    },
    upgrade_cheat_death: {
      slots: [4],
      verb: 'survives',
      useTip: 'Passive — survive the lethal hit so Shiv cannot reset Killing Blow off your death.',
      useTipDe: 'Passiv — überlebt den tödlichen Treffer, damit Shiv Killing Blow nicht über deinen Tod zurücksetzt.',
    },
  },
  hero_krill: {
    upgrade_vex_barrier: {
      slots: [4],
      verb: 'absorbs',
    },
    upgrade_rescue_beam: {
      slots: [4],
      verb: 'rescues',
      useTip: 'Cast on a teammate caught in Combo and press Pull immediately.',
      useTipDe: 'Auf einen gefangenen Teammate setzen und sofort ziehen, um die Combo abzubrechen.',
    },
    upgrade_unstoppable: {
      slots: [4, 3],
      verb: 'blocks',
      useTip: 'Pop proactively right before Mo & Krill burrows onto you (cannot press while grabbed).',
      useTipDe: 'Kurz bevor Mo & Krill aus Burrow auftaucht zünden. Im Griff geht es nicht mehr.',
    },
    upgrade_auto_cleanse: {
      slots: [4, 3],
      verb: 'cleanses',
    },
    upgrade_rupture: {
      slots: [1],
      verb: 'cuts_heal',
    },
    upgrade_toxic_bullets: {
      slots: [1],
      verb: 'cuts_heal',
    },
  },
  hero_warden: {
    upgrade_reduce_debuff_duration: {
      slots: [3, 1],
      verb: 'cleanses',
      useTip: 'Press as soon as Binding Word lands to erase the cage before it roots you.',
      useTipDe: 'Sofort bei Binding Word drücken, um den Käfig vor dem Root zu entfernen.',
    },
    upgrade_warp_stone: {
      slots: [3],
      verb: 'escapes',
      useTip: 'Blink cleanly outside Binding Word\'s radius before the timer expires.',
      useTipDe: 'Rechtzeitig aus dem Radius von Binding Word teleportieren, bevor der Root greift.',
    },
    upgrade_vex_barrier: {
      slots: [3],
      verb: 'absorbs',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
      useTip: 'Cast during Warden\'s 2s Last Stand windup before his heal pulses start.',
      useTipDe: 'In den 2 Sekunden werfen, in denen Last Stand auflädt, bevor die Heilung startet.',
    },
    upgrade_rupture: {
      slots: [4],
      verb: 'cuts_heal',
    },
  },
  hero_wraith: {
    upgrade_metal_skin: {
      slots: [3],
      verb: 'blocks',
    },
    upgrade_greater_withering_whip: {
      slots: [3, 1],
      verb: 'disarms',
      useTip: 'Disarm during Full Auto so Wraith cannot shoot OR charge Card Trick.',
      useTipDe: 'Während Full Auto entwaffnen. Dann macht sie keinen Waffenschaden und lädt keine Karten auf.',
    },
    upgrade_counterspell: {
      slots: [4],
      verb: 'parries',
      useTip: 'Tap Parry right before Telekinesis lifts you to cancel her pick combo.',
      useTipDe: 'Kurz bevor Telekinesis trifft parieren, um ihre Combo zu blocken.',
    },
    upgrade_vex_barrier: {
      slots: [4],
      verb: 'absorbs',
    },
    upgrade_deflecting_armor: {
      slots: [3, 1],
      verb: 'blocks',
    },
  },
  hero_yamato: {
    upgrade_counterspell: {
      slots: [1],
      verb: 'parries',
      useTip: 'Tap Parry right as Yamato releases charged Power Slash to negate the nuke and heal.',
      useTipDe: 'Genau beim Loslassen von Power Slash parieren. Blockt den Treffer und heilt dich.',
    },
    upgrade_containment: {
      slots: [2],
      verb: 'controls',
    },
    upgrade_targeted_silence: {
      slots: [4],
      verb: 'silences',
      useTip: 'Silence Yamato before she can press Shadow Transformation to finish her.',
      useTipDe: 'Yamato sperren, bevor sie Shadow Transformation drücken kann.',
    },
    upgrade_spellbreaker: {
      slots: [1],
      verb: 'mitigates',
    },
    upgrade_healbane: {
      slots: [3, 4],
      verb: 'cuts_heal',
    },
  },
  hero_dynamo: {
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
      useTip: 'Stay outside Singularity pull radius and cast immediately to save your team.',
      useTipDe: 'Außerhalb des Radius von Singularity bleiben und sofort werfen, um dein Team zu retten.',
    },
    upgrade_unstoppable: {
      slots: [4],
      verb: 'blocks',
    },
    upgrade_glitch: {
      slots: [4, 2],
      verb: 'cancels',
      useTip: 'Cancels Singularity instantly and blocks Refresher / Quantum Entanglement.',
      useTipDe: 'Bricht Singularity sofort ab und verhindert Refresher und Quantum Entanglement.',
    },
  },
  hero_viper: {
    upgrade_return_fire: {
      verb: 'reflects',
      mechanicFallback: 'bullet_dps',
      useTip: 'Pop as Vyper slides in spraying — her rapid fire shreds her own low HP pool.',
      useTipDe: 'Zünden, sobald Vyper auf dich zurutscht. Ihre hohe Feuerrate schadet ihren wenigen HP.',
    },
    upgrade_metal_skin: {
      verb: 'blocks',
      mechanicFallback: 'bullet_dps',
    },
    upgrade_greater_withering_whip: {
      verb: 'disarms',
      mechanicFallback: 'bullet_dps',
    },
    upgrade_deflecting_armor: {
      verb: 'blocks',
      mechanicFallback: 'bullet_dps',
    },
    upgrade_reduce_debuff_duration: {
      slots: [2],
      verb: 'cleanses',
      useTip: 'Cleanse Lethal Venom before the delayed spirit nuke triggers.',
      useTipDe: 'Lethal Venom entfernen, bevor der verzögerte Schaden auslöst.',
    },
  },
  hero_mirage: {
    upgrade_reduce_debuff_duration: {
      slots: [3],
      verb: 'cleanses',
      useTip: 'Cleanse high Djinn\'s Mark stacks right before Mirage detonates them.',
      useTipDe: 'Viele Djinn\'s-Mark-Stacks entfernen, kurz bevor Mirage sie auslösen will.',
    },
    upgrade_deflecting_armor: {
      slots: [3],
      verb: 'blocks',
    },
    upgrade_withering_whip: {
      slots: [3],
      verb: 'weakens',
    },
  },
  hero_frank: {
    upgrade_rupture: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_toxic_bullets: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_healbane: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_tech_purge: {
      slots: [3],
      verb: 'mitigates',
    },
    upgrade_spirit_burn: {
      slots: [2, 4],
      verb: 'cuts_heal',
    },
  },
  hero_viscous: {
    upgrade_healbane: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_containment: {
      slots: [3],
      verb: 'controls',
    },
    upgrade_glitch: {
      slots: [2, 4],
      verb: 'silences',
    },
    upgrade_capacitor: {
      slots: [3, 4],
      verb: 'controls',
    },
  },
  hero_nano: {
    upgrade_melee_rebuttal: {
      slots: [2],
      verb: 'punishes',
    },
    upgrade_containment: {
      slots: [2, 3],
      verb: 'controls',
    },
    upgrade_targeted_silence: {
      slots: [4, 2],
      verb: 'silences',
    },
    upgrade_glitch: {
      slots: [4, 3],
      verb: 'silences',
    },
  },
  hero_punkgoat: {
    upgrade_melee_rebuttal: {
      slots: [1],
      verb: 'punishes',
      useTip: 'Parry Billy\'s heavy melees / Bashdown to deny Blasted ammo procs and chunk him.',
      useTipDe: 'Billys schwere Nahkampfschläge und Bashdown parieren. Das verhindert Blasted und bestraft ihn.',
    },
    upgrade_vex_barrier: {
      slots: [4, 2],
      verb: 'absorbs',
    },
    upgrade_warp_stone: {
      slots: [4, 1],
      verb: 'escapes',
    },
    upgrade_unstoppable: {
      slots: [4, 2],
      verb: 'blocks',
    },
  },
  hero_vampirebat: {
    upgrade_containment: {
      slots: [2],
      verb: 'controls',
      useTip: 'Cast early to lock out Sanguine Retreat dashes and delete her tiny HP bar.',
      useTipDe: 'Früh drücken, um Sanguine Retreat zu sperren. Dann schaltest du ihre wenigen HP schnell aus.',
    },
    upgrade_cold_front: {
      verb: 'bursts',
      mechanicFallback: 'low_hp',
    },
    upgrade_targeted_silence: {
      slots: [2, 4],
      verb: 'silences',
    },
    upgrade_focus_lens: {
      slots: [2, 4],
      verb: 'silences',
      useTip: 'Silence Sanguine Retreat and unload burst — echoes damage to delete Mina.',
      useTipDe: 'Sperrt Sanguine Retreat und wiederholt deinen Schaden. Mina stirbt sofort.',
    },
    upgrade_deflecting_armor: {
      slots: [3],
      verb: 'blocks',
    },
  },
  hero_forge: {
    upgrade_return_fire: {
      slots: [1],
      verb: 'reflects',
      mechanicFallback: 'bullet_dps',
    },
    upgrade_healbane: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
    },
    upgrade_metal_skin: {
      verb: 'blocks',
      mechanicFallback: 'bullet_dps',
    },
  },
  hero_kelvin: {
    upgrade_cardio_calibrator: {
      slots: [3, 1],
      verb: 'escapes',
    },
    upgrade_target_stun: {
      slots: [3],
      verb: 'cancels',
      extraGroup: { verb: 'grounds', slots: [2] },
    },
    upgrade_healbane: {
      slots: [1, 4],
      verb: 'cuts_heal',
    },
  },
  hero_astro: {
    upgrade_vex_barrier: {
      slots: [4],
      verb: 'absorbs',
    },
    upgrade_counterspell: {
      slots: [4, 1],
      verb: 'parries',
    },
    upgrade_unstoppable: {
      slots: [4],
      verb: 'blocks',
    },
    upgrade_rescue_beam: {
      slots: [4],
      verb: 'rescues',
    },
  },
  hero_chrono: {
    upgrade_vex_barrier: {
      slots: [3],
      verb: 'absorbs',
    },
    upgrade_counterspell: {
      slots: [3, 4],
      verb: 'parries',
    },
    upgrade_warp_stone: {
      slots: [4],
      verb: 'escapes',
    },
    upgrade_rescue_beam: {
      slots: [4],
      verb: 'rescues',
    },
  },
  hero_magician: {
    upgrade_debuff_reducer: {
      slots: [3],
      verb: 'shortens',
      useTip: 'Passive — cuts Rabbit Hex duration by 25% (active cleanses cannot be pressed while hexed).',
      useTipDe: 'Passiv — verkürzt Rabbit Hex um 25 %. Aktive Cleanses gehen im Hex nicht.',
    },
    upgrade_counterspell: {
      slots: [3, 1],
      verb: 'parries',
      useTip: 'Tap Parry right before Rabbit Hex or Vexing Bolt hits to block the polymorph.',
      useTipDe: 'Kurz vor dem Einschlag von Rabbit Hex oder Vexing Bolt parieren.',
    },
    upgrade_spellbreaker: {
      slots: [1, 3],
      verb: 'mitigates',
    },
    upgrade_vex_barrier: {
      slots: [3],
      verb: 'absorbs',
    },
  },
  hero_deadpack: {
    upgrade_target_stun: {
      slots: [2],
      verb: 'grounds',
    },
    upgrade_phantom_strike: {
      slots: [2],
      verb: 'grounds',
      extraGroup: { verb: 'disarms', slots: [3] },
    },
    upgrade_metal_skin: {
      slots: [3],
      verb: 'blocks',
    },
  },
  hero_doorman: {
    upgrade_counterspell: {
      slots: [1, 3, 4],
      verb: 'parries',
    },
    upgrade_spellbreaker: {
      slots: [1, 4],
      verb: 'mitigates',
    },
    upgrade_vex_barrier: {
      slots: [3, 4],
      verb: 'absorbs',
    },
  },
  hero_priest: {
    upgrade_metal_skin: {
      slots: [4],
      verb: 'blocks',
    },
    upgrade_greater_withering_whip: {
      slots: [4],
      verb: 'disarms',
    },
    upgrade_vex_barrier: {
      slots: [3, 2],
      verb: 'absorbs',
    },
  },
  hero_fencer: {
    upgrade_melee_rebuttal: {
      slots: [3],
      verb: 'punishes',
    },
    upgrade_containment: {
      slots: [3, 1],
      verb: 'controls',
    },
    upgrade_targeted_silence: {
      slots: [2, 4],
      verb: 'silences',
    },
    upgrade_counterspell: {
      slots: [4],
      verb: 'parries',
    },
    upgrade_glitch: {
      slots: [2, 3],
      verb: 'silences',
    },
  },
  hero_unicorn: {
    upgrade_spirit_bubble: {
      slots: [3, 2],
      verb: 'absorbs',
    },
    upgrade_reduce_debuff_duration: {
      slots: [2, 1],
      verb: 'cleanses',
      useTip: 'Purges Dazzling Trick silence & Light Eater (note: cannot purge Shining Wonder ult).',
      useTipDe: 'Entfernt die Silence von Dazzling Trick und Light Eater. Hilft nicht gegen Shining Wonder.',
    },
    upgrade_spellbreaker: {
      slots: [3, 4],
      verb: 'mitigates',
    },
    upgrade_glitch: {
      slots: [2],
      verb: 'strips',
    },
  },
  hero_drifter: {
    upgrade_reduce_debuff_duration: {
      slots: [2],
      verb: 'cleanses',
    },
    upgrade_melee_rebuttal: {
      slots: [1],
      verb: 'punishes',
    },
    upgrade_warp_stone: {
      slots: [4],
      verb: 'escapes',
    },
    upgrade_greater_withering_whip: {
      verb: 'disarms',
      mechanicFallback: 'bullet_dps',
    },
    upgrade_metal_skin: {
      slots: [4],
      verb: 'blocks',
    },
  },
  hero_necro: {
    upgrade_spirit_bubble: {
      slots: [2, 1],
      verb: 'absorbs',
    },
    upgrade_vex_barrier: {
      slots: [2],
      verb: 'absorbs',
    },
    upgrade_tech_purge: {
      slots: [2, 3],
      verb: 'mitigates',
    },
    upgrade_absorbing_armor: {
      slots: [1, 2],
      verb: 'punishes',
    },
  },
  hero_tengu: {
    upgrade_healbane: {
      slots: [2, 3],
      verb: 'cuts_heal',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'grounds',
    },
    upgrade_vex_barrier: {
      slots: [3],
      verb: 'absorbs',
    },
    upgrade_rupture: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_glitch: {
      slots: [3, 4],
      verb: 'silences',
    },
  },
  hero_nurse: {
    upgrade_healbane: {
      slots: [3, 1],
      verb: 'cuts_heal',
    },
    upgrade_reduce_debuff_duration: {
      slots: [1],
      verb: 'cleanses',
    },
    upgrade_rupture: {
      slots: [3, 1],
      verb: 'cuts_heal',
    },
    upgrade_spirit_burn: {
      slots: [3, 1],
      verb: 'cuts_heal',
    },
  },
  hero_bookworm: {
    upgrade_healbane: {
      slots: [4],
      verb: 'cuts_heal',
    },
    upgrade_restorative_locket: {
      slots: [1, 2],
      verb: 'punishes',
    },
    upgrade_targeted_silence: {
      slots: [2, 4],
      verb: 'silences',
    },
    upgrade_glitch: {
      slots: [2],
      verb: 'strips',
      extraGroup: { verb: 'silences', slots: [4] },
    },
  },
  hero_ratking: {
    upgrade_reduce_debuff_duration: {
      slots: [2],
      verb: 'cleanses',
    },
    upgrade_debuff_reducer: {
      slots: [2],
      verb: 'shortens',
    },
    upgrade_glitch: {
      slots: [3],
      verb: 'strips',
      extraGroup: { verb: 'silences', slots: [1, 2] },
    },
  },
  hero_familiar: {
    upgrade_healbane: {
      slots: [2],
      verb: 'cuts_heal',
    },
    upgrade_vex_barrier: {
      slots: [4, 1],
      verb: 'absorbs',
    },
    upgrade_containment: {
      slots: [2],
      verb: 'controls',
    },
    upgrade_unstoppable: {
      slots: [4, 1],
      verb: 'blocks',
    },
    upgrade_auto_cleanse: {
      slots: [4],
      verb: 'cleanses',
    },
  },
  hero_werewolf: {
    upgrade_melee_rebuttal: {
      slots: [2],
      verb: 'punishes',
    },
    upgrade_withering_whip: {
      slots: [1],
      verb: 'weakens',
    },
    upgrade_greater_withering_whip: {
      slots: [1, 4],
      verb: 'disarms',
    },
    upgrade_metal_skin: {
      slots: [1, 4],
      verb: 'blocks',
    },
    upgrade_reduce_debuff_duration: {
      slots: [3, 7, 6],
      verb: 'cleanses',
    },
    upgrade_deflecting_armor: {
      slots: [1, 4],
      verb: 'blocks',
    },
    upgrade_healbane: {
      slots: [4, 5],
      verb: 'cuts_heal',
    },
    upgrade_toxic_bullets: {
      slots: [4, 5],
      verb: 'cuts_heal',
    },
    upgrade_unstoppable: {
      slots: [7, 3],
      verb: 'blocks',
    },
  },
  hero_chessmaster: {
    upgrade_cardio_calibrator: {
      slots: [1, 3],
      verb: 'escapes',
    },
    upgrade_vex_barrier: {
      slots: [3],
      verb: 'absorbs',
    },
    upgrade_reduce_debuff_duration: {
      slots: [3, 1],
      verb: 'cleanses',
    },
    upgrade_glitch: {
      slots: [2],
      verb: 'strips',
      extraGroup: { verb: 'silences', slots: [3] },
    },
  },
  hero_artist: {
    upgrade_restorative_locket: {
      slots: [1, 2],
      verb: 'punishes',
    },
    upgrade_debuff_reducer: {
      slots: [3, 4],
      verb: 'shortens',
    },
    upgrade_reduce_debuff_duration: {
      slots: [3, 2],
      verb: 'cleanses',
      useTip: 'Purges Still Life tether & Flow State slow (note: cannot purge Abstract Landscape ult).',
      useTipDe: 'Entfernt die Fessel von Still Life und die Verlangsamung von Flow State. Hilft nicht gegen Abstract Landscape.',
    },
    upgrade_tech_purge: {
      slots: [2, 3, 4],
      verb: 'mitigates',
    },
    upgrade_targeted_silence: {
      slots: [2, 4],
      verb: 'silences',
    },
    upgrade_unstoppable: {
      slots: [3, 4],
      verb: 'blocks',
    },
  },
  hero_baba: {
    upgrade_vex_barrier: {
      slots: [3, 4],
      verb: 'absorbs',
    },
    upgrade_target_stun: {
      slots: [4],
      verb: 'cancels',
      useTip: 'Interrupt Feed The Birds from safe range before the pigeon hex finishes.',
      useTipDe: 'Feed The Birds aus sicherer Entfernung abbrechen, bevor der Tauben-Fluch wirkt.',
    },
    upgrade_reduce_debuff_duration: {
      slots: [3],
      verb: 'cleanses',
      useTip: 'Cleanses Baba\'s Brew silence/burn immediately (note: cannot purge Feed The Birds ult).',
      useTipDe: 'Entfernt Silence und Brand von Baba\'s Brew sofort. Hilft nicht gegen Feed The Birds.',
    },
    upgrade_tech_purge: {
      slots: [1, 3, 4],
      verb: 'mitigates',
    },
    upgrade_glitch: {
      slots: [4],
      verb: 'cancels',
      extraGroup: { verb: 'strips', slots: [3] },
    },
    upgrade_unstoppable: {
      slots: [4, 3],
      verb: 'blocks',
    },
  },
};
