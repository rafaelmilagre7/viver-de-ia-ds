import { useMemo, useState } from 'react';
import { TrendingUp, BarChart3, PieChart as PieIcon, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './charts.css';

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
        lede="Quatro arquétipos suficientes pra qualquer dashboard da marca — area pra tendência, bar pra comparação, donut pra composição, funil pra conversão. SVG puro, sem bibliotecas, tudo tonalmente unificado em navy + um único accent quando o dado merece destaque."
      />

      <AreaSection />
      <BarSection />
      <DonutSection />
      <FunnelSection />
    </>
  );
}

/* ---------- Area chart ---------- */
function AreaSection() {
  const data = useMemo(
    () => [
      { m: 'Jan', v: 280 },
      { m: 'Fev', v: 340 },
      { m: 'Mar', v: 420 },
      { m: 'Abr', v: 510 },
      { m: 'Mai', v: 680 },
      { m: 'Jun', v: 820 },
      { m: 'Jul', v: 940 },
      { m: 'Ago', v: 1100 },
    ],
    []
  );

  const [hover, setHover] = useState<number | null>(7);

  const W = 880;
  const H = 340;
  const PAD_X = 56;
  const PAD_T = 56;
  const PAD_B = 56;
  const max = 1200;

  const points = data.map((d, i) => ({
    x: PAD_X + (i * (W - PAD_X * 2)) / (data.length - 1),
    y: H - PAD_B - (d.v / max) * (H - PAD_T - PAD_B),
    ...d,
  }));

  // Smooth cubic bezier path
  function smoothPath(pts: typeof points) {
    let p = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cur = pts[i];
      const next = pts[i + 1];
      const cpx = (cur.x + next.x) / 2;
      p += ` C ${cpx} ${cur.y}, ${cpx} ${next.y}, ${next.x} ${next.y}`;
    }
    return p;
  }
  const linePath = smoothPath(points);
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${H - PAD_B} L ${points[0].x} ${H - PAD_B} Z`;

  const grids = [0, 300, 600, 900, 1200];

  const active = hover != null ? points[hover] : null;

  return (
    <Section title="Area chart · receita acumulada" meta="2026 · navy editorial">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow"><TrendingUp size={11} strokeWidth={2.2} /> Receita Viver de IA</p>
            <h3>
              R$ 5,13M<span className="unit"> acum.</span>
            </h3>
            <p className="lede">8 meses · curva acelerada após Leaders AI · 1,1M só em Ago</p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +293% vs jan
          </div>
        </header>

        <div className="vds-chart-stage">
          <svg viewBox={`0 0 ${W} ${H}`} className="vds-area-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--via-navy)" stopOpacity="0.35" />
                <stop offset="60%" stopColor="var(--via-navy)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--via-navy)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="area-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--via-navy)" />
                <stop offset="100%" stopColor="var(--via-blue)" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {grids.map((g) => {
              const y = H - PAD_B - (g / max) * (H - PAD_T - PAD_B);
              return (
                <g key={g}>
                  <line x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} className="grid" />
                  <text x={PAD_X - 12} y={y + 4} className="axis-label" textAnchor="end">
                    {g === 0 ? '0' : g >= 1000 ? `${g / 1000}M` : `${g}K`}
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            <path d={fillPath} fill="url(#area-fill)" />
            {/* Line */}
            <path d={linePath} stroke="url(#area-line)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* X labels */}
            {points.map((p) => (
              <text key={p.m} x={p.x} y={H - PAD_B + 24} className="axis-label" textAnchor="middle">
                {p.m}
              </text>
            ))}

            {/* Hover dots */}
            {points.map((p, i) => (
              <g key={i} onMouseEnter={() => setHover(i)}>
                <circle cx={p.x} cy={p.y} r="14" fill="transparent" style={{ cursor: 'pointer' }} />
                <circle cx={p.x} cy={p.y} r={hover === i ? 6 : 3.5} className={`dot ${hover === i ? 'active' : ''}`} />
              </g>
            ))}

            {/* Active tooltip */}
            {active && (
              <g>
                <line
                  x1={active.x}
                  x2={active.x}
                  y1={active.y + 12}
                  y2={H - PAD_B}
                  className="hover-line"
                />
                <rect
                  x={Math.min(Math.max(active.x - 56, PAD_X), W - PAD_X - 112)}
                  y={active.y - 56}
                  width="112"
                  height="44"
                  rx="10"
                  className="tooltip-bg"
                />
                <text
                  x={Math.min(Math.max(active.x, PAD_X + 56), W - PAD_X - 56)}
                  y={active.y - 36}
                  className="tooltip-label"
                  textAnchor="middle"
                >
                  {active.m} · 2026
                </text>
                <text
                  x={Math.min(Math.max(active.x, PAD_X + 56), W - PAD_X - 56)}
                  y={active.y - 20}
                  className="tooltip-value"
                  textAnchor="middle"
                >
                  R$ {active.v >= 1000 ? `${(active.v / 1000).toFixed(1)}M` : `${active.v}K`}
                </text>
              </g>
            )}
          </svg>
        </div>

        <footer className="vds-chart-foot">
          <span className="dot-key navy" /> Receita mensal · em milhares de R$
          <span className="sep">·</span>
          <span>Atualizado 17 mai 2026</span>
        </footer>
      </div>
    </Section>
  );
}

/* ---------- Bar chart ---------- */
function BarSection() {
  const channels = [
    { ch: 'YouTube', v: 1240 },
    { ch: 'Orgânico', v: 980 },
    { ch: 'Indicação', v: 1380, hero: true },
    { ch: 'Email', v: 640 },
    { ch: 'Eventos', v: 410 },
    { ch: 'Parcerias', v: 290 },
  ];

  const max = Math.max(...channels.map((c) => c.v));
  const total = channels.reduce((s, c) => s + c.v, 0);

  return (
    <Section title="Bar chart · canais de aquisição" meta="set/2026 · 4.940 leads no total">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow"><BarChart3 size={11} strokeWidth={2.2} /> Aquisição por canal</p>
            <h3>4.940<span className="unit"> leads · 30d</span></h3>
            <p className="lede">Indicação assumiu a liderança esse mês — um dado raro pra quem mede há 18 meses.</p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +24% vs ago
          </div>
        </header>

        <div className="vds-bars">
          {channels.map((c) => (
            <div className="vds-bar-row" key={c.ch}>
              <span className="vds-bar-label">{c.ch}</span>
              <div className="vds-bar-track">
                <span
                  className={`vds-bar-fill ${c.hero ? 'hero' : ''}`}
                  style={{ width: `${(c.v / max) * 100}%` }}
                />
              </div>
              <span className="vds-bar-value">
                {c.v.toLocaleString('pt-BR')}
                <em>{((c.v / total) * 100).toFixed(0)}%</em>
              </span>
            </div>
          ))}
        </div>

        <footer className="vds-chart-foot">
          <span className="dot-key navy" /> Canal padrão
          <span className="sep">·</span>
          <span className="dot-key accent" /> Destaque do período
        </footer>
      </div>
    </Section>
  );
}

/* ---------- Donut chart ---------- */
function DonutSection() {
  const segments = [
    { label: 'Recorrentes', value: 72, color: "var(--via-navy)" },
    { label: 'Novos', value: 18, color: 'var(--via-blue)' },
    { label: 'Cross-sell', value: 7, color: 'var(--via-blue-soft)' },
    { label: 'Churn', value: 3, color: "var(--via-navy)" },
  ];

  const R = 88;
  const STROKE = 28;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <Section title="Donut · composição da carteira" meta="MRR setembro · 4.820 contas">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow"><PieIcon size={11} strokeWidth={2.2} /> Composição MRR</p>
            <h3>R$ 1,84M<span className="unit"> recorrente</span></h3>
            <p className="lede">72% da receita já vem de relação repetida — o motor que sustenta o playbook.</p>
          </div>
          <div className="vds-chart-delta down">
            <ArrowDownRight size={14} strokeWidth={2.5} />
            churn 3% (-1,2pp)
          </div>
        </header>

        <div className="vds-donut-stage">
          <svg viewBox="0 0 240 240" className="vds-donut-svg">
            <g transform="translate(120,120) rotate(-90)">
              {/* Track */}
              <circle r={R} cx="0" cy="0" fill="none" stroke="var(--via-navy-06)" strokeWidth={STROKE} />
              {/* Segments */}
              {segments.map((s) => {
                const len = (s.value / 100) * C;
                const el = (
                  <circle
                    key={s.label}
                    r={R}
                    cx="0"
                    cy="0"
                    fill="none"
                    stroke={s.color}
                    strokeWidth={STROKE}
                    strokeDasharray={`${len} ${C - len}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                    style={{ transition: 'stroke-dasharray 600ms ease' }}
                  />
                );
                offset += len + 1.5; // tiny gap between segments
                return el;
              })}
            </g>
            {/* Center */}
            <text x="120" y="118" className="donut-big" textAnchor="middle">72<tspan className="donut-pct">%</tspan></text>
            <text x="120" y="142" className="donut-sub" textAnchor="middle">recorrentes</text>
          </svg>

          <ul className="vds-donut-legend">
            {segments.map((s) => (
              <li key={s.label}>
                <span className="legend-dot" style={{ background: s.color }} />
                <div>
                  <p className="legend-label">{s.label}</p>
                  <p className="legend-meta">
                    <strong>{s.value}%</strong>
                    <span>·</span>
                    R$ {((1840 * s.value) / 100).toFixed(0)}K MRR
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Funnel ---------- */
function FunnelSection() {
  const stages = [
    { stage: 'Visita', count: 48200, rateToPrev: 100 },
    { stage: 'Lead', count: 4940, rateToPrev: 10.2 },
    { stage: 'Qualificado', count: 1680, rateToPrev: 34.0 },
    { stage: 'Proposta', count: 720, rateToPrev: 42.9 },
    { stage: 'Fechado', count: 213, rateToPrev: 29.6 },
  ];

  const top = stages[0].count;

  return (
    <Section title="Funil de conversão · top-of-funnel até fechamento" meta="set/2026 · receita R$ 642K · ticket médio R$ 3,01K">
      <div className="vds-chart-card">
        <header className="vds-chart-head">
          <div>
            <p className="eyebrow">FUNIL · 30D</p>
            <h3>
              0,44%<span className="unit"> taxa fim-a-fim</span>
            </h3>
            <p className="lede">48.200 visitas → 213 vendas. O salto crítico é entre <em>Visita → Lead</em>: dobrar essa etapa dobra o resto.</p>
          </div>
          <div className="vds-chart-delta up">
            <ArrowUpRight size={14} strokeWidth={2.5} />
            +18% receita vs ago
          </div>
        </header>

        <ol className="vds-funnel">
          {stages.map((s, i) => {
            const widthPct = Math.max((s.count / top) * 100, 12);
            return (
              <li key={s.stage} style={{ width: `${widthPct}%` }} className="vds-funnel-step">
                <div className="vds-funnel-block">
                  <div className="vds-funnel-meta">
                    <span className="vds-funnel-stage">
                      <span className="num">{(i + 1).toString().padStart(2, '0')}</span>
                      {s.stage}
                    </span>
                    <span className="vds-funnel-count">{s.count.toLocaleString('pt-BR')}</span>
                  </div>
                  {i > 0 && (
                    <span className="vds-funnel-rate">
                      <ArrowDownRight size={11} strokeWidth={2.5} />
                      {s.rateToPrev}% do anterior
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <footer className="vds-chart-foot">
          <span className="dot-key navy" /> Volume absoluto · 30 dias
          <span className="sep">·</span>
          <span>Top of funnel = visitas únicas</span>
        </footer>
      </div>
    </Section>
  );
}
