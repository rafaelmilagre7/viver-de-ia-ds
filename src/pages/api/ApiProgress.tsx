import { Progress, type ProgressProps } from '../../lib/Progress/Progress';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Progress as meta } from './props.generated.json';

export default function ApiProgress() {
  return (
    <ComponentDoc
      eyebrow="api · progress"
      name="Progress"
      headline="quanto falta, numa barra."
      description="Barra editorial · shimmer contínuo · 3 tones. Barra de progresso pra mostrar avanço determinístico. Track com gradient navy-10→06 + inset shadow. Fill com inset highlight + glow externo + shimmer light contínuo (2.4s ease-in-out infinite). 3 tones + 3 sizes."
      importLine={`import { Progress, type ProgressProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-progress', description: 'Container · label + value (opcional) + track' },
        { part: 'via-progress__head', description: 'Header · label à esq + value à dir' },
        { part: 'via-progress__track', description: 'Trilho · gradient navy alpha + inset shadow' },
        { part: 'via-progress__fill', description: 'Fill com a largura do trilho, deslizando por translateX (só compositor) + shimmer ::after' },
      ]}
      meta={meta}
      playground={{
        initial: { value: 64, label: 'Onboarding', showValue: true },
        render: (v) => (
          <div style={{ width: '100%', maxWidth: 420 }}>
            <Progress {...(v as Partial<ProgressProps>)} value={Number(v.value ?? 0)} />
          </div>
        ),
      }}
      descriptions={{
        value: 'Valor atual (0-100)',
        label: 'Label visível · pode incluir contexto ("Streak meta")',
        showValue: 'Mostra "X%" à direita do label',
        tone: 'Tom semantic do fill',
        size: 'Track height · sm=4 / md=6 / lg=10',
        ariaLabel: 'Nome acessível da barra · sem ele, usa o label se for texto',
        className: 'Classe extra no container',
      }}
      examples={[
        {
          title: '3 tones · 3 progress',
          preview: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <Progress value={72} label="Streak da semana" showValue tone="navy" />
              <Progress value={48} label="Cobertura testes" showValue tone="accent" />
              <Progress value={91} label="Erros corrigidos" showValue tone="coral" />
            </div>
          ),
          code: `<Progress value={72} label="Streak da semana" showValue tone="navy" />
<Progress value={48} label="Cobertura testes" showValue tone="accent" />
<Progress value={91} label="Erros corrigidos" showValue tone="coral" />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra progresso determinístico', description: 'Valor conhecido (72%, 4/5 steps, etc).' },
          dont: { title: 'Não use pra loading indeterminado', description: 'Use Spinner · barra sem valor confunde.' },
        },
      ]}
      a11y={[
        <>role=progressbar + aria-valuenow/min/max</>,
        <>Label conectada via aria-label · readers anunciam progresso</>,
        <>Shimmer respeita prefers-reduced-motion · desativa</>,
      ]}
      related={[
        { name: 'Spinner', description: 'Loading indeterminado', href: '/components/states' },
        { name: 'Stepper', description: 'Progresso discreto · etapas nomeadas', href: '/components/stepper' },
      ]}
    />
  );
}
