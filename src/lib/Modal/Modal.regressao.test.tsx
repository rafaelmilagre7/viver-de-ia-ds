import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Modal } from './Modal';

/* Regressões da auditoria · dismissOnScrim (proteção de dado) e descrição ligada */

const scrim = () => document.body.querySelector('.via-modal-scrim') as HTMLElement;

describe('<Modal /> · regressões', () => {
  it('description vira aria-describedby do diálogo', () => {
    render(<Modal open onClose={() => {}} title="Renovar" description="Suas próximas cobranças" />);
    expect(screen.getByRole('dialog', { name: 'Renovar' })).toHaveAccessibleDescription(
      'Suas próximas cobranças',
    );
  });

  it('dismissOnScrim={false}: clicar no fundo NÃO fecha; X e ESC continuam fechando', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Formulário" dismissOnScrim={false} />);
    expect(scrim()).toBeInTheDocument();
    await user.click(scrim());
    expect(onClose).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('button', { name: 'Fechar diálogo' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('padrão (dismissOnScrim omitido): clicar no fundo fecha, como antes', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Aviso" />);
    await user.click(scrim());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('scrim={false} continua sem fundo', () => {
    render(<Modal open onClose={() => {}} title="Sem fundo" scrim={false} />);
    expect(scrim()).toBeNull();
  });

  it('fechar devolve o foco a quem abriu', async () => {
    const user = userEvent.setup();
    function H() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>abrir</button>
          <Modal open={open} onClose={() => setOpen(false)} title="M" />
        </>
      );
    }
    render(<H />);
    await user.click(screen.getByRole('button', { name: 'abrir' }));
    expect(screen.getByRole('button', { name: 'Fechar diálogo' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'abrir' })).toHaveFocus();
  });
});
