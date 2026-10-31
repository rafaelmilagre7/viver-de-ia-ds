import { EmptyState } from '../../lib/EmptyState/EmptyState';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Inbox, Search, Compass } from 'lucide-react';
import { EmptyState as meta } from './props.generated.json';

export default function ApiEmptyState() {
  return (
    <ComponentDoc
      eyebrow="api · empty-state"
      name="EmptyState"
      headline="o vazio que aponta o próximo passo."
      description="Estado vazio editorial pra listas e buscas sem resultado: ícone (Lucide 20-24px), título, descrição e ação primária, com secundária opcional. Nasce claro: default (sem fundo) ou soft (vidro tracejado). A variante navy é opt-in, só pra momento de marca e sempre com ação."
      importLine={`import { EmptyState, type EmptyStateProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-empty-state', description: 'Container · pilha vertical centrada · role="status"' },
        { part: 'via-empty-state__icon', description: 'Ícone em tile 48×48 · degradê navy sutil + aro fino' },
        { part: 'via-empty-state__title', description: 'Título h3 editorial · texto primário' },
        { part: 'via-empty-state__description', description: 'Texto secundário · até 380px de largura' },
        { part: 'via-empty-state__actions', description: 'Linha de ações · primária + secundária lado a lado' },
      ]}
      meta={meta}
      descriptions={{
        icon: 'Ícone (Lucide 20-24px) · vai no tile',
        title: 'Título curto e direto · “Nenhuma mentoria agendada”',
        description: 'Explicação em 1-2 frases · diz o porquê e o próximo passo',
        action: 'Ação primária · “Agendar agora”',
        secondary: 'Ação secundária · “Ver disponibilidades”',
        variant: 'default = sem fundo (padrão) · soft = vidro com borda tracejada · navy = bloco escuro, opt-in pra momento de marca',
        className: 'Classe extra',
      }}
      examples={[
        {
          title: 'Padrão · ação primária + secundária',
          preview: (
            <EmptyState
              icon={<Inbox size={20} strokeWidth={1.75} />}
              title="Nenhuma mentoria agendada"
              description="Sua próxima sessão aparece aqui assim que a mentoria confirmar o horário."
              action={<Button>Agendar agora</Button>}
              secondary={<Button variant="ghost">Ver disponibilidades</Button>}
            />
          ),
          code: `<EmptyState
  icon={<Inbox />}
  title="Nenhuma mentoria agendada"
  description="Sua próxima sessão aparece aqui assim que a mentoria confirmar."
  action={<Button>Agendar agora</Button>}
  secondary={<Button variant="ghost">Ver disponibilidades</Button>}
/>`,
        },
        {
          title: 'Soft · busca sem resultado',
          preview: (
            <EmptyState
              variant="soft"
              icon={<Search size={20} strokeWidth={1.75} />}
              title="Nada encontrado pra “few-shot tuning”."
              description="Tente um termo mais curto ou confira a grafia."
              action={<Button variant="secondary">Limpar busca</Button>}
            />
          ),
          code: `<EmptyState
  variant="soft"
  icon={<Search />}
  title="Nada encontrado pra “few-shot tuning”."
  description="Tente um termo mais curto ou confira a grafia."
  action={<Button variant="secondary">Limpar busca</Button>}
/>`,
        },
        {
          title: 'Navy · só em momento de marca',
          preview: (
            <EmptyState
              variant="navy"
              icon={<Compass size={20} strokeWidth={1.75} />}
              title="Seu painel começa aqui"
              description="Faltam 2 passos pra liberar a trilha completa."
              action={<Button variant="secondary">Continuar pelo passo 2</Button>}
            />
          ),
          code: `// opt-in: primeiro acesso, conquista · sempre com ação
<EmptyState
  variant="navy"
  icon={<Compass />}
  title="Seu painel começa aqui"
  description="Faltam 2 passos pra liberar a trilha completa."
  action={<Button variant="secondary">Continuar pelo passo 2</Button>}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Título diz o estado · descrição diz o porquê', description: '“Nada agendado” + “Aparece aqui quando a mentoria confirmar”.' },
          dont: { title: 'Não use “Ops!” ou “Vazio!”', description: 'Estado vazio não é erro · use linguagem editorial sóbria.' },
        },
        {
          do: { title: 'Sempre ofereça caminho de saída', description: 'Uma ação clara · a pessoa não fica em beco sem saída.' },
          dont: { title: 'Não use EmptyState pra erro 500', description: 'Use a página de erro · são estados diferentes.' },
        },
        {
          do: { title: 'Claro por padrão', description: 'default ou soft em lista, busca e painel · o vazio acompanha o fundo da tela.' },
          dont: { title: 'Não use navy como fundo padrão', description: 'Navy só em momento de marca, com conteúdo e ação · nunca laje vazia.' },
        },
      ]}
      a11y={[
        <>Estrutura semântica · o título é h3 (encaixa na hierarquia de headings)</>,
        <>Ícone com aria-hidden=true · o texto já diz tudo</>,
        <>Ação com rótulo completo · “Agendar agora” é melhor que “Ir”</>,
        <>O container não prende o foco · Tab segue o fluxo normal</>,
      ]}
      related={[
        { name: 'Skeleton', description: 'Pra carregamento (antes de saber se há dados)', href: '/api/skeleton' },
        { name: 'Páginas de erro', description: 'Pra erro real · estado vazio é só “sem dados”', href: '/patterns/errors' },
      ]}
    />
  );
}
