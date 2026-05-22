import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('<Pagination />', () => {
  it('does not render when totalPages <= 1', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders page buttons', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /1/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /5/ })).toBeInTheDocument();
  });

  it('marks current page with aria-current', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />);
    const current = screen.getByRole('button', { current: 'page' });
    expect(current).toHaveTextContent('3');
  });

  it('disables prev on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    const prev = screen.getByRole('button', { name: /anterior|previous/i });
    expect(prev).toBeDisabled();
  });

  it('disables next on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    const next = screen.getByRole('button', { name: /próxima|next/i });
    expect(next).toBeDisabled();
  });

  it('calls onPageChange on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={1} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Página 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
