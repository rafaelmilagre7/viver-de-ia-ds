import { useState } from 'react';
import { Combobox } from './Combobox';

export default {
  title: 'Combobox',
};

const cidades = [
  { value: 'sp', label: 'São Paulo · SP' },
  { value: 'rj', label: 'Rio de Janeiro · RJ' },
  { value: 'poa', label: 'Porto Alegre · RS' },
  { value: 'bh', label: 'Belo Horizonte · MG' },
  { value: 'cwb', label: 'Curitiba · PR' },
  { value: 'rec', label: 'Recife · PE' },
  { value: 'for', label: 'Fortaleza · CE' },
  { value: 'sal', label: 'Salvador · BA' },
];

export const Default = () => {
  const [v, setV] = useState<string | undefined>(undefined);
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        label="Cidade do evento"
        placeholder="Buscar cidade…"
        options={cidades}
        value={v}
        onValueChange={setV}
      />
    </div>
  );
};

export const WithSelection = () => {
  const [v, setV] = useState<string | undefined>('sp');
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        label="Cidade do evento"
        options={cidades}
        value={v}
        onValueChange={setV}
      />
    </div>
  );
};

export const Small = () => {
  const [v, setV] = useState<string | undefined>(undefined);
  return (
    <div style={{ maxWidth: 260 }}>
      <Combobox
        label="Cidade"
        size="sm"
        placeholder="Buscar…"
        options={cidades}
        value={v}
        onValueChange={setV}
      />
    </div>
  );
};
