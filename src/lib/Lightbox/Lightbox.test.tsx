import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useState } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Lightbox } from './Lightbox';

const images = [
  { src: '/a.jpg', alt: 'Caio na live', caption: '14 mai 2026' },
  { src: '/b.jpg', alt: 'Plateia' },
  { src: '/c.jpg', alt: 'Encerramento', downloadHref: '/c-hi.jpg' },
];

const single = [{ src: '/solo.jpg', alt: 'Foto única', caption: 'Bastidores' }];

// jsdom não tem matchMedia nem rAF confiável — controlamos os quadros na mão
// (o gesto/saída animada vivem em useDragDismiss, que exige os dois)
let rafCbs: Map<number, FrameRequestCallback>;
let rafSeq: number;
let clock: number;
let reducedMotion: boolean;

beforeEach(() => {
  rafCbs = new Map();
  rafSeq = 0;
  clock = 0;
  reducedMotion = false;
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    rafCbs.set(++rafSeq, cb);
    return rafSeq;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => {
    rafCbs.delete(id);
  });
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('prefers-reduced-motion') && reducedMotion,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
  vi.spyOn(performance, 'now').mockImplementation(() => clock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function frame(dt = 16) {
  clock += dt;
  const cbs = [...rafCbs.values()];
  rafCbs.clear();
  for (const cb of cbs) cb(clock);
}

/** Roda a mola até o fim (ou até estourar o teto de quadros) */
function settle(done: () => boolean) {
  act(() => {
    for (let i = 0; i < 200 && !done(); i++) frame();
  });
}

function panelEl() {
  return document.querySelector('.via-lightbox__content') as HTMLElement;
}

/** jsdom mede 0 — sem altura não há percurso pra mola viajar */
function givePanelHeight(value = 700) {
  Object.defineProperty(panelEl(), 'offsetHeight', { value });
}

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

  it('calls onClose on Escape, on close button, and on backdrop click — after the exit spring settles', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Lightbox open onClose={onClose} images={images} />);

    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled(); // saída é animada, não imediata
    settle(() => onClose.mock.calls.length > 0);
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Fechar' }));
    settle(() => onClose.mock.calls.length > 1);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('clicking the image itself does not close, but the backdrop does', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Lightbox open onClose={onClose} images={single} />);

    // clicking the img stops propagation → no close
    await user.click(screen.getByRole('img', { name: 'Foto única' }));
    settle(() => onClose.mock.calls.length > 0);
    expect(onClose).not.toHaveBeenCalled();

    // clicking the surrounding content (backdrop) closes — animated
    await user.click(screen.getByRole('img', { name: 'Foto única' }).parentElement!);
    expect(onClose).not.toHaveBeenCalled();
    settle(() => onClose.mock.calls.length > 0);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('ESC exit is animated: intermediate transform + scrim fade before onClose', () => {
    const onClose = vi.fn();
    render(<Lightbox open onClose={onClose} images={single} />);
    givePanelHeight(700);
    const panel = panelEl();
    const scrim = document.querySelector('.via-lightbox__scrim') as HTMLElement;

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      frame();
      frame();
    });
    expect(onClose).not.toHaveBeenCalled();
    const mid = parseFloat(panel.style.transform.replace(/[^\d.-]/g, ''));
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(700);
    const scrimMid = parseFloat(scrim.style.opacity);
    expect(scrimMid).toBeLessThan(1);
    expect(scrimMid).toBeGreaterThanOrEqual(0);

    settle(() => onClose.mock.calls.length > 0);
    expect(onClose).toHaveBeenCalledOnce();
    expect(panel.style.transform).toBe('translateY(700px)');
    expect(scrim.style.opacity).toBe('0');
  });

  it('freezes the scrim CSS entry animation before the exit spring drives its opacity', () => {
    render(<Lightbox open onClose={() => {}} images={single} />);
    givePanelHeight(700);
    const scrim = document.querySelector('.via-lightbox__scrim') as HTMLElement;
    expect(scrim.style.animation).not.toBe('none');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(scrim.style.animation).toBe('none');
  });

  it('holding ESC (repeated keydown) does not restart the exit spring', () => {
    const onClose = vi.fn();
    render(<Lightbox open onClose={onClose} images={single} />);
    givePanelHeight(700);
    const panel = panelEl();
    const y = () => parseFloat(panel.style.transform.replace(/[^\d.-]/g, '') || '0');

    fireEvent.keyDown(document, { key: 'Escape' });
    act(() => {
      frame();
      frame();
      frame();
    });
    const mid = y();
    expect(mid).toBeGreaterThan(0);

    // key repeat mid-flight: no new spring scheduled (rafSeq stable), motion keeps forward
    const seqBefore = rafSeq;
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(rafSeq).toBe(seqBefore);
    act(() => frame());
    expect(y()).toBeGreaterThanOrEqual(mid);

    settle(() => onClose.mock.calls.length > 0);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('releasing a drag does not count as a backdrop click', () => {
    const onClose = vi.fn();
    render(<Lightbox open onClose={onClose} images={single} />);
    const panel = panelEl();

    // pointer travelled 160px between press and the synthetic click → drag, not click
    fireEvent.pointerDown(panel, { clientX: 100, clientY: 100 });
    fireEvent.click(panel, { clientX: 100, clientY: 260 });
    settle(() => onClose.mock.calls.length > 0);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes dry (no animation) under prefers-reduced-motion', () => {
    reducedMotion = true;
    const onClose = vi.fn();
    render(<Lightbox open onClose={onClose} images={single} />);

    fireEvent.keyDown(document, { key: 'Escape' });
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

    // close via Escape → exit animates → focus returns to the opener
    await user.keyboard('{Escape}');
    settle(() => screen.queryByRole('dialog') === null);
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
