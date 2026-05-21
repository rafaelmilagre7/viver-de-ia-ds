import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

export default function IconographyPhotography() {
  return (
    <>
      <DocsHeader
        eyebrow="Iconografia · fotografia"
        title={
          <>
            Editorial, <em>fria</em>, com pessoas.
          </>
        }
        lede="Quando fotografia é usada, é editorial: branco-balance frio, levemente dessaturada, com vinheta sutil. Pessoas trabalhando, conversando, em conferência. Retrato de estúdio antes de multidão dramática."
      />

      <Section title="Direção visual" meta="regras de luz e tom">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Sim</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              White-balance cool / neutro. Levemente dessaturada. Preto-e-branco ou duotone
              navy+branco também on-brand. Pessoas reais, contexto profissional, foco no rosto
              ou nas mãos trabalhando.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Não</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Stock-y AI imagery (cérebros brilhando, espaguete neural, mãos androides).
              Imagens hipersaturadas. Vibe "Silicon Valley". Crowds dramáticos sem
              propósito narrativo.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Tratamento" meta="duotone navy">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 12,
            marginTop: 16,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: '4 / 5',
                background:
                  'linear-gradient(180deg, var(--via-blue), var(--via-navy)), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 8px, transparent 8px, transparent 16px)',
                borderRadius: 'var(--via-radius-md)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 14,
              }}
            >
              <span style={{ fontFamily: 'var(--via-font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>placeholder · {i}</span>
            </div>
          ))}
        </div>
        <p style={{
          marginTop: 16, fontFamily: 'var(--via-font)', fontSize: 12, color: 'var(--via-gray-500)',
        }}>
          Placeholders. Quando entrarem fotos reais, manter o tratamento duotone navy ou
          preto-e-branco frio.
        </p>
      </Section>

      <Section title="Pareando com glass" meta="vidro sobre foto">
        <p>
          Glass funciona muito bem sobre fotografia — é uma das aplicações canônicas. A
          foto vira "atmosfera" e o vidro flutua por cima. Veja a página <em>Em contexto</em>.
        </p>
      </Section>
    </>
  );
}
