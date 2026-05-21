/**
 * Story de introdução · primeira tela quando alguém abre o Ladle.
 * Path "introduction" mapeado como defaultStory em .ladle/config.mjs.
 */
export default {
  title: 'Introduction',
};

export const Introduction = () => (
  <div style={{ maxWidth: 720, fontFamily: 'var(--via-font, Geist, system-ui, sans-serif)' }}>
    <p
      style={{
        fontFamily: 'var(--via-mono, Geist Mono, ui-monospace, monospace)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--via-gray-500, var(--via-gray-500))',
        margin: '0 0 24px',
      }}
    >
      Library · @viverdeia/design-system
    </p>

    <h1
      style={{
        margin: '0 0 24px',
        fontFamily: 'var(--via-font-display, Geist, system-ui, sans-serif)',
        fontSize: 48,
        fontWeight: 500,
        lineHeight: 1.05,
        letterSpacing: '-0.025em',
        color: 'var(--via-navy, #0A1F3B)',
      }}
    >
      Catálogo interativo dos{' '}
      <em style={{ fontStyle: 'italic', color: 'var(--via-gray-500)', fontWeight: 400 }}>
        15 componentes core
      </em>
      .
    </h1>

    <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.65, color: 'var(--via-gray-700)' }}>
      Cada componente da library Viver de IA tem aqui uma sandbox com play controls — você
      altera variants, sizes, disabled, etc, e vê o componente reagir em tempo real. Use isso
      pra entender o vocabulário antes de adotar em Nina, Iris, ExecSeats ou plataforma.
    </p>

    <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.65, color: 'var(--via-gray-700)' }}>
      O <strong>P de cada componente</strong> abre 1 ou mais stories. <strong>Switch tema</strong>{' '}
      e <strong>viewport width</strong> ficam no canto superior direito.
    </p>

    <div
      style={{
        marginTop: 40,
        padding: 24,
        borderRadius: 14,
        background: 'rgba(10, 31, 59, 0.04)',
        border: '1px solid rgba(10, 31, 59, 0.08)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--via-mono, Geist Mono, ui-monospace, monospace)',
          fontSize: 12.5,
          lineHeight: 1.6,
          color: 'var(--via-navy)',
        }}
      >
        bun add @viverdeia/design-system
        <br />
        bun add react react-dom lucide-react
      </p>
    </div>

    <p style={{ marginTop: 32, fontSize: 14, color: 'var(--via-gray-600)' }}>
      Documentação completa em{' '}
      <code style={{ fontFamily: 'var(--via-mono)', fontSize: 13, color: 'var(--via-navy)' }}>
        src/lib/README.md
      </code>{' '}
      ou no site de referência em <code style={{ fontFamily: 'var(--via-mono)', fontSize: 13 }}>/foundations/library</code>.
    </p>
  </div>
);
