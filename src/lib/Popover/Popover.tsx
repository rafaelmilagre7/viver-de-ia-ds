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
  const triggerWrapRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  /**
   * Resolve the real focusable trigger control. The consumer passes an
   * arbitrary node (usually a <button>); we wire ARIA + focus return onto
   * that inner control. If no focusable element exists, fall back to the
   * trigger wrapper span (made focusable below).
   */
  const getTriggerEl = (): HTMLElement | null => {
    const wrap = triggerWrapRef.current;
    if (!wrap) return null;
    const focusable = wrap.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    return focusable ?? wrap;
  };

  // ARIA wiring on the actual focusable trigger control
  useEffect(() => {
    const el = getTriggerEl();
    if (!el) return;
    el.setAttribute('aria-haspopup', 'dialog');
    el.setAttribute('aria-expanded', open ? 'true' : 'false');
    el.setAttribute('aria-controls', panelId);
    // Ensure the trigger is focusable so Escape can return focus to it.
    if (el === triggerWrapRef.current && !el.hasAttribute('tabindex')) {
      el.tabIndex = 0;
    }
  }, [open, panelId, trigger]);

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
        // return focus to the real focusable trigger
        getTriggerEl()?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEscape, onOpenChange]);

  return (
    <span ref={rootRef} className="via-popover-wrap" data-side={side} data-align={align}>
      <span ref={triggerWrapRef} data-popover-trigger>
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
