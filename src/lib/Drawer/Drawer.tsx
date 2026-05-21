import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import './Drawer.css';

type Side = 'right' | 'left' | 'bottom';
type Size = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: Side;
  size?: Size;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  hideClose?: boolean;
}

/**
 * Drawer · sheet lateral · acessível · ESC fecha · scrim clicável
 *
 * @example
 * <Drawer open={open} onClose={() => setOpen(false)} side="right" title="Filtros">
 *   <Checkbox label="Apenas ao vivo" />
 *   <RadioGroup options={...} />
 * </Drawer>
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  size = 'md',
  title,
  description,
  children,
  footer,
  hideClose = false,
}: DrawerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`via-drawer-title-${Math.random().toString(36).slice(2, 7)}`);

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
    <div className="via-drawer-root" role="presentation">
      <div className="via-drawer-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className={`via-drawer via-drawer--${side} via-drawer--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId.current : undefined}
      >
        {(title || !hideClose) && (
          <header className="via-drawer__head">
            <div>
              {title && <h2 id={titleId.current}>{title}</h2>}
              {description && <p>{description}</p>}
            </div>
            {!hideClose && (
              <button
                type="button"
                className="via-drawer__close"
                onClick={onClose}
                aria-label="Fechar drawer"
              >
                <X size={14} strokeWidth={2.2} />
              </button>
            )}
          </header>
        )}
        <div className="via-drawer__body">{children}</div>
        {footer && <footer className="via-drawer__foot">{footer}</footer>}
      </div>
    </div>
  );
}
