import { DataTable, type SortDir } from '../../lib/DataTable/DataTable';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { DataTable as meta } from './props.generated.json';

type Operator = {
  id: string;
  name: string;
  cohort: string;
  streak: number;
  revenue: number;
  [key: string]: unknown;
};

const data: Operator[] = [
  { id: '1', name: 'Caio Ribeiro', cohort: '2026.2', streak: 14, revenue: 1800000 },
  { id: '2', name: 'Márisson Lage', cohort: '2026.2', streak: 22, revenue: 920000 },
  { id: '3', name: 'Diego Martins', cohort: '2026.1', streak: 9, revenue: 540000 },
];

function DataTableDemo() {
  return (
    <DataTable<Operator>
      data={data}
      initialSort={{ key: 'streak', dir: 'desc' as SortDir }}
      columns={[
        { key: 'name', label: 'Operador' },
        { key: 'cohort', label: 'Turma' },
        { key: 'streak', label: 'Streak (d)', align: 'right' },
        {
          key: 'revenue',
          label: 'Receita',
          align: 'right',
          render: (r) => `R$ ${(r.revenue / 1000).toLocaleString('pt-BR')}K`,
        },
      ]}
    />
  );
}

export default function ApiDataTable() {
  return (
    <ComponentDoc
      eyebrow="api · datatable"
      name="DataTable"
      headline="tabela sortable · zebra + density + ARIA · accessor pra derived sort"
      description="Tabela com sort, density compact/cozy, zebra, ARIA grid · accessor pra sort em valor derivado (ex: full name a partir de first/last). Suporta format custom por coluna, align right/center."
      importLine={`import { DataTable, type DataTableProps, type DataTableColumn, type SortDir } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-dt', description: 'Container · overflow scroll horizontal · scrollbar editorial' },
        { part: 'via-dt__head', description: 'Header row · sticky em scroll vertical (futuro)' },
        { part: 'via-dt__th', description: 'Coluna · sortable com indicator chev + accessor opcional' },
        { part: 'via-dt__row', description: 'Linha · hover bg navy-04 + cursor (se onRowClick)' },
        { part: 'via-dt__cell', description: 'Célula · format opcional + align' },
      ]}
      meta={meta}
      descriptions={{
        data: 'Array de rows · T extends Record<string, unknown>',
        columns: 'Definição de colunas (key, label, accessor, render, sortable, align, width, meta)',
        caption: 'Header acima da tabela (opcional)',
        emptyState: 'Conteúdo quando data está vazio',
        initialSort: 'Sort inicial (uncontrolled)',
        sortBy: 'Coluna do sort controlado · junto com sortDir sobrescreve o state interno',
        sortDir: 'Direção do sort controlado · junto com sortBy sobrescreve o state interno',
        onSortChange: 'Callback quando user clica em coluna sortable',
        onRowClick: 'Click handler · adiciona cursor pointer + tabIndex',
        density: 'padding das células',
        zebra: 'Linhas alternadas com bg navy-02',
      }}
      examples={[
        {
          title: 'Tabela sortable de operadores',
          preview: <DataTableDemo />,
          code: `<DataTable<Operator>
  data={operators}
  initialSort={{ key: 'streak', dir: 'desc' }}
  columns={[
    { key: 'name',    label: 'Operador' },
    { key: 'cohort',  label: 'Turma' },
    { key: 'streak',  label: 'Streak', align: 'right' },
    { key: 'revenue', label: 'Receita', align: 'right',
      render: (r) => \`R$ \${(r.revenue/1000).toLocaleString('pt-BR')}K\` },
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use DataTable em vez de <table> manual', description: 'Sort, zebra, density, ARIA tudo de graça.' },
          dont: { title: 'Não use pra grid de cards', description: 'Use CSS Grid · tabela é semântica de dados linha-coluna.' },
        },
      ]}
      a11y={[
        <>role=grid + per-cell role=gridcell automaticamente</>,
        <>aria-sort em columns sortable · readers anunciam direção</>,
        <>Keyboard nav: Tab pelas cells · Enter ativa onRowClick</>,
        <>Scroll horizontal indicator com mask gradient (não desaparece em mobile)</>,
      ]}
      related={[
        { name: 'Pagination', description: 'Pra paginar resultados de tabela grande', href: '/components/pagination' },
        { name: 'VirtualList', description: 'Pra >1000 rows · não-tabular', href: '/api/virtual-list' },
      ]}
    />
  );
}
