import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import '../pages.css';

const eases = [
  { tok: '--via-ease', curve: 'cubic-bezier(0.32, 0.08, 0.24, 1)', use: 'Default · confiante, levemente desacelerando' },
  { tok: '--via-ease-out', curve: 'cubic-bezier(0.16, 1, 0.3, 1)', use: 'Saídas snappy · página entrando' },
];

const durations = [
  { tok: '--via-t-fast', ms: 120, use: 'Micro · hover de pill, kbd' },
  { tok: '--via-t', ms: 180, use: 'Default · hover de card, troca de cor' },
  { tok: '--via-t-slow', ms: 360, use: 'Slow · transição de rota, modal' },
];

export default function Motion() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · movimento"
        title={
          <>
            Confiante, <em>desacelerando</em>.
          </>
        }
        lede="O easing da marca é uma curva sutilmente desacelerante. Hover é opacidade, borda, translateY. Active é scale(0.98). Nada de spring bouncy, nada de ripple. A regra: movimento serve a clareza, não a personalidade."
      />

      <Section title="Easing" meta="2 curvas">
        <div className="vds-motion-grid">
          {eases.map((e) => (
            <div key={e.tok} className="vds-motion-card">
              <div>
                <p className="vds-eyebrow">{e.tok}</p>
                <p style={{ fontFamily: 'var(--via-font-mono)', fontSize: 11, color: 'var(--via-gray-500)', marginTop: 6 }}>{e.curve}</p>
              </div>
              <div className="vds-motion-track">
                <div
                  className="vds-motion-dot"
                  style={{ animationTimingFunction: e.curve }}
                />
              </div>
              <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0 }}>{e.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Durações" meta="3 níveis">
        <table className="vds-token-table">
          <thead>
            <tr><th>Token</th><th>Duração</th><th>Quando</th></tr>
          </thead>
          <tbody>
            {durations.map((d) => (
              <tr key={d.tok}>
                <td className="tok">{d.tok}</td>
                <td className="val">{d.ms}ms</td>
                <td className="use">{d.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Padrões de interação" meta="receita">
        <CodeBlock>{`/* Hover em superfície clara */
border-color: var(--via-border-strong);
background: var(--via-navy-06);
box-shadow: var(--via-shadow-md);
transform: translateY(-1px);
transition: var(--via-t);

/* Pressed (button) */
transform: scale(0.98);
box-shadow: var(--via-shadow-sm);

/* Focus */
outline: none;
box-shadow: var(--via-shadow-focus);`}</CodeBlock>
      </Section>

      <Section title="Não faça" meta="off-motion">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Transições curtas em cor, borda e translateY. Drift lento e único em hero
              glass. Reduzir movimento se <code className="vds-code-inline">prefers-reduced-motion</code>.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>
              Bouncy springs, ripples, parallax, partículas, autoplay em loop infinito.
              Movimento que distrai do conteúdo é movimento errado.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
