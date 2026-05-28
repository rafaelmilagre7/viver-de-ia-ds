import { useCallback, useState } from 'react';
import type { ToastItem } from './Toast';

/**
 * useToasts · hook helper que gerencia o stack de toasts.
 *
 * Vive em arquivo próprio (não no Toast.tsx) para o Fast Refresh
 * funcionar — arquivo de componente exporta só componentes.
 *
 * @example
 * const { toasts, push, dismiss } = useToasts();
 * push({ title: 'Salvo', variant: 'success' });
 * <ToastStack toasts={toasts} onDismiss={dismiss} />
 */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((p) => [...p, { ...toast, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  const clear = useCallback(() => setToasts([]), []);

  return { toasts, push, dismiss, clear };
}
