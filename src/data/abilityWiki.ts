/**
 * How each hero ability interacts with the counter items that react to CC, debuffs and healing,
 * taken from deadlock.wiki (the interaction hints under every ability, plus the interaction notes
 * for the partial ones; checked 2026-11-20). An ability missing here has no wiki hints yet: the
 * engine then falls back to ABILITY_TRAITS. A listed ability with [] interacts with none of them.
 *
 * reactiveBarrier  triggers Reactive Barrier
 * indomitable      its disable is prevented by Indomitable
 * unstoppable      its CC is suppressed by Unstoppable
 * dispel           its effect can be removed by Dispel Magic
 * divineBarrier    Divine Barrier prevents it (ultimate debuffs Dispel cannot touch)
 * debuffResist     its debuff duration is shortened by Debuff Resist
 * healingReduction its healing is cut by healing reduction (anti-heal)
 * slowingHex       disabled by Slowing Hex (movement silence)
 * platedArmor      its on-shot effect is prevented by Plated Armor
 */
export type WikiInteraction =
  | 'reactiveBarrier'
  | 'indomitable'
  | 'unstoppable'
  | 'dispel'
  | 'divineBarrier'
  | 'debuffResist'
  | 'healingReduction'
  | 'slowingHex'
  | 'platedArmor';

export const ABILITY_WIKI: Record<string, Partial<Record<number, WikiInteraction[]>>> = {
  hero_artist: {
    2: ['debuffResist', 'dispel', 'unstoppable'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'healingReduction', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_astro: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['slowingHex'],
    3: ['debuffResist', 'dispel', 'platedArmor', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_atlas: {
    1: ['healingReduction'],
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable', 'slowingHex'],
    3: ['healingReduction'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable', 'slowingHex'],
  },
  hero_baba: {
    1: ['debuffResist', 'dispel', 'platedArmor'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['unstoppable', 'divineBarrier'],
  },
  hero_bebop: {
    1: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable'],
    2: ['dispel'],
    3: ['reactiveBarrier', 'indomitable', 'unstoppable'],
    4: ['unstoppable'],
  },
  hero_bookworm: {
    1: ['dispel'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'healingReduction', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_chessmaster: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['slowingHex'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_chrono: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['debuffResist', 'dispel', 'unstoppable'],
    3: ['debuffResist', 'dispel', 'unstoppable'],
    4: ['reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_deadpack: {
    2: ['debuffResist', 'dispel', 'unstoppable'],
    3: ['debuffResist', 'dispel'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_doorman: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    3: ['reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_drifter: {
    1: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    2: ['debuffResist', 'dispel', 'slowingHex'],
    3: ['healingReduction'],
  },
  hero_dynamo: {
    1: ['debuffResist', 'unstoppable'],
    2: ['slowingHex'],
    3: ['healingReduction'],
    4: ['reactiveBarrier', 'unstoppable'],
  },
  hero_familiar: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['healingReduction', 'slowingHex'],
    3: ['healingReduction'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_fencer: {
    1: ['debuffResist', 'dispel', 'unstoppable', 'slowingHex'],
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    3: ['healingReduction', 'slowingHex'],
    4: ['reactiveBarrier', 'unstoppable', 'slowingHex'],
  },
  hero_forge: {
    2: ['healingReduction'],
    3: ['debuffResist', 'dispel', 'unstoppable'],
    4: ['debuffResist', 'unstoppable'],
  },
  hero_frank: {
    1: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable'],
    2: ['healingReduction'],
    3: ['dispel', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'platedArmor', 'unstoppable'],
  },
  hero_ghost: {
    2: ['debuffResist', 'healingReduction', 'dispel'],
    3: ['debuffResist', 'dispel', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_gigawatt: {
    1: ['dispel', 'unstoppable'],
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    3: ['debuffResist', 'dispel', 'platedArmor'],
  },
  hero_haze: {
    1: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
    3: ['debuffResist', 'dispel', 'platedArmor', 'unstoppable'],
  },
  hero_hornet: {
    1: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    2: ['platedArmor', 'slowingHex'],
    3: ['debuffResist', 'dispel'],
  },
  hero_inferno: {
    1: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable'],
    2: ['dispel', 'slowingHex'],
    3: ['debuffResist', 'dispel', 'platedArmor', 'unstoppable'],
    4: ['debuffResist', 'healingReduction', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_kelvin: {
    1: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable'],
    2: ['slowingHex'],
    3: ['dispel', 'unstoppable'],
    4: ['healingReduction', 'unstoppable'],
  },
  hero_krill: {
    1: ['debuffResist', 'healingReduction', 'dispel'],
    2: ['debuffResist', 'dispel', 'unstoppable'],
    3: ['debuffResist', 'dispel', 'unstoppable'],
    4: ['debuffResist', 'healingReduction', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_lash: {
    1: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    2: ['slowingHex'],
    3: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_magician: {
    1: ['debuffResist', 'dispel'],
    2: ['slowingHex'],
    3: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_mirage: {
    1: ['debuffResist', 'healingReduction', 'dispel'],
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable', 'slowingHex'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['slowingHex'],
  },
  hero_nano: {
    1: [],
    2: ['healingReduction', 'slowingHex'],
    3: ['slowingHex'],
    4: ['healingReduction', 'slowingHex'],
  },
  hero_necro: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    3: ['dispel', 'platedArmor'],
    4: ['debuffResist', 'unstoppable'],
  },
  hero_nurse: {
    4: ['debuffResist', 'indomitable', 'unstoppable'],
  },
  hero_orion: {
    2: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable', 'slowingHex'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_priest: {
    1: ['debuffResist', 'dispel'],
    2: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['platedArmor'],
  },
  hero_punkgoat: {
    1: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    2: ['slowingHex'],
    3: ['debuffResist', 'dispel', 'platedArmor'],
    4: ['reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_ratking: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['debuffResist', 'dispel'],
    4: ['debuffResist', 'unstoppable'],
  },
  hero_shiv: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['debuffResist', 'dispel', 'slowingHex'],
    3: ['healingReduction'],
    4: ['slowingHex'],
  },
  hero_synth: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['slowingHex'],
    3: ['debuffResist', 'dispel', 'unstoppable'],
    4: ['debuffResist', 'divineBarrier'],
  },
  hero_tengu: {
    1: ['unstoppable'],
    2: [],
    3: ['debuffResist', 'healingReduction', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'unstoppable', 'slowingHex'],
  },
  hero_unicorn: {
    1: ['debuffResist', 'healingReduction', 'dispel', 'platedArmor'],
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['debuffResist', 'unstoppable'],
  },
  hero_vampirebat: {
    1: ['healingReduction'],
    2: ['slowingHex'],
    3: ['debuffResist', 'dispel', 'platedArmor', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_viper: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['debuffResist', 'dispel', 'platedArmor'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_viscous: {
    1: ['dispel', 'unstoppable'],
    2: ['healingReduction'],
    3: ['debuffResist', 'healingReduction', 'dispel', 'unstoppable'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_warden: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    3: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable'],
    4: ['healingReduction'],
  },
  hero_werewolf: {
    2: ['debuffResist', 'reactiveBarrier', 'dispel', 'indomitable', 'unstoppable', 'slowingHex'],
    3: ['debuffResist', 'dispel', 'unstoppable'],
    4: ['healingReduction'],
  },
  hero_wraith: {
    1: ['debuffResist', 'healingReduction', 'dispel', 'platedArmor', 'unstoppable'],
    2: ['slowingHex'],
    3: ['platedArmor'],
    4: ['debuffResist', 'reactiveBarrier', 'indomitable', 'unstoppable'],
  },
  hero_yamato: {
    1: ['debuffResist', 'dispel', 'unstoppable'],
    2: ['debuffResist', 'dispel', 'unstoppable', 'slowingHex'],
    3: ['debuffResist', 'healingReduction', 'dispel'],
    4: ['healingReduction'],
  },
};

export function getWikiInteractions(heroClass: string, slot: number): readonly WikiInteraction[] | undefined {
  return ABILITY_WIKI[heroClass]?.[slot];
}
