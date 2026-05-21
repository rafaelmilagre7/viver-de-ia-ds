import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

type Theme = 'light' | 'dark';

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('via-theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem('via-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="via-theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Mudar para tema ${next === 'dark' ? 'escuro' : 'claro'}`}
      title={`Mudar para tema ${next === 'dark' ? 'escuro' : 'claro'}`}
    >
      <span className="via-theme-toggle__icon">
        {theme === 'dark' ? <Sun size={14} strokeWidth={1.8} /> : <Moon size={14} strokeWidth={1.8} />}
      </span>
      <span className="via-theme-toggle__label">{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
    </button>
  );
}
