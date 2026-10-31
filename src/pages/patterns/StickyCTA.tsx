import {
  ArrowRight, X, Calendar, Bell,
  Clock, Users, BookOpen, MessageCircle,
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
    <Section title="Variante enrollment · countdown editorial" meta="navy mesh · imersão presencial · 3 ações">
      <div className="vds-sticky-stage">
        {/* Conteúdo de página real · contexto */}
        <article className="vds-sticky-page">
          <span className="vds-sticky-page__eyebrow">
            <Users size={14} strokeWidth={1.75} />
            Plano Pro · mentoria em grupo
          </span>
          <h2 className="vds-sticky-page__title">
            IA na operação da sua empresa — <em>com mentoria ao vivo toda semana</em>.
          </h2>
          <p className="vds-sticky-page__lede">
            Começa pela <strong>trilha de onboarding</strong>. Depois, 10 check-ins por mês de mentoria
            em grupo + comunidade de empresários e líderes + 157 soluções prontas. Garantia de
            <strong>100% de volta em 90 dias</strong>, cumpridos os 3 requisitos.
          </p>

          <div className="vds-sticky-page__stats">
            <div className="vds-sticky-page__stat">
              <strong>521</strong>
              <span>cases reais</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>10/mês</strong>
              <span>check-ins de mentoria</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>R$ 3.780</strong>
              <span>por mês · anual</span>
            </div>
          </div>

          <div className="vds-sticky-page__feature">
            <span className="vds-sticky-page__feature-icon">
              <MessageCircle size={16} strokeWidth={1.75} />
            </span>
            <div>
              <strong>Conversa com um especialista antes de fechar</strong>
              <span>Pra entender o seu contexto e responder se faz sentido — sem pitch, sem pressão.</span>
            </div>
          </div>
        </article>

        {/* Sticky bar · enroll · navy mesh + countdown */}
        <aside className="vds-sticky-bar enroll">
          <div className="vds-sticky-bar-l">
            <div>
              <span className="vds-sticky-eyebrow">
                <Calendar size={14} strokeWidth={1.75} />
                Imersão presencial · inscrições abertas
              </span>
              <p>
                <strong>[N] vagas</strong> · na sede em <em>[data]</em>
              </p>
            </div>
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
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
            <button className="vds-sticky-close" aria-label="Fechar">
              <X size={14} strokeWidth={1.75} />
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
    <Section title="Variante notification · informativa contextual" meta="glass branco · ícone + texto · 1 ação · dismissable">
      <div className="vds-sticky-stage">
        {/* Conteúdo de página real · contexto */}
        <article className="vds-sticky-page">
          <span className="vds-sticky-page__eyebrow">
            <BookOpen size={14} strokeWidth={1.75} />
            Biblioteca · 521 cases reais
          </span>
          <h2 className="vds-sticky-page__title">
            Cases reais de implementação — <em>com desafio, solução e resultado</em>.
          </h2>
          <p className="vds-sticky-page__lede">
            Empresas brasileiras que implementaram IA com a Viver de IA, com desafios, soluções e
            <strong>resultados comprovados</strong>. Dá pra filtrar por setor — saúde, tecnologia,
            indústria, agência, turismo e outros.
          </p>

          <div className="vds-sticky-page__feature">
            <span className="vds-sticky-page__feature-icon">
              <BookOpen size={16} strokeWidth={1.75} />
            </span>
            <div>
              <strong>Case em destaque · "De 6h para cliques"</strong>
              <span>Como a Viva Nexo economiza R$ 162.000 com IA na operação · setor Saúde.</span>
            </div>
          </div>
        </article>

        {/* Sticky bar · notify · glass branco */}
        <aside className="vds-sticky-bar notify">
          <div className="vds-sticky-bar-l">
            <div className="vds-sticky-icon">
              <Bell size={16} strokeWidth={1.75} />
            </div>
            <div>
              <span className="vds-sticky-notify-title">
                Mentoria em grupo ao vivo agora · check-in do plano Pro
              </span>
              <em className="vds-sticky-notify-meta">
                <Users size={14} strokeWidth={1.75} />
                148 assistindo · começou há 14 min
              </em>
            </div>
          </div>
          <div className="vds-sticky-bar-r">
            <button className="vds-sticky-btn primary sm">
              Entrar agora
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
            <button className="vds-sticky-close" aria-label="Fechar">
              <X size={14} strokeWidth={1.75} />
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
    <Section title="Variante exit intent · last chance" meta="dispara quando user move pra fora da tela · navy intenso · uma ação principal">
      <div className="vds-sticky-stage">
        {/* Conteúdo de página real · um pouco dimmed pra dar foco no exit bar */}
        <article className="vds-sticky-page dim">
          <span className="vds-sticky-page__eyebrow">
            <Clock size={14} strokeWidth={1.75} />
            Página de checkout · etapa final
          </span>
          <h2 className="vds-sticky-page__title">
            Revisar antes de confirmar a adesão.
          </h2>
          <p className="vds-sticky-page__lede">
            Plano Pro: <strong>R$ 3.780 por mês</strong>, em contratação anual · garantia de 90 dias
            com 3 requisitos · condições completas na cláusula 7 dos termos de uso.
          </p>

          <div className="vds-sticky-page__stats">
            <div className="vds-sticky-page__stat">
              <strong>R$ 3.780</strong>
              <span>por mês · anual</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>90 dias</strong>
              <span>garantia com requisitos</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>10/mês</strong>
              <span>check-ins de mentoria</span>
            </div>
          </div>
        </article>

        {/* Sticky bar · exit · navy intenso */}
        <aside className="vds-sticky-bar exit">
          <div className="vds-sticky-bar-l">
            <div>
              <span className="vds-sticky-eyebrow">
                <Clock size={14} strokeWidth={1.75} />
                Antes de sair
              </span>
              <p>
                <strong>[condição comercial real, se houver]</strong> · válida <em>até [data]</em>
              </p>
            </div>
          </div>
          <div className="vds-sticky-bar-r">
            <a href="#" className="vds-sticky-link">
              <BookOpen size={14} strokeWidth={1.75} />
              Ver os termos
            </a>
            <button className="vds-sticky-btn primary">
              Continuar adesão
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
            <button className="vds-sticky-close" aria-label="Fechar">
              <X size={14} strokeWidth={1.75} />
            </button>
          </div>
        </aside>
      </div>
    </Section>
  );
}
