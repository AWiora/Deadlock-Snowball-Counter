import {
  Crosshair,
  Flame,
  HeartPulse,
  Layers,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Swords,
  Trash2,
  User,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { getHeroProfile } from '../data/heroProfiles';
import { getBaseKitTags } from '../engine/recommend';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
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
  priceTier: PriceTier;
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
  activeSlotsFull: boolean;
  isCustomized: boolean;
  onSelectMyHero: (className: string | null) => void;
  onToggleEnemy: (className: string) => void;
  onFocusEnemy: (className: string) => void;
  onRemoveEnemy: (className: string) => void;
  onClearAllEnemies: () => void;
  onChangePriceTier: (tier: PriceTier) => void;
  onChangeDamage: (dmg: DamageProfile) => void;
  onToggleModifier: (mod: EnemyModifier) => void;
  onToggleActiveSlotsFull: () => void;
  onResetDefaults: () => void;
}

const PRICE_TIER_IDS: PriceTier[] = ['800', '1600', '3200', '6400', 'all'];

const DAMAGE_META: { id: DamageProfile; tone: string }[] = [
  { id: 'bullet', tone: 'weapon' },
  { id: 'equal', tone: 'mixed' },
  { id: 'spirit', tone: 'spirit' },
];

const MODIFIER_META: { id: EnemyModifier; Icon: typeof ShieldAlert }[] = [
  { id: 'tanky', Icon: ShieldAlert },
  { id: 'healing', Icon: HeartPulse },
  { id: 'cc', Icon: Zap },
  { id: 'melee', Icon: Swords },
  { id: 'mobility', Icon: Wind },
];

export function MatchupControlBar({
  language,
  itemLanguage,
  heroes,
  heroesByClass,
  myHero,
  enemyTargets,
  focusedEnemy,
  priceTier,
  damageProfile,
  modifiers,
  activeSlotsFull,
  isCustomized,
  onSelectMyHero,
  onToggleEnemy,
  onFocusEnemy,
  onRemoveEnemy,
  onClearAllEnemies,
  onChangePriceTier,
  onChangeDamage,
  onToggleModifier,
  onToggleActiveSlotsFull,
  onResetDefaults,
}: MatchupControlBarProps) {
  const [isPickingMyHero, setIsPickingMyHero] = useState(false);
  const t = UI_TEXT[language];
  const baseKitTags = focusedEnemy ? getBaseKitTags(focusedEnemy.className, language) : [];
  const myHeroName = myHero ? getHeroDisplayName(myHero, language) : null;
  const focusedEnemyName = focusedEnemy ? getHeroDisplayName(focusedEnemy, language) : null;

  const enemyIndexMap = new Map<string, number>();
  enemyTargets.forEach((et, idx) => enemyIndexMap.set(et.heroClass, idx + 1));

  const handleRosterClick = (heroClass: string) => {
    if (isPickingMyHero) {
      onSelectMyHero(heroClass);
      setIsPickingMyHero(false);
      return;
    }
    if (heroClass === myHero?.className) {
      return;
    }
    onToggleEnemy(heroClass);
  };

  return (
    <section className="control-deck" aria-label="Matchup configuration">
      {/* Row 1: [ YOUR HERO ] VS [ UP TO 3 ENEMY SLOTS ] */}
      <div className="matchup-vs-row matchup-vs-row--multi">
        {/* Left: YOUR HERO */}
        <div className="hero-slot-wrap">
          <div
            className={`hero-selector-card hero-selector-card--my ${
              isPickingMyHero
                ? 'hero-selector-card--picking-my'
                : myHero
                  ? 'hero-selector-card--my-filled'
                  : 'hero-selector-card--prompt'
            }`}
          >
            <div className="hero-selector-main">
              <button
                type="button"
                className="hero-selector-avatar-btn"
                onClick={() => setIsPickingMyHero((v) => !v)}
                aria-label={myHero ? t.yourHeroChangeBtn : t.yourHeroSelectBtn}
              >
                {myHero?.iconCard || myHero?.iconSmall ? (
                  <img
                    src={myHero.iconCard || myHero.iconSmall}
                    alt={myHeroName ?? ''}
                    className="hero-slot-avatar hero-slot-avatar--my"
                  />
                ) : (
                  <span className="hero-slot-avatar-empty hero-slot-avatar-empty--my">
                    <User size={19} />
                  </span>
                )}
              </button>
              <div className="hero-slot-copy">
                <button
                  type="button"
                  className="hero-selector-name-btn"
                  onClick={() => setIsPickingMyHero((v) => !v)}
                >
                  <span className="deck-micro-label">{t.yourHeroLabel}</span>
                  <span className={`hero-slot-name ${!myHero ? 'hero-slot-name--placeholder' : ''}`}>
                    {myHeroName ?? t.yourHeroEmpty}
                  </span>
                  {!myHero && <span className="hero-slot-subhint">{t.yourHeroHint}</span>}
                </button>
                {myHero && !isPickingMyHero && (
                  <div className="my-hero-abilities-bar">
                    <HeroAbilityStrip
                      hero={myHero}
                      uiLang={language}
                      inGameLang={itemLanguage}
                      compact
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="slot-action-tag"
                onClick={() => setIsPickingMyHero((v) => !v)}
              >
                {isPickingMyHero
                  ? t.cancelMyPickBtn
                  : myHero
                    ? t.yourHeroChangeBtn
                    : t.yourHeroSelectBtn}
              </button>
            </div>
            {myHero && !isPickingMyHero && (
              <button
                type="button"
                className="hero-slot-clear"
                onClick={() => onSelectMyHero(null)}
                aria-label={t.yourHeroClearAria}
                title={t.yourHeroClearAria}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="vs-medallion" aria-hidden="true">
          VS
        </div>

        {/* Right: 1-3 ENEMY SLOTS + CLEAR ALL */}
        <div className="enemy-slots-group">
          <div className="enemy-slots-header">
            <span className="deck-micro-label">{t.enemyLabel}</span>
            {enemyTargets.length > 0 && (
              <button
                type="button"
                className="clear-enemies-btn"
                onClick={onClearAllEnemies}
                title={t.clearEnemiesTitle}
              >
                <Trash2 size={12} />
                <span>{t.clearEnemiesBtn}</span>
              </button>
            )}
          </div>

          <div className="enemy-slots-bar">
            {[0, 1, 2].map((slotIdx) => {
              const target = enemyTargets[slotIdx];
              const hero = target ? heroesByClass.get(target.heroClass) ?? null : null;
              const heroName = hero ? getHeroDisplayName(hero, language) : null;
              const isFocused = Boolean(hero && focusedEnemy?.className === hero.className);
              const hasCustom =
                target &&
                (target.damageProfile !== getHeroProfile(target.heroClass).defaultDamage ||
                  target.modifiers.length > 0);

              if (!hero || !target) {
                return (
                  <div
                    key={`empty-${slotIdx}`}
                    className={`enemy-mini-slot enemy-mini-slot--empty ${
                      slotIdx === 0 && enemyTargets.length === 0 ? 'enemy-mini-slot--first-empty' : ''
                    }`}
                  >
                    <Crosshair size={14} className="enemy-mini-empty-icon" />
                    <span>
                      {slotIdx === 0 && enemyTargets.length === 0
                        ? t.enemyEmpty
                        : t.enemySlotEmpty(slotIdx + 1)}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={hero.className}
                  className={`enemy-mini-slot enemy-mini-slot--filled ${
                    isFocused ? 'enemy-mini-slot--focused' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="enemy-mini-main"
                    onClick={() => onFocusEnemy(hero.className)}
                    title={heroName ?? ''}
                  >
                    <span className="enemy-mini-num">#{slotIdx + 1}</span>
                    {(hero.iconSmall || hero.iconCard) && (
                      <img
                        src={hero.iconSmall || hero.iconCard}
                        alt={heroName ?? ''}
                        className="enemy-mini-avatar"
                      />
                    )}
                    <span className="enemy-mini-name">{heroName}</span>
                    {hasCustom && <span className="enemy-mini-custom-dot" title="Custom build toggles" />}
                  </button>
                  <button
                    type="button"
                    className="enemy-mini-remove"
                    onClick={() => onRemoveEnemy(hero.className)}
                    aria-label={`Remove ${heroName}`}
                    title={`Remove ${heroName}`}
                  >
                    <X size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Ultra-compact 3-Row Inline Hero Roster (All 42 Heroes, 1-Click Mouse Selection) */}
      <div
        className={`inline-roster-block ${
          isPickingMyHero ? 'inline-roster-block--picking-my' : ''
        }`}
      >
        <div className="inline-roster-header">
          <span className="inline-roster-hint">
            {isPickingMyHero ? t.rosterHintMyHero : t.rosterHintEnemy}
          </span>
          {focusedEnemy && baseKitTags.length > 0 && !isPickingMyHero && (
            <div className="base-kit-strip">
              <span className="base-kit-label">
                {focusedEnemyName}:
              </span>
              <div className="base-kit-tags">
                {baseKitTags.map((tag) => (
                  <span key={tag} className="base-kit-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="inline-roster-grid" role="group" aria-label="Hero roster">
          {heroes.map((hero) => {
            const name = getHeroDisplayName(hero, language);
            const isMy = hero.className === myHero?.className;
            const enemyIdx = enemyIndexMap.get(hero.className);
            const isEnemy = enemyIdx !== undefined;
            const isFocusedEnemy = hero.className === focusedEnemy?.className;

            return (
              <button
                key={hero.className}
                type="button"
                disabled={!isPickingMyHero && isMy}
                onClick={() => handleRosterClick(hero.className)}
                title={name}
                className={`roster-cell ${isMy ? 'roster-cell--my' : ''} ${
                  isEnemy ? 'roster-cell--enemy' : ''
                } ${isFocusedEnemy ? 'roster-cell--focused' : ''}`}
              >
                <div className="roster-cell-img-wrap">
                  {hero.iconSmall || hero.iconCard ? (
                    <img
                      src={hero.iconSmall || hero.iconCard}
                      alt={name}
                      className="roster-cell-img"
                      loading="lazy"
                    />
                  ) : (
                    <span className="roster-cell-fallback">{name.slice(0, 2)}</span>
                  )}
                  {isMy && <span className="roster-cell-badge roster-cell-badge--my">{t.youBadge}</span>}
                  {isEnemy && (
                    <span className="roster-cell-badge roster-cell-badge--enemy">#{enemyIdx}</span>
                  )}
                </div>
                <span className="roster-cell-name">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Price Tier (Souls) + Active Slots Full */}
      <div className="deck-row deck-row--stage-compact">
        <div className="stage-control-wrap">
          <span className="deck-micro-label">{t.priceTierLabel}</span>
          <div className="segmented-bar" role="group" aria-label={t.priceTierLabel}>
            {PRICE_TIER_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={`seg-btn ${priceTier === id ? 'seg-btn--active' : ''}`}
                onClick={() => onChangePriceTier(id)}
              >
                <span className="seg-btn-main">{t.priceTiers[id].label}</span>
                <span className="seg-btn-sub">{t.priceTiers[id].sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="active-slots-wrap">
          <span className="deck-micro-label">{t.activeSlotsFullLabel}</span>
          <button
            type="button"
            className={`active-slots-card ${activeSlotsFull ? 'active-slots-card--on' : ''}`}
            onClick={onToggleActiveSlotsFull}
            title={t.activeSlotsFullTitle}
            aria-pressed={activeSlotsFull}
          >
            <Layers size={15} className="active-slots-icon" />
            <span className="active-slots-text">
              <span className="active-slots-main">{t.activeSlotsFullBtn}</span>
              <span className="active-slots-sub">{t.activeSlotsFullSub}</span>
            </span>
            <span
              className={`toggle-switch ${activeSlotsFull ? 'toggle-switch--on' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Row 4: Dedicated Per-Enemy Build Customization Panel with 1-Click Enemy Tabs */}
      {focusedEnemy && (
        <div className="enemy-customize-panel">
          <div className="enemy-customize-tabs-bar">
            <span className="enemy-customize-label">{t.customizeForLabel}</span>
            <div className="enemy-customize-tabs" role="tablist" aria-label={t.customizeForLabel}>
              {enemyTargets.map((et, idx) => {
                const hero = heroesByClass.get(et.heroClass);
                if (!hero) return null;
                const hName = getHeroDisplayName(hero, language);
                const isActiveTab = focusedEnemy.className === et.heroClass;
                const defDmg = getHeroProfile(et.heroClass).defaultDamage;
                const customCount =
                  et.modifiers.length + (et.damageProfile !== defDmg ? 1 : 0);

                return (
                  <button
                    key={et.heroClass}
                    type="button"
                    role="tab"
                    aria-selected={isActiveTab}
                    className={`customize-tab-btn ${
                      isActiveTab ? 'customize-tab-btn--active' : ''
                    }`}
                    onClick={() => onFocusEnemy(et.heroClass)}
                  >
                    <span className="customize-tab-num">#{idx + 1}</span>
                    {(hero.iconSmall || hero.iconCard) && (
                      <img
                        src={hero.iconSmall || hero.iconCard}
                        alt=""
                        className="customize-tab-avatar"
                      />
                    )}
                    <span>{hName}</span>
                    {customCount > 0 && (
                      <span className="customize-tab-count">+{customCount}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="enemy-customize-meta">
              {focusedEnemy.abilities && focusedEnemy.abilities.length > 0 && (
                <div className="enemy-customize-abilities">
                  <span className="enemy-customize-abilities-label">
                    {focusedEnemyName} {language === 'de' ? 'Fähigkeiten' : 'Abilities'}:
                  </span>
                  <HeroAbilityStrip
                    hero={focusedEnemy}
                    uiLang={language}
                    inGameLang={itemLanguage}
                    compact
                  />
                </div>
              )}

              {isCustomized && (
                <button
                  type="button"
                  className="reset-defaults-btn customize-reset-btn"
                  onClick={onResetDefaults}
                  title={t.resetTitle}
                >
                  <RotateCcw size={11} />
                  {t.resetBtn}
                </button>
              )}
            </div>
          </div>

          <div className="enemy-customize-controls">
            <div className="override-group">
              <div className="override-header">
                <span className="deck-micro-label">{t.damageLabel}</span>
                {typeof focusedEnemy.metaWeaponPct === 'number' && !isCustomized && (
                  <span
                    className="meta-split-hint"
                    title={
                      language === 'de'
                        ? `Live-Match-Daten (30 Tage): ${focusedEnemy.metaWeaponPct}% Gun-Souls / ${100 - focusedEnemy.metaWeaponPct}% Spirit-Souls`
                        : `Live 30-day match data: ${focusedEnemy.metaWeaponPct}% Weapon souls / ${100 - focusedEnemy.metaWeaponPct}% Spirit souls`
                    }
                  >
                    {focusedEnemy.metaWeaponPct >= 58
                      ? `Meta: ${focusedEnemy.metaWeaponPct}% Gun`
                      : focusedEnemy.metaWeaponPct <= 42
                        ? `Meta: ${100 - focusedEnemy.metaWeaponPct}% Spirit`
                        : `Meta: ${focusedEnemy.metaWeaponPct}/${100 - focusedEnemy.metaWeaponPct}%`}
                  </span>
                )}
              </div>
              <div className="damage-pills" role="group" aria-label={t.damageLabel}>
                {DAMAGE_META.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`dmg-pill dmg-pill--${opt.tone} ${
                      damageProfile === opt.id ? 'dmg-pill--active' : ''
                    }`}
                    onClick={() => onChangeDamage(opt.id)}
                  >
                    {opt.id === 'bullet' && <Flame size={13} />}
                    {opt.id === 'spirit' && <Sparkles size={13} />}
                    <span>{t.damageOptions[opt.id]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="override-group override-group--mods">
              <span className="deck-micro-label">{t.extraTraitsLabel}</span>
              <div className="modifier-chips" role="group" aria-label={t.extraTraitsLabel}>
                {MODIFIER_META.map(({ id, Icon }) => {
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
                      <Icon size={13} />
                      <span>{t.modifiers[id].label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
