import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './theming';
import {
  useTheme,
  applyTheme,
  createThemeOverride,
  readPreferred,
  resolveSystem,
  STORAGE_KEY,
} from './theming-core';

/* ThemeProvider · useTheme · createThemeOverride (light-first) */

let systemDark = false;
let mqListeners: Array<(e: { matches: boolean }) => void> = [];

beforeEach(() => {
  systemDark = false;
  mqListeners = [];
  window.matchMedia = ((q: string) => ({
    matches: q.includes('dark') ? systemDark : false,
    media: q,
    addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => mqListeners.push(fn),
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});
afterEach(() => {
  vi.restoreAllMocks();
});

function Probe() {
  const { theme, mode, setMode, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggle}>toggle</button>
      <button onClick={() => setMode('system')}>system</button>
      <button onClick={() => setMode('dark')}>dark</button>
    </div>
  );
}

describe('<ThemeProvider />', () => {
  it('nasce claro (marca white-first) mesmo com o SO em dark', () => {
    systemDark = true;
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('respeita a preferência salva e persiste a troca', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(STORAGE_KEY, 'dark');
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('modo system segue o prefers-color-scheme e reage à mudança', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider persist={false}>
        <Probe />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'system' }));
    expect(screen.getByTestId('mode')).toHaveTextContent('system');
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    act(() => mqListeners.forEach((fn) => fn({ matches: true })));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    // persist=false: nada gravado
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('defaultMode explícito vence a preferência salva', () => {
    window.localStorage.setItem(STORAGE_KEY, 'light');
    render(
      <ThemeProvider defaultMode="dark">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('localStorage bloqueado (iframe sandbox) não derruba o app: cai no claro', async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    expect(() =>
      render(
        <ThemeProvider>
          <Probe />
        </ThemeProvider>,
      ),
    ).not.toThrow();
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    await user.click(screen.getByRole('button', { name: 'dark' }));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});

describe('useTheme sem Provider', () => {
  it('sem data-theme no <html> reporta claro — não chuta o tema do SO', () => {
    systemDark = true;
    render(<Probe />);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('lê o data-theme do <html> e acompanha mudanças', async () => {
    document.documentElement.dataset.theme = 'dark';
    render(<Probe />);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    await act(async () => {
      applyTheme('light');
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('setMode aplica no <html> e grava a escolha', async () => {
    const user = userEvent.setup();
    render(<Probe />);
    await user.click(screen.getByRole('button', { name: 'dark' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });
});

describe('utilitários', () => {
  it('readPreferred só aceita valores válidos e protege o acesso ao storage', () => {
    window.localStorage.setItem(STORAGE_KEY, 'roxo');
    expect(readPreferred()).toBe('light');
    window.localStorage.setItem(STORAGE_KEY, 'system');
    expect(readPreferred()).toBe('system');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readPreferred()).toBe('light');
  });

  it('resolveSystem lê o prefers-color-scheme', () => {
    expect(resolveSystem()).toBe('light');
    systemDark = true;
    expect(resolveSystem()).toBe('dark');
  });

  it('createThemeOverride gera CSS só com tokens --via-*, com seletor e escopo', () => {
    const css = createThemeOverride({ '--via-navy': '#0F2A4E', color: 'red', '--via-accent': '#1E5A99' });
    expect(css).toBe(':root {\n  --via-navy: #0F2A4E;\n  --via-accent: #1E5A99;\n}');
    expect(createThemeOverride({ '--via-navy': '#000' }, { selector: '.marca', scope: 'dark' })).toBe(
      '.marca[data-theme="dark"] {\n  --via-navy: #000;\n}',
    );
  });
});
