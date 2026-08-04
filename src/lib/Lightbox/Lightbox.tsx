import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useDialogFocus } from '../_shared/useDialogFocus';
import { useDragDismiss } from '../_shared/useDragDismiss';
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
 * Arrastar a foto pra baixo dispensa (iOS Fotos) — o fundo clareia junto e a
 * soltura decide por projeção de momentum. X/ESC/fundo saem pela mesma mola.
 *
 * @example
 * <Lightbox
 *   open={lightboxOpen}
 *   onClose={close}
 *   images={[{ src: '/foto.jpg', alt: 'Caio na live', caption: '14 mai 2026' }]}
 * />
 */
export function Lightbox({ open, onClose, images, index = 0, showDownload = false }: LightboxProps) {
  if (!open || images.length === 0) return null;
  // Vista montada só enquanto aberta: estado do gesto nasce zerado a cada
  // abertura e `key` reproduz o reset pro index quando ele muda em aberto
  return <LightboxView key={index} onClose={onClose} images={images} index={index} showDownload={showDownload} />;
}

interface LightboxViewProps {
  onClose: () => void;
  images: LightboxImage[];
  index: number;
  showDownload: boolean;
}

function LightboxView({ onClose, images, index, showDownload }: LightboxViewProps) {
  const [current, setCurrent] = useState(index);
  const dialogRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const pressPos = useRef<{ x: number; y: number } | null>(null);
  // Saída já em andamento — pedido repetido (ESC segurado) não reinicia a mola
  const closingRef = useRef(false);

  // onClose vive num ref: identidade instável do consumidor (arrow inline)
  // não pode re-assinar os listeners do gesto no meio da animação
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const handleDismiss = useCallback(() => {
    closingRef.current = false;
    onCloseRef.current();
  }, []);

  // Swipe vertical pra baixo dispensa · pra cima resiste (rubber-band)
  const { close } = useDragDismiss({
    panelRef,
    axis: 'y',
    dir: 1,
    onDismiss: handleDismiss,
    scrimRef,
  });

  // X/ESC/fundo saem pela mesma mola do gesto; onClose só dispara no settle
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    // Entrada CSS do fundo ainda rodando venceria a opacidade inline da mola
    if (scrimRef.current) scrimRef.current.style.animation = 'none';
    close();
  }, [close]);

  const go = useCallback((dir: number) => {
    setCurrent((c) => {
      const next = c + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // e.repeat: ESC segurado não reinicia a mola de saída a cada auto-repeat
      if (e.key === 'Escape' && !e.repeat) requestClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [requestClose, go]);

  // Foco acessível: focus-first ao abrir, trap com Tab, restore ao fechar
  const { onKeyDown } = useDialogFocus(true, dialogRef);

  // A soltura de um arrasto também dispara `click` no painel — só conta como
  // clique de fechar se o ponteiro andou menos que a histerese do gesto
  const onPanelPointerDown = (e: React.PointerEvent) => {
    pressPos.current = { x: e.clientX, y: e.clientY };
  };
  const onPanelClick = (e: React.MouseEvent) => {
    const p = pressPos.current;
    if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) >= 10) return;
    requestClose();
  };

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
      <div ref={scrimRef} className="via-lightbox__scrim" aria-hidden="true" />

      <button
        type="button"
        className="via-lightbox__close"
        onClick={requestClose}
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

      <div
        ref={panelRef}
        className="via-lightbox__content"
        onPointerDown={onPanelPointerDown}
        onClick={onPanelClick}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="via-lightbox__img"
          draggable={false}
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
