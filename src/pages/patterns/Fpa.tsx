import DreTable from './fpa/DreTable';
import CashFlow from './fpa/CashFlow';
import BurnRunway from './fpa/BurnRunway';
import VarianceWaterfall from './fpa/VarianceWaterfall';
import './fpa/fpa-page.css';

/**
 * FP&A · planejamento financeiro
 *
 * Pattern de referência pra plataforma financeira: DRE com orçado vs realizado,
 * fluxo de caixa com projeção, burn/runway e ponte de resultado (waterfall).
 *
 * Regras que este pattern demonstra (e que valem pra QUALQUER tela de dados):
 * · fundo CLARO na superfície de trabalho — escuro só em destaque pontual
 * · ZERO vidro em tabela densa (mata a leitura) · o vidro fica nos cards ao redor
 * · hierarquia por indentação + peso, nunca por cor de fundo
 * · cor só como semântica: coral = desfavorável · verde sóbrio = meta batida
 * · número sempre tabular-nums, alinhado à direita
 * · nenhuma barra/linha lateral colorida
 */
export default function Fpa() {
  return (
    <div className="vds-fpa-page">
      <header className="vds-fpa-page__head">
        <p className="vds-eyebrow">Padrões · FP&amp;A</p>
        <h1>
          Planejamento financeiro <em>que se lê em dez segundos</em>.
        </h1>
        <p className="vds-fpa-page__lede">
          O conjunto canônico de uma plataforma financeira: resultado contra o plano, caixa
          entrando e saindo, quanto tempo ele dura e o que explica a diferença. Superfície
          clara, tabela sem vidro, número que fecha.
        </p>
      </header>

      <section className="vds-fpa-page__block" aria-labelledby="fpa-dre">
        <h2 id="fpa-dre" className="vds-fpa-page__label">
          Resultado · DRE contra o plano
        </h2>
        <DreTable />
      </section>

      <section className="vds-fpa-page__block" aria-labelledby="fpa-var">
        <h2 id="fpa-var" className="vds-fpa-page__label">
          Explicação · ponte do resultado
        </h2>
        <VarianceWaterfall />
      </section>

      <section className="vds-fpa-page__block" aria-labelledby="fpa-cash">
        <h2 id="fpa-cash" className="vds-fpa-page__label">
          Caixa · entradas, saídas e projeção
        </h2>
        <CashFlow />
      </section>

      <section className="vds-fpa-page__block" aria-labelledby="fpa-burn">
        <h2 id="fpa-burn" className="vds-fpa-page__label">
          Fôlego · queima e runway
        </h2>
        <BurnRunway />
      </section>
    </div>
  );
}
