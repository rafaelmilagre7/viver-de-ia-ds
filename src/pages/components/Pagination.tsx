import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './pagination.css';

export default function Pagination() {
  const [page, setPage] = useState(3);
  const total = 12;
  const pages = [1, 2, 3, 4, 5, '…', total];

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · paginação"
        title={<>Numerada, com <em>ellipsis</em>.</>}
        lede="Paginação numerada quando o total cabe na cabeça do leitor. Use ellipsis quando passa de 7 páginas. Os cliques navegam por página; setas pulam uma. Nunca esconda o total."
      />

      <Section title="Padrão" meta="navy fill no atual">
        <div className="via-pag">
          <button className="arr" disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Página anterior">
            <ChevronLeft size={14} strokeWidth={2.2} />
          </button>
          {pages.map((p, i) =>
            p === '…' ? (
              <span key={`ell-${i}`} className="ell">…</span>
            ) : (
              <button
                key={p}
                className={`p ${page === p ? 'active' : ''}`}
                onClick={() => setPage(p as number)}
              >{p}</button>
            ),
          )}
          <button className="arr" disabled={page === total} onClick={() => setPage(page + 1)} aria-label="Próxima página">
            <ChevronRight size={14} strokeWidth={2.2} />
          </button>
        </div>
        <p style={{ marginTop: 24, fontFamily: 'var(--via-font)', fontSize: 12, color: 'var(--via-text-muted)' }}>
          Página <strong style={{ color: 'var(--via-text-primary)' }}>{page}</strong> de <strong style={{ color: 'var(--via-text-primary)' }}>{total}</strong> · 206 cases no total
        </p>
      </Section>
    </>
  );
}
