import { Calendar } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

export default {
  title: 'Tooltip',
};

export const AllSides = () => (
  <div style={{ display: 'flex', gap: 40, padding: 60, justifyContent: 'center' }}>
    <Tooltip content="Topo · padrão editorial" side="top">
      <Button variant="secondary" size="sm">Top</Button>
    </Tooltip>
    <Tooltip content="Esquerda" side="left">
      <Button variant="secondary" size="sm">Left</Button>
    </Tooltip>
    <Tooltip content="Direita" side="right">
      <Button variant="secondary" size="sm">Right</Button>
    </Tooltip>
    <Tooltip content="Embaixo · útil pra navs" side="bottom">
      <Button variant="secondary" size="sm">Bottom</Button>
    </Tooltip>
    <Tooltip content="Adicionar ao calendário">
      <Button variant="ghost" iconLeft={<Calendar size={13} />}>{' '}</Button>
    </Tooltip>
  </div>
);
