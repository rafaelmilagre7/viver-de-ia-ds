import {
  Play, Calendar, Flame, Check, MessageCircle,
  TrendingUp, Award, Clock, ChevronRight,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import './dashboard-aluno.css';

/* ============================================================
   Dashboard do aluno · página-modelo
   App logado · visão geral do progresso + próximos passos
   ============================================================ */

const modulos = [
  { n: '01', t: 'Fundamentos · do hype ao que entrega', pct: 100, state: 'done' },
  { n: '02', t: 'Prompt como engenharia', pct: 68, state: 'current' },
  { n: '03', t: 'Construindo agentes que aguentam produção', pct: 0, state: 'todo' },
  { n: '04', t: 'Produção, custo, observabilidade', pct: 0, state: 'locked' },
];

const agenda = [
  { d: 'qua', dia: '22', h: '19:30', t: 'Sessão ao vivo · Modelagem do seu agente', tag: 'ao vivo' },
  { d: 'sex', dia: '24', h: '14:00', t: 'Office hours com Caio', tag: 'mentoria' },
  { d: 'sáb', dia: '25', h: '10:00', t: 'Workshop · publicando seu primeiro deploy', tag: 'workshop' },
];

const atividade = [
  { av: 'CR', who: 'Caio Ribeiro', txt: 'aprovou seu rascunho de stack', t: 'há 12 min' },
  { av: 'VIA', who: 'Equipe VIA', txt: 'publicou material da semana 03', t: 'há 2h' },
  { av: 'LA', who: 'Larissa Alves', txt: 'comentou no seu thread sobre integração', t: 'há 5h' },
];

export default function ShowcaseDashboardAluno() {
  return (
    <div className="vds-showcase dba">
      {/* NAV */}
      <header className="dba-nav">
        <BrandLogo variant="black" size="md" />
        <nav>
          <a className="active">Painel</a>
          <a>Curso</a>
          <a>Mentoria</a>
          <a>Comunidade</a>
        </nav>
        <div className="dba-user">
          <span className="dba-streak"><Flame size={13} strokeWidth={2.2} /> 14 dias</span>
          <span className="dba-av">RM</span>
        </div>
      </header>

      <div className="dba-body">
        {/* Greeting */}
        <div className="dba-greeting">
          <div>
            <span className="dba-eyebrow">turma 2026.3 · semana 03</span>
            <h1>Bom te ver, <em>Rafael</em>.</h1>
            <p>Você está em <strong>2/3 da trilha</strong> · 9 colegas no mesmo módulo agora.</p>
          </div>
          <div className="dba-progress-ring">
            <svg viewBox="0 0 120 120" aria-label="Progresso geral 42 por cento">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--via-navy-08)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke="url(#dba-grad)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${0.42 * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="dba-grad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--via-navy)" />
                  <stop offset="100%" stopColor="var(--via-blue)" />
                </linearGradient>
              </defs>
              <text x="60" y="58" textAnchor="middle" className="dba-ring-pct">42%</text>
              <text x="60" y="74" textAnchor="middle" className="dba-ring-lbl">completo</text>
            </svg>
          </div>
        </div>

        {/* Grid */}
        <div className="dba-grid">
          {/* Continuar de onde parou */}
          <article className="dba-card dba-continue via-mesh-navy via-noise">
            <span className="dba-continue-aura" aria-hidden="true" />
            <span className="dba-continue-eyebrow">continue de onde parou</span>
            <h2>02.04 · System prompts em escala</h2>
            <p>Você parou em 05:51 de 22:18. Faltam 16 minutos pra fechar a aula.</p>
            <div className="dba-continue-bar"><span style={{ width: '26%' }} /></div>
            <button className="dba-continue-cta">
              <Play size={15} strokeWidth={0} style={{ fill: 'var(--via-navy)' }} />
              Continuar aula
            </button>
          </article>

          {/* Próxima agenda */}
          <article className="dba-card dba-agenda">
            <header className="dba-card-head">
              <span className="dba-card-eyebrow"><Calendar size={12} strokeWidth={2.2} /> Próximos encontros</span>
            </header>
            <ul className="dba-agenda-list">
              {agenda.map((a) => (
                <li key={a.dia}>
                  <span className="dba-agenda-date">
                    <em>{a.d}</em>
                    <strong>{a.dia}</strong>
                  </span>
                  <div className="dba-agenda-info">
                    <span className="dba-agenda-tag">{a.tag}</span>
                    <strong>{a.t}</strong>
                    <em>{a.h}</em>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Progresso por módulo */}
          <article className="dba-card dba-modulos">
            <header className="dba-card-head">
              <span className="dba-card-eyebrow"><TrendingUp size={12} strokeWidth={2.2} /> Seu progresso</span>
              <span className="dba-card-meta">6 de 18 aulas</span>
            </header>
            <ul className="dba-modulos-list">
              {modulos.map((m) => (
                <li key={m.n} className={`dba-modulo ${m.state}`}>
                  <span className="dba-modulo-num">
                    {m.state === 'done' ? <Check size={12} strokeWidth={2.6} /> : m.n}
                  </span>
                  <div className="dba-modulo-body">
                    <strong>{m.t}</strong>
                    <div className="dba-modulo-bar"><span style={{ width: `${m.pct}%` }} /></div>
                  </div>
                  <span className="dba-modulo-pct">{m.pct}%</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Atividade da comunidade */}
          <article className="dba-card dba-activity">
            <header className="dba-card-head">
              <span className="dba-card-eyebrow"><MessageCircle size={12} strokeWidth={2.2} /> Atividade recente</span>
              <a href="#" className="dba-card-link">Ver tudo <ChevronRight size={12} strokeWidth={2.4} /></a>
            </header>
            <ul className="dba-activity-list">
              {atividade.map((a, i) => (
                <li key={i}>
                  <span className="dba-activity-av">{a.av}</span>
                  <div>
                    <p><strong>{a.who}</strong> {a.txt}</p>
                    <em>{a.t}</em>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Conquista / streak */}
          <article className="dba-card dba-achievement">
            <span className="dba-achievement-medal"><Award size={20} strokeWidth={1.6} /></span>
            <div>
              <strong>14 dias de streak</strong>
              <p>Maior sequência da turma · mais que 87% dos operadores do mês.</p>
            </div>
          </article>

          {/* Tempo investido */}
          <article className="dba-card dba-time">
            <span className="dba-time-icon"><Clock size={18} strokeWidth={1.8} /></span>
            <strong>11h 24min</strong>
            <em>investidos nas últimas 4 semanas</em>
            <div className="dba-time-spark">
              {[40, 65, 48, 82, 70, 95, 88].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
