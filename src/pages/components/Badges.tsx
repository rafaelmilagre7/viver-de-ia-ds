import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './badges.css';

export default function Badges() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · badges"
        title={<>Pequenos, <em>uppercase</em>, raramente saturados.</>}
        lede="Badges são pequenas etiquetas categóricas. Quatro variantes — solid (forte, navy), soft (default), outline (sutil), status (com cor de significado). Use só quando o item precisa de classificação visível."
      />

      <Section title="Variantes" meta="solid · soft · outline · status">
        <div className="via-badge-stack">
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 10 }}>Filled · brand</p>
            <div className="via-badge-row">
              <span className="via-badge solid">Leaders AI</span>
              <span className="via-badge solid">Featured</span>
              <span className="via-badge solid">Novo</span>
            </div>
          </div>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 10 }}>Soft · uso padrão</p>
            <div className="via-badge-row">
              <span className="via-badge soft">Case estratégico</span>
              <span className="via-badge soft">Mentoria</span>
              <span className="via-badge soft">B2B</span>
            </div>
          </div>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 10 }}>Outline · sutil</p>
            <div className="via-badge-row">
              <span className="via-badge outline">Premium</span>
              <span className="via-badge outline">VIP</span>
            </div>
          </div>
          <div>
            <p className="vds-eyebrow" style={{ marginBottom: 10 }}>Status · dessaturado</p>
            <div className="via-badge-row">
              <span className="via-badge status ok">Aprovado</span>
              <span className="via-badge status warn">Análise</span>
              <span className="via-badge status danger">Pendente</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tokens" meta="anatomia">
        <table className="vds-token-table">
          <thead><tr><th>Token</th><th>Valor</th></tr></thead>
          <tbody>
            <tr><td className="tok">Font</td><td className="val">Inter 10 · 700</td></tr>
            <tr><td className="tok">Tracking</td><td className="val">0.20em uppercase</td></tr>
            <tr><td className="tok">Padding</td><td className="val">6px 11px</td></tr>
            <tr><td className="tok">Radius</td><td className="val">6px</td></tr>
            <tr><td className="tok">Border</td><td className="val">1px · alpha 12%</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
