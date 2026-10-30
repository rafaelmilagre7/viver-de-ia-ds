import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Check, AlertCircle, X, Info } from 'lucide-react';
import { useDragDismiss } from '../_shared/useDragDismiss';
import { DUR, flipFrom } from '../_shared/motion';
import '../_shared/sr-only.css';
import '../_shared/material.css';
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
  /** Saiu da lista do consumidor: anima a saída e avisa a pilha (sem onDismiss) */
  leaving: boolean;
  onLeft: (id: string) => void;
  /** A pilha mede o card (FLIP dos vizinhos) */
  register: (id: string, el: HTMLDivElement | null) => void;
}

function ToastCard({ toast, onDismiss, leaving, onLeft, register }: ToastProps) {
  const variant = toast.variant ?? 'default';
  const duration = toast.duration ?? 4500;
  const cardRef = useRef<HTMLDivElement>(null);

  // onDismiss vive em ref: o consumidor passa arrow inline (identidade nova a
  // cada render do pai) e isso não pode reiniciar o timer nem a mola de saída
  const onDismissRef = useRef(onDismiss);
  const onLeftRef = useRef(onLeft);
  useEffect(() => {
    onDismissRef.current = onDismiss;
    onLeftRef.current = onLeft;
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
  const { close, exit } = useDragDismiss({
    panelRef: cardRef,
    axis: 'x',
    dir: 1,
    enabled: !leaving,
    onDismiss: dismissSelf,
    scrimRef: cardRef,
    open: !leaving,
  });

  // X, swipe e TEMPO saem pelo mesmo caminho: mola pra direita + fade, e só
  // então onDismiss (a pilha recolhe depois, deslizando os vizinhos)
  const closeAnimated = useCallback(() => close(), [close]);

  useEffect(() => {
    if (duration <= 0 || paused || leaving) return;
    const started = Date.now();
    const t = setTimeout(closeAnimated, remaining.current);
    return () => {
      clearTimeout(t);
      remaining.current = Math.max(0, remaining.current - (Date.now() - started));
    };
  }, [duration, paused, leaving, closeAnimated]);

  // O consumidor tirou o toast da lista (clear(), troca de tela…): sai pela
  // mesma mola, sem chamar onDismiss de novo. Já fora (X/tempo) → some na hora.
  useEffect(() => {
    if (!leaving) return;
    exit(() => onLeftRef.current(toast.id));
  }, [leaving, exit, toast.id]);

  // O anúncio sai das regiões vivas persistentes do ToastStack — o card em si
  // não é live region (região criada junto com o texto não é lida)
  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        register(toast.id, el);
      }}
      className={`via-toast via-toast--${variant}`}
      // data-state: entrada por @starting-style e crossfade em reduced-motion
      data-state={leaving ? 'closed' : 'open'}
      inert={leaving}
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

interface Entry {
  toast: ToastItem;
  leaving: boolean;
}

/**
 * Lista renderizada = lista do consumidor + quem saiu dela e ainda está
 * animando a saída, cada um na posição relativa em que estava.
 */
function mergeEntries(prev: Entry[], next: ToastItem[]): Entry[] {
  const nextIds = new Set(next.map((t) => t.id));
  const out: Entry[] = next.map((toast) => ({ toast, leaving: false }));
  prev.forEach((e, i) => {
    if (nextIds.has(e.toast.id)) return;
    let at = 0;
    for (let j = i - 1; j >= 0; j--) {
      const k = out.findIndex((o) => o.toast.id === prev[j].toast.id);
      if (k >= 0) {
        at = k + 1;
        break;
      }
    }
    out.splice(at, 0, { toast: e.toast, leaving: true });
  });
  return out;
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
 * Movimento: o toast novo entra pela borda da tela onde a pilha mora (de
 * baixo em bottom-*, de cima em top-*); X, swipe e tempo saem pela mesma
 * mola; toast removido pelo consumidor também sai animado; os vizinhos
 * deslizam (FLIP com transform) em vez de pular.
 *
 * @example
 * const [toasts, setToasts] = useState<ToastItem[]>([]);
 * const push = (t) => setToasts((p) => [...p, { ...t, id: Date.now().toString() }]);
 *
 * <ToastStack toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />
 */
export function ToastStack({ toasts, onDismiss, position = 'top-right' }: ToastStackProps) {
  // Quem sai da lista do consumidor fica montado até terminar a saída
  const [entries, setEntries] = useState<Entry[]>(() => mergeEntries([], toasts));
  const [seen, setSeen] = useState(toasts);
  if (toasts !== seen) {
    setSeen(toasts);
    setEntries((prev) => mergeEntries(prev, toasts));
  }
  const onLeft = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => !(e.leaving && e.toast.id === id)));
  }, []);

  // FLIP da pilha: quando um card entra ou sai, os vizinhos DESLIZAM até o
  // lugar novo (translate) em vez de pular. Posição de layout = topo da
  // pilha + offsetTop (ignora transform: nem o swipe nem o FLIP em curso
  // contaminam a medida). Na pilha de baixo, o card novo empurra os antigos
  // pra cima — eles sobem deslizando.
  const stackRef = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<string, HTMLDivElement>());
  const tops = useRef(new Map<string, number>());
  const register = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) cards.current.set(id, el);
    else cards.current.delete(id);
  }, []);
  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const base = stack.getBoundingClientRect().top;
    const next = new Map<string, number>();
    cards.current.forEach((el, id) => {
      const top = base + el.offsetTop;
      next.set(id, top);
      const prev = tops.current.get(id);
      if (prev !== undefined && prev !== top) flipFrom(el, { dy: prev - top }, { duration: DUR.base });
    });
    tops.current = next;
  });

  const announce = (list: ToastItem[]) =>
    list.map((t) => (
      <span key={t.id}>
        {t.title}
        {t.message ? `. ${t.message}` : ''}.{' '}
      </span>
    ));
  return (
    <div
      ref={stackRef}
      className={`via-toast-stack via-toast-stack--${position}`}
      role="region"
      aria-label="Notificações"
    >
      {entries.map((e) => (
        <ToastCard
          key={e.toast.id}
          toast={e.toast}
          onDismiss={onDismiss}
          leaving={e.leaving}
          onLeft={onLeft}
          register={register}
        />
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
