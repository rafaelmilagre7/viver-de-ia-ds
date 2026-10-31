import {
  Play, Calendar, Flame, Check, MessageCircle,
  TrendingUp, Award, Clock, ChevronRight,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import { Button } from '../../lib/Button/Button';
import ShowcaseMenu from './ShowcaseMenu';
import './dashboard-aluno.css';

/* ============================================================
   Dashboard do aluno · página-modelo
   App logado · visão geral do progresso + próximos passos
   ============================================================ */

const navItems = [
  { label: 'Painel', active: true },
  { label: 'Formações' },
  { label: 'Mentoria' },
  { label: 'Comunidade' },
];

const modulos = [
  { n: '01', t: 'Fundamentos · do hype ao que entrega', pct: 100, state: 'done' },
  { n: '02', t: 'Prompt como engenharia', pct: 68, state: 'current' },
  { n: '03', t: 'Construindo agentes que aguentam produção', pct: 0, state: 'todo' },
  { n: '04', t: 'Produção, custo, observabilidade', pct: 0, state: 'locked' },
];

const agenda = [
  { d: 'qua', dia: '22', h: '19:30', t: 'Check-in · mentoria em grupo', tag: 'ao vivo' },
  { d: 'sex', dia: '24', h: '14:00', t: 'Plantão de dúvidas com Caio', tag: 'mentoria' },
  { d: 'sáb', dia: '25', h: '10:00', t: 'Workshop · publicando seu primeiro deploy', tag: 'workshop' },
];

const atividade = [
  { av: 'CR', who: 'Caio Ribeiro', txt: 'aprovou seu rascunho de stack', t: 'há 12 min' },
  { av: 'VIA', who: 'Equipe VIA', txt: 'publicou material da semana 03', t: 'há 2h' },
  { av: 'LA', who: 'Larissa Alves', txt: 'comentou na sua discussão sobre integração', t: 'há 5h' },
];

export default function ShowcaseDashboardAluno() {
  return (
    <div className="vds-showcase dba">
      {/* NAV */}
      <header className="dba-nav">
        <BrandLogo variant="auto" size="md" />
        <nav>
          {navItems.map((n) => (
            <a key={n.label} className={n.active ? 'is-link active' : 'is-link'}>{n.label}</a>
          ))}
        </nav>
        <ShowcaseMenu items={navItems} />
        <div className="dba-user">
          <span className="dba-streak"><Flame size={14} strokeWidth={1.75} /> 14 dias</span>
          <span className="dba-av">RM</span>
        </div>
      </header>

      <div className="dba-body">
        {/* Greeting */}
        <div className="dba-greeting">
          <div>
            <span className="dba-eyebrow">Plano Pro · trilha de onboarding</span>
            <h1>Bom te ver, <em>Rafael</em>.</h1>
            <p>Você está em <strong>2/3 da trilha</strong> · 9 membros no mesmo módulo agora.</p>
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
                {/* chart-ink adapta no dark (navy→azul claro). Com navy/blue
                    crus o arco ficava mais ESCURO que a trilha no tema
                    escuro — o anel lia invertido. */}
                <linearGradient id="dba-grad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--via-chart-ink)" />
                  <stop offset="100%" stopColor="var(--via-chart-ink-2)" />
                </linearGradient>
              </defs>
              <text x="60" y="58" textAnchor="middle" className="dba-ring-pct">42%</text>
              <text x="60" y="74" textAnchor="middle" className="dba-ring-lbl">Completo</text>
            </svg>
          </div>
        </div>

        {/* Grid */}
        <div className="dba-grid">
          {/* Continuar de onde parou · quadro da aula (moldura do player) + texto.
              Era uma laje navy com ~400px de vazio em cima do texto no celular
              (a aura decorativa entrava no fluxo). Agora o card é claro como os
              outros e o navy fica só dentro do quadro — que é conteúdo. */}
          <article className="dba-card dba-continue">
            <div className="dba-frame" aria-hidden="true">
              <div className="dba-frame-slide">
                <span className="dba-frame-kicker">Aula 02.04</span>
                <strong className="dba-frame-title">System prompts<br />em escala</strong>
                <span className="dba-frame-lines"><i /><i /><i /></span>
              </div>
              <span className="dba-frame-play">
                <Play size={18} strokeWidth={0} />
              </span>
              <div className="dba-frame-controls">
                <div className="dba-frame-scrub">
                  <span className="dba-frame-fill" style={{ width: '26%' }} />
                  {[22, 48, 74].map((c) => (
                    <span key={c} className="dba-frame-tick" style={{ left: `${c}%` }} />
                  ))}
                  <span className="dba-frame-thumb" style={{ left: '26%' }} />
                </div>
                <div className="dba-frame-meta">
                  <span>05:51 / 22:18</span>
                  <span>Capítulo 2 · Versionar o prompt</span>
                </div>
              </div>
            </div>

            <div className="dba-continue-body">
              <span className="dba-card-eyebrow"><Play size={14} strokeWidth={1.75} /> Continue de onde parou</span>
              <h2>System prompts em escala</h2>
              <p className="dba-continue-meta">Módulo 02 · aula 4 de 6 · capítulo 2 de 4</p>
              <div className="dba-continue-progress">
                <div className="dba-modulo-bar"><span style={{ width: '26%' }} /></div>
                <span>Faltam 16 min</span>
              </div>
              <div className="dba-continue-actions">
                <Button size="md" iconLeft={<Play size={14} strokeWidth={0} style={{ fill: 'currentColor' }} />}>
                  Continuar aula
                </Button>
                <Button size="md" variant="ghost">Ver módulo</Button>
              </div>
            </div>
          </article>

          {/* Próxima agenda */}
          <article className="dba-card dba-agenda">
            <header className="dba-card-head">
              <span className="dba-card-eyebrow"><Calendar size={14} strokeWidth={1.75} /> Próximos encontros</span>
            </header>
            <ul className="dba-agenda-list">
              {agenda.map((a) => (
                <li key={a.dia}>
                  <span className="dba-agenda-date">
                    <em>{a.d}</em>
                    <strong>{a.dia}</strong>
                  </span>
                  <div className="dba-agenda-info">
                    <strong>{a.t}</strong>
                    <em>{a.h} · {a.tag}</em>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Progresso por módulo */}
          <article className="dba-card dba-modulos">
            <header className="dba-card-head">
              <span className="dba-card-eyebrow"><TrendingUp size={16} strokeWidth={1.75} /> Seu progresso</span>
              <span className="dba-card-meta">6 de 15 aulas</span>
            </header>
            <ul className="dba-modulos-list">
              {modulos.map((m) => (
                <li key={m.n} className={`dba-modulo ${m.state}`}>
                  <span className="dba-modulo-num">
                    {m.state === 'done' ? <Check size={14} strokeWidth={1.75} /> : m.n}
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
              <span className="dba-card-eyebrow"><MessageCircle size={16} strokeWidth={1.75} /> Atividade recente</span>
              <a href="#" className="dba-card-link">Ver tudo <ChevronRight size={14} strokeWidth={1.75} /></a>
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

          {/* Conquista / sequência */}
          <article className="dba-card dba-achievement">
            <span className="dba-achievement-medal"><Award size={20} strokeWidth={1.75} /></span>
            <div>
              <strong>14 dias seguidos</strong>
              <p>Maior sequência do seu time · mais que 87% dos membros do mês.</p>
            </div>
          </article>

          {/* Tempo investido */}
          <article className="dba-card dba-time">
            <span className="dba-time-icon"><Clock size={16} strokeWidth={1.75} /></span>
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
