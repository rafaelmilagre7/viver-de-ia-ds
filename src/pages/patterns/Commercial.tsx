import { Check, Compass, FileText, Layers } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import wordmarkWhite from '../../assets/logos/VIVER_DE_IA_white.png';
import wordmarkBlack from '../../assets/logos/VIVER_DE_IA_black.png';
import './commercial.css';

/* ============================================================
   Commercial · pitch deck + one-pager + case + proposta + contract
   ============================================================ */

export default function Commercial() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · commercial / sales"
        title={
          <>
            Material comercial com <em>peso editorial</em>.
          </>
        }
        lede="Pitch deck Google Slides (12 slides canônicos), one-pager B2B PDF-ready, case study editorial, proposta/orçamento format, contract visual minimalista. Cada peça com voz consultivo-objetivo (custo do cliente → solução → prova → próximo passo)."
      />

      <PitchDeckSection />
      <OnePagerSection />
      <CaseStudySection />
      <ProposalSection />
      <ContractSection />
    </>
  );
}

/* ---------- Pitch deck · 12 slides Google Slides ---------- */
function PitchDeckSection() {
  const slides = [
    { n: '01', kind: 'capa', h: 'Viver de IA', sub: 'Formação técnico-operativa em IA · 2026', meta: 'capa · navy mesh + wordmark' },
    { n: '02', kind: 'problema', h: 'O operador médio brasileiro não opera IA.', sub: 'opera Excel · opera ERP · opera Notion. Não opera agente IA.', meta: 'declaração do problema · sem foto literal' },
    { n: '03', kind: 'mercado', h: '+220 operadores formados', sub: 'R$ 1,8M destravado · 12 meses · 92% chega ao agente em produção', meta: 'prova com número' },
    { n: '04', kind: 'método', h: 'Método em 3 atos.', sub: 'estuda · constrói · opera · 90 dias até primeiro agente em produção', meta: 'método overview' },
    { n: '05', kind: 'método-detalhe', h: 'Ato 1 · Estuda', sub: '18 aulas estruturadas · stack real (Claude SDK, OpenAI, open-source) · sem teoria de palestra', meta: 'detalhe ato 1' },
    { n: '06', kind: 'método-detalhe', h: 'Ato 2 · Constrói', sub: '4 lives ao vivo auditando prompts · 2 estudos de caso entregues · mentoria 1:1 mensal', meta: 'detalhe ato 2' },
    { n: '07', kind: 'método-detalhe', h: 'Ato 3 · Opera', sub: 'agente em produção · medido · responsabilidade do operador · plataforma + comunidade vitalícios', meta: 'detalhe ato 3' },
    { n: '08', kind: 'caso', h: 'Caso · Caio Ribeiro', sub: 'construiu Nina · 11.920 conversas/mês · método dentro da própria operação', meta: 'caso real próprio' },
    { n: '09', kind: 'caso', h: 'Caso · Camila Moraes', sub: 'agente proposta · 73% menos token · ROI em 2 meses', meta: 'caso real cliente' },
    { n: '10', kind: 'preço', h: 'R$ 2.400/mês · 4 meses', sub: '18 aulas · 4 lives · mentoria 1:1 mensal · comunidade vitalícia · garantia 90 dias', meta: 'oferta + garantia' },
    { n: '11', kind: 'proximo', h: 'Próximo passo', sub: '30min de call · sex 22/mai · audito teu caso, dimensiono fit, te conto se faz sentido', meta: 'CTA específico' },
    { n: '12', kind: 'thank-you', h: 'Obrigado.', sub: 'viverdeia.ai · caio@viverdeia.ai · @caioribeiro', meta: 'contato + thank-you' },
  ];

  return (
    <Section
      title="Pitch deck · 12 slides canônicos"
      meta="Google Slides 16:9 · navy mesh · 1 ideia por slide · número como protagonista"
    >
      <div className="vds-com-deck">
        {slides.map((s) => (
          <article key={s.n} className={`vds-com-slide vds-com-slide--${s.kind}`}>
            <header className="vds-com-slide-meta">
              <span className="vds-com-slide-num mono">{s.n}</span>
              <em>{s.meta}</em>
            </header>
            <div className="vds-com-slide-canvas via-mesh-navy via-noise">
              {s.kind === 'capa' ? (
                <>
                  <img src={wordmarkWhite} alt="Viver de IA" className="vds-com-slide-wordmark" />
                  <p className="vds-com-slide-tagline">{s.sub}</p>
                </>
              ) : s.kind === 'thank-you' ? (
                <>
                  <img src={monogramWhite} alt="" className="vds-com-slide-mono-big" />
                  <h2>{s.h}</h2>
                  <p>{s.sub}</p>
                </>
              ) : (
                <>
                  <h2>{s.h}</h2>
                  <p>{s.sub}</p>
                  <img src={monogramWhite} alt="" className="vds-com-slide-mono" />
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      <article className="vds-com-deck-rules">
        <h4>Regras canônicas do deck</h4>
        <ul>
          <li><strong>16:9 · Google Slides 1920×1080</strong> · exporta como tema reutilizável</li>
          <li><strong>1 ideia por slide</strong> · não 5 bullets · headline + 1 frase suporte</li>
          <li><strong>Número como protagonista</strong> · Geist Display peso 500 · tabular</li>
          <li><strong>Monogram bottom-right</strong> · 24px · opacity 0.5 · marca a sequência</li>
          <li><strong>Sem foto stock</strong> · navy mesh + tipografia carrega o slide</li>
          <li><strong>Capa + thank-you · wordmark central</strong> · só esses 2 slides têm wordmark</li>
        </ul>
      </article>
    </Section>
  );
}

/* ---------- One-pager B2B ---------- */
function OnePagerSection() {
  return (
    <Section
      title="One-pager B2B · PDF A4 · 1 página"
      meta="começa pelo custo atual do cliente · termina com próximo passo concreto"
    >
      <article className="vds-com-onepager">
        <header>
          <img src={wordmarkBlack} alt="Viver de IA" />
          <span className="vds-com-onepager-tag">
            <FileText size={11} strokeWidth={2.2} />
            one-pager · executivo
          </span>
        </header>

        <h2>
          Operadores formando operadores.<br />
          <em>Método codificado em 220 alunos.</em>
        </h2>

        <div className="vds-com-onepager-stats">
          <div>
            <strong className="mono">+220</strong>
            <em>operadores formados</em>
          </div>
          <div>
            <strong className="mono">R$ 1,8M</strong>
            <em>destravado em 12 meses</em>
          </div>
          <div>
            <strong className="mono">92%</strong>
            <em>chegam ao agente em prod</em>
          </div>
          <div>
            <strong className="mono">90 dias</strong>
            <em>até primeiro agente</em>
          </div>
        </div>

        <div className="vds-com-onepager-cols">
          <article>
            <h3>Pra quem é</h3>
            <p>
              Operador de PME brasileira (fundador, head, gerente, autônomo que toca o
              próprio negócio) que precisa fazer IA gerar resultado mensurável dentro da
              operação dele essa semana — sem squad de ML, sem virar engenheiro, sem
              depender de fornecedor terceiro.
            </p>
          </article>

          <article>
            <h3>O que recebe</h3>
            <ul>
              <li><Check size={12} strokeWidth={2.4} /> 18 aulas estruturadas</li>
              <li><Check size={12} strokeWidth={2.4} /> 4 lives ao vivo · auditoria de prompts</li>
              <li><Check size={12} strokeWidth={2.4} /> Mentoria 1:1 mensal</li>
              <li><Check size={12} strokeWidth={2.4} /> Comunidade fechada vitalícia</li>
              <li><Check size={12} strokeWidth={2.4} /> 2 estudos de caso entregues</li>
              <li><Check size={12} strokeWidth={2.4} /> Templates · prompts · código-base</li>
            </ul>
          </article>

          <article>
            <h3>Garantia</h3>
            <p>
              <strong>90 dias até agente em produção · ou continua sem mensalidade extra
              até chegar.</strong> Devolução total em 60 dias se não fizer sentido,
              sem perguntas.
            </p>
          </article>
        </div>

        <footer>
          <div>
            <strong>Próxima turma · 2026.3</strong>
            <em>abre 22 mai 9h · 30 vagas · 4 meses · começa em jun</em>
          </div>
          <a href="#" className="vds-com-onepager-cta">
            viverdeia.ai/turma
          </a>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Case study ---------- */
function CaseStudySection() {
  return (
    <Section
      title="Case study editorial · caso atribuído com número"
      meta="formato: contexto → desafio → método → resultado · sem 'aumentou em X%' genérico"
    >
      <article className="vds-com-case">
        <header>
          <div className="vds-com-case-mark">
            <Layers size={11} strokeWidth={2.2} />
            case study · turma 2025.3
          </div>
          <h2>
            Camila Moraes reduziu o token<br />
            do agente em <em>73%</em>.
          </h2>
          <p>
            CTO da Mantra Tech, fintech B2B, 12 pessoas no time. Agente de geração de
            proposta tava consumindo 8.400 tokens/proposta no início de fev/2026.
          </p>
        </header>

        <div className="vds-com-case-body">
          <article>
            <span className="vds-com-case-eyebrow">contexto</span>
            <p>
              Mantra Tech construiu primeiro agente em fev 2026 dentro da turma 2025.3.
              Caso de uso: gerar proposta comercial customizada por lead, consumindo
              contexto da call de descoberta + perfil da empresa + features cabíveis.
              Funcionou. Custou 8.400 tokens por proposta · ~R$ 1,20/proposta · 800
              propostas/mês = <strong>R$ 960/mês de API only</strong>.
            </p>
          </article>

          <article>
            <span className="vds-com-case-eyebrow">desafio</span>
            <p>
              ROI ficou marginal · ela tava considerando matar o agente porque a margem
              não justificava a complexidade. Trouxe pra mentoria 1:1 esperando ouvir
              "muda o modelo pra mais barato". Mostrei que o problema não era o modelo —
              era o contexto carregando coisa que não precisava.
            </p>
          </article>

          <article>
            <span className="vds-com-case-eyebrow">método aplicado</span>
            <ol>
              <li>Auditoria do system prompt · cortou 40% do contexto repetido em cada call</li>
              <li>Schema validation pra saída JSON · removeu retry loop que consumia tokens 2x</li>
              <li>Contexto dinâmico por tipo de lead · só carrega o que aquela proposta precisa</li>
            </ol>
          </article>

          <article>
            <span className="vds-com-case-eyebrow">resultado · mensurado contra mesma cohort</span>
            <div className="vds-com-case-stats">
              <div>
                <strong className="mono">8.400 → 2.260</strong>
                <em>tokens/proposta · -73%</em>
              </div>
              <div>
                <strong className="mono">R$ 960 → R$ 261</strong>
                <em>custo mensal API · -73%</em>
              </div>
              <div>
                <strong className="mono">2 meses</strong>
                <em>ROI do programa Viver de IA</em>
              </div>
            </div>
          </article>
        </div>

        <footer>
          <blockquote>
            "Sem essa mentoria eu teria matado o agente. Hoje ele paga o programa.
            Em julho ele vai estar pagando minha mensalidade pelos próximos 2 anos."
          </blockquote>
          <cite>
            <strong>Camila Moraes</strong>
            <em>CTO · Mantra Tech · turma 2025.3</em>
          </cite>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Proposta / orçamento ---------- */
function ProposalSection() {
  return (
    <Section
      title="Proposta / orçamento · B2B"
      meta="formato A4 · header com VIA · 3 colunas · CTA único de assinatura"
    >
      <article className="vds-com-proposal">
        <header>
          <div>
            <img src={wordmarkBlack} alt="Viver de IA" />
            <span className="vds-com-proposal-num mono">PRO-2026-00428</span>
          </div>
          <div className="vds-com-proposal-meta">
            <em>Emitida</em>
            <strong>20 mai 2026</strong>
            <em>Válida até</em>
            <strong>27 mai 2026</strong>
          </div>
        </header>

        <section>
          <h3>
            <Compass size={13} strokeWidth={2.2} />
            Para
          </h3>
          <div className="vds-com-proposal-for">
            <strong>Efizi Sistemas LTDA · CNPJ 18.524.872/0001-92</strong>
            <em>R. Princesa Isabel 145 · São Paulo, SP · 04601-000</em>
            <em>Att: Márisson Lage · CTO</em>
          </div>
        </section>

        <section>
          <h3>Escopo</h3>
          <p>
            Formação técnico-operativa em IA para Márisson Lage e 1 operador interno da
            Efizi Sistemas. Programa Viver de IA · turma 2026.3 · 4 meses · começa em
            jun/2026.
          </p>
          <ul className="vds-com-proposal-list">
            <li><Check size={12} strokeWidth={2.4} /> 18 aulas estruturadas · stack real (Claude SDK / OpenAI)</li>
            <li><Check size={12} strokeWidth={2.4} /> 4 lives ao vivo · auditoria de prompts (1×/mês)</li>
            <li><Check size={12} strokeWidth={2.4} /> Mentoria 1:1 mensal · 60min cada (Caio · fundador)</li>
            <li><Check size={12} strokeWidth={2.4} /> Comunidade fechada vitalícia (Discord curado)</li>
            <li><Check size={12} strokeWidth={2.4} /> 2 estudos de caso entregues e auditados</li>
            <li><Check size={12} strokeWidth={2.4} /> Garantia: 90 dias até agente em produção</li>
          </ul>
        </section>

        <section className="vds-com-proposal-cost">
          <h3>Investimento</h3>
          <table>
            <tbody>
              <tr>
                <td>Programa Viver de IA · turma 2026.3 · 2 vagas</td>
                <td className="mono">R$ 4.800/mês</td>
              </tr>
              <tr>
                <td>Período · 4 meses</td>
                <td className="mono">×4</td>
              </tr>
              <tr className="vds-com-proposal-total">
                <td><strong>Total</strong></td>
                <td className="mono"><strong>R$ 19.200,00</strong></td>
              </tr>
            </tbody>
          </table>
          <em className="vds-com-proposal-payment">
            Pagamento mensal direto na fatura · cartão ou PIX · NF emitida no dia 1 de
            cada mês.
          </em>
        </section>

        <footer>
          <div>
            <strong>Próximo passo</strong>
            <em>
              Aceite válido até <strong>27 mai 2026</strong>. Após aceite, mando link de
              pagamento + dados de acesso à plataforma em 2h úteis.
            </em>
          </div>
          <button className="vds-com-proposal-cta">
            Aceitar proposta
          </button>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Contract visual ---------- */
function ContractSection() {
  return (
    <Section
      title="Contract / agreement · visual minimalista"
      meta="documento legal · zero design floreio · só hierarquia editorial limpa"
    >
      <article className="vds-com-contract">
        <header>
          <img src={wordmarkBlack} alt="Viver de IA" />
          <div>
            <strong>Contrato de prestação de serviços educacionais</strong>
            <em>Programa Viver de IA · turma 2026.3</em>
          </div>
        </header>

        <section>
          <h3>1 · Partes</h3>
          <p>
            <strong>Contratante:</strong> Efizi Sistemas LTDA · CNPJ 18.524.872/0001-92 ·
            representada por Márisson Lage, CTO.
          </p>
          <p>
            <strong>Contratada:</strong> Viver de IA Educação LTDA · CNPJ 47.392.184/0001-22 ·
            representada por Caio Ribeiro, fundador.
          </p>
        </section>

        <section>
          <h3>2 · Objeto</h3>
          <p>
            Prestação de serviço educacional na modalidade EAD + mentoria síncrona, pelo
            período de 4 meses contínuos a partir de <strong>3 jun 2026</strong>, conforme
            escopo detalhado na proposta PRO-2026-00428.
          </p>
        </section>

        <section>
          <h3>3 · Garantia</h3>
          <p>
            A Contratada garante que, ao término dos 4 meses, o Contratante terá pelo
            menos 1 (um) agente IA em ambiente de produção dentro de sua própria operação,
            construído pelo Contratante com suporte da Contratada. Caso isso não ocorra,
            o Contratante mantém acesso ao programa sem custo adicional até atingir o
            resultado.
          </p>
        </section>

        <section>
          <h3>4 · Devolução</h3>
          <p>
            <strong>60 dias corridos</strong> a partir do início do programa para devolução
            integral dos valores pagos, sem necessidade de justificativa.
          </p>
        </section>

        <section>
          <h3>5 · Propriedade intelectual</h3>
          <p>
            Todo conteúdo (aulas, materiais, código-base) permanece propriedade da
            Contratada. O Contratante recebe licença vitalícia de uso pessoal e dentro
            de sua própria operação. Vedada redistribuição.
          </p>
        </section>

        <footer>
          <div className="vds-com-contract-sig">
            <span className="line" />
            <strong>Márisson Lage</strong>
            <em>Efizi Sistemas LTDA · Contratante</em>
          </div>
          <div className="vds-com-contract-sig">
            <span className="line" />
            <strong>Caio Ribeiro</strong>
            <em>Viver de IA Educação LTDA · Contratada</em>
          </div>
        </footer>

        <p className="vds-com-contract-loc mono">São Paulo, 20 mai 2026 · 2 vias de igual teor · 1 testemunha presencial.</p>
      </article>
    </Section>
  );
}
