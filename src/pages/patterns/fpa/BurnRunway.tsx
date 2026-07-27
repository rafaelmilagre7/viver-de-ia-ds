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
   ============================================================== */
type SparkProps = { valores: readonly number[]; id: string; rotulo: string };

function Sparkline({ valores, id, rotulo }: SparkProps) {
  const w = 96;
  const h = 32;
  const p = 3;
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const amplitude = max - min || 1;
  const pontos = valores.map((v, i) => ({
    x: p + (i * (w - p * 2)) / (valores.length - 1),
    y: p + (1 - (v - min) / amplitude) * (h - p * 2),
  }));
  const linha = pontos.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' L ');
  const area = `M ${linha} L ${w - p},${h} L ${p},${h} Z`;
  const fim = pontos[pontos.length - 1];

  return (
    <svg className="vds-fpa-burn-spark" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={rotulo}>
      <title>{rotulo}</title>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--via-chart-ink)" stopOpacity="0.24" />
          <stop offset="1" stopColor="var(--via-chart-ink)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={`M ${linha}`}
        fill="none"
        stroke="var(--via-chart-ink)"
        strokeOpacity="0.9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={fim.x} cy={fim.y} r="2.4" fill="var(--via-chart-ink)" />
    </svg>
  );
}

/* ==============================================================
   Timeline de runway · barras de saldo projetado até o ponto zero
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

function RunwayTimeline({ proj }: { proj: Projecao }) {
  const n = proj.meses.length;
  const slot = PLOT_W / n;
  const barW = Math.min(46, slot * 0.6);
  const zeroX = PAD.left + (proj.runway / n) * PLOT_W;
  const idxCritico = proj.meses.findIndex((m) => m.critico);
  const criticoX = PAD.left + idxCritico * slot;
  const pisoY = yDe(proj.piso);

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
        <linearGradient id="fpa-burn-bar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--via-chart-ink)" stopOpacity="0.88" />
          <stop offset="1" stopColor="var(--via-chart-ink)" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="fpa-burn-bar-crit" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#B85C5C" stopOpacity="0.88" />
          <stop offset="1" stopColor="#B85C5C" stopOpacity="0.30" />
        </linearGradient>
      </defs>

      {/* zona crítica · fundo coral discreto */}
      <rect
        x={criticoX}
        y={PAD.top - 10}
        width={Math.max(zeroX - criticoX, 0)}
        height={BASE_Y - PAD.top + 10}
        fill="#B85C5C"
        fillOpacity="0.05"
        rx="8"
      />

      {/* grid + eixo y */}
      {GRID.map((v) => (
        <g key={v}>
          <line
            x1={PAD.left}
            y1={yDe(v)}
            x2={VB_W - PAD.right}
            y2={yDe(v)}
            stroke="var(--via-navy)"
            strokeOpacity={v === 0 ? 0.16 : 0.07}
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

      {/* piso operacional · 3 meses de burn */}
      <line
        x1={PAD.left}
        y1={pisoY}
        x2={VB_W - PAD.right}
        y2={pisoY}
        stroke="var(--via-navy-40)"
        strokeWidth="1"
        strokeDasharray="4 5"
      />

      {/* barras · saldo no início de cada mês */}
      {proj.meses.map((m, i) => {
        const x = PAD.left + i * slot + (slot - barW) / 2;
        const y = yDe(m.saldoInicio);
        return (
          <g key={m.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(BASE_Y - y, 1)}
              rx="5"
              fill={m.critico ? 'url(#fpa-burn-bar-crit)' : 'url(#fpa-burn-bar)'}
            />
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
        stroke="var(--via-navy-30)"
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
        stroke="#B85C5C"
        strokeOpacity="0.55"
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

      {/* valor de partida · alinhado à borda da 1ª barra pra não cruzar o marcador */}
      <text
        className="vds-fpa-burn-val"
        x={PAD.left + (slot - barW) / 2}
        y={yDe(proj.meses[0].saldoInicio) - 10}
        textAnchor="start"
      >
        {brl(proj.meses[0].saldoInicio)}
      </text>
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
                  {pct(VAR_CAIXA_PCT)} no semestre
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
                  {pct(VAR_BURN_PCT)} vs. média de 6 meses
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
                  {dec(Math.abs(folga))} {mes(folga)} {acimaDoPiso ? 'acima' : 'abaixo'} do piso de {PISO_MESES}
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
                  {pct(VAR_MRR_PCT)} vs. mai · {dec(MRR_SHARE)}% das entradas
                </span>
                <Sparkline
                  id="fpa-burn-sp-mrr"
                  valores={LINHAS.map((l) => l.mrr)}
                  rotulo="Receita recorrente nos últimos 6 meses, em alta"
                />
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
                  <i className="sw sw-navy" aria-hidden="true" />
                  Caixa projetado
                </li>
                <li>
                  <i className="sw sw-coral" aria-hidden="true" />
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
