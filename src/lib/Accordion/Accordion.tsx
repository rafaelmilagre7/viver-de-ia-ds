import { useState, useId, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
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

  return (
    <div className={`via-accordion via-accordion--${variant} ${className}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id} className={`via-accordion__item ${isOpen ? 'is-open' : ''} ${item.disabled ? 'is-disabled' : ''}`}>
            <h3 className="via-accordion__heading">
              <button
                type="button"
                id={triggerId}
                className="via-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => !item.disabled && toggle(item.id)}
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
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="via-accordion__panel"
              hidden={!isOpen}
            >
              <div className="via-accordion__content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
