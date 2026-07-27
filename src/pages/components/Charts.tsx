import { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ArrowDownRight,
  ArrowUpRight,
  Grid2X2,
  Filter,
  Ban,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './charts.css';

/* ============================================================
   Gráficos do design system.
   Cada espécime abaixo demonstra UMA regra da régua de série:
     1 série   → cor única, sem legenda (o título já nomeia)
     2 séries  → data-1 + data-2 SEMPRE com 2º canal (traço/forma)
     3+ séries → small multiples, nunca uma 3ª cor
   E o inegociável: UM eixo. Duas escalas viram dois painéis.
   ============================================================ */

/* ---------- formatadores (pt-BR, tabular) ---------- */
const nf = (n: number, d = 0) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

/** 280 → "280K" · 1200 → "1,2M" */
const fmtMil = (v: number) => (v >= 1000 ? `${nf(v / 1000, 1)}M` : `${nf(v)}K`);

export default function Charts() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · charts"
        title={
          <>
            Gráficos editoriais, <em>navy & glass</em>.
          </>
        }
        lede="A paleta da marca é navy-only — por medição, ela não sustenta 3 séries por cor. Então a régua daqui não é estética, é de leitura: uma série tem cor única e nenhuma legenda; duas séries carregam um segundo canal além da cor; três ou mais viram small multiples. E um eixo só, sempre. Cada espécime abaixo existe pra demonstrar uma dessas regras."
      />

      <RulesSection />
      <KPISection />
      <AreaSection />
      <IndexedSection />
      <BarSection />
      <SmallMultiplesSection />
      <DonutSection />
      <FunnelSection />
    </>
  );
}

/* ============================================================
   Régua de série · o cartão de referência
   ============================================================ */
function RulesSection() {
  return (
    <Section title="Régua de série" meta="decida a codificação antes de escolher a cor">
      <div className="vds-rules-grid">
        <article className="vds-rule-card">
          <span className="vds-rule-n">01</span>
          <svg viewBox="0 0 88 34" className="vds-rule-art" aria-hidden="true">
            <path d="M4 26 C 18 26, 20 12, 32 12 S 56 22, 68 8 L 84 6" className="ra-line s1" fill="none" />
            <circle cx="84" cy="6" r="4" className="ra-dot s1" />
          </svg>
          <h4>Uma série</h4>
          <p>
            <code>--via-data-1</code> ou o navy da marca. <strong>Sem legenda</strong> — o título já nomeia a
            série. Rótulo direto só no ponto que importa.
          </p>
        </article>

        <article className="vds-rule-card">
          <span className="vds-rule-n">02</span>
          <svg viewBox="0 0 88 34" className="vds-rule-art" aria-hidden="true">
            <path d="M4 26 C 18 26, 20 10, 32 10 S 56 20, 68 6 L 84 5" className="ra-line s1" fill="none" />
            <path
              d="M4 30 C 18 30, 22 24, 34 23 S 58 20, 70 18 L 84 17"
              className="ra-line s2 dashed"
              fill="none"
            />
            <circle cx="84" cy="5" r="4" className="ra-dot s1" />
            <rect x="80.5" y="13.5" width="7" height="7" rx="1" className="ra-sq s2" />
          </svg>
          <h4>Duas séries</h4>
          <p>
            <code>data-1</code> + <code>data-2</code> e <strong>obrigatoriamente</strong> um segundo canal:
            tracejado, textura ou marcador de forma. Legenda e rótulo direto — identidade nunca só por cor.
          </p>
        </article>

        <article className="vds-rule-card">
          <span className="vds-rule-n">03</span>
          <svg viewBox="0 0 88 34" className="vds-rule-art" aria-hidden="true">
            {[0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${k * 30}, 0)`}>
                <rect x="1" y="2" width="26" height="30" rx="4" className="ra-frame" />
                <path
                  d={
                    k === 0
                      ? 'M5 26 C 10 26, 12 16, 16 15 S 22 10, 23 8'
                      : k === 1
                        ? 'M5 24 C 10 24, 12 20, 16 19 S 22 14, 23 12'
                        : 'M5 27 C 10 27, 12 22, 16 22 S 22 16, 23 15'
                  }
                  className="ra-line s1 thin"
                  fill="none"
                />
              </g>
            ))}
          </svg>
          <h4>Três ou mais</h4>
          <p>
            Não invente uma 3ª cor. <strong>Small multiples</strong> — um gráfico pequeno por série, escala
            compartilhada — ou agrupe a cauda em “Outros”.
          </p>
        </article>

        <article className="vds-rule-card is-veto">
          <span className="vds-rule-n">
            <Ban size={13} strokeWidth={2.4} />
          </span>
          <svg viewBox="0 0 88 34" className="vds-rule-art" aria-hidden="true">
            <line x1="10" y1="4" x2="10" y2="30" className="ra-axis" />
            <line x1="78" y1="4" x2="78" y2="30" className="ra-axis" />
            <path d="M14 26 C 26 26, 30 12, 44 12 S 62 20, 74 8" className="ra-line s1" fill="none" />
            <line x1="12" y1="6" x2="76" y2="28" className="ra-strike" />
          </svg>
          <h4>Nunca eixo duplo</h4>
          <p>
            Duas escalas no mesmo plano fabricam correlação. Medidas diferentes viram{' '}
            <strong>dois painéis</strong> ou vão pra uma base comum (índice 100).
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ============================================================
   1 série · sparkline (sem legenda)
   ============================================================ */
function Sparkline({ data, label }: { data: number[]; label: string }) {
  const W = 160;
  const H = 40;
  const P = 5;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => ({
    x: P + (i * (W - P * 2)) / (data.length - 1),
    y: H - P - ((v - min) / span) * (H - P * 2),
  }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const c = pts[i];
    const n = pts[i + 1];
    const cpx = (c.x + n.x) / 2;
    d += ` C ${cpx} ${c.y}, ${cpx} ${n.y}, ${n.x} ${n.y}`;
  }
  const area = `${d} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;
  const last = pts[pts.length - 1];

  return (
    <div className="vds-kpi-spark-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="vds-kpi-spark"
        preserveAspectRatio="none"
        role="img"
        aria-label={label}
      >
        <path d={area} className="spark-fill" />
        <path d={d} className="spark-line" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* marcador do valor mais recente · 8px, fora do SVG pra não distorcer */}
      <span
        className="vds-kpi-spark-now"
        style={{ left: `${(last.x / W) * 100}%`, top: `${(last.y / H) * 100}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

function KPISection() {
  const kpis = [
    {
      label: 'MRR',
      value: 'R$ 1,84M',
      delta: '+8,2%',
      up: true,
      data: [120, 128, 126, 138, 150, 162, 170, 184],
    },
    {
      label: 'Churn',
      value: '3,0%',
      delta: '−1,2pp',
      up: false,
      data: [52, 49, 47, 44, 42, 40, 38, 30],
    },
    { label: 'CAC', value: 'R$ 184', delta: '−6%', up: false, data: [240, 232, 228, 214, 206, 198, 192, 184] },
    { label: 'LTV', value: 'R$ 7,2K', delta: '+12%', up: true, data: [58, 60, 59, 63, 66, 69, 70, 72] },
  ];

  return (
    <Section title="KPIs · visão de topo" meta="set/2026 · 1 série por cartão · jan → ago">
      <div className="vds-kpi-grid">
        {kpis.map((k) => (
          <div className="vds-kpi-card" key={k.label}>
            <div className="vds-kpi-top">
              <span className="vds-kpi-label">{k.label}</span>
              <span className={`vds-kpi-delta ${k.up ? 'up' : 'down'}`}>
                {k.up ? (
                  <ArrowUpRight size={12} strokeWidth={2.6} />
                ) : (
                  <ArrowDownRight size={12} strokeWidth={2.6} />
                )}
                {k.delta}
              </span>
            </div>
            <p className="vds-kpi-value">{k.value}</p>
            <Sparkline data={k.data} label={`${k.label} · tendência dos últimos 8 meses`} />
            <p className="vds-kpi-foot">
              <span>jan</span>
              <span>ago</span>
            </p>
          </div>
        ))}
      </div>
      <p className="vds-note">
        Uma série por cartão: cor única, escala relativa ao próprio KPI e <strong>nenhuma legenda</strong>. O
        rótulo do cartão já nomeia o dado — legenda aqui seria ruído.
      </p>
    </Section>
  );
}

/* ============================================================
   Tooltip SVG compartilhado
   ============================================================ */
type TipRow = { key?: 's1' | 's2'; label: string; value: string };

function SvgTooltip({
  cx,
  top,
  w,
  minX,
  maxX,
  title,
  rows,
}: {
  cx: number;
  top: number;
  w: number;
  minX: number;
  maxX: number;
  title: string;
  rows: TipRow[];
}) {
  const h = 30 + rows.length * 19;
  const left = Math.min(Math.max(cx - w / 2, minX), maxX - w);
  return (
    <g className="vds-tt" pointerEvents="none">
      <rect x={left} y={top} width={w} height={h} rx="10" className="tt-bg" />
      <text x={left + 13} y={top + 18} className="tt-title">
        {title}
      </text>
      {rows.map((r, i) => {
        const ry = top + 36 + i * 19;
        return (
          <g key={r.label}>
            {r.key === 's1' && <rect x={left + 13} y={ry - 8} width="12" height="3" rx="1.5" className="tt-key s1" />}
            {r.key === 's2' && (
              <rect x={left + 13} y={ry - 9.5} width="6" height="6" rx="1" className="tt-key s2" />
            )}
            <text x={left + (r.key ? 31 : 13)} y={ry} className="tt-label">
              {r.label}
            </text>
            <text x={left + w - 13} y={ry} className="tt-value" textAnchor="end">
              {r.value}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ============================================================
   1 série + projeção (2º canal obrigatório: tracejado + opacidade)
   ============================================================ */
const AREA_REAL = [
  { m: 'Jan', v: 280 },
  { m: 'Fev', v: 340 },
  { m: 'Mar', v: 420 },
  { m: 'Abr', v: 510 },
  { m: 'Mai', v: 680 },
  { m: 'Jun', v: 820 },
  { m: 'Jul', v: 940 },
  { m: 'Ago', v: 1100 },
];
const AREA_PROJ = [
  { m: 'Set', v: 1240 },
  { m: 'Out', v: 1380 },
];

function smoothPath(pts: { x: number; y: number }[]) {
  let p = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cur = pts[i];
    const next = pts[i + 1];
    const cpx = (cur.x + next.x) / 2;
    p += ` C ${cpx} ${cur.y}, ${cpx} ${next.y}, ${next.x} ${next.y}`;
  }
  return p;
}

function AreaSection() {
  const all = [...AREA_REAL, ...AREA_PROJ];
  const lastReal = AREA_REAL.length - 1;
  const [hover, setHover] = useState<number>(lastReal);

  const W = 880;
  const H = 340;
  const PAD_L = 66;
  const PAD_R = 40;
  const PAD_T = 58;
  const PAD_B = 58;
  const MAX = 1500;
  const BASE = H - PAD_B;

  const px = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (all.length - 1);
  const py = (v: number) => BASE - (v / MAX) * (H - PAD_T - PAD_B);

  const pts = all.map((d, i) => ({ ...d, x: px(i), y: py(d.v), proj: i > lastReal }));
  const realPts = pts.slice(0, lastReal + 1);
  const projPts = pts.slice(lastReal); // começa no último realizado pra emendar

  const realLine = smoothPath(realPts);
  const realFill = `${realLine} L ${realPts[realPts.length - 1].x} ${BASE} L ${realPts[0].x} ${BASE} Z`;
  const projLine = smoothPath(projPts);
  const projFill = `${projLine} L ${projPts[projPts.length - 1].x} ${BASE} L ${projPts[0].x} ${BASE} Z`;

  const grids = [0, 300, 600, 900, 1200, 1500];
  const active = pts[hover];
  const tipTop = Math.max(active.y - 68, 10);

  return (
    <Section title="Área · uma série + projeção" meta="receita acumulada 2026 · realizado jan–ago, projetado set–out">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">
              <TrendingUp size={11} strokeWidth={2.2} /> Receita Viver de IA
            </p>
            <h3>
              R$ 5,09M<span className="unit"> realizado</span>
            </h3>
            <p className="lede">
              Oito meses fechados. Set e out são <em>projeção</em> — e por isso aparecem tracejados, em opacidade
              menor e nomeados na legenda.
            </p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +293% vs jan
          </div>
        </header>

        <div className="vds-legend">
          <span className="vds-legend-item">
            <svg viewBox="0 0 28 10" className="vds-key" aria-hidden="true">
              <line x1="1" y1="5" x2="27" y2="5" className="key-line s1" />
              <circle cx="14" cy="5" r="3.6" className="key-dot s1" />
            </svg>
            Realizado
          </span>
          <span className="vds-legend-item">
            <svg viewBox="0 0 28 10" className="vds-key" aria-hidden="true">
              <line x1="1" y1="5" x2="27" y2="5" className="key-line s1 dashed" />
            </svg>
            Projeção · set–out
          </span>
        </div>

        <div className="vds-chart-stage">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="vds-plot"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Receita mensal de janeiro a agosto de 2026, com projeção para setembro e outubro."
            onMouseLeave={() => setHover(lastReal)}
          >
            <defs>
              <linearGradient id="vds-area-real" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" className="gs-1-35" />
                <stop offset="62%" className="gs-1-10" />
                <stop offset="100%" className="gs-1-00" />
              </linearGradient>
              <pattern
                id="vds-area-proj"
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="7" className="hatch-line" />
              </pattern>
            </defs>

            {/* grade recessiva */}
            {grids.map((g) => {
              const y = py(g);
              return (
                <g key={g}>
                  {g > 0 && <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} className="grid" />}
                  <text x={PAD_L - 14} y={y + 4} className="axis-label" textAnchor="end">
                    {g === 0 ? '0' : fmtMil(g)}
                  </text>
                </g>
              );
            })}
            {/* eixo de base */}
            <line x1={PAD_L} x2={W - PAD_R} y1={BASE} y2={BASE} className="axis" />

            {/* faixa de projeção */}
            <rect
              x={pts[lastReal].x}
              y={PAD_T - 26}
              width={W - PAD_R - pts[lastReal].x}
              height={BASE - PAD_T + 26}
              className="proj-zone"
            />
            <line x1={pts[lastReal].x} x2={pts[lastReal].x} y1={PAD_T - 26} y2={BASE} className="proj-split" />
            <text
              x={(pts[lastReal].x + (W - PAD_R)) / 2}
              y={PAD_T - 32}
              className="zone-label"
              textAnchor="middle"
            >
              projeção
            </text>

            {/* áreas + linhas */}
            <path d={realFill} fill="url(#vds-area-real)" />
            <path d={projFill} fill="url(#vds-area-proj)" />
            <path d={realLine} className="line s1" fill="none" strokeLinecap="round" />
            <path d={projLine} className="line s1 dashed" fill="none" strokeLinecap="round" />

            {/* rótulos de x */}
            {pts.map((p) => (
              <text
                key={p.m}
                x={p.x}
                y={BASE + 26}
                className={`axis-label ${p.proj ? 'is-proj' : ''}`}
                textAnchor="middle"
              >
                {p.m}
              </text>
            ))}

            {/* guia + marcadores */}
            <line x1={active.x} x2={active.x} y1={active.y + 10} y2={BASE} className="hover-line" />
            {pts.map((p, i) => (
              <g key={p.m} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                <rect
                  x={p.x - (W - PAD_L - PAD_R) / (all.length - 1) / 2}
                  y={PAD_T - 26}
                  width={(W - PAD_L - PAD_R) / (all.length - 1)}
                  height={BASE - PAD_T + 26}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.m}: R$ ${fmtMil(p.v)}${p.proj ? ' (projeção)' : ''}`}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hover === i ? 5 : 3.5}
                  className={`dot s1 ${hover === i ? 'is-active' : ''} ${p.proj ? 'is-proj' : ''}`}
                  pointerEvents="none"
                />
              </g>
            ))}

            <SvgTooltip
              cx={active.x}
              top={tipTop}
              w={168}
              minX={PAD_L}
              maxX={W - PAD_R}
              title={`${active.m} · 2026${active.proj ? ' · projeção' : ''}`}
              rows={[{ label: 'Receita', value: `R$ ${fmtMil(active.v)}` }]}
            />
          </svg>
        </div>

        <footer className="vds-chart-foot">
          <span>Valores em reais · escala 0 – R$ 1,5M</span>
          <span className="sep">·</span>
          <span>Fonte: faturamento consolidado · atualizado 17 mai 2026</span>
        </footer>
      </div>
    </Section>
  );
}

/* ============================================================
   2 séries · uma escala por indexação (o antídoto do eixo duplo)
   ============================================================ */
function IndexedSection() {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'];
  const receita = [280, 340, 420, 510, 680, 820, 940, 1100]; // R$ mil
  const leads = [3180, 3440, 3790, 4010, 4480, 4700, 5150, 5620]; // unidades

  const toIndex = (arr: number[]) => arr.map((v) => (v / arr[0]) * 100);
  const rIdx = toIndex(receita);
  const lIdx = toIndex(leads);

  const [hover, setHover] = useState<number>(meses.length - 1);

  const W = 880;
  const H = 340;
  const PAD_L = 62;
  const PAD_R = 132; // espaço pro rótulo direto no fim de cada linha
  const PAD_T = 46;
  const PAD_B = 58;
  const MAX = 450;
  const BASE = H - PAD_B;

  const px = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (meses.length - 1);
  const py = (v: number) => BASE - (v / MAX) * (H - PAD_T - PAD_B);

  const a = rIdx.map((v, i) => ({ x: px(i), y: py(v), v }));
  const b = lIdx.map((v, i) => ({ x: px(i), y: py(v), v }));
  const grids = [0, 100, 200, 300, 400];

  const ha = a[hover];
  const hb = b[hover];
  const tipTop = Math.max(Math.min(ha.y, hb.y) - 88, 8);

  return (
    <Section
      title="Duas séries · uma escala"
      meta="receita (R$) e leads (unid.) indexados a jan = 100"
    >
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">
              <TrendingUp size={11} strokeWidth={2.2} /> Receita × leads
            </p>
            <h3>
              3,9×<span className="unit"> receita vs 1,8× leads</span>
            </h3>
            <p className="lede">
              Reais e unidades não dividem escala. Em vez do eixo duplo — <em>proibido</em> — as duas medidas vão
              pra mesma base 100 em janeiro. O que se compara aqui é ritmo, não tamanho.
            </p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            índice da receita 2,2× o de leads
          </div>
        </header>

        <div className="vds-legend">
          <span className="vds-legend-item">
            <svg viewBox="0 0 28 10" className="vds-key" aria-hidden="true">
              <line x1="1" y1="5" x2="27" y2="5" className="key-line s1" />
              <circle cx="14" cy="5" r="3.6" className="key-dot s1" />
            </svg>
            Receita · círculo, traço contínuo
          </span>
          <span className="vds-legend-item">
            <svg viewBox="0 0 28 10" className="vds-key" aria-hidden="true">
              <line x1="1" y1="5" x2="27" y2="5" className="key-line s2 dashed" />
              <rect x="10.5" y="1.5" width="7" height="7" rx="1" className="key-sq s2" />
            </svg>
            Leads · quadrado, traço tracejado
          </span>
        </div>

        <div className="vds-chart-stage">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="vds-plot"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Receita e leads indexados a 100 em janeiro de 2026, de janeiro a agosto."
            onMouseLeave={() => setHover(meses.length - 1)}
          >
            {grids.map((g) => {
              const y = py(g);
              return (
                <g key={g}>
                  {g > 0 && <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} className="grid" />}
                  <text x={PAD_L - 14} y={y + 4} className="axis-label" textAnchor="end">
                    {nf(g)}
                  </text>
                </g>
              );
            })}
            <line x1={PAD_L} x2={W - PAD_R} y1={BASE} y2={BASE} className="axis" />

            {/* linha de referência da base */}
            <line x1={PAD_L} x2={W - PAD_R} y1={py(100)} y2={py(100)} className="ref-line" />
            <text x={PAD_L + 6} y={py(100) + 18} className="ref-label">
              base 100 · jan/2026
            </text>

            {/* série 2 primeiro (fica atrás) */}
            <path d={smoothPath(b)} className="line s2 dashed" fill="none" strokeLinecap="round" />
            <path d={smoothPath(a)} className="line s1" fill="none" strokeLinecap="round" />

            {b.map((p, i) => (
              <rect
                key={`b${i}`}
                x={p.x - (hover === i ? 5 : 4)}
                y={p.y - (hover === i ? 5 : 4)}
                width={hover === i ? 10 : 8}
                height={hover === i ? 10 : 8}
                rx="1.5"
                className={`mark s2 ${hover === i ? 'is-active' : ''}`}
                pointerEvents="none"
              />
            ))}
            {a.map((p, i) => (
              <circle
                key={`a${i}`}
                cx={p.x}
                cy={p.y}
                r={hover === i ? 5.5 : 4.5}
                className={`mark s1 ${hover === i ? 'is-active' : ''}`}
                pointerEvents="none"
              />
            ))}

            {/* rótulos diretos no fim das linhas — identidade sem depender da cor */}
            <g className="direct-label">
              <line
                x1={a[a.length - 1].x + 10}
                x2={a[a.length - 1].x + 24}
                y1={a[a.length - 1].y}
                y2={a[a.length - 1].y}
                className="dl-line s1"
              />
              <text x={a[a.length - 1].x + 30} y={a[a.length - 1].y - 2} className="dl-name">
                Receita
              </text>
              <text x={a[a.length - 1].x + 30} y={a[a.length - 1].y + 14} className="dl-value">
                {nf(rIdx[rIdx.length - 1])}
              </text>
            </g>
            <g className="direct-label">
              <line
                x1={b[b.length - 1].x + 10}
                x2={b[b.length - 1].x + 24}
                y1={b[b.length - 1].y}
                y2={b[b.length - 1].y}
                className="dl-line s2 dashed"
              />
              <text x={b[b.length - 1].x + 30} y={b[b.length - 1].y - 2} className="dl-name">
                Leads
              </text>
              <text x={b[b.length - 1].x + 30} y={b[b.length - 1].y + 14} className="dl-value">
                {nf(lIdx[lIdx.length - 1])}
              </text>
            </g>

            {meses.map((m, i) => (
              <text key={m} x={px(i)} y={BASE + 26} className="axis-label" textAnchor="middle">
                {m}
              </text>
            ))}

            <line x1={ha.x} x2={ha.x} y1={PAD_T - 20} y2={BASE} className="hover-line" />
            {meses.map((m, i) => (
              <rect
                key={`hit${m}`}
                x={px(i) - (W - PAD_L - PAD_R) / (meses.length - 1) / 2}
                y={PAD_T - 20}
                width={(W - PAD_L - PAD_R) / (meses.length - 1)}
                height={BASE - PAD_T + 20}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="button"
                aria-label={`${m}: receita índice ${nf(rIdx[i])}, leads índice ${nf(lIdx[i])}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
              />
            ))}

            <SvgTooltip
              cx={ha.x}
              top={tipTop}
              w={196}
              minX={PAD_L}
              maxX={W - PAD_R}
              title={`${meses[hover]} · 2026 · índice`}
              rows={[
                { key: 's1', label: 'Receita', value: nf(rIdx[hover]) },
                { key: 's2', label: 'Leads', value: nf(lIdx[hover]) },
              ]}
            />
          </svg>
        </div>

        <footer className="vds-chart-foot">
          <span>Índice · jan/2026 = 100 · escala única 0 – 450</span>
          <span className="sep">·</span>
          <span>Receita R$ 280K → 1,1M · leads 3.180 → 5.620</span>
        </footer>
      </div>
    </Section>
  );
}

/* ============================================================
   1 série · barras horizontais ordenadas
   ============================================================ */
function BarSection() {
  const SCALE = 1500;
  const channels = [
    { ch: 'YouTube', v: 1240 },
    { ch: 'Orgânico', v: 980 },
    { ch: 'Indicação', v: 1380, note: 'líder do mês' },
    { ch: 'Email', v: 640 },
    { ch: 'Eventos', v: 410 },
    { ch: 'Parcerias', v: 290 },
  ].sort((x, y) => y.v - x.v);

  const total = channels.reduce((s, c) => s + c.v, 0);
  const [hover, setHover] = useState<string | null>(null);
  const ticks = [0, 500, 1000, 1500];

  return (
    <Section title="Barras · canais de aquisição" meta={`set/2026 · ${nf(total)} leads · ordenado por volume`}>
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">
              <BarChart3 size={11} strokeWidth={2.2} /> Aquisição por canal
            </p>
            <h3>
              {nf(total)}
              <span className="unit"> leads · 30d</span>
            </h3>
            <p className="lede">
              Uma medida, uma cor. O canal que lidera é marcado por <em>anotação</em>, não por outra cor — cor
              segue a entidade, nunca o rank.
            </p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +24% vs ago
          </div>
        </header>

        <div className="vds-bars">
          {channels.map((c) => (
            <div
              className={`vds-bar-row ${hover === c.ch ? 'is-hover' : ''}`}
              key={c.ch}
              onMouseEnter={() => setHover(c.ch)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(c.ch)}
              onBlur={() => setHover(null)}
              role="group"
              tabIndex={0}
              aria-label={`${c.ch}: ${nf(c.v)} leads, ${nf((c.v / total) * 100, 1)}% do total`}
            >
              <span className="vds-bar-label">
                {c.ch}
                {c.note && <span className="vds-bar-tag">{c.note}</span>}
              </span>
              <div className="vds-bar-track">
                {ticks.slice(1, -1).map((t) => (
                  <span key={t} className="vds-bar-tick" style={{ left: `${(t / SCALE) * 100}%` }} />
                ))}
                <span className="vds-bar-fill" style={{ width: `${(c.v / SCALE) * 100}%` }} />
                {hover === c.ch && (
                  <span className="vds-bar-tip" style={{ left: `${(c.v / SCALE) * 100}%` }}>
                    {nf(c.v)} de {nf(total)} · {nf((c.v / total) * 100, 1)}%
                  </span>
                )}
              </div>
              <span className="vds-bar-value">
                {nf(c.v)}
                <em>{nf((c.v / total) * 100, 0)}%</em>
              </span>
            </div>
          ))}

          <div className="vds-bar-axis" aria-hidden="true">
            <span />
            <div className="vds-bar-axis-line">
              {ticks.map((t) => (
                <span key={t} className="vds-bar-axis-tick" style={{ left: `${(t / SCALE) * 100}%` }}>
                  {t === 0 ? '0' : nf(t)}
                </span>
              ))}
            </div>
            <span />
          </div>
        </div>

        <footer className="vds-chart-foot">
          <span>Escala 0 – 1.500 leads · eixo ancorado no zero</span>
          <span className="sep">·</span>
          <span>Fonte: CRM · janela de 30 dias</span>
        </footer>
      </div>
    </Section>
  );
}

/* ============================================================
   3+ séries · small multiples (nunca uma 3ª cor)
   ============================================================ */
function roundedTop(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, h));
  return `M ${x} ${y + h} L ${x} ${y + rr} Q ${x} ${y} ${x + rr} ${y} L ${x + w - rr} ${y} Q ${x + w} ${y} ${x + w} ${y + rr} L ${x + w} ${y + h} Z`;
}

function MiniColumns({
  data,
  labels,
  max,
  showAxis,
  name,
}: {
  data: number[];
  labels: string[];
  max: number;
  showAxis: boolean;
  name: string;
}) {
  const W = 280;
  const H = 132;
  const PAD_L = 34; // idêntico em todos os painéis — geometria comparável
  const PAD_R = 10;
  const PAD_T = 18;
  const PAD_B = 24;
  const BASE = H - PAD_B;
  const slot = (W - PAD_L - PAD_R) / data.length;
  const bw = slot - 6; // gap de 6 unid. ≈ 2px renderizados entre fills
  const [hover, setHover] = useState<number | null>(null);
  const py = (v: number) => BASE - (v / max) * (BASE - PAD_T);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="vds-sm-plot"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${name}: evolução mensal, escala compartilhada de 0 a ${nf(max)}`}
      onMouseLeave={() => setHover(null)}
    >
      {[max / 2, max].map((g) => (
        <g key={g}>
          <line x1={PAD_L} x2={W - PAD_R} y1={py(g)} y2={py(g)} className="grid" />
          {showAxis && (
            <text x={PAD_L - 8} y={py(g) + 4} className="axis-label micro" textAnchor="end">
              {nf(g)}
            </text>
          )}
        </g>
      ))}
      <line x1={PAD_L} x2={W - PAD_R} y1={BASE} y2={BASE} className="axis" />
      {showAxis && (
        <text x={PAD_L - 8} y={BASE + 4} className="axis-label micro" textAnchor="end">
          0
        </text>
      )}

      {data.map((v, i) => {
        const x = PAD_L + i * slot + 3;
        const y = py(v);
        return (
          <g key={labels[i] + i} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
            <rect x={PAD_L + i * slot} y={PAD_T - 12} width={slot} height={BASE - PAD_T + 12} fill="transparent" />
            <path
              d={roundedTop(x, y, bw, BASE - y, 4)}
              className={`sm-bar ${hover === i ? 'is-active' : ''}`}
            />
            <text x={x + bw / 2} y={BASE + 16} className="axis-label micro" textAnchor="middle">
              {labels[i]}
            </text>
          </g>
        );
      })}

      {hover !== null && (
        <text
          x={Math.min(Math.max(PAD_L + hover * slot + bw / 2, PAD_L + 18), W - PAD_R - 18)}
          y={Math.max(py(data[hover]) - 7, 11)}
          className="sm-callout"
          textAnchor="middle"
        >
          {nf(data[hover])}
        </text>
      )}
    </svg>
  );
}

function SmallMultiplesSection() {
  const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'];
  const series = [
    { name: 'Mentoria', data: [180, 196, 204, 222, 241, 258, 270, 296] },
    { name: 'Comunidade', data: [96, 104, 112, 118, 131, 142, 151, 163] },
    { name: 'Eventos', data: [42, 58, 50, 74, 63, 88, 79, 104] },
  ];
  const MAX = 320;

  return (
    <Section title="Small multiples · três linhas de produto" meta="MRR por produto · escala compartilhada 0 – 320K">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">
              <Grid2X2 size={11} strokeWidth={2.2} /> Três séries, três painéis
            </p>
            <h3>
              R$ 563K<span className="unit"> MRR somado · ago</span>
            </h3>
            <p className="lede">
              Três séries não cabem em três cores nesta paleta. Cabem em <em>três painéis</em> com a mesma escala:
              cada um lê sozinho e a comparação entre eles continua válida.
            </p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +77% vs jan
          </div>
        </header>

        <div className="vds-sm-grid">
          {series.map((s, i) => {
            const first = s.data[0];
            const last = s.data[s.data.length - 1];
            const growth = ((last - first) / first) * 100;
            return (
              <article className="vds-sm-card" key={s.name}>
                <div className="vds-sm-head">
                  <h4>{s.name}</h4>
                  <span className="vds-sm-value">
                    R$ {nf(last)}K
                    <em>+{nf(growth)}%</em>
                  </span>
                </div>
                <MiniColumns data={s.data} labels={labels} max={MAX} showAxis={i === 0} name={s.name} />
              </article>
            );
          })}
        </div>

        <footer className="vds-chart-foot">
          <span>Escala idêntica nos três painéis · 0 – R$ 320K · jan → ago</span>
          <span className="sep">·</span>
          <span>Sem legenda: cada painel é nomeado no próprio título</span>
        </footer>
      </div>
    </Section>
  );
}

/* ============================================================
   Composição · 2 partes no donut + cauda em small multiples
   ============================================================ */
function donutArc(cx: number, cy: number, rOut: number, rIn: number, a0: number, a1: number) {
  const pt = (r: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x1, y1] = pt(rOut, a0);
  const [x2, y2] = pt(rOut, a1);
  const [x3, y3] = pt(rIn, a1);
  const [x4, y4] = pt(rIn, a0);
  return `M ${x1} ${y1} A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`;
}

function DonutSection() {
  const TOTAL_MRR = 1840; // R$ mil
  const parts = [
    { key: 'rec', label: 'Recorrente', value: 72, fill: 'solid' as const },
    { key: 'novo', label: 'Novo negócio', value: 28, fill: 'hatch' as const },
  ];
  const tail = [
    { label: 'Expansão', value: 18 },
    { label: 'Cross-sell', value: 7 },
    { label: 'Reativação', value: 3 },
  ];
  const TAIL_MAX = 20;

  const [active, setActive] = useState(0);

  const CX = 120;
  const CY = 120;
  const R_OUT = 104;
  const R_IN = 74;
  const GAP = 1.6; // ≈ 2px na circunferência

  let cursor = 0;
  const arcs = parts.map((p) => {
    const a0 = cursor + GAP / 2;
    const a1 = cursor + (p.value / 100) * 360 - GAP / 2;
    cursor += (p.value / 100) * 360;
    return { ...p, d: donutArc(CX, CY, R_OUT, R_IN, a0, a1) };
  });

  const cur = parts[active];

  return (
    <Section title="Donut · composição do MRR" meta="setembro · 2 partes no anel, cauda em painéis">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">
              <PieIcon size={11} strokeWidth={2.2} /> Composição MRR
            </p>
            <h3>
              R$ 1,84M<span className="unit"> recorrente + novo</span>
            </h3>
            <p className="lede">
              Parte-do-todo com <em>duas</em> fatias — cor sólida e textura hachurada, nunca duas cores próximas. A
              cauda de 28% se abre embaixo, em painéis com escala comum.
            </p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            recorrente +4pp vs ago
          </div>
        </header>

        <div className="vds-legend">
          {parts.map((p, i) => (
            <button
              type="button"
              key={p.key}
              className={`vds-legend-item is-button ${active === i ? 'is-on' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className={`vds-legend-swatch ${p.fill === 'hatch' ? 'hatch' : 'solid'}`} />
              {p.label} · {p.value}%
            </button>
          ))}
        </div>

        <div className="vds-donut-stage">
          <svg
            viewBox="0 0 240 240"
            className="vds-donut-svg"
            role="img"
            aria-label="Composição do MRR: 72% recorrente, 28% novo negócio."
          >
            <defs>
              <pattern
                id="vds-donut-hatch"
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="7" height="7" className="hatch-bg" />
                <line x1="0" y1="0" x2="0" y2="7" className="hatch-fg" />
              </pattern>
            </defs>
            {arcs.map((s, i) => (
              <path
                key={s.key}
                d={s.d}
                className={`donut-seg ${s.fill} ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                style={{ cursor: 'pointer' }}
              />
            ))}
            <text x={CX} y={CY - 2} className="donut-big" textAnchor="middle">
              {cur.value}
              <tspan className="donut-pct">%</tspan>
            </text>
            <text x={CX} y={CY + 24} className="donut-sub" textAnchor="middle">
              {cur.label}
            </text>
            <text x={CX} y={CY + 44} className="donut-money" textAnchor="middle">
              R$ {nf((TOTAL_MRR * cur.value) / 100)}K
            </text>
          </svg>

          <div className="vds-donut-side">
            <p className="vds-side-title">Dentro dos 28% de novo negócio</p>
            <p className="vds-side-lede">
              Três componentes, três painéis com a mesma escala (0 – 20% do MRR). Nenhum deles ganha cor
              própria.
            </p>
            <div className="vds-tail-grid">
              {tail.map((t) => (
                <article className="vds-tail-card" key={t.label}>
                  <p className="vds-tail-label">{t.label}</p>
                  <p className="vds-tail-value">
                    {t.value}%<em>R$ {nf((TOTAL_MRR * t.value) / 100)}K</em>
                  </p>
                  <div className="vds-tail-track">
                    <span className="vds-tail-fill" style={{ width: `${(t.value / TAIL_MAX) * 100}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <footer className="vds-chart-foot">
          <span>Base: R$ 1,84M de MRR em set/2026</span>
          <span className="sep">·</span>
          <span>Fatias com 2px de respiro · textura como 2º canal</span>
        </footer>
      </div>
    </Section>
  );
}

/* ============================================================
   Funil · duas medidas ⇒ dois painéis (jamais eixo duplo)
   ============================================================ */
function FunnelSection() {
  const stages = [
    { stage: 'Visita', count: 48200, rate: null as number | null },
    { stage: 'Lead', count: 4940, rate: 10.2 },
    { stage: 'Qualificado', count: 1680, rate: 34.0 },
    { stage: 'Proposta', count: 720, rate: 42.9 },
    { stage: 'Fechado', count: 213, rate: 29.6 },
  ];
  const top = stages[0].count;
  const [hover, setHover] = useState<string | null>(null);

  return (
    <Section
      title="Funil · volume e conversão lado a lado"
      meta="set/2026 · receita R$ 642K · ticket médio R$ 3,01K"
    >
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">
              <Filter size={11} strokeWidth={2.2} /> Funil · 30 dias
            </p>
            <h3>
              0,44%<span className="unit"> taxa fim-a-fim</span>
            </h3>
            <p className="lede">
              48.200 visitas → 213 vendas. Volume e taxa têm escalas incompatíveis, então ocupam{' '}
              <em>dois painéis</em> com bases próprias — o mesmo dado num eixo duplo inventaria uma correlação
              que não existe.
            </p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +18% receita vs ago
          </div>
        </header>

        <div className="vds-funnel">
          <div className="vds-funnel-head" aria-hidden="true">
            <span>Etapa</span>
            <span>Volume · escala real 0 – 48.200</span>
            <span>Conversão da etapa anterior · 0 – 100%</span>
          </div>

          {stages.map((s, i) => {
            const wVol = Math.max((s.count / top) * 100, 0.35);
            return (
              <div
                className={`vds-funnel-row ${hover === s.stage ? 'is-hover' : ''}`}
                key={s.stage}
                onMouseEnter={() => setHover(s.stage)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.stage)}
                onBlur={() => setHover(null)}
                role="group"
                tabIndex={0}
                aria-label={`${s.stage}: ${nf(s.count)} ${s.rate === null ? '· entrada do funil' : `· ${nf(s.rate, 1)}% da etapa anterior`}`}
              >
                <span className="vds-funnel-stage">
                  <span className="num">{(i + 1).toString().padStart(2, '0')}</span>
                  {s.stage}
                </span>

                <div className="vds-funnel-panel">
                  <span className="vds-funnel-cap">Volume</span>
                  <div className="vds-funnel-track">
                    <span className="vds-funnel-bar" style={{ width: `${wVol}%` }} />
                  </div>
                  <span className="vds-funnel-num">{nf(s.count)}</span>
                </div>

                <div className="vds-funnel-panel">
                  <span className="vds-funnel-cap">Conversão</span>
                  <div className="vds-funnel-track rate">
                    <span className="vds-funnel-tick" style={{ left: '50%' }} />
                    {s.rate !== null && <span className="vds-funnel-bar" style={{ width: `${s.rate}%` }} />}
                  </div>
                  <span className={`vds-funnel-num ${s.rate === null ? 'is-empty' : ''}`}>
                    {s.rate === null ? 'entrada' : `${nf(s.rate, 1)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="vds-note is-inline">
          <Ban size={13} strokeWidth={2.4} />
          Duas medidas em escalas diferentes: <strong>dois painéis</strong>, cada um ancorado no próprio zero.
          Empilhar as duas num eixo duplo é o erro nº 1 de gráfico.
        </p>

        <footer className="vds-chart-foot">
          <span>Volume em visitas/leads únicos · 30 dias</span>
          <span className="sep">·</span>
          <span>Conversão medida sobre a etapa imediatamente anterior</span>
        </footer>
      </div>
    </Section>
  );
}
