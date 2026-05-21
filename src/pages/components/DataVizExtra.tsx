import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Gauge } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './data-viz-extra.css';

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
        lede="Complementam os 4 charts principais quando o dashboard precisa de granularidade. Heatmap pra atividade ao longo do tempo, sparklines pra microtendência ao lado de KPI, gauge pra estado relativo. Todos SVG autoral, navy editorial."
      />

      <HeatmapSection />
      <SparklinesSection />
      <GaugesSection />
    </>
  );
}

/* ---------- Heatmap · contribution-style ---------- */
function HeatmapSection() {
  // Generate 52 weeks * 7 days = 364 cells with intensity 0-4
  const cells = useMemo(() => {
    const out: Array<{ w: number; d: number; n: number; date: string; intensity: number }> = [];
    const today = new Date('2026-05-19');
    for (let w = 0; w < 52; w++) {
      for (let d = 0; d < 7; d++) {
        const daysAgo = (51 - w) * 7 + (6 - d);
        const date = new Date(today);
        date.setDate(today.getDate() - daysAgo);
        // Pattern: peaks in launches, valleys on weekends
        const dow = date.getDay();
        const weekend = dow === 0 || dow === 6;
        const base = weekend ? 0.4 : 1.4;
        const seasonal = Math.sin((w / 52) * Math.PI * 2) * 0.6 + 0.6;
        const noise = Math.random() * 1.4;
        const v = base + seasonal + noise;
        const intensity = v < 0.6 ? 0 : v < 1.2 ? 1 : v < 2.0 ? 2 : v < 2.6 ? 3 : 4;
        out.push({
          w,
          d,
          n: intensity === 0 ? 0 : Math.round(v * 4),
          date: date.toLocaleDateString('pt-BR'),
          intensity,
        });
      }
    }
    return out;
  }, []);

  const totalContributions = cells.reduce((s, c) => s + c.n, 0);
  const monthLabels = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  const dayLabels = ['', 'Seg', '', 'Qua', '', 'Sex', ''];

  return (
    <Section title="Heatmap · 12 meses de atividade" meta="estilo contribuição · 52 semanas · 7 dias">
      <div className="vds-heatmap-card">
        <header>
          <div>
            <p className="eyebrow">Atividade Viver de IA · últimos 12 meses</p>
            <h3>{totalContributions.toLocaleString('pt-BR')}<span className="unit"> ações totais</span></h3>
            <p className="lede">Cada quadradinho é um dia. Conta tudo: aula publicada, post no Discord, transcript editado, resposta de mentor. Picos = lançamentos.</p>
          </div>
          <div className="vds-heatmap-pill">
            <TrendingUp size={12} strokeWidth={2.5} />
            +18% últimos 30d
          </div>
        </header>

        <div className="vds-heatmap-stage">
          <div className="vds-heatmap-months">
            {monthLabels.map((m, i) => (
              <span key={i} style={{ left: `${(i / 12) * 100}%` }}>{m}</span>
            ))}
          </div>

          <div className="vds-heatmap-body">
            <div className="vds-heatmap-days">
              {dayLabels.map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="vds-heatmap-grid">
              {Array.from({ length: 52 }).map((_, w) => (
                <div className="vds-heatmap-col" key={w}>
                  {Array.from({ length: 7 }).map((_, d) => {
                    const cell = cells[w * 7 + d];
                    return (
                      <span
                        key={d}
                        className={`vds-heatmap-cell i${cell.intensity}`}
                        title={`${cell.n} ações · ${cell.date}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="vds-heatmap-foot">
          <span className="vds-heatmap-streak">
            Maior streak: <strong>42 dias</strong> · jan–fev 2026
          </span>
          <span className="vds-heatmap-legend">
            Menos
            <span className="vds-heatmap-cell i0" />
            <span className="vds-heatmap-cell i1" />
            <span className="vds-heatmap-cell i2" />
            <span className="vds-heatmap-cell i3" />
            <span className="vds-heatmap-cell i4" />
            Mais
          </span>
        </footer>
      </div>
    </Section>
  );
}

/* ---------- Sparklines ---------- */
type SparkType = 'line' | 'area' | 'bar' | 'step';

function Spark({ data, type, hero }: { data: number[]; type: SparkType; hero?: boolean }) {
  const W = 120;
  const H = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - 2 - ((v - min) / range) * (H - 4),
  }));

  if (type === 'bar') {
    const w = W / data.length;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className={`vds-spark ${hero ? 'hero' : ''}`}>
        {data.map((v, i) => {
          const h = ((v - min) / range) * (H - 2) + 2;
          return (
            <rect
              key={i}
              x={i * w + 1}
              y={H - h}
              width={w - 2}
              height={h}
              rx={1}
              className="vds-spark-bar"
            />
          );
        })}
      </svg>
    );
  }

  if (type === 'step') {
    let d = `M 0 ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x} ${pts[i - 1].y} L ${pts[i].x} ${pts[i].y}`;
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className={`vds-spark ${hero ? 'hero' : ''}`}>
        <path d={d} className="vds-spark-line" />
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={2.5} className="vds-spark-dot" />
      </svg>
    );
  }

  // line / area
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cur = pts[i];
    const prev = pts[i - 1];
    const cpx = (prev.x + cur.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${cur.y}, ${cur.x} ${cur.y}`;
  }
  const fill = type === 'area' ? `${d} L ${pts[pts.length - 1].x} ${H} L 0 ${H} Z` : '';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`vds-spark ${hero ? 'hero' : ''}`}>
      {type === 'area' && (
        <>
          <defs>
            <linearGradient id={`spark-grad-${hero ? 'h' : 'n'}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={hero ? "var(--via-navy)" : "var(--via-navy)"} stopOpacity="0.35" />
              <stop offset="100%" stopColor={hero ? "var(--via-navy)" : "var(--via-navy)"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fill} fill={`url(#spark-grad-${hero ? 'h' : 'n'})`} />
        </>
      )}
      <path d={d} className="vds-spark-line" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={2.5} className="vds-spark-dot" />
    </svg>
  );
}

function SparklinesSection() {
  const kpis = [
    { label: 'MRR recorrente', value: 'R$ 1,84M', delta: '+12,4%', up: true, data: [820, 880, 940, 990, 1080, 1180, 1320, 1480, 1620, 1720, 1820, 1840], type: 'area' as SparkType, hero: true },
    { label: 'NPS · últimos 30d', value: '74', delta: '+6pt', up: true, data: [62, 66, 64, 68, 69, 71, 70, 72, 73, 74, 74, 74], type: 'line' as SparkType },
    { label: 'Conversão funil', value: '0,44%', delta: '+0,08pp', up: true, data: [0.34, 0.31, 0.36, 0.38, 0.4, 0.39, 0.41, 0.42, 0.43, 0.44, 0.44, 0.44], type: 'step' as SparkType },
    { label: 'Cancelamentos', value: '17', delta: '−24%', up: false, data: [28, 26, 24, 25, 22, 20, 21, 19, 18, 17, 17, 17], type: 'bar' as SparkType },
  ];

  return (
    <Section title="Sparklines · micrográficos inline" meta="KPI tiles · linha do tempo discreta · onde gráfico grande não cabe">
      <div className="vds-sparks">
        {kpis.map((k) => (
          <article key={k.label} className={`vds-spark-card ${k.hero ? 'hero' : ''}`}>
            <p className="vds-spark-label">{k.label}</p>
            <div className="vds-spark-row">
              <div>
                <p className="vds-spark-value">{k.value}</p>
                <p className={`vds-spark-delta ${k.up ? 'up' : 'down'}`}>
                  {k.up ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
                  {k.delta}
                </p>
              </div>
              <Spark data={k.data} type={k.type} hero={k.hero} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Gauges ---------- */
function GaugeArc({ value, max = 100, label, color = "var(--via-navy)", unit = '%' }: {
  value: number; max?: number; label: string; color?: string; unit?: string;
}) {
  const R = 70;
  const STROKE = 14;
  const pct = Math.min(value / max, 1);
  // Semicircle: from 180° to 0° (top half)
  const half = Math.PI * R;
  const dash = pct * half;
  return (
    <div className="vds-gauge">
      <svg viewBox="0 0 200 120" className="vds-gauge-svg">
        <g transform="translate(100, 100)">
          {/* Track */}
          <path
            d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`}
            fill="none"
            stroke="var(--via-navy-08)"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${half}`}
            style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}
          />
        </g>
        <text x="100" y="86" className="vds-gauge-big" textAnchor="middle">
          {value}
          <tspan className="unit">{unit}</tspan>
        </text>
        <text x="100" y="108" className="vds-gauge-label" textAnchor="middle">
          {label}
        </text>
      </svg>
    </div>
  );
}

function GaugesSection() {
  return (
    <Section title="Gauge · arco radial" meta="3 estados · saúde do produto · meta vs realizado">
      <div className="vds-gauges">
        <article className="vds-gauge-card">
          <p className="vds-gauge-eyebrow">Saúde do agente Nina</p>
          <GaugeArc value={92} label="uptime · 30d" color="var(--via-navy)" />
          <p className="vds-gauge-meta">
            <strong>Excelente.</strong> Acima da meta de 88% definida no SLA do trimestre.
          </p>
        </article>

        <article className="vds-gauge-card highlight">
          <p className="vds-gauge-eyebrow">
            <Gauge size={11} strokeWidth={2.2} />
            Meta de receita · maio
          </p>
          <GaugeArc value={68} label="da meta atingida" color="var(--via-navy)" />
          <p className="vds-gauge-meta">
            <strong>R$ 642K de 940K.</strong> 12 dias até o fim do mês — meta alcançável mantendo o ritmo.
          </p>
        </article>

        <article className="vds-gauge-card">
          <p className="vds-gauge-eyebrow">Tempo médio de resposta</p>
          <GaugeArc value={47} max={120} label="segundos · target 60s" color="var(--via-navy)" unit="s" />
          <p className="vds-gauge-meta">
            <strong>Dentro do alvo.</strong> Iris responde em 47s na mediana — abaixo do limite de 60s.
          </p>
        </article>
      </div>
    </Section>
  );
}
