import { useEffect, useRef, useCallback, useState } from 'react';
import {
  animateSpring,
  project,
  rubberband,
  SPRING,
  type SpringParams,
} from './spring';

/**
 * useDragDismiss · gesto canônico de "arrasta pra fechar" (WWDC Fluid Interfaces)
 *
 * O que ele garante:
 * 1:1 — o painel gruda no ponteiro respeitando ONDE foi agarrado;
 * histerese ~10px antes de virar drag (clique continua clique);
 * velocidade medida numa janela curta (não só o último evento);
 * na soltura, PROJETA o momentum (não olha só a posição) pra decidir
 * fechar × voltar; a mola recebe a velocidade do dedo (sem emenda);
 * rubber-band no sentido contrário; agarrar no meio da animação
 * INTERROMPE e re-captura do valor vivo; reduced-motion fecha seco.
 *
 * O componente chama `close()` (X/ESC/scrim) pra sair ANIMADO pela
 * mesma física — saída e gesto compartilham o mesmo motor.
 *
 * Callbacks vivem em ref: o consumidor passa arrow inline (identidade nova a
 * cada render) e um re-render do pai no meio da saída NÃO pode cancelar a
 * mola. Se depois do `onDismiss` o painel continua montado (o consumidor
 * vetou o fechamento), ele volta pro lugar — nada de scrim invisível
 * bloqueando a página.
 */

const HYSTERESIS = 10; // px antes de assumir que é drag
const VELOCITY_WINDOW = 100; // ms de histórico pra velocidade

export interface DragDismissOptions {
  /** Painel que anda (transform vai nele) */
  panelRef: React.RefObject<HTMLElement | null>;
  /** Eixo do gesto */
  axis: 'x' | 'y';
  /** Sentido que FECHA: +1 = direita/baixo · -1 = esquerda/cima */
  dir: 1 | -1;
  /** Gesto ligado? (default true) */
  enabled?: boolean;
  /** Chamado quando o painel terminou de sair da tela */
  onDismiss: () => void;
  /** Veta o início do gesto (ex.: corpo rolável fora do topo) */
  canStart?: (e: PointerEvent) => boolean;
  /** Parâmetros da mola (default: sheet da Apple — damping .8, response .3) */
  spring?: SpringParams;
  /** Scrim que acompanha (opacidade 1→0 conforme sai) */
  scrimRef?: React.RefObject<HTMLElement | null>;
  /** Chamado quando o consumidor manteve aberto após o onDismiss (painel voltou) */
  onKeptOpen?: () => void;
}

export function useDragDismiss({
  panelRef,
  axis,
  dir,
  enabled = true,
  onDismiss,
  canStart,
  spring = SPRING.sheet,
  scrimRef,
  onKeptOpen,
}: DragDismissOptions) {
  const anim = useRef<{ cancel: () => { value: number; velocity: number } } | null>(null);
  const offset = useRef(0); // deslocamento atual do painel (px, no eixo)
  const reduced = useRef(false);

  // Identidade instável do consumidor não re-cria close() nem re-assina o gesto
  const onDismissRef = useRef(onDismiss);
  const canStartRef = useRef(canStart);
  const onKeptOpenRef = useRef(onKeptOpen);
  useEffect(() => {
    onDismissRef.current = onDismiss;
    canStartRef.current = canStart;
    onKeptOpenRef.current = onKeptOpen;
  });

  // Conta saídas concluídas: se o efeito abaixo roda, o painel sobreviveu ao onDismiss
  const [dismissals, setDismissals] = useState(0);
  const handledDismissals = useRef(0);
  const dismiss = useCallback(() => {
    onDismissRef.current();
    setDismissals((n) => n + 1);
  }, []);

  const travel = useCallback(() => {
    const el = panelRef.current;
    if (!el) return 1;
    return axis === 'x' ? el.offsetWidth : el.offsetHeight;
  }, [panelRef, axis]);

  const paint = useCallback(
    (v: number) => {
      offset.current = v;
      const el = panelRef.current;
      if (el) el.style.transform = axis === 'x' ? `translateX(${v}px)` : `translateY(${v}px)`;
      const scrim = scrimRef?.current;
      // Pintura imperativa por frame é o propósito do motor (fora do render do React)
      // eslint-disable-next-line react-hooks/immutability
      if (scrim) scrim.style.opacity = String(Math.max(0, 1 - Math.abs(v) / travel()));
    },
    [panelRef, scrimRef, axis, travel],
  );

  /** Sai animado pela mola (ou seco em reduced-motion) e então desmonta */
  const close = useCallback(
    (velocity = 0) => {
      anim.current?.cancel();
      if (reduced.current) {
        dismiss();
        return;
      }
      anim.current = animateSpring({
        from: offset.current,
        velocity,
        to: dir * travel(),
        params: spring,
        onFrame: paint,
        onSettle: dismiss,
      });
    },
    [dir, travel, spring, paint, dismiss],
  );

  // Consumidor vetou (open continua true): o painel volta pela mesma mola
  useEffect(() => {
    if (dismissals === handledDismissals.current) return;
    handledDismissals.current = dismissals;
    anim.current?.cancel();
    if (reduced.current) {
      paint(0);
    } else {
      anim.current = animateSpring({ from: offset.current, to: 0, params: spring, onFrame: paint });
    }
    onKeptOpenRef.current?.();
  }, [dismissals, paint, spring]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || !enabled) return;
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let tracking = false; // ponteiro no ar sobre o painel
    let dragging = false; // passou da histerese — é drag de verdade
    let startPos = 0; // posição do ponteiro no início
    let startOffset = 0; // offset do painel no início (re-grab no meio da mola)
    let history: Array<{ p: number; t: number }> = [];

    const pos = (e: PointerEvent) => (axis === 'x' ? e.clientX : e.clientY);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (canStartRef.current && !canStartRef.current(e)) return;
      // Interruptibilidade: agarrar no meio da animação re-captura do valor VIVO
      const live = anim.current?.cancel();
      anim.current = null;
      startOffset = live ? live.value : offset.current;
      tracking = true;
      dragging = false;
      startPos = pos(e);
      history = [{ p: startPos, t: e.timeStamp }];
    };

    const onMove = (e: PointerEvent) => {
      if (!tracking) return;
      const p = pos(e);
      history.push({ p, t: e.timeStamp });
      while (history.length > 2 && e.timeStamp - history[0].t > VELOCITY_WINDOW) history.shift();

      const delta = p - startPos;
      if (!dragging) {
        if (Math.abs(delta) < HYSTERESIS) return;
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.style.transition = 'none';
        el.style.animation = 'none'; // congela entrada CSS se agarrou no meio
      }
      const raw = startOffset + delta;
      // Sentido que fecha segue 1:1 · contrário resiste (rubber-band)
      const v = raw * dir >= 0 ? raw : dir * -rubberband(Math.abs(raw), travel());
      paint(v);
      e.preventDefault();
    };

    const onUp = () => {
      if (!tracking) return;
      tracking = false;
      if (!dragging) return;
      dragging = false;

      // Velocidade da janela (px/s), não do último par de eventos
      const a = history[0];
      const b = history[history.length - 1];
      const dt = b.t - a.t;
      const velocity = dt > 0 ? ((b.p - a.p) / dt) * 1000 : 0;

      // Decide pelo DESTINO projetado do momentum, não pela posição da soltura
      const projected = offset.current + project(velocity);
      const shouldClose = projected * dir > travel() / 2;

      if (shouldClose) {
        close(velocity);
      } else {
        // Volta pro lugar carregando a velocidade do dedo (sem emenda)
        anim.current = animateSpring({
          from: offset.current,
          velocity,
          to: 0,
          params: spring,
          onFrame: paint,
        });
      }
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      anim.current?.cancel();
    };
  }, [panelRef, enabled, axis, dir, spring, paint, close, travel]);

  return { close };
}
