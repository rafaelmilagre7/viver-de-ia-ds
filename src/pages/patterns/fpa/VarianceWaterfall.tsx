import { ArrowRight, ArrowDownRight, ArrowUpRight, Calculator, ChevronRight, Info } from 'lucide-react';
import { acharPeriodo, derivarPeriodo, impactoDoBloco, impactosDoPeriodo } from './data';
import type { ImpactoConta } from './data';
import './VarianceWaterfall.css';

/* ==============================================================
   FP&A · PONTE DE RESULTADO (WATERFALL) + ANÁLISE DE VARIAÇÃO
   --------------------------------------------------------------
   Esta seção NÃO tem números próprios. Ela lê o mesmo ./data que
   alimenta o DRE e deriva tudo dali — por isso as duas seções da
   página não têm como contar meses diferentes.

   A ponte inverte o sinal de custo e despesa para falar em EBITDA:
     conta de receita         → impacto = real − orçado
     conta de custo/despesa   → impacto = −(real − orçado)

   Por construção, então:
     EBITDA orçado + Σ impactos = EBITDA realizado
   ============================================================== */

const PERIODO = acharPeriodo('jun-2026');
const T = derivarPeriodo(PERIODO);
const CONTAS = impactosDoPeriodo(PERIODO);

/* ---------- formatação BR ---------- */
const MENOS = '−';
const nf0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const money = (v: number): string => `R$ ${nf0.format(Math.abs(v))}`;
const moneySigned = (v: number): string => `${v < 0 ? MENOS : '+'}R$ ${nf0.format(Math.abs(v))}`;
const pctOf = (r: number): string => `${nf1.format(r * 100)}%`;
const pctSigned = (r: number): string => `${r < 0 ? MENOS : '+'}${nf1.format(Math.abs(r) * 100)}%`;
const ppSigned = (d: number): string => `${d < 0 ? MENOS : '+'}${nf1.format(Math.abs(d) * 100)} p.p.`;

/* ---------- agregados do mês · todos derivados ---------- */
const impReceita = impactoDoBloco(CONTAS, 'receita');
const impCustos = impactoDoBloco(CONTAS, 'custo');
const impDespesas = impactoDoBloco(CONTAS, 'despesa');

const varEbitda = T.ebitdaReal - T.ebitdaPlan;
const ebitdaFavoravel = varEbitda >= 0;

/** o que custo e despesa juntos gastaram além do plano */
const excessoOperacional = -(impCustos + impDespesas);

const margemBrutaPlan = T.margemPlan / T.receitaPlan;
const margemBrutaReal = T.margemReal / T.receitaReal;
const margemEbitdaPlan = T.ebitdaPlan / T.receitaPlan;
const margemEbitdaReal = T.ebitdaReal / T.receitaReal;

const porImpacto = [...CONTAS].sort((a, b) => Math.abs(b.impacto) - Math.abs(a.impacto));
const maxImpacto = Math.max(...CONTAS.map((c) => Math.abs(c.impacto)));

const totalFavoravel = CONTAS.reduce((t, c) => (c.impacto > 0 ? t + c.impacto : t), 0);
const totalContra = CONTAS.reduce((t, c) => (c.impacto < 0 ? t - c.impacto : t), 0);

const PORT_ID = new Map(CONTAS.map((c) => [c.id, c]));
const impactoDe = (id: string): number => PORT_ID.get(id)?.impacto ?? 0;

/** peso da conta dentro do lado a que ela pertence (a favor ou contra) */
const notaDa = (c: ImpactoConta): string =>
  c.impacto >= 0
    ? `${c.blocoLabel} · ${pctOf(totalFavoravel === 0 ? 0 : c.impacto / totalFavoravel)} de tudo que veio a favor no mês`
    : `${c.blocoLabel} · ${pctOf(totalContra === 0 ? 0 : -c.impacto / totalContra)} de tudo que pesou contra no mês`;

/* ==============================================================
   Geometria do waterfall · SVG puro
   --------------------------------------------------------------
   Doze pontes numa ponte só ficam ilegíveis. Aqui o gráfico abre
   a variação nos TRÊS blocos do resultado — que é exatamente como
   o DRE se organiza — e a lista logo abaixo desce às contas. Os
   três blocos somam o total por construção, não por conferência.
   ============================================================== */
const VB_W = 1000;
const VB_H = 340;
const PAD_L = 82;
const PAD_R = 18;
const TOP_Y = 44;
const BASE_Y = 284;
const BAR_W = 108;
const PASSO = 200_000;
const DIVISOES = 4;

type TipoBarra = 'ancora' | 'positiva' | 'negativa';

interface Ponte {
  id: string;
  l1: string;
  l2: string;
  impacto: number;
}

/** As três pontes do mês, na ordem em que o resultado se forma. */
const PONTES: readonly Ponte[] = [
  { id: 'receita', l1: 'Receita', l2: 'líquida', impacto: impReceita },
  { id: 'custos', l1: 'Custos', l2: 'diretos', impacto: impCustos },
  { id: 'despesas', l1: 'Despesas', l2: 'operacionais', impacto: impDespesas },
];

interface Barra {
  id: string;
  l1: string;
  l2: string;
  tipo: TipoBarra;
  de: number;
  ate: number;
  rotulo: string;
  x: number;
  y: number;
  alt: number;
}

function montarPonte(): { barras: Barra[]; ticks: number[]; dominio: number } {
  const bruto: Omit<Barra, 'x' | 'y' | 'alt'>[] = [
    {
      id: 'inicio',
      l1: 'EBITDA',
      l2: 'orçado',
      tipo: 'ancora',
      de: 0,
      ate: T.ebitdaPlan,
      rotulo: money(T.ebitdaPlan),
    },
  ];

  let cum = T.ebitdaPlan;
  for (const p of PONTES) {
    const de = cum;
    cum += p.impacto;
    bruto.push({
      id: p.id,
      l1: p.l1,
      l2: p.l2,
      tipo: p.impacto >= 0 ? 'positiva' : 'negativa',
      de,
      ate: cum,
      rotulo: moneySigned(p.impacto),
    });
  }

  bruto.push({ id: 'fim', l1: 'EBITDA', l2: 'realizado', tipo: 'ancora', de: 0, ate: cum, rotulo: money(cum) });

  const pico = Math.max(...bruto.map((b) => Math.max(b.de, b.ate)));
  const dominio = Math.ceil((pico * 1.06) / PASSO) * PASSO;
  const alturaPlot = BASE_Y - TOP_Y;
  const yDe = (v: number): number => BASE_Y - (v / dominio) * alturaPlot;
  const slot = (VB_W - PAD_L - PAD_R) / bruto.length;

  const barras: Barra[] = bruto.map((b, i) => {
    const topo = Math.max(b.de, b.ate);
    const piso = Math.min(b.de, b.ate);
    const y = yDe(topo);
    return {
      ...b,
      x: PAD_L + i * slot + (slot - BAR_W) / 2,
      y,
      alt: Math.max(yDe(piso) - y, 3),
    };
  });

  const ticks = Array.from({ length: DIVISOES + 1 }, (_, i) => (dominio / DIVISOES) * i);

  return { barras, ticks, dominio };
}

const { barras, ticks, dominio } = montarPonte();
const yDeValor = (v: number): number => BASE_Y - (v / dominio) * (BASE_Y - TOP_Y);

/* ==============================================================
   Memória da ponte · os mesmos três blocos, em números
   ============================================================== */
interface LinhaPonte {
  id: string;
  rotulo: string;
  plan: number;
  real: number;
  impacto: number;
  destaque?: boolean;
}

const MEMORIA: readonly LinhaPonte[] = [
  { id: 'receita', rotulo: 'Receita líquida', plan: T.receitaPlan, real: T.receitaReal, impacto: impReceita },
  { id: 'custos', rotulo: '(−) Custos diretos', plan: T.custosPlan, real: T.custosReal, impacto: impCustos },
  {
    id: 'despesas',
    rotulo: '(−) Despesas operacionais',
    plan: T.despesasPlan,
    real: T.despesasReal,
    impacto: impDespesas,
  },
  { id: 'ebitda', rotulo: '(=) EBITDA', plan: T.ebitdaPlan, real: T.ebitdaReal, impacto: varEbitda, destaque: true },
];

const mes = PERIODO.label.toLowerCase();

export default function VarianceWaterfall() {
  return (
    <section className="vds-fpa-var" aria-labelledby="vds-fpa-var-titulo">
      {/* ---------- cabeçalho editorial ---------- */}
      <header className="vds-fpa-var-head">
        <div className="vds-fpa-var-head-main">
          <span className="vds-fpa-var-eyebrow">FP&amp;A · fechamento de {mes}</span>
          <h2 className="vds-fpa-var-titulo" id="vds-fpa-var-titulo">
            O EBITDA fechou <em>{money(varEbitda)} {ebitdaFavoravel ? 'acima' : 'abaixo'}</em> do plano.
          </h2>
          <p className="vds-fpa-var-lede">
            A receita líquida veio {moneySigned(impReceita)} sobre o orçado, em {money(T.receitaReal)}. Ainda assim o
            EBITDA fechou em {money(T.ebitdaReal)} contra {money(T.ebitdaPlan)} previstos: custos diretos e despesas
            operacionais consumiram {money(excessoOperacional)} além do plano. A ponte abaixo abre a diferença nos três
            blocos do resultado; a lista adiante desce às {CONTAS.length} contas.
          </p>
        </div>
        <div className="vds-fpa-var-head-side">
          <span className={`vds-fpa-var-selo${ebitdaFavoravel ? '' : ' vds-fpa-var-selo--ruim'}`}>
            {ebitdaFavoravel ? 'Meta de EBITDA batida' : 'Meta de EBITDA não batida'}
          </span>
          <span className="via-meta-chip via-meta-chip--mono">Livro fechado 03/07 · 09h12</span>
        </div>
      </header>

      {/* ---------- KPIs ---------- */}
      <div className="vds-fpa-var-kpis">
        <article className="vds-fpa-var-kpi">
          <span className="vds-fpa-var-kpi-lbl">Receita líquida</span>
          <p className="vds-fpa-var-kpi-val">{money(T.receitaReal)}</p>
          <span className="vds-fpa-var-kpi-meta">
            {pctSigned((T.receitaReal - T.receitaPlan) / T.receitaPlan)} vs. orçado ·{' '}
            {moneySigned(T.receitaReal - T.receitaPlan)}
          </span>
        </article>

        <article className="vds-fpa-var-kpi">
          <span className="vds-fpa-var-kpi-lbl">Margem bruta</span>
          <p className="vds-fpa-var-kpi-val">{pctOf(margemBrutaReal)}</p>
          <span className="vds-fpa-var-kpi-meta">
            {ppSigned(margemBrutaReal - margemBrutaPlan)} vs. orçado ({pctOf(margemBrutaPlan)})
          </span>
        </article>

        <article className="vds-fpa-var-kpi vds-fpa-var-kpi--destaque">
          <span className="vds-fpa-var-kpi-lbl">EBITDA realizado</span>
          <p className="vds-fpa-var-kpi-val">{money(T.ebitdaReal)}</p>
          <span className="vds-fpa-var-kpi-meta">
            {pctOf(margemEbitdaReal)} da receita · plano era {money(T.ebitdaPlan)}
          </span>
        </article>

        <article className="vds-fpa-var-kpi">
          <span className="vds-fpa-var-kpi-lbl">
            Variação do EBITDA
            <em className={`vds-fpa-var-kpi-tag${ebitdaFavoravel ? '' : ' vds-fpa-var-kpi-tag--ruim'}`}>
              {ebitdaFavoravel ? 'favorável' : 'desfavorável'}
            </em>
          </span>
          <p
            className={`vds-fpa-var-kpi-val ${ebitdaFavoravel ? 'vds-fpa-var-num-ok' : 'vds-fpa-var-num-ruim'}`}
          >
            {moneySigned(varEbitda)}
          </p>
          <span className="vds-fpa-var-kpi-meta">
            {pctSigned(varEbitda / T.ebitdaPlan)} vs. orçado · {ppSigned(margemEbitdaReal - margemEbitdaPlan)} de margem
          </span>
        </article>
      </div>

      {/* ---------- Peça 1 · ponte de resultado ---------- */}
      <article className="vds-fpa-var-painel">
        <header className="vds-fpa-var-painel-head">
          <div>
            <h3>Ponte do EBITDA · orçado para realizado</h3>
            <p>
              Barras flutuantes ligadas pela linha-guia. Custo e despesa entram com o sinal invertido — gastar acima do
              plano derruba o resultado. As três pontes levam exatamente de {money(T.ebitdaPlan)} a{' '}
              {money(T.ebitdaReal)}.
            </p>
          </div>
          <div className="vds-fpa-var-legenda">
            <span>
              <i className="sw ancora" /> Início e fim
            </span>
            <span>
              <i className="sw pos" /> Favorável
            </span>
            <span>
              <i className="sw neg" /> Desfavorável
            </span>
          </div>
        </header>

        <div className="vds-fpa-var-chart-wrap">
          <svg
            className="vds-fpa-var-chart"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={`Ponte do EBITDA de ${mes}: parte de ${money(
              T.ebitdaPlan,
            )} orçados, soma ${moneySigned(impReceita)} de receita, ${moneySigned(
              impCustos,
            )} de custos diretos e ${moneySigned(impDespesas)} de despesas operacionais, e chega a ${money(
              T.ebitdaReal,
            )} realizados.`}
          >
            <defs>
              <linearGradient id="vdsFpaVarAncora" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--vds-fpa-var-ancora)" stopOpacity="0.98" />
                <stop offset="1" stopColor="var(--vds-fpa-var-ancora)" stopOpacity="0.80" />
              </linearGradient>
              <linearGradient id="vdsFpaVarPos" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--vds-fpa-var-pos)" stopOpacity="0.94" />
                <stop offset="1" stopColor="var(--vds-fpa-var-pos)" stopOpacity="0.66" />
              </linearGradient>
              <linearGradient id="vdsFpaVarNeg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--vds-fpa-var-neg)" stopOpacity="0.94" />
                <stop offset="1" stopColor="var(--vds-fpa-var-neg)" stopOpacity="0.66" />
              </linearGradient>
            </defs>

            {/* grade + eixo de valor */}
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={PAD_L}
                  x2={VB_W - PAD_R}
                  y1={yDeValor(t)}
                  y2={yDeValor(t)}
                  stroke="var(--vds-fpa-var-grade)"
                  strokeWidth="1"
                  strokeDasharray={t === 0 ? undefined : '2,5'}
                />
                <text className="vds-fpa-var-tick" x={PAD_L - 14} y={yDeValor(t) + 3.5} textAnchor="end">
                  {t === 0 ? '0' : `${nf0.format(t / 1000)} mil`}
                </text>
              </g>
            ))}

            {/* linha-guia entre as barras */}
            {barras.slice(0, -1).map((b, i) => {
              const prox = barras[i + 1];
              if (!prox) return null;
              const y = yDeValor(b.ate);
              return (
                <line
                  key={`guia-${b.id}`}
                  x1={b.x + BAR_W}
                  x2={prox.x}
                  y1={y}
                  y2={y}
                  stroke="var(--vds-fpa-var-guia)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              );
            })}

            {/* barras */}
            {barras.map((b) => {
              const preenchimento =
                b.tipo === 'ancora'
                  ? 'url(#vdsFpaVarAncora)'
                  : b.tipo === 'positiva'
                    ? 'url(#vdsFpaVarPos)'
                    : 'url(#vdsFpaVarNeg)';
              return (
                <g key={b.id}>
                  <rect x={b.x} y={b.y} width={BAR_W} height={b.alt} rx="4" fill={preenchimento} />
                  <text
                    className={`vds-fpa-var-valor${b.tipo === 'negativa' ? ' neg' : ''}`}
                    x={b.x + BAR_W / 2}
                    y={b.y - 11}
                    textAnchor="middle"
                  >
                    {b.rotulo}
                  </text>
                  <text className="vds-fpa-var-cat" x={b.x + BAR_W / 2} y={BASE_Y + 20} textAnchor="middle">
                    {b.l1}
                  </text>
                  <text className="vds-fpa-var-cat" x={b.x + BAR_W / 2} y={BASE_Y + 33} textAnchor="middle">
                    {b.l2}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="vds-fpa-var-chart-nota">
          <Info size={13} strokeWidth={2} aria-hidden="true" />
          <span>
            <strong>Leitura ·</strong> o mês vendeu mais e ganhou menos. Marketing e aquisição sozinho estourou{' '}
            {money(impactoDe('des-mkt'))} — mais do que todo o avanço da receita. E esse avanço não veio do recorrente:
            implementação e squads entregou {money(impactoDe('rec-impl'))} acima do plano, enquanto o ganho da mentoria (
            {money(impactoDe('rec-mentoria'))}) foi quase todo anulado por comunidade e conferência,{' '}
            {money(impactoDe('rec-comunidade') + impactoDe('rec-conf'))} somadas. Infraestrutura e modelos de IA é o
            maior desvio percentual do lado do custo, {pctSigned(PORT_ID.get('cus-infra')?.desvio ?? 0)} sobre o
            orçado.
          </span>
        </p>
      </article>

      {/* ---------- Peça 2 · variações por conta ---------- */}
      <article className="vds-fpa-var-painel">
        <header className="vds-fpa-var-painel-head">
          <div>
            <h3>Variações por conta · ordenadas por impacto</h3>
            <p>
              As {CONTAS.length} contas do resultado, já com o sinal do EBITDA: em custo e despesa, ficar acima do
              orçado entra negativo. Abra a linha para ver o razão do mês.
            </p>
          </div>
          <span className="via-meta-chip via-meta-chip--mono">
            {CONTAS.length} contas · {mes}
          </span>
        </header>

        <div className="vds-fpa-var-lista">
          <div className="vds-fpa-var-lista-head" aria-hidden="true">
            <span>Conta</span>
            <span>Orçado → realizado</span>
            <span>Peso</span>
            <span className="num">Desvio</span>
            <span className="num">Impacto no EBITDA</span>
          </div>

          {porImpacto.map((c) => {
            const favoravel = c.impacto >= 0;
            const peso = (Math.abs(c.impacto) / maxImpacto) * 100;
            return (
              <button type="button" key={c.id} className="via-row-card vds-fpa-var-row">
                <span className="vds-fpa-var-row-id">
                  <span className="vds-fpa-var-row-nome">
                    {c.label}
                    <ChevronRight size={13} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="vds-fpa-var-row-nota">{notaDa(c)}</span>
                </span>

                <span className="vds-fpa-var-row-vals">
                  <span className="v">{money(c.plan)}</span>
                  <ArrowRight size={11} strokeWidth={2.2} aria-hidden="true" />
                  <span className="v forte">{money(c.real)}</span>
                </span>

                <span className="vds-fpa-var-row-barra">
                  <span className="trilho">
                    <span
                      className={`preenche ${favoravel ? 'ok' : 'ruim'}`}
                      style={{ width: `${peso.toFixed(1)}%` }}
                    />
                  </span>
                </span>

                <span className="vds-fpa-var-row-pct">{pctSigned(c.desvio)}</span>

                <span className={`vds-fpa-var-row-num ${favoravel ? 'vds-fpa-var-num-ok' : 'vds-fpa-var-num-ruim'}`}>
                  {favoravel ? (
                    <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
                  ) : (
                    <ArrowDownRight size={13} strokeWidth={2.4} aria-hidden="true" />
                  )}
                  {moneySigned(c.impacto)}
                </span>
              </button>
            );
          })}

          <div className="vds-fpa-var-total">
            <span className="vds-fpa-var-total-lbl">
              Soma das {CONTAS.length} variações · leva o EBITDA de {money(T.ebitdaPlan)} a {money(T.ebitdaReal)}
            </span>
            <span
              className={`vds-fpa-var-total-num ${ebitdaFavoravel ? 'vds-fpa-var-num-ok' : 'vds-fpa-var-num-ruim'}`}
            >
              {moneySigned(varEbitda)}
            </span>
          </div>
        </div>
      </article>

      {/* ---------- Memória da ponte · tabela densa, superfície limpa ---------- */}
      <article className="vds-fpa-var-dre">
        <header className="vds-fpa-var-dre-head">
          <h3>Memória da ponte · do orçado ao realizado</h3>
          <p>
            Os três blocos que a ponte desenha, em números. A coluna da direita é a variação já traduzida em efeito
            sobre o EBITDA — somada, ela é a própria variação do resultado.
          </p>
        </header>

        <div className="vds-fpa-var-tabela-wrap">
          <table className="vds-fpa-var-tabela">
            <caption className="vds-fpa-var-sr">
              Memória de cálculo da ponte de {mes}: orçado, realizado, variação e impacto no EBITDA por bloco do
              resultado.
            </caption>
            <thead>
              <tr>
                <th scope="col">Bloco</th>
                <th scope="col" className="num">Orçado</th>
                <th scope="col" className="num">Realizado</th>
                <th scope="col" className="num">Variação</th>
                <th scope="col" className="num">Desvio</th>
                <th scope="col" className="num">Impacto no EBITDA</th>
              </tr>
            </thead>
            <tbody>
              {MEMORIA.map((l) => {
                const delta = l.real - l.plan;
                const classeImpacto = l.impacto >= 0 ? 'vds-fpa-var-num-ok' : 'vds-fpa-var-num-ruim';
                return (
                  <tr key={l.id} className={l.destaque ? 'destaque' : undefined}>
                    <th scope="row">{l.rotulo}</th>
                    <td className="num">{money(l.plan)}</td>
                    <td className="num forte">{money(l.real)}</td>
                    <td className="num">{moneySigned(delta)}</td>
                    <td className="num">{pctSigned(delta / l.plan)}</td>
                    <td className={`num ${classeImpacto}`}>{moneySigned(l.impacto)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <footer className="vds-fpa-var-dre-foot">
          <p className="vds-fpa-var-dre-nota">
            A variação é o que a contabilidade registra; o impacto é a mesma variação vista do EBITDA — por isso custo e
            despesa trocam de sinal. Coral marca o desfavorável, verde o favorável. O detalhe conta a conta está no DRE,
            logo acima nesta página.
          </p>
          <button type="button" className="vds-fpa-var-cta">
            <Calculator size={13} strokeWidth={2.2} aria-hidden="true" />
            Abrir memória de cálculo
          </button>
        </footer>
      </article>
    </section>
  );
}
