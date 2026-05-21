import type { Story } from '@ladle/react';
import { Spinner, type SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
};

export const Default: Story<SpinnerProps> = (props) => <Spinner {...props} />;
Default.args = {
  size: 'md',
  tone: 'navy',
  label: 'Carregando dashboard…',
};
Default.argTypes = {
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'radio' },
  },
  tone: {
    options: ['navy', 'inverse', 'soft'],
    control: { type: 'radio' },
  },
};

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
    <Spinner size="sm" label="Pequeno" />
    <Spinner size="md" label="Médio" />
    <Spinner size="lg" label="Grande" />
  </div>
);

export const OnDark = () => (
  <div
    style={{
      padding: 32,
      background: 'var(--via-navy)',
      borderRadius: 14,
      display: 'flex',
      gap: 24,
      alignItems: 'center',
    }}
  >
    <Spinner tone="inverse" label="Em superfície navy…" />
  </div>
);
