import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from '../_shared/useDialogFocus';
import { useDragDismiss } from '../_shared/useDragDismiss';
import { useEscapeLayer, useScrollLock } from '../_shared/overlay';
import { Portal } from '../_shared/Portal';
import '../_shared/material.css';
import './Sheet.css';

export interface SheetProps {
  /** Aberto / fechado */
  open: boolean;
  /** Callback ao fechar (esc, scrim, X) */
  onClose: () => void;
  /** Título */
  title?: ReactNode;
  /** Descrição opcional sob o título */
  description?: ReactNode;
  /** Conteúdo do corpo */
  children: ReactNode;
  /** Ações no rodapé (botões) */
  footer?: ReactNode;
  /** Altura máxima · default 85vh */
  maxHeight?: string;
  /** Mostra grip handle no topo · default true (sinal de "arrasta pra fechar" mobile) */
  showHandle?: boolean;
  /** Snap points · futuro · não implementado v1 */
  // snapPoints?: number[];
}

/**
 * `<Sheet>` · bottom sheet (mobile-first) semântico
 *
 * Igual a `<Drawer side="bottom">` mas semanticamente "Sheet" pra mobile UX
 * (configurações rápidas, filtros, contextual actions). Vem com handle grip
 * no topo e arrasto-pra-baixo real (física de mola · projeção de momentum).
 * Entrada, saída (X/ESC/scrim), gesto e fechamento de fora (`open` → false)
 * andam na MESMA mola — agarrar no meio da entrada segue do ponto vivo.
 *
 * @example
 * <Sheet open={open} onClose={close} title="Filtros">
 *   <FilterContent />
 * </Sheet>
 */
export function Sheet(props: SheetProps) {
  // Monta do zero a cada ciclo de abertura (o estado do gesto vive em refs e
  // não pode vazar pro próximo ciclo) e fica montado durante a saída de fora
  const [present, setPresent] = useState(props.open);
  if (props.open && !present) setPresent(true);
  if (!present && !props.open) return null;
  return <SheetOpen {...props} onExited={() => setPresent(false)} />;
}

function SheetOpen({
  open,
  onClose,
  onExited,
  title,
  description,
  children,
  footer,
  maxHeight = '85vh',
  showHandle = true,
}: SheetProps & { onExited: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  // Handle e header arrastam SEMPRE; no corpo o gesto só compete com o
  // scroll quando ele está no topo (senão o usuário está rolando conteúdo)
  const canStart = useCallback((e: PointerEvent) => {
    const target = e.target instanceof Element ? e.target : null;
    if (target?.closest('.via-sheet__handle, .via-sheet__head')) return true;
    const body = bodyRef.current;
    return !body || body.scrollTop === 0;
  }, []);

  const { close, exit, show } = useDragDismiss({
    panelRef: sheetRef,
    axis: 'y',
    dir: 1,
    enabled: open,
    onDismiss: onClose,
    canStart,
    scrimRef,
    open,
    enter: true,
  });

  // Saída animada: X/ESC/scrim pedem close(); onClose só dispara quando a mola assenta
  const requestClose = useCallback(() => close(), [close]);

  // Fechado DE FORA (open → false sem passar pelo X/ESC/gesto): mesma mola,
  // sem chamar onClose de novo; reabrir no meio volta pela mola
  const onExitedRef = useRef(onExited);
  useEffect(() => {
    onExitedRef.current = onExited;
  });
  const wasOpen = useRef(open);
  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) show();
    else exit(() => onExitedRef.current());
  }, [open, exit, show]);

  // ESC fecha só se for a camada do topo · e.repeat: ESC segurado não
  // reinicia a mola de saída a cada auto-repeat
  const layer = useEscapeLayer(open, (e) => {
    if (!e.repeat) requestClose();
  });
  // Trava contada: fechar o Sheet aberto de dentro de um Modal não destrava a página
  useScrollLock(open);

  // Foco acessível: focus-first ao abrir, trap com Tab, restore ao fechar
  const { onKeyDown } = useDialogFocus(open, sheetRef);

  return (
    <Portal layer={layer}>
      {/* inert na saída de fora: o painel que some não recebe clique nem foco */}
      <div className="via-sheet-root" role="presentation" inert={!open}>
        <div ref={scrimRef} className="via-sheet-scrim" onClick={requestClose} aria-hidden="true" />
        <div
          ref={sheetRef}
          className="via-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          style={{ maxHeight }}
        >
          {showHandle && <span className="via-sheet__handle" aria-hidden="true" />}
          {(title || description) && (
            <header className="via-sheet__head">
              <div className="via-sheet__head-text">
                {title && <h2 id={titleId}>{title}</h2>}
                {description && <p id={descriptionId}>{description}</p>}
              </div>
              <button
                type="button"
                className="via-sheet__close"
                onClick={requestClose}
                aria-label="Fechar"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </header>
          )}
          <div ref={bodyRef} className="via-sheet__body">{children}</div>
          {footer && <footer className="via-sheet__foot">{footer}</footer>}
        </div>
      </div>
    </Portal>
  );
}
