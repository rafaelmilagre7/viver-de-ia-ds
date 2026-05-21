import { useParams } from 'react-router-dom';
import DocsHeader from '../components/docs/DocsHeader';

type Props = { area: string };

export default function PlaceholderPage({ area }: Props) {
  const { slug } = useParams();
  const title = slug ? slug.replace(/-/g, ' ') : 'Em construção';

  return (
    <>
      <DocsHeader
        eyebrow={`${area} · em breve`}
        title={
          <>
            {title.charAt(0).toUpperCase() + title.slice(1)} <em>em construção</em>
          </>
        }
        lede="Essa seção está no plano e será desenhada com o mesmo cuidado das outras. Volta quando estiver pronta — você vai ver os componentes funcionando, com estados, variantes e código copiável."
      />

      <div
        style={{
          padding: 48,
          border: '0.5px dashed var(--via-navy-40)',
          borderRadius: 'var(--via-radius-lg)',
          background:
            'repeating-linear-gradient(135deg, transparent 0, transparent 12px, var(--via-navy-03) 12px, var(--via-navy-03) 13px)',
          color: 'var(--via-gray-500)',
          fontFamily: 'var(--via-font)',
          fontSize: 13,
          textAlign: 'center',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        Placeholder editorial · cristalizado no próximo bloco
      </div>
    </>
  );
}
