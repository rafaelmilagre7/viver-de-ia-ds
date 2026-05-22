import { useState } from 'react';
import { TagInput } from '../../lib/TagInput/TagInput';
import ComponentDoc from '../../components/docs/ComponentDoc';

function TagInputDemo() {
  const [tags, setTags] = useState<string[]>(['IA generativa', 'agentes']);
  return (
    <TagInput
      label="Áreas de interesse"
      placeholder="Adicionar tag…"
      hint="Enter ou vírgula adiciona · backspace remove a última."
      value={tags}
      onChange={setTags}
      max={6}
      suggestions={['LLMs', 'RAG', 'fine-tuning', 'vector DB', 'embeddings']}
    />
  );
}

export default function ApiTagInput() {
  return (
    <ComponentDoc
      eyebrow="api · tag-input"
      name="TagInput"
      headline="chips multi com input livre · suggestions · max limit"
      description="TagInput pra adicionar tags arbitrárias (artigos, skills, filtros). Enter ou vírgula adiciona · backspace no campo vazio remove última. Suporta suggestions (sugestões clicáveis) + max (limite máximo)."
      importLine={`import { TagInput, type TagInputProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-tag-input', description: 'Container · label + wrapper inputs + hint' },
        { part: 'via-tag-input__chip', description: 'Chip · gradient navy-08 + X dismiss · spring add/remove' },
        { part: 'via-tag-input__field', description: 'Input livre · flex-grow · sem borda própria' },
        { part: 'via-tag-input__suggestions', description: 'Dropdown abaixo · clicar adiciona à lista' },
      ]}
      props={[
        { name: 'value', type: 'string[]', description: 'Tags atuais (controlado)' },
        { name: 'onChange', type: '(tags: string[]) => void', description: 'Callback ao add/remove' },
        { name: 'label', type: 'string', description: 'Label visível' },
        { name: 'placeholder', type: 'string', description: 'Placeholder do input livre' },
        { name: 'hint', type: 'string', description: 'Hint educativo abaixo · "Enter adiciona"' },
        { name: 'max', type: 'number', default: '0', description: 'Limite · 0 = ilimitado · input bloqueia ao atingir' },
        { name: 'suggestions', type: 'string[]', description: 'Sugestões clicáveis · filtra ao digitar' },
        { name: 'allowDuplicates', type: 'boolean', default: 'false', description: 'true = permite tag repetida (raro)' },
        { name: 'error', type: 'boolean', default: 'false', description: 'true = wrapper vira danger ring' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado · não permite adicionar' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Tamanho dos chips' },
      ]}
      examples={[
        {
          title: 'Tags com suggestions e max=6',
          preview: <TagInputDemo />,
          code: `const [tags, setTags] = useState(['IA generativa', 'agentes']);

<TagInput
  label="Áreas de interesse"
  value={tags}
  onChange={setTags}
  max={6}
  suggestions={['LLMs', 'RAG', 'fine-tuning', 'vector DB']}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use suggestions pra normalizar', description: 'User digita "rag" ou "RAG" · suggestion garante consistência.' },
          dont: { title: 'Não use TagInput pra escolha exclusiva', description: 'Use Select/Combobox · tag é multi por natureza.' },
        },
        {
          do: { title: 'max pra evitar abuso', description: 'max=10 tags · evita spam de keywords.' },
          dont: { title: 'Não permita duplicatas (default)', description: 'allowDuplicates=true raramente é UX desejada.' },
        },
      ]}
      a11y={[
        <>Chip com role=listitem · X tem aria-label="Remover [tag]"</>,
        <>Input com aria-label dedicado quando label não está visível</>,
        <>Live region anuncia adições/remoções pra screen reader</>,
        <>Keyboard: Enter add · Backspace (vazio) remove · ESC limpa input</>,
      ]}
      related={[
        { name: 'MultiSelect', description: 'Quando opções são pré-definidas (dropdown)', href: '/api/multi-select' },
        { name: 'Combobox', description: 'Escolha única com search', href: '/api/combobox' },
      ]}
    />
  );
}
