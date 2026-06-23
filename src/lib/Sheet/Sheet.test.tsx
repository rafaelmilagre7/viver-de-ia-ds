import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet } from './Sheet';

describe('<Sheet />', () => {
  it('does not render anything when closed', () => {
    render(
      <Sheet open={false} onClose={() => {}} title="Filtros">
        <p>conteudo</p>
      </Sheet>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('conteudo')).not.toBeInTheDocument();
  });

  it('renders title, description, body and footer when open', () => {
    render(
      <Sheet
        open
        onClose={() => {}}
        title="Filtros"
        description="Refine sua busca"
        footer={<button>Aplicar</button>}
      >
        <p>corpo-do-sheet</p>
      </Sheet>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Filtros' })).toBeInTheDocument();
    expect(screen.getByText('Refine sua busca')).toBeInTheDocument();
    expect(screen.getByText('corpo-do-sheet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aplicar' })).toBeInTheDocument();
  });

  it('exposes a modal dialog labelled by its title', () => {
    render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'via-sheet-title');
    expect(screen.getByRole('heading', { name: 'Filtros' })).toHaveAttribute('id', 'via-sheet-title');
  });

  it('omits aria-labelledby when no title is provided', () => {
    render(
      <Sheet open onClose={() => {}}>
        <p>sem-titulo</p>
      </Sheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
    // no header is rendered when there is neither title nor description
    expect(screen.queryByRole('button', { name: /fechar/i })).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet open onClose={onClose} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    await user.click(screen.getByRole('button', { name: /fechar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet open onClose={onClose} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the scrim is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Sheet open onClose={onClose} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    const scrim = container.querySelector('.via-sheet-scrim') as HTMLElement;
    expect(scrim).toBeInTheDocument();
    await user.click(scrim);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when interacting inside the sheet body', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet open onClose={onClose} title="Filtros">
        <button>Acao interna</button>
      </Sheet>,
    );
    await user.click(screen.getByRole('button', { name: 'Acao interna' }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll while open and restores it once closed', () => {
    const { rerender } = render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Sheet open={false} onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('restores body scroll on unmount', () => {
    const { unmount } = render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('renders the grip handle by default and hides it when showHandle is false', () => {
    const { container, rerender } = render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(container.querySelector('.via-sheet__handle')).toBeInTheDocument();

    rerender(
      <Sheet open onClose={() => {}} title="Filtros" showHandle={false}>
        <p>x</p>
      </Sheet>,
    );
    expect(container.querySelector('.via-sheet__handle')).not.toBeInTheDocument();
  });

  it('applies the maxHeight prop (default 85vh, overridable) to the dialog', () => {
    const { rerender } = render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ maxHeight: '85vh' });

    rerender(
      <Sheet open onClose={() => {}} title="Filtros" maxHeight="60vh">
        <p>x</p>
      </Sheet>,
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ maxHeight: '60vh' });
  });

  it('does not wire aria-describedby to the description (a11y gap)', () => {
    render(
      <Sheet open onClose={() => {}} title="Filtros" description="Refine sua busca">
        <p>x</p>
      </Sheet>,
    );
    // The description renders visually but is not associated to the dialog
    // via aria-describedby — screen readers will not announce it as the
    // accessible description.
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
    expect(screen.getByText('Refine sua busca')).toBeInTheDocument();
  });
});
