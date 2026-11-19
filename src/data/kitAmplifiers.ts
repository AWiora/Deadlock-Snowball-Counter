import type { KitAmplifierItemRule } from '../types/deadlock';

/**
 * Smart Kit-Amplifier catalog mapped to exact Deadlock Curiosity Shop class_names.
 * These items are ONLY recommended when YOUR selected hero has a built-in ability
 * that directly counters the enemy's primary threats or active build modifiers.
 *
 * Kept separate from COUNTER_ITEM_RULES so enemy-only empirical counterLifts do not
 * distort hero-specific kit amplifications.
 */
export const KIT_AMPLIFIER_RULES: KitAmplifierItemRule[] = [
  // ===================== COOLDOWN REDUCTION =====================
  {
    className: 'upgrade_magic_tempo', // Compress Cooldown (1600)
    axis: 'cooldown',
    isImbue: true,
    tierWeight: 1.0,
    threatAxisBonus: {
      ability_spam: 4,
      telegraphed_burst: 4,
      channeled_ult: 4,
      cleanseable_debuff: 4,
      hard_cc: 3,
    },
  },
  {
    className: 'upgrade_cooldown_reduction', // Superior Cooldown (3200)
    axis: 'cooldown',
    isImbue: false,
    tierWeight: 1.12,
    threatAxisBonus: {
      ability_spam: 4,
      telegraphed_burst: 4,
      channeled_ult: 4,
      cleanseable_debuff: 4,
      hard_cc: 3,
    },
  },
  {
    className: 'upgrade_transcendent_cooldown', // Transcendent Cooldown (6400)
    axis: 'cooldown',
    isImbue: false,
    tierWeight: 1.18,
    threatAxisBonus: {
      ability_spam: 4,
      telegraphed_burst: 4,
      channeled_ult: 4,
      cleanseable_debuff: 4,
      hard_cc: 3,
    },
  },

  // ===================== RANGE & RADIUS =====================
  {
    className: 'upgrade_magic_reach', // Mystic Expansion (800)
    axis: 'range',
    isImbue: true,
    tierWeight: 0.96,
    threatAxisBonus: {
      airborne: 6,
      long_range_poke: 6,
      high_mobility: 3,
      channeled_ult: 3,
    },
  },
  {
    className: 'upgrade_tech_range', // Greater Expansion (3200)
    axis: 'range',
    isImbue: false,
    tierWeight: 1.14,
    threatAxisBonus: {
      airborne: 6,
      long_range_poke: 6,
      high_mobility: 3,
      channeled_ult: 3,
    },
  },

  // ===================== DURATION =====================
  {
    className: 'upgrade_arcane_extension', // Duration Extender (1600)
    axis: 'duration',
    isImbue: true,
    tierWeight: 1.0,
    threatAxisBonus: {
      rapid_fire: 5,
      bullet_ult: 5,
      high_mobility: 4,
      heavy_healing: 4,
      hard_cc: 3,
    },
  },
  {
    className: 'upgrade_imbued_duration_extender', // Superior Duration (3200)
    axis: 'duration',
    isImbue: false,
    tierWeight: 1.12,
    threatAxisBonus: {
      rapid_fire: 5,
      bullet_ult: 5,
      high_mobility: 4,
      heavy_healing: 4,
      hard_cc: 3,
    },
  },

  // ===================== CHARGES =====================
  {
    className: 'upgrade_extra_charge', // Extra Charge (800)
    axis: 'charges',
    isImbue: false,
    tierWeight: 0.96,
    threatAxisBonus: {
      long_range_poke: 4,
      sustained_spirit: 4,
      close_range_dive: 4,
      airborne: 3,
    },
  },
  {
    className: 'upgrade_rapid_recharge', // Rapid Recharge (3200)
    axis: 'charges',
    isImbue: false,
    tierWeight: 1.12,
    threatAxisBonus: {
      long_range_poke: 4,
      sustained_spirit: 4,
      close_range_dive: 4,
      airborne: 3,
    },
  },

  // ===================== ABILITY RESETS (6400 ACTIVES) =====================
  {
    className: 'upgrade_ability_power_shard', // Echo Shard (6400, non-ult imbue)
    axis: 'echo',
    isImbue: true,
    tierWeight: 1.22,
    threatAxisBonus: {
      telegraphed_burst: 8,
      cleanseable_debuff: 8,
      airborne: 7,
      rapid_fire: 7,
      channeled_ult: 7,
      high_mobility: 7,
      hard_cc: 7,
      close_range_dive: 7,
    },
  },
  {
    className: 'upgrade_ability_refresher', // Refresher (6400, full kit / ult)
    axis: 'refresher',
    isImbue: false,
    tierWeight: 1.24,
    threatAxisBonus: {
      channeled_ult: 8,
      high_mobility: 8,
      airborne: 7,
      bullet_ult: 7,
      hard_cc: 7,
      telegraphed_burst: 7,
      close_range_dive: 7,
    },
  },

  // ===================== GAP-CLOSE / ENGAGE (3200 ACTIVE) =====================
  {
    className: 'upgrade_rocket_booster', // Majestic Leap (3200)
    axis: 'gap_close',
    isImbue: false,
    tierWeight: 1.15,
    threatAxisBonus: {
      airborne: 7,
      long_range_poke: 6,
      channeled_ult: 4,
      high_mobility: 3,
    },
  },
];
