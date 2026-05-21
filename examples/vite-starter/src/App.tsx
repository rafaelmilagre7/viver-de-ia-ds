import { useState } from 'react';
import { Calendar, Compass, Filter, Layers, Users } from 'lucide-react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Command,
  DataTable,
  DatePicker,
  Modal,
  Pill,
  Popover,
  Slider,
  ToastStack,
  Tooltip,
  cssVar,
  tokens,
  useToasts,
  type DataTableColumn,
} from '@viverdeia/design-system';

/**
 * Consumer-side smoke test.
 *
 * This app exists to prove that `@viverdeia/design-system` actually works
 * as an external dependency — installed via `file:../../dist/lib`, imported
 * by name, and rendered with the published styles + tokens.
 *
 * If this app builds and renders without changes to the library, the
 * publish artifact is good.
 */

type Mentor = { name: string; streak: number; status: 'ativo' | 'em risco' | 'pausado' };
const mentors: Mentor[] = [
  { name: 'Caio Ribeiro',    streak: 21, status: 'ativo' },
  { name: 'Camila Moraes',   streak: 14, status: 'ativo' },
  { name: 'Daniel Pinheiro', streak: 4,  status: 'em risco' },
  { name: 'Márisson Lage',   streak: 11, status: 'ativo' },
  { name: 'Yago Almeida',    streak: 0,  status: 'pausado' },
];

const tableColumns: DataTableColumn<Mentor>[] = [
  { key: 'name', label: 'Mentorado' },
  {
    key: 'streak',
    label: 'Streak',
    align: 'right',
    accessor: (r) => r.streak,
    render: (r) => <span className="mono">{r.streak}d</span>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (r) => (
      <Pill variant={r.status === 'ativo' ? 'default' : r.status === 'em risco' ? 'churn' : 'attn'}>
        {r.status}
      </Pill>
    ),
  },
];

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [volume, setVolume] = useState(48);
  const [showAlert, setShowAlert] = useState(true);
  const { toasts, push, dismiss } = useToasts();

  return (
    <main className="page">
      <header>
        <Pill variant="default">consumer · vite-starter</Pill>
        <h1>
          <em>@viverdeia/design-system</em> consumido como dependency externa.
        </h1>
        <p>
          Este app importa a library publicada via <code>file:../../dist/lib</code>. Se renderizar
          igual ao reference site (mesma paleta navy, mesmos tokens, mesmos comportamentos), o
          publish artifact tá pronto pra npm.
        </p>
      </header>

      <section className="section">
        <h2>Buttons · 5 variants</h2>
        <div className="row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Cancelar plano</Button>
          <Button variant="accent">Acento editorial</Button>
        </div>
      </section>

      <section className="section">
        <h2>Pills · status</h2>
        <div className="row">
          <Pill variant="default">em produção</Pill>
          <Pill variant="attn">requer atenção</Pill>
          <Pill variant="churn">risco churn</Pill>
          <Pill variant="live"><em>ao vivo</em></Pill>
        </div>
      </section>

      <section className="section">
        <h2>Avatar</h2>
        <div className="row">
          <Avatar alt="Caio Ribeiro" status="online" />
          <Avatar alt="Camila Moraes" status="away" />
          <Avatar alt="Daniel Pinheiro" status="busy" />
          <Avatar alt="Yago Almeida" status="offline" />
        </div>
      </section>

      <section className="section">
        <h2>Alert · banner persistente</h2>
        <div className="stack">
          <Alert tone="info" title="Janela de manutenção · sex 22h">
            Pausa programada de até 8 minutos · sem perda de dados.
          </Alert>
          {showAlert && (
            <Alert tone="danger" title="Falha de sync · 4 mensagens" onDismiss={() => setShowAlert(false)}>
              Tente novamente em alguns segundos.
            </Alert>
          )}
          <Alert tone="success" title="Tudo sincronizado">Última sync · há 2 min.</Alert>
        </div>
      </section>

      <section className="section">
        <h2>DatePicker · pt-BR month grid</h2>
        <DatePicker value={date} onChange={setDate} label="Quando?" />
      </section>

      <section className="section">
        <h2>Slider · range editorial</h2>
        <div style={{ maxWidth: 460 }}>
          <Slider
            value={volume}
            onChange={setVolume}
            label="Volume da live"
            formatValue={(n) => `${n}%`}
            marks={[
              { value: 0,   label: 'mudo' },
              { value: 50,  label: 'médio' },
              { value: 100, label: 'máx' },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <h2>DataTable · sortable</h2>
        <DataTable<Mentor>
          caption="Mentorados · turma 2026.2"
          columns={tableColumns}
          data={mentors}
          initialSort={{ key: 'streak', dir: 'desc' }}
        />
      </section>

      <section className="section">
        <h2>Overlays · Modal, Popover, Command, Tooltip, Toast</h2>
        <div className="row">
          <Button onClick={() => setModalOpen(true)}>Abrir modal</Button>
          <Button onClick={() => setPaletteOpen(true)}>Cmd+K</Button>

          <Popover
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            side="bottom"
            align="end"
            label="Filtros"
            trigger={
              <Button variant="secondary" iconLeft={<Filter size={13} strokeWidth={2.2} />} onClick={() => setFiltersOpen((o) => !o)}>
                Filtros
              </Button>
            }
          >
            <h4>Filtrar por</h4>
            <Checkbox label="Concluídos" />
            <Checkbox label="Em andamento" />
          </Popover>

          <Tooltip content="Click pra abrir um toast">
            <Button variant="ghost" onClick={() => push({ title: 'Salvo', variant: 'success' })}>
              Disparar toast
            </Button>
          </Tooltip>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Renovar plano"
          footer={<Button onClick={() => setModalOpen(false)}>Fechar</Button>}
        >
          <p>
            Suas próximas 3 cobranças serão de <strong>R$ 6.000</strong>. Reduza pra plano lite
            em um clique.
          </p>
        </Modal>

        <Command
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onSelect={(id) => push({ title: 'Selecionado', message: id })}
          groups={[
            {
              heading: 'Navegação',
              items: [
                { id: '/aluno',    label: 'Aluno · jornada',  hint: 'progressão pessoal', icon: <Compass size={14} /> },
                { id: '/turma',    label: 'Turma 2026.2',     hint: '24 operadores ativos', icon: <Users size={14} /> },
                { id: '/calendar', label: 'Calendário · lives', icon: <Calendar size={14} /> },
              ],
            },
            {
              heading: 'Ações',
              items: [{ id: 'new-note', label: 'Nova nota', shortcut: 'N', icon: <Layers size={14} /> }],
            },
          ]}
        />
      </section>

      <section className="section">
        <h2>Card · featured</h2>
        <Card variant="featured" title="Próxima cohort · 17 fev 2026">
          <p style={{ margin: 0 }}>
            24 operadores · 18 aulas · 4 lives · 2 estudos de caso entregues.
          </p>
        </Card>
      </section>

      <section className="section">
        <h2>Tokens · runtime + types</h2>
        <pre style={{ background: 'var(--via-gray-50)', padding: 16, borderRadius: 8, fontSize: 12, fontFamily: 'var(--via-font-mono)' }}>
{`tokens['via-navy']        // ${tokens['via-navy']}
tokens['via-radius-lg']   // ${tokens['via-radius-lg']}
cssVar('via-accent')      // ${cssVar('via-accent')}
total de tokens           // ${Object.keys(tokens).length}`}
        </pre>
      </section>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </main>
  );
}
