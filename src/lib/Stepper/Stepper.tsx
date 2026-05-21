import { type ReactNode } from 'react';
import { Check } from 'lucide-react';
import './Stepper.css';

export interface StepItem {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}

type Orientation = 'horizontal' | 'vertical';

export interface StepperProps {
  steps: StepItem[];
  /** Índice 0-based do passo atual (em progresso) */
  current: number;
  orientation?: Orientation;
  /** Permite clicar em passos anteriores pra voltar */
  onStepClick?: (index: number) => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Stepper · wizard editorial · horizontal ou vertical · ARIA nav
 *
 * @example
 * <Stepper
 *   ariaLabel="Onboarding"
 *   current={2}
 *   steps={[
 *     { id: 'profile', label: 'Perfil', description: 'Quem é você' },
 *     { id: 'role',    label: 'Função', description: 'Onde atua' },
 *     { id: 'plan',    label: 'Plano',  description: 'Como vamos te apoiar' },
 *   ]}
 * />
 */
export function Stepper({
  steps,
  current,
  orientation = 'horizontal',
  onStepClick,
  ariaLabel = 'Progresso',
  className = '',
}: StepperProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`via-stepper via-stepper--${orientation} ${className}`}
    >
      <ol className="via-stepper__list">
        {steps.map((step, i) => {
          const isComplete = i < current;
          const isCurrent = i === current;
          const status: 'complete' | 'current' | 'future' = isComplete
            ? 'complete'
            : isCurrent
              ? 'current'
              : 'future';
          const canClick = onStepClick && isComplete;

          return (
            <li
              key={step.id}
              className={`via-stepper__item is-${status}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {canClick ? (
                <button
                  type="button"
                  className="via-stepper__node"
                  onClick={() => onStepClick(i)}
                  aria-label={`Voltar para ${typeof step.label === 'string' ? step.label : `passo ${i + 1}`}`}
                >
                  <StepIndicator index={i} status={status} />
                  <span className="via-stepper__copy">
                    <span className="via-stepper__label">{step.label}</span>
                    {step.description && <span className="via-stepper__desc">{step.description}</span>}
                  </span>
                </button>
              ) : (
                <div className="via-stepper__node">
                  <StepIndicator index={i} status={status} />
                  <span className="via-stepper__copy">
                    <span className="via-stepper__label">{step.label}</span>
                    {step.description && <span className="via-stepper__desc">{step.description}</span>}
                  </span>
                </div>
              )}
              {i < steps.length - 1 && (
                <span
                  className={`via-stepper__connector ${isComplete ? 'is-complete' : ''}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepIndicator({
  index,
  status,
}: {
  index: number;
  status: 'complete' | 'current' | 'future';
}) {
  return (
    <span className={`via-stepper__indicator is-${status}`}>
      {status === 'complete' ? (
        <Check size={12} strokeWidth={2.6} aria-hidden="true" />
      ) : (
        <span>{index + 1}</span>
      )}
    </span>
  );
}
