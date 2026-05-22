import { useState } from 'react';
import { Switch } from '../../lib/Switch/Switch';
import ComponentDoc from '../../components/docs/ComponentDoc';

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <Switch
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
      label="Notificações por e-mail"
      description="Receber resumo semanal das atividades do time."
    />
  );
}

export default function ApiSwitch() {
  return (
    <ComponentDoc
      eyebrow="api · switch"
      name="Switch"
      headline="toggle binário · spring overshoot · thumb radial gradient"
      description="Toggle on/off pra preferências persistentes. Track com gradient navy-14→20 + inset shadow profundo. Thumb com radial gradient (white realista) + 5-layer shadow. Transition spring 0.4s cubic-bezier(.34, 1.56, .64, 1). Checked: gradient navy + glow externo."
      importLine={`import { Switch, type SwitchProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-switch', description: 'Container · label + track + description vertical stack' },
        { part: 'via-switch__track', description: 'Trilho · gradient navy alpha + inset shadow' },
        { part: 'via-switch__thumb', description: 'Knob · radial gradient white realista + 5-layer shadow + spring' },
        { part: 'via-switch__copy', description: 'Label + description (opcional) vertical stack' },
      ]}
      props={[
        { name: 'checked', type: 'boolean', description: 'Estado controlado · true = on (padrão React)' },
        { name: 'defaultChecked', type: 'boolean', description: 'Estado inicial uncontrolled' },
        { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', description: 'Callback nativo · use `e.target.checked` pra obter boolean' },
        { name: 'label', type: 'ReactNode', description: 'Label visível à direita' },
        { name: 'description', type: 'ReactNode', description: 'Descrição secundária abaixo do label' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'md=36×20 / sm=30×17' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado · opacity 0.5 · cursor not-allowed' },
      ]}
      examples={[
        {
          title: 'Setting com descrição',
          preview: <SwitchDemo />,
          code: `const [on, setOn] = useState(true);

<Switch
  checked={on}
  onChange={(e) => setOn(e.target.checked)}
  label="Notificações por e-mail"
  description="Receber resumo semanal das atividades do time."
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra setting persistente', description: 'Mudança imediata · sem botão "Salvar" depois.' },
          dont: { title: 'Não use pra ação destrutiva', description: 'Pra deletar · use Button destructive + confirmação.' },
        },
        {
          do: { title: 'Label descreve o ESTADO ON', description: '"Notificações ativas" · não "Ativar/Desativar"' },
          dont: { title: 'Não use label confuso "Não receber"', description: 'On = "não receber" gera dupla negação · evite.' },
        },
      ]}
      a11y={[
        <>Renderiza role=switch + aria-checked + keyboard space/enter</>,
        <>Focus-visible com outline editorial · ring navy-40</>,
        <>Label conectada via htmlFor automático</>,
        <>Reduced motion respeita prefers-reduced-motion · vira transição instantânea</>,
      ]}
      related={[
        { name: 'Checkbox', description: 'Pra escolha múltipla · não estado binário persistente', href: '/components/form' },
        { name: 'RadioGroup', description: 'Escolha exclusiva entre 2+ opções', href: '/components/form' },
      ]}
    />
  );
}
