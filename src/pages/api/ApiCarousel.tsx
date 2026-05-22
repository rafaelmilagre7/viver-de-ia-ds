import { Carousel } from '../../lib/Carousel/Carousel';
import ComponentDoc from '../../components/docs/ComponentDoc';

const slideStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 200,
  borderRadius: 16,
  background: 'linear-gradient(135deg, var(--via-navy-04), var(--via-navy-08))',
  border: '1px solid var(--via-border)',
  fontSize: 18,
  color: 'var(--via-text-primary)',
  fontWeight: 600,
};

function CarouselDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 460 }}>
      <Carousel autoPlay={5000} loop label="Slides do produto">
        <div style={slideStyle}>Slide 1 · Visão geral</div>
        <div style={slideStyle}>Slide 2 · Mentor IA</div>
        <div style={slideStyle}>Slide 3 · Comunidade</div>
        <div style={slideStyle}>Slide 4 · Comece agora</div>
      </Carousel>
    </div>
  );
}

export default function ApiCarousel() {
  return (
    <ComponentDoc
      eyebrow="api · carousel"
      name="Carousel"
      headline="gallery slider · touch swipe · auto-play · dots animados"
      description="Carousel pra galerias, depoimentos, onboarding slides, casos de uso. Touch swipe mobile · keyboard arrow keys · auto-play opcional com pause em hover. Dots animados glass + setas opcionais. Loop infinito por default."
      importLine={`import { Carousel, type CarouselProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-carousel', description: 'Container · overflow hidden · region role' },
        { part: 'via-carousel__track', description: 'Linha de slides · translateX spring per index' },
        { part: 'via-carousel__slide', description: 'Cada child vira slide · 100% width' },
        { part: 'via-carousel__arrows', description: 'Botões prev/next · glass + hover ring' },
        { part: 'via-carousel__dots', description: 'Indicador inferior · dot ativo expande pill' },
      ]}
      props={[
        { name: 'children', type: 'ReactNode[]', required: true, description: 'Array de slides · cada child vira 1 slide' },
        { name: 'index', type: 'number', description: 'Slide ativo (controlado)' },
        { name: 'onIndexChange', type: '(index: number) => void', description: 'Callback ao mudar' },
        { name: 'showArrows', type: 'boolean', default: 'true', description: 'Mostra setas prev/next' },
        { name: 'showDots', type: 'boolean', default: 'true', description: 'Mostra dots indicator' },
        { name: 'autoPlay', type: 'number', default: '0', description: 'Ms entre transições · 0 = desabilita · pausa em hover' },
        { name: 'loop', type: 'boolean', default: 'true', description: 'Loop infinito · último → primeiro' },
        { name: 'label', type: 'string', description: 'aria-label do region' },
      ]}
      examples={[
        {
          title: 'Carousel auto-play 5s + dots + arrows',
          preview: <CarouselDemo />,
          code: `<Carousel autoPlay={5000} loop label="Slides do produto">
  <div>Slide 1 · Visão geral</div>
  <div>Slide 2 · Mentor IA</div>
  <div>Slide 3 · Comunidade</div>
</Carousel>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra 3-6 slides escaneáveis', description: 'Depoimentos, fotos de evento · usuário vê tudo se autoPlay rola.' },
          dont: { title: 'Não use pra navegação principal', description: 'Use Tabs · slides ocultam content essencial.' },
        },
        {
          do: { title: 'autoPlay >= 5000ms', description: 'Menos = usuário não lê · 5-7s é o sweet spot.' },
          dont: { title: 'Não use Carousel em mobile-only', description: 'Touch swipe ajuda mas ocupa altura · considere Bento ou Sheet.' },
        },
      ]}
      a11y={[
        <>role=region + aria-roledescription="carousel"</>,
        <>aria-live=off durante autoPlay (não interrompe screen reader)</>,
        <>aria-live=polite após interação manual</>,
        <>Keyboard arrow esq/dir navega · ESC pausa autoPlay · Tab pula slides ocultos</>,
        <>Pause em hover/focus (não conflita com leitura)</>,
        <>Reduced motion: desabilita autoPlay · usuário navega manualmente</>,
      ]}
      related={[
        { name: 'Tabs', description: 'Conteúdo paralelo · usuário escolhe', href: '/api/tabs' },
        { name: 'Lightbox', description: 'Galeria full-screen · não inline', href: '/api/lightbox' },
      ]}
    />
  );
}
