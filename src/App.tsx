import { useMemo } from 'react';
import { CounterCard } from './components/CounterCard';
import { Header } from './components/Header';
import { MatchupControlBar } from './components/MatchupControlBar';
import { ResultsToolbar } from './components/ResultsToolbar';
import { recommendCounters } from './engine/recommend';
import { useDeadlockData } from './hooks/useDeadlockData';
import { useMatchupState } from './hooks/useMatchupState';
import { UI_TEXT } from './i18n/translations';
import type {
  CounterRecommendation,
  DeadlockHero,
  Language,
  PriceTier,
} from './types/deadlock';

// Deadlock Wiki stat glyphs: Health for surviving, Stun for locking the enemy down
const STANCE_ICON = {
  defense: 'https://cdn.deadlock.wiki/Health.png',
  offense: 'https://cdn.deadlock.wiki/Status_Stun.png',
};

interface StanceColumnProps {
  stance: 'offense' | 'defense';
  recs: CounterRecommendation[];
  isRecommended: boolean;
  stanceReason: string;
  language: Language;
  itemLanguage: Language;
  priceTier: PriceTier;
  totalSelectedEnemies: number;
  heroesByClass: Map<string, DeadlockHero>;
  myHero: DeadlockHero | null;
  onChangePriceTier: (tier: PriceTier) => void;
}

function StanceColumn({
  stance,
  recs,
  isRecommended,
  stanceReason,
  language,
  itemLanguage,
  priceTier,
  totalSelectedEnemies,
  heroesByClass,
  myHero,
  onChangePriceTier,
}: StanceColumnProps) {
  const t = UI_TEXT[language];
  const isOffense = stance === 'offense';
  const showEarlyOffenseNote = isOffense && priceTier === '800';

  return (
    <div className={`stance-column ${isRecommended ? 'stance-column--primary' : ''}`}>
      <div className="stance-group-header">
        <div className="stance-title-wrap">
          <span className={`stance-icon stance-icon--${stance}`}>
            <img
              className="stance-icon-glyph"
              src={isOffense ? STANCE_ICON.offense : STANCE_ICON.defense}
              alt=""
              referrerPolicy="no-referrer"
            />
          </span>
          <h3 className="stance-heading">
            {isOffense ? t.offenseSectionTitle : t.defenseSectionTitle}
          </h3>
        </div>
        {isRecommended && (
          <span className={`stance-rec-pill stance-rec-pill--${stance}`} title={stanceReason}>
            {t.recommendedStanceBadge}
          </span>
        )}
      </div>
      <div className="cards-list">
        {recs.length > 0 ? (
          recs.map((rec) => (
            <CounterCard
              key={rec.item.className}
              rec={rec}
              language={language}
              itemLanguage={itemLanguage}
              totalSelectedEnemies={totalSelectedEnemies}
              heroesByClass={heroesByClass}
              myHero={myHero}
              showCost={priceTier === 'all'}
            />
          ))
        ) : (
          <div className="empty-stance-card">
            <p className="empty-stance-title">
              {showEarlyOffenseNote ? t.emptyOffense800Title : t.emptyColumnGeneric}
            </p>
            {showEarlyOffenseNote && <p className="empty-stance-body">{t.emptyOffense800Body}</p>}
            <button
              type="button"
              className="empty-stance-cta"
              onClick={() => onChangePriceTier(priceTier === '800' ? '1600' : 'all')}
            >
              {priceTier === '800' ? t.switchTo1600Btn : t.switchToAllBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function App() {
  const { heroes, heroesByClass, itemsByClass, status } = useDeadlockData();
  const matchup = useMatchupState();
  const t = UI_TEXT[matchup.language];

  const myHero = matchup.myHeroClass ? heroesByClass.get(matchup.myHeroClass) ?? null : null;
  const focusedEnemy = matchup.focusedEnemyClass
    ? heroesByClass.get(matchup.focusedEnemyClass) ?? null
    : null;
  const enemyHeroes = matchup.enemyTargets
    .map((et) => heroesByClass.get(et.heroClass))
    .filter((h): h is DeadlockHero => Boolean(h));

  const result = useMemo(() => {
    if (!matchup.focusedEnemyClass || matchup.orderedEnemyTargets.length === 0) return null;
    return recommendCounters(
      {
        myHeroClass: matchup.myHeroClass,
        enemyHeroClass: matchup.focusedEnemyClass,
        priceTier: matchup.priceTier,
        damageProfile: matchup.damageProfile,
        modifiers: matchup.modifiers,
        enemyTargets: matchup.orderedEnemyTargets,
        activeSlotsFull: matchup.activeSlotsFull,
        language: matchup.language,
        itemLanguage: matchup.itemLanguage,
      },
      itemsByClass,
      heroesByClass,
    );
  }, [
    matchup.myHeroClass,
    matchup.focusedEnemyClass,
    matchup.orderedEnemyTargets,
    matchup.priceTier,
    matchup.damageProfile,
    matchup.modifiers,
    matchup.activeSlotsFull,
    matchup.language,
    matchup.itemLanguage,
    itemsByClass,
    heroesByClass,
  ]);

  // Changes whenever the recommendation inputs change, so the list replays its short reveal
  const resultsKey = [
    matchup.myHeroClass ?? '',
    matchup.orderedEnemyTargets
      .map((et) => `${et.heroClass}:${et.damageProfile}:${et.modifiers.join('+')}`)
      .join(','),
    matchup.priceTier,
    matchup.activeSlotsFull ? 'p' : 'a',
  ].join('|');

  const columnProps = {
    language: matchup.language,
    itemLanguage: matchup.itemLanguage,
    priceTier: matchup.priceTier,
    totalSelectedEnemies: matchup.enemyTargets.length,
    heroesByClass,
    myHero,
    onChangePriceTier: matchup.setPriceTier,
  };

  return (
    <div className="app-shell">
      <Header
        language={matchup.language}
        itemLanguage={matchup.itemLanguage}
        onChangeLanguage={matchup.setLanguage}
        onChangeItemLanguage={matchup.setItemLanguage}
        hasEnemySelected={matchup.enemyTargets.length > 0}
        dataStatus={status}
      />

      <main className="workspace">
        <aside className="picker-pane">
          <MatchupControlBar
            language={matchup.language}
            itemLanguage={matchup.itemLanguage}
            heroes={heroes}
            heroesByClass={heroesByClass}
            myHero={myHero}
            enemyTargets={matchup.enemyTargets}
            focusedEnemy={focusedEnemy}
            damageProfile={matchup.damageProfile}
            modifiers={matchup.modifiers}
            isCustomized={matchup.isCustomized}
            onSelectMyHero={matchup.setMyHeroClass}
            onToggleEnemy={matchup.toggleEnemyHero}
            onFocusEnemy={matchup.focusEnemyHero}
            onRemoveEnemy={matchup.removeEnemyHero}
            onClearAllEnemies={matchup.clearAllEnemies}
            onChangePriceTier={matchup.setPriceTier}
            onChangeDamage={matchup.setDamageProfile}
            onToggleModifier={matchup.toggleModifier}
            onResetDefaults={matchup.resetEnemyDefaults}
          />
        </aside>

        <section className="results-pane" aria-label="Recommended counter items">
          <ResultsToolbar
            language={matchup.language}
            enemies={enemyHeroes}
            priceTier={matchup.priceTier}
            activeSlotsFull={matchup.activeSlotsFull}
            onChangePriceTier={matchup.setPriceTier}
            onToggleActiveSlotsFull={() => matchup.setActiveSlotsFull((v) => !v)}
          />

          {!focusedEnemy || !result ? (
            <div className="results-empty">
              <h2 className="results-empty-title">{t.emptyHeading}</h2>
              <p className="results-empty-sub">{t.emptySub}</p>
              <ul className="key-legend" aria-label="Keyboard shortcuts">
                <li>
                  <kbd>A–Z</kbd>
                  {t.keyHintSearch}
                </li>
                <li>
                  <kbd>Enter</kbd>
                  {t.keyHintAdd}
                </li>
                <li>
                  <kbd>1–5</kbd>
                  {t.keyHintSouls}
                </li>
                <li>
                  <kbd>Esc</kbd>
                  {t.keyHintClear}
                </li>
              </ul>
            </div>
          ) : (
            <div className="results-body" key={resultsKey}>
              {matchup.activeSlotsFull && result.hiddenActiveCount > 0 && (
                <div className="passive-filter-banner">
                  <span>
                    {t.passiveBannerBody(result.hiddenActiveCount)}
                  </span>
                  <button
                    type="button"
                    className="banner-link-btn"
                    onClick={() => matchup.setActiveSlotsFull(false)}
                  >
                    {t.showActivesBtn}
                  </button>
                </div>
              )}

              <div className="stance-grid">
                {(result.recommendedStance === 'defense'
                  ? (['defense', 'offense'] as const)
                  : (['offense', 'defense'] as const)
                ).map((stance) => (
                  <StanceColumn
                    key={stance}
                    stance={stance}
                    recs={stance === 'offense' ? result.offense : result.defense}
                    isRecommended={result.recommendedStance === stance}
                    stanceReason={result.stanceReason}
                    {...columnProps}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <span>
          {t.footerPrefix}{' '}
          <a href="https://deadlock-api.com" target="_blank" rel="noreferrer">
            deadlock-api.com
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
