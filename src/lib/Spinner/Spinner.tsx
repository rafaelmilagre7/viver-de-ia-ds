import './Spinner.css';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'navy' | 'inverse' | 'soft';

export interface SpinnerProps {
  size?: Size;
  tone?: Tone;
  label?: string;
  className?: string;
}

/**
 * Spinner · loader inline determinístico · ARIA live region
 *
 * @example
 * <Spinner />
 * <Spinner size="lg" tone="inverse" label="Carregando dashboard…" />
 */
export function Spinner({ size = 'md', tone = 'navy', label, className = '' }: SpinnerProps) {
  return (
    <span
      className={`via-spinner via-spinner--${size} via-spinner--${tone} ${className}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className="via-spinner__svg"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle className="via-spinner__track" cx="12" cy="12" r="10" />
        <circle className="via-spinner__head" cx="12" cy="12" r="10" />
      </svg>
      {label && <span className="via-spinner__label">{label}</span>}
      {!label && <span className="via-spinner__sr">Carregando…</span>}
    </span>
  );
}
