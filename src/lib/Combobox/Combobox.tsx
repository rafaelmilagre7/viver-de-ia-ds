import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import './Combobox.css';

export interface ComboboxOption {
  value: string;
  label: ReactNode;
  /** Texto que vai ser usado pelo filtro de busca · default usa label se for string */
  searchText?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyLabel?: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

/**
 * Combobox · select com search interno · ARIA combobox/listbox
 *
 * @example
 * <Combobox
 *   label="Cidade do evento"
 *   placeholder="Buscar cidade…"
 *   options={[
 *     { value: 'sp',  label: 'São Paulo · SP' },
 *     { value: 'rj',  label: 'Rio de Janeiro · RJ' },
 *     { value: 'poa', label: 'Porto Alegre · RS' },
 *   ]}
 *   onValueChange={(v) => console.log(v)}
 * />
 */
export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Buscar…',
  emptyLabel = 'Nenhum resultado',
  label,
  ariaLabel,
  className = '',
  size = 'md',
  disabled,
}: ComboboxProps) {
  const autoId = useId();
  const listId = `via-combobox-list-${autoId}`;
  const labelId = `via-combobox-label-${autoId}`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = value ?? internal;
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(-1);

  const selectedOption = options.find((o) => o.value === current);

  // Filter
  const filtered = query.trim()
    ? options.filter((o) => {
        const text = o.searchText ?? (typeof o.label === 'string' ? o.label : o.value);
        return text.toLowerCase().includes(query.trim().toLowerCase());
      })
    : options;

  const handleSelect = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
    setQuery('');
  };

  // Navegação por teclado: move o destaque pulando opções desabilitadas
  const moveActive = (dir: 1 | -1) => {
    if (!filtered.length) return;
    setActive((i) => {
      let n = i;
      for (let step = 0; step < filtered.length; step++) {
        n = (n + dir + filtered.length) % filtered.length;
        if (!filtered[n]?.disabled) return n;
      }
      return i;
    });
  };

  // Mantém a opção ativa visível na rolagem
  useEffect(() => {
    if (active < 0 || !listRef.current) return;
    listRef.current.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={wrapRef} className={`via-combobox via-combobox--${size} ${className}`}>
      {label && (
        <label id={labelId} className="via-combobox__label" htmlFor={`${autoId}-input`}>
          {label}
        </label>
      )}
      <div
        className={`via-combobox__trigger ${open ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <Search size={13} strokeWidth={2.2} className="via-combobox__icon" aria-hidden="true" />
        <input
          ref={inputRef}
          id={`${autoId}-input`}
          type="text"
          className="via-combobox__input"
          aria-label={!label ? ariaLabel : undefined}
          aria-labelledby={label ? labelId : undefined}
          placeholder={selectedOption && typeof selectedOption.label === 'string' ? selectedOption.label : placeholder}
          value={open ? query : (selectedOption && typeof selectedOption.label === 'string' ? selectedOption.label : '')}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            if (!open) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); if (open) moveActive(1); else { setOpen(true); setActive(0); } }
            else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
            else if (e.key === 'Enter' && open && active >= 0 && filtered[active] && !filtered[active].disabled) {
              e.preventDefault();
              handleSelect(filtered[active].value);
            }
          }}
          onFocus={() => { if (!disabled) { setOpen(true); setActive(0); } }}
          aria-activedescendant={open && active >= 0 ? `${listId}-opt-${active}` : undefined}
          disabled={disabled}
        />
        <ChevronDown
          className="via-combobox__chevron"
          size={13}
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </div>

      {open && (
        <ul id={listId} ref={listRef} role="listbox" className="via-combobox__list">
          {filtered.length === 0 ? (
            <li className="via-combobox__empty">{emptyLabel}</li>
          ) : (
            filtered.map((opt, idx) => {
              const isSelected = opt.value === current;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-opt-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`via-combobox__option ${isSelected ? 'is-selected' : ''} ${idx === active ? 'is-active' : ''} ${opt.disabled ? 'is-disabled' : ''}`}
                  aria-disabled={opt.disabled}
                  onMouseEnter={() => !opt.disabled && setActive(idx)}
                  onClick={() => !opt.disabled && handleSelect(opt.value)}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <Check size={12} strokeWidth={2.4} aria-hidden="true" className="via-combobox__check" />
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
