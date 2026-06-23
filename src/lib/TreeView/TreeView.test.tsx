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

  it('roving tabindex: only the active row is tabbable (tabIndex 0), the rest are -1', () => {
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);
    // With no selection and nothing focused yet, the first visible row is the roving one.
    const buttons = screen.getAllByRole('treeitem').map((li) => li.querySelector('button')!);
    const cursoA = screen.getByText('Curso A').closest('button')!;
    expect(cursoA).toHaveAttribute('tabindex', '0');
    buttons
      .filter((b) => b !== cursoA)
      .forEach((b) => expect(b).toHaveAttribute('tabindex', '-1'));
  });

  it('roving tabindex: the selected row is the tabbable one when it is visible', () => {
    render(<TreeView nodes={nodes} selected="avulsa" />);
    expect(screen.getByText('Aula avulsa').closest('button')!).toHaveAttribute('tabindex', '0');
    expect(screen.getByText('Curso A').closest('button')!).toHaveAttribute('tabindex', '-1');
  });

  it('ArrowDown / ArrowUp move focus between VISIBLE rows', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);

    const cursoA = screen.getByText('Curso A').closest('button')!;
    cursoA.focus();
    expect(cursoA).toHaveFocus();

    // Down walks into the expanded children, then back out to the next top-level node.
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Aula 1').closest('button')!).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Aula 2').closest('button')!).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Curso B').closest('button')!).toHaveFocus();

    // Up reverses it.
    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('Aula 2').closest('button')!).toHaveFocus();
  });

  it('ArrowDown stops at the last visible row and ArrowUp stops at the first', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} />);

    const cursoA = screen.getByText('Curso A').closest('button')!;
    cursoA.focus();
    await user.keyboard('{ArrowUp}');
    expect(cursoA).toHaveFocus(); // already first, no wrap

    const avulsa = screen.getByText('Aula avulsa').closest('button')!;
    avulsa.focus();
    await user.keyboard('{ArrowDown}');
    expect(avulsa).toHaveFocus(); // already last, no wrap
  });

  it('Home / End jump to the first / last visible row', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);

    const aula1 = screen.getByText('Aula 1').closest('button')!;
    aula1.focus();
    await user.keyboard('{End}');
    expect(screen.getByText('Aula avulsa').closest('button')!).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByText('Curso A').closest('button')!).toHaveFocus();
  });

  it('ArrowRight on a collapsed parent expands it (focus stays on the parent)', async () => {
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onExpandedChange={onExpandedChange} />);

    const cursoA = screen.getByText('Curso A').closest('button')!;
    cursoA.focus();
    await user.keyboard('{ArrowRight}');

    expect(onExpandedChange).toHaveBeenCalledWith(['curso-a']);
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
    expect(cursoA).toHaveFocus();
  });

  it('ArrowRight on an already-expanded parent moves focus to its first child', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);

    const cursoA = screen.getByText('Curso A').closest('button')!;
    cursoA.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Aula 1').closest('button')!).toHaveFocus();
  });

  it('ArrowRight on a leaf does nothing', async () => {
    const onExpandedChange = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onExpandedChange={onExpandedChange} onSelect={onSelect} />);

    const avulsa = screen.getByText('Aula avulsa').closest('button')!;
    avulsa.focus();
    await user.keyboard('{ArrowRight}');

    expect(onExpandedChange).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
    expect(avulsa).toHaveFocus();
  });

  it('ArrowLeft on an expanded parent collapses it (focus stays on the parent)', async () => {
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TreeView nodes={nodes} defaultExpanded={['curso-a']} onExpandedChange={onExpandedChange} />,
    );

    const cursoA = screen.getByText('Curso A').closest('button')!;
    cursoA.focus();
    await user.keyboard('{ArrowLeft}');

    expect(onExpandedChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText('Aula 1')).not.toBeInTheDocument();
    expect(cursoA).toHaveFocus();
  });

  it('ArrowLeft on a child (or collapsed parent) moves focus to the parent', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} defaultExpanded={['curso-a']} />);

    const aula1 = screen.getByText('Aula 1').closest('button')!;
    aula1.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Curso A').closest('button')!).toHaveFocus();
  });

  it('ArrowLeft on a top-level collapsed/leaf row with no parent does nothing', async () => {
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onExpandedChange={onExpandedChange} />);

    const avulsa = screen.getByText('Aula avulsa').closest('button')!;
    avulsa.focus();
    await user.keyboard('{ArrowLeft}');

    expect(onExpandedChange).not.toHaveBeenCalled();
    expect(avulsa).toHaveFocus();
  });

  it('Enter activates/selects a row and toggles a parent', async () => {
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

  it('Space activates/selects a leaf row', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={nodes} onSelect={onSelect} />);

    screen.getByText('Aula avulsa').closest('button')!.focus();
    await user.keyboard(' ');

    expect(onSelect).toHaveBeenLastCalledWith('avulsa');
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
