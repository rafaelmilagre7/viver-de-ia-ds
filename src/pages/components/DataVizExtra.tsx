import { useMemo, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './data-viz-extra.css';

/* =========================================================
   Data viz extra · heatmap · sparklines · gauge
   ---------------------------------------------------------
   Regras aplicadas (mesmas do restante do DS):
   · UM eixo por gráfico. Nunca duas escalas y no mesmo desenho.
   · Cor de série vem de --via-data-1 / --via-data-2 (validados).
     3+ séries → small multiples, nunca uma 3ª cor inventada.
   · Sequencial = 1 matiz claro→escuro. Status é reservado.
   · Texto usa token de TEXTO, nunca a cor da série.
   · Grade e eixo recessivos (hairline). Rótulo direto seletivo.
   · Barra sempre ancorada no zero. Projeção sempre tracejada.
   ========================================================= */

const MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const DIA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Rótulos de mês terminando em (ano, mês 0-based), contando pra trás. */
function rotulosMes(qtd: number, ano: number, mes: number) {
  const out: string[] = [];
  for (let i = qtd - 1; i >= 0; i--) {
    const d = new Date(ano, mes - i, 1);
    out.push(`${MES[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`);
  }
  return out;
}

export default function DataVizExtra() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · data viz extra"
        title={
          <>
            Heatmap, sparklines, gauge — <em>os 3 que sempre faltam</em>.
          </>
        }
        lede="Complementam os 4 arquétipos principais quando o dashboard precisa de granularidade. Heatmap pra densidade ao longo do tempo, sparkline pra microtendência ao lado do KPI, gauge pra posição contra uma meta. Tudo autoral — sparkline e gauge em SVG, heatmap em grade de células — uma escala por gráfico, paleta de série validada pra daltonismo."
      />

      <HeatmapSection />
      <SparklinesSection />
      <GaugesSection />
    </>
  );
}

/* =========================================================
   1 · Heatmap · escala SEQUENCIAL (1 matiz, claro → escuro)
   Uma única medida, uma única escala. Cortes por quartil do
   dado real — a legenda mostra o intervalo em número, não
   "menos → mais" no vago.
   ========================================================= */

type HeatCell = { w: number; d: number; n: number; date: Date; step: number };

function HeatmapSection() {
  const { cells, meses, total, ativos, legenda, pico, streak, delta30 } = useMemo(() => {
    const bruto: Omit<HeatCell, 'step'>[] = [];
    // Recorte fixo: 52 semanas terminando em 19/mai/2026.
    for (let w = 0; w < 52; w++) {
      for (let d = 0; d < 7; d++) {
        const diasAtras = (51 - w) * 7 + (6 - d);
        const date = new Date(2026, 4, 19 - diasAtras);
        const dow = date.getDay();
        const fds = dow === 0 || dow === 6;
        // fim de semana cai abaixo do corte com frequência: o passo "0" precisa
        // aparecer de verdade, senão a rampa não tem referência de ausência.
        const base = fds ? -0.5 : 1.4;
        const sazonal = Math.sin((w / 52) * Math.PI * 2) * 0.6 + 0.6;
        // ruído pseudo-determinístico (hash estilo GLSL) — estável entre renders
        const ruido = Math.abs((Math.sin(w * 12.9898 + d * 78.233) * 43758.5453) % 1) * 1.4;
        const v = base + sazonal + ruido;
        bruto.push({ w, d, n: v < 0.6 ? 0 : Math.round(v * 4), date });
      }
    }

    // Cortes por quartil dos dias COM atividade — o zero fica fora da rampa.
    const nz = bruto.filter((c) => c.n > 0).map((c) => c.n).sort((a, b) => a - b);
    const q = (p: number) => nz[clamp(Math.round((nz.length - 1) * p), 0, nz.length - 1)];
    const b1 = q(0.25);
    const b2 = Math.max(q(0.5), b1 + 1);
    const b3 = Math.max(q(0.75), b2 + 1);

    const cells: HeatCell[] = bruto.map((c) => ({
      ...c,
      step: c.n === 0 ? 0 : c.n <= b1 ? 1 : c.n <= b2 ? 2 : c.n <= b3 ? 3 : 4,
    }));

    // Rótulo de mês ancorado na semana em que o mês vira (não em 1/12 no chute).
    // O mês parcial da borda esquerda fica sem rótulo — rotulá-lo mentiria sobre
    // onde o mês começa e colidiria com o rótulo seguinte.
    const meses: Array<{ w: number; label: string }> = [];
    let ultimo = cells[0].date.getMonth();
    for (let w = 1; w < 52; w++) {
      const m = cells[w * 7].date.getMonth();
      if (m !== ultimo) {
        meses.push({ w, label: MES[m] });
        ultimo = m;
      }
    }

    const total = cells.reduce((s, c) => s + c.n, 0);
    const ativos = cells.filter((c) => c.n > 0).length;
    const pico = cells.reduce((a, c) => (c.n > a.n ? c : a), cells[0]);

    // Números do rodapé saem do dado, não de afirmação solta.
    let streak = 0;
    let corrente = 0;
    for (const c of cells) {
      corrente = c.n > 0 ? corrente + 1 : 0;
      if (corrente > streak) streak = corrente;
    }
    const soma = (de: number, ate: number) =>
      cells.slice(de, ate).reduce((s, c) => s + c.n, 0);
    const ult30 = soma(cells.length - 30, cells.length);
    const ant30 = soma(cells.length - 60, cells.length - 30);
    const delta30 = ant30 ? Math.round(((ult30 - ant30) / ant30) * 100) : 0;

    const legenda = [
      { step: 0, label: '0' },
      { step: 1, label: `1–${b1}` },
      { step: 2, label: `${b1 + 1}–${b2}` },
      { step: 3, label: `${b2 + 1}–${b3}` },
      { step: 4, label: `${b3 + 1}+` },
    ];

    return { cells, meses, total, ativos, legenda, pico, streak, delta30 };
  }, []);

  const stageRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; n: number; quando: string } | null>(null);

  const aoEntrar = (e: React.MouseEvent<HTMLSpanElement>, c: HeatCell) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = e.currentTarget.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    setTip({
      x: r.left - s.left + r.width / 2,
      y: r.top - s.top,
      n: c.n,
      quando: `${DIA[c.date.getDay()]} · ${c.date.getDate()} ${MES[c.date.getMonth()]} ${c.date.getFullYear()}`,
    });
  };

  const rotuloDia = ['', 'seg', '', 'qua', '', 'sex', ''];

  return (
    <Section
      title="Heatmap · 12 meses de atividade"
      meta="sequencial · 1 matiz claro→escuro · cortes por quartil · zero neutro fora da rampa"
    >
      <div className="vds-hm-card">
        <header className="vds-hm-head">
          <div>
            <p className="vds-hm-eyebrow">Atividade Viver de IA · jun/2025 a mai/2026</p>
            <h3 className="vds-hm-value">
              {total.toLocaleString('pt-BR')}
              <span className="unit"> ações no período</span>
            </h3>
            <p className="vds-hm-lede">
              Cada quadradinho é um dia. Conta aula publicada, post no Discord, transcript editado e
              resposta de mentor — uma medida só, uma escala só. Picos coincidem com lançamento.
            </p>
          </div>
          <div className="vds-hm-pill">
            {delta30 >= 0 ? (
              <TrendingUp size={12} strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <TrendingDown size={12} strokeWidth={2.5} aria-hidden="true" />
            )}
            {delta30 >= 0 ? '+' : '−'}
            {Math.abs(delta30)}% nos últimos 30 dias
          </div>
        </header>

        <div className="vds-hm-stage" ref={stageRef}>
          <div className="vds-hm-months" aria-hidden="true">
            {meses.map((m) => {
              const pos = m.w / 52;
              // perto da borda o rótulo ancora à direita: se ficasse em `left`
              // ele estouraria a trilha e alargaria o card.
              return (
                <span key={m.w} style={pos > 0.9 ? { right: 0 } : { left: `${pos * 100}%` }}>
                  {m.label}
                </span>
              );
            })}
          </div>

          <div className="vds-hm-body">
            <div className="vds-hm-days" aria-hidden="true">
              {rotuloDia.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>

            <div
              className="vds-hm-grid"
              role="img"
              aria-label={`Mapa de calor de atividade diária. ${total.toLocaleString('pt-BR')} ações em ${ativos} dias ativos, entre junho de 2025 e maio de 2026.`}
              onMouseLeave={() => setTip(null)}
            >
              {Array.from({ length: 52 }).map((_, w) => (
                <div className="vds-hm-col" key={w}>
                  {Array.from({ length: 7 }).map((_, d) => {
                    const cell = cells[w * 7 + d];
                    return (
                      <span
                        key={d}
                        className={`vds-hm-cell s${cell.step}`}
                        onMouseEnter={(e) => aoEntrar(e, cell)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {tip && (
            <div className="vds-hm-tip" style={{ left: tip.x, top: tip.y }} role="status">
              <strong>
                {tip.n} {tip.n === 1 ? 'ação' : 'ações'}
              </strong>
              <span>{tip.quando}</span>
            </div>
          )}
        </div>

        <footer className="vds-hm-foot">
          <p className="vds-hm-facts">
            <span>
              Dias ativos <strong>{ativos}</strong> de 364
            </span>
            <span className="vds-hm-sep" aria-hidden="true" />
            <span>
              Maior sequência <strong>{streak} dias</strong>
            </span>
            <span className="vds-hm-sep" aria-hidden="true" />
            <span>
              Pico <strong>{pico.n} ações</strong> em {pico.date.getDate()} {MES[pico.date.getMonth()]}
            </span>
          </p>

          <div className="vds-hm-legend">
            <span className="vds-hm-legend-cap">ações por dia</span>
            {legenda.map((l) => (
              <span className="vds-hm-key" key={l.step}>
                <i className={`vds-hm-cell s${l.step}`} aria-hidden="true" />
                {l.label}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </Section>
  );
}

/* =========================================================
   2 · Sparklines · 1 série por tile = small multiples
   Quatro medidas de escala diferente NÃO viram um gráfico de
   dois eixos: viram quatro gráficos pequenos, cada um com a
   própria escala e o próprio rótulo. Barra ancorada no zero.
   ========================================================= */

type SparkKind = 'line' | 'area' | 'bar' | 'step';

type Kpi = {
  id: string;
  label: string;
  data: number[];
  rotulos: string[];
  kind: SparkKind;
  /** índice a partir do qual o traço é projeção (tracejado + opacidade) */
  projDe?: number;
  delta: string;
  dir: 'up' | 'down';
  bom: boolean;
  nota: string;
  fmt: (v: number) => string;
};

function caminhoSuave(pts: Array<{ x: number; y: number }>) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cur = pts[i];
    const prev = pts[i - 1];
    const cpx = (prev.x + cur.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${cur.y}, ${cur.x} ${cur.y}`;
  }
  return d;
}

function caminhoDegrau(pts: Array<{ x: number; y: number }>) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x} ${pts[i - 1].y} L ${pts[i].x} ${pts[i].y}`;
  }
  return d;
}

/** Barra com ponta arredondada ancorada na base (topo redondo, base reta). */
function barraTopoRedondo(x: number, y: number, w: number, h: number, r: number) {
  const rr = clamp(Math.min(r, w / 2, h), 0, 999);
  const b = y + h;
  return `M ${x} ${b} L ${x} ${y + rr} Q ${x} ${y} ${x + rr} ${y} L ${x + w - rr} ${y} Q ${x + w} ${y} ${x + w} ${y + rr} L ${x + w} ${b} Z`;
}

function Spark({
  id,
  data,
  kind,
  projDe,
  ativo,
  onAtivo,
}: {
  id: string;
  data: number[];
  kind: SparkKind;
  projDe?: number;
  ativo: number | null;
  onAtivo: (i: number | null) => void;
}) {
  const W = 148;
  const H = 46;
  const PX = 4;
  const PY = 6;

  const ancoraZero = kind === 'bar';
  const max = Math.max(...data);
  const min = ancoraZero ? 0 : Math.min(...data);
  const span = max - min || 1;
  const y = (v: number) => H - PY - ((v - min) / span) * (H - PY * 2);

  const seguir = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const t = clamp((e.clientX - r.left) / r.width, 0, 1);
    onAtivo(clamp(Math.round(t * (data.length - 1)), 0, data.length - 1));
  };

  /* ---- barras: banda + base no zero + hairline de eixo ---- */
  if (kind === 'bar') {
    const bw = W / data.length;
    const larg = Math.max(3, bw - 2); // gap de 2px entre fills adjacentes
    const base = H - 1;
    return (
      <div className="vds-sk-plot" onMouseMove={seguir} onMouseLeave={() => onAtivo(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="vds-sk-svg" aria-hidden="true" focusable="false">
          <line x1="0" x2={W} y1={base + 0.5} y2={base + 0.5} className="vds-sk-axis" />
          {data.map((v, i) => {
            const h = Math.max(1.5, (v / (max || 1)) * (H - PY - 1));
            const x = i * bw + (bw - larg) / 2;
            return (
              <path
                key={i}
                d={barraTopoRedondo(x, base - h, larg, h, 2)}
                className={`vds-sk-bar${ativo === i ? ' is-on' : ''}`}
              />
            );
          })}
        </svg>
      </div>
    );
  }

  /* ---- linha / área / degrau ---- */
  const pts = data.map((v, i) => ({
    x: PX + (i * (W - PX * 2)) / (data.length - 1),
    y: y(v),
  }));

  const corte = projDe != null ? clamp(projDe, 0, pts.length - 1) : pts.length - 1;
  const solidos = pts.slice(0, corte + 1);
  const projetados = projDe != null ? pts.slice(corte) : [];

  const traco = kind === 'step' ? caminhoDegrau : caminhoSuave;
  const dSolido = traco(solidos);
  const dProj = projetados.length > 1 ? traco(projetados) : '';
  const ultimoReal = solidos[solidos.length - 1];
  const ultimoProj = projetados.length > 1 ? projetados[projetados.length - 1] : null;
  const p = ativo != null ? pts[ativo] : null;
  const projAtivo = projDe != null && ativo != null && ativo > corte;

  return (
    <div className="vds-sk-plot" onMouseMove={seguir} onMouseLeave={() => onAtivo(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="vds-sk-svg" aria-hidden="true" focusable="false">
        {kind === 'area' && (
          <>
            <defs>
              <linearGradient id={`sk-grad-${id}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" className="vds-sk-grad-a" />
                <stop offset="100%" className="vds-sk-grad-b" />
              </linearGradient>
            </defs>
            <path
              d={`${dSolido} L ${ultimoReal.x} ${H} L ${solidos[0].x} ${H} Z`}
              fill={`url(#sk-grad-${id})`}
            />
          </>
        )}

        <path d={dSolido} className="vds-sk-line" />
        {dProj && <path d={dProj} className="vds-sk-line is-proj" />}

        {p && <line x1={p.x} x2={p.x} y1="0" y2={H} className="vds-sk-cursor" />}

        {/* rótulo direto seletivo: só a última leitura ganha marcador */}
        <circle cx={ultimoReal.x} cy={ultimoReal.y} r="4.5" className="vds-sk-halo" />
        <circle cx={ultimoReal.x} cy={ultimoReal.y} r="2.6" className="vds-sk-dot" />
        {ultimoProj && (
          <>
            <circle cx={ultimoProj.x} cy={ultimoProj.y} r="4.5" className="vds-sk-halo" />
            <circle cx={ultimoProj.x} cy={ultimoProj.y} r="2.6" className="vds-sk-dot is-proj" />
          </>
        )}

        {p && (
          <>
            <circle cx={p.x} cy={p.y} r="5" className="vds-sk-halo" />
            <circle
              cx={p.x}
              cy={p.y}
              r="3"
              className={`vds-sk-dot${projAtivo ? ' is-proj' : ''}`}
            />
          </>
        )}
      </svg>
    </div>
  );
}

function SparkCard({ kpi }: { kpi: Kpi }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const projetado = kpi.projDe != null && ativo != null && ativo > kpi.projDe;

  return (
    <article className="vds-sk-card">
      <p className="vds-sk-label">{kpi.label}</p>

      <div className="vds-sk-row">
        <div className="vds-sk-num">
          <p className="vds-sk-value">{kpi.fmt(kpi.data[kpi.projDe ?? kpi.data.length - 1])}</p>
          <p className={`vds-sk-delta ${kpi.bom ? 'bom' : 'ruim'}`}>
            {kpi.dir === 'up' ? (
              <TrendingUp size={11} strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <TrendingDown size={11} strokeWidth={2.5} aria-hidden="true" />
            )}
            {kpi.delta}
          </p>
        </div>

        <Spark
          id={kpi.id}
          data={kpi.data}
          kind={kpi.kind}
          projDe={kpi.projDe}
          ativo={ativo}
          onAtivo={setAtivo}
        />
      </div>

      {/* leitura no hover troca a legenda de período — nunca número em todo ponto */}
      <p className={`vds-sk-read${ativo != null ? ' is-on' : ''}`}>
        {ativo != null ? (
          <>
            <span className="vds-sk-read-when">{kpi.rotulos[ativo]}</span>
            <span className="vds-sk-read-val">{kpi.fmt(kpi.data[ativo])}</span>
            {projetado && <span className="vds-sk-read-tag">projeção</span>}
          </>
        ) : (
          <span className="vds-sk-read-when">
            {kpi.rotulos[0]} → {kpi.rotulos[kpi.rotulos.length - 1]} · {kpi.nota}
          </span>
        )}
      </p>

      {kpi.projDe != null && (
        <p className="vds-sk-legend">
          <span className="vds-sk-swatch" aria-hidden="true" />
          realizado
          <span className="vds-sk-swatch is-proj" aria-hidden="true" />
          projeção
        </p>
      )}
    </article>
  );
}

function SparklinesSection() {
  const kpis: Kpi[] = useMemo(
    () => [
      {
        id: 'mrr',
        label: 'MRR recorrente',
        // 12 meses realizados + 2 projetados
        data: [820, 880, 940, 990, 1080, 1180, 1320, 1420, 1520, 1620, 1690, 1720, 1790, 1840],
        rotulos: rotulosMes(14, 2026, 6),
        kind: 'area',
        projDe: 11,
        delta: '+13,2% no trimestre',
        dir: 'up',
        bom: true,
        nota: '14 meses',
        fmt: (v) => `R$ ${(v / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`,
      },
      {
        id: 'nps',
        label: 'NPS · janela de 30 dias',
        data: [71, 73, 74, 76, 77, 78, 77, 76, 75, 74, 73, 71],
        rotulos: rotulosMes(12, 2026, 4),
        kind: 'line',
        delta: '−7 pt desde o pico',
        dir: 'down',
        bom: false,
        nota: '12 meses',
        fmt: (v) => `${v}`,
      },
      {
        id: 'conv',
        label: 'Conversão do funil',
        data: [0.34, 0.31, 0.36, 0.38, 0.4, 0.39, 0.41, 0.42, 0.43, 0.44, 0.44, 0.44],
        rotulos: rotulosMes(12, 2026, 4),
        kind: 'step',
        delta: '+0,10 pp em 12 meses',
        dir: 'up',
        bom: true,
        nota: '12 meses',
        fmt: (v) => `${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`,
      },
      {
        id: 'canc',
        label: 'Cancelamentos no mês',
        data: [28, 26, 24, 25, 22, 20, 21, 19, 18, 17, 17, 17],
        rotulos: rotulosMes(12, 2026, 4),
        kind: 'bar',
        delta: '−39% em 12 meses',
        dir: 'down',
        bom: true,
        nota: '12 meses',
        fmt: (v) => `${v}`,
      },
    ],
    [],
  );

  return (
    <Section
      title="Sparklines · small multiples de KPI"
      meta="1 série por tile · escala própria · sem eixo duplo · barra ancorada no zero"
    >
      <div className="vds-sk-grid">
        {kpis.map((k) => (
          <SparkCard key={k.id} kpi={k} />
        ))}
      </div>

      <p className="vds-sk-rule">
        Quatro medidas em escalas incompatíveis — reais, pontos, porcentagem e contagem. Empilhar isso
        num gráfico só exigiria dois eixos y, o erro mais comum de dashboard. A saída correta é esta:
        um gráfico pequeno por medida, cada um com a própria escala e o próprio rótulo. Verde e coral
        aqui são <strong>status</strong> (a direção é boa ou ruim), nunca identidade de série — a seta
        repete o sinal pra quem não distingue as duas cores.
      </p>
    </Section>
  );
}

/* =========================================================
   3 · Gauge · valor único contra uma meta
   Uma medida, uma escala, âncoras de início e fim visíveis e
   um marcador de meta. O arco usa a cor de série; o veredito
   usa a cor de status — as duas coisas nunca se misturam.
   ========================================================= */

type Tom = 'bom' | 'atencao' | 'critico';

const TOM_LABEL: Record<Tom, string> = {
  bom: 'dentro do alvo',
  atencao: 'atenção',
  critico: 'crítico',
};

function GaugeArc({
  value,
  max,
  target,
  unit,
  fmt,
  aria,
}: {
  value: number;
  max: number;
  target?: number;
  unit: string;
  fmt?: (v: number) => string;
  aria: string;
}) {
  const R = 66;
  const STROKE = 13;
  const f = clamp(value / max, 0, 1);
  const arco = Math.PI * R;
  const dash = f * arco;

  const marca = target != null ? clamp(target / max, 0, 1) : null;
  let tick: { x1: number; y1: number; x2: number; y2: number } | null = null;
  if (marca != null) {
    const ux = -Math.cos(Math.PI * marca);
    const uy = -Math.sin(Math.PI * marca);
    const ri = R - STROKE / 2 - 3.5;
    const ro = R + STROKE / 2 + 3.5;
    tick = { x1: ux * ri, y1: uy * ri, x2: ux * ro, y2: uy * ro };
  }

  const texto = fmt ? fmt(value) : `${value}`;

  return (
    <svg viewBox="0 0 200 130" className="vds-gz-svg" role="img" aria-label={aria} focusable="false">
      <g transform="translate(100, 102)">
        <path
          d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`}
          className="vds-gz-track"
          strokeWidth={STROKE}
        />
        <path
          d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`}
          className="vds-gz-arc"
          strokeWidth={STROKE}
          strokeDasharray={`${dash} ${arco}`}
        />
        {tick && (
          <line x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} className="vds-gz-tick" />
        )}
      </g>

      <text x="100" y="88" className="vds-gz-big" textAnchor="middle">
        {texto}
        <tspan className="unit">{unit}</tspan>
      </text>

      {/* âncoras da escala — o gauge deixa de ser um arco decorativo */}
      <text x="34" y="122" className="vds-gz-anchor" textAnchor="middle">
        0
      </text>
      <text x="166" y="122" className="vds-gz-anchor" textAnchor="middle">
        {max}
        {unit}
      </text>
    </svg>
  );
}

function GaugeCard({
  eyebrow,
  value,
  max,
  target,
  targetLabel,
  unit,
  label,
  tom,
  nota,
  destaque,
  fmt,
}: {
  eyebrow: string;
  value: number;
  max: number;
  target: number;
  targetLabel: string;
  unit: string;
  label: string;
  tom: Tom;
  nota: React.ReactNode;
  destaque?: boolean;
  fmt?: (v: number) => string;
}) {
  const texto = fmt ? fmt(value) : `${value}`;
  return (
    <article className={`vds-gz-card${destaque ? ' is-destaque' : ''}`}>
      <p className="vds-gz-eyebrow">{eyebrow}</p>

      <GaugeArc
        value={value}
        max={max}
        target={target}
        unit={unit}
        fmt={fmt}
        aria={`${label}: ${texto}${unit} numa escala de 0 a ${max}${unit}. ${targetLabel}: ${target}${unit}. Estado: ${TOM_LABEL[tom]}.`}
      />

      <p className="vds-gz-label">{label}</p>

      <p className="vds-gz-readout">
        <span className="vds-gz-key">
          <i className="vds-gz-swatch" aria-hidden="true" />
          realizado <strong>{texto}{unit}</strong>
        </span>
        <span className="vds-gz-key">
          <i className="vds-gz-swatch is-tick" aria-hidden="true" />
          {targetLabel} <strong>{target}{unit}</strong>
        </span>
      </p>

      <p className={`vds-gz-status t-${tom}`}>
        <i className="vds-gz-dot" aria-hidden="true" />
        {TOM_LABEL[tom]}
      </p>

      <p className="vds-gz-meta">{nota}</p>
    </article>
  );
}

function GaugesSection() {
  return (
    <Section
      title="Gauge · arco radial contra meta"
      meta="valor único · âncoras 0 e máximo · marcador de meta · status separado da série"
    >
      <div className="vds-gz-grid">
        <GaugeCard
          eyebrow="Saúde do agente Nina"
          value={92}
          max={100}
          target={88}
          targetLabel="SLA"
          unit="%"
          label="uptime · últimos 30 dias"
          tom="bom"
          nota={
            <>
              <strong>4 pontos acima do SLA</strong> do trimestre. Nenhuma janela de indisponibilidade
              acima de 6 minutos.
            </>
          }
        />

        <GaugeCard
          eyebrow="Meta de receita · maio"
          value={58}
          max={100}
          target={61}
          targetLabel="ritmo do dia 19"
          unit="%"
          label="da meta do mês"
          tom="atencao"
          destaque
          nota={
            <>
              <strong>R$ 548 mil de R$ 940 mil.</strong> 3 pontos atrás do ritmo necessário, com 12
              dias pra fechar a diferença.
            </>
          }
        />

        <GaugeCard
          eyebrow="Tempo médio de resposta"
          value={47}
          max={120}
          target={60}
          targetLabel="limite"
          unit="s"
          label="mediana · quanto menor, melhor"
          tom="bom"
          nota={
            <>
              <strong>13 segundos de folga</strong> contra o limite acordado. A escala vai até 120s
              porque é onde o atendimento passa a ser abandonado.
            </>
          }
        />
      </div>

      <p className="vds-gz-rule">
        O arco carrega a cor de série; o veredito (dentro do alvo, atenção, crítico) carrega a cor de
        status e vem sempre com a palavra escrita ao lado. São canais separados de propósito — o gauge
        continua legível impresso em preto e branco, e ninguém confunde "azul" com "bom".
      </p>
    </Section>
  );
}
