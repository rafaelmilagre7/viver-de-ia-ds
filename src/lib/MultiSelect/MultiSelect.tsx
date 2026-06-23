import { useState, useRef, useEffect, useId } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-list`;
  const optionId = (i: number) => `${baseId}-opt-${i}`;

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

  /** Próximo índice selecionável (pulando opções desabilitadas) numa direção. */
  const nextEnabledIndex = (from: number, dir: 1 | -1) => {
    const n = options.length;
    if (n === 0) return -1;
    for (let step = 1; step <= n; step++) {
      const i = (from + dir * step + n * step) % n;
      if (!options[i]?.disabled) return i;
    }
    return -1;
  };

  const firstEnabledIndex = () => nextEnabledIndex(-1, 1);
  const lastEnabledIndex = () => nextEnabledIndex(0, -1);

  const openMenu = () => {
    // ao abrir, destaca a 1ª selecionada ou a 1ª opção habilitada
    const firstSelected = options.findIndex((o) => values.includes(o.value) && !o.disabled);
    setActiveIndex(firstSelected >= 0 ? firstSelected : firstEnabledIndex());
    setOpen(true);
  };

  const closeMenu = (returnFocus = false) => {
    setActiveIndex(-1);
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const toggleMenu = () => (open ? closeMenu() : openMenu());

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  const handleTriggerKey = (e: React.KeyboardEvent) => {
    // Abre o listbox a partir do trigger fechado com setas / Enter / Espaço
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setActiveIndex((i) => nextEnabledIndex(i, 1));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setActiveIndex((i) => nextEnabledIndex(i, -1));
        break;
      }
      case 'Home': {
        e.preventDefault();
        setActiveIndex(firstEnabledIndex());
        break;
      }
      case 'End': {
        e.preventDefault();
        setActiveIndex(lastEnabledIndex());
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const opt = options[activeIndex];
        if (!opt || opt.disabled) break;
        const selected = values.includes(opt.value);
        const canSelect = !max || values.length < max || selected;
        if (canSelect) toggle(opt.value);
        break;
      }
      case 'Escape': {
        e.preventDefault();
        closeMenu(true);
        break;
      }
      default:
        break;
    }
  };

  const selectedLabels = values
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as MultiSelectOption[];

  return (
    <div
      ref={ref}
      className={`via-ms via-ms--${size}${error ? ' has-error' : ''}${disabled ? ' is-disabled' : ''}`}
    >
      {label && <label id={labelId} className="via-ms__label">{label}</label>}

      <button
        ref={triggerRef}
        type="button"
        className={`via-ms__trigger${open ? ' is-open' : ''}`}
        onClick={() => !disabled && toggleMenu()}
        onKeyDown={handleTriggerKey}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        {...(label ? { 'aria-labelledby': labelId } : { 'aria-label': placeholder })}
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
        <ul
          id={listId}
          className="via-ms__list"
          role="listbox"
          aria-multiselectable="true"
          {...(label ? { 'aria-labelledby': labelId } : { 'aria-label': placeholder })}
        >
          {options.map((o, i) => {
            const selected = values.includes(o.value);
            const canSelect = !max || values.length < max || selected;
            const active = i === activeIndex;
            return (
              <li
                key={o.value}
                id={optionId(i)}
                className={`via-ms__option${selected ? ' is-selected' : ''}${active ? ' is-active' : ''}${o.disabled || !canSelect ? ' is-disabled' : ''}`}
                onClick={() => !o.disabled && canSelect && toggle(o.value)}
                onMouseEnter={() => !o.disabled && setActiveIndex(i)}
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
