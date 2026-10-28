import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'accent';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Button · primary action component for Viver de IA design system
 *
 * `loading` NÃO usa o `disabled` nativo: botão desabilitado perde o foco (quem
 * apertou Enter cai pro <body>). Fica aria-disabled + aria-busy e o clique é
 * engolido (nem onClick nem submit de formulário) até terminar.
 *
 * @example
 * <Button variant="primary" iconRight={<ArrowRight />}>
 *   Continuar
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      loading,
      fullWidth,
      disabled,
      className = '',
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    const cls = [
      'via-btn',
      `via-btn--${variant}`,
      `via-btn--${size}`,
      fullWidth && 'via-btn--full',
      loading && 'via-btn--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={cls}
        disabled={disabled}
        aria-disabled={loading || undefined}
        aria-busy={loading || undefined}
        {...rest}
        onClick={
          loading
            ? (e) => {
                e.preventDefault(); // bloqueia também o submit de formulário
              }
            : onClick
        }
      >
        {iconLeft && <span className="via-btn__icon">{iconLeft}</span>}
        {loading ? <span className="via-btn__spinner" aria-hidden="true" /> : null}
        <span className="via-btn__label">{children}</span>
        {iconRight && <span className="via-btn__icon">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
