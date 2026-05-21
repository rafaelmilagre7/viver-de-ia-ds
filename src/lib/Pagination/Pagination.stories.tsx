import { useState } from 'react';
import type { Story } from '@ladle/react';
import { Pagination, type PaginationProps } from './Pagination';

export default {
  title: 'Pagination',
};

export const Default: Story<PaginationProps> = (props) => {
  const [p, setP] = useState(props.page ?? 5);
  return <Pagination {...props} page={p} onPageChange={setP} />;
};
Default.args = {
  page: 5,
  totalPages: 42,
};
Default.argTypes = {
  totalPages: { control: { type: 'number', min: 1, max: 200 } },
  maxVisible: { control: { type: 'number', min: 3, max: 11 } },
};

export const Few = () => {
  const [p, setP] = useState(2);
  return <Pagination page={p} totalPages={4} onPageChange={setP} />;
};

export const Many = () => {
  const [p, setP] = useState(64);
  return <Pagination page={p} totalPages={128} onPageChange={setP} />;
};
