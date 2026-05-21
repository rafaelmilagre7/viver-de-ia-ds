import type { Story } from '@ladle/react';
import { Card, type CardProps } from './Card';

export default {
  title: 'Card',
};

export const Default: Story<CardProps> = (props) => (
  <Card {...props} style={{ maxWidth: 360 }}>
    <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--via-font-display)', fontSize: 18 }}>
      Tokens da marca
    </h3>
    <p style={{ margin: 0, color: 'var(--via-ink-2)', fontSize: 13.5, lineHeight: 1.55 }}>
      Cores, tipografia, espaçamento, raios, sombras e movimento — a base de tudo.
    </p>
  </Card>
);
Default.args = {
  variant: 'default',
  hoverable: false,
};
Default.argTypes = {
  variant: {
    options: ['default', 'glass', 'featured', 'atmospheric', 'dark'],
    control: { type: 'select' },
  },
  hoverable: { control: { type: 'boolean' } },
};

export const AllVariants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
    {(['default', 'glass', 'featured', 'atmospheric', 'dark'] as const).map((v) => (
      <Card key={v} variant={v} style={{ minHeight: 140 }}>
        <h4 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 500, color: v === 'dark' ? 'var(--via-white)' : 'var(--via-navy)' }}>
          variant="{v}"
        </h4>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: v === 'dark' ? 'rgba(255,255,255,0.74)' : 'var(--via-ink-2)' }}>
          Surface editorial. {v === 'dark' && 'Texto em branco contrastado.'}
        </p>
      </Card>
    ))}
  </div>
);
