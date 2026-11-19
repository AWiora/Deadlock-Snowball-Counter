import { Check, Globe, Link2, Shield, Sparkles, Tag } from 'lucide-react';
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
            <Shield size={18} />
          </div>
          <div>
            <h1 className="brand-title">{t.brandTitle}</h1>
            <div className="brand-sub">
              <span>{t.brandSub}</span>
              <span className={`api-dot api-dot--${dataStatus}`}>
                <Sparkles size={10} />
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="lang-switcher" role="group" aria-label="UI Text Language" title={language === 'de' ? 'Sprache für Oberfläche & Tipps' : 'UI & tips language'}>
            <Globe size={13} className="lang-globe" aria-hidden="true" />
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
            aria-label="Item Names Language"
            title={
              language === 'de'
                ? 'Sprache der Item-Namen (offizielle Valve-Namen für deinen In-Game-Shop)'
                : 'Item names language (official Valve names for your in-game shop)'
            }
          >
            <Tag size={13} className="lang-globe" aria-hidden="true" />
            <span className="lang-prefix">Items</span>
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
