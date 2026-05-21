import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Shell from './layout/Shell';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PlaceholderPage from './pages/PlaceholderPage';
import RouteLoader from './components/RouteLoader';

/* ============================================
   Lazy-loaded routes · code-split por rota
   Bundle inicial fica leve (Shell + Home).
   Demais páginas baixam sob demanda em chunks separados.
   ============================================ */

// Hero
const Manifesto = lazy(() => import('./pages/Manifesto'));

// Foundations
const Brand = lazy(() => import('./pages/foundations/Brand'));
const Color = lazy(() => import('./pages/foundations/Color'));
const Typography = lazy(() => import('./pages/foundations/Typography'));
const Spacing = lazy(() => import('./pages/foundations/Spacing'));
const Radii = lazy(() => import('./pages/foundations/Radii'));
const Shadows = lazy(() => import('./pages/foundations/Shadows'));
const Motion = lazy(() => import('./pages/foundations/Motion'));
const Philosophy = lazy(() => import('./pages/foundations/Philosophy'));
const Library = lazy(() => import('./pages/foundations/Library'));
const BrandStory = lazy(() => import('./pages/foundations/BrandStory'));
const Personality = lazy(() => import('./pages/foundations/Personality'));
const VoiceExtended = lazy(() => import('./pages/foundations/VoiceExtended'));
const LogoUsage = lazy(() => import('./pages/foundations/LogoUsage'));

// Glass
const GlassAnatomy = lazy(() => import('./pages/glass/Anatomy'));
const GlassVariants = lazy(() => import('./pages/glass/Variants'));
const GlassInContext = lazy(() => import('./pages/glass/InContext'));

// Iconography
const IconographyMarks = lazy(() => import('./pages/iconography/Marks'));
const IconographyIcons = lazy(() => import('./pages/iconography/Icons'));
const IconographyPhotography = lazy(() => import('./pages/iconography/Photography'));

// Components
const Buttons = lazy(() => import('./pages/components/Buttons'));
const Tags = lazy(() => import('./pages/components/Tags'));
const Badges = lazy(() => import('./pages/components/Badges'));
const Cards = lazy(() => import('./pages/components/Cards'));
const Form = lazy(() => import('./pages/components/Form'));
const Modal = lazy(() => import('./pages/components/Modal'));
const Table = lazy(() => import('./pages/components/Table'));
const Tabs = lazy(() => import('./pages/components/Tabs'));
const Toast = lazy(() => import('./pages/components/Toast'));
const Tooltip = lazy(() => import('./pages/components/Tooltip'));
const Accordion = lazy(() => import('./pages/components/Accordion'));
const Stepper = lazy(() => import('./pages/components/Stepper'));
const Empty = lazy(() => import('./pages/components/Empty'));
const Avatar = lazy(() => import('./pages/components/Avatar'));
const Breadcrumb = lazy(() => import('./pages/components/Breadcrumb'));
const Pagination = lazy(() => import('./pages/components/Pagination'));
const Toggle = lazy(() => import('./pages/components/Toggle'));
const Slider = lazy(() => import('./pages/components/Slider'));
const Dropdown = lazy(() => import('./pages/components/Dropdown'));
const Search = lazy(() => import('./pages/components/Search'));
const Upload = lazy(() => import('./pages/components/Upload'));
const NavComponent = lazy(() => import('./pages/components/Nav'));
const Stats = lazy(() => import('./pages/components/Stats'));
const CaseCard = lazy(() => import('./pages/components/CaseCard'));
const Chat = lazy(() => import('./pages/components/Chat'));
const MoreComponents = lazy(() => import('./pages/components/MoreComponents'));
const MoreComponents2 = lazy(() => import('./pages/components/MoreComponents2'));
const MediaPlayers = lazy(() => import('./pages/components/MediaPlayers'));
const Charts = lazy(() => import('./pages/components/Charts'));
const CodeBlock = lazy(() => import('./pages/components/CodeBlock'));
const FormAdvanced = lazy(() => import('./pages/components/FormAdvanced'));
const DataVizExtra = lazy(() => import('./pages/components/DataVizExtra'));
const States = lazy(() => import('./pages/components/States'));
const Overlays = lazy(() => import('./pages/components/Overlays'));
const Notifications = lazy(() => import('./pages/components/Notifications'));
const FormPower = lazy(() => import('./pages/components/FormPower'));

// Patterns
const Article = lazy(() => import('./pages/patterns/Article'));
const FeatureGrid = lazy(() => import('./pages/patterns/FeatureGrid'));
const Kpi = lazy(() => import('./pages/patterns/Kpi'));
const PodcastPattern = lazy(() => import('./pages/patterns/Podcast'));
const Pricing = lazy(() => import('./pages/patterns/Pricing'));
const Testimonial = lazy(() => import('./pages/patterns/Testimonial'));
const Dashboard = lazy(() => import('./pages/patterns/Dashboard'));
const Onboarding = lazy(() => import('./pages/patterns/Onboarding'));
const Email = lazy(() => import('./pages/patterns/Email'));
const EmailCoverage = lazy(() => import('./pages/patterns/EmailCoverage'));
const WhatsApp = lazy(() => import('./pages/patterns/WhatsApp'));
const Social = lazy(() => import('./pages/patterns/Social'));
const SocialCoverage = lazy(() => import('./pages/patterns/SocialCoverage'));
const Invoice = lazy(() => import('./pages/patterns/Invoice'));
const Slides = lazy(() => import('./pages/patterns/Slides'));
const Curriculum = lazy(() => import('./pages/patterns/Curriculum'));
const LessonPlayer = lazy(() => import('./pages/patterns/LessonPlayer'));
const EditorialBlocks = lazy(() => import('./pages/patterns/EditorialBlocks'));
const People = lazy(() => import('./pages/patterns/People'));
const Admin = lazy(() => import('./pages/patterns/Admin'));
const Achievement = lazy(() => import('./pages/patterns/Achievement'));
const LiveClass = lazy(() => import('./pages/patterns/LiveClass'));
const BentoHero = lazy(() => import('./pages/patterns/BentoHero'));
const CoursePlayer = lazy(() => import('./pages/patterns/CoursePlayer'));
const MentorMatching = lazy(() => import('./pages/patterns/MentorMatching'));
const Changelog = lazy(() => import('./pages/patterns/Changelog'));
const Insights = lazy(() => import('./pages/patterns/Insights'));
const Roadmap = lazy(() => import('./pages/patterns/Roadmap'));
const StatusPage = lazy(() => import('./pages/patterns/StatusPage'));
const ConferenceAgenda = lazy(() => import('./pages/patterns/ConferenceAgenda'));
const TrustSignals = lazy(() => import('./pages/patterns/TrustSignals'));
const StickyCTA = lazy(() => import('./pages/patterns/StickyCTA'));
const FAQ = lazy(() => import('./pages/patterns/FAQ'));
const LocationCard = lazy(() => import('./pages/patterns/LocationCard'));
const Cancellation = lazy(() => import('./pages/patterns/Cancellation'));
const SearchResults = lazy(() => import('./pages/patterns/SearchResults'));
const AuthFlow = lazy(() => import('./pages/patterns/AuthFlow'));

// Showcase
const ShowcaseMarketing = lazy(() => import('./pages/showcase/Marketing'));
const ShowcaseLeadersAI = lazy(() => import('./pages/showcase/LeadersAI'));
const ShowcaseAluno = lazy(() => import('./pages/showcase/Aluno'));
const ShowcaseLogin = lazy(() => import('./pages/showcase/Login'));
const ShowcaseSettings = lazy(() => import('./pages/showcase/Settings'));

// Guidelines
const Voice = lazy(() => import('./pages/guidelines/Voice'));
const Copy = lazy(() => import('./pages/guidelines/Copy'));
const DosDonts = lazy(() => import('./pages/guidelines/DosDonts'));

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route path="manifesto" element={<Manifesto />} />

                <Route path="foundations">
                  <Route path="brand" element={<Brand />} />
                  <Route path="brand-story" element={<BrandStory />} />
                  <Route path="personality" element={<Personality />} />
                  <Route path="voice-extended" element={<VoiceExtended />} />
                  <Route path="logo-usage" element={<LogoUsage />} />
                  <Route path="color" element={<Color />} />
                  <Route path="typography" element={<Typography />} />
                  <Route path="spacing" element={<Spacing />} />
                  <Route path="radii" element={<Radii />} />
                  <Route path="shadows" element={<Shadows />} />
                  <Route path="motion" element={<Motion />} />
                  <Route path="philosophy" element={<Philosophy />} />
                  <Route path="library" element={<Library />} />
                </Route>

                <Route path="glass">
                  <Route path="anatomy" element={<GlassAnatomy />} />
                  <Route path="variants" element={<GlassVariants />} />
                  <Route path="in-context" element={<GlassInContext />} />
                </Route>

                <Route path="iconography">
                  <Route path="marks" element={<IconographyMarks />} />
                  <Route path="icons" element={<IconographyIcons />} />
                  <Route path="photography" element={<IconographyPhotography />} />
                </Route>

                <Route path="components">
                  <Route path="buttons" element={<Buttons />} />
                  <Route path="tags" element={<Tags />} />
                  <Route path="badges" element={<Badges />} />
                  <Route path="cards" element={<Cards />} />
                  <Route path="form" element={<Form />} />
                  <Route path="modal" element={<Modal />} />
                  <Route path="table" element={<Table />} />
                  <Route path="tabs" element={<Tabs />} />
                  <Route path="toast" element={<Toast />} />
                  <Route path="tooltip" element={<Tooltip />} />
                  <Route path="accordion" element={<Accordion />} />
                  <Route path="stepper" element={<Stepper />} />
                  <Route path="empty" element={<Empty />} />
                  <Route path="avatar" element={<Avatar />} />
                  <Route path="breadcrumb" element={<Breadcrumb />} />
                  <Route path="pagination" element={<Pagination />} />
                  <Route path="toggle" element={<Toggle />} />
                  <Route path="slider" element={<Slider />} />
                  <Route path="dropdown" element={<Dropdown />} />
                  <Route path="search" element={<Search />} />
                  <Route path="upload" element={<Upload />} />
                  <Route path="nav" element={<NavComponent />} />
                  <Route path="stats" element={<Stats />} />
                  <Route path="case-card" element={<CaseCard />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="more" element={<MoreComponents />} />
                  <Route path="more-2" element={<MoreComponents2 />} />
                  <Route path="media" element={<MediaPlayers />} />
                  <Route path="charts" element={<Charts />} />
                  <Route path="code" element={<CodeBlock />} />
                  <Route path="form-advanced" element={<FormAdvanced />} />
                  <Route path="data-viz-extra" element={<DataVizExtra />} />
                  <Route path="states" element={<States />} />
                  <Route path="overlays" element={<Overlays />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="form-power" element={<FormPower />} />
                  <Route path=":slug" element={<PlaceholderPage area="Componentes" />} />
                </Route>

                <Route path="patterns">
                  <Route path="article" element={<Article />} />
                  <Route path="feature-grid" element={<FeatureGrid />} />
                  <Route path="kpi" element={<Kpi />} />
                  <Route path="podcast" element={<PodcastPattern />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="testimonial" element={<Testimonial />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="onboarding" element={<Onboarding />} />
                  <Route path="email" element={<Email />} />
                  <Route path="email-coverage" element={<EmailCoverage />} />
                  <Route path="whatsapp" element={<WhatsApp />} />
                  <Route path="social" element={<Social />} />
                  <Route path="social-coverage" element={<SocialCoverage />} />
                  <Route path="invoice" element={<Invoice />} />
                  <Route path="slides" element={<Slides />} />
                  <Route path="curriculum" element={<Curriculum />} />
                  <Route path="lesson" element={<LessonPlayer />} />
                  <Route path="editorial" element={<EditorialBlocks />} />
                  <Route path="people" element={<People />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="achievement" element={<Achievement />} />
                  <Route path="live" element={<LiveClass />} />
                  <Route path="bento" element={<BentoHero />} />
                  <Route path="course-player" element={<CoursePlayer />} />
                  <Route path="mentor-matching" element={<MentorMatching />} />
                  <Route path="changelog" element={<Changelog />} />
                  <Route path="insights" element={<Insights />} />
                  <Route path="roadmap" element={<Roadmap />} />
                  <Route path="status" element={<StatusPage />} />
                  <Route path="conference-agenda" element={<ConferenceAgenda />} />
                  <Route path="trust-signals" element={<TrustSignals />} />
                  <Route path="sticky-cta" element={<StickyCTA />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="location" element={<LocationCard />} />
                  <Route path="cancellation" element={<Cancellation />} />
                  <Route path="search-results" element={<SearchResults />} />
                  <Route path="auth-flow" element={<AuthFlow />} />
                  <Route path=":slug" element={<PlaceholderPage area="Padrões" />} />
                </Route>

                <Route path="showcase">
                  <Route path="marketing" element={<ShowcaseMarketing />} />
                  <Route path="leaders-ai" element={<ShowcaseLeadersAI />} />
                  <Route path="aluno" element={<ShowcaseAluno />} />
                  <Route path="login" element={<ShowcaseLogin />} />
                  <Route path="settings" element={<ShowcaseSettings />} />
                  <Route path=":slug" element={<PlaceholderPage area="Páginas-modelo" />} />
                </Route>

                <Route path="guidelines">
                  <Route path="voice" element={<Voice />} />
                  <Route path="copy" element={<Copy />} />
                  <Route path="dos-donts" element={<DosDonts />} />
                  <Route path=":slug" element={<PlaceholderPage area="Diretrizes" />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
