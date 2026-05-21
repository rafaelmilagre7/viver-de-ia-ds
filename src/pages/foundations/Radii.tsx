import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import '../pages.css';

const radii = [
  { tok: '--via-radius-xs', px: 4, use: 'Inline pills minúsculas, kbd' },
  { tok: '--via-radius-sm', px: 8, use: 'Tags, badges' },
  { tok: '--via-radius-md', px: 12, use: 'Inputs, tooltips' },
  { tok: '--via-radius-lg', px: 20, use: 'Cards (default)' },
  { tok: '--via-radius-xl', px: 28, use: 'Hero glass panels' },
  { tok: '--via-radius-2xl', px: 40, use: 'Liquid sheets full-bleed' },
  { tok: '--via-radius-pill', px: 999, use: 'Buttons (sempre), pills, avatares' },
];

export default function Radii() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · raios"
        title={
          <>
            Cards <em>arredondam</em>, botões viram <em>pílula</em>.
          </>
        }
        lede="Cards em 20px, inputs em 12px, botões sempre em pill. Painéis de hero podem ir até 28 ou 40 pra render o efeito 'folha líquida'. Não misture raios sem razão."
      />

      <Section title="Escala" meta="7 níveis">
        <div className="vds-radii-grid" style={{ marginTop: 16 }}>
          {radii.map((r) => (
            <div
              key={r.tok}
              className="vds-radii-tile"
              style={{ borderRadius: r.px }}
            >
              <span className="vds-radii-label">{r.tok.replace('--via-radius-', '')}</span>
              <span className="vds-radii-value">{r.px === 999 ? 'pill (999)' : `${r.px}px`}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Quando usar" meta="regra de polegar">
        <table className="vds-token-table">
          <thead>
            <tr><th>Raio</th><th>Onde</th><th>Por quê</th></tr>
          </thead>
          <tbody>
            {radii.map((r) => (
              <tr key={r.tok}>
                <td className="tok">{r.tok}</td>
                <td className="val">{r.px === 999 ? 'pill' : `${r.px}px`}</td>
                <td className="use">{r.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}
