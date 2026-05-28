import { ArrowRight, ArrowUpRight, Clock, Zap, Users } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './marketing.css';

const cases = [
  { c: 'Efizi', s: 'E-commerce', h: '+11.920 conversas analisadas', m: '+11.920', l: 'conversas' },
  { c: 'Balzani & Zimbel', s: 'Construção', h: 'R$ 4.600/mês em economia recorrente', m: 'R$ 4.600', l: '/mês' },
  { c: 'Comparar Seguro', s: 'Seguros', h: 'Atendimento 24/7 para vendas e operação', m: '24/7', l: 'operação' },
  { c: 'Conferir Engenharia', s: 'Engenharia', h: 'Operação financeira 100% automatizada', m: '100%', l: 'automatizado' },
];

const feats = [
  { I: Clock, t: 'Operação', em: '24/7', d: 'Agentes que respondem dia e noite sem dependência humana.' },
  { I: Zap, t: 'Resultado', em: 'mensurável', d: 'Cada implementação tem KPI próprio. Sem demo bonita.' },
  { I: Users, t: 'Pequenos', em: 'grupos', d: 'Turmas de até 24 com acompanhamento individual.' },
];

export default function ShowcaseMarketing() {
  return (
    <div className="vds-showcase mk">
      <header className="mk-nav">
        <BrandLogo variant="auto" size="md" />
        <nav>
          <a className="active">Mentoria</a>
          <a>Cases</a>
          <a>Manifesto</a>
          <a>Imprensa</a>
        </nav>
        <button>Entrar na turma</button>
      </header>

      <section className="mk-hero">
        <div className="mk-hero-atmos" />
        <div className="mk-hero-inner">
          <div>
            <span className="pill">
              <span className="pill-dot" />
              Turma 2026.2 · inscrições abertas
            </span>
            <h1>Viver de <em>IA</em>,<br />não de <em>prompt</em>.</h1>
            <p className="lede">
              Mentoria, comunidade e ferramentas para operadores que precisam transformar
              inteligência artificial em resultado mensurável — receita, margem,
              autonomia. Não em demo bonita.
            </p>
            <div className="actions">
              <button className="btn primary">Entrar na turma <ArrowRight size={14} strokeWidth={2.5} /></button>
              <button className="btn ghost">Ver cases · 206 publicados <ArrowUpRight size={14} strokeWidth={2.5} /></button>
            </div>
          </div>

          <aside className="glass-stack">
            <div className="g-card" style={{ animation: 'mkFloat 7s ease-in-out infinite' }}>
              <span className="g-lbl">Conversas analisadas</span>
              <div className="g-num">+11.920</div>
              <p className="g-sub"><em>Efizi</em> · análise de WhatsApp em 90 dias</p>
            </div>
            <div className="g-card" style={{ transform: 'translateX(-24px)', animation: 'mkFloat 8s ease-in-out infinite 1s' }}>
              <span className="g-lbl">Economia recorrente</span>
              <div className="g-num">R$ 4.600<span className="g-suffix">/mês</span></div>
              <p className="g-sub"><em>Balzani & Zimbel</em> · CRM próprio</p>
            </div>
            <div className="g-card" style={{ transform: 'translateX(-8px)', animation: 'mkFloat 9s ease-in-out infinite 2s' }}>
              <span className="g-lbl">Operação financeira</span>
              <div className="g-num">100%<span className="g-suffix">automatizada</span></div>
              <p className="g-sub"><em>Conferir Engenharia</em> · zero manual</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mk-section">
        <header className="mk-section-h">
          <span className="vds-eyebrow">Por que Viver de IA</span>
          <h2>Da hipótese ao agente <em>em produção</em>.</h2>
        </header>
        <div className="mk-feat-grid">
          {feats.map((f) => (
            <article key={f.em} className="mk-feat">
              <span className="ico"><f.I size={18} strokeWidth={2} /></span>
              <h3>{f.t} <em>{f.em}</em></h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-section">
        <header className="mk-section-h">
          <span className="vds-eyebrow">Cases</span>
          <h2>206 implementações publicadas. <em>4 delas aqui.</em></h2>
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
              <a className="link">Ler case <ArrowUpRight size={14} strokeWidth={2.5} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-cta">
        <div className="mk-cta-atmos" />
        <div className="mk-cta-inner">
          <span className="vds-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Mentoria · turma 2026.2</span>
          <h2>16 semanas com Caio. <em>Saída com agente vivo.</em></h2>
          <p>Sessões ao vivo + acompanhamento individual de implementação. Você sai com pelo menos um Superagente em produção, medido em receita ou economia.</p>
          <button className="btn light">Entrar na turma <ArrowRight size={14} strokeWidth={2.5} /></button>
        </div>
      </section>

      <footer className="mk-footer">
        <span className="wm">VIVER DE IA</span>
        <span className="meta">São Paulo · Estabelecida 2023</span>
      </footer>
    </div>
  );
}
