import { useState, useRef, useCallback, type ReactNode } from 'react';
import './Splitter.css';

export interface SplitterProps {
  /** Painel da esquerda (ou topo) */
  start: ReactNode;
  /** Painel da direita (ou baixo) */
  end: ReactNode;
  /** Orientação · default 'horizontal' (start/end são esquerda/direita) */
  orientation?: 'horizontal' | 'vertical';
  /** Posição inicial em % (0-100) · default 50 */
  defaultSplit?: number;
  /** Posição controlada */
  split?: number;
  onSplitChange?: (pct: number) => void;
  /** Min do painel start em % · default 15 */
  min?: number;
  /** Max do painel start em % · default 85 */
  max?: number;
  /** Label ARIA do handle */
  handleLabel?: string;
}

/**
 * `<Splitter>` · divisor arrastável entre 2 painéis
 *
 * Use pra: editor + preview, sidebar + main, code + console. Drag no handle
 * redimensiona · keyboard arrow keys (esq/dir ou up/down) ajusta 1% por step.
 *
 * @example
 * <Splitter
 *   orientation="horizontal"
 *   defaultSplit={30}
 *   start={<Sidebar />}
 *   end={<MainContent />}
 * />
 */
export function Splitter({
  start,
  end,
  orientation = 'horizontal',
  defaultSplit = 50,
  split: controlledSplit,
  onSplitChange,
  min = 15,
  max = 85,
  handleLabel = 'Redimensionar painéis',
}: SplitterProps) {
  const [internalSplit, setInternalSplit] = useState(defaultSplit);
  const split = controlledSplit ?? internalSplit;
  const containerRef = useRef<HTMLDivElement>(null);

  const setSplit = useCallback((next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    if (controlledSplit === undefined) setInternalSplit(clamped);
    onSplitChange?.(clamped);
  }, [controlledSplit, onSplitChange, min, max]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const onMove = (ev: MouseEvent) => {
      const pos = orientation === 'horizontal'
        ? ((ev.clientX - rect.left) / rect.width) * 100
        : ((ev.clientY - rect.top) / rect.height) * 100;
      setSplit(pos);
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 5 : 1;
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setSplit(split - step); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setSplit(split + step); }
    } else {
      if (e.key === 'ArrowUp') { e.preventDefault(); setSplit(split - step); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSplit(split + step); }
    }
    if (e.key === 'Home') { e.preventDefault(); setSplit(min); }
    if (e.key === 'End') { e.preventDefault(); setSplit(max); }
  };

  const startStyle = orientation === 'horizontal'
    ? { width: `${split}%` }
    : { height: `${split}%` };

  const endStyle = orientation === 'horizontal'
    ? { width: `${100 - split}%` }
    : { height: `${100 - split}%` };

  return (
    <div
      ref={containerRef}
      className={`via-splitter via-splitter--${orientation}`}
    >
      <div className="via-splitter__pane" style={startStyle}>
        {start}
      </div>
      <button
        type="button"
        className="via-splitter__handle"
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        role="separator"
        aria-orientation={orientation}
        aria-label={handleLabel}
        aria-valuenow={split}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        <span className="via-splitter__grip" aria-hidden="true" />
      </button>
      <div className="via-splitter__pane" style={endStyle}>
        {end}
      </div>
    </div>
  );
}
