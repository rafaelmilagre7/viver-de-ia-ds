import { useState } from 'react';
import { Calendar } from '../../lib/Calendar/Calendar';
import ComponentDoc from '../../components/docs/ComponentDoc';

function CalendarDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  const markers = [
    { date: new Date(2026, 4, 24), tone: 'navy' as const, label: 'Sessão mentor' },
    { date: new Date(2026, 4, 27), tone: 'coral' as const, label: 'Deadline' },
    { date: new Date(2026, 4, 30), tone: 'success' as const, label: 'Live class' },
  ];
  return <Calendar value={date} onChange={setDate} markers={markers} />;
}

export default function ApiCalendar() {
  return (
    <ComponentDoc
      eyebrow="api · calendar"
      name="Calendar"
      headline="calendário standalone · pt-BR · markers coloridos"
      description="Calendar inline (vs DatePicker que tem trigger + popover). Use em dashboards, painéis de agenda, eventos. Header pt-BR (janeiro, fevereiro...) · markers coloridos (navy/coral/success) pra eventos. Keyboard arrow nav."
      importLine={`import { Calendar, type CalendarProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-calendar', description: 'Container · header + grid 7×6' },
        { part: 'via-calendar__header', description: 'Mês + ano + arrows navegação' },
        { part: 'via-calendar__weekdays', description: 'Linha "seg ter qua qui sex sáb dom"' },
        { part: 'via-calendar__day', description: 'Célula · hover bg navy-04 · selected glow' },
        { part: 'via-calendar__marker', description: 'Dot abaixo do número · cores navy/coral/success' },
      ]}
      props={[
        { name: 'value', type: 'Date | null', description: 'Data selecionada (controlado)' },
        { name: 'onChange', type: '(date: Date) => void', description: 'Callback ao selecionar' },
        { name: 'defaultMonth', type: 'Date', description: 'Mês inicial mostrado · default mês atual' },
        { name: 'min', type: 'Date', description: 'Data mínima selecionável' },
        { name: 'max', type: 'Date', description: 'Data máxima selecionável' },
        { name: 'locale', type: 'string', default: "'pt-BR'", description: 'Locale pra formatação de mês/dias' },
        { name: 'showWeekdays', type: 'boolean', default: 'true', description: 'Mostra header de dias da semana' },
        { name: 'markers', type: '{ date, tone?, label? }[]', description: 'Dots coloridos pra eventos · 3 tones (navy/coral/success)' },
      ]}
      examples={[
        {
          title: 'Calendar com 3 markers (sessão, deadline, live)',
          preview: <CalendarDemo />,
          code: `const markers = [
  { date: new Date(2026, 4, 24), tone: 'navy',    label: 'Sessão mentor' },
  { date: new Date(2026, 4, 27), tone: 'coral',   label: 'Deadline' },
  { date: new Date(2026, 4, 30), tone: 'success', label: 'Live class' },
];

<Calendar value={date} onChange={setDate} markers={markers} />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use markers pra visualizar eventos', description: 'Dots dão sinal visual rápido · usuário vê dias importantes do mês.' },
          dont: { title: 'Não use Calendar pra escolha simples', description: 'Use DatePicker (trigger compact) · Calendar é pesado pra single date.' },
        },
        {
          do: { title: 'Combine com lista de eventos abaixo', description: 'Calendar à esq, agenda do dia à dir · padrão dashboard.' },
          dont: { title: 'Não use markers sem label', description: 'Marker sem context = mistério · sempre passe label (tooltip ao hover).' },
        },
      ]}
      a11y={[
        <>role=grid + per-cell role=gridcell · semântica de tabela</>,
        <>Keyboard arrow esq/dir/cima/baixo navega · PgUp/PgDn troca mês · Home/End primeiro/último do mês</>,
        <>Today com aria-current="date" · screen reader anuncia "hoje"</>,
        <>Markers com aria-label · screen reader anuncia label do evento</>,
        <>Days disabled (min/max) com aria-disabled=true</>,
      ]}
      related={[
        { name: 'DatePicker', description: 'Calendar + trigger compacto · pra forms', href: '/api/date-picker' },
        { name: 'DateRangePicker', description: 'Intervalo (de/até)', href: '/api/date-range-picker' },
      ]}
    />
  );
}
