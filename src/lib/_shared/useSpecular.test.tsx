import { describe, it, expect, afterEach, vi } from 'vitest';
import { attachSpecular } from './useSpecular';

function stubMedia(media: Record<string, boolean>) {
  vi.stubGlobal('matchMedia', (q: string) => ({ matches: Boolean(media[q]) }));
}

describe('reflexo que segue o ponteiro', () => {
  afterEach(() => vi.unstubAllGlobals());

  function move(el: HTMLElement, pointerType: string, x: number, y: number) {
    const e = new MouseEvent('pointermove', { clientX: x, clientY: y, bubbles: true });
    Object.defineProperty(e, 'pointerType', { value: pointerType });
    el.dispatchEvent(e);
  }

  it('com mouse escreve --via-mx/--via-my relativos ao elemento, 1x por quadro', () => {
    stubMedia({ '(hover: hover) and (pointer: fine)': true });
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({ left: 100, top: 50 }) as DOMRect;
    const off = attachSpecular(el);
    move(el, 'mouse', 130, 70);
    move(el, 'mouse', 140, 80);
    expect(frames).toHaveLength(1); // dois movimentos, um quadro
    frames[0](0);
    expect(el.style.getPropertyValue('--via-mx')).toBe('40px');
    expect(el.style.getPropertyValue('--via-my')).toBe('30px');
    off();
  });

  it('ignora toque/caneta', () => {
    stubMedia({ '(hover: hover) and (pointer: fine)': true });
    const raf = vi.fn();
    vi.stubGlobal('requestAnimationFrame', raf);
    const el = document.createElement('div');
    attachSpecular(el);
    move(el, 'touch', 10, 10);
    expect(raf).not.toHaveBeenCalled();
  });

  it('não liga sob reduced-motion nem sem ponteiro fino', () => {
    const raf = vi.fn();
    vi.stubGlobal('requestAnimationFrame', raf);
    const el = document.createElement('div');
    stubMedia({ '(hover: hover) and (pointer: fine)': true, '(prefers-reduced-motion: reduce)': true });
    attachSpecular(el);
    stubMedia({});
    attachSpecular(el);
    move(el, 'mouse', 10, 10);
    expect(raf).not.toHaveBeenCalled();
  });
});
