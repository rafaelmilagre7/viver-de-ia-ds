import { useState } from 'react';
import { Command } from '../../lib/Command/Command';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Abrir command palette ⌘K
      </Button>
      <Command
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          alert(`Selecionado: ${id}`);
          setOpen(false);
        }}
        placeholder="Buscar ação ou página…"
        groups={[
          {
            heading: 'Navegação',
            items: [
              { id: '/aluno', label: 'Aluno · jornada', keywords: 'platform student' },
              { id: '/mentorias', label: 'Mentorias · agenda', keywords: 'sessions' },
              { id: '/biblioteca', label: 'Biblioteca · materiais', keywords: 'docs' },
            ],
          },
          {
            heading: 'Ações',
            items: [
              { id: 'new-note', label: 'Nova nota', shortcut: 'N' },
              { id: 'export-data', label: 'Exportar dados', shortcut: 'E' },
              { id: 'settings', label: 'Abrir configurações', shortcut: ',' },
            ],
          },
        ]}
      />
    </>
  );
}

export default function ApiCommand() {
  return (
    <ComponentDoc
      eyebrow="api · command"
      name="Command"
      headline="cmd+k palette · keyboard-first · fuzzy filter live"
      description="Command palette estilo Cmd+K (Notion, Linear, VS Code). Input filtra items live por label + keywords. ↑↓ navega, Enter ativa, ESC fecha. Glass + atmosphere intenso · backdrop com blur 10px. Suporta groups com heading."
      importLine={`import { Command, type CommandProps, type CommandItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-command-root', description: 'Portal fixed · scrim radial + blur backdrop' },
        { part: 'via-command', description: 'Painel central · glass + atmosphere · spring open' },
        { part: 'via-command__input', description: 'Search input com icon left · letras grandes' },
        { part: 'via-command__list', description: 'Scroll vertical · groups + items' },
        { part: 'via-command__group-heading', description: 'Eyebrow uppercase navy-50 · separa categorias' },
        { part: 'via-command__item', description: 'Linha · label + shortcut · highlight selected' },
        { part: 'via-command__empty', description: 'Empty state quando query não match nada' },
      ]}
      props={[
        { name: 'open', type: 'boolean', required: true, description: 'Estado controlado · normalmente vem de useKbd("cmd+k")' },
        { name: 'onClose', type: '() => void', required: true, description: 'Callback close (ESC, scrim, após select)' },
        { name: 'onSelect', type: '(id: string) => void', required: true, description: 'Callback ao selecionar item · caller decide navegação' },
        { name: 'groups', type: 'CommandGroup[]', description: 'Items agrupados com heading' },
        { name: 'items', type: 'CommandItem[]', description: 'Items planos (sem heading) · vira group único sem label' },
        { name: 'placeholder', type: 'string', description: 'Placeholder do input · "Buscar ação ou página…"' },
        { name: 'emptyLabel', type: 'string', description: 'Mensagem quando query vazia · "Nenhum resultado"' },
      ]}
      sizes={[
        { name: 'CommandItem.id', label: 'string · obrigatório', description: 'Identificador (vira parâmetro do onSelect)' },
        { name: 'CommandItem.label', label: 'string · obrigatório', description: 'Texto principal · vira matchpoint do filtro' },
        { name: 'CommandItem.keywords', label: 'string', description: 'Termos extras pra filtro · sinônimos space-separated ("settings config preferências")' },
        { name: 'CommandItem.icon', label: 'ReactNode', description: 'Ícone à esquerda (Lucide 14px)' },
        { name: 'CommandItem.shortcut', label: 'string', description: 'Tecla(s) exibida(s) à direita · "⌘K", "N"' },
        { name: 'CommandGroup.heading', label: 'string', description: 'Heading uppercase do grupo' },
      ]}
      examples={[
        {
          title: 'Command palette com 2 groups',
          description: 'Abre via botão acima — em produção, conecte ao hook useKbd("cmd+k").',
          preview: <CommandDemo />,
          code: `const [open, setOpen] = useState(false);
useKbd('cmd+k', () => setOpen(true));

<Command
  open={open}
  onClose={() => setOpen(false)}
  onSelect={(id) => {
    setOpen(false);
    navigate(id);
  }}
  groups={[
    { heading: 'Navegação', items: [
      { id: '/aluno', label: 'Aluno · jornada' },
    ]},
    { heading: 'Ações', items: [
      { id: 'new-note', label: 'Nova nota', shortcut: 'N' },
    ]},
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use keywords pra sinônimos', description: '"Configurações" + keywords: ["settings", "config"] · ajuda match.' },
          dont: { title: 'Não use Command pra menu contextual', description: 'Use DropdownMenu · Command é palette global keyboard-first.' },
        },
        {
          do: { title: 'Shortcut visível ensina o atalho', description: '"Nova nota · N" · usuário aprende sem precisar tutorial.' },
          dont: { title: 'Não use shortcuts duplicados', description: '2 items com "N" gera conflito · keyboard navigation quebra.' },
        },
      ]}
      a11y={[
        <>role=dialog + aria-modal=true · focus trap automático</>,
        <>Input com aria-activedescendant aponta pro item highlighted</>,
        <>↑↓ navega · Enter ativa · ESC fecha · Tab fica dentro do dialog</>,
        <>Empty state com role=status pra screen reader anunciar</>,
        <>Type-ahead funciona via filtro live (todos items continuam no DOM)</>,
      ]}
      related={[
        { name: 'Combobox', description: 'Select + busca · escolha de valor', href: '/api/combobox' },
        { name: 'DropdownMenu', description: 'Menu de ações contextual · mouse + keyboard', href: '/api/dropdown-menu' },
        { name: 'Modal', description: 'Dialog focado · não palette', href: '/api/modal' },
      ]}
    />
  );
}
