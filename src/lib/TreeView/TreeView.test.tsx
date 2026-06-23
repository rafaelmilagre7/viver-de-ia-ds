import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeView, type TreeNode } from './TreeView';

const nodes: TreeNode[] = [
  {
    id: 'curso-a',
    label: 'Curso A',
    count: 2,
    children: [
      { id: 'a1', label: 'Aula 1' },
      { id: 'a2', label: 'Aula 2' },
    ],
  },
  {
    id: 'curso-b',
    label: 'Curso B',
    highlighted: true,
    children: [{ id: 'b1', label: 'Aula B1' }],
  },
  { id: 'avulsa', label: 'Aula avulsa' },
];

describe('<TreeView />', () => {
  it('renders a tree with the given aria-label and all top-level items', () => {
    render(<TreeView nodes={nodes} label="Catálogo" />);
    const tree = screen.getByRole('tree', { name: 'Catálogo' });
    expect(tree).toBeInTheDocument();

    expect(screen.getByText('Curso A')).toBeInTheDocument();
    expect(screen.getByText('Curso B')).toBeInTheDocument();
    expect(screen.getByText('Aula avulsa')).toBeInTheDocument();
  });

  it('keeps children collapsed by default (not in the DOM)', () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.queryByText('Aula 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Aula 2')).not.toBeInTheDocument();
    // a parent reports aria-expanded=false; a leaf has no aria-expanded
    const parent = screen.getByText('Curso A').closest('[role="treeitem"]')!;
    expect(parent).toHaveAttribute('aria-expanded', 'false');
    const leaf = screen.getByText('Aula avulsa').closest('[role="treeitem"]')!;
    expect(leaf).not.toHaveAttribute('aria-expanded');
  });

  it('honors defaultExpanded on first render', () => {
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
    expect(screen.getByText('Aula 2')).toBeInTheDocument();
    expect(screen.getByText('Curso A').closest('[role="treeitem"]')!).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    // a group wrapper exists for the expanded children
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('clicking a parent row expands it, clicking again collapses it', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} />);

    await user.click(screen.getByText('Curso A'));
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
    expect(screen.getByText('Curso A').closest('[role="treeitem"]')!).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await user.click(screen.getByText('Curso A'));
    expect(screen.queryByText('Aula 1')).not.toBeInTheDocument();
    expect(screen.getByText('Curso A').closest('[role="treeitem"]')!).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('clicking any row (parent or leaf) fires onSelect with its id', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onSelect={onSelect} />);

    await user.click(screen.getByText('Aula avulsa'));
    expect(onSelect).toHaveBeenLastCalledWith('avulsa');

    // a parent both toggles AND selects in the same click
    await user.click(screen.getByText('Curso A'));
    expect(onSelect).toHaveBeenLastCalledWith('curso-a');
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
  });

  it('reflects the selected prop via aria-selected', () => {
    render(<TreeView nodes={nodes} selected="avulsa" />);
    expect(screen.getByText('Aula avulsa').closest('[role="treeitem"]')!).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Curso A').closest('[role="treeitem"]')!).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('controlled expansion: onExpandedChange fires but the tree does not self-expand', async () => {
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <TreeView nodes={nodes} expanded={[]} onExpandedChange={onExpandedChange} />,
    );

    await user.click(screen.getByText('Curso A'));
    // callback receives the requested next set, but DOM stays collapsed until parent re-renders
    expect(onExpandedChange).toHaveBeenCalledWith(['curso-a']);
    expect(screen.queryByText('Aula 1')).not.toBeInTheDocument();

    // parent confirms the change
    rerender(
      <TreeView nodes={nodes} expanded={['curso-a']} onExpandedChange={onExpandedChange} />,
    );
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
  });

  it('renders the count badge for nodes that have one', () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders an icon when provided', () => {
    const withIcon: TreeNode[] = [
      { id: 'x', label: 'Com ícone', icon: <span data-testid="leaf-icon">★</span> },
    ];
    render(<TreeView nodes={withIcon} />);
    expect(screen.getByTestId('leaf-icon')).toBeInTheDocument();
  });

  it('renders nothing but the empty tree container when nodes is empty', () => {
    render(<TreeView nodes={[]} label="Vazio" />);
    const tree = screen.getByRole('tree', { name: 'Vazio' });
    expect(tree).toBeInTheDocument();
    expect(screen.queryAllByRole('treeitem')).toHaveLength(0);
  });

  it('arrow keys do nothing (no tree keyboard navigation is wired up)', async () => {
    // The docstring advertises "keyboard arrow nav" but the component attaches no
    // onKeyDown handler. Arrow keys neither move focus nor expand/collapse. Asserting
    // the real current behavior (this is a known a11y gap — see bugsFound).
    const onSelect = vi.fn();
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onSelect={onSelect} onExpandedChange={onExpandedChange} />);

    const firstRow = screen.getByText('Curso A').closest('button')!;
    firstRow.focus();
    await user.keyboard('{ArrowDown}{ArrowRight}{ArrowLeft}{ArrowUp}');

    expect(onExpandedChange).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.queryByText('Aula 1')).not.toBeInTheDocument();
  });

  it('native Enter on a focused parent row activates it (default button behavior)', async () => {
    // Rows are <button>s, so Enter/Space activate via the browser default, firing onClick.
    const onSelect = vi.fn();
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onSelect={onSelect} onExpandedChange={onExpandedChange} />);

    screen.getByText('Curso A').closest('button')!.focus();
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenLastCalledWith('curso-a');
    expect(onExpandedChange).toHaveBeenCalledWith(['curso-a']);
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
  });

  it('every treeitem is a tree descendant and parents nest children under role=group', () => {
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);
    const tree = screen.getByRole('tree');
    const group = screen.getByRole('group');
    // the group lives inside the parent treeitem, which lives inside the tree
    expect(tree).toContainElement(group);
    expect(group).toContainElement(screen.getByText('Aula 1'));
  });
});
