import { useState } from 'react';
import {
  Wallet, Flame, Hourglass, Repeat, TrendingDown, TrendingUp, AlertCircle, Info,
} from 'lucide-react';
import Section from '../../../components/docs/Section';
import './BurnRunway.css';

/* ==============================================================
   FP&A · BURN RATE & RUNWAY
   --------------------------------------------------------------
   Todos os números desta tela são DERIVADOS de um único modelo de
   caixa (entradas, saídas e MRR por mês). Nada é decorativo:

     burn líquido      = saídas − entradas
     saldo final       = saldo inicial − burn líquido
     burn médio (3m)   = média dos 3 últimos burns
     runway (meses)    = caixa atual ÷ burn médio
     ponto zero        = hoje + runway
     trecho crítico    = meses em que o saldo fica ≤ 3× burn

   Fechamento de jun/2026 · caixa R$ 4.125.000 ÷ R$ 375.000 = 11,0 meses.
   ============================================================== */

/* ---------- modelo ---------- */
type MesFluxo = {
  mes: string;
  entradas: number;
  saidas: number;
  mrr: number;
};

type LinhaFluxo = MesFluxo & {
  burn: number;
  saldoInicial: number;
  saldoFinal: number;
};

const SALDO_ABERTURA = 6_534_000; // posição em 31/dez/2025

const FLUXO: readonly MesFluxo[] = [
  { mes: 'jan/26', entradas: 612_000, saidas: 1_060_000, mrr: 468_000 },
  { mes: 'fev/26', entradas: 648_000, saidas: 1_072_000, mrr: 495_000 },
  { mes: 'mar/26', entradas: 704_000, saidas: 1_116_000, mrr: 522_000 },
  { mes: 'abr/26', entradas: 738_000, saidas: 1_140_000, mrr: 551_000 },
  { mes: 'mai/26', entradas: 796_000, saidas: 1_171_000, mrr: 588_000 },
  { mes: 'jun/26', entradas: 842_000, saidas: 1_190_000, mrr: 612_000 },
];

const LINHAS: readonly LinhaFluxo[] = (() => {
  let saldo = SALDO_ABERTURA;
  return FLUXO.map((m): LinhaFluxo => {
    const burn = m.saidas - m.entradas;
    const saldoInicial = saldo;
    const saldoFinal = saldoInicial - burn;
    saldo = saldoFinal;
    return { ...m, burn, saldoInicial, saldoFinal };
  });
})();

const media = (ns: readonly number[]): number => ns.reduce((a, b) => a + b, 0) / ns.length;
const soma = (ns: readonly number[]): number => ns.reduce((a, b) => a + b, 0);

const ULTIMO = LINHAS[LINHAS.length - 1];
const PENULTIMO = LINHAS[LINHAS.length - 2];
const PRIMEIRO = LINHAS[0];

const CAIXA_ATUAL = ULTIMO.saldoFinal;                              // 4.125.000
const BURN_3M = media(LINHAS.slice(-3).map((l) => l.burn));         // 375.000
const BURN_6M = media(LINHAS.map((l) => l.burn));                   // 401.500
const BURN_ULTIMO = ULTIMO.burn;                                    // 348.000
const PISO_MESES = 12;                                              // política de caixa

const VAR_CAIXA_PCT = ((CAIXA_ATUAL - SALDO_ABERTURA) / SALDO_ABERTURA) * 100;   // −36,9%
const VAR_BURN_PCT = ((BURN_3M - BURN_6M) / BURN_6M) * 100;                      // −6,6%
const VAR_MRR_PCT = ((ULTIMO.mrr - PENULTIMO.mrr) / PENULTIMO.mrr) * 100;        // +4,1%
const MRR_SHARE = (ULTIMO.mrr / ULTIMO.entradas) * 100;                          // 72,7%

const QUEDA_BURN_MES = (PRIMEIRO.burn - ULTIMO.burn) / (LINHAS.length - 1);      // 20.000
const MESES_ATE_BURN_ZERO = ULTIMO.burn / QUEDA_BURN_MES;                        // 17,4

/* ---------- formato BR ---------- */
const nfInt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const num = (v: number): string => nfInt.format(Math.round(v));
const brl = (v: number): string => `R$ ${num(v)}`;
const dec = (v: number): string => nf1.format(v);
const pct = (v: number): string => `${v > 0 ? '+' : v < 0 ? '−' : ''}${nf1.format(Math.abs(v))}%`;
const mes = (v: number): string => (Math.abs(v) >= 2 ? 'meses' : 'mês');

const MESES_ABREV = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'] as const;
/** jul/2026 é o mês corrente (offset 0) — o primeiro mês projetado. */
function rotuloMes(offset: number): string {
  const total = 6 + offset;
  const ano = 2026 + Math.floor(total / 12);
  return `${MESES_ABREV[total % 12]}/${String(ano).slice(2)}`;
}

/* ---------- projeção ---------- */
type MesProjetado = { label: string; saldoInicio: number; critico: boolean };
type Projecao = {
  burn: number;
  runway: number;
  piso: number;
  meses: MesProjetado[];
  mesZero: string;
  mesCritico: string;
};

function projetar(caixa: number, burn: number): Projecao {
  const runway = caixa / burn;
  const total = Math.ceil(runway);
  const piso = burn * 3;
  const meses: MesProjetado[] = Array.from({ length: total }, (_, i) => {
    const saldoInicio = caixa - burn * i;
    return { label: rotuloMes(i), saldoInicio, critico: saldoInicio <= piso + 0.5 };
  });
  const critico = meses.find((m) => m.critico);
  return {
    burn,
    runway,
    piso,
    meses,
    mesZero: meses[meses.length - 1].label,
    mesCritico: critico ? critico.label : meses[meses.length - 1].label,
  };
}

/* ---------- premissas ---------- */
type CenarioKey = 'media3' | 'ultimo' | 'corte';
type Cenario = { key: CenarioKey; label: string; burn: number; nota: string };

const CENARIOS: readonly Cenario[] = [
  { key: 'media3', label: 'Média 3 meses', burn: BURN_3M, nota: 'abr–jun/26 · premissa oficial' },
  { key: 'ultimo', label: 'Burn de junho', burn: BURN_ULTIMO, nota: 'último mês fechado' },
  { key: 'corte', label: 'Corte de 15%', burn: BURN_3M * 0.85, nota: 'plano de contenção' },
];

/* ==============================================================
   Sparkline · mini-tendência de 6 meses
   --------------------------------------------------------------
   UMA série por sparkline → cor única (--via-data-1, resolvida em
   --vds-burn-serie) e SEM legenda: o rótulo do card já nomeia a
   série. Marca fina: linha de 2px, base hairline recessiva e um
   único marcador no ponto mais recente, com halo para ficar ≥8px
   e legível sobre qualquer fundo.
   ============================================================== */
const SPARK_W = 104;
const SPARK_H = 34;
const SPARK_P = 5;

type SparkProps = { valores: readonly number[]; id: string; rotulo: string };

function Sparkline({ valores, id, rotulo }: SparkProps) {
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const amplitude = max - min || 1;
  const pontos = valores.map((v, i) => ({
    x: SPARK_P + (i * (SPARK_W - SPARK_P * 2)) / (valores.length - 1),
    y: SPARK_P + (1 - (v - min) / amplitude) * (SPARK_H - SPARK_P * 2 - 3),
  }));
  const linha = pontos.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' L ');
  const area = `M ${linha} L ${SPARK_W - SPARK_P},${SPARK_H - 1} L ${SPARK_P},${SPARK_H - 1} Z`;
  const fim = pontos[pontos.length - 1];

  return (
    <svg
      className="vds-fpa-burn-spark"
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      role="img"
      aria-label={rotulo}
    >
      <title>{rotulo}</title>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--vds-burn-serie)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--vds-burn-serie)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* base recessiva · dá chão à mini-série sem competir com ela */}
      <line
        x1={SPARK_P}
        y1={SPARK_H - 1}
        x2={SPARK_W - SPARK_P}
        y2={SPARK_H - 1}
        stroke="var(--via-data-grid)"
        strokeWidth="1"
      />
      <path d={area} fill={`url(#${id})`} />
      <path
        d={`M ${linha}`}
        fill="none"
        stroke="var(--vds-burn-serie)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* último ponto · halo da superfície + miolo da série = marca de ~9px */}
      <circle cx={fim.x} cy={fim.y} r="4.6" fill="var(--via-surface)" />
      <circle cx={fim.x} cy={fim.y} r="3" fill="var(--vds-burn-serie)" />
    </svg>
  );
}

/* ==============================================================
   Timeline de runway · barras de saldo projetado até o ponto zero
   --------------------------------------------------------------
   UMA medida, UM eixo (R$ de saldo, base em zero). Nada de segunda
   escala: burn e runway não dividem eixo com o saldo — vivem nos
   cards e na fórmula acima. A única variação de cor é STATUS
   (abaixo do piso de 3 meses), que é reservado e nunca vira série.
   Toda barra é ESTIMATIVA, então toda barra é hachurada — a legenda
   diz isso em texto.
   ============================================================== */
const VB_W = 900;
const VB_H = 300;
const PAD = { top: 46, right: 24, bottom: 48, left: 84 };
const PLOT_W = VB_W - PAD.left - PAD.right;
const PLOT_H = VB_H - PAD.top - PAD.bottom;
const ESCALA_MAX = 4_500_000;
const GRID = [0, 1_500_000, 3_000_000, 4_500_000];

const yDe = (v: number): number => PAD.top + PLOT_H * (1 - v / ESCALA_MAX);
const BASE_Y = yDe(0);

/** Ponta arredondada no topo, base QUADRADA ancorada no eixo. */
function barraAncorada(x: number, y: number, w: number, h: number, r = 4): string {
  const rr = Math.max(0, Math.min(r, w / 2, h));
  const x2 = x + w;
  const base = y + h;
  return [
    `M ${x.toFixed(2)} ${base.toFixed(2)}`,
    `L ${x.toFixed(2)} ${(y + rr).toFixed(2)}`,
    `A ${rr} ${rr} 0 0 1 ${(x + rr).toFixed(2)} ${y.toFixed(2)}`,
    `L ${(x2 - rr).toFixed(2)} ${y.toFixed(2)}`,
    `A ${rr} ${rr} 0 0 1 ${x2.toFixed(2)} ${(y + rr).toFixed(2)}`,
    `L ${x2.toFixed(2)} ${base.toFixed(2)}`,
    'Z',
  ].join(' ');
}

function RunwayTimeline({ proj }: { proj: Projecao }) {
  const n = proj.meses.length;
  const slot = PLOT_W / n;
  /* gap mínimo de 8px entre barras vizinhas · nunca colam */
  const barW = Math.max(10, Math.min(46, slot - 8));
  const zeroX = PAD.left + (proj.runway / n) * PLOT_W;
  const idxCritico = proj.meses.findIndex((m) => m.critico);
  const criticoX = PAD.left + idxCritico * slot;
  const pisoY = yDe(proj.piso);
  const primeiro = proj.meses[0];
  const critico = idxCritico >= 0 ? proj.meses[idxCritico] : null;

  return (
    <svg
      className="vds-fpa-burn-chart"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Saldo de caixa projetado de ${proj.meses[0].label} a ${proj.mesZero}. Runway de ${dec(proj.runway)} meses. A partir de ${proj.mesCritico} o caixa fica abaixo de três meses de burn.`}
    >
      <title>Projeção de caixa até o ponto zero</title>
      <defs>
        {/* hachura de projeção · listras na cor do fundo, funciona nos dois temas */}
        <pattern
          id="fpa-burn-proj"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--via-bg)" strokeWidth="1.7" strokeOpacity="0.38" />
        </pattern>
      </defs>

      {/* zona crítica · fundo de status discreto, atrás de tudo */}
      {critico && (
        <rect
          x={criticoX}
          y={PAD.top - 10}
          width={Math.max(zeroX - criticoX, 0)}
          height={BASE_Y - PAD.top + 10}
          fill="var(--vds-burn-crit)"
          fillOpacity="0.06"
          rx="8"
        />
      )}

      {/* grade recessiva (hairline) + eixo de valor · base em ZERO */}
      {GRID.map((v) => (
        <g key={v}>
          <line
            x1={PAD.left}
            y1={yDe(v)}
            x2={VB_W - PAD.right}
            y2={yDe(v)}
            stroke={v === 0 ? 'var(--via-data-axis)' : 'var(--via-data-grid)'}
            strokeWidth="1"
          />
          <text
            className="vds-fpa-burn-axis"
            x={PAD.left - 14}
            y={yDe(v)}
            textAnchor="end"
            dominantBaseline="middle"
          >
            {v === 0 ? '0' : dec(v / 1_000_000)}
          </text>
        </g>
      ))}

      {/* unidade do eixo · evita repetir "R$ mi" em cada rótulo */}
      <text className="vds-fpa-burn-unit" x={PAD.left - 14} y={PAD.top - 22} textAnchor="end">
        R$ mi
      </text>

      {/* piso operacional · 3 meses de burn */}
      <line
        x1={PAD.left}
        y1={pisoY}
        x2={VB_W - PAD.right}
        y2={pisoY}
        stroke="var(--via-data-axis)"
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      {/* rótulo da linha de referência · ancorado ANTES do marcador de caixa
          zero e ABAIXO da linha — em cima ele encosta no rótulo direto da
          barra que cruza o piso quando a premissa muda */}
      <text className="vds-fpa-burn-ref" x={zeroX - 10} y={pisoY + 13} textAnchor="end">
        piso · 3 meses de burn
      </text>

      {/* barras · saldo no início de cada mês */}
      {proj.meses.map((m, i) => {
        const x = PAD.left + i * slot + (slot - barW) / 2;
        const y = yDe(m.saldoInicio);
        const d = barraAncorada(x, y, barW, Math.max(BASE_Y - y, 2), 4);
        return (
          <g key={m.label} className={`vds-fpa-burn-bar${m.critico ? ' is-critico' : ''}`}>
            <title>
              {`${m.label} · ${brl(m.saldoInicio)} no início do mês${m.critico ? ' · abaixo do piso de 3 meses de burn' : ''}`}
            </title>
            <path d={d} fill={m.critico ? 'var(--vds-burn-crit)' : 'var(--vds-burn-serie)'} />
            <path d={d} fill="url(#fpa-burn-proj)" />
            <text
              className={`vds-fpa-burn-tick${m.critico ? ' is-critico' : ''}`}
              x={x + barW / 2}
              y={BASE_Y + 22}
              textAnchor="middle"
            >
              {m.label}
            </text>
          </g>
        );
      })}

      {/* marcador · hoje */}
      <line
        x1={PAD.left}
        y1={PAD.top - 14}
        x2={PAD.left}
        y2={BASE_Y}
        stroke="var(--via-data-axis)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <text className="vds-fpa-burn-mark" x={PAD.left + 8} y={PAD.top - 22} textAnchor="start">
        hoje · {proj.meses[0].label}
      </text>

      {/* marcador · ponto zero */}
      <line
        x1={zeroX}
        y1={PAD.top - 14}
        x2={zeroX}
        y2={BASE_Y}
        stroke="var(--vds-burn-crit)"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <text
        className="vds-fpa-burn-mark is-critico"
        x={zeroX - 8}
        y={PAD.top - 22}
        textAnchor="end"
      >
        caixa zero · {proj.mesZero}
      </text>

      {/* rótulo direto SELETIVO · só os dois pontos que a leitura precisa:
          onde o caixa começa e onde ele cruza o piso de 3 meses */}
      <text
        className="vds-fpa-burn-val"
        x={PAD.left + (slot - barW) / 2}
        y={yDe(primeiro.saldoInicio) - 10}
        textAnchor="start"
      >
        {brl(primeiro.saldoInicio)}
      </text>
      {critico && (
        <text
          className="vds-fpa-burn-val"
          x={PAD.left + idxCritico * slot + slot / 2}
          y={yDe(critico.saldoInicio) - 10}
          textAnchor="middle"
        >
          {brl(critico.saldoInicio)}
        </text>
      )}
    </svg>
  );
}

/* ==============================================================
   Seção
   ============================================================== */
export default function BurnRunway() {
  const [cenarioKey, setCenarioKey] = useState<CenarioKey>('media3');
  const cenario = CENARIOS.find((c) => c.key === cenarioKey) ?? CENARIOS[0];
  const proj = projetar(CAIXA_ATUAL, cenario.burn);

  const folga = proj.runway - PISO_MESES;
  const acimaDoPiso = folga >= 0;
  const sobra = MESES_ATE_BURN_ZERO - proj.runway;

  const totalEntradas = soma(LINHAS.map((l) => l.entradas));
  const totalSaidas = soma(LINHAS.map((l) => l.saidas));
  const totalBurn = soma(LINHAS.map((l) => l.burn));

  return (
    <>
      <Section
        title="Burn & runway · a saúde de caixa"
        meta="4 métricas em vidro · projeção até o ponto zero · premissa alternável"
      >
        <div className="vds-fpa-burn">
          {/* ---------- Peça 1 · métricas em vidro ---------- */}
          <div className="vds-fpa-burn-cards">
            <article className="via-tile via-tile--atmos via-tile--lift vds-fpa-burn-card">
              <header className="vds-fpa-burn-card-head">
                <span className="vds-fpa-burn-card-lbl">
                  <Wallet size={12} strokeWidth={2.1} />
                  Caixa atual
                </span>
                <span className="vds-fpa-burn-card-ref">30/jun/2026</span>
              </header>
              <p className="vds-fpa-burn-card-val">
                <span className="cur">R$</span>
                <span className="num">{num(CAIXA_ATUAL)}</span>
              </p>
              <div className="vds-fpa-burn-card-foot">
                <span className="vds-fpa-burn-chip is-desfavoravel">
                  <TrendingDown size={11} strokeWidth={2.3} />
                  <span className="t">{pct(VAR_CAIXA_PCT)} no semestre</span>
                </span>
                <Sparkline
                  id="fpa-burn-sp-caixa"
                  valores={LINHAS.map((l) => l.saldoFinal)}
                  rotulo="Saldo de caixa nos últimos 6 meses, em queda"
                />
              </div>
            </article>

            <article className="via-tile via-tile--atmos via-tile--lift vds-fpa-burn-card">
              <header className="vds-fpa-burn-card-head">
                <span className="vds-fpa-burn-card-lbl">
                  <Flame size={12} strokeWidth={2.1} />
                  Burn líquido médio
                </span>
                <span className="vds-fpa-burn-card-ref">3 meses</span>
              </header>
              <p className="vds-fpa-burn-card-val">
                <span className="cur">R$</span>
                <span className="num">{num(BURN_3M)}</span>
                <span className="un">/mês</span>
              </p>
              <div className="vds-fpa-burn-card-foot">
                <span className="vds-fpa-burn-chip is-favoravel">
                  <TrendingDown size={11} strokeWidth={2.3} />
                  <span className="t">{pct(VAR_BURN_PCT)} vs. média de 6 meses</span>
                </span>
                <Sparkline
                  id="fpa-burn-sp-burn"
                  valores={LINHAS.map((l) => l.burn)}
                  rotulo="Burn líquido nos últimos 6 meses, em queda"
                />
              </div>
            </article>

            <article className="via-tile via-tile--atmos via-tile--lift vds-fpa-burn-card">
              <header className="vds-fpa-burn-card-head">
                <span className="vds-fpa-burn-card-lbl">
                  <Hourglass size={12} strokeWidth={2.1} />
                  Runway
                </span>
                <span className="vds-fpa-burn-card-ref">{cenario.label}</span>
              </header>
              <p className="vds-fpa-burn-card-val">
                <span className="num">{dec(proj.runway)}</span>
                <span className="un">{mes(proj.runway)}</span>
              </p>
              <div className="vds-fpa-burn-card-foot is-stack">
                <span className={`vds-fpa-burn-chip ${acimaDoPiso ? 'is-favoravel' : 'is-desfavoravel'}`}>
                  {acimaDoPiso ? <TrendingUp size={11} strokeWidth={2.3} /> : <AlertCircle size={11} strokeWidth={2.3} />}
                  <span className="t">
                    {dec(Math.abs(folga))} {mes(folga)} {acimaDoPiso ? 'acima' : 'abaixo'} do piso de {PISO_MESES}
                  </span>
                </span>
                <span className="vds-fpa-burn-card-calc">
                  {brl(CAIXA_ATUAL)} ÷ {brl(cenario.burn)}
                </span>
              </div>
            </article>

            <article className="via-tile via-tile--atmos via-tile--lift vds-fpa-burn-card">
              <header className="vds-fpa-burn-card-head">
                <span className="vds-fpa-burn-card-lbl">
                  <Repeat size={12} strokeWidth={2.1} />
                  Receita recorrente
                </span>
                <span className="vds-fpa-burn-card-ref">jun/2026</span>
              </header>
              <p className="vds-fpa-burn-card-val">
                <span className="cur">R$</span>
                <span className="num">{num(ULTIMO.mrr)}</span>
                <span className="un">/mês</span>
              </p>
              <div className="vds-fpa-burn-card-foot">
                <span className="vds-fpa-burn-chip is-favoravel">
                  <TrendingUp size={11} strokeWidth={2.3} />
                  <span className="t">{pct(VAR_MRR_PCT)} vs. mai</span>
                </span>
                <Sparkline
                  id="fpa-burn-sp-mrr"
                  valores={LINHAS.map((l) => l.mrr)}
                  rotulo="Receita recorrente nos últimos 6 meses, em alta"
                />
                {/* segundo fato em linha própria · rótulo de dado não se trunca */}
                <span className="vds-fpa-burn-card-calc">{dec(MRR_SHARE)}% das entradas</span>
              </div>
            </article>
          </div>

          {/* ---------- Peça 2 · timeline de runway ---------- */}
          <section className="vds-fpa-burn-panel">
            <header className="vds-fpa-burn-panel-head">
              <div>
                <span className="vds-fpa-burn-eyebrow">Projeção de caixa</span>
                <h3>Quanto tempo o caixa aguenta</h3>
                <p>
                  Saldo no início de cada mês, do mês corrente até o ponto zero. Eixo em R$ milhões.
                </p>
              </div>
              <div className="vds-fpa-burn-seg" role="group" aria-label="Premissa de burn">
                {CENARIOS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`vds-fpa-burn-seg-btn${c.key === cenarioKey ? ' is-ativo' : ''}`}
                    aria-pressed={c.key === cenarioKey}
                    onClick={() => setCenarioKey(c.key)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </header>

            <div className="vds-fpa-burn-panel-body">
              <p className="vds-fpa-burn-formula">
                <b>{brl(CAIXA_ATUAL)}</b>
                <span className="op">caixa em 30/jun</span>
                <span className="op">÷</span>
                <b>{brl(cenario.burn)}</b>
                <span className="op">burn/mês · {cenario.nota}</span>
                <span className="op">=</span>
                <b className="res">{dec(proj.runway)} {mes(proj.runway)}</b>
                <span className="op">ponto zero em {proj.mesZero}</span>
              </p>

              <RunwayTimeline proj={proj} />

              <ul className="vds-fpa-burn-legend">
                <li>
                  <i className="sw sw-serie" aria-hidden="true" />
                  Caixa projetado · barra hachurada = estimativa, não realizado
                </li>
                <li>
                  <i className="sw sw-crit" aria-hidden="true" />
                  Menos de 3 meses de caixa · a partir de {proj.mesCritico}
                </li>
                <li>
                  <i className="sw sw-dash" aria-hidden="true" />
                  Piso operacional · 3 meses de burn ({brl(proj.piso)})
                </li>
              </ul>

              <p className="vds-fpa-burn-note">
                <AlertCircle size={13} strokeWidth={2.1} />
                <span>
                  O burn caiu {brl(PRIMEIRO.burn - ULTIMO.burn)} no semestre — de {brl(PRIMEIRO.burn)} em
                  janeiro para {brl(ULTIMO.burn)} em junho, uma queda média de {brl(QUEDA_BURN_MES)} por mês.
                  Mantido esse ritmo, o burn só chega a zero em {dec(MESES_ATE_BURN_ZERO)} meses —{' '}
                  {dec(Math.abs(sobra))} {mes(sobra)} {sobra >= 0 ? 'depois' : 'antes'} do ponto zero desta
                  premissa. Fechar a conta antes de {proj.mesCritico} depende de receita nova, não de corte.
                </span>
              </p>
            </div>
          </section>
        </div>
      </Section>

      {/* ---------- Fluxo mês a mês · tabela limpa, sem vidro ---------- */}
      <Section
        title="Fluxo de caixa · 6 meses fechados"
        meta="entradas − saídas = burn líquido · saldo inicial − burn = saldo final"
      >
        <section className="vds-fpa-burn-panel">
          <header className="vds-fpa-burn-panel-head">
            <div>
              <span className="vds-fpa-burn-eyebrow">Realizado</span>
              <h3>De onde vem o burn médio</h3>
              <p>Regime de caixa · jan a jun de 2026 · valores em reais.</p>
            </div>
          </header>

          <div className="vds-fpa-burn-table-wrap">
            <table className="vds-fpa-burn-table">
              <caption>
                Fluxo de caixa mensal de janeiro a junho de 2026, com burn líquido e saldo final por mês.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Mês</th>
                  <th scope="col" className="num">Entradas</th>
                  <th scope="col" className="num">Saídas</th>
                  <th scope="col" className="num">Burn líquido</th>
                  <th scope="col" className="num">Saldo final</th>
                </tr>
              </thead>
              <tbody>
                <tr className="is-abertura">
                  <th scope="row">Saldo em 31/dez/2025</th>
                  <td className="num is-vazio">—</td>
                  <td className="num is-vazio">—</td>
                  <td className="num is-vazio">—</td>
                  <td className="num is-saldo">{brl(SALDO_ABERTURA)}</td>
                </tr>
                {LINHAS.map((l) => (
                  <tr key={l.mes}>
                    <th scope="row">{l.mes}</th>
                    <td className="num">{brl(l.entradas)}</td>
                    <td className="num">{brl(l.saidas)}</td>
                    <td className="num is-burn">−{brl(l.burn)}</td>
                    <td className="num is-saldo">{brl(l.saldoFinal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Acumulado · 6 meses</th>
                  <td className="num">{brl(totalEntradas)}</td>
                  <td className="num">{brl(totalSaidas)}</td>
                  <td className="num is-burn">−{brl(totalBurn)}</td>
                  <td className="num is-saldo">{brl(CAIXA_ATUAL)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="vds-fpa-burn-foot">
            <Info size={13} strokeWidth={2.1} />
            <span>
              Regime de caixa, não de competência. Burn líquido = saídas − entradas; saldo final = saldo
              inicial − burn. O burn médio usado no runway é a média dos três últimos meses:{' '}
              {brl(LINHAS[3].burn)}, {brl(LINHAS[4].burn)} e {brl(LINHAS[5].burn)} = {brl(BURN_3M)} por mês.
            </span>
          </p>
        </section>
      </Section>
    </>
  );
}
