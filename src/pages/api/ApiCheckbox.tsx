import { useState } from 'react';
import { Checkbox } from '../../lib/Checkbox/Checkbox';
import ComponentDoc from '../../components/docs/ComponentDoc';

function CheckboxDemo() {
  const [terms, setTerms] = useState(false);
  const [news, setNews] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox
        label="Aceito os termos de uso"
        description="Leia em viverdeia.ai/termos antes de marcar."
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
      />
      <Checkbox
        label="Quero receber novidades semanais"
        checked={news}
        onChange={(e) => setNews(e.target.checked)}
      />
      <Checkbox label="Selecionar todos" indeterminate />
    </div>
  );
}

export default function ApiCheckbox() {
  return (
    <ComponentDoc
      eyebrow="api · checkbox"
      name="Checkbox"
      headline="seleção múltipla editorial · suporta indeterminate"
      description="Checkbox controlado ou uncontrolled. Suporta estado indeterminate (parent de lista). Editorial: box com gradient navy-04→02 + inset shadow + check spring overshoot. Label + description vertical stack."
      importLine={`import { Checkbox, type CheckboxProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-checkbox', description: 'Container label-flex · cursor pointer no hover' },
        { part: 'via-checkbox__box', description: 'Box 16×16 · gradient navy + inset shadow + glass' },
        { part: 'via-checkbox__check', description: 'Check stroke 2.4 · spring scale 0→1.1→1' },
        { part: 'via-checkbox__copy', description: 'Label + description vertical stack' },
      ]}
      props={[
        { name: 'label', type: 'ReactNode', description: 'Label visível à direita do box' },
        { name: 'description', type: 'ReactNode', description: 'Texto secundário abaixo do label' },
        { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado "parcial" · linha horizontal no lugar do check (use em parent de lista)' },
        { name: 'checked / defaultChecked', type: 'boolean', description: 'Estado controlado / inicial uncontrolled (props HTML padrão)' },
        { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', description: 'Callback nativo · use e.target.checked' },
        { name: 'disabled', type: 'boolean', description: 'Bloqueado · opacity 0.5 · cursor not-allowed' },
        { name: '...rest', type: 'InputHTMLAttributes<HTMLInputElement>', description: 'Aceita todas props nativas do input (name, value, required, etc.)' },
      ]}
      examples={[
        {
          title: 'Lista com indeterminate',
          preview: <CheckboxDemo />,
          code: `<Checkbox
  label="Aceito os termos"
  description="Leia antes de marcar."
  checked={terms}
  onChange={(e) => setTerms(e.target.checked)}
/>

<Checkbox label="Selecionar todos" indeterminate />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra seleção múltipla', description: 'Vários itens podem ser marcados independentemente.' },
          dont: { title: 'Não use pra escolha exclusiva', description: 'Use RadioGroup quando só 1 opção é válida.' },
        },
        {
          do: { title: 'Indeterminate em parent de lista', description: 'Sinaliza "alguns marcados, não todos" · UX clássica de file managers.' },
          dont: { title: 'Não use indeterminate como 3º estado lógico', description: 'Não é "talvez/maybe" · é só visual de parent-of-mixed.' },
        },
      ]}
      a11y={[
        <>role=checkbox + aria-checked nativo</>,
        <>aria-checked="mixed" automaticamente quando indeterminate=true</>,
        <>Keyboard: Space alterna · Tab navega · Enter submete form</>,
        <>Label conectada via htmlFor automático (useId)</>,
      ]}
      related={[
        { name: 'Switch', description: 'Toggle binário on/off · setting persistente', href: '/api/switch' },
        { name: 'RadioGroup', description: 'Escolha única entre N opções', href: '/api/radio-group' },
      ]}
    />
  );
}
