import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrandLogo } from './BrandLogo';

describe('BrandLogo', () => {
  it('lockup = monograma + wordmark, com nome acessível', () => {
    render(<BrandLogo />);
    const svg = screen.getByRole('img', { name: 'Viver de IA' });
    expect(svg.querySelectorAll('path')).toHaveLength(2);
    expect(svg).toHaveAttribute('height', '36');
  });

  it('monoOnly desenha só o monograma, mais estreito', () => {
    render(<BrandLogo monoOnly size="lg" />);
    const svg = screen.getByRole('img', { name: 'Viver de IA' });
    expect(svg.querySelectorAll('path')).toHaveLength(1);
    expect(svg).toHaveAttribute('height', '40');
    expect(Number(svg.getAttribute('width'))).toBeLessThan(80);
  });

  it('variant vira classe de cor e size numérico vira altura em px', () => {
    render(<BrandLogo variant="white" size={24} />);
    const svg = screen.getByRole('img', { name: 'Viver de IA' });
    expect(svg).toHaveClass('via-brand-logo--white');
    expect(svg).toHaveAttribute('height', '24');
    expect(Number(svg.getAttribute('width'))).toBe(190);
  });
});
