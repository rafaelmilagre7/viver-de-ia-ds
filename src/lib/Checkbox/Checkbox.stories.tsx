import { useState } from 'react';
import type { Story } from '@ladle/react';
import { Checkbox, type CheckboxProps } from './Checkbox';

export default {
  title: 'Checkbox',
};

export const Default: Story<CheckboxProps> = (props) => {
  const [on, setOn] = useState(false);
  return (
    <Checkbox
      {...props}
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
    />
  );
};
Default.args = {
  label: 'Aceito os termos da Mentoria',
  description: 'Trimestre de 12 sessões, cancelamento livre.',
};
Default.argTypes = {
  disabled: { control: { type: 'boolean' } },
  indeterminate: { control: { type: 'boolean' } },
};

export const Stack = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [allState, setAllState] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Checkbox
        label="Selecionar todos"
        indeterminate={allState === 'indeterminate'}
        checked={allState === true}
        onChange={() => setAllState(allState === true ? false : true)}
      />
      <div style={{ paddingLeft: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox label="Caio Ribeiro · estratégia" checked={a} onChange={(e) => setA(e.target.checked)} />
        <Checkbox label="Mateus Garcia · técnico" checked={b} onChange={(e) => setB(e.target.checked)} />
        <Checkbox label="Mentor desabilitado" disabled />
      </div>
    </div>
  );
};
