import {
  useState,
  useRef,
  useEffect,
  useId,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import { useEscapeLayer } from '../_shared/overlay';
import { Anchored } from '../_shared/Portal';
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
 * trigger ALWAYS (closed, it points at a hidden node with the same text — so the
 * description is announced on focus even before the delay), and Escape anywhere
 * on the page dismisses the open tooltip (WCAG 1.4.13) while focus stays put.
 * The bubble renders in a portal anchored to the trigger (never clipped).
 *
 * @example
 * <Tooltip content="Adicionar ao calendário" side="top">
 *   <Button iconLeft={<Calendar />} />
 * </Tooltip>
 */
export function Tooltip({ content, children, side = 'top', delay = 200 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
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

  // APG tooltip: Escape (document-level, topmost layer) dismisses without
  // moving focus off the trigger.
  const layer = useEscapeLayer(open, hide);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Put aria-describedby on the focusable trigger (not the wrapper span) so
  // assistive tech announces the description when the trigger receives focus.
  let trigger = children;
  if (isValidElement(children)) {
    const child = children as ReactElement<{ 'aria-describedby'?: string }>;
    const existing = child.props['aria-describedby'];
    const describedBy = [existing, tipId].filter(Boolean).join(' ');
    trigger = cloneElement(child, { 'aria-describedby': describedBy });
  }

  return (
    <span
      ref={wrapRef}
      className="via-tooltip-wrap"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {trigger}
      {/* Fechado: mesmo texto num nó oculto — a descrição nunca fica pendurada */}
      {!open && (
        <span id={tipId} hidden>
          {content}
        </span>
      )}
      {open && (
        <Anchored anchorRef={wrapRef} z="tooltip" layer={layer}>
          <span
            id={tipId}
            role="tooltip"
            className={`via-tooltip via-tooltip--${side}`}
          >
            {content}
          </span>
        </Anchored>
      )}
    </span>
  );
}
