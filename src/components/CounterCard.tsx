import { Check, Coins, Copy, Sparkles, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import { getHeroDisplayName, getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type { CounterRecommendation, DeadlockHero, Language } from '../types/deadlock';

interface CounterCardProps {
  rec: CounterRecommendation;
  language: Language;
  totalSelectedEnemies?: number;
  heroesByClass?: Map<string, DeadlockHero>;
}

export function CounterCard({
  rec,
  language,
  totalSelectedEnemies = 1,
  heroesByClass,
}: CounterCardProps) {
  const [copied, setCopied] = useState(false);
  const {
    item,
    rank,
    role,
    why,
    whenToUse,
    synergyNote,
    isHeroSpecific,
    counteredEnemies,
    upgradeHint,
  } = rec;
  const isTop = rank === 1;
  const t = UI_TEXT[language];
  const itemName = getItemDisplayName(item, language);
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const formattedCost = item.cost.toLocaleString(locale);

  const handleCopyName = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(itemName);
    } catch {
      const input = document.createElement('input');
      input.value = itemName;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const counteredNames =
    counteredEnemies && heroesByClass
      ? counteredEnemies
          .map((cls) => {
            const h = heroesByClass.get(cls);
            return h ? getHeroDisplayName(h, language) : cls;
          })
          .join(' + ')
      : null;

  const isMultiHit = (counteredEnemies?.length ?? 0) >= 2 && totalSelectedEnemies >= 2;

  return (
    <article
      className={`counter-card counter-card--${item.slot} ${
        isTop ? 'counter-card--top' : ''
      } ${isMultiHit ? 'counter-card--multi' : ''}`}
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
            <button
              type="button"
              className={`copy-item-btn ${copied ? 'copy-item-btn--copied' : ''}`}
              onClick={handleCopyName}
              title={t.copyItemTitle}
              aria-label={t.copyItemTitle}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied && <span className="copy-item-feedback">{t.copiedItemLabel}</span>}
            </button>
          </div>

          <div className="counter-card-meta">
            <span className="soul-cost" title={t.soulTitle(item.tier, item.cost)}>
              <Coins size={12} />
              {formattedCost}
            </span>
          </div>
        </div>

        {/* Always-visible compact shop & matchup badges */}
        <div className="counter-inline-badges">
          <span className={`slot-badge slot-badge--${item.slot}`}>
            {t.slots[item.slot]}
          </span>
          <span className="role-badge">{t.roles[role]}</span>
          {isHeroSpecific && (
            <span className="hard-counter-badge" title={t.hardCounterTitle}>
              <Target size={10} />
              {t.hardCounterBadge}
            </span>
          )}
          {totalSelectedEnemies > 1 && counteredNames && counteredEnemies && (
            <span
              className={`multi-counter-badge ${
                isMultiHit ? 'multi-counter-badge--hit' : ''
              }`}
            >
              {t.countersMultiBadge(
                counteredEnemies.length,
                totalSelectedEnemies,
                counteredNames,
              )}
            </span>
          )}
          {upgradeHint && (
            <span className="upgrade-path-badge">
              {upgradeHint.direction === 'from'
                ? t.upgradeFromBadge(
                    upgradeHint.itemName,
                    upgradeHint.cost.toLocaleString(locale),
                  )
                : t.upgradeToBadge(
                    upgradeHint.itemName,
                    upgradeHint.cost.toLocaleString(locale),
                  )}
            </span>
          )}
        </div>

        <p className="counter-why">{why}</p>

        <div className="counter-footer-row">
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
      </div>
    </article>
  );
}
