import { Compass, Target, Eye, Heart } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './brand-story.css';

export default function BrandStory() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · marca"
        title={
          <>
            Por que <em>Viver de IA</em> existe.
          </>
        }
        lede="A história da marca em 3 dimensões — missão, visão, valores. Tudo o que vem depois (cor, tipografia, copy, produto) deriva daqui. Sem essas 3 dimensões alinhadas, qualquer DS vira só decoração."
      />

      <MissionSection />
      <VisionSection />
      <ValuesSection />
      <PositioningSection />
      <PromiseSection />
    </>
  );
}

/* ---------- Mission ---------- */
function MissionSection() {
  return (
    <Section
      title="Missão · o trabalho que existimos pra fazer"
      meta="hoje · operativa · mensurável"
    >
      <article className="vds-bs-statement via-mesh-navy via-noise">
        <span className="vds-bs-aura" />
        <div className="vds-bs-icon">
          <Target size={18} strokeWidth={1.6} />
        </div>
        <span className="vds-bs-eyebrow">Missão</span>
        <h2>
          Tornar IA <em>operativa</em> pra quem não tem cargo de IA.
        </h2>
        <p>
          Pegamos o operador real — fundador, head, gerente, autônomo que toca o próprio
          negócio — e damos a ele a capacidade de construir, manter e melhorar agentes IA que
          rodam em produção sem precisar de squad de ML, sem precisar virar engenheiro,
          sem depender de fornecedor terceiro. O resultado é mensurável em receita destravada,
          horas devolvidas, e processos que param de quebrar.
        </p>
        <ul className="vds-bs-proof">
          <li>
            <strong className="mono">+220</strong>
            <em>operadores formados desde 2024</em>
          </li>
          <li>
            <strong className="mono">R$ 1,8M</strong>
            <em>destravado por alunos em 12 meses</em>
          </li>
          <li>
            <strong className="mono">11.920</strong>
            <em>conversas/mês rodando em produção via Nina</em>
          </li>
        </ul>
      </article>

      <div className="vds-bs-rationale">
        <h4>Por que essa missão e não outra</h4>
        <p>
          O mercado de IA em 2025-2026 está partido em dois extremos. De um lado, conteúdo
          superficial — gurus vendendo "transformação digital" sem nenhum operador entregando
          resultado. Do outro, complexidade técnica inacessível — squads de ML, papers, jargão.
          Falta o meio: o operador que precisa fazer IA <em>funcionar dentro do negócio dele
          essa semana</em>, com responsabilidade pelo resultado.
        </p>
        <p>
          Viver de IA ocupa esse meio. Não somos curso de iniciante. Não somos consultoria
          enterprise. Somos a formação técnico-operativa pra quem opera e quer adicionar IA
          como ferramenta de receita ou eficiência, mantendo responsabilidade total pelo que
          construiu.
        </p>
      </div>
    </Section>
  );
}

/* ---------- Vision ---------- */
function VisionSection() {
  return (
    <Section
      title="Visão · o futuro que queremos construir"
      meta="onde queremos chegar · 5 anos"
    >
      <article className="vds-bs-statement">
        <span className="vds-bs-aura" />
        <div className="vds-bs-icon vds-bs-icon--light">
          <Eye size={18} strokeWidth={1.6} />
        </div>
        <span className="vds-bs-eyebrow alt">Visão · 2031</span>
        <h2>
          Toda operação de pequeno e médio porte com pelo menos <em>1 agente IA dedicado</em>,
          construído, mantido e medido por um operador interno formado por nós.
        </h2>
        <p className="vds-bs-statement-lede">
          A vitória não é o número de alunos. É o número de operações onde IA virou
          infraestrutura silenciosa — fazendo o trabalho que precisa ser feito enquanto
          o operador foca no que só humano pode fazer. Estratégia, relacionamento, julgamento.
        </p>
      </article>

      <div className="vds-bs-trajectory">
        <span className="vds-bs-trajectory-eyebrow">Marcos · onde estamos vs onde vamos</span>
        <ol>
          <li>
            <span className="vds-bs-year mono">2024</span>
            <div>
              <strong>Validação</strong>
              <em>Primeiras 50 turmas · prova de que operador comum constrói agente útil em 90 dias</em>
            </div>
          </li>
          <li className="now">
            <span className="vds-bs-year mono">2026</span>
            <div>
              <strong>Escala consciente</strong>
              <em>220 operadores ativos · 2 produtos próprios (Nina, Iris) · método codificado</em>
            </div>
            <span className="vds-bs-pin">você está aqui</span>
          </li>
          <li>
            <span className="vds-bs-year mono">2028</span>
            <div>
              <strong>Ecossistema</strong>
              <em>1.000+ operadores · marketplace de mentores · certificação reconhecida pelo mercado</em>
            </div>
          </li>
          <li>
            <span className="vds-bs-year mono">2031</span>
            <div>
              <strong>Infraestrutura cultural</strong>
              <em>"Operador de IA" virou cargo padrão em PMEs brasileiras · Viver de IA é a referência de formação</em>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}

/* ---------- Values ---------- */
function ValuesSection() {
  const values = [
    {
      n: '01',
      title: 'Resultado antes de teoria',
      body:
        'Toda aula, toda mentoria, toda peça que escrevemos termina com algo aplicável na semana. Teoria existe pra suportar o resultado, não como fim. Se a aula não destrava algo concreto pro operador, ela é refeita.',
    },
    {
      n: '02',
      title: 'Responsabilidade técnica',
      body:
        'O operador formado por nós tem que conseguir ler, debugar, evoluir o que ele mesmo construiu. Sem caixas-pretas. Sem dependência de fornecedor escondido. Quando ensinamos uma stack, ensinamos com profundidade suficiente pra o aluno virar mantenedor.',
    },
    {
      n: '03',
      title: 'Honestidade editorial',
      body:
        'Não inflamos números, não promete dinheiro fácil, não usamos clichês de transformação. Quando algo não funciona, dizemos. Quando o caminho é difícil, dizemos. Quando o aluno não tem perfil, dizemos antes da matrícula.',
    },
    {
      n: '04',
      title: 'Pequeno antes de grande',
      body:
        'Sempre o agente menor que resolve. Sempre o caso de uso mais concreto antes do mais ambicioso. Sempre 1 conversa funcionando antes de tentar 100. Volume vem como consequência, não como ponto de partida.',
    },
    {
      n: '05',
      title: 'Padrão alto, sem performar excelência',
      body:
        'Material editorial denso, voz pensada, design coerente — mas sem teatro de qualidade. Não vendemos "premium" como marketing. Entregamos o detalhe porque é o jeito certo, e quem repara repara em silêncio.',
    },
    {
      n: '06',
      title: 'Comunidade como alavanca, não vitrine',
      body:
        'A turma não está aqui pra postar prints. Está aqui pra construir junto, trocar problemas reais, e levar uns aos outros adiante. Quem entra, é cobrado. Quem permanece, é porque está operando.',
    },
    {
      n: '07',
      title: 'IA como ferramenta, operador como protagonista',
      body:
        'A história é sobre o que o humano destrava com IA, não sobre o modelo do mês. Ferramentas mudam. O operador formado fica.',
    },
  ];

  return (
    <Section
      title="Valores · como decidimos quando bate dúvida"
      meta="7 valores · não-negociáveis"
    >
      <div className="vds-bs-values">
        {values.map((v) => (
          <article key={v.n} className="vds-bs-value">
            <span className="vds-bs-value-num mono">{v.n}</span>
            <div>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Positioning ---------- */
function PositioningSection() {
  return (
    <Section
      title="Posicionamento · o que somos e o que não somos"
      meta="declaração formal · ancorada nas dimensões competitivas"
    >
      <article className="vds-bs-positioning">
        <div className="vds-bs-positioning-l">
          <span className="vds-bs-positioning-eyebrow">
            <Compass size={11} strokeWidth={2.2} />
            Declaração formal
          </span>
          <h3>
            Pra <em>operadores de PME brasileira</em> que precisam fazer IA gerar resultado
            agora,
            <br />
            <strong>Viver de IA</strong> é a formação técnico-operativa que entrega capacidade
            real de construção e manutenção,
            <br />
            ao contrário dos cursos de IA atuais que ou são teóricos demais (acadêmicos) ou
            superficiais demais (gurus).
          </h3>
        </div>

        <div className="vds-bs-positioning-r">
          <article>
            <span className="vds-bs-positioning-tag is">somos</span>
            <ul>
              <li>Técnico-operativo · stack real, código real, produção real</li>
              <li>Editorial · voz adulta, sem urgência fabricada</li>
              <li>Comunidade exigente · operadores que comparam casos</li>
              <li>Brasileiro · contexto PME brasileira, não case de Silicon Valley</li>
              <li>Pragmático · resultado em 90 dias ou menos</li>
            </ul>
          </article>
          <article>
            <span className="vds-bs-positioning-tag not">não somos</span>
            <ul>
              <li>Curso de "prompt engineering" superficial</li>
              <li>Bootcamp acadêmico de ML / data science</li>
              <li>Consultoria pra enterprise · não atendemos Fortune 500</li>
              <li>Marketplace de freelancer de IA</li>
              <li>Conteúdo de YouTube com promessa de "viralizar"</li>
            </ul>
          </article>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Promise ---------- */
function PromiseSection() {
  return (
    <Section
      title="Promessa · o que o operador leva ao terminar"
      meta="o contrato editorial com o aluno"
    >
      <article className="vds-bs-promise">
        <span className="vds-bs-promise-aura" />
        <div className="vds-bs-promise-icon">
          <Heart size={18} strokeWidth={1.6} />
        </div>
        <span className="vds-bs-promise-eyebrow">Promessa</span>
        <h2>
          Em <em>90 dias</em>, você sai daqui com pelo menos <em>1 agente IA em produção</em>
          dentro da sua operação, construído por você, mantido por você, gerando resultado
          mensurável.
        </h2>
        <p className="vds-bs-promise-lede">
          Não saímos com diploma. Saímos com agente rodando. Esse é o critério único de
          formatura — e quem não chega lá, fica no programa até chegar. Sem mensalidade
          extra, sem turma de segunda chance, sem culpa.
        </p>
        <div className="vds-bs-promise-grid">
          <div>
            <strong>O que está incluído</strong>
            <ul>
              <li>18 aulas estruturadas · 4 lives ao vivo · 2 estudos de caso entregues</li>
              <li>Mentoria 1:1 com operadores que já fizeram</li>
              <li>Acesso vitalício à plataforma + atualizações</li>
              <li>Comunidade fechada de turma · Discord curado</li>
              <li>Templates, prompts, código-base reutilizável</li>
            </ul>
          </div>
          <div>
            <strong>O que não está incluído</strong>
            <ul>
              <li>Agente pronto entregue · você que constrói</li>
              <li>API tokens e infraestrutura cloud · custo do operador</li>
              <li>Promessa de R$ X mil em receita · cada caso é caso</li>
              <li>Atalho pra "aprender em 7 dias"</li>
            </ul>
          </div>
        </div>
      </article>
    </Section>
  );
}
