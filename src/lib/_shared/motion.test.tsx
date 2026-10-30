import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useRef } from 'react';
import { tokens } from '../tokens';
import { DUR, EASE, usePresence, measureAtRest, withViewTransition } from './motion';

/* Espelho JS da escala de movimento + presença (saída animada) */

describe('escala de movimento', () => {
  it('DUR espelha os tokens --via-dur-* (CSS é a fonte)', () => {
    expect(`${DUR.press}ms`).toBe(tokens['via-dur-press']);
    expect(`${DUR.quick}ms`).toBe(tokens['via-dur-quick']);
    expect(`${DUR.base}ms`).toBe(tokens['via-dur-base']);
    expect(`${DUR.panel}ms`).toBe(tokens['via-dur-panel']);
    expect(`${DUR.page}ms`).toBe(tokens['via-dur-page']);
  });

  it('EASE espelha as 3 curvas', () => {
    expect(EASE.enter).toBe(tokens['via-ease-enter']);
    expect(EASE.exit).toBe(tokens['via-ease-exit']);
    expect(EASE.snap).toBe(tokens['via-ease-snap']);
  });

  it('cada saída é um degrau abaixo da entrada (~0,65–0,75×)', () => {
    const steps = [DUR.press, DUR.quick, DUR.base, DUR.panel, DUR.page];
    for (let i = 1; i < steps.length - 1; i++) {
      const ratio = steps[i - 1] / steps[i];
      expect(ratio).toBeGreaterThanOrEqual(0.6);
      expect(ratio).toBeLessThanOrEqual(0.8);
    }
  });
});

/* ---------- Animação falsa controlável (jsdom não tem Web Animations) ---------- */

function fakeAnimation() {
  let resolve!: () => void;
  let reject!: (e: unknown) => void;
  const finished = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  finished.catch(() => {});
  return {
    playState: 'running',
    pending: false,
    currentTime: 0,
    effect: { getComputedTiming: () => ({ endTime: 150 }) },
    finished,
    finish: () => resolve(),
    cancel: () => reject(new DOMException('cancel', 'AbortError')),
  };
}

function Panel({ open }: { open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { mounted, state } = usePresence(open, ref);
  if (!mounted) return null;
  return <div ref={ref} data-testid="panel" data-state={state} />;
}

describe('usePresence', () => {
  afterEach(() => {
    // @ts-expect-error · limpa o mock de Web Animations
    delete Element.prototype.getAnimations;
  });

  it('sem animação rodando desmonta na hora (jsdom, reduced-motion zerado)', () => {
    const { rerender, queryByTestId } = render(<Panel open />);
    expect(queryByTestId('panel')).toHaveAttribute('data-state', 'open');
    rerender(<Panel open={false} />);
    expect(queryByTestId('panel')).toBeNull();
  });

  it('fica montado em data-state=closed enquanto a saída anima e sai depois', async () => {
    const anim = fakeAnimation();
    Element.prototype.getAnimations = vi.fn(() => [anim]) as unknown as Element['getAnimations'];
    const { rerender, queryByTestId } = render(<Panel open />);
    rerender(<Panel open={false} />);
    expect(queryByTestId('panel')).toHaveAttribute('data-state', 'closed');
    await act(async () => {
      anim.finish();
      await anim.finished;
    });
    expect(queryByTestId('panel')).toBeNull();
  });

  it('reabrir no meio da saída reverte sem desmontar (mesmo nó)', async () => {
    const anim = fakeAnimation();
    Element.prototype.getAnimations = vi.fn(() => [anim]) as unknown as Element['getAnimations'];
    const { rerender, queryByTestId } = render(<Panel open />);
    const node = queryByTestId('panel');
    rerender(<Panel open={false} />);
    rerender(<Panel open />);
    // a transição revertida cancela a de saída — isso não pode desmontar
    await act(async () => {
      anim.cancel();
      await Promise.resolve();
    });
    expect(queryByTestId('panel')).toBe(node);
    expect(node).toHaveAttribute('data-state', 'open');
  });

  it('teto de segurança: animação que nunca termina não prende o elemento', async () => {
    vi.useFakeTimers();
    const anim = fakeAnimation();
    Element.prototype.getAnimations = vi.fn(() => [anim]) as unknown as Element['getAnimations'];
    const { rerender, queryByTestId } = render(<Panel open />);
    rerender(<Panel open={false} />);
    expect(queryByTestId('panel')).not.toBeNull();
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryByTestId('panel')).toBeNull();
    vi.useRealTimers();
  });
});

describe('measureAtRest', () => {
  it('mede com a animação no fim e devolve ao ponto em que estava', () => {
    const el = document.createElement('div');
    const anim = { ...fakeAnimation(), currentTime: 40 as number | null };
    (el as Element).getAnimations = () => [anim as unknown as Animation];
    const seen = measureAtRest(el, () => anim.currentTime);
    expect(seen).toBe(150);
    expect(anim.currentTime).toBe(40);
  });
});

describe('withViewTransition', () => {
  it('sem View Transitions aplica na hora, com as transições desligadas por 1 quadro', () => {
    const update = vi.fn();
    withViewTransition(update);
    expect(update).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.contains('via-theme-swap')).toBe(true);
  });

  it('com View Transitions envolve a troca e solta a classe no fim', async () => {
    let finish!: () => void;
    const finished = new Promise<void>((r) => (finish = r));
    const start = vi.fn((cb: () => void) => {
      cb();
      return { finished };
    });
    (document as unknown as { startViewTransition: typeof start }).startViewTransition = start;
    const update = vi.fn();
    withViewTransition(update);
    expect(start).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.contains('via-theme-swap')).toBe(true);
    finish();
    await finished;
    await Promise.resolve();
    expect(document.documentElement.classList.contains('via-theme-swap')).toBe(false);
    delete (document as unknown as { startViewTransition?: unknown }).startViewTransition;
  });
});
