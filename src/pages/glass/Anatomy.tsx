import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import './anatomy.css';

/* ══════════════════════════════════════════════════════════════════════
   FONTE ÚNICA DA RECEITA
   O card do palco (demo) e os 4 blocos de código leem DESTE objeto — é
   literalmente a mesma string. Página de fundação não pode ensinar um
   valor e renderizar outro; aqui isso é impossível por construção.
   O demo é vidro sobre PALCO ESCURO (superfície clara fixa nos 2 temas,
   .vds-onlight), então pina os próprios valores em vez de herdar os tokens
   de tema — token de tema aqui viraria card escuro sobre palco escuro.
   A prosa de cada camada diz qual é o token equivalente em produto e o
   valor real dele, conferido contra src/styles/tokens.css:
     --via-glass-card      l.282 (claro) / l.304 (escuro)
     --via-glass-blur      l.485   ·  --via-glass-blur-bar l.486
     --via-glass-ring      l.487   ·  --via-radius-lg 20px l.425
     --via-shadow-ink-*    l.444-451
   ══════════════════════════════════════════════════════════════════════ */
const GLASS = {
  tint: `linear-gradient(180deg,
  rgba(255,255,255,0.98) 0%,
  rgba(255,255,255,0.90) 10%,
  rgba(255,255,255,0.72) 100%)`,
  blur: 'blur(24px) saturate(175%)',
  border: '1px solid rgba(255,255,255,0.95)',
  /* Tinta de sombra, nunca --via-navy-*: navy inverte pra branco no tema
     escuro e o card ganha halo. ink já é navy no claro e preto no escuro. */
  shadow: `inset 0 1px 0 rgba(255,255,255,0.95),
  0 32px 80px -24px var(--via-shadow-ink-60),
  0 8px 24px -10px var(--via-shadow-ink-30)`,
};

/* Nome de token dentro da prosa. Sem chip: .vds-code-inline tem padding e
   fundo quase igual ao do callout (gray-50 vs gray-100), então vira um vão
   inexplicado antes da vírgula em vez de ler como chip. Monospace + cor de
   título já marca "isto é código", e a pontuação encosta. */
function Tok({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: 'var(--via-font-mono)',
      fontSize: '0.92em',
      color: 'var(--via-text-primary)',
      whiteSpace: 'nowrap',
    }}>{children}</code>
  );
}

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
        lede="Vidro líquido só funciona quando quatro camadas se sobrepõem: tint translúcido, blur saturado, hairline de 1px na borda, e a dupla sombra — luz interna no topo, drop externo embaixo. Falte uma, e fica só um retângulo opaco."
      />

      <Section title="As 4 camadas" meta="receita exata">
        <div
          className="via-mesh-navy via-noise"
          style={{
            padding: 'clamp(28px, 7vw, 88px)',
            borderRadius: 'var(--via-radius-xl)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            marginTop: 16,
            overflow: 'hidden',
          }}
        >
          <div
            className="vds-onlight"
            style={{
              width: 'min(460px, 100%)',
              padding: 'clamp(24px, 5vw, 44px)',
              background: GLASS.tint,
              backdropFilter: GLASS.blur,
              WebkitBackdropFilter: GLASS.blur,
              border: GLASS.border,
              borderRadius: 'var(--via-radius-lg)',
              boxShadow: GLASS.shadow,
              position: 'relative',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            {/* Sobre vidro claro o muted padrão (gray-500) fica em 3,3:1 — reprova AA.
                Aqui o rótulo desce um passo, pra gray-600, e mede 5,9:1. */}
            <p className="vds-eyebrow" style={{ position: 'relative', color: 'var(--via-gray-600)' }}>Surface</p>
            <h3 style={{
              fontFamily: 'var(--via-font-display)', fontSize: 32, fontWeight: 500,
              letterSpacing: '-0.02em', color: 'var(--via-text-primary)', margin: '8px 0 0', position: 'relative',
            }}>Hello, glass.</h3>
            <p style={{
              fontFamily: 'var(--via-font)', fontSize: 14, color: 'var(--via-text-body)',
              marginTop: 12, position: 'relative',
            }}>Quatro camadas. Nem uma a menos.</p>
          </div>
        </div>

        <ol className="ga-layers" style={{ marginTop: 32, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>1 · Tint translúcido</h4>
              <p>
                Nunca branco chapado: forte no topo, um degrau aos 10% — a luz batendo na
                quina — e mais aberto na base. Sobre o palco escuro acima ele vai de 98% a 72%.
                Em produto isso é o token <Tok>--via-glass-card</Tok>,
                a mesma curva calibrada para página clara (96% → 84% → 58%), que no tema escuro
                inverte sozinho para branco 10% → 5% → 2,2%.
              </p>
            </div>
            <CodeBlock>{`/* sobre fundo escuro (o palco acima) */
background: ${GLASS.tint};

/* em card de produto · resolve os 2 temas */
background: var(--via-glass-card);`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>2 · Backdrop blur saturado</h4>
              <p>
                24px de desfoque e 175% de saturação. A saturação é o sabor da marca: sem ela
                o blur fica cinza e morto. Barra/nav sobe para{' '}
                <Tok>--via-glass-blur-bar</Tok> (26px · 185%),
                porque chrome flutuante precisa se separar mais do conteúdo que passa por baixo.
                Sempre com o prefixo <Tok>-webkit-</Tok> pro Safari.
              </p>
            </div>
            <CodeBlock>{`/* --via-glass-blur = ${GLASS.blur} */
backdrop-filter: var(--via-glass-blur);
-webkit-backdrop-filter: var(--via-glass-blur);`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>3 · Hairline de 1px</h4>
              <p>
                Sem ela o vidro não tem “lábio”. Sobre fundo escuro — o palco acima — o lábio é
                branco 95%. Em card de produto use{' '}
                <Tok>--via-glass-ring</Tok>, que resolve navy 5%
                no claro e branco 8% no escuro; branco fixo viraria moldura berrante em página
                clara. O raio padrão do vidro é <Tok>lg</Tok>, 20px.
              </p>
            </div>
            <CodeBlock>{`/* sobre fundo escuro (o palco acima) */
border: ${GLASS.border};

/* em card de produto · resolve os 2 temas */
border: var(--via-glass-ring);
border-radius: var(--via-radius-lg);   /* 20px */`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>4 · Dupla sombra</h4>
              <p>
                Interna: 1px de luz no topo — a única sombra onde o branco é o efeito desejado.
                Externa: duas camadas de{' '}
                <Tok>--via-shadow-ink-*</Tok>, a tinta que já
                nasce navy no claro e preta no escuro. Nunca{' '}
                <Tok>--via-navy-*</Tok> em box-shadow: no escuro
                ele inverte para branco e o card ganha halo em vez de sombra.
              </p>
            </div>
            <CodeBlock>{`box-shadow:
  ${GLASS.shadow};`}</CodeBlock>
          </li>
        </ol>
      </Section>

      <Section title="Quando usar" meta="restrição é a estética">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Sim</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Nav sticky, hero stat cards sobre fotografia, modal frame, CTA pill de
              destaque, cards de pricing em destaque, página da conferência (onde glass é
              a dominante).
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Não</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Dashboards densos, tabelas com dados, telas cheias de formulário. Em UI densa,
              glass machuca legibilidade. Vá de superfície plana lá.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
