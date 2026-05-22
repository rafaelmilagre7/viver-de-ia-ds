import { useState } from 'react';
import { TreeView, type TreeNode } from '../../lib/TreeView/TreeView';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Folder, FileText, BookOpen } from 'lucide-react';

const nodes: TreeNode[] = [
  {
    id: 'curso-a',
    label: 'Curso · IA do zero',
    icon: <BookOpen size={13} />,
    count: 24,
    children: [
      {
        id: 'm1',
        label: 'Módulo 1 · Fundamentos',
        icon: <Folder size={13} />,
        children: [
          { id: 'a1', label: 'Aula 1 · O que é IA generativa', icon: <FileText size={13} /> },
          { id: 'a2', label: 'Aula 2 · LLMs explicados', icon: <FileText size={13} /> },
          { id: 'a3', label: 'Aula 3 · Prompts eficazes', icon: <FileText size={13} />, highlighted: true },
        ],
      },
      {
        id: 'm2',
        label: 'Módulo 2 · Aplicações',
        icon: <Folder size={13} />,
        count: 8,
        children: [
          { id: 'a4', label: 'Aula 4 · Chatbots', icon: <FileText size={13} /> },
          { id: 'a5', label: 'Aula 5 · RAG na prática', icon: <FileText size={13} /> },
        ],
      },
    ],
  },
];

function TreeViewDemo() {
  const [expanded, setExpanded] = useState<string[]>(['curso-a', 'm1']);
  const [selected, setSelected] = useState('a3');
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <TreeView
        nodes={nodes}
        expanded={expanded}
        onExpandedChange={setExpanded}
        selected={selected}
        onSelect={setSelected}
        label="Curso · árvore de aulas"
      />
    </div>
  );
}

export default function ApiTreeView() {
  return (
    <ComponentDoc
      eyebrow="api · tree-view"
      name="TreeView"
      headline="árvore hierárquica · expand/collapse · keyboard arrow"
      description="TreeView pra navegação filesystem-style. Use em: navegação de cursos/módulos/aulas, sitemap, taxonomias, sumários. Expand/collapse com chevron animado · selected glow · count badges à direita. Keyboard ARIA tree."
      importLine={`import { TreeView, type TreeViewProps, type TreeNode } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-tree', description: 'Container · role=tree' },
        { part: 'via-tree__item', description: 'Linha · chevron + icon + label + count' },
        { part: 'via-tree__chevron', description: 'ChevronRight rotate 0→90° quando expanded' },
        { part: 'via-tree__count', description: 'Badge contador à direita · navy alpha' },
        { part: 'highlighted', description: 'Item destacado (ring navy) · use pra "aula atual"' },
      ]}
      props={[
        { name: 'nodes', type: 'TreeNode[]', required: true, description: 'Árvore · cada nó tem id, label, icon?, children?, count?, highlighted?' },
        { name: 'defaultExpanded', type: 'string[]', description: 'IDs inicialmente expandidos (uncontrolled)' },
        { name: 'expanded', type: 'string[]', description: 'IDs expandidos (controlado)' },
        { name: 'onExpandedChange', type: '(ids: string[]) => void', description: 'Callback ao expandir/colapsar' },
        { name: 'selected', type: 'string', description: 'ID selecionado · selected glow' },
        { name: 'onSelect', type: '(id: string) => void', description: 'Callback ao selecionar nó' },
        { name: 'label', type: 'string', description: 'aria-label da árvore' },
      ]}
      sizes={[
        { name: 'TreeNode.id', label: 'string · obrigatório', description: 'Identificador único' },
        { name: 'TreeNode.label', label: 'ReactNode · obrigatório', description: 'Texto do nó' },
        { name: 'TreeNode.icon', label: 'ReactNode', description: 'Ícone à esquerda (Folder, FileText, BookOpen)' },
        { name: 'TreeNode.children', label: 'TreeNode[]', description: 'Filhos · undefined = leaf · [] = expandable vazio' },
        { name: 'TreeNode.highlighted', label: 'boolean', description: 'Ring navy · use pra "current"' },
        { name: 'TreeNode.count', label: 'number', description: 'Badge contador à direita' },
      ]}
      examples={[
        {
          title: 'Curso → Módulos → Aulas',
          preview: <TreeViewDemo />,
          code: `const nodes = [
  { id: 'curso-a', label: 'Curso · IA do zero', icon: <BookOpen />, count: 24,
    children: [
      { id: 'm1', label: 'Módulo 1 · Fundamentos', icon: <Folder />,
        children: [
          { id: 'a1', label: 'Aula 1', icon: <FileText /> },
          { id: 'a2', label: 'Aula 2', icon: <FileText /> },
          { id: 'a3', label: 'Aula 3', icon: <FileText />, highlighted: true },
        ]},
    ]},
];

<TreeView
  nodes={nodes}
  defaultExpanded={['curso-a', 'm1']}
  selected="a3"
  onSelect={setSelected}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra hierarquia profunda (3+ níveis)', description: 'Cursos, sitemap, taxonomia · expand/collapse organiza scanability.' },
          dont: { title: 'Não use pra lista flat', description: 'Use Sidebar ou Nav · TreeView adiciona chevron desnecessário.' },
        },
        {
          do: { title: 'highlighted="current" + selected="last-clicked"', description: 'Visualiza posição atual mesmo quando user clica em outro nó.' },
          dont: { title: 'Não exponha 100+ nós sem search', description: 'Pareie com Combobox/search · TreeView sozinho vira muralha.' },
        },
      ]}
      a11y={[
        <>role=tree + per-item role=treeitem + aria-level</>,
        <>aria-expanded=true|false em nós com children</>,
        <>aria-selected=true em selected · current também via aria-current</>,
        <>Keyboard: arrow cima/baixo navega · esq/dir expande/colapsa · Enter ativa onSelect</>,
        <>aria-level pra profundidade · screen reader anuncia "nível 3"</>,
      ]}
      related={[
        { name: 'Accordion', description: 'Pra grupos flat sem hierarquia profunda', href: '/api/accordion' },
        { name: 'DropdownMenu', description: 'Pra menu de ações · não navegação', href: '/api/dropdown-menu' },
      ]}
    />
  );
}
