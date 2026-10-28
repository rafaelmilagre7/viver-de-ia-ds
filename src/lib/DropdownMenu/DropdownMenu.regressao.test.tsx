import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { Combobox } from '../Combobox/Combobox';

/* Regressões da auditoria · menus e combobox na camada de overlay */

beforeAll(() => {
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});

const items = [
  { id: 'a', label: 'Editar' },
  { id: 'b', label: 'Duplicar' },
];

describe('<DropdownMenu /> · regressões', () => {
  it('trigger anuncia o menu: aria-haspopup, aria-expanded e aria-controls', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu trigger={<button>Mais</button>} items={items} />);
    const t = screen.getByRole('button', { name: 'Mais' });
    expect(t).toHaveAttribute('aria-haspopup', 'menu');
    expect(t).toHaveAttribute('aria-expanded', 'false');
    await user.click(t);
    const menu = screen.getByRole('menu');
    expect(t).toHaveAttribute('aria-expanded', 'true');
    expect(t).toHaveAttribute('aria-controls', menu.id);
  });

  it('Tab no menu fecha e devolve o foco ao trigger', async () => {
    const user = userEvent.setup();
    render(
      <>
        <DropdownMenu trigger={<button>Mais</button>} items={items} />
        <button>depois</button>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Mais' }));
    expect(screen.getByRole('menuitem', { name: 'Editar' })).toHaveFocus();
    await user.tab();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mais' })).toHaveFocus();
  });

  it('foco indo pra fora (programático) fecha o menu', async () => {
    const user = userEvent.setup();
    render(
      <>
        <DropdownMenu trigger={<button>Mais</button>} items={items} />
        <button>fora</button>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Mais' }));
    act(() => screen.getByRole('button', { name: 'fora' }).focus());
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('<ContextMenu /> · regressões', () => {
  async function openOn(name: string) {
    const target = screen.getByRole('button', { name });
    target.focus();
    await userEvent.pointer({ keys: '[MouseRight]', target });
    return target;
  }

  it('ESC fecha e devolve o foco a quem abriu', async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu items={[{ label: 'Editar' }]}>
        <button>alvo</button>
      </ContextMenu>,
    );
    const target = await openOn('alvo');
    expect(screen.getByRole('menuitem', { name: 'Editar' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(target).toHaveFocus();
  });

  it('escolher um item também devolve o foco', async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu items={[{ label: 'Editar' }]}>
        <button>alvo</button>
      </ContextMenu>,
    );
    const target = await openOn('alvo');
    await user.keyboard('{Enter}');
    expect(target).toHaveFocus();
  });

  it('Tab fecha o menu e volta pro alvo', async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu items={[{ label: 'Editar' }]}>
        <button>alvo</button>
      </ContextMenu>,
    );
    const target = await openOn('alvo');
    await user.tab();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(target).toHaveFocus();
  });
});

describe('<Combobox /> · regressões', () => {
  const opts = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio' },
  ];

  it('ESC fecha a lista e o foco CONTINUA no campo', async () => {
    const user = userEvent.setup();
    render(<Combobox options={opts} label="Cidade" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(screen.getByRole('listbox', { name: 'Cidade' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('clicar numa opção (em portal) seleciona e mantém o foco no campo', async () => {
    const user = userEvent.setup();
    render(<Combobox options={opts} label="Cidade" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'Rio' }));
    expect(input).toHaveValue('Rio');
    expect(input).toHaveFocus();
  });
});
