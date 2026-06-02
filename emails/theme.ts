/* ============================================================
   Viver de IA · Email design tokens (à prova de bala + glass)
   ------------------------------------------------------------
   A identidade do DS no que cliente de email RENDERIZA. Liquid glass
   SIMULADO de forma segura: todo degradê vem PAREADO com um
   background-color sólido de fallback — Outlook mostra o sólido,
   Apple Mail/Gmail/iOS mostram o brilho. Logo = lockup (monograma +
   wordmark). Trava em claro.
   ============================================================ */

export const ASSET_BASE = process.env.VIA_EMAIL_ASSETS || 'https://viver-de-ia-ds.vercel.app';
export const asset = (p: string) => `${ASSET_BASE}${p.startsWith('/') ? '' : '/'}${p}`;

export const color = {
  pageBg: '#EDF0F4',
  card: '#FFFFFF',
  cardAlt: '#F7F9FB',
  navy: '#0A1F3B',
  navyDeep: '#02162A',
  navyDarker: '#010B1A',
  navyLift: '#16335C', // navy "iluminado" pro topo de gradientes (gloss)
  ink: '#0A1F3B',
  body: '#344054',
  muted: '#667085',
  faint: '#98A2B3',
  onNavy: '#FFFFFF',
  onNavySoft: 'rgba(255,255,255,0.70)',
  onNavyFaint: 'rgba(255,255,255,0.52)',
  line: '#E6E9EF',
  lineSoft: '#EFF1F5',
  glassEdge: 'rgba(255,255,255,0.16)', // brilho de borda no navy
  coral: '#B85C5C',
  coralInk: '#8F3F3F',
  coralBg: '#FBF3F3',
  coralLine: '#EBD3D3',
  success: '#1F8A5B',
  white: '#FFFFFF',
} as const;

export const fontStack =
  "'Geist','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const radius = { card: 16, md: 12, sm: 8, pill: 999 } as const;
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

  container: { maxWidth: `${CONTAINER}px`, margin: '0 auto', padding: '0 16px' } as React.CSSProperties,

  /* marca · lockup monograma + wordmark · discreto (letterhead) */
  brandRow: { padding: '24px 4px 14px' } as React.CSSProperties,
  brandMono: { display: 'block', border: 0 } as React.CSSProperties,
  brandWord: { display: 'block', border: 0 } as React.CSSProperties,

  /* card · padding 0; o hero e o corpo trazem o respiro */
  card: {
    backgroundColor: color.card,
    border: `1px solid ${color.line}`,
    borderRadius: `${radius.card}px`,
    overflow: 'hidden',
  } as React.CSSProperties,

  /* hero navy glassy · degradê + glint, com fallback sólido pro Outlook */
  hero: {
    backgroundColor: color.navy,
    backgroundImage: `radial-gradient(130% 130% at 100% 0%, rgba(255,255,255,0.12), rgba(255,255,255,0) 55%), linear-gradient(140deg, ${color.navy} 0%, ${color.navyDeep} 70%, ${color.navyDarker} 100%)`,
    borderTopLeftRadius: `${radius.card}px`,
    borderTopRightRadius: `${radius.card}px`,
    borderTop: `1px solid ${color.glassEdge}`,
    padding: '32px 36px 28px',
  } as React.CSSProperties,
  heroEyebrow: {
    margin: '0 0 11px',
    fontFamily: fontStack,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: color.onNavySoft,
  } as React.CSSProperties,
  heroTitle: {
    margin: 0,
    fontFamily: fontStack,
    fontSize: '24px',
    lineHeight: '1.24',
    fontWeight: 600,
    letterSpacing: '-0.021em',
    color: color.onNavy,
  } as React.CSSProperties,

  /* corpo branco */
  bodyWrap: { backgroundColor: color.card, padding: '30px 36px 34px' } as React.CSSProperties,

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

  /* CTA · navy glossy (degradê + fallback sólido) */
  btn: {
    backgroundColor: color.navy,
    backgroundImage: `linear-gradient(180deg, ${color.navyLift} 0%, ${color.navy} 58%)`,
    color: color.onNavy,
    fontFamily: fontStack,
    fontSize: '15px',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    textDecoration: 'none',
    borderRadius: `${radius.pill}px`,
    padding: '13px 26px',
    display: 'inline-block',
    border: `1px solid ${color.navyDeep}`,
  } as React.CSSProperties,

  hr: { border: 'none', borderTop: `1px solid ${color.line}`, margin: '26px 0' } as React.CSSProperties,

  /* painel frosted glass · degradê claro + fallback sólido + borda + glint */
  callout: {
    backgroundColor: color.cardAlt,
    backgroundImage: `linear-gradient(180deg, ${color.white} 0%, #F2F5F9 100%)`,
    border: `1px solid ${color.line}`,
    borderTop: `1px solid #FFFFFF`,
    borderRadius: `${radius.md}px`,
    padding: '20px 22px',
    margin: '0 0 22px',
  } as React.CSSProperties,

  footer: { padding: '22px 6px 36px' } as React.CSSProperties,
  footerMono: { display: 'block', border: 0, marginBottom: '12px' } as React.CSSProperties,
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
