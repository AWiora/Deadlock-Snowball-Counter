import { describe, expect, it } from 'vitest';
import { getBundledSnapshot } from '../data/apiClient';
import { COUNTER_ITEM_RULES, HERO_SPECIFIC_COUNTERS } from '../data/counterItems';
import { HERO_PROFILES } from '../data/heroProfiles';
import { ITEM_COPY_DE } from '../i18n/contentDe';
import { recommendCounters } from './recommend';
import type { DeadlockHero, DeadlockItem, GameStage } from '../types/deadlock';

const snapshot = getBundledSnapshot();
const itemsByClass = new Map<string, DeadlockItem>(
  snapshot.items.map((i) => [i.className, i]),
);
const heroesByClass = new Map<string, DeadlockHero>(
  snapshot.heroes.map((h) => [h.className, h]),
);

describe('Deadlock counter recommendation engine', () => {
  it('recommends Metal Skin / Disarming Hex in Mid game vs Haze (not generic random armor)', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        stage: 'mid',
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
  });

  it('recommends Plated Armor #1 in Late game vs Haze', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_gigawatt',
        enemyHeroClass: 'hero_haze',
        stage: 'late',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );

    expect(res.recommendations[0].item.name).toBe('Plated Armor');
  });

  it('filters out all Active items when Active Slots Full is enabled and reports hidden actives', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_wraith',
        enemyHeroClass: 'hero_haze',
        stage: 'late',
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
        stage: 'mid',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );

    const top3 = res.recommendations.slice(0, 3).map((r) => r.item.name);
    expect(top3).not.toContain('Metal Skin');
    expect(top3.some((n) => ['Spirit Resilience', 'Counterspell', 'Silence Wave', 'Spirit Shielding'].includes(n))).toBe(true);
  });

  it('recommends Knockdown #1 vs Vindicta and Seven in Mid game', () => {
    const vsVindicta = recommendCounters(
      {
        myHeroClass: 'hero_atlas',
        enemyHeroClass: 'hero_hornet',
        stage: 'mid',
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
        stage: 'mid',
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
        stage: 'mid',
        damageProfile: 'bullet',
        modifiers: ['tanky', 'healing'],
        activeSlotsFull: true,
      },
      itemsByClass,
      heroesByClass,
    );
    const gunNames = gunPlayer.recommendations.map((r) => r.item.name);
    expect(gunNames).toContain('Toxic Bullets');
    expect(gunNames).not.toContain('Healbane');

    const spiritPlayer = recommendCounters(
      {
        myHeroClass: 'hero_ghost', // Lady Geist: spirit proccer, slow gun
        enemyHeroClass: 'hero_atlas',
        stage: 'mid',
        damageProfile: 'bullet',
        modifiers: ['tanky', 'healing'],
        activeSlotsFull: true,
      },
      itemsByClass,
      heroesByClass,
    );
    const spiritNames = spiritPlayer.recommendations.map((r) => r.item.name);
    expect(spiritNames).toContain('Healbane');
    expect(spiritNames).toContain('Tankbuster');
    expect(spiritNames).not.toContain('Toxic Bullets');
  });

  it('recommends Rebuttal in Lane vs Abrams even with 0 extra build toggles clicked', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_atlas',
        stage: 'lane',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.recommendations[0].item.name).toBe('Rebuttal');
  });

  it('boosts anti-heal when Heavy Healing extra toggle is clicked on a non-healer like Haze', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        stage: 'mid',
        damageProfile: 'bullet',
        modifiers: ['healing'],
        activeSlotsFull: false,
      },
      itemsByClass,
      heroesByClass,
    );
    const names = res.recommendations.map((r) => r.item.name);
    expect(names.some((n) => ['Healbane', 'Decay', 'Toxic Bullets'].includes(n))).toBe(true);
  });

  it('returns German tactical copy and official German item names when language is de', () => {
    const res = recommendCounters(
      {
        myHeroClass: 'hero_kelvin',
        enemyHeroClass: 'hero_haze',
        stage: 'mid',
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
        stage: 'mid',
        damageProfile: 'spirit',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    expect(res.recommendedStance).toBe('offense');
    expect(res.offense.length).toBe(3);
    expect(res.defense.length).toBeGreaterThanOrEqual(2);
    expect(res.defense.length).toBeLessThanOrEqual(3);
    const offenseNames = res.offense.map((r) => r.item.name);
    expect(offenseNames.some((n) => ['Silence Wave', 'Slowing Hex', 'Cold Front'].includes(n))).toBe(true);
  });

  it('handles unknown/newly-patched heroes gracefully', () => {
    const res = recommendCounters(
      {
        myHeroClass: null,
        enemyHeroClass: 'hero_future_patch_99',
        stage: 'late',
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
      expect(
        HERO_SPECIFIC_COUNTERS[hero.className]?.length,
        `Missing HERO_SPECIFIC_COUNTERS for ${hero.name}`,
      ).toBeGreaterThanOrEqual(3);
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

  it('passes quality invariants across all 42 heroes and all 3 stages (lane, mid, late)', () => {
    const stages: GameStage[] = ['lane', 'mid', 'late'];
    for (const hero of snapshot.heroes) {
      const profile = HERO_PROFILES[hero.className];
      for (const stage of stages) {
        const res = recommendCounters(
          {
            myHeroClass: null,
            enemyHeroClass: hero.className,
            stage,
            damageProfile: profile.defaultDamage,
            modifiers: [],
            activeSlotsFull: false,
            language: 'de',
          },
          itemsByClass,
          heroesByClass,
        );

        expect(
          res.offense.length,
          `${hero.name} (${stage}) should have 1-3 offense counters`,
        ).toBeGreaterThanOrEqual(1);
        expect(res.offense.length).toBeLessThanOrEqual(3);
        expect(
          res.defense.length,
          `${hero.name} (${stage}) should have 1-3 defense counters`,
        ).toBeGreaterThanOrEqual(1);
        expect(res.defense.length).toBeLessThanOrEqual(3);

        // Enforce dynamic quality bar on 3rd slot (no weak filler)
        for (const list of [res.offense, res.defense]) {
          if (list.length === 3) {
            const topScore = list[0].score;
            const third = list[2];
            expect(
              third.score >= topScore * 0.6 || third.isHeroSpecific,
              `${hero.name} (${stage}) 3rd pick ${third.item.name} (${third.score}) below quality bar of top (${topScore})`,
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
        stage: 'late',
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
        stage: 'late',
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
        stage: 'mid',
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
        stage: 'mid',
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
  });

  it('attaches upgradeHint build paths (from/to component) on upgrade-family items', () => {
    const laneRes = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        stage: 'lane',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const rustedBarrel = laneRes.offense.find(
      (r) => r.item.className === 'upgrade_withering_whip',
    );
    expect(rustedBarrel?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'to',
        itemClassName: 'upgrade_greater_withering_whip',
      }),
    );

    const midRes = recommendCounters(
      {
        myHeroClass: 'hero_inferno',
        enemyHeroClass: 'hero_haze',
        stage: 'mid',
        damageProfile: 'bullet',
        modifiers: [],
        activeSlotsFull: false,
        language: 'de',
      },
      itemsByClass,
      heroesByClass,
    );
    const disarmingHex = midRes.offense.find(
      (r) => r.item.className === 'upgrade_greater_withering_whip',
    );
    expect(disarmingHex?.upgradeHint).toEqual(
      expect.objectContaining({
        direction: 'from',
        itemClassName: 'upgrade_withering_whip',
      }),
    );
  });
});
