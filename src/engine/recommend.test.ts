import { describe, expect, it } from 'vitest';
import { getBundledSnapshot } from '../data/apiClient';
import { COUNTER_ITEM_RULES, HERO_SPECIFIC_COUNTERS } from '../data/counterItems';
import { HERO_PROFILES } from '../data/heroProfiles';
import { KIT_AMPLIFIER_RULES } from '../data/kitAmplifiers';
import { HERO_OVERRIDE_TIPS_DE, ITEM_COPY_DE } from '../i18n/contentDe';
import { recommendCounters } from './recommend';
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
    expect(res.recommendations[0].why).toContain('Kugeltanz');
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

  it('covers all 42 live heroes with profiles, hard-counter overrides, and empirical lifts', () => {
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

  it('passes quality invariants across all 42 heroes and all 5 price tiers (800, 1600, 3200, 6400, all)', () => {
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
    expect(antiHealPick?.why).toMatch(/Heilung|Anti-Heilung/);
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

  it('collapses shared generic counters across 2 enemies without repeating boilerplate text', () => {
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
    // Neither Haze nor Wraith has a hero-specific override for Bullet Resilience -> collapsed into 1 clean shared line
    expect(bulletRes?.reasons.length).toBe(1);
    expect(bulletRes?.reasons[0].heroClasses).toContain('hero_haze');
    expect(bulletRes?.reasons[0].heroClasses).toContain('hero_wraith');
    expect(bulletRes?.reasons[0].triggerSummary).toBeTruthy();
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
    expect(kitPicks[0].why).toContain('Greifhaken');
    expect(kitPicks[0].whenToUse).toContain('Greifhaken');
    expect(kitPicks[0].synergyNote).toContain('Greifhaken');
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
    expect(kitPick?.why).toContain('Heilwürfel');
    expect(kitPick?.whenToUse).toContain('Imbue');
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
    expect(kitPick?.reasons.length).toBe(1); // collapsed cleanly onto shared Greifhaken ability
    expect(kitPick?.reasons[0].text).toContain('Greifhaken');
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

  it('enforces Kit-Amplifier invariants across all 42 player heroes and all 5 tiers (never #1, max 1 per stance)', () => {
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
});
