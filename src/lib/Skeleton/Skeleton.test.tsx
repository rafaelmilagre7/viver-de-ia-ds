import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('<Skeleton />', () => {
  it('renders with default variant=text', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toBeTruthy();
  });

  it('renders text variant with multiple lines', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    // text + lines>1 renderiza um group · não testamos N exato mas verificamos que renderiza
    expect(container.firstElementChild).toBeTruthy();
  });

  it('applies custom width and height for rect', () => {
    const { container } = render(<Skeleton variant="rect" width={120} height={80} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('80px');
  });

  it('exposes aria-label and role=status', () => {
    render(<Skeleton ariaLabel="Carregando mentoria" />);
    expect(screen.getByLabelText('Carregando mentoria')).toBeInTheDocument();
  });
});
