import { useRef, useId, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from '../_shared/useDialogFocus';
import { useEscapeLayer, useScrollLock } from '../_shared/overlay';
import { usePresence } from '../_shared/motion';
import { Portal } from '../_shared/Portal';
import '../_shared/material.css';
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
  /** Renderiza o fundo escurecido · default true */
  scrim?: boolean;
  /** Clicar no fundo fecha · default true · `false` protege formulário com dado não salvo (só X/ESC fecham) */
  dismissOnScrim?: boolean;
}

/**
 * Modal · acessível · ESC fecha · scrim opcional · focus trap básico
 * Renderiza num portal no <body> (nunca preso num card com vidro/overflow).
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
  dismissOnScrim = true,
}: ModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Fica montado durante a saída animada; desmonta quando ela termina
  const { mounted, state, closing } = usePresence(open, rootRef);

  // ESC fecha (só se for a camada do topo) + trava o scroll da página.
  // A trava segue até desmontar: a barra de rolagem voltando no meio do
  // fade empurraria a página por baixo do scrim.
  const layer = useEscapeLayer(open, () => onClose());
  useScrollLock(mounted);

  // Foco acessível: focus-first ao abrir, trap com Tab, restore ao fechar
  // (o foco volta ao trigger já no início da saída)
  const { onKeyDown } = useDialogFocus(open, dialogRef);

  if (!mounted) return null;

  return (
    <Portal layer={layer}>
      {/* inert na saída: o fantasma que some não recebe clique nem foco */}
      <div ref={rootRef} className="via-modal-root" role="presentation" inert={closing}>
        {scrim && (
          <div
            className="via-modal-scrim"
            data-state={state}
            onClick={dismissOnScrim ? onClose : undefined}
            aria-hidden="true"
          />
        )}
        <div
          ref={dialogRef}
          data-state={state}
          className={`via-modal via-modal--${size}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          onKeyDown={onKeyDown}
        >
          {(title || !hideClose) && (
            <header className="via-modal__head">
              <div>
                {title && <h2 id={titleId}>{title}</h2>}
                {description && <p id={descriptionId}>{description}</p>}
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
    </Portal>
  );
}
