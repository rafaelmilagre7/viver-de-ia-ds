import type { Story } from '@ladle/react';
import { Pill, type PillProps } from './Pill';

export default {
  title: 'Pill',
};

export const Default: Story<PillProps> = (props) => <Pill {...props} />;
Default.args = {
  variant: 'default',
  children: 'em produção',
};
Default.argTypes = {
  variant: {
    options: ['default', 'attn', 'churn', 'success', 'live'],
    control: { type: 'select' },
  },
  size: {
    options: ['sm', 'md'],
    control: { type: 'radio' },
  },
};

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
    <Pill variant="default">em produção</Pill>
    <Pill variant="attn">requer atenção</Pill>
    <Pill variant="churn">cancelado</Pill>
    <Pill variant="success">concluído</Pill>
    <Pill variant="live">ao vivo</Pill>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Pill size="sm">tag pequena</Pill>
    <Pill size="md">tag média</Pill>
  </div>
);
