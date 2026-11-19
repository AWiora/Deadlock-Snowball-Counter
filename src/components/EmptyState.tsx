import { Crosshair, Flame } from 'lucide-react';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
import type { DeadlockHero, Language } from '../types/deadlock';

interface EmptyStateProps {
  language: Language;
  heroesByClass: Map<string, DeadlockHero>;
  onSelectEnemy: (className: string) => void;
  onOpenEnemyPicker: () => void;
}

const POPULAR_THREATS = [
  'hero_haze',
  'hero_atlas',
  'hero_gigawatt',
  'hero_ghost',
  'hero_inferno',
  'hero_bebop',
  'hero_shiv',
  'hero_hornet',
  'hero_lash',
  'hero_wraith',
  'hero_krill',
  'hero_synth',
];

export function EmptyState({
  language,
  heroesByClass,
  onSelectEnemy,
  onOpenEnemyPicker,
}: EmptyStateProps) {
  const t = UI_TEXT[language];
  const quickHeroes = POPULAR_THREATS.map((c) => heroesByClass.get(c)).filter(
    (h): h is DeadlockHero => Boolean(h),
  );

  return (
    <section className="empty-state">
      <div className="empty-hero-banner">
        <div className="empty-badge">
          <Flame size={14} />
          <span>{t.emptyBadge}</span>
        </div>
        <h2 className="empty-heading">{t.emptyHeading}</h2>
        <p className="empty-desc">{t.emptyDesc}</p>
        <button type="button" className="primary-cta-btn" onClick={onOpenEnemyPicker}>
          <Crosshair size={16} />
          <span>{t.emptyCta(heroesByClass.size)}</span>
        </button>
      </div>

      <div className="quick-pick-block">
        <span className="deck-micro-label">{t.quickPickLabel}</span>
        <div className="quick-pick-grid">
          {quickHeroes.map((hero) => {
            const name = getHeroDisplayName(hero, language);
            return (
              <button
                key={hero.className}
                type="button"
                className="quick-hero-card"
                onClick={() => onSelectEnemy(hero.className)}
              >
                {(hero.iconCard || hero.iconSmall) && (
                  <img
                    src={hero.iconCard || hero.iconSmall}
                    alt={name}
                    className="quick-hero-img"
                    loading="lazy"
                  />
                )}
                <span className="quick-hero-name">{name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
