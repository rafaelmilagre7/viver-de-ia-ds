import { Spinner } from '../../lib/Spinner/Spinner';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiSpinner() {
  return (
    <ComponentDoc
      eyebrow="api · spinner"
      name="Spinner"
      headline="loader inline · 3 sizes · 3 tones · ARIA live region"
      description="Spinner pra loading indeterminado. SVG dual-circle (track + head animado). Rotação 0.8s linear infinite. Pra loading determinístico (X% conhecido), use Progress."
      importLine={`import { Spinner, type SpinnerProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-spinner', description: 'Wrapper span · role=status · aria-live=polite' },
        { part: 'via-spinner__svg', description: 'SVG 24×24 · 2 circles concêntricos' },
        { part: 'via-spinner__track', description: 'Circle background · navy-10 alpha 30%' },
        { part: 'via-spinner__head', description: 'Arco animado · stroke-dasharray + rotação' },
        { part: 'via-spinner__label', description: 'Texto opcional à direita · pra contexto' },
      ]}
      props={[
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'sm=14 / md=20 / lg=28' },
        { name: 'tone', type: "'navy' | 'inverse' | 'soft'", default: "'navy'", description: 'navy=padrão editorial · inverse=em fundo navy · soft=secondary muted' },
        { name: 'label', type: 'string', description: 'Texto inline · "Carregando dashboard…"' },
        { name: 'className', type: 'string', description: 'Classe custom no wrapper' },
      ]}
      examples={[
        {
          title: '3 sizes com tones',
          preview: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Spinner size="sm" />
              <Spinner size="md" label="Carregando…" />
              <Spinner size="lg" tone="soft" />
            </div>
          ),
          code: `<Spinner size="sm" />
<Spinner size="md" label="Carregando…" />
<Spinner size="lg" tone="soft" />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra loading indeterminado', description: 'Não sabe quanto tempo vai durar · API call, file upload streaming.' },
          dont: { title: 'Não use pra loading >5s sem context', description: 'Usuário acha que travou · adicione label com progresso textual.' },
        },
        {
          do: { title: 'Label dá contexto', description: '"Carregando dashboard…" > spinner solo · screen reader anuncia.' },
          dont: { title: 'Não use 5 spinners simultâneos na tela', description: 'Use Skeleton · spinners agitam a tela toda em paralelo.' },
        },
      ]}
      a11y={[
        <>role=status + aria-live=polite · screen reader anuncia mudanças sem interromper</>,
        <>Label visualmente exposta também é lida (não duplica via aria-label)</>,
        <>SVG aria-hidden=true · informação vem do role + label</>,
        <>Rotação respeita prefers-reduced-motion · vira opacity pulse</>,
      ]}
      related={[
        { name: 'Progress', description: 'Loading determinístico · valor conhecido', href: '/api/progress' },
        { name: 'Skeleton', description: 'Loading com shape do conteúdo final', href: '/api/skeleton' },
      ]}
    />
  );
}
