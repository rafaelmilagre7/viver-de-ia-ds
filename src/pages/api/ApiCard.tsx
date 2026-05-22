import { Card } from '../../lib/Card/Card';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiCard() {
  return (
    <ComponentDoc
      eyebrow="api · card"
      name="Card"
      headline="superfície editorial · atmosphere by default · shine on hover"
      description="Container principal pra grouping editorial. 5 variants visuais (default · glass · atmospheric · featured · dark). Variant `hoverable` adiciona shine sweep + lift -3px. Atmosphere radial top-left sutil por default. Shadow stack 3-camadas."
      importLine={`import { Card, type CardProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-card', description: 'Container · border-radius lg · backdrop-blur · atmosphere radial via ::before' },
        { part: '::before (atmosphere)', description: 'Radial gradient navy-04 top-left · opacity 0.6 default → 1 no hover' },
        { part: '::after (shine sweep)', description: 'Só em via-card--hoverable · gradient branco diagonal' },
        { part: 'children', description: 'Conteúdo livre · padding default 22px×24px (use noPadding pra controle total)' },
      ]}
      props={[
        { name: 'variant', type: "'default' | 'glass' | 'atmospheric' | 'featured' | 'dark'", default: "'default'", description: 'Estilo visual. default=branco, dark=navy escuro com mesh' },
        { name: 'hoverable', type: 'boolean', default: 'false', description: 'Ativa hover lift + shine sweep diagonal' },
        { name: 'noPadding', type: 'boolean', default: 'false', description: 'Remove padding interno (use pra imagens fullbleed)' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do card' },
        { name: 'as', type: '"div" | "article" | "section" | "a"', default: '"div"', description: 'Tag HTML renderizada · use "a" pra card-link clicável inteiro' },
        { name: '...rest', type: 'HTMLAttributes', description: 'Aceita className extra, onClick, etc' },
      ]}
      variants={[
        { name: 'default', label: 'Branco editorial', description: 'Surface branca com border hairline · padrão de listagens' },
        { name: 'glass', label: 'Liquid glass', description: 'Branco translúcido com blur 20px · use sobre imagens ou mesh' },
        { name: 'atmospheric', label: 'Glass + atmosphere dupla', description: 'Mesma glass mas com 2 radials (top-left + bottom-right) · hero cards' },
        { name: 'featured', label: 'Destaque editorial', description: 'Glass + gradient strip navy→blue no topo · 1 por section MAX' },
        { name: 'dark', label: 'Navy escuro', description: 'Surface navy com mesh atmospheric · momento de peso visual' },
      ]}
      examples={[
        {
          title: 'Card default · listagem padrão',
          preview: (
            <Card>
              <h3 style={{ margin: 0, fontSize: 18, color: 'var(--via-navy)' }}>Mentoria · turma 2026.2</h3>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--via-ink-2)' }}>16 semanas com Caio · começa em 17 fev.</p>
            </Card>
          ),
          code: `<Card>
  <h3>Mentoria · turma 2026.2</h3>
  <p>16 semanas com Caio · começa em 17 fev.</p>
</Card>`,
        },
        {
          title: 'Card hoverable · clicável',
          description: 'Adiciona shine sweep + lift no hover. Combine com `as="a"` pra card-link inteiro.',
          preview: (
            <Card hoverable>
              <h3 style={{ margin: 0, fontSize: 18, color: 'var(--via-navy)' }}>Caso · Efizi</h3>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--via-ink-2)' }}>R$ 1.8M destravado em 6 meses.</p>
            </Card>
          ),
          code: `<Card hoverable as="a" href="/casos/efizi">
  <h3>Caso · Efizi</h3>
  <p>R$ 1.8M destravado em 6 meses.</p>
</Card>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use featured 1× por section', description: 'Destaca a peça editorial mais importante. Hierarquia clara.' },
          dont: { title: 'Não use 5 featured numa grid', description: 'Perde o propósito · todos competem por atenção igual.' },
        },
        {
          do: { title: 'hoverable em card-link', description: 'Indica que é clicável · feedback editorial sutil.' },
          dont: { title: 'Não use hoverable em card só de display', description: 'Engana usuário · sugere ação que não existe.' },
        },
      ]}
      a11y={[
        <>Default renderiza <code>&lt;div&gt;</code> · use <code>as="article"</code> pra cards de conteúdo isolado, <code>as="a"</code> pra card-link</>,
        <>Quando <code>as="a"</code>, mantenha texto descritivo · não use só "Saiba mais"</>,
        <>hoverable não adiciona role/tabindex · responsabilidade do consumer adicionar se necessário</>,
        <>Contraste interno responsabilidade do conteúdo · use tokens semânticos (--via-text-primary, --via-text-body)</>,
      ]}
      related={[
        { name: 'EmptyState', description: 'Card especial pra ausência de dados', href: '/api/empty-state' },
        { name: 'Modal', description: 'Card que sobe sobre scrim · ação focada', href: '/api/modal' },
      ]}
    />
  );
}
