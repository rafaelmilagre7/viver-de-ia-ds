import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { DatePicker } from './DatePicker';
import { Calendar } from '../Calendar/Calendar';

/* Regressões da auditoria · DatePicker (combobox + dialog) e grade ARIA do calendário */

async function axeIds(root: Element = document.body) {
  const res = await axe.run(root, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => v.id);
}

describe('<DatePicker /> · regressões', () => {
  it('"Hoje" fica desabilitado quando hoje está fora de min/max', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    render(<DatePicker value={null} onChange={onChange} min={tomorrow} label="Data" />);
    await user.click(screen.getByRole('combobox', { name: /^Data/ }));
    const hoje = screen.getByRole('button', { name: 'Hoje' });
    expect(hoje).toBeDisabled();
    await user.click(hoje);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('"Hoje" com max = hoje continua valendo e emite a data à meia-noite', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker value={null} onChange={onChange} max={new Date()} label="Data" />);
    await user.click(screen.getByRole('combobox', { name: /^Data/ }));
    await user.click(screen.getByRole('button', { name: 'Hoje' }));
    const picked: Date = onChange.mock.calls[0][0];
    expect(picked.getHours() + picked.getMinutes()).toBe(0);
  });

  it('nome acessível = rótulo + data escolhida', () => {
    render(<DatePicker value={new Date(2026, 4, 14)} onChange={() => {}} label="Data da live" />);
    expect(screen.getByRole('combobox', { name: 'Data da live 14/05/2026' })).toBeInTheDocument();
  });

  it('ESC e Enter (escolha) devolvem o foco ao trigger', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 4, 14)} onChange={() => {}} label="Data" />);
    const trigger = screen.getByRole('combobox', { name: /^Data/ });
    await user.click(trigger);
    expect(document.activeElement?.getAttribute('role')).toBe('gridcell');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('calendário aberto passa no axe: grade com row/columnheader/gridcell e data por extenso', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 4, 14)} onChange={() => {}} label="Data" />);
    await user.click(screen.getByRole('combobox', { name: /^Data/ }));
    const grid = screen.getByRole('grid', { name: /maio/ });
    expect(within(grid).getAllByRole('columnheader')).toHaveLength(7);
    expect(within(grid).getAllByRole('row')).toHaveLength(7); // cabeçalho + 6 semanas
    const cell = within(grid).getByRole('gridcell', { name: /14 de maio de 2026/ });
    expect(cell).toHaveAttribute('aria-selected', 'true');
    expect(await axeIds()).toEqual([]);
  });

  it('Tab fica dentro do calendário (diálogo)', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 4, 14)} onChange={() => {}} label="Data" />);
    await user.click(screen.getByRole('combobox', { name: /^Data/ }));
    const cal = screen.getByRole('dialog', { name: 'Calendário' });
    for (let i = 0; i < 6; i++) {
      await user.tab();
      expect(cal).toContainElement(document.activeElement as HTMLElement);
    }
  });
});

describe('<Calendar /> · regressões', () => {
  it('passa no axe: cabeçalho dos dias dentro do grid, semanas em row, dias em gridcell', async () => {
    const { container } = render(<Calendar value={new Date(2026, 4, 14)} onChange={() => {}} />);
    const grid = screen.getByRole('grid');
    expect(within(grid).getAllByRole('columnheader')).toHaveLength(7);
    const rows = within(grid).getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(6);
    expect(within(rows[1]).getAllByRole('gridcell')).toHaveLength(7);
    expect(await axeIds(container)).toEqual([]);
  });
});
