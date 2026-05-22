import { useState } from 'react';
import { Slider } from '../../lib/Slider/Slider';
import ComponentDoc from '../../components/docs/ComponentDoc';

function SliderDemo() {
  const [v, setV] = useState(40);
  return (
    <Slider
      value={v}
      onChange={setV}
      label={`Streak meta · ${v} dias`}
      min={0}
      max={90}
      step={1}
    />
  );
}

export default function ApiSlider() {
  return (
    <ComponentDoc
      eyebrow="api · slider"
      name="Slider"
      headline="range editorial · thumb radial · glow signature"
      description="Slider pra valores contínuos. Track gradient navy-10→06 + inset shadow profundo. Thumb com radial gradient + 5-layer shadow + spring hover 1.12. 3 tones (navy · accent · coral) e 3 sizes."
      importLine={`import { Slider, type SliderProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-slider', description: 'Container · label + track + value vertical stack' },
        { part: 'via-slider__track', description: 'Trilho · gradient navy-10→06 + inset shadow' },
        { part: 'via-slider__fill', description: 'Preenchimento · gradient + inset highlight + glow externo' },
        { part: 'via-slider__thumb', description: 'Knob · radial gradient white + spring 1.12 hover' },
      ]}
      props={[
        { name: 'value', type: 'number', required: true, description: 'Valor atual (controlado)' },
        { name: 'onChange', type: '(value: number) => void', required: true, description: 'Callback ao arrastar' },
        { name: 'min', type: 'number', default: '0', description: 'Mínimo' },
        { name: 'max', type: 'number', default: '100', description: 'Máximo' },
        { name: 'step', type: 'number', default: '1', description: 'Incremento por movimento (1 = inteiro)' },
        { name: 'label', type: 'string', description: 'Label visível acima · pode incluir valor (template)' },
        { name: 'tone', type: "'navy' | 'accent' | 'coral'", default: "'navy'", description: 'Tom semântico do fill' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height · sm=2 / md=4 / lg=6' },
      ]}
      examples={[
        {
          title: 'Slider com label dinâmica',
          preview: <SliderDemo />,
          code: `const [v, setV] = useState(40);

<Slider
  value={v}
  onChange={setV}
  label={\`Streak meta · \${v} dias\`}
  min={0}
  max={90}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra valor contínuo · 0-100', description: 'Volume, opacidade, streak goal, etc.' },
          dont: { title: 'Não use pra escolha binária', description: 'Use Switch pra on/off.' },
        },
      ]}
      a11y={[
        <>role=slider + aria-valuemin/max/now + aria-label</>,
        <>Keyboard arrow esq/dir = step · Page Up/Down = step×10 · Home/End = min/max</>,
        <>Touch + mouse + keyboard suportados</>,
        <>Reduced motion respeita preferência</>,
      ]}
      related={[
        { name: 'Progress', description: 'Mostra progresso · não editável', href: '/api/progress' },
        { name: 'Input type=number', description: 'Pra valores precisos · não scrubbing', href: '/api/input' },
      ]}
    />
  );
}
