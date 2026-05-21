import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

export interface PaginationProps {
  page: number;        // 1-based current page
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  className?: string;
  /** Número máximo de páginas numeradas visíveis (default 7 · ímpar recomendado) */
  maxVisible?: number;
}

/**
 * Pagination · numerada editorial · prev/next + elipses
 *
 * @example
 * <Pagination page={current} totalPages={42} onPageChange={setCurrent} />
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  ariaLabel = 'Paginação',
  className = '',
  maxVisible = 7,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = computeVisiblePages(page, totalPages, maxVisible);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav aria-label={ariaLabel} className={`via-pagination ${className}`}>
      <button
        type="button"
        className="via-pagination__nav"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(page - 1)}
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} strokeWidth={2} />
        <span>Anterior</span>
      </button>

      <ul className="via-pagination__list" role="list">
        {pages.map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} className="via-pagination__gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`via-pagination__page ${p === page ? 'is-active' : ''}`}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Página ${p}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className="via-pagination__nav"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(page + 1)}
        aria-label="Próxima página"
      >
        <span>Próxima</span>
        <ChevronRight size={14} strokeWidth={2} />
      </button>
    </nav>
  );
}

/* ---------- helpers ---------- */
function computeVisiblePages(
  current: number,
  total: number,
  max: number,
): (number | '…')[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const side = Math.floor((max - 3) / 2); // 3 = primeira + última + atual
  const left = Math.max(2, current - side);
  const right = Math.min(total - 1, current + side);

  const pages: (number | '…')[] = [1];
  if (left > 2) pages.push('…');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('…');
  pages.push(total);
  return pages;
}
