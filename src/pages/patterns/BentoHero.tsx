import { ArrowRight, TrendingUp, Users, Crown, Headphones, Calendar } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './bento-hero.css';

export default function BentoHero() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · hero bento"
        title={
          <>
            Hero em grade modular, <em>cada peça respira</em>.
          </>
        }
        lede="Alternativa moderna ao hero tradicional 1-2 colunas. Grade de tiles assimétricos com pesos visuais diferentes — manchete dominante, KPIs respirando, testimonial coexistindo, CTA na borda. Cada tile uma peça editorial autônoma."
      />

      <BentoSection />
    </>
  );
}

function BentoSection() {
  return (
    <Section title="Hero bento · 6 blocos + 1 manchete dominante" meta="grade 4 colunas · 3 linhas · respiração entre peças">
      <div className="vds-bento">
        {/* Tile 1 — Manchete dominante (2x2) */}
        <article className="vds-bento-card hero">
          <div className="vds-bento-bg via-mesh-navy via-noise" />
          <span className="vds-bento-glow" />

          <header>
            <span className="vds-bento-eyebrow">Plataforma B2B · 2026</span>
            <img src={monogramWhite} alt="" className="vds-bento-mark" />
          </header>

          <h1>
            Viver de IA,<br />
            <em>não de prompt</em>.
          </h1>

          <p className="vds-bento-lede">
            Soluções prontas, formações e mentorias pra tirar a IA do discurso e colocar em operação — não cursinho de prompt.
          </p>

          <div className="vds-bento-cta-row">
            <a className="vds-bento-cta primary" href="#">
              Ver planos
              <ArrowRight size={16} strokeWidth={1.75} />
            </a>
            <a className="vds-bento-cta ghost" href="#">Ver método</a>
          </div>
        </article>

        {/* Tile 2 — Big stat */}
        <article className="vds-bento-card stat">
          <span className="vds-bento-eyebrow alt">Cases reais de implementação</span>
          <p className="vds-bento-num">
            521
            <em>em empresas brasileiras</em>
          </p>
          <div className="vds-bento-delta">
            <TrendingUp size={16} strokeWidth={1.75} />
            <strong>29</strong>
            <span>setores</span>
          </div>
        </article>

        {/* Tile 3 — Spark */}
        <article className="vds-bento-card spark">
          <div className="vds-bento-spark-row">
            <span className="vds-bento-eyebrow alt">Soluções prontas</span>
            <span className="vds-bento-tag-now">
              <span className="vds-bento-dot" />
              na plataforma
            </span>
          </div>
          <p className="vds-bento-num small">
            157
            <em>soluções Plug-and-Play</em>
          </p>
          <svg viewBox="0 0 200 40" className="vds-bento-spark-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bento-spark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--vds-bento-spark-ink)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--vds-bento-spark-ink)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 32 C 30 28, 50 24, 80 20 S 130 12, 160 8 S 190 4, 200 4 L 200 40 L 0 40 Z" fill="url(#bento-spark)" />
            <path d="M 0 32 C 30 28, 50 24, 80 20 S 130 12, 160 8 S 190 4, 200 4" style={{ stroke: "var(--vds-bento-spark-ink)" }} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
        </article>

        {/* Tile 4 — Quote */}
        <article className="vds-bento-card quote">
          <span className="vds-bento-quote-mark">Case real · Saúde</span>
          <blockquote>
            De 6h para cliques: a Viva Nexo <em>economiza R$ 162.000</em> com IA.
          </blockquote>
          <footer>
            <span className="av">VN</span>
            <div>
              <strong>Viva Nexo</strong>
              <em>viverdeia.ai/cases</em>
            </div>
          </footer>
        </article>

        {/* Tile 5 — Live indicator */}
        <article className="vds-bento-card live">
          <header>
            <span className="vds-bento-live-pill">
              <span className="vds-bento-live-dot" />
              <em>ao vivo</em>
            </span>
            <span className="vds-bento-live-views">
              <Users size={14} strokeWidth={1.75} />
              148
            </span>
          </header>
          <p className="vds-bento-live-eyebrow">
            <Headphones size={14} strokeWidth={1.75} />
            Mentoria em grupo · Pro
          </p>
          <h4>Auditoria de 3 prompts</h4>
          <p className="vds-bento-live-meta">
            Caio + convidados · 42 min restantes
          </p>
          <a href="#" className="vds-bento-live-cta">
            Entrar agora
            <ArrowRight size={14} strokeWidth={1.75} />
          </a>
        </article>

        {/* Tile 6 — Featured · próxima live */}
        <article className="vds-bento-card next">
          <header>
            <Calendar size={16} strokeWidth={1.75} />
            <span className="vds-bento-eyebrow alt">Próxima live</span>
          </header>
          <p className="vds-bento-num small">22 mai · 14h</p>
          <span className="vds-bento-next-title">Construindo o primeiro agente em produção</span>
          <div className="vds-bento-confirmed">
            <span className="vds-bento-avs">
              <span className="av">CR</span>
              <span className="av">LT</span>
              <span className="av">TR</span>
              <span className="av more">+22</span>
            </span>
            <em>22 confirmados</em>
          </div>
        </article>

        {/* Tile 7 — KPI accent */}
        <article className="vds-bento-card achievement">
          <span className="vds-bento-medal">
            <Crown size={16} strokeWidth={1.75} />
          </span>
          <p className="vds-bento-num accent">
            14 dias
            <em>seguidos de estudo</em>
          </p>
          <p className="vds-bento-meta">
            Mais que 87% dos operadores do mês
          </p>
        </article>
      </div>
    </Section>
  );
}
