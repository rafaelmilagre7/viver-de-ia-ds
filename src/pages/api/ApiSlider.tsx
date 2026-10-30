import { useState } from 'react';
import { Slider, type SliderProps } from '../../lib/Slider/Slider';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Slider as meta } from './props.generated.json';

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
      headline="um valor dentro de um intervalo."
      description="Range editorial · thumb radial · glow signature. Slider pra valores contínuos. Track gradient navy-10→06 + inset shadow profundo. Thumb com radial gradient + 5-layer shadow + spring hover 1.12. 3 tones (navy · accent · coral) e 3 sizes."
      importLine={`import { Slider, type SliderProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-slider', description: 'Container · label + track + value vertical stack' },
        { part: 'via-slider__track', description: 'Trilho · gradient navy-10→06 + inset shadow' },
        { part: 'via-slider__fill', description: 'Preenchimento · gradient + inset highlight + glow externo' },
        { part: 'via-slider__thumb', description: 'Knob · radial gradient white + spring 1.12 hover' },
      ]}
      meta={meta}
      playground={{
        initial: { value: 40, label: 'Volume da live', hint: '' },
        render: (v, set) => (
          <div style={{ width: '100%', maxWidth: 420 }}>
            <Slider {...(v as Partial<SliderProps>)} value={Number(v.value ?? 0)} onChange={(value) => set({ value })} />
          </div>
        ),
        codeProps: ['onChange={setValue}'],
      }}
      descriptions={{
        value: 'Valor atual (controlado)',
        onChange: 'Callback ao arrastar',
        min: 'Mínimo',
        max: 'Máximo',
        step: 'Incremento por movimento (1 = inteiro)',
        label: 'Label visível acima · pode incluir valor (template)',
        hint: 'Texto de apoio abaixo do track',
        showValue: 'Mostra o valor atual no fim do track',
        formatValue: 'Formata o valor exibido (ex.: n => `${n}%`)',
        tone: 'Tom semântico do fill',
        size: 'Track height · sm=2 / md=4 / lg=6',
        disabled: 'Bloqueia a interação',
        ariaLabel: 'Nome acessível quando não há label visível',
        marks: 'Marcas ao longo do track · { value, label? }',
        name: 'Nome do campo no envio de formulário',
        id: 'Id do input · gerado automaticamente se omitido',
      }}
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
