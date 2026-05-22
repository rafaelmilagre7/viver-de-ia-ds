import { useState } from 'react';
import { Tabs } from '../../lib/Tabs/Tabs';
import ComponentDoc from '../../components/docs/ComponentDoc';

function TabsDemoUnderline() {
  const [active, setActive] = useState('overview');
  const panel = (label: string) => (
    <div style={{ padding: '16px 0', fontSize: 13.5, color: 'var(--via-text-body)' }}>
      Painel <strong style={{ color: 'var(--via-text-primary)' }}>{label}</strong> ativo.
    </div>
  );
  return (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <Tabs
        variant="underline"
        items={[
          { id: 'overview', label: 'Visão geral', content: panel('Visão geral') },
          { id: 'team', label: 'Equipe', badge: '8', content: panel('Equipe') },
          { id: 'billing', label: 'Cobrança', content: panel('Cobrança') },
        ]}
        activeId={active}
        onChange={setActive}
      />
    </div>
  );
}

function TabsDemoPills() {
  const [active, setActive] = useState('week');
  return (
    <Tabs
      variant="pills"
      items={[
        { id: 'week', label: 'Semana', content: <div style={{ padding: '12px 0' }}>Streak da semana</div> },
        { id: 'month', label: 'Mês', content: <div style={{ padding: '12px 0' }}>Streak do mês</div> },
        { id: 'quarter', label: 'Trimestre', content: <div style={{ padding: '12px 0' }}>Streak do trimestre</div> },
      ]}
      activeId={active}
      onChange={setActive}
    />
  );
}

export default function ApiTabs() {
  return (
    <ComponentDoc
      eyebrow="api · tabs"
      name="Tabs"
      headline="underline animado spring · pills glass · counter integrado"
      description="2 variants: underline (default) com gradient navy→blue→navy animado spring cubic-bezier(.16,1,.3,1) · pills com glass + spring active state. Suporta counter/badge por item. Keyboard arrow nav + roving tabindex."
      importLine={`import { Tabs, type TabsProps, type TabItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-tabs', description: 'Container flex column · agrupa lista + panel' },
        { part: 'via-tabs__list', description: 'Lista horizontal de tabs · role tablist' },
        { part: 'via-tabs__tab', description: 'Botão tab · role tab · aria-selected · keyboard nav' },
        { part: '::after (underline)', description: 'Underline animado · gradient navy→blue · width spring 32% → 100%' },
        { part: 'via-tabs__badge', description: 'Counter chip opcional · ARIA hidden (texto duplica info)' },
      ]}
      props={[
        { name: 'items', type: 'TabItem[]', required: true, description: 'Array · cada item com {id, label, content, badge?}' },
        { name: 'activeId', type: 'string', description: 'ID do tab ativo (controlado) · se omitir, vira uncontrolled' },
        { name: 'defaultActiveId', type: 'string', description: 'Tab ativo inicial (uncontrolled)' },
        { name: 'onChange', type: '(id: string) => void', description: 'Callback ao trocar de tab' },
        { name: 'variant', type: "'underline' | 'pills'", default: "'underline'", description: 'underline=padrão editorial · pills=segmented control glass' },
        { name: 'className', type: 'string', description: 'Classe custom · passada pro container' },
      ]}
      variants={[
        { name: 'underline', label: 'Underline editorial', description: 'Tab ativo com underline gradient navy→blue · padrão de página interna' },
        { name: 'pills', label: 'Pills glass segmented', description: 'Segmented control com glass · use pra alternar período/dimensão' },
      ]}
      examples={[
        {
          title: 'Underline · navegação principal',
          preview: <TabsDemoUnderline />,
          code: `const [active, setActive] = useState('overview');

<Tabs
  variant="underline"
  items={[
    { id: 'overview', label: 'Visão geral', content: <Overview /> },
    { id: 'team', label: 'Equipe', badge: '8', content: <Team /> },
    { id: 'billing', label: 'Cobrança', content: <Billing /> },
  ]}
  activeId={active}
  onChange={setActive}
/>`,
        },
        {
          title: 'Pills · alternador de período',
          preview: <TabsDemoPills />,
          code: `<Tabs
  variant="pills"
  items={[
    { id: 'week', label: 'Semana', content: <WeekPanel /> },
    { id: 'month', label: 'Mês', content: <MonthPanel /> },
    { id: 'quarter', label: 'Trimestre', content: <QuarterPanel /> },
  ]}
  activeId={active}
  onChange={setActive}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use underline pra nav primária', description: '"Painel · Equipe · Cobrança" · contexto de página interna.' },
          dont: { title: 'Não use 8+ tabs underline', description: 'Quebra em mobile · use Combobox ou DropdownMenu.' },
        },
        {
          do: { title: 'Badge com número absoluto', description: '"Equipe (8)" mostra escala real do dado.' },
          dont: { title: 'Não use badge decorativo "NEW"', description: 'Some o número real · use Pill separada se precisa highlight.' },
        },
      ]}
      a11y={[
        <>Role tablist + per-tab role=tab + aria-selected</>,
        <>Keyboard arrow esq/dir navega · Home/End vai pra primeira/última</>,
        <>Tab indica focus visível · enter/space ativa</>,
        <>Active panel deve ter role=tabpanel + aria-labelledby (responsabilidade do consumer)</>,
        <>Reduced motion respeitado · transição vira instantânea</>,
      ]}
      related={[
        { name: 'Stepper', description: 'Tabs sequenciais · ordem importa (wizard)', href: '/components/stepper' },
        { name: 'Combobox', description: 'Substitui tabs quando lista grande', href: '/api/combobox' },
        { name: 'Pill', description: 'Pill pra status · diferente de tab clicável', href: '/api/pill' },
      ]}
    />
  );
}
