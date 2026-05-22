import { useState } from 'react';
import { Select } from '../../lib/Select/Select';
import ComponentDoc from '../../components/docs/ComponentDoc';

function SelectDemo() {
  const [v, setV] = useState('pro');
  return (
    <Select
      label="Plano"
      placeholder="Selecione um plano"
      value={v}
      onValueChange={setV}
      options={[
        { value: 'free', label: 'Free · 0 sessões' },
        { value: 'pro', label: 'Pro · R$ 290/mês · 4 sessões' },
        { value: 'team', label: 'Team · R$ 890/mês · ilimitado' },
      ]}
    />
  );
}

export default function ApiSelect() {
  return (
    <ComponentDoc
      eyebrow="api · select"
      name="Select"
      headline="dropdown editorial · ARIA listbox · keyboard nav"
      description="Select pra escolha exclusiva entre 6+ opções. Trigger com label + value + chevron. Listbox glass com hover bg navy-02 + spring open. Keyboard nav arrow esq/dir/Enter/ESC. Error state + hint opcional."
      importLine={`import { Select, type SelectProps, type SelectOption } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-select', description: 'Container · label + trigger + listbox (portal)' },
        { part: 'via-select__trigger', description: 'Botão · label/placeholder + ChevronDown · spring rotate quando aberto' },
        { part: 'via-select__listbox', description: 'Portal · glass + atmosphere · spring open 0.96→1' },
        { part: 'via-select__option', description: 'Item · hover bg navy-02 + check à direita se selected' },
        { part: 'via-select__hint', description: 'Texto secundário abaixo · vira danger se error' },
      ]}
      props={[
        { name: 'options', type: 'SelectOption[]', required: true, description: 'Array { value, label }' },
        { name: 'value', type: 'string', description: 'Valor selecionado (controlado)' },
        { name: 'defaultValue', type: 'string', description: 'Inicial (uncontrolled)' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao escolher' },
        { name: 'placeholder', type: 'string', default: "'Selecione…'", description: 'Texto quando sem seleção' },
        { name: 'label', type: 'string', description: 'Label visível acima do trigger' },
        { name: 'hint', type: 'string', description: 'Texto secundário abaixo · ajuda/contexto' },
        { name: 'error', type: 'string', description: 'Mensagem de erro · trigger vira ring danger' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'sm=32 / md=40 altura do trigger' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado' },
        { name: 'ariaLabel', type: 'string', description: 'Pra screen reader quando não tem label visível' },
      ]}
      examples={[
        {
          title: 'Select com label e 3 opções',
          preview: <SelectDemo />,
          code: `const [plan, setPlan] = useState('pro');

<Select
  label="Plano"
  value={plan}
  onValueChange={setPlan}
  options={[
    { value: 'free',  label: 'Free' },
    { value: 'pro',   label: 'Pro · R$ 290/mês' },
    { value: 'team',  label: 'Team · R$ 890/mês' },
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra 6+ opções exclusivas', description: 'Cidade, plano, idioma · economiza espaço vertical.' },
          dont: { title: 'Não use pra 2-3 opções', description: 'Use RadioGroup · usuário vê tudo de uma vez.' },
        },
        {
          do: { title: 'Use Combobox quando há 20+ opções', description: 'Permite digitar pra filtrar · UX necessária em listas grandes.' },
          dont: { title: 'Não force scroll em listbox imensa', description: 'Combobox + search é sempre melhor que rolar 100 itens.' },
        },
      ]}
      a11y={[
        <>role=listbox + per-item role=option + aria-selected</>,
        <>Trigger com aria-haspopup=listbox + aria-expanded</>,
        <>Keyboard arrow esq/dir navega · Enter/Space ativa · ESC fecha</>,
        <>Type-to-search · primeiras letras saltam pra opção (HTML padrão)</>,
        <>Error conectada via aria-describedby + aria-invalid=true</>,
      ]}
      related={[
        { name: 'Combobox', description: 'Select + search interno · pra listas grandes', href: '/api/combobox' },
        { name: 'RadioGroup', description: 'Escolha exclusiva 2-5 opções', href: '/api/radio-group' },
        { name: 'MultiSelect', description: 'Quando precisa selecionar múltiplas opções', href: '/api/multi-select' },
      ]}
    />
  );
}
