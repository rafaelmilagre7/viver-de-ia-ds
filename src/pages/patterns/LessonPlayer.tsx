import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Settings,
  Check, FileText, Download, MessageCircle, Pencil, Search, Bookmark,
  ArrowLeft, ArrowRight, Headphones,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './lesson-player.css';

type Tab = 'transcript' | 'notes' | 'material' | 'discussion';

export default function LessonPlayer() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · lesson player"
        title={
          <>
            Player de aula <em>completo</em>.
          </>
        }
        lede="A peça onde o aluno passa 80% do tempo — vídeo cinematográfico à esquerda, lateral com transcript navegável + notas + material + discussão. Pensado pra concentração: nada chama atenção se não for o conteúdo."
      />

      <PlayerSection />
      <QuizSection />
      <NavSection />
    </>
  );
}

function PlayerSection() {
  const [tab, setTab] = useState<Tab>('transcript');
  const [playing, setPlaying] = useState(false);
  const pos = 0.32;

  return (
    <Section title="Lesson player · vídeo + sidebar editorial" meta="layout 2-col · main vídeo · aside contextual">
      <div className="vds-lesson-stage">
        {/* Breadcrumb */}
        <nav className="vds-lesson-breadcrumb">
          <span>Construindo agentes IA na prática</span>
          <span className="sep">/</span>
          <span>Módulo 02 · Prompt como engenharia</span>
          <span className="sep">/</span>
          <strong>Aula 02 · Few-shot · quando incluir exemplos é decisivo</strong>
        </nav>

        <div className="vds-lesson-grid">
          {/* Main: video + meta */}
          <div className="vds-lesson-main">
            <div className="vds-lesson-video">
              <div className="vid-bg via-mesh-navy via-noise" />

              {!playing && (
                <div className="vid-idle">
                  <span className="eyebrow"><Headphones size={11} strokeWidth={2.2} /> Aula 02.02 · 13min 54s</span>
                  <h2>Few-shot · <em>quando incluir exemplos é decisivo</em>.</h2>
                  <p className="lede">Caio Ribeiro · sessão gravada · transcript completo na lateral</p>
                  <button className="vid-play-big" onClick={() => setPlaying(true)} aria-label="Tocar">
                    <span className="ring">
                      <Play size={28} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
                    </span>
                  </button>
                </div>
              )}

              {/* Controls */}
              <div className="vid-controls">
                <div className="vid-bar">
                  <span className="vid-played" style={{ width: `${pos * 100}%` }} />
                  <span className="vid-chapter" style={{ left: '18%' }} />
                  <span className="vid-chapter" style={{ left: '42%' }} />
                  <span className="vid-chapter" style={{ left: '71%' }} />
                </div>
                <div className="vid-row">
                  <div className="vid-row-l">
                    <button className="vid-ctrl play" aria-label={playing ? 'Pausar' : 'Tocar'} onClick={() => setPlaying(!playing)}>
                      {playing ? (
                        <Pause size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
                      ) : (
                        <Play size={14} strokeWidth={0} style={{ fill: "var(--via-navy)" }} />
                      )}
                    </button>
                    <button aria-label="Faixa anterior" className="vid-ctrl"><SkipBack size={14} strokeWidth={2.2} /></button>
                    <button aria-label="Próxima faixa" className="vid-ctrl"><SkipForward size={14} strokeWidth={2.2} /></button>
                    <button aria-label="Volume" className="vid-ctrl"><Volume2 size={14} strokeWidth={2.2} /></button>
                    <span className="vid-time">04:28 / 13:54</span>
                  </div>
                  <div className="vid-row-r">
                    <button className="vid-quality">1×</button>
                    <button aria-label="Configurações" className="vid-ctrl"><Settings size={14} strokeWidth={2} /></button>
                    <button aria-label="Tela cheia" className="vid-ctrl"><Maximize2 size={14} strokeWidth={2} /></button>
                  </div>
                </div>
              </div>

              <div className="vid-watermark">
                <img src={monogramWhite} alt="" />
                <span>Viver de IA</span>
              </div>
            </div>

            {/* Lesson info under video */}
            <div className="vds-lesson-info">
              <div className="vds-lesson-title-row">
                <div>
                  <span className="eyebrow">Aula 02.02 · vídeo</span>
                  <h3>Few-shot · quando incluir exemplos é decisivo.</h3>
                </div>
                <button className="vds-lesson-mark">
                  <Check size={13} strokeWidth={2.4} />
                  Marcar como concluída
                </button>
              </div>

              <p className="vds-lesson-desc">
                Em alguns problemas, descrever a tarefa não basta — o modelo precisa de 2-3 exemplos resolvidos pra entender o <em>formato</em>, não só o conteúdo. Nessa aula, mostro como decidir quando few-shot é decisivo, como escolher os exemplos certos, e o erro mais comum que vejo (incluir 12 exemplos quando 3 resolveriam).
              </p>

              <div className="vds-lesson-author">
                <span className="av">CR</span>
                <div>
                  <strong>Caio Ribeiro</strong>
                  <em>Viver de IA · 17 mai 2026</em>
                </div>
              </div>
            </div>
          </div>

          {/* Aside: tabs */}
          <aside className="vds-lesson-aside">
            <div className="vds-lesson-tabs" role="tablist">
              <TabBtn k="transcript" active={tab} set={setTab} icon={<FileText size={13} strokeWidth={2} />} label="Transcript" />
              <TabBtn k="notes" active={tab} set={setTab} icon={<Pencil size={13} strokeWidth={2} />} label="Notas" />
              <TabBtn k="material" active={tab} set={setTab} icon={<Download size={13} strokeWidth={2} />} label="Material" />
              <TabBtn k="discussion" active={tab} set={setTab} icon={<MessageCircle size={13} strokeWidth={2} />} label="Discussão" />
            </div>

            <div className="vds-lesson-panel">
              {tab === 'transcript' && <TranscriptPanel />}
              {tab === 'notes' && <NotesPanel />}
              {tab === 'material' && <MaterialPanel />}
              {tab === 'discussion' && <DiscussionPanel />}
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

function TabBtn({
  k, active, set, icon, label,
}: { k: Tab; active: Tab; set: (t: Tab) => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      role="tab"
      aria-selected={active === k}
      className={`vds-lesson-tab ${active === k ? 'on' : ''}`}
      onClick={() => set(k)}
    >
      {icon}
      {label}
    </button>
  );
}

function TranscriptPanel() {
  const lines = [
    { t: '00:00', text: 'Hoje a gente vai falar sobre uma decisão que parece pequena, mas separa prompt de produção de prompt de demo: quando incluir exemplos.' },
    { t: '00:18', text: 'Few-shot prompting é incluir 2, 3, às vezes 5 exemplos de pares input-output dentro do próprio prompt antes do problema real.' },
    { t: '00:42', text: 'A pergunta não é "few-shot é bom?". É: nesse caso específico, descrever o formato em palavras vai ser mais barato que mostrar exemplos?', current: true },
    { t: '01:14', text: 'Casos onde few-shot é decisivo: quando a saída tem um formato muito específico, quando o vocabulário do domínio é raro, quando o modelo erra consistentemente o estilo.' },
    { t: '01:48', text: 'Casos onde few-shot é desperdício: tarefa óbvia (resumir, traduzir), formato livre, ou quando o modelo já acerta sem exemplo.' },
    { t: '02:22', text: 'Mostra aqui o teste que fiz com a Nina, o agente da Viver de IA. Sem few-shot, 64% das respostas eram boas. Com 3 exemplos bem escolhidos, 89%.' },
    { t: '02:58', text: 'O erro mais comum que vejo: incluir 12 exemplos. Diminui o desempenho. O modelo confunde, perde foco, e o custo de token sobe.' },
  ];
  return (
    <>
      <div className="vds-transcript-search">
        <Search size={13} strokeWidth={2} />
        <input placeholder="Buscar no transcript" />
      </div>
      <ol className="vds-transcript">
        {lines.map((l, i) => (
          <li key={i} className={l.current ? 'on' : ''}>
            <button className="ts">{l.t}</button>
            <p>{l.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function NotesPanel() {
  return (
    <div className="vds-notes">
      <textarea
        className="vds-notes-input"
        placeholder="Anota uma ideia, cole um trecho, marque o que voltar depois…"
        defaultValue="Few-shot só vale a pena quando o FORMATO é difícil de descrever em palavras. Resumir não pede. Gerar JSON com 4 campos específicos pede."
      />
      <button className="vds-notes-save">
        <Bookmark size={13} strokeWidth={2.2} />
        Salvar nota em 02:22
      </button>

      <p className="vds-notes-eyebrow">Notas anteriores</p>
      <ul className="vds-notes-list">
        <li>
          <span className="ts">01:48</span>
          <p>Lista de quando NÃO usar few-shot — recall isso na revisão</p>
        </li>
        <li>
          <span className="ts">00:42</span>
          <p>Pergunta que vou levar pro time: a Nina precisaria de few-shot pra qualificação? Testar.</p>
        </li>
      </ul>
    </div>
  );
}

function MaterialPanel() {
  const files = [
    { name: 'Slides · few-shot decision tree', size: 'PDF · 1.2 MB' },
    { name: 'Template canônico VIA · few-shot', size: 'TXT · 4 KB' },
    { name: 'Notebook companion · benchmark few-shot vs zero-shot', size: 'IPYNB · 86 KB' },
    { name: 'Paper de referência · "In-context learning"', size: 'PDF · 2.4 MB' },
  ];
  return (
    <ul className="vds-material">
      {files.map((f) => (
        <li key={f.name}>
          <span className="vds-material-icon">
            <FileText size={14} strokeWidth={2} />
          </span>
          <div className="vds-material-meta">
            <p className="name">{f.name}</p>
            <p className="size">{f.size}</p>
          </div>
          <button aria-label="Baixar" className="vds-material-dl">
            <Download size={13} strokeWidth={2.2} />
          </button>
        </li>
      ))}
    </ul>
  );
}

function DiscussionPanel() {
  return (
    <ul className="vds-discussion">
      <li>
        <span className="av">ML</span>
        <div>
          <p className="vds-disc-meta">
            <strong>Márisson Lage</strong>
            <em>Efizi · 02 min atrás</em>
          </p>
          <p className="vds-disc-text">
            Caio, no nosso caso da Efizi a Nina usa few-shot pra classificar urgência. Funcionou bem com 4 exemplos. Você acha que cabe testar zero-shot pra ver se sobreviveria?
          </p>
          <div className="vds-disc-actions">
            <button>Responder</button>
            <span>·</span>
            <button>Citar trecho 02:22</button>
          </div>
        </div>
      </li>
      <li>
        <span className="av light">CR</span>
        <div>
          <p className="vds-disc-meta">
            <strong>Caio Ribeiro</strong>
            <em>Viver de IA · agora</em>
            <span className="vds-disc-pin">Resposta do mentor</span>
          </p>
          <p className="vds-disc-text">
            Vale testar sim — mas com paciência: rode o zero-shot em 100 conversas e mede a queda. Se cair menos de 8pp, vale economizar tokens. Acima disso, mantém os 4.
          </p>
        </div>
      </li>
    </ul>
  );
}

/* ---------- Quiz inline ---------- */
function QuizSection() {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = 1;
  const options = [
    'Sempre que possível — exemplos só ajudam o modelo.',
    'Quando o formato da saída é específico e difícil de descrever em palavras.',
    'Apenas em tarefas de classificação binária.',
    'Quando o modelo já acerta sem exemplos.',
  ];

  return (
    <Section title="Quiz inline · checkpoint da aula" meta="aparece ao fim da aula 02.02 · 1 pergunta de fixação">
      <div className="vds-quiz">
        <div className="vds-quiz-head">
          <span className="vds-quiz-eyebrow">Checkpoint · aula 02.02</span>
          <h3>Quando few-shot é, de fato, decisivo?</h3>
          <p>Escolha a melhor descrição com base no que vimos nessa aula.</p>
        </div>

        <ul className="vds-quiz-options">
          {options.map((o, i) => {
            const isPicked = picked === i;
            const isCorrect = i === correct;
            const reveal = picked != null;
            return (
              <li key={i}>
                <button
                  className={`vds-quiz-option ${isPicked ? 'picked' : ''} ${reveal && isCorrect ? 'correct' : ''} ${reveal && isPicked && !isCorrect ? 'wrong' : ''}`}
                  onClick={() => setPicked(i)}
                  disabled={picked != null}
                >
                  <span className="vds-quiz-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="vds-quiz-text">{o}</span>
                  {reveal && isCorrect && (
                    <span className="vds-quiz-icon ok">
                      <Check size={13} strokeWidth={2.6} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {picked != null && (
          <div className={`vds-quiz-feedback ${picked === correct ? 'ok' : 'bad'}`}>
            <strong>{picked === correct ? 'Exato.' : 'Não é essa.'}</strong>
            {picked === correct ? (
              <span> Few-shot é decisivo quando o FORMATO da saída é difícil de descrever — não basta pedir "responda em JSON", às vezes precisa mostrar.</span>
            ) : (
              <span> A resposta certa é B — few-shot é decisivo quando o formato é difícil de descrever. Veja de novo o trecho a partir de 01:14.</span>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------- Lesson navigation ---------- */
function NavSection() {
  return (
    <Section title="Navegação entre aulas · footer do player" meta="prev / next contextual editorial">
      <div className="vds-lesson-nav">
        <a className="vds-lesson-nav-card prev" href="#prev">
          <ArrowLeft size={14} strokeWidth={2.4} />
          <div>
            <span className="lbl">Aula anterior</span>
            <p>02.01 · A anatomia de um prompt sólido</p>
          </div>
        </a>

        <button className="vds-lesson-nav-mark">
          <Check size={13} strokeWidth={2.6} />
          Concluir e ir pra próxima
        </button>

        <a className="vds-lesson-nav-card next" href="#next">
          <div>
            <span className="lbl">Próxima aula</span>
            <p>02.03 · Live · auditoria de 3 prompts reais do grupo</p>
          </div>
          <ArrowRight size={14} strokeWidth={2.4} />
        </a>
      </div>
    </Section>
  );
}
