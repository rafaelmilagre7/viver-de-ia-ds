import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualList } from './VirtualList';

/** Helper: builds a list of n string items "item-0", "item-1", … */
const makeItems = (n: number) => Array.from({ length: n }, (_, i) => `item-${i}`);

describe('<VirtualList />', () => {
  it('renders a role="list" with the default aria-label', () => {
    render(
      <VirtualList items={makeItems(3)} renderItem={(it) => <span>{it}</span>} />,
    );
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-label', 'Lista virtual');
  });

  it('honors a custom aria-label', () => {
    render(
      <VirtualList
        items={makeItems(3)}
        label="Notificações"
        renderItem={(it) => <span>{it}</span>}
      />,
    );
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Notificações');
  });

  it('renders every item as a role="listitem" for a small list', () => {
    render(
      <VirtualList items={makeItems(4)} renderItem={(it) => <span>{it}</span>} />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('item-0')).toBeInTheDocument();
    expect(screen.getByText('item-3')).toBeInTheDocument();
  });

  it('passes the absolute index as the second arg of renderItem', () => {
    render(
      <VirtualList
        items={makeItems(3)}
        renderItem={(it, index) => (
          <span>
            {it}@{index}
          </span>
        )}
      />,
    );
    expect(screen.getByText('item-0@0')).toBeInTheDocument();
    expect(screen.getByText('item-2@2')).toBeInTheDocument();
  });

  it('windows a large list: only the first slice is rendered at scrollTop=0', () => {
    // Defaults: itemHeight=48, height=400, overscan=5
    // visibleCount = ceil(400/48) = 9; startIndex = 0
    // endIndex = min(items.length, 0 + 9 + 5*2) = 19 -> 19 items rendered
    render(
      <VirtualList items={makeItems(1000)} renderItem={(it) => <span>{it}</span>} />,
    );
    const rendered = screen.getAllByRole('listitem');
    expect(rendered).toHaveLength(19);
    // first window is present, far-off items are not in the DOM
    expect(screen.getByText('item-0')).toBeInTheDocument();
    expect(screen.getByText('item-18')).toBeInTheDocument();
    expect(screen.queryByText('item-500')).not.toBeInTheDocument();
  });

  it('respects a custom itemHeight/height when computing the window', () => {
    // itemHeight=100, height=300 -> visibleCount = ceil(300/100) = 3
    // overscan=2 -> endIndex = min(n, 0 + 3 + 2*2) = 7 -> 7 items
    render(
      <VirtualList
        items={makeItems(50)}
        itemHeight={100}
        height={300}
        overscan={2}
        renderItem={(it) => <span>{it}</span>}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
  });

  it('positions each item absolutely at absoluteIndex * itemHeight', () => {
    render(
      <VirtualList
        items={makeItems(3)}
        itemHeight={48}
        renderItem={(it) => <span>{it}</span>}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveStyle({ position: 'absolute', top: '0px' });
    expect(items[1]).toHaveStyle({ top: '48px' });
    expect(items[2]).toHaveStyle({ top: '96px' });
  });

  it('sets the spacer total height to items.length * itemHeight', () => {
    const { container } = render(
      <VirtualList
        items={makeItems(10)}
        itemHeight={48}
        renderItem={(it) => <span>{it}</span>}
      />,
    );
    const total = container.querySelector('.via-vl__total') as HTMLElement;
    expect(total).toHaveStyle({ height: '480px' });
  });

  it('renders the emptyState (no list role) when items is empty', () => {
    render(
      <VirtualList
        items={[]}
        emptyState={<p>Sem notificações</p>}
        renderItem={(it) => <span>{String(it)}</span>}
      />,
    );
    expect(screen.getByText('Sem notificações')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('renders an empty list container (no items) when empty without emptyState', () => {
    render(<VirtualList items={[]} renderItem={(it) => <span>{String(it)}</span>} />);
    // Falls through to the list branch — list exists but holds zero items
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('does not call renderItem for items outside the rendered window', () => {
    const renderItem = vi.fn((it: string) => <span>{it}</span>);
    render(<VirtualList items={makeItems(1000)} renderItem={renderItem} />);
    // Only the windowed slice (19 items at scrollTop=0) should be rendered
    expect(renderItem).toHaveBeenCalledTimes(19);
  });

  it('re-renders the new window when the items array changes', () => {
    const { rerender } = render(
      <VirtualList items={makeItems(4)} renderItem={(it) => <span>{it}</span>} />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(4);

    rerender(
      <VirtualList items={makeItems(2)} renderItem={(it) => <span>{it}</span>} />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText('item-3')).not.toBeInTheDocument();
  });
});
