export type Language = 'de' | 'en';
export type ItemSlot = 'weapon' | 'vitality' | 'spirit';
export type DamageProfile = 'bullet' | 'equal' | 'spirit';
export type GameStage = 'lane' | 'mid' | 'late';
export type PriceTier = '800' | '1600' | '3200' | '6400' | 'all';
export type EnemyModifier = 'tanky' | 'healing' | 'cc' | 'melee' | 'mobility';
export type CounterStance = 'offense' | 'defense';

export type CounterRole =
  | 'Shutdown'
  | 'Burst'
  | 'Survival'
  | 'Anti-Gun'
  | 'Anti-Spirit'
  | 'Anti-Heal'
  | 'Anti-Melee'
  | 'Shred'
  | 'Cleanse'
  | 'Control';

export type CounterActionVerb =
  | 'cancels'
  | 'grounds'
  | 'cleanses'
  | 'parries'
  | 'blocks'
  | 'absorbs'
  | 'reflects'
  | 'silences'
  | 'disarms'
  | 'cuts_heal'
  | 'shortens'
  | 'shreds'
  | 'punishes'
  | 'controls'
  | 'weakens'
  | 'escapes'
  | 'sustains'
  | 'mitigates'
  | 'strips'
  | 'bursts'
  | 'counters';

export type ThreatMechanic =
  | 'rapid_fire'
  | 'on_hit_procs'
  | 'bullet_ult'
  | 'channeled_ult'
  | 'airborne'
  | 'high_mobility'
  | 'fragile_glass_cannon'
  | 'cleanseable_debuff'
  | 'telegraphed_burst'
  | 'hard_cc'
  | 'ability_spam'
  | 'sustained_spirit'
  | 'heavy_healing'
  | 'melee_brawler'
  | 'buff_shield_stacker'
  | 'close_range_dive'
  | 'long_range_poke';

export interface DeadlockAbility {
  className: string;
  slot: 1 | 2 | 3 | 4;
  name: string;
  nameDe: string;
  icon: string;
  descEn: string;
  descDe: string;
  isUltimate: boolean;
}

export interface DeadlockHero {
  id: number;
  className: string;
  name: string;
  nameDe?: string;
  role: string;
  iconCard: string;
  iconSmall: string;
  minimapIcon: string;
  abilities?: DeadlockAbility[];
  metaDamage?: DamageProfile;
  metaWeaponPct?: number;
  /** Precomputed empirical counter lift multipliers [0.88..1.15] per item className */
  counterLifts?: Partial<Record<string, number>>;
}

/** Stat glyph key; the tooltip maps it to the matching Deadlock Wiki icon */
export type ItemStatIcon =
  | 'spirit_damage'
  | 'weapon_damage'
  | 'damage'
  | 'spirit_resist'
  | 'bullet_resist'
  | 'slow'
  | 'duration'
  | 'range'
  | 'cast_range'
  | 'cooldown'
  | 'healing'
  | 'health'
  | 'move_speed'
  | 'barrier'
  | 'fire_rate'
  | 'ammo'
  | 'melee'
  | 'souls';

export interface DeadlockItemStat {
  label: string;
  value: string;
  important?: boolean;
  elevated?: boolean;
  icon?: ItemStatIcon;
}

export interface DeadlockItemTooltipSection {
  type: 'innate' | 'passive' | 'active';
  desc?: string;
  cooldown?: string;
  stats: DeadlockItemStat[];
}

export interface DeadlockItem {
  id: number;
  className: string;
  name: string;
  nameDe?: string;
  slot: ItemSlot;
  tier: number;
  cost: number;
  isActive: boolean;
  icon: string;
  summary: string;
  cooldown?: string;
  tooltipEn?: DeadlockItemTooltipSection[];
  tooltipDe?: DeadlockItemTooltipSection[];
}

export interface DeadlockSnapshot {
  syncedAt: string;
  source: string;
  heroes: DeadlockHero[];
  items: DeadlockItem[];
}

export type BuiltInHeroTool =
  | 'invuln'
  | 'cleanse'
  | 'mobility_escape';

export type KitAmplifierAxis =
  | 'cooldown'
  | 'range'
  | 'duration'
  | 'charges'
  | 'echo'
  | 'refresher'
  | 'gap_close';

export interface HeroKitCounter {
  /** English ability name (e.g. "Hook", "The Cube") */
  abilityName: string;
  /** German ability name (e.g. "Greifhaken", "Heilwürfel") */
  abilityNameDe: string;
  /** Whether this ability counters the enemy offensively or defensively */
  stance: CounterStance;
  /** Tactical role fulfilled by this ability */
  role: CounterRole;
  /** Enemy primary base-kit threats this ability directly counters */
  countersThreats: ThreatMechanic[];
  /** Optional enemy build modifiers this ability directly counters */
  countersModifiers?: EnemyModifier[];
  /** Amplifier axes that empower this counter ability (most impactful first) */
  amplifiers: KitAmplifierAxis[];
  /** Whether this ability is an ultimate (Echo Shard only imbues non-ultimates) */
  isUltimate?: boolean;
  /** Concise English description of what the ability accomplishes as a counter */
  effectEn: string;
  /** Concise German description of what the ability accomplishes as a counter */
  effectDe: string;
}

export interface KitAmplifierItemRule {
  className: string;
  axis: KitAmplifierAxis;
  /** Whether this item is imbued onto a single specific ability */
  isImbue: boolean;
  /** Cross-tier preference weight (used when priceTier === 'all') */
  tierWeight: number;
  /** Extra affinity when the matched enemy threat benefits specifically from this axis */
  threatAxisBonus?: Partial<Record<ThreatMechanic, number>>;
}

export interface PlayerAffinity {
  damageStyle: 'gun' | 'spirit' | 'hybrid';
  range: 'close' | 'mid' | 'long';
  fastFirerate: boolean;
  spiritProccer: boolean;
  supportive?: boolean;
  /** Built-in defensive mechanics in the player's own hero kit (reduces redundant counter picks) */
  builtInTools?: BuiltInHeroTool[];
}

export interface HeroProfile {
  className: string;
  defaultDamage: DamageProfile;
  defaultModifiers: EnemyModifier[];
  /** Primary defining kit threats (full weight 1.0) */
  threats: ThreatMechanic[];
  /** Secondary/situational kit threats (reduced weight 0.45, prevents tag inflation) */
  secondaryThreats?: ThreatMechanic[];
  playerAffinity: PlayerAffinity;
  /** Built-in abilities in this hero's kit that directly counter enemy threats/modifiers */
  kitCounters?: HeroKitCounter[];
  threatHeadline: string;
}

export interface HeroAbilityThreatTag {
  /** Official Deadlock ability slot (1-4) on this hero */
  slot: 1 | 2 | 3 | 4;
  /** Threat mechanics directly produced by this ability */
  threats: ThreatMechanic[];
  /** Optional explicit modifiers this ability directly embodies */
  modifiers?: EnemyModifier[];
  /** False when this ability's debuff cannot be purged by Dispel Magic (ultimates are also skipped by default) */
  cleanseable?: boolean;
  /** True when this ability deals parryable melee damage (for Rebuttal) */
  parryableMelee?: boolean;
}

export interface HeroCounterOverride {
  itemClassName: string;
  bonus: number;
  stages?: GameStage[];
  roleOverride?: CounterRole;
  tip: string;
  /** Optional explicit countered ability slots on this hero for nuanced Deadlock edge cases */
  counteredSlots?: (1 | 2 | 3 | 4)[];
  /** Optional explicit action verb override */
  verbOverride?: CounterActionVerb;
  /** Optional matchup-specific English timing/interaction caveat for the "Use:" line */
  useTip?: string;
  /** Optional matchup-specific German timing/interaction caveat for the "Use:" line */
  useTipDe?: string;
}

export interface CounterItemRule {
  className: string;
  stance: CounterStance;
  role: CounterRole;
  /** Legacy game stage curve (optional — filtering is now driven by PriceTier / item cost) */
  stageFit?: Record<GameStage, number>;
  /** How strongly it counters specific damage profiles */
  damageCounters?: Partial<Record<DamageProfile, number>>;
  /** How strongly it counters the 4 user toggles */
  modifierCounters?: Partial<Record<EnemyModifier, number>>;
  /** How strongly it counters intrinsic hero threat mechanics */
  threatCounters?: Partial<Record<ThreatMechanic, number>>;
  /** Requirements/synergies with YOUR hero's kit */
  playerSynergy?: {
    preferDamageStyle?: 'gun' | 'spirit';
    preferFastFirerate?: boolean;
    preferSpiritProccer?: boolean;
    preferRange?: 'close' | 'mid' | 'long';
    penalizeLongRange?: boolean;
    penalizeNonSpiritProccer?: boolean;
    penalizeSlowFirerate?: boolean;
    preferSupportive?: boolean;
    /** Gently penalizes this item if your own hero already has this mechanic built in */
    redundantWithTool?: BuiltInHeroTool;
    /** Penalizes this item for specific player hero classes with kit anti-synergy (e.g. Lady Geist + Return Fire) */
    avoidHeroClasses?: string[];
  };
  /** Concise default "Why" explanation */
  why: string;
  /** Concise default "When to use" micro-tip */
  whenToUse: string;
  /** Optional targeted tips when specific threat/modifier triggered this item */
  contextTips?: Partial<Record<ThreatMechanic | EnemyModifier, string>>;
}

export interface EnemyTargetConfig {
  heroClass: string;
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
}

export interface UpgradeHint {
  direction: 'from' | 'to';
  itemClassName: string;
  itemName: string;
  cost: number;
  icon?: string;
}

export interface MatchupInput {
  myHeroClass: string | null;
  enemyHeroClass: string;
  priceTier: PriceTier;
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
  /** Optional 1-3 active enemy targets for multi-threat match scoring */
  enemyTargets?: EnemyTargetConfig[];
  activeSlotsFull: boolean;
  language?: Language;
  /** Separate display language for Deadlock item names (e.g. English shop names with German UI text) */
  itemLanguage?: Language;
}

export type CounterTargetChip =
  | {
      kind: 'ability';
      ability: DeadlockAbility;
      heroClass: string;
    }
  | {
      kind: 'mechanic';
      label: string;
      tone?: 'modifier' | 'damage' | 'threat';
      /** Weapon / spirit damage targets carry the in-game damage glyph; one chip per damage type */
      damageType?: DamageProfile;
    };

export interface CounterActionGroup {
  verb: CounterActionVerb;
  verbLabel: string;
  targets: CounterTargetChip[];
}

export interface KitAmplifierMeta {
  /** Player hero's own ability being empowered */
  ability: DeadlockAbility | null;
  /** Localized display name of the player's empowered ability */
  abilityName: string;
  /** Amplifier axis (cooldown, range, duration, charges, echo, refresher, gap_close) */
  axis: KitAmplifierAxis;
  /** Short localized boost text (e.g. "more range", "shorter cooldown") */
  boostLabel: string;
}

export interface EnemyCounterReason {
  /** Enemy hero covered by this line; always one per enemy so each portrait owns its targets */
  heroClasses: string[];
  /** Concise matched mechanics/toggles for general picks (e.g. "Kugeln · Hohe Feuerrate") */
  triggerSummary?: string;
  /** Concise explanation text (preserved for fallback & backward compatibility) */
  text: string;
  /** Whether this line is a curated hero-specific hard-counter tip */
  isHeroSpecific: boolean;
  /** Structured [Action Verb] + [Ability / Mechanic Chips] groups for scannable card display */
  actionGroups?: CounterActionGroup[];
}

export interface CounterRecommendation {
  item: DeadlockItem;
  stance: CounterStance;
  rank: number;
  score: number;
  tierLabel: 'Best Counter' | 'Core Counter' | 'Strong Pick';
  role: CounterRole;
  why: string;
  /** Structured per-enemy counter reasons for both 1-enemy and 2-3-enemy matchups */
  reasons: EnemyCounterReason[];
  whenToUse: string;
  synergyNote: string | null;
  isHeroSpecific: boolean;
  /** Whether this recommendation empowers your own hero's built-in counter ability */
  isKitAmplifier?: boolean;
  /** Structured metadata when this card is a Kit-Amplifier empowering your own hero's ability */
  kitAmplifier?: KitAmplifierMeta;
  /** Enemy hero classNames (from the selected 1-3 enemies) that this item meaningfully counters */
  counteredEnemies?: string[];
  /** Direct component or upgrade path hint (e.g. Rusted Barrel <-> Disarming Hex) */
  upgradeHint?: UpgradeHint | null;
}

export interface RecommendationResult {
  offense: CounterRecommendation[];
  defense: CounterRecommendation[];
  recommendations: CounterRecommendation[];
  recommendedStance: 'offense' | 'defense' | 'balanced';
  stanceReason: string;
  hiddenActiveCount: number;
  enemyThreatHeadline: string;
}
