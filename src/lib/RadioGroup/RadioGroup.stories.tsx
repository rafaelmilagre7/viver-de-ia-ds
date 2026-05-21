import { useState } from 'react';
import type { Story } from '@ladle/react';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';

export default {
  title: 'RadioGroup',
};

export const Default: Story<RadioGroupProps> = (props) => {
  const [v, setV] = useState('anual');
  return <RadioGroup {...props} value={v} onValueChange={setV} />;
};
Default.args = {
  ariaLabel: 'Plano',
  options: [
    { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês · cancele quando quiser.' },
    { value: 'anual', label: 'Anual · 2 meses grátis', description: 'R$ 2.900/ano · dedicado por trimestre.' },
    { value: 'corporate', label: 'Corporate · sob consulta', description: 'White-label + multi-tenant.' },
  ],
};
