import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('<Drawer />', () => {
  it('does not render anything when closed', () => {
    render(
      <Drawer open={false} onClose={() => {}} title="Filtros">
        <p>conteudo</p>
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('conteudo')).not.toBeInTheDocument();
  });

  it('renders title, description, body and footer when open', () => {
    render(
      <Drawer
        open
        onClose={() => {}}
        title="Filtros"
        description="Refine sua busca"
        footer={<button type="button">Aplicar</button>}
      >
        <p>conteudo do corpo</p>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Filtros' })).toBeInTheDocument();
    expect(screen.getByText('Refine sua busca')).toBeInTheDocument();
    expect(screen.getByText('conteudo do corpo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aplicar' })).toBeInTheDocument();
  });

  it('exposes dialog role with aria-modal and labels the dialog by its title', () => {
    render(
      <Drawer open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    // aria-labelledby points at the heading element's id
    const heading = screen.getByRole('heading', { name: 'Filtros' });
    expect(dialog).toHaveAttribute('aria-labelledby', heading.id);
    expect(heading.id).toBeTruthy();
  });

  it('omits aria-labelledby when there is no title', () => {
    render(
      <Drawer open onClose={() => {}}>
        <p>sem titulo</p>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby');
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Drawer open onClose={onClose} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    await user.click(screen.getByRole('button', { name: /fechar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when ESC is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Drawer open onClose={onClose} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the scrim is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Drawer open onClose={onClose} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    const scrim = container.querySelector('.via-drawer-scrim');
    expect(scrim).not.toBeNull();
    await user.click(scrim as Element);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('hides the close button when hideClose is set', () => {
    render(
      <Drawer open onClose={() => {}} title="Filtros" hideClose>
        <p>x</p>
      </Drawer>,
    );
    expect(screen.queryByRole('button', { name: /fechar/i })).not.toBeInTheDocument();
    // title is still rendered because there's a title even without a close button
    expect(screen.getByRole('heading', { name: 'Filtros' })).toBeInTheDocument();
  });

  it('renders no header when there is neither title nor close button', () => {
    const { container } = render(
      <Drawer open onClose={() => {}} hideClose>
        <p>so corpo</p>
      </Drawer>,
    );
    expect(container.querySelector('.via-drawer__head')).toBeNull();
    expect(screen.getByText('so corpo')).toBeInTheDocument();
  });

  it('applies the side and size modifier classes', () => {
    const { container, rerender } = render(
      <Drawer open onClose={() => {}} side="left" size="lg" title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    let dialog = container.querySelector('.via-drawer');
    expect(dialog).toHaveClass('via-drawer--left');
    expect(dialog).toHaveClass('via-drawer--lg');

    rerender(
      <Drawer open onClose={() => {}} side="bottom" size="sm" title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    dialog = container.querySelector('.via-drawer');
    expect(dialog).toHaveClass('via-drawer--bottom');
    expect(dialog).toHaveClass('via-drawer--sm');
  });

  it('defaults to side=right and size=md when not specified', () => {
    const { container } = render(
      <Drawer open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    const dialog = container.querySelector('.via-drawer');
    expect(dialog).toHaveClass('via-drawer--right');
    expect(dialog).toHaveClass('via-drawer--md');
  });

  it('locks body scroll while open and restores it on close', () => {
    const { rerender, unmount } = render(
      <Drawer open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Drawer open={false} onClose={() => {}} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    expect(document.body.style.overflow).not.toBe('hidden');

    unmount();
  });

  it('moves focus to the first focusable element when opened', () => {
    render(
      <Drawer open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Drawer>,
    );
    // the close button is the first focusable element inside the dialog
    expect(screen.getByRole('button', { name: /fechar/i })).toHaveFocus();
  });
});
