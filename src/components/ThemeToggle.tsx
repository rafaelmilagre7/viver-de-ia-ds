import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

type Theme = 'light' | 'dark';

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('via-theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  // Light é o padrão da marca · usuário escolhe dark explicitamente se quiser
  return 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readInitialTheme());

  /* Aplica na montagem (o bootstrap do index.html já pintou · isto é a rede). */
  useEffect(() => {
    applyTheme(readInitialTheme());
  }, []);

  /* O tema mora no <html>, e outros lugares escrevem lá — a página de Theming
     tem um demo que troca o tema de verdade. Sem observar o atributo, o rótulo
     deste botão fica mentindo (diz "Claro" com a página já clara) e o usuário
     precisa clicar duas vezes. */
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const t: Theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      setTheme((prev) => (prev === t ? prev : t));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  /* Persistir SÓ na escolha explícita do usuário — montar a página não é escolha. */
  const choose = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    try {
      window.localStorage.setItem('via-theme', t);
    } catch {
      /* ignore */
    }
  };

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="via-theme-toggle"
      onClick={() => choose(next)}
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
