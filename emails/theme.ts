/* ============================================================
   Viver de IA · Email design tokens (à prova de bala + glass)
   ------------------------------------------------------------
   A identidade do DS no que cliente de email RENDERIZA. Liquid glass
   SIMULADO de forma segura: todo degradê vem PAREADO com um
   background-color sólido de fallback — Outlook mostra o sólido,
   Apple Mail/Gmail/iOS mostram o brilho. Logo = lockup (monograma +
   wordmark). Trava em claro.
   Cabeçalho: claro por padrão (transacional/operacional); faixa navy
   só em momento de marca (Layout variant="brand").
   Escuro forçado (Gmail app, Outlook.com ignoram o color-scheme): o
   cliente escurece background-color e clareia texto, mas NÃO mexe em
   imagem nem em background-image. Por isso painel claro é cor sólida
   (degradê claro ficaria claro com texto clareado = ilegível) e o logo
   navy fica numa base branca travada por degradê (não escurece).
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
  mutedOnPage: '#4F596B', // secundário sobre o pageBg cinza (o muted dá 4,35:1 ali) · = --via-text-muted
  faint: '#636D80', // rodapé sobre o pageBg · 4,6:1 (o #98A2B3 dava 2,25) · = --via-text-soft
  onNavy: '#FFFFFF',
  onNavySoft: 'rgba(255,255,255,0.70)',
  onNavyFaint: 'rgba(255,255,255,0.52)',
  line: '#E6E9EF',
  lineSoft: '#EFF1F5',
  glassEdge: 'rgba(255,255,255,0.16)', // brilho de borda no navy
  coral: '#B85C5C',
  coralInk: '#8F3F3F', // texto coral sobre branco · 7,1:1
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

  container: { maxWidth: `${CONTAINER}px`, margin: '0 auto', padding: '24px 16px 0' } as React.CSSProperties,

  /* lockup navy numa base da cor da superfície, travada por degradê (o modo
     escuro forçado não escurece background-image) · no claro a base some.
     O padding da base é descontado da linha (28 + 8 = 36, alinha com o texto). */
  logoRow: { padding: '28px 28px 0' } as React.CSSProperties,
  logoBase: {
    backgroundColor: color.card,
    backgroundImage: `linear-gradient(${color.card}, ${color.card})`,
    borderRadius: `${radius.sm}px`,
    padding: '6px 8px',
  } as React.CSSProperties,
  /* mesma base no rodapé, na cor do fundo da página · o padding 6 = recuo do texto do rodapé */
  footerBase: {
    backgroundColor: color.pageBg,
    backgroundImage: `linear-gradient(${color.pageBg}, ${color.pageBg})`,
    borderRadius: `${radius.sm}px`,
    padding: '6px',
  } as React.CSSProperties,
  logoImg: { display: 'block', border: 0 } as React.CSSProperties,

  /* card · padding 0; o hero e o corpo trazem o respiro */
  card: {
    backgroundColor: color.card,
    border: `1px solid ${color.line}`,
    borderRadius: `${radius.card}px`,
    overflow: 'hidden',
  } as React.CSSProperties,

  /* cabeçalho claro (padrão) · eyebrow + manchete, sem laje */
  head: { padding: '22px 36px 0' } as React.CSSProperties,
  eyebrow: {
    margin: '0 0 10px',
    fontFamily: fontStack,
    fontSize: '11px',
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: color.muted,
  } as React.CSSProperties,
  /* incidente/pagamento falho real · ponto + eyebrow coral (único coral do email) */
  eyebrowAlert: { color: color.coralInk } as React.CSSProperties,
  alertDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: `${radius.pill}px`,
    backgroundColor: color.coral,
    verticalAlign: 'middle',
    margin: '0 8px 2px 0',
  } as React.CSSProperties,
  title: {
    margin: 0,
    fontFamily: fontStack,
    fontSize: '24px',
    lineHeight: '1.24',
    fontWeight: 600,
    letterSpacing: '-0.021em',
    color: color.ink,
  } as React.CSSProperties,

  /* faixa navy (variant="brand") · degradê + glint, com fallback sólido pro Outlook */
  hero: {
    backgroundColor: color.navy,
    backgroundImage: `radial-gradient(130% 130% at 100% 0%, rgba(255,255,255,0.12), rgba(255,255,255,0) 55%), linear-gradient(140deg, ${color.navy} 0%, ${color.navyDeep} 70%, ${color.navyDarker} 100%)`,
    borderTopLeftRadius: `${radius.card}px`,
    borderTopRightRadius: `${radius.card}px`,
    borderTop: `1px solid ${color.glassEdge}`,
    padding: '30px 36px 28px',
  } as React.CSSProperties,
  heroLogo: { display: 'block', border: 0, marginBottom: '28px' } as React.CSSProperties,

  /* corpo branco */
  bodyWrap: { backgroundColor: color.card, padding: '22px 36px 34px' } as React.CSSProperties,

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

  /* painel · cor SÓLIDA (sem degradê claro: no escuro forçado ele não escurece
     e o texto clareado some) */
  callout: {
    backgroundColor: color.cardAlt,
    border: `1px solid ${color.line}`,
    borderRadius: `${radius.md}px`,
    padding: '8px 22px',
    margin: '0 0 22px',
  } as React.CSSProperties,

  footer: { padding: '22px 0 36px' } as React.CSSProperties,
  footerMonoRow: { padding: '0 0 6px' } as React.CSSProperties,
  footerTextWrap: { padding: '0 6px' } as React.CSSProperties,
  footerText: {
    margin: '0 0 6px',
    fontFamily: fontStack,
    fontSize: '13px',
    lineHeight: '1.6',
    color: color.mutedOnPage,
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

/* ---------- celular (≤480px) · refino por classe ----------
   O inline acima já é aceitável em 375 (Gmail com conta de terceiro ignora
   <style>); isto só refina onde a media query vale: respiro 20px, chave–valor
   empilhado (rótulo em cima, valor embaixo) e botão em largura total. */
export const mobileCss = `@media only screen and (max-width:480px){
.via-shell{padding-left:12px!important;padding-right:12px!important}
.via-pad{padding-left:20px!important;padding-right:20px!important}
.via-pad-logo{padding-left:12px!important;padding-right:12px!important}
.via-title{font-size:22px!important}
.via-callout{padding:6px 16px!important}
.via-kv-label,.via-kv-value{display:block!important;width:100%!important;text-align:left!important}
.via-kv-label{padding:12px 0 2px!important}
.via-kv-value{padding:0 0 12px!important}
.via-btn{display:block!important;text-align:center!important}
}`;
