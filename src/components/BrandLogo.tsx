// Monograma em 145×80 (2× do maior tamanho, lg) — o original 434×239 pesava 3× mais à toa
import monogramBlack from '../assets/logos/VIA_monogram_hq_80h.png';
import monogramWhite from '../assets/logos/VIA_monogram_hq_white_80h.png';
import wordmarkBlack from '../assets/logos/VIVER_DE_IA_black.png';
import wordmarkWhite from '../assets/logos/VIVER_DE_IA_white.png';

type Variant = 'black' | 'white' | 'auto';
type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, { mono: number; word: number; gap: number }> = {
  sm: { mono: 20, word: 18, gap: 12 },
  md: { mono: 28, word: 22, gap: 14 },
  lg: { mono: 40, word: 30, gap: 18 },
};

// width/height reservam o espaço antes da imagem chegar (sem pulo de layout)
const MONO_RATIO = 434 / 239;
const WORD_RATIO = 373 / 31;

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  monoOnly?: boolean;
};

export default function BrandLogo({
  variant = 'black',
  size = 'md',
  className,
  monoOnly = false,
}: Props) {
  const s = sizes[size];
  const monoDims = { width: Math.round(s.mono * MONO_RATIO), height: s.mono };
  const wordDims = { width: Math.round(s.word * WORD_RATIO), height: s.word };
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: s.gap,
    lineHeight: 0,
  } as const;

  // auto · troca preto↔branco conforme o tema (renderiza os dois, CSS alterna).
  // Sem flash, sem JS — funciona instantâneo na troca de tema.
  if (variant === 'auto') {
    return (
      <span className={className} style={wrap} role="img" aria-label="Viver de IA">
        <img src={monogramBlack} {...monoDims} alt="" className="vds-brand-mono vds-brand-img--light" style={{ height: s.mono, width: 'auto' }} />
        <img src={monogramWhite} {...monoDims} alt="" className="vds-brand-mono vds-brand-img--dark" style={{ height: s.mono, width: 'auto' }} />
        {!monoOnly && (
          <>
            <img src={wordmarkBlack} {...wordDims} alt="" className="vds-brand-wordmark vds-brand-img--light" style={{ height: s.word, width: 'auto' }} />
            <img src={wordmarkWhite} {...wordDims} alt="" className="vds-brand-wordmark vds-brand-img--dark" style={{ height: s.word, width: 'auto' }} />
          </>
        )}
      </span>
    );
  }

  const mono = variant === 'white' ? monogramWhite : monogramBlack;
  const word = variant === 'white' ? wordmarkWhite : wordmarkBlack;

  return (
    <span className={className} style={wrap} role="img" aria-label="Viver de IA">
      <img src={mono} {...monoDims} alt="" className="vds-brand-mono" style={{ height: s.mono, width: 'auto' }} />
      {!monoOnly && (
        <img src={word} {...wordDims} alt="" className="vds-brand-wordmark" style={{ height: s.word, width: 'auto' }} />
      )}
    </span>
  );
}
