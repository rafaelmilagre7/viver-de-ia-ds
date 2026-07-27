import { ArrowDownRight, ArrowRight, Info, Landmark, TrendingUp, Wallet } from 'lucide-react';
import './CashFlow.css';

/* ==============================================================
   FP&A · Fluxo de caixa + projeção
   --------------------------------------------------------------
   Operação de mentoria/comunidade em IA · exercício 2026 · R$.
   Regime de CAIXA (recebido/pago no mês), não competência.

   Regra de fechamento — tudo aqui é DERIVADO, nunca digitado:
     fluxo líquido do mês = entradas − saídas
     saldo acumulado      = saldo do mês anterior + fluxo do mês
     saldo final do ano   = saldo inicial + Σ fluxos
   ============================================================== */

const SALDO_INICIAL = 612_800; // caixa em 01/jan/2026

type MesBase = {
  key: string;
  abrev: string;
  nome: string;
  entradas: number;
  saidas: number;
  projetado: boolean;
};

type MesLinha = MesBase & { fluxo: number; saldo: number };

const BASE: MesBase[] = [
  { key: 'jan', abrev: 'Jan', nome: 'Janeiro',   entradas: 1_284_600, saidas: 1_052_400, projetado: false },
  { key: 'fev', abrev: 'Fev', nome: 'Fevereiro', entradas: 1_196_800, saidas: 1_108_300, projetado: false },
  { key: 'mar', abrev: 'Mar', nome: 'Março',     entradas: 1_462_300, saidas: 1_187_900, projetado: false },
  { key: 'abr', abrev: 'Abr', nome: 'Abril',     entradas: 1_318_500, saidas: 1_402_600, projetado: false },
  { key: 'mai', abrev: 'Mai', nome: 'Maio',      entradas: 1_548_200, saidas: 1_236_700, projetado: false },
  { key: 'jun', abrev: 'Jun', nome: 'Junho',     entradas: 1_402_900, saidas: 1_298_400, projetado: false },
  { key: 'jul', abrev: 'Jul', nome: 'Julho',     entradas: 1_336_000, saidas: 1_489_500, projetado: true  },
  { key: 'ago', abrev: 'Ago', nome: 'Agosto',    entradas: 1_612_400, saidas: 1_318_200, projetado: true  },
  { key: 'set', abrev: 'Set', nome: 'Setembro',  entradas: 1_704_800, saidas: 1_372_600, projetado: true  },
  { key: 'out', abrev: 'Out', nome: 'Outubro',   entradas: 1_588_300, saidas: 1_612_900, projetado: true  },
  { key: 'nov', abrev: 'Nov', nome: 'Novembro',  entradas: 1_826_500, saidas: 1_401_700, projetado: true  },
  { key: 'dez', abrev: 'Dez', nome: 'Dezembro',  entradas: 1_492_700, saidas: 1_348_300, projetado: true  },
];

/* fluxo e saldo acumulado calculados — o número na tela é o número da conta */
function encadear(base: MesBase[], abertura: number): MesLinha[] {
  let saldo = abertura;
  return base.map((m) => {
    const fluxo = m.entradas - m.saidas;
    saldo = saldo + fluxo;
    return { ...m, fluxo, saldo };
  });
}

const LINHAS = encadear(BASE, SALDO_INICIAL);
const REALIZADO = LINHAS.filter((l) => !l.projetado);
const PROJETADO = LINHAS.filter((l) => l.projetado);

function agregar(linhas: MesLinha[]) {
  const entradas = linhas.reduce((acc, l) => acc + l.entradas, 0);
  const saidas = linhas.reduce((acc, l) => acc + l.saidas, 0);
  return { entradas, saidas, fluxo: entradas - saidas };
}

const AG_REAL = agregar(REALIZADO);
const AG_PROJ = agregar(PROJETADO);
const AG_ANO = agregar(LINHAS);

const SALDO_1S = SALDO_INICIAL + AG_REAL.fluxo; // 30/jun
const SALDO_FIM = SALDO_INICIAL + AG_ANO.fluxo; // 31/dez

function menorSaldo(linhas: MesLinha[]): MesLinha {
  let out = linhas[0];
  for (const l of linhas) if (l.saldo < out.saldo) out = l;
  return out;
}
const VALE = menorSaldo(PROJETADO);

const MARGEM_CAIXA = (AG_ANO.fluxo / AG_ANO.entradas) * 100; // conversão de entrada em caixa
const VAR_SEMESTRE = ((AG_PROJ.fluxo - AG_REAL.fluxo) / AG_REAL.fluxo) * 100;
const NEGATIVOS = LINHAS.filter((l) => l.fluxo < 0);

/* ---------------- formatação BR ---------------- */

const NF0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const NF1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const MENOS = '−'; // minus sign tipográfico

function brl(v: number): string {
  const n = NF0.format(Math.abs(Math.round(v)));
  return v < 0 ? `${MENOS}R$ ${n}` : `R$ ${n}`;
}
function brlSinal(v: number): string {
  const n = NF0.format(Math.abs(Math.round(v)));
  return `${v < 0 ? MENOS : '+'}R$ ${n}`;
}
function pct(v: number): string {
  return `${v < 0 ? MENOS : ''}${NF1.format(Math.abs(v))}%`;
}
function milhoes(v: number): string {
  return v === 0 ? '0' : `${NF1.format(v / 1_000_000)} mi`;
}

/* ---------------- geometria do gráfico ---------------- */

const W = 980;
const H = 400;
const PAD = { top: 30, right: 74, bottom: 48, left: 66 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const UP_MAX = 1_900_000;   // escala das entradas (para cima)
const DOWN_MAX = 1_700_000; // escala das saídas (para baixo)
const BAL_MAX = 3_000_000;  // escala do saldo acumulado (eixo direito, mesmo zero)

const UP_PX = (PLOT_H * UP_MAX) / (UP_MAX + DOWN_MAX);
const DOWN_PX = PLOT_H - UP_PX;
const ZERO_Y = PAD.top + UP_PX;
const SLOT = PLOT_W / LINHAS.length;
const BAR_W = 30;
const CORTE_X = PAD.left + SLOT * REALIZADO.length; // início da projeção

const cx = (i: number) => PAD.left + SLOT * i + SLOT / 2;
const hUp = (v: number) => (v / UP_MAX) * UP_PX;
const hDown = (v: number) => (v / DOWN_MAX) * DOWN_PX;
const yBal = (v: number) => ZERO_Y - (v / BAL_MAX) * UP_PX;

const f2 = (n: number) => n.toFixed(2);

function barraCima(x: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, h, w / 2);
  const topo = ZERO_Y - h;
  return [
    `M ${f2(x)} ${f2(ZERO_Y)}`,
    `L ${f2(x)} ${f2(topo + rr)}`,
    `Q ${f2(x)} ${f2(topo)} ${f2(x + rr)} ${f2(topo)}`,
    `L ${f2(x + w - rr)} ${f2(topo)}`,
    `Q ${f2(x + w)} ${f2(topo)} ${f2(x + w)} ${f2(topo + rr)}`,
    `L ${f2(x + w)} ${f2(ZERO_Y)}`,
    'Z',
  ].join(' ');
}

function barraBaixo(x: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, h, w / 2);
  const base = ZERO_Y + h;
  return [
    `M ${f2(x)} ${f2(ZERO_Y)}`,
    `L ${f2(x)} ${f2(base - rr)}`,
    `Q ${f2(x)} ${f2(base)} ${f2(x + rr)} ${f2(base)}`,
    `L ${f2(x + w - rr)} ${f2(base)}`,
    `Q ${f2(x + w)} ${f2(base)} ${f2(x + w)} ${f2(base - rr)}`,
    `L ${f2(x + w)} ${f2(ZERO_Y)}`,
    'Z',
  ].join(' ');
}

type Ponto = { x: number; y: number };

const PONTOS_SALDO: Ponto[] = [
  { x: PAD.left, y: yBal(SALDO_INICIAL) },
  ...LINHAS.map((l, i) => ({ x: cx(i), y: yBal(l.saldo) })),
];

function polilinha(pts: Ponto[]): string {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f2(p.x)} ${f2(p.y)}`).join(' ');
}

const CORTE_PT = REALIZADO.length; // índice do ponto de junho em PONTOS_SALDO
const LINHA_REAL = polilinha(PONTOS_SALDO.slice(0, CORTE_PT + 1));
const LINHA_PROJ = polilinha(PONTOS_SALDO.slice(CORTE_PT));

const TICKS_FLUXO = [500_000, 1_000_000, 1_500_000];
const TICKS_SALDO = [1_000_000, 2_000_000, 3_000_000];

/* ==============================================================
   COMPONENTE
   ============================================================== */

export default function CashFlow() {
  return (
    <section className="vds-fpa-cash">
      <header className="vds-fpa-cash-head">
        <div className="vds-fpa-cash-head-l">
          <span className="vds-fpa-cash-eyebrow">FP&amp;A · Fluxo de caixa</span>
          <h3>Entradas, saídas e o saldo que sobra.</h3>
          <p className="vds-fpa-cash-lede">
            Seis meses fechados e seis projetados no mesmo eixo. A barra para cima é o que
            entrou, a barra para baixo é o que saiu, e a linha por cima é o caixa acumulado —
            o único número que decide se dá para contratar.
          </p>
          <div className="vds-fpa-cash-meta">
            <span className="via-meta-chip">Exercício 2026 · 12 meses</span>
            <span className="via-meta-chip">Regime de caixa · R$</span>
            <span className="via-meta-chip via-meta-chip--mono">Fechado até 30/jun</span>
          </div>
        </div>
        <a href="#premissas" className="via-pill-link vds-fpa-cash-action">
          Ver premissas da projeção
          <ArrowRight size={13} strokeWidth={2.2} />
        </a>
      </header>

      {/* ---------- KPIs ---------- */}
      <div className="vds-fpa-cash-kpis">
        <Kpi
          icone={<Wallet size={12} strokeWidth={2.2} />}
          rotulo="Saldo em 30/jun"
          valor={brl(SALDO_1S)}
          tag={brlSinal(AG_REAL.fluxo)}
          tom="pos"
          nota={`abertura de ${brl(SALDO_INICIAL)} · 6 meses fechados`}
        />
        <Kpi
          icone={<TrendingUp size={12} strokeWidth={2.2} />}
          rotulo="Fluxo líquido · 2º semestre"
          valor={brl(AG_PROJ.fluxo)}
          tag={`${pct(VAR_SEMESTRE)} vs. 1º sem`}
          tom="pos"
          nota={`${brl(AG_PROJ.entradas)} de entrada ${MENOS} ${brl(AG_PROJ.saidas)} de saída`}
        />
        <Kpi
          icone={<ArrowDownRight size={12} strokeWidth={2.2} />}
          rotulo={`Vale da projeção · ${VALE.nome.toLowerCase()}`}
          valor={brl(VALE.saldo)}
          tag={`${brlSinal(VALE.fluxo)} no mês`}
          tom="neg"
          nota="menor saldo do 2º semestre · produção do Leaders AI concentrada"
        />
        <Kpi
          icone={<Landmark size={12} strokeWidth={2.2} />}
          rotulo="Saldo em 31/dez"
          valor={brl(SALDO_FIM)}
          tag="projetado"
          tom="neutro"
          nota={`margem de caixa de ${pct(MARGEM_CAIXA)} sobre as entradas do ano`}
        />
      </div>

      {/* ---------- Gráfico ---------- */}
      <figure className="vds-fpa-cash-panel">
        <header className="vds-fpa-cash-panel-head">
          <div>
            <h4>Fluxo mensal e saldo acumulado</h4>
            <p>
              Barras acima = entradas · barras abaixo = saídas · linha = saldo acumulado.
              Abertura do ano em {brl(SALDO_INICIAL)}.
            </p>
          </div>
          <div className="vds-fpa-cash-legend">
            <span><i className="sw in" aria-hidden="true" /> Entradas</span>
            <span><i className="sw out" aria-hidden="true" /> Saídas</span>
            <span><i className="sw line" aria-hidden="true" /> Saldo acumulado</span>
            <span><i className="sw proj" aria-hidden="true" /> Projetado (jul–dez)</span>
          </div>
        </header>

        <svg
          className="vds-fpa-cash-svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Fluxo de caixa mensal de 2026. Entradas de ${brl(AG_ANO.entradas)}, saídas de ${brl(AG_ANO.saidas)} e saldo acumulado saindo de ${brl(SALDO_INICIAL)} para ${brl(SALDO_FIM)}. Julho a dezembro são projeção.`}
        >
          <defs>
            {/* massa junto ao eixo, esmaecendo na ponta — a barra "nasce" do zero */}
            <linearGradient id="fpa-cash-in" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--via-chart-ink)" stopOpacity="0.16" />
              <stop offset="1" stopColor="var(--via-chart-ink)" stopOpacity="0.48" />
            </linearGradient>
            <linearGradient id="fpa-cash-out" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--via-coral)" stopOpacity="0.46" />
              <stop offset="1" stopColor="var(--via-coral)" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* faixa da projeção */}
          <rect
            x={f2(CORTE_X)}
            y={PAD.top}
            width={f2(PAD.left + PLOT_W - CORTE_X)}
            height={PLOT_H}
            fill="var(--via-navy-03)"
          />

          {/* grid horizontal */}
          {TICKS_FLUXO.map((t) => (
            <g key={`gu-${t}`}>
              <line
                x1={PAD.left} x2={PAD.left + PLOT_W}
                y1={f2(ZERO_Y - hUp(t))} y2={f2(ZERO_Y - hUp(t))}
                stroke="var(--via-navy)" strokeOpacity="0.07" strokeDasharray="2 5"
              />
              <text
                x={PAD.left - 12} y={f2(ZERO_Y - hUp(t) + 3.5)}
                textAnchor="end" className="vds-fpa-cash-axis"
              >
                {milhoes(t)}
              </text>
            </g>
          ))}
          {TICKS_FLUXO.map((t) => (
            <g key={`gd-${t}`}>
              <line
                x1={PAD.left} x2={PAD.left + PLOT_W}
                y1={f2(ZERO_Y + hDown(t))} y2={f2(ZERO_Y + hDown(t))}
                stroke="var(--via-navy)" strokeOpacity="0.07" strokeDasharray="2 5"
              />
              <text
                x={PAD.left - 12} y={f2(ZERO_Y + hDown(t) + 3.5)}
                textAnchor="end" className="vds-fpa-cash-axis"
              >
                {milhoes(t)}
              </text>
            </g>
          ))}

          {/* eixo direito · saldo acumulado (compartilha o zero com as barras) */}
          <line
            x1={PAD.left + PLOT_W + 2} x2={PAD.left + PLOT_W + 2}
            y1={PAD.top} y2={f2(ZERO_Y)}
            stroke="var(--via-navy)" strokeOpacity="0.14"
          />
          {TICKS_SALDO.map((t) => (
            <g key={`gs-${t}`}>
              <line
                x1={PAD.left + PLOT_W + 2} x2={PAD.left + PLOT_W + 7}
                y1={f2(yBal(t))} y2={f2(yBal(t))}
                stroke="var(--via-navy)" strokeOpacity="0.20"
              />
              <text x={PAD.left + PLOT_W + 12} y={f2(yBal(t) + 3.5)} className="vds-fpa-cash-axis">
                {milhoes(t)}
              </text>
            </g>
          ))}

          {/* títulos de eixo */}
          <text x={6} y={19} className="vds-fpa-cash-axis-title">
            fluxo mensal
          </text>
          <text x={W - 6} y={19} textAnchor="end" className="vds-fpa-cash-axis-title">
            saldo acum.
          </text>

          {/* barras */}
          {LINHAS.map((l, i) => {
            const x = cx(i) - BAR_W / 2;
            const proj = l.projetado;
            return (
              <g key={l.key} opacity={proj ? 0.72 : 1}>
                <path
                  d={barraCima(x, BAR_W, hUp(l.entradas), 5)}
                  fill="url(#fpa-cash-in)"
                  stroke="var(--via-chart-ink)"
                  strokeOpacity={proj ? 0.5 : 0.28}
                  strokeWidth={proj ? 1 : 0.75}
                  strokeDasharray={proj ? '3 3' : undefined}
                />
                <path
                  d={barraBaixo(x, BAR_W, hDown(l.saidas), 5)}
                  fill="url(#fpa-cash-out)"
                  stroke="var(--via-coral)"
                  strokeOpacity={proj ? 0.55 : 0.32}
                  strokeWidth={proj ? 1 : 0.75}
                  strokeDasharray={proj ? '3 3' : undefined}
                />
              </g>
            );
          })}

          {/* linha do zero — o eixo de verdade */}
          <line
            x1={PAD.left} x2={PAD.left + PLOT_W}
            y1={f2(ZERO_Y)} y2={f2(ZERO_Y)}
            stroke="var(--via-navy)" strokeOpacity="0.22"
          />
          <text x={PAD.left - 12} y={f2(ZERO_Y + 3.5)} textAnchor="end" className="vds-fpa-cash-axis">
            0
          </text>

          {/* corte realizado / projetado */}
          <line
            x1={f2(CORTE_X)} x2={f2(CORTE_X)}
            y1={PAD.top} y2={PAD.top + PLOT_H}
            stroke="var(--via-navy)" strokeOpacity="0.22" strokeDasharray="4 4"
          />
          <text x={f2(CORTE_X + 8)} y={PAD.top + 13} className="vds-fpa-cash-axis-title">
            projetado
          </text>

          {/* saldo acumulado · halo + traço */}
          <path d={LINHA_REAL} fill="none" stroke="var(--via-bg)" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LINHA_PROJ} fill="none" stroke="var(--via-bg)" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LINHA_REAL} fill="none" stroke="var(--via-chart-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LINHA_PROJ} fill="none" stroke="var(--via-chart-ink)" strokeWidth="2.2" strokeDasharray="6 5" strokeLinecap="round" strokeLinejoin="round" />

          {PONTOS_SALDO.slice(1).map((p, i) => (
            <circle
              key={`pt-${LINHAS[i].key}`}
              cx={f2(p.x)} cy={f2(p.y)} r="3.2"
              fill="var(--via-bg)"
              stroke="var(--via-chart-ink)"
              strokeWidth="1.6"
              strokeOpacity={LINHAS[i].projetado ? 0.7 : 1}
            />
          ))}
          <circle cx={f2(PONTOS_SALDO[PONTOS_SALDO.length - 1].x)} cy={f2(PONTOS_SALDO[PONTOS_SALDO.length - 1].y)} r="3.6" fill="var(--via-chart-ink)" />
          <text
            x={f2(cx(LINHAS.length - 1))}
            y={f2(yBal(SALDO_FIM) - 12)}
            textAnchor="middle"
            className="vds-fpa-cash-endlabel"
          >
            {milhoes(SALDO_FIM)}
          </text>

          {/* meses */}
          {LINHAS.map((l, i) => (
            <text
              key={`m-${l.key}`}
              x={f2(cx(i))}
              y={PAD.top + PLOT_H + 20}
              textAnchor="middle"
              className={l.projetado ? 'vds-fpa-cash-mes is-proj' : 'vds-fpa-cash-mes'}
            >
              {l.abrev}
            </text>
          ))}
          <text x={f2(PAD.left + (CORTE_X - PAD.left) / 2)} y={PAD.top + PLOT_H + 39} textAnchor="middle" className="vds-fpa-cash-axis-title">
            realizado · jan–jun
          </text>
          <text x={f2(CORTE_X + (PAD.left + PLOT_W - CORTE_X) / 2)} y={PAD.top + PLOT_H + 39} textAnchor="middle" className="vds-fpa-cash-axis-title">
            projetado · jul–dez
          </text>
        </svg>

        <figcaption className="vds-fpa-cash-note">
          <Info size={13} strokeWidth={2} />
          <p>
            {NEGATIVOS.length} meses fecham negativos no ano —{' '}
            {NEGATIVOS.map((l, i) => (
              <span key={`neg-${l.key}`}>
                {i > 0 ? (i === NEGATIVOS.length - 1 ? ' e ' : ', ') : ''}
                {l.nome.toLowerCase()} ({brlSinal(l.fluxo)}
                {l.projetado ? ', projetado' : ', realizado'})
              </span>
            ))}
            . Todos são absorvidos pelo caixa: no 2º semestre o saldo não cai abaixo de{' '}
            {brl(VALE.saldo)}, o vale de {VALE.nome.toLowerCase()}. O pico de novembro vem das
            matrículas pós-evento.
          </p>
        </figcaption>
      </figure>

      {/* ---------- Tabela ---------- */}
      <div className="vds-fpa-cash-tbl-panel">
        <header className="vds-fpa-cash-tbl-head">
          <div>
            <h4>Demonstrativo mensal</h4>
            <p>Saldo acumulado de cada linha = saldo da linha anterior + fluxo líquido do mês.</p>
          </div>
          <span className="via-meta-chip via-meta-chip--mono">12 linhas · R$</span>
        </header>

        <div
          className="vds-fpa-cash-scroll"
          tabIndex={0}
          role="group"
          aria-label="Tabela de fluxo de caixa mensal · role horizontalmente"
        >
          <table className="vds-fpa-cash-tbl">
            <thead>
              <tr>
                <th scope="col">Mês</th>
                <th scope="col" className="num">Entradas</th>
                <th scope="col" className="num">Saídas</th>
                <th scope="col" className="num">Fluxo líquido</th>
                <th scope="col" className="num">Saldo acumulado</th>
              </tr>
            </thead>

            <tbody>
              <tr className="abertura">
                <th scope="row">Saldo inicial · 01/jan</th>
                <td className="num dash">—</td>
                <td className="num dash">—</td>
                <td className="num dash">—</td>
                <td className="num forte">{brl(SALDO_INICIAL)}</td>
              </tr>

              <tr className="grp">
                <td colSpan={5}>
                  <i className="sw real" aria-hidden="true" />
                  Realizado · jan–jun
                </td>
              </tr>
              {REALIZADO.map((l) => (
                <LinhaMes key={l.key} linha={l} />
              ))}
              <tr className="sub">
                <th scope="row">Subtotal realizado</th>
                <td className="num">{brl(AG_REAL.entradas)}</td>
                <td className="num">{brl(AG_REAL.saidas)}</td>
                <td className={AG_REAL.fluxo < 0 ? 'num neg' : 'num'}>{brlSinal(AG_REAL.fluxo)}</td>
                <td className="num">{brl(SALDO_1S)}</td>
              </tr>

              <tr className="grp">
                <td colSpan={5}>
                  <i className="sw proj" aria-hidden="true" />
                  Projetado · jul–dez
                </td>
              </tr>
              {PROJETADO.map((l) => (
                <LinhaMes key={l.key} linha={l} />
              ))}
              <tr className="sub">
                <th scope="row">Subtotal projetado</th>
                <td className="num">{brl(AG_PROJ.entradas)}</td>
                <td className="num">{brl(AG_PROJ.saidas)}</td>
                <td className={AG_PROJ.fluxo < 0 ? 'num neg' : 'num'}>{brlSinal(AG_PROJ.fluxo)}</td>
                <td className="num">{brl(SALDO_FIM)}</td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th scope="row">Exercício 2026</th>
                <td className="num">{brl(AG_ANO.entradas)}</td>
                <td className="num">{brl(AG_ANO.saidas)}</td>
                <td className={AG_ANO.fluxo < 0 ? 'num neg' : 'num'}>{brlSinal(AG_ANO.fluxo)}</td>
                <td className="num">{brl(SALDO_FIM)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ---------- Prova da conta ---------- */}
      <div className="vds-fpa-cash-recon" id="premissas">
        <Info size={14} strokeWidth={2} className="vds-fpa-cash-recon-icon" />
        <div className="vds-fpa-cash-eq">
          <span><em>saldo inicial</em><b>{brl(SALDO_INICIAL)}</b></span>
          <i aria-hidden="true">+</i>
          <span><em>entradas</em><b>{brl(AG_ANO.entradas)}</b></span>
          <i aria-hidden="true">{MENOS}</i>
          <span><em>saídas</em><b>{brl(AG_ANO.saidas)}</b></span>
          <i aria-hidden="true">=</i>
          <span className="res"><em>saldo em 31/dez</em><b>{brl(SALDO_FIM)}</b></span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- subcomponentes ---------------- */

function Kpi({
  icone,
  rotulo,
  valor,
  tag,
  tom,
  nota,
}: {
  icone: React.ReactNode;
  rotulo: string;
  valor: string;
  tag: string;
  tom: 'pos' | 'neg' | 'neutro';
  nota: string;
}) {
  return (
    <article className="vds-fpa-cash-kpi">
      <span className="vds-fpa-cash-kpi-lbl">
        {icone}
        {rotulo}
      </span>
      <p className="vds-fpa-cash-kpi-val">{valor}</p>
      <span className={`vds-fpa-cash-kpi-tag ${tom}`}>{tag}</span>
      <p className="vds-fpa-cash-kpi-note">{nota}</p>
    </article>
  );
}

function LinhaMes({ linha }: { linha: MesLinha }) {
  return (
    <tr className={linha.projetado ? 'is-proj' : undefined}>
      <th scope="row">{linha.nome}</th>
      <td className="num">{brl(linha.entradas)}</td>
      <td className="num">{brl(linha.saidas)}</td>
      <td className={linha.fluxo < 0 ? 'num neg' : 'num'}>{brlSinal(linha.fluxo)}</td>
      <td className="num">{brl(linha.saldo)}</td>
    </tr>
  );
}
