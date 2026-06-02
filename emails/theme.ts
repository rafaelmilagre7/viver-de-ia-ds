/* ============================================================
   Viver de IA · Email design tokens (à prova de bala)
   ------------------------------------------------------------
   A identidade do DS destilada pro que cliente de email RENDERIZA:
   cores SÓLIDAS (zero degradê de fundo — Outlook ignora), zero vidro,
   zero flex/grid. Navy-dominant, fios finos, tipografia editorial.
   Tudo trava em modo claro (regra do DS: "email trava tudo em claro").
   ============================================================ */

/** Base pra assets. Em produção o time troca via env pro CDN próprio. */
export const ASSET_BASE = process.env.VIA_EMAIL_ASSETS || 'https://viver-de-ia-ds.vercel.app';
export const asset = (p: string) => `${ASSET_BASE}${p.startsWith('/') ? '' : '/'}${p}`;

export const color = {
  // superfícies
  pageBg: '#EDF0F4', // cinza frio · dá relevo ao card branco
  card: '#FFFFFF',
  cardAlt: '#F7F9FB', // callout / bloco de detalhe
  // marca
  navy: '#0A1F3B',
  navyDeep: '#02162A',
  // texto sobre branco
  ink: '#0A1F3B', // headings / strong
  body: '#344054', // corpo
  muted: '#667085', // secundário / footer
  faint: '#98A2B3', // fine print / timestamps
  onNavy: '#FFFFFF',
  onNavySoft: 'rgba(255,255,255,0.72)',
  // fios (SÓLIDOS — Outlook não herda alpha bem)
  line: '#E6E9EF',
  lineSoft: '#EFF1F5',
  // semânticos (uso parcimonioso · nunca decorativo)
  coral: '#B85C5C',
  coralInk: '#8F3F3F',
  coralBg: '#FBF3F3',
  coralLine: '#EBD3D3',
  success: '#1F8A5B',
  white: '#FFFFFF',
} as const;

/** Geist como progressive enhancement; stack de sistema carrega o visual onde Geist não chega. */
export const fontStack =
  "'Geist','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const radius = { card: 14, md: 10, sm: 8, pill: 999 } as const;

export const CONTAINER = 600;

/* ---------- estilos compartilhados (inline · React.CSSProperties) ---------- */

export const s = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: color.pageBg,
    fontFamily: fontStack,
    WebkitFontSmoothing: 'antialiased',
  } as React.CSSProperties,

  container: {
    maxWidth: `${CONTAINER}px`,
    margin: '0 auto',
    padding: '0 16px',
  } as React.CSSProperties,

  brandRow: { padding: '26px 8px 18px' } as React.CSSProperties,
  wordmark: { display: 'block', border: 0 } as React.CSSProperties,

  card: {
    backgroundColor: color.card,
    border: `1px solid ${color.line}`,
    borderRadius: `${radius.card}px`,
    padding: '40px 40px 36px',
  } as React.CSSProperties,

  eyebrow: {
    margin: '0 0 14px',
    fontFamily: fontStack,
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: color.muted,
  } as React.CSSProperties,

  h1: {
    margin: '0 0 14px',
    fontFamily: fontStack,
    fontSize: '25px',
    lineHeight: '1.25',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: color.ink,
  } as React.CSSProperties,

  lede: {
    margin: '0 0 20px',
    fontFamily: fontStack,
    fontSize: '16px',
    lineHeight: '1.6',
    color: color.body,
  } as React.CSSProperties,

  p: {
    margin: '0 0 16px',
    fontFamily: fontStack,
    fontSize: '15px',
    lineHeight: '1.66',
    color: color.body,
  } as React.CSSProperties,

  strong: { color: color.ink, fontWeight: 600 } as React.CSSProperties,

  btn: {
    backgroundColor: color.navy, // SÓLIDO — sobrevive ao Outlook
    color: color.onNavy,
    fontFamily: fontStack,
    fontSize: '15px',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    textDecoration: 'none',
    borderRadius: `${radius.pill}px`,
    padding: '13px 26px',
    display: 'inline-block',
  } as React.CSSProperties,

  hr: {
    border: 'none',
    borderTop: `1px solid ${color.line}`,
    margin: '28px 0',
  } as React.CSSProperties,

  callout: {
    backgroundColor: color.cardAlt,
    border: `1px solid ${color.line}`,
    borderRadius: `${radius.md}px`,
    padding: '20px 22px',
    margin: '0 0 22px',
  } as React.CSSProperties,

  footer: { padding: '22px 8px 36px' } as React.CSSProperties,
  footerText: {
    margin: '0 0 6px',
    fontFamily: fontStack,
    fontSize: '13px',
    lineHeight: '1.6',
    color: color.muted,
  } as React.CSSProperties,
  footerFaint: {
    margin: '0 0 4px',
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '1.6',
    color: color.faint,
  } as React.CSSProperties,
  link: { color: color.navy, textDecoration: 'underline' } as React.CSSProperties,
} as const;
