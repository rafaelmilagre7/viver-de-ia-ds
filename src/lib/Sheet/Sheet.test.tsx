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
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    // the heading the dialog points at is in fact its title
    expect(screen.getByRole('heading', { name: 'Filtros' })).toHaveAttribute('id', labelledBy!);
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

  it('wires aria-describedby to the description so it is the accessible description', () => {
    render(
      <Sheet open onClose={() => {}} title="Filtros" description="Refine sua busca">
        <p>x</p>
      </Sheet>,
    );
    const dialog = screen.getByRole('dialog');
    const describedBy = dialog.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    // the element the dialog points at is in fact the description text
    expect(screen.getByText('Refine sua busca')).toHaveAttribute('id', describedBy!);
  });

  it('omits aria-describedby when no description is provided', () => {
    render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
  });

  it('moves focus into the sheet when it opens', async () => {
    const user = userEvent.setup();
    render(
      <Sheet open onClose={() => {}} title="Filtros" footer={<button>Aplicar</button>}>
        <button>Acao interna</button>
      </Sheet>,
    );
    // focus lands on the first focusable element inside the dialog (the close button)
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /fechar/i }));
    // and the user can tab between the controls inside the sheet
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Acao interna' }));
  });

  it('falls back to focusing the dialog itself when it has no focusable children', () => {
    render(
      <Sheet open onClose={() => {}}>
        <p>sem-foco</p>
      </Sheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(document.activeElement).toBe(dialog);
  });

  it('returns focus to the originating element when closed', () => {
    const Harness = ({ open }: { open: boolean }) => (
      <>
        <button data-testid="opener">Abrir</button>
        <Sheet open={open} onClose={() => {}} title="Filtros">
          <p>x</p>
        </Sheet>
      </>
    );
    const { rerender } = render(<Harness open={false} />);

    // emulate the trigger being the active element before the sheet opens
    const opener = screen.getByTestId('opener');
    opener.focus();
    expect(document.activeElement).toBe(opener);

    rerender(<Harness open />);
    // focus moved into the sheet
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);

    rerender(<Harness open={false} />);
    // focus returned to the trigger that opened it
    expect(document.activeElement).toBe(opener);
  });

  it('returns focus to the originating element on unmount', () => {
    const opener = document.createElement('button');
    opener.textContent = 'Abrir';
    document.body.appendChild(opener);
    opener.focus();
    expect(document.activeElement).toBe(opener);

    const { unmount } = render(
      <Sheet open onClose={() => {}} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);

    unmount();
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });
});
