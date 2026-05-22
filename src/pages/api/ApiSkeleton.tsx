import { Skeleton } from '../../lib/Skeleton/Skeleton';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiSkeleton() {
  return (
    <ComponentDoc
      eyebrow="api · skeleton"
      name="Skeleton"
      headline="placeholder editorial · shimmer · 3 variants"
      description="Skeleton imita a forma do conteúdo final enquanto carrega. 3 variants: text (1+ linhas), circle (avatar), rect (card/image). Shimmer gradient 1.6s linear infinite. Sempre melhor que spinner pra layouts complexos."
      importLine={`import { Skeleton, type SkeletonProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-skeleton', description: 'Bloco · gradient navy-04 + shimmer ::before' },
        { part: 'variant text', description: 'Linhas de 1em altura · última pode ser 60% width (mimica parágrafo)' },
        { part: 'variant circle', description: 'border-radius 50% · pra avatars' },
        { part: 'variant rect', description: 'border-radius var(--via-radius-md) · pra cards/images' },
      ]}
      props={[
        { name: 'variant', type: "'text' | 'circle' | 'rect'", default: "'text'", description: 'Shape do skeleton' },
        { name: 'width', type: 'number | string', description: 'Largura · número em px ou string CSS (%)' },
        { name: 'height', type: 'number | string', description: 'Altura · número em px ou string CSS' },
        { name: 'lines', type: 'number', default: '1', description: 'Quantidade de linhas (só variant=text) · última 60% width automático' },
        { name: 'ariaLabel', type: 'string', default: "'Carregando'", description: 'Label pra screen reader' },
        { name: 'className', type: 'string', description: 'Classe custom' },
        { name: 'style', type: 'CSSProperties', description: 'Inline styles custom' },
      ]}
      examples={[
        {
          title: 'Mock de card · avatar + 3 linhas',
          preview: (
            <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 380, padding: 16, background: 'var(--via-surface-1)', borderRadius: 12, border: '1px solid var(--via-border)' }}>
              <Skeleton variant="circle" width={44} height={44} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" lines={2} />
              </div>
            </div>
          ),
          code: `<div className="card">
  <Skeleton variant="circle" width={44} height={44} />
  <div>
    <Skeleton variant="text" width="50%" />
    <Skeleton variant="text" lines={2} />
  </div>
</div>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use skeleton com shape do final', description: 'Avatar circle, title 50% width, body 2 lines · usuário "vê" o layout futuro.' },
          dont: { title: 'Não use skeleton genérico em tudo', description: 'Loading <100ms · skeleton pisca · é pior que sem nada.' },
        },
        {
          do: { title: 'Layout shift = 0', description: 'Skeleton tem mesmas dimensões do conteúdo final · nada pula quando carrega.' },
          dont: { title: 'Não use skeleton dentro de Spinner', description: 'Duplica feedback de loading · escolha um.' },
        },
      ]}
      a11y={[
        <>role=status + aria-busy=true · screen reader anuncia "carregando"</>,
        <>Shimmer animation respeita prefers-reduced-motion · vira opacity pulse</>,
        <>ariaLabel customizável · "Carregando lista de mentorias"</>,
        <>Skeleton substituído por conteúdo final · screen reader anuncia mudança</>,
      ]}
      related={[
        { name: 'Spinner', description: 'Loading inline simples · sem layout', href: '/api/spinner' },
        { name: 'Progress', description: 'Loading com valor conhecido', href: '/api/progress' },
        { name: 'EmptyState', description: 'Pra estado pós-carga sem dados', href: '/api/empty-state' },
      ]}
    />
  );
}
