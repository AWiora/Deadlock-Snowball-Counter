import { describe, expect, it } from 'vitest';
import { getBundledSnapshot } from '../data/apiClient';
import { recommendCounters } from './recommend';
import type { DeadlockHero, DeadlockItem } from '../types/deadlock';

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
    expect(res.defense.length).toBe(3);
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
});
