import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('<Avatar />', () => {
  it('renders initials when provided', () => {
    render(<Avatar initials="CR" alt="Caio Ribeiro" />);
    expect(screen.getByText('CR')).toBeInTheDocument();
  });

  it('renders img element when src provided', () => {
    const { container } = render(<Avatar src="https://example.com/x.jpg" alt="X" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/x.jpg');
  });

  it('applies size class', () => {
    const { container } = render(<Avatar initials="X" alt="X" size="lg" />);
    expect((container.firstElementChild as HTMLElement).className).toMatch(/lg/);
  });

  it('renders status indicator as child element', () => {
    const { container } = render(<Avatar initials="X" alt="X" status="online" />);
    const statusEl = container.querySelector('.via-avatar__status');
    expect(statusEl).toBeInTheDocument();
    expect(statusEl?.className).toMatch(/online/);
  });
});
