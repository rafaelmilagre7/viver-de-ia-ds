import { useState } from 'react';
import { Combobox } from '../../lib/Combobox/Combobox';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Combobox as meta } from './props.generated.json';

const CITIES = [
  { value: 'sp', label: 'São Paulo · SP' },
  { value: 'rj', label: 'Rio de Janeiro · RJ' },
  { value: 'bh', label: 'Belo Horizonte · MG' },
  { value: 'poa', label: 'Porto Alegre · RS' },
  { value: 'cwb', label: 'Curitiba · PR' },
  { value: 'rec', label: 'Recife · PE' },
  { value: 'for', label: 'Fortaleza · CE' },
  { value: 'sal', label: 'Salvador · BA' },
  { value: 'flo', label: 'Florianópolis · SC' },
  { value: 'man', label: 'Manaus · AM' },
];

function ComboboxDemo() {
  const [v, setV] = useState('');
  return (
    <Combobox
      label="Cidade do evento"
      placeholder="Buscar cidade…"
      value={v}
      onValueChange={setV}
      options={CITIES}
    />
  );
}

export default function ApiCombobox() {
  return (
    <ComponentDoc
      eyebrow="api · combobox"
      name="Combobox"
      headline="escolher uma opção digitando."
      description="Select + busca · filtro live · ARIA combobox/listbox. Combobox = Select com input pra filtrar opções em tempo real. Quando lista tem 20+ itens, Combobox é obrigatório (UX > Select). Filtro case-insensitive sobre label. Editorial: input glass + listbox portal com spring."
      importLine={`import { Combobox, type ComboboxProps, type ComboboxOption } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-combobox', description: 'Container · label + input + listbox portal' },
        { part: 'via-combobox__input', description: 'Input com Search icon left + Chev right · glass' },
        { part: 'via-combobox__listbox', description: 'Portal · glass + filtered options · spring open' },
        { part: 'via-combobox__empty', description: 'Empty state quando query não match nada' },
        { part: 'via-combobox__option', description: 'Item · highlight letras matched + check se selected' },
      ]}
      meta={meta}
      descriptions={{
        options: 'Array { value, label }',
        value: 'Valor selecionado (controlado)',
        defaultValue: 'Inicial (uncontrolled)',
        onValueChange: 'Callback ao escolher',
        placeholder: 'Texto vazio',
        emptyLabel: 'Quando query não encontra nada',
        label: 'Label visível acima',
        size: 'Altura do input',
        disabled: 'Bloqueado',
        ariaLabel: 'Pra screen reader quando não tem label',
        className: 'Classe extra no container',
      }}
      examples={[
        {
          title: 'Combobox de cidades · digite pra filtrar',
          preview: <ComboboxDemo />,
          code: `<Combobox
  label="Cidade do evento"
  placeholder="Buscar cidade…"
  options={[
    { value: 'sp',  label: 'São Paulo · SP' },
    { value: 'rj',  label: 'Rio de Janeiro · RJ' },
    // ... 50+ opções
  ]}
  onValueChange={(v) => console.log(v)}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra 20+ opções', description: 'Cidade, país, currency · filtro reduz tempo de escolha.' },
          dont: { title: 'Não use pra 5 opções', description: 'Use RadioGroup · usuário vê tudo de uma vez.' },
        },
        {
          do: { title: 'Label inclui ação', description: '"Cidade do evento" > "Cidade" · contexto explícito.' },
          dont: { title: 'Não use placeholder como label', description: 'Some quando user digita · viola WCAG 2.4.6.' },
        },
      ]}
      a11y={[
        <>role=combobox + aria-expanded + aria-controls (listbox)</>,
        <>Listbox role=listbox + per-item role=option + aria-selected</>,
        <>Keyboard arrow esq/dir navega · Enter ativa · ESC fecha</>,
        <>aria-activedescendant aponta pra opção visualmente highlighted</>,
        <>Filtro NÃO esconde opções no DOM (screen reader sabe quando empty)</>,
      ]}
      related={[
        { name: 'Select', description: 'Sem filtro · pra 6-20 opções', href: '/api/select' },
        { name: 'Command', description: 'Cmd+K palette · ações navegáveis', href: '/api/command' },
        { name: 'MultiSelect', description: 'Combobox com múltiplas seleções', href: '/api/multi-select' },
      ]}
    />
  );
}
