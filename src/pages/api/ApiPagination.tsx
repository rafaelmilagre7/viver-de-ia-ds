import { useState } from 'react';
import { Pagination } from '../../lib/Pagination/Pagination';
import ComponentDoc from '../../components/docs/ComponentDoc';

function PaginationDemo() {
  const [page, setPage] = useState(7);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <p style={{ fontSize: 13, color: 'var(--via-text-muted)', margin: 0 }}>
        Página <strong style={{ color: 'var(--via-text-primary)' }}>{page}</strong> de 42
      </p>
      <Pagination page={page} totalPages={42} onPageChange={setPage} />
    </div>
  );
}

export default function ApiPagination() {
  return (
    <ComponentDoc
      eyebrow="api · pagination"
      name="Pagination"
      headline="paginação editorial · numerada · prev/next + elipses"
      description="Pagination numerada com prev/next + elipses inteligentes (mostra primeiras, current ± 1, últimas). Spring hover + selected glass. ARIA nav + aria-current=page. Some quando totalPages <= 1."
      importLine={`import { Pagination, type PaginationProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-pagination', description: 'Nav · flex horizontal · gap 4' },
        { part: 'via-pagination__btn', description: 'Botão · 32×32 · glass + hover ring · selected bg navy' },
        { part: 'via-pagination__prev/next', description: 'Setas extremas · disabled quando no limite' },
        { part: 'via-pagination__ellipsis', description: '… visualmente · indica páginas omitidas (não clicável)' },
      ]}
      props={[
        { name: 'page', type: 'number', required: true, description: 'Página atual (1-based)' },
        { name: 'totalPages', type: 'number', required: true, description: 'Total de páginas' },
        { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Callback ao clicar' },
        { name: 'maxVisible', type: 'number', default: '7', description: 'Máximo de botões numerados visíveis · ímpar recomendado (centra current)' },
        { name: 'ariaLabel', type: 'string', default: "'Paginação'", description: 'Label do nav' },
        { name: 'className', type: 'string', description: 'Classe custom' },
      ]}
      examples={[
        {
          title: '42 páginas · current 7',
          preview: <PaginationDemo />,
          code: `const [page, setPage] = useState(1);

<Pagination
  page={page}
  totalPages={42}
  onPageChange={setPage}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra listas com 50+ itens', description: 'Search results, table com >100 rows · pagination evita scroll infinito hostil.' },
          dont: { title: 'Não use pra 10-20 itens', description: 'Mostre tudo de uma vez · pagination cria fricção desnecessária.' },
        },
        {
          do: { title: 'Pareie com Pagination Info', description: '"Página 7 de 42 · mostrando 121-140 de 838" · contexto explícito.' },
          dont: { title: 'Não use "Carregar mais" + Pagination juntos', description: 'Padrões conflitantes · escolha um.' },
        },
      ]}
      a11y={[
        <>nav + aria-label="Paginação"</>,
        <>Per-btn aria-label="Ir pra página X"</>,
        <>Current page com aria-current="page"</>,
        <>Prev/next desabilitados com aria-disabled=true nos limites</>,
        <>Ellipsis com aria-hidden=true · não interativo</>,
      ]}
      related={[
        { name: 'DataTable', description: 'Tabela · pareie com Pagination', href: '/api/data-table' },
        { name: 'VirtualList', description: 'Pra >1000 rows · scroll virtualizado em vez de pagination', href: '/api/virtual-list' },
      ]}
    />
  );
}
