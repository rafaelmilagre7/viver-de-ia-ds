import { useLocation } from 'react-router-dom';
import { buildSearchIndex } from '../data/searchIndex';

/**
 * RouteMeta · título, descrição e canonical por rota (tags nativas do React 19,
 * que sobem sozinhas pro <head>).
 *
 * Fonte única: o mesmo índice que alimenta a barra lateral e o ⌘K
 * (nav + API docs) — página nova na nav já ganha título sem tocar aqui.
 * Rota fora do índice não renderiza nada: o NotFound / PlaceholderPage
 * cuidam do próprio título e do noindex.
 */

const SITE_URL = 'https://viver-de-ia-ds.vercel.app';
const SITE_NAME = 'Viver de IA Design System';
const HOME_TITLE = 'Viver de IA · Design System';
const HOME_DESCRIPTION =
  'Design System Viver de IA — marca editorial, navy profundo, vidro líquido e tipografia Geist. Mais de 100 páginas vivas, 47 componentes React e 14 emails de produção.';

// Rótulos da nav que não funcionam como título de aba
const TITLE_OVERRIDES: Record<string, string> = {
  '/ai': 'Usar em qualquer IA',
  '/components/more': 'Mais componentes · vol. 1',
  '/components/more-2': 'Mais componentes · vol. 2',
};

type Meta = { title: string; description: string; canonical: string };

const META = new Map<string, Meta>();
for (const e of buildSearchIndex()) {
  // "Paid ads (Meta + Google · 12 creatives)" → nome "Paid ads", detalhe no parêntese
  const m = e.label.match(/^(.*?)\s*\((.+)\)\s*$/);
  const name = TITLE_OVERRIDES[e.to] ?? (m ? m[1] : e.label);
  const page = e.group === 'API docs' ? `${name} · API` : name;
  const detail = e.description ?? m?.[2];
  META.set(e.to, {
    title: `${page} · ${SITE_NAME}`,
    description: detail
      ? `${page}: ${detail}. ${e.group} do Design System da Viver de IA.`
      : `${page} · ${e.group} do Design System da Viver de IA — tokens, componentes e regras da marca.`,
    canonical: SITE_URL + e.to,
  });
}
META.set('/', { title: HOME_TITLE, description: HOME_DESCRIPTION, canonical: SITE_URL + '/' });
META.set('/ai', {
  title: `${TITLE_OVERRIDES['/ai']} · ${SITE_NAME}`,
  description: 'Use o padrão Viver de IA em qualquer IA: prompt-mestre e kit pra Claude, ChatGPT, Lovable ou Cursor — paleta, voz editorial e contraste nos dois temas.',
  canonical: SITE_URL + '/ai',
});

export default function RouteMeta() {
  const { pathname } = useLocation();
  // O router aceita barra final e maiúsculas — o canonical não
  const key = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const meta = META.get(key);
  if (!meta) return null;

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:url" content={meta.canonical} />
    </>
  );
}
