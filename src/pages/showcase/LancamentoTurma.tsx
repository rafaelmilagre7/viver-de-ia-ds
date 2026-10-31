import {
  ArrowRight, Check, Calendar, Users, Clock, Layers,
  MessageCircle, Quote, ChevronDown, Shield,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './lancamento-turma.css';

/* ============================================================
   Landing de lançamento de plano · página-modelo clonável
   Troque os textos em CONFIG e a landing está pronta pra subir.
   Números da empresa só da ficha de fatos (public/fatos.md).
   ============================================================ */

const CONFIG = {
  plano: 'Plano Pro',
  mentoria: '10 check-ins de mentoria em grupo por mês',
  contratacao: 'contratação anual',
  preco: 'R$ 3.780',
};

const stats = [
  { n: '521', l: 'cases reais de implementação' },
  { n: '157', l: 'soluções de IA prontas' },
  { n: '29', l: 'setores com implementação' },
  { n: '90 dias', l: 'de garantia · cláusula 7' },
];

const dores = [
  'Sua empresa já tentou aplicar IA por conta e travou no segundo prompt.',
  'O time assistiu 40 horas de YouTube e ainda não colocou nada em produção.',
  'Sabe que IA muda o jogo, mas não sabe por onde começar sem virar cursinho de prompt.',
  'Tem ideia de solução, mas não tem método pra tirar do papel e fazer gerar receita.',
];

const pilares = [
  { I: Layers, t: 'Soluções prontas', d: 'Soluções Plug-and-Play pra vendas, marketing, atendimento, RH e financeiro. Sem programação.' },
  { I: Users, t: 'Mentoria em grupo', d: '10 check-ins por mês no Pro, ao vivo, pra adaptar as soluções ao contexto da sua empresa.' },
  { I: MessageCircle, t: 'Comunidade de líderes', d: 'Empresários e líderes aplicando junto · benchmarking com empresas do seu setor.' },
  { I: Clock, t: 'Consultor IA 24/7', d: 'Descreva seu cenário e receba o caminho específico pro seu caso, dentro da plataforma.' },
];

const modulos = [
  { n: '01', t: 'Fundamentos · do hype ao que entrega', d: 'O que mudou de 2022 pra cá, modelos generativos, e como separar promessa de operação real.', dur: '1h 32min' },
  { n: '02', t: 'Prompt como engenharia', d: 'Anatomia de um prompt sólido, few-shot, system prompts em escala. Engenharia, não adivinhação.', dur: '2h 14min' },
  { n: '03', t: 'Construindo agentes que aguentam produção', d: 'Tools, contrato, fallback, memória curta + persistente. O agente que não quebra com cliente real.', dur: '3h 02min' },
  { n: '04', t: 'Produção, custo, observabilidade', d: 'Deploy, monitoramento, controle de custo de token, governança. O que separa demo de operação.', dur: '2h 36min' },
];

const mentores = [
  { av: 'RM', nome: 'Rafael Milagre', papel: 'Fundador · Viver de IA', bio: 'Meta pública da empresa: gerar R$ 1 bilhão em receita e economia com IA.' },
  { av: 'LR', nome: 'Luccas Riedo', papel: 'CEO · Viver de IA', bio: 'Plataforma B2B com 157 soluções prontas e 521 cases reais de implementação.' },
];

const depoimentos = [
  {
    q: 'Transformou gestão manual em eficiência digital e economiza R$ 42.000 por ano em 30 dias.',
    nome: 'Place Dreams', papel: 'Tecnologia · case real', av: 'PD',
  },
  {
    q: 'De processos manuais a R$ 120.000 de economia anual, escalando a produção de conteúdo.',
    nome: 'Trivia Studio', papel: 'Agência · case real', av: 'TS',
  },
];

const incluso = [
  'Todas as soluções Plug-and-Play · 157 soluções prontas',
  '10 check-ins por mês de mentoria em grupo ao vivo',
  'Comunidade de empresários e líderes',
  'Formações práticas · do conceito ao deploy',
  'Consultor IA dentro da plataforma',
  'Imersão presencial de implementação na sede',
];

const faq = [
  { q: 'Preciso saber programar?', a: 'Não. As soluções são plug and play, sem programação. A trilha personalizada com IA adapta o conteúdo ao nível de cada pessoa, do CEO ao analista.' },
  { q: 'Quanto tempo até ver resultado?', a: 'As equipes começam a implementar soluções já na primeira semana. A trilha de onboarding mostra o próximo passo, no ritmo da sua empresa.' },
  { q: 'Qual a diferença entre os planos?', a: 'Starter dá acesso à plataforma e à comunidade. Pro adiciona 10 check-ins por mês de mentoria em grupo. Enterprise inclui 1 hora por mês de mentoria individual e o arquiteto de soluções AI Builder.' },
  { q: 'Tem garantia?', a: 'Sim. Devolvemos 100% do investimento se, em 90 dias, sua empresa não tiver nem aumento de receita nem redução de custos operacionais, cumpridos os 3 requisitos da cláusula 7 dos termos de uso.' },
];

export default function ShowcaseLancamentoTurma() {
  return (
    <div className="vds-showcase lt">
      {/* NAV */}
      <header className="lt-nav">
        <BrandLogo variant="auto" size="md" />
        <nav>
          <a href="#metodo">Método</a>
          <a href="#curriculo">Formações</a>
          <a href="#mentores">Liderança</a>
          <a href="#oferta">Investimento</a>
        </nav>
        <a href="#oferta" className="lt-nav-cta">Assinar o Pro</a>
      </header>

      {/* HERO */}
      <section className="lt-hero via-mesh-navy via-noise">
        <span className="lt-hero-aura-1" aria-hidden="true" />
        <span className="lt-hero-aura-2" aria-hidden="true" />
        <img src={monogramWhite} alt="" className="lt-hero-mono" />

        <div className="lt-hero-inner">
          <span className="lt-hero-pill">
            <span className="lt-hero-pill-dot" />
            {CONFIG.plano} · {CONFIG.mentoria}
          </span>

          <h1 className="lt-hero-h1">
            Tire a IA do discurso e coloque <em>em operação</em>.
          </h1>

          <p className="lt-hero-lede">
            Plataforma B2B pra empresa que quer parar de "experimentar IA" e começar a operar. Soluções prontas, formações práticas, mentoria em grupo ao vivo e Consultor IA — com retorno medido.
          </p>

          <div className="lt-hero-cta-row">
            <a href="#oferta" className="lt-cta-primary">
              Assinar o Plano Pro
              <ArrowRight size={16} strokeWidth={1.75} />
            </a>
            <a href="#metodo" className="lt-cta-ghost">Ver o método</a>
          </div>

          <div className="lt-hero-proof">
            <span className="lt-hero-proof-avs">
              <span className="av">PD</span>
              <span className="av">TS</span>
              <span className="av">VN</span>
              <span className="av more">+518</span>
            </span>
            <span className="lt-hero-proof-txt">521 cases reais de implementação de IA</span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="lt-stats">
        {stats.map((s) => (
          <div key={s.l} className="lt-stat">
            <strong>{s.n}</strong>
            <em>{s.l}</em>
          </div>
        ))}
      </section>

      {/* PROBLEMA */}
      <section className="lt-section">
        <div className="lt-section-head">
          <span className="lt-eyebrow">o ponto de partida</span>
          <h2>Você reconhece <em>algum desses</em>?</h2>
        </div>
        <ul className="lt-dores">
          {dores.map((d, i) => (
            <li key={i}>
              <span className="lt-dor-num">{String(i + 1).padStart(2, '0')}</span>
              <p>{d}</p>
            </li>
          ))}
        </ul>
        <p className="lt-dores-fecho">
          Se marcou pelo menos um, <strong>o problema não é você</strong> — é a falta de método. É exatamente isso que a gente resolve.
        </p>
      </section>

      {/* MÉTODO */}
      <section className="lt-section" id="metodo">
        <div className="lt-section-head">
          <span className="lt-eyebrow">como funciona</span>
          <h2>4 pilares que tiram a IA <em>do discurso pra operação</em>.</h2>
        </div>
        <div className="lt-pilares">
          {pilares.map((p) => {
            const Icon = p.I;
            return (
              <article key={p.t} className="lt-pilar">
                <span className="lt-pilar-icon"><Icon size={20} strokeWidth={1.75} /></span>
                <strong>{p.t}</strong>
                <p>{p.d}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CURRÍCULO */}
      <section className="lt-section" id="curriculo">
        <div className="lt-section-head">
          <span className="lt-eyebrow">formações práticas</span>
          <h2>Formação · <em>Agentes de IA</em>.</h2>
        </div>
        <div className="lt-modulos">
          {modulos.map((m) => (
            <article key={m.n} className="lt-modulo">
              <span className="lt-modulo-num">{m.n}</span>
              <div className="lt-modulo-body">
                <strong>{m.t}</strong>
                <p>{m.d}</p>
              </div>
              <span className="lt-modulo-dur">{m.dur}</span>
            </article>
          ))}
        </div>
      </section>

      {/* MENTORES */}
      <section className="lt-section" id="mentores">
        <div className="lt-section-head">
          <span className="lt-eyebrow">quem lidera</span>
          <h2>Quem está por trás <em>da Viver de IA</em>.</h2>
        </div>
        <div className="lt-mentores">
          {mentores.map((m) => (
            <article key={m.nome} className="lt-mentor">
              <div className="lt-mentor-av">{m.av}</div>
              <div>
                <strong>{m.nome}</strong>
                <em>{m.papel}</em>
                <p>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="lt-section">
        <div className="lt-section-head">
          <span className="lt-eyebrow">cases reais · viverdeia.ai/cases</span>
          <h2>Não é promessa. <em>É operação rodando</em>.</h2>
        </div>
        <div className="lt-depoimentos">
          {depoimentos.map((d) => (
            <article key={d.nome} className="lt-depoimento">
              <Quote size={24} strokeWidth={1.75} className="lt-depoimento-mark" />
              <blockquote>{d.q}</blockquote>
              <footer>
                <span className="lt-depoimento-av">{d.av}</span>
                <div>
                  <strong>{d.nome}</strong>
                  <em>{d.papel}</em>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* OFERTA / PRICING */}
      <section className="lt-oferta via-mesh-navy via-noise" id="oferta">
        <span className="lt-oferta-aura" aria-hidden="true" />
        <div className="lt-oferta-inner">
          <div className="lt-oferta-l">
            <span className="lt-eyebrow on-dark">o investimento</span>
            <h2>{CONFIG.plano} · {CONFIG.contratacao}.</h2>
            <p className="lt-oferta-lede">
              Acesso à plataforma no dia da adesão. Trilha de onboarding na primeira semana. Upgrade pro Enterprise a qualquer momento, pela diferença de valor.
            </p>
            <ul className="lt-incluso">
              {incluso.map((i) => (
                <li key={i}>
                  <Check size={16} strokeWidth={1.75} />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lt-oferta-card">
            <span className="lt-oferta-card-eyebrow">plano pro</span>
            <div className="lt-oferta-price">
              <span className="lt-oferta-price-from">{CONFIG.contratacao}</span>
              <strong>{CONFIG.preco}/mês</strong>
              <em>{CONFIG.mentoria}</em>
            </div>
            <a href="#" className="lt-oferta-cta">
              Assinar o Plano Pro
              <ArrowRight size={16} strokeWidth={1.75} />
            </a>
            <p className="lt-oferta-guarantee">
              <Shield size={14} strokeWidth={1.75} />
              Garantia de 90 dias · 100% de volta · cláusula 7
            </p>
            <div className="lt-oferta-meta">
              <span><Calendar size={14} strokeWidth={1.75} /> Imersão presencial na sede</span>
              <span><Users size={14} strokeWidth={1.75} /> Comunidade de líderes</span>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="lt-section" id="faq">
        <div className="lt-section-head">
          <span className="lt-eyebrow">antes de decidir</span>
          <h2>Perguntas <em>que todo mundo faz</em>.</h2>
        </div>
        <div className="lt-faq">
          {faq.map((f, i) => (
            <details key={i} className="lt-faq-item" open={i === 0}>
              <summary>
                {f.q}
                <ChevronDown size={16} strokeWidth={1.75} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="lt-final via-mesh-navy via-noise">
        <span className="lt-final-aura" aria-hidden="true" />
        <div className="lt-final-inner">
          <h2>Em 2026, operador que não opera IA, <em>não opera</em>.</h2>
          <p>{CONFIG.plano} · {CONFIG.preco} por mês em {CONFIG.contratacao}. Garantia de 90 dias, cláusula 7.</p>
          <a href="#" className="lt-cta-primary lg">
            Assinar o Plano Pro agora
            <ArrowRight size={16} strokeWidth={1.75} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lt-footer">
        <BrandLogo variant="auto" size="sm" />
        <p>Plataforma de implementação de IA · viverdeia.ai</p>
        <span>© 2026 Viver de IA</span>
      </footer>
    </div>
  );
}
