import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('<Card />', () => {
  it('renderiza um <article> com a variante default por padrão', () => {
    render(<Card>Conteúdo</Card>);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('via-card', 'via-card--default');
    expect(card).toHaveTextContent('Conteúdo');
  });

  it('as troca a tag (div / section)', () => {
    const { container, rerender } = render(<Card as="div">x</Card>);
    expect(container.firstElementChild!.tagName).toBe('DIV');
    rerender(<Card as="section" aria-label="Plano">x</Card>);
    expect(screen.getByRole('region', { name: 'Plano' }).tagName).toBe('SECTION');
  });

  it('variant, hoverable, noPadding e className viram classes', () => {
    render(
      <Card variant="featured" hoverable noPadding className="extra">
        x
      </Card>,
    );
    expect(screen.getByRole('article')).toHaveClass(
      'via-card--featured',
      'via-card--hoverable',
      'via-card--no-padding',
      'extra',
    );
  });

  it('sem hoverable/noPadding não aplica os modificadores', () => {
    render(<Card variant="glass">x</Card>);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('via-card--glass');
    expect(card).not.toHaveClass('via-card--hoverable');
    expect(card).not.toHaveClass('via-card--no-padding');
  });

  it('repassa ref e eventos', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLElement>();
    const onClick = vi.fn();
    render(
      <Card ref={ref} onClick={onClick}>
        x
      </Card>,
    );
    expect(ref.current).toBe(screen.getByRole('article'));
    await user.click(screen.getByRole('article'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
