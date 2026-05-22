import { useState } from 'react';
import { RadioGroup } from '../../lib/RadioGroup/RadioGroup';
import ComponentDoc from '../../components/docs/ComponentDoc';

function RadioDemo() {
  const [plan, setPlan] = useState('anual');
  return (
    <RadioGroup
      ariaLabel="Plano"
      value={plan}
      onValueChange={setPlan}
      options={[
        { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês · cancela quando quiser' },
        { value: 'anual', label: 'Anual · 2 meses grátis', description: 'R$ 2.900/ano · equivale a R$ 242/mês' },
        { value: 'time', label: 'Time · 5+ assentos', description: 'Sob proposta · concierge 1:1' },
      ]}
    />
  );
}

export default function ApiRadioGroup() {
  return (
    <ComponentDoc
      eyebrow="api · radio-group"
      name="RadioGroup"
      headline="escolha exclusiva editorial · keyboard arrow nav"
      description="RadioGroup pra escolha única entre N opções. Cada item com label + description opcional. ARIA radiogroup com keyboard arrow nav (esq/dir/cima/baixo). Editorial: dot radial gradient + spring overshoot + glow no selected."
      importLine={`import { RadioGroup, type RadioGroupProps, type RadioOption } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-radio-group', description: 'Container role=radiogroup · stack vertical default' },
        { part: 'via-radio', description: 'Item label flex · cursor pointer · hover bg navy-02' },
        { part: 'via-radio__dot', description: 'Círculo 16×16 · gradient navy + inset shadow' },
        { part: 'via-radio__dot::after', description: 'Inner dot 6×6 · spring scale + radial gradient' },
        { part: 'via-radio__copy', description: 'Label + description vertical stack' },
      ]}
      props={[
        { name: 'options', type: 'RadioOption[]', required: true, description: 'Array { value, label, description? }' },
        { name: 'value', type: 'string', description: 'Valor selecionado (controlado)' },
        { name: 'defaultValue', type: 'string', description: 'Valor inicial (uncontrolled)' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao trocar de opção' },
        { name: 'name', type: 'string', description: 'Name do form group (HTML form submission)' },
        { name: 'ariaLabel', type: 'string', description: 'Label do grupo pra screen readers' },
        { name: 'className', type: 'string', description: 'Classe custom no container' },
      ]}
      examples={[
        {
          title: 'Plano com 3 opções e descrições',
          preview: <RadioDemo />,
          code: `<RadioGroup
  ariaLabel="Plano"
  defaultValue="anual"
  onValueChange={(v) => console.log(v)}
  options={[
    { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês' },
    { value: 'anual',  label: 'Anual · 2 meses grátis', description: 'R$ 2.900/ano' },
    { value: 'time',   label: 'Time · 5+ assentos', description: 'Sob proposta' },
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra escolha exclusiva 2-5 opções', description: 'Plano, frequência, idioma · usuário vê tudo de uma vez.' },
          dont: { title: 'Não use pra 6+ opções', description: 'Use Select/Combobox · radio vira muralha visual.' },
        },
        {
          do: { title: 'Description ajuda decisão', description: '"R$ 290/mês · cancela quando quiser" · contexto pra escolher.' },
          dont: { title: 'Não duplique label na description', description: '"Plano Anual" + "Plano anual" · redundância.' },
        },
      ]}
      a11y={[
        <>role=radiogroup + per-item role=radio + aria-checked</>,
        <>Keyboard arrow esq/dir/cima/baixo navega entre opções</>,
        <>Space/Enter seleciona · Tab pula o grupo inteiro (vai pro próximo field)</>,
        <>ariaLabel obrigatório pra screen reader anunciar contexto</>,
      ]}
      related={[
        { name: 'Checkbox', description: 'Seleção múltipla · vários simultâneos', href: '/api/checkbox' },
        { name: 'Select', description: 'Escolha exclusiva 6+ opções', href: '/api/select' },
      ]}
    />
  );
}
