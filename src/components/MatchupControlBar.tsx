import {
  ArrowLeftRight,
  Crosshair,
  Flame,
  HeartPulse,
  Layers,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Swords,
  User,
  X,
  Zap,
} from 'lucide-react';
import { getBaseKitTags } from '../engine/recommend';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
import type {
  DamageProfile,
  DeadlockHero,
  EnemyModifier,
  GameStage,
  Language,
} from '../types/deadlock';

interface MatchupControlBarProps {
  language: Language;
  myHero: DeadlockHero | null;
  enemyHero: DeadlockHero | null;
  previousEnemyHero: DeadlockHero | null;
  stage: GameStage;
  damageProfile: DamageProfile;
  modifiers: EnemyModifier[];
  activeSlotsFull: boolean;
  isCustomized: boolean;
  onOpenMyHeroPicker: () => void;
  onClearMyHero: () => void;
  onOpenEnemyPicker: () => void;
  onSwapPreviousEnemy: (className: string) => void;
  onChangeStage: (stage: GameStage) => void;
  onChangeDamage: (dmg: DamageProfile) => void;
  onToggleModifier: (mod: EnemyModifier) => void;
  onToggleActiveSlotsFull: () => void;
  onResetDefaults: () => void;
}

const STAGE_IDS: GameStage[] = ['lane', 'mid', 'late'];

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
];

export function MatchupControlBar({
  language,
  myHero,
  enemyHero,
  previousEnemyHero,
  stage,
  damageProfile,
  modifiers,
  activeSlotsFull,
  isCustomized,
  onOpenMyHeroPicker,
  onClearMyHero,
  onOpenEnemyPicker,
  onSwapPreviousEnemy,
  onChangeStage,
  onChangeDamage,
  onToggleModifier,
  onToggleActiveSlotsFull,
  onResetDefaults,
}: MatchupControlBarProps) {
  const t = UI_TEXT[language];
  const baseKitTags = enemyHero ? getBaseKitTags(enemyHero.className, language) : [];
  const myHeroName = myHero ? getHeroDisplayName(myHero, language) : null;
  const enemyHeroName = enemyHero ? getHeroDisplayName(enemyHero, language) : null;
  const prevHeroName = previousEnemyHero ? getHeroDisplayName(previousEnemyHero, language) : null;

  return (
    <section className="control-deck" aria-label="Matchup configuration">
      {/* Row 1: Prominent [ YOUR HERO ] VS [ ENEMY THREAT ] */}
      <div className="matchup-vs-row">
        {/* Left: YOUR HERO */}
        <div className="hero-slot-wrap">
          <div className={`hero-selector-card hero-selector-card--my ${myHero ? 'hero-selector-card--my-filled' : 'hero-selector-card--prompt'}`}>
            <button
              type="button"
              className="hero-selector-main"
              onClick={onOpenMyHeroPicker}
            >
              {myHero?.iconCard || myHero?.iconSmall ? (
                <img
                  src={myHero.iconCard || myHero.iconSmall}
                  alt={myHeroName ?? ''}
                  className="hero-slot-avatar hero-slot-avatar--my"
                />
              ) : (
                <span className="hero-slot-avatar-empty hero-slot-avatar-empty--my">
                  <User size={21} />
                </span>
              )}
              <div className="hero-slot-copy">
                <span className="deck-micro-label">{t.yourHeroLabel}</span>
                <span className={`hero-slot-name ${!myHero ? 'hero-slot-name--placeholder' : ''}`}>
                  {myHeroName ?? t.yourHeroEmpty}
                </span>
                {!myHero && <span className="hero-slot-subhint">{t.yourHeroHint}</span>}
              </div>
              <span className="slot-action-tag">
                {myHero ? t.yourHeroChangeBtn : t.yourHeroSelectBtn}
              </span>
            </button>
            {myHero && (
              <button
                type="button"
                className="hero-slot-clear"
                onClick={onClearMyHero}
                aria-label={t.yourHeroClearAria}
                title={t.yourHeroClearAria}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        <div className="vs-medallion" aria-hidden="true">
          VS
        </div>

        {/* Right: ENEMY THREAT */}
        <div className="hero-slot-wrap">
          <div className={`hero-selector-card hero-selector-card--enemy ${enemyHero ? 'hero-selector-card--enemy-filled' : ''}`}>
            <button
              type="button"
              className="hero-selector-main"
              onClick={onOpenEnemyPicker}
            >
              {enemyHero?.iconCard || enemyHero?.iconSmall ? (
                <img
                  src={enemyHero.iconCard || enemyHero.iconSmall}
                  alt={enemyHeroName ?? ''}
                  className="hero-slot-avatar hero-slot-avatar--enemy"
                />
              ) : (
                <span className="hero-slot-avatar-empty hero-slot-avatar-empty--enemy">
                  <Crosshair size={21} />
                </span>
              )}
              <div className="hero-slot-copy">
                <span className="deck-micro-label">{t.enemyLabel}</span>
                <span className={`hero-slot-name ${!enemyHero ? 'hero-slot-name--placeholder' : ''}`}>
                  {enemyHeroName ?? t.enemyEmpty}
                </span>
              </div>
              <span className="slot-action-tag">
                {enemyHero ? t.enemyChangeBtn : t.enemySelectBtn}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Meta strip: Base Kit tags (left) + Quick-swap Back to Previous Enemy (right) */}
      {(enemyHero || previousEnemyHero) && (
        <div className="deck-meta-strip">
          {enemyHero && baseKitTags.length > 0 ? (
            <div className="base-kit-strip">
              <span className="base-kit-label">{t.baseKitLabel}</span>
              <div className="base-kit-tags">
                {baseKitTags.map((tag) => (
                  <span key={tag} className="base-kit-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div />
          )}

          {previousEnemyHero && prevHeroName && (
            <button
              type="button"
              className="prev-enemy-btn"
              onClick={() => onSwapPreviousEnemy(previousEnemyHero.className)}
              title={t.backToPrev(prevHeroName)}
            >
              <ArrowLeftRight size={12} />
              {(previousEnemyHero.iconSmall || previousEnemyHero.iconCard) && (
                <img
                  src={previousEnemyHero.iconSmall || previousEnemyHero.iconCard}
                  alt=""
                  className="prev-enemy-img"
                />
              )}
              <span>{t.backToPrev(prevHeroName)}</span>
            </button>
          )}
        </div>
      )}

      {/* Row 2: Balanced Game Stage + Active Slots Full */}
      <div className="deck-row deck-row--stage">
        <div className="stage-control-wrap">
          <span className="deck-micro-label">{t.stageLabel}</span>
          <div className="segmented-bar" role="group" aria-label={t.stageLabel}>
            {STAGE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={`seg-btn ${stage === id ? 'seg-btn--active' : ''}`}
                onClick={() => onChangeStage(id)}
              >
                <span className="seg-btn-main">{t.stages[id].label}</span>
                <span className="seg-btn-sub">{t.stages[id].budget}</span>
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
            <Layers size={16} className="active-slots-icon" />
            <span className="active-slots-text">
              <span className="active-slots-main">{t.activeSlotsFullBtn}</span>
              <span className="active-slots-sub">{t.activeSlotsFullSub}</span>
            </span>
            <span className={`toggle-switch ${activeSlotsFull ? 'toggle-switch--on' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Row 3: Enemy Damage Focus + 4 Clean Extra Build Toggles */}
      {enemyHero && (
        <div className="deck-row deck-row--overrides">
          <div className="override-group">
            <div className="override-header">
              <span className="deck-micro-label">{t.damageLabel}</span>
              {typeof enemyHero.metaWeaponPct === 'number' && !isCustomized && (
                <span
                  className="meta-split-hint"
                  title={
                    language === 'de'
                      ? `Live-Match-Daten (30 Tage): ${enemyHero.metaWeaponPct}% Waffen-Seelen / ${100 - enemyHero.metaWeaponPct}% Spirit-Seelen`
                      : `Live 30-day match data: ${enemyHero.metaWeaponPct}% Weapon souls / ${100 - enemyHero.metaWeaponPct}% Spirit souls`
                  }
                >
                  {enemyHero.metaWeaponPct >= 58
                    ? `Meta: ${enemyHero.metaWeaponPct}% ${language === 'de' ? 'Waffe' : 'Gun'}`
                    : enemyHero.metaWeaponPct <= 42
                      ? `Meta: ${100 - enemyHero.metaWeaponPct}% Spirit`
                      : `Meta: ${enemyHero.metaWeaponPct}/${100 - enemyHero.metaWeaponPct}%`}
                </span>
              )}
              {isCustomized && (
                <button
                  type="button"
                  className="reset-defaults-btn"
                  onClick={onResetDefaults}
                  title={t.resetTitle}
                >
                  <RotateCcw size={11} />
                  {t.resetBtn}
                </button>
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
                    <Icon size={14} />
                    <span>{t.modifiers[id].label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
