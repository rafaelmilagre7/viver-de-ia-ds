import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.css';

type Variant = 'default' | 'error' | 'success';
type Size = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Input · editorial field com optional label, hint, icons
 *
 * @example
 * <Input label="Email" iconLeft={<Mail />} placeholder="seu@email" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      iconLeft,
      iconRight,
      label,
      hint,
      error,
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || `via-input-${Math.random().toString(36).slice(2, 9)}`;
    const computedVariant = error ? 'error' : variant;

    const cls = [
      'via-input',
      `via-input--${computedVariant}`,
      `via-input--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="via-input-wrap">
        {label && (
          <label htmlFor={inputId} className="via-input__label">
            {label}
          </label>
        )}
        <div className={cls}>
          {iconLeft && <span className="via-input__icon">{iconLeft}</span>}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error || hint ? `${inputId}-msg` : undefined}
            {...rest}
          />
          {iconRight && <span className="via-input__icon">{iconRight}</span>}
        </div>
        {(error || hint) && (
          <p
            id={`${inputId}-msg`}
            className={`via-input__msg ${error ? 'via-input__msg--error' : ''}`}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
