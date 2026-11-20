import { SoulsIcon } from './SoulsIcon';
import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getItemDisplayName, UI_TEXT } from '../i18n/translations';
import type {
  DeadlockItem,
  DeadlockItemStat,
  ItemStatIcon,
  Language,
  UpgradeHint,
} from '../types/deadlock';

type StatTint = 'weapon' | 'vitality' | 'spirit' | 'souls' | 'none';

// Deadlock Wiki glyphs per stat, tinted by stat family like the wiki's item boxes:
// weapon stats orange, vitality stats green, ability stats purple; damage and resist
// glyphs already carry their colour.
const STAT_ICON: Record<ItemStatIcon, { file: string; tint: StatTint }> = {
  spirit_damage: { file: 'Spirit_damage.png', tint: 'none' },
  weapon_damage: { file: 'Bullet_damage.png', tint: 'none' },
  damage: { file: 'Damage_heart.png', tint: 'none' },
  spirit_resist: { file: 'Spirit_Armor.png', tint: 'none' },
  bullet_resist: { file: 'Bullet_Armor.png', tint: 'none' },
  slow: { file: 'MoveSlow.png', tint: 'spirit' },
  duration: { file: 'AttributeIconTechDuration.png', tint: 'spirit' },
  range: { file: 'AttributeIconTechRange.png', tint: 'spirit' },
  cast_range: { file: 'CastRange.png', tint: 'spirit' },
  cooldown: { file: 'AttributeIconTechCooldown.png', tint: 'spirit' },
  healing: { file: 'Healing.png', tint: 'vitality' },
  health: { file: 'Health.png', tint: 'vitality' },
  move_speed: { file: 'Move_speed.png', tint: 'vitality' },
  barrier: { file: 'Barrier.png', tint: 'vitality' },
  fire_rate: { file: 'Fire_Rate.png', tint: 'weapon' },
  ammo: { file: 'Clip_size_icon.png', tint: 'weapon' },
  melee: { file: 'Melee_damage.png', tint: 'weapon' },
  souls: { file: 'Souls_icon.png', tint: 'souls' },
};

const isMainStat = (st: DeadlockItemStat) => Boolean(st.important || st.elevated);

function StatGlyph({ icon }: { icon?: ItemStatIcon }) {
  const glyph = icon ? STAT_ICON[icon] : undefined;
  if (!glyph) return null;
  return (
    <img
      className={`item-stat-glyph item-stat-glyph--${glyph.tint}`}
      src={`https://cdn.deadlock.wiki/${glyph.file}`}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
    />
  );
}

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

const TOOLTIP_HALF_WIDTH = 180;
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
  // The active section labels itself; the header tag is only needed when it is missing
  const showActiveTag = item.isActive && !sections.some((sec) => sec.type === 'active');

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
            lang={uiLang}
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
                  {showActiveTag && (
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
                {sections.map((sec, idx) => {
                  // In-game layout: headline stats of an effect get a glyph box, the rest a
                  // plain line. The bare bonus block (innate, no effect text) stays all lines.
                  const isBonusBlock = sec.type === 'innate' && !sec.desc;
                  const mainStats = isBonusBlock ? [] : sec.stats.filter(isMainStat);
                  const lineStats = isBonusBlock
                    ? sec.stats
                    : sec.stats.filter((st) => !isMainStat(st));
                  return (
                    <div
                      key={`${sec.type}-${idx}`}
                      className={`item-tooltip-section item-tooltip-section--${sec.type}${
                        isBonusBlock ? ' item-tooltip-section--bonus' : ''
                      }`}
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
                              <img
                                className="item-tooltip-cd-icon"
                                src="https://cdn.deadlock.wiki/AttributeIconTechCooldown.png"
                                alt=""
                                referrerPolicy="no-referrer"
                              />
                              {sec.cooldown}
                            </span>
                          )}
                        </div>
                      )}

                      {sec.desc && <p className="item-tooltip-desc">{sec.desc}</p>}

                      {mainStats.length > 0 && (
                        <div className="item-tooltip-main-stats">
                          {mainStats.map((st, sIdx) => (
                            <div key={`${st.label}-${sIdx}`} className="item-tooltip-main-stat">
                              <span className="item-tooltip-main-stat-top">
                                <StatGlyph icon={st.icon} />
                                <span className="item-tooltip-main-stat-val">{st.value}</span>
                              </span>
                              <span className="item-tooltip-main-stat-label">{st.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {lineStats.length > 0 && (
                        <ul className="item-tooltip-line-stats">
                          {lineStats.map((st, sIdx) => (
                            <li key={`${st.label}-${sIdx}`} className="item-tooltip-line-stat">
                              <span className="item-tooltip-line-stat-val">{st.value}</span>{' '}
                              <span className="item-tooltip-line-stat-label">{st.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="item-tooltip-desc">{item.summary}</p>
            )}

            {upgradeHint && (
              <div className="item-tooltip-upgrade">
                <span className="item-tooltip-upgrade-label">
                  {upgradeHint.direction === 'from' ? t.upgradeFromLabel : t.upgradeToLabel}
                </span>
                <span className="item-tooltip-upgrade-item">
                  {upgradeHint.icon && (
                    <img
                      className="item-tooltip-upgrade-icon"
                      src={upgradeHint.icon}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                  <span className="item-tooltip-upgrade-name">{upgradeHint.itemName}</span>
                </span>
                <span className="item-tooltip-upgrade-cost">
                  <SoulsIcon size={11} />
                  {upgradeHint.cost.toLocaleString(locale)}
                </span>
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
