import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useSpecular } from '../_shared/useSpecular';
import '../_shared/material.css';
import './Card.css';

type Variant =
  | 'default'      // superfície sólida (papel) · não é vidro
  | 'glass'        // vidro · material regular com aro especular
  | 'featured'     // vidro elevado + filete navy no topo · 1 por section
  | 'atmospheric'  // vidro + atmosfera navy nos cantos
  | 'dark';        // navy mesh dark · hero / CTA

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: 'article' | 'div' | 'section';
  hoverable?: boolean;
  noPadding?: boolean;
  children?: ReactNode;
}

/**
 * Card · superfície editorial · `default` sólido, `glass`/`atmospheric`/
 * `featured` no material regular do vidro líquido. `hoverable` ganha o
 * reflexo que segue o ponteiro (só mouse, fora de reduced-motion).
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
    const specRef = useSpecular<HTMLElement>(ref, hoverable);
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
      <Component ref={specRef as never} className={cls} {...rest}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
