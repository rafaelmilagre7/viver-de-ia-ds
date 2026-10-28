import { describe, it, expect } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

/* Regressões da auditoria · Popover em portal mantém a ordem de Tab e fecha no foco fora */

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button>antes</button>
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<button onClick={() => setOpen((o) => !o)}>Filtros</button>}
        label="Filtros"
      >
        <input aria-label="busca" />
        <button>aplicar</button>
      </Popover>
      <button>depois</button>
    </>
  );
}

describe('<Popover /> · regressões', () => {
  it('Tab segue a ordem visual: trigger → painel → próximo controle (e fecha ao sair)', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Filtros' }));
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeInTheDocument();
    await user.tab();
    expect(screen.getByLabelText('busca')).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'aplicar' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'depois' })).toHaveFocus();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Shift+Tab no 1º item do painel volta pro trigger', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Filtros' }));
    await user.tab();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Filtros' })).toHaveFocus();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('painel renderiza fora do wrapper (portal) e o trigger aponta pra ele', async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Filtros' }));
    const panel = screen.getByRole('dialog');
    expect(container).not.toContainElement(panel);
    expect(screen.getByRole('button', { name: 'Filtros' })).toHaveAttribute('aria-controls', panel.id);
  });
});
