import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './Tooltip';

/**
 * The Tooltip opens after a timer (`delay`, default 200ms) on mouse-enter or
 * focus, and closes immediately on mouse-leave or blur. We drive the clock with
 * fake timers and dispatch the hover/focus events synchronously via `fireEvent`
 * (the component listens on the wrapper <span>, not the trigger directly).
 *
 * `tick()` advances the fake clock inside `act(...)` so the setTimeout-driven
 * state update flushes before we assert.
 */
describe('<Tooltip />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const tick = (ms: number) => act(() => { vi.advanceTimersByTime(ms); });

  // The component attaches its handlers to the wrapper <span>.
  const wrapOf = (el: HTMLElement) => el.parentElement as HTMLElement;

  it('does not render the tooltip by default (closed state)', () => {
    render(
      <Tooltip content="Adicionar ao calendário">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows the tooltip on hover only after the delay elapses', () => {
    render(
      <Tooltip content="Salvar" delay={200}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    // before the delay, still closed
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    tick(200);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Salvar');
  });

  it('hides the tooltip immediately on mouse leave', () => {
    render(
      <Tooltip content="Salvar" delay={200}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(wrap);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows on focus and hides on blur (focus-aware)', () => {
    render(
      <Tooltip content="Dica de campo" delay={200}>
        <button>Campo</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Campo' }));

    fireEvent.focus(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.blur(wrap);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not show before delay if the pointer leaves first (timer is cancelled)', () => {
    render(
      <Tooltip content="Salvar" delay={200}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    tick(100); // halfway through the delay
    fireEvent.mouseLeave(wrap); // leaving cancels the pending timer
    tick(500); // even past the original delay
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('honors a custom delay', () => {
    render(
      <Tooltip content="Lento" delay={1000}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    tick(999);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    tick(1);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('wires aria-describedby on the wrapper to the tooltip id only while open', () => {
    render(
      <Tooltip content="Descrição acessível" delay={200}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));
    expect(wrap).toHaveClass('via-tooltip-wrap');
    expect(wrap).not.toHaveAttribute('aria-describedby');

    fireEvent.mouseEnter(wrap);
    tick(200);

    const tip = screen.getByRole('tooltip');
    expect(tip.id).toBeTruthy();
    expect(wrap).toHaveAttribute('aria-describedby', tip.id);

    fireEvent.mouseLeave(wrap);
    expect(wrap).not.toHaveAttribute('aria-describedby');
  });

  it('applies the side modifier class (default top, and an explicit side)', () => {
    const { rerender } = render(
      <Tooltip content="Topo">
        <button>Trigger</button>
      </Tooltip>,
    );
    let wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toHaveClass('via-tooltip', 'via-tooltip--top');

    fireEvent.mouseLeave(wrap);
    rerender(
      <Tooltip content="Direita" side="right">
        <button>Trigger</button>
      </Tooltip>,
    );
    wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));
    fireEvent.mouseEnter(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toHaveClass('via-tooltip--right');
  });

  it('renders ReactNode content, not just strings', () => {
    render(
      <Tooltip content={<strong data-testid="rich">Rico</strong>}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toContainElement(screen.getByTestId('rich'));
  });

  it('re-hovering after hiding shows the tooltip again', () => {
    render(
      <Tooltip content="Salvar">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.mouseEnter(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(wrap);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('does NOT dismiss on Escape — current component has no Escape handler (a11y gap)', () => {
    render(
      <Tooltip content="Persistente">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrap = wrapOf(screen.getByRole('button', { name: 'Trigger' }));

    fireEvent.focus(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(wrap, { key: 'Escape', code: 'Escape' });
    // WAI-ARIA recommends Escape dismissal; this component does not implement it.
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
