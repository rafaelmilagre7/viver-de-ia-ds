import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Calendar.css';

export interface CalendarProps {
  /** Data selecionada (controlado) */
  value?: Date | null;
  /** Callback ao selecionar dia */
  onChange?: (date: Date) => void;
  /** Mês inicial (default: hoje) */
  defaultMonth?: Date;
  /** Data mínima selecionável */
  min?: Date;
  /** Data máxima selecionável */
  max?: Date;
  /** Locale (default: pt-BR) */
  locale?: string;
  /** Mostra dias da semana antes */
  showWeekdays?: boolean;
  /** Markers · dots em datas específicas (eventos, deadlines, etc.) */
  markers?: { date: Date; tone?: 'navy' | 'coral' | 'success'; label?: string }[];
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * `<Calendar>` · calendário standalone navegável
 *
 * Diferente do `<DatePicker>` (campo input + popup), este renderiza inline.
 * Use em painéis de agenda, dashboards, eventos. Mês a mês · header pt-BR.
 *
 * @example
 * <Calendar
 *   value={selected}
 *   onChange={setSelected}
 *   markers={[{ date: liveDay, tone: 'coral', label: 'Live ao vivo' }]}
 * />
 */
export function Calendar({
  value,
  onChange,
  defaultMonth,
  min,
  max,
  locale = 'pt-BR',
  showWeekdays = true,
  markers = [],
}: CalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState<Date>(
    defaultMonth || (value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1))
  );

  const { days, weekdayLabels, monthLabel } = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const monthLabel = fmt.format(viewMonth);

    const wdFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const wdRef = new Date(2024, 5, 2); // Sunday
    const weekdayLabels = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(wdRef);
      d.setDate(wdRef.getDate() + i);
      return wdFmt.format(d).replace('.', '').slice(0, 3);
    });

    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const startDay = first.getDay();
    const totalDays = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();

    const cells: Array<{ date: Date | null; outOfMonth: boolean }> = [];
    for (let i = 0; i < startDay; i++) {
      const d = new Date(first);
      d.setDate(d.getDate() - (startDay - i));
      cells.push({ date: d, outOfMonth: true });
    }
    for (let i = 1; i <= totalDays; i++) {
      cells.push({ date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i), outOfMonth: false });
    }
    while (cells.length % 7 !== 0 || cells.length < 42) {
      const last = cells[cells.length - 1]?.date;
      if (!last) break;
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      cells.push({ date: d, outOfMonth: d.getMonth() !== viewMonth.getMonth() });
      if (cells.length >= 42) break;
    }

    return { days: cells, weekdayLabels, monthLabel };
  }, [viewMonth, locale]);

  const isDisabled = (d: Date) => {
    if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
    if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
    return false;
  };

  const goPrev = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const goNext = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  return (
    <div className="via-cal" role="application" aria-label="Calendário">
      <div className="via-cal__head">
        <button
          type="button"
          className="via-cal__nav"
          onClick={goPrev}
          aria-label="Mês anterior"
        >
          <ChevronLeft size={14} strokeWidth={2.2} />
        </button>
        <h4 className="via-cal__month">{monthLabel}</h4>
        <button
          type="button"
          className="via-cal__nav"
          onClick={goNext}
          aria-label="Próximo mês"
        >
          <ChevronRight size={14} strokeWidth={2.2} />
        </button>
      </div>

      {showWeekdays && (
        <div className="via-cal__weekdays" aria-hidden="true">
          {weekdayLabels.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      )}

      <div className="via-cal__grid" role="grid">
        {days.map(({ date, outOfMonth }, i) => {
          if (!date) return <span key={i} className="via-cal__cell-empty" />;
          const isToday = sameDay(date, today);
          const isSelected = value && sameDay(date, value);
          const dis = isDisabled(date);
          const dayMarkers = markers.filter((m) => sameDay(m.date, date));

          return (
            <button
              key={i}
              type="button"
              className={[
                'via-cal__cell',
                outOfMonth ? 'is-out' : '',
                isToday ? 'is-today' : '',
                isSelected ? 'is-selected' : '',
                dis ? 'is-disabled' : '',
              ].filter(Boolean).join(' ')}
              disabled={dis}
              onClick={() => !dis && onChange?.(date)}
              aria-label={date.toLocaleDateString(locale, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              aria-current={isToday ? 'date' : undefined}
              aria-selected={!!isSelected}
            >
              <span className="via-cal__cell-num">{date.getDate()}</span>
              {dayMarkers.length > 0 && (
                <span className="via-cal__cell-markers" aria-hidden="true">
                  {dayMarkers.slice(0, 3).map((m, mi) => (
                    <span
                      key={mi}
                      className={`via-cal__cell-dot via-cal__cell-dot--${m.tone || 'navy'}`}
                      title={m.label}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
