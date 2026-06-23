import { useId, useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import './TreeView.css';

export interface TreeNode {
  id: string;
  label: ReactNode;
  /** Ícone à esquerda do label */
  icon?: ReactNode;
  /** Filhos · pode estar vazio · undefined = leaf */
  children?: TreeNode[];
  /** Marca o nó como destacado */
  highlighted?: boolean;
  /** Contador (badge à direita) */
  count?: number;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  /** IDs inicialmente expandidos */
  defaultExpanded?: string[];
  /** Modo controlado · IDs expandidos */
  expanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** ID selecionado */
  selected?: string;
  onSelect?: (id: string) => void;
  /** Label ARIA da árvore */
  label?: string;
}

/** Item achatado da árvore — só os nós VISÍVEIS, em ordem de DOM. */
interface FlatNode {
  node: TreeNode;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  parentId: string | null;
}

/**
 * `<TreeView>` · árvore hierárquica filesystem-style
 *
 * Use pra: navegação de arquivos, taxonomias de categoria, sumários, sitemap.
 * Expand/collapse com chevron · keyboard arrow nav (WAI-ARIA tree) · ARIA tree.
 *
 * Teclado (roving tabindex · só a linha ativa tem tabIndex 0):
 * - ↓/↑ movem entre linhas VISÍVEIS · Home/End primeira/última visível
 * - → expande (ou foca o primeiro filho se já expandido) · ← colapsa (ou foca o pai)
 * - Enter/Space ativa/seleciona (e alterna expansão num nó-pai)
 *
 * @example
 * <TreeView
 *   nodes={[
 *     { id: 'a', label: 'Curso A', children: [
 *       { id: 'a1', label: 'Aula 1' },
 *       { id: 'a2', label: 'Aula 2' },
 *     ]},
 *   ]}
 *   onSelect={(id) => navigate(id)}
 * />
 */
export function TreeView({
  nodes,
  defaultExpanded = [],
  expanded: controlledExpanded,
  onExpandedChange,
  selected,
  onSelect,
  label = 'Árvore',
}: TreeViewProps) {
  const baseId = useId();
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set(defaultExpanded));
  const expanded = controlledExpanded ? new Set(controlledExpanded) : internalExpanded;

  // Linha que recebe foco no roving tabindex. Começa indefinida (cai na 1ª visível).
  const [activeId, setActiveId] = useState<string | null>(null);

  const setExpanded = (next: Set<string>) => {
    if (controlledExpanded === undefined) setInternalExpanded(next);
    onExpandedChange?.(Array.from(next));
  };

  const expand = (id: string) => {
    if (expanded.has(id)) return;
    const next = new Set(expanded);
    next.add(id);
    setExpanded(next);
  };

  const collapse = (id: string) => {
    if (!expanded.has(id)) return;
    const next = new Set(expanded);
    next.delete(id);
    setExpanded(next);
  };

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  // Achata só o que está visível, na ordem em que aparece na tela.
  const flatten = (): FlatNode[] => {
    const out: FlatNode[] = [];
    const walk = (list: TreeNode[], depth: number, parentId: string | null) => {
      for (const node of list) {
        const hasChildren = !!node.children && node.children.length > 0;
        const isExpanded = expanded.has(node.id);
        out.push({ node, depth, hasChildren, isExpanded, parentId });
        if (hasChildren && isExpanded) walk(node.children!, depth + 1, node.id);
      }
    };
    walk(nodes, 0, null);
    return out;
  };

  const visible = flatten();

  // A linha ativa (roving tabindex). Preferimos: activeId se ainda visível →
  // o selecionado se visível → a primeira visível.
  const resolveActiveId = (): string | null => {
    if (activeId && visible.some((v) => v.node.id === activeId)) return activeId;
    if (selected && visible.some((v) => v.node.id === selected)) return selected;
    return visible[0]?.node.id ?? null;
  };
  const rovingId = resolveActiveId();

  const focusRow = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(`${baseId}-row-${id}`);
    el?.focus();
  };

  const handleKey = (e: React.KeyboardEvent, index: number) => {
    const current = visible[index];
    if (!current) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = visible[index + 1];
        if (next) focusRow(next.node.id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = visible[index - 1];
        if (prev) focusRow(prev.node.id);
        break;
      }
      case 'Home': {
        e.preventDefault();
        const first = visible[0];
        if (first) focusRow(first.node.id);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = visible[visible.length - 1];
        if (last) focusRow(last.node.id);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (current.hasChildren && !current.isExpanded) {
          // colapsado → expande
          expand(current.node.id);
        } else if (current.hasChildren && current.isExpanded) {
          // já expandido → foca o primeiro filho
          const child = visible[index + 1];
          if (child && child.parentId === current.node.id) focusRow(child.node.id);
        }
        // folha → nada
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (current.hasChildren && current.isExpanded) {
          // expandido → colapsa
          collapse(current.node.id);
        } else if (current.parentId) {
          // folha ou pai colapsado → foca o pai
          focusRow(current.parentId);
        }
        break;
      }
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        e.preventDefault();
        if (current.hasChildren) toggle(current.node.id);
        onSelect?.(current.node.id);
        break;
      }
      default:
        break;
    }
  };

  const renderNode = (flat: FlatNode, index: number) => {
    const { node, depth, hasChildren, isExpanded } = flat;
    const isSelected = selected === node.id;
    const isRoving = node.id === rovingId;

    return (
      <li
        key={node.id}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
      >
        <button
          type="button"
          id={`${baseId}-row-${node.id}`}
          tabIndex={isRoving ? 0 : -1}
          className={`via-tv__row${isSelected ? ' is-selected' : ''}${node.highlighted ? ' is-highlighted' : ''}`}
          style={{ paddingLeft: `${10 + depth * 18}px` }}
          onClick={() => {
            setActiveId(node.id);
            if (hasChildren) toggle(node.id);
            onSelect?.(node.id);
          }}
          onKeyDown={(e) => handleKey(e, index)}
        >
          <span
            className={`via-tv__chev${hasChildren ? '' : ' is-leaf'}${isExpanded ? ' is-open' : ''}`}
            aria-hidden="true"
          >
            {hasChildren && <ChevronRight size={12} strokeWidth={2.2} />}
          </span>
          {node.icon && <span className="via-tv__icon">{node.icon}</span>}
          <span className="via-tv__label">{node.label}</span>
          {typeof node.count === 'number' && (
            <span className="via-tv__count">{node.count}</span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <ul role="group" className="via-tv__children">
            {node.children!.map((c) => {
              const childIndex = visible.findIndex((v) => v.node.id === c.id);
              const childFlat = visible[childIndex];
              return childFlat ? renderNode(childFlat, childIndex) : null;
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul role="tree" aria-label={label} className="via-tv">
      {nodes.map((n) => {
        const idx = visible.findIndex((v) => v.node.id === n.id);
        const flat = visible[idx];
        return flat ? renderNode(flat, idx) : null;
      })}
    </ul>
  );
}
