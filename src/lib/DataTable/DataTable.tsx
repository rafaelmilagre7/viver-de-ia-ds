import { useMemo, useState, type ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './DataTable.css';

export type SortDir = 'asc' | 'desc';

export interface DataTableColumn<T> {
  /** Unique key matching a property of `T` (or arbitrary for derived cells) */
  key: string;
  /** Header label */
  label: ReactNode;
  /** Optional accessor when `key` doesn't map directly · returns sortable primitive */
  accessor?: (row: T) => string | number | Date | null | undefined;
  /** Optional cell renderer · receives the row and returns ReactNode */
  render?: (row: T) => ReactNode;
  /** Whether the column is sortable (default true) */
  sortable?: boolean;
  /** Horizontal alignment (default 'left') */
  align?: 'left' | 'right' | 'center';
  /** Optional fixed width (CSS string) */
  width?: string;
  /** Header eyebrow / hint */
  meta?: string;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Rows */
  data: T[];
  /** Optional caption (visible header above the table) */
  caption?: ReactNode;
  /** Empty-state content when data is empty */
  emptyState?: ReactNode;
  /** Initial sort */
  initialSort?: { key: string; dir: SortDir };
  /** Controlled sort (overrides internal state when provided) */
  sortBy?: string;
  sortDir?: SortDir;
  /** Notified when the user changes sort */
  onSortChange?: (key: string, dir: SortDir) => void;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Visual density */
  density?: 'comfortable' | 'compact';
  /** Make rows zebra striped */
  zebra?: boolean;
}

/**
 * DataTable · sortable editorial table · light-first.
 *
 * - Click a sortable header to toggle asc/desc (third click clears).
 * - Provide `accessor` when sort needs a derived value.
 * - Provide `render` for ReactNode cells (icons, pills, etc.).
 *
 * @example
 * <DataTable
 *   caption="Mentorados ativos"
 *   columns={[
 *     { key: 'name', label: 'Mentorado' },
 *     { key: 'streak', label: 'Streak', align: 'right' },
 *     { key: 'last', label: 'Última sessão', accessor: r => new Date(r.last) },
 *   ]}
 *   data={rows}
 * />
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  caption,
  emptyState,
  initialSort,
  sortBy,
  sortDir,
  onSortChange,
  onRowClick,
  density = 'comfortable',
  zebra = false,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDir } | null>(
    initialSort ?? null,
  );

  const current = sortBy && sortDir ? { key: sortBy, dir: sortDir } : internalSort;

  const sortedData = useMemo(() => {
    if (!current) return data;
    const col = columns.find((c) => c.key === current.key);
    if (!col) return data;
    const get = (r: T) => (col.accessor ? col.accessor(r) : (r as Record<string, unknown>)[col.key]);
    const dir = current.dir === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (va instanceof Date && vb instanceof Date) return (va.getTime() - vb.getTime()) * dir;
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb), 'pt-BR', { numeric: true }) * dir;
    });
  }, [data, columns, current]);

  const onHeaderClick = (col: DataTableColumn<T>) => {
    if (col.sortable === false) return;
    let next: { key: string; dir: SortDir } | null;
    if (!current || current.key !== col.key) {
      next = { key: col.key, dir: 'asc' };
    } else if (current.dir === 'asc') {
      next = { key: col.key, dir: 'desc' };
    } else {
      next = null;
    }
    if (sortBy === undefined) setInternalSort(next);
    if (next && onSortChange) onSortChange(next.key, next.dir);
  };

  return (
    <div className={`via-dt via-dt--${density} ${zebra ? 'via-dt--zebra' : ''}`}>
      {caption && <header className="via-dt__caption">{caption}</header>}
      <div className="via-dt__scroll">
        <table>
          <thead>
            <tr>
              {columns.map((c) => {
                const isOn = current?.key === c.key;
                const sortable = c.sortable !== false;
                return (
                  <th
                    key={c.key}
                    style={{ width: c.width, textAlign: c.align ?? 'left' }}
                    aria-sort={
                      isOn ? (current!.dir === 'asc' ? 'ascending' : 'descending') : 'none'
                    }
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className={`via-dt__sort ${isOn ? 'on' : ''}`}
                        onClick={() => onHeaderClick(c)}
                      >
                        <span>{c.label}</span>
                        <span className="via-dt__chev" aria-hidden="true">
                          {isOn && current!.dir === 'asc' ? (
                            <ChevronUp size={11} strokeWidth={2.4} />
                          ) : isOn && current!.dir === 'desc' ? (
                            <ChevronDown size={11} strokeWidth={2.4} />
                          ) : (
                            <ChevronUp size={11} strokeWidth={1.6} className="muted" />
                          )}
                        </span>
                      </button>
                    ) : (
                      <span className="via-dt__th-static">{c.label}</span>
                    )}
                    {c.meta && <em className="via-dt__th-meta">{c.meta}</em>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="via-dt__empty">
                  {emptyState ?? <span>Nada por aqui ainda.</span>}
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => (
                <tr
                  key={i}
                  className={onRowClick ? 'is-clickable' : ''}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === 'Enter') onRowClick(row);
                        }
                      : undefined
                  }
                >
                  {columns.map((c) => {
                    const cell = c.render
                      ? c.render(row)
                      : ((row as Record<string, unknown>)[c.key] as ReactNode);
                    return (
                      <td key={c.key} style={{ textAlign: c.align ?? 'left' }}>
                        {cell as ReactNode}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
