import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';

export default function GlassAnatomy() {
  return (
    <>
      <DocsHeader
        eyebrow="Liquid Glass · anatomia"
        title={
          <>
            A textura <em>assinatura</em>.
          </>
        }
        lede="Vidro líquido só funciona quando quatro camadas se sobrepõem: tint translúcido, blur saturado, hairline branca de borda, e a dupla sombra interna+externa. Falte uma, e fica só um retângulo opaco."
      />

      <Section title="As 4 camadas" meta="receita exata">
        <div
          className="via-mesh-navy via-noise"
          style={{
            padding: 88,
            borderRadius: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            marginTop: 16,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 460,
              padding: 44,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 100%)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: '1px solid rgba(255,255,255,1)',
              borderRadius: 24,
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.5), 0 32px 80px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.6), transparent)',
                borderTopLeftRadius: 20, pointerEvents: 'none',
              }}
            />
            <p className="vds-eyebrow" style={{ position: 'relative' }}>Surface</p>
            <h3 style={{
              fontFamily: 'var(--via-font-display)', fontSize: 32, fontWeight: 500,
              letterSpacing: '-0.02em', color: 'var(--via-navy)', margin: '8px 0 0', position: 'relative',
            }}>Hello, glass.</h3>
            <p style={{
              fontFamily: 'var(--via-font)', fontSize: 14, color: 'var(--via-gray-600)',
              marginTop: 12, position: 'relative',
            }}>Quatro camadas. Nem uma a menos.</p>
          </div>
        </div>

        <ol style={{ marginTop: 32, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>1 · Tint translúcido</h4>
              <p>Gradiente branco 85% → 55% (top → bottom). Em superfície escura, inverte: branco 10% → 3%.</p>
            </div>
            <CodeBlock>{`background: linear-gradient(160deg,
  rgba(255,255,255,0.85) 0%,
  rgba(255,255,255,0.55) 100%);`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>2 · Backdrop blur saturado</h4>
              <p>O sabor da marca: 16–32px de blur + 160–180% de saturação. Webkit-prefixed pra Safari.</p>
            </div>
            <CodeBlock>{`backdrop-filter: blur(28px) saturate(180%);
-webkit-backdrop-filter: blur(28px) saturate(180%);`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>3 · Hairline branca</h4>
              <p>Borda 1px branco 95–100%. Sem ela, o vidro não tem "lábio". Em superfície escura, branco 18%.</p>
            </div>
            <CodeBlock>{`border: 1px solid rgba(255,255,255,1);
border-radius: 20px;`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>4 · Dupla sombra</h4>
              <p>Interna (highlight no topo, 1px branco) + externa (drop navy-tinted). É essa dupla que faz parecer levantado da superfície.</p>
            </div>
            <CodeBlock>{`box-shadow:
  inset 0 1px 0 rgba(255,255,255,1),
  inset 0 -1px 0 rgba(255,255,255,0.4),
  0 16px 40px var(--via-navy-10),
  0 4px 12px var(--via-navy-06);`}</CodeBlock>
          </li>
        </ol>
      </Section>

      <Section title="Quando usar" meta="restrição é a estética">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Sim</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Nav sticky, hero stat cards sobre fotografia, modal frame, CTA pill de
              destaque, cards de pricing em destaque, página da conferência (onde glass é
              a dominante).
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Não</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Dashboards densos, tabelas com dados, telas cheias de formulário. Em UI densa,
              glass machuca legibilidade. Vá de superfície plana lá.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
