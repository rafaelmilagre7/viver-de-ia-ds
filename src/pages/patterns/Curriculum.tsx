import { useState } from 'react';
import {
  Play, Lock, Check, ChevronDown, FileText, BookOpen, Award, PlayCircle,
  PenTool, Headphones, ArrowRight,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './curriculum.css';

type LessonType = 'video' | 'exercise' | 'reading' | 'live';
type LessonState = 'done' | 'playing' | 'available' | 'locked';

type Lesson = {
  n: string;
  title: string;
  duration: string;
  type: LessonType;
  state: LessonState;
};
type Module = {
  num: string;
  title: string;
  lede: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    num: '01',
    title: 'Fundamentos · do hype ao que entrega',
    lede: 'Separar IA real de IA pirotécnica · onde a inferência funciona · onde ela falha em silêncio.',
    lessons: [
      { n: '01.01', title: 'O que mudou de 2022 pra cá (e o que não mudou)', duration: '12:42', type: 'video', state: 'done' },
      { n: '01.02', title: 'Modelos generativos · LLMs, difusão, multimodal', duration: '18:24', type: 'video', state: 'done' },
      { n: '01.03', title: 'Exercício · classificar 10 cases reais', duration: '20min', type: 'exercise', state: 'done' },
      { n: '01.04', title: 'Leitura · paper "Sparks of AGI" (resumo VIA)', duration: '14min', type: 'reading', state: 'done' },
    ],
  },
  {
    num: '02',
    title: 'Prompt como engenharia · não como mágica',
    lede: 'Estrutura de prompts que sobrevivem à produção · few-shot, chain-of-thought, system prompts.',
    lessons: [
      { n: '02.01', title: 'A anatomia de um prompt sólido', duration: '16:08', type: 'video', state: 'done' },
      { n: '02.02', title: 'Few-shot · quando incluir exemplos é decisivo', duration: '13:54', type: 'video', state: 'playing' },
      { n: '02.03', title: 'Live · auditoria de 3 prompts reais do grupo', duration: '60min', type: 'live', state: 'available' },
      { n: '02.04', title: 'System prompts em escala', duration: '22:18', type: 'video', state: 'available' },
      { n: '02.05', title: 'Exercício · reescrever prompt do seu produto', duration: '40min', type: 'exercise', state: 'available' },
      { n: '02.06', title: 'Material · template canônico VIA', duration: 'PDF', type: 'reading', state: 'available' },
    ],
  },
  {
    num: '03',
    title: 'Construindo agentes que aguentam produção',
    lede: 'Tools · memory · roteamento · loops controlados · observabilidade. O sistema, não só o protótipo.',
    lessons: [
      { n: '03.01', title: 'Por que "agente" virou palavra suja em 2024', duration: '18:42', type: 'video', state: 'locked' },
      { n: '03.02', title: 'Tools · contrato, validação, fallback', duration: '24:12', type: 'video', state: 'locked' },
      { n: '03.03', title: 'Memória · curta, média, persistente', duration: '20:36', type: 'video', state: 'locked' },
      { n: '03.04', title: 'Roteamento entre modelos (custo × latência × qualidade)', duration: '17:48', type: 'video', state: 'locked' },
      { n: '03.05', title: 'Live · troubleshooting de um agente real do grupo', duration: '90min', type: 'live', state: 'locked' },
      { n: '03.06', title: 'Material · checklist de produção do agente', duration: 'PDF', type: 'reading', state: 'locked' },
      { n: '03.07', title: 'Exercício · subir um agente até a primeira métrica de receita', duration: '3h', type: 'exercise', state: 'locked' },
      { n: '03.08', title: 'Observabilidade · o que medir e como', duration: '19:08', type: 'video', state: 'locked' },
    ],
  },
];

export default function Curriculum() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · curriculum"
        title={
          <>
            A grade do curso, <em>editorial</em>.
          </>
        }
        lede="Estrutura completa de um curso Viver de IA — módulos como capítulos, aulas como peças tipográficas, progresso visualmente honesto, estados (concluído, tocando, disponível, travado) sem semáforo bobo. Pronta pra montar qualquer trilha ou playbook."
      />

      <CourseHero />
      <ModulesList />
    </>
  );
}

function CourseHero() {
  return (
    <Section title="Course hero · capa editorial" meta="primeira coisa que o aluno vê ao entrar">
      <div className="vds-course-hero">
        <div className="vds-course-cover via-mesh-navy via-noise">
          <span className="vds-course-eyebrow">Curso · 2026</span>
          <h2>
            Construindo agentes IA <em>na prática</em>.
          </h2>
          <p className="vds-course-author">
            <span className="av">CR</span>
            Caio Ribeiro · Viver de IA
          </p>
          <img src={monogramWhite} alt="" className="vds-course-watermark" />
        </div>

        <div className="vds-course-meta">
          <div className="vds-course-stats">
            <div className="stat">
              <span className="n">3</span>
              <span className="l">módulos</span>
            </div>
            <div className="stat">
              <span className="n">18</span>
              <span className="l">aulas</span>
            </div>
            <div className="stat">
              <span className="n">7h 42</span>
              <span className="l">duração total</span>
            </div>
            <div className="stat">
              <span className="n">2</span>
              <span className="l">lives no calendário</span>
            </div>
          </div>

          <div className="vds-course-progress">
            <div className="row">
              <span className="lbl">Seu progresso</span>
              <span className="val">5 de 18 aulas · 28%</span>
            </div>
            <div className="track">
              <span style={{ width: '28%' }} />
            </div>
            <p className="next">
              <Play size={11} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
              <span>Próxima aula <strong>02.02 · Few-shot · quando incluir exemplos é decisivo</strong></span>
            </p>
          </div>

          <button className="vds-course-cta">
            Continuar de onde parou
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Section>
  );
}

function ModulesList() {
  const [open, setOpen] = useState<string[]>(['02']);
  const toggle = (n: string) =>
    setOpen((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <Section title="Lista de módulos · expansível" meta="estado completo + tocando + disponível + travado">
      <div className="vds-modules">
        {modules.map((m) => {
          const expanded = open.includes(m.num);
          const total = m.lessons.length;
          const done = m.lessons.filter((l) => l.state === 'done').length;
          const pct = Math.round((done / total) * 100);
          const allDone = pct === 100;

          return (
            <article
              key={m.num}
              className={`vds-module ${expanded ? 'open' : ''} ${allDone ? 'done' : ''}`}
            >
              <button className="vds-module-head" onClick={() => toggle(m.num)}>
                <div className="vds-module-num">
                  {allDone ? (
                    <Check size={16} strokeWidth={2.5} />
                  ) : (
                    <span>{m.num}</span>
                  )}
                </div>
                <div className="vds-module-text">
                  <h3>{m.title}</h3>
                  <p className="vds-module-lede">{m.lede}</p>
                </div>
                <div className="vds-module-meta">
                  <span className="vds-module-pill">
                    {done}/{total} aulas
                  </span>
                  <span className="vds-module-progress">
                    <span style={{ width: `${pct}%` }} />
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={`vds-module-chev ${expanded ? 'rot' : ''}`}
                  />
                </div>
              </button>

              {expanded && (
                <ol className="vds-lessons">
                  {m.lessons.map((l) => (
                    <li key={l.n} className={`vds-lesson ${l.state}`}>
                      <span className="vds-lesson-icon">
                        {l.state === 'done' && <Check size={13} strokeWidth={2.6} />}
                        {l.state === 'playing' && <Play size={13} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />}
                        {l.state === 'available' && lessonTypeIcon(l.type)}
                        {l.state === 'locked' && <Lock size={13} strokeWidth={2.2} />}
                      </span>
                      <span className="vds-lesson-num">{l.n}</span>
                      <span className="vds-lesson-title">{l.title}</span>
                      <span className="vds-lesson-type">{lessonTypeLabel(l.type)}</span>
                      <span className="vds-lesson-dur">{l.duration}</span>
                      {(l.state === 'playing' || l.state === 'available') && (
                        <button aria-label="Avançar" className="vds-lesson-go">
                          <ArrowRight size={13} strokeWidth={2.4} />
                        </button>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}

        {/* Certificate card */}
        <div className="vds-cert-card">
          <div className="vds-cert-icon">
            <Award size={22} strokeWidth={1.4} />
          </div>
          <div>
            <p className="vds-cert-name">Certificado de conclusão</p>
            <p className="vds-cert-lede">
              Emitido automaticamente após 100% das aulas e a entrega final. Reconhecido pela comunidade Viver de IA e válido como evidência prática em portfólio.
            </p>
          </div>
          <span className="vds-cert-pill">Disponível em 13 aulas</span>
        </div>
      </div>
    </Section>
  );
}

function lessonTypeIcon(t: LessonType) {
  if (t === 'video') return <PlayCircle size={13} strokeWidth={2} />;
  if (t === 'exercise') return <PenTool size={13} strokeWidth={2} />;
  if (t === 'reading') return <BookOpen size={13} strokeWidth={2} />;
  if (t === 'live') return <Headphones size={13} strokeWidth={2} />;
  return <FileText size={13} strokeWidth={2} />;
}
function lessonTypeLabel(t: LessonType) {
  if (t === 'video') return 'Vídeo';
  if (t === 'exercise') return 'Exercício';
  if (t === 'reading') return 'Material';
  if (t === 'live') return 'Live';
  return 'Aula';
}
