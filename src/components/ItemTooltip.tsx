import { Clock } from 'lucide-react';
import { SoulsIcon } from './SoulsIcon';
import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type { DeadlockItem, Language, UpgradeHint } from '../types/deadlock';

interface ItemTooltipProps {
  item: DeadlockItem;
  uiLang: Language;
  inGameLang: Language;
  upgradeHint?: UpgradeHint | null;
  children: ReactNode;
  className?: string;
}

interface PopoverCoords {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}

const TOOLTIP_HALF_WIDTH = 176;
const VIEWPORT_PADDING = 12;

export function ItemTooltip({
  item,
  uiLang,
  inGameLang,
  upgradeHint,
  children,
  className = '',
}: ItemTooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tooltipId = useId();

  const t = UI_TEXT[uiLang];
  const locale = uiLang === 'de' ? 'de-DE' : 'en-US';
  const itemName = getItemDisplayName(item, inGameLang);
  const sections = (uiLang === 'de' ? item.tooltipDe : item.tooltipEn) ?? item.tooltipEn ?? [];
  const hasContent = sections.length > 0 || Boolean(item.summary);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const clampedLeft = Math.max(
      TOOLTIP_HALF_WIDTH + VIEWPORT_PADDING,
      Math.min(window.innerWidth - TOOLTIP_HALF_WIDTH - VIEWPORT_PADDING, centerX),
    );
    const spaceBelow = window.innerHeight - rect.bottom;
    const placement: 'top' | 'bottom' = spaceBelow >= 280 || rect.top < 260 ? 'bottom' : 'top';
    const top = placement === 'top' ? rect.top - 10 : rect.bottom + 10;
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

  if (!hasContent) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <div
        ref={triggerRef}
        tabIndex={0}
        className={`item-tooltip-trigger ${className}`.trim()}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        onClick={handleClick}
      >
        {children}
      </div>
      {open &&
        coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            className={`item-tooltip-popover item-tooltip-popover--${item.slot} item-tooltip-popover--${coords.placement}`}
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          >
            <div className="item-tooltip-header">
              <div className="item-tooltip-title-wrap">
                <div className="item-tooltip-name">{itemName}</div>
                <div className="item-tooltip-sub">
                  <span>
                    Tier {item.tier} · {t.slots[item.slot]}
                  </span>
                  {item.isActive && (
                    <span className="item-tooltip-type-tag item-tooltip-type-tag--active">
                      {t.activeTag}
                    </span>
                  )}
                </div>
              </div>
              <span className="item-tooltip-cost">
                <SoulsIcon size={13} />
                {item.cost.toLocaleString(locale)}
              </span>
            </div>

            {sections.length > 0 ? (
              <div className="item-tooltip-sections">
                {sections.map((sec, idx) => (
                  <div
                    key={`${sec.type}-${idx}`}
                    className={`item-tooltip-section item-tooltip-section--${sec.type}`}
                  >
                    {sec.type !== 'innate' && (
                      <div className="item-tooltip-section-bar">
                        <span
                          className={`item-tooltip-section-label item-tooltip-section-label--${sec.type}`}
                        >
                          {sec.type === 'active' ? t.activeTag : t.passiveTag}
                        </span>
                        {sec.cooldown && (
                          <span className="item-tooltip-cd">
                            <Clock size={11} />
                            {sec.cooldown}
                          </span>
                        )}
                      </div>
                    )}

                    {sec.desc && <p className="item-tooltip-desc">{sec.desc}</p>}

                    {sec.stats.length > 0 && (
                      <div
                        className={
                          sec.type === 'innate'
                            ? 'item-tooltip-innate-list'
                            : 'item-tooltip-stat-grid'
                        }
                      >
                        {sec.stats.map((st, sIdx) => (
                          <div
                            key={`${st.label}-${sIdx}`}
                            className={`item-tooltip-stat ${
                              st.important || st.elevated ? 'item-tooltip-stat--highlight' : ''
                            }`}
                          >
                            <span className="item-tooltip-stat-val">{st.value}</span>
                            <span className="item-tooltip-stat-label">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="item-tooltip-desc">{item.summary}</p>
            )}

            {upgradeHint && (
              <div className="item-tooltip-upgrade">
                {upgradeHint.direction === 'from'
                  ? t.upgradeFromBadge(
                      upgradeHint.itemName,
                      upgradeHint.cost.toLocaleString(locale),
                    )
                  : t.upgradeToBadge(
                      upgradeHint.itemName,
                      upgradeHint.cost.toLocaleString(locale),
                    )}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
