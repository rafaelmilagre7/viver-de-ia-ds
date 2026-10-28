import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from 'react';

/**
 * Camada de overlay compartilhada · tudo que flutua no DS passa por aqui.
 *
 * - Portal no <body> (componente em ./Portal) — nada é cortado por
 *   `overflow: hidden` ou preso num ancestral com backdrop-filter/transform.
 * - Pilha de Escape: só a camada do TOPO fecha (Select dentro de Modal fecha
 *   o Select; o Modal continua aberto).
 * - Trava de scroll com contagem: Sheet aberto de dentro de um Modal não
 *   destrava a página ao fechar.
 * - Fechar ao perder o foco / clique fora, e posição ancorada no trigger com
 *   flip/shift simples pra não sair da tela.
 */

/** Focáveis por Tab (mesmo critério do useDialogFocus) */
export const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ---------- SSR ---------- */

const noopSubscribe = () => () => {};

/** false no servidor e na hidratação; true no cliente (portal só depois disso) */
export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/* ---------- Pilha de Escape ---------- */

export interface OverlayLayer {
  parent: OverlayLayer | null;
  onEscape: (e: KeyboardEvent) => void;
}

/** Camada dona do conteúdo renderizado dentro de um portal (o Portal provê) */
export const LayerContext = createContext<OverlayLayer | null>(null);

const stack: OverlayLayer[] = [];

const isAncestor = (a: OverlayLayer, b: OverlayLayer) => {
  for (let p = b.parent; p; p = p.parent) if (p === a) return true;
  return false;
};

function onStackKeyDown(e: KeyboardEvent) {
  if (e.key !== 'Escape' || e.defaultPrevented) return;
  // Topo = a última camada aberta que não tem filha aberta (filha monta antes
  // da mãe quando as duas abrem juntas — por isso a ordem sozinha não basta)
  for (let i = stack.length - 1; i >= 0; i--) {
    const layer = stack[i];
    if (stack.some((o) => o !== layer && isAncestor(layer, o))) continue;
    layer.onEscape(e);
    return;
  }
}

/**
 * Registra a camada na pilha de Escape enquanto `open`.
 * Devolve a camada — passe pro <Portal layer> pra filhos saberem quem é a mãe.
 */
export function useEscapeLayer(open: boolean, onEscape: (e: KeyboardEvent) => void) {
  const parent = useContext(LayerContext);
  const handler = useRef(onEscape);
  useEffect(() => {
    handler.current = onEscape;
  });
  const layer = useMemo<OverlayLayer>(
    () => ({ parent, onEscape: (e) => handler.current(e) }),
    [parent],
  );
  useEffect(() => {
    if (!open) return;
    stack.push(layer);
    if (stack.length === 1) document.addEventListener('keydown', onStackKeyDown);
    return () => {
      const i = stack.indexOf(layer);
      if (i >= 0) stack.splice(i, 1);
      if (stack.length === 0) document.removeEventListener('keydown', onStackKeyDown);
    };
  }, [open, layer]);
  return layer;
}

/* ---------- Trava de scroll (contada) ---------- */

let locks = 0;
let savedOverflow = '';

/** Trava o scroll do body enquanto `active`; a última a soltar restaura o valor anterior */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (locks++ === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (--locks === 0) document.body.style.overflow = savedOverflow;
    };
  }, [active]);
}

/* ---------- Fechar por clique fora / foco fora ---------- */

/**
 * Chama `onDismiss` quando o ponteiro desce ou o foco entra FORA de todos os
 * `refs` (trigger + popup em portal).
 */
export function useDismiss(
  open: boolean,
  refs: Array<RefObject<HTMLElement | null>>,
  onDismiss: () => void,
  { pointer = true, focus = true }: { pointer?: boolean; focus?: boolean } = {},
) {
  const handler = useRef(onDismiss);
  const refsRef = useRef(refs);
  useEffect(() => {
    handler.current = onDismiss;
    refsRef.current = refs;
  });
  useEffect(() => {
    if (!open) return;
    const outside = (e: Event) => {
      const t = e.target as Node | null;
      return !!t && !refsRef.current.some((r) => r.current?.contains(t));
    };
    const onDown = (e: MouseEvent) => {
      if (outside(e)) handler.current();
    };
    const onFocusIn = (e: FocusEvent) => {
      if (outside(e)) handler.current();
    };
    if (pointer) document.addEventListener('mousedown', onDown);
    if (focus) document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [open, pointer, focus]);
}

/* ---------- Posição ancorada (flip/shift) ---------- */

const MARGIN = 8; // respiro mínimo até a borda da viewport

/**
 * Cola a caixa `boxRef` (position: fixed) em cima do retângulo de `anchorRef`.
 * O popup (1º filho da caixa) mantém o CSS de sempre (top: 100%, left: 50%…),
 * então o desenho é idêntico ao de antes do portal. Se ele sair da viewport,
 * a caixa é deslocada: vira pro outro lado (flip) e/ou desliza (shift).
 */
export function useAnchorPosition(
  anchorRef: RefObject<HTMLElement | null>,
  boxRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const box = boxRef.current;
    const anchor = anchorRef.current;
    if (!box || !anchor) return;

    let rel = { x: 0, y: 0, w: 0, h: 0 };
    const measure = () => {
      const pop = box.firstElementChild;
      if (!pop) return;
      const b = box.getBoundingClientRect();
      const p = pop.getBoundingClientRect();
      rel = { x: p.left - b.left, y: p.top - b.top, w: p.width, h: p.height };
    };

    const place = () => {
      const a = anchor.getBoundingClientRect();
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const vh = document.documentElement.clientHeight || window.innerHeight;
      const { w, h } = rel;
      const px = a.left + rel.x;
      const py = a.top + rel.y;
      let dx = 0;
      let dy = 0;
      const below = py >= a.bottom - 1;
      const above = py + h <= a.top + 1;
      const beside = px >= a.right - 1 || px + w <= a.left + 1;

      // Flip vertical: abaixo e não cabe → acima (se lá couber ou tiver mais espaço)
      if (below && py + h > vh - MARGIN) {
        const up = a.top - (py - a.bottom) - h;
        if (up >= MARGIN || a.top > vh - a.bottom) dy = up - py;
      } else if (above && py < MARGIN) {
        const down = a.bottom + (a.top - (py + h));
        if (down + h <= vh - MARGIN || vh - a.bottom > a.top) dy = down - py;
      }
      // Flip horizontal (popups laterais)
      if (px >= a.right - 1 && px + w > vw - MARGIN) {
        const left = a.left - (px - a.right) - w;
        if (left >= MARGIN) dx = left - px;
      } else if (px + w <= a.left + 1 && px < MARGIN) {
        const right = a.right + (a.left - (px + w));
        if (right + w <= vw - MARGIN) dx = right - px;
      }
      // Shift: desliza pra dentro da viewport no eixo cruzado
      if (!beside) {
        if (px + dx + w > vw - MARGIN) dx = vw - MARGIN - w - px;
        if (px + dx < MARGIN) dx = MARGIN - px;
      }
      if (beside) {
        if (py + dy + h > vh - MARGIN) dy = vh - MARGIN - h - py;
        if (py + dy < MARGIN) dy = MARGIN - py;
      }

      box.style.top = `${a.top + dy}px`;
      box.style.left = `${a.left + dx}px`;
      box.style.width = `${a.width}px`;
      box.style.height = `${a.height}px`;
    };

    // 1ª medida com a animação de entrada desligada (escala/translate dela
    // distorceria o retângulo). Ainda não houve pintura → religar é invisível.
    const pop = box.firstElementChild as HTMLElement | null;
    const a0 = anchor.getBoundingClientRect();
    box.style.top = `${a0.top}px`;
    box.style.left = `${a0.left}px`;
    box.style.width = `${a0.width}px`;
    box.style.height = `${a0.height}px`;
    const prevAnimation = pop?.style.animation ?? '';
    if (pop) pop.style.animation = 'none';
    measure();
    if (pop) pop.style.animation = prevAnimation;
    place();

    const onMove = () => place();
    window.addEventListener('scroll', onMove, { capture: true, passive: true });
    window.addEventListener('resize', onMove);
    // Conteúdo que muda de tamanho (lista filtrada) re-mede. A 1ª chamada do
    // observer chega durante a entrada animada — ignorada.
    let first = true;
    const ro =
      typeof ResizeObserver !== 'undefined' && pop
        ? new ResizeObserver(() => {
            if (first) {
              first = false;
              return;
            }
            measure();
            place();
          })
        : null;
    if (pop) ro?.observe(pop);
    return () => {
      window.removeEventListener('scroll', onMove, { capture: true });
      window.removeEventListener('resize', onMove);
      ro?.disconnect();
    };
  }, [anchorRef, boxRef]);
}

/* ---------- Ordem de Tab com portal ---------- */

const tabbables = (root: ParentNode) =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (n) => !n.hasAttribute('hidden') && !n.closest('[hidden], [inert]'),
  );

/**
 * O popup mora no fim do <body>, longe do trigger. Pra Tab seguir a ordem
 * visual: Tab no trigger entra no popup · Shift+Tab no 1º item volta pro
 * trigger · Tab no último sai pro próximo focável depois do trigger.
 */
export function bridgeTab(
  e: { key: string; shiftKey: boolean; target: EventTarget; preventDefault: () => void },
  trigger: HTMLElement | null,
  panel: HTMLElement | null,
) {
  if (e.key !== 'Tab' || !trigger || !panel) return;
  const items = tabbables(panel);
  if (items.length === 0) return;
  const t = e.target as Node;
  if (!e.shiftKey && (t === trigger || trigger.contains(t))) {
    e.preventDefault();
    items[0].focus();
  } else if (e.shiftKey && t === items[0]) {
    e.preventDefault();
    trigger.focus();
  } else if (!e.shiftKey && t === items[items.length - 1]) {
    const next = tabbables(document).find(
      (n) =>
        trigger.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING &&
        !trigger.contains(n) &&
        !panel.contains(n) &&
        !n.closest('[data-via-portal]'),
    );
    e.preventDefault();
    (next ?? trigger).focus();
  }
}
