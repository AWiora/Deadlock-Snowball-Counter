import type { DeadlockHero } from '../types/deadlock';

/** Lowercases, strips accents and collapses punctuation ("Mo & Krill" -> "mo krill"). */
export function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Lower is better. null = no match.
 * 0: whole name starts with the query ("haz" -> Haze, "ladyg" -> Lady Geist)
 * 1: any word starts with it ("krill" -> Mo & Krill, "door" -> The Doorman)
 * 2: name contains it anywhere
 * 3: initials of a multi-word name ("gt" -> Grey Talon, "nh" -> Nurse Harrow)
 */
function rankName(name: string, compactQuery: string): number | null {
  const norm = normalizeSearch(name);
  if (!norm) return null;
  const words = norm.split(' ');
  const compact = words.join('');
  if (compact.startsWith(compactQuery)) return 0;
  if (words.some((w) => w.startsWith(compactQuery))) return 1;
  if (compact.includes(compactQuery)) return 2;
  if (words.length > 1 && words.map((w) => w[0]).join('').startsWith(compactQuery)) return 3;
  return null;
}

/**
 * Filters and ranks heroes for type-to-search. Matches English and German display
 * names only (internal class names like `hero_atlas` would produce confusing hits).
 * Ties keep the incoming roster order, so results stay predictable.
 */
export function searchHeroes(heroes: DeadlockHero[], query: string): DeadlockHero[] {
  const compactQuery = normalizeSearch(query).replace(/ /g, '');
  if (!compactQuery) return heroes;

  const scored: { hero: DeadlockHero; rank: number; index: number }[] = [];
  heroes.forEach((hero, index) => {
    let best: number | null = null;
    for (const name of [hero.name, hero.nameDe]) {
      if (!name) continue;
      const rank = rankName(name, compactQuery);
      if (rank !== null && (best === null || rank < best)) best = rank;
    }
    if (best !== null) scored.push({ hero, rank: best, index });
  });

  scored.sort((a, b) => a.rank - b.rank || a.index - b.index);
  return scored.map((s) => s.hero);
}
