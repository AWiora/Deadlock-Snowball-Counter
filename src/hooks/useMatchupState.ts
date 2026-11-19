import { useCallback, useEffect, useState } from 'react';
import { getHeroProfile } from '../data/heroProfiles';
import type { DamageProfile, EnemyModifier, GameStage, Language } from '../types/deadlock';

const STORAGE_MY_HERO = 'dl_counter_my_hero_v1';
const STORAGE_LANG = 'dl_counter_lang_v1';

const VALID_STAGES: GameStage[] = ['lane', 'mid', 'late'];
const VALID_DAMAGE: DamageProfile[] = ['bullet', 'equal', 'spirit'];
const VALID_MODS: EnemyModifier[] = ['tanky', 'healing', 'cc', 'melee'];
const VALID_LANGS: Language[] = ['de', 'en'];

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

  const storedLang = readStorage<Language>(STORAGE_LANG, 'de');
  const language: Language =
    urlLang && VALID_LANGS.includes(urlLang)
      ? urlLang
      : VALID_LANGS.includes(storedLang)
        ? storedLang
        : 'de';

  const storedMe = readStorage<string | null>(STORAGE_MY_HERO, null);
  const myHeroClass = urlMe || storedMe;
  const enemyHeroClass = urlVs || null;

  const stage: GameStage =
    urlStage && VALID_STAGES.includes(urlStage) ? urlStage : 'mid';

  let damageProfile: DamageProfile = 'bullet';
  let modifiers: EnemyModifier[] = [];

  if (enemyHeroClass) {
    const profile = getHeroProfile(enemyHeroClass);
    damageProfile =
      urlDmg && VALID_DAMAGE.includes(urlDmg) ? urlDmg : profile.defaultDamage;
    if (urlMods) {
      modifiers = urlMods
        .split(',')
        .filter((m): m is EnemyModifier => VALID_MODS.includes(m as EnemyModifier));
    }
  }

  const activeSlotsFull = urlPassive === '1' || urlPassive === 'true';

  return {
    language,
    myHeroClass,
    enemyHeroClass,
    stage,
    damageProfile,
    modifiers,
    activeSlotsFull,
  };
}

export function useMatchupState() {
  const initial = parseInitialState();

  const [language, setLanguageState] = useState<Language>(initial.language);
  const [myHeroClass, setMyHeroClassState] = useState<string | null>(initial.myHeroClass);
  const [enemyHeroClass, setEnemyHeroClassState] = useState<string | null>(initial.enemyHeroClass);
  const [previousEnemyClass, setPreviousEnemyClass] = useState<string | null>(null);
  const [stage, setStage] = useState<GameStage>(initial.stage);
  const [damageProfile, setDamageProfileState] = useState<DamageProfile>(initial.damageProfile);
  const [modifiers, setModifiersState] = useState<EnemyModifier[]>(initial.modifiers);
  const [activeSlotsFull, setActiveSlotsFull] = useState<boolean>(initial.activeSlotsFull);

  const [sessionEnemyTweaks, setSessionEnemyTweaks] = useState<Record<string, SavedEnemyOverride>>(() =>
    initial.enemyHeroClass
      ? {
          [initial.enemyHeroClass]: {
            damageProfile: initial.damageProfile,
            modifiers: initial.modifiers,
          },
        }
      : {},
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG, JSON.stringify(lang));
    } catch {
      // ignore
    }
  }, []);

  const setMyHeroClass = useCallback((heroClass: string | null) => {
    setMyHeroClassState(heroClass);
    try {
      localStorage.setItem(STORAGE_MY_HERO, JSON.stringify(heroClass));
    } catch {
      // ignore
    }
  }, []);

  const selectEnemyHero = useCallback(
    (heroClass: string) => {
      if (enemyHeroClass && enemyHeroClass !== heroClass) {
        setPreviousEnemyClass(enemyHeroClass);
      }
      setEnemyHeroClassState(heroClass);
      const saved = sessionEnemyTweaks[heroClass];
      if (saved) {
        setDamageProfileState(saved.damageProfile);
        setModifiersState(saved.modifiers);
      } else {
        const profile = getHeroProfile(heroClass);
        setDamageProfileState(profile.defaultDamage);
        setModifiersState([]);
      }
    },
    [enemyHeroClass, sessionEnemyTweaks],
  );

  const setDamageProfile = useCallback(
    (dmg: DamageProfile) => {
      setDamageProfileState(dmg);
      if (enemyHeroClass) {
        setSessionEnemyTweaks((prev) => ({
          ...prev,
          [enemyHeroClass]: {
            damageProfile: dmg,
            modifiers: prev[enemyHeroClass]?.modifiers ?? modifiers,
          },
        }));
      }
    },
    [enemyHeroClass, modifiers],
  );

  const toggleModifier = useCallback(
    (mod: EnemyModifier) => {
      setModifiersState((prev) => {
        const next = prev.includes(mod)
          ? prev.filter((m) => m !== mod)
          : [...prev, mod];
        if (enemyHeroClass) {
          setSessionEnemyTweaks((tweaks) => ({
            ...tweaks,
            [enemyHeroClass]: {
              damageProfile: tweaks[enemyHeroClass]?.damageProfile ?? damageProfile,
              modifiers: next,
            },
          }));
        }
        return next;
      });
    },
    [enemyHeroClass, damageProfile],
  );

  const resetEnemyDefaults = useCallback(() => {
    if (!enemyHeroClass) return;
    const profile = getHeroProfile(enemyHeroClass);
    setDamageProfileState(profile.defaultDamage);
    setModifiersState([]);
    setSessionEnemyTweaks((prev) => {
      const next = { ...prev };
      delete next[enemyHeroClass];
      return next;
    });
  }, [enemyHeroClass]);

  // Keep document lang & URL query params live-synced for instant Discord sharing
  useEffect(() => {
    document.documentElement.lang = language;
    const params = new URLSearchParams();
    if (language !== 'de') params.set('lang', language);
    if (myHeroClass) params.set('me', myHeroClass);
    if (enemyHeroClass) {
      params.set('vs', enemyHeroClass);
      params.set('stage', stage);
      params.set('dmg', damageProfile);
      if (modifiers.length > 0) params.set('mods', modifiers.join(','));
      if (activeSlotsFull) params.set('passive', '1');
    }
    const query = params.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [language, myHeroClass, enemyHeroClass, stage, damageProfile, modifiers, activeSlotsFull]);

  const isCustomized = (() => {
    if (!enemyHeroClass) return false;
    const def = getHeroProfile(enemyHeroClass);
    return damageProfile !== def.defaultDamage || modifiers.length > 0;
  })();

  return {
    language,
    setLanguage,
    myHeroClass,
    setMyHeroClass,
    enemyHeroClass,
    previousEnemyClass,
    selectEnemyHero,
    stage,
    setStage,
    damageProfile,
    setDamageProfile,
    modifiers,
    toggleModifier,
    activeSlotsFull,
    setActiveSlotsFull,
    resetEnemyDefaults,
    isCustomized,
  };
}
