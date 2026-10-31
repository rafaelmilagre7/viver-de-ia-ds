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
    { n: '01', kind: 'capa', h: 'Viver de IA', sub: 'Plataforma de implementação de IA · 2026', meta: 'capa · navy mesh + wordmark' },
    { n: '02', kind: 'problema', h: 'A empresa brasileira fala de IA. Não opera IA.', sub: 'opera Excel · opera ERP · opera Notion. A IA fica no discurso.', meta: 'declaração do problema · sem foto literal' },
    { n: '03', kind: 'mercado', h: '521 cases reais', sub: '521 cases reais de implementação de IA · 157 soluções prontas · 29 setores', meta: 'prova com número' },
    { n: '04', kind: 'método', h: 'Método em 3 atos.', sub: 'alfabetiza · implementa · mede · trilha de onboarding até a primeira solução rodando', meta: 'método overview' },
    { n: '05', kind: 'método-detalhe', h: 'Ato 1 · Alfabetiza', sub: 'formações práticas · trilha personalizada com IA · do CEO ao analista, sem teoria de palestra', meta: 'detalhe ato 1' },
    { n: '06', kind: 'método-detalhe', h: 'Ato 2 · Implementa', sub: '157 soluções Plug-and-Play · Consultor IA dentro da plataforma · mentorias em grupo ao vivo', meta: 'detalhe ato 2' },
    { n: '07', kind: 'método-detalhe', h: 'Ato 3 · Mede', sub: 'solução em operação · quem está aplicando, engajamento e ROI no dashboard · comunidade de líderes', meta: 'detalhe ato 3' },
    { n: '08', kind: 'caso', h: 'Caso · Viva Nexo', sub: 'de 6h para cliques · economiza R$ 162.000 · case real em viverdeia.ai/cases', meta: 'caso real cliente' },
    { n: '09', kind: 'caso', h: 'Caso · Trivia Studio', sub: 'de processos manuais a R$ 120.000 de economia anual', meta: 'caso real cliente' },
    { n: '10', kind: 'preço', h: 'Pro · R$ 3.780/mês', sub: 'contratação anual · 10 check-ins/mês de mentoria em grupo · comunidade · garantia de 90 dias', meta: 'oferta + garantia' },
    { n: '11', kind: 'proximo', h: 'Próximo passo', sub: '30min de call · [data] · entendo seu cenário, indico o plano, conto se faz sentido', meta: 'CTA específico' },
    { n: '12', kind: 'thank-you', h: 'Obrigado.', sub: 'viverdeia.ai · viverdeia.ai/planos · viverdeia.ai/cases', meta: 'contato + thank-you' },
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
            <FileText size={14} strokeWidth={1.75} />
            One-pager · executivo
          </span>
        </header>

        <h2>
          Da IA no discurso à IA na operação.<br />
          <em>521 cases reais de implementação.</em>
        </h2>

        <div className="vds-com-onepager-stats">
          <div>
            <strong className="mono">521</strong>
            <em>cases reais de implementação</em>
          </div>
          <div>
            <strong className="mono">157</strong>
            <em>soluções de IA prontas</em>
          </div>
          <div>
            <strong className="mono">29</strong>
            <em>setores com implementação</em>
          </div>
          <div>
            <strong className="mono">90 dias</strong>
            <em>de garantia com requisitos</em>
          </div>
        </div>

        <div className="vds-com-onepager-cols">
          <article>
            <h3>Pra quem é</h3>
            <p>
              Empresário ou líder de empresa brasileira (fundador, CEO, head, gerente)
              que precisa fazer a IA gerar resultado mensurável dentro da operação —
              reduzir custo, aumentar receita — sem squad de ML, sem time técnico, sem
              depender de fornecedor terceiro.
            </p>
          </article>

          <article>
            <h3>O que recebe</h3>
            <ul>
              <li><Check size={14} strokeWidth={1.75} /> Soluções Plug-and-Play</li>
              <li><Check size={14} strokeWidth={1.75} /> Formações práticas</li>
              <li><Check size={14} strokeWidth={1.75} /> Consultor IA na plataforma</li>
              <li><Check size={14} strokeWidth={1.75} /> Comunidade de empresários e líderes</li>
              <li><Check size={14} strokeWidth={1.75} /> Imersão presencial na sede</li>
              <li><Check size={14} strokeWidth={1.75} /> Mentoria em grupo · 10 check-ins/mês (Pro)</li>
            </ul>
          </article>

          <article>
            <h3>Garantia</h3>
            <p>
              <strong>100% do investimento de volta se, em 90 dias, não houver aumento
              de receita nem redução de custos.</strong> Exige 3 requisitos: trilha de
              onboarding, 3 formações e 3 soluções · cláusula 7.
            </p>
          </article>
        </div>

        <footer>
          <div>
            <strong>Plano Pro · R$ 3.780/mês</strong>
            <em>contratação anual · 10 check-ins/mês de mentoria em grupo</em>
          </div>
          <a href="#" className="vds-com-onepager-cta">
            viverdeia.ai/planos
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
            <Layers size={14} strokeWidth={1.75} />
            case real · Saúde
          </div>
          <h2>
            Viva Nexo foi de 6h<br />
            para <em>cliques</em>.
          </h2>
          <p>
            Case real publicado em viverdeia.ai/cases · setor Saúde · economia de
            R$ 162.000. Os blocos abaixo mostram o formato · [dado do case] entra no lugar.
          </p>
        </header>

        <div className="vds-com-case-body">
          <article>
            <span className="vds-com-case-eyebrow">contexto</span>
            <p>
              [Empresa] · [setor] · [tamanho do time]. Processo manual antes da IA:
              [o que o time fazia à mão, quantas horas por semana, quem fazia].
              Caso de uso: [solução escolhida na adesão]. Custo de partida medido
              na operação = <strong>R$ [valor]/mês</strong>.
            </p>
          </article>

          <article>
            <span className="vds-com-case-eyebrow">desafio</span>
            <p>
              [O que travava o resultado · em 2-3 frases, com o dado do case] ·
              o que o time tentou antes, por que não funcionou e o que estava
              em jogo se nada mudasse. Sem adjetivo, sem "revolucionou" —
              só o problema como ele aparecia na operação.
            </p>
          </article>

          <article>
            <span className="vds-com-case-eyebrow">método aplicado</span>
            <ol>
              <li>[Solução 1] · o que foi implementado e onde entrou na operação</li>
              <li>[Solução 2] · o que mudou no processo e quem passou a operar</li>
              <li>[Medição] · como o resultado foi medido · fonte do número</li>
            </ol>
          </article>

          <article>
            <span className="vds-com-case-eyebrow">resultado · título público do case</span>
            <div className="vds-com-case-stats">
              <div>
                <strong className="mono">6h → cliques</strong>
                <em>tempo de relatório</em>
              </div>
              <div>
                <strong className="mono">R$ 162.000</strong>
                <em>economia gerada</em>
              </div>
              <div>
                <strong className="mono">[prazo]</strong>
                <em>até o resultado</em>
              </div>
            </div>
          </article>
        </div>

        <footer>
          <blockquote>
            [Depoimento do cliente, nas palavras dele · só com autorização
            por escrito e fonte registrada. Sem frase inventada.]
          </blockquote>
          <cite>
            <strong>[Nome]</strong>
            <em>[cargo] · [empresa] · case real</em>
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
            <Compass size={14} strokeWidth={1.75} />
            Para
          </h3>
          <div className="vds-com-proposal-for">
            <strong>[Razão social] · CNPJ [00.000.000/0000-00]</strong>
            <em>[Endereço] · [cidade, UF] · [CEP]</em>
            <em>Att: [Nome] · [cargo]</em>
          </div>
        </section>

        <section>
          <h3>Escopo</h3>
          <p>
            Adesão à plataforma Viver de IA para o time da [empresa]. Plano Pro ·
            contratação anual · trilha de onboarding começa na semana da adesão.
          </p>
          <ul className="vds-com-proposal-list">
            <li><Check size={14} strokeWidth={1.75} /> Todas as soluções Plug-and-Play · 157 soluções prontas</li>
            <li><Check size={14} strokeWidth={1.75} /> Formações práticas · trilha personalizada com IA</li>
            <li><Check size={14} strokeWidth={1.75} /> Mentoria em grupo ao vivo · 10 check-ins/mês</li>
            <li><Check size={14} strokeWidth={1.75} /> Consultor IA dentro da plataforma</li>
            <li><Check size={14} strokeWidth={1.75} /> Comunidade de empresários e líderes · imersão na sede</li>
            <li><Check size={14} strokeWidth={1.75} /> Garantia de 90 dias · condições na cláusula 7</li>
          </ul>
        </section>

        <section className="vds-com-proposal-cost">
          <h3>Investimento</h3>
          <table>
            <tbody>
              <tr>
                <td>Plano Pro · contratação anual</td>
                <td className="mono">R$ 3.780/mês</td>
              </tr>
              <tr>
                <td>Período · 12 meses</td>
                <td className="mono">×12</td>
              </tr>
              <tr className="vds-com-proposal-total">
                <td><strong>Total</strong></td>
                <td className="mono"><strong>R$ 45.360,00</strong></td>
              </tr>
            </tbody>
          </table>
          <em className="vds-com-proposal-payment">
            Forma e condição de pagamento: [condições de pagamento] · NF conforme
            contrato.
          </em>
        </section>

        <footer>
          <div>
            <strong>Próximo passo</strong>
            <em>
              Aceite válido até <strong>27 mai 2026</strong>. Após aceite, você recebe o
              link de pagamento e o acesso à trilha de onboarding.
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
            <strong>Contrato de adesão à plataforma Viver de IA</strong>
            <em>Plano Pro · contratação anual</em>
          </div>
        </header>

        <section>
          <h3>1 · Partes</h3>
          <p>
            <strong>Contratante:</strong> [Razão social] · CNPJ [00.000.000/0000-00] ·
            representada por [Nome], [cargo].
          </p>
          <p>
            <strong>Contratada:</strong> [Razão social da Viver de IA] · CNPJ [00.000.000/0000-00] ·
            representada por [representante legal].
          </p>
        </section>

        <section>
          <h3>2 · Objeto</h3>
          <p>
            Acesso à plataforma Viver de IA no plano Pro, com mentoria em grupo ao vivo,
            em contratação anual a partir de <strong>[data]</strong>, conforme escopo
            detalhado na proposta PRO-2026-00428.
          </p>
        </section>

        <section>
          <h3>3 · Garantia</h3>
          <p>
            A Contratada devolve 100% do investimento se, em 90 dias, a Contratante não
            tiver nem aumento de receita nem redução de custos operacionais. Para ter
            direito, a Contratante cumpre no mesmo prazo três requisitos: concluir a
            trilha de onboarding, concluir 3 formações e implementar as 3 soluções
            escolhidas na adesão.
          </p>
        </section>

        <section>
          <h3>4 · Condições</h3>
          <p>
            <strong>Condições completas</strong> da garantia na cláusula 7 dos termos de
            uso. A verificação é feita pelos registros da plataforma.
          </p>
        </section>

        <section>
          <h3>5 · Propriedade intelectual</h3>
          <p>
            Todo conteúdo (formações, materiais, soluções) permanece propriedade da
            Contratada. A Contratante recebe licença de uso dentro da própria operação,
            [prazo e condições conforme termos de uso]. Vedada redistribuição.
          </p>
        </section>

        <footer>
          <div className="vds-com-contract-sig">
            <span className="line" />
            <strong>[Nome]</strong>
            <em>[Razão social] · Contratante</em>
          </div>
          <div className="vds-com-contract-sig">
            <span className="line" />
            <strong>[Representante legal]</strong>
            <em>Viver de IA · Contratada</em>
          </div>
        </footer>

        <p className="vds-com-contract-loc mono">[cidade], [data] · 2 vias de igual teor · 1 testemunha presencial.</p>
      </article>
    </Section>
  );
}
