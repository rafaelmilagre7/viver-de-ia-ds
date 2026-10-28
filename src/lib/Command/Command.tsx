import { useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Search, X, CornerDownLeft } from 'lucide-react';
import { useDialogFocus } from '../_shared/useDialogFocus';
import { useEscapeLayer, useScrollLock } from '../_shared/overlay';
import { Portal } from '../_shared/Portal';
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const itemId = (id: string) => `${baseId}-item-${id}`;
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

  // reset on open — state em render-phase (padrão React), foco fica no effect
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setHighlight(0);
    }
  }

  // Foco: input ao abrir (1º focável), Tab preso no diálogo, devolve ao fechar
  const { onKeyDown: trapKeyDown } = useDialogFocus(open, dialogRef);

  // clamp highlight quando a lista filtrada encolhe — ajuste em render-phase.
  // Guarda flat.length > 0: com a lista vazia, highlight=0 e "0 >= 0" disparava
  // setHighlight(0) em loop infinito ("Too many re-renders") em vez de mostrar o emptyLabel.
  if (flat.length > 0 && highlight > flat.length - 1) {
    setHighlight(flat.length - 1);
  }

  // ESC fecha (só se for a camada do topo) + trava o scroll da página
  const layer = useEscapeLayer(open, () => onClose());
  useScrollLock(open);

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
    <Portal layer={layer}>
      <div className="via-cmd-root" role="presentation">
        <div className="via-cmd-scrim" onClick={onClose} aria-hidden="true" />
        <div
          ref={dialogRef}
          className="via-cmd"
          role="dialog"
          aria-modal="true"
          aria-label="Paleta de comandos"
          tabIndex={-1}
          onKeyDown={trapKeyDown}
        >
          <header className="via-cmd__head">
            <Search size={15} strokeWidth={1.8} aria-hidden="true" />
            <input
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
              aria-controls={listId}
              aria-activedescendant={flat[highlight] ? itemId(flat[highlight].id) : undefined}
            />
            <button type="button" onClick={onClose} aria-label="Fechar" className="via-cmd__close">
              <X size={13} strokeWidth={2.2} />
            </button>
          </header>

          {/* Vazio: a mensagem fica fora de role=listbox (listbox só aceita option/group) */}
          <div
            className="via-cmd__list"
            id={listId}
            role={flat.length === 0 ? undefined : 'listbox'}
            aria-label={flat.length === 0 ? undefined : 'Resultados'}
          >
            {flat.length === 0 ? (
              <p className="via-cmd__empty">{emptyLabel}</p>
            ) : (
              filtered.map((g, gi) => (
                <div
                  key={gi}
                  className="via-cmd__group"
                  role="group"
                  aria-labelledby={g.heading ? `${baseId}-group-${gi}` : undefined}
                >
                  {g.heading && (
                    <span className="via-cmd__heading" id={`${baseId}-group-${gi}`}>
                      {g.heading}
                    </span>
                  )}
                  <ul role="none">
                    {g.items.map((it) => {
                      runningIndex += 1;
                      const isOn = runningIndex === highlight;
                      const idx = runningIndex;
                      return (
                        <li
                          key={it.id}
                          id={itemId(it.id)}
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
    </Portal>
  );
}
