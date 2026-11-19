import { COUNTER_ITEM_RULES, HERO_SPECIFIC_COUNTERS } from '../data/counterItems';
import { getHeroProfile } from '../data/heroProfiles';
import {
  HERO_HEADLINES_DE,
  HERO_OVERRIDE_TIPS_DE,
  ITEM_COPY_DE,
} from '../i18n/contentDe';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
import type {
  CounterItemRule,
  CounterRecommendation,
  DeadlockHero,
  DeadlockItem,
  EnemyModifier,
  Language,
  MatchupInput,
  PlayerAffinity,
  RecommendationResult,
} from '../types/deadlock';

export function getBaseKitTags(heroClassName: string, lang: Language = 'de'): string[] {
  const profile = getHeroProfile(heroClassName);
  const dict = UI_TEXT[lang].threats;
  return profile.threats.slice(0, 4).map((t) => dict[t]);
}

/**
 * Upgrade lineages: if both a component and its upgrade score well for the same stage,
 * keep only the higher-scoring one so the top 5 aren't redundant.
 */
const UPGRADE_FAMILIES: string[][] = [
  ['upgrade_withering_whip', 'upgrade_greater_withering_whip'], // Rusted Barrel -> Disarming Hex
  ['upgrade_debuff_reducer', 'upgrade_reduce_debuff_duration'], // Debuff Reducer -> Dispel Magic
  ['upgrade_guardian_ward', 'upgrade_divine_barrier'], // Guardian Ward -> Divine Barrier
  ['upgrade_weapon_shielding', 'upgrade_improved_bullet_armor'],
  ['upgrade_spirit_bubble', 'upgrade_tech_purge'],
  ['upgrade_magic_vulnerability', 'upgrade_escalating_exposure'],
  ['upgrade_headshot_booster2', 'upgrade_banshee_slugs'],
  ['upgrade_cold_front', 'upgrade_arctic_blast'], // Cold Front -> Arctic Blast
];

const UPGRADE_FAMILY_MAP = new Map<string, number>();
UPGRADE_FAMILIES.forEach((family, idx) => {
  family.forEach((className) => UPGRADE_FAMILY_MAP.set(className, idx));
});

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

export function recommendCounters(
  input: MatchupInput,
  itemsByClass: Map<string, DeadlockItem>,
  heroesByClass: Map<string, DeadlockHero>,
): RecommendationResult {
  const lang: Language = input.language ?? 'en';
  const enemyProfile = getHeroProfile(input.enemyHeroClass);
  const myProfile = input.myHeroClass ? getHeroProfile(input.myHeroClass) : null;
  const myHero = input.myHeroClass ? heroesByClass.get(input.myHeroClass) ?? null : null;
  const myHeroDisplayName = myHero ? getHeroDisplayName(myHero, lang) : null;

  const overrides = HERO_SPECIFIC_COUNTERS[input.enemyHeroClass] ?? [];
  const overrideMap = new Map(overrides.map((o) => [o.itemClassName, o]));

  const isOffMetaSpirit =
    input.damageProfile === 'spirit' && enemyProfile.defaultDamage === 'bullet';
  const isOffMetaBullet =
    input.damageProfile === 'bullet' && enemyProfile.defaultDamage === 'spirit';

  interface ScoredCandidate {
    item: DeadlockItem;
    rule: CounterItemRule;
    score: number;
    why: string;
    whenToUse: string;
    synergyNote: string | null;
    isHeroSpecific: boolean;
  }

  const scored: ScoredCandidate[] = [];

  for (const rule of COUNTER_ITEM_RULES) {
    const item = itemsByClass.get(rule.className);
    if (!item) continue;

    const stageMult = rule.stageFit[input.stage];
    if (stageMult <= 0.1) continue;

    let rawScore = 0;

    // 1. Damage profile alignment (Bullet / Equal / Spirit)
    if (rule.damageCounters) {
      rawScore += rule.damageCounters[input.damageProfile] ?? 0;
    }

    // 2. Explicit "Building Extra..." toggles (Tanky, Healing, CC, Melee)
    // Toggles start OFF by default; turning one ON is a strong user signal that they are stacking it.
    rawScore += getModifierMatchCount(rule, input.modifiers) * 2.0;

    // 3. Intrinsic enemy hero base-kit threat mechanics
    // Always active so you don't need to toggle toggles for a hero's natural kit.
    if (rule.threatCounters) {
      for (const threat of enemyProfile.threats) {
        let threatWeight = rule.threatCounters[threat] ?? 0;
        if (!threatWeight) continue;

        // Dampen gun-specific intrinsic threats if enemy went off-meta Spirit (and vice versa)
        if (
          isOffMetaSpirit &&
          (threat === 'rapid_fire' || threat === 'bullet_ult' || threat === 'on_hit_procs')
        ) {
          threatWeight *= 0.35;
        }
        if (
          isOffMetaBullet &&
          (threat === 'sustained_spirit' || threat === 'ability_spam')
        ) {
          threatWeight *= 0.45;
        }

        rawScore += threatWeight;
      }
    }

    // 4. Hero-specific hard-counter override
    let isHeroSpecific = false;
    let overrideTip: string | null = null;
    const override = overrideMap.get(rule.className);
    if (override && (!override.stages || override.stages.includes(input.stage))) {
      let overrideBonus = override.bonus;

      // Respect user's off-meta damage profile override
      if (input.damageProfile === 'spirit' && BULLET_ONLY_ITEMS.has(rule.className)) {
        overrideBonus *= 0.25;
      } else if (input.damageProfile === 'bullet' && SPIRIT_ONLY_ITEMS.has(rule.className)) {
        overrideBonus *= 0.25;
      }

      if (overrideBonus >= 14) {
        isHeroSpecific = true;
        overrideTip =
          lang === 'de'
            ? HERO_OVERRIDE_TIPS_DE[input.enemyHeroClass]?.[rule.className] ?? override.tip
            : override.tip;
      }
      rawScore += overrideBonus;
    }

    // Penalize pure bullet counters when user explicitly says enemy is Spirit (and vice versa)
    if (input.damageProfile === 'spirit' && BULLET_ONLY_ITEMS.has(rule.className)) {
      rawScore *= 0.45;
    }
    if (input.damageProfile === 'bullet' && SPIRIT_ONLY_ITEMS.has(rule.className)) {
      rawScore *= 0.45;
    }

    // 5. Your hero's kit affinity
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

    // Apply stage timing multiplier and kit-compatibility multiplier,
    // so incompatible proc items (e.g. Healbane on a non-spirit hero) drop cleanly.
    const finalScore = (rawScore * synergyMult + synergyDelta) * stageMult;

    if (finalScore < 14) continue;

    const deCopy = lang === 'de' ? ITEM_COPY_DE[rule.className] : undefined;

    scored.push({
      item,
      rule,
      score: Math.round(finalScore * 10) / 10,
      why: overrideTip ?? deCopy?.why ?? rule.why,
      whenToUse: deCopy?.whenToUse ?? rule.whenToUse,
      synergyNote,
      isHeroSpecific,
    });
  }

  // Sort highest score first; tie-break by hero-specific, then lower cost (faster power spike)
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
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

  // Count how many top-6 slots would have been Active items when activeSlotsFull is enabled
  let hiddenActiveCount = 0;
  let filtered = deduped;
  if (input.activeSlotsFull) {
    const topOffenseBefore = deduped.filter((c) => c.rule.stance === 'offense').slice(0, 3);
    const topDefenseBefore = deduped.filter((c) => c.rule.stance === 'defense').slice(0, 3);
    hiddenActiveCount = [...topOffenseBefore, ...topDefenseBefore].filter(
      (c) => c.item.isActive,
    ).length;
    filtered = deduped.filter((c) => !c.item.isActive);
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
        stance: c.rule.stance,
        rank: idx + 1,
        score: c.score,
        tierLabel,
        role: c.rule.role,
        why: c.why,
        whenToUse: c.whenToUse,
        synergyNote: c.synergyNote,
        isHeroSpecific: c.isHeroSpecific,
      };
    });
  };

  const offense = toRecommendations(
    filtered.filter((c) => c.rule.stance === 'offense').slice(0, 3),
  );
  const defense = toRecommendations(
    filtered.filter((c) => c.rule.stance === 'defense').slice(0, 3),
  );
  const recommendations = toRecommendations(filtered.slice(0, 5));

  // Determine recommended tactical stance (Offense vs Defense vs Balanced)
  const topOffScore = offense[0]?.score ?? 0;
  const topDefScore = defense[0]?.score ?? 0;
  const isGlassCannon =
    enemyProfile.threats.includes('fragile_glass_cannon') &&
    !input.modifiers.includes('tanky');

  let recommendedStance: 'offense' | 'defense' | 'balanced' = 'balanced';
  if (
    (isGlassCannon && topOffScore >= topDefScore - 8) ||
    topOffScore >= topDefScore + 12
  ) {
    recommendedStance = 'offense';
  } else if (topDefScore >= topOffScore + 12) {
    recommendedStance = 'defense';
  }

  const enemyHeroObj = heroesByClass.get(input.enemyHeroClass);
  const enemyDisplayName = enemyHeroObj
    ? getHeroDisplayName(enemyHeroObj, lang)
    : input.enemyHeroClass;
  const t = UI_TEXT[lang];
  const stanceReason =
    recommendedStance === 'offense'
      ? t.stanceReasonOffense(enemyDisplayName)
      : recommendedStance === 'defense'
        ? t.stanceReasonDefense(enemyDisplayName)
        : t.stanceReasonBalanced(enemyDisplayName);

  const enemyThreatHeadline =
    lang === 'de'
      ? HERO_HEADLINES_DE[input.enemyHeroClass] ??
        'Vielseitige Bedrohung — nutze Schadensfokus und Extra-Toggles oben, um seinen Build gezielt zu kontern.'
      : enemyProfile.threatHeadline;

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
