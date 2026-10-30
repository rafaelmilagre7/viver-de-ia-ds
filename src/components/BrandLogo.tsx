// O site usa o mesmo logo oficial em vetor que a library entrega (proporção do livro de marca).
// No mobile estrito (≤560px) o lockup vira só o monograma — ver .vds-brand-* em layout.css.
import { BrandLogo as LibBrandLogo, type BrandLogoProps } from '../lib/BrandLogo/BrandLogo';

export default function BrandLogo({ className = '', monoOnly, ...props }: BrandLogoProps) {
  if (monoOnly) return <LibBrandLogo {...props} monoOnly className={className} />;
  return (
    <span className={`vds-brand ${className}`}>
      <LibBrandLogo {...props} className="vds-brand-full" />
      <LibBrandLogo {...props} monoOnly className="vds-brand-compact" />
    </span>
  );
}
