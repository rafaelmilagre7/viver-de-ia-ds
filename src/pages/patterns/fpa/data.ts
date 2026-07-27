/* =============================================================
   FP&A · FONTE ÚNICA DOS NÚMEROS
   -------------------------------------------------------------
   Todo número que aparece nas seções de FP&A nasce aqui. Só as
   FOLHAS (sub-contas) carregam valor digitado; total, margem,
   EBITDA, variação e impacto saem de função.

   Consequência prática: DRE e ponte de resultado leem o MESMO
   período e não têm como divergir. Se um número muda, muda nos
   dois lugares — não existe segunda cópia para esquecer.
   ============================================================= */

/** Folha do plano de contas: o único lugar com valor digitado. */
export type Leaf = { id: string; label: string; real: number; plan: number };

/** Bloco do resultado a que uma conta pertence. */
export type Bloco = 'receita' | 'custo' | 'despesa';

export type Period = {
  id: string;
  pill: string;
  label: string;
  status: string;
  receita: Leaf[];
  custos: Leaf[];
  despesas: Leaf[];
};

/* Dados de exemplo · operação de mentoria/educação em IA.
   Valores em BRL, sem centavos (fechamento contábil arredondado). */
export const PERIODOS: Period[] = [
  {
    id: 'mai-2026',
    pill: 'Mai 2026',
    label: 'Maio 2026',
    status: 'fechado',
    receita: [
      { id: 'rec-mentoria', label: 'Mentoria Viver de IA · assinaturas', real: 1_746_000, plan: 1_730_000 },
      { id: 'rec-comunidade', label: 'Comunidade e plataforma', real: 472_400, plan: 512_000 },
      { id: 'rec-conf', label: 'Leaders AI Conference', real: 388_000, plan: 400_000 },
      { id: 'rec-impl', label: 'Implementação e squads', real: 208_900, plan: 205_000 },
    ],
    custos: [
      { id: 'cus-mentores', label: 'Mentores e facilitadores', real: 594_500, plan: 585_000 },
      { id: 'cus-infra', label: 'Infraestrutura e modelos de IA', real: 172_100, plan: 165_000 },
      { id: 'cus-gateway', label: 'Gateway e parcelamento', real: 126_700, plan: 128_100 },
      { id: 'cus-conteudo', label: 'Produção de conteúdo', real: 78_700, plan: 84_000 },
    ],
    despesas: [
      { id: 'des-mkt', label: 'Marketing e aquisição', real: 688_400, plan: 675_000 },
      { id: 'des-time', label: 'Time comercial e operação', real: 613_200, plan: 622_000 },
      { id: 'des-tools', label: 'Ferramentas e software', real: 93_100, plan: 88_500 },
      { id: 'des-estrutura', label: 'Estrutura e administrativo', real: 125_300, plan: 129_000 },
    ],
  },
  {
    id: 'jun-2026',
    pill: 'Jun 2026',
    label: 'Junho 2026',
    status: 'fechado',
    receita: [
      { id: 'rec-mentoria', label: 'Mentoria Viver de IA · assinaturas', real: 1_842_000, plan: 1_780_000 },
      { id: 'rec-comunidade', label: 'Comunidade e plataforma', real: 486_500, plan: 520_000 },
      { id: 'rec-conf', label: 'Leaders AI Conference', real: 612_000, plan: 640_000 },
      { id: 'rec-impl', label: 'Implementação e squads', real: 243_500, plan: 210_000 },
    ],
    custos: [
      { id: 'cus-mentores', label: 'Mentores e facilitadores', real: 604_000, plan: 590_000 },
      { id: 'cus-infra', label: 'Infraestrutura e modelos de IA', real: 186_400, plan: 168_000 },
      { id: 'cus-gateway', label: 'Gateway e parcelamento', real: 143_280, plan: 141_750 },
      { id: 'cus-conteudo', label: 'Produção de conteúdo', real: 78_320, plan: 84_000 },
    ],
    despesas: [
      { id: 'des-mkt', label: 'Marketing e aquisição', real: 742_000, plan: 690_000 },
      { id: 'des-time', label: 'Time comercial e operação', real: 618_400, plan: 634_000 },
      { id: 'des-tools', label: 'Ferramentas e software', real: 96_800, plan: 88_500 },
      { id: 'des-estrutura', label: 'Estrutura e administrativo', real: 124_300, plan: 131_000 },
    ],
  },
  {
    id: 'tri2-2026',
    pill: '2º tri 2026',
    label: '2º trimestre 2026',
    status: 'fechado',
    receita: [
      { id: 'rec-mentoria', label: 'Mentoria Viver de IA · assinaturas', real: 5_318_000, plan: 5_240_000 },
      { id: 'rec-comunidade', label: 'Comunidade e plataforma', real: 1_427_900, plan: 1_545_000 },
      { id: 'rec-conf', label: 'Leaders AI Conference', real: 1_386_000, plan: 1_420_000 },
      { id: 'rec-impl', label: 'Implementação e squads', real: 664_300, plan: 620_000 },
    ],
    custos: [
      { id: 'cus-mentores', label: 'Mentores e facilitadores', real: 1_786_500, plan: 1_750_000 },
      { id: 'cus-infra', label: 'Infraestrutura e modelos de IA', real: 522_700, plan: 498_000 },
      { id: 'cus-gateway', label: 'Gateway e parcelamento', real: 393_800, plan: 397_400 },
      { id: 'cus-conteudo', label: 'Produção de conteúdo', real: 236_900, plan: 252_000 },
    ],
    despesas: [
      { id: 'des-mkt', label: 'Marketing e aquisição', real: 2_104_600, plan: 2_040_000 },
      { id: 'des-time', label: 'Time comercial e operação', real: 1_842_700, plan: 1_878_000 },
      { id: 'des-tools', label: 'Ferramentas e software', real: 281_400, plan: 265_500 },
      { id: 'des-estrutura', label: 'Estrutura e administrativo', real: 371_200, plan: 389_000 },
    ],
  },
];

/** Soma as folhas de um bloco em realizado ou orçado. */
export const somaBloco = (ls: Leaf[], k: 'real' | 'plan'): number =>
  ls.reduce((acc, l) => acc + l[k], 0);

/** Período por id · cai no fechamento de junho se o id não existir. */
export const acharPeriodo = (id: string): Period =>
  PERIODOS.find((p) => p.id === id) ?? PERIODOS[1];

/** Totais de um período · tudo calculado, nada digitado. */
export type PeriodoDerivado = {
  receitaReal: number;
  receitaPlan: number;
  custosReal: number;
  custosPlan: number;
  margemReal: number;
  margemPlan: number;
  despesasReal: number;
  despesasPlan: number;
  ebitdaReal: number;
  ebitdaPlan: number;
};

/**
 * receita − custos diretos = margem bruta
 * margem bruta − despesas  = EBITDA
 */
export function derivarPeriodo(p: Period): PeriodoDerivado {
  const receitaReal = somaBloco(p.receita, 'real');
  const receitaPlan = somaBloco(p.receita, 'plan');
  const custosReal = somaBloco(p.custos, 'real');
  const custosPlan = somaBloco(p.custos, 'plan');
  const despesasReal = somaBloco(p.despesas, 'real');
  const despesasPlan = somaBloco(p.despesas, 'plan');

  const margemReal = receitaReal - custosReal;
  const margemPlan = receitaPlan - custosPlan;

  return {
    receitaReal,
    receitaPlan,
    custosReal,
    custosPlan,
    margemReal,
    margemPlan,
    despesasReal,
    despesasPlan,
    ebitdaReal: margemReal - despesasReal,
    ebitdaPlan: margemPlan - despesasPlan,
  };
}

/**
 * Variação de uma conta já com o SINAL DO IMPACTO NO EBITDA:
 * · receita  → impacto = real − plan   (vender mais ajuda)
 * · custo/despesa → impacto = −(real − plan)  (gastar mais atrapalha)
 */
export type ImpactoConta = {
  id: string;
  label: string;
  bloco: Bloco;
  /** rótulo editorial do bloco, para uso em texto corrido */
  blocoLabel: string;
  real: number;
  plan: number;
  /** real − plan, sem inversão · é o que a contabilidade registra */
  delta: number;
  /** efeito da conta sobre o EBITDA · Σ dos impactos = EBITDA real − EBITDA orçado */
  impacto: number;
  /** desvio percentual sobre o orçado, em fração */
  desvio: number;
};

const BLOCO_LABEL: Record<Bloco, string> = {
  receita: 'Receita',
  custo: 'Custo direto',
  despesa: 'Despesa operacional',
};

const contasDoBloco = (ls: Leaf[], bloco: Bloco): ImpactoConta[] =>
  ls.map((l) => {
    const delta = l.real - l.plan;
    return {
      id: l.id,
      label: l.label,
      bloco,
      blocoLabel: BLOCO_LABEL[bloco],
      real: l.real,
      plan: l.plan,
      delta,
      impacto: bloco === 'receita' ? delta : -delta,
      desvio: delta / l.plan,
    };
  });

/** Todas as contas do período com o impacto no EBITDA, na ordem do DRE. */
export const impactosDoPeriodo = (p: Period): ImpactoConta[] => [
  ...contasDoBloco(p.receita, 'receita'),
  ...contasDoBloco(p.custos, 'custo'),
  ...contasDoBloco(p.despesas, 'despesa'),
];

/** Impacto agregado de um bloco · mesma convenção de sinal das contas. */
export const impactoDoBloco = (contas: ImpactoConta[], bloco: Bloco): number =>
  contas.filter((c) => c.bloco === bloco).reduce((t, c) => t + c.impacto, 0);
