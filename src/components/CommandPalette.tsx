import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, X, Clock } from 'lucide-react';
import {
  buildSearchIndex,
  searchIndex,
  pushRecent,
  getRecentEntries,
  type SearchResult,
  type SearchEntry,
} from '../data/searchIndex';
import { usePresence } from '../lib/_shared/motion';
import './command-palette.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Fica montada durante a saída (ESC, clique fora ou escolher um resultado)
  const { mounted, state, closing } = usePresence(open, rootRef);
  // Abrir uma página pela paleta troca de rota com view transition
  const go = (to: string) => {
    pushRecent(to);
    navigate(to, { viewTransition: true });
    onClose();
  };

  const index = useMemo(() => buildSearchIndex(), []);
  const [recents, setRecents] = useState<SearchEntry[]>([]);

  const results: (SearchResult | SearchEntry)[] = useMemo(() => {
    return query.trim() ? searchIndex(index, query) : recents;
  }, [index, query, recents]);

  const isShowingRecents = !query.trim() && recents.length > 0;

  // reset ao abrir — state em render-phase (padrão React), foco fica no effect
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setSelected(0);
      setRecents(getRecentEntries(index));
    }
  }

  // foco no input ao abrir (side-effect de DOM)
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, Math.max(0, results.length - 1)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const r = results[selected];
        if (r) go(r.to);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // go muda de identidade a cada render; o que importa está nas deps abaixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, results, selected, navigate, onClose]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>('li.active');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  if (!mounted) return null;

  // Agrupa resultados por categoria pra display (quando há query)
  const grouped = isShowingRecents
    ? null
    : groupByCategory(results as SearchResult[]);

  let runningIndex = 0;

  return (
    <div
      ref={rootRef}
      className="vds-cmdk"
      data-state={state}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar no design system"
      inert={closing}
      onClick={onClose}
    >
      <div className="vds-cmdk-inner" data-state={state} onClick={(e) => e.stopPropagation()}>
        <header>
          <Search size={16} strokeWidth={2} />
          <input
            ref={inputRef}
            placeholder="Buscar fundamentos, componentes, padrões…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            aria-label="Termo de busca"
            aria-controls="vds-cmdk-list"
            aria-activedescendant={results[selected] ? `vds-cmdk-item-${selected}` : undefined}
          />
          <button className="close" onClick={onClose} aria-label="Fechar (Esc)">
            <X size={12} strokeWidth={2.5} />
          </button>
        </header>

        <ul ref={listRef} id="vds-cmdk-list" role="listbox">
          {results.length === 0 && (
            <li className="empty">Nenhum resultado para "{query}"</li>
          )}

          {isShowingRecents && (
            <li className="vds-cmdk__heading">
              <Clock size={11} strokeWidth={2} />
              <span>recentes</span>
            </li>
          )}

          {grouped
            ? Object.entries(grouped).flatMap(([group, items]) => [
                <li key={`g-${group}`} className="vds-cmdk__heading">
                  <span>{group}</span>
                </li>,
                ...items.map((r) => {
                  const i = runningIndex++;
                  return (
                    <li
                      key={r.to}
                      id={`vds-cmdk-item-${i}`}
                      role="option"
                      aria-selected={i === selected}
                      className={i === selected ? 'active' : ''}
                      onMouseEnter={() => setSelected(i)}
                      onClick={() => go(r.to)}
                    >
                      <div className="vds-cmdk__row">
                        <div className="vds-cmdk__main">
                          <span className="t">{r.label}</span>
                          {r.description && <span className="d">{r.description}</span>}
                        </div>
                        <ArrowUpRight size={12} strokeWidth={2} className="arr" />
                      </div>
                    </li>
                  );
                }),
              ])
            : (results as SearchEntry[]).map((r, i) => (
                <li
                  key={r.to}
                  id={`vds-cmdk-item-${i}`}
                  role="option"
                  aria-selected={i === selected}
                  className={i === selected ? 'active' : ''}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => go(r.to)}
                >
                  <div className="vds-cmdk__row">
                    <span className="kbd">{r.group}</span>
                    <div className="vds-cmdk__main">
                      <span className="t">{r.label}</span>
                      {r.description && <span className="d">{r.description}</span>}
                    </div>
                    <ArrowUpRight size={12} strokeWidth={2} className="arr" />
                  </div>
                </li>
              ))}
        </ul>

        <footer>
          <span className="hint"><kbd>↑↓</kbd> navegar</span>
          <span className="hint"><kbd>↵</kbd> abrir</span>
          <span className="hint"><kbd>esc</kbd> fechar</span>
          <span className="count">
            {query.trim() ? `${results.length} resultado${results.length !== 1 ? 's' : ''}` : `${recents.length} recente${recents.length !== 1 ? 's' : ''}`}
          </span>
        </footer>
      </div>
    </div>
  );
}

function groupByCategory(results: SearchResult[]): Record<string, SearchResult[]> {
  const out: Record<string, SearchResult[]> = {};
  for (const r of results) {
    (out[r.group] = out[r.group] || []).push(r);
  }
  return out;
}
