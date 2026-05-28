import { ThemeProvider } from '../../lib/theming/theming';
import { useTheme } from '../../lib/theming/theming-core';
import { Button } from '../../lib/Button/Button';
import { Pill } from '../../lib/Pill/Pill';
import { Alert } from '../../lib/Alert/Alert';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Sun, Moon, Monitor } from 'lucide-react';

function ThemeSwitcher() {
  const { mode, setMode, theme } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Pill variant={mode === 'light' ? 'default' : 'default'}>preferência · {mode}</Pill>
        <Pill variant="success">tema resolvido · {theme}</Pill>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button
          size="sm"
          variant={mode === 'light' ? 'primary' : 'secondary'}
          onClick={() => setMode('light')}
          iconLeft={<Sun size={14} />}
        >
          Claro
        </Button>
        <Button
          size="sm"
          variant={mode === 'dark' ? 'primary' : 'secondary'}
          onClick={() => setMode('dark')}
          iconLeft={<Moon size={14} />}
        >
          Escuro
        </Button>
        <Button
          size="sm"
          variant={mode === 'system' ? 'primary' : 'secondary'}
          onClick={() => setMode('system')}
          iconLeft={<Monitor size={14} />}
        >
          Sistema
        </Button>
      </div>
    </div>
  );
}

export default function Theming() {
  return (
    <>
      <DocsHeader
        eyebrow="foundations · theming"
        title={<>Theming · <em>CSS-first · token override · ThemeProvider opcional</em></>}
        lede="O DS Viver de IA é CSS-first. Tokens vivem em `--via-*` custom properties e respondem a `[data-theme]` no <html>. ThemeProvider é opcional — útil quando você quer state React-aware, persistência localStorage e tracking de prefers-color-scheme. Para casos avançados (white-label, cliente-específico), createThemeOverride gera o CSS pra override."
      />

      <Section
        meta="arquitetura"
        title="3 camadas independentes">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Cada camada pode ser usada sozinha. Não há acoplamento forte — você escolhe o nível de abstração.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div className="vds-card vds-card--glass" style={{ padding: 20 }}>
            <Pill variant="default" size="sm">camada 1 · base</Pill>
            <h3 style={{ margin: '12px 0 8px', fontSize: 16, color: 'var(--via-text-primary)' }}>tokens CSS</h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
              <code style={{ color: 'var(--via-text-body)' }}>--via-navy</code>, <code style={{ color: 'var(--via-text-body)' }}>--via-text-primary</code>, etc. Aplicação direta em CSS. <strong>Sempre disponível.</strong>
            </p>
          </div>
          <div className="vds-card vds-card--glass" style={{ padding: 20 }}>
            <Pill variant="default" size="sm">camada 2 · imperativo</Pill>
            <h3 style={{ margin: '12px 0 8px', fontSize: 16, color: 'var(--via-text-primary)' }}>applyTheme()</h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
              Função pura · <code style={{ color: 'var(--via-text-body)' }}>applyTheme('dark')</code> seta data-theme no html. Não exige React.
            </p>
          </div>
          <div className="vds-card vds-card--glass" style={{ padding: 20 }}>
            <Pill variant="default" size="sm">camada 3 · React</Pill>
            <h3 style={{ margin: '12px 0 8px', fontSize: 16, color: 'var(--via-text-primary)' }}>ThemeProvider + useTheme</h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--via-text-muted)', lineHeight: 1.6 }}>
              State React-aware · persistência localStorage · prefers-color-scheme listener.
            </p>
          </div>
        </div>
      </Section>

      <Section
        meta="exemplo · react"
        title="ThemeProvider + useTheme">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>O Provider gerencia state, persiste no localStorage e escuta mudanças de prefers-color-scheme. Use quando seu app é React e quer reatividade.</p>
        <CodeBlock>{`import { ThemeProvider, useTheme } from '@viverdeia/design-system';

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, mode, setMode } = useTheme();
  return (
    <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      tema atual · {theme}
    </button>
  );
}`}</CodeBlock>

        <div style={{ marginTop: 24, padding: 20, background: 'var(--via-surface-1)', borderRadius: 12, border: '1px solid var(--via-border)' }}>
          <ThemeProvider defaultMode="system" persist={false}>
            <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--via-text-muted)' }}>
              <strong>Demo interativo · </strong>useTheme está dentro de ThemeProvider local (sem persist):
            </p>
            <ThemeSwitcher />
          </ThemeProvider>
        </div>
      </Section>

      <Section
        meta="exemplo · imperativo"
        title="applyTheme() — sem React">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Pra apps vanilla JS, SSR, ou scripts iniciais que precisam aplicar tema antes do React montar (evita FOUC).</p>
        <CodeBlock>{`// No <head>, antes do JavaScript principal carregar
// (evita flash of unstyled content)
<script>
  (function () {
    const stored = localStorage.getItem('via-theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored && stored !== 'system' ? stored : sys;
    document.documentElement.dataset.theme = theme;
  })();
</script>

// Mais tarde, em qualquer momento
import { applyTheme } from '@viverdeia/design-system';
applyTheme('dark');`}</CodeBlock>
      </Section>

      <Section
        meta="exemplo · custom"
        title="createThemeOverride · white-label">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Quando você precisa customizar tokens pra um cliente específico (raro — paleta Viver de IA é restrita por design). Gera CSSText que pode ser injetado num style tag.</p>
        <Alert tone="attn" title="Paleta restrita é parte da marca">
          O DS Viver de IA tem paleta intencionalmente restrita (navy/gray/white/blue/black). Override pra gold/yellow/purple quebra contrato de marca · use só pra clientes white-label legítimos.
        </Alert>

        <CodeBlock>{`import { createThemeOverride } from '@viverdeia/design-system';

// Cliente "Acme Corp" usa azul mais saturado
const css = createThemeOverride({
  '--via-navy': '#0F2A4E',
  '--via-text-primary': '#0F2A4E',
  '--via-accent': '#1E5A99',
});

// Aplicar no <head>
document.head.insertAdjacentHTML('beforeend', \`<style>\${css}</style>\`);

// Ou só em dark mode
const darkOverride = createThemeOverride(
  { '--via-bg': '#020812' },
  { scope: 'dark' },
);`}</CodeBlock>
      </Section>

      <Section
        meta="tokens disponíveis"
        title="143 tokens nominais">
        <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--via-text-muted)", lineHeight: 1.65 }}>Todos os tokens estão em --via-* e são auto-gerados pelo script build-tokens.mjs. Categorias: color (61), spacing (13), radius (7), shadow (8), font (6), motion (3), surface (6), other (39).</p>
        <CodeBlock>{`import { tokens, tokensList, cssVar } from '@viverdeia/design-system';

// Helper pra usar em styles inline
const style = {
  background: cssVar('--via-navy'),       // 'var(--via-navy)'
  color: cssVar('--via-text-primary'),    // 'var(--via-text-primary)'
};

// Lista completa (útil em design tools, docs, etc.)
console.log(tokensList);  // [{name, value, category}, ...]

// Object indexado (lookup rápido)
console.log(tokens['--via-navy']);  // { value: '#0A1F3B', category: 'color' }`}</CodeBlock>
      </Section>

      <Section
        meta="dos e donts"
        title="quando customizar"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div className="vds-card" style={{ padding: 20, borderLeft: '3px solid var(--via-text-primary)' }}>
            <strong style={{ display: 'block', marginBottom: 8, color: 'var(--via-text-primary)' }}>Faça</strong>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--via-text-body)', lineHeight: 1.7 }}>
              <li>ThemeProvider em apps React modernos (Vite, Next, Remix)</li>
              <li>applyTheme + script inline em SSR pra evitar FOUC</li>
              <li>Override em white-label legítimo · respeitando contraste AA</li>
            </ul>
          </div>
          <div className="vds-card" style={{ padding: 20, borderLeft: '3px solid var(--via-danger)' }}>
            <strong style={{ display: 'block', marginBottom: 8, color: 'var(--via-text-primary)' }}>Não faça</strong>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--via-text-body)', lineHeight: 1.7 }}>
              <li>Override de --via-* pra gold/yellow/purple (quebra contrato de marca)</li>
              <li>Sobrescrever 50+ tokens · se precisa, é outro design system</li>
              <li>ThemeProvider + applyTheme imperativo simultâneo (conflito de state)</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
