import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import '../pages.css';

const sizes = [
  { lbl: 'Hero', sample: 'Viver de IA', size: 80, weight: 500, ls: '-0.025em', meta: '5rem · Geist 500 · −0.025em' },
  { lbl: 'Display', sample: 'Não de prompt.', size: 56, weight: 500, ls: '-0.025em', meta: '3.5rem · Geist 500 · −0.025em' },
  { lbl: 'H1', sample: 'Mentoria 2026.2', size: 40, weight: 500, ls: '-0.025em', meta: '2.5rem · Geist 500' },
  { lbl: 'H2', sample: 'Cases publicados', size: 32, weight: 500, ls: '-0.02em', meta: '2rem · Geist 500' },
  { lbl: 'H3', sample: 'Comparar Seguro', size: 24, weight: 600, ls: '-0.015em', meta: '1.5rem · Geist 600' },
  { lbl: 'H4', sample: 'Centralizar operação', size: 18, weight: 600, ls: '0', meta: '1.125rem · Geist 600' },
  { lbl: 'Body', sample: 'Mentoria, comunidade e ferramentas.', size: 16, weight: 400, ls: '0', meta: '1rem · Geist 400 · 1.65 lh' },
  { lbl: 'Small', sample: 'Inscrições abertas', size: 14, weight: 400, ls: '0', meta: '0.875rem · Geist 400' },
  { lbl: 'Label', sample: 'TURMA 2026.2 · BRASIL', size: 11, weight: 700, ls: '0.22em', meta: '0.6875rem · Geist 700 · uppercase · 0.22em' },
];

export default function Typography() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · tipografia"
        title={
          <>
            Geist. Uma família, <em>todos os pesos</em>.
          </>
        }
        lede="Sistema de uma família só — Geist, da Vercel. Variable sans-serif moderna que escala do label 11px ao hero 80px sem perder presença. Geist Mono carrega código e tokens. Sem serif no display, sem mistura de famílias — coerência total."
      />

      <Section title="Famílias" meta="2 sistemas">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 8 }}>Display + UI</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 56, fontWeight: 500, color: 'var(--via-text-primary)', letterSpacing: '-0.025em', lineHeight: 1 }}>Geist</div>
            <p style={{ fontFamily: 'var(--via-font-mono)', fontSize: 11, color: 'var(--via-text-muted)', marginTop: 8 }}>variable · 100–900 · Vercel</p>
          </div>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 8 }}>Mono</p>
            <div style={{ fontFamily: 'var(--via-font-mono)', fontSize: 48, fontWeight: 500, color: 'var(--via-text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>Geist Mono</div>
            <p style={{ fontFamily: 'var(--via-font-mono)', fontSize: 11, color: 'var(--via-text-muted)', marginTop: 8 }}>variable · 100–900 · código + tokens</p>
          </div>
        </div>
      </Section>

      <Section title="Escala" meta="hero → label">
        {sizes.map((s) => (
          <div className="vds-type-row" key={s.lbl}>
            <span className="vds-type-label">{s.lbl}</span>
            <span
              className="vds-type-sample"
              style={{
                fontFamily: 'var(--via-font-display)',
                fontSize: s.size,
                fontWeight: s.weight,
                letterSpacing: s.ls,
                lineHeight: 1.1,
                textTransform: s.lbl === 'Label' ? 'uppercase' : 'none',
              }}
            >
              {s.sample}
            </span>
            <span className="vds-type-meta">{s.meta}</span>
          </div>
        ))}
      </Section>

      <Section title="Ênfase por cor, não por itálico" meta="contraste sutil">
        <p>
          Geist não tem itálico real (é sans moderna, sem axis itálico). Em vez de simular,
          a marca destaca uma palavra do headline com <em>peso menor + cor gray 500</em>.
          O contraste vem da matéria, não da inclinação. Mais minimal, mais moderno.
        </p>
        <div
          style={{
            padding: 48,
            background: 'var(--via-gray-50)',
            borderRadius: 'var(--via-radius-lg)',
            border: '0.5px solid var(--via-navy-08)',
            marginTop: 16,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--via-font-display)',
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: 'var(--via-text-primary)',
              margin: 0,
            }}
          >
            Viver de <em style={{ fontStyle: 'normal', fontWeight: 400, color: 'var(--via-text-muted)' }}>IA</em>,<br />
            não de <em style={{ fontStyle: 'normal', fontWeight: 400, color: 'var(--via-text-muted)' }}>prompt</em>.
          </p>
        </div>
      </Section>

      <Section title="Letter-spacing buckets" meta="4 níveis">
        <table className="vds-token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Valor</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="tok">--via-ls-brand</td><td className="val">0.32em</td><td className="use">Wordmark <span style={{ letterSpacing: '0.32em' }}>V I V E R   D E   I A</span></td></tr>
            <tr><td className="tok">--via-ls-mark</td><td className="val">0.22em</td><td className="use">Section eyebrow · <span style={{ letterSpacing: '0.22em' }}>EYEBROW</span></td></tr>
            <tr><td className="tok">--via-ls-label</td><td className="val">0.18em</td><td className="use">Labels e nav links</td></tr>
            <tr><td className="tok">--via-ls-tighter</td><td className="val">−0.025em</td><td className="use">Display headlines</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Números são tipografia" meta="Geist 500 tabular">
        <p>
          Stat cards usam <em style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--via-text-primary)' }}>Geist 500</em> com <code className="vds-code-inline">font-variant-numeric: tabular-nums</code>.
          A moeda é "R$" com espaço, separador de milhar com ponto.
        </p>
        <div style={{ display: 'flex', gap: 40, marginTop: 24, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <div>
            <p className="vds-eyebrow">Economia recorrente</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>R$ 4.600</div>
          </div>
          <div>
            <p className="vds-eyebrow">Conversas analisadas</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>+11.920</div>
          </div>
          <div>
            <p className="vds-eyebrow">Operação financeira</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>100%</div>
          </div>
        </div>
      </Section>

      <Section title="Casing" meta="quando">
        <table className="vds-token-table">
          <thead>
            <tr><th>Caso</th><th>Onde</th><th>Exemplo</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="tok">Sentence case</td>
              <td className="val">Body, headline default</td>
              <td className="use">"Mentoria, comunidade e ferramentas."</td>
            </tr>
            <tr>
              <td className="tok">UPPERCASE</td>
              <td className="val">Wordmark, eyebrow, label, botão</td>
              <td className="use">"INSCRIÇÕES ABERTAS"</td>
            </tr>
            <tr>
              <td className="tok">Title Case</td>
              <td className="val">Raro · evite</td>
              <td className="use">"Living From AI" (off-brand em PT)</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Importar fontes" meta="Google Fonts">
        <CodeBlock>{`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" />`}</CodeBlock>
      </Section>
    </>
  );
}
