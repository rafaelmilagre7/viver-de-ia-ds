import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './stats.css';

const stats = [
  { num: '+11.920', lbl: 'Conversas analisadas', sub: 'Efizi · 90 dias' },
  { num: 'R$ 4.600', suffix: '/mês', lbl: 'Economia recorrente', sub: 'Balzani & Zimbel' },
  { num: '100%', lbl: 'Operação financeira', sub: 'Conferir Engenharia' },
  { num: '206', lbl: 'Cases publicados', sub: 'Diretório vivo' },
];

export default function Stats() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · stats"
        title={<>Número <em>grande</em>, contexto pequeno.</>}
        lede="Stats são tipografia de primeira classe — Geist 300 em tabular-nums, navy. O eyebrow uppercase em cima nomeia. A linha abaixo dá o contexto humano ('Efizi · 90 dias'). Sem barras, sem gráficos — o número fala."
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
