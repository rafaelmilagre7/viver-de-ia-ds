import { useEffect, useRef } from 'react';
import { FOCUSABLE } from './overlay';

/**
 * Tab/Shift+Tab ciclam só entre os focáveis de `container` (trap).
 * Eventos que chegam de um popup em portal aninhado (borbulham pela árvore
 * do React, não pelo DOM) são ignorados — o popup cuida do próprio Tab.
 */
export function trapTab(e: React.KeyboardEvent, container: HTMLElement | null) {
  if (e.key !== 'Tab' || !container) return;
  if (!container.contains(e.target as Node)) return;
  const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
  if (focusables.length === 0) {
    e.preventDefault();
    container.focus();
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  if (e.shiftKey) {
    if (active === first || !container.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else if (active === last || !container.contains(active)) {
    e.preventDefault();
    first.focus();
  }
}

/**
 * useDialogFocus · foco acessível de diálogo modal (WCAG 2.4.3 + dialog pattern)
 *
 * Ao abrir: guarda quem tinha o foco e move o foco pro primeiro focável do
 * diálogo. Enquanto aberto: Tab/Shift+Tab ciclam SÓ dentro do diálogo (trap).
 * Ao fechar: devolve o foco pro elemento que abriu.
 *
 * Uso: aplique `tabIndex={-1}` e `onKeyDown` (retornado) no elemento role="dialog".
 */
export function useDialogFocus(
  open: boolean,
  dialogRef: React.RefObject<HTMLElement | null>,
) {
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Guarda o foco anterior ao abrir; devolve ao fechar
  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      prevFocusRef.current?.focus?.();
    };
  }, [open]);

  // Move o foco pro primeiro focável ao abrir (ou pro próprio diálogo)
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE);
    (focusable ?? dialogRef.current).focus();
  }, [open, dialogRef]);

  const onKeyDown = (e: React.KeyboardEvent) => trapTab(e, dialogRef.current);

  return { onKeyDown };
}
