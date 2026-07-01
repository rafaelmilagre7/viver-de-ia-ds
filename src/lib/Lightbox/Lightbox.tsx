import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useDialogFocus } from '../_shared/useDialogFocus';
import './Lightbox.css';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  /** Link de download · default = src */
  downloadHref?: string;
}

export interface LightboxProps {
  open: boolean;
  onClose: () => void;
  images: LightboxImage[];
  /** Index inicial */
  index?: number;
  /** Mostra botão de download · default false */
  showDownload?: boolean;
}

/**
 * `<Lightbox>` · foto em tela cheia editorial
 *
 * Múltiplas imagens · setas keyboard/touch · escape close · download opcional.
 *
 * @example
 * <Lightbox
 *   open={lightboxOpen}
 *   onClose={close}
 *   images={[{ src: '/foto.jpg', alt: 'Caio na live', caption: '14 mai 2026' }]}
 * />
 */
export function Lightbox({ open, onClose, images, index = 0, showDownload = false }: LightboxProps) {
  const [current, setCurrent] = useState(index);
  const dialogRef = useRef<HTMLDivElement>(null);

  // reset para o índice inicial quando (re)abre — ajuste em render-phase
  // (padrão oficial React, evita setState dentro de effect)
  const [prevKey, setPrevKey] = useState(`${open}:${index}`);
  const openKey = `${open}:${index}`;
  if (openKey !== prevKey) {
    setPrevKey(openKey);
    if (open) setCurrent(index);
  }

  const go = useCallback((dir: number) => {
    setCurrent((c) => {
      const next = c + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, go]);

  // Foco acessível: focus-first ao abrir, trap com Tab, restore ao fechar
  const { onKeyDown } = useDialogFocus(open, dialogRef);

  if (!open || images.length === 0) return null;
  const img = images[current];

  return (
    <div
      ref={dialogRef}
      className="via-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização de imagem"
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="via-lightbox__close"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X size={18} strokeWidth={1.8} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="via-lightbox__arrow via-lightbox__arrow--prev"
            onClick={() => go(-1)}
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="via-lightbox__arrow via-lightbox__arrow--next"
            onClick={() => go(1)}
            aria-label="Próxima imagem"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </>
      )}

      <div className="via-lightbox__content" onClick={onClose}>
        <img
          src={img.src}
          alt={img.alt}
          className="via-lightbox__img"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {(img.caption || images.length > 1 || showDownload) && (
        <footer className="via-lightbox__foot">
          <div className="via-lightbox__caption">
            {img.caption && <span>{img.caption}</span>}
            {images.length > 1 && (
              <span className="via-lightbox__counter">
                {current + 1} / {images.length}
              </span>
            )}
          </div>
          {showDownload && (
            <a
              href={img.downloadHref || img.src}
              download
              className="via-lightbox__download"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={13} strokeWidth={2} />
              Baixar
            </a>
          )}
        </footer>
      )}
    </div>
  );
}
