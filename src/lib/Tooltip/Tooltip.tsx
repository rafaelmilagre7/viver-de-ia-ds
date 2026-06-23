import {
  useState,
  useRef,
  useEffect,
  useId,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type KeyboardEvent,
} from 'react';
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
 * Follows the WAI-ARIA tooltip pattern: `aria-describedby` lands on the focusable
 * trigger (so screen readers announce the description on focus), and Escape
 * dismisses the tooltip while keeping focus on the trigger.
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

  // APG tooltip: Escape dismisses without moving focus off the trigger.
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      hide();
    }
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Put aria-describedby on the focusable trigger (not the wrapper span) so
  // assistive tech announces the description when the trigger receives focus.
  let trigger = children;
  if (isValidElement(children)) {
    const child = children as ReactElement<{ 'aria-describedby'?: string }>;
    const existing = child.props['aria-describedby'];
    const describedBy = open
      ? [existing, tipId].filter(Boolean).join(' ')
      : existing;
    trigger = cloneElement(child, { 'aria-describedby': describedBy });
  }

  return (
    <span
      className="via-tooltip-wrap"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
    >
      {trigger}
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
