import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('<Input />', () => {
  it('renders label and input', () => {
    render(<Input label="E-mail" placeholder="seu@email.com" />);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
  });

  it('updates value on type', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText('Name'), 'Rafael');
    expect(onChange).toHaveBeenCalled();
    expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('Rafael');
  });

  it('shows error message and marks aria-invalid', () => {
    render(<Input label="Email" error="E-mail inválido" />);
    const input = screen.getByLabelText('Email');
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Disabled" disabled onChange={onChange} />);
    const input = screen.getByLabelText('Disabled');
    expect(input).toBeDisabled();
    await user.type(input, 'x');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('connects hint via aria-describedby', () => {
    render(<Input label="Pass" hint="Mínimo 8 caracteres" />);
    const input = screen.getByLabelText('Pass');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument();
  });
});
