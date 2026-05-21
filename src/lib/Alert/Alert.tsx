import type { ReactNode } from 'react';
import { Info, AlertTriangle, AlertCircle, Check, X } from 'lucide-react';
import './Alert.css';

type Tone = 'info' | 'attn' | 'danger' | 'success';

export interface AlertProps {
  /** Visual tone (default 'info') */
  tone?: Tone;
  /** Bold lead line */
  title?: ReactNode;
  /** Body content */
  children?: ReactNode;
  /** Optional leading icon (overrides the default per tone) */
  icon?: ReactNode;
  /** Optional inline action at the end (button, link, etc.) */
  action?: ReactNode;
  /** Show a close button (calls `onDismiss`) */
  onDismiss?: () => void;
  /** Visual size · 'compact' for inline / 'banner' for full-bleed (default 'banner') */
  size?: 'compact' | 'banner';
}

const DEFAULT_ICON: Record<Tone, ReactNode> = {
  info: <Info size={15} strokeWidth={1.8} />,
  attn: <AlertTriangle size={15} strokeWidth={1.8} />,
  danger: <AlertCircle size={15} strokeWidth={2.0} />,
  success: <Check size={15} strokeWidth={2.4} />,
};

/**
 * Alert · persistent inline banner · tone-aware · editorial.
 *
 * Use for state that survives an action (e.g. "Janela de manutenção sex 22h").
 * For ephemeral feedback (e.g. "Salvo"), use Toast instead.
 *
 * @example
 * <Alert tone="attn" title="Próxima janela · domingo 04h"
 *        action={<a href="/status">Ver status</a>}>
 *   Manutenção programada na Nina · pode haver pausa de até 8 minutos.
 * </Alert>
 */
export function Alert({
  tone = 'info',
  title,
  children,
  icon,
  action,
  onDismiss,
  size = 'banner',
}: AlertProps) {
  const role = tone === 'danger' || tone === 'attn' ? 'alert' : 'status';
  return (
    <div className={`via-alert via-alert--${tone} via-alert--${size}`} role={role}>
      <span className="via-alert__icon" aria-hidden="true">{icon ?? DEFAULT_ICON[tone]}</span>
      <div className="via-alert__body">
        {title && <strong className="via-alert__title">{title}</strong>}
        {children && <div className="via-alert__text">{children}</div>}
      </div>
      {action && <div className="via-alert__action">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          className="via-alert__close"
          onClick={onDismiss}
          aria-label="Fechar alerta"
        >
          <X size={13} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}
