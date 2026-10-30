import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('<Modal />', () => {
  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Hidden">
        <p>Body</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title and body when open', () => {
    render(
      <Modal open onClose={() => {}} title="Renovar plano">
        <p>Cobrança de R$ 6.000.</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Renovar plano')).toBeInTheDocument();
    expect(screen.getByText('Cobrança de R$ 6.000.')).toBeInTheDocument();
  });

  it('calls onClose when ESC is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal open onClose={onClose} title="Test">
        <p>x</p>
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal open onClose={onClose} title="Test">
        <p>x</p>
      </Modal>,
    );
    await user.click(screen.getByRole('button', { name: /fechar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('hides the close button when hideClose is set', () => {
    render(
      <Modal open onClose={() => {}} title="Test" hideClose>
        <p>x</p>
      </Modal>,
    );
    expect(screen.queryByRole('button', { name: /fechar/i })).not.toBeInTheDocument();
  });

  it('locks body scroll while open and restores on close', () => {
    const { rerender, unmount } = render(
      <Modal open onClose={() => {}} title="Test">
        <p>x</p>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal open={false} onClose={() => {}} title="Test">
        <p>x</p>
      </Modal>,
    );
    expect(document.body.style.overflow).not.toBe('hidden');

    unmount();
  });
});

/* ---------- Saída animada (fase de presença) ----------
   jsdom não tem Web Animations: sem animação rodando o Modal desmonta na
   hora (os testes acima). Aqui uma animação falsa e controlável faz o papel
   da transição de [data-state='closed'] do browser. */

function fakeExit() {
  let resolve!: () => void;
  let reject!: (e: unknown) => void;
  const finished = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  finished.catch(() => {});
  return {
    playState: 'running',
    pending: false,
    currentTime: 0,
    effect: { getComputedTiming: () => ({ endTime: 160 }) },
    finished,
    finish: () => resolve(),
    cancel: () => reject(new DOMException('cancel', 'AbortError')),
  };
}

function Harness({ open, onClose = () => {} }: { open: boolean; onClose?: () => void }) {
  return (
    <>
      <button type="button">Abrir</button>
      <Modal open={open} onClose={onClose} title="Renovar plano">
        <p>Corpo</p>
      </Modal>
    </>
  );
}

describe('<Modal /> · saída animada', () => {
  let anim: ReturnType<typeof fakeExit>;
  beforeEach(() => {
    anim = fakeExit();
    Element.prototype.getAnimations = vi.fn(() => [anim]) as unknown as Element['getAnimations'];
  });
  afterEach(() => {
    // @ts-expect-error · remove o mock de Web Animations
    delete Element.prototype.getAnimations;
  });

  it('fica no DOM em data-state=closed e inert enquanto sai; desmonta no fim', async () => {
    const { rerender } = render(<Harness open />);
    const dialog = screen.getByRole('dialog');
    rerender(<Harness open={false} />);
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('data-state', 'closed');
    expect(document.querySelector('.via-modal-scrim')).toHaveAttribute('data-state', 'closed');
    expect(document.querySelector('.via-modal-root')).toHaveAttribute('inert');
    await act(async () => {
      anim.finish();
      await anim.finished;
    });
    expect(dialog).not.toBeInTheDocument();
  });

  it('reabrir no meio da saída reverte no MESMO nó (sem remontar)', async () => {
    const { rerender } = render(<Harness open />);
    const dialog = screen.getByRole('dialog');
    rerender(<Harness open={false} />);
    rerender(<Harness open />);
    // a transição revertida cancela a de saída — isso não pode desmontar
    await act(async () => {
      anim.cancel();
      await Promise.resolve();
    });
    expect(screen.getByRole('dialog')).toBe(dialog);
    expect(dialog).toHaveAttribute('data-state', 'open');
    expect(document.querySelector('.via-modal-root')).not.toHaveAttribute('inert');
  });

  it('devolve o foco ao trigger já no início da saída', async () => {
    const { rerender } = render(<Harness open={false} />);
    const trigger = screen.getByRole('button', { name: 'Abrir' });
    trigger.focus();
    rerender(<Harness open />);
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);
    rerender(<Harness open={false} />);
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'closed');
    expect(document.activeElement).toBe(trigger);
  });

  it('mantém a trava de scroll até desmontar (a barra não volta no meio do fade)', async () => {
    const { rerender } = render(<Harness open />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<Harness open={false} />);
    expect(document.body.style.overflow).toBe('hidden');
    await act(async () => {
      anim.finish();
      await anim.finished;
    });
    expect(document.body.style.overflow).toBe('');
  });
});
