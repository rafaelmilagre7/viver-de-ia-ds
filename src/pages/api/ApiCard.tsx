import { Card, type CardProps } from '../../lib/Card/Card';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Card as meta } from './props.generated.json';

export default function ApiCard() {
  return (
    <ComponentDoc
      eyebrow="api · card"
      name="Card"
      headline="papel por padrão, vidro quando precisa."
      description="Papel por padrão · vidro regular em glass/atmospheric/featured · reflexo no hover. Container principal pra grouping editorial. 5 variants visuais: default (superfície sólida, papel) · glass, atmospheric e featured (material regular do vidro líquido, com aro especular) · dark (mesh navy). `hoverable` adiciona lift -3px + reflexo que segue o ponteiro (só transform/opacity, só mouse)."
      importLine={`import { Card, type CardProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-card', description: 'Container · border-radius lg · sólido no default · material regular (fill + blur + ring + sombra) nas variantes de vidro' },
        { part: '::before (reflexo)', description: 'Só em via-card--hoverable · mancha de luz que segue o ponteiro por transform · acende por opacity' },
        { part: '::after (aro especular)', description: 'Variantes de vidro · gradiente mascarado no anel de 1px (forte no canto de cima à esquerda)' },
        { part: 'children', description: 'Conteúdo livre · padding default 22px×24px (use noPadding pra controle total)' },
      ]}
      meta={meta}
      playground={{
        initial: { children: 'Plano Pro · 10 check-ins de mentoria por mês' },
        render: (v) => <Card {...(v as CardProps)} style={{ maxWidth: 360 }} />,
      }}
      descriptions={{
        variant: 'Estilo visual. default=branco, dark=navy escuro com mesh',
        hoverable: 'Ativa hover lift + reflexo que segue o ponteiro',
        noPadding: 'Remove padding interno (use pra imagens fullbleed)',
        children: 'Conteúdo do card',
        as: 'Tag HTML renderizada · article, div ou section',
        '...rest': 'Aceita className extra, onClick, etc',
      }}
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
              <h3 style={{ margin: 0, fontSize: 18, color: 'var(--via-text-primary)' }}>Plano Pro · mentoria em grupo</h3>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--via-ink-2)' }}>10 check-ins por mês · contratação anual.</p>
            </Card>
          ),
          code: `<Card>
  <h3>Plano Pro · mentoria em grupo</h3>
  <p>10 check-ins por mês · contratação anual.</p>
</Card>`,
        },
        {
          title: 'Card hoverable · clicável',
          description: 'Adiciona lift + reflexo que segue o ponteiro no hover. Combine com `as="a"` pra card-link inteiro.',
          preview: (
            <Card hoverable>
              <h3 style={{ margin: 0, fontSize: 18, color: 'var(--via-text-primary)' }}>Caso · Trivia Studio</h3>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--via-ink-2)' }}>R$ 120.000 de economia anual.</p>
            </Card>
          ),
          code: `<Card hoverable as="a" href="/casos/trivia-studio">
  <h3>Caso · Trivia Studio</h3>
  <p>R$ 120.000 de economia anual.</p>
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
