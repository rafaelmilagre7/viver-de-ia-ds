import { useState } from 'react';
import { Slider } from './Slider';

export default { title: 'Slider' };

export const Default = () => {
  const [v, setV] = useState(48);
  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Slider value={v} onChange={setV} label="Volume da live" formatValue={(n) => `${n}%`} />
    </div>
  );
};

export const WithMarks = () => {
  const [v, setV] = useState(3);
  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Slider
        value={v}
        onChange={setV}
        min={1}
        max={5}
        step={1}
        label="Nível de profundidade"
        formatValue={(n) => `nível ${n}`}
        marks={[
          { value: 1, label: 'intro' },
          { value: 3, label: 'médio' },
          { value: 5, label: 'denso' },
        ]}
      />
    </div>
  );
};

export const Sizes = () => {
  const [a, setA] = useState(20);
  const [b, setB] = useState(50);
  const [c, setC] = useState(80);
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      <Slider size="sm" value={a} onChange={setA} label="Compacto" />
      <Slider size="md" value={b} onChange={setB} label="Médio" />
      <Slider size="lg" value={c} onChange={setC} label="Amplo" />
    </div>
  );
};
