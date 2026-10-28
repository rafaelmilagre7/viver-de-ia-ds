import { forwardRef, useState, type HTMLAttributes } from 'react';
import './Avatar.css';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Status = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: Size;
  status?: Status;
}

function deriveInitials(name?: string) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');
}

/**
 * Avatar · com fallback de iniciais + status dot opcional
 * (imagem que falha ao carregar também cai pras iniciais)
 *
 * @example
 * <Avatar src="..." alt="Bruno" size="md" status="online" />
 * <Avatar initials="BR" size="lg" />
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', status, className = '', ...rest }, ref) => {
    const label = initials || deriveInitials(alt);
    // src que deu erro → iniciais; trocar o src tenta de novo
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const showImage = !!src && failedSrc !== src;
    const cls = [`via-avatar`, `via-avatar--${size}`, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={cls} role="img" aria-label={alt || label} {...rest}>
        {showImage ? (
          <img src={src} alt={alt || label} onError={() => setFailedSrc(src)} />
        ) : (
          <span className="via-avatar__initials">{label}</span>
        )}
        {status && <span className={`via-avatar__status via-avatar__status--${status}`} aria-hidden="true" />}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
