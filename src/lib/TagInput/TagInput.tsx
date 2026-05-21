import { useState, useRef, type KeyboardEvent, type FocusEvent } from 'react';
import { X } from 'lucide-react';
import './TagInput.css';

export interface TagInputProps {
  /** Tags atuais */
  value?: string[];
  /** Callback ao adicionar/remover */
  onChange?: (tags: string[]) => void;
  /** Label visível */
  label?: string;
  /** Placeholder do input */
  placeholder?: string;
  /** Hint abaixo */
  hint?: string;
  /** Limite máximo de tags · 0 = ilimitado */
  max?: number;
  /** Tags sugeridas mostradas como suggestions */
  suggestions?: string[];
  /** Permite duplicatas · default false */
  allowDuplicates?: boolean;
  /** Estado de erro */
  error?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Variant de tamanho */
  size?: 'sm' | 'md';
}

/**
 * `<TagInput>` · campo de chips/tags com input livre + sugestões
 *
 * Use pra: tags em artigos, skills no perfil, filtros multi-keyword, etc.
 * Enter ou vírgula adiciona · Backspace no campo vazio remove última.
 *
 * @example
 * <TagInput
 *   label="Skills"
 *   suggestions={['React', 'TypeScript', 'IA']}
 *   max={5}
 *   onChange={(tags) => setSkills(tags)}
 * />
 */
export function TagInput({
  value: controlledValue,
  onChange,
  label,
  placeholder = 'Digite e pressione Enter…',
  hint,
  max = 0,
  suggestions = [],
  allowDuplicates = false,
  error = false,
  disabled = false,
  size = 'md',
}: TagInputProps) {
  const [internal, setInternal] = useState<string[]>([]);
  const tags = controlledValue !== undefined ? controlledValue : internal;
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setTags = (next: string[]) => {
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  };

  const addTag = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (!allowDuplicates && tags.includes(trimmed)) return;
    if (max > 0 && tags.length >= max) return;
    setTags([...tags, trimmed]);
    setInput('');
  };

  const removeTag = (idx: number) => {
    if (disabled) return;
    const next = tags.filter((_, i) => i !== idx);
    setTags(next);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    // se tem texto pendente, vira tag
    if (input.trim()) addTag(input);
    // callback parent se houver
    if (e.target.value !== input) setInput(e.target.value);
  };

  const visibleSuggestions = suggestions.filter((s) => !tags.includes(s)).slice(0, 5);
  const canAdd = !max || tags.length < max;

  return (
    <div className={`via-taginput via-taginput--${size}${error ? ' has-error' : ''}${disabled ? ' is-disabled' : ''}`}>
      {label && <label className="via-taginput__label">{label}</label>}

      <div
        className={`via-taginput__field${focused ? ' is-focused' : ''}`}
        onClick={() => inputRef.current?.focus()}
        role="presentation"
      >
        {tags.map((tag, i) => (
          <span key={`${tag}-${i}`} className="via-taginput__tag">
            <span>{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(i);
                }}
                aria-label={`Remover ${tag}`}
                className="via-taginput__remove"
              >
                <X size={11} strokeWidth={2.4} />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          className="via-taginput__input"
          type="text"
          value={input}
          placeholder={canAdd ? placeholder : ''}
          disabled={disabled || !canAdd}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        />
      </div>

      {visibleSuggestions.length > 0 && !disabled && canAdd && (
        <div className="via-taginput__suggestions" role="list">
          <span className="via-taginput__suggestions-label">Sugestões</span>
          {visibleSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              role="listitem"
              className="via-taginput__suggestion"
              onClick={() => addTag(s)}
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      {hint && (
        <p className={`via-taginput__hint${error ? ' is-error' : ''}`}>
          {hint}
          {max > 0 && (
            <span className="via-taginput__count">
              {' '}· {tags.length}/{max}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
