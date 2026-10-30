import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePresence } from '../_shared/motion';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | string[];
  /** Se true, vários painéis abertos ao mesmo tempo. Default false (FAQ-style). */
  multiple?: boolean;
  /** Variante visual */
  variant?: 'default' | 'separated';
  className?: string;
}

/**
 * Accordion · expandir/colapsar com keyboard nav
 *
 * @example
 * <Accordion
 *   items={[
 *     { id: 'q1', title: 'Como funciona a mentoria?', content: <p>...</p> },
 *     { id: 'q2', title: 'Posso cancelar?', content: <p>...</p> },
 *   ]}
 * />
 */
export function Accordion({
  items,
  defaultOpen,
  multiple = false,
  variant = 'default',
  className = '',
}: AccordionProps) {
  const baseId = useId();
  const initial = Array.isArray(defaultOpen)
    ? new Set(defaultOpen)
    : defaultOpen
      ? new Set([defaultOpen])
      : new Set<string>();
  const [open, setOpen] = useState<Set<string>>(initial);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  // Painéis abertos no 1º render aparecem prontos; só o que o usuário abre
  // depois anima (o @starting-style do CSS vale só com data-ready)
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rootRef.current) rootRef.current.dataset.ready = '';
  }, []);

  return (
    <div ref={rootRef} className={`via-accordion via-accordion--${variant} ${className}`}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={open.has(item.id)}
          triggerId={`${baseId}-trigger-${item.id}`}
          panelId={`${baseId}-panel-${item.id}`}
          onToggle={() => !item.disabled && toggle(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionRowProps {
  item: AccordionItem;
  isOpen: boolean;
  triggerId: string;
  panelId: string;
  onToggle: () => void;
}

/**
 * Uma linha · o painel abre/fecha a ALTURA de verdade (grid-template-rows
 * 0fr ↔ 1fr): o item de baixo desce/sobe junto, sem salto. Fechar mantém o
 * painel visível em data-state=closed até a transição acabar; só então ele
 * vira `hidden` (fora da árvore de acessibilidade e do Tab).
 */
function AccordionRow({ item, isOpen, triggerId, panelId, onToggle }: AccordionRowProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { mounted, state } = usePresence(isOpen, panelRef);
  return (
    <div className={`via-accordion__item ${isOpen ? 'is-open' : ''} ${item.disabled ? 'is-disabled' : ''}`}>
      <h3 className="via-accordion__heading">
        <button
          type="button"
          id={triggerId}
          className="via-accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={item.disabled}
          onClick={onToggle}
        >
          <span className="via-accordion__title">{item.title}</span>
          <ChevronDown
            className="via-accordion__chevron"
            size={14}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="via-accordion__panel"
        data-state={state}
        hidden={!mounted}
      >
        {/* recorte: item da grade sem padding (o padding entraria no piso da faixa 0fr) */}
        <div className="via-accordion__clip">
          <div className="via-accordion__content">{item.content}</div>
        </div>
      </div>
    </div>
  );
}
