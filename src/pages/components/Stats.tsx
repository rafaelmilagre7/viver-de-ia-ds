import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './stats.css';

const stats = [
  { num: 'R$ 162.000', lbl: 'Economia gerada', sub: 'Viva Nexo · saúde' },
  { num: 'R$ 2.000', suffix: '/mês', lbl: 'Economia recorrente', sub: 'Assessoria MAP' },
  { num: '24h', lbl: 'Atendimento com IA', sub: 'Pasetti Viagens & AGX' },
  { num: '521', lbl: 'Cases reais', sub: 'Implementação de IA' },
];

export default function Stats() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · stats"
        title={<>Número <em>grande</em>, contexto pequeno.</>}
        lede="Stats são tipografia de primeira classe — Geist semibold em tabular-nums, navy. O eyebrow uppercase em cima nomeia. A linha abaixo dá o contexto humano ('Assessoria MAP'). Sem barras, sem gráficos — o número fala."
      />

      <Section title="Linha de 4" meta="hairline divider entre">
        <div className="via-stats-row">
          {stats.map((s) => (
            <div key={s.lbl} className="via-stat">
              <p className="vds-eyebrow">{s.lbl}</p>
              <div className="num">
                {s.num}
                {s.suffix && <span className="suffix">{s.suffix}</span>}
              </div>
              <p className="sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Em fundo navy" meta="hero use">
        <div className="via-stats-dark">
          {stats.slice(0, 3).map((s) => (
            <div key={s.lbl} className="via-stat dark">
              <p className="vds-eyebrow">{s.lbl}</p>
              <div className="num">
                {s.num}
                {s.suffix && <span className="suffix">{s.suffix}</span>}
              </div>
              <p className="sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
