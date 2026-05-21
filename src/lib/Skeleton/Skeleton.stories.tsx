import type { Story } from '@ladle/react';
import { Skeleton, type SkeletonProps } from './Skeleton';

export default {
  title: 'Skeleton',
};

export const Default: Story<SkeletonProps> = (props) => <Skeleton {...props} />;
Default.args = {
  variant: 'text',
  lines: 3,
};
Default.argTypes = {
  variant: {
    options: ['text', 'rect', 'circle'],
    control: { type: 'select' },
  },
};

export const ProfileCard = () => (
  <div
    style={{
      padding: 20,
      border: '1px solid var(--via-border-soft)',
      borderRadius: 14,
      maxWidth: 400,
      display: 'flex',
      gap: 14,
      alignItems: 'center',
    }}
  >
    <Skeleton variant="circle" width={48} height={48} />
    <div style={{ flex: 1 }}>
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
);

export const ArticlePreview = () => (
  <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 14 }}>
    <Skeleton variant="rect" width="100%" height={180} />
    <Skeleton variant="text" lines={3} />
    <Skeleton variant="text" width="30%" />
  </div>
);
