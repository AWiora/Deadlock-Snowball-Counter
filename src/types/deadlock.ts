export type Language = 'de' | 'en';
export type ItemSlot = 'weapon' | 'vitality' | 'spirit';
export type DamageProfile = 'bullet' | 'equal' | 'spirit';
export type GameStage = 'lane' | 'mid' | 'late';
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

export interface DeadlockHero {
  id: number;
  className: string;
  name: string;
  nameDe?: string;
  role: string;
  iconCard: string;
  iconSmall: string;
  minimapIcon: string;
  metaDamage?: DamageProfile;
  metaWeaponPct?: number;
  /** Precomputed empirical counter lift multipliers [0.88..1.15] per item className */
  counterLifts?: Partial<Record<string, number>>;
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
  threatHeadline: string;
}

export interface HeroCounterOverride {
  itemClassName: string;
  bonus: number;
  stages?: GameStage[];
  roleOverride?: CounterRole;
  tip: string;
}

export interface CounterItemRule {
  className: string;
  stance: CounterStance;
  role: CounterRole;
  /** Which game stages this item shines in (1.0 = prime, lower = off-curve) */
  stageFit: Record<GameStage, number>;
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
}

export interface MatchupInput {
  myHeroClass: string | null;
  enemyHeroClass: string;
  stage: GameStage;
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
  /** Optional 1-3 active enemy targets for multi-threat match scoring */
  enemyTargets?: EnemyTargetConfig[];
  activeSlotsFull: boolean;
  language?: Language;
  /** Separate display language for Deadlock item names (e.g. English shop names with German UI text) */
  itemLanguage?: Language;
}

export interface EnemyCounterReason {
  /** Enemy hero className(s) covered by this line (1 per enemy, or multiple when collapsed into a shared general reason) */
  heroClasses: string[];
  /** Concise matched mechanics/toggles for general picks (e.g. "Kugeln · Hohe Feuerrate") */
  triggerSummary?: string;
  /** Concise explanation text */
  text: string;
  /** Whether this line is a curated hero-specific hard-counter tip */
  isHeroSpecific: boolean;
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
