import { useState } from 'react';
import { RadioGroup } from '../../lib/RadioGroup/RadioGroup';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { RadioGroup as meta } from './props.generated.json';

function RadioDemo() {
  const [plan, setPlan] = useState('pro');
  return (
    <RadioGroup
      ariaLabel="Plano"
      value={plan}
      onValueChange={setPlan}
      options={[
        { value: 'starter', label: 'Starter', description: 'R$ 2.580/mês · contratação anual' },
        { value: 'pro', label: 'Pro', description: 'R$ 3.780/mês · 10 check-ins de mentoria em grupo' },
        { value: 'enterprise', label: 'Enterprise', description: 'R$ 6.180/mês · 1h/mês de mentoria individual' },
      ]}
    />
  );
}

export default function ApiRadioGroup() {
  return (
    <ComponentDoc
      eyebrow="api · radio-group"
      name="RadioGroup"
      headline="uma escolha entre poucas."
      description="Escolha exclusiva editorial · keyboard arrow nav. RadioGroup pra escolha única entre N opções. Cada item com label + description opcional. ARIA radiogroup com keyboard arrow nav (esq/dir/cima/baixo). Editorial: dot radial gradient + spring overshoot + glow no selected."
      importLine={`import { RadioGroup, type RadioGroupProps, type RadioOption } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-radio-group', description: 'Container role=radiogroup · stack vertical default' },
        { part: 'via-radio', description: 'Item label flex · cursor pointer · hover bg navy-02' },
        { part: 'via-radio__dot', description: 'Círculo 16×16 · gradient navy + inset shadow' },
        { part: 'via-radio__dot::after', description: 'Inner dot 6×6 · spring scale + radial gradient' },
        { part: 'via-radio__copy', description: 'Label + description vertical stack' },
      ]}
      meta={meta}
      descriptions={{
        options: 'Array { value, label, description? }',
        value: 'Valor selecionado (controlado)',
        defaultValue: 'Valor inicial (uncontrolled)',
        onValueChange: 'Callback ao trocar de opção',
        name: 'Name do form group (HTML form submission)',
        ariaLabel: 'Label do grupo pra screen readers',
        className: 'Classe custom no container',
      }}
      examples={[
        {
          title: 'Plano com 3 opções e descrições',
          preview: <RadioDemo />,
          code: `<RadioGroup
  ariaLabel="Plano"
  defaultValue="pro"
  onValueChange={(v) => console.log(v)}
  options={[
    { value: 'starter',    label: 'Starter',    description: 'R$ 2.580/mês' },
    { value: 'pro',        label: 'Pro',        description: 'R$ 3.780/mês' },
    { value: 'enterprise', label: 'Enterprise', description: 'R$ 6.180/mês' },
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
          do: { title: 'Description ajuda decisão', description: '"R$ 3.780/mês · 10 check-ins de mentoria" · contexto pra escolher.' },
          dont: { title: 'Não duplique label na description', description: '"Plano Pro" + "Plano pro" · redundância.' },
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
