import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, AlertCircle, X, Info } from 'lucide-react';
import { useDragDismiss } from '../_shared/useDragDismiss';
import '../_shared/sr-only.css';
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
  const cardRef = useRef<HTMLDivElement>(null);

  // onDismiss vive em ref: o consumidor passa arrow inline (identidade nova a
  // cada render do pai) e isso não pode reiniciar o timer nem a mola de saída
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  });
  const dismissSelf = useCallback(() => onDismissRef.current(toast.id), [toast.id]);

  // Pausa com o ponteiro em cima ou o foco dentro (WCAG 2.2.1): o tempo que
  // falta é guardado e retomado quando os dois saem
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;
  const remaining = useRef(duration);

  // Swipe pra direita dispensa (toast vive à direita). scrimRef = o próprio
  // card: a opacidade acompanha o deslocamento e o card some por completo
  // mesmo com o gap de 24px entre a borda dele e a da viewport.
  const { close } = useDragDismiss({
    panelRef: cardRef,
    axis: 'x',
    dir: 1,
    onDismiss: dismissSelf,
    scrimRef: cardRef,
  });

  const closeAnimated = useCallback(() => {
    const el = cardRef.current;
    if (el) el.style.animation = 'none'; // entrada CSS não pode brigar com a mola de saída
    close();
  }, [close]);

  useEffect(() => {
    if (duration <= 0 || paused) return;
    const started = Date.now();
    const t = setTimeout(dismissSelf, remaining.current);
    return () => {
      clearTimeout(t);
      remaining.current = Math.max(0, remaining.current - (Date.now() - started));
    };
  }, [duration, paused, dismissSelf]);

  // O anúncio sai das regiões vivas persistentes do ToastStack — o card em si
  // não é live region (região criada junto com o texto não é lida)
  return (
    <div
      ref={cardRef}
      className={`via-toast via-toast--${variant}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
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
        onClick={closeAnimated}
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
 * Anúncio pra leitor de tela: duas regiões vivas que existem desde o 1º render
 * (polite pra normal/sucesso/aviso, role=alert pra destrutivo). O timer pausa
 * com hover ou foco dentro do toast.
 *
 * @example
 * const [toasts, setToasts] = useState<ToastItem[]>([]);
 * const push = (t) => setToasts((p) => [...p, { ...t, id: Date.now().toString() }]);
 *
 * <ToastStack toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />
 */
export function ToastStack({ toasts, onDismiss, position = 'top-right' }: ToastStackProps) {
  const announce = (list: ToastItem[]) =>
    list.map((t) => (
      <span key={t.id}>
        {t.title}
        {t.message ? `. ${t.message}` : ''}.{' '}
      </span>
    ));
  return (
    <div className={`via-toast-stack via-toast-stack--${position}`} role="region" aria-label="Notificações">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
      <div className="via-sr-only" role="status" aria-live="polite">
        {announce(toasts.filter((t) => t.variant !== 'destructive'))}
      </div>
      <div className="via-sr-only" role="alert">
        {announce(toasts.filter((t) => t.variant === 'destructive'))}
      </div>
    </div>
  );
}

/* useToasts · hook helper vive em ./useToasts (Fast Refresh) — importe de lá */
