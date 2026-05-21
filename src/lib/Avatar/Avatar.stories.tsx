import type { Story } from '@ladle/react';
import { Avatar, type AvatarProps } from './Avatar';

export default {
  title: 'Avatar',
};

export const Default: Story<AvatarProps> = (props) => <Avatar {...props} />;
Default.args = {
  alt: 'Caio Ribeiro',
  size: 'md',
  status: 'online',
};
Default.argTypes = {
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'radio' },
  },
  status: {
    options: [undefined, 'online', 'away', 'busy', 'offline'],
    control: { type: 'select' },
  },
};

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
      <Avatar key={s} alt="Caio Ribeiro" size={s} status="online" />
    ))}
  </div>
);

export const Statuses = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Avatar alt="Online" size="lg" status="online" />
    <Avatar alt="Away" size="lg" status="away" />
    <Avatar alt="Busy" size="lg" status="busy" />
    <Avatar alt="Offline" size="lg" status="offline" />
  </div>
);
