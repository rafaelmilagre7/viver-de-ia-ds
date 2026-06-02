import { useState } from 'react';
import { DataTable } from './DataTable';
import { Pill } from '../Pill/Pill';

type Row = {
  name: string;
  streak: number;
  status: 'ativo' | 'em risco' | 'pausado';
  last: string; // ISO
};

const rows: Row[] = [
  { name: 'Caio Ribeiro',   streak: 21, status: 'ativo',     last: '2026-05-19' },
  { name: 'Camila Moraes',  streak: 14, status: 'ativo',     last: '2026-05-18' },
  { name: 'Daniel Pinheiro', streak: 4, status: 'em risco',  last: '2026-05-09' },
  { name: 'Márisson Lage',  streak: 11, status: 'ativo',     last: '2026-05-20' },
  { name: 'Diego Martins',   streak: 0,  status: 'pausado',   last: '2026-04-22' },
];

export default { title: 'DataTable' };

export const Default = () => (
  <div style={{ padding: 24 }}>
    <DataTable<Row>
      caption="Mentorados · turma 2026.2"
      columns={[
        { key: 'name', label: 'Mentorado' },
        { key: 'streak', label: 'Streak', align: 'right', accessor: (r) => r.streak, render: (r) => <span className="mono">{r.streak}d</span> },
        {
          key: 'status',
          label: 'Status',
          render: (r) => (
            <Pill variant={r.status === 'ativo' ? 'default' : r.status === 'em risco' ? 'churn' : 'attn'}>{r.status}</Pill>
          ),
        },
        {
          key: 'last',
          label: 'Última sessão',
          align: 'right',
          accessor: (r) => new Date(r.last),
          render: (r) => <span className="mono">{new Date(r.last).toLocaleDateString('pt-BR')}</span>,
        },
      ]}
      data={rows}
      initialSort={{ key: 'streak', dir: 'desc' }}
    />
  </div>
);

export const ControlledSort = () => {
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  return (
    <div style={{ padding: 24 }}>
      <DataTable<Row>
        columns={[
          { key: 'name', label: 'Mentorado' },
          { key: 'streak', label: 'Streak', align: 'right' },
        ]}
        data={rows}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortChange={(k, d) => { setSortBy(k); setSortDir(d); }}
      />
      <p style={{ marginTop: 12, fontSize: 12 }}>Ordenado por <code>{sortBy}</code> · <code>{sortDir}</code></p>
    </div>
  );
};
