import type { Story } from '@ladle/react';
import { Input, type InputProps } from './Input';

export default {
  title: 'Input',
};

export const Default: Story<InputProps> = (props) => <Input {...props} />;
Default.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'você@empresa.com',
  hint: 'Usamos só pra confirmar a inscrição.',
};
Default.argTypes = {
  variant: {
    options: ['default', 'solid', 'ghost'],
    control: { type: 'select' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'radio' },
  },
  disabled: { control: { type: 'boolean' } },
};

export const WithError = () => (
  <Input
    label="CNPJ"
    placeholder="00.000.000/0000-00"
    error="CNPJ não encontrado na Receita."
  />
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input size="sm" label="Pequeno (sm)" placeholder="Compact" />
    <Input size="md" label="Médio (md)" placeholder="Padrão" />
    <Input size="lg" label="Grande (lg)" placeholder="Hero forms" />
  </div>
);
