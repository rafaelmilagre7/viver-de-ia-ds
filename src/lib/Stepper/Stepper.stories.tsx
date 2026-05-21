import { useState } from 'react';
import { Stepper } from './Stepper';

export default {
  title: 'Stepper',
};

const steps = [
  { id: 'profile', label: 'Perfil', description: 'Quem é você' },
  { id: 'role', label: 'Função', description: 'Onde atua' },
  { id: 'plan', label: 'Plano', description: 'Como vamos te apoiar' },
  { id: 'confirm', label: 'Confirmar', description: 'Tudo certo' },
];

export const Horizontal = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Stepper current={current} steps={steps} onStepClick={setCurrent} />
      <button
        type="button"
        onClick={() => setCurrent((c) => Math.min(c + 1, steps.length - 1))}
        style={{
          alignSelf: 'flex-start',
          padding: '6px 14px',
          borderRadius: 8,
          border: '1px solid var(--via-border)',
          background: 'var(--via-navy)',
          color: 'var(--via-white)',
          fontFamily: 'var(--via-font)',
          fontSize: 12.5,
          cursor: 'pointer',
        }}
      >
        Avançar
      </button>
    </div>
  );
};

export const Vertical = () => (
  <Stepper orientation="vertical" current={2} steps={steps} />
);
