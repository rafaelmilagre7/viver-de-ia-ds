import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('<Progress />', () => {
  it('renders with role=progressbar', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('exposes aria-valuenow', () => {
    render(<Progress value={42} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
  });

  it('renders label and value when showValue', () => {
    render(<Progress value={72} label="Streak" showValue />);
    expect(screen.getByText('Streak')).toBeInTheDocument();
    expect(screen.getByText(/72/)).toBeInTheDocument();
  });

  it('clamps value to 0-100', () => {
    render(<Progress value={120} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps negative value to 0', () => {
    render(<Progress value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('applies tone class', () => {
    const { container } = render(<Progress value={50} tone="coral" />);
    expect((container.firstElementChild as HTMLElement).className).toMatch(/coral/);
  });
});
