import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ThemeContext,
  applyTheme,
  readPreferred,
  resolveSystem,
  STORAGE_KEY,
  type Theme,
  type ThemeContextValue,
  type ThemeMode,
} from './theming-core';

/* ============================================================
   Theming · Viver de IA Design System
   ------------------------------------------------------------
   CSS-first theming · não há "theme object" obrigatório.
   Tokens são CSS custom properties (--via-*) que respondem a
   `[data-theme="dark"]` no <html>.

   Esta camada de TypeScript expõe:
   - <ThemeProvider> · opcional · gerencia state + localStorage
   - useTheme() · lê/escreve estado atual            (theming-core)
   - applyTheme() · imperativo, fora de React        (theming-core)
   - createThemeOverride() · gera CSSText de override (theming-core)

   ThemeProvider (componente) vive aqui; o resto em theming-core.ts
   para o Fast Refresh continuar funcionando.
   ============================================================ */

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
