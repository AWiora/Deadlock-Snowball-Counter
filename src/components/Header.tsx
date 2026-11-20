import { Check, ChevronDown, Link2 } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { DataSourceStatus } from '../hooks/useDeadlockData';
import { UI_TEXT } from '../i18n/translations';
import type { Language } from '../types/deadlock';

interface HeaderProps {
  language: Language;
  itemLanguage: Language;
  onChangeLanguage: (lang: Language) => void;
  onChangeItemLanguage: (lang: Language) => void;
  hasEnemySelected: boolean;
  dataStatus: DataSourceStatus;
}

export function Header({
  language,
  itemLanguage,
  onChangeLanguage,
  onChangeItemLanguage,
  hasEnemySelected,
  dataStatus,
}: HeaderProps) {
  const [copied, setCopied] = useState(false);
  const t = UI_TEXT[language];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const statusLabel =
    dataStatus === 'live'
      ? t.statusLive
      : dataStatus === 'cached'
        ? t.statusCached
        : t.statusSnapshot;

  return (
    <header className="top-header">
      <div className="top-header-inner">
        <div className="brand-block">
          <div className="brand-emblem" aria-hidden="true">
            <svg viewBox="12 6 40 52" width="18" height="22">
              <path
                d="M32 8L52 16V31C52 43.5 43.2 52.8 32 56C20.8 52.8 12 43.5 12 31V16L32 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path d="M32 22L36 32L32 42L28 32L32 22Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">{t.brandTitle}</h1>
            <div className="brand-sub">
              <span>{t.brandSub}</span>
              <span className={`api-dot api-dot--${dataStatus}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <LanguageMenu
            language={language}
            itemLanguage={itemLanguage}
            onChangeLanguage={onChangeLanguage}
            onChangeItemLanguage={onChangeItemLanguage}
          />

          <button
            type="button"
            className={`share-btn ${copied ? 'share-btn--copied' : ''}`}
            onClick={handleShare}
            disabled={!hasEnemySelected}
            title={hasEnemySelected ? t.shareTitle : t.shareDisabledTitle}
          >
            {copied ? <Check size={15} /> : <Link2 size={15} />}
            <span>{copied ? t.shareCopied : t.share}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

const LANGUAGE_NAMES: Record<Language, string> = { de: 'Deutsch', en: 'English' };
const LANGUAGES: Language[] = ['de', 'en'];

interface LanguageMenuProps {
  language: Language;
  itemLanguage: Language;
  onChangeLanguage: (lang: Language) => void;
  onChangeItemLanguage: (lang: Language) => void;
}

/** One set-once menu for both languages: UI text, and item/ability names as in the game client. */
function LanguageMenu({
  language,
  itemLanguage,
  onChangeLanguage,
  onChangeItemLanguage,
}: LanguageMenuProps) {
  const t = UI_TEXT[language];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const renderRow = (label: string, value: Language, onChange: (lang: Language) => void) => (
    <div className="lang-row" role="group" aria-label={label}>
      <span className="lang-row-label">{label}</span>
      <span className="lang-row-options">
        {LANGUAGES.map((code) => (
          <button
            key={code}
            type="button"
            lang={code}
            className={`lang-btn ${value === code ? 'lang-btn--active' : ''}`}
            onClick={() => onChange(code)}
            aria-pressed={value === code}
          >
            {LANGUAGE_NAMES[code]}
          </button>
        ))}
      </span>
    </div>
  );

  return (
    <div className="lang-menu" ref={rootRef}>
      <button
        type="button"
        className={`lang-menu-btn ${open ? 'lang-menu-btn--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t.langMenuTitle}
        title={t.langMenuTitle}
      >
        <span className="lang-menu-code">{language.toUpperCase()}</span>
        {itemLanguage !== language && (
          <span className="lang-menu-sub">{t.langNamesShort(itemLanguage.toUpperCase())}</span>
        )}
        <ChevronDown size={14} className="lang-menu-chevron" />
      </button>
      {open && (
        <div className="lang-menu-panel" id={panelId}>
          {renderRow(t.langRowText, language, onChangeLanguage)}
          {renderRow(t.langRowNames, itemLanguage, onChangeItemLanguage)}
          <p className="lang-menu-hint">{t.langNamesHint}</p>
        </div>
      )}
    </div>
  );
}
