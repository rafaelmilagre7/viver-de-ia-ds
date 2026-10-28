import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { DataTable, type SortDir } from './DataTable';

/* Regressões da auditoria · caption real, rowKey e ordenação controlada que limpa */

type Row = { n: string };
const cols = [{ key: 'n', label: 'Nome' }];
const data: Row[] = [{ n: 'b' }, { n: 'a' }];

describe('<DataTable /> · regressões', () => {
  it('caption é <caption> de verdade e nomeia a tabela', () => {
    render(<DataTable columns={cols} data={data} caption="Mentorados" />);
    const table = screen.getByRole('table', { name: 'Mentorados' });
    expect(table.querySelector('caption')).toHaveTextContent('Mentorados');
  });

  it('rowKey mantém o estado da célula com a linha certa depois de ordenar', async () => {
    const user = userEvent.setup();
    const columns = [
      { key: 'n', label: 'Nome' },
      {
        key: 'c',
        label: 'Sel',
        sortable: false,
        render: (r: Row) => <input type="checkbox" aria-label={`sel-${r.n}`} />,
      },
    ];
    render(<DataTable columns={columns} data={data} rowKey="n" />);
    await user.click(screen.getByRole('checkbox', { name: 'sel-b' }));
    await user.click(screen.getByRole('button', { name: /Nome/ })); // asc → "a" sobe
    expect(screen.getByRole('checkbox', { name: 'sel-b' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'sel-a' })).not.toBeChecked();
  });

  it('rowKey também aceita função', () => {
    const rowKey = vi.fn((r: Row) => `row-${r.n}`);
    render(<DataTable columns={cols} data={data} rowKey={rowKey} />);
    expect(rowKey).toHaveBeenCalled();
  });

  it('controlado: o 3º clique avisa a limpeza (onSortStateChange(null)) e sortBy={null} desliga', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    const onSortStateChange = vi.fn();
    function Host() {
      const [sort, setSort] = useState<{ key: string; dir: SortDir } | null>({ key: 'n', dir: 'desc' });
      return (
        <DataTable
          columns={cols}
          data={data}
          sortBy={sort?.key ?? null}
          sortDir={sort?.dir}
          onSortChange={onSortChange}
          onSortStateChange={(s) => {
            onSortStateChange(s);
            setSort(s);
          }}
        />
      );
    }
    render(<Host />);
    const th = screen.getByRole('columnheader', { name: /Nome/ });
    expect(th).toHaveAttribute('aria-sort', 'descending');
    await user.click(screen.getByRole('button', { name: /Nome/ }));
    expect(onSortStateChange).toHaveBeenLastCalledWith(null);
    expect(onSortChange).not.toHaveBeenCalled(); // contrato antigo: nunca recebe null
    expect(th).toHaveAttribute('aria-sort', 'none');
    // ordem original de volta
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('b');
    await user.click(screen.getByRole('button', { name: /Nome/ }));
    expect(onSortStateChange).toHaveBeenLastCalledWith({ key: 'n', dir: 'asc' });
    expect(onSortChange).toHaveBeenLastCalledWith('n', 'asc');
  });
});
