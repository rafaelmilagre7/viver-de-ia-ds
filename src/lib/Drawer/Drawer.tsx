import { useEffect, useRef, useId, type ReactNode } from 'react';
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
// Selector dos elementos que recebem foco por Tab dentro do painel
const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const titleId = useId();
  // Quem tinha o foco antes do drawer abrir — pra devolver ao fechar
  const prevFocusRef = useRef<HTMLElement | null>(null);

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

  // Focus return: ao abrir, guarda quem tinha o foco; ao fechar, devolve a ele
  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      prevFocusRef.current?.focus?.();
    };
  }, [open]);

  // Focus first focusable on open
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE);
    focusable?.focus();
  }, [open]);

  // Focus trap: Tab/Shift+Tab ciclam só entre os focáveis dentro do painel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    if (focusables.length === 0) {
      // Sem focáveis: mantém o foco no painel
      e.preventDefault();
      dialogRef.current.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      // Shift+Tab no primeiro (ou foco fora) → vai pro último
      if (active === first || !dialogRef.current.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab no último (ou foco fora) → volta pro primeiro
      if (active === last || !dialogRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!open) return null;

  return (
    <div className="via-drawer-root" role="presentation">
      <div className="via-drawer-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className={`via-drawer via-drawer--${side} via-drawer--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {(title || !hideClose) && (
          <header className="via-drawer__head">
            <div>
              {title && <h2 id={titleId}>{title}</h2>}
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
