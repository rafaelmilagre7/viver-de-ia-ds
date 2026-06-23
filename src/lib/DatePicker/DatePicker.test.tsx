import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';

// A fixed reference date used across tests. June 2026 has 30 days and
// starts on a Monday — handy for predictable grid math.
const JUN_15_2026 = new Date(2026, 5, 15);

/** Thin controlled wrapper so we can exercise value↔onChange round-trips. */
function Controlled({
  initial = null,
  ...rest
}: { initial?: Date | null } & Omit<
  React.ComponentProps<typeof DatePicker>,
  'value' | 'onChange'
> & { onChange?: (d: Date | null) => void }) {
  const [date, setDate] = useState<Date | null>(initial);
  const { onChange, ...props } = rest;
  return (
    <DatePicker
      {...props}
      value={date}
      onChange={(d) => {
        setDate(d);
        onChange?.(d);
      }}
    />
  );
}

/** The day cells that belong to the visible month (not the leading/trailing outside days). */
function monthCell(name: string) {
  const inMonth = screen
    .getAllByRole('gridcell', { name })
    .filter((el) => !el.className.includes('outside'));
  return inMonth[0];
}

describe('<DatePicker />', () => {
  it('renders the trigger closed by default with placeholder + ARIA', () => {
    render(<DatePicker value={null} onChange={() => {}} />);
    const trigger = screen.getByRole('button', { name: 'Selecionar data' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('uses label as accessible name and renders the visible label text', () => {
    render(<DatePicker value={null} onChange={() => {}} label="Data da live" />);
    // <label> text is shown, and the trigger borrows it as its aria-label.
    expect(screen.getByText('Data da live')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Data da live' })).toBeInTheDocument();
  });

  it('shows the formatted selected value instead of the placeholder', () => {
    render(<DatePicker value={JUN_15_2026} onChange={() => {}} />);
    expect(screen.getByText('15/06/2026')).toBeInTheDocument();
    expect(screen.queryByText('Selecione uma data')).not.toBeInTheDocument();
  });

  it('opens the calendar dialog on trigger click and flips aria-expanded', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={JUN_15_2026} onChange={() => {}} />);
    const trigger = screen.getByRole('button', { name: 'Selecionar data' });

    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Calendário' });
    expect(dialog).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // Header reflects the selected value's month/year.
    expect(within(dialog).getByText('junho')).toBeInTheDocument();
    expect(within(dialog).getByText('2026')).toBeInTheDocument();
  });

  it('marks the selected day with aria-selected and today with aria-current', async () => {
    const user = userEvent.setup();
    const today = new Date();
    render(<DatePicker value={today} onChange={() => {}} />);
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));

    const todayCell = monthCell(String(today.getDate()));
    expect(todayCell).toHaveAttribute('aria-selected', 'true');
    expect(todayCell).toHaveAttribute('aria-current', 'date');
  });

  it('selecting a day fires onChange with that date and closes the popup', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Controlled initial={JUN_15_2026} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    await user.click(monthCell('20'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const picked = onChange.mock.calls[0][0] as Date;
    expect(picked.getFullYear()).toBe(2026);
    expect(picked.getMonth()).toBe(5);
    expect(picked.getDate()).toBe(20);
    // popup closed after selection
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    // controlled wrapper now displays the new value
    expect(screen.getByText('20/06/2026')).toBeInTheDocument();
  });

  it('next / previous buttons move the visible month', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={JUN_15_2026} onChange={() => {}} />);
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));

    await user.click(screen.getByRole('button', { name: 'Mês seguinte' }));
    expect(screen.getByText('julho')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    await user.click(screen.getByRole('button', { name: 'Mês anterior' }));
    expect(screen.getByText('maio')).toBeInTheDocument();
  });

  it('"Limpar" clears the selection (onChange null) and "Hoje" picks today', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { unmount } = render(<Controlled initial={JUN_15_2026} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    await user.click(screen.getByRole('button', { name: 'Limpar' }));
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByText('Selecione uma data')).toBeInTheDocument();
    unmount();

    onChange.mockClear();
    render(<Controlled onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    await user.click(screen.getByRole('button', { name: 'Hoje' }));
    const picked = onChange.mock.calls[0][0] as Date;
    const today = new Date();
    expect(picked.getDate()).toBe(today.getDate());
    expect(picked.getMonth()).toBe(today.getMonth());
  });

  it('Escape closes the open calendar', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={JUN_15_2026} onChange={() => {}} />);
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('an outside mousedown closes the open calendar', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DatePicker value={JUN_15_2026} onChange={() => {}} />
        <button type="button">outside</button>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('disabled trigger does not open the calendar', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={null} onChange={() => {}} disabled />);
    const trigger = screen.getByRole('button', { name: 'Selecionar data' });
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('disables days outside the min/max range and allows in-range days', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DatePicker
        value={JUN_15_2026}
        onChange={onChange}
        min={new Date(2026, 5, 10)}
        max={new Date(2026, 5, 20)}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));

    // 5th is before min → disabled; 25th is after max → disabled.
    expect(monthCell('5')).toBeDisabled();
    expect(monthCell('25')).toBeDisabled();
    // 12th is within range → enabled and selectable.
    const inRange = monthCell('12');
    expect(inRange).not.toBeDisabled();
    await user.click(inRange);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0][0] as Date).getDate()).toBe(12);
  });

  it('weekStartsOn switches the weekday header order', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <DatePicker value={JUN_15_2026} onChange={() => {}} weekStartsOn={1} />,
    );
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    let headers = screen.getAllByRole('columnheader').map((h) => h.textContent);
    expect(headers[0]).toBe('seg');

    await user.keyboard('{Escape}');
    rerender(<DatePicker value={JUN_15_2026} onChange={() => {}} weekStartsOn={0} />);
    await user.click(screen.getByRole('button', { name: 'Selecionar data' }));
    headers = screen.getAllByRole('columnheader').map((h) => h.textContent);
    expect(headers[0]).toBe('dom');
  });

  it('honors a custom formatLabel and a custom ariaLabel', () => {
    render(
      <DatePicker
        value={JUN_15_2026}
        onChange={() => {}}
        ariaLabel="Escolher a data do evento"
        formatLabel={(d) => `dia ${d.getDate()}`}
      />,
    );
    expect(screen.getByText('dia 15')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Escolher a data do evento' }),
    ).toBeInTheDocument();
  });
});
