import { ChevronUp } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './kpi.css';

/**
 * Tile de KPI · direto na camada de dados canônica (src/styles/data.css).
 *
 * · .via-metric / --atmos          o vidro certo, já com atmosfera navy
 * · .via-metric__label/value/foot  label uppercase, número tabular, rodapé
 * · .via-metric__value small       prefixo de moeda menor que o número
 * · .via-delta --up/--down         variação com cor semântica
 * · .via-spark                     sparkline sem gradiente bespoke
 *                                  (linha em --via-chart-ink · adapta no dark)
 */
function Tile({
  lbl, cur, num, delta, path, meta,
}: {
  lbl: string;
  cur?: string;
  num: string;
  delta: string;
  path: string;
  meta: string;
}) {
  return (
    <article className="via-metric via-metric--atmos vds-kpi-tile">
      <span className="via-metric__label">{lbl}</span>
      <span className="via-metric__value">
        {cur && <small>{cur}</small>}
        {num}
      </span>
      <span className="via-metric__foot">
        <span className="via-delta via-delta--up">
          <ChevronUp size={10} strokeWidth={2.5} aria-hidden="true" />
          {delta}
        </span>
        <span className="meta">{meta}</span>
      </span>
      <svg className="via-spark" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
        <path className="via-spark__area" d={`${path} L 200 40 L 0 40 Z`} />
        <path d={path} />
      </svg>
    </article>
  );
}

export default function Kpi() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · KPI"
        title={<>Tile, número, <em>sparkline</em>.</>}
        lede="Tile de KPI da camada de dados: label uppercase em cima, número tabular no display, variação com cor semântica ao lado e sparkline na tinta de dado embaixo. Sem grid, sem axis labels — é uma intuição visual, não um gráfico. Prefixo de moeda entra menor que o número, porque o dado é o protagonista."
      />

      <Section title="2 tiles" meta="formato canônico · .via-metric">
        <div className="via-metric-grid vds-kpi-grid">
          <Tile lbl="Cases publicados" num="206" delta="+18%"
            path="M 0 32 L 25 28 L 50 30 L 75 22 L 100 24 L 125 18 L 150 15 L 175 12 L 200 6"
            meta="90 dias · vs período anterior" />
          <Tile lbl="Receita influenciada" cur="R$" num="248k" delta="+42%"
            path="M 0 30 L 25 26 L 50 28 L 75 18 L 100 22 L 125 14 L 150 18 L 175 8 L 200 4"
            meta="2026 · todos os cases" />
        </div>
      </Section>

      <Section title="4 tiles em fila" meta="dashboard · .via-metric-grid">
        <div className="via-metric-grid vds-kpi-row">
          <Tile lbl="Alunos ativos" num="312" delta="+24%"
            path="M 0 34 L 25 30 L 50 28 L 75 24 L 100 20 L 125 22 L 150 16 L 175 12 L 200 8"
            meta="trimestre" />
          <Tile lbl="NPS" num="84" delta="+6"
            path="M 0 18 L 25 14 L 50 16 L 75 12 L 100 14 L 125 10 L 150 8 L 175 10 L 200 6"
            meta="últimos 30 dias" />
          <Tile lbl="Implementações" num="48" delta="+12"
            path="M 0 24 L 25 22 L 50 18 L 75 20 L 100 16 L 125 14 L 150 18 L 175 12 L 200 10"
            meta="ano · em produção" />
          <Tile lbl="Cases novos" num="11" delta="+3"
            path="M 0 28 L 25 26 L 50 22 L 75 24 L 100 18 L 125 16 L 150 20 L 175 14 L 200 12"
            meta="mês corrente" />
        </div>
      </Section>
    </>
  );
}
