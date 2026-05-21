import { ChevronUp } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './kpi.css';

function Tile({ lbl, num, em, delta, path, gid, meta }: { lbl: string; num: string; em?: string; delta: string; path: string; gid: string; meta: string }) {
  return (
    <div className="vds-kpi-tile">
      <span className="lbl">{lbl}</span>
      <div className="num-row">
        <span className="num">{num}{em && <em> {em}</em>}</span>
        <span className="delta up">
          <ChevronUp size={10} strokeWidth={2.5} />
          {delta}
        </span>
      </div>
      <svg className="spark" viewBox="0 0 200 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--via-navy)" stopOpacity="0.20" />
            <stop offset="100%" stopColor="var(--via-navy)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L 200 40 L 0 40 Z`} fill={`url(#${gid})`} />
        <path d={path} fill="none" style={{ stroke: "var(--via-navy)" }} strokeWidth="1.5" />
      </svg>
      <span className="meta">{meta}</span>
    </div>
  );
}

export default function Kpi() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · KPI"
        title={<>Tile, número, <em>sparkline</em>.</>}
        lede="Tile de KPI tem label uppercase em cima, número Geist 48 tabular, delta percentual ao lado (verde sutil pra alta, vermelho sutil pra baixa) e uma sparkline navy embaixo. Sem grid, sem axis labels — é uma intuição visual, não um gráfico."
      />

      <Section title="2 tiles" meta="formato canônico">
        <div className="vds-kpi-grid">
          <Tile lbl="Cases publicados" num="206" delta="+18%" gid="g1"
            path="M 0 32 L 25 28 L 50 30 L 75 22 L 100 24 L 125 18 L 150 15 L 175 12 L 200 6"
            meta="90 dias · vs período anterior" />
          <Tile lbl="Receita influenciada" num="R$" em="248k" delta="+42%" gid="g2"
            path="M 0 30 L 25 26 L 50 28 L 75 18 L 100 22 L 125 14 L 150 18 L 175 8 L 200 4"
            meta="2026 · todos os cases" />
        </div>
      </Section>

      <Section title="4 tiles em fila" meta="dashboard">
        <div className="vds-kpi-row">
          <Tile lbl="Alunos ativos" num="312" delta="+24%" gid="g3"
            path="M 0 34 L 25 30 L 50 28 L 75 24 L 100 20 L 125 22 L 150 16 L 175 12 L 200 8"
            meta="trimestre" />
          <Tile lbl="NPS" num="84" delta="+6" gid="g4"
            path="M 0 18 L 25 14 L 50 16 L 75 12 L 100 14 L 125 10 L 150 8 L 175 10 L 200 6"
            meta="últimos 30 dias" />
          <Tile lbl="Implementações" num="48" delta="+12" gid="g5"
            path="M 0 24 L 25 22 L 50 18 L 75 20 L 100 16 L 125 14 L 150 18 L 175 12 L 200 10"
            meta="ano · em produção" />
          <Tile lbl="Cases novos" num="11" delta="+3" gid="g6"
            path="M 0 28 L 25 26 L 50 22 L 75 24 L 100 18 L 125 16 L 150 20 L 175 14 L 200 12"
            meta="mês corrente" />
        </div>
      </Section>
    </>
  );
}
