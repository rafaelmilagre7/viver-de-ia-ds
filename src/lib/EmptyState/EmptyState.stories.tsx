import { Inbox, Search, Compass } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

export default {
  title: 'EmptyState',
};

// Padrão · claro, sem fundo
export const Default = () => (
  <EmptyState
    icon={<Inbox size={20} strokeWidth={1.8} />}
    title="Nenhuma mentoria agendada"
    description="Sua próxima sessão aparece aqui assim que a mentoria confirmar."
    action={<Button variant="primary">Agendar agora</Button>}
    secondary={<Button variant="ghost">Ver disponibilidades</Button>}
  />
);

// Texto canônico do microcopy (vazio-sem-resultados)
export const Soft = () => (
  <EmptyState
    variant="soft"
    icon={<Search size={20} strokeWidth={1.8} />}
    title="Nada encontrado pra “navy gradient”."
    description="Tente um termo mais curto ou confira a grafia."
  />
);

// Opt-in · só em momento de marca, sempre com conteúdo e ação
export const NavyMomentoDeMarca = () => (
  <EmptyState
    variant="navy"
    icon={<Compass size={20} strokeWidth={1.8} />}
    title="Seu painel começa aqui"
    description="Faltam 2 passos pra liberar a trilha completa."
    action={<Button variant="secondary">Continuar pelo passo 2</Button>}
  />
);
