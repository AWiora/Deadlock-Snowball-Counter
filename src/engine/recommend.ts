import { COUNTER_ITEM_RULES, HERO_SPECIFIC_COUNTERS } from '../data/counterItems';
import { getHeroProfile } from '../data/heroProfiles';
import { KIT_AMPLIFIER_RULES } from '../data/kitAmplifiers';
import {
  HERO_HEADLINES_DE,
  HERO_OVERRIDE_TIPS_DE,
  ITEM_CONTEXT_TIPS_DE,
  ITEM_COPY_DE,
} from '../i18n/contentDe';
import { getHeroDisplayName, getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type {
  CounterItemRule,
  CounterRecommendation,
  CounterRole,
  CounterStance,
  DeadlockHero,
  DeadlockItem,
  EnemyCounterReason,
  EnemyModifier,
  EnemyTargetConfig,
  HeroKitCounter,
  Language,
  MatchupInput,
  PlayerAffinity,
  RecommendationResult,
  ThreatMechanic,
  UpgradeHint,
} from '../types/deadlock';

export function getBaseKitTags(heroClassName: string, lang: Language = 'de'): string[] {
  const profile = getHeroProfile(heroClassName);
  const dict = UI_TEXT[lang].threats;
  return profile.threats.slice(0, 4).map((t) => dict[t]);
}

/**
 * Upgrade lineages: if both a component and its upgrade score well for the same stage,
 * keep only the higher-scoring one so the top picks aren't redundant, and expose the build path hint.
 */
const UPGRADE_FAMILIES: string[][] = [
  ['upgrade_withering_whip', 'upgrade_greater_withering_whip'], // Rusted Barrel -> Disarming Hex
  ['upgrade_debuff_reducer', 'upgrade_reduce_debuff_duration'], // Debuff Reducer -> Dispel Magic
  ['upgrade_guardian_ward', 'upgrade_divine_barrier'], // Guardian Ward -> Divine Barrier
  ['upgrade_weapon_shielding', 'upgrade_improved_bullet_armor'],
  ['upgrade_spirit_bubble', 'upgrade_tech_purge'],
  ['upgrade_magic_vulnerability', 'upgrade_escalating_exposure'],
  ['upgrade_headshot_booster', 'upgrade_headhunter'], // Headshot Booster -> Headhunter
  ['upgrade_headshot_booster2', 'upgrade_banshee_slugs'],
  ['upgrade_magic_burst', 'upgrade_magic_shock'], // Mystic Burst -> Tankbuster
  ['upgrade_cold_front', 'upgrade_arctic_blast'], // Cold Front -> Arctic Blast
  ['upgrade_magic_tempo', 'upgrade_cooldown_reduction', 'upgrade_transcendent_cooldown'], // Compress -> Superior -> Transcendent Cooldown
  ['upgrade_magic_reach', 'upgrade_tech_range'], // Mystic Expansion -> Greater Expansion
  ['upgrade_arcane_extension', 'upgrade_imbued_duration_extender'], // Duration Extender -> Superior Duration
  ['upgrade_extra_charge', 'upgrade_rapid_recharge'], // Extra Charge -> Rapid Recharge
];

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
  if (familyId === undefined) return null;
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
    };
  }
  return null;
}

const BULLET_ONLY_ITEMS = new Set([
  'upgrade_withering_whip',
  'upgrade_greater_withering_whip',
  'upgrade_weapon_shielding',
  'upgrade_regenerating_bullet_shield',
  'upgrade_return_fire',
  'upgrade_metal_skin',
  'upgrade_improved_bullet_armor',
  'upgrade_deflecting_armor',
  'upgrade_juggernaut',
  'upgrade_reinforcing_casings',
  'upgrade_suppressor',
]);

const SPIRIT_ONLY_ITEMS = new Set([
  'upgrade_spirit_bubble',
  'upgrade_magic_shield',
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
    contextTip: string | null;
    matchedTriggers: string[];
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
          overrideTip =
            lang === 'de'
              ? HERO_OVERRIDE_TIPS_DE[target.heroClass]?.[rule.className] ?? override.tip
              : override.tip;
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

      evals.push({
        heroClass: target.heroClass,
        score: enemyScore,
        isHeroSpecific,
        overrideTip,
        contextTip,
        matchedTriggers,
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

    // Build smart per-enemy reasons so multi-enemy picks explain EVERY countered hero without repeating boilerplate
    const explainEvals = counteredEvals.length > 0 ? counteredEvals : [bestEval];
    const hasAnySpecificReason = explainEvals.some(
      (e) => Boolean(e.overrideTip || e.contextTip),
    );
    const reasons: EnemyCounterReason[] = [];

    if (explainEvals.length === 1) {
      const e = explainEvals[0];
      if (e.overrideTip) {
        reasons.push({
          heroClasses: [e.heroClass],
          text: e.overrideTip,
          isHeroSpecific: true,
        });
      } else if (e.contextTip) {
        reasons.push({
          heroClasses: [e.heroClass],
          triggerSummary: e.matchedTriggers.join(' · ') || undefined,
          text: e.contextTip,
          isHeroSpecific: false,
        });
      } else {
        reasons.push({
          heroClasses: [e.heroClass],
          triggerSummary: e.matchedTriggers.join(' · ') || undefined,
          text: baseWhy,
          isHeroSpecific: false,
        });
      }
    } else if (!hasAnySpecificReason) {
      // Collapse shared general mechanics into one crisp line across all countered heroes (no duplicate text)
      const sharedTriggers = Array.from(
        new Set(explainEvals.flatMap((e) => e.matchedTriggers)),
      ).slice(0, 3);
      reasons.push({
        heroClasses: explainEvals.map((e) => e.heroClass),
        triggerSummary: sharedTriggers.join(' · ') || undefined,
        text: baseWhy,
        isHeroSpecific: false,
      });
    } else {
      // One crisp reason per countered enemy: curated override/context tip where available, dynamic mechanics otherwise
      for (const e of explainEvals) {
        if (e.overrideTip) {
          reasons.push({
            heroClasses: [e.heroClass],
            text: e.overrideTip,
            isHeroSpecific: true,
          });
        } else if (e.contextTip) {
          reasons.push({
            heroClasses: [e.heroClass],
            text: e.contextTip,
            isHeroSpecific: false,
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
          });
        }
      }
    }

    scored.push({
      item,
      stance: rule.stance,
      role: bestEval.roleOverride ?? rule.role,
      score: Math.round(combinedScore * 10) / 10,
      why: reasons[0]?.text ?? baseWhy,
      reasons,
      whenToUse: deCopy?.whenToUse ?? rule.whenToUse,
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

        const reasons: EnemyCounterReason[] = [];
        for (const group of abilityGroups.values()) {
          const ab = group[0].ability;
          const abName = lang === 'de' ? ab.abilityNameDe : ab.abilityName;
          const effect = lang === 'de' ? ab.effectDe : ab.effectEn;
          const triggers = Array.from(
            new Set(group.flatMap((g) => g.matchedTriggers)),
          ).slice(0, 3);
          reasons.push({
            heroClasses: group.map((g) => g.heroClass),
            triggerSummary: triggers.join(' · ') || undefined,
            text: uiDict.kitAmplifierReason(ampRule.axis, abName, myHeroDisplayName, effect),
            isHeroSpecific: false,
          });
        }

        const primaryAbility = enemyMatches[0].ability;
        const primaryAbilityName =
          lang === 'de' ? primaryAbility.abilityNameDe : primaryAbility.abilityName;

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
        'Vielseitige Bedrohung — nutze Schadensfokus und Extra-Toggles oben, um seinen Build gezielt zu kontern.'
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
