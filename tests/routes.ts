/**
 * Rotas canônicas do design system · usadas pela suite de visual regression.
 *
 * Mantenha sincronizado com `src/App.tsx`. Cada entry vira 2 snapshots
 * (desktop 1440 + mobile 375) — mexer aqui custa ~2 segundos por rota
 * adicionada.
 */
export interface Route {
  path: string;
  // Nome do snapshot file (sem extensão). Default: deriva do path.
  slug?: string;
  // Wait extra antes do snapshot (ms) — pra heroes com mesh/blur pesados
  // que demoram a estabilizar. Default 0.
  settleMs?: number;
  // Tolerância de diff custom (default herda do playwright.config.ts: 0.005).
  // Use pra páginas com randomness (sparkline noise, etc).
  maxDiffPixelRatio?: number;
}

export const routes: Route[] = [
  // Hero
  { path: '/', slug: 'home', settleMs: 200 },
  { path: '/manifesto', settleMs: 100 },

  // Foundations
  { path: '/foundations/brand' },
  { path: '/foundations/brand-story' },
  { path: '/foundations/personality' },
  { path: '/foundations/voice-extended' },
  { path: '/foundations/logo-usage' },
  { path: '/foundations/color' },
  { path: '/foundations/typography' },
  { path: '/foundations/spacing' },
  { path: '/foundations/radii' },
  { path: '/foundations/shadows' },
  { path: '/foundations/motion' },
  { path: '/foundations/philosophy' },
  { path: '/foundations/library', settleMs: 150 },

  // Glass
  { path: '/glass/anatomy' },
  { path: '/glass/variants' },
  { path: '/glass/in-context' },

  // Iconography
  { path: '/iconography/marks' },
  { path: '/iconography/icons' },
  { path: '/iconography/photography' },

  // Components
  { path: '/components/buttons' },
  { path: '/components/tags' },
  { path: '/components/badges' },
  { path: '/components/cards' },
  { path: '/components/form' },
  { path: '/components/modal' },
  { path: '/components/table' },
  { path: '/components/tabs' },
  { path: '/components/toast' },
  { path: '/components/tooltip' },
  { path: '/components/accordion' },
  { path: '/components/stepper' },
  { path: '/components/empty' },
  { path: '/components/avatar' },
  { path: '/components/breadcrumb' },
  { path: '/components/pagination' },
  { path: '/components/toggle' },
  { path: '/components/slider' },
  { path: '/components/dropdown' },
  { path: '/components/search' },
  { path: '/components/upload' },
  { path: '/components/nav' },
  { path: '/components/stats' },
  { path: '/components/case-card' },
  { path: '/components/chat' },
  { path: '/components/more' },
  { path: '/components/more-2' },
  { path: '/components/media' },
  { path: '/components/charts' },
  { path: '/components/code' },
  { path: '/components/form-advanced' },
  // DataVizExtra usa Math.random() pra sparkline noise · tolerância maior
  { path: '/components/data-viz-extra', maxDiffPixelRatio: 0.05 },
  { path: '/components/states' },
  { path: '/components/overlays' },
  { path: '/components/notifications' },
  { path: '/components/form-power' },

  // Patterns
  { path: '/patterns/article' },
  { path: '/patterns/feature-grid' },
  { path: '/patterns/kpi' },
  { path: '/patterns/podcast' },
  { path: '/patterns/pricing' },
  { path: '/patterns/testimonial' },
  { path: '/patterns/dashboard' },
  { path: '/patterns/onboarding' },
  { path: '/patterns/email' },
  { path: '/patterns/email-coverage', settleMs: 150 },
  { path: '/patterns/whatsapp' },
  { path: '/patterns/social' },
  { path: '/patterns/social-coverage', settleMs: 150 },
  { path: '/patterns/paid-ads', settleMs: 150 },
  { path: '/patterns/landing-elements', settleMs: 200 },
  { path: '/patterns/commercial', settleMs: 200 },
  { path: '/patterns/invoice' },
  { path: '/patterns/slides' },
  { path: '/patterns/curriculum' },
  { path: '/patterns/lesson' },
  { path: '/patterns/editorial' },
  { path: '/patterns/people' },
  { path: '/patterns/admin' },
  { path: '/patterns/achievement', settleMs: 200 },
  { path: '/patterns/live', settleMs: 100 },
  { path: '/patterns/bento' },
  { path: '/patterns/course-player' },
  { path: '/patterns/mentor-matching' },
  { path: '/patterns/changelog' },
  { path: '/patterns/insights' },
  { path: '/patterns/roadmap' },
  { path: '/patterns/status' },
  { path: '/patterns/conference-agenda' },
  { path: '/patterns/trust-signals' },
  { path: '/patterns/sticky-cta' },
  { path: '/patterns/faq' },
  { path: '/patterns/location' },
  { path: '/patterns/cancellation' },
  { path: '/patterns/search-results' },
  { path: '/patterns/auth-flow' },

  // Showcase
  { path: '/showcase/marketing', settleMs: 200 },
  { path: '/showcase/leaders-ai', settleMs: 200 },
  { path: '/showcase/aluno', settleMs: 200 },
  { path: '/showcase/login' },
  { path: '/showcase/settings' },

  // Guidelines
  { path: '/guidelines/voice' },
  { path: '/guidelines/copy' },
  { path: '/guidelines/dos-donts' },
];

export function routeSlug(r: Route): string {
  if (r.slug) return r.slug;
  return r.path === '/' ? 'home' : r.path.replace(/^\//, '').replace(/\//g, '-');
}
