import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pill } from './Pill';

describe('<Pill />', () => {
  it('renders children', () => {
    render(<Pill>Ativo</Pill>);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Pill variant="churn">Erro</Pill>);
    const pill = container.firstElementChild as HTMLElement;
    expect(pill.className).toMatch(/churn/);
  });

  it('applies size class', () => {
    const { container } = render(<Pill size="sm">Small</Pill>);
    const pill = container.firstElementChild as HTMLElement;
    expect(pill.className).toMatch(/sm/);
  });

  it('renders icon left when provided', () => {
    render(<Pill iconLeft={<span data-testid="icon">i</span>}>com ícone</Pill>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
