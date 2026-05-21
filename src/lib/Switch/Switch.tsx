import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import './Switch.css';

type Size = 'sm' | 'md';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  size?: Size;
}

/**
 * Switch · toggle on/off · editorial · ARIA role="switch"
 *
 * @example
 * <Switch label="Notificações por email" defaultChecked />
 * <Switch label="Modo escuro" checked={isDark} onChange={(e) => setDark(e.target.checked)} />
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, size = 'md', className = '', id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `via-switch-${autoId}`;

  return (
    <label
      htmlFor={inputId}
      className={`via-switch via-switch--${size} ${disabled ? 'is-disabled' : ''} ${className}`}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        className="via-switch__input"
        disabled={disabled}
        {...rest}
      />
      <span className="via-switch__track" aria-hidden="true">
        <span className="via-switch__thumb" />
      </span>
      {(label || description) && (
        <span className="via-switch__copy">
          {label && <span className="via-switch__label">{label}</span>}
          {description && <span className="via-switch__desc">{description}</span>}
        </span>
      )}
    </label>
  );
});
