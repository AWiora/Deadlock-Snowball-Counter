import {
  ChevronDown,
  ChevronUp,
  Plus,
  RotateCcw,
  Search,
  User,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getHeroProfile } from '../data/heroProfiles';
import { PRICE_TIER_IDS } from '../data/priceTiers';
import { getBaseKitTags } from '../engine/recommend';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
import { searchHeroes } from '../utils/heroSearch';
import { DamageTypeIcon } from './DamageTypeIcon';
import { HeroAbilityStrip } from './HeroAbilityStrip';
import type {
  DamageProfile,
  DeadlockHero,
  EnemyModifier,
  EnemyTargetConfig,
  Language,
  PriceTier,
} from '../types/deadlock';

interface MatchupControlBarProps {
  language: Language;
  itemLanguage: Language;
  heroes: DeadlockHero[];
  heroesByClass: Map<string, DeadlockHero>;
  myHero: DeadlockHero | null;
  enemyTargets: EnemyTargetConfig[];
  focusedEnemy: DeadlockHero | null;
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
  isCustomized: boolean;
  onSelectMyHero: (className: string | null) => void;
  onToggleEnemy: (className: string) => void;
  onFocusEnemy: (className: string) => void;
  onRemoveEnemy: (className: string) => void;
  onClearAllEnemies: () => void;
  onChangePriceTier: (tier: PriceTier) => void;
  onChangeDamage: (dmg: DamageProfile) => void;
  onToggleModifier: (mod: EnemyModifier) => void;
  onResetDefaults: () => void;
}

const MAX_ENEMIES = 3;
const WIDE_QUERY = '(min-width: 1180px)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

const DAMAGE_META: { id: DamageProfile; tone: string }[] = [
  { id: 'bullet', tone: 'weapon' },
  { id: 'equal', tone: 'mixed' },
  { id: 'spirit', tone: 'spirit' },
];

// Stat glyphs from the Deadlock Wiki (cdn.deadlock.wiki): one white icon set
const MODIFIER_META: { id: EnemyModifier; icon: string }[] = [
  { id: 'tanky', icon: 'https://cdn.deadlock.wiki/Health.png' },
  { id: 'healing', icon: 'https://cdn.deadlock.wiki/Healing.png' },
  { id: 'cc', icon: 'https://cdn.deadlock.wiki/Status_Stun.png' },
  { id: 'melee', icon: 'https://cdn.deadlock.wiki/Melee_damage.png' },
  { id: 'mobility', icon: 'https://cdn.deadlock.wiki/Move_speed.png' },
];

/** Extra stacks plus a changed damage focus: what "Zurücksetzen" would undo. */
function countCustomizations(target: EnemyTargetConfig): number {
  return (
    target.modifiers.length +
    (target.damageProfile !== getHeroProfile(target.heroClass).defaultDamage ? 1 : 0)
  );
}

function matchesMedia(query: string): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false;
}

function isTypingField(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

export function MatchupControlBar({
  language,
  itemLanguage,
  heroes,
  heroesByClass,
  myHero,
  enemyTargets,
  focusedEnemy,
  damageProfile,
  modifiers,
  isCustomized,
  onSelectMyHero,
  onToggleEnemy,
  onFocusEnemy,
  onRemoveEnemy,
  onClearAllEnemies,
  onChangePriceTier,
  onChangeDamage,
  onToggleModifier,
  onResetDefaults,
}: MatchupControlBarProps) {
  const t = UI_TEXT[language];
  const [isPickingMyHero, setIsPickingMyHero] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  // Only affects narrow layouts: the roster folds away once an enemy is picked so results are on screen.
  const [rosterOpen, setRosterOpen] = useState(false);
  const [tuningOpen, setTuningOpen] = useState(() => matchesMedia(WIDE_QUERY));
  const searchRef = useRef<HTMLInputElement | null>(null);

  const myHeroName = myHero ? getHeroDisplayName(myHero, language) : null;
  const focusedEnemyName = focusedEnemy ? getHeroDisplayName(focusedEnemy, language) : null;
  const baseKitTags = focusedEnemy ? getBaseKitTags(focusedEnemy.className, language) : [];
  const enemyCount = enemyTargets.length;

  const enemyIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    enemyTargets.forEach((et, idx) => map.set(et.heroClass, idx + 1));
    return map;
  }, [enemyTargets]);

  const trimmedQuery = query.trim();
  const visibleHeroes = useMemo(
    () => (trimmedQuery ? searchHeroes(heroes, trimmedQuery) : heroes),
    [heroes, trimmedQuery],
  );
  // Enter never targets your own hero while picking enemies
  const enterCandidates = useMemo(
    () =>
      trimmedQuery
        ? visibleHeroes.filter((h) => isPickingMyHero || h.className !== myHero?.className)
        : [],
    [trimmedQuery, visibleHeroes, isPickingMyHero, myHero],
  );
  const activeHero =
    enterCandidates.length > 0
      ? enterCandidates[Math.min(activeIdx, enterCandidates.length - 1)]
      : null;

  const rosterCollapsed =
    enemyCount > 0 && !rosterOpen && !isPickingMyHero && trimmedQuery === '';

  const resetSearch = () => {
    setQuery('');
    setActiveIdx(0);
  };

  /**
   * source 'click' keeps the roster's existing toggle semantics (click a focused enemy again to remove it);
   * source 'search' only ever adds or focuses, so a stray Enter can't drop an enemy.
   */
  const pickHero = (heroClass: string, source: 'click' | 'search') => {
    if (isPickingMyHero) {
      onSelectMyHero(heroClass);
      setIsPickingMyHero(false);
      resetSearch();
      return;
    }
    if (heroClass === myHero?.className) return;

    const isEnemy = enemyIndexMap.has(heroClass);
    if (isEnemy && source === 'search') {
      onFocusEnemy(heroClass);
    } else {
      onToggleEnemy(heroClass);
      if (!isEnemy) setRosterOpen(false);
    }
    resetSearch();
  };

  const togglePickMyHero = () => {
    setIsPickingMyHero((v) => !v);
    resetSearch();
  };

  const openRosterForAdding = () => {
    setIsPickingMyHero(false);
    setRosterOpen(true);
    // Focusing on touch devices would pop the keyboard over the roster
    if (matchesMedia(FINE_POINTER_QUERY)) searchRef.current?.focus();
  };

  // Global hotkeys: 1-5 switch souls tier, letters jump into hero search, Esc backs out
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
      const inSearch = e.target === searchRef.current;
      if (!inSearch && isTypingField(e.target)) return;

      if (/^[1-5]$/.test(e.key)) {
        e.preventDefault();
        onChangePriceTier(PRICE_TIER_IDS[Number(e.key) - 1]);
        return;
      }
      if (inSearch) return;

      if (e.key === 'Escape' && isPickingMyHero) {
        setIsPickingMyHero(false);
        return;
      }
      if (e.key.length === 1 && /\p{L}/u.test(e.key)) {
        e.preventDefault();
        setQuery((q) => q + e.key);
        setActiveIdx(0);
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onChangePriceTier, isPickingMyHero]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeHero) pickHero(activeHero.className, 'search');
      return;
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && enterCandidates.length > 0) {
      e.preventDefault();
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const current = Math.min(activeIdx, enterCandidates.length - 1);
      setActiveIdx((current + delta + enterCandidates.length) % enterCandidates.length);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (query) {
        resetSearch();
      } else {
        if (isPickingMyHero) setIsPickingMyHero(false);
        searchRef.current?.blur();
      }
    }
  };

  const focusedTarget = focusedEnemy
    ? enemyTargets.find((et) => et.heroClass === focusedEnemy.className)
    : undefined;
  const focusedCustomCount = focusedTarget ? countCustomizations(focusedTarget) : 0;
  const metaPct =
    typeof focusedEnemy?.metaWeaponPct === 'number' ? Math.round(focusedEnemy.metaWeaponPct) : null;

  return (
    <section className="picker" aria-label="Matchup">
      {/* Lineup: your hero + up to 3 enemies */}
      <div className="lineup">
        <div
          className={`me-card ${
            isPickingMyHero ? 'me-card--picking' : myHero ? 'me-card--filled' : 'me-card--empty'
          }`}
        >
          <button
            type="button"
            className="me-card-pick"
            onClick={togglePickMyHero}
            tabIndex={-1}
            aria-hidden="true"
          >
            {myHero?.iconCard || myHero?.iconSmall ? (
              <img src={myHero.iconCard || myHero.iconSmall} alt="" className="me-card-avatar" />
            ) : (
              <span className="me-card-avatar me-card-avatar--empty">
                <User size={18} />
              </span>
            )}
            <span className="me-card-copy">
              <span className="pane-label">{t.yourHeroLabel}</span>
              <span className={`me-card-name ${myHero ? '' : 'me-card-name--empty'}`}>
                {myHeroName ?? t.yourHeroEmpty}
              </span>
            </span>
          </button>
          <button
            type="button"
            className="me-card-action"
            onClick={togglePickMyHero}
            aria-pressed={isPickingMyHero}
          >
            {isPickingMyHero
              ? t.cancelMyPickBtn
              : myHero
                ? t.yourHeroChangeBtn
                : t.yourHeroSelectBtn}
          </button>
          {myHero && !isPickingMyHero && (
            <button
              type="button"
              className="me-card-clear"
              onClick={() => onSelectMyHero(null)}
              aria-label={t.yourHeroClearAria}
              title={t.yourHeroClearAria}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="lineup-enemies">
          <div className="lineup-head">
            <span className="pane-label">
              {t.enemyLabel}
              <span className="pane-label-count">
                {enemyCount}/{MAX_ENEMIES}
              </span>
            </span>
            {enemyCount > 0 && (
              <button
                type="button"
                className="lineup-clear"
                onClick={onClearAllEnemies}
                title={t.clearEnemiesTitle}
              >
                {t.clearEnemiesBtn}
              </button>
            )}
          </div>

          <div className="enemy-chips">
            {enemyTargets.map((target) => {
              const hero = heroesByClass.get(target.heroClass);
              if (!hero) return null;
              const name = getHeroDisplayName(hero, language);
              const isFocused = focusedEnemy?.className === hero.className;
              return (
                <div
                  key={hero.className}
                  className={`enemy-chip ${isFocused && enemyCount > 1 ? 'enemy-chip--focused' : ''}`}
                >
                  <button
                    type="button"
                    className="enemy-chip-main"
                    onClick={() => onFocusEnemy(hero.className)}
                    aria-pressed={isFocused}
                    title={name}
                  >
                    {(hero.iconSmall || hero.iconCard) && (
                      <img src={hero.iconSmall || hero.iconCard} alt="" className="enemy-chip-avatar" />
                    )}
                    <span className="enemy-chip-name">{name}</span>
                  </button>
                  <button
                    type="button"
                    className="enemy-chip-remove"
                    onClick={() => onRemoveEnemy(hero.className)}
                    aria-label={t.removeEnemyAria(name)}
                    title={t.removeEnemyAria(name)}
                  >
                    <X size={13} />
                  </button>
                </div>
              );
            })}
            {enemyCount === 0 && <span className="enemy-chip-placeholder">{t.enemyEmpty}</span>}
            {enemyCount > 0 && enemyCount < MAX_ENEMIES && (
              <button
                type="button"
                className="enemy-chip-add"
                onClick={openRosterForAdding}
                title={t.addEnemyTitle}
              >
                <Plus size={14} />
                <span>{t.addEnemyBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search + roster */}
      <div
        className={`roster ${isPickingMyHero ? 'roster--picking-my' : ''} ${
          rosterCollapsed ? 'roster--collapsed' : ''
        }`}
      >
        <div className="roster-search-row">
          <label className="roster-search">
            <Search size={15} className="roster-search-icon" aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              className="roster-search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIdx(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder={isPickingMyHero ? t.searchPlaceholderMy : t.searchPlaceholderEnemy}
              aria-label={isPickingMyHero ? t.searchPlaceholderMy : t.searchPlaceholderEnemy}
              autoComplete="off"
              spellCheck={false}
            />
            {activeHero ? (
              <span className="roster-search-enter" aria-live="polite">
                <kbd>{t.searchEnterHint}</kbd>
                <span className="roster-search-enter-name">
                  {getHeroDisplayName(activeHero, language)}
                </span>
              </span>
            ) : (
              !query && <span className="roster-search-hint">{t.searchTypeHint}</span>
            )}
          </label>
          {enemyCount > 0 && !isPickingMyHero && (
            <button
              type="button"
              className="roster-toggle"
              onClick={() => {
                if (rosterCollapsed) {
                  setRosterOpen(true);
                } else {
                  setRosterOpen(false);
                  resetSearch();
                }
              }}
              aria-expanded={!rosterCollapsed}
            >
              {rosterCollapsed ? t.rosterToggleBtn : t.rosterDoneBtn}
              {rosterCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          )}
        </div>

        {isPickingMyHero && <p className="roster-hint">{t.rosterHintMyHero}</p>}

        {trimmedQuery && visibleHeroes.length === 0 ? (
          <p className="roster-empty">{t.searchNoMatch(trimmedQuery)}</p>
        ) : (
          <div className="inline-roster-grid" role="group" aria-label="Hero roster">
            {visibleHeroes.map((hero) => {
              const name = getHeroDisplayName(hero, language);
              const isMy = hero.className === myHero?.className;
              const enemyIdx = enemyIndexMap.get(hero.className);
              const isEnemy = enemyIdx !== undefined;
              const isFocusedEnemy = hero.className === focusedEnemy?.className;
              const isActive = activeHero?.className === hero.className;

              return (
                <button
                  key={hero.className}
                  type="button"
                  disabled={!isPickingMyHero && isMy}
                  onClick={() => pickHero(hero.className, 'click')}
                  title={name}
                  className={`roster-cell ${isMy ? 'roster-cell--my' : ''} ${
                    isEnemy ? 'roster-cell--enemy' : ''
                  } ${isFocusedEnemy && enemyCount > 1 ? 'roster-cell--focused' : ''} ${
                    isActive ? 'roster-cell--active' : ''
                  }`}
                >
                  <div className="roster-cell-img-wrap">
                    {hero.iconSmall || hero.iconCard ? (
                      <img
                        src={hero.iconSmall || hero.iconCard}
                        alt=""
                        className="roster-cell-img"
                        loading="lazy"
                      />
                    ) : (
                      <span className="roster-cell-fallback">{name.slice(0, 2)}</span>
                    )}
                    {isMy && <span className="roster-cell-badge roster-cell-badge--my">{t.youBadge}</span>}
                    {isEnemy && (
                      <span className="roster-cell-badge roster-cell-badge--enemy">{enemyIdx}</span>
                    )}
                  </div>
                  <span
                    className={`roster-cell-name ${name.length > 9 ? 'roster-cell-name--long' : ''}`}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Build tuning for the focused enemy */}
      {focusedEnemy && focusedTarget && (
        <div className={`tuning ${tuningOpen ? 'tuning--open' : ''}`}>
          <div className="tuning-head">
            {enemyCount > 1 ? (
              <>
                <span className="tuning-title">{t.tuningTitlePrefix}</span>
                <span className="tuning-tabs" role="tablist" aria-label={t.tuningTabsAria}>
                  {enemyTargets.map((target) => {
                    const hero = heroesByClass.get(target.heroClass);
                    if (!hero) return null;
                    const name = getHeroDisplayName(hero, language);
                    const selected = focusedEnemy?.className === hero.className;
                    const changes = countCustomizations(target);
                    return (
                      <button
                        key={hero.className}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        className={`tuning-tab ${selected ? 'tuning-tab--active' : ''}`}
                        onClick={() => onFocusEnemy(hero.className)}
                      >
                        {(hero.iconSmall || hero.iconCard) && (
                          <img src={hero.iconSmall || hero.iconCard} alt="" className="tuning-tab-avatar" />
                        )}
                        <span className="tuning-tab-name">{name}</span>
                        {changes > 0 && (
                          <span className="tuning-tab-count" title={t.customCountTitle(changes)}>
                            {changes}
                            <span className="sr-only">{t.customCountTitle(changes)}</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </span>
              </>
            ) : (
              <span className="tuning-title">{t.tuningTitle(focusedEnemyName ?? '')}</span>
            )}
            {!tuningOpen && (
              <span className="tuning-summary">
                <span className={`tuning-summary-dmg tuning-summary-dmg--${damageProfile}`}>
                  <DamageTypeIcon type={damageProfile} />
                  {t.damageOptions[damageProfile]}
                </span>
                {modifiers.map((m) => (
                  <span key={m} className="tuning-summary-mod">
                    {t.modifiers[m].label}
                  </span>
                ))}
              </span>
            )}
            <span className="tuning-head-actions">
              {isCustomized && (
                <button
                  type="button"
                  className="tuning-reset"
                  onClick={onResetDefaults}
                  title={t.resetTitle}
                >
                  <RotateCcw size={12} />
                  {t.resetBtn}
                  {focusedCustomCount > 0 && <span className="tuning-reset-count">{focusedCustomCount}</span>}
                </button>
              )}
              <button
                type="button"
                className="tuning-toggle"
                onClick={() => setTuningOpen((v) => !v)}
                aria-expanded={tuningOpen}
              >
                {tuningOpen ? t.tuningCloseBtn : t.tuningOpenBtn}
                {tuningOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </span>
          </div>

          {tuningOpen && (
            <div className="tuning-body">
              {(baseKitTags.length > 0 || (focusedEnemy.abilities?.length ?? 0) > 0) && (
                <div className="tuning-kit">
                  <HeroAbilityStrip
                    hero={focusedEnemy}
                    uiLang={language}
                    inGameLang={itemLanguage}
                    compact
                  />
                  {baseKitTags.length > 0 && (
                    <div className="tuning-kit-tags">
                      <span className="pane-label">{t.baseKitLabel}</span>
                      <div className="tuning-kit-list">
                        {baseKitTags.map((tag) => (
                          <span key={tag} className="base-kit-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="tuning-row">
                <span className="pane-label">{t.damageLabel}</span>
                <div className="damage-pills" role="group" aria-label={t.damageLabel}>
                  {DAMAGE_META.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`dmg-pill dmg-pill--${opt.tone} ${
                        damageProfile === opt.id ? 'dmg-pill--active' : ''
                      }`}
                      onClick={() => onChangeDamage(opt.id)}
                      aria-pressed={damageProfile === opt.id}
                    >
                      <DamageTypeIcon type={opt.id} />
                      <span>{t.damageOptions[opt.id]}</span>
                    </button>
                  ))}
                </div>
                {metaPct !== null && (
                  <div className="meta-split">
                    <div
                      className="meta-split-bar"
                      role="img"
                      aria-label={t.metaSplitAria(metaPct, 100 - metaPct)}
                    >
                      <span className="meta-split-bar-weapon" style={{ width: `${metaPct}%` }} />
                      <span className="meta-split-bar-spirit" />
                    </div>
                    <div className="meta-split-legend">
                      <span className="meta-split-num meta-split-num--weapon">{metaPct} % {t.damageOptions.bullet}</span>
                      <span className="meta-split-caption">
                        {t.metaSplitCaption(focusedEnemyName ?? '')}
                      </span>
                      <span className="meta-split-num meta-split-num--spirit">{100 - metaPct} % {t.damageOptions.spirit}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="tuning-row">
                <span className="pane-label">{t.extraTraitsLabel}</span>
                <div className="modifier-chips" role="group" aria-label={t.extraTraitsLabel}>
                  {MODIFIER_META.map(({ id, icon }) => {
                    const active = modifiers.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`mod-chip ${active ? 'mod-chip--active' : ''}`}
                        onClick={() => onToggleModifier(id)}
                        title={t.modifiers[id].hint}
                        aria-pressed={active}
                      >
                        <img
                          className="mod-chip-icon"
                          src={icon}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <span>{t.modifiers[id].label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
