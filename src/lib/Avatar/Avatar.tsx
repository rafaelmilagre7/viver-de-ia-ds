import { forwardRef, type HTMLAttributes } from 'react';
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
 *
 * @example
 * <Avatar src="..." alt="Bruno" size="md" status="online" />
 * <Avatar initials="BR" size="lg" />
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', status, className = '', ...rest }, ref) => {
    const label = initials || deriveInitials(alt);
    const cls = [`via-avatar`, `via-avatar--${size}`, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={cls} role="img" aria-label={alt || label} {...rest}>
        {src ? (
          <img src={src} alt={alt || label} />
        ) : (
          <span className="via-avatar__initials">{label}</span>
        )}
        {status && <span className={`via-avatar__status via-avatar__status--${status}`} aria-hidden="true" />}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
