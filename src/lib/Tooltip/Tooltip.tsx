import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import './Tooltip.css';

type Side = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: Side;
  delay?: number; // ms before showing (default 200)
}

/**
 * Tooltip · editorial wrapper · hover + focus aware · ARIA-described
 *
 * @example
 * <Tooltip content="Adicionar ao calendário" side="top">
 *   <Button iconLeft={<Calendar />} />
 * </Tooltip>
 */
export function Tooltip({ content, children, side = 'top', delay = 200 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tipId = useId();

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <span
      className="via-tooltip-wrap"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={open ? tipId : undefined}
    >
      {children}
      {open && (
        <span
          id={tipId}
          role="tooltip"
          className={`via-tooltip via-tooltip--${side}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
