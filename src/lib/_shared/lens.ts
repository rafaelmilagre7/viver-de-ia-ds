/**
 * Lente do vidro líquido · opt-in, só onde o navegador desenha.
 *
 * `backdrop-filter: url(#filtro)` só é RENDERIZADO pelo Chromium — Safari e
 * Firefox aceitam a sintaxe e não desenham nada (ou apagam o blur). Por isso
 * o portão é em JS: só liga com Chromium + suporte da sintaxe + usuário sem
 * pedido de menos transparência / mais contraste. Fora disso, nada muda: a
 * peça com `.via-glass--lens` fica com o blur normal do material.
 *
 * A lente é um mapa de deslocamento que só age na BORDA (os 18% de cada
 * lado): o centro fica neutro, então o fundo atrás do texto não distorce —
 * só a faixa do aro "dobra" o que passa por baixo, como vidro grosso.
 */
const FILTER_ID = 'via-lens';
const ON_CLASS = 'via-lens-on';

/* Mapa de deslocamento feito SÓ com primitivas e em unidades da CAIXA da
   peça (objectBoundingBox). Medido no Chromium: feImage com data-URI não
   carrega dentro de backdrop-filter, e sub-região em px/% (userSpaceOnUse)
   cai no espaço da página — os dois faziam o fundo inteiro escorregar.
   Faixas de cor nas bordas + blur = rampa suave; centro neutro (128).
   R = eixo x (255 esquerda → 0 direita) · G = eixo y (255 topo → 0 base). */
type LensShape = { id: string; x: number; y: number; scale: number };
const SHAPES: LensShape[] = [
  /* card/painel · borda nos 4 lados */
  { id: FILTER_ID, x: 0.08, y: 0.1, scale: 0.07 },
  /* barra (header) · só o eixo y: o conteúdo "dobra" ao passar pela borda */
  { id: `${FILTER_ID}-bar`, x: 0, y: 0.24, scale: 0.34 },
];

function lensFilter({ id, x, y, scale }: LensShape, k: number): string {
  const flood = (res: string, color: string, sub = '') =>
    `<feFlood flood-color="${color}" ${sub} result="${res}"/>`;
  const axis = (n: string, lo: string, mid: string, hi: string, sub1: string, sub2: string, sd: string) =>
    flood(`${n}n`, mid) +
    flood(`${n}a`, lo, sub1) +
    flood(`${n}b`, hi, sub2) +
    `<feMerge result="${n}m"><feMergeNode in="${n}n"/><feMergeNode in="${n}a"/><feMergeNode in="${n}b"/></feMerge>` +
    `<feGaussianBlur in="${n}m" stdDeviation="${sd}" edgeMode="duplicate" result="${n}"/>`;
  const rx = x
    ? axis('rx', 'rgb(255,0,0)', 'rgb(128,0,0)', 'rgb(0,0,0)',
        `x="0" y="0" width="${x}" height="1"`, `x="${1 - x}" y="0" width="${x}" height="1"`, `${x / 2} 0`)
    : flood('rx', 'rgb(128,0,0)');
  const ry = axis('ry', 'rgb(0,255,0)', 'rgb(0,128,0)', 'rgb(0,0,0)',
    `x="0" y="0" width="1" height="${y}"`, `x="0" y="${1 - y}" width="1" height="${y}"`, `0 ${y / 2}`);
  return (
    `<filter id="${id}" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox" ` +
    `primitiveUnits="objectBoundingBox" color-interpolation-filters="sRGB">` +
    rx + ry +
    `<feComposite in="rx" in2="ry" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="map"/>` +
    `<feDisplacementMap in="SourceGraphic" in2="map" scale="${(scale * k).toFixed(3)}" xChannelSelector="R" yChannelSelector="G"/>` +
    `</filter>`
  );
}

export function supportsGlassLens(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const chromium = typeof navigator !== 'undefined' && 'userAgentData' in navigator;
  const syntax =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('backdrop-filter', 'url(#a) blur(1px)');
  const mm = typeof window.matchMedia === 'function' ? window.matchMedia.bind(window) : null;
  const calm =
    !mm ||
    (!mm('(prefers-reduced-transparency: reduce)').matches && !mm('(prefers-contrast: more)').matches);
  return Boolean(chromium && syntax && calm);
}

/**
 * Liga a lente nas peças com `.via-glass--lens`. Idempotente; devolve se ligou.
 * Uso: chamar uma vez no boot do app (efeito do layout raiz). `strength`
 * 0-2 multiplica o deslocamento (1 = calibrado pra card 300-500px e barra 64px).
 */
export function enableGlassLens(strength = 1): boolean {
  if (!supportsGlassLens()) return false;
  const k = Number.isFinite(strength) ? Math.max(0, Math.min(2, strength)) : 1;
  if (!document.getElementById(FILTER_ID)) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.style.pointerEvents = 'none';
    svg.innerHTML = SHAPES.map((shape) => lensFilter(shape, k)).join('');
    document.body.appendChild(svg);
  }
  document.documentElement.classList.add(ON_CLASS);
  return true;
}

export function disableGlassLens(): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.remove(ON_CLASS);
  document.getElementById(FILTER_ID)?.closest('svg')?.remove();
}
