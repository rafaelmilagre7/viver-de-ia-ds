import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Movimento do DS · espelho em JS da escala de tokens.css
 *
 * O CSS é a fonte (--via-dur-*); estes números existem só pra quem anima
 * em JS (fade de reduced-motion via WAAPI, FLIP de pilha). O teste
 * motion.test.ts quebra se derivarem.
 */
export const DUR = {
  press: 100,
  quick: 160,
  base: 220,
  panel: 320,
  page: 400,
} as const;

/** Curvas (mesmos valores de --via-ease-*) pra Web Animations */
export const EASE = {
  enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  snap: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
} as const;

/** Usuário pediu menos movimento? (false fora do browser) */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/* ---------- Animações em curso ---------- */

type AnimatableEl = Element & { getAnimations?: Element['getAnimations'] };

/** Animações finitas rodando no elemento (e filhos) · [] sem Web Animations */
export function runningAnimations(el: Element | null, subtree = true): Animation[] {
  const node = el as AnimatableEl | null;
  if (!node || typeof node.getAnimations !== 'function') return [];
  return node.getAnimations({ subtree }).filter((a) => {
    if (a.playState !== 'running' && !a.pending) return false;
    const end = a.effect?.getComputedTiming().endTime;
    return typeof end === 'number' && Number.isFinite(end);
  });
}

/**
 * Roda `fn` com as animações do elemento paradas no FIM (medir o
 * retângulo final de um popup que ainda está entrando em escala .97) e
 * devolve tudo ao ponto onde estava. Síncrono: nenhum quadro é pintado
 * no meio, então a entrada segue do mesmo lugar.
 */
export function measureAtRest<T>(el: Element | null, fn: () => T): T {
  const anims = runningAnimations(el, false);
  const saved = anims.map((a) => a.currentTime);
  for (const a of anims) {
    const end = a.effect?.getComputedTiming().endTime;
    if (typeof end === 'number') a.currentTime = end;
  }
  try {
    return fn();
  } finally {
    anims.forEach((a, i) => {
      a.currentTime = saved[i];
    });
  }
}

/* ---------- Presença (entra → fica → sai animado → desmonta) ---------- */

export type PresenceState = 'open' | 'closed';

/** Teto de segurança: nenhuma saída segura o elemento montado mais que isso */
const EXIT_CAP = 1000;

/**
 * usePresence · mantém a camada montada durante a SAÍDA
 *
 * `open` vira false → `state` passa a 'closed' (o CSS anima a saída por
 * `[data-state='closed']`) e o elemento só desmonta quando as animações
 * dele terminam. Reabrir no meio da saída volta a 'open' com o elemento
 * ainda montado: a transição de CSS reverte do ponto ATUAL (interruptível,
 * nada recomeça do zero).
 *
 * Sem animação rodando (reduced-motion zerado, display: none, ambiente
 * sem Web Animations) desmonta na hora — mesmo critério do Presence do
 * Radix. A entrada é do CSS (`@starting-style`), sem custo de JS.
 */
export function usePresence(open: boolean, ref: RefObject<Element | null>) {
  const [mounted, setMounted] = useState(open);
  // Abrir monta no MESMO render (sem quadro vazio): ajuste em render-phase
  if (open && !mounted) setMounted(true);

  useLayoutEffect(() => {
    if (open || !mounted) return;
    // reabriu ou desmontou antes do fim: esta saída não manda mais
    let stale = false;
    const done = () => {
      if (!stale) setMounted(false);
    };
    // getAnimations() resolve o estilo: a transição de [data-state=closed]
    // já existe aqui, antes da 1ª pintura da saída
    const anims = runningAnimations(ref.current);
    if (anims.length === 0) {
      done();
      return;
    }
    const cap = setTimeout(done, EXIT_CAP);
    // Transição revertida (reabriu) rejeita `finished` — allSettled engole
    Promise.allSettled(anims.map((a) => a.finished)).then(() => {
      clearTimeout(cap);
      done();
    });
    return () => {
      stale = true;
      clearTimeout(cap);
    };
  }, [open, mounted, ref]);

  const state: PresenceState = open ? 'open' : 'closed';
  return { mounted: mounted || open, state, closing: !open && mounted };
}

/* ---------- FLIP (layout que muda vira transform) ---------- */

/**
 * Anima `el` do retângulo antigo pro atual só com transform/translate.
 * `dx/dy` = posição antiga − nova; `sx` = largura antiga / nova.
 * Interrompível: se já havia um FLIP rodando, parte do ponto visível dele.
 * Usa a propriedade `translate` (não `transform`) pra compor com gestos
 * que já movem o elemento por `transform`.
 */
export function flipFrom(
  el: HTMLElement,
  { dx = 0, dy = 0 }: { dx?: number; dy?: number },
  { duration = DUR.base, easing = EASE.enter }: { duration?: number; easing?: string } = {},
): void {
  if (typeof el.animate !== 'function' || prefersReducedMotion()) return;
  // FLIP anterior ainda andando: soma o deslocamento que ele mostra agora
  const prev = el.getAnimations?.().filter((a) => a.id === 'via-flip') ?? [];
  if (prev.length) {
    const cur = getComputedStyle(el).translate;
    const [cx = '0', cy = '0'] = cur === 'none' ? [] : cur.split(' ');
    dx += parseFloat(cx) || 0;
    dy += parseFloat(cy) || 0;
    prev.forEach((a) => a.cancel());
  }
  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
  const anim = el.animate(
    [{ translate: `${dx}px ${dy}px` }, { translate: '0px 0px' }],
    { duration, easing },
  );
  anim.id = 'via-flip';
}

/* ---------- View Transitions (tema) ---------- */

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Troca de estado global (tema) com crossfade da página inteira.
 * Liga `className` no <html> durante a troca — o CSS dela desliga as
 * transições por elemento (senão cada um troca de cor no seu tempo).
 * Sem View Transitions ou com reduced-motion: troca seca, sem rasgo.
 */
export function withViewTransition(update: () => void, className = 'via-theme-swap'): void {
  if (typeof document === 'undefined') {
    update();
    return;
  }
  const root = document.documentElement;
  const doc = document as DocWithVT;
  root.classList.add(className);
  const release = () => root.classList.remove(className);
  if (typeof doc.startViewTransition !== 'function' || prefersReducedMotion()) {
    update();
    // um quadro com transição desligada basta pra troca não animar
    requestAnimationFrame(() => requestAnimationFrame(release));
    return;
  }
  doc.startViewTransition(update).finished.then(release, release);
}
