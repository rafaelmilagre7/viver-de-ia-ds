import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Sheet } from '../Sheet/Sheet';
import { ToastStack } from '../Toast/Toast';
import { Drawer } from '../Drawer/Drawer';

/*
 * Regressões da auditoria · useDragDismiss
 * - callbacks do consumidor em ref: re-render do pai no meio da saída não
 *   cancela a mola (Sheet, Toast)
 * - consumidor vetou o fechamento: painel volta e o próximo pedido vale (Drawer)
 */

let reduced = false;
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get: () => 400 });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => 400 });
  window.matchMedia = ((q: string) => ({
    matches: reduced && q.includes('reduce'),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia;
});
afterEach(() => {
  vi.useRealTimers();
  reduced = false;
});

const fakeAll = () =>
  vi.useFakeTimers({
    toFake: ['setTimeout', 'setInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'Date'],
  });

/** ~6.4s de quadros de 16ms, com um re-render do pai no 5º quadro */
function drive(bump: () => void) {
  for (let i = 0; i < 400; i++) {
    act(() => {
      vi.advanceTimersByTime(16);
    });
    if (i === 5) act(() => bump());
  }
}

describe('saída animada sobrevive a re-render do pai', () => {
  it('Sheet com onClose inline', () => {
    fakeAll();
    const closed = vi.fn();
    let bump = () => {};
    function Host() {
      const [open, setOpen] = useState(true);
      const [, t] = useState(0);
      bump = () => t((n) => n + 1);
      return (
        <Sheet open={open} onClose={() => { closed(); setOpen(false); }} title="Filtros">
          x
        </Sheet>
      );
    }
    render(<Host />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    drive(() => bump());
    expect(closed).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Toast com onDismiss inline', () => {
    fakeAll();
    const dismissed = vi.fn();
    let bump = () => {};
    function Host() {
      const [toasts, setToasts] = useState([{ id: 'a', title: 'Salvo', duration: 0 }]);
      const [, t] = useState(0);
      bump = () => t((n) => n + 1);
      return (
        <ToastStack
          toasts={toasts}
          onDismiss={(id) => { dismissed(); setToasts((x) => x.filter((y) => y.id !== id)); }}
        />
      );
    }
    render(<Host />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }));
    drive(() => bump());
    expect(dismissed).toHaveBeenCalledTimes(1);
  });
});

describe('consumidor veta o fechamento', () => {
  it('Drawer volta pro lugar e o segundo pedido de fechar vale (reduced motion)', async () => {
    reduced = true;
    const user = userEvent.setup();
    const onClose = vi.fn(); // "alterações não salvas": não fecha
    render(
      <Drawer open onClose={onClose} title="Filtros">
        <button>x</button>
      </Drawer>,
    );
    await user.click(screen.getByRole('button', { name: 'Fechar drawer' }));
    await user.click(screen.getByRole('button', { name: 'Fechar drawer' }));
    expect(onClose).toHaveBeenCalledTimes(2);
    const panel = screen.getByRole('dialog');
    expect(panel.style.transform).toBe('translateX(0px)');
  });

  it('Sheet animado volta pra 0 depois do veto (scrim visível de novo)', () => {
    fakeAll();
    const onClose = vi.fn();
    render(<Sheet open onClose={onClose} title="S">x</Sheet>);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    for (let i = 0; i < 400; i++) {
      act(() => {
        vi.advanceTimersByTime(16);
      });
    }
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog').style.transform).toBe('translateY(0px)');
    const scrim = document.querySelector('.via-sheet-scrim') as HTMLElement;
    expect(scrim.style.opacity).toBe('1');
  });
});

describe('reduced-motion troca o deslize por crossfade curto', () => {
  it('Sheet entra e sai em fade (painel + scrim), onClose no fim do fade', async () => {
    reduced = true;
    const calls: Array<{ el: Element; frames: Keyframe[]; opts: KeyframeAnimationOptions }> = [];
    const finishers: Array<() => void> = [];
    Object.defineProperty(HTMLElement.prototype, 'animate', {
      configurable: true,
      value(this: HTMLElement, frames: Keyframe[], opts: KeyframeAnimationOptions) {
        calls.push({ el: this, frames, opts });
        let done!: () => void;
        const finished = new Promise<void>((r) => (done = r));
        finishers.push(done);
        return { finished, cancel() {} };
      },
    });
    try {
      const onClose = vi.fn();
      render(<Sheet open onClose={onClose} title="S">x</Sheet>);
      const dialog = screen.getByRole('dialog');
      const scrim = document.querySelector('.via-sheet-scrim')!;
      // entrada: só opacidade, 0 → 1, nada de transform
      expect(calls.map((c) => c.el)).toEqual([dialog, scrim]);
      expect(calls[0].frames).toEqual([{ opacity: 0 }, { opacity: 1 }]);
      expect(dialog.style.transform).toBe('');

      fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
      const exitFade = calls.slice(2);
      expect(exitFade).toHaveLength(2);
      expect(exitFade[0].frames[1]).toEqual({ opacity: 0 });
      expect(exitFade[0].opts.duration).toBe(160);
      expect(onClose).not.toHaveBeenCalled();
      await act(async () => {
        finishers.slice(2).forEach((f) => f());
        await Promise.resolve();
        await Promise.resolve();
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    } finally {
      delete (HTMLElement.prototype as { animate?: unknown }).animate;
    }
  });
});
