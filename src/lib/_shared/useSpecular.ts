import { useCallback, useRef, type Ref } from 'react';

/**
 * Reflexo que segue o ponteiro (vidro líquido · Button e Card hoverable).
 *
 * Escreve --via-mx / --via-my (px, relativos ao elemento) e o CSS de
 * `_shared/material.css` move o ::before por transform. Regras:
 *   · só mouse — toque e caneta não têm "hover" (pointerType !== 'mouse' sai)
 *   · nada sob prefers-reduced-motion nem em ponteiro grosso
 *   · no máximo 1 escrita por quadro (rAF), 1 leitura de layout por quadro
 *
 * Devolve um ref de callback que também alimenta o ref encaminhado do
 * componente (forwardRef) — a API pública não muda.
 */
export function attachSpecular(el: HTMLElement): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduce) return () => {};

  let raf = 0;
  let cx = 0;
  let cy = 0;
  const flush = () => {
    raf = 0;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--via-mx', `${Math.round(cx - r.left)}px`);
    el.style.setProperty('--via-my', `${Math.round(cy - r.top)}px`);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    cx = e.clientX;
    cy = e.clientY;
    if (!raf) raf = requestAnimationFrame(flush);
  };
  el.addEventListener('pointerenter', onMove, { passive: true });
  el.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    el.removeEventListener('pointerenter', onMove);
    el.removeEventListener('pointermove', onMove);
    if (raf) cancelAnimationFrame(raf);
  };
}

/** Repassa o nó pro ref do consumidor (callback ou objeto). */
function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

export function useSpecular<T extends HTMLElement>(forwarded?: Ref<T>, enabled = true) {
  const detach = useRef<(() => void) | null>(null);
  return useCallback(
    (node: T | null) => {
      detach.current?.();
      detach.current = node && enabled ? attachSpecular(node) : null;
      assignRef(forwarded, node);
    },
    [forwarded, enabled],
  );
}
