import { useLocation } from 'react-router-dom';
import DocsHeader from '../components/docs/DocsHeader';
import { navigation } from '../data/nav';
import './components/empty.css';

type Props = { area: string };

/* O H1 nunca sai do slug da URL — o rótulo em PT-BR vem do mapa de navegação.
   Slug fora do mapa cai num título genérico, também em português. */
function navLabel(pathname: string): string | null {
  for (const group of navigation) {
    for (const item of group.items) {
      if (item.to === pathname) return item.label;
    }
  }
  return null;
}

export default function PlaceholderPage({ area }: Props) {
  const { pathname } = useLocation();
  const label = navLabel(pathname);

  return (
    <>
      <DocsHeader
        eyebrow={`${area} · em breve`}
        title={
          label ? (
            <>
              {label} <em>em construção</em>
            </>
          ) : (
            <>
              Página <em>em construção</em>
            </>
          )
        }
        lede="Ainda não desenhamos esta seção. Ela está no plano e entra com o mesmo cuidado das outras."
      />

      <div className="vds-empty soft">
        <h3>O que vai ter aqui</h3>
        <p>
          Os componentes funcionando de verdade, com todos os estados e variantes, e o código
          pronto pra copiar — como em qualquer outra página do sistema.
        </p>
      </div>
    </>
  );
}
