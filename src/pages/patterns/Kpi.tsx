import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import ChartState, { type ChartStateKind } from '../components/ChartState';
import { Skeleton } from '../../lib/Skeleton/Skeleton';
import { formatCompact, formatDelta } from '../../lib/format';
import './kpi.css';

/**
 * Tile de KPI · direto na camada de dados canônica (src/styles/data.css).
 *
 * · .via-metric / --atmos          o vidro certo, já com atmosfera navy
 * · .via-metric__label/value/foot  label, número tabular, rodapé
 * · .via-metric__value small       prefixo de moeda menor que o número
 * · .via-meta-chip + .via-delta    variação NEUTRA: chip navy, seta e sinal.
 *                                  Verde/coral só quando há meta ou orçado
 *                                  e o bom/ruim é real (ver FP&A)
 * · .via-spark                     sparkline sem gradiente bespoke
 *                                  (linha em --via-chart-ink · adapta no dark)
 * · ChartState size="spark"        carregando · sem dados · erro no lugar da sparkline
 */
function Delta({ value, unit }: { value: number; unit?: 'percent' }) {
  const Seta = value < 0 ? ArrowDownRight : ArrowUpRight;
  return (
    <span className="via-meta-chip via-delta">
      <Seta size={14} strokeWidth={1.75} aria-hidden="true" />
      {formatDelta(value, { unit: unit ?? 'number' })}
    </span>
  );
}

function Tile({
  lbl, cur, num, delta, unit, path, meta,
}: {
  lbl: string;
  cur?: string;
  num: string;
  delta: number;
  unit?: 'percent';
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
        <Delta value={delta} unit={unit} />
        <span className="meta">{meta}</span>
      </span>
      <svg className="via-spark" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
        <path className="via-spark__area" d={`${path} L 200 40 L 0 40 Z`} />
        <path d={path} />
      </svg>
    </article>
  );
}

/** Tile sem número ainda: segura o lugar (mesma altura) e diz por quê. */
function TileEstado({ lbl, state, onRetry }: { lbl: string; state: ChartStateKind; onRetry?: () => void }) {
  return (
    <article className="via-metric via-metric--atmos vds-kpi-tile is-state">
      <span className="via-metric__label">{lbl}</span>
      <span className="via-metric__value vds-kpi-nil" aria-hidden="true">
        {state === 'loading' ? <Skeleton variant="rect" width={96} height={30} /> : '—'}
      </span>
      <ChartState state={state} size="spark" label={`o número de ${lbl.toLowerCase()}`} onRetry={onRetry} />
    </article>
  );
}

const RECEITA = {
  lbl: 'Receita influenciada',
  cur: 'R$',
  num: formatCompact(248_000),
  delta: 42,
  unit: 'percent' as const,
  path: 'M 0 30 L 25 26 L 50 28 L 75 18 L 100 22 L 125 14 L 150 18 L 175 8 L 200 4',
  meta: '2026 · todas as soluções',
};

/* O tile de erro é vivo: Tentar de novo → carregando → número. */
function EstadosDoTile() {
  const [demo, setDemo] = useState<'error' | 'loading' | 'ok'>('error');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const tentar = () => {
    setDemo('loading');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDemo('ok'), 1400);
  };

  return (
    <>
      <div className="via-metric-grid vds-kpi-row vds-kpi-states">
        <TileEstado lbl="Membros ativos" state="loading" />
        <TileEstado lbl="Consultas da semana" state="empty" />
        <div aria-live="polite" className="vds-kpi-live">
          {demo === 'ok' ? (
            <Tile {...RECEITA} />
          ) : (
            <TileEstado lbl={RECEITA.lbl} state={demo} onRetry={tentar} />
          )}
        </div>
      </div>
      <p className="vds-kpi-note">
        O tile não some nem encolhe enquanto o número não vem: o rótulo fica, o valor vira esqueleto ou travessão
        e a faixa da sparkline explica o estado com o texto da biblioteca de microcopy. O terceiro tile é vivo —
        Tentar de novo carrega o número no mesmo lugar.{' '}
        {demo === 'ok' && (
          <button type="button" className="vds-kpi-reset" onClick={() => setDemo('error')}>
            Ver o erro de novo
          </button>
        )}
      </p>
    </>
  );
}

export default function Kpi() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · KPI"
        title={<>Tile, número, <em>sparkline</em>.</>}
        lede="Tile de KPI da camada de dados: rótulo em cima, número tabular no display, variação neutra ao lado (chip navy com seta e sinal) e sparkline na tinta de dado embaixo. Sem grade, sem rótulo de eixo — é uma intuição visual, não um gráfico. Verde e coral ficam pra comparação contra meta ou orçado, onde o bom e o ruim são reais. Prefixo de moeda entra menor que o número, porque o dado é o protagonista."
      />

      <Section title="Dois cartões" meta="formato canônico · .via-metric">
        <div className="via-metric-grid vds-kpi-grid">
          <Tile lbl="Soluções em uso" num="18" delta={18} unit="percent"
            path="M 0 32 L 25 28 L 50 30 L 75 22 L 100 24 L 125 18 L 150 15 L 175 12 L 200 6"
            meta="90 dias · vs período anterior" />
          <Tile {...RECEITA} />
        </div>
      </Section>

      <Section title="Quatro cartões em fila" meta="painel · .via-metric-grid">
        <div className="via-metric-grid vds-kpi-row">
          <Tile lbl="Membros ativos" num="312" delta={24} unit="percent"
            path="M 0 34 L 25 30 L 50 28 L 75 24 L 100 20 L 125 22 L 150 16 L 175 12 L 200 8"
            meta="trimestre" />
          <Tile lbl="NPS" num="84" delta={6}
            path="M 0 18 L 25 14 L 50 16 L 75 12 L 100 14 L 125 10 L 150 8 L 175 10 L 200 6"
            meta="últimos 30 dias" />
          <Tile lbl="Implementações" num="48" delta={12}
            path="M 0 24 L 25 22 L 50 18 L 75 20 L 100 16 L 125 14 L 150 18 L 175 12 L 200 10"
            meta="ano · em produção" />
          <Tile lbl="Formações concluídas" num="11" delta={3}
            path="M 0 28 L 25 26 L 50 22 L 75 24 L 100 18 L 125 16 L 150 20 L 175 14 L 200 12"
            meta="mês corrente" />
        </div>
      </Section>

      <Section title="Estados · carregando, sem dados, erro" meta="o tile segura o lugar · texto da biblioteca">
        <EstadosDoTile />
      </Section>
    </>
  );
}
