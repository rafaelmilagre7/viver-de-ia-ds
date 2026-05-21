import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

export default {
  title: 'Popover',
};

export const Filtros = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        align="end"
        label="Filtros"
        trigger={
          <Button variant="secondary" iconLeft={<Filter size={13} strokeWidth={2.2} />} onClick={() => setOpen((o) => !o)}>
            Filtros
          </Button>
        }
      >
        <h4>Filtrar por</h4>
        <Checkbox label="Concluídos" />
        <Checkbox label="Em andamento" />
        <Checkbox label="Pendentes" />
      </Popover>
    </div>
  );
};

export const Sides = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
    <div style={{ padding: 120, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      <Popover open={open1} onOpenChange={setOpen1} side="top" trigger={<Button onClick={() => setOpen1((o) => !o)}>Top</Button>}>
        <p>Painel acima do trigger.</p>
      </Popover>
      <Popover open={open2} onOpenChange={setOpen2} side="bottom" trigger={<Button onClick={() => setOpen2((o) => !o)}>Bottom</Button>}>
        <p>Painel abaixo do trigger.</p>
      </Popover>
      <Popover open={open3} onOpenChange={setOpen3} side="left" trigger={<Button onClick={() => setOpen3((o) => !o)}>Left</Button>}>
        <p>Painel à esquerda.</p>
      </Popover>
      <Popover open={open4} onOpenChange={setOpen4} side="right" trigger={<Button onClick={() => setOpen4((o) => !o)}>Right</Button>}>
        <p>Painel à direita.</p>
      </Popover>
    </div>
  );
};
