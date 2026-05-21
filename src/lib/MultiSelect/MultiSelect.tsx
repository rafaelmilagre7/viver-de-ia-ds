import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import './MultiSelect.css';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  /** Valores selecionados */
  value?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: boolean;
  disabled?: boolean;
  /** Limite máximo · 0 = ilimitado */
  max?: number;
  size?: 'sm' | 'md';
}

/**
 * `<MultiSelect>` · seletor de múltiplos valores com chips
 *
 * Dropdown com checkboxes · valores selecionados aparecem como chips no trigger.
 * Click em chip remove. Suporta limite máximo.
 *
 * @example
 * <MultiSelect
 *   options={skills}
 *   max={5}
 *   onChange={setSkills}
 * />
 */
export function MultiSelect({
  options,
  value: controlledValue,
  onChange,
  label,
  placeholder = 'Selecione…',
  hint,
  error = false,
  disabled = false,
  max = 0,
  size = 'md',
}: MultiSelectProps) {
  const [internal, setInternal] = useState<string[]>([]);
  const values = controlledValue !== undefined ? controlledValue : internal;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setValues = (next: string[]) => {
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  };

  const toggle = (v: string) => {
    if (values.includes(v)) {
      setValues(values.filter((x) => x !== v));
    } else {
      if (max > 0 && values.length >= max) return;
      setValues([...values, v]);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const selectedLabels = values
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as MultiSelectOption[];

  return (
    <div
      ref={ref}
      className={`via-ms via-ms--${size}${error ? ' has-error' : ''}${disabled ? ' is-disabled' : ''}`}
    >
      {label && <label className="via-ms__label">{label}</label>}

      <button
        type="button"
        className={`via-ms__trigger${open ? ' is-open' : ''}`}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="via-ms__chips">
          {selectedLabels.length === 0 && (
            <span className="via-ms__placeholder">{placeholder}</span>
          )}
          {selectedLabels.map((o) => (
            <span key={o.value} className="via-ms__chip">
              <span>{o.label}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(o.value);
                  }}
                  aria-label={`Remover ${o.label}`}
                  className="via-ms__chip-remove"
                >
                  <X size={10} strokeWidth={2.4} />
                </button>
              )}
            </span>
          ))}
        </div>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className="via-ms__chev"
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {open && (
        <ul className="via-ms__list" role="listbox" aria-multiselectable="true">
          {options.map((o) => {
            const selected = values.includes(o.value);
            const canSelect = !max || values.length < max || selected;
            return (
              <li
                key={o.value}
                className={`via-ms__option${selected ? ' is-selected' : ''}${o.disabled || !canSelect ? ' is-disabled' : ''}`}
                onClick={() => !o.disabled && canSelect && toggle(o.value)}
                role="option"
                aria-selected={selected}
              >
                <span className="via-ms__option-check">
                  {selected && <Check size={11} strokeWidth={3} />}
                </span>
                <span>{o.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      {hint && (
        <p className={`via-ms__hint${error ? ' is-error' : ''}`}>
          {hint}
          {max > 0 && (
            <span className="via-ms__count">
              {' '}· {values.length}/{max}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
