import { ChevronRight } from 'lucide-react';
import { type ReactNode } from 'react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

/**
 * Breadcrumb · navegação hierárquica · ARIA nav + ordered list
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: 'Plataforma', href: '/' },
 *     { label: 'Mentorias', href: '/mentorias' },
 *     { label: 'Sessão 12' }, // sem href = current page
 *   ]}
 * />
 */
export function Breadcrumb({
  items,
  separator,
  ariaLabel = 'Caminho de navegação',
  className = '',
}: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className={`via-breadcrumb ${className}`}>
      <ol className="via-breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const sep = separator ?? <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />;

          return (
            <li key={i} className="via-breadcrumb__item">
              {item.href && !isLast ? (
                <a href={item.href} className="via-breadcrumb__link" onClick={item.onClick}>
                  {item.label}
                </a>
              ) : item.onClick && !isLast ? (
                <button
                  type="button"
                  className="via-breadcrumb__link via-breadcrumb__link--btn"
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className="via-breadcrumb__current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="via-breadcrumb__sep" aria-hidden="true">{sep}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
