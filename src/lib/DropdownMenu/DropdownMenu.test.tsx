import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';

const items = [
  { id: 'edit', label: 'Editar perfil' },
  { id: 'share', label: 'Compartilhar' },
  { id: 'delete', label: 'Excluir', destructive: true },
];

describe('<DropdownMenu />', () => {
  it('renders the trigger but keeps the menu closed by default', () => {
    render(<DropdownMenu trigger={<button>Abrir</button>} items={items} />);
    expect(screen.getByRole('button', { name: 'Abrir' })).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the menu when the trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu trigger={<button>Abrir</button>} items={items} />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));

    const menu = screen.getByRole('menu', { name: 'Menu' });
    expect(menu).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
    expect(screen.getByRole('menuitem', { name: 'Editar perfil' })).toBeInTheDocument();
  });

  it('toggles the menu closed when the trigger is clicked again', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu trigger={<button>Abrir</button>} items={items} />);
    const trigger = screen.getByRole('button', { name: 'Abrir' });

    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('uses the provided ariaLabel and align class on the menu', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button>Abrir</button>}
        items={items}
        ariaLabel="Mais opções"
        align="end"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));

    const menu = screen.getByRole('menu', { name: 'Mais opções' });
    expect(menu).toHaveClass('via-dropdown__menu--end');
  });

  it('calls onSelect and closes the menu when an item is selected', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button>Abrir</button>}
        items={[{ id: 'edit', label: 'Editar perfil', onSelect }]}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    await user.click(screen.getByRole('menuitem', { name: 'Editar perfil' }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not call onSelect for a disabled item and marks it disabled', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button>Abrir</button>}
        items={[{ id: 'edit', label: 'Editar perfil', onSelect, disabled: true }]}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    const item = screen.getByRole('menuitem', { name: 'Editar perfil' });
    expect(item).toBeDisabled();

    await user.click(item);
    expect(onSelect).not.toHaveBeenCalled();
    // disabled click does not toggle the menu shut
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('marks a destructive item with the is-destructive class', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu trigger={<button>Abrir</button>} items={items} />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));

    expect(screen.getByRole('menuitem', { name: 'Excluir' })).toHaveClass('is-destructive');
  });

  it('closes the menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<DropdownMenu trigger={<button>Abrir</button>} items={items} />);

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu when clicking outside of it', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DropdownMenu trigger={<button>Abrir</button>} items={items} />
        <button>Fora</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Fora' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders grouped items with group labels and a separator between groups', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button>Abrir</button>}
        groups={[
          { id: 'account', label: 'Conta', items: [{ id: 'profile', label: 'Perfil' }] },
          { id: 'danger', label: 'Zona de risco', items: [{ id: 'leave', label: 'Sair' }] },
        ]}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));

    // two groups, each exposed as role="group" with its label
    expect(screen.getByRole('group', { name: 'Conta' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Zona de risco' })).toBeInTheDocument();
    // group labels are visible text
    expect(screen.getByText('Conta')).toBeInTheDocument();
    expect(screen.getByText('Zona de risco')).toBeInTheDocument();
    // one separator sits between the two groups (none after the last)
    expect(screen.getAllByRole('separator', { hidden: true })).toHaveLength(1);
    // items from both groups are reachable
    expect(screen.getByRole('menuitem', { name: 'Perfil' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Sair' })).toBeInTheDocument();
  });

  it('renders item icon and shortcut decorations as aria-hidden affordances', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button>Abrir</button>}
        items={[
          {
            id: 'copy',
            label: 'Copiar',
            icon: <svg data-testid="copy-icon" />,
            shortcut: '⌘C',
          },
        ]}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));

    // shortcut text is present but hidden from the accessible name
    const shortcut = screen.getByText('⌘C');
    expect(shortcut).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('menuitem', { name: 'Copiar' })).toBeInTheDocument();
    // icon wrapper is decorative
    expect(screen.getByTestId('copy-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('returns focus to the trigger after selecting an item', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button>Abrir</button>}
        items={[{ id: 'edit', label: 'Editar perfil' }]}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Abrir' });
    await user.click(trigger);
    await user.click(screen.getByRole('menuitem', { name: 'Editar perfil' }));

    expect(trigger).toHaveFocus();
  });
});
