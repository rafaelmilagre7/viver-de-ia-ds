import { HoverCard } from '../../lib/HoverCard/HoverCard';
import { Avatar } from '../../lib/Avatar/Avatar';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiHoverCard() {
  return (
    <ComponentDoc
      eyebrow="api · hover-card"
      name="HoverCard"
      headline="rich preview · hover/focus · 4 sides × 3 align"
      description="HoverCard mostra preview rico ao passar mouse no trigger. Diferente de Tooltip (texto simples) e Popover (click). Use pra: preview de @username, info adicional em link, card de mentor. openDelay/closeDelay configuráveis."
      importLine={`import { HoverCard, type HoverCardProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-hovercard__trigger', description: 'Inline · onMouseEnter / onFocus dispara' },
        { part: 'via-hovercard__panel', description: 'Portal · glass + atmosphere + spring' },
        { part: 'openDelay', description: 'Delay antes de mostrar (evita flicker em hover passageiro)' },
        { part: 'closeDelay', description: 'Delay antes de esconder (permite mover mouse pro card)' },
      ]}
      props={[
        { name: 'trigger', type: 'ReactNode', required: true, description: 'Elemento que dispara hover/focus' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do card flutuante' },
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Lado preferido vs trigger' },
        { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alinhamento eixo cruzado' },
        { name: 'openDelay', type: 'number', default: '300', description: 'Ms antes de abrir · evita flicker' },
        { name: 'closeDelay', type: 'number', default: '200', description: 'Ms antes de fechar · permite mouse-move pro card' },
      ]}
      examples={[
        {
          title: 'Preview de mentor em @username',
          preview: (
            <p style={{ margin: 0, fontSize: 14 }}>
              Conversei com{' '}
              <HoverCard
                trigger={<a href="#" style={{ color: 'var(--via-text-primary)', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 2 }}>@caioribeiro</a>}
                side="bottom"
                align="start"
              >
                <div style={{ display: 'flex', gap: 12, minWidth: 260 }}>
                  <Avatar initials="CR" alt="Caio Ribeiro" size="md" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <strong style={{ fontSize: 14 }}>Caio Ribeiro</strong>
                    <em style={{ fontSize: 12, color: 'var(--via-text-muted)' }}>Fundador · Viver de IA</em>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--via-text-body)' }}>220 mentorados desde 2024</p>
                  </div>
                </div>
              </HoverCard>{' '}
              ontem sobre o lançamento.
            </p>
          ),
          code: `<HoverCard
  trigger={<a>@caioribeiro</a>}
  side="bottom"
>
  <Avatar name="Caio Ribeiro" />
  <strong>Caio Ribeiro</strong>
  <em>Fundador · Viver de IA</em>
  <p>220 mentorados desde 2024</p>
</HoverCard>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra preview rico que ajuda decisão', description: '@username, link externo, mentor card · info útil sem deixar a página.' },
          dont: { title: 'Não use em mobile-only flows', description: 'Hover não existe no touch · use Popover ou Sheet pra mobile.' },
        },
        {
          do: { title: 'Conteúdo enxuto · 3-5 elementos', description: 'Card lê em 1-2s · scan rápido.' },
          dont: { title: 'Não use HoverCard pra conteúdo crítico', description: 'Some quando mouse sai · não confiável.' },
        },
      ]}
      a11y={[
        <>Acessível por keyboard via focus (não só mouse)</>,
        <>role=dialog · aria-modal=false · não trap focus</>,
        <>Reduced motion: spring vira fade · openDelay reduzido</>,
        <>Trigger mantém semântica original (a, button, etc.)</>,
      ]}
      related={[
        { name: 'Tooltip', description: 'Texto simples · sem layout complexo', href: '/api/tooltip' },
        { name: 'Popover', description: 'Click-triggered · interativo', href: '/api/popover' },
      ]}
    />
  );
}
