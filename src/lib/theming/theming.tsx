import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/* ============================================================
   Theming · Viver de IA Design System
   ------------------------------------------------------------
   CSS-first theming · não há "theme object" obrigatório.
   Tokens são CSS custom properties (--via-*) que respondem a
   `[data-theme="dark"]` no <html>.

   Esta camada de TypeScript expõe:
   - <ThemeProvider> · opcional · gerencia state + localStorage
   - useTheme() · lê/escreve estado atual
   - applyTheme() · imperativo, fora de React
   - createThemeOverride() · gera CSSText pra override de tokens
   ============================================================ */

export type Theme = 'light' | 'dark';
export type ThemeMode = Theme | 'system';

interface ThemeContextValue {
  theme: Theme; // estado resolvido (sem 'system')
  mode: ThemeMode; // preferência declarada
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'via-theme';

function readPreferred(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

function resolveSystem(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Aplica o tema no <html> via data-theme attribute. */
export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}

export interface ThemeProviderProps {
  /** Tema inicial · default 'system' (segue prefers-color-scheme) */
  defaultMode?: ThemeMode;
  /** Persistir em localStorage · default true */
  persist?: boolean;
  children: ReactNode;
}

/**
 * ThemeProvider · opcional.
 *
 * O DS funciona sem Provider — tokens são CSS-first via data-theme.
 * Use o Provider quando quiser:
 *  - state React-aware (useTheme em qualquer componente filho)
 *  - persistência localStorage automática
 *  - escutar prefers-color-scheme changes
 *
 * @example
 * <ThemeProvider defaultMode="system">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  defaultMode,
  persist = true,
  children,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (defaultMode) return defaultMode;
    return persist ? readPreferred() : 'system';
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(() => resolveSystem());

  // escuta mudanças de prefers-color-scheme
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const theme: Theme = mode === 'system' ? systemTheme : mode;

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      if (persist && typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      }
    },
    [persist],
  );

  const toggle = useCallback(() => {
    setMode(theme === 'dark' ? 'light' : 'dark');
  }, [setMode, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, setMode, toggle }),
    [theme, mode, setMode, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
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
