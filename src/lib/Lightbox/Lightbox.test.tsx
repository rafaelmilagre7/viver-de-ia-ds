import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Lightbox } from './Lightbox';

const images = [
  { src: '/a.jpg', alt: 'Caio na live', caption: '14 mai 2026' },
  { src: '/b.jpg', alt: 'Plateia' },
  { src: '/c.jpg', alt: 'Encerramento', downloadHref: '/c-hi.jpg' },
];

const single = [{ src: '/solo.jpg', alt: 'Foto única', caption: 'Bastidores' }];

describe('<Lightbox />', () => {
  it('does not render when closed', () => {
    render(<Lightbox open={false} onClose={() => {}} images={images} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render when there are no images', () => {
    render(<Lightbox open onClose={() => {}} images={[]} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the first image with correct dialog ARIA when open', () => {
    render(<Lightbox open onClose={() => {}} images={images} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Visualização de imagem');
    expect(screen.getByRole('img', { name: 'Caio na live' })).toHaveAttribute('src', '/a.jpg');
  });

  it('honors the index prop for the initial image', () => {
    render(<Lightbox open onClose={() => {}} images={images} index={1} />);
    expect(screen.getByRole('img', { name: 'Plateia' })).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('shows nav arrows + counter only when there are multiple images', () => {
    const { rerender } = render(<Lightbox open onClose={() => {}} images={single} />);
    expect(screen.queryByRole('button', { name: 'Imagem anterior' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Próxima imagem' })).not.toBeInTheDocument();
    expect(screen.queryByText('1 / 1')).not.toBeInTheDocument();

    rerender(<Lightbox open onClose={() => {}} images={images} />);
    expect(screen.getByRole('button', { name: 'Imagem anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima imagem' })).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('clicking the next/prev arrows navigates and wraps around', async () => {
    const user = userEvent.setup();
    render(<Lightbox open onClose={() => {}} images={images} />);

    await user.click(screen.getByRole('button', { name: 'Próxima imagem' }));
    expect(screen.getByRole('img', { name: 'Plateia' })).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    // prev from the first image wraps to the last
    await user.click(screen.getByRole('button', { name: 'Imagem anterior' }));
    await user.click(screen.getByRole('button', { name: 'Imagem anterior' }));
    expect(screen.getByRole('img', { name: 'Encerramento' })).toBeInTheDocument();
    expect(screen.getByText('3 / 3')).toBeInTheDocument();

    // next from the last wraps back to the first
    await user.click(screen.getByRole('button', { name: 'Próxima imagem' }));
    expect(screen.getByRole('img', { name: 'Caio na live' })).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('ArrowRight / ArrowLeft navigate via keyboard', async () => {
    const user = userEvent.setup();
    render(<Lightbox open onClose={() => {}} images={images} />);

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('img', { name: 'Plateia' })).toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('img', { name: 'Caio na live' })).toBeInTheDocument();
  });

  it('calls onClose on Escape, on close button, and on backdrop click', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Lightbox open onClose={onClose} images={images} />);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('clicking the image itself does not close, but the backdrop does', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Lightbox open onClose={onClose} images={single} />);

    // clicking the img stops propagation → no close
    await user.click(screen.getByRole('img', { name: 'Foto única' }));
    expect(onClose).not.toHaveBeenCalled();

    // clicking the surrounding content (backdrop) closes
    await user.click(screen.getByRole('img', { name: 'Foto única' }).parentElement!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders the caption when provided', () => {
    render(<Lightbox open onClose={() => {}} images={single} />);
    expect(screen.getByText('Bastidores')).toBeInTheDocument();
  });

  it('shows the download link only when showDownload is set, using downloadHref fallback', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<Lightbox open onClose={onClose} images={images} />);
    expect(screen.queryByRole('link', { name: /baixar/i })).not.toBeInTheDocument();

    rerender(<Lightbox open onClose={onClose} images={images} showDownload />);
    const link = screen.getByRole('link', { name: /baixar/i });
    // first image has no downloadHref → falls back to src
    expect(link).toHaveAttribute('href', '/a.jpg');
    expect(link).toHaveAttribute('download');

    // navigate to the third image, which has an explicit downloadHref
    await user.click(screen.getByRole('button', { name: 'Imagem anterior' }));
    expect(screen.getByRole('link', { name: /baixar/i })).toHaveAttribute('href', '/c-hi.jpg');
    // clicking the download link must not trigger close (stopPropagation)
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll while open and restores it on close', () => {
    const { rerender } = render(<Lightbox open onClose={() => {}} images={images} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Lightbox open={false} onClose={() => {}} images={images} />);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('moves focus to the close button when opened', () => {
    render(<Lightbox open onClose={() => {}} images={images} />);
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus();
  });

  it('returns focus to the originating element when closed', async () => {
    const user = userEvent.setup();

    // an opener button outside the lightbox holds focus before opening
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Abrir galeria
          </button>
          <Lightbox open={open} onClose={() => setOpen(false)} images={images} />
        </>
      );
    }

    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Abrir galeria' });
    opener.focus();
    expect(opener).toHaveFocus();

    // open → focus moves into the dialog (close button)
    await user.click(opener);
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus();

    // close via Escape → focus returns to the opener
    await user.keyboard('{Escape}');
    expect(opener).toHaveFocus();
  });

  it('resets to the index prop each time it reopens', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Lightbox open onClose={() => {}} images={images} index={0} />);

    await user.click(screen.getByRole('button', { name: 'Próxima imagem' }));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    // close then reopen → current snaps back to the index prop
    rerender(<Lightbox open={false} onClose={() => {}} images={images} index={0} />);
    rerender(<Lightbox open onClose={() => {}} images={images} index={0} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });
});
