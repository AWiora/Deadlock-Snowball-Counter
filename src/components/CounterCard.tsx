import { Check, Coins, Copy, Sparkles, Target, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getHeroDisplayName, getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type { CounterRecommendation, DeadlockHero, Language } from '../types/deadlock';
import { RichAbilityText } from './RichAbilityText';

interface CounterCardProps {
  rec: CounterRecommendation;
  language: Language;
  itemLanguage?: Language;
  totalSelectedEnemies?: number;
  heroesByClass?: Map<string, DeadlockHero>;
  myHero?: DeadlockHero | null;
}

export function CounterCard({
  rec,
  language,
  itemLanguage,
  totalSelectedEnemies = 1,
  heroesByClass,
  myHero,
}: CounterCardProps) {
  const [copied, setCopied] = useState(false);
  const {
    item,
    rank,
    role,
    why,
    reasons,
    whenToUse,
    synergyNote,
    isHeroSpecific,
    isKitAmplifier,
    counteredEnemies,
    upgradeHint,
  } = rec;
  const isTop = rank === 1;
  const t = UI_TEXT[language];
  const effectiveInGameLang = itemLanguage ?? language;
  const itemName = getItemDisplayName(item, effectiveInGameLang);
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const formattedCost = item.cost.toLocaleString(locale);

  const cardContextHeroes = useMemo(() => {
    const list: DeadlockHero[] = [];
    const seen = new Set<string>();
    const addHero = (h?: DeadlockHero | null) => {
      if (!h || seen.has(h.className)) return;
      seen.add(h.className);
      list.push(h);
    };
    if (isKitAmplifier) addHero(myHero);
    for (const cls of counteredEnemies ?? []) {
      addHero(heroesByClass?.get(cls));
    }
    if (!isKitAmplifier) addHero(myHero);
    return list;
  }, [isKitAmplifier, myHero, counteredEnemies, heroesByClass]);

  const myHeroList = useMemo(() => (myHero ? [myHero] : []), [myHero]);

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
          {isKitAmplifier && (
            <span className="kit-synergy-badge" title={t.kitSynergyTitle}>
              <Sparkles size={10} />
              {t.kitSynergyBadge}
            </span>
          )}
          {totalSelectedEnemies > 1 && counteredEnemies && (
            <span
              className={`multi-counter-badge ${
                isMultiHit ? 'multi-counter-badge--hit' : ''
              }`}
            >
              {t.countersMultiBadge(counteredEnemies.length, totalSelectedEnemies)}
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

        {/* Structured per-enemy counter reasons */}
        {reasons && reasons.length > 0 ? (
          <div className="counter-reasons-list">
            {reasons.map((reason, idx) => {
              const matchedHeroes = reason.heroClasses.map((cls) => ({
                cls,
                hero: heroesByClass?.get(cls) ?? null,
              }));
              const heroLabel = matchedHeroes
                .map(({ cls, hero }) =>
                  hero ? getHeroDisplayName(hero, language) : cls,
                )
                .join(' + ');

              const reasonHeroes: DeadlockHero[] = [];
              if (isKitAmplifier && myHero) reasonHeroes.push(myHero);
              for (const { hero } of matchedHeroes) {
                if (hero && !reasonHeroes.some((h) => h.className === hero.className)) {
                  reasonHeroes.push(hero);
                }
              }
              if (!isKitAmplifier && myHero && !reasonHeroes.some((h) => h.className === myHero.className)) {
                reasonHeroes.push(myHero);
              }

              return (
                <div key={`${reason.heroClasses.join('-')}-${idx}`} className="counter-reason-row">
                  <span className="reason-hero-tag">
                    <span className="reason-hero-avatars">
                      {matchedHeroes.map(({ cls, hero }) =>
                        hero?.iconSmall || hero?.iconCard ? (
                          <img
                            key={cls}
                            src={hero.iconSmall || hero.iconCard}
                            alt=""
                            className="reason-hero-avatar"
                            loading="lazy"
                          />
                        ) : null,
                      )}
                    </span>
                    <strong className="reason-hero-name">{heroLabel}</strong>
                    {!reason.isHeroSpecific && reason.triggerSummary && (
                      <span className="reason-trigger-pill">({reason.triggerSummary})</span>
                    )}
                    <span className="reason-colon">:</span>
                  </span>{' '}
                  <span className="reason-text">
                    <RichAbilityText
                      text={reason.text}
                      heroes={reasonHeroes}
                      uiLang={language}
                      inGameLang={effectiveInGameLang}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="counter-why">
            <RichAbilityText
              text={why}
              heroes={cardContextHeroes}
              uiLang={language}
              inGameLang={effectiveInGameLang}
            />
          </p>
        )}

        <div className="counter-footer-row">
          <span className="when-to-use">
            <Zap size={12} className="when-icon" />
            <strong>{t.useLabel}</strong>{' '}
            <RichAbilityText
              text={whenToUse}
              heroes={cardContextHeroes}
              uiLang={language}
              inGameLang={effectiveInGameLang}
            />
          </span>
          {synergyNote && (
            <span className="synergy-pill">
              <Sparkles size={11} />
              <RichAbilityText
                text={synergyNote}
                heroes={myHeroList}
                uiLang={language}
                inGameLang={effectiveInGameLang}
              />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
