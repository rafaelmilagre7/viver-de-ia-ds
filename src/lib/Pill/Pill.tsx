import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Pill.css';

type Variant =
  | 'default'   // navy soft · estado neutro
  | 'attn'      // accent soft · atenção / warning (semântico)
  | 'churn'     // coral soft · destrutivo / churn (semântico)
  | 'success'   // navy + check (sem semáforo)
  | 'live';     // broadcast ao vivo · dot pulse coral + italic display

type Size = 'sm' | 'md';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
}

/**
 * Pill · canônica do Viver de IA · 11px lowercase nowrap, sem dot decorativo
 *
 * @example
 * <Pill variant="default">em produção</Pill>
 * <Pill variant="attn">requer atenção</Pill>
 * <Pill variant="live">ao vivo</Pill>
 */
export const Pill = forwardRef<HTMLSpanElement, PillProps>(
  ({ variant = 'default', size = 'md', iconLeft, className = '', children, ...rest }, ref) => {
    const cls = [
      'via-pill',
      `via-pill--${variant}`,
      `via-pill--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (variant === 'live') {
      return (
        <span ref={ref} className={cls} {...rest}>
          <span className="via-pill__live-dot" aria-hidden="true" />
          <em>{children}</em>
        </span>
      );
    }

    return (
      <span ref={ref} className={cls} {...rest}>
        {iconLeft && <span className="via-pill__icon">{iconLeft}</span>}
        {children}
      </span>
    );
  }
);

Pill.displayName = 'Pill';
