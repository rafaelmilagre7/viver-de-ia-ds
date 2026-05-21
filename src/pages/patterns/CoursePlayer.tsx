import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Settings,
  Check, Lock, ChevronDown, BookOpen, PenTool, Headphones,
  ArrowRight, FileText, Bookmark, Layers,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './course-player.css';

type LessonState = 'done' | 'playing' | 'available' | 'locked';

const modules = [
  {
    n: '01',
    title: 'Fundamentos · do hype ao que entrega',
    duration: '1h 32min',
    lessons: [
      { n: '01.01', title: 'O que mudou de 2022 pra cá', dur: '12:42', state: 'done' as LessonState, type: 'video' },
      { n: '01.02', title: 'Modelos generativos · LLMs e difusão', dur: '18:24', state: 'done' as LessonState, type: 'video' },
      { n: '01.03', title: 'Exercício · classificar 10 cases', dur: '20min', state: 'done' as LessonState, type: 'exercise' },
    ],
  },
  {
    n: '02',
    title: 'Prompt como engenharia',
    duration: '2h 14min',
    lessons: [
      { n: '02.01', title: 'Anatomia de um prompt sólido', dur: '16:08', state: 'done' as LessonState, type: 'video' },
      { n: '02.02', title: 'Few-shot · quando incluir exemplos é decisivo', dur: '13:54', state: 'playing' as LessonState, type: 'video' },
      { n: '02.03', title: 'Live · auditoria de 3 prompts', dur: '60min', state: 'available' as LessonState, type: 'live' },
      { n: '02.04', title: 'System prompts em escala', dur: '22:18', state: 'available' as LessonState, type: 'video' },
      { n: '02.05', title: 'Material · template VIA', dur: 'PDF', state: 'available' as LessonState, type: 'reading' },
    ],
  },
  {
    n: '03',
    title: 'Construindo agentes que aguentam produção',
    duration: '3h 02min',
    lessons: [
      { n: '03.01', title: 'Tools · contrato e fallback', dur: '24:12', state: 'locked' as LessonState, type: 'video' },
      { n: '03.02', title: 'Memória · curta + persistente', dur: '20:36', state: 'locked' as LessonState, type: 'video' },
    ],
  },
];

export default function CoursePlayer() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · course player premium"
        title={
          <>
            Playlist permanente, <em>fluxo cinematográfico</em>.
          </>
        }
        lede="Player de aula em modo imersivo — vídeo grande dominante, playlist sidebar permanente com módulos colapsáveis, progresso embutido. Como Frontend Masters, mas com cara editorial Viver de IA. O aluno entra e fica."
      />

      <PlayerSection />
      <NotesAndProgressSection />
    </>
  );
}

function PlayerSection() {
  const [openModules, setOpenModules] = useState<string[]>(['02']);
  const [playing, setPlaying] = useState(false);
  const pos = 0.42;

  const toggle = (n: string) =>
    setOpenModules((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <Section title="Layout completo · vídeo + playlist + breadcrumb" meta="grade 2-col · sidebar 360px · scroll independente">
      <div className="vds-cp">
        {/* Sidebar — playlist */}
        <aside className="vds-cp-aside">
          <header className="vds-cp-aside-head">
            <span className="vds-cp-aside-eyebrow">Curso</span>
            <h3>Construindo agentes IA na prática</h3>
            <div className="vds-cp-progress">
              <div className="track">
                <span style={{ width: '32%' }} />
              </div>
              <span className="pct">6 de 18 · 32%</span>
            </div>
          </header>

          <div className="vds-cp-aside-body">
            {modules.map((m) => {
              const expanded = openModules.includes(m.n);
              const done = m.lessons.filter((l) => l.state === 'done').length;
              const allDone = done === m.lessons.length;
              const hasPlaying = m.lessons.some((l) => l.state === 'playing');

              return (
                <article key={m.n} className={`vds-cp-mod ${expanded ? 'open' : ''} ${hasPlaying ? 'current' : ''}`}>
                  <button className="vds-cp-mod-head" onClick={() => toggle(m.n)}>
                    <span className={`vds-cp-mod-num ${allDone ? 'done' : ''}`}>
                      {allDone ? <Check size={12} strokeWidth={2.6} /> : m.n}
                    </span>
                    <div className="vds-cp-mod-text">
                      <strong>{m.title}</strong>
                      <em>
                        {done}/{m.lessons.length} aulas · {m.duration}
                      </em>
                    </div>
                    <ChevronDown size={14} strokeWidth={2} className={`vds-cp-mod-chev ${expanded ? 'rot' : ''}`} />
                  </button>

                  {expanded && (
                    <ol className="vds-cp-lessons">
                      {m.lessons.map((l) => (
                        <li key={l.n} className={`vds-cp-lesson ${l.state}`}>
                          <span className="vds-cp-lesson-mark">
                            {l.state === 'done' && <Check size={11} strokeWidth={2.6} />}
                            {l.state === 'playing' && <Play size={11} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />}
                            {l.state === 'available' && lessonTypeIcon(l.type)}
                            {l.state === 'locked' && <Lock size={10} strokeWidth={2.2} />}
                          </span>
                          <span className="vds-cp-lesson-num">{l.n}</span>
                          <span className="vds-cp-lesson-title">{l.title}</span>
                          <span className="vds-cp-lesson-dur">{l.dur}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </article>
              );
            })}
          </div>
        </aside>

        {/* Main — video + lesson details */}
        <div className="vds-cp-main">
          {/* Breadcrumb */}
          <nav className="vds-cp-breadcrumb">
            <Layers size={11} strokeWidth={2.2} />
            <span>Construindo agentes IA</span>
            <span className="sep">/</span>
            <span>Módulo 02</span>
            <span className="sep">/</span>
            <strong>Aula 02.02</strong>
          </nav>

          {/* Video */}
          <div className="vds-cp-video">
            <div className="vid-bg via-mesh-navy via-noise" />
            <span className="vid-glow" />

            {!playing && (
              <div className="vid-idle">
                <span className="eyebrow">
                  <Headphones size={11} strokeWidth={2.4} />
                  Aula 02.02 · 13min 54s
                </span>
                <h2>
                  Few-shot · <em>quando incluir exemplos é decisivo</em>.
                </h2>
                <p>Caio Ribeiro · transcript com timestamps na lateral · 12 notas suas</p>

                <button className="vid-play-big" onClick={() => setPlaying(true)} aria-label="Tocar vídeo">
                  <Play size={32} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
                </button>
              </div>
            )}

            <div className="vid-controls">
              <div className="vid-bar">
                <span className="vid-played" style={{ width: `${pos * 100}%` }} />
                <span className="vid-chapter" style={{ left: '22%' }} />
                <span className="vid-chapter" style={{ left: '48%' }} />
                <span className="vid-chapter" style={{ left: '74%' }} />
                <span className="vid-knob" style={{ left: `${pos * 100}%` }} />
              </div>

              <div className="vid-row">
                <div className="vid-row-l">
                  <button className="vid-ctrl play" aria-label={playing ? 'Pausar' : 'Tocar'} onClick={() => setPlaying(!playing)}>
                    {playing ? <Pause size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} /> : <Play size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />}
                  </button>
                  <button aria-label="Faixa anterior" className="vid-ctrl"><SkipBack size={14} strokeWidth={2.2} /></button>
                  <button aria-label="Próxima faixa" className="vid-ctrl"><SkipForward size={14} strokeWidth={2.2} /></button>
                  <button aria-label="Volume" className="vid-ctrl"><Volume2 size={14} strokeWidth={2.2} /></button>
                  <span className="vid-time">05:51 / 13:54</span>
                </div>
                <div className="vid-row-r">
                  <button className="vid-speed">1×</button>
                  <button aria-label="Configurações" className="vid-ctrl"><Settings size={14} strokeWidth={2} /></button>
                  <button aria-label="Tela cheia" className="vid-ctrl"><Maximize2 size={14} strokeWidth={2} /></button>
                </div>
              </div>
            </div>

            <div className="vid-watermark">
              <img src={monogramWhite} alt="" />
            </div>
          </div>

          {/* Lesson info */}
          <div className="vds-cp-info">
            <div className="vds-cp-info-l">
              <span className="vds-cp-info-eyebrow">02.02 · Vídeo · Módulo 02</span>
              <h3>Few-shot · quando incluir exemplos é decisivo</h3>
              <p>
                Caio mostra como decidir entre descrever em palavras vs. mostrar 2-3 exemplos. Quando o formato é a parte difícil, few-shot economiza 60% dos tokens da iteração.
              </p>
            </div>
            <div className="vds-cp-info-r">
              <button className="vds-cp-mark">
                <Check size={13} strokeWidth={2.5} />
                Marcar concluída
              </button>
              <button className="vds-cp-next">
                Próxima
                <ArrowRight size={13} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function NotesAndProgressSection() {
  return (
    <Section title="Notas + materiais inline · abaixo do player" meta="atalho rápido sem mudar de aba">
      <div className="vds-cp-extras">
        {/* Notes timestamped */}
        <article className="vds-cp-notes">
          <header>
            <span className="vds-cp-extras-eyebrow">
              <PenTool size={11} strokeWidth={2.2} />
              Suas notas · 12 total
            </span>
            <button className="vds-cp-add-note">
              <Bookmark size={11} strokeWidth={2.4} />
              Nota em 05:51
            </button>
          </header>

          <ul>
            <li>
              <button className="vds-cp-note-ts">05:51</button>
              <div>
                <p>Quando o formato é difícil de descrever em palavras = few-shot decisivo. Quando é só mais um caso de listing = zero-shot resolve.</p>
                <span className="vds-cp-note-meta">há 2 minutos</span>
              </div>
            </li>
            <li>
              <button className="vds-cp-note-ts">03:24</button>
              <div>
                <p>Caio disse que 3 exemplos é o ponto de inflexão — abaixo perde força, acima paga custo de token sem ganhar.</p>
                <span className="vds-cp-note-meta">há 6 min</span>
              </div>
            </li>
            <li>
              <button className="vds-cp-note-ts">01:18</button>
              <div>
                <p>Testar few-shot vs zero-shot na Nina amanhã. Hipótese: similar performance em qualificação simples, diferença grande em casos ambíguos.</p>
                <span className="vds-cp-note-meta">há 11 min</span>
              </div>
            </li>
          </ul>
        </article>

        {/* Materials + chapters */}
        <article className="vds-cp-materials">
          <header>
            <span className="vds-cp-extras-eyebrow">
              <FileText size={11} strokeWidth={2.2} />
              Material da aula
            </span>
          </header>

          <ul>
            <li>
              <span className="vds-cp-mat-ext">PDF</span>
              <div>
                <strong>Template canônico VIA · few-shot</strong>
                <em>1.2 MB · 4 págs</em>
              </div>
              <button>↓</button>
            </li>
            <li>
              <span className="vds-cp-mat-ext alt">IPY</span>
              <div>
                <strong>Notebook · benchmark few-shot</strong>
                <em>86 KB · executável</em>
              </div>
              <button>↓</button>
            </li>
          </ul>

          <div className="vds-cp-chapters">
            <span className="vds-cp-extras-eyebrow alt">Capítulos navegáveis</span>
            <ul>
              <li><strong>00:00</strong> Decidir quando usar few-shot</li>
              <li><strong>03:18</strong> Anatomia de 3 exemplos canônicos</li>
              <li className="on"><strong>05:51</strong> Quando 12 exemplos viram ruído</li>
              <li><strong>09:42</strong> Teste real · Nina classifier</li>
              <li><strong>11:28</strong> Síntese · regra de bolso</li>
            </ul>
          </div>
        </article>
      </div>
    </Section>
  );
}

function lessonTypeIcon(t: string) {
  if (t === 'video') return <Play size={11} strokeWidth={2} />;
  if (t === 'exercise') return <PenTool size={11} strokeWidth={2} />;
  if (t === 'reading') return <BookOpen size={11} strokeWidth={2} />;
  if (t === 'live') return <Headphones size={11} strokeWidth={2} />;
  return <FileText size={11} strokeWidth={2} />;
}
