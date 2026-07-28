import {
  ArrowRight, ArrowUpRight, Check, X, Plus, Minus, Search, Settings,
  User, Users, MessageCircle, Mail, Phone, Calendar, Clock,
  TrendingUp, TrendingDown, Zap, Lightbulb, Compass, Navigation,
  Folder, FileText, Download, Upload, Link as LinkIcon, ExternalLink,
  Bookmark, Star, Heart, Bell, Lock, Unlock,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  MoreHorizontal, MoreVertical, Filter, SortAsc,
  Eye, EyeOff, Globe, Briefcase, Award, Crown, Rocket, Layers,
  CheckCircle, AlertCircle, Brain, Radar,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import '../pages.css';

const icons = [
  { name: 'arrow-right', I: ArrowRight }, { name: 'arrow-up-right', I: ArrowUpRight },
  { name: 'check', I: Check }, { name: 'x', I: X },
  { name: 'plus', I: Plus }, { name: 'minus', I: Minus },
  { name: 'search', I: Search }, { name: 'settings', I: Settings },
  { name: 'user', I: User }, { name: 'users', I: Users },
  { name: 'message-circle', I: MessageCircle }, { name: 'mail', I: Mail },
  { name: 'phone', I: Phone }, { name: 'calendar', I: Calendar },
  { name: 'clock', I: Clock }, { name: 'trending-up', I: TrendingUp },
  { name: 'trending-down', I: TrendingDown }, { name: 'zap', I: Zap },
  { name: 'lightbulb', I: Lightbulb }, { name: 'compass', I: Compass },
  { name: 'navigation', I: Navigation }, { name: 'folder', I: Folder },
  { name: 'file-text', I: FileText }, { name: 'download', I: Download },
  { name: 'upload', I: Upload }, { name: 'link', I: LinkIcon },
  { name: 'external-link', I: ExternalLink }, { name: 'award', I: Award },
  { name: 'crown', I: Crown }, { name: 'rocket', I: Rocket }, { name: 'layers', I: Layers },
  { name: 'brain', I: Brain }, { name: 'radar', I: Radar },
  { name: 'bookmark', I: Bookmark }, { name: 'star', I: Star },
  { name: 'heart', I: Heart }, { name: 'bell', I: Bell },
  { name: 'lock', I: Lock }, { name: 'unlock', I: Unlock },
  { name: 'chevron-down', I: ChevronDown }, { name: 'chevron-up', I: ChevronUp },
  { name: 'chevron-left', I: ChevronLeft }, { name: 'chevron-right', I: ChevronRight },
  { name: 'more-horizontal', I: MoreHorizontal }, { name: 'more-vertical', I: MoreVertical },
  { name: 'filter', I: Filter }, { name: 'sort-asc', I: SortAsc },
  { name: 'eye', I: Eye }, { name: 'eye-off', I: EyeOff },
  { name: 'globe', I: Globe }, { name: 'briefcase', I: Briefcase },
  { name: 'check-circle', I: CheckCircle }, { name: 'alert-circle', I: AlertCircle },
];

export default function IconographyIcons() {
  return (
    <>
      <DocsHeader
        eyebrow="Iconografia · ícones"
        title={
          <>
            Lucide, 2px de <em>traço</em>.
          </>
        }
        lede="A marca não desenha ícone de interface — os únicos desenhos proprietários são as marcas (monograma, wordmark, app icon, Leaders AI), que moram em Iconografia · Marcas. O resto vem do Lucide: geometria limpa, traço 2px que combina com a tipografia. Substituição assumida: se o time tiver outro pack favorito, troque tudo de uma vez."
      />

      <Section title="Stroke padrão" meta="2px · pontas redondas">
        <p>
          Todo ícone Lucide nasce com <code className="vds-code-inline">{'strokeWidth={2}'}</code> e ponta
          arredondada (<code className="vds-code-inline">stroke-linecap: round</code>) — nunca reta. Aceite
          tal qual: 2px é o padrão da marca. A cor é sempre{' '}
          <code className="vds-code-inline">currentColor</code>, herdada do contexto; em superfície navy
          (tile, botão primário) quem pinta é a própria superfície, com{' '}
          <code className="vds-code-inline">var(--via-white)</code>.
        </p>
        <p>
          O traço compensa o tamanho: abaixo de 14px engrossa pra 2,2–2,4 (senão some), de 18px pra
          cima afina pra 1,6–1,8 (senão engorda). O wrapper{' '}
          <code className="vds-code-inline">&lt;Icon /&gt;</code> normaliza tudo em 1,8 — use ele quando
          o ícone for decorativo dentro de um chip.
        </p>
        <CodeBlock>{`import { ArrowRight } from 'lucide-react';

// default Lucide · 2px, round cap/join
<ArrowRight size={14} strokeWidth={2} />

// inline em label 12px · engrossa pra não sumir
<ArrowRight size={12} strokeWidth={2.4} />

// wrapper do DS · força stroke 1.8 e tamanho do token
<Icon size="lg" tone="navy"><ArrowRight /></Icon>`}</CodeBlock>
      </Section>

      {/* meta derivada do array: a contagem não pode mentir se alguém editar a lista */}
      <Section title="Galeria" meta={`${icons.length} ícones · 18px · stroke 2`}>
        <div className="vds-icon-grid">
          {icons.map(({ name, I }) => (
            <div key={name} className="vds-icon-cell" title={name}>
              <I size={18} strokeWidth={2} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 24, fontFamily: 'var(--via-font)', fontSize: 13, color: 'var(--via-text-muted)' }}>
          Catálogo completo (1500+ ícones): <a href="https://lucide.dev" target="_blank" rel="noreferrer" style={{ color: 'var(--via-text-primary)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>lucide.dev</a>
        </p>
      </Section>

      <Section title="Tamanhos" meta="medido na library">
        <table className="vds-token-table">
          {/* larguras locais: a 4ª coluna (Notas) não cabe nos 25% que sobram
              do .tok 35% + .val 20% + .val 20% do docs.css */}
          <colgroup>
            <col style={{ width: '27%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '47%' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ width: '27%' }}>Onde</th>
              <th style={{ width: '17%' }}>Tamanho</th>
              <th style={{ width: '9%' }}>Stroke</th>
              <th style={{ width: '47%' }}>Notas</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="tok" style={{ width: 'auto' }}>Inline em label/tag</td><td className="val" style={{ width: 'auto' }}>11–13px</td><td className="val" style={{ width: 'auto' }}>2.2–2.4</td><td className="use">Engrossa pra não sumir no tamanho pequeno</td></tr>
            <tr><td className="tok" style={{ width: 'auto' }}>Botão sm · md · lg</td><td className="val" style={{ width: 'auto' }}>12 · 13 · 14px</td><td className="val" style={{ width: 'auto' }}>2</td><td className="use">gap 7px do label, fixo no .via-btn</td></tr>
            <tr><td className="tok" style={{ width: 'auto' }}>Nav / sidebar</td><td className="val" style={{ width: 'auto' }}>14px</td><td className="val" style={{ width: 'auto' }}>1.8</td><td className="use">Traço fino pra não competir com o rótulo do grupo</td></tr>
            <tr><td className="tok" style={{ width: 'auto' }}>&lt;Icon /&gt; xs → xl</td><td className="val" style={{ width: 'auto' }}>10 · 12 · 14 · 18 · 22</td><td className="val" style={{ width: 'auto' }}>1.8</td><td className="use">O wrapper força o stroke — não passe strokeWidth</td></tr>
            <tr><td className="tok" style={{ width: 'auto' }}>Feature card · empty state</td><td className="val" style={{ width: 'auto' }}>20–22px</td><td className="val" style={{ width: 'auto' }}>1.8</td><td className="use">Dentro de chip navy ou glass</td></tr>
            <tr><td className="tok" style={{ width: 'auto' }}>Ilustração · error page</td><td className="val" style={{ width: 'auto' }}>32–36px</td><td className="val" style={{ width: 'auto' }}>1.6–1.8</td><td className="use">No tamanho grande o traço engorda</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Sparkles é banido" meta="regra absoluta de marca">
        {/* Mesma receita do <Alert tone="danger"> (Alert.css): tinta coral fixa —
            não usa --via-navy-*, que inverteria pra branco no tema escuro. */}
        <div style={{
          padding: 28,
          background: 'rgba(184, 92, 92, 0.06)',
          border: '1px solid rgba(184, 92, 92, 0.28)',
          borderRadius: 'var(--via-radius-lg)',
          boxShadow: 'inset 0 1px 0 var(--via-edge-hi), 0 6px 14px -10px var(--via-shadow-ink-14)',
          marginBottom: 18,
        }}>
          <p style={{ fontFamily: 'var(--via-font)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--via-danger)', margin: 0 }}>
            Off-brand · nunca usar
          </p>
          <h3 style={{ fontFamily: 'var(--via-font-display)', fontSize: 24, fontWeight: 500, color: 'var(--via-text-primary)', margin: '8px 0 12px', letterSpacing: '-0.015em' }}>
            O ícone <em style={{ fontStyle: 'normal', fontWeight: 400, color: 'var(--via-danger)' }}>Sparkles</em> está banido de toda identidade Viver de IA.
          </h3>
          <p style={{ fontFamily: 'var(--via-font)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--via-text-body)', margin: 0 }}>
            Sparkles virou cliché global de "tudo que é IA" desde 2023. Os produtos da
            marca têm identidade própria, premium e contextual — Sparkle destrói essa
            diferenciação. Use ícones contextuais: <strong>Award</strong> (mestria),
            <strong> Compass</strong> (direção), <strong>Crown</strong> (destaque),
            <strong> Layers</strong> (sistema), <strong>Rocket</strong> (deploy),
            <strong> MessageCircle</strong> (conversas), <strong>Calendar</strong> (agenda),
            <strong> Brain</strong> (análise IA), <strong>Radar</strong> (monitoramento).
          </p>
        </div>
      </Section>

      <Section title="Outros do's & don'ts" meta="iconografia">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Sim</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Lucide com stroke 2 (1,8 dentro do wrapper). Ícones funcionais que ajudam a
              navegar. Tamanho proporcional ao contexto.{' '}
              <code className="vds-code-inline">currentColor</code> pra integrar.
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Não</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Emoji (★ ✓ → etc.) como ícone. Outlined + filled misturados. Ícones
              decorativos sem função.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
