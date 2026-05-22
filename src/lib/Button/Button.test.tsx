import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders children', () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button', { name: 'Click' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    await user.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies variant class', () => {
    render(<Button variant="destructive">Excluir</Button>);
    const btn = screen.getByRole('button', { name: 'Excluir' });
    expect(btn.className).toMatch(/destructive/);
  });

  it('applies size class', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button', { name: 'Small' });
    expect(btn.className).toMatch(/sm/);
  });

  it('supports keyboard activation (Enter)', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Submit</Button>);
    const btn = screen.getByRole('button', { name: 'Submit' });
    btn.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });
});
