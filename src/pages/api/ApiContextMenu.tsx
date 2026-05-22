import { ContextMenu } from '../../lib/ContextMenu/ContextMenu';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Edit, Copy, Archive, Trash2 } from 'lucide-react';

export default function ApiContextMenu() {
  return (
    <ComponentDoc
      eyebrow="api · context-menu"
      name="ContextMenu"
      headline="right-click menu · cursor-anchored · shortcuts inline"
      description="ContextMenu acionado por right-click (event nativo contextmenu). Posiciona no cursor · keyboard arrow nav · fecha em click fora, ESC ou seleção. Items podem ter icon, shortcut (display), separator, destructive variant."
      importLine={`import { ContextMenu, type ContextMenuProps, type ContextMenuOption } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'children wrapper', description: 'Captura contextmenu event · posiciona menu no cursor' },
        { part: 'via-context-menu', description: 'Portal · glass + atmosphere · role=menu' },
        { part: 'via-context-menu__item', description: 'icon + label + shortcut · hover bg navy-04' },
        { part: 'via-context-menu__separator', description: 'Linha 1px navy-08 (separatorBefore=true)' },
        { part: 'destructive variant', description: 'Coral · pra delete/cancel · semântico' },
      ]}
      props={[
        { name: 'children', type: 'ReactNode', required: true, description: 'Elemento que recebe right-click · wrapped automaticamente' },
        { name: 'items', type: 'ContextMenuOption[]', required: true, description: 'Items do menu (com separators inline)' },
        { name: 'label', type: 'string', description: 'aria-label do menu · "Ações do item"' },
      ]}
      sizes={[
        { name: 'ContextMenuOption.label', label: 'ReactNode · obrigatório', description: 'Texto do item' },
        { name: 'ContextMenuOption.onSelect', label: '() => void', description: 'Callback ao clicar / Enter' },
        { name: 'ContextMenuOption.icon', label: 'ReactNode', description: 'Ícone Lucide à esquerda (13-14px)' },
        { name: 'ContextMenuOption.shortcut', label: 'string', description: 'Atalho display-only · "⌘D"' },
        { name: 'ContextMenuOption.destructive', label: 'boolean', description: 'true = coral (pra "Excluir")' },
        { name: 'ContextMenuOption.disabled', label: 'boolean', description: 'Bloqueado · opacity 0.5' },
        { name: 'ContextMenuOption.separatorBefore', label: 'boolean', description: 'true = linha antes deste item' },
      ]}
      examples={[
        {
          title: 'Right-click numa área pra abrir',
          preview: (
            <ContextMenu
              items={[
                { label: 'Editar', icon: <Edit size={13} />, shortcut: '⌘E', onSelect: () => alert('Editar') },
                { label: 'Duplicar', icon: <Copy size={13} />, shortcut: '⌘D' },
                { label: 'Arquivar', icon: <Archive size={13} />, separatorBefore: true },
                { label: 'Excluir', icon: <Trash2 size={13} />, destructive: true },
              ]}
            >
              <div
                style={{
                  padding: 32,
                  textAlign: 'center',
                  background: 'var(--via-surface-1)',
                  border: '1px dashed var(--via-border)',
                  borderRadius: 12,
                  color: 'var(--via-text-muted)',
                  fontSize: 13,
                  width: '100%',
                  maxWidth: 360,
                }}
              >
                Click direito (ou ctrl+click) aqui
              </div>
            </ContextMenu>
          ),
          code: `<ContextMenu items={[
  { label: 'Editar',   icon: <Edit />,    shortcut: '⌘E', onSelect: edit },
  { label: 'Duplicar', icon: <Copy />,    shortcut: '⌘D' },
  { label: 'Arquivar', icon: <Archive />, separatorBefore: true },
  { label: 'Excluir',  icon: <Trash2 />,  destructive: true },
]}>
  <div>Click direito aqui</div>
</ContextMenu>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra ações contextuais por item', description: 'Right-click em row de tabela, message, file · ações específicas daquele item.' },
          dont: { title: 'Não use ContextMenu sem fallback mobile', description: 'Right-click não existe em touch · sempre pareie com botão "⋯" (DropdownMenu).' },
        },
        {
          do: { title: 'Shortcut display ensina', description: '"Excluir · Del" · usuário aprende atalhos sem tutorial.' },
          dont: { title: 'Não use ContextMenu como menu principal', description: 'Use Nav/DropdownMenu · context é por elemento específico.' },
        },
      ]}
      a11y={[
        <>role=menu + per-item role=menuitem</>,
        <>Keyboard arrow esq/dir navega · Home/End primeiro/último · Enter ativa · ESC fecha</>,
        <>Disabled items com aria-disabled=true</>,
        <>Destructive items com aria-label sufixo "(destrutivo)" pra clarity</>,
        <>Focus volta pro element pai ao fechar</>,
      ]}
      related={[
        { name: 'DropdownMenu', description: 'Mesmo padrão · disparado por click (overflow ⋯)', href: '/api/dropdown-menu' },
      ]}
    />
  );
}
