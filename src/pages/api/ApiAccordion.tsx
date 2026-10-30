import { Accordion } from '../../lib/Accordion/Accordion';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Accordion as meta } from './props.generated.json';

function AccordionDemo() {
  return (
    <div style={{ width: '100%' }}>
      <Accordion
        defaultOpen="q1"
        items={[
          {
            id: 'q1',
            title: 'Como funciona a mentoria?',
            content: (
              <p style={{ margin: 0, color: 'var(--via-text-body)', fontSize: 13.5, lineHeight: 1.65 }}>
                Sessão 1:1 de 45 min toda semana com mentor sênior · gravação fica disponível por 90 dias · acesso ao replay e às anotações em texto.
              </p>
            ),
          },
          {
            id: 'q2',
            title: 'Posso cancelar quando quiser?',
            content: (
              <p style={{ margin: 0, color: 'var(--via-text-body)', fontSize: 13.5, lineHeight: 1.65 }}>
                Sim · cancelamento em 1 clique · vale a partir do próximo ciclo · sem multa ou pegadinha.
              </p>
            ),
          },
          {
            id: 'q3',
            title: 'O mentor é fixo ou rotativo?',
            content: (
              <p style={{ margin: 0, color: 'var(--via-text-body)', fontSize: 13.5, lineHeight: 1.65 }}>
                Fixo · você escolhe na 1ª semana (3 conversas-piloto) · troca de mentor permitida a qualquer momento.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}

export default function ApiAccordion() {
  return (
    <ComponentDoc
      eyebrow="api · accordion"
      name="Accordion"
      headline="conteúdo que abre quando a pessoa pede."
      description="Expandir/colapsar editorial · FAQ-style · 2 variants. Accordion pra FAQ ou settings groups. Default: 1 aberto por vez (multiple=false). Altura anima por grid-template-rows 0fr→1fr (--via-dur-base, curva enter) e o item de baixo desliza junto; o painel só some do DOM acessível depois que a saída termina. 2 variants: default (sem borda) ou separated (cards individuais)."
      importLine={`import { Accordion, type AccordionProps, type AccordionItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-accordion', description: 'Container · stack vertical · borda top/bottom (default)' },
        { part: 'via-accordion__item', description: 'Card · button trigger + content collapsible' },
        { part: 'via-accordion__trigger', description: 'Button · title + ChevronDown rotate 0→180°' },
        { part: 'via-accordion__content', description: 'Painel · height spring + opacity fade' },
        { part: 'separated variant', description: 'Cada item vira card com glass + shadow stack' },
      ]}
      meta={meta}
      descriptions={{
        items: 'Array { id, title, content, disabled? }',
        defaultOpen: 'ID(s) inicialmente abertos · array se multiple=true',
        multiple: 'true = vários abertos simultâneos · false = FAQ-style',
        variant: 'separated=cards individuais glass · default=lista borderless',
        className: 'Classe custom no container',
      }}
      examples={[
        {
          title: 'FAQ de 3 perguntas · default open na 1ª',
          preview: <AccordionDemo />,
          code: `<Accordion
  defaultOpen="q1"
  items={[
    { id: 'q1', title: 'Como funciona?', content: <p>...</p> },
    { id: 'q2', title: 'Posso cancelar?', content: <p>...</p> },
    { id: 'q3', title: 'Mentor é fixo?', content: <p>...</p> },
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra FAQ longa', description: '6+ perguntas · usuário abre só o que interessa.' },
          dont: { title: 'Não use pra 2-3 itens curtos', description: 'Mostre direto · clicar pra revelar 1 linha de texto é fricção.' },
        },
        {
          do: { title: 'Title direto · sem ponto final', description: '"Como funciona?" > "Aqui você descobre como funciona."' },
          dont: { title: 'Não use accordion pra content essencial', description: 'Info crítica visível direto · accordion é pra secondary content.' },
        },
      ]}
      a11y={[
        <>Trigger com aria-expanded + aria-controls (panel id)</>,
        <>Panel com aria-labelledby (trigger id) + role=region</>,
        <>Keyboard: Tab navega · Enter/Space ativa · Home/End pula pro primeiro/último</>,
        <>Disabled items com aria-disabled=true · não recebem foco</>,
        <>Height transition respeita prefers-reduced-motion · vira instant</>,
      ]}
      related={[
        { name: 'Tabs', description: 'Conteúdo paralelo · 1 visível por vez', href: '/api/tabs' },
        { name: 'FAQ pattern', description: 'Implementação completa de FAQ com Accordion + busca', href: '/patterns/faq' },
      ]}
    />
  );
}
