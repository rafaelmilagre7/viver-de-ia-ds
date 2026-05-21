import { Activity, MessageCircle, Users, Rocket, MoreHorizontal, ChevronUp } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './dashboard.css';

const kpis = [
  { lbl: 'Alunos ativos', num: '312', d: '+24', I: Users },
  { lbl: 'Conversas', num: '11.920', d: '+18%', I: MessageCircle },
  { lbl: 'Implementações', num: '48', d: '+12', I: Rocket },
  { lbl: 'NPS', num: '84', d: '+6', I: Activity },
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
        lede="Layout de dashboard de operação. Eyebrow + título + filtros no topo. Linha de 4 KPIs com sparkline embaixo. Coluna principal com 'progresso' editorial, atividade no lateral em hairline. Sem glass — UI densa pede superfície plana."
      />

      <Section title="Layout completo" meta="header + KPI row + main + side">
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

          <div className="kpi-row">
            {kpis.map((k) => (
              <div key={k.lbl} className="kpi">
                <header>
                  <span className="ico"><k.I size={14} strokeWidth={2} /></span>
                  <span className="lbl">{k.lbl}</span>
                </header>
                <div className="num-row">
                  <span className="num">{k.num}</span>
                  <span className="delta"><ChevronUp size={10} strokeWidth={2.5} />{k.d}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="main-row">
            <div className="main">
              <header>
                <span className="vds-eyebrow">Progresso · turma 2026.2</span>
                <button aria-label="Mais opções" className="more"><MoreHorizontal size={14} strokeWidth={2} /></button>
              </header>
              <div className="bars">
                {[
                  { n: 'Diagnóstico', v: 100 },
                  { n: 'Stack escolhida', v: 92 },
                  { n: 'Agente em homologação', v: 68 },
                  { n: 'Agente em produção', v: 32 },
                  { n: 'Métrica publicada', v: 12 },
                ].map((b) => (
                  <div key={b.n} className="bar-row">
                    <span className="bar-label">{b.n}</span>
                    <div className="bar-track">
                      <span style={{ width: `${b.v}%` }} />
                    </div>
                    <span className="bar-val">{b.v}%</span>
                  </div>
                ))}
              </div>
            </div>

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
