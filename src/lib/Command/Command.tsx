import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Search, X, CornerDownLeft } from 'lucide-react';
import './Command.css';

export interface CommandItem {
  /** Stable id passed back to `onSelect` */
  id: string;
  /** Visible label */
  label: string;
  /** Optional smaller hint shown next to label */
  hint?: string;
  /** Optional leading icon */
  icon?: ReactNode;
  /** Optional keyboard shortcut tag (e.g. "G N") */
  shortcut?: string;
  /** Additional searchable text (label is searched by default) */
  keywords?: string;
}

export interface CommandGroup {
  /** Group label (rendered as small caps eyebrow) */
  heading?: string;
  items: CommandItem[];
}

export interface CommandProps {
  /** Controlled open */
  open: boolean;
  /** Close handler · called on ESC, scrim click, or after select */
  onClose: () => void;
  /** Selection callback · receives the item id */
  onSelect: (id: string) => void;
  /** Flat items OR grouped */
  groups?: CommandGroup[];
  /** Convenience: flat items become a single unlabeled group */
  items?: CommandItem[];
  /** Search input placeholder */
  placeholder?: string;
  /** Caption shown when no results match */
  emptyLabel?: string;
}

/**
 * Command · keyboard-first action palette (Cmd+K style).
 *
 * - Input filters items live (label + keywords)
 * - ↑↓ moves selection · Enter triggers · ESC closes
 * - Closes after select (caller dispatches navigation)
 *
 * @example
 * const [open, setOpen] = useState(false);
 * useKbd('cmd+k', () => setOpen(true));
 * <Command
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onSelect={(id) => navigate(id)}
 *   groups={[
 *     { heading: 'Navegação', items: [{ id: '/aluno', label: 'Aluno · jornada' }] },
 *     { heading: 'Ações',     items: [{ id: 'new-note', label: 'Nova nota', shortcut: 'N' }] },
 *   ]}
 * />
 */
export function Command({
  open,
  onClose,
  onSelect,
  groups,
  items,
  placeholder = 'Buscar comandos, páginas, ações…',
  emptyLabel = 'Nada encontrado.',
}: CommandProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const resolvedGroups = useMemo<CommandGroup[]>(() => {
    if (groups && groups.length) return groups;
    if (items && items.length) return [{ items }];
    return [];
  }, [groups, items]);

  const filtered = useMemo<CommandGroup[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resolvedGroups;
    return resolvedGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => {
          const hay = `${it.label} ${it.hint ?? ''} ${it.keywords ?? ''}`.toLowerCase();
          return hay.includes(q);
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [resolvedGroups, query]);

  const flat = useMemo(() => filtered.flatMap((g) => g.items), [filtered]);

  // reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setHighlight(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // clamp highlight
  useEffect(() => {
    if (highlight >= flat.length) setHighlight(Math.max(0, flat.length - 1));
  }, [flat.length, highlight]);

  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(flat.length - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const it = flat[highlight];
      if (it) {
        onSelect(it.id);
        onClose();
      }
    }
  };

  let runningIndex = -1;

  return (
    <div className="via-cmd-root" role="presentation">
      <div className="via-cmd-scrim" onClick={onClose} aria-hidden="true" />
      <div className="via-cmd" role="dialog" aria-modal="true" aria-label="Paleta de comandos">
        <header className="via-cmd__head">
          <Search size={15} strokeWidth={1.8} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={onInputKey}
            placeholder={placeholder}
            aria-label="Buscar"
            aria-autocomplete="list"
            aria-controls="via-cmd-list"
            aria-activedescendant={flat[highlight] ? `via-cmd-item-${flat[highlight].id}` : undefined}
          />
          <button type="button" onClick={onClose} aria-label="Fechar" className="via-cmd__close">
            <X size={13} strokeWidth={2.2} />
          </button>
        </header>

        <div className="via-cmd__list" id="via-cmd-list" role="listbox">
          {flat.length === 0 ? (
            <p className="via-cmd__empty">{emptyLabel}</p>
          ) : (
            filtered.map((g, gi) => (
              <div key={gi} className="via-cmd__group">
                {g.heading && <span className="via-cmd__heading">{g.heading}</span>}
                <ul>
                  {g.items.map((it) => {
                    runningIndex += 1;
                    const isOn = runningIndex === highlight;
                    const idx = runningIndex;
                    return (
                      <li
                        key={it.id}
                        id={`via-cmd-item-${it.id}`}
                        role="option"
                        aria-selected={isOn}
                        className={isOn ? 'on' : ''}
                        onMouseEnter={() => setHighlight(idx)}
                        onClick={() => {
                          onSelect(it.id);
                          onClose();
                        }}
                      >
                        {it.icon && <span className="via-cmd__icon">{it.icon}</span>}
                        <div className="via-cmd__label">
                          <strong>{it.label}</strong>
                          {it.hint && <em>{it.hint}</em>}
                        </div>
                        {it.shortcut && <kbd className="via-cmd__kbd">{it.shortcut}</kbd>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <footer className="via-cmd__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd><CornerDownLeft size={10} strokeWidth={2.4} /></kbd> abrir</span>
          <span><kbd>esc</kbd> fechar</span>
        </footer>
      </div>
    </div>
  );
}
