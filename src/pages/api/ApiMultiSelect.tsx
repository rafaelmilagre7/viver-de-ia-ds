import { useState } from 'react';
import { MultiSelect } from '../../lib/MultiSelect/MultiSelect';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { MultiSelect as meta } from './props.generated.json';

const SKILLS = [
  { value: 'llm', label: 'LLMs' },
  { value: 'rag', label: 'RAG' },
  { value: 'agents', label: 'Agentes IA' },
  { value: 'embeddings', label: 'Embeddings' },
  { value: 'finetune', label: 'Fine-tuning' },
  { value: 'evaluation', label: 'Evaluation' },
  { value: 'tools', label: 'Tool use' },
  { value: 'multimodal', label: 'Multimodal' },
];

function MultiSelectDemo() {
  const [vals, setVals] = useState<string[]>(['rag', 'agents']);
  return (
    <MultiSelect
      label="Áreas que você domina"
      placeholder="Selecione até 5"
      hint="Aparece no seu perfil público."
      value={vals}
      onChange={setVals}
      options={SKILLS}
      max={5}
    />
  );
}

export default function ApiMultiSelect() {
  return (
    <ComponentDoc
      eyebrow="api · multi-select"
      name="MultiSelect"
      headline="dropdown com checkboxes · chips no trigger · max limit"
      description="MultiSelect = Select com múltiplas seleções. Opções pré-definidas (não livres como TagInput). Trigger mostra valores como chips clicáveis pra remover. Dropdown tem checkboxes pra marcar/desmarcar. Suporta max."
      importLine={`import { MultiSelect, type MultiSelectProps, type MultiSelectOption } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-multi-select', description: 'Container · label + trigger + listbox' },
        { part: 'via-multi-select__trigger', description: 'Wrapper · chips selecionados + ChevronDown' },
        { part: 'via-multi-select__chip', description: 'Chip · gradient navy-08 + X dismiss' },
        { part: 'via-multi-select__listbox', description: 'Portal · checkbox + label · scroll' },
      ]}
      meta={meta}
      descriptions={{
        options: 'Array { value, label, disabled? }',
        value: 'Valores selecionados (controlado)',
        onChange: 'Callback ao marcar/desmarcar',
        label: 'Label visível acima',
        placeholder: 'Quando array vazio',
        hint: 'Hint abaixo · "Aparece no perfil"',
        max: 'Limite · 0 = ilimitado · ao atingir bloqueia novos',
        error: 'true = trigger danger ring',
        disabled: 'Bloqueado',
        size: 'Tamanho do trigger',
      }}
      examples={[
        {
          title: 'Skills com max=5',
          preview: <MultiSelectDemo />,
          code: `const [vals, setVals] = useState(['rag', 'agents']);

<MultiSelect
  label="Áreas que você domina"
  value={vals}
  onChange={setVals}
  options={SKILLS}
  max={5}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra opções fixas · 10-30 itens', description: 'Skills, roles, tags taxonômicas · pré-definidas + multi.' },
          dont: { title: 'Não use pra tags livres', description: 'Use TagInput · MultiSelect exige value pré-definido.' },
        },
        {
          do: { title: 'max limit pra evitar abuso', description: 'max=5 skills · força priorização vs "tudo".' },
          dont: { title: 'Não use pra 5 opções', description: 'Use Checkbox lista · MultiSelect adiciona fricção desnecessária.' },
        },
      ]}
      a11y={[
        <>Trigger com aria-haspopup=listbox + aria-expanded</>,
        <>Listbox role=listbox + aria-multiselectable=true</>,
        <>Per-option role=option + aria-selected</>,
        <>Chip X com aria-label="Remover [label]" · keyboard accessible</>,
        <>Live region anuncia mudanças (chip added/removed)</>,
      ]}
      related={[
        { name: 'TagInput', description: 'Tags livres · não pré-definidas', href: '/api/tag-input' },
        { name: 'Combobox', description: 'Escolha única com search', href: '/api/combobox' },
        { name: 'Select', description: 'Escolha única sem search', href: '/api/select' },
      ]}
    />
  );
}
