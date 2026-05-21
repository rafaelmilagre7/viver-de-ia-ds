import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
