import { describe, it, expect } from 'vitest';
import { springStep, springSettled, project, rubberband, SPRING, type SpringState } from './spring';

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
