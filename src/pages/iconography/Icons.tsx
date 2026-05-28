import {
  ArrowRight, ArrowUpRight, Check, X, Plus, Minus, Search, Settings,
  User, Users, MessageCircle, Mail, Phone, Calendar, Clock,
  TrendingUp, TrendingDown, Zap, Lightbulb, Compass, Navigation,
  Folder, FileText, Download, Upload, Link as LinkIcon, ExternalLink,
  Bookmark, Star, Heart, Bell, Lock, Unlock,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  MoreHorizontal, MoreVertical, Filter, SortAsc,
  Eye, EyeOff, Globe, Briefcase, Award, Crown, Rocket, Layers,
  CheckCircle, AlertCircle,
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
            Lucide, 1.5px de <em>traço</em>.
          </>
        }
        lede="A marca não tem ícones proprietários. Usamos Lucide — geometria limpa, traço 1.5px que combina com a tipografia. Substituição assumida: se o time tiver outro pack favorito, troque tudo de uma vez."
      />

      <Section title="Stroke padrão" meta="2px · square caps">
        <p>
          Todo ícone Lucide vem com stroke 2px, square caps. Aceito tal qual. Em superfície
          clara, cor é <code className="vds-code-inline">currentColor</code> (herda do contexto). Em superfície escura, branco.
        </p>
        <CodeBlock>{`import { ArrowRight } from 'lucide-react';

<ArrowRight size={16} strokeWidth={2} />`}</CodeBlock>
      </Section>

      <Section title="Galeria" meta="amostra editorial">
        <div className="vds-icon-grid">
          {icons.map(({ name, I }) => (
            <div key={name} className="vds-icon-cell" title={name}>
              <I size={18} strokeWidth={2} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 24, fontFamily: 'var(--via-font)', fontSize: 13, color: 'var(--via-text-muted)' }}>
          Catálogo completo (1500+ ícones): <a href="https://lucide.dev" target="_blank" rel="noreferrer" style={{ color: 'var(--via-text-primary)' }}>lucide.dev</a>
        </p>
      </Section>

      <Section title="Tamanhos" meta="contexto define">
        <table className="vds-token-table">
          <thead>
            <tr><th>Onde</th><th>Tamanho</th><th>Notas</th></tr>
          </thead>
          <tbody>
            <tr><td className="tok">Inline em label/eyebrow</td><td className="val">12px</td><td className="use">Stroke 2.5px pra compensar</td></tr>
            <tr><td className="tok">Botão (default)</td><td className="val">14–16px</td><td className="use">Margem 8–10px do texto</td></tr>
            <tr><td className="tok">Nav</td><td className="val">18px</td><td className="use">Stroke 2px</td></tr>
            <tr><td className="tok">Feature/illustration</td><td className="val">24–32px</td><td className="use">Em cards e empty states</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Sparkles é banido" meta="regra absoluta de marca">
        <div style={{ padding: 28, background: 'rgba(184,58,58,0.06)', border: '1px solid rgba(184,58,58,0.22)', borderRadius: 'var(--via-radius-lg)', marginBottom: 18 }}>
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
              Lucide stroke. Ícones funcionais que ajudam navegação. Tamanho proporcional
              ao contexto. <code className="vds-code-inline">currentColor</code> pra integrar.
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
