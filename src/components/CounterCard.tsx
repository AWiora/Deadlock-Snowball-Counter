import { Check, Copy } from 'lucide-react';
import { SoulsIcon } from './SoulsIcon';
import { Fragment, useMemo, useState } from 'react';
import { getHeroDisplayName, getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type {
  CounterActionGroup,
  CounterRecommendation,
  DeadlockAbility,
  DeadlockHero,
  KitAmplifierAxis,
  Language,
} from '../types/deadlock';
import { getAbilityDisplayName } from '../utils/abilities';
import { AbilityTooltip } from './AbilityTooltip';
import { ItemTooltip } from './ItemTooltip';
import { RichAbilityText } from './RichAbilityText';

interface CounterCardProps {
  rec: CounterRecommendation;
  language: Language;
  itemLanguage?: Language;
  totalSelectedEnemies?: number;
  heroesByClass?: Map<string, DeadlockHero>;
  myHero?: DeadlockHero | null;
  /** Price only adds information when the souls filter shows every tier */
  showCost?: boolean;
}

interface AbilityChipProps {
  ability: DeadlockAbility;
  uiLang: Language;
  inGameLang: Language;
  variant?: 'enemy' | 'own';
}

// Deadlock Wiki stat glyphs for the boosted stat; axes without a glyph show words only
const KIT_AXIS_ICON: Partial<Record<KitAmplifierAxis, string>> = {
  cooldown: 'https://cdn.deadlock.wiki/AttributeIconTechCooldown.png',
  range: 'https://cdn.deadlock.wiki/AttributeIconTechRange.png',
  duration: 'https://cdn.deadlock.wiki/AttributeIconTechDuration.png',
  charges: 'https://cdn.deadlock.wiki/AttributeIconMaxChargesIncrease.png',
};

function cleanDisplayUseTip(text: string, isActive: boolean): string {
  if (isActive) return text;
  const stripped = text.replace(/^(?:Passive|Passiv)\s*[—–:-]\s*/i, '');
  if (!stripped || stripped === text) return text;
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

function CounterAbilityChip({
  ability,
  uiLang,
  inGameLang,
  variant = 'enemy',
}: AbilityChipProps) {
  const displayName = getAbilityDisplayName(ability, inGameLang);
  const chipClasses = [
    'counter-ability-chip',
    ability.isUltimate ? 'counter-ability-chip--ult' : '',
    variant === 'own' ? 'counter-ability-chip--own' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AbilityTooltip
      ability={ability}
      uiLang={uiLang}
      inGameLang={inGameLang}
      className={chipClasses}
    >
      <span className="counter-ability-chip-icon-wrap">
        {ability.icon ? (
          <img
            src={ability.icon}
            alt=""
            className="counter-ability-chip-icon"
            loading="lazy"
          />
        ) : (
          <span className="counter-ability-chip-fallback">{displayName.slice(0, 2)}</span>
        )}
        <span className="counter-ability-chip-slot">{ability.slot}</span>
      </span>
      <span className="counter-ability-chip-name">{displayName}</span>
    </AbilityTooltip>
  );
}

function renderActionGroups(
  groups: CounterActionGroup[],
  uiLang: Language,
  inGameLang: Language,
  hideVerb = false,
) {
  return (
    <span className="counter-action-groups">
      {groups.map((group, gIdx) => (
        <span key={`${group.verb}-${gIdx}`} className="counter-action-group">
          {!hideVerb && <span className="counter-action-verb">{group.verbLabel}</span>}
          <span className="counter-action-targets">
            {group.targets.map((chip, cIdx) => {
              const prevChip = cIdx > 0 ? group.targets[cIdx - 1] : null;
              const needsDot =
                chip.kind === 'mechanic' && prevChip && prevChip.kind === 'mechanic';
              if (chip.kind === 'ability') {
                return (
                  <CounterAbilityChip
                    key={`${chip.heroClass}-${chip.ability.className}-${cIdx}`}
                    ability={chip.ability}
                    uiLang={uiLang}
                    inGameLang={inGameLang}
                  />
                );
              }
              return (
                <Fragment key={`${chip.label}-${cIdx}`}>
                  {needsDot && (
                    <span className="counter-mechanic-sep" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span
                    className={`counter-mechanic-text counter-mechanic-text--${chip.tone ?? 'threat'}`}
                  >
                    {chip.label}
                  </span>
                </Fragment>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Splits a Kit-Amplifier's merged enemy action groups into clean per-enemy rows
 * when 2-3 enemies are selected, so every countered enemy displays its own avatar + targets.
 */
function splitKitGroupsByHero(
  heroClasses: string[],
  groups: CounterActionGroup[],
): { heroClasses: string[]; groups: CounterActionGroup[] }[] {
  if (heroClasses.length <= 1) {
    return [{ heroClasses, groups }];
  }

  const perHero = new Map<string, CounterActionGroup[]>();
  const sharedNonAbility: CounterActionGroup[] = [];

  for (const g of groups) {
    for (const chip of g.targets) {
      if (chip.kind === 'ability') {
        const list = perHero.get(chip.heroClass) ?? [];
        let existing = list.find((item) => item.verb === g.verb);
        if (!existing) {
          existing = { verb: g.verb, verbLabel: g.verbLabel, targets: [] };
          list.push(existing);
        }
        existing.targets.push(chip);
        perHero.set(chip.heroClass, list);
      } else {
        let existing = sharedNonAbility.find((item) => item.verb === g.verb);
        if (!existing) {
          existing = { verb: g.verb, verbLabel: g.verbLabel, targets: [] };
          sharedNonAbility.push(existing);
        }
        existing.targets.push(chip);
      }
    }
  }

  if (perHero.size === 0) {
    return [{ heroClasses, groups }];
  }

  const rows: { heroClasses: string[]; groups: CounterActionGroup[] }[] = [];
  const uncoveredHeroes: string[] = [];

  for (const cls of heroClasses) {
    const heroGroups = perHero.get(cls);
    if (heroGroups && heroGroups.length > 0) {
      rows.push({ heroClasses: [cls], groups: heroGroups });
    } else {
      uncoveredHeroes.push(cls);
    }
  }

  if (uncoveredHeroes.length > 0 && sharedNonAbility.length > 0) {
    rows.push({ heroClasses: uncoveredHeroes, groups: sharedNonAbility });
  }

  return rows.length > 0 ? rows : [{ heroClasses, groups }];
}

export function CounterCard({
  rec,
  language,
  itemLanguage,
  totalSelectedEnemies = 1,
  heroesByClass,
  myHero,
  showCost = true,
}: CounterCardProps) {
  const [copied, setCopied] = useState(false);
  const {
    item,
    rank,
    why,
    reasons,
    whenToUse,
    isKitAmplifier,
    kitAmplifier,
    counteredEnemies,
    upgradeHint,
  } = rec;
  const isTop = rank === 1;
  const t = UI_TEXT[language];
  const effectiveInGameLang = itemLanguage ?? language;
  const itemName = getItemDisplayName(item, effectiveInGameLang);
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const formattedCost = item.cost.toLocaleString(locale);
  const showEnemyPrefix = totalSelectedEnemies > 1;
  const displayWhenToUse = cleanDisplayUseTip(whenToUse, item.isActive);

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
  const hasStructuredReasons =
    reasons && reasons.length > 0 && reasons.every((r) => (r.actionGroups?.length ?? 0) > 0);

  // One row per enemy; with several enemies doing the same verb, the verb is said once on top
  const targetRows = (reasons ?? []).flatMap((reason, rIdx) => {
    const actionGroups = reason.actionGroups ?? [];
    const rows = isKitAmplifier
      ? splitKitGroupsByHero(reason.heroClasses, actionGroups)
      : [{ heroClasses: reason.heroClasses, groups: actionGroups }];
    return rows.map((row, sIdx) => ({
      ...row,
      key: `${row.heroClasses.join('-')}-${rIdx}-${sIdx}`,
    }));
  });
  const sharedVerbLabel =
    showEnemyPrefix &&
    targetRows.length > 1 &&
    targetRows.every((row) => row.groups.length === 1) &&
    new Set(targetRows.map((row) => row.groups[0].verb)).size === 1
      ? targetRows[0].groups[0].verbLabel
      : null;

  const renderHeroPrefix = (heroClasses: string[]) => {
    const matchedHeroes = heroClasses.map((cls) => ({
      cls,
      hero: heroesByClass?.get(cls) ?? null,
    }));
    const heroLabel = matchedHeroes
      .map(({ cls, hero }) => (hero ? getHeroDisplayName(hero, language) : cls))
      .join(' + ');

    // Portrait leads the row; the name stays available to hover and screen readers
    return (
      <span className="reason-hero-tag" title={heroLabel}>
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
        <span className="sr-only">
          {t.targetHeroPrefix} {heroLabel}
        </span>
      </span>
    );
  };

  return (
    <article
      className={`counter-card counter-card--${item.slot} ${
        isTop ? 'counter-card--top' : ''
      } ${isMultiHit ? 'counter-card--multi' : ''}`}
    >
      <div className="counter-card-stripe" aria-hidden="true" />

      <ItemTooltip
        item={item}
        uiLang={language}
        inGameLang={effectiveInGameLang}
        upgradeHint={upgradeHint}
        className={`item-icon-frame item-icon-frame--${item.slot}`}
      >
        <span className={`icon-rank-corner ${isTop ? 'icon-rank-corner--top' : ''}`}>
          #{rank}
        </span>
        {item.icon ? (
          <img src={item.icon} alt={itemName} className="item-icon-img" loading="lazy" />
        ) : (
          <span className="item-icon-fallback">{itemName.slice(0, 2)}</span>
        )}
        {item.isActive && (
          <span className="item-act-pill item-act-pill--active">{t.activeTag}</span>
        )}
      </ItemTooltip>

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
            {showCost && (
              <span className="soul-cost" title={t.soulTitle(item.tier, item.cost)}>
                <SoulsIcon size={13} />
                {formattedCost}
              </span>
            )}
          </div>
        </div>

        {/* Structured counter targets: [Kit Boost Header] + [Verb + Ability Chips / Mechanic Text] */}
        {hasStructuredReasons ? (
          <div className="counter-targets-stack">
            {isKitAmplifier && kitAmplifier && (
              <div className="kit-boost-row">
                {myHero && (myHero.iconSmall || myHero.iconCard) && (
                  <img
                    src={myHero.iconSmall || myHero.iconCard}
                    alt=""
                    className="kit-boost-hero-avatar"
                    loading="lazy"
                  />
                )}
                <span className="kit-boost-verb">{t.kitBoostPrefix}</span>
                {kitAmplifier.ability ? (
                  <CounterAbilityChip
                    ability={kitAmplifier.ability}
                    uiLang={language}
                    inGameLang={effectiveInGameLang}
                    variant="own"
                  />
                ) : (
                  <span className="kit-boost-ability-fallback">
                    {kitAmplifier.abilityName}
                  </span>
                )}
                <span className="kit-boost-axis-text">
                  {KIT_AXIS_ICON[kitAmplifier.axis] && (
                    <img
                      className="kit-boost-axis-icon"
                      src={KIT_AXIS_ICON[kitAmplifier.axis]}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {kitAmplifier.boostLabel}
                </span>
              </div>
            )}

            {sharedVerbLabel && <div className="counter-shared-verb">{sharedVerbLabel}</div>}
            {targetRows.map((row) => (
              <div
                key={row.key}
                className={`counter-target-row ${showEnemyPrefix ? 'counter-target-row--hero' : ''}`}
              >
                {showEnemyPrefix && renderHeroPrefix(row.heroClasses)}
                {renderActionGroups(
                  row.groups,
                  language,
                  effectiveInGameLang,
                  Boolean(sharedVerbLabel),
                )}
              </div>
            ))}
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
          <div className="when-to-use">
            <span className="when-to-use-text">
              <strong className="when-to-use-label">{t.useLabel}</strong>{' '}
              <RichAbilityText
                text={displayWhenToUse}
                heroes={cardContextHeroes}
                uiLang={language}
                inGameLang={effectiveInGameLang}
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
