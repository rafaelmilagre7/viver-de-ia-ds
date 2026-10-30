import { EmptyState } from '../../lib/EmptyState/EmptyState';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Inbox } from 'lucide-react';
import { EmptyState as meta } from './props.generated.json';

export default function ApiEmptyState() {
  return (
    <ComponentDoc
      eyebrow="api · empty-state"
      name="EmptyState"
      headline="o vazio que aponta o próximo passo."
      description="Placeholder editorial · ícone + título + ação. EmptyState pra listas/queries vazias. Ícone editorial (Lucide 20-24px) + title + description + ação primária (+ secondary opcional). Variants: default (sem fundo), soft (vidro tracejado) ou navy (bloco escuro). Liquid glass leve + atmosphere."
      importLine={`import { EmptyState, type EmptyStateProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-empty', description: 'Container · stack vertical centrado · padding generoso' },
        { part: 'via-empty__icon', description: 'Ícone tile 48×48 · glass + atmosphere navy radial' },
        { part: 'via-empty__title', description: 'Título h3 editorial · navy-90' },
        { part: 'via-empty__description', description: 'Texto secundário · max-width 320 · navy-60' },
        { part: 'via-empty__actions', description: 'Stack horizontal · primary + secondary side-by-side' },
      ]}
      meta={meta}
      descriptions={{
        icon: 'Ícone (Lucide 20-24px) · vai no tile glass',
        title: 'Headline curto e direto · "Nenhuma mentoria agendada"',
        description: 'Explicação 1-2 frases · diz o porquê e o próximo passo',
        action: 'CTA primário · "Agendar agora"',
        secondary: 'CTA secundário · "Ver disponibilidades"',
        variant: 'default=sem fundo · soft=vidro com borda tracejada · navy=bloco navy escuro',
        className: 'Classe custom',
      }}
      examples={[
        {
          title: 'Empty state com ação primária + secundária',
          preview: (
            <EmptyState
              icon={<Inbox size={20} strokeWidth={1.75} />}
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
