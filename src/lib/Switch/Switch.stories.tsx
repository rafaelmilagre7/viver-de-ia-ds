import { useState } from 'react';
import type { Story } from '@ladle/react';
import { Switch, type SwitchProps } from './Switch';

export default {
  title: 'Switch',
};

export const Default: Story<SwitchProps> = (props) => {
  const [on, setOn] = useState(true);
  return (
    <Switch
      {...props}
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
    />
  );
};
Default.args = {
  label: 'Notificações por email',
  description: 'Digest semanal de domingo às 18h.',
  size: 'md',
};
Default.argTypes = {
  size: {
    options: ['sm', 'md'],
    control: { type: 'radio' },
  },
  disabled: { control: { type: 'boolean' } },
};

export const Stack = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch label="Notificações por email" checked={a} onChange={(e) => setA(e.target.checked)} />
      <Switch label="Modo escuro" description="Aplica navy + glass dark." checked={b} onChange={(e) => setB(e.target.checked)} />
      <Switch label="Compact (sm)" size="sm" checked={c} onChange={(e) => setC(e.target.checked)} />
      <Switch label="Desabilitado" disabled />
    </div>
  );
};
