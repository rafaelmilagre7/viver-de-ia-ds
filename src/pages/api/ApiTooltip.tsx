import { Tooltip } from '../../lib/Tooltip/Tooltip';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiTooltip() {
  return (
    <ComponentDoc
      eyebrow="api · tooltip"
      name="Tooltip"
      headline="contextual hint · navy gradient · 4 posições"
      description="Tooltip pra dicas curtas em ícones-only e ações ambíguas. Gradient navy→navy-deep · dual inset shadow · 4 stack box-shadow · animation spring 0.22s cubic-bezier(.16, 1, .3, 1). Hover/focus trigger · delay configurável."
      importLine={`import { Tooltip, type TooltipProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-tooltip-trigger', description: 'Wrapper do trigger · adiciona handlers hover/focus' },
        { part: 'via-tooltip', description: 'Bubble · gradient navy + shadow 4-stack + animation' },
      ]}
      props={[
        { name: 'children', type: 'ReactNode', required: true, description: 'Elemento trigger (button, icon, link)' },
        { name: 'content', type: 'ReactNode', required: true, description: 'Texto do tooltip · short (max ~40 chars)' },
        { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição relativa ao trigger' },
        { name: 'delay', type: 'number', default: '500', description: 'Delay antes de aparecer em ms' },
      ]}
      examples={[
        {
          title: 'Tooltip em ícone-only',
          description: 'Padrão · cobre acessibilidade de ícones sem label visível.',
          preview: (
            <>
              <Tooltip content="Adicionar membro">
                <Button size="sm" variant="ghost">+</Button>
              </Tooltip>
              <Tooltip content="Configurações">
                <Button size="sm" variant="ghost">⚙</Button>
              </Tooltip>
            </>
          ),
          code: `<Tooltip content="Adicionar membro">
  <Button size="sm" variant="ghost">+</Button>
</Tooltip>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use texto curto · max 40 chars', description: 'Tooltip não é parágrafo · é dica.' },
          dont: { title: 'Não use pra info crítica', description: 'Em mobile não tem hover · use Alert ou hint inline.' },
        },
      ]}
      a11y={[
        <>role=tooltip + aria-describedby automático no trigger</>,
        <>Aparece em hover E focus · não só hover (acessível teclado)</>,
        <>ESC fecha · não bloqueia foco do trigger</>,
        <>Reduced motion respeita preferência</>,
      ]}
      related={[
        { name: 'HoverCard', description: 'Card flutuante rico · suporta conteúdo complexo', href: '/api/hover-card' },
        { name: 'Popover', description: 'Click-trigger · conteúdo interativo', href: '/api/popover' },
      ]}
    />
  );
}
