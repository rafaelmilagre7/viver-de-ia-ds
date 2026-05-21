import { useState } from 'react';
import {
  ArrowRight, Mail, Search, Bell, Award, Compass,
  MessageCircle, Trash2, Calendar,
  Inbox, MoreHorizontal, Edit, Share2,
  Filter, Users, FileText, Settings,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import {
  Button, Pill, Card, Input, Avatar, Icon,
  ToastStack, useToasts, Tooltip, Modal, Tabs,
  Switch, Checkbox, RadioGroup, Select, Progress,
  Drawer, Spinner, Skeleton, Breadcrumb, Pagination,
  Accordion, Stepper, EmptyState, Combobox, DropdownMenu,
  Popover, Command, DatePicker, Slider, Alert, DataTable,
} from '../../lib';
import './library.css';

export default function Library() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · library"
        title={
          <>
            Componentes React <em>tipados e exportáveis</em>.
          </>
        }
        lede="A library `src/lib/` é a fundação de produção do design system — 25 componentes core com TypeScript types, variants e CSS encapsulado. Importe em qualquer projeto Viver de IA: Nina, Iris, ExecSeats, plataforma. Mesmo visual, zero copy-paste."
      />

      <LibButtonSection />
      <LibPillSection />
      <LibCardSection />
      <LibInputSection />
      <LibAvatarSection />
      <LibIconSection />
      <LibToastSection />
      <LibTooltipSection />
      <LibModalSection />
      <LibTabsSection />
      <LibSwitchSection />
      <LibCheckboxSection />
      <LibRadioSection />
      <LibSelectSection />
      <LibProgressSection />
      <LibDrawerSection />
      <LibSpinnerSection />
      <LibSkeletonSection />
      <LibBreadcrumbSection />
      <LibPaginationSection />
      <LibAccordionSection />
      <LibStepperSection />
      <LibEmptyStateSection />
      <LibComboboxSection />
      <LibDropdownMenuSection />
      <LibPopoverSection />
      <LibCommandSection />
      <LibDatePickerSection />
      <LibSliderSection />
      <LibAlertSection />
      <LibDataTableSection />
    </>
  );
}

/* ---------- Popover ---------- */
function LibPopoverSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section
      title="<Popover /> · floating panel · 4 sides × 3 alignments"
      meta="controlled · ESC closes · outside-click closes · ARIA dialog"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Popover
            open={open}
            onOpenChange={setOpen}
            side="bottom"
            align="end"
            label="Filtros"
            trigger={
              <Button variant="secondary" iconLeft={<Filter size={13} strokeWidth={2.2} />} onClick={() => setOpen((o) => !o)}>
                Filtros
              </Button>
            }
          >
            <h4>Filtrar por</h4>
            <Checkbox label="Concluídos" />
            <Checkbox label="Em andamento" />
            <Checkbox label="Pendentes" />
          </Popover>
        </div>
        <pre className="vds-lib-code mono">{`<Popover open={open} onOpenChange={setOpen} side="bottom" align="end"
  trigger={<Button>Filtros</Button>}>
  <h4>Filtrar por</h4>
  <Checkbox label="Concluídos" />
</Popover>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Command (Cmd+K) ---------- */
function LibCommandSection() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  return (
    <Section
      title="<Command /> · paleta Cmd+K · keyboard-first"
      meta="filtragem live · ↑↓ navega · Enter abre · ESC fecha · ARIA listbox"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Button onClick={() => setOpen(true)}>Abrir paleta</Button>
          {last && <span className="mono" style={{ fontSize: 12, marginLeft: 12, color: 'var(--via-ink-3)' }}>último: {last}</span>}
        </div>
        <Command
          open={open}
          onClose={() => setOpen(false)}
          onSelect={(id) => setLast(id)}
          groups={[
            {
              heading: 'Navegação',
              items: [
                { id: '/aluno', label: 'Aluno · jornada', hint: 'progressão pessoal', icon: <Compass size={14} /> },
                { id: '/turma', label: 'Turma 2026.2', hint: '24 operadores ativos', icon: <Users size={14} /> },
                { id: '/calendario', label: 'Calendário · lives', icon: <Calendar size={14} /> },
              ],
            },
            {
              heading: 'Ações',
              items: [
                { id: 'new-note', label: 'Nova nota', shortcut: 'N', icon: <FileText size={14} /> },
                { id: 'settings', label: 'Configurações', shortcut: 'G S', icon: <Settings size={14} /> },
              ],
            },
          ]}
        />
        <pre className="vds-lib-code mono">{`<Command open={open} onClose={...} onSelect={navigate}
  groups={[{ heading: 'Navegação', items: [...] }]} />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- DatePicker ---------- */
function LibDatePickerSection() {
  const [d, setD] = useState<Date | null>(null);
  return (
    <Section
      title="<DatePicker /> · single date · month grid editorial"
      meta="weekStartsOn · min/max · pt-BR · footer com Limpar/Hoje · ARIA dialog"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ alignItems: 'flex-end' }}>
          <DatePicker value={d} onChange={setD} label="Data da próxima live" />
        </div>
        <pre className="vds-lib-code mono">{`<DatePicker value={date} onChange={setDate} label="Data da live"
  min={new Date()} max={addMonths(new Date(), 3)} />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Slider ---------- */
function LibSliderSection() {
  const [vol, setVol] = useState(40);
  const [level, setLevel] = useState(3);
  return (
    <Section
      title="<Slider /> · range editorial · 3 tones × 3 sizes"
      meta="native range input · keyboard accessible · marks opcionais · ARIA valuetext"
    >
      <div className="vds-lib-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 460 }}>
          <Slider value={vol} onChange={setVol} label="Volume da live" formatValue={(n) => `${n}%`} />
          <Slider
            value={level}
            onChange={setLevel}
            min={1}
            max={5}
            label="Profundidade do conteúdo"
            formatValue={(n) => `nível ${n}`}
            marks={[
              { value: 1, label: 'intro' },
              { value: 3, label: 'médio' },
              { value: 5, label: 'denso' },
            ]}
          />
        </div>
        <pre className="vds-lib-code mono">{`<Slider value={v} onChange={setV} label="Volume" formatValue={n => \`\${n}%\`}
  marks={[{ value: 0, label: 'mudo' }, { value: 100, label: 'máx' }]} />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Alert ---------- */
function LibAlertSection() {
  const [open, setOpen] = useState(true);
  return (
    <Section
      title="<Alert /> · banner persistente · 4 tons"
      meta="info · attn · danger · success · dismissible opcional · com action"
    >
      <div className="vds-lib-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Alert tone="info" title="Janela de manutenção · sex 22h">
            Pausa programada de até 8 minutos · sem perda de dados.
          </Alert>
          <Alert tone="attn" title="Cobrança próxima · 18 mai" action={<a href="#">Ver detalhes</a>}>
            Sua próxima fatura será de <strong>R$ 6.000</strong>. Reduza pra plano lite em 1 clique.
          </Alert>
          {open && (
            <Alert tone="danger" title="Falha de sincronização · 4 mensagens" onDismiss={() => setOpen(false)}>
              Tente novamente em alguns segundos. Se persistir, fale com o time.
            </Alert>
          )}
          <Alert tone="success" title="Entrega salva">
            Sua nota foi registrada e está aguardando avaliação do mentor.
          </Alert>
        </div>
        <pre className="vds-lib-code mono">{`<Alert tone="attn" title="Próxima janela · domingo 04h"
  action={<a href="/status">Ver status</a>}>
  Manutenção programada · pode haver pausa de até 8 minutos.
</Alert>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- DataTable ---------- */
function LibDataTableSection() {
  type Row = { name: string; streak: number; status: 'ativo' | 'em risco' | 'pausado'; last: string };
  const rows: Row[] = [
    { name: 'Caio Ribeiro',    streak: 21, status: 'ativo',    last: '2026-05-19' },
    { name: 'Camila Moraes',   streak: 14, status: 'ativo',    last: '2026-05-18' },
    { name: 'Daniel Pinheiro', streak: 4,  status: 'em risco', last: '2026-05-09' },
    { name: 'Márisson Lage',   streak: 11, status: 'ativo',    last: '2026-05-20' },
    { name: 'Yago Almeida',    streak: 0,  status: 'pausado',  last: '2026-04-22' },
  ];
  return (
    <Section
      title="<DataTable /> · sortable · density · zebra opcional"
      meta="accessor pra sort derivado · render pra cells ReactNode · ARIA sort"
    >
      <DataTable<Row>
        caption="Mentorados · turma 2026.2"
        columns={[
          { key: 'name', label: 'Mentorado' },
          {
            key: 'streak',
            label: 'Streak',
            align: 'right',
            accessor: (r) => r.streak,
            render: (r) => <span className="mono">{r.streak}d</span>,
          },
          {
            key: 'status',
            label: 'Status',
            render: (r) => (
              <Pill variant={r.status === 'ativo' ? 'default' : r.status === 'em risco' ? 'churn' : 'attn'}>
                {r.status}
              </Pill>
            ),
          },
          {
            key: 'last',
            label: 'Última sessão',
            align: 'right',
            accessor: (r) => new Date(r.last),
            render: (r) => (
              <span className="mono">
                {new Date(r.last).toLocaleDateString('pt-BR')}
              </span>
            ),
          },
        ]}
        data={rows}
        initialSort={{ key: 'streak', dir: 'desc' }}
      />
      <pre className="vds-lib-code mono" style={{ marginTop: 12 }}>{`<DataTable columns={cols} data={rows}
  initialSort={{ key: 'streak', dir: 'desc' }}
  onRowClick={row => navigate(\`/mentorados/\${row.id}\`)} />`}</pre>
    </Section>
  );
}

/* ---------- Button ---------- */
function LibButtonSection() {
  return (
    <Section
      title="<Button /> · 5 variants × 3 sizes"
      meta="primary | secondary | ghost | destructive | accent"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Cancelar plano</Button>
          <Button variant="accent">Acento editorial</Button>
        </div>

        <div className="vds-lib-row">
          <Button size="sm" variant="primary" iconRight={<ArrowRight size={12} />}>
            Sm com ícone
          </Button>
          <Button size="md" variant="primary" iconRight={<ArrowRight size={13} />}>
            Md padrão
          </Button>
          <Button size="lg" variant="primary" iconRight={<ArrowRight size={14} />}>
            Lg grande
          </Button>
        </div>

        <div className="vds-lib-row">
          <Button loading>Carregando…</Button>
          <Button disabled>Desabilitado</Button>
          <Button variant="primary" iconLeft={<Mail size={13} />}>
            Email-first
          </Button>
        </div>

        <pre className="vds-lib-code">{`import { Button } from '@viverdeia/ds';

<Button variant="primary" size="md" iconRight={<ArrowRight />}>
  Continuar
</Button>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Pill ---------- */
function LibPillSection() {
  return (
    <Section
      title="<Pill /> · canônica 11px lowercase"
      meta="default | attn | churn | success | live"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Pill variant="default">em produção</Pill>
          <Pill variant="default">corporate</Pill>
          <Pill variant="attn">requer atenção</Pill>
          <Pill variant="attn">expira em 8 dias</Pill>
          <Pill variant="churn">risco churn</Pill>
          <Pill variant="success">pago</Pill>
        </div>

        <div className="vds-lib-row">
          <Pill variant="live">ao vivo</Pill>
          <Pill variant="live">ao vivo agora</Pill>
          <Pill size="sm" variant="default">small</Pill>
        </div>

        <pre className="vds-lib-code">{`<Pill variant="default">em produção</Pill>
<Pill variant="attn">requer atenção</Pill>
<Pill variant="live">ao vivo agora</Pill>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Card ---------- */
function LibCardSection() {
  return (
    <Section
      title="<Card /> · superfície editorial"
      meta="default | glass | featured | atmospheric | dark"
    >
      <div className="vds-lib-card-grid">
        <Card variant="default" hoverable>
          <strong>Card default</strong>
          <p>Surface base · padding 22/24 · border soft + shadow editorial</p>
        </Card>

        <Card variant="glass" hoverable>
          <strong>Card glass</strong>
          <p>Glass com backdrop-filter blur 20px · use em hero/sticky</p>
        </Card>

        <Card variant="atmospheric" hoverable>
          <strong>Card atmospheric</strong>
          <p>Glass + radial atmosphere navy no top-left · signature</p>
        </Card>

        <Card variant="featured" hoverable>
          <strong>Card featured</strong>
          <p>Glass + accent strip accent 2px no topo · 1 por section MAX</p>
        </Card>

        <Card variant="dark" hoverable>
          <strong>Card dark</strong>
          <p>Mesh navy + glow azul · hero ou CTA cinematográfico</p>
        </Card>
      </div>
    </Section>
  );
}

/* ---------- Input ---------- */
function LibInputSection() {
  return (
    <Section
      title="<Input /> · field editorial"
      meta="label · hint · error · icons · 3 sizes"
    >
      <div className="vds-lib-form">
        <Input
          label="Email"
          placeholder="seu@email.com.br"
          iconLeft={<Mail size={14} />}
        />

        <Input
          label="Buscar"
          placeholder="aula, conversa, pessoa…"
          iconLeft={<Search size={14} />}
          hint="Atalho ⌘K abre busca rápida"
        />

        <Input
          label="CNPJ"
          defaultValue="56.812.394/0001-22"
          error="CNPJ não encontrado no Receita"
        />

        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium (default)" />
        <Input size="lg" placeholder="Large" />
      </div>
    </Section>
  );
}

/* ---------- Avatar ---------- */
function LibAvatarSection() {
  return (
    <Section
      title="<Avatar /> · iniciais + status dot"
      meta="xs · sm · md · lg · xl · online / away / busy / offline"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row align-end">
          <Avatar size="xs" initials="BR" />
          <Avatar size="sm" initials="BR" />
          <Avatar size="md" initials="BR" />
          <Avatar size="lg" initials="BR" />
          <Avatar size="xl" initials="BR" />
        </div>

        <div className="vds-lib-row">
          <Avatar size="lg" initials="BR" status="online" alt="Caio · online" />
          <Avatar size="lg" initials="ML" status="away" alt="Márisson · away" />
          <Avatar size="lg" initials="CR" status="busy" alt="Camila · busy" />
          <Avatar size="lg" initials="DP" status="offline" alt="Daniel · offline" />
        </div>

        <pre className="vds-lib-code">{`<Avatar size="lg" initials="BR" status="online" alt="Caio · online" />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Icon ---------- */
function LibIconSection() {
  return (
    <Section
      title="<Icon /> · wrapper consistente de Lucide"
      meta="size · tone · surface (glass · navy · accent · soft)"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Icon size="xs"><Compass /></Icon>
          <Icon size="sm"><Compass /></Icon>
          <Icon size="md"><Compass /></Icon>
          <Icon size="lg"><Compass /></Icon>
          <Icon size="xl"><Compass /></Icon>
        </div>

        <div className="vds-lib-row">
          <Icon tone="default"><Bell /></Icon>
          <Icon tone="navy"><Bell /></Icon>
          <Icon tone="soft"><Bell /></Icon>
          <Icon tone="accent"><Bell /></Icon>
          <Icon tone="coral"><Trash2 /></Icon>
        </div>

        <div className="vds-lib-row">
          <Icon surface="soft" size="md"><Award /></Icon>
          <Icon surface="glass" size="md"><Award /></Icon>
          <Icon surface="navy" size="md"><Award /></Icon>
          <Icon surface="accent" size="md"><Award /></Icon>
        </div>

        <div className="vds-lib-row">
          <Icon surface="navy" size="lg"><MessageCircle /></Icon>
          <Icon surface="glass" size="lg"><MessageCircle /></Icon>
          <Icon surface="accent" size="lg"><Compass /></Icon>
        </div>

        <pre className="vds-lib-code">{`<Icon size="md" tone="navy"><Compass /></Icon>
<Icon surface="navy" size="lg"><Award /></Icon>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Toast ---------- */
function LibToastSection() {
  const { toasts, push, dismiss } = useToasts();

  return (
    <Section
      title="<Toast /> + useToasts() · stack com auto-dismiss"
      meta="default | success | warning | destructive · action opcional · 4 posições"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Button
            variant="primary"
            onClick={() =>
              push({
                variant: 'success',
                title: 'Mentoria confirmada',
                message: 'Quinta 22 · 14h00 BRT · adicionada ao seu calendário.',
              })
            }
          >
            Disparar success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              push({
                variant: 'warning',
                title: 'Sua API key expira em 8 dias',
                message: 'Rotacione antes do dia 28 pra evitar interrupção.',
                action: { label: 'Rotacionar', onClick: () => {} },
              })
            }
          >
            Disparar warning
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              push({
                variant: 'destructive',
                title: 'Falha ao processar pagamento',
                message: 'Cartão recusado. Tente outro método.',
                duration: 0,
              })
            }
          >
            Disparar erro (sticky)
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              push({
                title: 'Backup concluído',
                message: '42 arquivos · 2.4 GB · arquivados.',
              })
            }
          >
            Disparar default
          </Button>
        </div>

        <pre className="vds-lib-code">{`const { toasts, push, dismiss } = useToasts();

push({
  variant: 'success',
  title: 'Mentoria confirmada',
  message: 'Quinta 22 · 14h00 BRT',
  action: { label: 'Ver agenda', onClick: () => {} },
});

<ToastStack toasts={toasts} onDismiss={dismiss} />`}</pre>
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} position="top-right" />
    </Section>
  );
}

/* ---------- Tooltip ---------- */
function LibTooltipSection() {
  return (
    <Section
      title="<Tooltip /> · 4 sides · hover + focus aware"
      meta="top | bottom | left | right · ARIA describedby"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ justifyContent: 'space-around', padding: '40px' }}>
          <Tooltip content="Topo · padrão editorial" side="top">
            <Button variant="secondary" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Esquerda" side="left">
            <Button variant="secondary" size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Direita" side="right">
            <Button variant="secondary" size="sm">Right</Button>
          </Tooltip>
          <Tooltip content="Embaixo · útil pra navs" side="bottom">
            <Button variant="secondary" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Adicionar ao calendário">
            <Button variant="ghost" iconLeft={<Calendar size={13} />} aria-label="Adicionar ao calendário" />
          </Tooltip>
        </div>

        <pre className="vds-lib-code">{`<Tooltip content="Adicionar ao calendário" side="top">
  <Button iconLeft={<Calendar />} />
</Tooltip>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Modal ---------- */
function LibModalSection() {
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="<Modal /> · dialog ESC + focus trap"
      meta="sm | md | lg · scrim opcional · footer customizável"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Button variant="primary" onClick={() => setOpen(true)}>
            Abrir modal
          </Button>
        </div>

        <pre className="vds-lib-code">{`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Renovar plano Mentoria"
  description="Próximas 3 cobranças de R$ 6.000"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="primary">Confirmar renovação</Button>
    </>
  }
>
  <p>Conteúdo do diálogo...</p>
</Modal>`}</pre>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="md"
          title="Renovar plano Mentoria"
          description="Sua próxima cobrança seria 17 jun · R$ 6.000"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Confirmar renovação
              </Button>
            </>
          }
        >
          <p>
            Você está prestes a renovar o plano <strong>Mentoria · 1 trimestre</strong>.
            As próximas 3 cobranças serão de <strong>R$ 6.000</strong>, na mesma forma de pagamento que está hoje (cartão final 6411).
          </p>
          <p>
            Pode cancelar a qualquer momento · faturamento pro-rata.
          </p>
        </Modal>
      </div>
    </Section>
  );
}

/* ---------- Tabs ---------- */
function LibTabsSection() {
  return (
    <Section
      title="<Tabs /> · 2 variants · keyboard arrow nav · ARIA tablist"
      meta="underline (editorial) | pills (compact) · controlled ou uncontrolled"
    >
      <div className="vds-lib-grid">
        <Tabs
          items={[
            {
              id: 'overview',
              label: 'Visão geral',
              content: (
                <p style={{ color: 'var(--via-ink-2)' }}>
                  Painel resumido com 4 KPIs principais · mentees ativos, MRR, NPS, comparecimento.
                </p>
              ),
            },
            {
              id: 'history',
              label: 'Histórico',
              badge: <Pill variant="default" size="sm">12</Pill>,
              content: (
                <p style={{ color: 'var(--via-ink-2)' }}>
                  Últimas 12 sessões de mentoria · com transcripts auto-gerados pelo time interno.
                </p>
              ),
            },
            {
              id: 'settings',
              label: 'Configurações',
              content: (
                <p style={{ color: 'var(--via-ink-2)' }}>
                  Preferências de notificação, integração com calendário, escolha do mentor primário.
                </p>
              ),
            },
          ]}
        />

        <div style={{ marginTop: 24 }}>
          <Tabs
            variant="pills"
            items={[
              { id: 'd1', label: 'Day 1', content: <p style={{ color: 'var(--via-ink-2)' }}>Conteúdo dia 1</p> },
              { id: 'd2', label: 'Day 2', content: <p style={{ color: 'var(--via-ink-2)' }}>Conteúdo dia 2</p> },
              { id: 'd3', label: 'Day 3', content: <p style={{ color: 'var(--via-ink-2)' }}>Conteúdo dia 3</p> },
            ]}
          />
        </div>

        <pre className="vds-lib-code">{`<Tabs
  items={[
    { id: 'overview', label: 'Visão geral', content: <Overview /> },
    { id: 'history', label: 'Histórico', badge: <Pill>12</Pill>, content: <History /> },
  ]}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Switch ---------- */
function LibSwitchSection() {
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <Section
      title="<Switch /> · toggle on/off · 2 sizes"
      meta="role='switch' · keyboard · disabled · md | sm"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Switch
            label="Notificações por email"
            description="Você recebe um digest semanal de domingo às 18h."
            checked={notif}
            onChange={(e) => setNotif(e.target.checked)}
          />
          <Switch
            label="Modo escuro"
            description="Aplica a paleta navy + glass dark globalmente."
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
          <Switch label="Versão pequena (sm)" size="sm" defaultChecked />
          <Switch label="Desabilitado" disabled />
        </div>

        <pre className="vds-lib-code">{`<Switch
  label="Notificações por email"
  description="Digest semanal de domingo"
  checked={notif}
  onChange={(e) => setNotif(e.target.checked)}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Checkbox ---------- */
function LibCheckboxSection() {
  const [terms, setTerms] = useState(false);
  const [selectAll, setSelectAll] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <Section
      title="<Checkbox /> · input boolean · estado indeterminate"
      meta="checked | indeterminate · ARIA-correto · forwardRef"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Checkbox
            label="Aceito os termos da Mentoria"
            description="Trimestre de 12 sessões, cancelamento livre."
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <Checkbox
            label="Selecionar todos os mentees"
            indeterminate={selectAll === 'indeterminate'}
            checked={selectAll === true}
            onChange={() => setSelectAll(selectAll === true ? false : true)}
          />
          <Checkbox label="Item desabilitado" disabled />
        </div>

        <pre className="vds-lib-code">{`<Checkbox
  label="Aceito os termos"
  description="Trimestre de 12 sessões"
  checked={terms}
  onChange={(e) => setTerms(e.target.checked)}
/>

<Checkbox label="Selecionar todos" indeterminate />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- RadioGroup ---------- */
function LibRadioSection() {
  const [plan, setPlan] = useState('anual');

  return (
    <Section
      title="<RadioGroup /> · escolha única · ARIA radiogroup"
      meta="options[] · controlled/uncontrolled · onValueChange"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <RadioGroup
            ariaLabel="Plano"
            value={plan}
            onValueChange={setPlan}
            options={[
              { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês · cancele quando quiser.' },
              { value: 'anual', label: 'Anual · 2 meses grátis', description: 'R$ 2.900/ano · dedicado por trimestre.' },
              { value: 'corporate', label: 'Corporate · sob consulta', description: 'White-label + multi-tenant.' },
            ]}
          />
        </div>

        <pre className="vds-lib-code">{`<RadioGroup
  ariaLabel="Plano"
  value={plan}
  onValueChange={setPlan}
  options={[
    { value: 'mensal', label: 'Mensal', description: 'R$ 290/mês' },
    { value: 'anual',  label: 'Anual', description: 'R$ 2.900/ano' },
  ]}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Select ---------- */
function LibSelectSection() {
  const [mentor, setMentor] = useState<string | undefined>('bruno');

  return (
    <Section
      title="<Select /> · combobox editorial · ARIA listbox"
      meta="options[] · placeholder · error · ESC + click outside fecha"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Select
            label="Mentor primário"
            value={mentor}
            onValueChange={setMentor}
            placeholder="Selecione um mentor"
            options={[
              { value: 'bruno', label: 'Caio Ribeiro · estratégia' },
              { value: 'mateus', label: 'Mateus Garcia · técnico' },
              { value: 'yago', label: 'Yago Mendes · produto' },
              { value: 'daniel', label: 'Daniel Souza · operação' },
            ]}
          />
          <Select
            label="Tamanho do time"
            size="sm"
            placeholder="Tamanho…"
            options={[
              { value: 's', label: '1-5 pessoas' },
              { value: 'm', label: '6-20 pessoas' },
              { value: 'l', label: '20+ pessoas' },
            ]}
          />
          <Select
            label="Estado"
            error="Campo obrigatório."
            placeholder="Selecione"
            options={[{ value: 'sp', label: 'São Paulo' }]}
          />
        </div>

        <pre className="vds-lib-code">{`<Select
  label="Mentor primário"
  value={mentor}
  onValueChange={setMentor}
  placeholder="Selecione um mentor"
  options={[
    { value: 'bruno',  label: 'Caio Ribeiro · estratégia' },
    { value: 'mateus', label: 'Mateus Garcia · técnico' },
  ]}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Progress ---------- */
function LibProgressSection() {
  return (
    <Section
      title="<Progress /> · barra editorial · 3 tones × 3 sizes"
      meta="value 0-100 · navy | accent | coral · sm | md | lg · ARIA progressbar"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '20px' }}>
          <Progress value={72} label="Onboarding · módulo 03" showValue />
          <Progress value={40} label="Streak estendido" tone="accent" showValue size="lg" />
          <Progress value={88} label="Espaço usado · 8.8 GB de 10 GB" showValue size="sm" />
          <Progress value={95} label="Alerta · 95% de uso" tone="coral" showValue />
        </div>

        <pre className="vds-lib-code">{`<Progress value={72} label="Onboarding" showValue />
<Progress value={40} tone="accent" size="lg" />
<Progress value={95} tone="coral" showValue />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Drawer ---------- */
function LibDrawerSection() {
  const [right, setRight] = useState(false);
  const [bottom, setBottom] = useState(false);

  return (
    <Section
      title="<Drawer /> · sheet lateral · right | left | bottom"
      meta="3 sizes · ESC fecha · focus trap · scroll lock"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Button variant="primary" onClick={() => setRight(true)}>
            Abrir drawer (right)
          </Button>
          <Button variant="secondary" onClick={() => setBottom(true)}>
            Abrir bottom sheet
          </Button>
        </div>

        <pre className="vds-lib-code">{`<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Filtros">
  <Checkbox label="Apenas ativos" />
  <RadioGroup options={...} />
</Drawer>`}</pre>

        <Drawer
          open={right}
          onClose={() => setRight(false)}
          side="right"
          size="md"
          title="Filtros de mentees"
          description="Refine a lista pela situação atual."
          footer={
            <>
              <Button variant="ghost" onClick={() => setRight(false)}>Limpar</Button>
              <Button variant="primary" onClick={() => setRight(false)}>Aplicar</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Checkbox label="Apenas mentees ativos" defaultChecked />
            <Checkbox label="Com sessão agendada na semana" />
            <Checkbox label="Com pendência aberta há +7 dias" />
          </div>
        </Drawer>

        <Drawer
          open={bottom}
          onClose={() => setBottom(false)}
          side="bottom"
          size="md"
          title="Compartilhar mentoria"
        >
          <p>Conteúdo do sheet · útil pra ações rápidas em mobile (compartilhar, exportar, copiar link).</p>
        </Drawer>
      </div>
    </Section>
  );
}

/* ---------- Spinner ---------- */
function LibSpinnerSection() {
  return (
    <Section
      title="<Spinner /> · loader inline · 3 sizes × 3 tones"
      meta="navy | inverse | soft · ARIA live region · reduce-motion aware"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ gap: 24 }}>
          <Spinner size="sm" label="Pequeno (sm)" />
          <Spinner size="md" label="Médio (md)" />
          <Spinner size="lg" label="Grande (lg)" />
        </div>

        <div
          className="vds-lib-row"
          style={{ background: 'var(--via-navy)', borderRadius: 14, padding: 24 }}
        >
          <Spinner tone="inverse" label="Em superfície navy escura…" />
        </div>

        <pre className="vds-lib-code">{`<Spinner />
<Spinner size="lg" tone="inverse" label="Carregando dashboard…" />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Skeleton ---------- */
function LibSkeletonSection() {
  return (
    <Section
      title="<Skeleton /> · placeholder · text | rect | circle"
      meta="shimmer editorial · width/height controláveis · reduce-motion aware"
    >
      <div className="vds-lib-grid">
        <div
          className="vds-lib-row"
          style={{ flexDirection: 'column', alignItems: 'stretch', gap: 18 }}
        >
          <div
            style={{
              padding: 18,
              border: '1px solid var(--via-border-soft)',
              borderRadius: 14,
              display: 'flex',
              gap: 14,
              alignItems: 'center',
            }}
          >
            <Skeleton variant="circle" width={48} height={48} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
            <Skeleton variant="rect" width="100%" height={140} />
            <Skeleton variant="text" lines={3} />
          </div>
        </div>

        <pre className="vds-lib-code">{`<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" lines={3} />
<Skeleton variant="rect" width="100%" height={200} />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Breadcrumb ---------- */
function LibBreadcrumbSection() {
  return (
    <Section
      title="<Breadcrumb /> · navegação hierárquica · ARIA nav"
      meta="separator custom · current page detectado pelo último item sem href"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <Breadcrumb
            items={[
              { label: 'Plataforma', href: '#' },
              { label: 'Mentorias', href: '#' },
              { label: 'Caio Ribeiro', href: '#' },
              { label: 'Sessão 12 · maio/26' },
            ]}
          />
          <Breadcrumb
            items={[
              { label: 'Configurações', href: '#' },
              { label: 'Notificações' },
            ]}
          />
        </div>

        <pre className="vds-lib-code">{`<Breadcrumb
  items={[
    { label: 'Plataforma', href: '/' },
    { label: 'Mentorias', href: '/mentorias' },
    { label: 'Sessão 12' },  // sem href = current page
  ]}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Pagination ---------- */
function LibPaginationSection() {
  const [pageA, setPageA] = useState(5);
  const [pageB, setPageB] = useState(64);

  return (
    <Section
      title="<Pagination /> · numerada editorial · prev/next + elipses"
      meta="maxVisible · keyboard nav · ARIA-current page"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
          <Pagination page={pageA} totalPages={42} onPageChange={setPageA} />
          <Pagination page={pageB} totalPages={128} onPageChange={setPageB} />
        </div>

        <pre className="vds-lib-code">{`<Pagination
  page={current}
  totalPages={42}
  onPageChange={setCurrent}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Accordion ---------- */
function LibAccordionSection() {
  return (
    <Section
      title="<Accordion /> · expandir/colapsar · FAQ + groups + multiple"
      meta="ARIA expanded/controls · keyboard · single | multiple · default | separated"
    >
      <div className="vds-lib-grid">
        <Accordion
          items={[
            {
              id: 'q1',
              title: 'Como funciona a mentoria?',
              content: (
                <p>
                  Você marca sessões individuais com o mentor primário, recebe trans­crição automática
                  depois e tem 1 follow-up assíncrono por semana via Discord.
                </p>
              ),
            },
            {
              id: 'q2',
              title: 'Posso cancelar quando quiser?',
              content: <p>Sim · cancelamento livre, faturamento pro-rata. Sem fidelidade, sem multa.</p>,
            },
            {
              id: 'q3',
              title: 'A turma é fechada ou aberta?',
              content: <p>Turmas trimestrais fechadas · novas matrículas a cada 90 dias.</p>,
            },
          ]}
          defaultOpen="q1"
        />

        <pre className="vds-lib-code">{`<Accordion
  items={[
    { id: 'q1', title: 'Como funciona?',  content: <p>...</p> },
    { id: 'q2', title: 'Posso cancelar?', content: <p>...</p> },
  ]}
  defaultOpen="q1"
/>

<Accordion variant="separated" multiple items={...} />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Stepper ---------- */
function LibStepperSection() {
  const [step, setStep] = useState(2);
  const items = [
    { id: 'profile', label: 'Perfil', description: 'Quem é você' },
    { id: 'role', label: 'Função', description: 'Onde atua' },
    { id: 'plan', label: 'Plano', description: 'Como vamos te apoiar' },
    { id: 'confirm', label: 'Confirmar', description: 'Tudo certo' },
  ];

  return (
    <Section
      title="<Stepper /> · wizard editorial · horizontal | vertical"
      meta="ARIA-current step · onStepClick volta · 4-state indicator"
    >
      <div className="vds-lib-grid">
        <Stepper current={step} steps={items} onStepClick={setStep} />

        <div className="vds-lib-row">
          <Button
            variant="secondary"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Voltar
          </Button>
          <Button
            variant="primary"
            onClick={() => setStep((s) => Math.min(items.length - 1, s + 1))}
            disabled={step === items.length - 1}
          >
            Avançar
          </Button>
        </div>

        <pre className="vds-lib-code">{`<Stepper
  current={step}
  steps={[
    { id: 'profile', label: 'Perfil', description: 'Quem é você' },
    { id: 'plan',    label: 'Plano',  description: 'Como apoiar' },
  ]}
  onStepClick={setStep}
/>

<Stepper orientation="vertical" current={2} steps={...} />`}</pre>
      </div>
    </Section>
  );
}

/* ---------- EmptyState ---------- */
function LibEmptyStateSection() {
  return (
    <Section
      title="<EmptyState /> · placeholder editorial · 3 variants"
      meta="default | soft | navy · icon + title + description + actions"
    >
      <div className="vds-lib-grid">
        <EmptyState
          variant="soft"
          icon={<Inbox size={20} strokeWidth={1.8} />}
          title="Nenhuma mentoria agendada"
          description="Sua próxima sessão aparece aqui assim que o mentor confirmar."
          action={<Button variant="primary">Agendar agora</Button>}
          secondary={<Button variant="ghost">Ver disponibilidades</Button>}
        />

        <pre className="vds-lib-code">{`<EmptyState
  icon={<Inbox />}
  title="Nenhuma mentoria agendada"
  description="Sua próxima sessão aparece aqui..."
  action={<Button>Agendar agora</Button>}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- Combobox ---------- */
function LibComboboxSection() {
  const [cidade, setCidade] = useState<string | undefined>(undefined);
  return (
    <Section
      title="<Combobox /> · select com search interno"
      meta="ARIA combobox/listbox · ESC fecha · click-outside · empty state"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row">
          <Combobox
            label="Cidade do evento"
            placeholder="Buscar cidade…"
            options={[
              { value: 'sp', label: 'São Paulo · SP' },
              { value: 'rj', label: 'Rio de Janeiro · RJ' },
              { value: 'poa', label: 'Porto Alegre · RS' },
              { value: 'bh', label: 'Belo Horizonte · MG' },
              { value: 'cwb', label: 'Curitiba · PR' },
              { value: 'rec', label: 'Recife · PE' },
            ]}
            value={cidade}
            onValueChange={setCidade}
          />
        </div>

        <pre className="vds-lib-code">{`<Combobox
  label="Cidade do evento"
  placeholder="Buscar cidade…"
  options={[
    { value: 'sp',  label: 'São Paulo · SP' },
    { value: 'rj',  label: 'Rio de Janeiro · RJ' },
  ]}
  value={cidade}
  onValueChange={setCidade}
/>`}</pre>
      </div>
    </Section>
  );
}

/* ---------- DropdownMenu ---------- */
function LibDropdownMenuSection() {
  return (
    <Section
      title="<DropdownMenu /> · context/overflow menu · groups + separator"
      meta="ARIA menu · ESC fecha · destructive variant · shortcut hint"
    >
      <div className="vds-lib-grid">
        <div className="vds-lib-row" style={{ gap: 24 }}>
          <DropdownMenu
            trigger={
              <Button
                variant="ghost"
                iconLeft={<MoreHorizontal size={14} />}
                aria-label="Mais opções"
              />
            }
            items={[
              { id: 'edit', label: 'Editar perfil', icon: <Edit size={13} strokeWidth={2} />, shortcut: '⌘E' },
              { id: 'share', label: 'Compartilhar', icon: <Share2 size={13} strokeWidth={2} /> },
              { id: 'delete', label: 'Excluir', icon: <Trash2 size={13} strokeWidth={2} />, destructive: true },
            ]}
          />

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
                  { id: 'edit', label: 'Editar perfil', icon: <Edit size={13} strokeWidth={2} /> },
                  { id: 'share', label: 'Compartilhar link', icon: <Share2 size={13} strokeWidth={2} /> },
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
        </div>

        <pre className="vds-lib-code">{`<DropdownMenu
  trigger={<Button iconLeft={<MoreHorizontal />} aria-label="Mais" />}
  items={[
    { id: 'edit',   label: 'Editar', icon: <Edit /> },
    { id: 'delete', label: 'Excluir', destructive: true },
  ]}
/>

// ou com groups:
<DropdownMenu trigger={...} groups={[{ id, label, items }, ...]} />`}</pre>
      </div>
    </Section>
  );
}
