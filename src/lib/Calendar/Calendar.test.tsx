import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';

// A fixed reference month so tests are deterministic regardless of "today".
// June 2024: June 1st is a Saturday, June has 30 days.
const JUNE_2024 = new Date(2024, 5, 1);

describe('<Calendar />', () => {
  it('renders the application landmark, the pinned month header and nav buttons', () => {
    render(<Calendar defaultMonth={JUNE_2024} />);

    expect(screen.getByRole('application', { name: 'Calendário' })).toBeInTheDocument();
    // pt-BR long month + year heading
    expect(screen.getByRole('heading', { name: /junho de 2024/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mês anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo mês' })).toBeInTheDocument();
  });

  it('renders a grid containing every day of the month as a button', () => {
    render(<Calendar defaultMonth={JUNE_2024} />);

    const grid = screen.getByRole('grid');
    // June has 30 in-month days; day "1" and "30" must be present and reachable.
    // The day number always follows "<weekday>, " — anchoring on ", N de" avoids
    // colliding with "21" / "31" (substring) and with out-of-month spill cells.
    expect(within(grid).getByRole('button', { name: /, 1 de junho de 2024/i })).toBeInTheDocument();
    expect(within(grid).getByRole('button', { name: /, 30 de junho de 2024/i })).toBeInTheDocument();
  });

  it('clicking a day fires onChange with that exact date', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /^sábado, 15 de junho de 2024/i }));

    expect(onChange).toHaveBeenCalledOnce();
    const picked = onChange.mock.calls[0][0] as Date;
    expect(picked.getFullYear()).toBe(2024);
    expect(picked.getMonth()).toBe(5);
    expect(picked.getDate()).toBe(15);
  });

  it('the controlled value marks the matching day with aria-selected', () => {
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 10)} />);

    const selected = screen.getByRole('button', { name: /, 10 de junho de 2024/i });
    expect(selected).toHaveAttribute('aria-selected', 'true');

    const other = screen.getByRole('button', { name: /, 11 de junho de 2024/i });
    expect(other).toHaveAttribute('aria-selected', 'false');
  });

  it('navigates to the previous and next month via the nav buttons', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} />);

    await user.click(screen.getByRole('button', { name: 'Próximo mês' }));
    expect(screen.getByRole('heading', { name: /julho de 2024/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    expect(screen.getByRole('heading', { name: /maio de 2024/i })).toBeInTheDocument();
  });

  it('does not call onChange for an out-of-range (disabled) day', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Calendar
        defaultMonth={JUNE_2024}
        min={new Date(2024, 5, 10)}
        max={new Date(2024, 5, 20)}
        onChange={onChange}
      />,
    );

    // Day 5 is before min → disabled.
    const dayBefore = screen.getByRole('button', { name: /, 5 de junho de 2024/i });
    expect(dayBefore).toBeDisabled();
    await user.click(dayBefore);
    expect(onChange).not.toHaveBeenCalled();

    // Day 25 is after max → disabled.
    expect(screen.getByRole('button', { name: /, 25 de junho de 2024/i })).toBeDisabled();

    // A day inside the window is enabled and fires onChange.
    await user.click(screen.getByRole('button', { name: /, 15 de junho de 2024/i }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('marks today with aria-current="date"', () => {
    const today = new Date();
    const month = new Date(today.getFullYear(), today.getMonth(), 1);
    render(<Calendar defaultMonth={month} />);

    const fullLabel = today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const todayCell = screen.getByRole('button', { name: fullLabel });
    expect(todayCell).toHaveAttribute('aria-current', 'date');
  });

  it('hides the weekday header when showWeekdays is false', () => {
    const { container, rerender } = render(<Calendar defaultMonth={JUNE_2024} />);
    expect(container.querySelector('.via-cal__weekdays')).toBeInTheDocument();

    rerender(<Calendar defaultMonth={JUNE_2024} showWeekdays={false} />);
    expect(container.querySelector('.via-cal__weekdays')).not.toBeInTheDocument();
  });

  it('renders a tooltip dot for a marked date', () => {
    const { container } = render(
      <Calendar
        defaultMonth={JUNE_2024}
        markers={[{ date: new Date(2024, 5, 12), tone: 'coral', label: 'Live ao vivo' }]}
      />,
    );

    const dot = container.querySelector('.via-cal__cell-dot--coral');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute('title', 'Live ao vivo');
  });

  it('falls back to today/value when no defaultMonth is given (value drives the view)', () => {
    render(<Calendar value={new Date(2023, 0, 9)} />);
    // January 2023 should be shown because value lives there.
    expect(screen.getByRole('heading', { name: /janeiro de 2023/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /, 9 de janeiro de 2023/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('respects a non-default locale for headers and labels', () => {
    render(<Calendar defaultMonth={JUNE_2024} locale="en-US" />);
    expect(screen.getByRole('heading', { name: /june 2024/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /saturday, june 15, 2024/i }),
    ).toBeInTheDocument();
  });

  // ---- Roving tabindex + keyboard navigation -------------------------------

  const jun = (day: number) =>
    screen.getByRole('button', { name: new RegExp(`\\b${day} de junho de 2024`, 'i') });

  it('exposes exactly one tabbable day cell (roving tabindex), defaulting to the selected day', () => {
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 10)} />);

    const grid = screen.getByRole('grid');
    const tabbable = within(grid)
      .getAllByRole('button')
      .filter((b) => b.getAttribute('tabindex') === '0');

    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAccessibleName(/, 10 de junho de 2024/i);
    // every other in-grid day is removed from the tab order
    expect(jun(11)).toHaveAttribute('tabindex', '-1');
  });

  it('falls back the roving focus to the first in-month day when nothing is selected and today is elsewhere', () => {
    // JUNE_2024 is not the current month in CI, so neither value nor today apply.
    render(<Calendar defaultMonth={JUNE_2024} />);
    expect(jun(1)).toHaveAttribute('tabindex', '0');
  });

  it('ArrowRight / ArrowLeft move the roving focus by ±1 day', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 10)} />);

    jun(10).focus();
    await user.keyboard('{ArrowRight}');
    expect(jun(11)).toHaveFocus();
    expect(jun(11)).toHaveAttribute('tabindex', '0');
    expect(jun(10)).toHaveAttribute('tabindex', '-1');

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(jun(9)).toHaveFocus();
  });

  it('ArrowDown / ArrowUp move the roving focus by ±7 days (one week)', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 10)} />);

    jun(10).focus();
    await user.keyboard('{ArrowDown}');
    expect(jun(17)).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(jun(10)).toHaveFocus();
  });

  it('Home / End jump to the start / end of the week', async () => {
    const user = userEvent.setup();
    // June 12 2024 is a Wednesday → week runs Sun(9) .. Sat(15)
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 12)} />);

    jun(12).focus();
    await user.keyboard('{Home}');
    expect(jun(9)).toHaveFocus();

    await user.keyboard('{End}');
    expect(jun(15)).toHaveFocus();
  });

  it('PageUp / PageDown move to the previous / next month and follow focus there', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 15)} />);

    jun(15).focus();
    await user.keyboard('{PageDown}');
    expect(screen.getByRole('heading', { name: /julho de 2024/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /, 15 de julho de 2024/i })).toHaveFocus();

    await user.keyboard('{PageUp}');
    expect(screen.getByRole('heading', { name: /junho de 2024/i })).toBeInTheDocument();
    expect(jun(15)).toHaveFocus();
  });

  it('arrow navigation across a month boundary switches the view and keeps focus', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 30)} />);

    // June 30 2024 is a Sunday; +1 day lands on July 1, which is in the next month.
    jun(30).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('heading', { name: /julho de 2024/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /, 1 de julho de 2024/i })).toHaveFocus();
  });

  it('Enter selects the focused day', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 10)} onChange={onChange} />);

    jun(10).focus();
    await user.keyboard('{ArrowRight}'); // move to 11
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledOnce();
    const picked = onChange.mock.calls[0][0] as Date;
    expect(picked.getDate()).toBe(11);
  });

  it('Space selects the focused day', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Calendar defaultMonth={JUNE_2024} value={new Date(2024, 5, 10)} onChange={onChange} />);

    jun(10).focus();
    await user.keyboard(' ');

    expect(onChange).toHaveBeenCalledOnce();
    expect((onChange.mock.calls[0][0] as Date).getDate()).toBe(10);
  });

  it('keyboard navigation skips disabled days', async () => {
    const user = userEvent.setup();
    // window 10..20 enabled; 9 and below disabled, 21 and above disabled.
    render(
      <Calendar
        defaultMonth={JUNE_2024}
        value={new Date(2024, 5, 11)}
        min={new Date(2024, 5, 10)}
        max={new Date(2024, 5, 20)}
      />,
    );

    // From the 11, ArrowLeft → 10 (enabled). Another ArrowLeft would hit 9 (disabled);
    // it should skip to nothing enabled before → stays put at 10.
    jun(11).focus();
    await user.keyboard('{ArrowLeft}');
    expect(jun(10)).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    // 9 is disabled and there is no enabled day before it in range → focus stays on 10
    expect(jun(10)).toHaveFocus();
    expect(jun(9)).toBeDisabled();
  });
});
