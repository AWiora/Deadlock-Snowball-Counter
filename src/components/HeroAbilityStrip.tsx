import type { DeadlockHero, Language } from '../types/deadlock';
import { getAbilityDisplayName } from '../utils/abilities';
import { AbilityTooltip } from './AbilityTooltip';

interface HeroAbilityStripProps {
  hero: DeadlockHero;
  uiLang: Language;
  inGameLang: Language;
  compact?: boolean;
}

export function HeroAbilityStrip({
  hero,
  uiLang,
  inGameLang,
  compact = false,
}: HeroAbilityStripProps) {
  const abilities = hero.abilities;
  if (!abilities || abilities.length === 0) return null;

  return (
    <div
      className={`hero-ability-strip ${compact ? 'hero-ability-strip--compact' : ''}`}
      aria-label={uiLang === 'de' ? 'Fähigkeiten' : 'Abilities'}
    >
      {abilities.map((ab) => {
        const displayName = getAbilityDisplayName(ab, inGameLang);
        return (
          <AbilityTooltip
            key={ab.className}
            ability={ab}
            uiLang={uiLang}
            inGameLang={inGameLang}
            className={`hero-ability-chip ${ab.isUltimate ? 'hero-ability-chip--ult' : ''}`}
          >
            <span className="hero-ability-tile">
              {ab.icon ? (
                <img
                  src={ab.icon}
                  alt={displayName}
                  className="hero-ability-icon"
                  loading="lazy"
                />
              ) : (
                <span className="hero-ability-fallback">{displayName.slice(0, 2)}</span>
              )}
            </span>
            <span className="hero-ability-key">{ab.slot}</span>
          </AbilityTooltip>
        );
      })}
    </div>
  );
}
