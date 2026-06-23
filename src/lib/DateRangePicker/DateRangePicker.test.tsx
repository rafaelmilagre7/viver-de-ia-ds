import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRangePicker, type DateRange } from './DateRangePicker';

// Fixed view month so the calendar grid is deterministic across runs.
const JUNE_2024 = new Date(2024, 5, 1);

/**
 * Resolve a day-cell button inside June 2024 by its day number.
 * The cell's accessible name is the full localized date
 * (e.g. "segunda-feira, 10 de junho de 2024"), so we anchor on
 * "<day> de junho de 2024" to avoid matching spillover days from
 * the adjacent months (late May / early July).
 */
function junDay(day: number): HTMLElement {
  const re = new RegExp(`\\b${day} de junho de 2024`, 'i');
  return screen.getByRole('button', { name: re });
}

describe('<DateRangePicker />', () => {
  it('renders the empty start/end fields by default', () => {
    render(<DateRangePicker defaultMonth={JUNE_2024} />);
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Fim')).toBeInTheDocument();
    // both fields show the em-dash placeholder when nothing is picked
    expect(screen.getAllByText('—')).toHaveLength(2);
    // no summary line until a full range exists
    expect(screen.queryByText(/dias selecionados/)).not.toBeInTheDocument();
  });

  it('does not render the presets row by default', () => {
    render(<DateRangePicker defaultMonth={JUNE_2024} />);
    expect(screen.queryByRole('button', { name: 'Últimos 7 dias' })).not.toBeInTheDocument();
  });

  it('renders the presets row when showPresets is set', () => {
    render(<DateRangePicker defaultMonth={JUNE_2024} showPresets />);
    expect(screen.getByRole('button', { name: 'Últimos 7 dias' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Últimos 30 dias' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Últimos 90 dias' })).toBeInTheDocument();
  });

  it('first day click sets the start date and leaves the end empty', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} />);

    await user.click(junDay(10));

    // start field is now filled, end stays as the em-dash placeholder
    expect(screen.getByText(/10 de jun/i)).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.queryByText(/dias selecionados/)).not.toBeInTheDocument();
  });

  it('second click completes the range and shows the day count', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} />);

    await user.click(junDay(10));
    await user.click(junDay(20));

    expect(screen.getByText(/10 de jun/i)).toBeInTheDocument();
    expect(screen.getByText(/20 de jun/i)).toBeInTheDocument();
    // inclusive span: 10..20 = 11 days
    const summary = screen.getByText(/dias selecionados/);
    expect(within(summary).getByText('11')).toBeInTheDocument();
  });

  it('swaps start/end when the second click is before the first', async () => {
    const onChange = vi.fn<(r: DateRange) => void>();
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} onChange={onChange} />);

    await user.click(junDay(20)); // start = 20
    await user.click(junDay(5)); // earlier → becomes start, 20 becomes end

    const last = onChange.mock.calls.at(-1)![0];
    expect(last.start?.getDate()).toBe(5);
    expect(last.end?.getDate()).toBe(20);
  });

  it('a third click after a complete range starts a brand-new range', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} />);

    await user.click(junDay(10));
    await user.click(junDay(20));
    expect(screen.getByText(/dias selecionados/)).toBeInTheDocument();

    // third click resets to a fresh start-only selection
    await user.click(junDay(15));
    expect(screen.getByText(/15 de jun/i)).toBeInTheDocument();
    expect(screen.queryByText(/dias selecionados/)).not.toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('clicking the start day again restarts the selection instead of making a 1-day range', async () => {
    const onChange = vi.fn<(r: DateRange) => void>();
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} onChange={onChange} />);

    await user.click(junDay(10)); // start = 10, end = null
    await user.click(junDay(10)); // same day again → restart, NOT a 1-day range

    // start stays on 10, end remains empty (no "dias selecionados" summary)
    expect(screen.getByText(/10 de jun/i)).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.queryByText(/dias selecionados/)).not.toBeInTheDocument();

    const last = onChange.mock.calls.at(-1)![0];
    expect(last.start?.getDate()).toBe(10);
    expect(last.end).toBeNull();
  });

  it('emits the picked range through onChange', async () => {
    const onChange = vi.fn<(r: DateRange) => void>();
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} onChange={onChange} />);

    await user.click(junDay(10));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ start: expect.any(Date), end: null }),
    );
    expect(onChange.mock.calls.at(-1)![0].start?.getDate()).toBe(10);

    await user.click(junDay(20));
    const completed = onChange.mock.calls.at(-1)![0];
    expect(completed.start?.getDate()).toBe(10);
    expect(completed.end?.getDate()).toBe(20);
  });

  it('controlled mode does not update its own display; it reflects the value prop', async () => {
    const onChange = vi.fn<(r: DateRange) => void>();
    const user = userEvent.setup();
    const controlled: DateRange = { start: new Date(2024, 5, 3), end: null };
    const { rerender } = render(
      <DateRangePicker defaultMonth={JUNE_2024} value={controlled} onChange={onChange} />,
    );

    // the controlled start is shown
    expect(screen.getByText(/03 de jun/i)).toBeInTheDocument();

    // clicking fires onChange but the displayed range stays put (parent owns it)
    await user.click(junDay(20));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByText(/03 de jun/i)).toBeInTheDocument();
    expect(screen.queryByText(/20 de jun/i)).not.toBeInTheDocument();

    // parent commits the new value → display updates
    rerender(
      <DateRangePicker
        defaultMonth={JUNE_2024}
        value={{ start: new Date(2024, 5, 3), end: new Date(2024, 5, 20) }}
        onChange={onChange}
      />,
    );
    expect(screen.getByText(/03 de jun/i)).toBeInTheDocument();
    expect(screen.getByText(/20 de jun/i)).toBeInTheDocument();
    expect(screen.getByText(/dias selecionados/)).toBeInTheDocument();
  });

  it('a preset fills both start and end and renders a day count', async () => {
    const onChange = vi.fn<(r: DateRange) => void>();
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} showPresets onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Últimos 7 dias' }));

    const range = onChange.mock.calls.at(-1)![0];
    expect(range.start).toBeInstanceOf(Date);
    expect(range.end).toBeInstanceOf(Date);
    // ~7 days back → 8 inclusive days summarized
    expect(screen.getByText(/dias selecionados/)).toBeInTheDocument();
  });

  it('renders the calendar navigation controls with accessible labels', () => {
    render(<DateRangePicker defaultMonth={JUNE_2024} />);
    expect(screen.getByRole('button', { name: 'Mês anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo mês' })).toBeInTheDocument();
    expect(screen.getByRole('application', { name: 'Calendário' })).toBeInTheDocument();
  });

  it('navigating months keeps an in-progress start selection intact', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker defaultMonth={JUNE_2024} />);

    await user.click(junDay(10));
    expect(screen.getByText(/10 de jun/i)).toBeInTheDocument();

    // move to July, then back — the chosen start must persist
    await user.click(screen.getByRole('button', { name: 'Próximo mês' }));
    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    expect(screen.getByText(/10 de jun/i)).toBeInTheDocument();
  });
});
