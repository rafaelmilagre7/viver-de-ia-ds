import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

export default {
  title: 'Drawer',
};

export const RightSide = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir filtros (right)</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        size="md"
        title="Filtros"
        description="Refine a busca de mentees."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Limpar</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Aplicar</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Apenas ativos" defaultChecked />
          <Checkbox label="Sessões agendadas" />
          <Checkbox label="Pendências abertas" />
        </div>
      </Drawer>
    </>
  );
};

export const BottomSide = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir bottom sheet</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="bottom" size="md" title="Compartilhar">
        <p>Conteúdo do sheet · útil pra ações rápidas em mobile.</p>
      </Drawer>
    </>
  );
};
