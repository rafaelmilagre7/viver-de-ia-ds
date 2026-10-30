import { describe, it, expect, afterEach, vi } from 'vitest';
import { enableGlassLens, disableGlassLens, supportsGlassLens } from './lens';

// jsdom não é Chromium: sem navigator.userAgentData e sem CSS.supports.
// O portão tem que dizer "não" e não mexer em nada — a peça fica no blur normal.
describe('lente do vidro (portão)', () => {
  afterEach(() => {
    disableGlassLens();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(navigator, 'userAgentData');
  });

  it('fora do Chromium não liga nem injeta filtro', () => {
    expect(supportsGlassLens()).toBe(false);
    expect(enableGlassLens()).toBe(false);
    expect(document.documentElement.classList.contains('via-lens-on')).toBe(false);
    expect(document.getElementById('via-lens')).toBeNull();
  });

  function fakeChromium(media: Record<string, boolean> = {}) {
    Object.defineProperty(navigator, 'userAgentData', { value: { brands: [] }, configurable: true });
    vi.stubGlobal('CSS', { supports: () => true });
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: Boolean(media[q]) }));
  }

  it('no Chromium liga a classe e injeta os 2 filtros uma vez só', () => {
    fakeChromium();
    expect(enableGlassLens()).toBe(true);
    expect(enableGlassLens()).toBe(true);
    expect(document.documentElement.classList.contains('via-lens-on')).toBe(true);
    expect(document.querySelectorAll('#via-lens')).toHaveLength(1);
    expect(document.getElementById('via-lens-bar')).not.toBeNull();
    // mapa em unidades da caixa da peça (em px/% o fundo inteiro escorrega)
    expect(document.getElementById('via-lens')!.getAttribute('primitiveUnits')).toBe('objectBoundingBox');
  });

  it('respeita menos transparência e mais contraste', () => {
    fakeChromium({ '(prefers-reduced-transparency: reduce)': true });
    expect(enableGlassLens()).toBe(false);
    fakeChromium({ '(prefers-contrast: more)': true });
    expect(supportsGlassLens()).toBe(false);
  });

  it('disableGlassLens desfaz tudo', () => {
    fakeChromium();
    enableGlassLens();
    disableGlassLens();
    expect(document.documentElement.classList.contains('via-lens-on')).toBe(false);
    expect(document.getElementById('via-lens')).toBeNull();
  });
});
