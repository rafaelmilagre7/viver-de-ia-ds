import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';

/* ══════════════════════════════════════════════════════════════════════
   A PÁGINA RENDERIZA A CLASSE REAL — NÃO UMA CÓPIA
   Cada demo abaixo usa literalmente `.via-glass`, `.via-glass-strong`,
   `.via-glass-dark` e `.via-liquid` de src/styles/tokens.css (l.702-755),
   as mesmas classes que os blocos de código ensinam. Antes desta versão os
   demos eram cópias inline da receita: copiavam o vidro CLARO e ignoravam
   os overrides `[data-theme="dark"]`, então no tema escuro a página exibia
   um vidro branco enquanto a classe ensinada renderizava vidro escuro —
   a doc mostrava o oposto do que o código produz. Nunca reimplemente a
   receita aqui: use a classe.

   A ficha técnica de cada variante lê do objeto SPEC, conferido linha a
   linha contra tokens.css:
     .via-glass         l.702-709  · dark l.743-746
     .via-glass-strong  l.711-718  · dark l.747-750
     .via-glass-dark    l.721-729  · sem override (ver nota na seção)
     .via-liquid        l.732-739  · dark l.751-755
     --via-blur-md/lg   l.527-528  · --via-radius-lg/pill l.425/428
   ══════════════════════════════════════════════════════════════════════ */
type SpecRow = { camada: string; claro: string; escuro?: string };

const SPEC: Record<'glass' | 'strong' | 'dark' | 'liquid', SpecRow[]> = {
  glass: [
    { camada: 'fundo', claro: 'branco 70% → 42%', escuro: 'branco 6% → 3%' },
    { camada: 'blur', claro: '--via-blur-md · blur(16px) saturate(160%)' },
    { camada: 'borda', claro: '1px branco 80%', escuro: '1px branco 10%' },
    { camada: 'raio', claro: '--via-radius-lg · 20px' },
    { camada: 'sombra', claro: '--via-shadow-glass-light' },
  ],
  strong: [
    { camada: 'fundo', claro: 'branco 85% → 58%', escuro: 'branco 9% → 5%' },
    { camada: 'blur', claro: '--via-blur-lg · blur(28px) saturate(180%)' },
    { camada: 'borda', claro: '1px branco 95%', escuro: '1px branco 14%' },
    { camada: 'raio', claro: '--via-radius-lg · 20px' },
    { camada: 'sombra', claro: '--via-shadow-glass-light' },
  ],
  dark: [
    { camada: 'fundo', claro: 'branco 10% → 3%' },
    { camada: 'blur', claro: '--via-blur-md · blur(16px) saturate(160%)' },
    { camada: 'borda', claro: '1px branco 18%' },
    { camada: 'raio', claro: '--via-radius-lg · 20px' },
    { camada: 'sombra', claro: '--via-shadow-glass-dark' },
    { camada: 'texto', claro: '--via-white · fixo nos 2 temas' },
  ],
  liquid: [
    { camada: 'fundo', claro: 'branco 80% → 55%', escuro: 'branco 10% → 5%' },
    { camada: 'blur', claro: '--via-blur-md · blur(16px) saturate(160%)' },
    { camada: 'borda', claro: '1px branco 95%', escuro: '1px branco 14%' },
    { camada: 'raio', claro: '--via-radius-pill · 999px' },
    {
      camada: 'sombra',
      claro: 'inset 1px de luz + 0 4px 16px navy 8%',
      escuro: 'inset --via-edge-hi + 0 4px 16px preto 30%',
    },
  ],
};

function Spec({ rows }: { rows: SpecRow[] }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: 20 }}>
      <table className="vds-token-table">
        <thead>
          <tr>
            <th style={{ width: '18%' }}>Camada</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.camada}>
              <td className="use" style={{ width: '18%' }}>{r.camada}</td>
              <td className="val" style={{ width: 'auto', whiteSpace: 'normal' }}>
                {r.claro}
                {r.escuro && (
                  <span style={{ color: 'var(--via-text-muted)' }}>
                    {'  ·  escuro: '}{r.escuro}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Palco do demo.
   tone="gray"  → .vds-stage.gray, que usa --via-stage-soft/-1 (docs.css l.273).
                  Backdrop de palco NUNCA usa gray-200/300 direto: esses dois
                  não adaptam (tokens.css l.163-170) e o palco ficaria uma laje
                  clara no tema escuro, com o vidro escuro sumindo em cima dela.
   tone="dark"  → palco fixo escuro nos DOIS temas, de propósito: foto de hero e
                  momento navy full-bleed são escuros em qualquer tema. Por ser
                  fixo, o rótulo aqui pina a própria cor (branco), não herda
                  token de texto. */
function Stage({
  label,
  tone,
  background,
  children,
}: {
  label: string;
  tone: 'gray' | 'dark';
  background?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={tone === 'gray' ? 'vds-stage gray' : 'vds-stage dark'}
      style={{
        position: 'relative',
        minHeight: 220,
        paddingTop: 60,
        ...(background ? { background, borderColor: 'transparent' } : null),
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 18,
          left: 24,
          fontFamily: 'var(--via-font)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: tone === 'dark' ? 'rgba(255,255,255,0.72)' : 'var(--via-text-muted)',
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

/* Fotografia simulada · fixa nos 2 temas (ver comentário do Stage). */
const PHOTO_BG =
  'radial-gradient(ellipse at top, var(--via-blue-soft) 0%, var(--via-navy) 60%, var(--via-navy-deep) 100%)';

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
        lede="Quatro variantes do mesmo material. Light é o default discreto. Strong tem opacidade maior para flutuar sobre fotografia. Dark vive nos momentos navy. Liquid é a pílula — específica para status e announcement. No tema escuro as três variantes claras viram vidro escuro translúcido sozinhas; só a dark atravessa igual, porque o momento navy já é escuro nos dois temas."
      />

      <Section title=".via-glass · light" meta="default subtle">
        <Stage label="light · sobre palco cinza" tone="gray">
          <div
            className="via-glass"
            style={{
              padding: '20px 32px',
              fontFamily: 'var(--via-font-display)',
              fontSize: 22,
              fontWeight: 500,
              color: 'var(--via-text-primary)',
              letterSpacing: '-0.015em',
            }}
          >
            Discreto, com presença
          </div>
        </Stage>
        <CodeBlock>{`<div className="via-glass">…</div>`}</CodeBlock>
        <Spec rows={SPEC.glass} />
      </Section>

      <Section title=".via-glass-strong" meta="hero foreground">
        <Stage label="strong · sobre fotografia" tone="dark" background={PHOTO_BG}>
          <div
            className="via-glass-strong"
            style={{
              padding: '24px 36px',
              fontFamily: 'var(--via-font-display)',
              fontSize: 24,
              fontWeight: 500,
              color: 'var(--via-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {/* --via-text-body, não muted: o vidro strong é translúcido sobre navy, então
                a superfície real medida é cinza-azulada (não branca) e o muted caía pra
                3,38:1 no tema claro — só passava pela exceção de "texto grande". */}
            Vidro que <em style={{ color: 'var(--via-text-body)' }}>respira</em>
          </div>
        </Stage>
        <CodeBlock>{`<div className="via-glass-strong">…</div>`}</CodeBlock>
        <Spec rows={SPEC.strong} />
      </Section>

      <Section title=".via-glass-dark" meta="navy moments">
        <Stage label="dark · sobre navy full-bleed" tone="dark">
          <div
            className="via-glass-dark"
            style={{
              padding: '24px 36px',
              fontFamily: 'var(--via-font-display)',
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '-0.015em',
            }}
          >
            Em momentos <em style={{ color: 'rgba(255,255,255,0.72)' }}>escuros</em>
          </div>
        </Stage>
        <CodeBlock>{`<div className="via-glass-dark">…</div>`}</CodeBlock>
        <Spec rows={SPEC.dark} />
        <p
          style={{
            fontFamily: 'var(--via-font)',
            fontSize: 'var(--via-fs-caption)',
            color: 'var(--via-text-muted)',
            lineHeight: 1.6,
            margin: '14px 0 0',
          }}
        >
          É a única variante sem override no tema escuro — ela já nasce escura, e o palco
          onde ela vive (navy full-bleed) é escuro nos dois temas. Por isso o texto pina{' '}
          <code className="vds-code-inline">--via-white</code> em vez de herdar o token de
          texto da página.
        </p>
      </Section>

      <Section title=".via-liquid · pill" meta="status & announcement">
        <Stage label="liquid pill · sobre palco cinza" tone="gray">
          <span
            className="via-liquid"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              fontFamily: 'var(--via-font)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'var(--via-text-primary)',
            }}
          >
            {/* currentColor, nunca --via-navy: navy não adapta e a bolinha
                sumiria dentro da pílula escura no tema escuro. */}
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: 'var(--via-radius-pill)',
                background: 'currentColor',
                animation: 'viaPulseDot 2.4s ease-in-out infinite',
              }}
            />
            Turma 2026.2 · inscrições abertas
          </span>
          <style>{`@keyframes viaPulseDot { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:0.4; transform:scale(0.7)} }`}</style>
        </Stage>
        <CodeBlock>{`<span className="via-liquid">…</span>`}</CodeBlock>
        <Spec rows={SPEC.liquid} />
      </Section>
    </>
  );
}
