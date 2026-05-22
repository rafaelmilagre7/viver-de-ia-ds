import { navigation } from './nav';

export interface SearchEntry {
  /** Group label (categoria) */
  group: string;
  /** Display label (primary text) */
  label: string;
  /** Destination route */
  to: string;
  /** Short description shown under label */
  description?: string;
  /** Aliases, sinônimos, palavras-chave em PT-BR e EN */
  keywords?: string[];
}

/* ============================================================
   Keyword overlays · enriquece o nav básico com palavras
   adicionais pra fuzzy search funcionar bem.
   Match por path (to) — sobrescreve description e keywords.
   ============================================================ */
const KEYWORD_OVERLAYS: Record<string, Pick<SearchEntry, 'description' | 'keywords'>> = {
  // Foundations
  '/foundations/brand': {
    description: 'Identidade visual, logo, monograma',
    keywords: ['logo', 'identidade', 'marca', 'monogram', 'wordmark'],
  },
  '/foundations/brand-story': {
    description: 'Mission · vision · values',
    keywords: ['mission', 'missão', 'vision', 'visão', 'values', 'valores', 'story', 'narrativa'],
  },
  '/foundations/personality': {
    description: '7 atributos editoriais da marca',
    keywords: ['traits', 'atributos', 'personality', 'tom', 'voice'],
  },
  '/foundations/voice-extended': {
    description: 'Voz em 9 contextos diferentes',
    keywords: ['tom', 'voz', 'voice', 'tone', 'copy', 'writing'],
  },
  '/foundations/logo-usage': {
    description: 'Clear space, sizes, do/don\'t',
    keywords: ['logo', 'marca', 'monogram', 'wordmark', 'clear space', 'guidelines'],
  },
  '/foundations/color': {
    description: 'Paleta restrita navy/gray/blue/white',
    keywords: ['cor', 'paleta', 'palette', 'navy', 'gray', 'blue', 'tokens'],
  },
  '/foundations/typography': {
    description: 'Geist Sans + Display + Mono',
    keywords: ['fonte', 'font', 'type', 'geist', 'inter', 'serif', 'mono'],
  },
  '/foundations/spacing': {
    description: 'Sistema 4px · scale exponencial',
    keywords: ['gap', 'padding', 'margin', 'spacing', 'gutter'],
  },
  '/foundations/radii': {
    description: 'Border radius · 7 tokens',
    keywords: ['radius', 'border-radius', 'rounded', 'arredondado'],
  },
  '/foundations/shadows': {
    description: 'Shadow stack 4-layer · editorial',
    keywords: ['shadow', 'box-shadow', 'elevation', 'sombra'],
  },
  '/foundations/motion': {
    description: 'Spring physics · cubic-bezier · timings',
    keywords: ['motion', 'animation', 'transition', 'spring', 'timing', 'movimento'],
  },
  '/foundations/philosophy': {
    description: '6 regras não-negociáveis',
    keywords: ['principles', 'rules', 'philosophy', 'filosofia', 'regras'],
  },
  '/foundations/library': {
    description: 'React lib · tipada · exportável',
    keywords: ['lib', 'biblioteca', 'react', 'components', 'package'],
  },
  '/foundations/theming': {
    description: 'CSS-first · ThemeProvider · useTheme',
    keywords: ['theme', 'tema', 'dark mode', 'light mode', 'tokens', 'override', 'provider'],
  },

  // Glass
  '/glass/anatomy': { description: 'Como construir liquid glass', keywords: ['blur', 'backdrop-filter', 'glassmorphism'] },
  '/glass/variants': { description: '4 variantes editoriais', keywords: ['glass', 'tipos'] },
  '/glass/in-context': { description: 'Glass em uso real', keywords: ['exemplos', 'pattern'] },

  // API docs (selected high-volume keywords)
  '/api/button': { description: 'CTA · sentence-case · pill 999', keywords: ['cta', 'botão', 'action', 'submit'] },
  '/api/card': { description: 'Container editorial com glass', keywords: ['box', 'container', 'tile'] },
  '/api/input': { description: 'Campo de texto · label + hint + error', keywords: ['form', 'field', 'campo', 'text'] },
  '/api/modal': { description: 'Dialog focado · ESC + scrim', keywords: ['dialog', 'popup', 'overlay'] },
  '/api/drawer': { description: 'Painel lateral · 4 sides', keywords: ['sidebar', 'panel', 'gaveta'] },
  '/api/sheet': { description: 'Bottom sheet mobile · grip handle', keywords: ['mobile', 'bottom', 'panel'] },
  '/api/avatar': { description: 'Foto, iniciais, status dot', keywords: ['user', 'profile', 'foto', 'pessoa'] },
  '/api/pill': { description: 'Status chip · 11px lowercase', keywords: ['chip', 'badge', 'tag', 'status', 'label'] },
  '/api/tabs': { description: 'Underline ou pills · keyboard nav', keywords: ['tabs', 'aba', 'navigation'] },
  '/api/switch': { description: 'Toggle on/off · spring', keywords: ['toggle', 'on/off', 'boolean', 'switch'] },
  '/api/toast': { description: 'Notificação efêmera · 4 variants', keywords: ['notification', 'flash', 'feedback'] },
  '/api/tooltip': { description: 'Texto curto em hover', keywords: ['hover', 'help', 'hint'] },
  '/api/slider': { description: 'Range input editorial', keywords: ['range', 'thumb', 'slide'] },
  '/api/alert': { description: 'Banner inline persistente', keywords: ['banner', 'message', 'warning'] },
  '/api/progress': { description: 'Barra determinística · shimmer', keywords: ['loading', 'bar', 'percent'] },
  '/api/data-table': { description: 'Tabela sortable · zebra · density', keywords: ['table', 'tabela', 'grid', 'sort'] },
  '/api/checkbox': { description: 'Selection múltipla · indeterminate', keywords: ['check', 'box', 'form'] },
  '/api/radio-group': { description: 'Escolha exclusiva entre N', keywords: ['radio', 'option', 'exclusive'] },
  '/api/select': { description: 'Dropdown editorial · listbox', keywords: ['dropdown', 'select', 'option'] },
  '/api/combobox': { description: 'Select + search interno', keywords: ['autocomplete', 'typeahead', 'search'] },
  '/api/multi-select': { description: 'Chips multi · max limit', keywords: ['multi', 'chips', 'tags'] },
  '/api/dropdown-menu': { description: 'Context/overflow menu · keyboard', keywords: ['menu', 'dropdown', 'context', 'overflow', '...'] },
  '/api/context-menu': { description: 'Right-click menu · cursor-anchored', keywords: ['right-click', 'context', 'menu'] },
  '/api/popover': { description: 'Floating panel · 4 sides × 3 align', keywords: ['floating', 'panel', 'overlay'] },
  '/api/command': { description: 'Cmd+K palette · keyboard-first', keywords: ['cmd k', 'palette', 'search', 'navigation', 'spotlight'] },
  '/api/date-picker': { description: 'Calendário pt-BR · min/max', keywords: ['date', 'data', 'calendar'] },
  '/api/date-range-picker': { description: 'Intervalo · 2 cliques · presets', keywords: ['range', 'period', 'intervalo', 'data'] },
  '/api/time-picker': { description: 'HH:MM 24h · step minutes', keywords: ['hour', 'minute', 'time', 'hora'] },
  '/api/calendar': { description: 'Standalone · markers coloridos', keywords: ['date', 'calendar', 'events'] },
  '/api/carousel': { description: 'Gallery slider · auto-play · touch', keywords: ['gallery', 'slider', 'swipe', 'images'] },
  '/api/stepper': { description: 'Wizard editorial · horizontal/vertical', keywords: ['steps', 'wizard', 'onboarding', 'passos'] },
  '/api/accordion': { description: 'Expandir/colapsar · FAQ-style', keywords: ['collapse', 'expand', 'faq', 'collapse'] },
  '/api/breadcrumb': { description: 'Hierarquia · chevron · last=current', keywords: ['breadcrumb', 'hierarchy', 'path'] },
  '/api/pagination': { description: 'Numerada · prev/next + ellipsis', keywords: ['pages', 'pagination', 'page'] },
  '/api/spinner': { description: 'Loader inline indeterminado', keywords: ['loader', 'loading', 'spinner'] },
  '/api/skeleton': { description: 'Placeholder com shimmer', keywords: ['loading', 'placeholder', 'skeleton'] },
  '/api/empty-state': { description: 'Lista vazia editorial · ação', keywords: ['empty', 'vazio', 'no data', 'placeholder'] },
  '/api/icon': { description: 'Wrapper Lucide · 4 surfaces', keywords: ['icon', 'lucide', 'svg'] },
  '/api/hover-card': { description: 'Rich preview · hover/focus', keywords: ['hover', 'preview', 'card'] },
  '/api/otp-input': { description: 'Código verificação · 2FA · paste', keywords: ['otp', '2fa', 'two-factor', 'verification', 'code'] },
  '/api/tag-input': { description: 'Chips multi · suggestions', keywords: ['tags', 'chips', 'input', 'keywords'] },
  '/api/tree-view': { description: 'Árvore filesystem-style · ARIA tree', keywords: ['tree', 'hierarchy', 'árvore', 'sitemap'] },
  '/api/splitter': { description: 'Divisor arrastável · resize', keywords: ['split', 'resize', 'divider', 'pane'] },
  '/api/virtual-list': { description: 'Performance pra 10000+ items', keywords: ['virtual', 'list', 'performance', 'scroll'] },
  '/api/lightbox': { description: 'Foto tela cheia · keyboard arrows', keywords: ['gallery', 'image', 'photo', 'fullscreen'] },
  '/api/color-picker': { description: 'Paleta canônica + hex livre', keywords: ['color', 'picker', 'palette', 'hex'] },

  // Patterns (high-value)
  '/patterns/two-factor': { description: '2FA setup flow · OTPInput', keywords: ['2fa', 'two-factor', 'security', 'otp', 'auth'] },
  '/patterns/pricing-comparison': { description: 'Tabela 3 tiers · 12 features', keywords: ['pricing', 'plans', 'tiers', 'comparison', 'preço'] },
  '/patterns/errors': { description: '404 / 403 / 500 / maintenance', keywords: ['error', 'erro', '404', '500', '403', 'not found', 'maintenance'] },
  '/patterns/billing': { description: '4-step checkout · summary sticky', keywords: ['checkout', 'billing', 'payment', 'pagamento', 'subscribe'] },
  '/patterns/auth-flow': { description: 'Login · signup · magic link', keywords: ['login', 'signup', 'auth', 'register', 'cadastro'] },
  '/patterns/cancellation': { description: 'Fluxo de cancelamento honesto', keywords: ['cancel', 'cancelamento', 'churn', 'pause'] },
  '/patterns/onboarding': { description: 'Wizard editorial · 4 passos', keywords: ['onboarding', 'wizard', 'getting started'] },
  '/patterns/dashboard': { description: 'KPI grid + Charts + Activity', keywords: ['dashboard', 'kpi', 'metrics', 'analytics'] },
  '/patterns/pricing': { description: '3 tiers simples · cards', keywords: ['pricing', 'plans', 'preço'] },
  '/patterns/email': { description: 'Template editorial transacional', keywords: ['email', 'template', 'transactional'] },
  '/patterns/faq': { description: 'Perguntas frequentes + busca', keywords: ['faq', 'questions', 'perguntas', 'help'] },

  // Guidelines
  '/guidelines/voice': { description: 'Voz editorial · do/dont', keywords: ['voice', 'tom', 'copy', 'writing'] },
  '/guidelines/copy': { description: 'Microcopy · CTAs · errors', keywords: ['copy', 'microcopy', 'cta', 'wording'] },
  '/guidelines/dos-donts': { description: 'O que fazer · o que evitar', keywords: ['rules', 'guidelines', 'principles'] },
};

/* ============================================================
   Manual API entries · não estão em nav.ts (evita poluir sidebar)
   mas devem aparecer na busca · cada uma puxa overlay de keywords
   ============================================================ */
const API_ENTRIES: { label: string; to: string }[] = [
  { label: 'Button (CTA)', to: '/api/button' },
  { label: 'Card', to: '/api/card' },
  { label: 'Input', to: '/api/input' },
  { label: 'Modal (dialog)', to: '/api/modal' },
  { label: 'Avatar', to: '/api/avatar' },
  { label: 'Pill (status chip)', to: '/api/pill' },
  { label: 'Tabs', to: '/api/tabs' },
  { label: 'Switch (toggle)', to: '/api/switch' },
  { label: 'Toast (notificação)', to: '/api/toast' },
  { label: 'Tooltip', to: '/api/tooltip' },
  { label: 'Slider (range)', to: '/api/slider' },
  { label: 'Alert (banner)', to: '/api/alert' },
  { label: 'Progress', to: '/api/progress' },
  { label: 'Drawer (lateral)', to: '/api/drawer' },
  { label: 'DataTable (tabela sortable)', to: '/api/data-table' },
  { label: 'Checkbox', to: '/api/checkbox' },
  { label: 'RadioGroup', to: '/api/radio-group' },
  { label: 'Select (dropdown)', to: '/api/select' },
  { label: 'Combobox (search select)', to: '/api/combobox' },
  { label: 'MultiSelect', to: '/api/multi-select' },
  { label: 'DropdownMenu (...)', to: '/api/dropdown-menu' },
  { label: 'ContextMenu (right-click)', to: '/api/context-menu' },
  { label: 'Popover (floating)', to: '/api/popover' },
  { label: 'Command (Cmd+K palette)', to: '/api/command' },
  { label: 'DatePicker', to: '/api/date-picker' },
  { label: 'DateRangePicker', to: '/api/date-range-picker' },
  { label: 'TimePicker', to: '/api/time-picker' },
  { label: 'Calendar (standalone)', to: '/api/calendar' },
  { label: 'Carousel (gallery)', to: '/api/carousel' },
  { label: 'Stepper (wizard)', to: '/api/stepper' },
  { label: 'Accordion (FAQ)', to: '/api/accordion' },
  { label: 'Breadcrumb', to: '/api/breadcrumb' },
  { label: 'Pagination', to: '/api/pagination' },
  { label: 'Spinner (loader)', to: '/api/spinner' },
  { label: 'Skeleton (placeholder)', to: '/api/skeleton' },
  { label: 'EmptyState', to: '/api/empty-state' },
  { label: 'Icon (Lucide wrapper)', to: '/api/icon' },
  { label: 'HoverCard (preview)', to: '/api/hover-card' },
  { label: 'OTPInput (2FA code)', to: '/api/otp-input' },
  { label: 'TagInput (chips livres)', to: '/api/tag-input' },
  { label: 'TreeView (árvore)', to: '/api/tree-view' },
  { label: 'Splitter (resize)', to: '/api/splitter' },
  { label: 'VirtualList (10k+)', to: '/api/virtual-list' },
  { label: 'Lightbox (foto fullscreen)', to: '/api/lightbox' },
  { label: 'ColorPicker', to: '/api/color-picker' },
  { label: 'Sheet (bottom mobile)', to: '/api/sheet' },
];

/** Achata a navegação + adiciona API docs + aplica overlays de keywords */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const group of navigation) {
    for (const item of group.items) {
      const overlay = KEYWORD_OVERLAYS[item.to] || {};
      entries.push({
        group: group.label,
        label: item.label,
        to: item.to,
        description: overlay.description,
        keywords: overlay.keywords,
      });
    }
  }
  // API docs em grupo separado (não polui sidebar mas aparece em search)
  for (const item of API_ENTRIES) {
    const overlay = KEYWORD_OVERLAYS[item.to] || {};
    entries.push({
      group: 'API docs',
      label: item.label,
      to: item.to,
      description: overlay.description,
      keywords: overlay.keywords,
    });
  }
  return entries;
}

/* ============================================================
   Scoring · token-match com pesos
   ------------------------------------------------------------
   - tokeniza a query (split por espaço)
   - cada token DEVE aparecer em (label | group | keywords | description)
   - score:
     - +100 pra label exato
     - +60  pra label starts-with token
     - +40  pra label contains token
     - +20  pra keyword match
     - +10  pra description contains
     - +5   pra group contains
   ============================================================ */

export interface SearchResult extends SearchEntry {
  score: number;
}

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function scoreEntry(entry: SearchEntry, tokens: string[]): number {
  const label = normalize(entry.label);
  const group = normalize(entry.group);
  const desc = entry.description ? normalize(entry.description) : '';
  const kws = (entry.keywords || []).map(normalize);

  let total = 0;
  for (const tok of tokens) {
    let tokenScore = 0;
    if (label === tok) tokenScore = Math.max(tokenScore, 100);
    else if (label.startsWith(tok + ' ') || label.startsWith(tok)) tokenScore = Math.max(tokenScore, 60);
    else if (label.includes(tok)) tokenScore = Math.max(tokenScore, 40);

    if (kws.some((k) => k === tok)) tokenScore = Math.max(tokenScore, 30);
    else if (kws.some((k) => k.includes(tok))) tokenScore = Math.max(tokenScore, 20);

    if (desc.includes(tok)) tokenScore = Math.max(tokenScore, 10);
    if (group.includes(tok)) tokenScore = Math.max(tokenScore, 5);

    if (tokenScore === 0) return -1; // token não matcha em lugar nenhum · descarta
    total += tokenScore;
  }
  return total;
}

export function searchIndex(index: SearchEntry[], query: string): SearchResult[] {
  const q = normalize(query.trim());
  if (!q) return index.map((e) => ({ ...e, score: 0 }));
  const tokens = q.split(/\s+/).filter(Boolean);
  return index
    .map((entry) => ({ ...entry, score: scoreEntry(entry, tokens) }))
    .filter((e) => e.score >= 0)
    .sort((a, b) => b.score - a.score);
}

/* ============================================================
   Recents · localStorage · 8 últimas visitas
   ============================================================ */
const RECENTS_KEY = 'via-cmdk-recents';
const RECENTS_MAX = 8;

export function getRecents(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(0, RECENTS_MAX) : [];
  } catch {
    return [];
  }
}

export function pushRecent(to: string) {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecents().filter((p) => p !== to);
    const next = [to, ...current].slice(0, RECENTS_MAX);
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getRecentEntries(index: SearchEntry[]): SearchEntry[] {
  const recents = getRecents();
  return recents
    .map((to) => index.find((e) => e.to === to))
    .filter((e): e is SearchEntry => Boolean(e));
}
