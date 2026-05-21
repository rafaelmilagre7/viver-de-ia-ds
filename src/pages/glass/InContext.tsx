import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

export default function GlassInContext() {
  return (
    <>
      <DocsHeader
        eyebrow="Liquid Glass · em contexto"
        title={
          <>
            Onde o vidro <em>vive</em>.
          </>
        }
        lede="Glass não é decoração — tem lugar. Esses são os quatro momentos onde a textura aparece naturalmente: nav sticky, hero stat cards, modal frame, CTA pill. Fora desses, prefira superfície plana."
      />

      <Section title="Nav sticky" meta="topo de página">
        <div
          style={{
            position: 'relative',
            height: 280,
            borderRadius: 'var(--via-radius-lg)',
            overflow: 'hidden',
            background:
              'linear-gradient(135deg, var(--via-gray-200), var(--via-gray-300)), radial-gradient(ellipse at 80% 0%, var(--via-navy-08), transparent)',
            border: '0.5px solid var(--via-navy-12)',
          }}
        >
          <header
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 64, zIndex: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 28px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.66))',
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              borderBottom: '0.5px solid var(--via-navy-10)',
            }}
          >
            <span style={{ fontFamily: 'var(--via-font)', fontSize: 11, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--via-navy)' }}>VIVER DE IA</span>
            <span style={{ fontFamily: 'var(--via-font)', fontSize: 12, fontWeight: 600, color: 'var(--via-gray-500)' }}>Mentoria · Cases · Manifesto</span>
          </header>
          <div
            style={{
              position: 'absolute', bottom: 24, left: 28,
              fontFamily: 'var(--via-font-display)', fontSize: 36, fontWeight: 500,
              color: 'var(--via-navy)', letterSpacing: '-0.02em', lineHeight: 1,
            }}
          >
            Conteúdo rolando<br /><em style={{ color: 'var(--via-gray-500)' }}>por baixo</em>…
          </div>
        </div>
      </Section>

      <Section title="Hero stat card" meta="sobre navy ou foto">
        <div
          style={{
            padding: 56,
            background: 'radial-gradient(ellipse at top, var(--via-blue-soft) 0%, var(--via-navy) 60%, var(--via-navy-deep) 100%)',
            borderRadius: 'var(--via-radius-lg)',
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {[
            { lbl: 'Conversas analisadas', num: '+11.920', sub: 'Efizi · 90 dias' },
            { lbl: 'Economia recorrente', num: 'R$ 4.600', sub: 'Balzani & Zimbel' },
            { lbl: 'Operação financeira', num: '100%', sub: 'Conferir Engenharia' },
          ].map((c) => (
            <div
              key={c.lbl}
              style={{
                flex: '1 1 240px',
                padding: 24,
                background: 'linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.95)',
                borderRadius: 20,
                boxShadow: 'var(--via-shadow-glass-light)',
              }}
            >
              <p className="vds-eyebrow">{c.lbl}</p>
              <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-navy)', marginTop: 6 }}>{c.num}</div>
              <p style={{ fontFamily: 'var(--via-font)', fontSize: 12, color: 'var(--via-gray-600)', marginTop: 8 }}>{c.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Modal frame" meta="sobre scrim navy">
        <div
          style={{
            position: 'relative',
            height: 340,
            borderRadius: 'var(--via-radius-lg)',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(10,31,59,0.85), rgba(2,22,42,0.95))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 440, padding: 32,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.84))',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,1)',
              borderRadius: 24,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,1), 0 32px 80px rgba(0,0,0,0.40)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--via-font-display)', fontSize: 24, fontWeight: 500, color: 'var(--via-navy)', letterSpacing: '-0.015em', margin: 0 }}>Confirmar inscrição?</h3>
            <p style={{ fontFamily: 'var(--via-font)', fontSize: 14, color: 'var(--via-gray-600)', lineHeight: 1.55, marginTop: 12 }}>
              Sua inscrição na turma 2026.2 será confirmada. O pagamento será cobrado no método cadastrado.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ padding: '11px 20px', borderRadius: 999, fontFamily: 'var(--via-font)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: 'var(--via-gray-600)', border: 'none' }}>Cancelar</button>
              <button style={{ padding: '11px 20px', borderRadius: 999, fontFamily: 'var(--via-font)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'var(--via-navy)', color: 'var(--via-white)', border: 'none' }}>Confirmar</button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
