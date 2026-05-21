import { useState, useRef, useEffect, type ReactNode } from 'react';
import './HoverCard.css';

export interface HoverCardProps {
  /** Element that triggers the card on hover */
  trigger: ReactNode;
  /** Content shown in the floating card */
  children: ReactNode;
  /** Side the card appears on */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment along the cross-axis */
  align?: 'start' | 'center' | 'end';
  /** Delay before showing (ms) · default 300 */
  openDelay?: number;
  /** Delay before hiding (ms) · default 200 */
  closeDelay?: number;
}

/**
 * `<HoverCard>` · floating card on hover/focus
 *
 * Use pra mostrar preview de usuário ao passar mouse no @nome, info adicional
 * em links, ou rich tooltip que precisa de conteúdo complexo. Diferente de
 * Tooltip (texto simples) e Popover (click-trigger).
 *
 * @example
 * <HoverCard trigger={<a>@caioribeiro</a>}>
 *   <Avatar alt="Caio Ribeiro" />
 *   <strong>Caio Ribeiro</strong>
 *   <em>Fundador · Viver de IA</em>
 *   <p>220 mentorados desde 2024</p>
 * </HoverCard>
 */
export function HoverCard({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  openDelay = 300,
  closeDelay = 200,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };

  const handleOpen = () => {
    cancel();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  };

  const handleClose = () => {
    cancel();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  };

  useEffect(() => () => cancel(), []);

  return (
    <span
      ref={wrapRef}
      className="via-hovercard-wrap"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {trigger}
      {open && (
        <div
          className={`via-hovercard via-hovercard--${side} via-hovercard--align-${align}`}
          role="dialog"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className="via-hovercard__body">{children}</div>
        </div>
      )}
    </span>
  );
}
