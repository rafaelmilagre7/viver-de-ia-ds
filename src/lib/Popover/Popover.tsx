import { useEffect, useRef, useId, type ReactNode } from 'react';
import './Popover.css';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

export interface PopoverProps {
  /** Open state · controlled */
  open: boolean;
  /** Called when the popover should close (outside click, ESC, etc.) */
  onOpenChange: (open: boolean) => void;
  /** Trigger element · rendered inline; clicking toggles `open` */
  trigger: ReactNode;
  /** Floating content */
  children: ReactNode;
  /** Preferred side relative to trigger (default `bottom`) */
  side?: Side;
  /** Alignment along the side axis (default `center`) */
  align?: Align;
  /** Close on outside click (default true) */
  closeOnOutsideClick?: boolean;
  /** Close on ESC key (default true) */
  closeOnEscape?: boolean;
  /** Accessible label for the popover region */
  label?: string;
}

/**
 * Popover · floating panel anchored to a trigger.
 * Controlled. Closes on outside click + ESC. Editorial atmosphere.
 *
 * @example
 * const [open, setOpen] = useState(false);
 * <Popover
 *   open={open}
 *   onOpenChange={setOpen}
 *   trigger={<Button onClick={() => setOpen(o => !o)}>Filtros</Button>}
 *   side="bottom"
 *   align="end"
 * >
 *   <h4>Filtrar por</h4>
 *   <Checkbox label="Concluídos" />
 *   <Checkbox label="Em andamento" />
 * </Popover>
 */
export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  label,
}: PopoverProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  // outside click
  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) onOpenChange(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, closeOnOutsideClick, onOpenChange]);

  // ESC
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
        // return focus to trigger
        const trig = rootRef.current?.querySelector<HTMLElement>('[data-popover-trigger]');
        trig?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEscape, onOpenChange]);

  return (
    <span ref={rootRef} className="via-popover-wrap" data-side={side} data-align={align}>
      <span data-popover-trigger>
        {trigger}
      </span>
      {open && (
        <div
          id={panelId}
          className={`via-popover via-popover--${side} via-popover--align-${align}`}
          role="dialog"
          aria-label={label}
        >
          <div className="via-popover__arrow" aria-hidden="true" />
          <div className="via-popover__body">{children}</div>
        </div>
      )}
    </span>
  );
}
