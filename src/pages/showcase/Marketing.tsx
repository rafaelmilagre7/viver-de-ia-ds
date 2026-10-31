import {
  ArrowRight, ArrowUpRight, Bot, GraduationCap, Headphones, House, LayoutGrid,
  MessageSquare, Search, Shield, TrendingUp, Users, Wallet,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import { useScrollEdge } from '../../layout/useScrollEdge';
import ShowcaseMenu from './ShowcaseMenu';
import './marketing.css';

/* ============================================================
   Site institucional · página-modelo clonável
   Ordem da história: o que é → como funciona → prova → quem está
   por trás → planos → fechamento (o único momento navy).
   Números do negócio SÓ da ficha (public/fatos.md), na frase pronta.
   Cases: número publicado na página de cada case em viverdeia.ai/cases.
   ============================================================ */

const GARANTIA =
  'Devolvemos 100% do investimento se, em 90 dias, sua empresa não tiver nem aumento de receita nem redução de custos operacionais.';
const GARANTIA_REQUISITOS =
  'Para ter direito, é preciso cumprir três requisitos no mesmo prazo: concluir a trilha de onboarding, concluir 3 formações e implementar as 3 soluções escolhidas na adesão. Condições completas na cláusula 7 dos termos de uso.';

const navItems = [
  { label: 'A empresa', href: '#empresa' },
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Cases', href: '#cases' },
  { label: 'Quem somos', href: '#quem-somos' },
  { label: 'Planos', href: '#planos' },
];

const dentro = [
  { t: 'Soluções prontas', d: 'Plug and play pra vendas, marketing, atendimento, RH e financeiro. Sem programação.' },
  { t: 'Formações práticas', d: 'Do conceito ao deploy, no nível de cada pessoa do time, do CEO ao analista.' },
  { t: 'Mentoria ao vivo', d: 'Em grupo no plano Pro, individual no Enterprise, pra adaptar cada solução ao seu contexto.' },
  { t: 'Comunidade de líderes', d: 'Lideranças de empresas aplicando junto, com troca entre negócios do mesmo setor.' },
];

const passos = [
  { t: 'Você escolhe as 3 soluções', d: 'Na adesão, a empresa define as 3 soluções que vai colocar em operação primeiro.' },
  { t: 'A trilha mostra o próximo passo', d: 'Onboarding personalizado com IA, no nível de cada pessoa, do CEO ao analista.' },
  { t: 'O time aprende fazendo', d: 'Formações práticas, do conceito ao deploy, em cima das soluções prontas da plataforma.' },
  { t: 'A mentoria ajusta ao seu caso', d: 'Mentoria em grupo ao vivo e o Consultor IA dentro da plataforma pra o dia a dia.' },
];

/* Mockup · nomes ilustrativos de soluções (não são números do negócio) */
const mockSolucoes = [
  { I: TrendingUp, t: 'Qualificação de leads no WhatsApp', a: 'Vendas', s: 'Em operação', on: true },
  { I: Headphones, t: 'Resposta a tickets com base de conhecimento', a: 'Atendimento', s: 'Implementando' },
  { I: Wallet, t: 'Conciliação de pagamentos', a: 'Financeiro', s: 'A seguir' },
];

/* Os 4 cases · texto e número das páginas de case do site oficial */
const destaque = { c: 'Viva Nexo', s: 'Saúde', h: 'De 6h para cliques.', m: 'R$\u00A0162.000', l: 'de economia' };
const cases = [
  { c: 'Trivia Studio', s: 'Agência', h: 'De processos manuais à produção de conteúdo em escala.', m: 'R$\u00A0120.000', l: 'de economia anual' },
  { c: 'Place Dreams', s: 'Tecnologia', h: 'Gestão manual transformada em eficiência digital em 30 dias.', m: 'R$\u00A042.000', l: 'de economia por ano' },
  { c: 'Pasetti Viagens', s: 'Turismo', h: 'Atendimento com IA no turismo.', m: '24h', l: 'de atendimento' },
];

const lideres = [
  { nome: 'Rafael Milagre', papel: 'Fundador' },
  { nome: 'Yago Martins', papel: 'Co-fundador' },
  { nome: 'Luccas Riedo', papel: 'CEO' },
];

const planos = [
  { id: 'starter', nome: 'Starter', preco: '2.580', inclui: 'O plano de entrada da plataforma.' },
  { id: 'pro', nome: 'Pro', preco: '3.780', inclui: 'Inclui mentoria em grupo: 10 check-ins por mês.', destaque: true },
  { id: 'enterprise', nome: 'Enterprise', preco: '6.180', inclui: 'Inclui mentoria individual: 1 hora por mês.' },
];

export default function ShowcaseMarketing() {
  const navEdgeRef = useScrollEdge<HTMLElement>();
  return (
    <div className="vds-showcase mk">
      <header ref={navEdgeRef} className="mk-nav">
        <BrandLogo variant="auto" size="md" />
        <nav aria-label="Seções do site">
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className="mk-nav-link">{n.label}</a>
          ))}
        </nav>
        <ShowcaseMenu items={navItems} />
        <a href="#planos" className="mk-nav-cta">Ver os planos</a>
      </header>

      {/* HERO · a força da página: tipografia grande + vidro com cases */}
      <section className="mk-hero" aria-labelledby="mk-h1">
        <div className="mk-hero-atmos" aria-hidden="true" />
        <div className="mk-wrap mk-hero-grid">
          <div>
            <span className="mk-pill">
              <span className="mk-pill-dot" aria-hidden="true" />
              Plano Pro · mentoria em grupo ao vivo
            </span>
            <h1 id="mk-h1">Viver de <em>IA</em>,<br />não de <em>prompt</em>.</h1>
            <p className="mk-lede">
              Soluções prontas, formações, mentoria e comunidade para empresas que precisam
              transformar inteligência artificial em resultado mensurável: receita, margem,
              autonomia. Não em demo bonita.
            </p>
            <div className="mk-actions">
              <a href="#planos" className="mk-btn mk-btn--primary">
                Ver os planos <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href="#cases" className="mk-btn mk-btn--glass">Ver os 521 cases</a>
            </div>
          </div>

          <aside className="mk-stack" aria-label="Resultados de cases reais">
            <div className="mk-g mk-g--1">
              <span className="mk-g-lbl">Economia anual</span>
              <p className="mk-g-num">R$&nbsp;120.000</p>
              <p className="mk-g-sub"><strong>Trivia Studio</strong> · produção de conteúdo</p>
            </div>
            <div className="mk-g mk-g--2">
              <span className="mk-g-lbl">Economia gerada</span>
              <p className="mk-g-num">R$&nbsp;42.000<span className="mk-g-suf">/ano</span></p>
              <p className="mk-g-sub"><strong>Place Dreams</strong> · em 30 dias</p>
            </div>
            <div className="mk-g mk-g--3">
              <span className="mk-g-lbl">Atendimento</span>
              <p className="mk-g-num">24h<span className="mk-g-suf">com IA</span></p>
              <p className="mk-g-sub"><strong>Pasetti Viagens</strong> · turismo</p>
            </div>
          </aside>
        </div>
      </section>

      {/* A EMPRESA · afirmação editorial + o que tem dentro */}
      <section className="mk-sec" id="empresa" aria-labelledby="mk-empresa">
        <div className="mk-wrap">
          <span className="mk-eyebrow">a viver de ia</span>
          <h2 id="mk-empresa" className="mk-statement">
            Implementação de IA para empresas, do primeiro caso de uso à operação do dia a dia.
          </h2>
          <div className="mk-about">
            <p className="mk-about-lede">
              A Viver de IA reúne soluções prontas, formações práticas, mentoria ao vivo e uma
              comunidade de líderes numa plataforma só. A régua é uma: a IA tem que aparecer na
              receita ou no custo da empresa, não na apresentação.
            </p>
            <ul className="mk-dentro">
              {dentro.map((i) => (
                <li key={i.t}>
                  <h3>{i.t}</h3>
                  <p>{i.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA · passos + prévia da plataforma */}
      <section className="mk-sec mk-sec--band" id="plataforma" aria-labelledby="mk-plataforma">
        <div className="mk-wrap mk-how">
          <div className="mk-how-copy">
            <span className="mk-eyebrow">como funciona</span>
            <h2 id="mk-plataforma" className="mk-h2">Um método, uma plataforma e gente junto.</h2>
            <ol className="mk-steps">
              {passos.map((p, i) => (
                <li key={p.t}>
                  <span className="mk-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="mk-app"
            role="img"
            aria-label="Prévia da plataforma: a trilha de implementação com as 3 soluções escolhidas, o próximo check-in de mentoria e o Consultor IA"
          >
            <div className="mk-app-win" aria-hidden="true">
              <div className="mk-app-bar">
                <span className="mk-app-dots"><i /><i /><i /></span>
                <span className="mk-app-url">viverdeia.ai · minha trilha</span>
              </div>
              <div className="mk-app-body">
                <div className="mk-app-side">
                  <span className="mk-app-brand"><i />Viver de IA</span>
                  <span className="on"><House size={14} strokeWidth={1.75} />Início</span>
                  <span><LayoutGrid size={14} strokeWidth={1.75} />Soluções<b>157</b></span>
                  <span><GraduationCap size={14} strokeWidth={1.75} />Formações</span>
                  <span><Users size={14} strokeWidth={1.75} />Mentoria</span>
                  <span><MessageSquare size={14} strokeWidth={1.75} />Comunidade</span>
                  <span><Bot size={14} strokeWidth={1.75} />Consultor IA</span>
                </div>
                <div className="mk-app-main">
                  <div className="mk-app-head">
                    <div>
                      <small>Trilha de implementação</small>
                      <b>Seus primeiros 90 dias</b>
                    </div>
                    <span className="mk-app-chip">Etapa 2 de 3</span>
                  </div>
                  <div className="mk-app-stages">
                    <span className="done"><i />Onboarding</span>
                    <span className="now"><i />3 formações</span>
                    <span><i />3 soluções</span>
                  </div>
                  <div className="mk-app-card">
                    <small>Soluções escolhidas na adesão</small>
                    {mockSolucoes.map(({ I, t, a, s, on }) => (
                      <div key={t} className="mk-app-row">
                        <span className="mk-app-ic"><I size={13} strokeWidth={1.75} /></span>
                        <span className="mk-app-txt"><b>{t}</b><em>{a}</em></span>
                        <span className={on ? 'mk-app-st on' : 'mk-app-st'}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mk-app-card mk-app-live">
                    <span className="mk-app-live-ic"><Users size={14} strokeWidth={1.75} /></span>
                    <span className="mk-app-txt">
                      <b>Próximo check-in · mentoria em grupo</b>
                      <em>Ao vivo, com o caso da sua empresa na pauta</em>
                    </span>
                    <span className="mk-app-btn">Entrar na sala</span>
                  </div>
                  <div className="mk-app-ask">
                    <Search size={13} strokeWidth={1.75} />
                    <span>Pergunte ao Consultor IA sobre o seu caso</span>
                    <span className="mk-app-send"><ArrowRight size={12} strokeWidth={2} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROVA · o momento tipográfico + os 4 cases */}
      <section className="mk-sec" id="cases" aria-labelledby="mk-prova">
        <div className="mk-wrap">
          <span className="mk-eyebrow">a prova</span>
          <div className="mk-figures">
            <h2 id="mk-prova" className="mk-fig-lead">
              <span className="mk-fig-giant">521</span>{' '}
              <span className="mk-fig-cap">cases reais de implementação de IA em empresas brasileiras.</span>
            </h2>
            <ul className="mk-fig-side">
              <li><span className="mk-fig-num">157</span><span>soluções de IA prontas para usar</span></li>
              <li><span className="mk-fig-num">29</span><span>setores já transformados com IA</span></li>
            </ul>
          </div>

          <div className="mk-cases-head">
            <p>Quatro desses cases, com o resultado publicado na página de cada um.</p>
            <a className="mk-link" href="https://viverdeia.ai/cases" target="_blank" rel="noreferrer">
              Ver todos em viverdeia.ai/cases
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>

          <div className="mk-cases">
            <article className="via-tile via-tile--atmos mk-feat" aria-labelledby="mk-case-0">
              <div className="mk-case-meta">
                <h3 id="mk-case-0">{destaque.c}</h3>
                <span className="mk-sector">{destaque.s}</span>
              </div>
              <p className="mk-feat-h">{destaque.h}</p>
              <p className="mk-feat-num">{destaque.m}</p>
              <p className="mk-feat-lbl">{destaque.l}</p>
            </article>

            <ul className="mk-ledger">
              {cases.map((c, i) => (
                <li key={c.c} aria-labelledby={`mk-case-${i + 1}`}>
                  <div className="mk-case-meta">
                    <h3 id={`mk-case-${i + 1}`}>{c.c}</h3>
                    <span className="mk-sector">{c.s}</span>
                  </div>
                  <p className="mk-ledger-h">{c.h}</p>
                  <p className="mk-ledger-num">{c.m}<span>{c.l}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* QUEM ESTÁ POR TRÁS · foto do fundador + liderança */}
      <section className="mk-sec mk-sec--band" id="quem-somos" aria-labelledby="mk-quem">
        <div className="mk-wrap mk-team">
          <figure className="via-photo via-photo--duotone via-photo--scrim mk-team-photo">
            <picture>
              <source srcSet="/fotos/rafael-milagre.webp" type="image/webp" />
              <img
                src="/fotos/rafael-milagre.jpg"
                alt="Retrato de Rafael Milagre, fundador da Viver de IA, sorrindo, de camiseta clara"
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

          <div className="mk-team-copy">
            <span className="mk-eyebrow">quem está por trás</span>
            <h2 id="mk-quem" className="mk-h2">As pessoas que respondem pela Viver de IA.</h2>
            <ul className="mk-roster">
              {lideres.map((l) => (
                <li key={l.nome}>
                  <span className="mk-roster-nome">{l.nome}</span>
                  <span className="mk-roster-papel">{l.papel}</span>
                </li>
              ))}
            </ul>
            <div className="mk-goal">
              <span className="mk-goal-tag">Meta pública</span>
              <p className="mk-goal-num">R$&nbsp;1 bilhão</p>
              <p className="mk-goal-txt">em receita e economia para empresas com IA.</p>
              <p className="mk-goal-note">É meta, não resultado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS · resumo com os dados da ficha */}
      <section className="mk-sec" id="planos" aria-labelledby="mk-planos">
        <div className="mk-wrap">
          <header className="mk-head">
            <div>
              <span className="mk-eyebrow">planos</span>
              <h2 id="mk-planos" className="mk-h2">Três planos, todos em contratação anual.</h2>
            </div>
            <p>Valores por mês. O detalhe de cada plano está em viverdeia.ai/planos.</p>
          </header>

          <div className="via-tile mk-plans">
            {planos.map((p) => (
              <article key={p.id} className={p.destaque ? 'mk-plan is-pro' : 'mk-plan'} aria-labelledby={`mk-plan-${p.id}`}>
                <div className="mk-plan-top">
                  <h3 id={`mk-plan-${p.id}`}>{p.nome}</h3>
                  {p.destaque && <span className="mk-plan-tag">com mentoria em grupo</span>}
                </div>
                <p className="mk-price">
                  <span className="mk-price-cur">R$</span>
                  <span className="mk-price-val">{p.preco}</span>
                  <span className="mk-price-per">/mês</span>
                </p>
                <p className="mk-plan-sub">em contratação anual</p>
                <p className="mk-plan-inc">{p.inclui}</p>
              </article>
            ))}
          </div>

          <div className="mk-guarantee">
            <span className="mk-guarantee-ic" aria-hidden="true"><Shield size={20} strokeWidth={1.75} /></span>
            <div>
              <h3>Garantia</h3>
              <p>{GARANTIA}</p>
              <p className="mk-guarantee-req">{GARANTIA_REQUISITOS}</p>
            </div>
            <a className="mk-btn mk-btn--glass" href="https://viverdeia.ai/planos" target="_blank" rel="noreferrer">
              Comparar os planos <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* FECHAMENTO · o único momento navy (elevado no escuro) */}
      <section className="mk-final-wrap" aria-labelledby="mk-final">
        <div className="mk-wrap">
          <div className="mk-final via-mesh-navy via-noise">
            <span className="mk-eyebrow mk-eyebrow--on-dark">viverdeia.ai</span>
            <h2 id="mk-final">Do discurso à IA em operação.</h2>
            <div className="mk-final-row">
              <p>
                Soluções prontas, formações, mentoria e comunidade numa plataforma só.
                <strong> Planos a partir de R$&nbsp;2.580 por mês</strong>, em contratação anual.
              </p>
              <div className="mk-final-actions">
                <a href="#planos" className="mk-btn mk-btn--on-dark">
                  Ver os planos <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
                <a href="#cases" className="mk-btn mk-btn--ghost-dark">Ver os cases</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mk-footer">
        <BrandLogo variant="auto" size="sm" />
        <p>Plataforma de implementação de IA · viverdeia.ai</p>
      </footer>
    </div>
  );
}
