import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable, type DataTableColumn } from './DataTable';

type Row = { name: string; streak: number; last: string };

const rows: Row[] = [
  { name: 'Bia',    streak: 3,  last: '2026-05-01' },
  { name: 'Ana',    streak: 14, last: '2026-05-19' },
  { name: 'Carlos', streak: 9,  last: '2026-05-10' },
];

const columns: DataTableColumn<Row>[] = [
  { key: 'name', label: 'Mentorado' },
  { key: 'streak', label: 'Streak', accessor: (r) => r.streak },
  { key: 'last', label: 'Última', accessor: (r) => new Date(r.last) },
];

function names(): string[] {
  // pega coluna 0 (Mentorado) de cada body row
  return screen
    .getAllByRole('row')
    .slice(1) // skip header row
    .map((row) => within(row).getAllByRole('cell')[0].textContent ?? '');
}

describe('<DataTable />', () => {
  it('renders rows in the original order with no initialSort', () => {
    render(<DataTable<Row> columns={columns} data={rows} />);
    expect(names()).toEqual(['Bia', 'Ana', 'Carlos']);
  });

  it('respects initialSort (numeric accessor)', () => {
    render(
      <DataTable<Row>
        columns={columns}
        data={rows}
        initialSort={{ key: 'streak', dir: 'desc' }}
      />,
    );
    expect(names()).toEqual(['Ana', 'Carlos', 'Bia']);
  });

  it('toggles sort direction on header click: none → asc → desc → none', async () => {
    const user = userEvent.setup();
    render(<DataTable<Row> columns={columns} data={rows} />);
    const streakHeader = screen.getByRole('button', { name: /streak/i });

    await user.click(streakHeader);
    expect(names()).toEqual(['Bia', 'Carlos', 'Ana']); // asc

    await user.click(streakHeader);
    expect(names()).toEqual(['Ana', 'Carlos', 'Bia']); // desc

    await user.click(streakHeader);
    expect(names()).toEqual(['Bia', 'Ana', 'Carlos']); // cleared
  });

  it('sorts Date accessors chronologically', async () => {
    const user = userEvent.setup();
    render(<DataTable<Row> columns={columns} data={rows} />);
    await user.click(screen.getByRole('button', { name: /última/i }));
    // asc · oldest first
    expect(names()).toEqual(['Bia', 'Carlos', 'Ana']);
  });

  it('emits onSortChange in controlled mode', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable<Row>
        columns={columns}
        data={rows}
        sortBy="name"
        sortDir="asc"
        onSortChange={onSortChange}
      />,
    );
    await user.click(screen.getByRole('button', { name: /streak/i }));
    expect(onSortChange).toHaveBeenCalledWith('streak', 'asc');
  });

  it('renders empty state when data is empty', () => {
    render(<DataTable<Row> columns={columns} data={[]} emptyState={<span>Vazio aqui</span>} />);
    expect(screen.getByText('Vazio aqui')).toBeInTheDocument();
  });

  it('fires onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(<DataTable<Row> columns={columns} data={rows} onRowClick={onRowClick} />);
    const firstBodyRow = screen.getAllByRole('row')[1];
    await user.click(firstBodyRow);
    expect(onRowClick).toHaveBeenCalledOnce();
    expect(onRowClick.mock.calls[0][0]).toEqual(rows[0]);
  });
});
