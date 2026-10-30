import { useState } from 'react';
import { TagInput } from '../../lib/TagInput/TagInput';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { TagInput as meta } from './props.generated.json';

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
      headline="várias etiquetas num campo livre."
      description="Chips multi com input livre · suggestions · max limit. TagInput pra adicionar tags arbitrárias (artigos, skills, filtros). Enter ou vírgula adiciona · backspace no campo vazio remove última. Suporta suggestions (sugestões clicáveis) + max (limite máximo)."
      importLine={`import { TagInput, type TagInputProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-tag-input', description: 'Container · label + wrapper inputs + hint' },
        { part: 'via-tag-input__chip', description: 'Chip · gradient navy-08 + X dismiss · spring add/remove' },
        { part: 'via-tag-input__field', description: 'Input livre · flex-grow · sem borda própria' },
        { part: 'via-tag-input__suggestions', description: 'Dropdown abaixo · clicar adiciona à lista' },
      ]}
      meta={meta}
      descriptions={{
        value: 'Tags atuais (controlado)',
        onChange: 'Callback ao add/remove',
        label: 'Label visível',
        placeholder: 'Placeholder do input livre',
        hint: 'Hint educativo abaixo · "Enter adiciona"',
        max: 'Limite · 0 = ilimitado · input bloqueia ao atingir',
        suggestions: 'Sugestões clicáveis · filtra ao digitar',
        allowDuplicates: 'true = permite tag repetida (raro)',
        error: 'true = wrapper vira danger ring',
        disabled: 'Bloqueado · não permite adicionar',
        size: 'Tamanho dos chips',
      }}
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
