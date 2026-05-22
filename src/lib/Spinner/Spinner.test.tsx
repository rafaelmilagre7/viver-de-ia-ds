import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('<Spinner />', () => {
  it('exposes role=status', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Spinner label="Carregando dashboard…" />);
    expect(screen.getByText('Carregando dashboard…')).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.firstElementChild?.className).toMatch(/lg/);
  });

  it('applies tone class', () => {
    const { container } = render(<Spinner tone="inverse" />);
    expect(container.firstElementChild?.className).toMatch(/inverse/);
  });

  it('aria-live=polite', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
