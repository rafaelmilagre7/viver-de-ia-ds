import { useId, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, ChevronRight, CircleCheck } from 'lucide-react';
import { PERIODOS, acharPeriodo, somaBloco } from './data';
import type { Leaf, Period } from './data';
import './DreTable.css';

/* =============================================================
   FP&A · DRE (P&L) com orçado vs. realizado
   -------------------------------------------------------------
   Regra de ouro deste pattern: TODO número derivado é CALCULADO,
   nunca digitado. Só as folhas (sub-contas) carregam valor. Total,
   margem, EBITDA, variação e % saem de função — então a tabela
   fecha matematicamente por construção, em qualquer período.

   Os períodos vivem em ./data — a mesma fonte que alimenta a ponte
   de resultado. Uma seção não tem como contar um mês diferente da
   outra porque não existe segunda cópia dos números.
   ============================================================= */

/* ---------- formatação BR ---------- */
const fInt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const fIntSigned = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0, signDisplay: 'exceptZero' });
const fDec = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fDecSigned = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: 'exceptZero',
});

const money = (v: number) => `R$ ${fInt.format(v)}`;
const pct = (v: number) => `${fDec.format(v)}%`;
const pctSigned = (v: number) => `${fDecSigned.format(v)}%`;

/* ---------- modelo de linha ---------- */
type RowKind = 'group' | 'line' | 'result';

type Row = {
  id: string;
  parent?: string;
  kind: RowKind;
  prefix?: string;
  label: string;
  note?: string;
  real: number;
  plan: number;
  /** true = subir é bom (receita, margem). false = subir é ruim (custo, despesa). */
  higherIsBetter: boolean;
  /** linha de resultado que pode sinalizar meta batida em verde. */
  headline: boolean;
};

function montarLinhas(p: Period): Row[] {
  const recReal = somaBloco(p.receita, 'real');
  const recPlan = somaBloco(p.receita, 'plan');
  const cusReal = somaBloco(p.custos, 'real');
  const cusPlan = somaBloco(p.custos, 'plan');
  const desReal = somaBloco(p.despesas, 'real');
  const desPlan = somaBloco(p.despesas, 'plan');

  const mbReal = recReal - cusReal;
  const mbPlan = recPlan - cusPlan;
  const ebReal = mbReal - desReal;
  const ebPlan = mbPlan - desPlan;

  const daReceita = (v: number) => `${pct((v / recReal) * 100)} da receita`;

  const filhas = (ls: Leaf[], parent: string, higherIsBetter: boolean): Row[] =>
    ls.map((l) => ({
      id: l.id,
      parent,
      kind: 'line' as const,
      label: l.label,
      real: l.real,
      plan: l.plan,
      higherIsBetter,
      headline: false,
    }));

  return [
    {
      id: 'receita',
      kind: 'group',
      label: 'Receita líquida',
      note: 'líquida de impostos e reembolsos',
      real: recReal,
      plan: recPlan,
      higherIsBetter: true,
      headline: true,
    },
    ...filhas(p.receita, 'receita', true),
    {
      id: 'custos',
      kind: 'group',
      prefix: '(−)',
      label: 'Custos diretos',
      note: daReceita(cusReal),
      real: cusReal,
      plan: cusPlan,
      higherIsBetter: false,
      headline: false,
    },
    ...filhas(p.custos, 'custos', false),
    {
      id: 'margem-bruta',
      kind: 'result',
      prefix: '=',
      label: 'Margem bruta',
      note: daReceita(mbReal),
      real: mbReal,
      plan: mbPlan,
      higherIsBetter: true,
      headline: true,
    },
    {
      id: 'despesas',
      kind: 'group',
      prefix: '(−)',
      label: 'Despesas operacionais',
      note: daReceita(desReal),
      real: desReal,
      plan: desPlan,
      higherIsBetter: false,
      headline: false,
    },
    ...filhas(p.despesas, 'despesas', false),
    {
      id: 'ebitda',
      kind: 'result',
      prefix: '=',
      label: 'EBITDA',
      note: daReceita(ebReal),
      real: ebReal,
      plan: ebPlan,
      higherIsBetter: true,
      headline: true,
    },
  ];
}

/* ---------- semântica de variação ---------- */
type Tone = 'good' | 'bad' | 'goal' | 'flat';

function tomDaVariacao(row: Row): Tone {
  const v = row.real - row.plan;
  if (v === 0) return 'flat';
  const favoravel = row.higherIsBetter ? v > 0 : v < 0;
  if (!favoravel) return 'bad';
  // verde sóbrio SÓ quando uma linha de resultado bate a meta do orçamento
  return row.headline ? 'goal' : 'good';
}

/** 80%–120% do orçado mapeados na largura da barra; o traço central marca o orçado. */
function preenchimento(real: number, plan: number): number {
  const atingimento = (real / plan) * 100;
  return Math.min(1, Math.max(0, (atingimento - 80) / 40)) * 100;
}

export default function DreTable() {
  const tituloId = useId();
  const [periodoId, setPeriodoId] = useState<string>('jun-2026');
  const [abertos, setAbertos] = useState<Record<string, boolean>>({
    receita: true,
    custos: true,
    despesas: true,
  });

  const periodo = acharPeriodo(periodoId);
  const linhas = montarLinhas(periodo);
  const visiveis = linhas.filter((r) => !r.parent || abertos[r.parent]);

  const receita = linhas.find((r) => r.id === 'receita') as Row;
  const custos = linhas.find((r) => r.id === 'custos') as Row;
  const margem = linhas.find((r) => r.id === 'margem-bruta') as Row;
  const despesas = linhas.find((r) => r.id === 'despesas') as Row;
  const ebitda = linhas.find((r) => r.id === 'ebitda') as Row;

  const cards: Row[] = [receita, margem, ebitda];
  const rumo = (v: number) => (v >= 0 ? 'acima' : 'abaixo');
  const absMoney = (v: number) => money(Math.abs(v));

  return (
    <section className="vds-fpa-dre" aria-labelledby={tituloId}>
      {/* ---------- cabeçalho da seção ---------- */}
      <header className="vds-fpa-dre-head">
        <div className="vds-fpa-dre-head-l">
          <span className="vds-fpa-dre-eyebrow">FP&amp;A · demonstração de resultado</span>
          <h3 id={tituloId} className="vds-fpa-dre-title">
            {periodo.label} <span className="vds-fpa-dre-title-status">· {periodo.status}</span>
          </h3>
          <p className="vds-fpa-dre-lede">
            Orçado contra realizado, da receita líquida ao EBITDA. Variação desfavorável ao resultado aparece
            em coral; meta de orçamento batida, em verde.
          </p>
        </div>

        <div className="vds-fpa-dre-head-r">
          <span className="vds-fpa-dre-updated">Fechamento consolidado · atualizado em 03 jul 2026</span>
          <div className="vds-fpa-dre-periods" role="group" aria-label="Selecionar período">
            {PERIODOS.map((p) => {
              const ativo = p.id === periodoId;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setPeriodoId(p.id)}
                  className={`via-pill-link vds-fpa-dre-period${ativo ? ' via-pill-link--solid' : ''}`}
                >
                  {p.pill}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ---------- resumo em vidro (o vidro fica FORA da tabela) ---------- */}
      <div className="vds-fpa-dre-cards">
        {cards.map((row) => {
          const v = row.real - row.plan;
          const tone = tomDaVariacao(row);
          return (
            <article key={row.id} className="via-tile via-tile--atmos vds-fpa-dre-card">
              <span className="vds-fpa-dre-card-lbl">{row.label}</span>
              <p className="vds-fpa-dre-card-val">
                <span className="cur">R$</span>
                <span className="num">{fInt.format(row.real)}</span>
              </p>
              <div className="vds-fpa-dre-card-meta">
                <span className={`vds-fpa-dre-card-delta is-${tone}`}>
                  {tone === 'goal' ? (
                    <CircleCheck size={11} strokeWidth={2.2} aria-hidden="true" />
                  ) : v >= 0 ? (
                    <ArrowUpRight size={11} strokeWidth={2.4} aria-hidden="true" />
                  ) : (
                    <ArrowDownRight size={11} strokeWidth={2.4} aria-hidden="true" />
                  )}
                  {fIntSigned.format(v)} · {pctSigned((v / row.plan) * 100)}
                </span>
                <span className="via-meta-chip via-meta-chip--mono">orçado {fInt.format(row.plan)}</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* ---------- tabela · superfície limpa, sem vidro ---------- */}
      <div className="vds-fpa-dre-scroll" tabIndex={0} role="region" aria-label="Tabela do DRE, rolável">
        <table className="vds-fpa-dre-table">
          <caption className="vds-fpa-dre-sr">
            Demonstração de resultado de {periodo.label}, comparando realizado e orçado por conta.
          </caption>
          <colgroup>
            <col className="vds-fpa-dre-col-acct" />
            <col className="vds-fpa-dre-col-num" />
            <col className="vds-fpa-dre-col-num" />
            <col className="vds-fpa-dre-col-num" />
            <col className="vds-fpa-dre-col-pct" />
            <col className="vds-fpa-dre-col-perf" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Conta</th>
              <th scope="col">Realizado (R$)</th>
              <th scope="col">Orçado (R$)</th>
              <th scope="col">Variação (R$)</th>
              <th scope="col">Variação (%)</th>
              <th scope="col">Desempenho</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((row) => {
              const v = row.real - row.plan;
              const vPct = (v / row.plan) * 100;
              const tone = tomDaVariacao(row);
              const grupo = row.kind === 'group';
              const aberto = grupo ? abertos[row.id] : false;
              const atingimento = (row.real / row.plan) * 100;

              return (
                <tr key={row.id} className={`vds-fpa-dre-row is-${row.kind}`}>
                  <th scope="row" className="vds-fpa-dre-acct">
                    {grupo ? (
                      <button
                        type="button"
                        className="vds-fpa-dre-toggle"
                        aria-expanded={aberto}
                        onClick={() =>
                          setAbertos((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                        }
                      >
                        <span className="vds-fpa-dre-acct-chev">
                          {aberto ? (
                            <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
                          ) : (
                            <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
                          )}
                        </span>
                        <span className="vds-fpa-dre-acct-prefix">{row.prefix ?? ''}</span>
                        <span className="vds-fpa-dre-acct-name">{row.label}</span>
                        <span className="vds-fpa-dre-sr">
                          {aberto ? ' — recolher sub-contas' : ' — expandir sub-contas'}
                        </span>
                      </button>
                    ) : (
                      <span className="vds-fpa-dre-acct-lead">
                        {row.kind === 'result' && <span className="vds-fpa-dre-acct-chev" aria-hidden="true" />}
                        {row.kind === 'result' && (
                          <span className="vds-fpa-dre-acct-prefix">{row.prefix ?? ''}</span>
                        )}
                        <span className="vds-fpa-dre-acct-name">{row.label}</span>
                      </span>
                    )}
                    {row.note && <span className="vds-fpa-dre-acct-note">{row.note}</span>}
                  </th>

                  <td className="vds-fpa-dre-num">{fInt.format(row.real)}</td>
                  <td className="vds-fpa-dre-num is-plan">{fInt.format(row.plan)}</td>
                  <td className={`vds-fpa-dre-num is-${tone}`}>{fIntSigned.format(v)}</td>
                  <td className={`vds-fpa-dre-num is-${tone}`}>{pctSigned(vPct)}</td>

                  <td className="vds-fpa-dre-perf">
                    <span
                      className={`vds-fpa-dre-bar is-${tone}`}
                      role="img"
                      aria-label={`Realizado em ${pct(atingimento)} do orçado`}
                      title={`Realizado em ${pct(atingimento)} do orçado`}
                    >
                      <span className="vds-fpa-dre-bar-track">
                        <span
                          className="vds-fpa-dre-bar-fill"
                          style={{ width: `${preenchimento(row.real, row.plan)}%` }}
                        />
                      </span>
                      <span className="vds-fpa-dre-bar-tick" aria-hidden="true" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ---------- rodapé · legenda + leitura do período ---------- */}
      <footer className="vds-fpa-dre-foot">
        <div className="vds-fpa-dre-legend">
          <span className="via-meta-chip">
            <i className="vds-fpa-dre-dot is-goal" aria-hidden="true" />
            Meta de orçamento batida
          </span>
          <span className="via-meta-chip">
            <i className="vds-fpa-dre-dot is-good" aria-hidden="true" />
            Favorável ao resultado
          </span>
          <span className="via-meta-chip">
            <i className="vds-fpa-dre-dot is-bad" aria-hidden="true" />
            Desfavorável ao resultado
          </span>
          <span className="via-meta-chip vds-fpa-dre-legend-note">
            Barra: realizado sobre orçado · o traço central marca 100% do plano
          </span>
        </div>

        <p className="vds-fpa-dre-note">
          <strong>Leitura do período.</strong> Receita líquida {rumo(receita.real - receita.plan)} do orçado em{' '}
          {absMoney(receita.real - receita.plan)} ({pctSigned(((receita.real - receita.plan) / receita.plan) * 100)}).
          Custos diretos {rumo(custos.real - custos.plan)} em {absMoney(custos.real - custos.plan)} e despesas
          operacionais {rumo(despesas.real - despesas.plan)} em {absMoney(despesas.real - despesas.plan)}. A margem
          bruta ficou em {money(margem.real)} e o EBITDA fechou em {money(ebitda.real)} —{' '}
          {pct((ebitda.real / receita.real) * 100)} da receita, {rumo(ebitda.real - ebitda.plan)} do plano em{' '}
          {absMoney(ebitda.real - ebitda.plan)}.
        </p>

        <p className="vds-fpa-dre-source">
          Fonte: fechamento contábil consolidado. Cada total é a soma das próprias sub-contas; margem bruta,
          EBITDA e variações são calculados, não digitados.
        </p>
      </footer>
    </section>
  );
}
