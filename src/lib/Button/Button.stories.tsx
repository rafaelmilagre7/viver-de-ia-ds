import type { Story } from '@ladle/react';
import { ArrowRight, Mail } from 'lucide-react';
import { Button, type ButtonProps } from './Button';

export default {
  title: 'Button',
};

export const Primary: Story<ButtonProps> = (props) => <Button {...props} />;
Primary.args = {
  variant: 'primary',
  size: 'md',
  children: 'Continuar',
};
Primary.argTypes = {
  variant: {
    options: ['primary', 'secondary', 'ghost', 'destructive', 'accent'],
    control: { type: 'select' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'radio' },
  },
  disabled: { control: { type: 'boolean' } },
  loading: { control: { type: 'boolean' } },
  fullWidth: { control: { type: 'boolean' } },
};

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Cancelar plano</Button>
    <Button variant="accent">Acento editorial</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button size="sm" iconRight={<ArrowRight size={12} />}>Sm</Button>
    <Button size="md" iconRight={<ArrowRight size={13} />}>Md (padrão)</Button>
    <Button size="lg" iconRight={<ArrowRight size={14} />}>Lg</Button>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Button>Default</Button>
    <Button loading>Carregando…</Button>
    <Button disabled>Desabilitado</Button>
    <Button iconLeft={<Mail size={13} />}>Com ícone</Button>
  </div>
);
