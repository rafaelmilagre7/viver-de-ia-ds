import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { navigation } from '../data/nav';
import './command-palette.css';

type Entry = {
  group: string;
  label: string;
  to: string;
};

function flatten(): Entry[] {
  const out: Entry[] = [];
  for (const g of navigation) {
    for (const item of g.items) {
      out.push({ group: g.label, label: item.label, to: item.to });
    }
  }
  return out;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const all = useMemo(() => flatten(), []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return all;
    return all.filter(
      (e) => e.label.toLowerCase().includes(q) || e.group.toLowerCase().includes(q),
    );
  }, [all, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
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
        if (r) {
          navigate(r.to);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, selected, navigate, onClose]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>('li.active');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  if (!open) return null;

  return (
    <div className="vds-cmdk" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="vds-cmdk-inner" onClick={(e) => e.stopPropagation()}>
        <header>
          <Search size={16} strokeWidth={2} />
          <input
            ref={inputRef}
            placeholder="Buscar fundamentos, componentes, padrões…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
          />
          <button className="close" onClick={onClose} aria-label="Fechar (Esc)">
            <X size={12} strokeWidth={2.5} />
          </button>
        </header>
        <ul ref={listRef}>
          {results.length === 0 && (
            <li className="empty">Nenhum resultado para "{query}"</li>
          )}
          {results.map((r, i) => (
            <li
              key={r.to}
              className={i === selected ? 'active' : ''}
              onMouseEnter={() => setSelected(i)}
              onClick={() => { navigate(r.to); onClose(); }}
            >
              <span className="kbd">{r.group}</span>
              <span className="t">{r.label}</span>
              <ArrowUpRight size={12} strokeWidth={2} className="arr" />
            </li>
          ))}
        </ul>
        <footer>
          <span className="hint"><kbd>↑↓</kbd> navegar</span>
          <span className="hint"><kbd>↵</kbd> abrir</span>
          <span className="hint"><kbd>esc</kbd> fechar</span>
          <span className="count">{results.length} de {all.length}</span>
        </footer>
      </div>
    </div>
  );
}
