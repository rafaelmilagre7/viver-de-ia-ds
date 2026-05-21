import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Breadcrumb',
};

export const Default = () => (
  <Breadcrumb
    items={[
      { label: 'Plataforma', href: '#' },
      { label: 'Mentorias', href: '#' },
      { label: 'Caio Ribeiro', href: '#' },
      { label: 'Sessão 12 · maio/26' },
    ]}
  />
);

export const Deep = () => (
  <Breadcrumb
    items={[
      { label: 'ExecSeats', href: '#' },
      { label: 'Cases', href: '#' },
      { label: 'GRU → DXB · Emirates Business', href: '#' },
      { label: 'Detalhes' },
    ]}
  />
);

export const Short = () => (
  <Breadcrumb
    items={[
      { label: 'Configurações', href: '#' },
      { label: 'Notificações' },
    ]}
  />
);
