/**
 * Física de mola do DS · linguagem Apple (damping ratio + response)
 * — WWDC "Designing Fluid Interfaces": mola é interruptível e carrega
 * velocidade por natureza; duração emerge dos parâmetros, não é fixa.
 */

export interface SpringParams {
  /** 1.0 = sem overshoot (padrão UI) · ~0.8 = quica leve (só após gesto com embalo) */
  damping: number;
  /** Tempo (s) pra alcançar o alvo · não é "duração" — o settle emerge */
  response: number;
}

/** Valores que a Apple usa (Designing Fluid Interfaces) */
export const SPRING = {
  /** Reposicionar / mover (PiP) */
  move: { damping: 1.0, response: 0.4 } satisfies SpringParams,
  /** Drawer / sheet — gesto com embalo */
  sheet: { damping: 0.8, response: 0.3 } satisfies SpringParams,
} as const;

export interface SpringState {
  value: number;
  velocity: number; // px/s
}

/**
 * Um passo de integração (semi-implícito · estável em dt variável).
 * mass = 1 · stiffness/damping derivados de (damping ratio, response).
 */
export function springStep(
  s: SpringState,
  target: number,
  { damping, response }: SpringParams,
  dt: number,
): SpringState {
  const omega = (2 * Math.PI) / response; // frequência angular
  const stiffness = omega * omega;
  const dampingCoeff = 2 * damping * omega;
  const accel = stiffness * (target - s.value) - dampingCoeff * s.velocity;
  const velocity = s.velocity + accel * dt;
  const value = s.value + velocity * dt;
  return { value, velocity };
}

/** Mola assentou? (perto do alvo E devagar) */
export function springSettled(s: SpringState, target: number, epsilon = 0.5): boolean {
  return Math.abs(s.value - target) < epsilon && Math.abs(s.velocity) < epsilon * 20;
}

/**
 * Projeção de momentum (função EXATA da Apple · decaimento exponencial —
 * não é a v²/2a de livro-texto). Onde o gesto VAI parar se nada o segurar.
 * decelerationRate 0.998 = scroll normal · 0.99 = mais seco.
 */
export function project(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Rubber-band de borda (resistência progressiva — nada de parede).
 * overshoot: quanto passou do limite · dimension: tamanho do eixo.
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/**
 * Roda uma mola até assentar, chamando onFrame a cada quadro.
 * Retorna cancel() — interromper NÃO volta ao início: o próximo dono
 * do movimento parte do valor/velocidade atuais (interruptibilidade).
 */
export function animateSpring(opts: {
  from: number;
  velocity?: number;
  to: number;
  params: SpringParams;
  onFrame: (value: number) => void;
  onSettle?: () => void;
}): { cancel: () => SpringState } {
  let state: SpringState = { value: opts.from, velocity: opts.velocity ?? 0 };
  let raf = 0;
  let last = performance.now();
  let alive = true;

  const tick = (now: number) => {
    if (!alive) return;
    // dt travado em 32ms — aba oculta/hiccup não explode a integração
    const dt = Math.min((now - last) / 1000, 0.032);
    last = now;
    state = springStep(state, opts.to, opts.params, dt);
    if (springSettled(state, opts.to)) {
      alive = false;
      opts.onFrame(opts.to);
      opts.onSettle?.();
      return;
    }
    opts.onFrame(state.value);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return {
    cancel: () => {
      alive = false;
      cancelAnimationFrame(raf);
      return state;
    },
  };
}
