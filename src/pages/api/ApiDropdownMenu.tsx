import { DropdownMenu } from '../../lib/DropdownMenu/DropdownMenu';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { MoreHorizontal, Edit, Share2, Archive, Trash2 } from 'lucide-react';

function DropdownDemo() {
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" size="sm" aria-label="Mais opções">
          <MoreHorizontal size={16} strokeWidth={2} />
        </Button>
      }
      items={[
        { id: 'edit', label: 'Editar perfil', icon: <Edit size={13} /> },
        { id: 'share', label: 'Compartilhar', icon: <Share2 size={13} /> },
        { id: 'archive', label: 'Arquivar', icon: <Archive size={13} /> },
        { id: 'delete', label: 'Excluir', icon: <Trash2 size={13} />, destructive: true },
      ]}
    />
  );
}

export default function ApiDropdownMenu() {
  return (
    <ComponentDoc
      eyebrow="api · dropdown-menu"
      name="DropdownMenu"
      headline="context menu editorial · groups com separador · destructive"
      description="DropdownMenu pra ações contextuais (overflow ⋯). Suporta items planos ou groups com separator automático. Itens podem ter icon, shortcut, destructive variant. Glass + atmosphere + spring open. Keyboard arrow nav + Enter."
      importLine={`import { DropdownMenu, type DropdownMenuProps, type DropdownMenuItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-dropdown__trigger', description: 'Wrapper do elemento trigger · click toggle' },
        { part: 'via-dropdown__menu', description: 'Portal · glass + atmosphere · role=menu' },
        { part: 'via-dropdown__item', description: 'Item · icon left + label + shortcut right' },
        { part: 'via-dropdown__separator', description: 'Linha 1px navy-08 entre groups' },
        { part: 'destructive item', description: 'Vermelho · hover bg coral-08 · pra ações irreversíveis' },
      ]}
      props={[
        { name: 'trigger', type: 'ReactNode', required: true, description: 'Elemento que dispara · wrapped automaticamente' },
        { name: 'items', type: 'DropdownMenuItem[]', description: 'Items planos (sem groups)' },
        { name: 'groups', type: 'DropdownMenuGroup[]', description: 'Items agrupados com separator entre cada' },
        { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Alinhamento do menu vs trigger' },
        { name: 'ariaLabel', type: 'string', default: "'Menu'", description: 'Label do menu pra screen reader' },
        { name: 'className', type: 'string', description: 'Classe custom no container' },
      ]}
      sizes={[
        { name: 'DropdownMenuItem.id', label: 'string · obrigatório', description: 'Identificador único do item' },
        { name: 'DropdownMenuItem.label', label: 'ReactNode · obrigatório', description: 'Texto principal' },
        { name: 'DropdownMenuItem.icon', label: 'ReactNode', description: 'Ícone à esquerda (Lucide 13-14px)' },
        { name: 'DropdownMenuItem.shortcut', label: 'string', description: 'Atalho exibido à direita (⌘K, etc.)' },
        { name: 'DropdownMenuItem.destructive', label: 'boolean', description: 'Item vermelho · "Excluir", "Cancelar"' },
        { name: 'DropdownMenuItem.disabled', label: 'boolean', description: 'Bloqueado · opacity 0.5' },
        { name: 'DropdownMenuItem.onSelect', label: '() => void', description: 'Callback ao clicar/Enter' },
        { name: 'DropdownMenuGroup.label', label: 'string', description: 'Heading opcional do group' },
        { name: 'DropdownMenuGroup.items', label: 'DropdownMenuItem[]', description: 'Items do group' },
      ]}
      examples={[
        {
          title: 'Overflow menu com destructive',
          preview: <DropdownDemo />,
          code: `<DropdownMenu
  trigger={<Button aria-label="Mais opções"><MoreHorizontal /></Button>}
  items={[
    { id: 'edit',    label: 'Editar perfil',   icon: <Edit /> },
    { id: 'share',   label: 'Compartilhar',    icon: <Share2 /> },
    { id: 'archive', label: 'Arquivar',        icon: <Archive /> },
    { id: 'delete',  label: 'Excluir',         icon: <Trash2 />, destructive: true },
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use destructive pra ações irreversíveis', description: '"Excluir", "Sair da conta", "Cancelar assinatura".' },
          dont: { title: 'Não use destructive pra navegação', description: '"Ver detalhes" não é destructive · é apenas navegação.' },
        },
        {
          do: { title: 'Agrupe ações relacionadas', description: 'Edit/Share/Archive em group 1, Delete em group 2 (separator dá pausa visual).' },
          dont: { title: 'Não use mais de 7 items', description: '6+ vira lista vertical pesada · re-categorize em submenus ou outro padrão.' },
        },
      ]}
      a11y={[
        <>role=menu + per-item role=menuitem</>,
        <>Keyboard arrow esq/dir navega · Home/End primeira/última · Enter ativa · ESC fecha</>,
        <>Type-to-search · primeiras letras saltam pro item</>,
        <>Focus volta pro trigger ao fechar (focus management automático)</>,
        <>Destructive com aria-label complementar pra clareza ("Excluir item")</>,
      ]}
      related={[
        { name: 'ContextMenu', description: 'Mesmo padrão · disparado por right-click', href: '/api/context-menu' },
        { name: 'Popover', description: 'Floating panel arbitrário · não menu', href: '/api/popover' },
        { name: 'Command', description: 'Cmd+K palette · navegação keyboard-first', href: '/api/command' },
      ]}
    />
  );
}
