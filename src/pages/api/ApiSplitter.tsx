import { Splitter } from '../../lib/Splitter/Splitter';
import ComponentDoc from '../../components/docs/ComponentDoc';

const panelStyle: React.CSSProperties = {
  padding: 16,
  fontSize: 13.5,
  color: 'var(--via-text-body)',
  height: '100%',
};

function SplitterDemo() {
  return (
    <div style={{ height: 280, width: '100%', maxWidth: 560, border: '1px solid var(--via-border)', borderRadius: 12, overflow: 'hidden' }}>
      <Splitter
        orientation="horizontal"
        defaultSplit={32}
        start={
          <div style={{ ...panelStyle, background: 'var(--via-surface-1)' }}>
            <strong style={{ color: 'var(--via-text-primary)' }}>Sidebar</strong>
            <p style={{ margin: '8px 0 0' }}>Painel esquerdo · navegação, lista, índice.</p>
          </div>
        }
        end={
          <div style={panelStyle}>
            <strong style={{ color: 'var(--via-text-primary)' }}>Main</strong>
            <p style={{ margin: '8px 0 0' }}>Painel direito · content principal. Arraste o handle pra redimensionar (ou use arrow keys quando focused).</p>
          </div>
        }
      />
    </div>
  );
}

export default function ApiSplitter() {
  return (
    <ComponentDoc
      eyebrow="api · splitter"
      name="Splitter"
      headline="divisor arrastável · horizontal/vertical · keyboard ARIA"
      description="Splitter resize entre 2 painéis. Use pra: editor + preview, sidebar + main, code + console, lista + detail. Drag no handle redimensiona · keyboard arrow keys ajustam 1% por step. Min/max enforcement."
      importLine={`import { Splitter, type SplitterProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-splitter', description: 'Container flex · horizontal ou column' },
        { part: 'via-splitter__pane', description: 'Painel start/end · overflow auto' },
        { part: 'via-splitter__handle', description: 'Barra arrastável · 4px (horizontal) ou 4px (vertical) · hover navy-30' },
        { part: 'via-splitter__grip', description: 'Indicador visual · 3 dots verticais/horizontais' },
      ]}
      props={[
        { name: 'start', type: 'ReactNode', required: true, description: 'Painel da esquerda (horizontal) ou topo (vertical)' },
        { name: 'end', type: 'ReactNode', required: true, description: 'Painel da direita ou baixo' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'horizontal=lado-a-lado / vertical=stack' },
        { name: 'defaultSplit', type: 'number', default: '50', description: 'Posição inicial em % (0-100)' },
        { name: 'split', type: 'number', description: 'Posição controlada' },
        { name: 'onSplitChange', type: '(pct: number) => void', description: 'Callback ao redimensionar' },
        { name: 'min', type: 'number', default: '15', description: '% mínimo do painel start' },
        { name: 'max', type: 'number', default: '85', description: '% máximo do painel start' },
        { name: 'handleLabel', type: 'string', description: 'aria-label do handle · "Redimensionar painéis"' },
      ]}
      examples={[
        {
          title: 'Splitter horizontal · sidebar + main',
          preview: <SplitterDemo />,
          code: `<Splitter
  orientation="horizontal"
  defaultSplit={30}
  start={<Sidebar />}
  end={<MainContent />}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra layouts ajustáveis pelo user', description: 'Editor + preview · user decide quanto ver de cada lado.' },
          dont: { title: 'Não use sem persistir o split', description: 'User ajusta e volta · split deve persistir via localStorage.' },
        },
        {
          do: { title: 'min/max sensíveis (15-85)', description: 'Evita painéis sumirem completamente · UX previsível.' },
          dont: { title: 'Não use Splitter em mobile', description: 'Touch resize é hostil em telas pequenas · use Tabs ou stack vertical.' },
        },
      ]}
      a11y={[
        <>Handle com role=separator + aria-orientation + aria-valuenow</>,
        <>aria-valuemin / aria-valuemax / aria-valuenow refletem min/max/current %</>,
        <>Keyboard arrow keys ajustam · Home/End vão pra min/max · Enter restaura default</>,
        <>Focus visível no handle · ring navy spring</>,
      ]}
      related={[
        { name: 'Drawer', description: 'Quando painel é collapsable, não resize', href: '/api/drawer' },
        { name: 'Tabs', description: 'Quando só 1 painel é visível por vez', href: '/api/tabs' },
      ]}
    />
  );
}
