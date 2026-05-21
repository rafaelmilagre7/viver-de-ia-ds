import { useId, type ChangeEvent, type ReactNode } from 'react';
import './Slider.css';

type Tone = 'navy' | 'accent' | 'coral';
type Size = 'sm' | 'md' | 'lg';

export interface SliderProps {
  /** Controlled value (clamped to [min, max]) */
  value: number;
  /** Value change callback · fires on every drag step */
  onChange: (value: number) => void;
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Step granularity (default 1) */
  step?: number;
  /** Visible label */
  label?: ReactNode;
  /** Hint shown below the track */
  hint?: ReactNode;
  /** Show the current value at the end of the track (default true) */
  showValue?: boolean;
  /** Format the value tag (default `n => String(n)`) */
  formatValue?: (n: number) => string;
  /** Visual tone (default 'navy') */
  tone?: Tone;
  /** Track / thumb size (default 'md') */
  size?: Size;
  /** Disable interaction */
  disabled?: boolean;
  /** Accessible label when no visible label */
  ariaLabel?: string;
  /** Marks rendered along the track */
  marks?: Array<{ value: number; label?: string }>;
  /** Optional name for form serialization */
  name?: string;
  /** Optional id (auto if omitted) */
  id?: string;
}

/**
 * Slider · single-thumb range input · editorial.
 *
 * Wraps a native `<input type="range">` to keep keyboard/screen reader
 * behavior for free, then themes it with CSS variables.
 *
 * @example
 * const [vol, setVol] = useState(40);
 * <Slider value={vol} onChange={setVol} label="Volume da live" formatValue={n => `${n}%`} />
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  hint,
  showValue = true,
  formatValue = (n) => String(n),
  tone = 'navy',
  size = 'md',
  disabled = false,
  ariaLabel,
  marks,
  name,
  id,
}: SliderProps) {
  const autoId = useId();
  const fieldId = id ?? `via-sl-${autoId}`;
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value));

  return (
    <div className={`via-slider via-slider--${tone} via-slider--${size} ${disabled ? 'is-disabled' : ''}`}>
      {label && (
        <header className="via-slider__head">
          <label htmlFor={fieldId}>{label}</label>
          {showValue && <strong className="via-slider__val mono">{formatValue(value)}</strong>}
        </header>
      )}
      <div className="via-slider__track-wrap" style={{ ['--via-sl-pct' as any]: `${pct}%` }}>
        <div className="via-slider__track" aria-hidden="true">
          <div className="via-slider__fill" />
        </div>
        {marks && marks.length > 0 && (
          <div className="via-slider__marks" aria-hidden="true">
            {marks.map((m) => {
              const mp = ((m.value - min) / (max - min)) * 100;
              return (
                <span key={m.value} className="via-slider__mark" style={{ left: `${mp}%` }}>
                  <span className="dot" />
                  {m.label && <em>{m.label}</em>}
                </span>
              );
            })}
          </div>
        )}
        <input
          id={fieldId}
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handle}
          disabled={disabled}
          aria-label={!label ? ariaLabel : undefined}
          aria-valuetext={formatValue(value)}
        />
      </div>
      {hint && <p className="via-slider__hint">{hint}</p>}
    </div>
  );
}
