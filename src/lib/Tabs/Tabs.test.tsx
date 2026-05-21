import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const items = [
  { id: 'overview', label: 'Visão geral', content: <p>panel-visao</p> },
  { id: 'history',  label: 'Histórico',  content: <p>panel-historico</p> },
  { id: 'notes',    label: 'Notas',      content: <p>panel-notas</p> },
];

describe('<Tabs />', () => {
  it('renders all tab buttons + the first panel by default', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Visão geral' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Histórico' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('panel-visao')).toBeVisible();
  });

  it('honors defaultActiveId on first render', () => {
    render(<Tabs items={items} defaultActiveId="notes" />);
    expect(screen.getByRole('tab', { name: 'Notas' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('panel-notas')).toBeVisible();
  });

  it('clicking a tab switches the active panel', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole('tab', { name: 'Histórico' }));
    expect(screen.getByRole('tab', { name: 'Histórico' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('panel-historico')).toBeVisible();
  });

  it('ArrowRight moves selection to the next tab (with wrap-around)', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    const first = screen.getByRole('tab', { name: 'Visão geral' });
    first.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Histórico' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}{ArrowRight}'); // wraps past end → back to first
    expect(screen.getByRole('tab', { name: 'Visão geral' })).toHaveAttribute('aria-selected', 'true');
  });

  it('ArrowLeft moves selection to the previous tab (with wrap)', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    const first = screen.getByRole('tab', { name: 'Visão geral' });
    first.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Notas' })).toHaveAttribute('aria-selected', 'true');
  });

  it('Home / End jump to first / last', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} defaultActiveId="history" />);
    screen.getByRole('tab', { name: 'Histórico' }).focus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Notas' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Visão geral' })).toHaveAttribute('aria-selected', 'true');
  });

  it('controlled mode does not update internal state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<Tabs items={items} activeId="overview" onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: 'Notas' }));
    // onChange fires but the active tab stays 'overview' until parent re-renders
    expect(onChange).toHaveBeenCalledWith('notes');
    expect(screen.getByRole('tab', { name: 'Visão geral' })).toHaveAttribute('aria-selected', 'true');

    // parent confirms the change
    rerender(<Tabs items={items} activeId="notes" onChange={onChange} />);
    expect(screen.getByRole('tab', { name: 'Notas' })).toHaveAttribute('aria-selected', 'true');
  });

  it('only the active tab is reachable with Tab (tabIndex roving)', () => {
    render(<Tabs items={items} defaultActiveId="history" />);
    expect(screen.getByRole('tab', { name: 'Visão geral' })).toHaveAttribute('tabIndex', '-1');
    expect(screen.getByRole('tab', { name: 'Histórico' })).toHaveAttribute('tabIndex', '0');
    expect(screen.getByRole('tab', { name: 'Notas' })).toHaveAttribute('tabIndex', '-1');
  });
});
