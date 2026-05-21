import { useId, useState, type ReactNode } from 'react';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  badge?: ReactNode;
  content: ReactNode;
}

type Variant = 'underline' | 'pills';

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: Variant;
  className?: string;
}

/**
 * Tabs · controlled ou uncontrolled · ARIA tablist · keyboard arrow nav
 *
 * @example
 * <Tabs
 *   items={[
 *     { id: 'overview',  label: 'Visão geral', content: <Overview /> },
 *     { id: 'history',   label: 'Histórico', badge: <Pill>12</Pill>, content: <History /> },
 *   ]}
 * />
 */
export function Tabs({
  items,
  defaultActiveId,
  activeId,
  onChange,
  variant = 'underline',
  className = '',
}: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState<string>(defaultActiveId ?? items[0]?.id ?? '');
  const current = activeId ?? internal;

  const handleSelect = (id: string) => {
    if (activeId === undefined) setInternal(id);
    onChange?.(id);
  };

  const handleKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    handleSelect(items[next].id);
    const btn = document.getElementById(`${baseId}-tab-${items[next].id}`);
    btn?.focus();
  };

  return (
    <div className={`via-tabs via-tabs--${variant} ${className}`}>
      <div role="tablist" className="via-tabs__list">
        {items.map((item, i) => {
          const isActive = item.id === current;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`via-tabs__tab ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKey(e, i)}
            >
              <span>{item.label}</span>
              {item.badge && <span className="via-tabs__badge">{item.badge}</span>}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== current}
          className="via-tabs__panel"
        >
          {item.id === current && item.content}
        </div>
      ))}
    </div>
  );
}
