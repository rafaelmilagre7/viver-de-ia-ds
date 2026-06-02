import { DataTable, type SortDir } from '../../lib/DataTable/DataTable';
import ComponentDoc from '../../components/docs/ComponentDoc';

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
      props={[
        { name: 'data', type: 'T[]', required: true, description: 'Array de rows · T extends Record<string, unknown>' },
        { name: 'columns', type: 'DataTableColumn<T>[]', required: true, description: 'Definição de colunas (key, label, accessor, render, sortable, align, width, meta)' },
        { name: 'caption', type: 'ReactNode', description: 'Header acima da tabela (opcional)' },
        { name: 'emptyState', type: 'ReactNode', description: 'Conteúdo quando data está vazio' },
        { name: 'initialSort', type: '{ key: string; dir: SortDir }', description: 'Sort inicial (uncontrolled)' },
        { name: 'sortBy / sortDir', type: 'string / SortDir', description: 'Sort controlado · ambos juntos sobrescrevem state interno' },
        { name: 'onSortChange', type: '(key: string, dir: SortDir) => void', description: 'Callback quando user clica em coluna sortable' },
        { name: 'onRowClick', type: '(row: T) => void', description: 'Click handler · adiciona cursor pointer + tabIndex' },
        { name: 'density', type: "'comfortable' | 'compact'", default: "'comfortable'", description: 'padding das células' },
        { name: 'zebra', type: 'boolean', default: 'false', description: 'Linhas alternadas com bg navy-02' },
      ]}
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
