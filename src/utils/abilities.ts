import type { DeadlockAbility, DeadlockHero, Language } from '../types/deadlock';

/**
 * Common community / legacy shorthand aliases used in curated tips, mapped to the
 * official Deadlock ability class_name (scoped per hero so generic words never collide).
 */
const HERO_ABILITY_ALIASES: Record<string, Record<string, string[]>> = {
  hero_bebop: {
    citadel_ability_hook: ['Hook', 'Greifhaken'],
    citadel_ability_sticky_bomb: ['Sticky Bombs', 'Sticky-Bomb', 'Sticky-Bombs'],
    citadel_ability_uppercut: ['Uppercut'],
  },
  hero_unicorn: {
    ability_unicorn_prismaticguard: ['Prism Shield'],
  },
  hero_deadpack: {
    ability_deadpack_ultimate: ['Jetpack Grab'],
  },
  hero_orion: {
    ability_immobilize_trap: ['Immobilizing Trap'],
  },
  hero_mirage: {
    mirage_tornado: ['Tornado'],
    mirage_sand_phantom: ["Djinn's Marks"],
  },
  hero_doorman: {
    ability_doorman_hotel: ['Baroness Hotel'],
  },
  hero_priest: {
    ability_priest_beartrap: ['Snap Trap', 'Snap Traps'],
  },
  hero_synth: {
    ability_synth_plasmaflux: ['Cloak'],
    ability_synth_satchel: ['Satchel'],
  },
  hero_viscous: {
    citadel_ability_viscous_telepunch: ['Punch'],
    citadel_ability_goo_cube: ['Cube', 'Heilwürfel'],
  },
  hero_lash: {
    citadel_ability_lash_down_strike: ['Ground-Strike'],
  },
  hero_haze: {
    citadel_ability_sleep_dagger: ['Dagger'],
  },
  hero_ghost: {
    citadel_ability_blood_bomb: ['Essence Bomb', 'Bomb-Spam'],
  },
  hero_tengu: {
    citadel_ability_tengu_stone_form: ['Stone-Form'],
  },
  hero_shiv: {
    citadel_ability_shiv_dagger: ['Serrated Knives'],
  },
  hero_chrono: {
    citadel_ability_chrono_swap: ['Swap'],
  },
  hero_forge: {
    citadel_ability_turret: ['Turrets'],
  },
};

export function getAbilityDisplayName(ability: DeadlockAbility, inGameLang: Language): string {
  return inGameLang === 'de' && ability.nameDe ? ability.nameDe : ability.name;
}

export function getAbilityDescription(ability: DeadlockAbility, uiLang: Language): string {
  return uiLang === 'de' && ability.descDe ? ability.descDe : ability.descEn;
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves an ability on a specific hero by exact EN/DE name, normalized name, or alias.
 */
export function resolveHeroAbility(
  hero: DeadlockHero | null | undefined,
  nameOrAlias: string,
): DeadlockAbility | null {
  const abilities = hero?.abilities;
  if (!abilities || abilities.length === 0) return null;

  const target = normalizeName(nameOrAlias);
  for (const ab of abilities) {
    if (normalizeName(ab.name) === target || normalizeName(ab.nameDe) === target) {
      return ab;
    }
  }

  const aliasMap = HERO_ABILITY_ALIASES[hero.className];
  if (aliasMap) {
    for (const [className, aliases] of Object.entries(aliasMap)) {
      if (aliases.some((a) => normalizeName(a) === target)) {
        const found = abilities.find((ab) => ab.className === className);
        if (found) return found;
      }
    }
  }

  return null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface CandidatePattern {
  pattern: string;
  ability: DeadlockAbility;
}

function collectHeroAbilityPatterns(heroes: DeadlockHero[]): CandidatePattern[] {
  const seen = new Set<string>();
  const patterns: CandidatePattern[] = [];

  for (const hero of heroes) {
    const abilities = hero.abilities;
    if (!abilities || abilities.length === 0) continue;

    const aliasMap = HERO_ABILITY_ALIASES[hero.className] ?? {};
    for (const ab of abilities) {
      const terms = [ab.name, ab.nameDe, ...(aliasMap[ab.className] ?? [])];
      for (const raw of terms) {
        const term = raw.trim();
        if (term.length < 3) continue;
        const key = term.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        patterns.push({ pattern: term, ability: ab });
      }
    }
  }

  // Longest patterns first so multi-word ability names beat shorter substrings
  patterns.sort((a, b) => b.pattern.length - a.pattern.length);
  return patterns;
}

export type AbilityTextSegment =
  | { type: 'text'; text: string }
  | { type: 'ability'; text: string; ability: DeadlockAbility };

/**
 * Splits a tactical text into plain text and interactive ability mentions for the given heroes,
 * automatically translating every matched ability name to `inGameLang`.
 */
export function segmentTextWithAbilities(
  text: string,
  heroes: DeadlockHero[],
  inGameLang: Language,
): AbilityTextSegment[] {
  if (!text || heroes.length === 0) {
    return text ? [{ type: 'text', text }] : [];
  }

  const patterns = collectHeroAbilityPatterns(heroes);
  if (patterns.length === 0) {
    return [{ type: 'text', text }];
  }

  const byLower = new Map<string, DeadlockAbility>();
  for (const p of patterns) {
    byLower.set(p.pattern.toLowerCase(), p.ability);
  }

  const alternation = patterns.map((p) => escapeRegex(p.pattern)).join('|');
  // Unicode letter/digit boundary so we don't match inside words, while allowing hyphens & punctuation
  const regex = new RegExp(`(?<![\\p{L}\\p{N}])(${alternation})(?![\\p{L}\\p{N}])`, 'giu');

  const segments: AbilityTextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const matchedStr = match[0];
    const ability = byLower.get(matchedStr.toLowerCase());
    if (!ability) continue;

    if (start > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, start) });
    }

    segments.push({
      type: 'ability',
      text: getAbilityDisplayName(ability, inGameLang),
      ability,
    });

    lastIndex = start + matchedStr.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', text }];
}

/**
 * Replaces ability names/aliases of the given heroes in `text` with their official `inGameLang` names.
 */
export function localizeAbilityMentions(
  text: string,
  heroes: DeadlockHero[],
  inGameLang: Language,
): string {
  const segments = segmentTextWithAbilities(text, heroes, inGameLang);
  return segments.map((s) => s.text).join('');
}
