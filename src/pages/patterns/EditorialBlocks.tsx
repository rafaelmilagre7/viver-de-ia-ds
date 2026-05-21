import { useState } from 'react';
import {
  ChevronDown, ArrowRight, Check, X, Crown, Award,
  Compass, Layers, Rocket,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './editorial-blocks.css';

export default function EditorialBlocks() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · editorial blocks"
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
    <Section title="Hero variants · 3 arquétipos" meta="manchete · split com mockup · split editorial">
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
            <span className="vds-hero-pill">Plano 90 dias</span>
            <h3>
              Coloque sua primeira <em>IA em produção</em> sem virar refém de fornecedor.
            </h3>
            <p className="vds-hero-lede">
              Hero split · texto à esquerda + visual à direita. Versão padrão para sales page, conversão, pricing ou onboarding.
            </p>
            <div className="vds-hero-stats">
              <div>
                <strong>4.940</strong>
                <em>operadores ativos</em>
              </div>
              <div>
                <strong>72%</strong>
                <em>MRR recorrente</em>
              </div>
              <div>
                <strong>11.920</strong>
                <em>conversas analisadas</em>
              </div>
            </div>
            <a className="vds-hero-cta primary" href="#">Conhecer o plano <ArrowRight size={14} strokeWidth={2.4} /></a>
          </div>
          <div className="vds-hero-r">
            <div className="vds-hero-mock via-mesh-navy via-noise">
              <span className="mock-tag">Dashboard · em produção</span>
              <div className="mock-row">
                <div className="mock-kpi">
                  <em>MRR mês</em>
                  <strong>R$ 1,84M</strong>
                </div>
                <div className="mock-kpi alt">
                  <em>NPS · 30d</em>
                  <strong>74</strong>
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
                <ArrowRight size={13} strokeWidth={2.4} />
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
  const clients = ['Efizi', 'Brando', 'Lumin', 'Norte', 'Olara', 'Pivot', 'Vector', 'Carto', 'Mantra', 'Asca', 'Foco', 'Garagem'];
  return (
    <Section title="Logo wall · clientes que confiam na marca" meta="social proof bar · grid editorial">
      <div className="vds-logowall-card">
        <header>
          <p className="eyebrow">Quem está construindo com a gente</p>
          <h3>
            <em>+220 operadores</em> rodando IA em produção · 38 empresas no plano corporate.
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
            <ArrowRight size={13} strokeWidth={2.4} />
          </a>
        </footer>
      </div>
    </Section>
  );
}

/* ---------- Timeline ---------- */
function TimelineSection() {
  const steps = [
    { year: '2022', title: 'Primeira mentoria 1:1', body: 'Caio Ribeiro começa a mentorar 6 fundadores fora do mercado de cursos online. Era uma planilha. Virou método.', tag: 'origem' },
    { year: '2023', title: 'Comunidade Viver de IA', body: 'Discord interno + encontros mensais. 240 operadores no primeiro ano — todos pagantes, todos selecionados.', tag: 'estrutura' },
    { year: '2024', title: 'Leaders AI Conference', body: 'Primeiro evento presencial em São Paulo · 380 ingressos esgotados em 9 dias. Provou que existe demanda por conversa adulta sobre IA.', tag: 'evento' },
    { year: '2025', title: 'Playbook publicado', body: 'O método vira documento público — 142 páginas, gratuito, mais baixado que qualquer ebook de IA em PT-BR.', tag: 'método' },
    { year: '2026', title: 'Nina · agente próprio', body: 'Lançamento da Nina, agente de qualificação que processa 11.920 conversas/mês. Marca a virada — Viver de IA também constrói.', tag: 'produto', current: true },
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
    { n: '01', title: 'Audita', body: 'Mapeamento de onde IA realmente entrega — ou trava — no seu negócio. 2 sessões.', icon: Compass },
    { n: '02', title: 'Estrutura', body: 'Decidir o que vai pra produção, o que vai pro arquivo, e qual a métrica de receita.', icon: Layers },
    { n: '03', title: 'Constrói', body: 'Primeiro agente rodando em 30 dias. Não MVP — em produção, com observabilidade.', icon: Rocket },
    { n: '04', title: 'Escala', body: 'Time treinado pra operar sem você. Métrica clara. Próximo capítulo aberto.', icon: Award },
  ];

  return (
    <Section title="Process · como funciona em 4 passos" meta="onboarding · sales page · 'how it works'">
      <div className="vds-process">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <article key={s.n} className="vds-process-step">
              <div className="vds-process-num">
                <Icon size={20} strokeWidth={1.4} />
                <span className="n">{s.n}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
              {i < steps.length - 1 && <span className="vds-process-arrow"><ArrowRight size={16} strokeWidth={2} /></span>}
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
      name: 'Comunidade',
      price: 'R$ 197',
      unit: '/ mês',
      lede: 'Pra quem está começando a operar com IA.',
      hero: false,
      features: [
        { l: 'Acesso à comunidade Discord', v: true },
        { l: 'Encontros mensais ao vivo', v: true },
        { l: 'Playbook completo', v: true },
        { l: 'Mentoria 1:1 mensal', v: false },
        { l: 'Auditoria da operação', v: false },
        { l: 'Construção de agente próprio', v: false },
        { l: 'Lives privadas com time interno', v: false },
      ],
      cta: 'Entrar na comunidade',
    },
    {
      name: 'Mentoria',
      price: 'R$ 6.000',
      unit: '/ trimestre',
      lede: 'Operadores que estão pra colocar IA em produção.',
      hero: true,
      features: [
        { l: 'Acesso à comunidade Discord', v: true },
        { l: 'Encontros mensais ao vivo', v: true },
        { l: 'Playbook completo', v: true },
        { l: 'Mentoria 1:1 mensal', v: '4 sessões / mês' },
        { l: 'Auditoria da operação', v: true },
        { l: 'Construção de agente próprio', v: false },
        { l: 'Lives privadas com time interno', v: true },
      ],
      cta: 'Começar agora',
    },
    {
      name: 'Corporate',
      price: 'Sob consulta',
      unit: '· squad inteiro',
      lede: 'Time de até 12 pessoas operando com IA junto.',
      hero: false,
      features: [
        { l: 'Acesso à comunidade Discord', v: 'até 12 lugares' },
        { l: 'Encontros mensais ao vivo', v: true },
        { l: 'Playbook completo', v: true },
        { l: 'Mentoria 1:1 mensal', v: 'time inteiro' },
        { l: 'Auditoria da operação', v: 'trimestral' },
        { l: 'Construção de agente próprio', v: true },
        { l: 'Lives privadas com time interno', v: true },
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
              {p.hero && <span className="vds-comparison-badge"><Crown size={11} strokeWidth={2.2} /> Mais popular</span>}
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
                  {f.v === true && <Check size={13} strokeWidth={2.5} className="ok" />}
                  {f.v === false && <X size={13} strokeWidth={2.4} className="no" />}
                  {typeof f.v === 'string' && <span className="val">{f.v}</span>}
                  <span className="lbl">{f.l}</span>
                </li>
              ))}
            </ul>

            <button className={`vds-comparison-cta ${p.hero ? 'hero' : ''}`}>
              {p.cta}
              <ArrowRight size={13} strokeWidth={2.4} />
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
      a: 'O primeiro destravo costuma vir em 30 dias — geralmente é uma decisão sobre arquitetura ou prompt que já estava te custando tempo. Resultado financeiro mensurável: 90 dias. Mas o ritmo depende mais de quantas decisões você consegue executar entre as sessões do que de qualquer mágica do método.',
    },
    {
      q: 'Funciona pra quem não programa?',
      a: 'Funciona pra quem opera negócio. Você precisa entender o que precisa ser feito — não escrever o código. Vários operadores que passaram pelo programa terceirizam a parte técnica, mas dirigem a estratégia. O que não funciona é quem quer aprender IA "por curiosidade" sem uma operação pra aplicar.',
    },
    {
      q: 'Posso pagar trimestralmente?',
      a: 'Sim. Mentoria é trimestral por padrão. Comunidade tem opção mensal e anual (com 2 meses de desconto). Corporate é semestral. Pagamentos em real, via PIX ou cartão de crédito até 12x.',
    },
    {
      q: 'Vocês mexem no meu produto?',
      a: 'Não. O método é de mentoria, não de consultoria. Você sai com decisões claras e direção técnica — quem executa é você ou seu time. Para empresas que querem execução conosco, oferecemos um plano Corporate Implementação, sob consulta.',
    },
    {
      q: 'O que diferencia da concorrência?',
      a: 'A maioria dos cursos de IA é teórico. A maioria das consultorias de IA é cara e genérica. O que fazemos é mentoria de operadores: você traz seu negócio, a gente discute decisão por decisão. É lento de propósito — e por isso entrega.',
    },
  ];
  return (
    <Section title="FAQ accordion · perguntas que sempre voltam" meta="fim de landing · sales page · objeções">
      <div className="vds-faq">
        {faqs.map((f, i) => (
          <article key={i} className={`vds-faq-item ${open === i ? 'open' : ''}`}>
            <button className="vds-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <ChevronDown size={16} strokeWidth={2.2} className={`vds-faq-chev ${open === i ? 'rot' : ''}`} />
            </button>
            {open === i && <p className="vds-faq-a">{f.a}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}
