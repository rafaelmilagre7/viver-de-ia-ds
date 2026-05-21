import { useId, type ReactNode } from 'react';
import './RadioGroup.css';

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * RadioGroup · escolha única entre N opções · ARIA radiogroup
 *
 * @example
 * <RadioGroup
 *   ariaLabel="Plano"
 *   options={[
 *     { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês' },
 *     { value: 'anual',  label: 'Anual · 2 meses grátis', description: 'R$ 2.900/ano' },
 *   ]}
 *   defaultValue="anual"
 *   onValueChange={(v) => console.log(v)}
 * />
 */
export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  ariaLabel,
  className = '',
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? `via-radio-${autoId}`;

  // Controlled vs uncontrolled handled via native input checked attribute below.
  // We provide a controlled name + onChange wrapper.

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={`via-radio-group ${className}`}>
      {options.map((opt) => {
        const id = `${groupName}-${opt.value}`;
        const isChecked =
          value !== undefined ? value === opt.value : defaultValue === opt.value;
        const checkedProps =
          value !== undefined
            ? { checked: isChecked, onChange: () => onValueChange?.(opt.value) }
            : {
                defaultChecked: isChecked,
                onChange: () => onValueChange?.(opt.value),
              };

        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={`via-radio ${opt.disabled ? 'is-disabled' : ''}`}
          >
            <input
              id={id}
              type="radio"
              name={groupName}
              value={opt.value}
              disabled={opt.disabled}
              className="via-radio__input"
              {...checkedProps}
            />
            <span className="via-radio__circle" aria-hidden="true">
              <span className="via-radio__dot" />
            </span>
            <span className="via-radio__copy">
              <span className="via-radio__label">{opt.label}</span>
              {opt.description && <span className="via-radio__desc">{opt.description}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}
