import { MoreHorizontal, Edit, Share2, Trash2, Copy, Archive, Download } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from '../Button/Button';

export default {
  title: 'DropdownMenu',
};

export const Flat = () => (
  <DropdownMenu
    trigger={
      <Button variant="ghost" iconLeft={<MoreHorizontal size={14} />} aria-label="Mais opções" />
    }
    items={[
      { id: 'edit', label: 'Editar perfil', icon: <Edit size={13} strokeWidth={2} />, shortcut: '⌘E' },
      { id: 'share', label: 'Compartilhar', icon: <Share2 size={13} strokeWidth={2} /> },
      { id: 'copy', label: 'Copiar link', icon: <Copy size={13} strokeWidth={2} />, shortcut: '⌘C' },
      { id: 'delete', label: 'Excluir', icon: <Trash2 size={13} strokeWidth={2} />, destructive: true },
    ]}
  />
);

export const Grouped = () => (
  <DropdownMenu
    trigger={
      <Button variant="secondary" iconLeft={<MoreHorizontal size={14} />}>
        Ações
      </Button>
    }
    groups={[
      {
        id: 'edit',
        label: 'Editar',
        items: [
          { id: 'edit', label: 'Editar perfil', icon: <Edit size={13} strokeWidth={2} />, shortcut: '⌘E' },
          { id: 'archive', label: 'Arquivar', icon: <Archive size={13} strokeWidth={2} /> },
        ],
      },
      {
        id: 'share',
        label: 'Compartilhar',
        items: [
          { id: 'share', label: 'Compartilhar link', icon: <Share2 size={13} strokeWidth={2} /> },
          { id: 'download', label: 'Exportar CSV', icon: <Download size={13} strokeWidth={2} /> },
        ],
      },
      {
        id: 'danger',
        items: [
          { id: 'delete', label: 'Excluir conta', icon: <Trash2 size={13} strokeWidth={2} />, destructive: true },
        ],
      },
    ]}
  />
);

export const EndAligned = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <DropdownMenu
      align="end"
      trigger={<Button variant="ghost" iconLeft={<MoreHorizontal size={14} />} aria-label="Mais opções" />}
      items={[
        { id: 'edit', label: 'Editar', icon: <Edit size={13} strokeWidth={2} /> },
        { id: 'delete', label: 'Excluir', icon: <Trash2 size={13} strokeWidth={2} />, destructive: true },
      ]}
    />
  </div>
);
