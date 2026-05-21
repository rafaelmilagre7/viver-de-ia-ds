import { type CSSProperties } from 'react';
import './Skeleton.css';

type Variant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: Variant;
  width?: number | string;
  height?: number | string;
  lines?: number; // só pra variant="text"
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Skeleton · placeholder de carga com shimmer editorial
 *
 * @example
 * <Skeleton variant="text" lines={3} />
 * <Skeleton variant="circle" width={48} height={48} />
 * <Skeleton variant="rect" width="100%" height={200} />
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  ariaLabel = 'Carregando',
  className = '',
  style,
}: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <span
        className={`via-skeleton-group ${className}`}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className="via-skeleton via-skeleton--text"
            style={{
              width: i === lines - 1 ? '70%' : '100%',
            }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      className={`via-skeleton via-skeleton--${variant} ${className}`}
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
      style={{
        width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        ...style,
      }}
    />
  );
}
