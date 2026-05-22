import { useState } from 'react';
import { DateRangePicker, type DateRange } from '../../lib/DateRangePicker/DateRangePicker';
import ComponentDoc from '../../components/docs/ComponentDoc';

function DateRangeDemo() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  return <DateRangePicker showPresets value={range} onChange={setRange} />;
}

export default function ApiDateRangePicker() {
  return (
    <ComponentDoc
      eyebrow="api · date-range-picker"
      name="DateRangePicker"
      headline="intervalo · 2 cliques · highlight range · presets"
      description="DateRangePicker pra intervalos (de/até). 2 cliques: primeiro define start, segundo define end. Range fica highlighted entre os 2. Presets opcionais (Últimos 7 / 30 / 90 dias). Usa Calendar interno."
      importLine={`import { DateRangePicker, type DateRangePickerProps, type DateRange } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-drp', description: 'Container · trigger + popover · controlled' },
        { part: 'via-drp__trigger', description: 'Botão · "de · até" formatted + Calendar icon' },
        { part: 'via-drp__panel', description: 'Popover · presets sidebar + Calendar com range highlight' },
        { part: 'via-drp__range', description: 'Bg navy-04 entre start e end · spring spread' },
        { part: 'via-drp__presets', description: 'Sidebar · "Últimos 7/30/90 dias" + custom' },
      ]}
      props={[
        { name: 'value', type: 'DateRange', description: '{ start: Date | null, end: Date | null }' },
        { name: 'onChange', type: '(range: DateRange) => void', description: 'Callback ao mudar' },
        { name: 'defaultMonth', type: 'Date', description: 'Mês inicial · default atual' },
        { name: 'min', type: 'Date', description: 'Data mínima permitida' },
        { name: 'max', type: 'Date', description: 'Data máxima permitida' },
        { name: 'locale', type: 'string', default: "'pt-BR'", description: 'Locale dos labels' },
        { name: 'showPresets', type: 'boolean', default: 'false', description: 'Mostra sidebar com Últimos 7/30/90 dias' },
      ]}
      examples={[
        {
          title: 'Range picker com presets · sidebar com atalhos',
          preview: <DateRangeDemo />,
          code: `const [range, setRange] = useState({ start: null, end: null });

<DateRangePicker
  showPresets
  value={range}
  onChange={setRange}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use showPresets em dashboards', description: '"Últimos 30 dias" é o filtro mais comum · economiza cliques.' },
          dont: { title: 'Não use DateRangePicker pra single date', description: 'Use DatePicker · range adiciona complexidade desnecessária.' },
        },
        {
          do: { title: 'Estado inicial null · usuário define', description: 'Sem range = "todo o período" · usuário escolhe filtrar.' },
          dont: { title: 'Não preencha range default arbitrário', description: '"Últimos 30 dias" preset != default forçado · deixe livre.' },
        },
      ]}
      a11y={[
        <>2 inputs internos · "Data início" e "Data fim" anunciados separados</>,
        <>Range highlighted com aria-label="X dias selecionados"</>,
        <>Keyboard: 1ª date clica start · 2ª clica end · ESC limpa</>,
        <>Presets como botões · aria-label completo "Selecionar últimos 30 dias"</>,
      ]}
      related={[
        { name: 'DatePicker', description: 'Pra escolher 1 data', href: '/api/date-picker' },
        { name: 'Calendar', description: 'Standalone inline', href: '/api/calendar' },
      ]}
    />
  );
}
