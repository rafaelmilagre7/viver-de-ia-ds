import { EmptyState } from '../../lib/EmptyState/EmptyState';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Inbox } from 'lucide-react';

export default function ApiEmptyState() {
  return (
    <ComponentDoc
      eyebrow="api · empty-state"
      name="EmptyState"
      headline="placeholder editorial · ícone + título + ação"
      description="EmptyState pra listas/queries vazias. Ícone editorial (Lucide 20-24px) + title + description + ação primária (+ secondary opcional). Variants: default (centrado) ou compact (inline). Liquid glass leve + atmosphere."
      importLine={`import { EmptyState, type EmptyStateProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-empty', description: 'Container · stack vertical centrado · padding generoso' },
        { part: 'via-empty__icon', description: 'Ícone tile 48×48 · glass + atmosphere navy radial' },
        { part: 'via-empty__title', description: 'Título h3 editorial · navy-90' },
        { part: 'via-empty__description', description: 'Texto secundário · max-width 320 · navy-60' },
        { part: 'via-empty__actions', description: 'Stack horizontal · primary + secondary side-by-side' },
      ]}
      props={[
        { name: 'icon', type: 'ReactNode', description: 'Ícone (Lucide 20-24px) · vai no tile glass' },
        { name: 'title', type: 'ReactNode', required: true, description: 'Headline curto e direto · "Nenhuma mentoria agendada"' },
        { name: 'description', type: 'ReactNode', description: 'Explicação 1-2 frases · diz o porquê e o próximo passo' },
        { name: 'action', type: 'ReactNode', description: 'CTA primário · "Agendar agora"' },
        { name: 'secondary', type: 'ReactNode', description: 'CTA secundário · "Ver disponibilidades"' },
        { name: 'variant', type: "'default' | 'compact'", default: "'default'", description: 'default=centrado generoso · compact=inline em listas' },
        { name: 'className', type: 'string', description: 'Classe custom' },
      ]}
      examples={[
        {
          title: 'Empty state com ação primária + secundária',
          preview: (
            <EmptyState
              icon={<Inbox size={20} strokeWidth={1.8} />}
              title="Nenhuma mentoria agendada"
              description="Sua próxima sessão aparece aqui assim que o mentor confirmar o horário."
              action={<Button>Agendar agora</Button>}
              secondary={<Button variant="ghost">Ver disponibilidades</Button>}
            />
          ),
          code: `<EmptyState
  icon={<Inbox />}
  title="Nenhuma mentoria agendada"
  description="Sua próxima sessão aparece aqui assim que o mentor confirmar."
  action={<Button>Agendar agora</Button>}
  secondary={<Button variant="ghost">Ver disponibilidades</Button>}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Title diz o estado · description diz o porquê', description: '"Nada agendado" + "Aparece aqui quando mentor confirmar".' },
          dont: { title: 'Não use "Ops!" ou "Vazio!"', description: 'Empty state não é erro · use linguagem editorial sóbria.' },
        },
        {
          do: { title: 'Sempre ofereça caminho de saída', description: 'Action button · usuário não fica em beco sem saída.' },
          dont: { title: 'Não use EmptyState pra error 500', description: 'Use ErrorBoundary · estados diferentes.' },
        },
      ]}
      a11y={[
        <>Estrutura semântica · title é h3 (encaixa em hierarquia de heading)</>,
        <>Ícone com aria-hidden=true · texto duplica info</>,
        <>Action button com label completo · "Agendar agora" é melhor que "Ir"</>,
        <>Container não trava focus · normal flow de Tab</>,
      ]}
      related={[
        { name: 'Skeleton', description: 'Pra estado de loading (antes de saber se há dados)', href: '/api/skeleton' },
        { name: 'ErrorBoundary pattern', description: 'Pra erro real · empty state é só "sem dados"', href: '/patterns/errors' },
      ]}
    />
  );
}
