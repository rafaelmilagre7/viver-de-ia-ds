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
    <Section title="Variante enrollment · countdown editorial" meta="navy mesh · próxima turma · 3 ações">
      <div className="vds-sticky-stage">
        {/* Conteúdo de página real · contexto */}
        <article className="vds-sticky-page">
          <span className="vds-sticky-page__eyebrow">
            <Users size={11} strokeWidth={2} />
            Mentoria · cohort 2026.3
          </span>
          <h2 className="vds-sticky-page__title">
            12 semanas operando com IA — <em>e um mentor que já fez isso 18 vezes</em>.
          </h2>
          <p className="vds-sticky-page__lede">
            Primeira semana com <strong>auditoria 1:1 do seu stack atual</strong>. Da segunda em diante,
            mentoria coletiva quinzenal + acesso ao Discord editorial + biblioteca de cases reais.
            Quem termina sai com <strong>3 fluxos próprios em produção</strong>.
          </p>

          <div className="vds-sticky-page__stats">
            <div className="vds-sticky-page__stat">
              <strong>148</strong>
              <span>operadores formados</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>12 sem</strong>
              <span>duração total</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>R$ 2.9K</strong>
              <span>investimento mensal</span>
            </div>
          </div>

          <div className="vds-sticky-page__feature">
            <span className="vds-sticky-page__feature-icon">
              <MessageCircle size={16} strokeWidth={1.8} />
            </span>
            <div>
              <strong>Conversa de 20min com Caio antes de fechar</strong>
              <span>Pra entender o seu contexto e responder se faz sentido — sem pitch, sem pressão.</span>
            </div>
          </div>
        </article>

        {/* Sticky bar · enroll · navy mesh + countdown */}
        <aside className="vds-sticky-bar enroll">
          <div className="vds-sticky-bar-l">
            <div>
              <span className="vds-sticky-eyebrow">
                <Calendar size={11} strokeWidth={2.2} />
                Turma 2026.3 · matrículas abertas
              </span>
              <p>
                <strong>14 vagas</strong> · começa em <em>02 jun 2026</em>
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
    <Section title="Variante notification · informativa contextual" meta="glass branco · ícone + texto · 1 ação · dismissable">
      <div className="vds-sticky-stage">
        {/* Conteúdo de página real · contexto */}
        <article className="vds-sticky-page">
          <span className="vds-sticky-page__eyebrow">
            <BookOpen size={11} strokeWidth={2} />
            Biblioteca · 47 cases publicados
          </span>
          <h2 className="vds-sticky-page__title">
            Cases reais de implementação — <em>com prompts, números e o que deu errado</em>.
          </h2>
          <p className="vds-sticky-page__lede">
            Cada case foi rodado de verdade na operação do autor. Você vê o prompt usado, o output produzido,
            o ajuste fino, o resultado em conversão ou tempo poupado. <strong>Sem demo perfeito</strong> —
            tem a versão que falhou também.
          </p>

          <div className="vds-sticky-page__feature">
            <span className="vds-sticky-page__feature-icon">
              <BookOpen size={16} strokeWidth={1.8} />
            </span>
            <div>
              <strong>Case publicado essa semana · "Auditoria de prompt em e-commerce"</strong>
              <span>Como o Marisson cortou 38% do tempo de SAC sem trocar de plataforma · 12min de leitura.</span>
            </div>
          </div>
        </article>

        {/* Sticky bar · notify · glass branco */}
        <aside className="vds-sticky-bar notify">
          <div className="vds-sticky-bar-l">
            <div className="vds-sticky-icon">
              <Bell size={15} strokeWidth={1.8} />
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
    <Section title="Variante exit intent · last chance" meta="dispara quando user move pra fora da tela · navy intenso · uma ação principal">
      <div className="vds-sticky-stage">
        {/* Conteúdo de página real · um pouco dimmed pra dar foco no exit bar */}
        <article className="vds-sticky-page dim">
          <span className="vds-sticky-page__eyebrow">
            <Clock size={11} strokeWidth={2} />
            Página de checkout · etapa final
          </span>
          <h2 className="vds-sticky-page__title">
            Revisar antes de confirmar a inscrição.
          </h2>
          <p className="vds-sticky-page__lede">
            Você vai pagar <strong>R$ 2.900 hoje</strong>, com renovação anual em 12 meses ·
            cancele sem multa, sem fricção · garantia editorial de 14 dias se não fizer sentido.
          </p>

          <div className="vds-sticky-page__stats">
            <div className="vds-sticky-page__stat">
              <strong>R$ 2.900</strong>
              <span>cobrança hoje</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>14 dias</strong>
              <span>garantia editorial</span>
            </div>
            <div className="vds-sticky-page__stat">
              <strong>2 meses</strong>
              <span>grátis no anual</span>
            </div>
          </div>
        </article>

        {/* Sticky bar · exit · navy intenso */}
        <aside className="vds-sticky-bar exit">
          <div className="vds-sticky-bar-l">
            <div>
              <span className="vds-sticky-eyebrow">
                <Clock size={11} strokeWidth={2.2} />
                Last chance · só hoje
              </span>
              <p>
                <strong>−R$ 800 nas primeiras 3 parcelas</strong> · inscrições <em>até 23h59 de hoje</em>
              </p>
            </div>
          </div>
          <div className="vds-sticky-bar-r">
            <a href="#" className="vds-sticky-link">
              <BookOpen size={12} strokeWidth={2} />
              Ver os termos
            </a>
            <button className="vds-sticky-btn primary">
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
