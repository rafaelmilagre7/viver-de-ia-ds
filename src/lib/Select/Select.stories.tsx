import { useState } from 'react';
import type { Story } from '@ladle/react';
import { Select, type SelectProps } from './Select';

export default {
  title: 'Select',
};

export const Default: Story<SelectProps> = (props) => {
  const [v, setV] = useState<string | undefined>(undefined);
  return (
    <div style={{ maxWidth: 320 }}>
      <Select {...props} value={v} onValueChange={setV} />
    </div>
  );
};
Default.args = {
  label: 'Mentor primário',
  placeholder: 'Selecione um mentor',
  size: 'md',
  options: [
    { value: 'bruno', label: 'Caio Ribeiro · estratégia' },
    { value: 'mateus', label: 'Mateus Garcia · técnico' },
    { value: 'diego', label: 'Diego Martins · produto' },
    { value: 'daniel', label: 'Daniel Souza · operação' },
  ],
};
Default.argTypes = {
  size: {
    options: ['sm', 'md'],
    control: { type: 'radio' },
  },
  disabled: { control: { type: 'boolean' } },
};

export const WithError = () => (
  <div style={{ maxWidth: 320 }}>
    <Select
      label="Estado"
      placeholder="Selecione"
      error="Campo obrigatório."
      options={[
        { value: 'sp', label: 'São Paulo' },
        { value: 'rj', label: 'Rio de Janeiro' },
        { value: 'mg', label: 'Minas Gerais' },
      ]}
    />
  </div>
);
