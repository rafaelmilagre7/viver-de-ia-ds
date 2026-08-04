import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from '../_shared/useDialogFocus';
import { useDragDismiss } from '../_shared/useDragDismiss';
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
 * no topo e arrasto-pra-baixo real (física de mola · projeção de momentum);
 * X/ESC/scrim saem animados pela mesma mola.
 *
 * @example
 * <Sheet open={open} onClose={close} title="Filtros">
 *   <FilterContent />
 * </Sheet>
 */
export function Sheet(props: SheetProps) {
  // Remonta por ciclo de abertura: o estado do gesto (offset/velocidade da mola)
  // vive em refs — se o instância sobrevivesse fechada, o próximo close() partiria
  // do offset velho e pularia sem animar
  if (!props.open) return null;
  return <SheetOpen {...props} />;
}

function SheetOpen({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  maxHeight = '85vh',
  showHandle = true,
}: SheetProps) {
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

  const { close } = useDragDismiss({
    panelRef: sheetRef,
    axis: 'y',
    dir: 1,
    enabled: open,
    onDismiss: onClose,
    canStart,
    scrimRef,
  });

  // Saída animada: X/ESC/scrim pedem close(); onClose só dispara quando a mola assenta
  const requestClose = useCallback(() => {
    // Fechar durante a entrada CSS: mola assume sem disputa com a animação
    if (sheetRef.current) sheetRef.current.style.animation = 'none';
    if (scrimRef.current) scrimRef.current.style.animation = 'none';
    close();
  }, [close]);

  useEffect(() => {
    if (!open) return;
    // e.repeat: ESC segurado não reinicia a mola de saída a cada auto-repeat
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !e.repeat) requestClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, requestClose]);

  // Foco acessível: focus-first ao abrir, trap com Tab, restore ao fechar
  const { onKeyDown } = useDialogFocus(open, sheetRef);

  return (
    <div className="via-sheet-root" role="presentation">
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
  );
}
