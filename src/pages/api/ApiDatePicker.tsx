import { useState } from 'react';
import { DatePicker } from '../../lib/DatePicker/DatePicker';
import ComponentDoc from '../../components/docs/ComponentDoc';

function DatePickerDemo() {
  const [d, setD] = useState<Date | null>(new Date());
  return (
    <DatePicker
      label="Data da próxima sessão"
      value={d}
      onChange={setD}
      min={new Date()}
      placeholder="Selecione uma data"
    />
  );
}

export default function ApiDatePicker() {
  return (
    <ComponentDoc
      eyebrow="api · date-picker"
      name="DatePicker"
      headline="calendário editorial pt-BR · keyboard nav · min/max"
      description="DatePicker pra escolha de data única. Trigger com value formatado + ícone Calendar. Popover com calendar pt-BR (dom-sáb ou seg-dom). Min/max validation. Editorial: glass intenso + spring + hover ring."
      importLine={`import { DatePicker, type DatePickerProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-datepicker', description: 'Container · label + trigger + popover' },
        { part: 'via-datepicker__trigger', description: 'Botão · Calendar icon + valor formatado · glass' },
        { part: 'via-datepicker__popover', description: 'Painel · header (mês/ano) + grid 7×6 dias' },
        { part: 'via-datepicker__day', description: 'Célula · hover bg navy-04 · selected bg navy + glow' },
        { part: 'today indicator', description: 'Ring sutil ao redor do dia atual (não selected)' },
      ]}
      props={[
        { name: 'value', type: 'Date | null', required: true, description: 'Data selecionada (controlado) · null = vazio' },
        { name: 'onChange', type: '(d: Date | null) => void', required: true, description: 'Callback · null quando user limpa' },
        { name: 'min', type: 'Date', description: 'Data mínima permitida (inclusive)' },
        { name: 'max', type: 'Date', description: 'Data máxima permitida (inclusive)' },
        { name: 'placeholder', type: 'string', description: 'Texto quando value é null' },
        { name: 'label', type: 'string', description: 'Label visível acima do trigger' },
        { name: 'ariaLabel', type: 'string', description: 'Pra screen reader se não tem label' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado' },
        { name: 'weekStartsOn', type: '0 | 1', default: '1', description: '0=domingo / 1=segunda (Brasil default)' },
        { name: 'formatLabel', type: '(d: Date) => string', description: 'Format custom · default ISO pt-BR' },
      ]}
      examples={[
        {
          title: 'Date picker com data mínima = hoje',
          preview: <DatePickerDemo />,
          code: `const [d, setD] = useState<Date | null>(new Date());

<DatePicker
  label="Data da próxima sessão"
  value={d}
  onChange={setD}
  min={new Date()}
  placeholder="Selecione uma data"
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use min/max pra bloquear datas inválidas', description: 'min={new Date()} impede agendar no passado.' },
          dont: { title: 'Não valide só no submit', description: 'User perde tempo · bloqueie a UI antes da escolha.' },
        },
        {
          do: { title: 'weekStartsOn=1 pra Brasil', description: 'Segunda à esquerda é a convenção PT-BR · 1 é default.' },
          dont: { title: 'Não use input type="date" nativo', description: 'Visual feio + UX inconsistente entre browsers · use DatePicker.' },
        },
      ]}
      a11y={[
        <>role=dialog ao abrir · focus trap automático</>,
        <>Trigger com aria-label="Selecionar data" + aria-expanded</>,
        <>Keyboard: arrow esq/dir/cima/baixo navega dias · Page Up/Down navega meses · Home/End vai pra primeiro/último dia do mês</>,
        <>Days disabled com aria-disabled=true · não receberáo foco</>,
        <>aria-current="date" no dia atual · screen reader anuncia</>,
      ]}
      related={[
        { name: 'DateRangePicker', description: 'Pra escolher intervalo (de/até)', href: '/api/date-range-picker' },
        { name: 'TimePicker', description: 'Pra hora · pareie com DatePicker pra datetime', href: '/api/time-picker' },
        { name: 'Calendar', description: 'Standalone (sem trigger) · pra dashboards', href: '/api/calendar' },
      ]}
    />
  );
}
