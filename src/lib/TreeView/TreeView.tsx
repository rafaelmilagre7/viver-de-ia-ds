import { useState, type ReactNode } from 'react';
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

/**
 * `<TreeView>` · árvore hierárquica filesystem-style
 *
 * Use pra: navegação de arquivos, taxonomias de categoria, sumários, sitemap.
 * Expand/collapse com chevron · keyboard arrow nav · ARIA tree.
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
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set(defaultExpanded));
  const expanded = controlledExpanded ? new Set(controlledExpanded) : internalExpanded;

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    if (controlledExpanded === undefined) setInternalExpanded(next);
    onExpandedChange?.(Array.from(next));
  };

  const renderNode = (node: TreeNode, depth: number) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = selected === node.id;

    return (
      <li key={node.id} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
        <button
          type="button"
          className={`via-tv__row${isSelected ? ' is-selected' : ''}${node.highlighted ? ' is-highlighted' : ''}`}
          style={{ paddingLeft: `${10 + depth * 18}px` }}
          onClick={() => {
            if (hasChildren) toggle(node.id);
            onSelect?.(node.id);
          }}
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
            {node.children!.map((c) => renderNode(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul role="tree" aria-label={label} className="via-tv">
      {nodes.map((n) => renderNode(n, 0))}
    </ul>
  );
}
