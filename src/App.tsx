import { Crosshair, Layers, Shield, Sparkles, Swords } from 'lucide-react';
import { useMemo } from 'react';
import { CounterCard } from './components/CounterCard';
import { Header } from './components/Header';
import { MatchupControlBar } from './components/MatchupControlBar';
import { recommendCounters } from './engine/recommend';
import { useDeadlockData } from './hooks/useDeadlockData';
import { useMatchupState } from './hooks/useMatchupState';
import { UI_TEXT } from './i18n/translations';

export function App() {
  const { heroes, heroesByClass, itemsByClass, status } = useDeadlockData();
  const matchup = useMatchupState();
  const t = UI_TEXT[matchup.language];

  const myHero = matchup.myHeroClass ? heroesByClass.get(matchup.myHeroClass) ?? null : null;
  const focusedEnemy = matchup.focusedEnemyClass
    ? heroesByClass.get(matchup.focusedEnemyClass) ?? null
    : null;

  const result = useMemo(() => {
    if (!matchup.focusedEnemyClass || matchup.orderedEnemyTargets.length === 0) return null;
    return recommendCounters(
      {
        myHeroClass: matchup.myHeroClass,
        enemyHeroClass: matchup.focusedEnemyClass,
        stage: matchup.stage,
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
    matchup.stage,
    matchup.damageProfile,
    matchup.modifiers,
    matchup.activeSlotsFull,
    matchup.language,
    matchup.itemLanguage,
    itemsByClass,
    heroesByClass,
  ]);

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

      <main className="main-container">
        <MatchupControlBar
          language={matchup.language}
          heroes={heroes}
          heroesByClass={heroesByClass}
          myHero={myHero}
          enemyTargets={matchup.enemyTargets}
          focusedEnemy={focusedEnemy}
          stage={matchup.stage}
          damageProfile={matchup.damageProfile}
          modifiers={matchup.modifiers}
          activeSlotsFull={matchup.activeSlotsFull}
          isCustomized={matchup.isCustomized}
          onSelectMyHero={matchup.setMyHeroClass}
          onToggleEnemy={matchup.toggleEnemyHero}
          onFocusEnemy={matchup.focusEnemyHero}
          onRemoveEnemy={matchup.removeEnemyHero}
          onClearAllEnemies={matchup.clearAllEnemies}
          onChangeStage={matchup.setStage}
          onChangeDamage={matchup.setDamageProfile}
          onToggleModifier={matchup.toggleModifier}
          onToggleActiveSlotsFull={() => matchup.setActiveSlotsFull((v) => !v)}
          onResetDefaults={matchup.resetEnemyDefaults}
        />

        {!focusedEnemy || !result ? (
          <section className="empty-inline-prompt">
            <Crosshair size={18} className="empty-inline-icon" />
            <div>
              <h2 className="empty-inline-title">{t.emptyHeading}</h2>
              <p className="empty-inline-sub">{t.rosterHintEnemy}</p>
            </div>
          </section>
        ) : (
          <section className="results-section" aria-label="Recommended counter items">
            {matchup.activeSlotsFull && result.hiddenActiveCount > 0 && (
              <div className="passive-filter-banner">
                <Layers size={14} />
                <span>
                  <strong>{t.passiveBannerLead}</strong>{' '}
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

            {(() => {
              const offenseSection = (
                <div
                  key="offense"
                  className={`stance-column ${
                    result.recommendedStance === 'offense' ? 'stance-column--primary' : ''
                  }`}
                >
                  <div className="stance-group-header">
                    <div className="stance-title-wrap">
                      <span className="stance-icon stance-icon--offense">
                        <Swords size={15} />
                      </span>
                      <h3 className="stance-heading">{t.offenseSectionTitle}</h3>
                    </div>
                    {result.recommendedStance === 'offense' && (
                      <span
                        className="stance-rec-pill stance-rec-pill--offense"
                        title={result.stanceReason}
                      >
                        <Sparkles size={11} />
                        {t.recommendedStanceBadge}
                      </span>
                    )}
                  </div>
                  <div className="cards-list">
                    {result.offense.map((rec) => (
                      <CounterCard
                        key={rec.item.className}
                        rec={rec}
                        language={matchup.language}
                        itemLanguage={matchup.itemLanguage}
                        totalSelectedEnemies={matchup.enemyTargets.length}
                        heroesByClass={heroesByClass}
                      />
                    ))}
                  </div>
                </div>
              );

              const defenseSection = (
                <div
                  key="defense"
                  className={`stance-column ${
                    result.recommendedStance === 'defense' ? 'stance-column--primary' : ''
                  }`}
                >
                  <div className="stance-group-header">
                    <div className="stance-title-wrap">
                      <span className="stance-icon stance-icon--defense">
                        <Shield size={15} />
                      </span>
                      <h3 className="stance-heading">{t.defenseSectionTitle}</h3>
                    </div>
                    {result.recommendedStance === 'defense' && (
                      <span
                        className="stance-rec-pill stance-rec-pill--defense"
                        title={result.stanceReason}
                      >
                        <Sparkles size={11} />
                        {t.recommendedStanceBadge}
                      </span>
                    )}
                  </div>
                  <div className="cards-list">
                    {result.defense.map((rec) => (
                      <CounterCard
                        key={rec.item.className}
                        rec={rec}
                        language={matchup.language}
                        itemLanguage={matchup.itemLanguage}
                        totalSelectedEnemies={matchup.enemyTargets.length}
                        heroesByClass={heroesByClass}
                      />
                    ))}
                  </div>
                </div>
              );

              return (
                <div className="stance-grid">
                  {result.recommendedStance === 'defense'
                    ? [defenseSection, offenseSection]
                    : [offenseSection, defenseSection]}
                </div>
              );
            })()}
          </section>
        )}
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
