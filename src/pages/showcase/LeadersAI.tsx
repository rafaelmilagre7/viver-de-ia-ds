import { Check } from 'lucide-react';
import leadersLogo from '../../assets/logos/leaders-ai-conference-logo.png';
import './leaders-ai.css';

const days = [
  {
    day: '14 outubro · quarta',
    items: [
      { t: '09:00', n: 'Abertura · Caio Ribeiro' },
      { t: '10:00', n: 'Operadores de IA — o que mudou em 12 meses' },
      { t: '11:30', n: 'Painel · Casos reais com receita atrelada' },
      { t: '14:00', n: 'Workshop · Levantando seu primeiro Superagente' },
      { t: '17:00', n: 'Mesa redonda · Governança séria' },
    ],
  },
  {
    day: '15 outubro · quinta',
    items: [
      { t: '09:00', n: 'Keynote · O fim da era do prompt' },
      { t: '10:30', n: 'Da hipótese ao deploy — em produção em 14 dias' },
      { t: '14:00', n: 'Workshop · Métricas que importam' },
      { t: '17:00', n: 'Encerramento + after-party' },
    ],
  },
];

const speakers = [
  { initials: 'CR', name: 'Caio Ribeiro', role: 'Fundador · Viver de IA' },
  { initials: 'GD', name: 'Guilherme Delorenzo', role: 'Founder · Efizi' },
  { initials: 'ML', name: 'Márisson Lage', role: 'CEO · Balzani & Zimbel' },
  { initials: 'LT', name: 'Larissa Tavares', role: 'Comparar Seguro' },
  { initials: 'RC', name: 'Rafael Cordeiro', role: 'CTO · Lago Saúde' },
  { initials: 'AM', name: 'Ana Moreira', role: 'Head IA · Conferir' },
];

const tiers = [
  { n: 'Standard', p: '1.490', d: 'Acesso aos 2 dias.', items: ['Coffee & almoço', 'Materiais digitais'] },
  { n: 'Pro', p: '2.890', d: 'Standard + workshops + jantar.', items: ['3 workshops práticos', 'Jantar de networking', 'Gravações'], feat: true, badge: 'Mais escolhido' },
  { n: 'VIP', p: '5.490', d: 'Pro + mesa redonda fechada.', items: ['Mesa VIP com Caio', 'Mentoria 1-a-1', 'After-party'] },
];

export default function ShowcaseLeadersAI() {
  return (
    <div className="vds-showcase la">
      <header className="la-nav">
        <img src={leadersLogo} alt="Leaders AI" />
        <nav>
          <a className="active">Agenda</a>
          <a>Speakers</a>
          <a>Ingressos</a>
          <a>Parceiros</a>
        </nav>
        <button>Comprar</button>
      </header>

      <section className="la-hero">
        <span className="la-eyebrow">Leaders AI Conference · 2026</span>
        <h1>Dois dias com quem<br /><em>opera em produção</em>.</h1>
        <p className="lede">
          Conferência editorial para operadores de IA — sem hype, sem demo bonita. Receita
          atrelada, governança séria, decisões reais.
        </p>
        <div className="la-pill">
          <span className="dot" />
          14 e 15 de outubro · São Paulo · Auditório Pinheiros
        </div>
      </section>

      <section className="la-section">
        <header className="la-section-h">
          <span className="la-eyebrow">Agenda</span>
          <h2>Dois dias, <em>quatro tracks</em>.</h2>
        </header>
        <div className="la-agenda">
          {days.map((d) => (
            <div key={d.day} className="la-day">
              <h3>{d.day}</h3>
              <ul>
                {d.items.map((i) => (
                  <li key={i.t}>
                    <span className="t">{i.t}</span>
                    <span className="n">{i.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="la-section">
        <header className="la-section-h">
          <span className="la-eyebrow">Speakers</span>
          <h2><em>Quem implementa</em>, não quem teoriza.</h2>
        </header>
        <div className="la-speakers">
          {speakers.map((s) => (
            <div key={s.name} className="la-speaker">
              <span className="av">{s.initials}</span>
              <div>
                <strong>{s.name}</strong>
                <span>{s.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="la-section">
        <header className="la-section-h">
          <span className="la-eyebrow">Ingressos</span>
          <h2>Três níveis. <em>Um destaque.</em></h2>
        </header>
        <div className="la-tiers">
          {tiers.map((t) => (
            <div key={t.n} className={`la-tier ${t.feat ? 'feat' : ''}`}>
              {t.badge && <span className="badge">{t.badge}</span>}
              <span className="tag">{t.n}</span>
              <div className="price">
                <span className="cur">R$</span>
                <span className="num">{t.p}</span>
              </div>
              <p>{t.d}</p>
              <ul>
                {t.items.map((i) => (
                  <li key={i}><Check size={12} strokeWidth={3} className="ck" />{i}</li>
                ))}
              </ul>
              <button className={t.feat ? 'btn light' : 'btn'}>Comprar {t.n}</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="la-footer">
        <img src={leadersLogo} alt="Leaders AI" />
        <span>14 e 15 outubro 2026 · São Paulo · Uma realização Viver de IA</span>
      </footer>
    </div>
  );
}
