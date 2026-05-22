import { VirtualList } from '../../lib/VirtualList/VirtualList';
import ComponentDoc from '../../components/docs/ComponentDoc';

interface LogRow {
  id: string;
  time: string;
  level: 'info' | 'warn' | 'err';
  message: string;
}

const ITEMS: LogRow[] = Array.from({ length: 5000 }).map((_, i) => ({
  id: `${i}`,
  time: `12:${String(i % 60).padStart(2, '0')}:${String(Math.floor(i / 60) % 60).padStart(2, '0')}`,
  level: (['info', 'warn', 'err'] as const)[i % 3],
  message: `Event log #${i + 1} · sample message for virtual list demo`,
}));

function VirtualListDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <VirtualList
        items={ITEMS}
        height={320}
        itemHeight={44}
        label="Log de eventos"
        renderItem={(item) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '0 16px',
              height: '100%',
              borderBottom: '1px solid var(--via-border)',
              fontSize: 12.5,
            }}
          >
            <span style={{ color: 'var(--via-text-muted)', fontVariantNumeric: 'tabular-nums', minWidth: 56 }}>{item.time}</span>
            <span style={{
              textTransform: 'uppercase',
              fontSize: 10.5,
              letterSpacing: 0.4,
              minWidth: 40,
              color: item.level === 'err' ? 'var(--via-danger)' : item.level === 'warn' ? 'var(--via-text-primary)' : 'var(--via-text-muted)',
            }}>{item.level}</span>
            <span style={{ color: 'var(--via-text-body)' }}>{item.message}</span>
          </div>
        )}
      />
      <p style={{ marginTop: 8, fontSize: 11.5, color: 'var(--via-text-muted)' }}>5000 rows · só os ~10 visíveis renderizam.</p>
    </div>
  );
}

export default function ApiVirtualList() {
  return (
    <ComponentDoc
      eyebrow="api · virtual-list"
      name="VirtualList"
      headline="performance para 10000+ rows · overscan + position absolute"
      description="VirtualList renderiza só items visíveis + buffer (overscan). Use pra: notificações, logs, mensagens, audit trails, busca em massa. Sem isso, 5000+ rows trava o browser. Altura fixa por item (itemHeight obrigatório)."
      importLine={`import { VirtualList, type VirtualListProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-vlist', description: 'Container · overflow auto · height fixo' },
        { part: 'via-vlist__inner', description: 'Inner div · height total (items × itemHeight) pra scroll funcionar' },
        { part: 'visible window', description: 'Calculado a cada scroll · renderItem(item) só pra items visíveis' },
        { part: 'overscan', description: 'Buffer · renderiza +N items acima/abaixo · evita flash em scroll rápido' },
      ]}
      props={[
        { name: 'items', type: 'T[]', required: true, description: 'Array de items · qualquer tipo' },
        { name: 'renderItem', type: '(item: T, index: number) => ReactNode', required: true, description: 'Render function · roda só pra items visíveis' },
        { name: 'itemHeight', type: 'number', default: '48', description: 'Altura FIXA em px · obrigatório saber pra calcular janela' },
        { name: 'height', type: 'number', default: '400', description: 'Altura do container em px' },
        { name: 'overscan', type: 'number', default: '5', description: 'Buffer · items extras renderizados acima/abaixo da janela' },
        { name: 'label', type: 'string', description: 'aria-label do list pra screen reader' },
        { name: 'emptyState', type: 'ReactNode', description: 'Render quando items.length=0' },
      ]}
      examples={[
        {
          title: '5000 rows · só ~10 renderizam',
          preview: <VirtualListDemo />,
          code: `<VirtualList
  items={5000_rows}
  height={320}
  itemHeight={44}
  label="Log de eventos"
  renderItem={(row) => <LogRow {...row} />}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra 1000+ items', description: 'Performance crítica · sem virtualização browser trava.' },
          dont: { title: 'Não use pra <100 items', description: 'Use lista normal · virtualização adiciona complexidade desnecessária.' },
        },
        {
          do: { title: 'itemHeight FIXO obrigatório', description: 'Cálculo de janela exige altura conhecida.' },
          dont: { title: 'Não use VirtualList com items de altura variável', description: 'Requer biblioteca mais robusta (react-virtual). VirtualList do DS é fixed-height.' },
        },
      ]}
      a11y={[
        <>role=list · aria-label customizável</>,
        <>aria-rowcount no list = items.length (não só visíveis)</>,
        <>Per-item position absolute · screen reader navega normal (DOM virtual)</>,
        <>Empty state com role=status · anunciado</>,
        <>Scroll keyboard padrão (Page Up/Down, Home/End)</>,
      ]}
      related={[
        { name: 'DataTable', description: 'Pra dados tabulares <500 rows · com sort/filter', href: '/api/data-table' },
        { name: 'Pagination', description: 'Alternativa · páginas de 20-100 rows', href: '/api/pagination' },
      ]}
    />
  );
}
