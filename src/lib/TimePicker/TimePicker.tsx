import { useState, useRef, type ChangeEvent } from 'react';
import { Clock } from 'lucide-react';
import './TimePicker.css';

export interface TimePickerProps {
  /** Valor controlado · formato "HH:MM" (24h) */
  value?: string;
  /** Callback ao mudar */
  onChange?: (value: string) => void;
  /** Label */
  label?: string;
  /** Hint abaixo */
  hint?: string;
  /** Step em minutos · default 15 */
  step?: 5 | 10 | 15 | 30 | 60;
  /** Min · "HH:MM" */
  min?: string;
  /** Max · "HH:MM" */
  max?: string;
  /** Erro */
  error?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Variant */
  size?: 'sm' | 'md';
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * `<TimePicker>` · seletor de horário (HH:MM 24h) editorial
 *
 * Campo separado com 2 inputs (hora · minuto) navegáveis. Validação de range.
 *
 * @example
 * <TimePicker label="Horário da live" step={30} onChange={setTime} />
 */
export function TimePicker({
  value: controlledValue,
  onChange,
  label,
  hint,
  step = 15,
  min,
  max,
  error = false,
  disabled = false,
  size = 'md',
}: TimePickerProps) {
  const [internal, setInternal] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internal;
  const hRef = useRef<HTMLInputElement>(null);
  const mRef = useRef<HTMLInputElement>(null);

  const [h, m] = (value || ':').split(':');

  const setTime = (hh: string, mm: string) => {
    const hNum = Math.max(0, Math.min(23, parseInt(hh || '0', 10) || 0));
    const mNum = Math.max(0, Math.min(59, parseInt(mm || '0', 10) || 0));
    const next = `${pad(hNum)}:${pad(mNum)}`;
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleH = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (raw.length === 2) mRef.current?.focus();
    setTime(raw, m || '00');
  };

  const handleM = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setTime(h || '00', raw);
  };

  const handleStep = (delta: number) => {
    if (disabled) return;
    let hNum = parseInt(h || '0', 10) || 0;
    let mNum = parseInt(m || '0', 10) || 0;
    mNum += delta * step;
    while (mNum < 0) { mNum += 60; hNum = (hNum - 1 + 24) % 24; }
    while (mNum >= 60) { mNum -= 60; hNum = (hNum + 1) % 24; }
    const next = `${pad(hNum)}:${pad(mNum)}`;
    if (min && next < min) return;
    if (max && next > max) return;
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={`via-tp via-tp--${size}${error ? ' has-error' : ''}${disabled ? ' is-disabled' : ''}`}>
      {label && <label className="via-tp__label">{label}</label>}
      <div className="via-tp__field">
        <Clock size={14} strokeWidth={1.8} className="via-tp__icon" />
        <input
          ref={hRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          placeholder="HH"
          value={h || ''}
          onChange={handleH}
          disabled={disabled}
          className="via-tp__cell"
          aria-label="Hora"
        />
        <span className="via-tp__sep">:</span>
        <input
          ref={mRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          placeholder="MM"
          value={m || ''}
          onChange={handleM}
          disabled={disabled}
          className="via-tp__cell"
          aria-label="Minuto"
        />
        <div className="via-tp__steps" aria-hidden="true">
          <button type="button" onClick={() => handleStep(1)} disabled={disabled}>▲</button>
          <button type="button" onClick={() => handleStep(-1)} disabled={disabled}>▼</button>
        </div>
      </div>
      {hint && <p className={`via-tp__hint${error ? ' is-error' : ''}`}>{hint}</p>}
    </div>
  );
}
