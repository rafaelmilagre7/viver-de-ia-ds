import type { CSSProperties } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import '../pages.css';

/* Espelho 1:1 dos 12 tokens de --via-fs-* em tokens.css.
   Peso e letter-spacing de cada linha = o que o elemento/utility real usa
   (h1..h4 em tokens.css, .via-label, .via-btn, .via-pill). Não invente aqui:
   se mudar o token, muda esta tabela. */
const sizes = [
  { lbl: 'Hero', tok: '--via-fs-hero', sample: 'Viver de IA', size: 80, weight: 500, ls: 'var(--via-ls-tighter)', meta: '5rem · Geist 500 · −0.025em' },
  { lbl: 'Display', tok: '--via-fs-display', sample: 'Não de prompt.', size: 56, weight: 500, ls: 'var(--via-ls-tighter)', meta: '3.5rem · Geist 500 · −0.025em' },
  { lbl: 'H1', tok: '--via-fs-h1', sample: 'Mentoria 2026.2', size: 40, weight: 500, ls: 'var(--via-ls-tighter)', meta: '2.5rem · Geist 500 · −0.025em' },
  { lbl: 'H2', tok: '--via-fs-h2', sample: 'Cases publicados', size: 32, weight: 500, ls: 'var(--via-ls-tighter)', meta: '2rem · Geist 500 · −0.025em' },
  { lbl: 'H3', tok: '--via-fs-h3', sample: 'Comparar Seguro', size: 24, weight: 600, ls: 'var(--via-ls-tight)', meta: '1.5rem · Geist 600 · −0.015em' },
  { lbl: 'H4', tok: '--via-fs-h4', sample: 'Centralizar operação', size: 18, weight: 600, ls: 'normal', meta: '1.125rem · Geist 600' },
  { lbl: 'Body', tok: '--via-fs-body', sample: 'Mentoria, comunidade e ferramentas.', size: 16, weight: 400, ls: 'normal', meta: '1rem · Geist 400 · 1.65 lh' },
  { lbl: 'Small', tok: '--via-fs-sm', sample: 'Inscrições abertas', size: 14, weight: 400, ls: 'normal', meta: '0.875rem · Geist 400' },
  { lbl: 'Caption', tok: '--via-fs-caption', sample: 'Salvar alterações', size: 13, weight: 500, ls: '-0.008em', meta: '0.8125rem · Geist 500 · botão md' },
  { lbl: 'XS', tok: '--via-fs-xs', sample: 'Código inline · tag', size: 12, weight: 400, ls: 'normal', meta: '0.75rem · Geist 400 · botão sm' },
  { lbl: 'Label', tok: '--via-fs-label', sample: 'Turma 2026.2 · Brasil', size: 11, weight: 600, ls: 'var(--via-ls-label)', caps: true, meta: '0.6875rem · Geist 600 · uppercase · 0.18em' },
  { lbl: 'Micro', tok: '--via-fs-micro', sample: 'Pill sm · kbd · contador', size: 10, weight: 500, ls: 'normal', meta: '0.625rem · Geist 500' },
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
        lede="Sistema de uma família só — Geist, da Vercel. Variable sans-serif moderna que escala do micro 10px ao hero 80px sem perder presença. Geist Mono carrega código e tokens. Sem serif no display, sem mistura de famílias — coerência total."
      />

      <Section title="Famílias" meta="2 sistemas">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 8 }}>Display + UI</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 'clamp(40px, 9vw, 56px)', fontWeight: 500, color: 'var(--via-text-primary)', letterSpacing: '-0.025em', lineHeight: 1 }}>Geist</div>
            <p style={{ fontFamily: 'var(--via-font-mono)', fontSize: 11, color: 'var(--via-text-muted)', marginTop: 8 }}>--via-font-display = --via-font<br />variable · 100–900 · Vercel</p>
          </div>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 8 }}>Mono</p>
            <div style={{ fontFamily: 'var(--via-font-mono)', fontSize: 'clamp(30px, 7vw, 48px)', fontWeight: 500, color: 'var(--via-text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>Geist Mono</div>
            <p style={{ fontFamily: 'var(--via-font-mono)', fontSize: 11, color: 'var(--via-text-muted)', marginTop: 8 }}>--via-font-mono<br />variable · 100–900 · código + tokens</p>
          </div>
        </div>
      </Section>

      <Section title="Escala" meta="12 tokens · hero → micro">
        {sizes.map((s) => (
          <div className="vds-type-row" key={s.lbl}>
            <span className="vds-type-label">
              {s.lbl}
              <span className="vds-type-token">{s.tok}</span>
            </span>
            <span
              className="vds-type-sample"
              style={{
                fontFamily: 'var(--via-font-display)',
                fontWeight: s.weight,
                letterSpacing: s.ls,
                lineHeight: 1.1,
                textTransform: s.caps ? 'uppercase' : 'none',
                '--vds-sample-size': `${s.size}px`,
              } as CSSProperties}
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
          a marca destaca uma palavra do headline com peso menor (500 → 400) e a cor{' '}
          <code className="vds-code-inline">--via-text-muted</code> — token, não a paleta crua,
          pra sobreviver ao tema escuro. O contraste vem da matéria, não da inclinação.
          Mais minimal, mais moderno.
        </p>
        <div
          style={{
            padding: 'clamp(24px, 5vw, 48px)',
            background: 'var(--via-gray-50)',
            borderRadius: 'var(--via-radius-lg)',
            border: '0.5px solid var(--via-navy-08)',
            marginTop: 16,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--via-font-display)',
              fontSize: 'clamp(30px, 7.5vw, 56px)',
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

      <Section title="Letter-spacing buckets" meta="6 níveis">
        <table className="vds-token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Valor</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="tok">--via-ls-brand</td><td className="val">0.32em</td><td className="use"><code className="vds-code-inline">.via-wordmark</code> · <span style={{ letterSpacing: 'var(--via-ls-brand)' }}>VIVER DE IA</span></td></tr>
            <tr><td className="tok">--via-ls-mark</td><td className="val">0.22em</td><td className="use">Eyebrow de seção · <span style={{ letterSpacing: 'var(--via-ls-mark)' }}>EYEBROW</span></td></tr>
            <tr><td className="tok">--via-ls-label</td><td className="val">0.18em</td><td className="use"><code className="vds-code-inline">.via-label</code> · labels 11px e nav links</td></tr>
            <tr><td className="tok">--via-ls-wide</td><td className="val">0.08em</td><td className="use">Mono micro · contadores, rótulo de gráfico</td></tr>
            <tr><td className="tok">--via-ls-tight</td><td className="val">−0.015em</td><td className="use">H3 e títulos de card</td></tr>
            <tr><td className="tok">--via-ls-tighter</td><td className="val">−0.025em</td><td className="use">Hero, display, H1, H2</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Números são tipografia" meta="Geist 500 tabular">
        <p>
          Stat cards usam <em style={{ fontStyle: 'normal', fontWeight: 500, color: 'var(--via-text-primary)' }}>Geist 500</em> com <code className="vds-code-inline">font-variant-numeric: tabular-nums</code> e{' '}
          <code className="vds-code-inline">letter-spacing: -0.04em</code> — o número grande é o
          único lugar que aperta mais que <code className="vds-code-inline">--via-ls-tighter</code>.
          A moeda é "R$" com espaço, separador de milhar com ponto.
        </p>
        <div style={{ display: 'flex', gap: 40, marginTop: 24, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <div>
            <p className="vds-eyebrow">Economia recorrente</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 'clamp(40px, 10vw, 64px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>R$ 4.600</div>
          </div>
          <div>
            <p className="vds-eyebrow">Conversas analisadas</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 'clamp(40px, 10vw, 64px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>+11.920</div>
          </div>
          <div>
            <p className="vds-eyebrow">Operação financeira</p>
            <div style={{ fontFamily: 'var(--via-font-display)', fontSize: 'clamp(40px, 10vw, 64px)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--via-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>100%</div>
          </div>
        </div>
      </Section>

      <Section title="Casing" meta="quando">
        <p>
          Caps lock é da marca e dos rótulos — nunca do controle. <code className="vds-code-inline">.via-btn</code>{' '}
          e <code className="vds-code-inline">.via-pill</code> não têm{' '}
          <code className="vds-code-inline">text-transform</code>: o casing do botão é
          exatamente o que você digitar, em sentence case.
        </p>
        <table className="vds-token-table">
          <thead>
            <tr><th>Caso</th><th>Onde</th><th>Exemplo</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="tok">Sentence case</td>
              <td className="val">Body, headline, botão, pill</td>
              <td className="use">"Mentoria, comunidade e ferramentas." · "Salvar alterações"</td>
            </tr>
            <tr>
              <td className="tok">UPPERCASE</td>
              <td className="val">Wordmark, eyebrow, label de seção, header de tabela</td>
              <td className="use">"TURMA 2026.2 · BRASIL"</td>
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
        <p>
          Em app novo, o <code className="vds-code-inline">&lt;link&gt;</code> no{' '}
          <code className="vds-code-inline">&lt;head&gt;</code> — baixa em paralelo com o CSS.
          Este site carrega o mesmo par de famílias por{' '}
          <code className="vds-code-inline">@import</code> no topo de{' '}
          <code className="vds-code-inline">src/index.css</code>.
        </p>
        <CodeBlock>{`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" />`}</CodeBlock>
      </Section>
    </>
  );
}
