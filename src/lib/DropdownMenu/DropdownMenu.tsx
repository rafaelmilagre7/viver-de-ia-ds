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
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const resolvedGroups: DropdownMenuGroup[] = groups
    ? groups
    : items
      ? [{ id: 'main', items }]
      : [];

  const handleSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    setOpen(false);
    // Devolve foco pro trigger
    triggerRef.current?.querySelector<HTMLElement>('button, [tabindex]')?.focus();
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
        triggerRef.current?.querySelector<HTMLElement>('button, [tabindex]')?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={wrapRef} className={`via-dropdown ${className}`}>
      <div
        ref={triggerRef}
        className="via-dropdown__trigger-wrap"
        onClick={() => setOpen((o) => !o)}
      >
        {trigger}
      </div>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          className={`via-dropdown__menu via-dropdown__menu--${align}`}
        >
          {resolvedGroups.map((group, gi) => (
            <div key={group.id} className="via-dropdown__group" role="group" aria-label={typeof group.label === 'string' ? group.label : undefined}>
              {group.label && (
                <div className="via-dropdown__group-label" aria-hidden="true">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
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
              ))}
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
