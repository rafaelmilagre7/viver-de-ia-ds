import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

type Variant =
  | 'default'      // glass branco padrão
  | 'glass'        // glass white com backdrop-filter
  | 'featured'     // accent strip accent no topo · 1 por section
  | 'atmospheric'  // glass + radial atmosphere
  | 'dark';        // navy mesh dark · hero / CTA

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: 'article' | 'div' | 'section';
  hoverable?: boolean;
  noPadding?: boolean;
  children?: ReactNode;
}

/**
 * Card · superfície editorial com glass + atmosphere
 *
 * @example
 * <Card variant="glass">Conteúdo</Card>
 * <Card variant="featured" hoverable>Plano destacado</Card>
 */
export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = 'default',
      as = 'article',
      hoverable = false,
      noPadding = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const Component = as as 'article';
    const cls = [
      'via-card',
      `via-card--${variant}`,
      hoverable && 'via-card--hoverable',
      noPadding && 'via-card--no-padding',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as never} className={cls} {...rest}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
