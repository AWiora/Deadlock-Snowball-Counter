import { Check, Link2 } from 'lucide-react';
import { useState } from 'react';
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
          <div className="lang-switcher" role="group" aria-label="UI Text Language" title={language === 'de' ? 'Sprache für Oberfläche & Tipps' : 'UI & tips language'}>
            <span className="lang-prefix">UI</span>
            <button
              type="button"
              className={`lang-btn ${language === 'de' ? 'lang-btn--active' : ''}`}
              onClick={() => onChangeLanguage('de')}
              aria-pressed={language === 'de'}
            >
              DE
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'lang-btn--active' : ''}`}
              onClick={() => onChangeLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <div
            className="lang-switcher"
            role="group"
            aria-label="In-Game Names Language"
            title={
              language === 'de'
                ? 'Sprache für Item- & Fähigkeitsnamen (passend zu deinem Deadlock-Client)'
                : 'Language for item & ability names (matching your Deadlock client)'
            }
          >
            <span className="lang-prefix">In-Game</span>
            <button
              type="button"
              className={`lang-btn ${itemLanguage === 'en' ? 'lang-btn--active' : ''}`}
              onClick={() => onChangeItemLanguage('en')}
              aria-pressed={itemLanguage === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${itemLanguage === 'de' ? 'lang-btn--active' : ''}`}
              onClick={() => onChangeItemLanguage('de')}
              aria-pressed={itemLanguage === 'de'}
            >
              DE
            </button>
          </div>

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
