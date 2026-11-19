import { Coins, Layers } from 'lucide-react';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
import { PRICE_TIER_IDS } from '../data/priceTiers';
import type { DeadlockHero, Language, PriceTier } from '../types/deadlock';

interface ResultsToolbarProps {
  language: Language;
  enemies: DeadlockHero[];
  priceTier: PriceTier;
  activeSlotsFull: boolean;
  onChangePriceTier: (tier: PriceTier) => void;
  onToggleActiveSlotsFull: () => void;
}

/** Sticky bar above the results: what you're countering, how many souls you can spend, slot state. */
export function ResultsToolbar({
  language,
  enemies,
  priceTier,
  activeSlotsFull,
  onChangePriceTier,
  onToggleActiveSlotsFull,
}: ResultsToolbarProps) {
  const t = UI_TEXT[language];

  return (
    <div className="results-toolbar">
      <div className="toolbar-context">
        {enemies.length > 0 ? (
          <>
            <span className="toolbar-context-label">{t.countersVs}</span>
            <span
              className={`toolbar-enemies ${enemies.length > 1 ? 'toolbar-enemies--multi' : ''} ${
                enemies.length >= 3 ? 'toolbar-enemies--avatars' : ''
              }`}
            >
              {enemies.map((hero) => {
                const name = getHeroDisplayName(hero, language);
                return (
                  <span key={hero.className} className="toolbar-enemy" title={name}>
                    {(hero.iconSmall || hero.iconCard) && (
                      <img src={hero.iconSmall || hero.iconCard} alt="" className="toolbar-enemy-avatar" />
                    )}
                    <span className="toolbar-enemy-name">{name}</span>
                  </span>
                );
              })}
            </span>
          </>
        ) : (
          <span className="toolbar-context-label">{t.priceTierLabel}</span>
        )}
      </div>

      <div className="souls-bar" role="group" aria-label={t.priceTierLabel} title={t.tierKeysTitle}>
        <span className="souls-bar-glyph" aria-hidden="true">
          <Coins size={14} />
        </span>
        {PRICE_TIER_IDS.map((id, idx) => {
          const active = priceTier === id;
          return (
            <button
              key={id}
              type="button"
              className={`souls-btn ${active ? 'souls-btn--active' : ''}`}
              onClick={() => onChangePriceTier(id)}
              aria-pressed={active}
            >
              <span className="souls-btn-value">{t.priceTiers[id].label}</span>
              <span className="souls-btn-sub">{t.priceTiers[id].sub}</span>
              <kbd className="souls-btn-key" aria-hidden="true">
                {idx + 1}
              </kbd>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={`passive-toggle ${activeSlotsFull ? 'passive-toggle--on' : ''}`}
        onClick={onToggleActiveSlotsFull}
        aria-pressed={activeSlotsFull}
        title={t.activeSlotsFullTitle}
      >
        <Layers size={14} className="passive-toggle-icon" />
        <span className="passive-toggle-text">{t.passiveOnlyShort}</span>
        <span className={`toggle-switch ${activeSlotsFull ? 'toggle-switch--on' : ''}`} aria-hidden="true" />
      </button>
    </div>
  );
}
