import { useState, useMemo, useRef, useEffect, useId } from 'react';
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

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());

/**
 * `<Calendar>` · calendário standalone navegável
 *
 * Diferente do `<DatePicker>` (campo input + popup), este renderiza inline.
 * Use em painéis de agenda, dashboards, eventos. Mês a mês · header pt-BR.
 *
 * Navegação por teclado na grade (roving tabindex): setas movem ±1 dia
 * (horizontal) / ±7 dias (vertical), Home/End vão pro início/fim da semana,
 * PageUp/PageDown trocam de mês, Enter/Espaço selecionam. Dias desabilitados
 * são pulados.
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
  const baseId = useId();
  const today = new Date();
  const [viewMonth, setViewMonth] = useState<Date>(
    defaultMonth || (value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1))
  );

  const isDisabled = (d: Date) => {
    if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
    if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
    return false;
  };

  // Dia ativo do roving tabindex (foco/teclado). Inicializa no selecionado
  // se visível, senão hoje se visível, senão 1º dia habilitado do mês.
  const initialActive = (() => {
    if (value && value.getMonth() === viewMonth.getMonth() && value.getFullYear() === viewMonth.getFullYear() && !isDisabled(value)) {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }
    if (today.getMonth() === viewMonth.getMonth() && today.getFullYear() === viewMonth.getFullYear() && !isDisabled(today)) {
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    const total = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= total; i++) {
      const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i);
      if (!isDisabled(d)) return d;
    }
    return startOfMonth(viewMonth);
  })();
  const [activeDate, setActiveDate] = useState<Date>(initialActive);

  // Pedido de foco pendente: quando navegamos por teclado (incl. troca de mês),
  // marcamos a data alvo e o efeito move o foco depois do commit.
  const pendingFocus = useRef<Date | null>(null);

  const dayId = (d: Date) =>
    `${baseId}-day-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

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

  // Mantém o dia ativo dentro do mês visível. Se a troca de mês veio do
  // teclado, o pedido de foco já carrega o alvo exato; senão, reancora no
  // selecionado/hoje/1º dia do novo mês.
  useEffect(() => {
    const inView =
      activeDate.getMonth() === viewMonth.getMonth() &&
      activeDate.getFullYear() === viewMonth.getFullYear();
    if (inView) return;
    if (pendingFocus.current) return; // navegação por teclado já definirá
    setActiveDate(initialActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMonth]);

  // Move o foco real após o commit quando há pedido pendente (setas + PageUp/Down).
  useEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;
    pendingFocus.current = null;
    const el = document.getElementById(dayId(target));
    el?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate, viewMonth]);

  const goPrev = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const goNext = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  // Resolve um dia alvo, pulando os desabilitados na direção do passo.
  // step é o deslocamento em dias (±1, ±7); para Home/End/Page* já vem o alvo.
  const skipDisabled = (start: Date, step: number): Date => {
    if (step === 0) return start;
    let d = start;
    // limite de segurança: não varre infinito se tudo estiver desabilitado
    for (let i = 0; i < 366; i++) {
      if (!isDisabled(d)) return d;
      d = addDays(d, step > 0 ? 1 : -1);
    }
    return start;
  };

  const moveTo = (target: Date) => {
    const landed = isDisabled(target) ? skipDisabled(target, target >= activeDate ? 1 : -1) : target;
    if (isDisabled(landed)) return; // nada habilitado nessa direção
    pendingFocus.current = landed;
    setActiveDate(landed);
    if (
      landed.getMonth() !== viewMonth.getMonth() ||
      landed.getFullYear() !== viewMonth.getFullYear()
    ) {
      setViewMonth(startOfMonth(landed));
    }
  };

  const handleKey = (e: React.KeyboardEvent, date: Date) => {
    // Enter / Espaço selecionam o dia em foco
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (!isDisabled(date)) onChange?.(date);
      return;
    }

    let target: Date;
    switch (e.key) {
      case 'ArrowLeft':
        target = addDays(date, -1);
        break;
      case 'ArrowRight':
        target = addDays(date, 1);
        break;
      case 'ArrowUp':
        target = addDays(date, -7);
        break;
      case 'ArrowDown':
        target = addDays(date, 7);
        break;
      case 'Home':
        target = addDays(date, -date.getDay()); // início da semana (domingo)
        break;
      case 'End':
        target = addDays(date, 6 - date.getDay()); // fim da semana (sábado)
        break;
      case 'PageUp':
        target = addMonths(date, -1);
        break;
      case 'PageDown':
        target = addMonths(date, 1);
        break;
      default:
        return;
    }
    e.preventDefault();
    moveTo(target);
  };

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
          const isActive = sameDay(date, activeDate);
          const dayMarkers = markers.filter((m) => sameDay(m.date, date));

          return (
            <button
              key={i}
              id={dayId(date)}
              type="button"
              className={[
                'via-cal__cell',
                outOfMonth ? 'is-out' : '',
                isToday ? 'is-today' : '',
                isSelected ? 'is-selected' : '',
                dis ? 'is-disabled' : '',
              ].filter(Boolean).join(' ')}
              disabled={dis}
              tabIndex={dis ? -1 : isActive ? 0 : -1}
              onClick={() => {
                if (dis) return;
                setActiveDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
                onChange?.(date);
              }}
              onKeyDown={(e) => handleKey(e, date)}
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
