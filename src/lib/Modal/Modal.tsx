import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

type Size = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: Size;
  children?: ReactNode;
  footer?: ReactNode;
  hideClose?: boolean;
  scrim?: boolean;
}

/**
 * Modal · acessível · ESC fecha · scrim opcional · focus trap básico
 *
 * @example
 * const [open, setOpen] = useState(false);
 * <Modal open={open} onClose={() => setOpen(false)} title="Renovar plano"
 *        footer={<Button onClick={handleConfirm}>Confirmar</Button>}>
 *   <p>Suas próximas 3 cobranças serão de R$ 6.000.</p>
 * </Modal>
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  hideClose = false,
  scrim = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`via-modal-title-${Math.random().toString(36).slice(2, 7)}`);

  // ESC fecha + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Focus first focusable on open
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="via-modal-root" role="presentation">
      {scrim && <div className="via-modal-scrim" onClick={onClose} aria-hidden="true" />}
      <div
        ref={dialogRef}
        className={`via-modal via-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId.current : undefined}
      >
        {(title || !hideClose) && (
          <header className="via-modal__head">
            <div>
              {title && <h2 id={titleId.current}>{title}</h2>}
              {description && <p>{description}</p>}
            </div>
            {!hideClose && (
              <button
                type="button"
                className="via-modal__close"
                onClick={onClose}
                aria-label="Fechar diálogo"
              >
                <X size={14} strokeWidth={2.2} />
              </button>
            )}
          </header>
        )}
        <div className="via-modal__body">{children}</div>
        {footer && <footer className="via-modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}
