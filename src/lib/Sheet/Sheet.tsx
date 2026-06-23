import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
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
 * no topo · gesture-hint visual.
 *
 * @example
 * <Sheet open={open} onClose={close} title="Filtros">
 *   <FilterContent />
 * </Sheet>
 */
export function Sheet({
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
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Move focus into the sheet on open and return it to the originating
  // element once closed (focus return).
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const sheet = sheetRef.current;
    const focusable = sheet?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    (focusable ?? sheet)?.focus();
    return () => {
      restoreFocusRef.current?.focus?.();
      restoreFocusRef.current = null;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="via-sheet-root" role="presentation">
      <div className="via-sheet-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={sheetRef}
        className="via-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
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
              onClick={onClose}
              aria-label="Fechar"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          </header>
        )}
        <div className="via-sheet__body">{children}</div>
        {footer && <footer className="via-sheet__foot">{footer}</footer>}
      </div>
    </div>
  );
}
