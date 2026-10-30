import { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import {
  animateSpring,
  project,
  rubberband,
  SPRING,
  type SpringParams,
} from './spring';
import { DUR, EASE, prefersReducedMotion } from './motion';

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
 * INTERROMPE e re-captura do valor vivo.
 *
 * UM motor só: a ENTRADA (`enter`), a saída pedida (`close` · X/ESC/scrim),
 * a saída de fora (`exit` · consumidor fechou) e o gesto andam na mesma
 * mola e no mesmo ref — agarrar no meio da entrada continua do ponto vivo.
 * Reduced-motion: nada desliza; entrada e saída viram crossfade curto.
 *
 * Callbacks vivem em ref: o consumidor passa arrow inline (identidade nova a
 * cada render) e um re-render do pai no meio da saída NÃO pode cancelar a
 * mola. Se depois do `onDismiss` o painel continua aberto (o consumidor
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
  /** Chamado quando o painel terminou de sair da tela (saída pedida pelo usuário) */
  onDismiss: () => void;
  /** Veta o início do gesto (ex.: corpo rolável fora do topo) */
  canStart?: (e: PointerEvent) => boolean;
  /** Parâmetros da mola de saída/gesto (default: sheet da Apple — damping .8, response .3) */
  spring?: SpringParams;
  /** Scrim que acompanha (opacidade 1→0 conforme sai) */
  scrimRef?: React.RefObject<HTMLElement | null>;
  /** Chamado quando o consumidor manteve aberto após o onDismiss (painel voltou) */
  onKeptOpen?: () => void;
  /** O consumidor ainda quer o painel aberto? (default true) — só aí um
   *  onDismiss sem fechamento conta como veto */
  open?: boolean;
  /** Entra pela mola ao montar, vindo de 100% do percurso (default false) */
  enter?: boolean;
  /** Mola da entrada (default SPRING.panel — damping 1, response .35) */
  enterSpring?: SpringParams;
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
  open = true,
  enter = false,
  enterSpring = SPRING.panel,
}: DragDismissOptions) {
  const anim = useRef<{ cancel: () => { value: number; velocity: number } } | null>(null);
  const fades = useRef<Animation[]>([]);
  // trajeto em curso (alvo + mola + fim) — um toque sem arrasto o retoma
  const motion = useRef<{ to: number; params: SpringParams; onSettle?: () => void } | null>(null);
  const offset = useRef(0); // deslocamento atual do painel (px, no eixo)
  const out = useRef(false); // painel já saiu (fora da tela / apagado)

  // Identidade instável do consumidor não re-cria close() nem re-assina o gesto
  const onDismissRef = useRef(onDismiss);
  const canStartRef = useRef(canStart);
  const onKeptOpenRef = useRef(onKeptOpen);
  useEffect(() => {
    onDismissRef.current = onDismiss;
    canStartRef.current = canStart;
    onKeptOpenRef.current = onKeptOpen;
  });

  // Conta saídas concluídas: se o efeito abaixo roda com `open`, foi veto
  const [dismissals, setDismissals] = useState(0);
  const handledDismissals = useRef(0);
  const dismiss = useCallback(() => {
    out.current = true;
    onDismissRef.current();
    setDismissals((n) => n + 1);
  }, []);

  const travel = useCallback(() => {
    const el = panelRef.current;
    if (!el) return 0;
    return axis === 'x' ? el.offsetWidth : el.offsetHeight;
  }, [panelRef, axis]);

  /** A mola assume: transição de CSS no painel brigaria com a pintura por quadro */
  const takeOver = useCallback(() => {
    const el = panelRef.current;
    const scrim = scrimRef?.current;
    if (el) el.style.transition = 'none';
    // estilo imperativo é o propósito do motor (fora do render do React)
    // eslint-disable-next-line react-hooks/immutability
    if (scrim) scrim.style.transition = 'none';
  }, [panelRef, scrimRef]);

  const paint = useCallback(
    (v: number) => {
      offset.current = v;
      const el = panelRef.current;
      if (el) el.style.transform = axis === 'x' ? `translateX(${v}px)` : `translateY(${v}px)`;
      const scrim = scrimRef?.current;
      const t = travel();
      // Pintura imperativa por frame é o propósito do motor (fora do render do React)
      // eslint-disable-next-line react-hooks/immutability
      if (scrim) scrim.style.opacity = String(t > 0 ? Math.max(0, 1 - Math.abs(v) / t) : 1);
    },
    [panelRef, scrimRef, axis, travel],
  );

  /** Roda a mola até `to` e lembra o trajeto (um toque sem arrasto retoma) */
  const run = useCallback(
    (to: number, params: SpringParams, onSettle?: () => void, velocity = 0) => {
      anim.current?.cancel();
      motion.current = { to, params, onSettle };
      anim.current = animateSpring({
        from: offset.current,
        velocity,
        to,
        params,
        onFrame: paint,
        onSettle: () => {
          motion.current = null;
          anim.current = null;
          onSettle?.();
        },
      });
    },
    [paint],
  );

  /** Reduced-motion: crossfade curto (painel + scrim) no lugar do deslize */
  const fade = useCallback(
    (to: 0 | 1, done?: () => void, from?: number) => {
      const els = [panelRef.current, scrimRef?.current].filter(
        (e, i, all): e is HTMLElement => !!e && all.indexOf(e) === i,
      );
      if (els.length === 0 || typeof els[0].animate !== 'function') {
        done?.();
        return;
      }
      // parte da opacidade VISÍVEL (fade anterior no meio) antes de cancelá-lo
      const starts = els.map((e) => from ?? Number(getComputedStyle(e).opacity));
      fades.current.forEach((a) => a.cancel());
      fades.current = els.map((e, i) =>
        e.animate([{ opacity: starts[i] }, { opacity: to }], {
          duration: to ? DUR.base : DUR.quick,
          easing: to ? EASE.enter : EASE.exit,
          fill: 'forwards',
        }),
      );
      Promise.all(fades.current.map((a) => a.finished)).then(
        () => done?.(),
        () => {}, // cancelado (reabriu no meio) — quem cancelou assume
      );
    },
    [panelRef, scrimRef],
  );

  /** Anima até a borda (mola · ou crossfade em reduced-motion) e chama `done` */
  const leave = useCallback(
    (done: () => void, velocity = 0) => {
      anim.current?.cancel();
      anim.current = null;
      if (prefersReducedMotion()) {
        fade(0, done);
        return;
      }
      takeOver();
      run(dir * travel(), spring, done, velocity);
    },
    [fade, travel, takeOver, dir, spring, run],
  );

  /** Sai animado (mola ou crossfade) e então avisa o consumidor (onDismiss) */
  const close = useCallback((velocity = 0) => leave(dismiss, velocity), [leave, dismiss]);

  /**
   * Saída pedida DE FORA (o consumidor já fechou): mesma mola, mas no fim
   * chama `done` em vez do onDismiss. Painel que já saiu termina na hora.
   */
  const exit = useCallback(
    (done: () => void) => {
      if (out.current) {
        anim.current?.cancel();
        anim.current = null;
        motion.current = null;
        done();
        return;
      }
      leave(() => {
        out.current = true;
        done();
      });
    },
    [leave],
  );

  /** Volta pro lugar (reabriu no meio da saída · veto) partindo do valor vivo */
  const show = useCallback(() => {
    out.current = false;
    const live = anim.current?.cancel();
    anim.current = null;
    if (prefersReducedMotion()) {
      paint(0);
      fade(1);
      return;
    }
    fades.current.forEach((a) => a.cancel());
    fades.current = [];
    takeOver();
    if (live) offset.current = live.value;
    run(0, spring, undefined, live ? live.velocity : 0);
  }, [paint, fade, takeOver, spring, run]);

  // ENTRADA pela mola: pintado fora da tela ANTES da 1ª pintura (sem quadro
  // no lugar final) e trazido pra 0 no mesmo ref do gesto — agarrar no meio
  // da entrada interrompe e segue 1:1 do ponto vivo.
  const enterRef = useRef(enter);
  const enterSpringRef = useRef(enterSpring);
  useLayoutEffect(() => {
    if (!enterRef.current || !panelRef.current) return;
    if (prefersReducedMotion()) {
      fade(1, undefined, 0);
      return;
    }
    const t = travel();
    if (t <= 0) return; // sem layout (nada a percorrer)
    takeOver();
    paint(dir * t);
    run(0, enterSpringRef.current);
    return () => {
      anim.current?.cancel();
      anim.current = null;
    };
    // só na montagem: cada ciclo de abertura monta o painel de novo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Consumidor vetou (onDismiss rodou e `open` continua true): volta pela mesma mola
  useEffect(() => {
    if (dismissals === handledDismissals.current) return;
    handledDismissals.current = dismissals;
    if (!open) return; // fechou de verdade — a saída de fora termina o serviço
    show();
    onKeptOpenRef.current?.();
  }, [dismissals, open, show]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || !enabled) return;

    let tracking = false; // ponteiro no ar sobre o painel
    let dragging = false; // passou da histerese — é drag de verdade
    let startPos = 0; // posição do ponteiro no início
    let startOffset = 0; // offset do painel no início (re-grab no meio da mola)
    let history: Array<{ p: number; t: number }> = [];
    // trajeto interrompido pelo toque — se não virar drag, segue de onde parou
    let caught: { to: number; params: SpringParams; onSettle?: () => void } | null = null;

    const pos = (e: PointerEvent) => (axis === 'x' ? e.clientX : e.clientY);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (canStartRef.current && !canStartRef.current(e)) return;
      // Interruptibilidade: agarrar no meio da animação (entrada, saída,
      // volta) re-captura do valor VIVO — o painel para sob o dedo
      const live = anim.current?.cancel();
      anim.current = null;
      caught = live ? motion.current : null;
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
        out.current = false;
        el.setPointerCapture(e.pointerId);
        takeOver();
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
      if (!dragging) {
        // toque sem arrasto no meio de uma animação: ela segue pro mesmo alvo
        if (caught) run(caught.to, caught.params, caught.onSettle);
        caught = null;
        return;
      }
      caught = null;
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
        run(0, spring, undefined, velocity);
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
    };
  }, [panelRef, enabled, axis, dir, spring, paint, close, travel, takeOver, run]);

  // Desmontou: nenhuma mola nem fade fica pintando um nó que não existe
  useEffect(
    () => () => {
      anim.current?.cancel();
      fades.current.forEach((a) => a.cancel());
    },
    [],
  );

  return { close, exit, show };
}
