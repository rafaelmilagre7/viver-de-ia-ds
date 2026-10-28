import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Icon.css';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Tone = 'default' | 'soft' | 'navy' | 'accent' | 'coral' | 'inverse';
type Surface = 'none' | 'soft' | 'glass' | 'navy' | 'accent';

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Pass a Lucide icon component as children: <Icon><Compass /></Icon> */
  children: ReactNode;
  size?: Size;
  tone?: Tone;
  /** Adds a chip surface around the icon (glass / navy / accent tile) */
  surface?: Surface;
  label?: string;
}

/**
 * Icon · wrapper consistente pra Lucide icons no DS Viver de IA
 *
 * @example
 * <Icon size="md" tone="navy"><Compass /></Icon>
 * <Icon surface="navy" size="lg"><Award /></Icon>
 * <Icon label="Concluído"><Check /></Icon>   // role="img" + nome acessível
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ children, size = 'md', tone = 'default', surface = 'none', label, className = '', ...rest }, ref) => {
    const cls = [
      'via-icon',
      `via-icon--${size}`,
      `via-icon--tone-${tone}`,
      surface !== 'none' && `via-icon--surface-${surface}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={cls}
        // Com label o ícone é imagem com nome (span sem papel não aceita aria-label);
        // sem label é decorativo e sai da árvore de acessibilidade
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Icon.displayName = 'Icon';
