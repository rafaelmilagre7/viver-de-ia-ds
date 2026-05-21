import { type ReactNode } from 'react';
import './Progress.css';

type Tone = 'navy' | 'accent' | 'coral';
type Size = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  value: number; // 0-100
  label?: ReactNode;
  showValue?: boolean;
  tone?: Tone;
  size?: Size;
  ariaLabel?: string;
  className?: string;
}

/**
 * Progress · barra editorial · ARIA progressbar
 *
 * @example
 * <Progress value={72} label="Onboarding" showValue />
 * <Progress value={40} tone="accent" size="lg" />
 */
export function Progress({
  value,
  label,
  showValue,
  tone = 'navy',
  size = 'md',
  ariaLabel,
  className = '',
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`via-progress via-progress--${size} via-progress--${tone} ${className}`}>
      {(label || showValue) && (
        <div className="via-progress__head">
          {label && <span className="via-progress__label">{label}</span>}
          {showValue && (
            <span className="via-progress__value" aria-hidden="true">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        className="via-progress__track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      >
        <div
          className="via-progress__fill"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
