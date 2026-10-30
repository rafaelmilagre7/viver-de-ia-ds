import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
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

/* Indicador compartilhado · um só elemento, posto na aba ativa e movido por transform */
describe('<Tabs /> · indicador', () => {
  // jsdom não faz layout: cada aba i mede 80px de largura a partir de x = 100·i
  const layout = () =>
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const tabs = this.parentElement ? Array.from(this.parentElement.querySelectorAll('[role="tab"]')) : [];
      const i = tabs.indexOf(this);
      const r = i >= 0 ? { x: 100 * i, y: 0, width: 80, height: 36 } : { x: 0, y: 0, width: 400, height: 36 };
      return { ...r, left: r.x, top: r.y, right: r.x + r.width, bottom: r.y + r.height, toJSON: () => r } as DOMRect;
    });
  const reduceMotion = (on: boolean) => {
    window.matchMedia = ((q: string) => ({
      matches: on && q.includes('reduce'),
      media: q,
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
  };
  const indicator = (c: HTMLElement) => c.querySelector<HTMLElement>('.via-tabs__indicator')!;

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('existe um indicador só, posto na aba ativa (sublinhado recua 16px de cada lado)', () => {
    layout();
    reduceMotion(false);
    const { container } = render(<Tabs items={items} defaultActiveId="history" />);
    expect(container.querySelectorAll('.via-tabs__indicator')).toHaveLength(1);
    expect(container.querySelector('[role="tablist"]')).toHaveAttribute('data-indicator');
    expect(indicator(container).style.transform).toBe('translate(116px, 0px)');
    expect(indicator(container).style.width).toBe('48px');
    expect(indicator(container)).toHaveAttribute('aria-hidden', 'true');
  });

  it('pílula cobre a aba ativa inteira', () => {
    layout();
    reduceMotion(false);
    const { container } = render(<Tabs items={items} variant="pills" />);
    expect(indicator(container).style.transform).toBe('translate(0px, 0px)');
    expect(indicator(container).style.width).toBe('80px');
    expect(indicator(container).style.height).toBe('36px');
  });

  it('trocar de aba anda na mola só com transform (escala no caminho) e assenta na aba nova', async () => {
    layout();
    reduceMotion(false);
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
    const { container } = render(<Tabs items={items} variant="pills" />);
    act(() => screen.getByRole('tab', { name: 'Notas' }).click());
    const el = indicator(container);
    // largura final aplicada uma vez; o caminho é translate + scaleX
    expect(el.style.width).toBe('80px');
    act(() => {
      vi.advanceTimersByTime(48);
    });
    expect(el.style.transform).toMatch(/^translate\([\d.]+px, 0px\) scaleX\([\d.]+\)$/);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(el.style.transform).toBe('translate(200px, 0px)');
    expect(el.style.borderRadius).toBe('');
  });

  it('reduced-motion: troca seca, sem mola', () => {
    layout();
    reduceMotion(true);
    const { container } = render(<Tabs items={items} />);
    act(() => screen.getByRole('tab', { name: 'Notas' }).click());
    expect(indicator(container).style.transform).toBe('translate(216px, 0px)');
  });

  it('sem caixa medida (container oculto / SSR) a aba ativa desenha o próprio indicador', () => {
    reduceMotion(false);
    const { container } = render(<Tabs items={items} />);
    expect(container.querySelector('[role="tablist"]')).not.toHaveAttribute('data-indicator');
  });
});
