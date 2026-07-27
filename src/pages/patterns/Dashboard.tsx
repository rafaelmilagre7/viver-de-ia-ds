import { Activity, MessageCircle, Users, Rocket, MoreHorizontal, ChevronUp } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './dashboard.css';

/**
 * Dashboard de operação.
 *
 * Usa a camada de dados canônica (src/styles/data.css):
 * · .via-metric-grid + .via-metric   KPI em vidro — o vidro fica AQUI
 * · .via-table-wrap + .via-table     progresso da turma em tabela, sem vidro
 * · .via-num / .via-bar              número tabular à direita + micro-barra
 */

const kpis = [
  { lbl: 'Alunos ativos', num: '312', d: '+24', ref: 'vs. 30 dias', I: Users },
  { lbl: 'Conversas', num: '11.920', d: '+18%', ref: 'vs. 30 dias', I: MessageCircle },
  { lbl: 'Implementações', num: '48', d: '+12', ref: 'em produção', I: Rocket },
  { lbl: 'NPS', num: '84', d: '+6', ref: '212 respostas', I: Activity },
];

const etapas = [
  { n: 'Diagnóstico', v: 100 },
  { n: 'Stack escolhida', v: 92 },
  { n: 'Agente em homologação', v: 68 },
  { n: 'Agente em produção', v: 32 },
  { n: 'Métrica publicada', v: 12 },
];

const activity = [
  { t: 'Caio Ribeiro', a: 'aprovou case', what: 'Efizi · E-commerce', when: '4 min' },
  { t: 'Larissa Tavares', a: 'agendou sessão', what: 'Mentoria 1-a-1 com Márisson', when: '38 min' },
  { t: 'Sistema', a: 'publicou métrica', what: 'Receita influenciada bate R$ 248k', when: '2h' },
  { t: 'Guilherme Delorenzo', a: 'enviou depoimento', what: '5× mais rápida em decisão comercial', when: '4h' },
];

export default function Dashboard() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · dashboard"
        title={<>Header denso, <em>4 KPIs</em>, atividade ao lado.</>}
        lede="Layout de dashboard de operação sobre a camada de dados canônica. KPI em vidro (.via-metric), progresso da turma em tabela sem vidro (.via-table + .via-bar) e atividade em hairline ao lado. O vidro fica no card de métrica; a tabela fica na superfície limpa."
      />

      <Section title="Layout completo" meta="header + KPI row + tabela + side">
        <div className="vds-dash">
          <header className="dash-h">
            <div>
              <span className="vds-eyebrow">Operação · maio 2026</span>
              <h2>Painel da mentoria</h2>
            </div>
            <div className="filters">
              <span className="filt active">Últimos 30 dias</span>
              <span className="filt">90 dias</span>
              <span className="filt">Ano</span>
            </div>
          </header>

          <div className="via-metric-grid kpi-row">
            {kpis.map((k) => (
              <article key={k.lbl} className="via-metric via-metric--atmos dash-metric">
                <span className="via-metric__label">
                  <span className="ico" aria-hidden="true"><k.I size={13} strokeWidth={2} /></span>
                  {k.lbl}
                </span>
                <span className="via-metric__value">{k.num}</span>
                <span className="via-metric__foot">
                  <span className="via-delta via-delta--up">
                    <ChevronUp size={10} strokeWidth={2.5} aria-hidden="true" />
                    {k.d}
                  </span>
                  <span className="dash-metric-ref">{k.ref}</span>
                </span>
              </article>
            ))}
          </div>

          <div className="main-row">
            <section className="main">
              <header>
                <span className="vds-eyebrow">Progresso · turma 2026.2</span>
                <button aria-label="Mais opções" className="more"><MoreHorizontal size={14} strokeWidth={2} /></button>
              </header>

              <div className="via-table-wrap" tabIndex={0} role="region" aria-label="Progresso da turma por etapa, rolável">
                <table className="via-table via-table--compact">
                  <caption className="dash-sr">
                    Percentual da turma 2026.2 que concluiu cada etapa da jornada.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Etapa</th>
                      <th scope="col">Avanço da turma</th>
                      <th scope="col" className="via-num">Concluiu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etapas.map((b) => (
                      <tr key={b.n}>
                        <th scope="row">{b.n}</th>
                        <td className="dash-bar-cell">
                          <span className="via-bar" aria-hidden="true">
                            <span className="via-bar__fill" style={{ width: `${b.v}%` }} />
                          </span>
                        </td>
                        <td className="via-num">{b.v}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="side">
              <header>
                <span className="vds-eyebrow">Atividade recente</span>
              </header>
              <ul>
                {activity.map((a, i) => (
                  <li key={i}>
                    <div className="who">{a.t}</div>
                    <div className="what">
                      <em>{a.a}</em> {a.what}
                    </div>
                    <div className="when">{a.when}</div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
