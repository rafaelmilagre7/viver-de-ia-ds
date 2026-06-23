import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import './DropdownMenu.css';

export interface DropdownMenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: ReactNode;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuGroup {
  id: string;
  label?: ReactNode;
  items: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  /** Botão/elemento que dispara o menu · será envolto em wrapper */
  trigger: ReactNode;
  /** Items planos (sem grupos) ou groups (com separator entre cada) */
  items?: DropdownMenuItem[];
  groups?: DropdownMenuGroup[];
  align?: 'start' | 'end';
  ariaLabel?: string;
  className?: string;
}

/**
 * DropdownMenu · context/overflow menu · ARIA menu/menuitem
 *
 * Navegação por teclado (WAI-ARIA menu): ao abrir foca o primeiro item;
 * ArrowDown/Up movem o foco (roving tabindex) pulando disabled, Home/End vão
 * pro primeiro/último, Enter/Space ativam, Escape fecha e devolve foco ao trigger.
 *
 * @example
 * <DropdownMenu
 *   trigger={<Button iconLeft={<MoreHorizontal />} aria-label="Mais opções" />}
 *   items={[
 *     { id: 'edit',   label: 'Editar perfil', icon: <Edit /> },
 *     { id: 'share',  label: 'Compartilhar',  icon: <Share /> },
 *     { id: 'delete', label: 'Excluir',       icon: <Trash />, destructive: true },
 *   ]}
 * />
 */
export function DropdownMenu({
  trigger,
  items,
  groups,
  align = 'start',
  ariaLabel = 'Menu',
  className = '',
}: DropdownMenuProps) {
  const autoId = useId();
  const menuId = `via-dropdown-${autoId}`;
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const resolvedGroups: DropdownMenuGroup[] = groups
    ? groups
    : items
      ? [{ id: 'main', items }]
      : [];

  // Lista plana de items (na ordem visual, atravessando grupos) pra roving tabindex
  const flatItems: DropdownMenuItem[] = resolvedGroups.flatMap((g) => g.items);

  const firstEnabledIndex = () => flatItems.findIndex((it) => !it.disabled);
  const lastEnabledIndex = () => {
    for (let i = flatItems.length - 1; i >= 0; i--) {
      if (!flatItems[i].disabled) return i;
    }
    return -1;
  };

  const focusTrigger = () =>
    triggerRef.current?.querySelector<HTMLElement>('button, [tabindex]')?.focus();

  const toggleOpen = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        // Ao abrir, posiciona o índice de foco no primeiro item habilitado;
        // o foco imperativo acontece no effect, depois do menu montar.
        const start = firstEnabledIndex();
        setFocusIndex(start === -1 ? 0 : start);
      }
      return !wasOpen;
    });
  };

  const handleSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    setOpen(false);
    // Devolve foco pro trigger
    focusTrigger();
  };

  // Ao abrir: foca de fato o item corrente (índice já posicionado em toggleOpen)
  useEffect(() => {
    if (!open) return;
    itemRefs.current[focusIndex]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Mantém o item focado em sincronia com o índice corrente enquanto aberto
  const moveFocus = (index: number) => {
    setFocusIndex(index);
    itemRefs.current[index]?.focus();
  };

  const handleMenuKey = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (
      key !== 'ArrowDown' &&
      key !== 'ArrowUp' &&
      key !== 'Home' &&
      key !== 'End'
    ) {
      return;
    }
    e.preventDefault();
    const total = flatItems.length;
    if (total === 0) return;

    const step = (from: number, dir: 1 | -1) => {
      let next = from;
      for (let i = 0; i < total; i++) {
        next = (next + dir + total) % total;
        if (!flatItems[next].disabled) return next;
      }
      return from;
    };

    if (key === 'ArrowDown') moveFocus(step(focusIndex, 1));
    else if (key === 'ArrowUp') moveFocus(step(focusIndex, -1));
    else if (key === 'Home') {
      const first = firstEnabledIndex();
      if (first !== -1) moveFocus(first);
    } else if (key === 'End') {
      const last = lastEnabledIndex();
      if (last !== -1) moveFocus(last);
    }
  };

  // Click outside fecha
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        focusTrigger();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Índice plano (atravessando grupos) por chave grupo+item, pra roving tabindex
  const flatIndexFor = (gi: number, ii: number) => {
    let idx = 0;
    for (let g = 0; g < gi; g++) idx += resolvedGroups[g].items.length;
    return idx + ii;
  };

  return (
    <div ref={wrapRef} className={`via-dropdown ${className}`}>
      <div
        ref={triggerRef}
        className="via-dropdown__trigger-wrap"
        onClick={toggleOpen}
      >
        {trigger}
      </div>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          className={`via-dropdown__menu via-dropdown__menu--${align}`}
          onKeyDown={handleMenuKey}
        >
          {resolvedGroups.map((group, gi) => (
            <div key={group.id} className="via-dropdown__group" role="group" aria-label={typeof group.label === 'string' ? group.label : undefined}>
              {group.label && (
                <div className="via-dropdown__group-label" aria-hidden="true">
                  {group.label}
                </div>
              )}
              {group.items.map((item, ii) => {
                const flatIndex = flatIndexFor(gi, ii);
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[flatIndex] = el;
                    }}
                    type="button"
                    role="menuitem"
                    tabIndex={flatIndex === focusIndex ? 0 : -1}
                    className={`via-dropdown__item ${item.destructive ? 'is-destructive' : ''} ${item.disabled ? 'is-disabled' : ''}`}
                    disabled={item.disabled}
                    onClick={() => handleSelect(item)}
                  >
                    {item.icon && <span className="via-dropdown__icon" aria-hidden="true">{item.icon}</span>}
                    <span className="via-dropdown__label">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="via-dropdown__shortcut" aria-hidden="true">{item.shortcut}</kbd>
                    )}
                  </button>
                );
              })}
              {gi < resolvedGroups.length - 1 && (
                <div className="via-dropdown__separator" role="separator" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
