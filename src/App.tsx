import { Layers, Shield, Sparkles, Swords } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CounterCard } from './components/CounterCard';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { HeroPickerModal } from './components/HeroPickerModal';
import { MatchupControlBar } from './components/MatchupControlBar';
import { recommendCounters } from './engine/recommend';
import { useDeadlockData } from './hooks/useDeadlockData';
import { useMatchupState } from './hooks/useMatchupState';
import { UI_TEXT } from './i18n/translations';

export function App() {
  const { heroes, heroesByClass, itemsByClass, status } = useDeadlockData();
  const matchup = useMatchupState();
  const [pickerMode, setPickerMode] = useState<'my' | 'enemy' | null>(null);
  const t = UI_TEXT[matchup.language];

  const myHero = matchup.myHeroClass ? heroesByClass.get(matchup.myHeroClass) ?? null : null;
  const enemyHero = matchup.enemyHeroClass
    ? heroesByClass.get(matchup.enemyHeroClass) ?? null
    : null;
  const previousEnemyHero = matchup.previousEnemyClass
    ? heroesByClass.get(matchup.previousEnemyClass) ?? null
    : null;

  const result = useMemo(() => {
    if (!matchup.enemyHeroClass) return null;
    return recommendCounters(
      {
        myHeroClass: matchup.myHeroClass,
        enemyHeroClass: matchup.enemyHeroClass,
        stage: matchup.stage,
        damageProfile: matchup.damageProfile,
        modifiers: matchup.modifiers,
        activeSlotsFull: matchup.activeSlotsFull,
        language: matchup.language,
      },
      itemsByClass,
      heroesByClass,
    );
  }, [
    matchup.myHeroClass,
    matchup.enemyHeroClass,
    matchup.stage,
    matchup.damageProfile,
    matchup.modifiers,
    matchup.activeSlotsFull,
    matchup.language,
    itemsByClass,
    heroesByClass,
  ]);

  return (
    <div className="app-shell">
      <Header
        language={matchup.language}
        onChangeLanguage={matchup.setLanguage}
        hasEnemySelected={Boolean(enemyHero)}
        dataStatus={status}
      />

      <main className="main-container">
        <MatchupControlBar
          language={matchup.language}
          myHero={myHero}
          enemyHero={enemyHero}
          previousEnemyHero={previousEnemyHero}
          stage={matchup.stage}
          damageProfile={matchup.damageProfile}
          modifiers={matchup.modifiers}
          activeSlotsFull={matchup.activeSlotsFull}
          isCustomized={matchup.isCustomized}
          onOpenMyHeroPicker={() => setPickerMode('my')}
          onClearMyHero={() => matchup.setMyHeroClass(null)}
          onOpenEnemyPicker={() => setPickerMode('enemy')}
          onSwapPreviousEnemy={matchup.selectEnemyHero}
          onChangeStage={matchup.setStage}
          onChangeDamage={matchup.setDamageProfile}
          onToggleModifier={matchup.toggleModifier}
          onToggleActiveSlotsFull={() => matchup.setActiveSlotsFull((v) => !v)}
          onResetDefaults={matchup.resetEnemyDefaults}
        />

        {!enemyHero || !result ? (
          <EmptyState
            language={matchup.language}
            heroesByClass={heroesByClass}
            onSelectEnemy={matchup.selectEnemyHero}
            onOpenEnemyPicker={() => setPickerMode('enemy')}
          />
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

      <HeroPickerModal
        isOpen={pickerMode === 'my'}
        language={matchup.language}
        title={t.modalMyTitle}
        subtitle={t.modalMySub}
        heroes={heroes}
        selectedClassName={matchup.myHeroClass}
        disabledClassName={matchup.enemyHeroClass}
        onSelect={(c) => matchup.setMyHeroClass(c)}
        onClose={() => setPickerMode(null)}
      />

      <HeroPickerModal
        isOpen={pickerMode === 'enemy'}
        language={matchup.language}
        title={t.modalEnemyTitle}
        subtitle={t.modalEnemySub}
        heroes={heroes}
        selectedClassName={matchup.enemyHeroClass}
        disabledClassName={matchup.myHeroClass}
        onSelect={(c) => matchup.selectEnemyHero(c)}
        onClose={() => setPickerMode(null)}
      />
    </div>
  );
}

export default App;
