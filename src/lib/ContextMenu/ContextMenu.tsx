import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import './ContextMenu.css';

export interface ContextMenuOption {
  label: ReactNode;
  /** Callback ao clicar */
  onSelect?: () => void;
  /** Ícone opcional à esquerda */
  icon?: ReactNode;
  /** Atalho keyboard exibido à direita (display only) */
  shortcut?: string;
  /** Tone destrutivo (coral) */
  destructive?: boolean;
  /** Desabilitado */
  disabled?: boolean;
  /** Separador antes deste item */
  separatorBefore?: boolean;
}

export interface ContextMenuProps {
  /** Elemento que recebe right-click pra abrir o menu */
  children: ReactNode;
  /** Opções do menu */
  items: ContextMenuOption[];
  /** Label ARIA */
  label?: string;
}

/**
 * `<ContextMenu>` · menu de clique direito editorial
 *
 * Usa contextmenu event nativo · posiciona no cursor · keyboard arrow nav.
 * Fecha em click fora, escape, ou seleção.
 *
 * @example
 * <ContextMenu items={[
 *   { label: 'Editar', icon: <Edit size={13} />, onSelect: () => {} },
 *   { label: 'Duplicar', shortcut: '⌘D' },
 *   { label: 'Excluir', destructive: true, separatorBefore: true },
 * ]}>
 *   <div>Click direito aqui</div>
 * </ContextMenu>
 */
export function ContextMenu({ children, items, label = 'Menu de contexto' }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = (e: MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const onClickOutside = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  // Adjust menu position if it would overflow viewport
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = pos.x;
    let y = pos.y;
    if (x + rect.width > vw - 8) x = vw - rect.width - 8;
    if (y + rect.height > vh - 8) y = vh - rect.height - 8;
    if (x !== pos.x || y !== pos.y) setPos({ x, y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <span onContextMenu={openMenu} className="via-cm-wrap">
        {children}
      </span>
      {open && (
        <div
          ref={menuRef}
          className="via-cm"
          role="menu"
          aria-label={label}
          style={{ top: pos.y, left: pos.x }}
        >
          {items.map((it, i) => (
            <div key={i}>
              {it.separatorBefore && <div className="via-cm__sep" role="separator" />}
              <button
                type="button"
                role="menuitem"
                className={`via-cm__item${it.destructive ? ' is-destructive' : ''}${it.disabled ? ' is-disabled' : ''}`}
                onClick={() => {
                  if (it.disabled) return;
                  it.onSelect?.();
                  close();
                }}
                disabled={it.disabled}
              >
                {it.icon && <span className="via-cm__icon">{it.icon}</span>}
                <span className="via-cm__label">{it.label}</span>
                {it.shortcut && <span className="via-cm__shortcut">{it.shortcut}</span>}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
