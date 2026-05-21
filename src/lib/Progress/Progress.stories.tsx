import type { Story } from '@ladle/react';
import { Progress, type ProgressProps } from './Progress';

export default {
  title: 'Progress',
};

export const Default: Story<ProgressProps> = (props) => (
  <div style={{ maxWidth: 420 }}>
    <Progress {...props} />
  </div>
);
Default.args = {
  value: 72,
  label: 'Onboarding · módulo 03',
  showValue: true,
  tone: 'navy',
  size: 'md',
};
Default.argTypes = {
  tone: {
    options: ['navy', 'accent', 'coral'],
    control: { type: 'radio' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'radio' },
  },
  value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
};

export const AllTones = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
    <Progress value={72} label="Onboarding · módulo 03" tone="navy" showValue />
    <Progress value={40} label="Streak estendido · 12 dias" tone="accent" showValue size="lg" />
    <Progress value={95} label="Espaço usado · 9.5 GB de 10 GB" tone="coral" showValue size="sm" />
  </div>
);
