import { useState } from 'react';
import { Drawer } from '../../lib/Drawer/Drawer';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Notificações"
        description="Você tem 4 atualizações desde a última visita."
        side="right"
        size="md"
      >
        <p style={{ margin: 0, color: 'var(--via-text)', fontSize: 13.5, lineHeight: 1.6 }}>
          Use Drawer pra fluxos secundários · filtros, configurações, detalhes laterais.
          Diferente de Modal: você pode interagir com o conteúdo de fundo em alguns casos.
        </p>
      </Drawer>
    </>
  );
}

export default function ApiDrawer() {
  return (
    <ComponentDoc
      eyebrow="api · drawer"
      name="Drawer"
      headline="painel lateral editorial · scrim radial · atmosphere dupla"
      description="Drawer lateral pra fluxos secundários (filtros, settings, detalhes). Scrim radial navy 42→58% + blur 10px progressivo. Atmosphere dupla via radials. Shadow stack 4-layer. 4 sides + 3 sizes."
      importLine={`import { Drawer, type DrawerProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-drawer-root', description: 'Portal fixed · z-index 9990' },
        { part: 'via-drawer-scrim', description: 'Backdrop radial navy + blur 10px' },
        { part: 'via-drawer', description: 'Painel · glass 98→94 + atmosphere dupla' },
        { part: 'via-drawer__head', description: 'Header · title + description + close' },
        { part: 'via-drawer__body', description: 'Conteúdo scrollável' },
      ]}
      props={[
        { name: 'open', type: 'boolean', required: true, description: 'Estado controlado' },
        { name: 'onClose', type: '() => void', required: true, description: 'Callback close' },
        { name: 'title', type: 'ReactNode', description: 'Título · vira h2 aria-labelledby' },
        { name: 'description', type: 'ReactNode', description: 'Descrição opcional sob title' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do body' },
        { name: 'side', type: "'right' | 'left' | 'top' | 'bottom'", default: "'right'", description: 'Lado de entrada' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Largura/altura · sm=320 / md=420 / lg=560' },
      ]}
      examples={[
        {
          title: 'Drawer right (default)',
          preview: <DrawerDemo />,
          code: `const [open, setOpen] = useState(false);

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Notificações"
  description="Você tem 4 atualizações."
  side="right"
>
  <Content />
</Drawer>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra fluxo secundário', description: 'Filtros, settings, detalhes laterais.' },
          dont: { title: 'Não use pra confirmação crítica', description: 'Use Modal · mais focado, evita distrair.' },
        },
      ]}
      a11y={[
        <>role=dialog + aria-modal · focus trap automático</>,
        <>ESC fecha · body scroll lock</>,
        <>Title conectado via aria-labelledby</>,
      ]}
      related={[
        { name: 'Modal', description: 'Dialog focado central · ação focada', href: '/api/modal' },
        { name: 'Sheet', description: 'Bottom sheet mobile · gesture-hint', href: '/api/sheet' },
      ]}
    />
  );
}
