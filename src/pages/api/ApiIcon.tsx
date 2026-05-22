import { Icon } from '../../lib/Icon/Icon';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { Compass, Award, Crown, Layers, Rocket } from 'lucide-react';

export default function ApiIcon() {
  return (
    <ComponentDoc
      eyebrow="api · icon"
      name="Icon"
      headline="wrapper Lucide · 3 sizes · 4 surfaces · tons semânticos"
      description="Icon é o wrapper consistente para Lucide icons no DS. Padroniza size (sm/md/lg), tone (default/navy/accent/coral/muted/inverse) e surface (none/glass/navy/accent tile). Use Icon em vez de Lucide direto pra manter consistência editorial."
      importLine={`import { Icon, type IconProps } from '@viverdeia/design-system';
import { Compass, Award } from 'lucide-react';`}
      anatomy={[
        { part: 'via-icon', description: 'span wrapper · inline-flex · centra o SVG' },
        { part: 'via-icon--size-*', description: 'sm=14 / md=16 / lg=20 (sem surface) ou 32/40/48 (com surface tile)' },
        { part: 'via-icon--tone-*', description: 'Color do stroke · default herda · navy/accent/coral/muted/inverse' },
        { part: 'via-icon--surface-*', description: 'Tile glass ao redor · none/glass/navy/accent' },
      ]}
      props={[
        { name: 'children', type: 'ReactNode', required: true, description: 'Componente Lucide · <Compass />, <Award />, etc.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'sm=14 · md=16 · lg=20 (ajusta com surface)' },
        { name: 'tone', type: "'default' | 'navy' | 'accent' | 'coral' | 'muted' | 'inverse'", default: "'default'", description: 'Cor semantic do stroke' },
        { name: 'surface', type: "'none' | 'glass' | 'navy' | 'accent'", default: "'none'", description: 'Tile decorativo · vira chip glass ao redor' },
        { name: 'label', type: 'string', description: 'aria-label · obrigatório quando ícone é decorativo+único (sem texto adjacente)' },
        { name: '...rest', type: 'HTMLAttributes<HTMLSpanElement>', description: 'Aceita todas props do span (className, style, id, etc.)' },
      ]}
      examples={[
        {
          title: '3 sizes · 4 surfaces',
          preview: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Icon size="sm"><Compass /></Icon>
              <Icon size="md" tone="navy"><Award /></Icon>
              <Icon size="lg" tone="accent"><Crown /></Icon>
              <Icon surface="glass" size="md"><Layers /></Icon>
              <Icon surface="navy" size="md"><Rocket /></Icon>
              <Icon surface="accent" size="md"><Crown /></Icon>
            </div>
          ),
          code: `<Icon size="sm"><Compass /></Icon>
<Icon size="md" tone="navy"><Award /></Icon>
<Icon size="lg" tone="accent"><Crown /></Icon>

{/* Com tile glass/navy/accent */}
<Icon surface="glass" size="md"><Layers /></Icon>
<Icon surface="navy" size="md"><Rocket /></Icon>
<Icon surface="accent" size="md"><Crown /></Icon>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use Icon em vez de <Compass /> direto', description: 'Centraliza size/tone · consistência automática · usa tokens.' },
          dont: { title: 'Não use sparkle/sparkles · ESTRELINHA BANIDA', description: 'Cliché global de IA · use Compass, Award, Crown, Rocket, Layers (regra de marca).' },
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
        <>tone="muted" passa contraste AA contra fundos editorial padrão</>,
      ]}
      related={[
        { name: 'Avatar', description: 'Tile específico pra pessoas (foto/iniciais)', href: '/api/avatar' },
        { name: 'Pill', description: 'Quando ícone vem com label inline curto', href: '/api/pill' },
        { name: 'Iconography page', description: 'Galeria curada · ícones canônicos do DS', href: '/iconography/icons' },
      ]}
    />
  );
}
