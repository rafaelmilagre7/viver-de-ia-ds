import { describe, it, expect, vi } from 'vitest';
import { springStep, springSettled, project, rubberband, animateSpring, SPRING, type SpringState } from './spring';

const simulate = (from: number, to: number, params = SPRING.sheet, velocity = 0) => {
  let s: SpringState = { value: from, velocity };
  const trace: number[] = [];
  for (let i = 0; i < 600 && !springSettled(s, to); i++) {
    s = springStep(s, to, params, 1 / 120);
    trace.push(s.value);
  }
  return { final: s, trace };
};

describe('springStep', () => {
  it('converge no alvo e assenta (damping 1.0 · sem overshoot)', () => {
    const { final, trace } = simulate(0, 100, SPRING.move);
    expect(springSettled(final, 100)).toBe(true);
    // Criticamente amortecida não passa do alvo
    expect(Math.max(...trace)).toBeLessThanOrEqual(100.5);
  });

  it('SPRING.panel (entrada de Sheet/Drawer) chega sem quicar', () => {
    const { final, trace } = simulate(480, 0, SPRING.panel);
    expect(springSettled(final, 0)).toBe(true);
    expect(Math.min(...trace)).toBeGreaterThanOrEqual(-0.5);
  });

  it('damping 0.8 quica de leve (overshoot pequeno e controlado)', () => {
    const { trace } = simulate(0, 100, SPRING.sheet);
    const peak = Math.max(...trace);
    expect(peak).toBeGreaterThan(100); // passa do alvo…
    expect(peak).toBeLessThan(112); // …mas pouco
  });

  it('carrega velocidade inicial (handoff do dedo muda a trajetória)', () => {
    const still = simulate(50, 0, SPRING.sheet, 0).trace;
    const flung = simulate(50, 0, SPRING.sheet, -800).trace;
    // Com embalo chega antes na metade do caminho
    const halfway = (t: number[]) => t.findIndex((v) => v <= 25);
    expect(halfway(flung)).toBeLessThan(halfway(still));
  });
});

describe('project (fórmula exata da Apple)', () => {
  it('bate com o decaimento exponencial v/1000 · d/(1-d)', () => {
    expect(project(1000, 0.998)).toBeCloseTo((1 * 0.998) / 0.002, 5);
    expect(project(500, 0.99)).toBeCloseTo((0.5 * 0.99) / 0.01, 5);
  });
  it('zero velocidade → zero deslocamento · sinal preservado', () => {
    expect(project(0)).toBe(0);
    expect(project(-800)).toBeLessThan(0);
  });
});

describe('rubberband', () => {
  it('resistência progressiva: sempre segue, cada vez menos', () => {
    const dim = 400;
    const f = (o: number) => rubberband(o, dim);
    expect(f(0)).toBe(0);
    expect(f(50)).toBeGreaterThan(0);
    expect(f(50)).toBeLessThan(50); // resiste desde o início
    expect(f(200)).toBeGreaterThan(f(50)); // monotônico…
    // …mas o ganho marginal cai (a mão sente a borda)
    expect(f(200) - f(150)).toBeLessThan(f(100) - f(50));
    // e nunca passa do teto assintótico dimension·c/1 (aqui 400·0.55… na prática < dim)
    expect(f(100000)).toBeLessThan(dim);
  });
});

describe('animateSpring', () => {
  it('1º frame com timestamp anterior ao início não roda a mola pra trás', () => {
    const frames: FrameRequestCallback[] = [];
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => { frames.push(cb); return frames.length; });
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    const values: number[] = [];
    // painel solto em 108px indo pra 300 com velocidade a favor do destino
    animateSpring({ from: 108, velocity: 400, to: 300, params: SPRING.sheet, onFrame: (v) => values.push(v) });
    frames.shift()!(992); // rAF com timestamp 8ms ANTES do performance.now() inicial
    frames.shift()!(1008);
    // tempo "negativo" não integra (antes a mola andava com dt < 0 e dava um tranco)
    expect(values[0]).toBe(108);
    expect(values[1]).toBeGreaterThan(108);
    raf.mockRestore();
    vi.restoreAllMocks();
  });
});
