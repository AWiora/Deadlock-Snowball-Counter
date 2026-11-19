import { useCallback, useEffect, useMemo, useState } from 'react';
import { getHeroProfile } from '../data/heroProfiles';
import type {
  DamageProfile,
  EnemyModifier,
  EnemyTargetConfig,
  GameStage,
  Language,
} from '../types/deadlock';

const STORAGE_MY_HERO = 'dl_counter_my_hero_v1';
const STORAGE_LANG = 'dl_counter_lang_v1';
const STORAGE_ITEM_LANG = 'dl_counter_item_lang_v1';

const VALID_STAGES: GameStage[] = ['lane', 'mid', 'late'];
const VALID_DAMAGE: DamageProfile[] = ['bullet', 'equal', 'spirit'];
const VALID_MODS: EnemyModifier[] = ['tanky', 'healing', 'cc', 'melee', 'mobility'];
const VALID_LANGS: Language[] = ['de', 'en'];
const MAX_ENEMY_TARGETS = 3;

interface SavedEnemyOverride {
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function parseInitialState() {
  const params = new URLSearchParams(window.location.search);
  const urlMe = params.get('me');
  const urlVs = params.get('vs');
  const urlStage = params.get('stage') as GameStage | null;
  const urlDmg = params.get('dmg') as DamageProfile | null;
  const urlMods = params.get('mods');
  const urlPassive = params.get('passive');
  const urlLang = params.get('lang') as Language | null;
  const urlItemLang = params.get('ilang') as Language | null;

  const storedLang = readStorage<Language>(STORAGE_LANG, 'de');
  const language: Language =
    urlLang && VALID_LANGS.includes(urlLang)
      ? urlLang
      : VALID_LANGS.includes(storedLang)
        ? storedLang
        : 'de';

  const storedItemLang = readStorage<Language>(STORAGE_ITEM_LANG, 'en');
  const itemLanguage: Language =
    urlItemLang && VALID_LANGS.includes(urlItemLang)
      ? urlItemLang
      : VALID_LANGS.includes(storedItemLang)
        ? storedItemLang
        : 'en';

  const storedMe = readStorage<string | null>(STORAGE_MY_HERO, null);
  const myHeroClass = urlMe || storedMe;

  const enemyClasses = urlVs
    ? Array.from(new Set(urlVs.split(',').map((s) => s.trim()).filter(Boolean))).slice(
        0,
        MAX_ENEMY_TARGETS,
      )
    : [];

  const stage: GameStage =
    urlStage && VALID_STAGES.includes(urlStage) ? urlStage : 'mid';

  const parsedMods: EnemyModifier[] = urlMods
    ? urlMods
        .split(',')
        .filter((m): m is EnemyModifier => VALID_MODS.includes(m as EnemyModifier))
    : [];

  const initialTweaks: Record<string, SavedEnemyOverride> = {};
  for (let i = 0; i < enemyClasses.length; i++) {
    const cls = enemyClasses[i];
    const profile = getHeroProfile(cls);
    const dmg =
      i === 0 && urlDmg && VALID_DAMAGE.includes(urlDmg)
        ? urlDmg
        : profile.defaultDamage;
    const mods = i === 0 ? parsedMods : [];
    initialTweaks[cls] = { damageProfile: dmg, modifiers: mods };
  }

  const activeSlotsFull = urlPassive === '1' || urlPassive === 'true';

  return {
    language,
    itemLanguage,
    myHeroClass,
    enemyClasses,
    focusedEnemyClass: enemyClasses[0] ?? null,
    stage,
    initialTweaks,
    activeSlotsFull,
  };
}

export function useMatchupState() {
  const initial = parseInitialState();

  const [language, setLanguageState] = useState<Language>(initial.language);
  const [itemLanguage, setItemLanguageState] = useState<Language>(initial.itemLanguage);
  const [myHeroClass, setMyHeroClassState] = useState<string | null>(initial.myHeroClass);
  const [enemyClasses, setEnemyClasses] = useState<string[]>(initial.enemyClasses);
  const [focusedEnemyClass, setFocusedEnemyClass] = useState<string | null>(
    initial.focusedEnemyClass,
  );
  const [stage, setStage] = useState<GameStage>(initial.stage);
  const [activeSlotsFull, setActiveSlotsFull] = useState<boolean>(initial.activeSlotsFull);
  const [sessionEnemyTweaks, setSessionEnemyTweaks] = useState<
    Record<string, SavedEnemyOverride>
  >(initial.initialTweaks);

  const activeFocusedClass = useMemo(() => {
    if (focusedEnemyClass && enemyClasses.includes(focusedEnemyClass)) {
      return focusedEnemyClass;
    }
    return enemyClasses[0] ?? null;
  }, [focusedEnemyClass, enemyClasses]);

  const enemyTargets: EnemyTargetConfig[] = useMemo(() => {
    return enemyClasses.map((cls) => {
      const saved = sessionEnemyTweaks[cls];
      const profile = getHeroProfile(cls);
      return {
        heroClass: cls,
        damageProfile: saved?.damageProfile ?? profile.defaultDamage,
        modifiers: saved?.modifiers ?? [],
      };
    });
  }, [enemyClasses, sessionEnemyTweaks]);

  // Put focused enemy first in scoring targets so their headline/stance leads when focused
  const orderedEnemyTargets: EnemyTargetConfig[] = useMemo(() => {
    if (!activeFocusedClass) return enemyTargets;
    const focused = enemyTargets.find((t) => t.heroClass === activeFocusedClass);
    const others = enemyTargets.filter((t) => t.heroClass !== activeFocusedClass);
    return focused ? [focused, ...others] : enemyTargets;
  }, [enemyTargets, activeFocusedClass]);

  const focusedConfig = useMemo(() => {
    if (!activeFocusedClass) {
      return { damageProfile: 'bullet' as DamageProfile, modifiers: [] as EnemyModifier[] };
    }
    const saved = sessionEnemyTweaks[activeFocusedClass];
    const profile = getHeroProfile(activeFocusedClass);
    return {
      damageProfile: saved?.damageProfile ?? profile.defaultDamage,
      modifiers: saved?.modifiers ?? [],
    };
  }, [activeFocusedClass, sessionEnemyTweaks]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG, JSON.stringify(lang));
    } catch {
      // ignore
    }
  }, []);

  const setItemLanguage = useCallback((lang: Language) => {
    setItemLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_ITEM_LANG, JSON.stringify(lang));
    } catch {
      // ignore
    }
  }, []);

  const setMyHeroClass = useCallback((heroClass: string | null) => {
    setMyHeroClassState(heroClass);
    if (heroClass) {
      setEnemyClasses((prev) => prev.filter((c) => c !== heroClass));
    }
    try {
      localStorage.setItem(STORAGE_MY_HERO, JSON.stringify(heroClass));
    } catch {
      // ignore
    }
  }, []);

  const ensureEnemyTweak = useCallback((heroClass: string) => {
    setSessionEnemyTweaks((prev) => {
      if (prev[heroClass]) return prev;
      const profile = getHeroProfile(heroClass);
      return {
        ...prev,
        [heroClass]: {
          damageProfile: profile.defaultDamage,
          modifiers: [],
        },
      };
    });
  }, []);

  /**
   * Smart 1-click behavior in the inline hero roster:
   * - If NOT selected: adds it (up to 3; if full, replaces the 3rd slot) and focuses it
   * - If ALREADY selected but NOT currently focused: focuses it (so you can edit its toggles without removing it!)
   * - If ALREADY selected AND already focused: removes it
   */
  const toggleEnemyHero = useCallback(
    (heroClass: string) => {
      if (heroClass === myHeroClass) return;
      ensureEnemyTweak(heroClass);

      if (enemyClasses.includes(heroClass)) {
        if (activeFocusedClass !== heroClass) {
          setFocusedEnemyClass(heroClass);
          return;
        }
        setEnemyClasses((prev) => {
          const next = prev.filter((c) => c !== heroClass);
          setFocusedEnemyClass(next[0] ?? null);
          return next;
        });
        return;
      }

      setEnemyClasses((prev) => {
        const next =
          prev.length < MAX_ENEMY_TARGETS
            ? [...prev, heroClass]
            : [...prev.slice(0, MAX_ENEMY_TARGETS - 1), heroClass];
        setFocusedEnemyClass(heroClass);
        return next;
      });
    },
    [myHeroClass, enemyClasses, activeFocusedClass, ensureEnemyTweak],
  );

  const selectEnemyHero = useCallback(
    (heroClass: string) => {
      toggleEnemyHero(heroClass);
    },
    [toggleEnemyHero],
  );

  const focusEnemyHero = useCallback((heroClass: string) => {
    setFocusedEnemyClass(heroClass);
  }, []);

  const removeEnemyHero = useCallback((heroClass: string) => {
    setEnemyClasses((prev) => {
      const next = prev.filter((c) => c !== heroClass);
      setFocusedEnemyClass((currFocus) =>
        currFocus === heroClass ? next[0] ?? null : currFocus,
      );
      return next;
    });
  }, []);

  const clearAllEnemies = useCallback(() => {
    setEnemyClasses([]);
    setFocusedEnemyClass(null);
    setSessionEnemyTweaks({});
  }, []);

  const setDamageProfile = useCallback(
    (dmg: DamageProfile) => {
      if (!activeFocusedClass) return;
      setSessionEnemyTweaks((prev) => ({
        ...prev,
        [activeFocusedClass]: {
          damageProfile: dmg,
          modifiers: prev[activeFocusedClass]?.modifiers ?? [],
        },
      }));
    },
    [activeFocusedClass],
  );

  const toggleModifier = useCallback(
    (mod: EnemyModifier) => {
      if (!activeFocusedClass) return;
      setSessionEnemyTweaks((prev) => {
        const curr = prev[activeFocusedClass] ?? {
          damageProfile: getHeroProfile(activeFocusedClass).defaultDamage,
          modifiers: [],
        };
        const nextMods = curr.modifiers.includes(mod)
          ? curr.modifiers.filter((m) => m !== mod)
          : [...curr.modifiers, mod];
        return {
          ...prev,
          [activeFocusedClass]: {
            damageProfile: curr.damageProfile,
            modifiers: nextMods,
          },
        };
      });
    },
    [activeFocusedClass],
  );

  const resetEnemyDefaults = useCallback(() => {
    if (!activeFocusedClass) return;
    const profile = getHeroProfile(activeFocusedClass);
    setSessionEnemyTweaks((prev) => ({
      ...prev,
      [activeFocusedClass]: {
        damageProfile: profile.defaultDamage,
        modifiers: [],
      },
    }));
  }, [activeFocusedClass]);

  // Keep document lang & URL query params live-synced for instant Discord sharing
  useEffect(() => {
    document.documentElement.lang = language;
    const params = new URLSearchParams();
    if (language !== 'de') params.set('lang', language);
    if (itemLanguage !== 'en') params.set('ilang', itemLanguage);
    if (myHeroClass) params.set('me', myHeroClass);
    if (enemyClasses.length > 0) {
      params.set('vs', enemyClasses.join(','));
      params.set('stage', stage);
      params.set('dmg', focusedConfig.damageProfile);
      if (focusedConfig.modifiers.length > 0) {
        params.set('mods', focusedConfig.modifiers.join(','));
      }
      if (activeSlotsFull) params.set('passive', '1');
    }
    const query = params.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [
    language,
    itemLanguage,
    myHeroClass,
    enemyClasses,
    stage,
    focusedConfig.damageProfile,
    focusedConfig.modifiers,
    activeSlotsFull,
  ]);

  const isCustomized = (() => {
    if (!activeFocusedClass) return false;
    const def = getHeroProfile(activeFocusedClass);
    return (
      focusedConfig.damageProfile !== def.defaultDamage ||
      focusedConfig.modifiers.length > 0
    );
  })();

  return {
    language,
    setLanguage,
    itemLanguage,
    setItemLanguage,
    myHeroClass,
    setMyHeroClass,
    enemyHeroClass: activeFocusedClass,
    enemyClasses,
    enemyTargets,
    orderedEnemyTargets,
    focusedEnemyClass: activeFocusedClass,
    selectEnemyHero,
    toggleEnemyHero,
    focusEnemyHero,
    removeEnemyHero,
    clearAllEnemies,
    stage,
    setStage,
    damageProfile: focusedConfig.damageProfile,
    setDamageProfile,
    modifiers: focusedConfig.modifiers,
    toggleModifier,
    activeSlotsFull,
    setActiveSlotsFull,
    resetEnemyDefaults,
    isCustomized,
  };
}
