import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper } from './Stepper';

const steps = [
  { id: 'a', label: 'Perfil' },
  { id: 'b', label: 'Função' },
  { id: 'c', label: 'Plano' },
];

describe('<Stepper />', () => {
  it('renders all step labels', () => {
    render(<Stepper steps={steps} current={1} />);
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Função')).toBeInTheDocument();
    expect(screen.getByText('Plano')).toBeInTheDocument();
  });

  it('marks current step with aria-current=step', () => {
    render(<Stepper steps={steps} current={1} />);
    const current = screen.getByText('Função').closest('[aria-current]');
    expect(current).toHaveAttribute('aria-current', 'step');
  });

  it('calls onStepClick when allowed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Stepper steps={steps} current={2} onStepClick={onClick} />);
    // Click no step 0 (completed · clicável)
    await user.click(screen.getByText('Perfil'));
    expect(onClick).toHaveBeenCalledWith(0);
  });

  it('does not break without onStepClick', () => {
    render(<Stepper steps={steps} current={1} />);
    // Apenas validamos que render limpo
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
