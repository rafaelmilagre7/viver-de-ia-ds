import {
  ArrowRight, Check, Calendar, Users, Clock, Layers,
  MessageCircle, Quote, ChevronDown, Shield,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './lancamento-turma.css';

/* ============================================================
   Landing de lançamento de turma · página-modelo clonável
   Troque os textos em CONFIG e a landing está pronta pra subir.
   ============================================================ */

const CONFIG = {
  turma: 'Turma 2026.3',
  vagas: 30,
  fecha: '9 dias',
  inicio: '22 de maio',
  duracao: '4 meses',
  precoFull: 'R$ 4.800',
  preco12x: 'R$ 480',
};

const stats = [
  { n: '220', l: 'operadores formados' },
  { n: 'R$ 1,8M', l: 'destravado em 12 meses' },
  { n: '11.920', l: 'conversas/mês em produção' },
  { n: '90 dias', l: 'até primeiro agente no ar' },
];

const dores = [
  'Você já tentou aprender IA por conta e travou no segundo prompt.',
  'Assistiu 40 horas de YouTube e ainda não colocou nada em produção.',
  'Sabe que IA muda o jogo, mas não sabe por onde começar sem virar cursinho de prompt.',
  'Tem ideia de agente, mas não tem método pra tirar do papel e fazer gerar receita.',
];

const pilares = [
  { I: Layers, t: 'Método, não teoria', d: 'Você sai com 1 agente rodando em produção. Não com um diploma na parede.' },
  { I: Users, t: 'Mentoria 1:1', d: 'Sessões individuais com quem já construiu agente que aguenta produção real.' },
  { I: MessageCircle, t: 'Comunidade de operadores', d: '220 pessoas construindo junto · código aberto · troca real, sem guru-bro.' },
  { I: Clock, t: 'Ritmo de quem opera', d: '4 meses, conteúdo denso, sem enrolação. Pra quem precisa de resultado essa semana.' },
];

const modulos = [
  { n: '01', t: 'Fundamentos · do hype ao que entrega', d: 'O que mudou de 2022 pra cá, modelos generativos, e como separar promessa de operação real.', dur: '1h 32min' },
  { n: '02', t: 'Prompt como engenharia', d: 'Anatomia de um prompt sólido, few-shot, system prompts em escala. Engenharia, não adivinhação.', dur: '2h 14min' },
  { n: '03', t: 'Construindo agentes que aguentam produção', d: 'Tools, contrato, fallback, memória curta + persistente. O agente que não quebra com cliente real.', dur: '3h 02min' },
  { n: '04', t: 'Produção, custo, observabilidade', d: 'Deploy, monitoramento, controle de custo de token, governança. O que separa demo de operação.', dur: '2h 36min' },
];

const mentores = [
  { av: 'CR', nome: 'Caio Ribeiro', papel: 'Fundador · Viver de IA', bio: 'Construiu a Nina · 11.920 conversas/mês em produção. Mentora 220 operadores.' },
  { av: 'YA', nome: 'Yago Almeida', papel: 'Tech lead · plataforma', bio: 'Infraestrutura de agentes (Iris, Nina). VPS, observability, edge functions.' },
];

const depoimentos = [
  {
    q: 'A IA não substituiu meu time. Ela devolveu tempo pra eles fazerem o que só humanos fazem — escutar de verdade.',
    nome: 'Márisson Lage', papel: 'CEO · Efizi Soluções', av: 'ML',
  },
  {
    q: 'Saí de "experimentando IA" pra 11.920 conversas por mês em produção. Em 90 dias.',
    nome: 'Daniel Pinheiro', papel: 'Founder · Pivot Studio', av: 'DP',
  },
];

const incluso = [
  '4 meses de programa estruturado · 9h+ de conteúdo denso',
  'Mentoria 1:1 individual com Caio e equipe',
  'Comunidade ativa de 220 operadores + código aberto',
  'Lives semanais · office hours · workshops práticos',
  'Certificado de conclusão · selo Viver de IA',
  'Acesso vitalício ao material + atualizações',
];

const faq = [
  { q: 'Preciso saber programar?', a: 'Ajuda, mas não é obrigatório. O programa parte do operador que entende o negócio. A parte técnica a gente constrói junto, com mentoria.' },
  { q: 'Quanto tempo por semana preciso dedicar?', a: 'Em média 4-6 horas. Conteúdo denso, sem enrolação. Quem dedica mais, avança mais rápido — mas o ritmo é seu.' },
  { q: 'E se eu não conseguir acompanhar?', a: 'Acesso vitalício ao material. A turma tem janela definida, mas o conteúdo fica com você pra sempre. Mentoria roda durante os 4 meses.' },
  { q: 'Tem garantia?', a: 'Sim. 7 dias de garantia incondicional. Entrou, não era pra você, devolvemos 100%. Sem perguntas.' },
];

export default function ShowcaseLancamentoTurma() {
  return (
    <div className="vds-showcase lt">
      {/* NAV */}
      <header className="lt-nav">
        <BrandLogo variant="black" size="md" />
        <nav>
          <a href="#metodo">Método</a>
          <a href="#curriculo">Currículo</a>
          <a href="#mentores">Mentores</a>
          <a href="#oferta">Investimento</a>
        </nav>
        <a href="#oferta" className="lt-nav-cta">Garantir vaga</a>
      </header>

      {/* HERO */}
      <section className="lt-hero via-mesh-navy via-noise">
        <span className="lt-hero-aura-1" aria-hidden="true" />
        <span className="lt-hero-aura-2" aria-hidden="true" />
        <img src={monogramWhite} alt="" className="lt-hero-mono" />

        <div className="lt-hero-inner">
          <span className="lt-hero-pill">
            <span className="lt-hero-pill-dot" />
            {CONFIG.turma} · {CONFIG.vagas} vagas · fecha em {CONFIG.fecha}
          </span>

          <h1 className="lt-hero-h1">
            90 dias até seu primeiro agente <em>em produção</em>.
          </h1>

          <p className="lt-hero-lede">
            Formação técnico-operativa pra quem quer parar de "experimentar IA" e começar a operar. Mentoria 1:1, comunidade de 220 operadores, e um método que termina com agente rodando — não com diploma.
          </p>

          <div className="lt-hero-cta-row">
            <a href="#oferta" className="lt-cta-primary">
              Garantir minha vaga
              <ArrowRight size={16} strokeWidth={2.4} />
            </a>
            <a href="#metodo" className="lt-cta-ghost">Ver o método</a>
          </div>

          <div className="lt-hero-proof">
            <span className="lt-hero-proof-avs">
              <span className="av">CR</span>
              <span className="av">ML</span>
              <span className="av">DP</span>
              <span className="av more">+217</span>
            </span>
            <span className="lt-hero-proof-txt">220 operadores já passaram pela formação</span>
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
          <h2>4 pilares que tiram a IA <em>do hype pra produção</em>.</h2>
        </div>
        <div className="lt-pilares">
          {pilares.map((p) => {
            const Icon = p.I;
            return (
              <article key={p.t} className="lt-pilar">
                <span className="lt-pilar-icon"><Icon size={20} strokeWidth={1.7} /></span>
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
          <span className="lt-eyebrow">o que você vai construir</span>
          <h2>Currículo · <em>{CONFIG.duracao} densos</em>.</h2>
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
          <span className="lt-eyebrow">quem ensina</span>
          <h2>Mentores que <em>construíram em produção</em>.</h2>
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
          <span className="lt-eyebrow">quem já passou</span>
          <h2>Não é promessa. <em>É operação rodando</em>.</h2>
        </div>
        <div className="lt-depoimentos">
          {depoimentos.map((d) => (
            <article key={d.nome} className="lt-depoimento">
              <Quote size={28} strokeWidth={1.5} className="lt-depoimento-mark" />
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
            <h2>{CONFIG.turma} · {CONFIG.vagas} vagas.</h2>
            <p className="lt-oferta-lede">
              Começa {CONFIG.inicio}. Aplicação fecha em {CONFIG.fecha}. Não tem turma todo mês — o próximo ciclo é só no segundo semestre.
            </p>
            <ul className="lt-incluso">
              {incluso.map((i) => (
                <li key={i}>
                  <Check size={15} strokeWidth={2.4} />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lt-oferta-card">
            <span className="lt-oferta-card-eyebrow">acesso completo</span>
            <div className="lt-oferta-price">
              <span className="lt-oferta-price-from">à vista {CONFIG.precoFull}</span>
              <strong>12× {CONFIG.preco12x}</strong>
              <em>ou {CONFIG.precoFull} à vista</em>
            </div>
            <a href="#" className="lt-oferta-cta">
              Garantir minha vaga
              <ArrowRight size={16} strokeWidth={2.4} />
            </a>
            <p className="lt-oferta-guarantee">
              <Shield size={13} strokeWidth={2} />
              7 dias de garantia incondicional · devolução 100%
            </p>
            <div className="lt-oferta-meta">
              <span><Calendar size={12} strokeWidth={2.2} /> Início {CONFIG.inicio}</span>
              <span><Users size={12} strokeWidth={2.2} /> {CONFIG.vagas} vagas</span>
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
                <ChevronDown size={16} strokeWidth={2.2} />
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
          <p>{CONFIG.turma} fecha em {CONFIG.fecha}. {CONFIG.vagas} vagas. Próximo ciclo só no segundo semestre.</p>
          <a href="#" className="lt-cta-primary lg">
            Garantir minha vaga agora
            <ArrowRight size={18} strokeWidth={2.4} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lt-footer">
        <BrandLogo variant="black" size="sm" />
        <p>Formação técnico-operativa em IA · viverdeia.ai</p>
        <span>© 2026 Viver de IA</span>
      </footer>
    </div>
  );
}
