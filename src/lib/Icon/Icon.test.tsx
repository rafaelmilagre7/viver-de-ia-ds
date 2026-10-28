import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('<Icon />', () => {
  it('aplica classes padrão (md · default · sem superfície)', () => {
    const { container } = render(
      <Icon>
        <svg />
      </Icon>,
    );
    const el = container.firstElementChild!;
    expect(el).toHaveClass('via-icon', 'via-icon--md', 'via-icon--tone-default');
    expect(el.className).not.toMatch(/surface/);
  });

  it('size, tone, surface e className entram como modificadores', () => {
    const { container } = render(
      <Icon size="lg" tone="navy" surface="glass" className="extra">
        <svg />
      </Icon>,
    );
    expect(container.firstElementChild).toHaveClass(
      'via-icon--lg',
      'via-icon--tone-navy',
      'via-icon--surface-glass',
      'extra',
    );
  });

  it('repassa ref e atributos HTML pro span', () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(
      <Icon ref={ref} data-testid="ic" title="dica">
        <svg />
      </Icon>,
    );
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current).toHaveAttribute('title', 'dica');
  });

  it('renderiza o ícone filho', () => {
    const { container } = render(
      <Icon>
        <svg data-testid="svg" />
      </Icon>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
