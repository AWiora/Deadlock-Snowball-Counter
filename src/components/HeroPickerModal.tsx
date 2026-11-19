import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getHeroDisplayName, UI_TEXT } from '../i18n/translations';
import type { DeadlockHero, Language } from '../types/deadlock';

interface HeroPickerModalProps {
  isOpen: boolean;
  language: Language;
  title: string;
  subtitle: string;
  heroes: DeadlockHero[];
  selectedClassName: string | null;
  disabledClassName?: string | null;
  onSelect: (className: string) => void;
  onClose: () => void;
}

export function HeroPickerModal({
  isOpen,
  language,
  title,
  subtitle,
  heroes,
  selectedClassName,
  disabledClassName,
  onSelect,
  onClose,
}: HeroPickerModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = UI_TEXT[language];

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return heroes;
    return heroes.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        (h.nameDe && h.nameDe.toLowerCase().includes(q)),
    );
  }, [heroes, query]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const firstValid = filtered.find((h) => h.className !== disabledClassName);
    if (firstValid) {
      onSelect(firstValid.className);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-subtitle">{subtitle}</p>
          </div>
          <button type="button" className="icon-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-search-wrap">
          <Search size={16} className="modal-search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.modalSearchPlaceholder}
            className="modal-search-input"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="modal-search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>

        <div className="hero-grid">
          {filtered.map((hero) => {
            const name = getHeroDisplayName(hero, language);
            const isSelected = hero.className === selectedClassName;
            const isDisabled = hero.className === disabledClassName;
            return (
              <button
                key={hero.className}
                type="button"
                disabled={isDisabled}
                className={`hero-tile ${isSelected ? 'hero-tile--selected' : ''} ${
                  isDisabled ? 'hero-tile--disabled' : ''
                }`}
                onClick={() => {
                  onSelect(hero.className);
                  onClose();
                }}
              >
                <div className="hero-tile-img-wrap">
                  {hero.iconCard || hero.iconSmall ? (
                    <img
                      src={hero.iconCard || hero.iconSmall}
                      alt={name}
                      loading="lazy"
                      className="hero-tile-img"
                    />
                  ) : (
                    <span className="hero-tile-fallback">{name.slice(0, 2)}</span>
                  )}
                </div>
                <span className="hero-tile-name">{name}</span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="hero-grid-empty">{t.modalNoMatch(query)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
