import { useCallback, useEffect, useRef, useId, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useDragDismiss } from '../_shared/useDragDismiss';
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
 * Drawer · sheet lateral · acessível · ESC fecha · scrim clicável ·
 * arrasto-pra-fechar (spring física) · saída animada em X/ESC/scrim
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

export function Drawer(props: DrawerProps) {
  // Painel monta do zero a cada abertura — o estado do gesto (offset vivo
  // da mola) não pode vazar de um ciclo de abre/fecha pro outro
  if (!props.open) return null;
  return <DrawerPanel {...props} />;
}

function DrawerPanel({
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
  const scrimRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Quem tinha o foco antes do drawer abrir — pra devolver ao fechar
  const prevFocusRef = useRef<HTMLElement | null>(null);
  // Saída já em andamento — pedido repetido (ESC segurado) não reinicia a mola
  const closingRef = useRef(false);

  // onClose vive num ref: identidade instável do consumidor (arrow inline)
  // não pode re-assinar os listeners do gesto no meio da animação
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const handleDismiss = useCallback(() => onCloseRef.current(), []);

  const axis = side === 'bottom' ? 'y' : 'x';
  const dir = side === 'left' ? -1 : 1;

  // Veta o gesto quando o agarre nasce dentro de conteúdo que rola no eixo dele
  const canStart = useCallback(
    (e: PointerEvent) => {
      let node = e.target instanceof HTMLElement ? e.target : null;
      while (node && node !== dialogRef.current) {
        const scrollable =
          axis === 'y'
            ? node.scrollHeight > node.clientHeight
            : node.scrollWidth > node.clientWidth;
        if (scrollable) {
          const style = getComputedStyle(node);
          const overflow = axis === 'y' ? style.overflowY : style.overflowX;
          if (overflow === 'auto' || overflow === 'scroll') return false;
        }
        node = node.parentElement;
      }
      return true;
    },
    [axis],
  );

  const { close } = useDragDismiss({
    panelRef: dialogRef,
    axis,
    dir,
    onDismiss: handleDismiss,
    canStart,
    scrimRef,
  });

  // X/ESC/scrim saem pela mesma mola do gesto; onClose só dispara no settle
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    // Entrada CSS ainda rodando venceria o transform inline da mola
    if (dialogRef.current) dialogRef.current.style.animation = 'none';
    if (scrimRef.current) scrimRef.current.style.animation = 'none';
    close();
  }, [close]);

  // ESC fecha + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && requestClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [requestClose]);

  // Focus return: ao abrir, guarda quem tinha o foco; ao fechar, devolve a ele
  useEffect(() => {
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      prevFocusRef.current?.focus?.();
    };
  }, []);

  // Focus first focusable on open
  useEffect(() => {
    if (!dialogRef.current) return;
    const focusable = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE);
    focusable?.focus();
  }, []);

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

  return (
    <div className="via-drawer-root" role="presentation">
      <div ref={scrimRef} className="via-drawer-scrim" onClick={requestClose} aria-hidden="true" />
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
                onClick={requestClose}
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
