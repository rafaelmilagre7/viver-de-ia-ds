import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';

function Tile({ label, children, bg }: { label: string; children: React.ReactNode; bg: string }) {
  return (
    <div
      style={{
        padding: 48,
        borderRadius: 'var(--via-radius-lg)',
        background: bg,
        position: 'relative',
        minHeight: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute', top: 18, left: 24,
          fontFamily: 'var(--via-font)',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: bg.includes('navy') || bg.includes('#0') ? 'rgba(255,255,255,0.55)' : 'var(--via-gray-500)',
        }}
      >{label}</span>
      {children}
    </div>
  );
}

export default function GlassVariants() {
  return (
    <>
      <DocsHeader
        eyebrow="Liquid Glass · variantes"
        title={
          <>
            Light, strong, dark, <em>liquid</em>.
          </>
        }
        lede="Quatro variantes do mesmo material. Light é o default discreto. Strong tem opacidade maior para flutuar sobre fotografia. Dark vive nos momentos navy. Liquid é a pílula — específica para status e announcement."
      />

      <Section title=".via-glass · light" meta="default subtle">
        <Tile
          label="light · sobre gray-50"
          bg="linear-gradient(135deg, var(--via-gray-200) 0%, var(--via-gray-300) 100%)"
        >
          <div
            style={{
              padding: '20px 32px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.42) 100%)',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.80)',
              borderRadius: 'var(--via-radius-lg)',
              boxShadow: 'var(--via-shadow-glass-light)',
              fontFamily: 'var(--via-font-display)',
              fontSize: 22, fontWeight: 500, color: 'var(--via-navy)',
              letterSpacing: '-0.015em',
            }}
          >
            Discreto, com presença
          </div>
        </Tile>
        <CodeBlock>{`<div className="via-glass">…</div>`}</CodeBlock>
      </Section>

      <Section title=".via-glass-strong" meta="hero foreground">
        <Tile
          label="strong · sobre fotografia"
          bg="radial-gradient(ellipse at top, var(--via-blue-soft) 0%, var(--via-navy) 60%, var(--via-navy-deep) 100%)"
        >
          <div
            style={{
              padding: '24px 36px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.58) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 'var(--via-radius-lg)',
              boxShadow: 'var(--via-shadow-glass-light)',
              fontFamily: 'var(--via-font-display)',
              fontSize: 24, fontWeight: 500, color: 'var(--via-navy)',
              letterSpacing: '-0.02em',
            }}
          >
            Vidro que <em style={{ color: 'var(--via-gray-500)' }}>respira</em>
          </div>
        </Tile>
        <CodeBlock>{`<div className="via-glass-strong">…</div>`}</CodeBlock>
      </Section>

      <Section title=".via-glass-dark" meta="navy moments">
        <Tile
          label="dark · sobre navy full-bleed"
          bg="linear-gradient(135deg, var(--via-navy), var(--via-navy-deep))"
        >
          <div
            style={{
              padding: '24px 36px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 'var(--via-radius-lg)',
              boxShadow: 'var(--via-shadow-glass-dark)',
              fontFamily: 'var(--via-font-display)',
              fontSize: 22, fontWeight: 500, color: 'var(--via-white)',
              letterSpacing: '-0.015em',
            }}
          >
            Em momentos <em style={{ color: 'rgba(255,255,255,0.7)' }}>escuros</em>
          </div>
        </Tile>
        <CodeBlock>{`<div className="via-glass-dark">…</div>`}</CodeBlock>
      </Section>

      <Section title=".via-liquid · pill" meta="status & announcement">
        <Tile
          label="liquid pill · sobre off-white"
          bg="linear-gradient(135deg, var(--via-gray-50) 0%, var(--via-gray-100) 100%)"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.80), rgba(255,255,255,0.55))',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 999,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,1), 0 4px 16px rgba(10,31,59,0.08)',
              fontFamily: 'var(--via-font)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase',
              color: 'var(--via-navy)',
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: 999, background: 'var(--via-navy)',
                animation: 'viaPulse 2.4s ease-in-out infinite',
              }}
            />
            Turma 2026.2 · inscrições abertas
          </span>
          <style>{`@keyframes viaPulse { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:0.4; transform:scale(0.7)} }`}</style>
        </Tile>
        <CodeBlock>{`<span className="via-liquid">…</span>`}</CodeBlock>
      </Section>
    </>
  );
}
