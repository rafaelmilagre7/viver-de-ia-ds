import { Icon } from '../../lib/Icon/Icon';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Compass, Award, Crown, Layers, Target } from 'lucide-react';
import { Icon as meta } from './props.generated.json';

export default function ApiIcon() {
  return (
    <ComponentDoc
      eyebrow="api · icon"
      name="Icon"
      headline="Lucide no tamanho e no tom certos."
      description="Wrapper Lucide · 3 sizes · 4 surfaces · tons semânticos. Icon é o wrapper consistente para Lucide icons no DS. Padroniza size (xs/sm/md/lg/xl), tone (default/soft/navy/accent/coral/inverse) e surface (none/soft/glass/navy/accent tile). Use Icon em vez de Lucide direto pra manter consistência editorial."
      importLine={`import { Icon, type IconProps } from '@viverdeia/design-system';
import { Compass, Award } from 'lucide-react';`}
      anatomy={[
        { part: 'via-icon', description: 'span wrapper · inline-flex · centra o SVG' },
        { part: 'via-icon--size-*', description: 'sm=14 / md=16 / lg=20 (sem surface) ou 32/40/48 (com surface tile)' },
        { part: 'via-icon--tone-*', description: 'Color do stroke · default herda · soft/navy/accent/coral/inverse' },
        { part: 'via-icon--surface-*', description: 'Tile glass ao redor · none/glass/navy/accent' },
      ]}
      meta={meta}
      descriptions={{
        children: 'Componente Lucide · <Compass />, <Award />, etc.',
        size: 'xs=10 · sm=12 · md=14 · lg=18 · xl=22 (ajusta com surface)',
        tone: 'Cor semantic do stroke',
        surface: 'Tile decorativo · vira chip glass ao redor',
        label: 'aria-label · obrigatório quando ícone é decorativo+único (sem texto adjacente)',
        '...rest': 'Aceita todas props do span (className, style, id, etc.)',
      }}
      examples={[
        {
          title: '3 sizes · 4 surfaces',
          preview: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Icon size="sm"><Compass /></Icon>
              <Icon size="md" tone="navy"><Award /></Icon>
              <Icon size="lg" tone="accent"><Crown /></Icon>
              <Icon surface="glass" size="md"><Layers /></Icon>
              <Icon surface="navy" size="md"><Target /></Icon>
              <Icon surface="accent" size="md"><Crown /></Icon>
            </div>
          ),
          code: `<Icon size="sm"><Compass /></Icon>
<Icon size="md" tone="navy"><Award /></Icon>
<Icon size="lg" tone="accent"><Crown /></Icon>

{/* Com tile glass/navy/accent */}
<Icon surface="glass" size="md"><Layers /></Icon>
<Icon surface="navy" size="md"><Target /></Icon>
<Icon surface="accent" size="md"><Crown /></Icon>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use Icon em vez de <Compass /> direto', description: 'Centraliza size/tone · consistência automática · usa tokens.' },
          dont: { title: 'Não use sparkle/sparkles · ESTRELINHA BANIDA', description: 'Cliché global de IA · use Compass, Award, Crown, Target, Layers (regra de marca).' },
        },
        {
          do: { title: 'label obrigatório quando solitário', description: '<Icon label="Sucesso"><Check /></Icon> · screen reader anuncia.' },
          dont: { title: 'Não use label quando há texto adjacente', description: '<Button><Icon><Plus /></Icon>Novo</Button> · "Novo" já comunica · ícone é decorativo.' },
        },
      ]}
      a11y={[
        <>SVG interno marcado aria-hidden=true automaticamente</>,
        <>label prop vira aria-label no span wrapper (quando presente)</>,
        <>Sem label = ícone decorativo · texto adjacente carrega a info</>,
        <>tone="soft" passa contraste AA contra fundos editorial padrão</>,
      ]}
      related={[
        { name: 'Avatar', description: 'Tile específico pra pessoas (foto/iniciais)', href: '/api/avatar' },
        { name: 'Pill', description: 'Quando ícone vem com label inline curto', href: '/api/pill' },
        { name: 'Iconography page', description: 'Galeria curada · ícones canônicos do DS', href: '/iconography/icons' },
      ]}
    />
  );
}
