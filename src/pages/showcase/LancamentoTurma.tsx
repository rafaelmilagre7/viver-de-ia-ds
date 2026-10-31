import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Shield, Search,
  TrendingUp, Headphones, Megaphone, UserCheck, Wallet, Target, MessageSquare, Receipt,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './lancamento-turma.css';

/* ============================================================
   Landing de lançamento de plano · página-modelo clonável
   Troque os textos em CONFIG e a landing está pronta pra subir.
   Números do negócio SÓ da ficha de fatos (public/fatos.md):
   o que não estiver lá vira placeholder ([N], R$ [valor], [data]).
   Cases citados: números da página de cada case em viverdeia.ai/cases.
   ============================================================ */

const CONFIG = {
  plano: 'Plano Pro',
  preco: 'R$\u00A03.780',
  contratacao: 'contratação anual',
  mentoria: '10 check-ins por mês de mentoria em grupo',
};

const GARANTIA =
  'Devolvemos 100% do investimento se, em 90 dias, sua empresa não tiver nem aumento de receita nem redução de custos operacionais.';
const GARANTIA_REQUISITOS =
  'Para ter direito, é preciso cumprir três requisitos no mesmo prazo: concluir a trilha de onboarding, concluir 3 formações e implementar as 3 soluções escolhidas na adesão. Condições completas na cláusula 7 dos termos de uso.';

const dores = [
  'Sua empresa já tentou aplicar IA por conta e parou nos primeiros testes.',
  'O time assistiu horas de vídeo e ainda não colocou nada em produção.',
  'Você sabe que IA muda o jogo, mas não sabe por onde começar sem virar cursinho de prompt.',
  'Tem ideia de solução, mas falta método pra tirar do papel e fazer gerar receita.',
];

/* Mockup da biblioteca de soluções · nomes ilustrativos (não são números do negócio) */
const solucoes = [
  { I: TrendingUp, t: 'Qualificação de leads no WhatsApp', a: 'Vendas' },
  { I: Headphones, t: 'Resposta a tickets com base de conhecimento', a: 'Atendimento' },
  { I: Megaphone, t: 'Calendário de conteúdo com IA', a: 'Marketing' },
  { I: UserCheck, t: 'Triagem de currículos', a: 'RH' },
  { I: Wallet, t: 'Conciliação de pagamentos', a: 'Financeiro' },
  { I: Target, t: 'Roteiro de abordagem comercial', a: 'Vendas' },
  { I: MessageSquare, t: 'Pesquisa de satisfação automatizada', a: 'Atendimento' },
  { I: Receipt, t: 'Leitura e lançamento de notas fiscais', a: 'Financeiro' },
];

const passos = [
  { t: 'Na adesão', d: 'Você escolhe as 3 soluções que a empresa vai implementar.' },
  { t: 'Trilha de onboarding', d: 'A trilha personalizada com IA mostra o próximo passo no nível de cada pessoa, do CEO ao analista.' },
  {
    t: '3 formações práticas',
    d: 'Do conceito ao deploy. Exemplo, Formação Agentes de IA:',
    chips: ['Fundamentos', 'Prompt como engenharia', 'Agentes em produção', 'Custo e observabilidade'],
  },
  { t: '3 soluções em operação', d: 'Com mentoria em grupo pra adaptar cada solução ao contexto da sua empresa.' },
];

/* Cases do site oficial · o valor de cada case não está na ficha → placeholder */
const cases = [
  { q: 'Transformou gestão manual em eficiência digital e economiza R$\u00A042.000 por ano em 30 dias.', nome: 'Place Dreams', setor: 'Tecnologia' },
  { q: 'De processos manuais a R$\u00A0120.000 de economia anual, escalando a produção de conteúdo.', nome: 'Trivia Studio', setor: 'Agência' },
];

const lideres = [
  { ini: 'YM', nome: 'Yago Martins', papel: 'Co-fundador' },
  { ini: 'LR', nome: 'Luccas Riedo', papel: 'CEO' },
];

const planos = [
  { id: 'starter', nome: 'Starter', preco: 'R$\u00A02.580', mentoria: 'Plataforma e comunidade', extra: 'Soluções prontas, formações e Consultor IA', cta: 'Assinar o Starter' },
  { id: 'pro', nome: 'Pro', preco: 'R$\u00A03.780', mentoria: 'Mentoria em grupo · 10 check-ins por mês', extra: 'Tudo do Starter', cta: 'Assinar o Plano Pro', destaque: true },
  { id: 'enterprise', nome: 'Enterprise', preco: 'R$\u00A06.180', mentoria: 'Mentoria individual · 1 hora por mês', extra: 'Arquiteto de soluções AI Builder', cta: 'Assinar o Enterprise' },
];

const incluso = [
  'Todas as soluções plug and play · 157 soluções prontas',
  '10 check-ins por mês de mentoria em grupo ao vivo',
  'Comunidade de empresários e líderes',
  'Formações práticas, do conceito ao deploy',
  'Consultor IA dentro da plataforma',
  'Imersão presencial de implementação na sede',
];

const faq = [
  { q: 'Preciso saber programar?', a: 'Não. As soluções são plug and play, sem programação. A trilha personalizada com IA adapta o conteúdo ao nível de cada pessoa, do CEO ao analista.' },
  { q: 'Quanto tempo até ver resultado?', a: 'A trilha de onboarding mostra o próximo passo desde a adesão, no ritmo da sua empresa. A garantia mede o resultado em 90 dias: aumento de receita ou redução de custos operacionais.' },
  { q: 'Qual a diferença entre os planos?', a: 'Starter dá acesso à plataforma e à comunidade. Pro adiciona 10 check-ins por mês de mentoria em grupo. Enterprise inclui 1 hora por mês de mentoria individual e o arquiteto de soluções AI Builder.' },
  { q: 'Tem garantia?', a: `Sim. ${GARANTIA} ${GARANTIA_REQUISITOS}` },
];

function SectionHead({ eyebrow, title, lede, id }: { eyebrow: string; title: string; lede?: string; id: string }) {
  return (
    <header className="lt-head">
      <div>
        <span className="lt-eyebrow">{eyebrow}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {lede && <p className="lt-head-lede">{lede}</p>}
    </header>
  );
}

export default function ShowcaseLancamentoTurma() {
  return (
    <div className="vds-showcase lt">
      {/* NAV */}
      <header className="lt-nav">
        <BrandLogo variant="auto" size="md" />
        <nav aria-label="Seções da página">
          <a className="lt-nav-link" href="#metodo">Método</a>
          <a className="lt-nav-link" href="#caminho">Formações</a>
          <a className="lt-nav-link" href="#lideranca">Liderança</a>
          <a className="lt-nav-link" href="#oferta">Investimento</a>
        </nav>
        <a href="#oferta" className="lt-nav-cta">Assinar o Pro</a>
      </header>

      {/* HERO · claro, assimétrico */}
      <section className="lt-hero" aria-labelledby="lt-h1">
        <div className="lt-wrap lt-hero-grid">
          <div className="lt-hero-copy">
            <span className="lt-pill">{CONFIG.plano} · com mentoria em grupo</span>
            <h1 id="lt-h1" className="lt-hero-h1">Tire a IA do discurso e coloque em operação.</h1>
            <p className="lt-hero-lede">
              Plataforma B2B pra empresa que quer parar de “experimentar IA” e começar a operar: soluções prontas, formações práticas, mentoria em grupo ao vivo e Consultor IA, com retorno medido.
            </p>
            <div className="lt-cta-row">
              <a href="#oferta" className="lt-btn lt-btn--primary">
                Assinar o {CONFIG.plano}
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href="#metodo" className="lt-btn lt-btn--secondary">Ver o método</a>
            </div>
            <ul className="lt-hero-meta">
              {['Sem programação', 'Contratação anual', 'Garantia de 90 dias'].map((m) => (
                <li key={m}><Check size={14} strokeWidth={1.75} aria-hidden="true" />{m}</li>
              ))}
            </ul>
          </div>

          <aside className="via-tile lt-spec" aria-label={`Resumo do ${CONFIG.plano}`}>
            <div className="lt-spec-top">
              <span className="lt-eyebrow">{CONFIG.plano}</span>
              <span className="lt-spec-tag">{CONFIG.contratacao}</span>
            </div>
            <p className="lt-price">
              <span className="lt-price-cur">R$</span>
              <span className="lt-price-val">{CONFIG.preco.replace(/^R\$\s/, '')}</span>
              <span className="lt-price-per">/mês</span>
            </p>
            <p className="lt-spec-sub">Inclui {CONFIG.mentoria}.</p>
            <ul className="lt-checks">
              <li><Check size={16} strokeWidth={1.75} aria-hidden="true" />157 soluções de IA prontas para usar</li>
              <li><Check size={16} strokeWidth={1.75} aria-hidden="true" />Formações práticas, do conceito ao deploy</li>
              <li><Check size={16} strokeWidth={1.75} aria-hidden="true" />Comunidade de empresários e líderes</li>
              <li><Check size={16} strokeWidth={1.75} aria-hidden="true" />Consultor IA dentro da plataforma</li>
            </ul>
            <div className="lt-spec-foot">
              <span><Shield size={14} strokeWidth={1.75} aria-hidden="true" /> Garantia de 90 dias · cláusula 7</span>
              <a className="lt-link" href="#oferta">Comparar planos</a>
            </div>
          </aside>
        </div>
      </section>

      {/* PROBLEMA · lista tipográfica */}
      <section className="lt-section" aria-labelledby="lt-dores">
        <div className="lt-wrap">
          <SectionHead
            id="lt-dores"
            eyebrow="o ponto de partida"
            title="Você reconhece algum desses?"
            lede="Quatro sinais de que falta método, não ferramenta."
          />
          <ol className="lt-dores">
            {dores.map((d, i) => (
              <li key={d}>
                <span className="lt-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <p className="lt-dores-fecho">
            Se marcou pelo menos um, <strong>o problema não é você</strong>. É a falta de método, e é isso que a gente resolve.
          </p>
        </div>
      </section>

      {/* MÉTODO · bento */}
      <section className="lt-section lt-section--band" id="metodo" aria-labelledby="lt-metodo">
        <div className="lt-wrap">
          <SectionHead
            id="lt-metodo"
            eyebrow="como funciona"
            title="Quatro pilares que tiram a IA do discurso."
            lede="Soluções prontas pra aplicar, gente pra adaptar ao seu contexto e um consultor que conhece o seu caso."
          />
          <div className="lt-bento">
            <article className="via-tile via-tile--atmos lt-tile lt-tile--hero">
              <div className="lt-tile-text">
                <p className="lt-num">157</p>
                <p className="lt-num-cap">soluções de IA prontas para usar</p>
                <h3>Soluções prontas</h3>
                <p>Plug and play pra vendas, marketing, atendimento, RH e financeiro. Sem programação.</p>
              </div>
              <div className="lt-mock" role="img" aria-label="Prévia da biblioteca de soluções da plataforma">
                <div className="lt-mock-win" aria-hidden="true">
                  <div className="lt-mock-bar">
                    <span className="lt-mock-dots"><i /><i /><i /></span>
                    <span className="lt-mock-url">viverdeia.ai · soluções</span>
                  </div>
                  <div className="lt-mock-body">
                    <div className="lt-mock-head">
                      <b>Soluções</b>
                      <span className="lt-mock-count">157</span>
                      <span className="lt-mock-search"><Search size={12} strokeWidth={1.75} /> Buscar solução</span>
                    </div>
                    <div className="lt-mock-tabs">
                      <span className="on">Todas</span><span>Vendas</span><span>Marketing</span><span>Atendimento</span><span>RH</span>
                    </div>
                    <ul className="lt-mock-list">
                      {solucoes.map(({ I, t, a }) => (
                        <li key={t}>
                          <span className="lt-mock-ic"><I size={14} strokeWidth={1.75} /></span>
                          <span className="lt-mock-txt"><b>{t}</b><em>{a}</em></span>
                          <span className="lt-mock-btn">Implementar</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <article className="via-tile via-tile--atmos lt-tile">
              <p className="lt-num">10</p>
              <p className="lt-num-cap">check-ins por mês no plano Pro</p>
              <h3>Mentoria em grupo</h3>
              <p>Ao vivo, pra adaptar as soluções ao contexto da sua empresa.</p>
            </article>

            <article className="via-tile via-tile--atmos lt-tile lt-tile--chat">
              <h3>Consultor IA</h3>
              <p>Descreva seu cenário e receba o caminho específico pro seu caso, dentro da plataforma.</p>
              <div className="lt-chat" role="img" aria-label="Exemplo de conversa com o Consultor IA">
                <span className="lt-chat-q" aria-hidden="true">Perco lead no WhatsApp fora do horário comercial. Por onde começo?</span>
                <span className="lt-chat-a" aria-hidden="true">Comece pela qualificação de leads. Mostro o passo a passo pro seu caso.</span>
              </div>
            </article>

            <article className="via-tile via-tile--atmos lt-tile">
              <p className="lt-num">29</p>
              <p className="lt-num-cap">setores já transformados com IA</p>
              <h3>Comunidade de líderes</h3>
              <p>Empresários e líderes aplicando junto, com benchmarking de empresas do seu setor.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CAMINHO · linha do tempo */}
      <section className="lt-section" id="caminho" aria-labelledby="lt-caminho">
        <div className="lt-wrap">
          <SectionHead
            id="lt-caminho"
            eyebrow="da adesão ao resultado"
            title="Os 90 dias, passo a passo."
            lede="O caminho é o mesmo que dá direito à garantia: onboarding, 3 formações e 3 soluções implementadas."
          />
          <ol className="lt-steps">
            {passos.map((p, i) => (
              <li key={p.t} className="lt-step">
                <span className="lt-step-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                {p.chips && (
                  <ul className="lt-step-chips">
                    {p.chips.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <div className="lt-steps-end">
            <p className="lt-steps-end-num">90 dias</p>
            <div>
              <p className="lt-steps-end-txt">{GARANTIA}</p>
              <p className="lt-steps-end-note">Condições completas na cláusula 7 dos termos de uso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROVA · número gigante + cases */}
      <section className="lt-section lt-prova" aria-labelledby="lt-prova">
        <div className="lt-wrap lt-prova-grid">
          <div className="lt-prova-l">
            <span className="lt-eyebrow">cases reais</span>
            <h2 id="lt-prova" className="lt-giant">
              <span className="lt-giant-num">521</span>{' '}
              <span className="lt-giant-cap">cases reais de implementação de IA em empresas brasileiras.</span>
            </h2>
            <a className="lt-link" href="https://viverdeia.ai/cases" target="_blank" rel="noreferrer">
              Ver os cases em viverdeia.ai/cases
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
          <div className="lt-quotes">
            {cases.map((c) => (
              <figure key={c.nome} className="lt-quote">
                <blockquote>“{c.q}”</blockquote>
                <figcaption><strong>{c.nome}</strong> · {c.setor} · case real</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LIDERANÇA · foto do fundador */}
      <section className="lt-section lt-section--band" id="lideranca" aria-labelledby="lt-lideranca">
        <div className="lt-wrap lt-lid-grid">
          <figure className="via-photo via-photo--duotone via-photo--scrim lt-lid-photo">
            <picture>
              <source srcSet="/fotos/rafael-milagre.webp" type="image/webp" />
              <img
                src="/fotos/rafael-milagre.jpg"
                alt="Retrato de Rafael Milagre, sorrindo, de camiseta clara"
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="via-photo__caption">
              <strong>Rafael Milagre</strong>
              <span>Fundador · Viver de IA</span>
            </figcaption>
          </figure>

          <div className="lt-lid-copy">
            <span className="lt-eyebrow">quem lidera</span>
            <h2 id="lt-lideranca">Quem está por trás da Viver de IA.</h2>
            <div className="lt-meta-goal">
              <p className="lt-meta-goal-num">R$&nbsp;1 bilhão</p>
              <p className="lt-meta-goal-txt">em receita e economia para empresas com IA.</p>
              <p className="lt-meta-goal-note">Meta pública da empresa. É meta, não resultado.</p>
            </div>
            <ul className="lt-lideres">
              {lideres.map((l) => (
                <li key={l.nome}>
                  <span className="lt-mono" aria-hidden="true">{l.ini}</span>
                  <span><strong>{l.nome}</strong><em>{l.papel}</em></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OFERTA · planos */}
      <section className="lt-section" id="oferta" aria-labelledby="lt-oferta">
        <div className="lt-wrap">
          <SectionHead
            id="lt-oferta"
            eyebrow="o investimento"
            title="Três planos, todos em contratação anual."
            lede="Todos com a plataforma e a comunidade. A diferença está na mentoria."
          />
          <div className="via-tile lt-plans">
            {planos.map((p) => (
              <article key={p.id} className={`lt-plan${p.destaque ? ' is-pro' : ''}`} aria-labelledby={`lt-plan-${p.id}`}>
                <div className="lt-plan-top">
                  <h3 id={`lt-plan-${p.id}`}>{p.nome}</h3>
                  {p.destaque && <span className="lt-spec-tag">o plano desta página</span>}
                </div>
                <p className="lt-price lt-price--md">
                  <span className="lt-price-cur">R$</span>
                  <span className="lt-price-val">{p.preco.replace(/^R\$\s/, '')}</span>
                  <span className="lt-price-per">/mês</span>
                </p>
                <p className="lt-plan-sub">em contratação anual</p>
                <ul className="lt-plan-list">
                  <li><Check size={16} strokeWidth={1.75} aria-hidden="true" />{p.mentoria}</li>
                  <li><Check size={16} strokeWidth={1.75} aria-hidden="true" />{p.extra}</li>
                </ul>
                <a href="#" className={`lt-btn ${p.destaque ? 'lt-btn--primary' : 'lt-btn--secondary'} lt-btn--block`}>
                  {p.cta}
                  {p.destaque && <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
                </a>
              </article>
            ))}
          </div>

          <div className="lt-oferta-foot">
            <div>
              <h3 className="lt-h3">O {CONFIG.plano} inclui</h3>
              <ul className="lt-checks lt-checks--2col">
                {incluso.map((i) => (
                  <li key={i}><Check size={16} strokeWidth={1.75} aria-hidden="true" />{i}</li>
                ))}
              </ul>
            </div>
            <div className="lt-garantia">
              <span className="lt-garantia-ic" aria-hidden="true"><Shield size={20} strokeWidth={1.75} /></span>
              <h3 className="lt-h3">Garantia de 90 dias</h3>
              <p>{GARANTIA}</p>
              <p className="lt-garantia-req">{GARANTIA_REQUISITOS}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lt-section lt-section--tight" id="faq" aria-labelledby="lt-faq">
        <div className="lt-wrap lt-faq-grid">
          <div>
            <span className="lt-eyebrow">antes de decidir</span>
            <h2 id="lt-faq" className="lt-faq-title">Perguntas que todo mundo faz.</h2>
          </div>
          <div className="lt-faq">
            {faq.map((f, i) => (
              <details key={f.q} className="lt-faq-item" open={i === 0}>
                <summary>
                  {f.q}
                  <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FECHAMENTO · o único momento navy */}
      <section className="lt-final-wrap" aria-labelledby="lt-final">
        <div className="lt-wrap">
          <div className="lt-final via-mesh-navy via-noise">
            <span className="lt-eyebrow lt-eyebrow--on-dark">{CONFIG.plano} · {CONFIG.contratacao}</span>
            <h2 id="lt-final">Do discurso à operação, <em>com método</em>.</h2>
            <div className="lt-final-row">
              <p>
                <strong>{CONFIG.preco} por mês</strong>, em {CONFIG.contratacao}. Inclui {CONFIG.mentoria}. Garantia de 90 dias, condições na cláusula 7 dos termos de uso.
              </p>
              <a href="#" className="lt-btn lt-btn--on-dark">
                Assinar o {CONFIG.plano}
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lt-footer">
        <BrandLogo variant="auto" size="sm" />
        <p>Plataforma de implementação de IA · viverdeia.ai</p>
      </footer>
    </div>
  );
}
