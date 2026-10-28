import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

/* Regressão da auditoria · loading não derruba o foco */

describe('<Button loading /> · foco', () => {
  it('quem apertou continua com o foco; clique e submit ficam bloqueados', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Button type="submit" onClick={onClick}>Salvar</Button>
      </form>,
    );
    const btn = screen.getByRole('button', { name: 'Salvar' });
    btn.focus();
    rerender(
      <form onSubmit={onSubmit}>
        <Button type="submit" onClick={onClick} loading>Salvar</Button>
      </form>,
    );
    expect(btn).toHaveFocus();
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    await user.keyboard('{Enter}');
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();

    rerender(
      <form onSubmit={onSubmit}>
        <Button type="submit" onClick={onClick}>Salvar</Button>
      </form>,
    );
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('disabled continua sendo disabled nativo', () => {
    render(<Button disabled>Salvar</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
