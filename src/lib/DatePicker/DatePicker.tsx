import { useEffect, useId, useMemo, useRef, useState } from 'react';
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
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const isoKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

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
  // active day for roving-tabindex keyboard nav · the single cell that is tabbable
  const [activeDay, setActiveDay] = useState<Date>(() => value ?? new Date());
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // sync view quando value muda externamente — ajuste em render-phase
  // (padrão oficial React, evita setState dentro de effect)
  const valueTime = value ? value.getTime() : null;
  const [prevValueTime, setPrevValueTime] = useState(valueTime);
  if (valueTime !== prevValueTime) {
    setPrevValueTime(valueTime);
    if (value) setView(startOfMonth(value));
  }

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

  // first selectable in-month day of the visible month (fallback target)
  const firstSelectable = useMemo(() => {
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(view.getFullYear(), view.getMonth(), i);
      if (!isDisabled(d)) return d;
    }
    return startOfMonth(view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, min, max]);

  // The day that owns the roving tabindex. Derived so it is ALWAYS a real,
  // focusable in-month cell: the user's last navigation if it still fits the
  // visible month and is enabled, else the selected value / today / first
  // selectable day. No setState needed just to keep the active cell valid.
  const inView = (d: Date) =>
    d.getFullYear() === view.getFullYear() && d.getMonth() === view.getMonth();
  let effectiveActive: Date;
  if (activeDay && inView(activeDay) && !isDisabled(activeDay)) effectiveActive = activeDay;
  else if (value && inView(value) && !isDisabled(value)) effectiveActive = value;
  else if (inView(today) && !isDisabled(today)) effectiveActive = today;
  else effectiveActive = firstSelectable;
  const effectiveTime = effectiveActive.getTime();

  // Keep DOM focus on the active cell while the calendar is open: on open, and
  // after any navigation that changes the active day or visible month. Only
  // grabs focus when it already lives inside the popup, so it never yanks focus
  // away unexpectedly.
  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    if (root && !root.contains(document.activeElement)) return;
    const id = `${baseId}-day-${isoKey(new Date(effectiveTime))}`;
    gridRef.current?.querySelector<HTMLButtonElement>(`[id="${id}"]`)?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, effectiveTime]);

  // move the active day, skipping disabled/outside cells, switching month when
  // the target leaves the visible one. Mirrors the native <Calendar> grid nav.
  const moveActive = (from: Date, step: number, dir: 1 | -1) => {
    let candidate = addDays(from, step);
    // skip over disabled days in the travel direction (bounded probe)
    let guard = 0;
    while (isDisabled(candidate) && guard < 366) {
      candidate = addDays(candidate, dir);
      guard++;
    }
    if (isDisabled(candidate)) return; // nothing selectable that way
    setActiveDay(candidate);
    if (
      candidate.getFullYear() !== view.getFullYear() ||
      candidate.getMonth() !== view.getMonth()
    ) {
      setView(startOfMonth(candidate));
    }
  };

  const onGridKeyDown = (e: React.KeyboardEvent) => {
    const k = e.key;
    // operate from the effective active cell (always a valid in-month day)
    const from = effectiveActive;
    if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
      e.preventDefault();
      if (!isDisabled(from)) {
        onChange(from);
        setOpen(false);
      }
      return;
    }
    // arrow keys move by ±1 day (horizontal) or ±7 days (vertical), skipping
    // disabled days in the travel direction and switching month at the edges.
    if (k === 'ArrowRight') { e.preventDefault(); moveActive(from, 1, 1); return; }
    if (k === 'ArrowLeft') { e.preventDefault(); moveActive(from, -1, -1); return; }
    if (k === 'ArrowDown') { e.preventDefault(); moveActive(from, 7, 1); return; }
    if (k === 'ArrowUp') { e.preventDefault(); moveActive(from, -7, -1); return; }
    if (k === 'Home') { e.preventDefault(); moveWithinWeek(from, 'start'); return; }
    if (k === 'End') { e.preventDefault(); moveWithinWeek(from, 'end'); return; }
    if (k === 'PageUp') { e.preventDefault(); landOnMonthDay(addMonthsKeepDay(from, -1)); return; }
    if (k === 'PageDown') { e.preventDefault(); landOnMonthDay(addMonthsKeepDay(from, 1)); return; }
  };

  // Home/End · jump to the first/last in-month day of the active day's week,
  // never crossing into the previous/next month (outside cells are skipped).
  const moveWithinWeek = (from: Date, edge: 'start' | 'end') => {
    const offset = (from.getDay() - weekStartsOn + 7) % 7;
    const weekStart = addDays(from, -offset);
    const weekEnd = addDays(from, 6 - offset);
    const dim = new Date(from.getFullYear(), from.getMonth() + 1, 0).getDate();
    const monthStart = new Date(from.getFullYear(), from.getMonth(), 1);
    const monthEnd = new Date(from.getFullYear(), from.getMonth(), dim);
    // clamp the week edge to the current month, then skip disabled inward
    let candidate =
      edge === 'start'
        ? (weekStart < monthStart ? monthStart : weekStart)
        : (weekEnd > monthEnd ? monthEnd : weekEnd);
    const inward: 1 | -1 = edge === 'start' ? 1 : -1;
    let guard = 0;
    while (
      isDisabled(candidate) &&
      candidate >= weekStart && candidate <= weekEnd &&
      candidate >= monthStart && candidate <= monthEnd &&
      guard < 7
    ) {
      candidate = addDays(candidate, inward);
      guard++;
    }
    if (isDisabled(candidate)) return;
    setActiveDay(candidate);
  };

  // same calendar-day in a sibling month, clamped to that month's length
  const addMonthsKeepDay = (d: Date, n: number) => {
    const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
    const dim = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), dim));
  };

  // land on a target date, nudging forward then backward to skip disabled days
  const landOnMonthDay = (target: Date) => {
    let candidate = target;
    let guard = 0;
    while (isDisabled(candidate) && guard < 31) {
      candidate = addDays(candidate, 1);
      guard++;
    }
    if (isDisabled(candidate)) {
      candidate = target;
      guard = 0;
      while (isDisabled(candidate) && guard < 31) {
        candidate = addDays(candidate, -1);
        guard++;
      }
    }
    if (isDisabled(candidate)) return;
    setActiveDay(candidate);
    setView(startOfMonth(candidate));
  };

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

          <div className="via-dp__grid" role="grid" ref={gridRef} onKeyDown={onGridKeyDown}>
            {cells.map((c, i) => {
              const sel = value && sameDay(c.date, value);
              const isToday = sameDay(c.date, today);
              const dis = isDisabled(c.date);
              // roving tabindex · only the active, in-month, enabled cell is tabbable
              const isActive = !c.outside && !dis && sameDay(c.date, effectiveActive);
              return (
                <button
                  key={i}
                  id={`${baseId}-day-${isoKey(c.date)}`}
                  type="button"
                  role="gridcell"
                  aria-selected={!!sel}
                  aria-current={isToday ? 'date' : undefined}
                  disabled={dis}
                  tabIndex={isActive ? 0 : -1}
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
