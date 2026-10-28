import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRangePicker, type DateRange } from './DateRangePicker';

/* Regressão da auditoria · "Últimos N dias" conta N dias (hoje incluso) */

describe('<DateRangePicker /> · presets', () => {
  it.each([7, 30, 90])('"Últimos %i dias" seleciona exatamente %i dias terminando hoje', async (n) => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateRangePicker showPresets onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: `Últimos ${n} dias` }));
    expect(screen.getByText(/dias selecionados/).textContent).toMatch(new RegExp(`^${n}`));
    const range: DateRange = onChange.mock.calls[0][0];
    const now = new Date();
    expect(range.end).toEqual(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    expect(range.start).toEqual(new Date(now.getFullYear(), now.getMonth(), now.getDate() - (n - 1)));
  });
});
