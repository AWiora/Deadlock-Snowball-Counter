import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UI_TEXT } from '../i18n/translations';
import type { DeadlockAbility, Language } from '../types/deadlock';
import { getAbilityDescription, getAbilityDisplayName } from '../utils/abilities';
import { DAMAGE_TYPE_ICON, StatGlyph } from './StatGlyph';

/** What the ability deals, from the game data: lets you check e.g. whether Metal Skin helps */
function AbilityDamage({ ability, uiLang }: { ability: DeadlockAbility; uiLang: Language }) {
  const t = UI_TEXT[uiLang];
  // Unknown (data from an older cache): show nothing rather than a wrong "no damage"
  if (!ability.damage) return null;
  return (
    <ul className="ability-tooltip-damage">
      {ability.damage.length === 0 && (
        <li className="ability-tooltip-damage-row ability-tooltip-damage-row--none">
          {t.abilityNoDamage}
        </li>
      )}
      {ability.damage.map((d, idx) => (
        <li key={`${d.type}-${idx}`} className="ability-tooltip-damage-row">
          <StatGlyph icon={DAMAGE_TYPE_ICON[d.type]} />
          {d.value && <span className="ability-tooltip-damage-val">{d.value}</span>}
          <span className="ability-tooltip-damage-label">
            {uiLang === 'de' ? d.labelDe : d.labelEn}
          </span>
          <span className={`ability-tooltip-damage-type ability-tooltip-damage-type--${d.type}`}>
            {t.abilityDamageType[d.type]}
          </span>
        </li>
      ))}
      {ability.empowersWeapon && (
        <li className="ability-tooltip-damage-row">
          <StatGlyph icon="fire_rate" />
          <span className="ability-tooltip-damage-label">{t.abilityEmpowersWeapon}</span>
        </li>
      )}
    </ul>
  );
}

interface AbilityTooltipProps {
  ability: DeadlockAbility;
  uiLang: Language;
  inGameLang: Language;
  children: ReactNode;
  className?: string;
}

interface PopoverCoords {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}

const TOOLTIP_HALF_WIDTH = 148;
const VIEWPORT_PADDING = 12;

export function AbilityTooltip({
  ability,
  uiLang,
  inGameLang,
  children,
  className = '',
}: AbilityTooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipId = useId();

  const title = getAbilityDisplayName(ability, inGameLang);
  const description = getAbilityDescription(ability, uiLang);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const clampedLeft = Math.max(
      TOOLTIP_HALF_WIDTH + VIEWPORT_PADDING,
      Math.min(window.innerWidth - TOOLTIP_HALF_WIDTH - VIEWPORT_PADDING, centerX),
    );
    const placement: 'top' | 'bottom' = rect.top < 160 ? 'bottom' : 'top';
    const top = placement === 'top' ? rect.top - 8 : rect.bottom + 8;
    setCoords({ top, left: clampedLeft, placement });
  }, []);

  const handleOpen = () => {
    updatePosition();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (open) {
      setOpen(false);
    } else {
      updatePosition();
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const handleOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleScroll = () => setOpen(false);

    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousedown', handleOutside);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  if (!description && !ability.damage) {
    return <span className={className}>{children}</span>;
  }

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={0}
        className={`ability-tooltip-trigger ${className}`.trim()}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        onClick={handleClick}
      >
        {children}
      </span>
      {open &&
        coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            className={`ability-tooltip-popover ability-tooltip-popover--${coords.placement}`}
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          >
            <div className="ability-tooltip-title">{title}</div>
            {description && <p className="ability-tooltip-desc">{description}</p>}
            <AbilityDamage ability={ability} uiLang={uiLang} />
          </div>,
          document.body,
        )}
    </>
  );
}
