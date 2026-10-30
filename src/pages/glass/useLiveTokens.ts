import { useSyncExternalStore } from 'react';

/* Lê o valor VIVO dos tokens no tema atual (getComputedStyle do <html>) e
   relê quando o tema troca. A tabela da página mostra o que o CSS realmente
   resolve — nunca uma cópia digitada que deriva de tokens.css. */
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
  const mq = window.matchMedia?.('(prefers-reduced-transparency: reduce)');
  mq?.addEventListener?.('change', cb);
  return () => {
    mo.disconnect();
    mq?.removeEventListener?.('change', cb);
  };
}

const SEP = '\u0000';

export function useLiveTokens(names: readonly string[]): Record<string, string> {
  const key = useSyncExternalStore(
    subscribe,
    () => {
      const cs = getComputedStyle(document.documentElement);
      return names.map((n) => cs.getPropertyValue(n).trim().replace(/\s+/g, ' ')).join(SEP);
    },
    () => names.map(() => '').join(SEP),
  );
  const vals = key.split(SEP);
  return Object.fromEntries(names.map((n, i) => [n, vals[i] ?? '']));
}
