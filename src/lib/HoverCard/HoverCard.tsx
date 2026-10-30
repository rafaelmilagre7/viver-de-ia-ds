import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import { bridgeTab, useEscapeLayer } from '../_shared/overlay';
import { usePresence } from '../_shared/motion';
import { Anchored, Portal } from '../_shared/Portal';
import '../_shared/material.css';
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
 * ESC fecha (WCAG 1.4.13, mesmo com o foco em outro lugar). O trigger aponta
 * `aria-describedby` pro conteúdo do card SEMPRE (fechado, ele fica num nó
 * oculto). O card abre num portal ancorado — nunca cortado por overflow.
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
  const triggerWrapRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Card fica montado durante a saída animada
  const { mounted, state, closing } = usePresence(open, cardRef);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyId = useId();

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

  // ESC fecha o card aberto (só se for a camada do topo)
  const layer = useEscapeLayer(open, () => {
    cancel();
    setOpen(false);
  });

  /**
   * Resolve the real focusable trigger control. The consumer passes an
   * arbitrary node (usually an <a> or <button>); we wire ARIA onto that inner
   * control so the hover card is announced as a popup. Falls back to the
   * trigger wrapper span when no focusable element exists.
   */
  const getTriggerEl = (): HTMLElement | null => {
    const wrap = triggerWrapRef.current;
    if (!wrap) return null;
    const focusable = wrap.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    return focusable ?? wrap;
  };

  // ARIA wiring on the actual focusable trigger control.
  useEffect(() => {
    const el = getTriggerEl();
    if (!el) return;
    el.setAttribute('aria-haspopup', 'dialog');
    el.setAttribute('aria-expanded', open ? 'true' : 'false');
    const described = (el.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean);
    if (!described.includes(bodyId)) el.setAttribute('aria-describedby', [...described, bodyId].join(' '));
  }, [open, trigger, bodyId]);

  return (
    <span
      ref={wrapRef}
      className="via-hovercard-wrap"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      onKeyDown={(e) => open && bridgeTab(e, getTriggerEl(), cardRef.current)}
    >
      <span ref={triggerWrapRef} className="via-hovercard__trigger">
        {trigger}
      </span>
      {/* Fechado: o conteúdo fica num nó oculto só pra descrever o trigger
          (no <body>: conteúdo rico não fica aninhado num <p> de quem usa) */}
      {!open && (
        <Portal>
          <div id={bodyId} hidden>
            {children}
          </div>
        </Portal>
      )}
      {mounted && (
        <Anchored anchorRef={wrapRef} z="popover" layer={layer}>
          {/* Saindo, o id fica com o nó oculto acima (descrição nunca some
              nem duplica) e o card vira só imagem */}
          <div
            ref={cardRef}
            data-state={state}
            inert={closing}
            aria-hidden={closing || undefined}
            className={`via-hovercard via-hovercard--${side} via-hovercard--align-${align}`}
            role="dialog"
            aria-labelledby={closing ? undefined : bodyId}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            <div id={closing ? undefined : bodyId} className="via-hovercard__body">{children}</div>
          </div>
        </Anchored>
      )}
    </span>
  );
}
