import {
  ArrowRight, X, Calendar, Bell,
  Clock, Users, BookOpen,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './sticky-cta.css';

export default function StickyCTA() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · sticky CTA bar"
        title={
          <>
            A barra que <em>aparece quando precisa</em> — sem agressão.
          </>
        }
        lede="Barra de CTA que sobe do rodapé após scroll, ancora ação principal sem cortar conteúdo. 3 variantes: enrollment urgent (deadline), notification soft (informativa), exit intent (last chance). Sempre dismissable, sempre editorial."
      />

      <StickyEnrollSection />
      <StickyNotifySection />
      <StickyExitSection />
    </>
  );
}

/* ---------- Enrollment · com countdown ---------- */
function StickyEnrollSection() {
  return (
    <Section title="Variante enrollment · countdown editorial" meta="navy mesh + accent · próxima turma · 3 ações">
      <div className="vds-sticky-stage">
        <div className="vds-sticky-page-mock">
          <div className="vds-sticky-page-line w70" />
          <div className="vds-sticky-page-line w90" />
          <div className="vds-sticky-page-line w60" />
          <div className="vds-sticky-page-line w80" />
          <div className="vds-sticky-page-block" />
          <div className="vds-sticky-page-line w50" />
          <div className="vds-sticky-page-line w80" />
        </div>

        <aside className="vds-sticky-bar enroll via-mesh-navy via-noise">
          <div className="vds-sticky-bar-l">
            <span className="vds-sticky-eyebrow">
              <Calendar size={11} strokeWidth={2.2} />
              Turma 2026.3 · matrículas abertas
            </span>
            <p>
              <strong>14 vagas</strong> · começa em <em>02 jun 2026</em> · primeira mentoria com Caio na semana 1
            </p>
          </div>

          <div className="vds-sticky-bar-c">
            <div className="vds-sticky-countdown">
              <div>
                <strong className="mono">12</strong>
                <em>dias</em>
              </div>
              <span className="sep">:</span>
              <div>
                <strong className="mono">04</strong>
                <em>h</em>
              </div>
              <span className="sep">:</span>
              <div>
                <strong className="mono">18</strong>
                <em>min</em>
              </div>
            </div>
          </div>

          <div className="vds-sticky-bar-r">
            <button className="vds-sticky-btn ghost on-dark">Saiba mais</button>
            <button className="vds-sticky-btn primary">
              Garantir vaga
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
            <button className="vds-sticky-close" aria-label="Fechar">
              <X size={13} strokeWidth={2} />
            </button>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ---------- Notification soft · contextual ---------- */
function StickyNotifySection() {
  return (
    <Section title="Variante notification · informativa contextual" meta="navy soft · ícone + texto · 1 ação · dismissable">
      <div className="vds-sticky-stage">
        <div className="vds-sticky-page-mock">
          <div className="vds-sticky-page-line w70" />
          <div className="vds-sticky-page-line w90" />
          <div className="vds-sticky-page-line w60" />
          <div className="vds-sticky-page-block sm" />
          <div className="vds-sticky-page-line w80" />
          <div className="vds-sticky-page-line w50" />
        </div>

        <aside className="vds-sticky-bar notify">
          <div className="vds-sticky-bar-l">
            <div className="vds-sticky-icon">
              <Bell size={14} strokeWidth={1.8} />
            </div>
            <div>
              <span className="vds-sticky-notify-title">
                Caio está ao vivo agora · auditoria de prompt em produção
              </span>
              <em className="vds-sticky-notify-meta">
                <Users size={10} strokeWidth={2} />
                148 assistindo · começou há 14 min
              </em>
            </div>
          </div>
          <div className="vds-sticky-bar-r">
            <button className="vds-sticky-btn primary sm">
              Entrar na live
              <ArrowRight size={11} strokeWidth={2.4} />
            </button>
            <button className="vds-sticky-close" aria-label="Fechar">
              <X size={13} strokeWidth={2} />
            </button>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ---------- Exit intent · last chance ---------- */
function StickyExitSection() {
  return (
    <Section title="Variante exit intent · last chance" meta="dispara quando user move pra fora da tela · accent · uma única ação">
      <div className="vds-sticky-stage">
        <div className="vds-sticky-page-mock dim">
          <div className="vds-sticky-page-line w70" />
          <div className="vds-sticky-page-line w90" />
          <div className="vds-sticky-page-line w60" />
          <div className="vds-sticky-page-block" />
          <div className="vds-sticky-page-line w50" />
        </div>

        <aside className="vds-sticky-bar exit">
          <div className="vds-sticky-bar-l">
            <span className="vds-sticky-eyebrow">
              <Clock size={11} strokeWidth={2.2} />
              Last chance · só hoje
            </span>
            <p>
              <strong>−R$ 800 / mês</strong> nas primeiras 3 parcelas para inscrições <em>até 23h59 de hoje</em>.
            </p>
          </div>
          <div className="vds-sticky-bar-r">
            <a href="#" className="vds-sticky-link">
              <BookOpen size={12} strokeWidth={2} />
              Ver os termos
            </a>
            <button className="vds-sticky-btn primary accent">
              Aproveitar agora
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
            <button className="vds-sticky-close" aria-label="Fechar">
              <X size={13} strokeWidth={2} />
            </button>
          </div>
        </aside>
      </div>
    </Section>
  );
}
