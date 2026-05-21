import { TrendingUp, Compass, Type, Award, Eye, Layers, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './personality.css';

type Trait = {
  n: string;
  icon: LucideIcon;
  name: string;
  headline: React.ReactNode;
  summary: string;
  behavior: string;
  avoid: string;
};

const traits: Trait[] = [
  {
    n: '01',
    icon: TrendingUp,
    name: 'Operador-experiente',
    headline: (
      <>
        Fala de cima do palco <em>com cicatriz</em> — não de fora do palco com slide.
      </>
    ),
    summary:
      'A voz da marca é de quem operou, mediu, ajustou. Não de quem leu o paper na sexta e ensinou na segunda.',
    behavior: 'Conta caso real próprio. Cita número que mediu. Reconhece o que não sabe.',
    avoid: 'Tom acadêmico. Linguagem de palestrante motivacional. Promessa sem prova.',
  },
  {
    n: '02',
    icon: BookOpen,
    name: 'Editorial',
    headline: (
      <>
        Trabalha tipografia, ritmo e espaço <em>como ferramentas</em> — não decoração.
      </>
    ),
    summary:
      'Hierarquia visual é argumento. Respiro é ênfase. O conteúdo vence porque a forma deixa.',
    behavior: 'Headlines com peso. Body com respiro. Citação atribuída. Italic só em ênfase real.',
    avoid: 'Texto comprido sem hierarquia. Caixa-alta em massa. Emoji decorativo no corpo.',
  },
  {
    n: '03',
    icon: Layers,
    name: 'Denso',
    headline: (
      <>
        Cada parágrafo carrega <em>informação que não está em outro lugar</em>.
      </>
    ),
    summary:
      'Sem enchimento. Sem repetição em sinônimos. Sem definir termo que o leitor já sabe.',
    behavior: 'Densidade técnica + clareza editorial. Frase corta o gordo. Exemplo concreto.',
    avoid: 'Encher linguiça. Definir termo óbvio. Repetir frase em sinônimos.',
  },
  {
    n: '04',
    icon: Eye,
    name: 'Sem guru-bro',
    headline: (
      <>
        Confiante <em>sem ser estridente</em>. Vende processo, não transformação.
      </>
    ),
    summary:
      'Não usa "revolucione", "transforme", "mude sua vida". O peso vem do número, não do adjetivo.',
    behavior: 'Ponto final, raramente exclamação. Promessa específica e mensurável.',
    avoid: '"Revolucione". "Transforme". "Mude sua vida". "O futuro chegou".',
  },
  {
    n: '05',
    icon: Compass,
    name: 'Pragmático',
    headline: (
      <>
        Sempre a coisa menor que <em>resolve esta semana</em>.
      </>
    ),
    summary:
      'Versão mínima antes da elegante. Caso de uso concreto antes da teoria. Pra ser usado, não admirado.',
    behavior: 'Caso de uso concreto antes de teoria. Versão mínima antes da elegante.',
    avoid: 'Abstração filosófica. Ferramenta sem caso. Aula que não destrava nada.',
  },
  {
    n: '06',
    icon: Award,
    name: 'Navy-protagonista',
    headline: (
      <>
        Atmosfera navy + branco + cinza. <em>Editorial premium sem dourado</em>.
      </>
    ),
    summary:
      'Cor é usada homeopaticamente. Tom premium vem de tipografia, peso e contraste — não de saturação.',
    behavior: 'Surfaces escuras em momentos de peso. Branco/off-white em respiro. Cinza estruturando.',
    avoid: 'Gold, amber, amarelo. Cyan/magenta/neon. Roxo "IA". Gradient quente.',
  },
  {
    n: '07',
    icon: Type,
    name: 'Número-sobre-adjetivo',
    headline: (
      <>
        Cada afirmação carrega <em>métrica ou citação atribuída</em>.
      </>
    ),
    summary:
      '"+11.920 conversas/mês" vence "muita gente já fez". O específico convence; o genérico esfria.',
    behavior: '"11.920 conversas/mês", "+R$ 1,8M destravado", "220 mentorados desde 2024".',
    avoid: '"Centenas de alunos", "muita gente já fez", "resultados impressionantes".',
  },
];

const axes = [
  { l: 'Acadêmico', r: 'Guru', pos: 32, our: 'operador-experiente' },
  { l: 'Quieto', r: 'Estridente', pos: 38, our: 'confiante calmo' },
  { l: 'Frio', r: 'Caloroso', pos: 58, our: 'caloroso-objetivo' },
  { l: 'Genérico', r: 'Hiper-nichado', pos: 70, our: 'PME brasileira IA' },
  { l: 'Curto-instagram', r: 'Profundo-livro', pos: 65, our: 'editorial denso' },
  { l: 'Minimalista frio', r: 'Maximalista vibrante', pos: 28, our: 'minimalista quente' },
];

const quiz: Array<{ a: string; b: string; right: 'a' | 'b'; why: string }> = [
  {
    a: '"Aprenda IA do zero e transforme sua carreira em 30 dias!"',
    b: '"Construa seu primeiro agente em produção em 90 dias. Sem squad. Sem código mágico."',
    right: 'b',
    why: 'Promessa específica + condição realista. Sem exclamação. Sem "transformação".',
  },
  {
    a: '"Junte-se a centenas de profissionais que já estão usando IA pra revolucionar o trabalho."',
    b: '"220 operadores formados em 2 anos. R$ 1,8M destravado. 14h de resposta média da Nina."',
    right: 'b',
    why: 'Número específico + período + métrica de operação. Não "centenas" genérico.',
  },
  {
    a: '"✨ A revolução da IA chegou! Não fique pra trás."',
    b: '"Em 2025 o operador que não sabe IA não sabe operar. Aqui você aprende com quem opera."',
    right: 'b',
    why: 'Sem sparkle. Sem urgência fabricada. Afirmação factual + posicionamento.',
  },
];

export default function Personality() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · marca"
        title={
          <>
            7 atributos de personalidade que <em>moldam toda decisão</em>.
          </>
        }
        lede="Personality é como a marca se comporta — não o que ela vende. Toda escolha visual, copy, motion, produto passa por esses 7. Quando bater dúvida, volta aqui."
      />

      {traits.map((t) => {
        const I = t.icon;
        return (
          <Section
            key={t.n}
            title={`Atributo ${t.n} · ${t.name}`}
            meta="comportamento e proibição"
          >
            <article className="vds-pers-trait">
              <header>
                <span className="vds-pers-num">{t.n}</span>
                <div className="vds-pers-trait-body">
                  <h3>{t.headline}</h3>
                  <p className="vds-pers-sum">{t.summary}</p>
                </div>
                <div className="vds-pers-icon">
                  <I size={18} strokeWidth={1.6} />
                </div>
              </header>

              <div className="vds-pers-pair">
                <div className="vds-pers-do">
                  <span className="lbl">Comportamento</span>
                  <p>{t.behavior}</p>
                </div>
                <div className="vds-pers-dont">
                  <span className="lbl">Evita</span>
                  <p>{t.avoid}</p>
                </div>
              </div>
            </article>
          </Section>
        );
      })}

      <Section
        title="Spectrum · onde estamos vs onde não estamos"
        meta="6 eixos · posicionando entre extremos"
      >
        <div className="vds-pers-spectrum">
          {axes.map((s, i) => (
            <article key={i} className="vds-pers-axis">
              <div className="vds-pers-axis-label">
                <span>{s.l}</span>
                <em>{s.our}</em>
                <span>{s.r}</span>
              </div>
              <div className="vds-pers-axis-track">
                <span className="vds-pers-axis-dot" style={{ left: `${s.pos}%` }} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="Teste rápido · pegou o tom?"
        meta="3 pares · escolha qual cabe na marca"
      >
        <div className="vds-pers-test">
          {quiz.map((q, i) => (
            <article key={i} className="vds-pers-quiz">
              <div className={`vds-pers-opt ${q.right === 'a' ? 'good' : 'bad'}`}>
                <span className="lbl">{q.right === 'a' ? 'Tom certo' : 'Tom errado'}</span>
                <p>{q.a}</p>
              </div>
              <div className={`vds-pers-opt ${q.right === 'b' ? 'good' : 'bad'}`}>
                <span className="lbl">{q.right === 'b' ? 'Tom certo' : 'Tom errado'}</span>
                <p>{q.b}</p>
              </div>
              <p className="vds-pers-why">
                <strong>Por quê:</strong> {q.why}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
