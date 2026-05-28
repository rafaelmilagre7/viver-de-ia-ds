import { useEffect, type ReactNode } from 'react';
import { Check, AlertCircle, X, Info } from 'lucide-react';
import './Toast.css';

type Variant = 'default' | 'success' | 'warning' | 'destructive';

export interface ToastItem {
  id: string;
  variant?: Variant;
  title: string;
  message?: string;
  duration?: number; // ms · default 4500 · 0 = sticky
  action?: { label: string; onClick: () => void };
}

const variantIcon: Record<Variant, ReactNode> = {
  default: <Info size={14} strokeWidth={2} />,
  success: <Check size={14} strokeWidth={2.4} />,
  warning: <AlertCircle size={14} strokeWidth={2} />,
  destructive: <AlertCircle size={14} strokeWidth={2} />,
};

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

function ToastCard({ toast, onDismiss }: ToastProps) {
  const variant = toast.variant ?? 'default';
  const duration = toast.duration ?? 4500;

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(t);
  }, [duration, toast.id, onDismiss]);

  return (
    <div className={`via-toast via-toast--${variant}`} role="status" aria-live="polite">
      <span className="via-toast__icon">{variantIcon[variant]}</span>
      <div className="via-toast__body">
        <strong>{toast.title}</strong>
        {toast.message && <p>{toast.message}</p>}
      </div>
      {toast.action && (
        <button type="button" className="via-toast__action" onClick={toast.action.onClick}>
          {toast.action.label}
        </button>
      )}
      <button
        type="button"
        className="via-toast__close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Fechar notificação"
      >
        <X size={12} strokeWidth={2.4} />
      </button>
    </div>
  );
}

export interface ToastStackProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

/**
 * ToastStack · stack de notificações editoriais com auto-dismiss
 *
 * @example
 * const [toasts, setToasts] = useState<ToastItem[]>([]);
 * const push = (t) => setToasts((p) => [...p, { ...t, id: Date.now().toString() }]);
 *
 * <ToastStack toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />
 */
export function ToastStack({ toasts, onDismiss, position = 'top-right' }: ToastStackProps) {
  return (
    <div className={`via-toast-stack via-toast-stack--${position}`} role="region" aria-label="Notificações">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/* useToasts · hook helper vive em ./useToasts (Fast Refresh) — importe de lá */
