import type { Story } from '@ladle/react';
import { Award, Compass, Crown, Layers, MessageCircle, Rocket } from 'lucide-react';
import { Icon, type IconProps } from './Icon';

export default {
  title: 'Icon',
};

export const Default: Story<IconProps> = (props) => (
  <Icon {...props}>
    <Award />
  </Icon>
);
Default.args = {
  tone: 'navy',
  surface: 'soft',
  size: 'md',
};
Default.argTypes = {
  tone: {
    options: ['default', 'soft', 'navy', 'accent', 'coral', 'inverse'],
    control: { type: 'select' },
  },
  surface: {
    options: ['none', 'soft', 'glass', 'navy', 'accent'],
    control: { type: 'select' },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'radio' },
  },
};

export const Surfaces = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <Icon surface="none" tone="navy"><Award /></Icon>
    <Icon surface="soft" tone="navy"><Compass /></Icon>
    <Icon surface="glass" tone="navy"><Crown /></Icon>
    <Icon surface="navy" tone="inverse"><Layers /></Icon>
    <Icon surface="accent" tone="inverse"><Rocket /></Icon>
    <Icon surface="soft" tone="accent"><MessageCircle /></Icon>
  </div>
);
