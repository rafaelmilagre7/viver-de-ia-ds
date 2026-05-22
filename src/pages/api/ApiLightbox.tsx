import { useState } from 'react';
import { Lightbox } from '../../lib/Lightbox/Lightbox';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format', alt: 'Sala de reunião editorial', caption: 'Encontro mensal de mentores · 14 mai 2026' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format', alt: 'Setup tech moderno', caption: 'Workshop de IA generativa · 22 abr 2026' },
  { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&q=80&auto=format', alt: 'Time em conversa', caption: 'Liderança Viver de IA · sessão estratégica' },
];

function LightboxDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir galeria (3 fotos)</Button>
      <Lightbox open={open} onClose={() => setOpen(false)} images={IMAGES} showDownload />
    </>
  );
}

export default function ApiLightbox() {
  return (
    <ComponentDoc
      eyebrow="api · lightbox"
      name="Lightbox"
      headline="foto tela cheia · keyboard arrows · download opcional"
      description="Lightbox pra fotos em tela cheia. Suporta múltiplas imagens · setas keyboard/touch · ESC fecha · caption inferior · download opcional. Use pra: galerias de evento, portfolio, screenshots de produto. Scrim radial blur 12px."
      importLine={`import { Lightbox, type LightboxProps, type LightboxImage } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-lightbox', description: 'Portal fixed · scrim radial + blur · z-index alto' },
        { part: 'via-lightbox__image', description: 'Imagem centrada · object-fit contain · max 90vw/90vh' },
        { part: 'via-lightbox__caption', description: 'Texto inferior · alt + caption opcional' },
        { part: 'via-lightbox__arrows', description: 'Botões prev/next nas laterais · hover glow' },
        { part: 'via-lightbox__close', description: 'X canto superior direito' },
        { part: 'via-lightbox__download', description: 'Download icon · canto superior esquerdo (opcional)' },
      ]}
      props={[
        { name: 'open', type: 'boolean', required: true, description: 'Estado controlado' },
        { name: 'onClose', type: '() => void', required: true, description: 'Callback close (ESC, scrim, X)' },
        { name: 'images', type: 'LightboxImage[]', required: true, description: 'Array { src, alt, caption? }' },
        { name: 'index', type: 'number', default: '0', description: 'Index inicial · 0-based' },
        { name: 'showDownload', type: 'boolean', default: 'false', description: 'Mostra botão download · src vira href' },
      ]}
      sizes={[
        { name: 'LightboxImage.src', label: 'string · obrigatório', description: 'URL da imagem' },
        { name: 'LightboxImage.alt', label: 'string · obrigatório', description: 'Alt text · acessibilidade' },
        { name: 'LightboxImage.caption', label: 'string', description: 'Caption inferior · contexto adicional' },
      ]}
      examples={[
        {
          title: 'Galeria de 3 fotos com download',
          preview: <LightboxDemo />,
          code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Ver galeria</Button>
<Lightbox
  open={open}
  onClose={() => setOpen(false)}
  images={[
    { src: '/foto-1.jpg', alt: 'Sala editorial', caption: 'Encontro · 14 mai 2026' },
    { src: '/foto-2.jpg', alt: 'Setup', caption: 'Workshop · 22 abr 2026' },
  ]}
  showDownload
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra galeria de evento/portfolio', description: 'Fotos grandes precisam de full-screen · scrim blur isola.' },
          dont: { title: 'Não use Lightbox pra fotos no fluxo', description: 'Use Image inline · Lightbox é só pra "expand", não pra primeiro plano.' },
        },
        {
          do: { title: 'Caption opcional adiciona contexto', description: '"14 mai 2026 · workshop IA" · ajuda memory recall.' },
          dont: { title: 'Não use showDownload sem permissão de marca', description: 'Fotos com pessoas requerem autorização · respeite LGPD.' },
        },
      ]}
      a11y={[
        <>role=dialog + aria-modal=true · focus trap</>,
        <>Keyboard: ESC fecha · arrow esq/dir navega · Home/End primeiro/último</>,
        <>Alt text obrigatório · screen reader anuncia "Imagem X de Y: [alt]"</>,
        <>Touch swipe esquerda/direita navega (mobile)</>,
        <>Reduced motion: spring vira fade · sem zoom-in</>,
      ]}
      related={[
        { name: 'Carousel', description: 'Galeria inline · não full-screen', href: '/api/carousel' },
        { name: 'Modal', description: 'Quando conteúdo é texto/form, não imagem', href: '/api/modal' },
      ]}
    />
  );
}
