import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './Select.css';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  hint?: string;
  ariaLabel?: string;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Select · combobox editorial · keyboard nav · ARIA listbox
 *
 * @example
 * <Select
 *   label="Plano"
 *   placeholder="Selecione um plano"
 *   options={[
 *     { value: 'free',  label: 'Free' },
 *     { value: 'pro',   label: 'Pro · R$ 290/mês' },
 *     { value: 'team',  label: 'Team · R$ 890/mês' },
 *   ]}
 *   onValueChange={(v) => console.log(v)}
 * />
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Selecione…',
  disabled,
  error,
  label,
  hint,
  ariaLabel,
  className = '',
  size = 'md',
}: SelectProps) {
  const autoId = useId();
  const listId = `via-select-list-${autoId}`;
  const labelId = `via-select-label-${autoId}`;
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = value ?? internal;
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((o) => o.value === current);

  const handleSelect = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Click outside fecha
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
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
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={wrapRef} className={`via-select via-select--${size} ${className}`}>
      {label && (
        <label id={labelId} className="via-select__label">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        type="button"
        className={`via-select__trigger ${open ? 'is-open' : ''} ${error ? 'has-error' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`via-select__value ${!selectedOption ? 'is-placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className="via-select__chevron"
          size={14}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {(hint || error) && (
        <span className={`via-select__hint ${error ? 'is-error' : ''}`}>
          {error || hint}
        </span>
      )}

      {open && (
        <ul id={listId} role="listbox" className="via-select__list">
          {options.map((opt) => {
            const isSelected = opt.value === current;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                tabIndex={-1}
                className={`via-select__option ${isSelected ? 'is-selected' : ''} ${opt.disabled ? 'is-disabled' : ''}`}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check className="via-select__check" size={12} strokeWidth={2.4} aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
