import { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar as CalIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import './DatePicker.css';

export interface DatePickerProps {
  /** Selected date (controlled) · null when empty */
  value: Date | null;
  /** Selection callback · null when cleared */
  onChange: (d: Date | null) => void;
  /** Minimum allowed date (inclusive) */
  min?: Date;
  /** Maximum allowed date (inclusive) */
  max?: Date;
  /** Placeholder when empty */
  placeholder?: string;
  /** Accessible label */
  label?: string;
  /** Visually-hidden text describing the field */
  ariaLabel?: string;
  /** Disable the field */
  disabled?: boolean;
  /** First day of week · 0 = Sunday, 1 = Monday (default 1) */
  weekStartsOn?: 0 | 1;
  /** Format used to display the selected value (default ISO short pt-BR) */
  formatLabel?: (d: Date) => string;
}

const PT_MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];
const PT_DOW_MON = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
const PT_DOW_SUN = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);

const defaultFormat = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

/**
 * DatePicker · single date selection · editorial month grid.
 *
 * @example
 * const [date, setDate] = useState<Date | null>(null);
 * <DatePicker value={date} onChange={setDate} label="Data da live" />
 */
export function DatePicker({
  value,
  onChange,
  min,
  max,
  placeholder = 'Selecione uma data',
  label,
  ariaLabel,
  disabled = false,
  weekStartsOn = 1,
  formatLabel = defaultFormat,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => startOfMonth(value ?? new Date()));
  const rootRef = useRef<HTMLDivElement>(null);

  // sync view when value changes externally
  useEffect(() => {
    if (value) setView(startOfMonth(value));
  }, [value]);

  // close on outside click + ESC
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const cells = useMemo(() => {
    const first = startOfMonth(view);
    const firstDow = (first.getDay() - weekStartsOn + 7) % 7;
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const arr: Array<{ date: Date; outside: boolean }> = [];

    // leading blanks from previous month
    for (let i = firstDow - 1; i >= 0; i--) {
      const d = new Date(view.getFullYear(), view.getMonth(), -i);
      arr.push({ date: d, outside: true });
    }
    // current month
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push({ date: new Date(view.getFullYear(), view.getMonth(), i), outside: false });
    }
    // trailing to complete 6 rows × 7 cols = 42
    while (arr.length < 42) {
      const last = arr[arr.length - 1].date;
      arr.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), outside: true });
    }
    return arr;
  }, [view, weekStartsOn]);

  const isDisabled = (d: Date) => {
    if (min && d < startOfMonth(min) && d.getMonth() !== min.getMonth()) {
      const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
      if (d < minDay) return true;
    }
    if (min) {
      const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
      if (d < minDay) return true;
    }
    if (max) {
      const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
      if (d > maxDay) return true;
    }
    return false;
  };

  const today = new Date();
  const dow = weekStartsOn === 1 ? PT_DOW_MON : PT_DOW_SUN;

  return (
    <div ref={rootRef} className="via-dp">
      {label && <label className="via-dp__label">{label}</label>}
      <button
        type="button"
        className={`via-dp__input ${value ? 'has-value' : ''}`}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-label={ariaLabel ?? label ?? 'Selecionar data'}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <CalIcon size={14} strokeWidth={1.8} aria-hidden="true" />
        <span>{value ? formatLabel(value) : placeholder}</span>
      </button>

      {open && (
        <div className="via-dp__pop" role="dialog" aria-label="Calendário">
          <header className="via-dp__head">
            <button
              type="button"
              onClick={() => setView((v) => addMonths(v, -1))}
              aria-label="Mês anterior"
              className="via-dp__nav"
            >
              <ChevronLeft size={14} strokeWidth={2.2} />
            </button>
            <strong>
              {PT_MONTHS[view.getMonth()]} <span className="mono">{view.getFullYear()}</span>
            </strong>
            <button
              type="button"
              onClick={() => setView((v) => addMonths(v, 1))}
              aria-label="Mês seguinte"
              className="via-dp__nav"
            >
              <ChevronRight size={14} strokeWidth={2.2} />
            </button>
          </header>

          <div className="via-dp__dow" role="row">
            {dow.map((d) => (
              <span key={d} role="columnheader">{d}</span>
            ))}
          </div>

          <div className="via-dp__grid" role="grid">
            {cells.map((c, i) => {
              const sel = value && sameDay(c.date, value);
              const isToday = sameDay(c.date, today);
              const dis = isDisabled(c.date);
              return (
                <button
                  key={i}
                  type="button"
                  role="gridcell"
                  aria-selected={!!sel}
                  aria-current={isToday ? 'date' : undefined}
                  disabled={dis}
                  className={[
                    'via-dp__cell',
                    c.outside && 'outside',
                    sel && 'sel',
                    isToday && 'today',
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    onChange(c.date);
                    setOpen(false);
                  }}
                >
                  {c.date.getDate()}
                </button>
              );
            })}
          </div>

          <footer className="via-dp__foot">
            <button type="button" className="via-dp__ghost" onClick={() => { onChange(null); setOpen(false); }}>
              Limpar
            </button>
            <button type="button" className="via-dp__ghost" onClick={() => { onChange(today); setView(startOfMonth(today)); setOpen(false); }}>
              Hoje
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
