import { useState } from 'react';
import { Sheet } from '../../lib/Sheet/Sheet';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir filtros (Sheet)</Button>
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Filtrar mentorias"
        description="Selecione período, status e mentor."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Aplicar filtros</Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--via-text-body)', fontSize: 13.5, lineHeight: 1.6 }}>
          Sheet é o irmão mobile do Drawer · entra de baixo · vem com handle grip de "arrastar pra fechar".
        </p>
      </Sheet>
    </>
  );
}

export default function ApiSheet() {
  return (
    <ComponentDoc
      eyebrow="api · sheet"
      name="Sheet"
      headline="bottom sheet mobile · handle grip · gesture-hint"
      description="Sheet é semanticamente bottom sheet mobile (vs Drawer side='bottom' que é mais formal). Vem com grip handle no topo (gesture-hint visual de 'arrasta pra fechar'). Use pra filtros rápidos, contextual actions, configurações mobile."
      importLine={`import { Sheet, type SheetProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-sheet-root', description: 'Portal fixed · scrim radial + blur backdrop' },
        { part: 'via-sheet', description: 'Painel · vem de baixo · spring + atmosphere' },
        { part: 'via-sheet__handle', description: 'Pill grip 36×4 · navy-30 · indicador visual mobile' },
        { part: 'via-sheet__head', description: 'Title + description (opcional) + close X' },
        { part: 'via-sheet__body', description: 'Conteúdo scrollável · padding generoso' },
        { part: 'via-sheet__footer', description: 'Ações sticky bottom · cancel + confirm' },
      ]}
      props={[
        { name: 'open', type: 'boolean', required: true, description: 'Estado controlado' },
        { name: 'onClose', type: '() => void', required: true, description: 'Callback close (ESC, scrim, X)' },
        { name: 'title', type: 'ReactNode', description: 'Título · vira h2 aria-labelledby' },
        { name: 'description', type: 'ReactNode', description: 'Descrição opcional sob title' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do body' },
        { name: 'footer', type: 'ReactNode', description: 'Ações sticky · cancel/confirm buttons' },
        { name: 'maxHeight', type: 'string', default: "'85vh'", description: 'Altura máxima do sheet' },
        { name: 'showHandle', type: 'boolean', default: 'true', description: 'Mostra grip handle no topo (gesture-hint)' },
      ]}
      examples={[
        {
          title: 'Sheet de filtros com footer actions',
          preview: <SheetDemo />,
          code: `const [open, setOpen] = useState(false);

<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Filtrar mentorias"
  description="Selecione período, status e mentor."
  footer={<><Button variant="ghost">Cancelar</Button><Button>Aplicar</Button></>}
>
  <FilterContent />
</Sheet>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra filtros/configurações mobile', description: 'Bottom sheet é UX padrão Android/iOS · handle grip familiar.' },
          dont: { title: 'Não use pra dialog crítico', description: 'Use Modal · Sheet pode ser fechado sem confirmação (gesture).' },
        },
        {
          do: { title: 'maxHeight=85vh deixa scrim respirável', description: 'Usuário vê parte do fundo · senso de "modal não destrutivo".' },
          dont: { title: 'Não use Sheet em desktop sem motivo', description: 'Drawer right/left é melhor em desktop · Sheet é mobile-first.' },
        },
      ]}
      a11y={[
        <>role=dialog + aria-modal=true · focus trap automático</>,
        <>ESC fecha · body scroll lock</>,
        <>Title conectado via aria-labelledby</>,
        <>Handle grip com aria-hidden=true · texto não duplica</>,
        <>Reduced motion: spring vira fade · sem slide-up</>,
      ]}
      related={[
        { name: 'Drawer', description: 'Versão "formal" desktop · 4 sides', href: '/api/drawer' },
        { name: 'Modal', description: 'Dialog focado central · sem gesture', href: '/api/modal' },
      ]}
    />
  );
}
