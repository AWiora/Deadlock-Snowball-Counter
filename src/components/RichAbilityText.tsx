import { useMemo } from 'react';
import type { DeadlockHero, Language } from '../types/deadlock';
import { segmentTextWithAbilities } from '../utils/abilities';
import { AbilityTooltip } from './AbilityTooltip';

interface RichAbilityTextProps {
  text: string;
  heroes: DeadlockHero[];
  uiLang: Language;
  inGameLang: Language;
}

export function RichAbilityText({
  text,
  heroes,
  uiLang,
  inGameLang,
}: RichAbilityTextProps) {
  const segments = useMemo(
    () => segmentTextWithAbilities(text, heroes, inGameLang),
    [text, heroes, inGameLang],
  );

  return (
    <>
      {segments.map((seg, idx) =>
        seg.type === 'ability' ? (
          <AbilityTooltip
            key={`${seg.ability.className}-${idx}`}
            ability={seg.ability}
            uiLang={uiLang}
            inGameLang={inGameLang}
            className="ability-inline-mention"
          >
            {seg.text}
          </AbilityTooltip>
        ) : (
          <span key={idx}>{seg.text}</span>
        ),
      )}
    </>
  );
}
