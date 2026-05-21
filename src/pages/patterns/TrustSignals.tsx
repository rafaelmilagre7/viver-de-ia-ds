import {
  Star, Award, Users, TrendingUp, Quote, Building2,
  ArrowUpRight, ShieldCheck,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './trust-signals.css';

export default function TrustSignals() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · trust signals"
        title={
          <>
            Os sinais de credibilidade — <em>tratados com peso de marca</em>.
          </>
        }
        lede="Logos de clientes, notas em plataformas, certificações, números editoriais — todos os elementos de prova social tratados como peças autorais. Não barra de logos cinzentos · cada bloco com tipografia tabular, atmosfera própria e densidade calibrada."
      />

      <TrustStripSection />
      <TrustStatsSection />
      <TrustReviewsSection />
      <TrustAwardsSection />
    </>
  );
}

/* ---------- Logo wall premium ---------- */
function TrustStripSection() {
  const clients = [
    'Efizi', 'Mantra', 'Pivot', 'Lumin', 'Olara Bank', 'Hashi', 'Quanta', 'Orbital', 'Vertice',
  ];

  return (
    <Section title="Strip de clientes · logo wall editorial" meta="lista mono com separadores · sem grid de logos cinzas">
      <article className="vds-trust-strip">
        <header>
          <span className="vds-trust-eyebrow">Já operando com IA pela Viver de IA</span>
          <h3>
            <span className="vds-trust-num mono">218</span>
            <span>empresas em produção</span>
          </h3>
        </header>

        <ul className="vds-trust-clients">
          {clients.map((c, i) => (
            <li key={c}>
              <span className="vds-trust-client-mark mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="vds-trust-client-name">{c}</span>
            </li>
          ))}
        </ul>

        <footer>
          <a href="#" className="vds-trust-strip-cta">
            Ver os 218 cases
            <ArrowUpRight size={13} strokeWidth={2.4} />
          </a>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Stats grid premium ---------- */
function TrustStatsSection() {
  const stats = [
    { v: '218', l: 'empresas em produção', s: '+38 nos últimos 90d' },
    { v: '14.2K', l: 'horas de mentoria', s: 'média de 28min/sessão' },
    { v: '94%', l: 'taxa de comparecimento', s: 'maior do mercado de mentoria 1:1' },
    { v: 'R$ 47M', l: 'em economia operacional', s: 'agregado dos alunos · auto-reportado' },
  ];

  return (
    <Section title="Stats grid · números editoriais" meta="cada bloco com display Geist + microcopy contextual">
      <div className="vds-trust-stats">
        {stats.map((s) => (
          <article key={s.v} className="vds-trust-stat">
            <div className="vds-trust-stat-corner">
              <TrendingUp size={11} strokeWidth={2.2} />
            </div>
            <p className="vds-trust-stat-v">{s.v}</p>
            <p className="vds-trust-stat-l">{s.l}</p>
            <p className="vds-trust-stat-s">{s.s}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Reviews + rating ---------- */
function TrustReviewsSection() {
  const reviews = [
    {
      stars: 5,
      title: 'Achei que conhecia o que existia sobre IA. Não conhecia nada.',
      body: 'A mentoria me forçou a reorganizar o squad inteiro em 60 dias. Não foi confortável, mas a economia operacional virou 4 horas/dia por pessoa.',
      author: 'Camila Moraes',
      role: 'Head IA · Mantra',
      date: '12 mai 2026',
    },
    {
      stars: 5,
      title: 'O Caio desenhou o squad que eu precisava no quadro.',
      body: 'Saí da sessão com um plano de 90 dias, 3 ferramentas pra cortar e 1 contratação que eu vinha empurrando há 6 meses.',
      author: 'Daniel Pinheiro',
      role: 'Founder · Pivot',
      date: '08 mai 2026',
    },
    {
      stars: 5,
      title: 'Vocês entregam mais do que prometem.',
      body: 'A Nina cobre 38% das nossas conversas de vendas hoje. Era pra ser experimental, virou crítico em 4 meses.',
      author: 'Felipe Andrade',
      role: 'CTO · Olara Bank',
      date: '02 mai 2026',
    },
  ];

  return (
    <Section title="Reviews · 5 estrelas · com peso editorial" meta="quote em display Geist · stars Lucide · footer com contexto">
      <div className="vds-trust-reviews">
        <aside className="vds-trust-reviews-rating">
          <div className="vds-trust-rating-num">
            <span className="num">4.94</span>
            <span className="of">/ 5</span>
          </div>
          <div className="vds-trust-rating-stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} strokeWidth={1.8} style={{ fill: "var(--via-navy)", stroke: "var(--via-navy)" }} />
            ))}
          </div>
          <p className="vds-trust-rating-meta">
            Média de <strong>184 reviews</strong> · plataforma G2
          </p>
          <span className="vds-trust-rating-divider" />
          <ul className="vds-trust-rating-breakdown">
            {[
              { s: 5, p: 92 },
              { s: 4, p: 6 },
              { s: 3, p: 2 },
              { s: 2, p: 0 },
              { s: 1, p: 0 },
            ].map((b) => (
              <li key={b.s}>
                <span className="lbl mono">{b.s}★</span>
                <span className="bar">
                  <span style={{ width: `${b.p}%` }} />
                </span>
                <span className="pct mono">{b.p}%</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="vds-trust-reviews-list">
          {reviews.map((r, i) => (
            <article key={i} className="vds-trust-review">
              <Quote size={16} strokeWidth={1.8} className="vds-trust-review-mark" />
              <div className="vds-trust-review-stars">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} size={11} strokeWidth={1.8} style={{ fill: "var(--via-navy)", stroke: "var(--via-navy)" }} />
                ))}
              </div>
              <h4>{r.title}</h4>
              <p>{r.body}</p>
              <footer>
                <div>
                  <strong>{r.author}</strong>
                  <em>{r.role}</em>
                </div>
                <span className="vds-trust-review-date mono">{r.date}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Awards / Recognitions ---------- */
function TrustAwardsSection() {
  const awards = [
    { ico: Award, name: 'Top 50 startups IA · 2025', org: 'Endeavor Brasil', year: '2025' },
    { ico: ShieldCheck, name: 'Certificação LGPD · enterprise', org: 'Auditoria PwC', year: '2026' },
    { ico: Users, name: '218 squads operando', org: 'comunidade Viver de IA', year: 'ao vivo' },
    { ico: Building2, name: 'Membro · IA Brasil', org: 'instituto IA Brasil', year: 'desde 2024' },
  ];

  return (
    <Section title="Reconhecimentos · awards + certificações" meta="ícones Lucide · grid 4 colunas · footer com fonte/ano">
      <div className="vds-trust-awards">
        {awards.map((a, i) => {
          const Icon = a.ico;
          return (
            <article key={i} className="vds-trust-award">
              <div className="vds-trust-award-icon">
                <Icon size={18} strokeWidth={1.6} />
              </div>
              <h4>{a.name}</h4>
              <p>{a.org}</p>
              <span className="vds-trust-award-year mono">{a.year}</span>
              <span className="vds-trust-award-bar" />
            </article>
          );
        })}
      </div>
    </Section>
  );
}
