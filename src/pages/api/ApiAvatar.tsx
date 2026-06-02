import { Avatar } from '../../lib/Avatar/Avatar';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiAvatar() {
  return (
    <ComponentDoc
      eyebrow="api · avatar"
      name="Avatar"
      headline="iniciais editorial · ring branco · status com pulse"
      description="Avatar circular com iniciais Geist (foto opcional) sobre fundo navy gradient com inset highlight + drop shadow. Status dot com gradient + pulse breathing em online. 5 sizes proporcionais ao texto."
      importLine={`import { Avatar, type AvatarProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-avatar', description: 'Container circular · gradient navy + inset highlight + drop shadow' },
        { part: 'via-avatar__initials', description: 'Iniciais derivadas de `alt` · cor branca + text-shadow' },
        { part: '<img>', description: 'Foto (quando `src` provido) · object-fit cover' },
        { part: 'via-avatar__status', description: 'Dot inferior direito · pulse breathing em online' },
      ]}
      props={[
        { name: 'src', type: 'string', description: 'URL da imagem · se ausente, mostra iniciais' },
        { name: 'alt', type: 'string', required: true, description: 'Nome completo · usado pra derivar iniciais ("Caio Ribeiro" → "CR") e ARIA label' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: '20 / 28 / 36 / 52 / 80 px' },
        { name: 'status', type: "'online' | 'away' | 'busy' | 'offline'", description: 'Dot de presença · online tem pulse' },
        { name: '...rest', type: 'HTMLAttributes', description: 'Aceita className extra, role, etc' },
      ]}
      sizes={[
        { name: 'xs · 20px', label: 'Avatar group stack', description: 'Pra mostrar "+12 membros" em listas densas' },
        { name: 'sm · 28px', label: 'Comment row', description: 'Discussões, chat, notification rows' },
        { name: 'md · 36px', label: 'Padrão lista', description: 'Member list, team grid, mentorias' },
        { name: 'lg · 52px', label: 'Card destaque', description: 'Mentor card, perfil resumo, billing customer' },
        { name: 'xl · 80px', label: 'Perfil hero', description: 'Página de perfil, settings, editor profile' },
      ]}
      examples={[
        {
          title: 'Iniciais (sem foto)',
          description: 'Default · gradient navy + iniciais derivadas do `alt`.',
          preview: (
            <>
              <Avatar alt="Caio Ribeiro" size="xs" />
              <Avatar alt="Caio Ribeiro" size="sm" />
              <Avatar alt="Caio Ribeiro" size="md" />
              <Avatar alt="Caio Ribeiro" size="lg" />
              <Avatar alt="Caio Ribeiro" size="xl" />
            </>
          ),
          code: `<Avatar alt="Caio Ribeiro" size="md" />`,
        },
        {
          title: 'Status com pulse',
          description: 'Online tem pulse breathing 2.4s · away/busy/offline são estáticos.',
          preview: (
            <>
              <Avatar alt="Caio Ribeiro" size="lg" status="online" />
              <Avatar alt="Márisson Lage" size="lg" status="away" />
              <Avatar alt="Guilherme Delorenzo" size="lg" status="busy" />
              <Avatar alt="Diego Martins" size="lg" status="offline" />
            </>
          ),
          code: `<Avatar alt="Caio Ribeiro" status="online" />
<Avatar alt="Márisson Lage" status="away" />
<Avatar alt="Guilherme Delorenzo" status="busy" />
<Avatar alt="Diego Martins" status="offline" />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Sempre forneça `alt` completo', description: 'Usuário "Caio Ribeiro" → iniciais "CR" + screen reader anuncia certo.' },
          dont: { title: 'Não use `alt="user"` genérico', description: 'Iniciais ficam "U" · screen reader não identifica.' },
        },
        {
          do: { title: 'Status só se for REAL', description: 'Online presence real, away real (idle 5min+), busy = em call.' },
          dont: { title: 'Não use status fake', description: 'Online sempre = engana usuário · perde credibilidade.' },
        },
      ]}
      a11y={[
        <>Renderiza role=img automaticamente · screen reader anuncia o `alt` completo</>,
        <>Iniciais geradas via JS · só visual · texto real fica no aria-label</>,
        <>Status dot tem aria-label descritivo ("status: online")</>,
        <>Pulse animation respeita prefers-reduced-motion (desativa quando solicitado)</>,
        <>Border 2-3px branco garante contraste sobre qualquer surface</>,
      ]}
      related={[
        { name: 'Pill', description: 'Avatar + nome formam chip de usuário', href: '/api/pill' },
        { name: 'Tooltip', description: 'Hover no avatar mostra nome completo', href: '/api/tooltip' },
        { name: 'HoverCard', description: 'Hover mostra preview de perfil rico', href: '/api/hover-card' },
      ]}
    />
  );
}
