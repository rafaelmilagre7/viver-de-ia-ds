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
        eyebrow="Padrões · prova social"
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
    'Place Dreams', 'Trivia Studio', 'Assessoria MAP', 'Viva Nexo', 'Pasetti Viagens', 'Jt Telecom', 'H10 Esportes', 'TaxTek', 'Prevensul',
  ];

  return (
    <Section title="Faixa de clientes · parede de logos editorial" meta="lista mono com separadores · sem grade de logos cinzas">
      <article className="vds-trust-strip">
        <header>
          <span className="vds-trust-eyebrow">Empresas com case publicado</span>
          <h3>
            <span className="vds-trust-num mono">521</span>
            <span>cases reais de implementação</span>
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
            Ver os 521 cases
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Stats grid premium ---------- */
function TrustStatsSection() {
  const stats = [
    { v: '521', l: 'cases reais de implementação', s: 'empresas brasileiras · viverdeia.ai/cases' },
    { v: '157', l: 'soluções de IA prontas', s: 'Plug-and-Play · em todos os planos' },
    { v: '29', l: 'setores com implementação', s: 'de saúde a turismo' },
    { v: 'R$ 1 bi', l: 'meta em receita e economia', s: 'meta pública · não é resultado' },
  ];

  return (
    <Section title="Grade de números · editorial" meta="cada bloco com display Geist + microcopy contextual">
      <div className="vds-trust-stats">
        {stats.map((s) => (
          <article key={s.v} className="vds-trust-stat">
            <div className="vds-trust-stat-corner">
              <TrendingUp size={16} strokeWidth={1.75} />
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
      title: '[Título da avaliação · frase do cliente]',
      body: '[Texto da avaliação como foi publicado na plataforma de origem · sem edição, com data e link pra conferir.]',
      author: '[Nome]',
      role: '[cargo] · [empresa]',
      date: '[data]',
    },
    {
      stars: 5,
      title: '[Frase que resume o resultado]',
      body: '[O que mudou na operação, nas palavras do cliente · número só se ele citou e autorizou.]',
      author: '[Nome]',
      role: '[cargo] · [empresa]',
      date: '[data]',
    },
    {
      stars: 5,
      title: '[Ponto de atenção levantado pelo cliente]',
      body: '[Avaliação com crítica também entra · é o que mostra que a nota é real.]',
      author: '[Nome]',
      role: '[cargo] · [empresa]',
      date: '[data]',
    },
  ];

  return (
    <Section title="Reviews · 5 estrelas · com peso editorial" meta="quote em display Geist · stars Lucide · footer com contexto">
      <div className="vds-trust-reviews">
        <aside className="vds-trust-reviews-rating">
          <div className="vds-trust-rating-num">
            <span className="num">[N,N]</span>
            <span className="of">/ 5</span>
          </div>
          <div className="vds-trust-rating-stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} strokeWidth={1.75} />
            ))}
          </div>
          <p className="vds-trust-rating-meta">
            Média de <strong>[N] avaliações</strong> · [plataforma]
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
              <Quote size={16} strokeWidth={1.75} className="vds-trust-review-mark" />
              <div className="vds-trust-review-stars">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} size={16} strokeWidth={1.75} />
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
    { ico: Award, name: '[Prêmio ou ranking]', org: '[organização que concedeu]', year: '[ano]' },
    { ico: ShieldCheck, name: '[Certificação]', org: '[auditoria responsável]', year: '[ano]' },
    { ico: Users, name: '521 cases reais', org: 'implementação de IA · viverdeia.ai/cases', year: 'ao vivo' },
    { ico: Building2, name: '[Associação ou parceria]', org: '[instituição]', year: '[desde ano]' },
  ];

  return (
    <Section title="Reconhecimentos · prêmios + certificações" meta="ícones Lucide · grade de 4 colunas · rodapé com fonte e ano">
      <div className="vds-trust-awards">
        {awards.map((a, i) => {
          const Icon = a.ico;
          return (
            <article key={i} className="vds-trust-award">
              <div className="vds-trust-award-icon">
                <Icon size={16} strokeWidth={1.75} />
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
