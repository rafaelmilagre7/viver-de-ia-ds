import { useState } from 'react';
import { DatePicker } from './DatePicker';

export default { title: 'DatePicker' };

export const Default = () => {
  const [d, setD] = useState<Date | null>(null);
  return (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <DatePicker value={d} onChange={setD} label="Data da próxima live" />
    </div>
  );
};

export const Constrained = () => {
  const [d, setD] = useState<Date | null>(null);
  const min = new Date();
  const max = new Date();
  max.setDate(max.getDate() + 30);
  return (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <DatePicker
        value={d}
        onChange={setD}
        label="Agendamento · próximos 30 dias"
        min={min}
        max={max}
      />
    </div>
  );
};
