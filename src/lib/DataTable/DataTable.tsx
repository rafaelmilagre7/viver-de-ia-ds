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
  /** Optional caption · real `<caption>` (names the table for screen readers) */
  caption?: ReactNode;
  /** Empty-state content when data is empty */
  emptyState?: ReactNode;
  /** Initial sort */
  initialSort?: { key: string; dir: SortDir };
  /** Controlled sort (overrides internal state when provided) · `null` = controlled, unsorted */
  sortBy?: string | null;
  sortDir?: SortDir;
  /** Notified when the user sets a sort (unchanged contract: never called on clear) */
  onSortChange?: (key: string, dir: SortDir) => void;
  /**
   * Notified on EVERY sort change, including the third click that clears it
   * (`null`). Use it for controlled mode: `sortBy={sort?.key ?? null}`.
   */
  onSortStateChange?: (sort: { key: string; dir: SortDir } | null) => void;
  /** Stable row identity (key name or function) · default = index. Keeps cell state (checkboxes, inputs) attached to the right row after sorting. */
  rowKey?: keyof T | ((row: T, index: number) => string | number);
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
 *   Controlled: `sortBy` (string | null) + `onSortStateChange` (sees the clear too).
 * - `rowKey` keeps per-row cell state (checkbox, input) on the right row after sorting.
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
  onSortStateChange,
  rowKey,
  onRowClick,
  density = 'comfortable',
  zebra = false,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDir } | null>(
    initialSort ?? null,
  );

  // Controlado quando sortBy veio (string ou null); null = sem ordenação
  const controlled = sortBy !== undefined;
  const current = useMemo(
    () => (controlled ? (sortBy ? { key: sortBy, dir: sortDir ?? 'asc' } : null) : internalSort),
    [controlled, sortBy, sortDir, internalSort],
  );

  const keyOf = (row: T, i: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(row, i);
    if (rowKey !== undefined) return String(row[rowKey]);
    return i;
  };

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
    if (!controlled) setInternalSort(next);
    if (next) onSortChange?.(next.key, next.dir);
    // 3º clique limpa: avisa com null (antes o modo controlado nunca sabia)
    onSortStateChange?.(next);
  };

  return (
    <div className={`via-dt via-dt--${density} ${zebra ? 'via-dt--zebra' : ''}`}>
      <div className="via-dt__scroll">
        <table>
          {caption && <caption className="via-dt__caption">{caption}</caption>}
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
                  key={keyOf(row, i)}
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
