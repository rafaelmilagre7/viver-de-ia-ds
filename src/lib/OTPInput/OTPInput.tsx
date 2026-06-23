import { useRef, useState, type ClipboardEvent, type KeyboardEvent, type ChangeEvent } from 'react';
import './OTPInput.css';

export interface OTPInputProps {
  /** Quantos dígitos (4 ou 6 são padrão) */
  length?: number;
  /** Valor controlado */
  value?: string;
  /** Callback ao mudar */
  onChange?: (value: string) => void;
  /** Callback quando todos os dígitos preenchidos */
  onComplete?: (value: string) => void;
  /** Label visível acima */
  label?: string;
  /** Hint / mensagem abaixo */
  hint?: string;
  /** Estado de erro */
  error?: boolean;
  /** Auto-focus no primeiro campo ao montar */
  autoFocus?: boolean;
  /** Tipo de input · text pra alfanumérico, numeric pra só números */
  inputType?: 'text' | 'numeric';
  /** Desabilita o componente */
  disabled?: boolean;
}

/**
 * `<OTPInput>` · campo de código de verificação (2FA, magic link)
 *
 * Cada dígito em campo separado · navegação automática · paste detecta código
 * completo · backspace navega pra trás.
 *
 * @example
 * <OTPInput length={6} onComplete={(code) => verify(code)} />
 */
export function OTPInput({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  label,
  hint,
  error = false,
  autoFocus = true,
  inputType = 'numeric',
  disabled = false,
}: OTPInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const setValue = (v: string) => {
    if (controlledValue === undefined) setInternalValue(v);
    onChange?.(v);
    if (v.length === length) onComplete?.(v);
  };

  const updateAt = (index: number, char: string) => {
    const sanitized =
      inputType === 'numeric' ? char.replace(/\D/g, '') : char.replace(/\s/g, '');
    if (!sanitized) {
      const next = value.slice(0, index) + value.slice(index + 1);
      // Só emite se o keystroke realmente mudou algo. Caractere rejeitado
      // (ex.: letra em modo numérico) sobre célula vazia não dispara onChange.
      if (next !== value) setValue(next);
      return;
    }
    const single = sanitized.slice(0, 1);
    const arr = value.split('');
    arr[index] = single;
    const next = arr.join('').slice(0, length);
    // Só emite quando o valor muda de fato; um re-digitar do mesmo dígito
    // ainda avança o foco, mas não dispara onChange à toa.
    if (next !== value) setValue(next);
    // focus next
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // empty + backspace = vai pro anterior
        e.preventDefault();
        refs.current[index - 1]?.focus();
        const arr = value.split('');
        arr[index - 1] = '';
        setValue(arr.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const sanitized =
      inputType === 'numeric' ? pasted.replace(/\D/g, '') : pasted.replace(/\s/g, '');
    const next = sanitized.slice(0, length);
    setValue(next);
    // focus no último preenchido
    const lastIdx = Math.min(next.length, length - 1);
    refs.current[lastIdx]?.focus();
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    updateAt(index, e.target.value);
  };

  return (
    <div className={`via-otp${error ? ' has-error' : ''}${disabled ? ' is-disabled' : ''}`}>
      {label && <label className="via-otp__label">{label}</label>}
      <div className="via-otp__row" role="group" aria-label={label || 'Código de verificação'}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type={inputType === 'numeric' ? 'tel' : 'text'}
            inputMode={inputType === 'numeric' ? 'numeric' : 'text'}
            pattern={inputType === 'numeric' ? '[0-9]*' : undefined}
            maxLength={1}
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            autoFocus={autoFocus && i === 0}
            value={value[i] || ''}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className="via-otp__cell"
            aria-label={`Dígito ${i + 1} de ${length}`}
            aria-invalid={error || undefined}
          />
        ))}
      </div>
      {hint && <p className={`via-otp__hint${error ? ' is-error' : ''}`}>{hint}</p>}
    </div>
  );
}
