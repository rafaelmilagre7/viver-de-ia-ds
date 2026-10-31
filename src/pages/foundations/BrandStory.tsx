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
          <Target size={16} strokeWidth={1.75} />
        </div>
        <span className="vds-bs-eyebrow">Missão</span>
        <h2>
          Tornar IA <em>operativa</em> pra quem não tem cargo de IA.
        </h2>
        <p>
          Pegamos a empresa real — fundador, head, gerente, time que toca a operação — e
          damos a ela soluções prontas, formações práticas e mentoria pra colocar IA em
          operação sem precisar de squad de ML, sem precisar virar engenheiro, sem depender
          de fornecedor terceiro. O resultado é medido em aumento de receita, redução de
          custos, e processos que param de quebrar.
        </p>
        <ul className="vds-bs-proof">
          <li>
            <strong className="mono">521</strong>
            <em>cases reais de implementação de IA</em>
          </li>
          <li>
            <strong className="mono">157</strong>
            <em>soluções de IA prontas para usar</em>
          </li>
          <li>
            <strong className="mono">29</strong>
            <em>setores já transformados com IA</em>
          </li>
        </ul>
      </article>

      <div className="vds-bs-rationale">
        <h4>Por que essa missão e não outra</h4>
        <p>
          O mercado de IA em 2025-2026 está partido em dois extremos. De um lado, conteúdo
          superficial — gurus vendendo “transformação digital” sem nenhum operador entregando
          resultado. Do outro, complexidade técnica inacessível — squads de ML, papers, jargão.
          Falta o meio: o operador que precisa fazer IA <em>funcionar dentro do negócio dele
          essa semana</em>, com responsabilidade pelo resultado.
        </p>
        <p>
          Viver de IA ocupa esse meio. Não somos curso de iniciante. Não somos consultoria
          tradicional. Somos a plataforma B2B de implementação pra quem opera e quer IA
          como ferramenta de receita ou eficiência, com soluções prontas, formação e
          mentoria ao vivo.
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
          <Eye size={16} strokeWidth={1.75} />
        </div>
        <span className="vds-bs-eyebrow alt">Visão · 2031</span>
        <h2>
          Toda operação de pequeno e médio porte com pelo menos <em>1 agente IA dedicado</em>,
          implementado, mantido e medido por um time interno alfabetizado em IA.
        </h2>
        <p className="vds-bs-statement-lede">
          A vitória não é o número de acessos. É o número de operações onde IA virou
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
              <em>Primeiros cases de implementação · método testado dentro de operações reais</em>
            </div>
          </li>
          <li className="now">
            <span className="vds-bs-year mono">2026</span>
            <div>
              <strong>Escala consciente</strong>
              <em>521 cases reais · 157 soluções prontas · 29 setores com implementação</em>
            </div>
            <span className="vds-bs-pin">Você está aqui</span>
          </li>
          <li>
            <span className="vds-bs-year mono">2028</span>
            <div>
              <strong>Ecossistema</strong>
              <em>Meta pública: R$&nbsp;1 bilhão em receita e economia para empresas com IA</em>
            </div>
          </li>
          <li>
            <span className="vds-bs-year mono">2031</span>
            <div>
              <strong>Infraestrutura cultural</strong>
              <em>IA operando em silêncio nas PMEs brasileiras · Viver de IA como referência de implementação</em>
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
        'Não inflamos números, não promete dinheiro fácil, não usamos clichês de transformação. Quando algo não funciona, dizemos. Quando o caminho é difícil, dizemos. Quando a empresa não tem perfil, dizemos antes da adesão.',
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
        'Material editorial denso, voz pensada, design coerente — mas sem teatro de qualidade. Não vendemos “premium” como marketing. Entregamos o detalhe porque é o jeito certo, e quem repara repara em silêncio.',
    },
    {
      n: '06',
      title: 'Comunidade como alavanca, não vitrine',
      body:
        'A comunidade não está aqui pra postar prints. Está aqui pra construir junto, trocar problemas reais, e levar uns aos outros adiante. Quem entra, é cobrado. Quem permanece, é porque está operando.',
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
            <Compass size={14} strokeWidth={1.75} />
            Declaração formal
          </span>
          <h3>
            Pra <em>operadores de PME brasileira</em> que precisam fazer IA gerar resultado
            agora,
            <br />
            <strong>Viver de IA</strong> é a plataforma de implementação que entrega soluções
            prontas, formação prática e mentoria,
            <br />
            ao contrário dos cursos de IA atuais que ou são teóricos demais (acadêmicos) ou
            superficiais demais (gurus).
          </h3>
        </div>

        <div className="vds-bs-positioning-r">
          <article>
            <span className="vds-bs-positioning-tag is">Somos</span>
            <ul>
              <li>Plataforma B2B · soluções prontas, formação prática, operação real</li>
              <li>Editorial · voz adulta, sem urgência fabricada</li>
              <li>Comunidade exigente · empresários e líderes que comparam casos</li>
              <li>Brasileiro · contexto PME brasileira, não case de Silicon Valley</li>
              <li>Pragmático · garantia de 90 dias com requisitos claros</li>
            </ul>
          </article>
          <article>
            <span className="vds-bs-positioning-tag not">Não somos</span>
            <ul>
              <li>Curso de “prompt engineering” superficial</li>
              <li>Bootcamp acadêmico de ML / data science</li>
              <li>Consultoria tradicional · relatório que fica na gaveta</li>
              <li>Marketplace de freelancer de IA</li>
              <li>Conteúdo de YouTube com promessa de “viralizar”</li>
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
      title="Promessa · o que a empresa leva em 90 dias"
      meta="o contrato editorial com o cliente"
    >
      <article className="vds-bs-promise">
        <span className="vds-bs-promise-aura" />
        <div className="vds-bs-promise-icon">
          <Heart size={16} strokeWidth={1.75} />
        </div>
        <span className="vds-bs-promise-eyebrow">Promessa</span>
        <h2>
          Em <em>90 dias</em>, sua empresa tem <em>aumento de receita ou redução de custos</em>{' '}
          com IA na operação — ou devolvemos 100% do investimento, cumpridos os 3
          requisitos da garantia.
        </h2>
        <p className="vds-bs-promise-lede">
          Os 3 requisitos, no mesmo prazo: concluir a trilha de onboarding, concluir 3
          formações e implementar as 3 soluções escolhidas na adesão. Condições completas
          na cláusula 7 dos termos de uso.
        </p>
        <div className="vds-bs-promise-grid">
          <div>
            <strong>O que está incluído</strong>
            <ul>
              <li>Todas as soluções Plug-and-Play · formações práticas</li>
              <li>Mentoria em grupo ao vivo · 10 check-ins/mês no Pro</li>
              <li>Consultor IA dentro da plataforma</li>
              <li>Comunidade de empresários e líderes</li>
              <li>Imersão presencial de implementação na sede</li>
            </ul>
          </div>
          <div>
            <strong>O que não está incluído</strong>
            <ul>
              <li>Solução sob medida · só no Enterprise, com AI Builder</li>
              <li>Garantia sem aplicação · exige os 3 requisitos</li>
              <li>Promessa de R$ X mil em receita · cada caso é caso</li>
              <li>Atalho pra “aprender em 7 dias”</li>
            </ul>
          </div>
        </div>
      </article>
    </Section>
  );
}
