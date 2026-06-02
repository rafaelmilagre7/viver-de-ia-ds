import {
  TrendingUp, TrendingDown, ArrowRight, Quote, MessageCircle, Calendar,
  Users, DollarSign, Activity, AlertCircle,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './insights.css';

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
        lede="Relatório semanal não é dump de números — é narrativa. Editorial com headline+lede no topo, 4 KPIs com delta e mini-spark inline, 1 chart grande explicativo, citações reais do que aconteceu e CTAs pra próxima ação. Stripe + Notion + The Information."
      />

      <InsightsWeeklySection />
      <InsightsKpiTilesSection />
    </>
  );
}

/* ---------- Weekly editorial report ---------- */
function InsightsWeeklySection() {
  return (
    <Section title="Relatório semanal · narrativa editorial" meta="cabeçalho · 4 KPIs · chart grande · quotes · CTA">
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

        {/* 4 KPIs com delta + sparkline */}
        <div className="vds-ins-kpis">
          <article className="vds-ins-kpi">
            <div className="vds-ins-kpi-l">
              <span className="vds-ins-kpi-lbl">
                <Users size={11} strokeWidth={2.2} />
                Mentees ativos
              </span>
              <p className="vds-ins-kpi-val">
                <span className="num">228</span>
                <span className="of">/ 248</span>
              </p>
              <span className="vds-ins-kpi-delta up">
                <TrendingUp size={11} strokeWidth={2.4} />
                +14 vs. sem 19
              </span>
            </div>
            <svg viewBox="0 0 80 32" className="vds-ins-spark">
              <defs>
                <linearGradient id="sp1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.28" />
                  <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,22 L10,20 L20,21 L30,18 L40,17 L50,14 L60,12 L70,8 L80,6 L80,32 L0,32 Z" fill="url(#sp1)" />
              <path d="M0,22 L10,20 L20,21 L30,18 L40,17 L50,14 L60,12 L70,8 L80,6" fill="none" stroke="var(--via-navy)" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="80" cy="6" r="2.5" fill="var(--via-navy)" />
            </svg>
          </article>

          <article className="vds-ins-kpi">
            <div className="vds-ins-kpi-l">
              <span className="vds-ins-kpi-lbl">
                <Calendar size={11} strokeWidth={2.2} />
                Mentoria 1:1 (compareceu)
              </span>
              <p className="vds-ins-kpi-val">
                <span className="num">94%</span>
              </p>
              <span className="vds-ins-kpi-delta up">
                <TrendingUp size={11} strokeWidth={2.4} />
                +6pp · maior da turma
              </span>
            </div>
            <svg viewBox="0 0 80 32" className="vds-ins-spark">
              <defs>
                <linearGradient id="sp2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.28" />
                  <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,18 L10,16 L20,19 L30,14 L40,12 L50,10 L60,11 L70,7 L80,5 L80,32 L0,32 Z" fill="url(#sp2)" />
              <path d="M0,18 L10,16 L20,19 L30,14 L40,12 L50,10 L60,11 L70,7 L80,5" fill="none" stroke="var(--via-navy)" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="80" cy="5" r="2.5" fill="var(--via-navy)" />
            </svg>
          </article>

          <article className="vds-ins-kpi">
            <div className="vds-ins-kpi-l">
              <span className="vds-ins-kpi-lbl">
                <MessageCircle size={11} strokeWidth={2.2} />
                Conversas Nina / sem
              </span>
              <p className="vds-ins-kpi-val">
                <span className="num">1.842</span>
              </p>
              <span className="vds-ins-kpi-delta up">
                <TrendingUp size={11} strokeWidth={2.4} />
                +38% vs. sem 19
              </span>
            </div>
            <svg viewBox="0 0 80 32" className="vds-ins-spark">
              <defs>
                <linearGradient id="sp3" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.28" />
                  <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,24 L10,22 L20,23 L30,20 L40,18 L50,12 L60,10 L70,6 L80,4 L80,32 L0,32 Z" fill="url(#sp3)" />
              <path d="M0,24 L10,22 L20,23 L30,20 L40,18 L50,12 L60,10 L70,6 L80,4" fill="none" stroke="var(--via-navy)" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="80" cy="4" r="2.5" fill="var(--via-navy)" />
            </svg>
          </article>

          <article className="vds-ins-kpi attention">
            <div className="vds-ins-kpi-l">
              <span className="vds-ins-kpi-lbl">
                <DollarSign size={11} strokeWidth={2.2} />
                MRR
              </span>
              <p className="vds-ins-kpi-val">
                <span className="cur">R$</span>
                <span className="num">218K</span>
              </p>
              <span className="vds-ins-kpi-delta down">
                <TrendingDown size={11} strokeWidth={2.4} />
                −R$ 4.2K · 2 churns
              </span>
            </div>
            <svg viewBox="0 0 80 32" className="vds-ins-spark">
              <defs>
                <linearGradient id="sp4" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#B85C5C" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#B85C5C" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,10 L10,8 L20,9 L30,7 L40,8 L50,11 L60,14 L70,16 L80,18 L80,32 L0,32 Z" fill="url(#sp4)" />
              <path d="M0,10 L10,8 L20,9 L30,7 L40,8 L50,11 L60,14 L70,16 L80,18" fill="none" stroke="#B85C5C" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="80" cy="18" r="2.5" fill="#B85C5C" />
            </svg>
          </article>
        </div>

        {/* Chart grande explicativo */}
        <div className="vds-ins-chart">
          <header>
            <div>
              <h4>Atendimento Nina · últimas 8 semanas</h4>
              <p>Volume diário · barras = mensagens recebidas · linha = % resolvidas sem humano</p>
            </div>
            <div className="vds-ins-chart-legend">
              <span><i className="bar" /> Mensagens</span>
              <span><i className="line" /> % resolvido</span>
            </div>
          </header>

          <svg viewBox="0 0 600 240" className="vds-ins-chart-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Bar gradient · navy translúcido sutil */}
              <linearGradient id="ins-bar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.55" />
                <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0.12" />
              </linearGradient>
              {/* Inner highlight pra dar profundidade na bar */}
              <linearGradient id="ins-bar-shine" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.05" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              {/* Area fill abaixo da line */}
              <linearGradient id="ins-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.22" />
                <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0" />
              </linearGradient>
              {/* Glow no dot final */}
              <radialGradient id="ins-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.5" />
                <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Grid lines · fade nas pontas pra parecer mais leve */}
            {[60, 110, 160].map((y) => (
              <line key={y} x1="20" y1={y} x2="580" y2={y}
                stroke="var(--via-navy)" strokeOpacity="0.06" strokeDasharray="2,4" />
            ))}

            {/* Bars · proporção controlada + rounded top · gradient leve */}
            {(() => {
              const values = [320, 380, 420, 560, 680, 820, 980, 1842];
              const max = 1842;
              const baseY = 200;
              const maxH = 140;
              const barW = 36;
              const slotW = 70;
              const startX = 30;
              return values.map((v, i) => {
                const h = (v / max) * maxH;
                const x = startX + i * slotW;
                const y = baseY - h;
                return (
                  <g key={i}>
                    {/* main bar */}
                    <rect x={x} y={y} width={barW} height={h} rx="5"
                      fill="url(#ins-bar)" />
                    {/* inner shine subtle */}
                    <rect x={x} y={y} width={barW} height={Math.min(h, 28)} rx="5"
                      fill="url(#ins-bar-shine)" />
                    {/* week label */}
                    <text x={x + barW / 2} y="218" textAnchor="middle"
                      fontSize="9.5" fill="var(--via-text-muted)"
                      fontFamily="var(--via-font-mono)" letterSpacing="0.04em">
                      S{13 + i}
                    </text>
                  </g>
                );
              });
            })()}

            {/* Area fill abaixo da line */}
            <path
              d="M48,150 C100,140 160,130 220,115 S360,80 430,58 L566,32 L566,200 L48,200 Z"
              fill="url(#ins-area)"
            />

            {/* Line · % resolvido */}
            <path
              d="M48,150 C100,140 160,130 220,115 S360,80 430,58 L566,32"
              fill="none"
              stroke="var(--via-navy)"
              strokeOpacity="0.85"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Dots on line */}
            {[
              { x: 48, y: 150 },
              { x: 118, y: 140 },
              { x: 188, y: 124 },
              { x: 258, y: 110 },
              { x: 328, y: 90 },
              { x: 398, y: 68 },
              { x: 468, y: 50 },
              { x: 566, y: 32 },
            ].map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="3"
                fill="var(--via-bg, #FFFFFF)"
                stroke="var(--via-navy)" strokeWidth="1.5" />
            ))}

            {/* Latest dot · halo + filled */}
            <circle cx="566" cy="32" r="14" fill="url(#ins-glow)" />
            <circle cx="566" cy="32" r="4.5" fill="var(--via-navy)" />
            <circle cx="566" cy="32" r="2" fill="var(--via-bg, #FFFFFF)" />
          </svg>

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
function InsightsKpiTilesSection() {
  const tiles = [
    { name: 'Receita recorrente', val: 'R$ 218K', delta: '-1.9%', down: true, mini: '92K → 218K · trimestre' },
    { name: 'NPS', val: '74', delta: '+8', down: false, mini: '53 respondentes · 28% promotores' },
    { name: 'Aulas concluídas', val: '1.418', delta: '+22%', down: false, mini: 'média 18min · 92% mobile' },
    { name: 'Tempo no Discord', val: '4h 12m', delta: '+9min', down: false, mini: 'mediana por mentee · semana' },
  ];

  return (
    <Section title="KPI tiles compactos · grid pra dashboard" meta="ideal pra dashboards executivos · 4 + N expansíveis">
      <div className="vds-ins-tiles">
        {tiles.map((t) => (
          <article key={t.name} className={`vds-ins-tile ${t.down ? 'down' : ''}`}>
            <span className="vds-ins-tile-lbl">{t.name}</span>
            <p className="vds-ins-tile-val">{t.val}</p>
            <div className="vds-ins-tile-meta">
              <span className={`vds-ins-tile-delta ${t.down ? 'down' : 'up'}`}>
                {t.down ? <TrendingDown size={11} strokeWidth={2.4} /> : <TrendingUp size={11} strokeWidth={2.4} />}
                {t.delta}
              </span>
              <span className="vds-ins-tile-mini mono">{t.mini}</span>
            </div>
            <Activity size={42} strokeWidth={1} className="vds-ins-tile-ghost" />
          </article>
        ))}
      </div>
    </Section>
  );
}
