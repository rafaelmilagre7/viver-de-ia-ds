import { Inbox, Search, Calendar } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

export default {
  title: 'EmptyState',
};

export const Default = () => (
  <EmptyState
    icon={<Inbox size={20} strokeWidth={1.8} />}
    title="Nenhuma mentoria agendada"
    description="Sua próxima sessão aparece aqui assim que o mentor confirmar."
    action={<Button variant="primary">Agendar agora</Button>}
    secondary={<Button variant="ghost">Ver disponibilidades</Button>}
  />
);

export const Soft = () => (
  <EmptyState
    variant="soft"
    icon={<Search size={20} strokeWidth={1.8} />}
    title="Sem resultados pra 'navy gradient'"
    description="Tente termos mais gerais como 'mesh' ou 'glass'."
  />
);

export const Navy = () => (
  <EmptyState
    variant="navy"
    icon={<Calendar size={20} strokeWidth={1.8} />}
    title="Sua agenda está limpa"
    description="Bom momento pra revisar transcrições e marcar a próxima sessão."
    action={<Button variant="accent">Ver oportunidades</Button>}
  />
);
