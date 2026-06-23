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

  it('wires aria-describedby on the trigger (not the wrapper) to the tooltip id only while open', () => {
    render(
      <Tooltip content="Descrição acessível" delay={200}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const wrap = wrapOf(trigger);
    expect(wrap).toHaveClass('via-tooltip-wrap');
    // The wrapper never carries the description — it's not the focusable element.
    expect(wrap).not.toHaveAttribute('aria-describedby');
    expect(trigger).not.toHaveAttribute('aria-describedby');

    fireEvent.mouseEnter(wrap);
    tick(200);

    const tip = screen.getByRole('tooltip');
    expect(tip.id).toBeTruthy();
    // Description lands on the focusable trigger so a screen reader announces it on focus.
    expect(trigger).toHaveAttribute('aria-describedby', tip.id);
    expect(wrap).not.toHaveAttribute('aria-describedby');

    fireEvent.mouseLeave(wrap);
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('merges aria-describedby with an id already present on the trigger', () => {
    render(
      <Tooltip content="Descrição acessível" delay={200}>
        <button aria-describedby="hint-1">Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const wrap = wrapOf(trigger);
    // Pre-existing description is preserved while closed.
    expect(trigger).toHaveAttribute('aria-describedby', 'hint-1');

    fireEvent.mouseEnter(wrap);
    tick(200);

    const tip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', `hint-1 ${tip.id}`);

    fireEvent.mouseLeave(wrap);
    // Back to just the caller's own description once closed.
    expect(trigger).toHaveAttribute('aria-describedby', 'hint-1');
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

  it('dismisses on Escape while keeping focus on the trigger (APG tooltip pattern)', () => {
    render(
      <Tooltip content="Persistente">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const wrap = wrapOf(trigger);

    trigger.focus();
    fireEvent.focus(wrap);
    tick(200);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(trigger).toHaveFocus();

    fireEvent.keyDown(wrap, { key: 'Escape', code: 'Escape' });
    // Escape dismisses the tooltip…
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    // …but focus stays on the trigger (no blur).
    expect(trigger).toHaveFocus();
    // aria-describedby is cleared along with the dismissal.
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });
});
