import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useDismiss, useEscapeLayer } from '../_shared/overlay';
import { Anchored } from '../_shared/Portal';
import '../_shared/material.css';
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
 * Padrão "select-only combobox" (WAI-ARIA): o trigger é role=combobox, o foco
 * fica nele e a opção ativa vem por aria-activedescendant. Nome acessível =
 * rótulo + valor atual. A lista abre num portal ancorado (nunca cortada por
 * card/modal), fecha em ESC (só ela, não o modal), clique fora ou foco fora.
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
  const triggerId = `via-select-trigger-${autoId}`;
  const valueId = `via-select-value-${autoId}`;
  const hintId = `via-select-hint-${autoId}`;
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = value ?? internal;
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(-1);

  const selectedOption = options.find((o) => o.value === current);

  const handleSelect = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const firstEnabled = (dir: 1 | -1) => {
    const start = dir === 1 ? 0 : options.length - 1;
    for (let i = start; i >= 0 && i < options.length; i += dir) {
      if (!options[i]?.disabled) return i;
    }
    return -1;
  };

  // Abre o listbox e destaca a opção selecionada (ou a primeira habilitada)
  const openList = () => {
    const selectedIdx = options.findIndex((o) => o.value === current && !o.disabled);
    setActive(selectedIdx >= 0 ? selectedIdx : firstEnabled(1));
    setOpen(true);
  };

  // Move o destaque pulando opções desabilitadas
  const moveActive = (dir: 1 | -1) => {
    if (!options.length) return;
    setActive((i) => {
      let n = i < 0 ? (dir === 1 ? -1 : 0) : i;
      for (let step = 0; step < options.length; step++) {
        n = (n + dir + options.length) % options.length;
        if (!options[n]?.disabled) return n;
      }
      return i;
    });
  };

  // Navegação por teclado no controle (padrão WAI-ARIA listbox)
  const handleKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (open) moveActive(1);
        else openList();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (open) moveActive(-1);
        else openList();
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActive(firstEnabled(1));
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActive(firstEnabled(-1));
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open) {
          if (active >= 0 && options[active] && !options[active].disabled) {
            handleSelect(options[active].value);
          }
        } else {
          openList();
        }
        break;
      // Escape é tratado pelo listener global abaixo (fecha + devolve foco ao trigger)
      default:
        break;
    }
  };

  // Mantém a opção ativa visível na rolagem
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    listRef.current.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  // Clique fora ou foco fora (Tab pra outro campo) fecha — sem puxar o foco de volta
  useDismiss(open, [wrapRef, listRef], () => setOpen(false));

  // ESC fecha só a lista (camada do topo) e devolve o foco ao trigger
  const layer = useEscapeLayer(open, () => {
    setOpen(false);
    triggerRef.current?.focus();
  });

  return (
    <div ref={wrapRef} className={`via-select via-select--${size} ${className}`}>
      {label && (
        <label id={labelId} className="via-select__label">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        className={`via-select__trigger ${open ? 'is-open' : ''} ${error ? 'has-error' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        // Nome = rótulo + valor atual ("Plano Pro"); sem label visível, o
        // aria-label do próprio trigger entra no lugar do rótulo
        aria-labelledby={
          label ? `${labelId} ${valueId}` : ariaLabel ? `${triggerId} ${valueId}` : undefined
        }
        aria-label={!label ? ariaLabel : undefined}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-opt-${active}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? hintId : undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKey}
      >
        <span id={valueId} className={`via-select__value ${!selectedOption ? 'is-placeholder' : ''}`}>
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
        <span id={hintId} className={`via-select__hint ${error ? 'is-error' : ''}`}>
          {error || hint}
        </span>
      )}

      {open && (
        <Anchored anchorRef={wrapRef} z="dropdown" layer={layer}>
          <ul
            id={listId}
            ref={listRef}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            aria-label={!label ? ariaLabel ?? placeholder : undefined}
            className="via-select__list"
            // Clique numa opção não tira o foco do trigger (activedescendant)
            onMouseDown={(e) => e.preventDefault()}
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === current;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-opt-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  tabIndex={-1}
                  className={`via-select__option ${isSelected ? 'is-selected' : ''} ${idx === active ? 'is-active' : ''} ${opt.disabled ? 'is-disabled' : ''}`}
                  onMouseEnter={() => !opt.disabled && setActive(idx)}
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
        </Anchored>
      )}
    </div>
  );
}
