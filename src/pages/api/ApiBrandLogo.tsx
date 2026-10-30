import { BrandLogo } from '../../lib/BrandLogo/BrandLogo';
import ComponentDoc from '../../components/docs/ComponentDoc';
import { BrandLogo as meta } from './props.generated.json';

export default function ApiBrandLogo() {
  return (
    <ComponentDoc
      eyebrow="api · brand logo"
      name="BrandLogo"
      headline="a marca oficial, nítida em qualquer tamanho."
      description="Logo oficial em vetor · nítido em qualquer tamanho. O logo da Viver de IA como SVG inline (sem arquivo pra importar): monograma VIA + wordmark VIVER DE IA nas proporções do arquivo original do designer. Herda a cor por currentColor; variant escolhe a tinta. Pra HTML sem React, use os arquivos lockup-navy.svg / lockup-white.svg / monogram-*.svg do kit ou de viver-de-ia-ds.vercel.app/logos/."
      importLine={`import { BrandLogo, type BrandLogoProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-brand-logo', description: 'SVG único · role=img · aria-label="Viver de IA" · fill=currentColor' },
        { part: 'monograma', description: 'VIA · altura do lockup = altura do monograma' },
        { part: 'wordmark', description: 'VIVER DE IA · nunca usado sozinho' },
      ]}
      meta={meta}
      descriptions={{
        variant: 'black = tinta oficial #010F1D pra fundo claro · white pra fundo escuro · auto troca com o tema',
        size: 'sm/md/lg = lockup 28/36/48px (monograma 20/28/40px) · ou número em px',
        monoOnly: 'Só o monograma · favicon, avatar, canto de slide interior',
        className: 'Classe custom no SVG',
        style: 'Estilo inline no SVG',
      }}
      examples={[
        {
          title: 'Lockup em fundo claro e escuro',
          preview: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <BrandLogo />
              <span style={{ background: 'var(--via-navy)', padding: '16px 20px', borderRadius: 12, lineHeight: 0 }}>
                <BrandLogo variant="white" />
              </span>
            </div>
          ),
          code: `<BrandLogo />
<BrandLogo variant="white" />`,
        },
        {
          title: 'Tamanhos e monograma',
          preview: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <BrandLogo size="sm" />
              <BrandLogo size="lg" />
              <BrandLogo monoOnly size="lg" />
            </div>
          ),
          code: `<BrandLogo size="sm" />
<BrandLogo size="lg" />
<BrandLogo monoOnly size="lg" />`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Lockup completo por padrão', description: 'Monograma + wordmark juntos, na proporção do livro.' },
          dont: { title: 'Não use o wordmark sozinho', description: 'VIVER DE IA sem o monograma é meio logo, não a marca.' },
        },
        {
          do: { title: 'Componente ou arquivo SVG oficial', description: 'Nítido em post, slide, telão e retina.' },
          dont: { title: 'Não redesenhe nem estique', description: 'Nada de texto estilizado imitando o wordmark, sombra, contorno ou outra cor.' },
        },
      ]}
      a11y={[
        <>role=img + aria-label="Viver de IA" · um nome só pro lockup inteiro</>,
        <>Cor por currentColor · contraste vem do fundo certo (black no claro, white no escuro)</>,
      ]}
      related={[
        { name: 'Logo usage', description: 'Clear space, tamanho mínimo e do/don\'t', href: '/foundations/logo-usage' },
      ]}
    />
  );
}
