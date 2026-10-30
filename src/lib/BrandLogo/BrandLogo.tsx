import type { CSSProperties } from 'react';
import { LOGO_W, LOGO_H, MONO_W, MONO_D, WORD_D } from './paths';
import './BrandLogo.css';

type Variant = 'black' | 'white' | 'auto';
type Size = 'sm' | 'md' | 'lg';

export interface BrandLogoProps {
  /** Cor · `black` = tinta oficial do logo (fundo claro) · `white` = fundo escuro · `auto` troca com o tema */
  variant?: Variant;
  /** Altura · sm/md/lg (lockup 28/36/48px · monograma 20/28/40px) ou px */
  size?: Size | number;
  /** Só o monograma VIA · favicon, avatar, canto de slide · nunca o wordmark sozinho */
  monoOnly?: boolean;
  className?: string;
  style?: CSSProperties;
}

const LOCKUP_H: Record<Size, number> = { sm: 28, md: 36, lg: 48 };
const MONO_H: Record<Size, number> = { sm: 20, md: 28, lg: 40 };

/**
 * BrandLogo · logo oficial em vetor (nítido em qualquer tamanho)
 *
 * Lockup = monograma VIA + wordmark "VIVER DE IA" nas proporções do livro de marca.
 *
 * @example
 * <BrandLogo />
 * <BrandLogo variant="white" size="lg" />
 * <BrandLogo monoOnly size={24} />
 */
export function BrandLogo({ variant = 'black', size = 'md', monoOnly = false, className = '', style }: BrandLogoProps) {
  const height = typeof size === 'number' ? size : monoOnly ? MONO_H[size] : LOCKUP_H[size];
  const w = monoOnly ? MONO_W : LOGO_W;
  return (
    <svg
      className={`via-brand-logo via-brand-logo--${variant} ${className}`}
      viewBox={`0 0 ${w} ${LOGO_H}`}
      width={Math.round((height * w) / LOGO_H)}
      height={height}
      fill="currentColor"
      role="img"
      aria-label="Viver de IA"
      style={style}
    >
      <path d={MONO_D} />
      {!monoOnly && <path d={WORD_D} />}
    </svg>
  );
}
