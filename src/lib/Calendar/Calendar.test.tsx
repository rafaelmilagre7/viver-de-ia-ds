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
});
