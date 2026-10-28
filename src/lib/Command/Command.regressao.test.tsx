import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import axe from 'axe-core';
import { Command } from './Command';

/* Regressões da auditoria · paleta de comandos com trap de foco e ARIA de grupos */

async function axeIds(root: Element = document.body) {
  const res = await axe.run(root, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return res.violations.map((v) => v.id);
}

describe('<Command /> · regressões', () => {
  it('paleta aberta (com grupos) passa no axe — role=group, listbox com nome', async () => {
    render(
      <Command
        open
        onClose={() => {}}
        onSelect={() => {}}
        groups={[
          { heading: 'Navegação', items: [{ id: 'a', label: 'Alpha' }] },
          { heading: 'Ações', items: [{ id: 'b', label: 'Beta' }] },
        ]}
      />,
    );
    expect(screen.getByRole('listbox', { name: 'Resultados' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Navegação' })).toBeInTheDocument();
    expect(await axeIds()).toEqual([]);
  });

  it('sem resultado: a mensagem fica fora do listbox e o axe continua limpo', async () => {
    const user = userEvent.setup();
    render(<Command open onClose={() => {}} onSelect={() => {}} items={[{ id: 'a', label: 'Alpha' }]} />);
    await user.type(screen.getByRole('textbox', { name: 'Buscar' }), 'zzz');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByText('Nada encontrado.')).toBeInTheDocument();
    expect(await axeIds()).toEqual([]);
  });

  it('Tab fica preso no diálogo e ESC devolve o foco a quem abriu', async () => {
    const user = userEvent.setup();
    function H() {
      const [o, setO] = useState(false);
      return (
        <>
          <button onClick={() => setO(true)}>abrir</button>
          <Command open={o} onClose={() => setO(false)} onSelect={() => {}} items={[{ id: 'a', label: 'Alpha' }]} />
          <button>fora</button>
        </>
      );
    }
    render(<H />);
    await user.click(screen.getByRole('button', { name: 'abrir' }));
    const input = screen.getByRole('textbox', { name: 'Buscar' });
    expect(input).toHaveFocus();
    await user.tab(); // → Fechar
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus();
    await user.tab(); // último → volta pro primeiro (não escapa)
    expect(input).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'abrir' })).toHaveFocus();
  });

  it('duas paletas na mesma página não repetem ids', () => {
    render(
      <>
        <Command open onClose={() => {}} onSelect={() => {}} items={[{ id: 'a', label: 'Alpha' }]} />
        <Command open onClose={() => {}} onSelect={() => {}} items={[{ id: 'a', label: 'Alpha' }]} />
      </>,
    );
    const ids = screen.getAllByRole('option').map((o) => o.id);
    expect(new Set(ids).size).toBe(2);
  });
});
