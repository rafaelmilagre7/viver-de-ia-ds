import { useState, useRef, useEffect, useCallback, type ReactNode, type UIEvent } from 'react';
import './VirtualList.css';

export interface VirtualListProps<T> {
  /** Array de items */
  items: T[];
  /** Altura fixa de cada item em px · default 48 */
  itemHeight?: number;
  /** Altura do container · default 400 */
  height?: number;
  /** Buffer de items renderizados além do visível · default 5 */
  overscan?: number;
  /** Render function de cada item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Label ARIA */
  label?: string;
  /** Estado vazio */
  emptyState?: ReactNode;
}

/**
 * `<VirtualList>` · lista performática pra 10000+ items
 *
 * Renderiza apenas items visíveis + buffer (overscan). Suporta scroll suave,
 * acessibilidade via role="list" e per-item position absoluto. Use pra:
 * notifications, logs, mensagens, audit trails, busca em massa.
 *
 * @example
 * <VirtualList
 *   items={messages}
 *   itemHeight={64}
 *   height={500}
 *   renderItem={(msg) => <MessageRow message={msg} />}
 * />
 */
export function VirtualList<T>({
  items,
  itemHeight = 48,
  height = 400,
  overscan = 5,
  renderItem,
  label = 'Lista virtual',
  emptyState,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2);
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop);
  }, []);

  useEffect(() => {
    // Reset scroll quando items muda completamente
    if (containerRef.current && scrollTop > totalHeight) {
      containerRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [items.length, totalHeight, scrollTop]);

  if (items.length === 0 && emptyState) {
    return <div className="via-vl via-vl--empty" style={{ height }}>{emptyState}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="via-vl"
      style={{ height }}
      onScroll={handleScroll}
      role="list"
      aria-label={label}
    >
      <div className="via-vl__total" style={{ height: totalHeight }}>
        {visibleItems.map((item, i) => {
          const absoluteIndex = startIndex + i;
          return (
            <div
              key={absoluteIndex}
              role="listitem"
              className="via-vl__item"
              style={{
                position: 'absolute',
                top: absoluteIndex * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              {renderItem(item, absoluteIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
