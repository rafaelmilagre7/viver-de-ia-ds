import { forwardRef, useId, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
}

/**
 * Checkbox · editorial · suporta estado indeterminate
 *
 * @example
 * <Checkbox label="Aceito os termos" />
 * <Checkbox label="Selecionar todos" indeterminate />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate, className = '', id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `via-checkbox-${autoId}`;
  const innerRef = useRef<HTMLInputElement | null>(null);

  // Bridge external ref + internal ref
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const setRefs = (el: HTMLInputElement | null) => {
    innerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };

  return (
    <label
      htmlFor={inputId}
      className={`via-checkbox ${disabled ? 'is-disabled' : ''} ${className}`}
    >
      <input
        ref={setRefs}
        id={inputId}
        type="checkbox"
        className="via-checkbox__input"
        disabled={disabled}
        {...rest}
      />
      <span className="via-checkbox__box" aria-hidden="true">
        {indeterminate ? (
          <Minus className="via-checkbox__icon" size={11} strokeWidth={3} />
        ) : (
          <Check className="via-checkbox__icon" size={11} strokeWidth={3} />
        )}
      </span>
      {(label || description) && (
        <span className="via-checkbox__copy">
          {label && <span className="via-checkbox__label">{label}</span>}
          {description && <span className="via-checkbox__desc">{description}</span>}
        </span>
      )}
    </label>
  );
});
