import { Breadcrumb } from '../../lib/Breadcrumb/Breadcrumb';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiBreadcrumb() {
  return (
    <ComponentDoc
      eyebrow="api · breadcrumb"
      name="Breadcrumb"
      headline="hierarquia editorial · chevron separator · last=current"
      description="Breadcrumb pra navegação hierárquica. Último item sem href = current page (aria-current=page). Separator default ChevronRight 12px. Items podem usar href OU onClick (não ambos). ARIA nav + ordered list."
      importLine={`import { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-breadcrumb', description: 'Nav semântica · aria-label customizável' },
        { part: 'via-breadcrumb__list', description: 'Ordered list horizontal · flex wrap em mobile' },
        { part: 'via-breadcrumb__item', description: 'Link · hover navy · current sem hover' },
        { part: 'via-breadcrumb__separator', description: 'ChevronRight 12px · navy-30 · aria-hidden' },
      ]}
      props={[
        { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Array { label, href?, onClick? } · último sem href = current' },
        { name: 'separator', type: 'ReactNode', description: 'Custom separator · default ChevronRight 12px' },
        { name: 'ariaLabel', type: 'string', default: "'Caminho de navegação'", description: 'Label do nav pra screen reader' },
        { name: 'className', type: 'string', description: 'Classe custom no container' },
      ]}
      examples={[
        {
          title: 'Hierarquia 3 níveis',
          preview: (
            <div style={{ width: '100%' }}>
              <Breadcrumb
                items={[
                  { label: 'Plataforma', href: '/' },
                  { label: 'Mentorias', href: '/mentorias' },
                  { label: 'Sessão 12' },
                ]}
              />
            </div>
          ),
          code: `<Breadcrumb
  items={[
    { label: 'Plataforma', href: '/' },
    { label: 'Mentorias', href: '/mentorias' },
    { label: 'Sessão 12' }, // sem href = current page
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use em hierarquia 3+ níveis', description: 'Helpa orientação em settings, docs, course platforms.' },
          dont: { title: 'Não use em flat navigation', description: 'Home / Login / Pricing · use Nav · breadcrumb não agrega.' },
        },
        {
          do: { title: 'Último sem href · current page', description: 'Aria-current=page automático · screen reader anuncia.' },
          dont: { title: 'Não linke pra página atual', description: 'Quebra contrato semântico · usuário acha que é navegação real.' },
        },
      ]}
      a11y={[
        <>nav role + aria-label customizável</>,
        <>Ordered list (ol) preserva semântica de ordem</>,
        <>Last item com aria-current="page" · screen reader anuncia "você está aqui"</>,
        <>Separator com aria-hidden=true · texto não é lido</>,
      ]}
      related={[
        { name: 'Stepper', description: 'Sequência obrigatória · não hierarquia', href: '/api/stepper' },
        { name: 'Pagination', description: 'Páginas numeradas · não breadcrumb', href: '/api/pagination' },
      ]}
    />
  );
}
