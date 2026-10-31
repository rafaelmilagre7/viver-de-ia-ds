import { Avatar, type AvatarProps } from '../../lib/Avatar/Avatar';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Avatar as meta } from './props.generated.json';

export default function ApiAvatar() {
  return (
    <ComponentDoc
      eyebrow="api · avatar"
      name="Avatar"
      headline="a pessoa, em foto, iniciais e presença."
      description="Foto recortada no círculo, sem anel nem halo · iniciais quando não há foto ou ela falha · status com pulse. Avatar circular: com foto, ela cobre o círculo; sem foto, iniciais Geist sobre navy. Status dot com pulse em online. 5 tamanhos proporcionais ao texto."
      importLine={`import { Avatar, type AvatarProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-avatar', description: 'Container circular · gradient navy + inset highlight + drop shadow' },
        { part: 'via-avatar__initials', description: 'Iniciais derivadas de `alt` · cor branca + text-shadow' },
        { part: '<img>', description: 'Foto (quando `src` provido) · object-fit cover' },
        { part: 'via-avatar__status', description: 'Dot inferior direito · pulse breathing em online' },
      ]}
      meta={meta}
      playground={{
        initial: { src: '/fotos/rafael-milagre.jpg', alt: 'Rafael Milagre', size: 'lg' },
        render: (v) => <Avatar {...(v as AvatarProps)} />,
      }}
      descriptions={{
        src: 'URL da foto · se ausente ou se falhar ao carregar, mostra as iniciais',
        alt: 'Nome completo · usado pra derivar iniciais ("Caio Ribeiro" → "CR") e ARIA label',
        initials: 'Iniciais explícitas · têm prioridade sobre as derivadas do alt',
        size: '20 / 28 / 36 / 52 / 80 px',
        status: 'Dot de presença · online tem pulse',
        '...rest': 'Aceita className extra, role, etc',
      }}
      sizes={[
        { name: 'xs · 20px', label: 'Avatar group stack', description: 'Pra mostrar "+12 membros" em listas densas' },
        { name: 'sm · 28px', label: 'Comment row', description: 'Discussões, chat, notification rows' },
        { name: 'md · 36px', label: 'Padrão lista', description: 'Member list, team grid, mentorias' },
        { name: 'lg · 52px', label: 'Card destaque', description: 'Mentor card, perfil resumo, billing customer' },
        { name: 'xl · 80px', label: 'Perfil hero', description: 'Página de perfil, settings, editor profile' },
      ]}
      examples={[
        {
          title: 'Com foto',
          description: 'Com src, a foto cobre o círculo inteiro. O alt com o nome completo vira o nome lido pelo leitor de tela.',
          preview: (
            <>
              <Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="sm" />
              <Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="md" />
              <Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="lg" />
              <Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="xl" />
            </>
          ),
          code: `<Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="lg" />`,
        },
        {
          title: 'Foto que falha',
          description: 'Se a imagem não carrega, o avatar cai sozinho pras iniciais do alt. Trocar o src tenta de novo.',
          preview: (
            <>
              <Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="lg" />
              <Avatar src="data:image/png;base64,AAAA" alt="Rafael Milagre" size="lg" />
            </>
          ),
          code: `// src quebrado → mostra "RM"
<Avatar src={pessoa.foto} alt="Rafael Milagre" size="lg" />`,
        },
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
              <Avatar alt="Mariana Leal" size="lg" status="away" />
              <Avatar alt="Gustavo Dantas" size="lg" status="busy" />
              <Avatar alt="Diego Martins" size="lg" status="offline" />
            </>
          ),
          code: `<Avatar alt="Caio Ribeiro" status="online" />
<Avatar alt="Mariana Leal" status="away" />
<Avatar alt="Gustavo Dantas" status="busy" />
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
        <>Sem anel: um recorte de 1,5px na cor da superfície separa avatares sobrepostos</>,
      ]}
      related={[
        { name: 'Pill', description: 'Avatar + nome formam chip de usuário', href: '/api/pill' },
        { name: 'Tooltip', description: 'Hover no avatar mostra nome completo', href: '/api/tooltip' },
        { name: 'HoverCard', description: 'Hover mostra preview de perfil rico', href: '/api/hover-card' },
      ]}
    />
  );
}
