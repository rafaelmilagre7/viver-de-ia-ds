import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import '../pages.css';

const shadows = [
  { tok: '--via-shadow-xs', use: 'Inputs em foco subtle' },
  { tok: '--via-shadow-sm', use: 'Card padrão em rest' },
  { tok: '--via-shadow-md', use: 'Card em hover, popovers' },
  { tok: '--via-shadow-lg', use: 'Menus, dropdowns' },
  { tok: '--via-shadow-xl', use: 'Modais, dialogs' },
];

export default function Shadows() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · sombras"
        title={
          <>
            Sempre <em>navy-tinted</em>. Nunca preto puro.
          </>
        }
        lede="Toda sombra do sistema é tingida com o navy da marca. O resultado é mais frio, mais editorial, e não brigam com o tom de pele em fotografia. Pretas puras pertencem a outro design system."
      />

      <Section title="Escala" meta="xs → xl">
        <div className="vds-shadow-grid">
          {shadows.map((s) => (
            <div key={s.tok}>
              <div className="vds-shadow-card" style={{ boxShadow: `var(${s.tok})` }}>
                {s.tok.replace('--via-shadow-', '')}
              </div>
              <p style={{
                fontFamily: 'var(--via-font)', fontSize: 12, color: 'var(--via-text-muted)',
                marginTop: 14, lineHeight: 1.5,
              }}>{s.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sombra do vidro" meta="dupla: inner + outer">
        <p>
          O efeito "lifted from the glass" exige <em>duas sombras</em> juntas: highlight
          interno no topo (1px branco) + drop externa navy-tinted. Sem o highlight,
          parece só um retângulo translúcido.
        </p>
        <div
          style={{
            padding: 64,
            background: 'linear-gradient(135deg, var(--via-gray-200) 0%, var(--via-gray-300) 100%)',
            borderRadius: 'var(--via-radius-lg)',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <div
            style={{
              width: 360, padding: 32,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255,255,255,1)',
              borderRadius: 20,
              boxShadow: 'var(--via-shadow-glass-light)',
              fontFamily: 'var(--via-font-display)',
              fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em',
              color: 'var(--via-text-primary)',
              textAlign: 'center',
            }}
          >
            Vidro com <em style={{ color: 'var(--via-text-muted)' }}>presença</em>
          </div>
        </div>
      </Section>

      <Section title="Focus ring" meta="acessibilidade">
        <p>
          O anel de foco é navy a 15%, 3px sólidos. Disponível como <code className="vds-code-inline">--via-shadow-focus</code>.
          Nunca remova o focus visible — substitua se precisar.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          <button
            style={{
              padding: '14px 28px',
              background: 'var(--via-navy)',
              color: 'var(--via-white)',
              border: 'none',
              borderRadius: 'var(--via-radius-pill)',
              fontFamily: 'var(--via-font)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              boxShadow: 'var(--via-shadow-focus)',
            }}
          >
            Focado
          </button>
          <button
            style={{
              padding: '14px 28px',
              background: 'var(--via-surface)',
              color: 'var(--via-text-primary)',
              border: '0.5px solid var(--via-navy-40)',
              borderRadius: 'var(--via-radius-pill)',
              fontFamily: 'var(--via-font)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              boxShadow: 'var(--via-shadow-focus)',
            }}
          >
            Focado · ghost
          </button>
        </div>
      </Section>
    </>
  );
}
