import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp, TrendingDown, ArrowRight, Quote, MessageCircle, Calendar,
  Users, DollarSign, Activity, AlertCircle,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './insights.css';

/**
 * Insights semanais.
 *
 * Os dois blocos de número desta página vêm da CAMADA DE DADOS
 * (src/styles/data.css): .via-metric-grid + .via-metric (o vidro certo),
 * .via-delta --up/--down (cor só como semântica) e .via-spark --down.
 * Nada de card de métrica feito à mão.
 */

/* ---------- geometria dos gráficos · SMALL MULTIPLES -----------
 * Volume (mensagens) e taxa (% resolvido) têm escalas diferentes.
 * Eixo duplo — duas escalas y no mesmo gráfico — é o erro nº 1 de
 * visualização: o ponto onde as curvas se cruzam vira "insight" e
 * não significa nada, porque depende de qual escala você escolheu.
 * A regra da casa: duas medidas → DOIS gráficos, um eixo cada.
 * Como cada painel tem UMA série, nenhum leva legenda (o título do
 * painel já nomeia a série) e a cor é sempre --via-data-1.
 */
const SEMANAS = ['S13', 'S14', 'S15', 'S16', 'S17', 'S18', 'S19', 'S20'];
const MENSAGENS = [320, 380, 420, 560, 680, 820, 980, 1842];
const RESOLVIDO = [52, 56, 61, 65, 71, 76, 80, 84];

/* Mesma malha nos dois painéis — é a grade compartilhada que faz
   small multiples funcionar: o olho compara posição, não decora. */
const P = { x0: 46, x1: 310, top: 18, base: 156, tick: 176 };
const SLOT = (P.x1 - P.x0) / SEMANAS.length;
const SPAN = P.base - P.top;
const BAR_TOP = 2000;          // eixo de barra SEMPRE começa em zero
const BAR_TICKS = [0, 1000, 2000];
const RATE_TICKS = [0, 50, 100];
const BAR_W = 22;

const nf = new Intl.NumberFormat('pt-BR');
const slotCx = (i: number) => P.x0 + i * SLOT + SLOT / 2;
const barY = (v: number) => P.base - (v / BAR_TOP) * SPAN;
const rateY = (v: number) => P.base - (v / 100) * SPAN;

/* Barra com topo arredondado 4px ANCORADO NA BASE. Arredondar a base
   também (virar pill) falseia o zero e encolhe a leitura do valor. */
function barPath(x: number, y: number, w: number, base: number, r = 4) {
  const rr = Math.min(r, base - y, w / 2);
  return (
    `M${x},${base} L${x},${y + rr} Q${x},${y} ${x + rr},${y} ` +
    `L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${base} Z`
  );
}

/* Último ponto de uma sparkline, lido do próprio path. */
function sparkEnd(d: string): { x: number; y: number } | null {
  const pts = d.match(/-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?/g);
  if (!pts || pts.length === 0) return null;
  const [x, y] = pts[pts.length - 1].split(',').map(Number);
  return { x, y };
}

/* ---------- métrica canônica · usada nos dois blocos ---------- */
type Metric = {
  id: string;
  label: string;
  icon?: LucideIcon;
  cur?: string;
  value: string;
  of?: string;
  delta: string;
  down?: boolean;
  foot?: string;
  spark?: string;
};

function MetricCard({ m, className = '', children }: {
  m: Metric;
  className?: string;
  children?: ReactNode;
}) {
  const Icon = m.icon;
  const Trend = m.down ? TrendingDown : TrendingUp;
  return (
    <article className={`via-metric via-metric--atmos ${className}`.trim()}>
      <span className="via-metric__label">
        {Icon && <Icon size={11} strokeWidth={2.2} aria-hidden="true" />}
        {m.label}
      </span>
      <p className="via-metric__value">
        {m.cur && <small>{m.cur}</small>}
        {m.value}
        {m.of && <span className="of">{m.of}</span>}
      </p>
      <span className="via-metric__foot">
        <span className={`via-delta ${m.down ? 'via-delta--down' : 'via-delta--up'}`}>
          <Trend size={11} strokeWidth={2.4} aria-hidden="true" />
          {m.delta}
        </span>
        {m.foot && <span className="via-mono metric-foot-note">{m.foot}</span>}
        {m.spark && (
          <svg
            viewBox="0 0 80 32"
            className={`via-spark${m.down ? ' via-spark--down' : ''}`}
            aria-hidden="true"
          >
            <path className="via-spark__area" d={`${m.spark} L80,32 L0,32 Z`} />
            <path d={m.spark} />
            {/* Ponto do valor corrente · marcador ≥8px, lido do próprio
                path (sem duplicar o dado). Sparkline sem "onde estamos
                agora" obriga o olho a adivinhar a ponta da linha. */}
            {(() => {
              const end = sparkEnd(m.spark);
              return end ? <circle className="spark-end" cx={end.x} cy={end.y} r="4.5" /> : null;
            })()}
          </svg>
        )}
      </span>
      {children}
    </article>
  );
}

export default function Insights() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · insights semanais"
        title={
          <>
            A semana <em>tem uma história</em> — conte ela.
          </>
        }
        lede="Relatório semanal não é dump de números — é narrativa. Editorial com headline+lede no topo, 4 KPIs com delta e mini-spark inline, gráficos pareados com um eixo cada, citações reais do que aconteceu e CTAs pra próxima ação. Stripe + Notion + The Information."
      />

      <InsightsWeeklySection />
      <InsightsKpiTilesSection />
    </>
  );
}

/* ---------- Weekly editorial report ---------- */
const SEMANA: Metric[] = [
  {
    id: 'mentees',
    icon: Users,
    label: 'Mentees ativos',
    value: '228',
    of: '/ 248',
    delta: '+14 vs. sem 19',
    spark: 'M0,22 L10,20 L20,21 L30,18 L40,17 L50,14 L60,12 L70,8 L80,6',
  },
  {
    id: 'mentoria',
    icon: Calendar,
    label: 'Mentoria 1:1 · compareceu',
    value: '94%',
    delta: '+6pp · maior da turma',
    spark: 'M0,18 L10,16 L20,19 L30,14 L40,12 L50,10 L60,11 L70,7 L80,5',
  },
  {
    id: 'conversas',
    icon: MessageCircle,
    label: 'Conversas Nina / sem',
    value: '1.842',
    delta: '+38% vs. sem 19',
    spark: 'M0,24 L10,22 L20,23 L30,20 L40,18 L50,12 L60,10 L70,6 L80,4',
  },
  {
    id: 'mrr',
    icon: DollarSign,
    label: 'MRR',
    cur: 'R$',
    value: '218K',
    delta: '−R$ 4.2K · 2 churns',
    down: true,
    spark: 'M0,10 L10,8 L20,9 L30,7 L40,8 L50,11 L60,14 L70,16 L80,18',
  },
];

/* Painel 1 · volume. Série única → sem legenda, cor --via-data-1.
   Eixo de barra começa em ZERO: barra comunica por comprimento, e
   cortar a base multiplica a diferença aparente. */
function PainelMensagens() {
  const last = MENSAGENS.length - 1;
  return (
    <figure className="vds-ins-panel">
      <figcaption>
        <span className="t">Mensagens recebidas</span>
        <span className="s">total por semana · escala 0 – 2.000</span>
      </figcaption>
      <svg
        viewBox="0 0 320 186"
        className="vds-ins-plot"
        role="img"
        aria-label="Mensagens recebidas por semana: 320 na semana 13, subindo até 1.842 na semana 20."
      >
        {BAR_TICKS.map((t) => (
          <g key={t}>
            <line className="grid" x1={P.x0} x2={P.x1} y1={barY(t)} y2={barY(t)} />
            <text className="tick" x={P.x0 - 8} y={barY(t) + 3.2} textAnchor="end">
              {nf.format(t)}
            </text>
          </g>
        ))}
        <line className="axis" x1={P.x0} x2={P.x1} y1={P.base} y2={P.base} />

        {MENSAGENS.map((v, i) => (
          <path
            key={SEMANAS[i]}
            className="bar"
            d={barPath(slotCx(i) - BAR_W / 2, barY(v), BAR_W, P.base)}
          />
        ))}

        {/* Rótulo direto SELETIVO · só a semana corrente. Número em
            todo ponto vira ruído e mata a leitura da forma. */}
        <text
          className="tick tick--strong"
          x={slotCx(last)}
          y={barY(MENSAGENS[last]) - 7}
          textAnchor="middle"
        >
          {nf.format(MENSAGENS[last])}
        </text>

        {SEMANAS.map((s, i) => (
          <text key={s} className="tick" x={slotCx(i)} y={P.tick} textAnchor="middle">
            {s}
          </text>
        ))}
      </svg>
    </figure>
  );
}

/* Painel 2 · taxa. Mesma malha, mesma cor — o que muda é a medida,
   e ela está no título do painel, não numa segunda escala. */
function PainelResolucao() {
  const pts = RESOLVIDO.map((v, i) => ({ x: slotCx(i), y: rateY(v), v }));
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
  const first = pts[0];
  const last = pts[pts.length - 1];
  return (
    <figure className="vds-ins-panel">
      <figcaption>
        <span className="t">Resolvido sem humano</span>
        <span className="s">% das conversas · escala 0 – 100%</span>
      </figcaption>
      <svg
        viewBox="0 0 320 186"
        className="vds-ins-plot"
        role="img"
        aria-label="Percentual de conversas resolvidas sem humano: 52% na semana 13, subindo até 84% na semana 20."
      >
        {RATE_TICKS.map((t) => (
          <g key={t}>
            <line className="grid" x1={P.x0} x2={P.x1} y1={rateY(t)} y2={rateY(t)} />
            <text className="tick" x={P.x0 - 8} y={rateY(t) + 3.2} textAnchor="end">
              {t}%
            </text>
          </g>
        ))}
        <line className="axis" x1={P.x0} x2={P.x1} y1={P.base} y2={P.base} />

        <path className="area" d={`${line} L${last.x},${P.base} L${first.x},${P.base} Z`} />
        <path className="line" d={line} />

        {pts.map((p, i) => (
          <circle
            key={SEMANAS[i]}
            className={`dot${i === pts.length - 1 ? ' dot--last' : ''}`}
            cx={p.x}
            cy={p.y}
            r="4"
          />
        ))}

        {/* Só as duas pontas rotuladas · a história é "de 52% pra 84%" */}
        <text className="tick tick--strong" x={first.x} y={first.y + 16} textAnchor="middle">
          {first.v}%
        </text>
        <text className="tick tick--strong" x={last.x} y={last.y - 10} textAnchor="middle">
          {last.v}%
        </text>

        {SEMANAS.map((s, i) => (
          <text key={s} className="tick" x={slotCx(i)} y={P.tick} textAnchor="middle">
            {s}
          </text>
        ))}
      </svg>
    </figure>
  );
}

function InsightsWeeklySection() {
  return (
    <Section title="Relatório semanal · narrativa editorial" meta="cabeçalho · 4 KPIs · gráficos pareados · quotes · CTA">
      <article className="vds-ins">
        {/* Cabeçalho editorial */}
        <header className="vds-ins-head">
          <div className="vds-ins-head-meta">
            <span className="vds-ins-eyebrow">
              Semana 20 · 12 — 18 mai 2026
            </span>
            <p className="vds-ins-by">Por Caio Ribeiro · publicado dom 17h, lido em 4 min</p>
          </div>
          <h2>
            A turma <em>encontrou seu ritmo</em>.
          </h2>
          <p className="vds-ins-lede">
            Quarta semana do trimestre — 92% dos mentees ativos, mentoria 1:1 com taxa de comparecimento histórica e Nina respondendo 38% mais conversas no canal de vendas. Abaixo o que importa.
          </p>
        </header>

        {/* 4 KPIs com delta + sparkline · camada de dados */}
        <div className="via-metric-grid vds-ins-kpis">
          {SEMANA.map((m) => (
            <MetricCard key={m.id} m={m} className={`vds-ins-kpi${m.down ? ' down' : ''}`} />
          ))}
        </div>

        {/* Chart · small multiples · UM eixo por painel */}
        <div className="vds-ins-chart">
          <header>
            <div>
              <h4>Atendimento Nina · últimas 8 semanas</h4>
              <p>
                Volume e taxa têm escalas diferentes — por isso são dois gráficos com um eixo cada, nunca um gráfico de eixo duplo.
              </p>
            </div>
          </header>

          <div className="vds-ins-charts">
            <PainelMensagens />
            <PainelResolucao />
          </div>

          <p className="vds-ins-chart-note">
            <strong>Insight ·</strong> a curva de resolução automática passou de 52% pra 84% — Nina aprendeu o jeito da casa. Próxima semana vamos testar redirecionamento ativo pra mentor quando ela detectar dor real.
          </p>
        </div>

        {/* Quotes da semana */}
        <div className="vds-ins-quotes">
          <header>
            <h4>O que ouvimos esta semana</h4>
            <p>3 quotes representativas · selecionadas do Discord, mentoria e canal de vendas.</p>
          </header>
          <div className="vds-ins-quotes-grid">
            <blockquote className="vds-ins-quote">
              <Quote size={14} strokeWidth={1.8} className="vds-ins-quote-mark" />
              <p>"Fiz minha primeira venda usando o agente Nina como copiloto na sexta — o cliente nem percebeu, e eu fechei 23% acima do meu ticket médio."</p>
              <footer>
                <strong>Camila Moraes</strong>
                <em>Head IA · Mantra · mentee há 3 meses</em>
              </footer>
            </blockquote>
            <blockquote className="vds-ins-quote">
              <Quote size={14} strokeWidth={1.8} className="vds-ins-quote-mark" />
              <p>"A mentoria 1:1 dessa semana mudou meu approach inteiro — o Caio simplesmente desenhou o squad que eu precisava no quadro."</p>
              <footer>
                <strong>Daniel Pinheiro</strong>
                <em>Founder · Pivot · mentee há 4 meses</em>
              </footer>
            </blockquote>
            <blockquote className="vds-ins-quote subtle">
              <Quote size={14} strokeWidth={1.8} className="vds-ins-quote-mark" />
              <p>"Achei que o conteúdo seria muito raso e fui surpreendida — vocês entregam mais do que prometem. Mas o Discord ainda é confuso pra navegar."</p>
              <footer>
                <strong>Bruna Carvalho</strong>
                <em>Product · Lumin · feedback aberto · ação tomada</em>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Próxima semana · CTAs */}
        <footer className="vds-ins-foot">
          <div className="vds-ins-foot-l">
            <span className="vds-ins-foot-eyebrow">Próxima semana · semana 21</span>
            <h4>3 frentes pra focar</h4>
            <ol className="vds-ins-foot-list">
              <li>
                <span className="num mono">01</span>
                <div>
                  <strong>Reverter 2 churns recentes</strong>
                  <em>conversa 1:1 com Felipe Andrade e Carlos Brito · agendar até qua</em>
                </div>
              </li>
              <li>
                <span className="num mono">02</span>
                <div>
                  <strong>Lançar redirecionamento ativo da Nina</strong>
                  <em>Caio + Diego · feature flag · canary 10% na sex</em>
                </div>
              </li>
              <li>
                <span className="num mono">03</span>
                <div>
                  <strong>Onboarding turma 2026.2</strong>
                  <em>14 novos confirmados · sessão zero qua 19h · agenda do Caio bloqueada</em>
                </div>
              </li>
            </ol>
          </div>

          <aside className="vds-ins-foot-r">
            <div className="vds-ins-foot-tip">
              <AlertCircle size={14} strokeWidth={2} className="vds-ins-foot-tip-icon" />
              <p>
                <strong>Ponto de atenção:</strong> MRR negativo pela primeira vez no trimestre. Não é tendência ainda, mas merece a primeira conversa de quarta.
              </p>
            </div>
            <a href="#" className="vds-ins-foot-cta">
              Ver relatório completo
              <ArrowRight size={13} strokeWidth={2.4} />
            </a>
            <a href="#" className="vds-ins-foot-share">
              Compartilhar com a turma →
            </a>
          </aside>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- KPI tiles ---------- */
const TILES: Metric[] = [
  { id: 'mrr', label: 'Receita recorrente', cur: 'R$', value: '218K', delta: '−1,9%', down: true, foot: '92K → 218K · trimestre' },
  { id: 'nps', label: 'NPS', value: '74', delta: '+8', foot: '53 respondentes · 28% promotores' },
  { id: 'aulas', label: 'Aulas concluídas', value: '1.418', delta: '+22%', foot: 'média 18min · 92% mobile' },
  { id: 'discord', label: 'Tempo no Discord', value: '4h 12m', delta: '+9min', foot: 'mediana por mentee · semana' },
];

function InsightsKpiTilesSection() {
  return (
    <Section title="KPI tiles compactos · grid pra dashboard" meta="ideal pra dashboards executivos · .via-metric-grid">
      <div className="via-metric-grid vds-ins-tiles">
        {TILES.map((t) => (
          <MetricCard key={t.id} m={t} className={`vds-ins-tile${t.down ? ' down' : ''}`}>
            <Activity size={42} strokeWidth={1} className="vds-ins-tile-ghost" aria-hidden="true" />
          </MetricCard>
        ))}
      </div>
    </Section>
  );
}
