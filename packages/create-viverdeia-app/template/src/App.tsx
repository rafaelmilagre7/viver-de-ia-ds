import {
  Button,
  Card,
  Pill,
  useTheme,
} from '@viverdeia/design-system';
import { Compass, Moon, Sun, Monitor } from 'lucide-react';

export function App() {
  const { mode, setMode, theme } = useTheme();

  return (
    <main
      style={{
        maxWidth: 920,
        margin: '0 auto',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Pill variant="default" size="sm" iconLeft={<Compass size={11} />}>
          starter · viver de ia
        </Pill>
        <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.1, color: 'var(--via-text-primary)', letterSpacing: -0.6 }}>
          {{PROJECT_NAME}}
        </h1>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--via-text-body)', maxWidth: 640 }}>
          Você está numa base editorial pronta — tokens, tipografia, glass, paleta restrita,
          ThemeProvider e a library de componentes já configurados. Comece editando{' '}
          <code style={{ background: 'var(--via-surface-2, rgba(10,31,59,0.06))', padding: '2px 6px', borderRadius: 4, fontSize: 14 }}>
            src/App.tsx
          </code>{' '}
          ou exporte o que precisar de <code style={{ background: 'var(--via-surface-2, rgba(10,31,59,0.06))', padding: '2px 6px', borderRadius: 4, fontSize: 14 }}>@viverdeia/design-system</code>.
        </p>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        <Card>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, color: 'var(--via-text-primary)' }}>1 · explore o DS</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.55 }}>
            Veja os componentes em ação no design system principal. Cada peça tem doc Radix-style.
          </p>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, color: 'var(--via-text-primary)' }}>2 · use tokens</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.55 }}>
            CSS custom properties <code style={{ fontSize: 12 }}>--via-*</code> estão prontos. Importe <code style={{ fontSize: 12 }}>cssVar()</code> pra inline styles.
          </p>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, color: 'var(--via-text-primary)' }}>3 · respeite a paleta</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.55 }}>
            Navy/gray/white/blue/black. Sem gold/yellow/purple. Coral só pra destrutivo.
          </p>
        </Card>
      </section>

      <section
        style={{
          padding: 24,
          background: 'var(--via-surface-1)',
          border: '1px solid var(--via-border)',
          borderRadius: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 13, color: 'var(--via-text-primary)' }}>Tema</strong>
          <Pill variant="default" size="sm">preferência · {mode}</Pill>
          <Pill variant="success" size="sm">tema resolvido · {theme}</Pill>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button
            size="sm"
            variant={mode === 'light' ? 'primary' : 'secondary'}
            iconLeft={<Sun size={13} />}
            onClick={() => setMode('light')}
          >
            Claro
          </Button>
          <Button
            size="sm"
            variant={mode === 'dark' ? 'primary' : 'secondary'}
            iconLeft={<Moon size={13} />}
            onClick={() => setMode('dark')}
          >
            Escuro
          </Button>
          <Button
            size="sm"
            variant={mode === 'system' ? 'primary' : 'secondary'}
            iconLeft={<Monitor size={13} />}
            onClick={() => setMode('system')}
          >
            Sistema
          </Button>
        </div>
      </section>

      <footer
        style={{
          marginTop: 16,
          paddingTop: 24,
          borderTop: '1px solid var(--via-border)',
          fontSize: 12.5,
          color: 'var(--via-text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <span>build · Viver de IA design system · @viverdeia/design-system</span>
        <span>© {{YEAR}} {{PROJECT_NAME}}</span>
      </footer>
    </main>
  );
}
