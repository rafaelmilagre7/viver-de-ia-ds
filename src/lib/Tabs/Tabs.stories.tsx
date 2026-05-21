import { Tabs } from './Tabs';
import { Pill } from '../Pill/Pill';

export default {
  title: 'Tabs',
};

const items = [
  {
    id: 'overview',
    label: 'Visão geral',
    content: (
      <p style={{ color: 'var(--via-ink-2)' }}>
        Painel resumido com 4 KPIs principais — mentees ativos, MRR, NPS, comparecimento.
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
];

export const Underline = () => <Tabs variant="underline" items={items} />;

export const Pills = () => (
  <Tabs
    variant="pills"
    items={[
      { id: 'd1', label: 'Day 1', content: <p style={{ color: 'var(--via-ink-2)' }}>Conteúdo dia 1</p> },
      { id: 'd2', label: 'Day 2', content: <p style={{ color: 'var(--via-ink-2)' }}>Conteúdo dia 2</p> },
      { id: 'd3', label: 'Day 3', content: <p style={{ color: 'var(--via-ink-2)' }}>Conteúdo dia 3</p> },
    ]}
  />
);
