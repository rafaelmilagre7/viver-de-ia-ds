import { ArrowRight, ArrowUpRight, Clock, Zap, Users } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import { useScrollEdge } from '../../layout/useScrollEdge';
import ShowcaseMenu from './ShowcaseMenu';
import './marketing.css';

const navItems = [
  { label: 'Plataforma', href: '#mentoria', active: true },
  { label: 'Cases', href: '#cases' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Imprensa', href: '#imprensa' },
];

const cases = [
  { c: 'Place Dreams', s: 'Tecnologia', h: 'Economiza R$ 42.000 por ano em 30 dias', m: 'R$ 42.000', l: '/ano' },
  { c: 'Trivia Studio', s: 'Agência', h: 'De processos manuais a R$ 120.000 de economia anual', m: 'R$ 120.000', l: '/ano' },
  { c: 'Viva Nexo', s: 'Saúde', h: 'De 6h para cliques · economiza R$ 162.000', m: 'R$ 162.000', l: 'economia' },
  { c: 'Pasetti Viagens', s: 'Turismo', h: 'Atendimento 24h com IA no turismo', m: '24h', l: 'atendimento' },
];

const feats = [
  { I: Clock, t: 'Operação', em: '24/7', d: 'Agentes que respondem dia e noite sem dependência humana.' },
  { I: Zap, t: 'Resultado', em: 'mensurável', d: 'Cada implementação tem KPI próprio. Sem demo bonita.' },
  { I: Users, t: 'Mentoria', em: 'em grupo', d: '10 check-ins por mês no Pro, ao vivo, no seu contexto.' },
];

export default function ShowcaseMarketing() {
  const navEdgeRef = useScrollEdge<HTMLElement>();
  return (
    <div className="vds-showcase mk">
      <header ref={navEdgeRef} className="mk-nav">
        <BrandLogo variant="auto" size="md" />
        <nav>
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className={n.active ? 'is-link active' : 'is-link'}>{n.label}</a>
          ))}
        </nav>
        <ShowcaseMenu items={navItems} />
        <button className="mk-nav-cta">Ver os planos</button>
      </header>

      <section className="mk-hero">
        <div className="mk-hero-atmos" />
        <div className="mk-hero-inner">
          <div>
            <span className="pill">
              <span className="pill-dot" />
              Plano Pro · mentoria em grupo ao vivo
            </span>
            <h1>Viver de <em>IA</em>,<br />não de <em>prompt</em>.</h1>
            <p className="lede">
              Soluções prontas, formações, mentoria e comunidade para empresas que precisam
              transformar inteligência artificial em resultado mensurável — receita, margem,
              autonomia. Não em demo bonita.
            </p>
            <div className="actions">
              <button className="btn primary">Ver os planos <ArrowRight size={16} strokeWidth={1.75} /></button>
              <button className="btn ghost">Ver cases · 521 reais <ArrowUpRight size={16} strokeWidth={1.75} /></button>
            </div>
          </div>

          <aside className="glass-stack">
            <div className="g-card" style={{ animation: 'mkFloat 7s ease-in-out infinite' }}>
              <span className="g-lbl">Economia anual</span>
              <div className="g-num">R$ 120.000</div>
              <p className="g-sub"><em>Trivia Studio</em> · produção de conteúdo</p>
            </div>
            <div className="g-card" style={{ transform: 'translateX(-24px)', animation: 'mkFloat 8s ease-in-out infinite 1s' }}>
              <span className="g-lbl">Economia gerada</span>
              <div className="g-num">R$ 42.000<span className="g-suffix">/ano</span></div>
              <p className="g-sub"><em>Place Dreams</em> · em 30 dias</p>
            </div>
            <div className="g-card" style={{ transform: 'translateX(-8px)', animation: 'mkFloat 9s ease-in-out infinite 2s' }}>
              <span className="g-lbl">Atendimento</span>
              <div className="g-num">24h<span className="g-suffix">com IA</span></div>
              <p className="g-sub"><em>Pasetti Viagens</em> · turismo</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mk-section">
        <header className="mk-section-h">
          <span className="vds-eyebrow">Por que Viver de IA</span>
          <h2>Do discurso à IA <em>em operação</em>.</h2>
        </header>
        <div className="mk-feat-grid">
          {feats.map((f) => (
            <article key={f.em} className="mk-feat">
              <span className="ico"><f.I size={16} strokeWidth={1.75} /></span>
              <h3>{f.t} <em>{f.em}</em></h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-section">
        <header className="mk-section-h">
          <span className="vds-eyebrow">Cases</span>
          <h2>521 cases reais de implementação. <em>4 deles aqui.</em></h2>
        </header>
        <div className="mk-cases">
          {cases.map((c) => (
            <article key={c.c} className="mk-case">
              <header>
                <span className="company">{c.c}</span>
                <span className="sector">{c.s}</span>
              </header>
              <h3>{c.h}</h3>
              <div className="stat">
                <span className="v">{c.m}</span>
                <span className="l">{c.l}</span>
              </div>
              <a className="link" href="#case">Ler case <ArrowUpRight size={16} strokeWidth={1.75} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-cta">
        <div className="mk-cta-atmos" />
        <div className="mk-cta-inner">
          <span className="vds-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Plano Pro · R$ 3.780/mês</span>
          <h2>Mentoria em grupo ao vivo. <em>Solução rodando na operação.</em></h2>
          <p>10 check-ins por mês de mentoria em grupo, soluções Plug-and-Play e Consultor IA. Garantia de 90 dias com requisitos, nas condições da cláusula 7.</p>
          <button className="btn light">Ver os planos <ArrowRight size={16} strokeWidth={1.75} /></button>
        </div>
      </section>

      <footer className="mk-footer">
        <BrandLogo variant="auto" size="sm" />
        <span className="meta">Plataforma B2B · viverdeia.ai</span>
      </footer>
    </div>
  );
}
