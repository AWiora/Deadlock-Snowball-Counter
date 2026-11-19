import { describe, expect, it } from 'vitest';
import type { DeadlockHero } from '../types/deadlock';
import { normalizeSearch, searchHeroes } from './heroSearch';

function hero(className: string, name: string, nameDe?: string): DeadlockHero {
  return {
    id: 0,
    className,
    name,
    nameDe,
    role: '',
    iconCard: '',
    iconSmall: '',
    minimapIcon: '',
  };
}

const ROSTER: DeadlockHero[] = [
  hero('hero_atlas', 'Abrams'),
  hero('hero_astro', 'Holliday'),
  hero('hero_ghost', 'Lady Geist'),
  hero('hero_haze', 'Haze'),
  hero('hero_krill', 'Mo & Krill'),
  hero('hero_nurse', 'Nurse Harrow'),
  hero('hero_orion', 'Grey Talon'),
  hero('hero_doorman', 'The Doorman', 'Doorman'),
  hero('hero_shiv', 'Shiv'),
];

const names = (query: string) => searchHeroes(ROSTER, query).map((h) => h.name);

describe('searchHeroes', () => {
  it('returns the full roster for an empty query', () => {
    expect(searchHeroes(ROSTER, '   ')).toHaveLength(ROSTER.length);
  });

  it('ranks name prefixes first', () => {
    expect(names('ha')[0]).toBe('Haze');
    expect(names('ha')).toContain('Nurse Harrow');
  });

  it('matches later words and ignores punctuation', () => {
    expect(names('krill')).toEqual(['Mo & Krill']);
    expect(names('lady g')).toEqual(['Lady Geist']);
    expect(names('geist')).toEqual(['Lady Geist']);
  });

  it('matches initials of multi-word names', () => {
    expect(names('gt')).toEqual(['Grey Talon']);
    expect(names('nh')).toEqual(['Nurse Harrow']);
  });

  it('uses the German display name too', () => {
    expect(names('doorm')).toEqual(['The Doorman']);
  });

  it('does not match internal class names', () => {
    expect(names('atlas')).toEqual([]);
    expect(names('astro')).toEqual([]);
  });

  it('is case and accent insensitive', () => {
    expect(normalizeSearch('  ÁbRaMs ')).toBe('abrams');
    expect(names('SHIV')).toEqual(['Shiv']);
  });
});
