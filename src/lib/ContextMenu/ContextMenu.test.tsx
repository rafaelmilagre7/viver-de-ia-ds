import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextMenu, type ContextMenuOption } from './ContextMenu';

const baseItems: ContextMenuOption[] = [
  { label: 'Editar', onSelect: vi.fn() },
  { label: 'Duplicar', shortcut: '⌘D', onSelect: vi.fn() },
  { label: 'Excluir', destructive: true, separatorBefore: true, onSelect: vi.fn() },
];

function renderMenu(items: ContextMenuOption[] = baseItems, label?: string) {
  return render(
    <ContextMenu items={items} label={label}>
      <div>alvo</div>
    </ContextMenu>,
  );
}

describe('<ContextMenu />', () => {
  it('renders the trigger but no menu by default', () => {
    renderMenu();
    expect(screen.getByText('alvo')).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });

  it('opens on right-click (contextmenu) and renders all items as menuitems', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    const items = screen.getAllByRole('menuitem');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Editar');
    expect(items[1]).toHaveTextContent('Duplicar');
    expect(items[2]).toHaveTextContent('Excluir');
  });

  it('uses the default ARIA label and honors a custom one', async () => {
    const user = userEvent.setup();
    const { unmount } = renderMenu();
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });
    expect(screen.getByRole('menu')).toHaveAttribute('aria-label', 'Menu de contexto');
    unmount();

    renderMenu(baseItems, 'Ações do arquivo');
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });
    expect(screen.getByRole('menu')).toHaveAttribute('aria-label', 'Ações do arquivo');
  });

  it('renders shortcut text and a separator before the flagged item', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    expect(screen.getByText('⌘D')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('marks the destructive item with the is-destructive class', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    expect(screen.getByRole('menuitem', { name: 'Excluir' })).toHaveClass('is-destructive');
    expect(screen.getByRole('menuitem', { name: 'Editar' })).not.toHaveClass('is-destructive');
  });

  it('clicking an item fires its onSelect and closes the menu', async () => {
    const onSelect = vi.fn();
    const items: ContextMenuOption[] = [{ label: 'Editar', onSelect }];
    const user = userEvent.setup();
    renderMenu(items);
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    await user.click(screen.getByRole('menuitem', { name: 'Editar' }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('disabled item is non-interactive: button is disabled, onSelect not called, menu stays open', async () => {
    const onSelect = vi.fn();
    const items: ContextMenuOption[] = [
      { label: 'Indisponível', onSelect, disabled: true },
      { label: 'Editar', onSelect: vi.fn() },
    ];
    const user = userEvent.setup();
    renderMenu(items);
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    const disabled = screen.getByRole('menuitem', { name: 'Indisponível' });
    expect(disabled).toBeDisabled();
    expect(disabled).toHaveClass('is-disabled');

    await user.click(disabled);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes when clicking outside the menu', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <ContextMenu items={baseItems}>
          <div>alvo</div>
        </ContextMenu>
        <button type="button">fora</button>
      </div>,
    );
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'fora' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('stays open when clicking inside the menu (on a non-item region)', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    await user.click(screen.getByRole('separator'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders an empty menu container with no items when items is empty', async () => {
    const user = userEvent.setup();
    renderMenu([]);
    await user.pointer({ keys: '[MouseRight]', target: screen.getByText('alvo') });

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0);
  });
});
