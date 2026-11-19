import { ChevronDown, Coins, Sparkles, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import { getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type { CounterRecommendation, Language } from '../types/deadlock';

interface CounterCardProps {
  rec: CounterRecommendation;
  language: Language;
}

export function CounterCard({ rec, language }: CounterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { item, rank, role, why, whenToUse, synergyNote, isHeroSpecific } = rec;
  const isTop = rank === 1;
  const t = UI_TEXT[language];
  const itemName = getItemDisplayName(item, language);
  const formattedCost = item.cost.toLocaleString(language === 'de' ? 'de-DE' : 'en-US');

  return (
    <article
      className={`counter-card counter-card--${item.slot} ${
        isTop ? 'counter-card--top' : ''
      } ${expanded ? 'counter-card--expanded' : ''}`}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
    >
      <div className="counter-card-stripe" aria-hidden="true" />

      <div className={`item-icon-frame item-icon-frame--${item.slot}`}>
        <span className={`icon-rank-corner ${isTop ? 'icon-rank-corner--top' : ''}`}>
          #{rank}
        </span>
        {item.icon ? (
          <img src={item.icon} alt={itemName} className="item-icon-img" loading="lazy" />
        ) : (
          <span className="item-icon-fallback">{itemName.slice(0, 2)}</span>
        )}
        <span
          className={`item-act-pill ${
            item.isActive ? 'item-act-pill--active' : 'item-act-pill--passive'
          }`}
        >
          {item.isActive ? t.activeTag : t.passiveTag}
        </span>
      </div>

      <div className="counter-card-body">
        <div className="counter-card-top">
          <div className="counter-card-title-group">
            <h4 className="counter-item-name">{itemName}</h4>
            {isHeroSpecific && (
              <span className="hard-counter-dot" title={t.hardCounterTitle}>
                <Target size={11} />
              </span>
            )}
          </div>

          <div className="counter-card-meta">
            <span className="soul-cost" title={t.soulTitle(item.tier, item.cost)}>
              <Coins size={12} />
              {formattedCost}
            </span>
            <ChevronDown
              size={14}
              className={`card-expand-chevron ${expanded ? 'card-expand-chevron--open' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>

        <p className={`counter-why ${expanded ? '' : 'counter-why--clamped'}`}>{why}</p>

        {expanded && (
          <div className="counter-expanded-details">
            <div className="counter-expanded-badges">
              <span className={`slot-badge slot-badge--${item.slot}`}>
                {t.slots[item.slot]}
              </span>
              <span className="role-badge">{t.roles[role]}</span>
              {isHeroSpecific && (
                <span className="hard-counter-badge">
                  <Target size={10} />
                  {t.hardCounterBadge}
                </span>
              )}
            </div>
            <span className="when-to-use">
              <Zap size={12} className="when-icon" />
              <strong>{t.useLabel}</strong> {whenToUse}
            </span>
            {synergyNote && (
              <span className="synergy-pill">
                <Sparkles size={11} />
                {synergyNote}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
