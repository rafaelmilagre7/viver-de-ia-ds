import { useState } from 'react';
import { Switch, type SwitchProps } from '../../lib/Switch/Switch';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Switch as meta } from './props.generated.json';

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
      description="Toggle on/off pra preferências persistentes. Track com gradient navy-14→20 + inset shadow profundo. Thumb com radial gradient (white realista) + 5-layer shadow. Thumb anda na mola --via-spring-bounce (overshoot reservado a controle). Checked: gradient navy + glow externo."
      importLine={`import { Switch, type SwitchProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-switch', description: 'Container · label + track + description vertical stack' },
        { part: 'via-switch__track', description: 'Trilho · gradient navy alpha + inset shadow' },
        { part: 'via-switch__thumb', description: 'Knob · radial gradient white realista + 5-layer shadow + spring' },
        { part: 'via-switch__copy', description: 'Label + description (opcional) vertical stack' },
      ]}
      meta={meta}
      playground={{
        initial: {
          label: 'Notificações por e-mail',
          description: 'Receber resumo semanal das atividades do time.',
          checked: true,
          disabled: false,
        },
        render: (v, set) => <Switch {...(v as SwitchProps)} onChange={(e) => set({ checked: e.target.checked })} />,
        codeProps: ['onChange={(e) => setOn(e.target.checked)}'],
      }}
      descriptions={{
        checked: 'Estado controlado · true = on (padrão React)',
        defaultChecked: 'Estado inicial uncontrolled',
        onChange: 'Callback nativo · use `e.target.checked` pra obter boolean',
        label: 'Label visível à direita',
        description: 'Descrição secundária abaixo do label',
        size: 'md=36×20 / sm=30×17',
        disabled: 'Bloqueado · opacity 0.5 · cursor not-allowed',
      }}
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
