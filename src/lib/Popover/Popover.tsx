import { useEffect, useRef, useId, type ReactNode } from 'react';
import { bridgeTab, useDismiss, useEscapeLayer } from '../_shared/overlay';
import { usePresence } from '../_shared/motion';
import { Anchored } from '../_shared/Portal';
import '../_shared/material.css';
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
 * Controlled. Closes on outside click, focus leaving trigger + panel, and ESC
 * (only the topmost layer closes — a Popover inside a Modal keeps the Modal).
 * The panel renders in a portal anchored to the trigger; Tab still follows
 * the visual order (trigger → panel → next control). Editorial atmosphere.
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
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  // Painel fica montado durante a saída animada
  const { mounted, state, closing } = usePresence(open, panelRef);

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

  // Outside click + focus leaving trigger and panel (both opt-out together:
  // closeOnOutsideClick=false means a persistent panel)
  useDismiss(open, [rootRef, panelRef], () => onOpenChange(false), {
    pointer: closeOnOutsideClick,
    focus: closeOnOutsideClick,
  });

  // ESC · only when this is the topmost layer; returns focus to the trigger
  const layer = useEscapeLayer(open && closeOnEscape, () => {
    onOpenChange(false);
    getTriggerEl()?.focus();
  });

  return (
    <span
      ref={rootRef}
      className="via-popover-wrap"
      data-side={side}
      data-align={align}
      onKeyDown={(e) => open && bridgeTab(e, getTriggerEl(), panelRef.current)}
    >
      <span ref={triggerWrapRef} data-popover-trigger>
        {trigger}
      </span>
      {mounted && (
        <Anchored anchorRef={rootRef} z="popover" layer={layer}>
          <div
            ref={panelRef}
            id={panelId}
            data-state={state}
            inert={closing}
            className={`via-popover via-popover--${side} via-popover--align-${align}`}
            role="dialog"
            aria-label={label}
          >
            <div className="via-popover__arrow" aria-hidden="true" />
            <div className="via-popover__body">{children}</div>
          </div>
        </Anchored>
      )}
    </span>
  );
}
