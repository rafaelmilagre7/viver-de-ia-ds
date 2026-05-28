import monogramBlack from '../assets/logos/VIA_monogram_hq.png';
import monogramWhite from '../assets/logos/VIA_monogram_hq_white.png';
import wordmarkBlack from '../assets/logos/VIVER_DE_IA_black.png';
import wordmarkWhite from '../assets/logos/VIVER_DE_IA_white.png';

type Variant = 'black' | 'white' | 'auto';
type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, { mono: number; word: number; gap: number }> = {
  sm: { mono: 20, word: 18, gap: 12 },
  md: { mono: 28, word: 22, gap: 14 },
  lg: { mono: 40, word: 30, gap: 18 },
};

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
        <img src={monogramBlack} alt="" className="vds-brand-mono vds-brand-img--light" style={{ height: s.mono, width: 'auto' }} />
        <img src={monogramWhite} alt="" className="vds-brand-mono vds-brand-img--dark" style={{ height: s.mono, width: 'auto' }} />
        {!monoOnly && (
          <>
            <img src={wordmarkBlack} alt="" className="vds-brand-wordmark vds-brand-img--light" style={{ height: s.word, width: 'auto' }} />
            <img src={wordmarkWhite} alt="" className="vds-brand-wordmark vds-brand-img--dark" style={{ height: s.word, width: 'auto' }} />
          </>
        )}
      </span>
    );
  }

  const mono = variant === 'white' ? monogramWhite : monogramBlack;
  const word = variant === 'white' ? wordmarkWhite : wordmarkBlack;

  return (
    <span className={className} style={wrap} role="img" aria-label="Viver de IA">
      <img src={mono} alt="" className="vds-brand-mono" style={{ height: s.mono, width: 'auto' }} />
      {!monoOnly && (
        <img src={word} alt="" className="vds-brand-wordmark" style={{ height: s.word, width: 'auto' }} />
      )}
    </span>
  );
}
