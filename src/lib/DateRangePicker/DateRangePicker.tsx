import { useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import './DateRangePicker.css';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Mês inicial · default mês atual */
  defaultMonth?: Date;
  min?: Date;
  max?: Date;
  locale?: string;
  /** Atalhos (presets) · default false */
  showPresets?: boolean;
}

/**
 * `<DateRangePicker>` · intervalo de datas (start + end)
 *
 * 2 cliques: primeiro define start, segundo define end. Highlight visual no
 * intervalo. Atalhos opcionais (últimos 7/30/90 dias).
 *
 * @example
 * <DateRangePicker
 *   showPresets
 *   onChange={(r) => filter(r)}
 * />
 */
export function DateRangePicker({
  value: controlledValue,
  onChange,
  defaultMonth,
  min,
  max,
  locale = 'pt-BR',
  showPresets = false,
}: DateRangePickerProps) {
  const [internal, setInternal] = useState<DateRange>({ start: null, end: null });
  const range = controlledValue || internal;

  const setRange = (r: DateRange) => {
    if (controlledValue === undefined) setInternal(r);
    onChange?.(r);
  };

  const handleDayClick = (d: Date) => {
    if (!range.start || (range.start && range.end)) {
      // start new range
      setRange({ start: d, end: null });
    } else {
      // complete range
      if (d < range.start) {
        setRange({ start: d, end: range.start });
      } else {
        setRange({ start: range.start, end: d });
      }
    }
  };

  const applyPreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setRange({ start, end });
  };

  // Compute markers pra mostrar range visual no calendar
  const markers: { date: Date; tone: 'navy' | 'success' | 'coral' }[] = [];
  if (range.start && range.end) {
    const cur = new Date(range.start);
    while (cur <= range.end) {
      markers.push({ date: new Date(cur), tone: 'navy' });
      cur.setDate(cur.getDate() + 1);
    }
  }

  const fmt = (d: Date) => d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="via-drp">
      <header className="via-drp__head">
        <div className="via-drp__field">
          <span className="via-drp__label">Início</span>
          <strong>{range.start ? fmt(range.start) : '—'}</strong>
        </div>
        <span className="via-drp__sep">→</span>
        <div className="via-drp__field">
          <span className="via-drp__label">Fim</span>
          <strong>{range.end ? fmt(range.end) : '—'}</strong>
        </div>
      </header>

      {showPresets && (
        <div className="via-drp__presets">
          <button type="button" onClick={() => applyPreset(7)}>Últimos 7 dias</button>
          <button type="button" onClick={() => applyPreset(30)}>Últimos 30 dias</button>
          <button type="button" onClick={() => applyPreset(90)}>Últimos 90 dias</button>
        </div>
      )}

      <Calendar
        value={range.start && !range.end ? range.start : null}
        onChange={handleDayClick}
        defaultMonth={defaultMonth}
        min={min}
        max={max}
        locale={locale}
        markers={markers}
      />

      {range.start && range.end && (
        <p className="via-drp__summary">
          <strong>{Math.ceil((range.end.getTime() - range.start.getTime()) / 86400000) + 1}</strong>{' '}
          dias selecionados
        </p>
      )}
    </div>
  );
}
