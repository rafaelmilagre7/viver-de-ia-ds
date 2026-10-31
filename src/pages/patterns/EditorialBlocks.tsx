import { useState } from 'react';
import { ChevronDown, ArrowRight, Check, X, Crown, Award, Compass, Layers, Target } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './editorial-blocks.css';

export default function EditorialBlocks() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · blocos editoriais"
        title={
          <>
            Os blocos que <em>repetem em todo lugar</em>.
          </>
        }
        lede="Logo wall, timeline, FAQ, comparison, process e hero variants — as 6 peças editoriais que aparecem em quase toda landing, sales page, pricing ou docs. Padronizar essas aqui é o que destrava montar página nova em uma tarde."
      />

      <HeroVariantsSection />
      <LogoWallSection />
      <TimelineSection />
      <ProcessSection />
      <ComparisonSection />
      <FaqSection />
    </>
  );
}

/* ---------- Hero variants ---------- */
function HeroVariantsSection() {
  return (
    <Section title="Variações de hero · 3 arquétipos" meta="manchete · split com mockup · split editorial">
      <div className="vds-heros">
        {/* Hero 1 — manchete navy mesh */}
        <article className="vds-hero-card navy via-mesh-navy via-noise">
          <span className="vds-hero-eyebrow">Edição 2026 · 17 mai</span>
          <h3>
            A IA não substituiu o time. <em>Devolveu tempo pra ele fazer o que só humano faz.</em>
          </h3>
          <p className="vds-hero-lede">
            Hero manchete · ocupa toda a tela · serve pra title page, capa editorial, abertura de evento ou primeira dobra de landing institucional. Único texto, peso máximo.
          </p>
          <div className="vds-hero-cta-row">
            <a className="vds-hero-cta primary" href="#">Ler manifesto</a>
            <a className="vds-hero-cta ghost" href="#">Ver casos</a>
          </div>
          <img src={monogramWhite} alt="" className="vds-hero-mark" />
        </article>

        {/* Hero 2 — split com card */}
        <article className="vds-hero-card split">
          <div className="vds-hero-l">
            <span className="vds-hero-pill">Garantia de 90 dias</span>
            <h3>
              Coloque sua primeira <em>IA em produção</em> sem virar refém de fornecedor.
            </h3>
            <p className="vds-hero-lede">
              Hero split · texto à esquerda + visual à direita. Versão padrão para sales page, conversão, pricing ou onboarding.
            </p>
            <div className="vds-hero-stats">
              <div>
                <strong>521</strong>
                <em>cases reais</em>
              </div>
              <div>
                <strong>157</strong>
                <em>soluções prontas</em>
              </div>
              <div>
                <strong>29</strong>
                <em>setores atendidos</em>
              </div>
            </div>
            <a className="vds-hero-cta primary" href="#">Conhecer o plano <ArrowRight size={16} strokeWidth={1.75} /></a>
          </div>
          <div className="vds-hero-r">
            <div className="vds-hero-mock via-mesh-navy via-noise">
              <span className="mock-tag">Dashboard · ROI da empresa</span>
              <div className="mock-row">
                <div className="mock-kpi">
                  <em>Economia · mês</em>
                  <strong>R$ 38,4K</strong>
                </div>
                <div className="mock-kpi alt">
                  <em>Time aplicando</em>
                  <strong>74%</strong>
                </div>
              </div>
              <div className="mock-spark">
                <svg viewBox="0 0 140 36" preserveAspectRatio="none">
                  <path d="M 0 28 C 18 24, 30 20, 48 18 S 80 12, 100 8 S 130 4, 140 4" style={{ stroke: "var(--via-gray-300)" }} strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mock-meta">+18% vs ago · ritmo sustentado</p>
            </div>
          </div>
        </article>

        {/* Hero 3 — editorial dois blocos */}
        <article className="vds-hero-card editorial">
          <div className="vds-hero-grid">
            <div>
              <span className="vds-hero-eyebrow dark">Cap. 03 · Capítulo aberto</span>
              <h3>
                <em>Operadores,</em> não consumidores.
              </h3>
            </div>
            <div>
              <p className="vds-hero-lede dark">
                Hero editorial · duas colunas em diálogo. Pra abertura de artigo, manifesto, dobra de about page ou bloco de cultura. Funciona quando o texto é o produto.
              </p>
              <a className="vds-hero-cta dark" href="#">
                Leia o manifesto completo
                <ArrowRight size={14} strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Logo wall ---------- */
function LogoWallSection() {
  const clients = ['Place Dreams', 'Trivia Studio', 'Assessoria MAP', 'Viva Nexo', 'Pasetti Viagens', 'Jt Telecom', 'H10 Esportes', 'TaxTek', 'Prevensul', 'BSSP', 'Orbit', 'Lognos'];
  return (
    <Section title="Parede de logos · clientes que confiam na marca" meta="faixa de prova social · grade editorial">
      <div className="vds-logowall-card">
        <header>
          <p className="eyebrow">Empresas com case publicado</p>
          <h3>
            <em>521 cases reais</em> de implementação de IA em empresas brasileiras · 29 setores.
          </h3>
        </header>

        <ul className="vds-logowall">
          {clients.map((c) => (
            <li key={c}>
              <span className="vds-logowall-logo">
                {c}
              </span>
            </li>
          ))}
        </ul>

        <footer>
          <a href="#" className="vds-logowall-link">
            Ver casos de uso completos
            <ArrowRight size={14} strokeWidth={1.75} />
          </a>
        </footer>
      </div>
    </Section>
  );
}

/* ---------- Timeline ---------- */
function TimelineSection() {
  const steps = [
    { year: '[ano 1]', title: 'Fundação', body: 'Rafael Milagre funda a Viver de IA. [Como começou · marco e data vindos do time, com fonte.]', tag: 'origem' },
    { year: '[ano 2]', title: 'Comunidade Viver de IA', body: 'Comunidade de empresários e líderes. [Marco do capítulo · número só com fonte.]', tag: 'estrutura' },
    { year: '[ano 3]', title: 'Leaders AI Conference', body: 'Evento presencial da marca · [local] · [N] participantes. [O que o evento provou, com dado.]', tag: 'evento' },
    { year: '[ano 4]', title: 'Plataforma', body: '157 soluções de IA prontas, formações práticas, mentorias ao vivo e Consultor IA na mesma plataforma.', tag: 'produto' },
    { year: 'Hoje', title: 'Meta pública', body: 'Gerar R$ 1 bilhão em receita e economia para empresas com IA — é meta, não resultado. 521 cases reais até aqui.', tag: 'meta', current: true },
  ];

  return (
    <Section title="Timeline · capítulos da empresa" meta="história · roadmap · evolução · serve dos 2 lados">
      <div className="vds-timeline">
        {steps.map((s, i) => (
          <article key={s.year} className={`vds-tl-item ${s.current ? 'now' : ''}`}>
            <div className="vds-tl-spine">
              <span className="vds-tl-dot">
                {s.current && <span className="vds-tl-pulse" />}
              </span>
              {i < steps.length - 1 && <span className="vds-tl-line" />}
            </div>
            <div className="vds-tl-body">
              <header>
                <span className="vds-tl-year">{s.year}</span>
                <span className="vds-tl-tag">{s.tag}</span>
              </header>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Process steps ---------- */
function ProcessSection() {
  const steps = [
    { n: '01', title: 'Alfabetiza', body: 'Trilha de onboarding e formações práticas · do CEO ao analista, cada um no seu nível.', icon: Compass },
    { n: '02', title: 'Escolhe', body: 'As 3 soluções da adesão · onde a IA reduz custo ou aumenta receita no seu negócio.', icon: Layers },
    { n: '03', title: 'Implementa', body: 'Soluções Plug-and-Play rodando na operação · sem programar, com mentoria ao vivo.', icon: Target },
    { n: '04', title: 'Mede', body: 'Dashboard com quem está aplicando, engajamento e ROI. Próximo capítulo aberto.', icon: Award },
  ];

  return (
    <Section title="Process · como funciona em 4 passos" meta="onboarding · sales page · 'how it works'">
      <div className="vds-process">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <article key={s.n} className="vds-process-step">
              <div className="vds-process-num">
                <Icon size={20} strokeWidth={1.75} />
                <span className="n">{s.n}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
              {i < steps.length - 1 && <span className="vds-process-arrow"><ArrowRight size={16} strokeWidth={1.75} /></span>}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Comparison table ---------- */
function ComparisonSection() {
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 2.580',
      unit: '/ mês · anual',
      lede: 'Plataforma, soluções prontas, formações e comunidade.',
      hero: false,
      features: [
        { l: 'Todas as soluções Plug-and-Play', v: true },
        { l: 'Formações práticas', v: true },
        { l: 'Consultor IA na plataforma', v: true },
        { l: 'Comunidade e imersão presencial', v: true },
        { l: 'Mentoria em grupo ao vivo', v: false },
        { l: 'Mentoria individual', v: false },
        { l: 'Arquiteto de soluções AI Builder', v: false },
      ],
      cta: 'Assinar Starter',
    },
    {
      name: 'Pro',
      price: 'R$ 3.780',
      unit: '/ mês · anual',
      lede: 'Plano completo com mentoria em grupo ao vivo.',
      hero: true,
      features: [
        { l: 'Todas as soluções Plug-and-Play', v: true },
        { l: 'Formações práticas', v: true },
        { l: 'Consultor IA na plataforma', v: true },
        { l: 'Comunidade e imersão presencial', v: true },
        { l: 'Mentoria em grupo ao vivo', v: '10 check-ins/mês' },
        { l: 'Mentoria individual', v: false },
        { l: 'Arquiteto de soluções AI Builder', v: false },
      ],
      cta: 'Assinar Pro',
    },
    {
      name: 'Enterprise',
      price: 'R$ 6.180',
      unit: '/ mês · anual',
      lede: 'Implementação assistida e soluções sob medida.',
      hero: false,
      features: [
        { l: 'Todas as soluções Plug-and-Play', v: true },
        { l: 'Formações práticas', v: true },
        { l: 'Consultor IA na plataforma', v: true },
        { l: 'Comunidade e imersão presencial', v: true },
        { l: 'Mentoria em grupo ao vivo', v: true },
        { l: 'Mentoria individual', v: '1 hora/mês' },
        { l: 'Arquiteto de soluções AI Builder', v: true },
      ],
      cta: 'Falar com o time',
    },
  ];

  return (
    <Section title="Comparison table · planos lado a lado" meta="pricing · feature comparison · matriz">
      <div className="vds-comparison">
        {plans.map((p) => (
          <article key={p.name} className={`vds-comparison-col ${p.hero ? 'hero' : ''}`}>
            <header>
              {p.hero && <span className="vds-comparison-badge"><Crown size={14} strokeWidth={1.75} /> Recomendado</span>}
              <h4>{p.name}</h4>
              <p className="vds-comparison-price">
                {p.price}
                <span>{p.unit}</span>
              </p>
              <p className="vds-comparison-lede">{p.lede}</p>
            </header>

            <ul className="vds-comparison-list">
              {p.features.map((f, i) => (
                <li key={i} className={f.v === false ? 'off' : ''}>
                  {f.v === true && <Check size={14} strokeWidth={1.75} className="ok" />}
                  {f.v === false && <X size={14} strokeWidth={1.75} className="no" />}
                  {typeof f.v === 'string' && <span className="val">{f.v}</span>}
                  <span className="lbl">{f.l}</span>
                </li>
              ))}
            </ul>

            <button className={`vds-comparison-cta ${p.hero ? 'hero' : ''}`}>
              {p.cta}
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FaqSection() {
  const [open, setOpen] = useState<number>(1);
  const faqs = [
    {
      q: 'Em quanto tempo eu vejo resultado?',
      a: 'As equipes começam a implementar soluções já na primeira semana. A garantia de 90 dias devolve 100% do investimento se não houver aumento de receita nem redução de custos operacionais, cumpridos os requisitos da cláusula 7 dos termos de uso. O ritmo depende de quanto o time aplica entre as mentorias.',
    },
    {
      q: 'Funciona pra quem não programa?',
      a: 'Funciona. As soluções são plug and play, sem necessidade de programação, e a trilha personalizada com IA adapta o conteúdo ao nível de cada colaborador, do CEO ao analista. O que não funciona é quem quer aprender IA “por curiosidade” sem uma operação pra aplicar.',
    },
    {
      q: 'Como funciona a contratação?',
      a: 'Os três planos têm valor mensal em reais e contratação anual: Starter R$ 2.580, Pro R$ 3.780 e Enterprise R$ 6.180 por mês. O upgrade de plano pode ser feito a qualquer momento, mediante a diferença de valor.',
    },
    {
      q: 'Vocês mexem no meu produto?',
      a: 'Não diretamente. No Starter e no Pro, quem implementa é o seu time, com soluções prontas, formações e mentoria em grupo. O Enterprise inclui implementação assistida, o arquiteto de soluções AI Builder e 1 hora por mês de mentoria individual.',
    },
    {
      q: 'O que diferencia da concorrência?',
      a: 'Curso avulso ensina teoria e para por aí. A Viver de IA é uma plataforma de alfabetização e aplicação: sua equipe aprende e implementa soluções reais, com retorno medido. São 521 cases reais de implementação de IA.',
    },
  ];
  return (
    <Section title="FAQ accordion · perguntas que sempre voltam" meta="fim de landing · sales page · objeções">
      <div className="vds-faq">
        {faqs.map((f, i) => (
          <article key={i} className={`vds-faq-item ${open === i ? 'open' : ''}`}>
            <button className="vds-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <ChevronDown size={16} strokeWidth={1.75} className={`vds-faq-chev ${open === i ? 'rot' : ''}`} />
            </button>
            {open === i && <p className="vds-faq-a">{f.a}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}
