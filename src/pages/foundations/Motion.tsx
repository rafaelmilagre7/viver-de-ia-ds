import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import '../pages.css';

/* Os quatro easings que existem em tokens.css. --via-ease-snap é o mais usado
   do sistema inteiro; documentar só duas curvas escondia justamente a que o
   time escreve todo dia. */
const eases = [
  {
    tok: '--via-ease',
    curve: 'cubic-bezier(0.32, 0.08, 0.24, 1)',
    use: 'Base · a curva da marca. É o easing embutido nos atalhos --via-t*.',
    overshoot: false,
  },
  {
    tok: '--via-ease-snap',
    curve: 'cubic-bezier(.2, .7, .2, 1)',
    use: 'Interação · hover e press. É a curva mais usada do sistema — na dúvida, é esta.',
    overshoot: false,
  },
  {
    tok: '--via-ease-out',
    curve: 'cubic-bezier(0.16, 1, 0.3, 1)',
    use: 'Camada entrando · menu, tooltip, toast, aba, paleta. Sai rápido e assenta.',
    overshoot: false,
  },
  {
    tok: '--via-ease-spring',
    curve: 'cubic-bezier(.34, 1.56, .64, 1)',
    use: 'Overshoot · o único autorizado, e só na marca de um controle: check, radio, switch, thumb.',
    overshoot: true,
  },
];

/* Coluna "valor" mostra o valor REAL do token. --via-t* não é duração:
   é shorthand duração + easing. */
const durations = [
  {
    tok: '--via-dur',
    val: '220ms',
    use: 'Duração de interação padrão. É o único que vale sozinho em transition-duration.',
  },
  { tok: '--via-t-fast', val: '120ms var(--via-ease)', use: 'Atalho pronto · micro: pill, kbd.' },
  { tok: '--via-t', val: '180ms var(--via-ease)', use: 'Atalho pronto · troca de cor, hover de card.' },
  { tok: '--via-t-slow', val: '360ms var(--via-ease)', use: 'Atalho pronto · transição de rota, modal.' },
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
        lede="O easing da marca é uma curva sutilmente desacelerante. Hover é cor, borda e translateY(-1px). Press é scale(0.985). Overshoot existe no sistema, mas fica preso à marca de um controle — nunca em card, layout ou rota. A regra: movimento serve a clareza, não a personalidade."
      />

      <Section title="Easing" meta="4 curvas">
        <div className="vds-motion-grid">
          {eases.map((e) => (
            <div key={e.tok} className="vds-motion-card">
              <div>
                <p className="vds-motion-tok">{e.tok}</p>
                <p className="vds-motion-curve">{e.curve}</p>
              </div>
              <div className="vds-motion-track" data-overshoot={e.overshoot ? 'true' : undefined}>
                <div className="vds-motion-dot" style={{ animationTimingFunction: e.curve }} />
              </div>
              <p className="vds-motion-use">{e.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Durações" meta="1 duração · 3 atalhos">
        <table className="vds-token-table">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Quando</th></tr>
          </thead>
          <tbody>
            {durations.map((d) => (
              <tr key={d.tok}>
                <td className="tok">{d.tok}</td>
                <td className="val">{d.val}</td>
                <td className="use">{d.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="vds-motion-note">
          <code className="vds-code-inline">--via-t-fast</code>,{' '}
          <code className="vds-code-inline">--via-t</code> e{' '}
          <code className="vds-code-inline">--via-t-slow</code> são shorthand (duração + easing):
          só valem dentro de <code className="vds-code-inline">transition</code>. Em{' '}
          <code className="vds-code-inline">transition-duration</code> o valor é inválido, o
          browser descarta a declaração e a duração cai para <strong>0s</strong> — a transição
          some. Para duração isolada existe <code className="vds-code-inline">--via-dur</code>.
        </p>
      </Section>

      <Section title="Padrões de interação" meta="receita">
        <CodeBlock>{`/* Hover · superfície clara */
border-color: var(--via-navy-20);
background:   var(--via-navy-06);
box-shadow:   var(--via-shadow-md);
transform:    translateY(-1px);
transition:
  border-color var(--via-dur) var(--via-ease-snap),
  background   var(--via-dur) var(--via-ease-snap),
  box-shadow   var(--via-dur) var(--via-ease-snap),
  transform    var(--via-dur) var(--via-ease-snap);

/* Press · é o que o <Button> da library faz */
transform: translateY(0) scale(0.985);
transition-duration: 100ms;

/* Foco */
outline: none;
box-shadow: var(--via-shadow-focus);

/* Rede global de acessibilidade · já vive em tokens.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}</CodeBlock>
        <p className="vds-motion-note">
          <code className="vds-code-inline">--via-border-strong</code> não entra em{' '}
          <code className="vds-code-inline">border-color</code>. No tema claro o token é{' '}
          <code className="vds-code-inline">1px solid …</code> — um shorthand — então a declaração
          é inválida e a borda volta para <code className="vds-code-inline">currentcolor</code>.
          Para cor de borda no hover, <code className="vds-code-inline">--via-navy-20</code>.
        </p>
      </Section>

      <Section title="Não faça" meta="off-motion">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Transições curtas em cor, borda e translateY, com{' '}
              <code className="vds-code-inline">--via-dur</code> +{' '}
              <code className="vds-code-inline">--via-ease-snap</code>. Drift lento e único em hero
              glass. Reduzir movimento se <code className="vds-code-inline">prefers-reduced-motion</code>.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Spring com overshoot fora de check, radio, switch e thumb. Ripple, parallax,
              partículas, autoplay em loop infinito. Movimento que distrai do conteúdo é movimento
              errado.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
