import { describe, expect, it } from 'vitest';
import { getBundledSnapshot } from '../data/apiClient';
import { COUNTER_ITEM_RULES, HERO_SPECIFIC_COUNTERS } from '../data/counterItems';
import { getItemDamageFocus, HERO_ABILITY_TAGS, ITEM_ACTION_PROFILES } from '../data/heroAbilityTags';
import { HERO_PROFILES } from '../data/heroProfiles';
import { KIT_AMPLIFIER_RULES } from '../data/kitAmplifiers';
import { HERO_OVERRIDE_TIPS_DE, ITEM_COPY_DE } from '../i18n/contentDe';
import { abilityFitsDamageFocus, recommendCounters } from './recommend';
import { segmentTextWithAbilities } from '../utils/abilities';
import type { DeadlockHero, DeadlockItem, PriceTier } from '../types/deadlock';

const snapshot = getBundledSnapshot();
const itemsByClass = new Map<string, DeadlockItem>(
  snapshot.items.map((i) => [i.className, i]),
);
const heroesByClass = new Map<string, DeadlockHero>(
  snapshot.heroes.map((h) => [h.className, h]),
);

describe('Deadlock counter recommendation engine', () => {
  it('recommends Metal Skin / Disarming Hex at 3,200 Souls vs Haze (not generic random armor)', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );

    const names = res.recommendations.map((r) => r.item.name);
    expect(names[0]).toBe('Metal Skin');
    expect(names).toContain('Disarming Hex');
    expect(res.recommendations.every((r) => r.item.cost === 3200)).toBe(true);
  });

  it('recommends Plated Armor #1 at 6,400 Souls vs Haze', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_gigawatt',
        enemyHeroClass: 'hero_haze',
        priceTier: '6400',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );

    expect(res.recommendations[0].item.name).toBe('Plated Armor');
    expect(res.recommendations.every((r) => r.item.cost === 6400)).toBe(true);
  });

  it('filters out all Active items when Active Slots Full is enabled and reports hidden actives', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_haze',
        priceTier: '6400',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: true,
      },
      itemsByClass,
      heroesByClass,
    );

    expect(res.recommendations.length).toBeGreaterThanOrEqual(4);
    expect(res.recommendations.every((r) => !r.item.isActive)).toBe(true);
    expect(res.hiddenActiveCount).toBeGreaterThan(0);
    expect(res.recommendations.map((r) => r.item.name)).toContain('Plated Armor');
    expect(res.recommendations.map((r) => r.item.name)).toContain('Juggernaut');
  });

  it('adapts to off-meta Spirit Haze by promoting Spirit counters over Metal Skin', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );

    const top3 = res.recommendations.slice(0, 3).map((r) => r.item.name);
    expect(top3).not.toContain('Metal Skin');
    expect(top3.some((n) => ['Spirit Resilience', 'Counterspell', 'Silence Wave'].includes(n))).toBe(true);
  });

  it('recommends Knockdown #1 vs Vindicta and Seven at 3,200 Souls', () => {
    const vsVindicta = recommendCounters(
      {
        myHeroClass: 'hero_atlas',
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(vsVindicta.recommendations[0].item.name).toBe('Knockdown');

    const vsSeven = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_gigawatt',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(vsSeven.recommendations[0].item.name).toBe('Knockdown');
  });

  it('tailors anti-heal / anti-tank counters to YOUR hero kit (Gun vs Spirit)', () => {
    const gunPlayer = recommendCounters(
      {
        myHeroClass: 'hero_haze', // rapid-fire gun, non-spirit proccer
        enemyHeroClass: 'hero_atlas',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: ['tanky', 'healing'],
        activeSlotsFull: true,
      },
      itemsByClass,
      heroesByClass,
    );
    const gunNames = gunPlayer.recommendations.map((r) => r.item.name);
    expect(gunNames).toContain('Toxic Bullets');
    expect(gunNames).not.toContain('Tankbuster');

    const spiritPlayer = recommendCounters(
      {
        myHeroClass: 'hero_ghost', // Lady Geist: spirit proccer, slow gun
        enemyHeroClass: 'hero_atlas',
        priceTier: '1600',
        damageProfile: 'bullet',
        modifiers: ['tanky', 'healing'],
        activeSlotsFull: true,
      },
      itemsByClass,
      heroesByClass,
    );
    const spiritNames = spiritPlayer.recommendations.map((r) => r.item.name);
    expect(spiritNames).toContain('Healbane');
    expect(spiritNames).not.toContain('Weakening Headshot');
  });

  it('recommends Rebuttal at 800 Souls vs Abrams even with 0 extra build toggles clicked', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_atlas',
        priceTier: '800',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.recommendations[0].item.name).toBe('Rebuttal');
    expect(res.recommendations.every((r) => r.item.cost === 800)).toBe(true);
  });

  it('strictly shows 1,600-soul counters when 1600 tier is selected without 3,200 crowding', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_vampirebat',
        priceTier: '1600',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.offense.length).toBeGreaterThanOrEqual(2);
    expect(res.defense.length).toBeGreaterThanOrEqual(2);
    expect([...res.offense, ...res.defense].every((r) => r.item.cost === 1600)).toBe(true);
    expect(res.offense.map((r) => r.item.name)).toContain('Slowing Hex');
  });

  it('shows strongest cross-tier counters when priceTier is "all"', () => {
    const vsHaze = recommendCounters(
      {
        myHeroClass: 'hero_gigawatt',
        enemyHeroClass: 'hero_haze',
        priceTier: 'all',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(vsHaze.defense[0].item.name).toBe('Plated Armor');

    const vsVindicta = recommendCounters(
      {
        myHeroClass: 'hero_atlas',
        enemyHeroClass: 'hero_hornet',
        priceTier: 'all',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    const offenseNames = vsVindicta.offense.map((r) => r.item.name);
    expect(offenseNames).toContain('Phantom Strike'); // 6400 close-range synergy for Abrams
    expect(offenseNames).toContain('Knockdown'); // 3200 anti-air hard counter
  });

  it('boosts anti-heal when Heavy Healing extra toggle is clicked on a non-healer like Haze', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: ['healing'],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    const names = res.recommendations.map((r) => r.item.name);
    expect(names.some((n) => ['Decay', 'Toxic Bullets'].includes(n))).toBe(true);
  });

  it('returns German tactical copy and official German item names when language is de', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_kelvin',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.recommendations[0].item.nameDe).toBe('Metallhaut');
    expect(res.recommendations[0].why).toContain('Kugelhagel');
    expect(res.enemyThreatHeadline).toContain('Fixation');
  });

  it('recommends Offense / Shut Down focus vs low-HP glass cannon Mina and populates both Offense and Defense', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_kelvin',
        enemyHeroClass: 'hero_vampirebat',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.recommendedStance).toBe('offense');
    expect(res.offense.length).toBeGreaterThanOrEqual(1);
    expect(res.defense.length).toBeGreaterThanOrEqual(2);
    expect(res.defense.length).toBeLessThanOrEqual(3);
    const offenseNames = res.offense.map((r) => r.item.name);
    expect(offenseNames).toContain('Silence Wave');
  });

  it('handles unknown/newly-patched heroes gracefully', () => {
    const res = recommendCounters(
      {
        myHeroClass: null,
        enemyHeroClass: 'hero_future_patch_99',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: ['tanky', 'healing'],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.recommendations.length).toBeGreaterThanOrEqual(4);
  });

  it('covers all 44 live heroes with profiles, hard-counter overrides, and empirical lifts', () => {
    for (const hero of snapshot.heroes) {
      expect(HERO_PROFILES[hero.className], `Missing HERO_PROFILES for ${hero.name}`).toBeDefined();
      const overrides = HERO_SPECIFIC_COUNTERS[hero.className] ?? [];
      expect(
        overrides.length,
        `Missing HERO_SPECIFIC_COUNTERS for ${hero.name}`,
      ).toBeGreaterThanOrEqual(3);
      for (const ov of overrides) {
        expect(
          HERO_OVERRIDE_TIPS_DE[hero.className]?.[ov.itemClassName],
          `Missing German override tip for ${hero.className} -> ${ov.itemClassName}`,
        ).toBeDefined();
      }
      expect(
        Object.keys(hero.counterLifts ?? {}).length,
        `Missing empirical counterLifts for ${hero.name}`,
      ).toBeGreaterThan(0);
    }

    for (const rule of COUNTER_ITEM_RULES) {
      expect(itemsByClass.has(rule.className), `Rule ${rule.className} missing from snapshot`).toBe(
        true,
      );
      expect(ITEM_COPY_DE[rule.className], `Missing DE copy for ${rule.className}`).toBeDefined();
    }
  });

  it('passes quality invariants across all 44 heroes and all 5 price tiers (800, 1600, 3200, 6400, all)', () => {
    const tiers: PriceTier[] = ['800', '1600', '3200', '6400', 'all'];
    for (const hero of snapshot.heroes) {
      const profile = HERO_PROFILES[hero.className];
      for (const priceTier of tiers) {
        const res = recommendCounters(
          {
            myHeroClass: null,
            enemyHeroClass: hero.className,
            priceTier,
            damageProfile: profile.defaultDamage,
            modifiers: [],
            activeSlotsFull: false,
            language: 'de',
          },
          itemsByClass,
          heroesByClass,
        );

        // At 800 souls, some pure spirit/non-glass-cannon heroes legitimately have 0 true Offense counters
        if (priceTier !== '800') {
          expect(
            res.offense.length,
            `${hero.name} (${priceTier}) should have 1-3 offense counters`,
          ).toBeGreaterThanOrEqual(1);
        }
        expect(res.offense.length).toBeLessThanOrEqual(3);
        expect(
          res.defense.length,
          `${hero.name} (${priceTier}) should have 1-3 defense counters`,
        ).toBeGreaterThanOrEqual(1);
        expect(res.defense.length).toBeLessThanOrEqual(3);

        if (priceTier !== 'all') {
          const expectedCost = Number(priceTier);
          for (const rec of [...res.offense, ...res.defense]) {
            expect(rec.item.cost).toBe(expectedCost);
          }
        }

        // Enforce dynamic quality bar on 3rd slot (no weak filler)
        for (const list of [res.offense, res.defense]) {
          if (list.length === 3) {
            const topScore = list[0].score;
            const third = list[2];
            expect(
              third.score >= topScore * 0.6 || third.isHeroSpecific,
              `${hero.name} (${priceTier}) 3rd pick ${third.item.name} (${third.score}) below quality bar of top (${topScore})`,
            ).toBe(true);
          }
        }
      }
    }
  });

  it('penalizes redundant invulnerability items on heroes with built-in invuln (Pocket vs Seven)', () => {
    const asPocket = recommendCounters(
      {
        myHeroClass: 'hero_synth', // Pocket has built-in invuln (Satchel)
        enemyHeroClass: 'hero_lash',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    const asSeven = recommendCounters(
      {
        myHeroClass: 'hero_gigawatt', // Seven has no built-in invuln
        enemyHeroClass: 'hero_lash',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );

    const pocketShift = asPocket.defense.find((r) => r.item.className === 'upgrade_self_bubble');
    const sevenShift = asSeven.defense.find((r) => r.item.className === 'upgrade_self_bubble');
    if (sevenShift && pocketShift) {
      expect(pocketShift.score).toBeLessThan(sevenShift.score);
    } else {
      expect(sevenShift).toBeDefined();
    }
  });

  it('uses dynamic contextTips when Extra Toggles are enabled without a hero-specific override', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: ['healing'],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );

    const decay = res.offense.find((r) => r.item.className === 'upgrade_rupture');
    const toxic = res.offense.find((r) => r.item.className === 'upgrade_toxic_bullets');
    const antiHealPick = decay ?? toxic;
    expect(antiHealPick).toBeDefined();
    expect(antiHealPick?.why).toMatch(/Anti-Heal|Lifesteal|Heilung/);
  });

  it('prioritizes multi-target counters when 2-3 enemies are selected (e.g. Bebop + Infernus -> Dispel Magic counters 2/2)', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_bebop',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: [],
        enemyTargets: [
          { heroClass: 'hero_bebop', damageProfile: 'spirit', modifiers: [] },
          { heroClass: 'hero_inferno', damageProfile: 'equal', modifiers: ['healing'] },
        ],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );

    const dispel = res.defense.find(
      (r) => r.item.className === 'upgrade_reduce_debuff_duration',
    );
    expect(dispel).toBeDefined();
    expect(dispel?.counteredEnemies).toContain('hero_bebop');
    expect(dispel?.counteredEnemies).toContain('hero_inferno');
    expect(res.defense[0].item.className).toBe('upgrade_reduce_debuff_duration');

    // Explains BOTH Bebop and Infernus individually
    expect(dispel?.reasons.length).toBe(2);
    const bebopReason = dispel?.reasons.find((r) => r.heroClasses.includes('hero_bebop'));
    const infernoReason = dispel?.reasons.find((r) => r.heroClasses.includes('hero_inferno'));
    expect(bebopReason?.text).toContain('Haftbombe');
    expect(infernoReason?.text).toContain('Nachbrennen');
  });

  it('gives each of 2 enemies its own line for shared generic counters, so targets stay attributed', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_gigawatt',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        enemyTargets: [
          { heroClass: 'hero_haze', damageProfile: 'bullet', modifiers: [] },
          { heroClass: 'hero_wraith', damageProfile: 'bullet', modifiers: [] },
        ],
        activeSlotsFull: true,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );

    const bulletRes = res.defense.find(
      (r) => r.item.className === 'upgrade_improved_bullet_armor',
    );
    expect(bulletRes).toBeDefined();
    // Neither Haze nor Wraith has a hero-specific override for Bullet Resilience: still one line
    // per enemy, each with its own mechanic targets (a shared line can't say what belongs to whom)
    expect(bulletRes?.reasons.map((r) => r.heroClasses)).toEqual([['hero_haze'], ['hero_wraith']]);
    for (const reason of bulletRes?.reasons ?? []) {
      expect(reason.actionGroups?.length).toBeGreaterThan(0);
    }
  });

  it('attaches upgradeHint build paths (from/to component) on upgrade-family items', () => {
    const tier800Res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        priceTier: '800',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const rustedBarrel = tier800Res.offense.find(
      (r) => r.item.className === 'upgrade_withering_whip',
    );
    expect(rustedBarrel?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'to',
        itemClassName: 'upgrade_greater_withering_whip',
      }),
    );

    const tier3200Res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const disarmingHex = tier3200Res.offense.find(
      (r) => r.item.className === 'upgrade_greater_withering_whip',
    );
    expect(disarmingHex?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'from',
        itemClassName: 'upgrade_withering_whip',
      }),
    );

    // Separate itemLanguage='en' with language='de' keeps German tips & English item/upgrade names
    const mixedLangRes = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
        itemLanguage: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const disarmMixed = mixedLangRes.offense.find(
      (r) => r.item.className === 'upgrade_greater_withering_whip',
    );
    expect(disarmMixed?.why).toContain('Entwaffnet');
    expect(disarmMixed?.upgradeHint?.itemName).toBe('Rusted Barrel');
  });

  it('boosts catch/anti-mobility counters when the new mobility modifier is toggled', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_atlas',
        enemyHeroClass: 'hero_ghost', // Lady Geist (normally low mobility)
        priceTier: '1600',
        damageProfile: 'spirit',
        modifiers: ['mobility'],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );

    const slowingHex = res.offense.find((r) => r.item.className === 'upgrade_containment');
    expect(slowingHex).toBeDefined();
    expect(slowingHex?.why).toContain('Warp Stone');
  });

  // ===================== SMART KIT-AMPLIFIER TESTS =====================

  it('verifies every KIT_AMPLIFIER_RULES item exists in snapshot and every hero kitCounter has EN + DE copy', () => {
    for (const rule of KIT_AMPLIFIER_RULES) {
      expect(
        itemsByClass.has(rule.className),
        `Kit amplifier ${rule.className} missing from snapshot`,
      ).toBe(true);
    }

    for (const hero of snapshot.heroes) {
      const profile = HERO_PROFILES[hero.className];
      for (const kc of profile.kitCounters ?? []) {
        expect(kc.abilityName.length).toBeGreaterThan(0);
        expect(kc.abilityNameDe.length).toBeGreaterThan(0);
        expect(kc.effectEn.length).toBeGreaterThan(0);
        expect(kc.effectDe.length).toBeGreaterThan(0);
        expect(kc.amplifiers.length).toBeGreaterThan(0);
      }
    }
  });

  it('recommends Greater Expansion for Bebop Hook vs Vindicta on #2/#3 while keeping Knockdown #1', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet', // Vindicta
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );

    expect(res.offense[0].item.name).toBe('Knockdown');
    expect(res.offense[0].isKitAmplifier).toBeFalsy();

    const kitPicks = res.offense.filter((r) => r.isKitAmplifier);
    expect(kitPicks.length).toBe(1);
    expect(kitPicks[0].rank).toBeGreaterThanOrEqual(2);
    expect(kitPicks[0].item.className).toBe('upgrade_tech_range'); // Greater Expansion
    expect(kitPicks[0].why).toContain('Greifarm');
    expect(kitPicks[0].whenToUse).toContain('Greifarm');
    expect(kitPicks[0].synergyNote).toContain('Greifarm');
    expect(kitPicks[0].upgradeHint?.itemClassName).toBe('upgrade_magic_reach');
  });

  it('recommends Compress Cooldown (Imbue) for Viscous Cube vs Bebop at 1600 Defense (never #1)', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_viscous',
        enemyHeroClass: 'hero_bebop',
        priceTier: '1600',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );

    expect(res.defense[0].isKitAmplifier).toBeFalsy();
    const kitPick = res.defense.find((r) => r.isKitAmplifier);
    expect(kitPick).toBeDefined();
    expect(kitPick?.rank).toBeGreaterThanOrEqual(2);
    expect(kitPick?.item.className).toBe('upgrade_magic_tempo'); // Compress Cooldown
    expect(kitPick?.why).toContain('Kubus');
    expect(kitPick?.whenToUse).toContain('imbuen');
    expect(kitPick?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'to',
        itemClassName: 'upgrade_cooldown_reduction',
      }),
    );
  });

  it('never suggests Kit-Amplifiers when myHeroClass is null', () => {
    const tiers: PriceTier[] = ['800', '1600', '3200', '6400', 'all'];
    for (const priceTier of tiers) {
      const res = recommendCounters(
        {
          myHeroClass: null,
          enemyHeroClass: 'hero_hornet',
          priceTier,
          damageProfile: 'bullet',
          modifiers: [],
          activeSlotsFull: false,
          language: 'de',
        },
        itemsByClass,
        heroesByClass,
      );
      expect([...res.offense, ...res.defense].some((r) => r.isKitAmplifier)).toBe(false);
    }
  });

  it('enforces multi-enemy guardrail: requires >= 2 countered enemies when 2-3 enemies are selected', () => {
    // Bebop Hook counters Vindicta (airborne), NOT Abrams (melee_brawler/heavy_healing/hard_cc/close_range_dive)
    const onlyOneMatched = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        enemyTargets: [
          { heroClass: 'hero_hornet', damageProfile: 'bullet', modifiers: [] },
          { heroClass: 'hero_atlas', damageProfile: 'bullet', modifiers: [] },
        ],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(onlyOneMatched.offense.some((r) => r.isKitAmplifier)).toBe(false);

    // Bebop Hook counters BOTH Vindicta (airborne) AND Seven (channeled_ult) -> qualifies!
    const twoMatched = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        enemyTargets: [
          { heroClass: 'hero_hornet', damageProfile: 'bullet', modifiers: [] },
          { heroClass: 'hero_gigawatt', damageProfile: 'spirit', modifiers: [] },
        ],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(twoMatched.offense[0].isKitAmplifier).toBeFalsy();
    const kitPick = twoMatched.offense.find((r) => r.isKitAmplifier);
    expect(kitPick).toBeDefined();
    expect(kitPick?.counteredEnemies).toContain('hero_hornet');
    expect(kitPick?.counteredEnemies).toContain('hero_gigawatt');
    // One line per countered enemy, both answered by the same boosted Grapple Arm
    expect(kitPick?.reasons.map((r) => r.heroClasses)).toEqual([
      ['hero_hornet'],
      ['hero_gigawatt'],
    ]);
    expect(kitPick?.reasons.every((r) => r.text.includes('Greifarm'))).toBe(true);
  });

  it('respects activeSlotsFull for active Kit-Amplifiers (Majestic Leap / Echo Shard / Refresher)', () => {
    const withActives = recommendCounters(
      {
        myHeroClass: 'hero_krill', // Mo & Krill Combo prefers gap_close (Majestic Leap) vs Vindicta
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const leapPick = withActives.offense.find((r) => r.isKitAmplifier);
    expect(leapPick?.item.className).toBe('upgrade_rocket_booster'); // Majestic Leap

    const passiveOnly = recommendCounters(
      {
        myHeroClass: 'hero_krill',
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: true,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect([...passiveOnly.offense, ...passiveOnly.defense].every((r) => !r.item.isActive)).toBe(
      true,
    );
    const passiveKitPick = passiveOnly.offense.find((r) => r.isKitAmplifier);
    expect(passiveKitPick).toBeDefined();
    expect(passiveKitPick?.item.isActive).toBe(false);
    expect(passiveOnly.hiddenActiveCount).toBeGreaterThan(0);
  });

  it('supports charge-based Kit-Amplifiers (Extra Charge at 800) and separates Echo Shard vs Refresher at 6400', () => {
    // Holliday Bounce Pad vs Vindicta at 800 -> Extra Charge
    const holliday800 = recommendCounters(
      {
        myHeroClass: 'hero_astro',
        enemyHeroClass: 'hero_hornet',
        priceTier: '800',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(holliday800.offense[0].isKitAmplifier).toBeFalsy();
    const hollidayCharge = holliday800.offense.find((r) => r.isKitAmplifier);
    expect(hollidayCharge?.item.className).toBe('upgrade_extra_charge');
    expect(hollidayCharge?.why).toContain('Bounce Pad');

    // Kelvin Frost Grenade vs Vindicta at 800 Defense -> Extra Charge
    const kelvin800 = recommendCounters(
      {
        myHeroClass: 'hero_kelvin',
        enemyHeroClass: 'hero_hornet',
        priceTier: '800',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(kelvin800.defense[0].isKitAmplifier).toBeFalsy();
    const kelvinCharge = kelvin800.defense.find((r) => r.isKitAmplifier);
    expect(kelvinCharge?.item.className).toBe('upgrade_extra_charge');
    expect(kelvinCharge?.why).toContain('Frostgranate');

    // Bebop Hook (non-ult) vs Vindicta at 6400 -> Echo Shard (not Refresher)
    const bebop6400 = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet',
        priceTier: '6400',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const bebopReset = bebop6400.offense.find((r) => r.isKitAmplifier);
    expect(bebopReset?.item.className).toBe('upgrade_ability_power_shard'); // Echo Shard

    // With activeSlotsFull=true at 6400, Bebop falls back to passive Transcendent Cooldown
    const bebop6400Passive = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet',
        priceTier: '6400',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: true,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const bebopPassiveAmp = bebop6400Passive.offense.find((r) => r.isKitAmplifier);
    expect(bebopPassiveAmp?.item.className).toBe('upgrade_transcendent_cooldown');

    // Wraith Telekinesis (ult) vs Vindicta at 6400 -> Refresher (never Echo Shard!)
    const wraith6400 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_hornet',
        priceTier: '6400',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const wraithReset = wraith6400.offense.find((r) => r.isKitAmplifier);
    expect(wraithReset?.item.className).toBe('upgrade_ability_refresher'); // Refresher
  });

  it('enforces Kit-Amplifier invariants across all 44 player heroes and all 5 tiers (never #1, max 1 per stance)', () => {
    const sampleEnemies = ['hero_hornet', 'hero_bebop', 'hero_haze', 'hero_atlas', 'hero_gigawatt'];
    const tiers: PriceTier[] = ['800', '1600', '3200', '6400', 'all'];

    for (const myHero of snapshot.heroes) {
      for (const enemyClass of sampleEnemies) {
        if (myHero.className === enemyClass) continue;
        const eProfile = HERO_PROFILES[enemyClass];
        for (const priceTier of tiers) {
          const res = recommendCounters(
            {
              myHeroClass: myHero.className,
              enemyHeroClass: enemyClass,
              priceTier,
              damageProfile: eProfile.defaultDamage,
              modifiers: [],
              activeSlotsFull: false,
              language: 'de',
            },
            itemsByClass,
            heroesByClass,
          );

          for (const list of [res.offense, res.defense]) {
            expect(list.length).toBeLessThanOrEqual(3);
            if (list.length > 0) {
              expect(
                list[0].isKitAmplifier,
                `Rank #1 must never be a Kit-Amplifier (${myHero.name} vs ${enemyClass} @ ${priceTier})`,
              ).toBeFalsy();
            }
            const kitCount = list.filter((r) => r.isKitAmplifier).length;
            expect(
              kitCount,
              `At most 1 Kit-Amplifier per column (${myHero.name} vs ${enemyClass} @ ${priceTier})`,
            ).toBeLessThanOrEqual(1);
          }
        }
      }
    }
  });

  it('respects itemLanguage (In-Game toggle) for ability names in both Kit-Amplifiers and Hard-Counter tips', () => {
    // UI in German, In-Game in English -> English ability names (Bullet Dance, Grapple Arm)
    const deUiEnGame = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
        itemLanguage: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const metalSkinEn = deUiEnGame.defense.find((r) => r.item.className === 'upgrade_metal_skin');
    expect(metalSkinEn?.why).toContain('Bullet Dance');

    // UI in German, In-Game in German -> Official German ability names (Kugelhagel, Greifarm)
    const deUiDeGame = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_haze',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
        itemLanguage: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const metalSkinDe = deUiDeGame.defense.find((r) => r.item.className === 'upgrade_metal_skin');
    expect(metalSkinDe?.why).toContain('Kugelhagel');

    // Kit-Amplifier follows itemLanguage too: Bebop vs Vindicta
    const kitEn = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
        itemLanguage: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const kitPickEn = kitEn.offense.find((r) => r.isKitAmplifier);
    expect(kitPickEn?.why).toContain('Grapple Arm');
    expect(kitPickEn?.synergyNote).toContain('Grapple Arm');
  });

  it('provides all 4 official EN + DE abilities with descriptions on every hero and segments inline mentions cleanly', () => {
    for (const hero of snapshot.heroes) {
      expect(hero.abilities?.length, `Expected 4 abilities for ${hero.name}`).toBe(4);
      for (const ab of hero.abilities ?? []) {
        expect(ab.name.length).toBeGreaterThan(0);
        expect(ab.nameDe.length).toBeGreaterThan(0);
        expect(ab.descEn.length).toBeGreaterThan(10);
        expect(ab.descDe.length).toBeGreaterThan(10);
      }
    }

    const haze = heroesByClass.get('hero_haze')!;
    const segmentsDe = segmentTextWithAbilities(
      'Unterbricht Haze Bullet Dance sofort.',
      [haze],
      'de',
    );
    const abilitySeg = segmentsDe.find((s) => s.type === 'ability');
    expect(abilitySeg).toBeDefined();
    expect(abilitySeg?.text).toBe('Kugelhagel');

    const segmentsEn = segmentTextWithAbilities(
      'Unterbricht Haze Kugelhagel sofort.',
      [haze],
      'en',
    );
    const abilitySegEn = segmentsEn.find((s) => s.type === 'ability');
    expect(abilitySegEn?.text).toBe('Bullet Dance');
  });

  it('penalizes Return Fire on Lady Geist vs Silver due to Soul Exchange anti-synergy and lack of melee reflection', () => {
    const geistVsSilver = recommendCounters(
      {
        myHeroClass: 'hero_ghost', // Lady Geist
        enemyHeroClass: 'hero_werewolf', // Silver
        priceTier: '1600',
        damageProfile: 'bullet',
        modifiers: ['tanky', 'melee', 'cc'],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(geistVsSilver.defense.map((r) => r.item.className)).not.toContain('upgrade_return_fire');

    // Return Fire rule must not carry false melee counter weight, nor Disarming Hex / Cursed Relic
    const ruleByClass = new Map(COUNTER_ITEM_RULES.map((r) => [r.className, r]));
    expect(ruleByClass.get('upgrade_return_fire')?.modifierCounters?.melee).toBeUndefined();
    expect(ruleByClass.get('upgrade_greater_withering_whip')?.modifierCounters?.melee).toBeUndefined();
    expect(ruleByClass.get('upgrade_glitch')?.modifierCounters?.melee).toBeUndefined();
    expect(ruleByClass.get('upgrade_siphon_bullets')?.modifierCounters?.healing).toBeUndefined();
    expect(ruleByClass.get('upgrade_capacitor')?.threatCounters?.buff_shield_stacker).toBeUndefined();
  });

  it('recommends accurate counters vs Pocket (Divine Barrier / Counterspell) and Sinclair (Debuff Reducer / Counterspell)', () => {
    const vsPocket6400 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_synth',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(vsPocket6400.defense.map((r) => r.item.className)).toContain('upgrade_divine_barrier');

    const vsSinclair1600 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_magician',
        priceTier: '1600',
        damageProfile: 'spirit',
        modifiers: ['cc'],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(vsSinclair1600.defense.map((r) => r.item.className)).toContain('upgrade_debuff_reducer');

    const vsSinclair3200 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_magician',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: ['cc'],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(vsSinclair3200.defense.map((r) => r.item.className)).toContain('upgrade_counterspell');
  });

  it('exposes accurate live Curiosity Shop upgrade paths and non-empty summaries for tooltip_sections items', () => {
    const vsInferno3200 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_inferno',
        priceTier: '3200',
        damageProfile: 'equal',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const dispel = vsInferno3200.defense.find(
      (r) => r.item.className === 'upgrade_reduce_debuff_duration',
    );
    expect(dispel).toBeDefined();
    expect(dispel?.upgradeHint).toBeNull();

    const vsTalon6400 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_orion',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const spellbreaker = vsTalon6400.defense.find(
      (r) => r.item.className === 'upgrade_spellbreaker',
    );
    expect(spellbreaker?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'from',
        itemClassName: 'upgrade_debuff_reducer',
      }),
    );

    const vsHaze6400 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_haze',
        priceTier: '6400',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: true,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const juggernaut = vsHaze6400.defense.find((r) => r.item.className === 'upgrade_juggernaut');
    expect(juggernaut?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'from',
        itemClassName: 'upgrade_cardio_calibrator',
      }),
    );

    expect(itemsByClass.get('upgrade_juggernaut')?.summary.length).toBeGreaterThan(10);
    expect(itemsByClass.get('upgrade_auto_cleanse')?.summary.length).toBeGreaterThan(10);
    expect(itemsByClass.get('upgrade_cheat_death')?.summary.length).toBeGreaterThan(10);
  });

  // ===================== STRUCTURED COUNTER ABILITY CHIPS TESTS =====================

  it('covers all 44 heroes in HERO_ABILITY_TAGS and all 74 counter items in ITEM_ACTION_PROFILES', () => {
    for (const hero of snapshot.heroes) {
      const tags = HERO_ABILITY_TAGS[hero.className];
      expect(tags, `Missing HERO_ABILITY_TAGS for ${hero.name}`).toBeDefined();
      expect(tags.length, `Empty HERO_ABILITY_TAGS for ${hero.name}`).toBeGreaterThanOrEqual(2);
      for (const tag of tags) {
        const ab = hero.abilities?.find((a) => a.slot === tag.slot);
        expect(ab, `Slot ${tag.slot} missing on ${hero.name}`).toBeDefined();
      }
    }

    for (const rule of COUNTER_ITEM_RULES) {
      expect(
        ITEM_ACTION_PROFILES[rule.className],
        `Missing ITEM_ACTION_PROFILES for ${rule.className}`,
      ).toBeDefined();
    }
  });

  it('populates non-empty structured actionGroups across all 44 heroes and all 5 price tiers', () => {
    const tiers: PriceTier[] = ['800', '1600', '3200', '6400', 'all'];
    for (const hero of snapshot.heroes) {
      const profile = HERO_PROFILES[hero.className];
      for (const priceTier of tiers) {
        const res = recommendCounters(
          {
            myHeroClass: 'hero_bebop',
            enemyHeroClass: hero.className,
            priceTier,
            damageProfile: profile.defaultDamage,
            modifiers: [],
            activeSlotsFull: false,
            language: 'en',
          },
          itemsByClass,
          heroesByClass,
        );
        for (const rec of [...res.offense, ...res.defense]) {
          expect(rec.reasons.length).toBeGreaterThanOrEqual(1);
          for (const r of rec.reasons) {
            expect(
              r.actionGroups && r.actionGroups.length > 0,
              `Missing actionGroups on ${rec.item.name} vs ${hero.name} (${priceTier})`,
            ).toBe(true);
            for (const g of r.actionGroups ?? []) {
              expect(g.verbLabel.length).toBeGreaterThan(0);
              expect(g.targets.length).toBeGreaterThan(0);
            }
          }
        }
      }
    }
  });

  it('resolves exact abilities, verbs, multi-verb groups, and matchup-aware Use tips for iconic counters', () => {
    // Seven @ 3200: Knockdown cancels Storm Cloud (without redundant Channeled Ult pill)
    const vsSeven3200 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_gigawatt',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const kdSeven = vsSeven3200.offense.find((r) => r.item.className === 'upgrade_target_stun')!;
    const kdGroups = kdSeven.reasons[0].actionGroups!;
    expect(kdGroups.length).toBe(1);
    expect(kdGroups[0].verb).toBe('cancels');
    expect(kdGroups[0].targets).toHaveLength(1);
    expect(kdGroups[0].targets[0]).toMatchObject({
      kind: 'ability',
      heroClass: 'hero_gigawatt',
      ability: { slot: 4, name: 'Storm Cloud' },
    });

    // Seven @ 6400: Cursed Relic has two verb groups (Cancels Storm Cloud + Strips Power Surge)
    const vsSeven6400 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_gigawatt',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const curseSeven = vsSeven6400.offense.find((r) => r.item.className === 'upgrade_glitch')!;
    const curseGroups = curseSeven.reasons[0].actionGroups!;
    expect(curseGroups.map((g) => g.verb)).toEqual(['cancels', 'strips']);
    expect(curseGroups[0].targets[0]).toMatchObject({ kind: 'ability', ability: { slot: 4 } });
    expect(curseGroups[1].targets[0]).toMatchObject({ kind: 'ability', ability: { slot: 3 } });

    // Bebop @ 3200 (DE UI + DE In-Game): Dispel Magic cleanses Sticky Bomb with matchup-aware Use tip
    const vsBebop3200 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_bebop',
        priceTier: '3200',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
        itemLanguage: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const dispelBebop = vsBebop3200.defense.find(
      (r) => r.item.className === 'upgrade_reduce_debuff_duration',
    )!;
    expect(dispelBebop.reasons[0].actionGroups?.[0].verb).toBe('cleanses');
    expect(dispelBebop.reasons[0].actionGroups?.[0].targets[0]).toMatchObject({
      kind: 'ability',
      ability: { slot: 2, name: 'Sticky Bomb' },
    });
    expect(dispelBebop.whenToUse).toContain('Haftbombe');

    // Abrams @ 1600: Debuff Reducer shortens Shoulder Charge and keeps the heavy-melee parry caveat in Use:
    const vsAbrams1600 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_atlas',
        priceTier: '1600',
        damageProfile: 'bullet',
        modifiers: ['cc'],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const debuffAbrams = vsAbrams1600.defense.find(
      (r) => r.item.className === 'upgrade_debuff_reducer',
    )!;
    expect(debuffAbrams.reasons[0].actionGroups?.[0].verb).toBe('shortens');
    expect(debuffAbrams.reasons[0].actionGroups?.[0].targets[0]).toMatchObject({
      kind: 'ability',
      ability: { slot: 2, name: 'Shoulder Charge' },
    });
    expect(debuffAbrams.whenToUse).toMatch(/parry/i);

    // Abrams @ 800: Rebuttal uses unified non-ability mechanic pill (Punishes Heavy Melee)
    const vsAbrams800 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_atlas',
        priceTier: '800',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const rebuttal = vsAbrams800.defense.find((r) => r.item.className === 'upgrade_melee_rebuttal')!;
    expect(rebuttal.reasons[0].actionGroups?.[0]).toMatchObject({
      verb: 'punishes',
      targets: [{ kind: 'mechanic', label: 'Heavy Melee' }],
    });
  });

  it('auto-resolves abilities on generic recommendations, appends uncovered active modifiers, and respects Dispel Magic non-ult guardrail', () => {
    // Pocket @ 3200: Dispel Magic must NOT claim to cleanse Pocket's ultimate Affliction,
    // while Divine Barrier @ 6400 explicitly DOES cleanse Affliction.
    const vsPocket6400 = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_synth',
        priceTier: '6400',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const divinePocket = vsPocket6400.defense.find(
      (r) => r.item.className === 'upgrade_divine_barrier',
    )!;
    expect(divinePocket.reasons[0].actionGroups?.[0].targets[0]).toMatchObject({
      kind: 'ability',
      ability: { slot: 4, name: 'Affliction' },
    });

    // Abrams @ 3200 with ['tanky'] toggled: Decay shows Siphon Life & Infernal Resilience AND appends Tanky
    const vsTankyAbrams = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_atlas',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: ['tanky'],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const decayAbrams = vsTankyAbrams.offense.find((r) => r.item.className === 'upgrade_rupture')!;
    const decayGroups = decayAbrams.reasons[0].actionGroups!;
    expect(decayGroups.some((g) => g.verb === 'cuts_heal')).toBe(true);
    expect(
      decayGroups.some(
        (g) =>
          g.verb === 'shreds' &&
          g.targets.some((t) => t.kind === 'mechanic' && t.label === 'Tanky'),
      ),
    ).toBe(true);

    // Generic non-override match: Healbane vs Mo & Krill auto-resolves Scorn [1]
    const vsKrill1600 = recommendCounters(
      {
        myHeroClass: 'hero_ghost',
        enemyHeroClass: 'hero_krill',
        priceTier: '1600',
        damageProfile: 'spirit',
        modifiers: ['healing'],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );
    const healbaneKrill = vsKrill1600.offense.find((r) => r.item.className === 'upgrade_healbane')!;
    expect(healbaneKrill.reasons[0].actionGroups?.[0].verb).toBe('cuts_heal');
    expect(healbaneKrill.reasons[0].actionGroups?.[0].targets[0]).toMatchObject({
      kind: 'ability',
      ability: { slot: 1, name: 'Scorn' },
    });
  });

  it('populates structured Kit-Amplifier metadata on BOTH player ability and countered enemy abilities', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_bebop',
        enemyHeroClass: 'hero_hornet',
        priceTier: '3200',
        damageProfile: 'bullet',
        modifiers: [],
        enemyTargets: [
          { heroClass: 'hero_hornet', damageProfile: 'bullet', modifiers: [] },
          { heroClass: 'hero_gigawatt', damageProfile: 'spirit', modifiers: [] },
        ],
        activeSlotsFull: false,
        language: 'en',
      },
      itemsByClass,
      heroesByClass,
    );

    const kitPick = res.offense.find((r) => r.isKitAmplifier)!;
    expect(kitPick.kitAmplifier).toBeDefined();
    expect(kitPick.kitAmplifier?.ability?.slot).toBe(3); // Grapple Arm
    expect(kitPick.kitAmplifier?.boostLabel).toBe('more range');

    // Each enemy has its own line, holding only that enemy's abilities
    const chipsOf = (heroClass: string) =>
      kitPick.reasons
        .filter((r) => r.heroClasses.length === 1 && r.heroClasses[0] === heroClass)
        .flatMap((r) => r.actionGroups ?? [])
        .flatMap((g) => g.targets);
    const hornetChips = chipsOf('hero_hornet');
    const sevenChips = chipsOf('hero_gigawatt');
    expect(hornetChips.some((c) => c.kind === 'ability' && c.ability.slot === 2)).toBe(true);
    expect(sevenChips.some((c) => c.kind === 'ability' && c.ability.slot === 4)).toBe(true);
    expect(hornetChips.every((c) => c.kind !== 'ability' || c.heroClass === 'hero_hornet')).toBe(true);
    expect(sevenChips.every((c) => c.kind !== 'ability' || c.heroClass === 'hero_gigawatt')).toBe(true);
  });

  it('provides clean EN and DE in-game item tooltips for all curated counter and kit-amplifier items', () => {
    const allClassNames = new Set([
      ...COUNTER_ITEM_RULES.map((r) => r.className),
      ...KIT_AMPLIFIER_RULES.map((r) => r.className),
    ]);

    for (const cls of allClassNames) {
      const item = itemsByClass.get(cls);
      expect(item, `Missing item ${cls}`).toBeDefined();
      expect(item?.tooltipEn?.length, `Missing tooltipEn on ${cls}`).toBeGreaterThan(0);
      expect(item?.tooltipDe?.length, `Missing tooltipDe on ${cls}`).toBeGreaterThan(0);

      for (const sec of [...(item?.tooltipEn ?? []), ...(item?.tooltipDe ?? [])]) {
        for (const st of sec.stats) {
          expect(st.value, `Unformatted token on ${cls}`).not.toContain('{');
          expect(st.value, `Duplicate meter unit on ${cls}`).not.toMatch(/mm\b/i);
          expect(st.label.length, `Empty stat label on ${cls}`).toBeGreaterThan(0);
        }
      }
    }

    const knockdown = itemsByClass.get('upgrade_target_stun')!;
    expect(knockdown.cooldown).toBe('35s');
    expect(knockdown.tooltipEn?.some((s) => s.type === 'innate' && s.stats.length > 0)).toBe(true);
    expect(knockdown.tooltipEn?.some((s) => s.type === 'active' && Boolean(s.desc))).toBe(true);
  });
});

describe('ability damage types from the game data', () => {
  const ability = (heroClass: string, slot: number) =>
    heroesByClass.get(heroClass)!.abilities!.find((a) => a.slot === slot)!;
  const types = (heroClass: string, slot: number) =>
    new Set((ability(heroClass, slot).damage ?? []).map((d) => d.type));
  const tier = (enemy: string, priceTier: PriceTier) =>
    recommendCounters(
      {
        myHeroClass: null,
        enemyHeroClass: enemy,
        priceTier,
        damageProfile: heroesByClass.get(enemy)?.metaDamage ?? 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
  const card = (enemy: string, priceTier: PriceTier, className: string) => {
    const res = tier(enemy, priceTier);
    return [...res.offense, ...res.defense].find((r) => r.item.className === className);
  };
  const abilityChips = (rec: ReturnType<typeof card>) =>
    (rec?.reasons ?? [])
      .flatMap((r) => r.actionGroups ?? [])
      .flatMap((g) => g.targets)
      .flatMap((c) => (c.kind === 'ability' ? [c.ability.name] : []));

  it('reads what each ability deals', () => {
    expect([...types('hero_hornet', 4)]).toEqual(['spirit']); // Assassinate
    expect(ability('hero_drifter', 4).damage).toEqual([]); // Eternal Night: no damage
    const flight = ability('hero_hornet', 2);
    expect(flight.damage?.[0]).toMatchObject({ type: 'spirit', perBullet: true });
    expect(flight.empowersWeapon).toBe(true);
    expect(ability('hero_haze', 4).empowersWeapon).toBe(true); // Bullet Dance
    expect(ability('hero_hornet', 4).empowersWeapon).toBeFalsy(); // a kill bonus is no gun boost
    expect(types('hero_drifter', 1)).toEqual(new Set(['spirit', 'melee'])); // Rend
  });

  it('shows weapon items only against abilities that deal weapon damage or boost the gun', () => {
    // Eternal Night deals no damage: Metal Skin names Drifter's weapon damage instead
    const metalSkinDrifter = card('hero_drifter', '3200', 'upgrade_metal_skin');
    expect(metalSkinDrifter).toBeDefined();
    expect(abilityChips(metalSkinDrifter)).not.toContain('Eternal Night');
    expect(metalSkinDrifter?.reasons[0].actionGroups?.length).toBeGreaterThan(0);

    // Assassinate is spirit damage: Weapon Shielding only keeps Flight (her gun from the air)
    const shieldingVindicta = card('hero_hornet', '1600', 'upgrade_weapon_shielding');
    expect(abilityChips(shieldingVindicta)).toEqual(['Flight']);

    // Bullet Dance boosts Haze's gun, so Metal Skin still blocks it
    expect(abilityChips(card('hero_haze', '3200', 'upgrade_metal_skin'))).toContain('Bullet Dance');
  });

  it("Hunter's Aura only weakens gun abilities; a diver just walks into the aura", () => {
    // Seismic Impact / Siphon Life are spirit damage: the aura's Fire Rate cut does nothing to them
    const auraAbrams = card('hero_atlas', '3200', 'upgrade_bullet_armor_reduction_aura');
    expect(auraAbrams).toBeDefined();
    expect(abilityChips(auraAbrams)).toEqual([]);
    const groups = auraAbrams!.reasons.flatMap((r) => r.actionGroups ?? []);
    const punish = groups.find((g) => g.verb === 'punishes');
    expect(punish?.targets.map((c) => (c.kind === 'mechanic' ? c.label : ''))).toContain('Springt dich an');

    // Silver's werewolf form and Slam Fire shoot: the aura really slows them
    const auraSilver = abilityChips(card('hero_werewolf', '3200', 'upgrade_bullet_armor_reduction_aura'));
    expect(auraSilver.some((n) => n === 'Lycan Curse' || n === 'Slam Fire')).toBe(true);
  });

  it('never pairs a damage-type item with an ability of another damage type', () => {
    const all = snapshot.heroes.map((h) => h.className);
    for (let a = 0; a < all.length; a++) {
      const enemies = [all[a], all[(a + 7) % all.length]];
      for (const priceTier of ['1600', '3200', '6400'] as PriceTier[]) {
        const res = recommendCounters(
          {
            myHeroClass: null,
            enemyHeroClass: enemies[0],
            priceTier,
            damageProfile: 'bullet',
            modifiers: [],
            enemyTargets: enemies.map((h) => ({
              heroClass: h,
              damageProfile: heroesByClass.get(h)?.metaDamage ?? 'equal',
              modifiers: [],
            })),
            activeSlotsFull: false,
            language: 'de',
          },
          itemsByClass,
          heroesByClass,
        );
        for (const rec of [...res.offense, ...res.defense]) {
          const focus = getItemDamageFocus(rec.item.className);
          for (const reason of rec.reasons) {
            for (const chip of (reason.actionGroups ?? []).flatMap((g) => g.targets)) {
              if (rec.item.className === 'upgrade_headhunter' && chip.kind === 'mechanic') {
                expect(chip.label, 'Headhunter has no air bonus').not.toMatch(/Luft/);
              }
              if (chip.kind !== 'ability' || !focus) continue;
              expect(
                abilityFitsDamageFocus(chip.ability, focus),
                `${rec.item.name} vs ${chip.ability.name}`,
              ).toBe(true);
            }
          }
        }
      }
    }
  });
});
