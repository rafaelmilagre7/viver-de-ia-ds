import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

/* ============================================================
   Theming · core (sem componentes)
   ------------------------------------------------------------
   Tipos, contexto, hook e utilitários do theming.
   Separado de theming.tsx (que guarda só o <ThemeProvider>)
   para o Fast Refresh funcionar — arquivo de componente exporta
   só componentes; helpers/hook vivem aqui.
   ============================================================ */

export type Theme = 'light' | 'dark';
export type ThemeMode = Theme | 'system';

export interface ThemeContextValue {
  theme: Theme; // estado resolvido (sem 'system')
  mode: ThemeMode; // preferência declarada
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const STORAGE_KEY = 'via-theme';

export function readPreferred(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

export function resolveSystem(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Aplica o tema no <html> via data-theme attribute. */
export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}

/**
 * useTheme · lê e controla o tema atual.
 *
 * Funciona com ou sem ThemeProvider:
 *  - com Provider: state React-aware, re-renderiza ao mudar
 *  - sem Provider: lê DOM (data-theme) e usa applyTheme imperativo
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  // Standalone mode (sem Provider) — lê o DOM diretamente
  const [domTheme, setDomTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'light';
    return (document.documentElement.dataset.theme as Theme) || resolveSystem();
  });

  useEffect(() => {
    if (ctx) return; // Provider gerencia
    if (typeof window === 'undefined') return;
    const obs = new MutationObserver(() => {
      const t = (document.documentElement.dataset.theme as Theme) || 'light';
      setDomTheme(t);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [ctx]);

  if (ctx) return ctx;

  const setMode = (next: ThemeMode) => {
    const resolved: Theme = next === 'system' ? resolveSystem() : next;
    applyTheme(resolved);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return {
    theme: domTheme,
    mode: domTheme,
    setMode,
    toggle: () => setMode(domTheme === 'dark' ? 'light' : 'dark'),
  };
}

/* ============================================================
   createThemeOverride · gera CSSText pra customizar tokens
   ------------------------------------------------------------
   Use quando precisar de white-label ou cliente-específico
   (raro — paleta do Viver de IA é restrita por design).

   Retorna um <style> tag que pode ser injetado no <head>:

     const css = createThemeOverride({
       '--via-navy': '#0F2A4E',
       '--via-accent': '#1E5A99',
     });
     document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
   ============================================================ */

export type ThemeOverrides = Partial<Record<string, string>>;

export interface CreateThemeOverrideOptions {
  /** Seletor onde aplicar · default ':root' */
  selector?: string;
  /** Aplica só num data-theme específico (light, dark) */
  scope?: Theme;
}

export function createThemeOverride(
  tokens: ThemeOverrides,
  options: CreateThemeOverrideOptions = {},
): string {
  const { selector = ':root', scope } = options;
  const target = scope ? `${selector}[data-theme="${scope}"]` : selector;
  const body = Object.entries(tokens)
    .filter(([k]) => k.startsWith('--via-'))
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `${target} {\n${body}\n}`;
}
