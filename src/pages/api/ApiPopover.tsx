import { useState } from 'react';
import { Popover } from '../../lib/Popover/Popover';
import { Button } from '../../lib/Button/Button';
import { Checkbox } from '../../lib/Checkbox/Checkbox';
import ComponentDoc from '../../components/docs/ComponentDoc';

function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="secondary" size="sm" onClick={() => setOpen((o) => !o)}>
          Filtros · {open ? 'fechar' : 'abrir'}
        </Button>
      }
      side="bottom"
      align="start"
      label="Filtros da lista"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 220 }}>
        <strong style={{ fontSize: 12.5, color: 'var(--via-text-muted)', letterSpacing: 0.4 }}>FILTRAR POR</strong>
        <Checkbox label="Concluídos" defaultChecked />
        <Checkbox label="Em andamento" />
        <Checkbox label="Não iniciados" />
      </div>
    </Popover>
  );
}

export default function ApiPopover() {
  return (
    <ComponentDoc
      eyebrow="api · popover"
      name="Popover"
      headline="floating panel · 4 sides × 3 align · close outside/ESC"
      description="Popover floating ancorado num trigger. Controlado (open/onOpenChange). 4 sides (top/right/bottom/left) × 3 align (start/center/end). Glass + atmosphere + spring open. Close em outside click ou ESC."
      importLine={`import { Popover, type PopoverProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-popover__trigger', description: 'Wrapper inline do elemento trigger' },
        { part: 'via-popover__panel', description: 'Portal floating · glass + atmosphere + spring' },
        { part: 'via-popover__arrow (opt)', description: 'Triangulo apontando pro trigger' },
      ]}
      props={[
        { name: 'open', type: 'boolean', required: true, description: 'Estado controlado · sempre necessário' },
        { name: 'onOpenChange', type: '(open: boolean) => void', required: true, description: 'Callback chamado em close (outside click + ESC) — opcional pra open via trigger' },
        { name: 'trigger', type: 'ReactNode', required: true, description: 'Elemento que dispara · render inline' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do panel floating' },
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Lado preferido vs trigger · flip automático se não couber' },
        { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alinhamento ao longo do eixo side' },
        { name: 'closeOnOutsideClick', type: 'boolean', default: 'true', description: 'Fecha quando user clica fora' },
        { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Fecha quando user pressiona ESC' },
        { name: 'label', type: 'string', description: 'Aria-label do panel pra screen reader' },
      ]}
      examples={[
        {
          title: 'Popover de filtros · bottom + start',
          preview: <PopoverDemo />,
          code: `const [open, setOpen] = useState(false);

<Popover
  open={open}
  onOpenChange={setOpen}
  trigger={<Button onClick={() => setOpen(o => !o)}>Filtros</Button>}
  side="bottom"
  align="start"
  label="Filtros da lista"
>
  <Checkbox label="Concluídos" />
  <Checkbox label="Em andamento" />
</Popover>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra filtros, datas, settings rápidas', description: 'Conteúdo interativo curto ancorado ao trigger.' },
          dont: { title: 'Não use pra dialog de confirmação', description: 'Use Modal · Popover fecha em outside click (UX hostil pra decisão crítica).' },
        },
        {
          do: { title: 'side="bottom" align="start" como default', description: 'Funciona em 90% dos casos · flip automático em mobile.' },
          dont: { title: 'Não use side="top" sem testar mobile', description: 'Mobile pode ter teclado virtual cobrindo top · prefira bottom.' },
        },
      ]}
      a11y={[
        <>role=dialog + aria-modal=false (porque não trap focus)</>,
        <>Trigger com aria-expanded + aria-controls</>,
        <>ESC fecha · outside click fecha (configurável)</>,
        <>Focus volta pro trigger ao fechar (não restaura se onOpenChange propaga novo render)</>,
        <>Use label prop quando popover tem múltiplos elementos interativos</>,
      ]}
      related={[
        { name: 'Tooltip', description: 'Texto curto · hover/focus · não interativo', href: '/api/tooltip' },
        { name: 'DropdownMenu', description: 'Menu de ações estruturado', href: '/api/dropdown-menu' },
        { name: 'Modal', description: 'Bloqueante · focus trap · pra decisão crítica', href: '/api/modal' },
      ]}
    />
  );
}
