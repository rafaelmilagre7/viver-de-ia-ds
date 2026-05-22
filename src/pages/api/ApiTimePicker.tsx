import { useState } from 'react';
import { TimePicker } from '../../lib/TimePicker/TimePicker';
import ComponentDoc from '../../components/docs/ComponentDoc';

function TimePickerDemo() {
  const [t, setT] = useState('14:30');
  return (
    <TimePicker
      label="Horário da sessão"
      value={t}
      onChange={setT}
      step={15}
      min="09:00"
      max="20:00"
      hint="Atendimentos das 9h às 20h · slots de 15 min."
    />
  );
}

export default function ApiTimePicker() {
  return (
    <ComponentDoc
      eyebrow="api · time-picker"
      name="TimePicker"
      headline="HH:MM 24h editorial · step + range validation"
      description="TimePicker com 2 campos (hora · minuto) navegáveis. 24h format. Step configurável (5/10/15/30/60 min). Min/max em formato HH:MM. Editorial: glass + spring focus + arrow keys."
      importLine={`import { TimePicker, type TimePickerProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-time', description: 'Container · label + 2 inputs + ":" + hint' },
        { part: 'via-time__field', description: 'Input hora ou minuto · 40×40 · glass' },
        { part: 'separator ":"', description: 'Aria-hidden · navy-50 · centra os fields' },
        { part: 'arrow keys', description: 'esq/dir naveg · cima/baixo incrementa/decrementa step' },
      ]}
      props={[
        { name: 'value', type: 'string', description: 'Valor controlado · formato "HH:MM" (24h)' },
        { name: 'onChange', type: '(value: string) => void', description: 'Callback ao mudar · sempre HH:MM padded' },
        { name: 'label', type: 'string', description: 'Label visível' },
        { name: 'hint', type: 'string', description: 'Hint abaixo · contextualiza range' },
        { name: 'step', type: '5 | 10 | 15 | 30 | 60', default: '15', description: 'Step em minutos pra arrow keys' },
        { name: 'min', type: 'string', description: 'Mínimo "HH:MM" · não deixa selecionar abaixo' },
        { name: 'max', type: 'string', description: 'Máximo "HH:MM"' },
        { name: 'error', type: 'boolean', default: 'false', description: 'true = wrapper danger ring' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Tamanho dos campos' },
      ]}
      examples={[
        {
          title: 'TimePicker 09:00-20:00 · step 15min',
          preview: <TimePickerDemo />,
          code: `const [t, setT] = useState('14:30');

<TimePicker
  label="Horário da sessão"
  value={t}
  onChange={setT}
  step={15}
  min="09:00"
  max="20:00"
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Pareie com DatePicker pra datetime', description: 'Data + hora juntos · agendamento completo.' },
          dont: { title: 'Não use input type="time" nativo', description: 'Visual feio e inconsistente entre browsers · TimePicker é editorial.' },
        },
        {
          do: { title: 'step=15 pra agendamento', description: 'Múltiplos de 15min são padrão de calendar UX.' },
          dont: { title: 'Não use step=1 sem motivo', description: 'Slots de 1min raramente é UX desejada · use só pra timer precision.' },
        },
      ]}
      a11y={[
        <>Cada campo é input nativo · screen reader anuncia "hora" / "minuto"</>,
        <>aria-label em cada field · "Hora" e "Minutos"</>,
        <>Arrow keys incrementam pelo step · screen reader anuncia novo valor</>,
        <>Min/max enforcement com aria-invalid quando fora do range</>,
      ]}
      related={[
        { name: 'DatePicker', description: 'Pra escolher data · pareie com TimePicker', href: '/api/date-picker' },
        { name: 'DateRangePicker', description: 'Intervalo · não inclui horário', href: '/api/date-range-picker' },
      ]}
    />
  );
}
