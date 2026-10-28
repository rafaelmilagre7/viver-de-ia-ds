import { useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { LayerContext, useAnchorPosition, useIsClient, type OverlayLayer } from './overlay';
import './overlay.css';

interface PortalProps {
  children: ReactNode;
  /** Camada dona do conteúdo — filhos que abrirem popups ficam acima dela na pilha de Escape */
  layer?: OverlayLayer | null;
}

/**
 * Portal no <body> · SSR-safe (nada no servidor nem na hidratação).
 * O wrapper `display: contents` não ocupa caixa e marca o conteúdo como
 * camada do DS (`data-via-portal`).
 */
export function Portal({ children, layer }: PortalProps) {
  const isClient = useIsClient();
  if (!isClient) return null;
  return createPortal(
    <LayerContext.Provider value={layer ?? null}>
      <div data-via-portal="" style={{ display: 'contents' }}>
        {children}
      </div>
    </LayerContext.Provider>,
    document.body,
  );
}

type ZLevel = 'dropdown' | 'popover' | 'tooltip';

interface AnchoredProps extends PortalProps {
  /** Elemento que o popup acompanha (o mesmo que antes era o `position: relative` dele) */
  anchorRef: RefObject<HTMLElement | null>;
  /** Nível de camada · vira `z-index: var(--via-z-*)` */
  z: ZLevel;
}

/**
 * Popup ancorado · a caixa fixa copia o retângulo do anchor, então o CSS do
 * popup (top: 100%, left: 50%…) desenha exatamente onde desenhava antes —
 * mas fora de qualquer `overflow: hidden`. Flip/shift em useAnchorPosition.
 */
export function Anchored({ anchorRef, z, layer, children }: AnchoredProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  useAnchorPosition(anchorRef, boxRef);
  return (
    <Portal layer={layer}>
      <div ref={boxRef} className="via-anchor" style={{ zIndex: `var(--via-z-${z})` }}>
        {children}
      </div>
    </Portal>
  );
}
