import { useCallback, useEffect, useRef, useId, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useDragDismiss } from '../_shared/useDragDismiss';
import { trapTab } from '../_shared/useDialogFocus';
import { FOCUSABLE, useEscapeLayer, useScrollLock } from '../_shared/overlay';
import { Portal } from '../_shared/Portal';
import '../_shared/material.css';
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
 * arrasto-pra-fechar (spring física). Entrada (vinda de 100% da borda),
 * saída em X/ESC/scrim, gesto e fechamento de fora (`open` → false) andam
 * na MESMA mola — agarrar no meio da entrada segue do ponto vivo.
 *
 * @example
 * <Drawer open={open} onClose={() => setOpen(false)} side="right" title="Filtros">
 *   <Checkbox label="Apenas ao vivo" />
 *   <RadioGroup options={...} />
 * </Drawer>
 */
export function Drawer(props: DrawerProps) {
  // Painel monta do zero a cada abertura — o estado do gesto (offset vivo
  // da mola) não pode vazar de um ciclo de abre/fecha pro outro — e fica
  // montado durante a saída quando o consumidor fecha de fora
  const [present, setPresent] = useState(props.open);
  if (props.open && !present) setPresent(true);
  if (!present && !props.open) return null;
  return <DrawerPanel {...props} onExited={() => setPresent(false)} />;
}

function DrawerPanel({
  open,
  onClose,
  onExited,
  side = 'right',
  size = 'md',
  title,
  description,
  children,
  footer,
  hideClose = false,
}: DrawerProps & { onExited: () => void }) {
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

  const { close, exit, show } = useDragDismiss({
    panelRef: dialogRef,
    axis,
    dir,
    enabled: open,
    onDismiss: handleDismiss,
    canStart,
    scrimRef,
    open,
    enter: true,
    // Consumidor manteve `open` (ex.: "alterações não salvas"): painel voltou,
    // próximo pedido de fechar tem que valer de novo
    onKeptOpen: () => {
      closingRef.current = false;
    },
  });

  // X/ESC/scrim saem pela mesma mola do gesto; onClose só dispara no settle
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    close();
  }, [close]);

  // Fechado DE FORA (open → false sem X/ESC/gesto): mesma mola, sem chamar
  // onClose de novo; reabrir no meio da saída volta pela mola
  const onExitedRef = useRef(onExited);
  useEffect(() => {
    onExitedRef.current = onExited;
  });
  const wasOpen = useRef(open);
  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) {
      closingRef.current = false;
      show();
    } else {
      exit(() => onExitedRef.current());
    }
  }, [open, exit, show]);

  // ESC fecha (só se for a camada do topo) + trava o scroll da página
  const layer = useEscapeLayer(open, () => requestClose());
  useScrollLock(open);

  // Foco: ao abrir guarda quem tinha o foco e entra no 1º focável; ao
  // fechar (já no início da saída) ou desmontar, devolve a quem abriu
  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      prevFocusRef.current?.focus?.();
    };
  }, [open]);

  // Focus trap: Tab/Shift+Tab ciclam só entre os focáveis dentro do painel
  const handleKeyDown = (e: React.KeyboardEvent) => trapTab(e, dialogRef.current);

  return (
    <Portal layer={layer}>
      {/* inert na saída de fora: o painel que some não recebe clique nem foco */}
      <div className="via-drawer-root" role="presentation" inert={!open}>
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
    </Portal>
  );
}
