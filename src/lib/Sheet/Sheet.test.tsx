import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet } from './Sheet';

// jsdom não implementa matchMedia — o gesto de arrasto consulta prefers-reduced-motion
function stubMatchMedia(reduced: boolean) {
  window.matchMedia = vi.fn(
    (query: string) =>
      ({
        matches: reduced && query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  ) as unknown as typeof window.matchMedia;
}

beforeEach(() => stubMatchMedia(false));

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

  // Fechar agora é ANIMADO: onClose dispara quando a mola assenta (após rAF),
  // não no mesmo tick do clique — por isso os waitFor abaixo.
  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet open onClose={onClose} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    await user.click(screen.getByRole('button', { name: /fechar/i }));
    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
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
    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
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
    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
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

describe('<Sheet /> · saída animada', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /** rAF sob controle manual: cada frame só roda quando o teste manda */
  function mockRaf() {
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      frames.push(cb);
      return frames.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    let now = performance.now();
    const step = () => {
      const cb = frames.shift();
      if (!cb) return false;
      now += 16;
      cb(now);
      return true;
    };
    return { frames, step };
  }

  function renderOpenSheet(onClose: () => void) {
    const utils = render(
      <Sheet open onClose={onClose} title="Filtros">
        <p>x</p>
      </Sheet>,
    );
    // jsdom não tem layout: dá altura real pro painel (travel da mola)
    const dialog = screen.getByRole('dialog');
    Object.defineProperty(dialog, 'offsetHeight', { value: 480, configurable: true });
    return { ...utils, dialog };
  }

  const translateY = (el: HTMLElement) => {
    const m = /translateY\((-?\d+(?:\.\d+)?)px\)/.exec(el.style.transform);
    return m ? Number(m[1]) : null;
  };

  it('keeps the dialog mounted and mid-transform while the spring runs, then calls onClose', () => {
    const { step } = mockRaf();
    const onClose = vi.fn();
    const { dialog, container } = renderOpenSheet(onClose);

    fireEvent.keyDown(document, { key: 'Escape' });

    // pedido de fechar NÃO fecha no mesmo tick: a mola ainda vai animar
    expect(onClose).not.toHaveBeenCalled();
    expect(dialog).toBeInTheDocument();

    // primeiro frame: transform intermediário (nem 0 nem o destino)
    expect(step()).toBe(true);
    const mid = translateY(dialog);
    expect(mid).not.toBeNull();
    expect(mid!).toBeGreaterThan(0);
    expect(mid!).toBeLessThan(480);
    // scrim acompanha a saída (opacidade caindo junto)
    const scrim = container.querySelector('.via-sheet-scrim') as HTMLElement;
    expect(Number(scrim.style.opacity)).toBeLessThan(1);
    expect(onClose).not.toHaveBeenCalled();

    // roda a mola até assentar — só então onClose dispara, com o painel no destino
    for (let i = 0; i < 400 && onClose.mock.calls.length === 0; i++) {
      if (!step()) break;
    }
    expect(onClose).toHaveBeenCalledOnce();
    expect(translateY(dialog)).toBe(480);
  });

  it('closes synchronously (no animation) under prefers-reduced-motion', () => {
    stubMatchMedia(true);
    const onClose = vi.fn();
    renderOpenSheet(onClose);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('X button exits through the spring as well', () => {
    const { step } = mockRaf();
    const onClose = vi.fn();
    const { dialog } = renderOpenSheet(onClose);

    fireEvent.click(screen.getByRole('button', { name: /fechar/i }));
    expect(onClose).not.toHaveBeenCalled();

    expect(step()).toBe(true);
    expect(translateY(dialog)).toBeGreaterThan(0);

    for (let i = 0; i < 400 && onClose.mock.calls.length === 0; i++) {
      if (!step()) break;
    }
    expect(onClose).toHaveBeenCalledOnce();
  });
});
