import { type ReactNode } from 'react';
import './EmptyState.css';

type Variant = 'default' | 'soft' | 'navy';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  secondary?: ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * EmptyState · placeholder editorial pra listas/queries vazias
 *
 * @example
 * <EmptyState
 *   icon={<Inbox size={20} strokeWidth={1.8} />}
 *   title="Nenhuma mentoria agendada"
 *   description="Sua próxima sessão aparece aqui assim que o mentor confirmar."
 *   action={<Button variant="primary">Agendar agora</Button>}
 *   secondary={<Button variant="ghost">Ver disponibilidades</Button>}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  secondary,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`via-empty-state via-empty-state--${variant} ${className}`} role="status">
      {icon && <div className="via-empty-state__icon" aria-hidden="true">{icon}</div>}
      <h3 className="via-empty-state__title">{title}</h3>
      {description && <p className="via-empty-state__description">{description}</p>}
      {(action || secondary) && (
        <div className="via-empty-state__actions">
          {action}
          {secondary}
        </div>
      )}
    </div>
  );
}
