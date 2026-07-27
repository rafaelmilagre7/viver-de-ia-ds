import { useState } from 'react';
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

   Metodologia de visualização (o que mudou e por quê):
     · EIXO DUPLO REMOVIDO. Fluxo mensal (R$/mês) e saldo acumulado
       (R$ em estoque) são medidas de natureza e escala diferentes.
       Empilhar as duas num só painel com dois eixos y faz o cruzamento
       das marcas parecer significado — e não é: ele muda só de mexer
       na escala. Agora são DOIS gráficos (small multiples) que
       compartilham exatamente o mesmo eixo x, alinhados coluna a
       coluna, com uma linha-guia única no hover ligando os dois.
     · ESCALA ÚNICA dentro do painel de fluxo. Antes entradas (para
       cima) e saídas (para baixo) tinham máximos diferentes — 1,9 mi
       contra 1,7 mi —, então uma saída de R$ 1,4 mi era desenhada
       MAIOR que uma entrada de R$ 1,4 mi. Era um segundo eixo duplo,
       disfarçado de espelho. Agora as duas direções usam o mesmo
       R$-por-pixel: a comparação visual é literal.
     · Duas séries no painel de fluxo → paleta validada (data-1 /
       data-2) + segundo canal obrigatório: direção (acima/abaixo),
       textura (hachura na saída) e rótulo direto dentro do plot.
     · Saldo acumulado = 1 série → o título nomeia, sem legenda de cor.
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
const VALE_I = LINHAS.findIndex((l) => l.key === VALE.key);

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

/* ==============================================================
   GEOMETRIA · dois gráficos empilhados, UM eixo x compartilhado
   --------------------------------------------------------------
   Painel A (fluxo mensal)  → escala única, espelhada no zero.
   Painel B (saldo acum.)   → escala própria, ancorada em zero.
   Nenhum eixo y é compartilhado entre os dois: são gráficos
   independentes que só dividem a régua de meses.
   ============================================================== */

const W = 980;
const PAD = { top: 8, right: 28, bottom: 50, left: 78 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_R = PAD.left + PLOT_W;
const SLOT = PLOT_W / LINHAS.length;
const BAR_W = 32;
const BAR_R = 4; // ponta arredondada, ancorada na base

/* Painel A · fluxo mensal do mês (entradas acima, saídas abaixo) */
const A_LABEL_Y = PAD.top + 13;
const A_TOP = PAD.top + 26;
const A_HALF = 100;
const A_ZERO = A_TOP + A_HALF;
const A_BOT = A_ZERO + A_HALF;
const FLOW_MAX = 2_000_000; // MESMO teto para cima e para baixo

/* separador entre os dois gráficos */
const DIV_Y = A_BOT + 27;

/* Painel B · saldo acumulado no fim do mês */
const B_LABEL_Y = DIV_Y + 22;
const B_TOP = DIV_Y + 34;
const B_H = 150;
const B_BOT = B_TOP + B_H;
const BAL_MAX = 3_000_000;

const H = B_BOT + PAD.bottom;

const CORTE_X = PAD.left + SLOT * REALIZADO.length; // início da projeção

const cx = (i: number) => PAD.left + SLOT * i + SLOT / 2;
const hFlow = (v: number) => (v / FLOW_MAX) * A_HALF;
const yBal = (v: number) => B_BOT - (v / BAL_MAX) * B_H;

const f2 = (n: number) => n.toFixed(2);

/* meia-folga: 1px de cada lado do zero = 2px de respiro entre os dois
   fills. Sem isso, entrada e saída colam e leem como UMA barra só — e a
   linha de base some por baixo delas. O COMPRIMENTO da barra continua
   exato (é ele que codifica o valor); só a âncora anda 1px. */
const GAP0 = 1;

function barraCima(x: number, w: number, h: number): string {
  const rr = Math.min(BAR_R, h, w / 2);
  const base = A_ZERO - GAP0;
  const topo = base - h;
  return [
    `M ${f2(x)} ${f2(base)}`,
    `L ${f2(x)} ${f2(topo + rr)}`,
    `Q ${f2(x)} ${f2(topo)} ${f2(x + rr)} ${f2(topo)}`,
    `L ${f2(x + w - rr)} ${f2(topo)}`,
    `Q ${f2(x + w)} ${f2(topo)} ${f2(x + w)} ${f2(topo + rr)}`,
    `L ${f2(x + w)} ${f2(base)}`,
    'Z',
  ].join(' ');
}

function barraBaixo(x: number, w: number, h: number): string {
  const rr = Math.min(BAR_R, h, w / 2);
  const topo = A_ZERO + GAP0;
  const base = topo + h;
  return [
    `M ${f2(x)} ${f2(topo)}`,
    `L ${f2(x)} ${f2(base - rr)}`,
    `Q ${f2(x)} ${f2(base)} ${f2(x + rr)} ${f2(base)}`,
    `L ${f2(x + w - rr)} ${f2(base)}`,
    `Q ${f2(x + w)} ${f2(base)} ${f2(x + w)} ${f2(base - rr)}`,
    `L ${f2(x + w)} ${f2(topo)}`,
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
function areaSob(pts: Ponto[]): string {
  const last = pts[pts.length - 1];
  return `${polilinha(pts)} L ${f2(last.x)} ${f2(B_BOT)} L ${f2(pts[0].x)} ${f2(B_BOT)} Z`;
}

const CORTE_PT = REALIZADO.length; // índice do ponto de junho em PONTOS_SALDO
const PTS_REAL = PONTOS_SALDO.slice(0, CORTE_PT + 1);
const PTS_PROJ = PONTOS_SALDO.slice(CORTE_PT);
const LINHA_REAL = polilinha(PTS_REAL);
const LINHA_PROJ = polilinha(PTS_PROJ);
const AREA_REAL = areaSob(PTS_REAL);
const AREA_PROJ = areaSob(PTS_PROJ);

const TICKS_FLUXO = [500_000, 1_000_000, 1_500_000, 2_000_000];
const TICKS_SALDO = [1_000_000, 2_000_000, 3_000_000];

/* leitura padrão do readout quando nada está sob o cursor */
const LEITURA_ANO = {
  titulo: 'Exercício 2026 · 12 meses',
  chip: null as string | null,
  entradas: AG_ANO.entradas,
  saidas: AG_ANO.saidas,
  fluxo: AG_ANO.fluxo,
  saldo: SALDO_FIM,
  saldoRotulo: 'Saldo em 31/dez',
};

/* ==============================================================
   COMPONENTE
   ============================================================== */

export default function CashFlow() {
  const [ativo, setAtivo] = useState<number | null>(null);

  const l = ativo === null ? null : LINHAS[ativo];
  const leitura = l
    ? {
        titulo: `${l.nome} · 2026`,
        chip: l.projetado ? 'projetado' : 'realizado',
        entradas: l.entradas,
        saidas: l.saidas,
        fluxo: l.fluxo,
        saldo: l.saldo,
        saldoRotulo: 'Saldo ao fim do mês',
      }
    : LEITURA_ANO;

  return (
    <section className="vds-fpa-cash">
      <header className="vds-fpa-cash-head">
        <div className="vds-fpa-cash-head-l">
          <span className="vds-fpa-cash-eyebrow">FP&amp;A · Fluxo de caixa</span>
          <h3>Entradas, saídas e o saldo que sobra.</h3>
          <p className="vds-fpa-cash-lede">
            Seis meses fechados e seis projetados. O movimento do mês e o estoque de caixa são
            grandezas diferentes, então ficam em dois gráficos separados na mesma régua de meses —
            um mostra quanto entrou e saiu, o outro mostra quanto sobrou. O segundo é o que decide
            se dá para contratar.
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

      {/* ---------- Gráficos ---------- */}
      <figure className="vds-fpa-cash-panel">
        <header className="vds-fpa-cash-panel-head">
          <div>
            <h4>Fluxo mensal e saldo acumulado</h4>
            <p>
              Dois gráficos, um eixo de meses. Em cima, quanto entrou e quanto saiu em cada mês —
              mesma escala nas duas direções, então as barras são comparáveis entre si. Embaixo, o
              saldo que sobra no caixa, partindo de {brl(SALDO_INICIAL)} em 01/jan.
            </p>
          </div>
          <div className="vds-fpa-cash-legend">
            <span><i className="sw in" aria-hidden="true" /> Entradas</span>
            <span><i className="sw out" aria-hidden="true" /> Saídas</span>
            <i className="sep" aria-hidden="true" />
            <span><i className="sw line" aria-hidden="true" /> Saldo acumulado</span>
            <i className="sep" aria-hidden="true" />
            <span><i className="sw proj" aria-hidden="true" /> Projetado · jul–dez</span>
            <span><i className="sw neg" aria-hidden="true" /> Mês negativo</span>
          </div>
        </header>

        {/* leitura sincronizada — evita rótulo em todo ponto do gráfico */}
        <div className={ativo === null ? 'vds-fpa-cash-readout' : 'vds-fpa-cash-readout is-on'}>
          <span className="ro-ttl">
            {leitura.titulo}
            {leitura.chip ? <em className={leitura.chip === 'projetado' ? 'proj' : undefined}>{leitura.chip}</em> : null}
          </span>
          <div className="ro-vals">
            <span><em>Entradas</em><b>{brl(leitura.entradas)}</b></span>
            <span><em>Saídas</em><b>{brl(leitura.saidas)}</b></span>
            <span><em>Fluxo líquido</em><b className={leitura.fluxo < 0 ? 'neg' : undefined}>{brlSinal(leitura.fluxo)}</b></span>
            <span className="forte"><em>{leitura.saldoRotulo}</em><b>{brl(leitura.saldo)}</b></span>
          </div>
        </div>

        <svg
          className="vds-fpa-cash-svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Dois gráficos com o mesmo eixo de meses de 2026. Primeiro: fluxo mensal, com entradas somando ${brl(AG_ANO.entradas)} e saídas somando ${brl(AG_ANO.saidas)}. Segundo: saldo de caixa acumulado, saindo de ${brl(SALDO_INICIAL)} em janeiro para ${brl(SALDO_FIM)} em dezembro, com vale de ${brl(VALE.saldo)} em ${VALE.nome.toLowerCase()}. Julho a dezembro são projeção. Os valores mês a mês estão na tabela abaixo.`}
          onMouseLeave={() => setAtivo(null)}
        >
          <defs>
            {/* hachura da saída — 2º canal além da cor, sobrevive a daltonismo e a P&B */}
            <pattern
              id="fpa-cash-hatch"
              width="5" height="5"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="5" height="5" fill="var(--via-data-2-c)" fillOpacity="0.22" />
              <rect width="2" height="5" fill="var(--via-data-2-c)" fillOpacity="0.95" />
            </pattern>
            {/* massa sob a linha de saldo — recessiva, nunca compete com o traço */}
            <linearGradient id="fpa-cash-bal" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--via-chart-ink)" stopOpacity="0.20" />
              <stop offset="1" stopColor="var(--via-chart-ink)" stopOpacity="0.015" />
            </linearGradient>
          </defs>

          {/* ---------- faixa da projeção (nos dois painéis) ---------- */}
          <rect
            x={f2(CORTE_X)} y={A_TOP}
            width={f2(PLOT_R - CORTE_X)} height={A_BOT - A_TOP}
            fill="var(--via-navy-03)"
          />
          <rect
            x={f2(CORTE_X)} y={B_TOP}
            width={f2(PLOT_R - CORTE_X)} height={B_H}
            fill="var(--via-navy-03)"
          />

          {/* ---------- realce do mês sob o cursor, atravessando os dois ---------- */}
          {ativo !== null && (
            <rect
              x={f2(PAD.left + SLOT * ativo)} y={A_TOP}
              width={f2(SLOT)} height={B_BOT - A_TOP}
              fill="var(--via-navy-05)"
            />
          )}

          {/* ==================================================
              PAINEL A · fluxo mensal
              ================================================== */}
          <text x={10} y={A_LABEL_Y} className="vds-fpa-cash-panel-title">
            fluxo mensal · R$
          </text>
          <text x={W - 10} y={A_LABEL_Y} textAnchor="end" className="vds-fpa-cash-axis-title">
            escala única nas duas direções
          </text>

          {/* grade recessiva · mesmos degraus para cima e para baixo */}
          {TICKS_FLUXO.map((t) => (
            <g key={`ga-${t}`}>
              <line
                x1={PAD.left} x2={PLOT_R}
                y1={f2(A_ZERO - hFlow(t))} y2={f2(A_ZERO - hFlow(t))}
                stroke="var(--via-data-grid)" strokeWidth="1"
              />
              <line
                x1={PAD.left} x2={PLOT_R}
                y1={f2(A_ZERO + hFlow(t))} y2={f2(A_ZERO + hFlow(t))}
                stroke="var(--via-data-grid)" strokeWidth="1"
              />
              <text x={PAD.left - 12} y={f2(A_ZERO - hFlow(t) + 3.4)} textAnchor="end" className="vds-fpa-cash-axis">
                {milhoes(t)}
              </text>
              <text x={PAD.left - 12} y={f2(A_ZERO + hFlow(t) + 3.4)} textAnchor="end" className="vds-fpa-cash-axis">
                {milhoes(t)}
              </text>
            </g>
          ))}

          {/* barras */}
          {LINHAS.map((m, i) => {
            const x = cx(i) - BAR_W / 2;
            const proj = m.projetado;
            const dim = ativo !== null && ativo !== i;
            return (
              <g key={m.key} opacity={proj ? (dim ? 0.44 : 0.72) : dim ? 0.62 : 1}>
                <path
                  d={barraCima(x, BAR_W, hFlow(m.entradas))}
                  fill="var(--via-data-1-c)"
                  fillOpacity={proj ? 0.4 : 0.94}
                  stroke="var(--via-data-1-c)"
                  strokeWidth={proj ? 1.1 : 0}
                  strokeDasharray={proj ? '3.5 3' : undefined}
                />
                <path
                  d={barraBaixo(x, BAR_W, hFlow(m.saidas))}
                  fill="url(#fpa-cash-hatch)"
                  stroke="var(--via-data-2-c)"
                  strokeWidth={proj ? 1.1 : 0.9}
                  strokeOpacity={proj ? 0.85 : 0.6}
                  strokeDasharray={proj ? '3.5 3' : undefined}
                />
              </g>
            );
          })}

          {/* rótulo direto dentro do plot — identidade nunca só por cor */}
          <rect x={PAD.left + 2} y={A_TOP + 3} width="9" height="9" rx="2.5" fill="var(--via-data-1-c)" fillOpacity="0.94" />
          <text x={PAD.left + 16} y={A_TOP + 11} className="vds-fpa-cash-inplot">
            entradas ▲
          </text>
          <rect x={PAD.left + 2} y={A_BOT - 14} width="9" height="9" rx="2.5" fill="url(#fpa-cash-hatch)" stroke="var(--via-data-2-c)" strokeWidth="0.8" strokeOpacity="0.6" />
          <text x={PAD.left + 16} y={A_BOT - 6} className="vds-fpa-cash-inplot">
            saídas ▼
          </text>

          {/* linha do zero — a base das barras */}
          <line
            x1={PAD.left} x2={PLOT_R}
            y1={f2(A_ZERO)} y2={f2(A_ZERO)}
            stroke="var(--via-data-axis)" strokeWidth="1"
          />
          <text x={PAD.left - 12} y={f2(A_ZERO + 3.4)} textAnchor="end" className="vds-fpa-cash-axis">
            0
          </text>

          {/* corte realizado / projetado */}
          <line
            x1={f2(CORTE_X)} x2={f2(CORTE_X)}
            y1={A_TOP} y2={A_BOT}
            stroke="var(--via-data-axis)" strokeDasharray="4 4" strokeWidth="1"
          />

          {/* ---------- separador entre os dois gráficos ---------- */}
          <line x1={18} x2={W - 18} y1={DIV_Y} y2={DIV_Y} stroke="var(--via-data-grid)" strokeWidth="1" />

          {/* ==================================================
              PAINEL B · saldo acumulado · escala PRÓPRIA
              ================================================== */}
          <text x={10} y={B_LABEL_Y} className="vds-fpa-cash-panel-title">
            saldo acumulado · R$
          </text>
          <text x={W - 10} y={B_LABEL_Y} textAnchor="end" className="vds-fpa-cash-axis-title">
            estoque de caixa no fim de cada mês
          </text>

          {TICKS_SALDO.map((t) => (
            <g key={`gb-${t}`}>
              <line
                x1={PAD.left} x2={PLOT_R}
                y1={f2(yBal(t))} y2={f2(yBal(t))}
                stroke="var(--via-data-grid)" strokeWidth="1"
              />
              <text x={PAD.left - 12} y={f2(yBal(t) + 3.4)} textAnchor="end" className="vds-fpa-cash-axis">
                {milhoes(t)}
              </text>
            </g>
          ))}

          {/* base em zero — saldo é estoque, o zero importa */}
          <line x1={PAD.left} x2={PLOT_R} y1={B_BOT} y2={B_BOT} stroke="var(--via-data-axis)" strokeWidth="1" />
          <text x={PAD.left - 12} y={B_BOT + 3.4} textAnchor="end" className="vds-fpa-cash-axis">
            0
          </text>

          <line
            x1={f2(CORTE_X)} x2={f2(CORTE_X)}
            y1={B_TOP} y2={B_BOT}
            stroke="var(--via-data-axis)" strokeDasharray="4 4" strokeWidth="1"
          />

          <path d={AREA_REAL} fill="url(#fpa-cash-bal)" />
          <path d={AREA_PROJ} fill="url(#fpa-cash-bal)" opacity="0.5" />

          {/* halo para o traço nunca sumir sobre a grade */}
          <path d={LINHA_REAL} fill="none" stroke="var(--via-bg)" strokeOpacity="0.8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LINHA_PROJ} fill="none" stroke="var(--via-bg)" strokeOpacity="0.8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LINHA_REAL} fill="none" stroke="var(--via-chart-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={LINHA_PROJ} fill="none" stroke="var(--via-chart-ink)" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" strokeLinejoin="round" />

          {/* abertura */}
          <circle cx={f2(PONTOS_SALDO[0].x)} cy={f2(PONTOS_SALDO[0].y)} r="4" fill="var(--via-bg)" stroke="var(--via-chart-ink)" strokeWidth="1.6" />

          {LINHAS.map((m, i) => {
            const p = PONTOS_SALDO[i + 1];
            const on = ativo === i;
            return (
              <circle
                key={`pt-${m.key}`}
                cx={f2(p.x)} cy={f2(p.y)} r={on ? 5 : 4}
                fill={on ? 'var(--via-chart-ink)' : 'var(--via-bg)'}
                stroke="var(--via-chart-ink)"
                strokeWidth="1.8"
                strokeOpacity={m.projetado && !on ? 0.72 : 1}
              />
            );
          })}

          {/* rótulo direto SELETIVO · só o vale e o fecho do ano */}
          <text
            x={f2(cx(VALE_I))}
            y={f2(yBal(VALE.saldo) + 15)}
            textAnchor="middle"
            className="vds-fpa-cash-vale"
          >
            vale · {milhoes(VALE.saldo)}
          </text>
          <circle cx={f2(cx(LINHAS.length - 1))} cy={f2(yBal(SALDO_FIM))} r="4" fill="var(--via-chart-ink)" />
          <text
            x={f2(cx(LINHAS.length - 1))}
            y={f2(yBal(SALDO_FIM) - 11)}
            textAnchor="middle"
            className="vds-fpa-cash-endlabel"
          >
            {milhoes(SALDO_FIM)}
          </text>

          {/* ---------- eixo x compartilhado ---------- */}
          {LINHAS.map((m, i) => (
            <g key={`m-${m.key}`}>
              <text
                x={f2(cx(i))}
                y={B_BOT + 20}
                textAnchor="middle"
                className={
                  m.fluxo < 0
                    ? 'vds-fpa-cash-mes is-neg'
                    : m.projetado
                      ? 'vds-fpa-cash-mes is-proj'
                      : 'vds-fpa-cash-mes'
                }
              >
                {m.abrev}
              </text>
              {m.fluxo < 0 && (
                <line
                  x1={f2(cx(i) - 9)} x2={f2(cx(i) + 9)}
                  y1={B_BOT + 25} y2={B_BOT + 25}
                  stroke="var(--via-coral)" strokeWidth="1.6" strokeLinecap="round"
                />
              )}
            </g>
          ))}
          <text x={f2(PAD.left + (CORTE_X - PAD.left) / 2)} y={B_BOT + 41} textAnchor="middle" className="vds-fpa-cash-axis-title">
            realizado · jan–jun
          </text>
          <text x={f2(CORTE_X + (PLOT_R - CORTE_X) / 2)} y={B_BOT + 41} textAnchor="middle" className="vds-fpa-cash-axis-title">
            projetado · jul–dez
          </text>

          {/* ---------- linha-guia + captura do cursor ---------- */}
          {ativo !== null && (
            <line
              x1={f2(cx(ativo))} x2={f2(cx(ativo))}
              y1={A_TOP} y2={B_BOT}
              stroke="var(--via-navy-30)" strokeWidth="1" strokeDasharray="3 3"
            />
          )}
          <g aria-hidden="true">
            {LINHAS.map((m, i) => (
              <rect
                key={`hit-${m.key}`}
                x={f2(PAD.left + SLOT * i)} y={A_TOP}
                width={f2(SLOT)} height={B_BOT - A_TOP}
                fill="transparent"
                onMouseEnter={() => setAtivo(i)}
              />
            ))}
          </g>
        </svg>

        <figcaption className="vds-fpa-cash-note">
          <Info size={13} strokeWidth={2} />
          <p>
            {NEGATIVOS.length} meses fecham negativos no ano —{' '}
            {NEGATIVOS.map((m, i) => (
              <span key={`neg-${m.key}`}>
                {i > 0 ? (i === NEGATIVOS.length - 1 ? ' e ' : ', ') : ''}
                {m.nome.toLowerCase()} ({brlSinal(m.fluxo)}
                {m.projetado ? ', projetado' : ', realizado'})
              </span>
            ))}
            , marcados com o traço coral sob o mês. Todos são absorvidos pelo caixa: no gráfico de
            baixo o saldo não cai abaixo de {brl(VALE.saldo)}, o vale de {VALE.nome.toLowerCase()}.
            O pico de novembro vem das matrículas pós-evento. Jul–dez é projeção — barras e linha
            tracejadas. Os valores mês a mês estão na tabela abaixo.
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
              {REALIZADO.map((m) => (
                <LinhaMes key={m.key} linha={m} />
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
              {PROJETADO.map((m) => (
                <LinhaMes key={m.key} linha={m} />
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
