import { Play, Check, Lock, MessageCircle, BookOpen, ArrowRight, Calendar } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './aluno.css';

const modules = [
  { n: '01', title: 'O cenário', state: 'done', count: 4, dur: '1h 12min' },
  { n: '02', title: 'Stack moderna do operador', state: 'done', count: 6, dur: '2h 04min' },
  { n: '03', title: 'Modelando seu primeiro agente', state: 'current', count: 5, dur: '1h 48min' },
  { n: '04', title: 'Produção, custos, observabilidade', state: 'todo', count: 7, dur: '2h 36min' },
  { n: '05', title: 'Governança séria', state: 'locked', count: 4, dur: '1h 20min' },
];

const next = [
  { t: 'qua · 19:30', l: 'Sessão ao vivo · Modelagem do seu agente' },
  { t: 'sex · 14:00', l: 'Office hours com Caio' },
  { t: 'sáb · 10:00', l: 'Workshop · publicando o primeiro deploy' },
];

const activity = [
  { who: 'Caio', txt: 'aprovou seu rascunho de stack' },
  { who: 'Equipe VIA', txt: 'publicou material da semana 03' },
  { who: 'Larissa', txt: 'comentou no seu thread sobre integração' },
];

export default function ShowcaseAluno() {
  return (
    <div className="vds-showcase al">
      <header className="al-nav">
        <BrandLogo variant="black" size="md" />
        <nav>
          <a className="active">Painel</a>
          <a>Mentoria</a>
          <a>Comunidade</a>
          <a>Cases</a>
        </nav>
        <div className="user">
          <span className="hi">Olá, <strong>Rafael</strong></span>
          <span className="av">RM</span>
        </div>
      </header>

      <div className="al-container">
        <section className="al-hero">
          <div>
            <span className="vds-eyebrow">Painel · turma 2026.2</span>
            <h1>Você está em <em>módulo 03</em>.</h1>
            <p className="lede">Esta semana — modelar o primeiro agente. Sessão ao vivo na quarta. Caio revisa rascunhos na sexta.</p>
            <div className="al-cta-row">
              <button className="btn primary">Continuar módulo <ArrowRight size={14} strokeWidth={2.5} /></button>
              <button className="btn ghost">Ver cronograma</button>
            </div>
          </div>

          <aside className="al-progress">
            <span className="vds-eyebrow">Progresso geral</span>
            <div className="ring">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--via-navy-08)" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" style={{ stroke: "var(--via-navy)" }} strokeWidth="6"
                  strokeDasharray="264" strokeDashoffset="132"
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round" />
              </svg>
              <span className="pct">50<em>%</em></span>
            </div>
            <p className="sub">5 semanas restantes · 16 ao total</p>
          </aside>
        </section>

        <section className="al-row">
          <div className="al-modules">
            <header className="al-row-h">
              <span className="vds-eyebrow">Módulos</span>
              <h2>Sua trilha de <em>16 semanas</em></h2>
            </header>
            <ol>
              {modules.map((m) => (
                <li key={m.n} className={`mod ${m.state}`}>
                  <span className="ico">
                    {m.state === 'done' && <Check size={14} strokeWidth={3} />}
                    {m.state === 'current' && <Play size={12} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />}
                    {m.state === 'locked' && <Lock size={12} strokeWidth={2} />}
                    {m.state === 'todo' && m.n}
                  </span>
                  <div className="meta">
                    <span className="num">Módulo {m.n}</span>
                    <span className="t">{m.title}</span>
                  </div>
                  <span className="dur">{m.count} aulas · {m.dur}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="al-side">
            <div className="card">
              <header className="al-row-h">
                <span className="vds-eyebrow">Próximas</span>
                <Calendar size={14} strokeWidth={2} className="ico-mut" />
              </header>
              <ul className="next">
                {next.map((n) => (
                  <li key={n.t}>
                    <span className="t">{n.t}</span>
                    <span className="l">{n.l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <header className="al-row-h">
                <span className="vds-eyebrow">Atividade</span>
                <MessageCircle size={14} strokeWidth={2} className="ico-mut" />
              </header>
              <ul className="act">
                {activity.map((a, i) => (
                  <li key={i}><strong>{a.who}</strong> {a.txt}</li>
                ))}
              </ul>
            </div>

            <div className="card mini-cta">
              <BookOpen size={20} strokeWidth={1.5} />
              <strong>206 cases publicados</strong>
              <p>Explore o diretório e veja o que outros operadores estão fazendo.</p>
              <button>Abrir <ArrowRight size={12} strokeWidth={2.5} /></button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
