import type { ReactNode } from 'react';
import { ArrowRight, Calendar, Check, ChevronDown, Download, Mail } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Input } from '../../lib/Input/Input';
import { BrandLogo } from '../../lib/BrandLogo/BrandLogo';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './landing-elements.css';

/* ============================================================
   Landing elements · reutilizáveis em landings novas
   ============================================================ */

export default function LandingElements() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · blocos de landing"
        title={
          <>
            Elementos pra landings <em>sem reinventar a roda</em>.
          </>
        }
        lede="Cinco variações de hero, CTAs por contexto, prova social avançada, FAQ editorial expandido, material gratuito no meio da página, contagem regressiva editorial, comparativo com a concorrência. Papel claro por padrão; o navy fica pro momento de fechamento. Cada elemento independente — combina o que precisa pra cada landing nova."
      />

      <HeroVariantsSection />
      <CTAVariantsSection />
      <TrustSignalsAdvancedSection />
      <FAQAdvancedSection />
      <LeadMagnetSection />
      <CountdownSection />
      <CompetitorComparisonSection />
    </>
  );
}

/* ---------- Hero variants · 5 contextos ----------
   Cinco composições de verdade (não cinco cores do mesmo painel):
   split com cartão da formação · manifesto centrado com prova · cartaz de evento ·
   captura inline com capa do material · confirmação com os próximos atos.
   Todas em papel claro — o navy é a tinta. */
const ARROW = <ArrowRight size={16} strokeWidth={1.75} />;

function HeroFrame({ name, context, children }: { name: string; context: string; children: ReactNode }) {
  return (
    <article className="vds-le-hero-card">
      <header>
        <span className="vds-le-hero-name">{name}</span>
        <span className="vds-le-hero-context">{context}</span>
      </header>
      {children}
    </article>
  );
}

function HeroVariantsSection() {
  return (
    <Section
      title="Variações de hero · 5 contextos"
      meta="cada landing escolhe o hero certo pelo contexto"
    >
      <div className="vds-le-heros">
        <HeroFrame name="Lançamento" context="D-X até D+0 · formação abre amanhã / hoje">
          <div className="vds-le-hero vds-le-hero--launch">
            <div className="vds-le-hero-copy">
              <span className="vds-le-kicker"><span className="vds-le-live" aria-hidden="true" />Nova formação · abre [data] · 9h</span>
              <h2>Agentes de IA <em>rodando na sua operação</em>.</h2>
              <p>Nova formação prática na plataforma, inclusa em todos os planos, com solução pronta pra implementar.</p>
              <div className="vds-le-hero-actions">
                <Button size="lg" iconRight={ARROW}>Ver formação</Button>
                <Button size="lg" variant="ghost">Baixar a ementa</Button>
              </div>
            </div>
            <aside className="vds-le-launch-card" aria-label="Formação: Agentes de IA">
              <span className="vds-le-launch-title">Formação: Agentes de IA</span>
              <dl>
                <div><dt>Início</dt><dd>[data]</dd></div>
                <div><dt>Ritmo</dt><dd>No seu tempo</dd></div>
                <div><dt>Formato</dt><dd>Prática + mentoria</dd></div>
                <div><dt>Planos</dt><dd>Todos</dd></div>
              </dl>
              <div className="vds-le-launch-meter">
                <span><strong>[N]</strong> de [N] lugares na live de estreia</span>
                <span className="vds-le-launch-bar" aria-hidden="true"><span style={{ width: '72%' }} /></span>
              </div>
            </aside>
          </div>
        </HeroFrame>

        <HeroFrame name="Venda contínua" context="landing principal · sempre no ar">
          <div className="vds-le-hero vds-le-hero--evergreen">
            <span className="vds-le-kicker">Plataforma de implementação de IA</span>
            <h2>Viver de IA, <em>não de prompt</em>.</h2>
            <p>Soluções prontas, formações práticas e mentorias ao vivo pra tirar a IA do discurso e colocar na operação.</p>
            <div className="vds-le-hero-actions">
              <Button size="lg" iconRight={ARROW}>Conhecer a plataforma</Button>
              <Button size="lg" variant="secondary">Falar com especialista</Button>
            </div>
            <dl className="vds-le-proof">
              <div><dt>cases reais de implementação</dt><dd>521</dd></div>
              <div><dt>soluções de IA prontas</dt><dd>157</dd></div>
              <div><dt>setores com implementação</dt><dd>29</dd></div>
            </dl>
          </div>
        </HeroFrame>

        <HeroFrame name="Evento" context="Leaders AI Conference · evento presencial da marca">
          <div className="vds-le-hero vds-le-hero--event">
            <div className="vds-le-event-date" aria-label="[data], [local]">
              <strong>[data]</strong>
              <span>[mês e ano]</span>
              <span>[local]</span>
            </div>
            <div className="vds-le-hero-copy">
              <span className="vds-le-kicker">Leaders AI Conference</span>
              <h2>[N] dias. Cases reais. <em>Zero teoria.</em></h2>
              <p>Empresas que já têm IA na operação contam o que mudou — sem palestrante de palco que nunca rodou nada.</p>
              <div className="vds-le-hero-actions">
                <Button size="lg" iconRight={ARROW}>Garantir ingresso</Button>
                <Button size="lg" variant="ghost">Ver programação</Button>
              </div>
            </div>
            <ol className="vds-le-event-days">
              <li><span>Dia 1</span>Operação · do processo ao agente</li>
              <li><span>Dia 2</span>Produto · agente que o cliente usa</li>
              <li><span>Dia 3</span>Escala · custo, time e governança</li>
            </ol>
          </div>
        </HeroFrame>

        <HeroFrame name="Captura · material gratuito" context="baixar e-book ou webinar · captura de e-mail">
          <div className="vds-le-hero vds-le-hero--optin">
            <div className="vds-le-hero-copy">
              <span className="vds-le-kicker">Guia gratuito · 42 páginas</span>
              <h2>7 erros que cometi construindo agente em <em>produção</em>.</h2>
              <p>PDF editorial com cases reais e o que eu mudaria se começasse hoje. Chega no seu email em 60 segundos.</p>
              <form className="vds-le-optin-form" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  aria-label="Seu email"
                  placeholder="seu@email.com.br"
                  iconLeft={<Mail size={16} strokeWidth={1.75} />}
                />
                <Button type="submit" size="lg" iconRight={<Download size={16} strokeWidth={1.75} />}>Baixar grátis</Button>
              </form>
              <span className="vds-le-fine">Sem spam · descadastro com 1 clique</span>
            </div>
            <div className="vds-le-cover" aria-hidden="true">
              <div className="vds-le-cover-sheet">
                <BrandLogo variant="black" size="sm" monoOnly />
                <span className="vds-le-cover-kicker">Guia · 42 páginas</span>
                <strong>7 erros construindo agente em produção</strong>
                <span className="vds-le-cover-lines"><i /><i /><i /><i /></span>
                <span className="vds-le-cover-foot">Viver de IA · 2026</span>
              </div>
            </div>
          </div>
        </HeroFrame>

        <HeroFrame name="Thank-you · pós-conversão" context="depois que assinou · sem pressão">
          <div className="vds-le-hero vds-le-hero--thanks">
            <span className="vds-le-thanks-check" aria-hidden="true"><Check size={24} strokeWidth={1.75} /></span>
            <h2>Confirmado. <em>Próximo passo em 3 atos.</em></h2>
            <p>Seu plano Pro está ativo. Três passos pra começar a trilha de onboarding:</p>
            <ol className="vds-le-acts">
              <li><span>1</span><strong>Acessar a plataforma</strong>Trilha de onboarding e as soluções prontas.</li>
              <li><span>2</span><strong>Entrar na comunidade</strong>Empresários e líderes já estão se apresentando.</li>
              <li><span>3</span><strong>Escolher as 3 soluções</strong>As que você implementa nos primeiros 90 dias.</li>
            </ol>
            <Button size="lg" iconRight={ARROW}>Acessar plataforma</Button>
          </div>
        </HeroFrame>
      </div>
    </Section>
  );
}

/* ---------- CTA variants · 8 contextos ---------- */
function CTAVariantsSection() {
  const ctas = [
    { label: 'Ver planos', context: 'navegação · descoberta', kind: 'primary' },
    { label: 'Assinar o plano', context: 'conversão · decisão', kind: 'accent' },
    { label: 'Falar com especialista', context: 'consultoria · alto ticket', kind: 'primary' },
    { label: 'Baixar guia gratuito', context: 'lead magnet · email capture', kind: 'primary' },
    { label: 'Confirmar presença', context: 'evento · live', kind: 'primary' },
    { label: 'Conversar antes', context: 'objection handling · secundário', kind: 'secondary' },
    { label: 'Ver gravação', context: 'pós-evento · recap', kind: 'ghost' },
    { label: 'Recusar oferta', context: 'cancellation · destrutivo', kind: 'destructive' },
  ] as const;

  return (
    <Section
      title="Variações de CTA · 8 contextos · só a inicial maiúscula"
      meta="verbo no infinitivo · 2-4 palavras · sem 'CLIQUE AQUI'"
    >
      <div className="vds-le-ctas">
        {ctas.map((c) => (
          <article key={c.label} className="vds-le-cta-card">
            <Button
              variant={c.kind}
              iconRight={c.kind === 'primary' || c.kind === 'accent' ? <ArrowRight size={16} strokeWidth={1.75} /> : undefined}
            >
              {c.label}
            </Button>
            <span className="vds-le-cta-context">{c.context}</span>
          </article>
        ))}
      </div>

      <article className="vds-le-cta-rules">
        <h4>Regras canônicas pra CTA</h4>
        <ul>
          <li><strong>Verbo no infinitivo</strong> · “Ver planos” · não “PLANOS”</li>
          <li><strong>2-4 palavras</strong> · longo demais confunde, curto demais é vago</li>
          <li><strong>Sentence-case</strong> · não caps lock alérgico</li>
          <li><strong>Sem urgência fabricada</strong> · não “CLIQUE AQUI AGORA!!!”</li>
          <li><strong>Ação concreta</strong> · “Confirmar presença” diz o que vai acontecer</li>
          <li><strong>Variant accent só pra CTA principal</strong> · 1 por hero, não 5</li>
        </ul>
      </article>
    </Section>
  );
}

/* ---------- Trust signals avançados ---------- */
function TrustSignalsAdvancedSection() {
  return (
    <Section
      title="Prova social · 3 padrões avançados"
      meta="números editoriais · provas atribuídas · sem 'avaliado por especialistas'"
    >
      <div className="vds-le-trust-grid">
        <article className="vds-le-trust-numbers">
          <span className="vds-le-trust-eyebrow">prova com número</span>
          <ul>
            <li><strong className="mono">521</strong><em>cases reais de implementação de IA</em></li>
            <li><strong className="mono">157</strong><em>soluções de IA prontas pra usar</em></li>
            <li><strong className="mono">29</strong><em>setores com implementação</em></li>
            <li><strong className="mono">90 dias</strong><em>de garantia · 3 requisitos</em></li>
          </ul>
        </article>

        <article className="vds-le-trust-quote">
          <span className="vds-le-trust-eyebrow">prova atribuída</span>
          <blockquote>[Depoimento do cliente · frase real, com autorização.]</blockquote>
          <footer>
            <div className="av">N</div>
            <div>
              <strong>[Nome]</strong>
              <em>[cargo] · [empresa] · plano Pro</em>
            </div>
          </footer>
        </article>

        <article className="vds-le-trust-cases">
          <span className="vds-le-trust-eyebrow">cases reais · viverdeia.ai/cases</span>
          <ul>
            <li><strong>Place Dreams</strong><em>economiza R$ 42.000/ano em 30 dias</em></li>
            <li><strong>Trivia Studio</strong><em>R$ 120.000 de economia anual</em></li>
            <li><strong>Viva Nexo</strong><em>de 6h para cliques · R$ 162.000</em></li>
            <li><strong>Assessoria MAP</strong><em>economiza R$ 2.000 por mês</em></li>
          </ul>
        </article>
      </div>
    </Section>
  );
}

/* ---------- FAQ avançado ---------- */
function FAQAdvancedSection() {
  const faqs = [
    { cat: 'Pré-requisito', q: 'Meu time precisa saber programar?', a: 'Não. As soluções são plug and play, sem necessidade de programação. A trilha personalizada com IA adapta o conteúdo ao nível de cada colaborador, do CEO ao analista. Alfabetizamos antes de automatizar.' },
    { cat: 'Tempo', q: 'Quanto tempo até a primeira solução rodando?', a: 'As equipes começam a implementar soluções já na primeira semana. A trilha de onboarding indica o ritmo de cada pessoa do time, sem parar a operação.' },
    { cat: 'Garantia', q: 'E se não tiver resultado em 90 dias?', a: 'Devolvemos 100% do investimento se, em 90 dias, sua empresa não tiver nem aumento de receita nem redução de custos operacionais. Para ter direito: concluir a trilha de onboarding, concluir 3 formações e implementar as 3 soluções escolhidas na adesão.' },
    { cat: 'Condições', q: 'Onde estão as condições da garantia?', a: 'Na cláusula 7 dos termos de uso. A verificação dos três requisitos é feita pelos registros da plataforma.' },
    { cat: 'Mentoria', q: 'Como funciona a mentoria?', a: 'Ao vivo e em grupo: 10 check-ins por mês no plano Pro. No Enterprise entra também 1 hora por mês de mentoria individual e o arquiteto de soluções AI Builder.' },
    { cat: 'Operação', q: 'E se minha operação for muito específica?', a: 'São 521 cases reais de implementação de IA em 29 setores. As soluções cobrem vendas, marketing, atendimento, RH e financeiro, e as mentorias adaptam a solução ao seu contexto.' },
  ];

  return (
    <Section
      title="FAQ avançado · 6 categorias frequentes"
      meta="resposta direta · sem rodeio · sem 'consulte nosso time'"
    >
      <div className="vds-le-faq">
        {faqs.map((f, i) => (
          <details key={i} className="vds-le-faq-item" open={i === 0}>
            <summary>
              <div>
                <span className="vds-le-faq-cat">{f.cat}</span>
                <strong>{f.q}</strong>
              </div>
              <ChevronDown size={16} strokeWidth={1.75} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Lead magnet inline ---------- */
function LeadMagnetSection() {
  return (
    <Section
      title="Material gratuito no meio da página · captura de e-mail"
      meta="oferta direta · sem 'cadastre-se na newsletter pra ficar por dentro'"
    >
      <article className="vds-le-lead-magnet">
        <div className="vds-le-lead-magnet-l">
          <span className="vds-le-kicker">Guia gratuito · 42 páginas</span>
          <h3>7 erros que cometi construindo agente em <em>produção</em>.</h3>
          <p>PDF editorial · cases reais · o que mudaria se começasse hoje · envio direto no email em 60 segundos.</p>
          <ul>
            <li><Check size={16} strokeWidth={1.75} /> Cicatrizes reais documentadas</li>
            <li><Check size={16} strokeWidth={1.75} /> Código-base junto · pra copiar</li>
            <li><Check size={16} strokeWidth={1.75} /> Sem upsell · sem call de venda</li>
          </ul>
        </div>
        <form className="vds-le-lead-magnet-form" onSubmit={(e) => e.preventDefault()}>
          <Input
            id="lm-email"
            type="email"
            label="Seu email"
            placeholder="rafael@viverdeia.ai"
            iconLeft={<Mail size={16} strokeWidth={1.75} />}
          />
          <Button type="submit" size="lg" fullWidth iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
            Baixar grátis
          </Button>
          <span className="vds-le-fine">
            Envio direto no email · sem spam · descadastro com 1 clique
          </span>
        </form>
      </article>
    </Section>
  );
}

/* ---------- Countdown editorial ---------- */
function CountdownSection() {
  return (
    <Section
      title="Countdown editorial · sem urgência fabricada"
      meta="só mostra quando urgência é REAL (inscrição fecha, evento começa)"
    >
      <article className="vds-le-countdown via-mesh-navy via-noise">
        <span className="vds-le-countdown-eyebrow">
          <Calendar size={16} strokeWidth={1.75} />
          Imersão presencial começa em
        </span>
        <div className="vds-le-countdown-grid">
          <div><strong className="mono">09</strong><em>dias</em></div>
          <span className="vds-le-countdown-sep">:</span>
          <div><strong className="mono">14</strong><em>horas</em></div>
          <span className="vds-le-countdown-sep">:</span>
          <div><strong className="mono">22</strong><em>min</em></div>
        </div>
        <p>Imersão de implementação na sede · <strong>[data]</strong> · inclusa em todos os planos.</p>
        <Button variant="secondary" size="lg" iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
          Ver programação
        </Button>
      </article>

      <p className="vds-le-countdown-rule">
        <strong>Regra:</strong> só mostra countdown se a urgência é real (inscrição realmente fecha,
        evento realmente começa, preço realmente sobe). Nunca “criar urgência” inventando
        deadline. Se a oferta está sempre aberta, não mostra countdown.
      </p>
    </Section>
  );
}

/* ---------- Comparativo concorrente ---------- */
function CompetitorComparisonSection() {
  const rows = [
    { feature: 'Foco', us: 'IA na operação da empresa, com resultado medido', them: 'Aprender “engenharia de prompt” genérica' },
    { feature: 'Método', us: 'Soluções prontas + formações + mentoria em grupo', them: 'Aula gravada · sem mentoria ao vivo' },
    { feature: 'Stack', us: '157 soluções Plug-and-Play · sem programar', them: 'Genérico · “use o ChatGPT melhor”' },
    { feature: 'Garantia', us: '100% de volta em 90 dias · com 3 requisitos', them: 'Sem garantia de resultado' },
    { feature: 'Comunidade', us: 'Empresários e líderes · imersão na sede', them: 'Grupo aberto, sem curadoria' },
    { feature: 'Prova', us: '521 cases reais de implementação de IA', them: 'Print de influencer · sem case' },
    { feature: 'Preço', us: 'A partir de R$ 2.580/mês · contratação anual', them: 'Ticket baixo · conteúdo genérico' },
  ];

  return (
    <Section
      title="Comparativo com a concorrência · honesto"
      meta="mostra a diferença sem trash-talk · número como evidência"
    >
      <article className="vds-le-compare">
        <header>
          <div className="cell empty"></div>
          <div className="cell us">
            <strong>Viver de IA</strong>
            <em>plataforma B2B</em>
          </div>
          <div className="cell them">
            <strong>Curso “prompt eng”</strong>
            <em>genérico médio</em>
          </div>
        </header>
        {rows.map((r) => (
          <div key={r.feature} className="vds-le-compare-row">
            <div className="cell feature">{r.feature}</div>
            <div className="cell us">
              <Check size={16} strokeWidth={1.75} />
              {r.us}
            </div>
            <div className="cell them">{r.them}</div>
          </div>
        ))}
      </article>

      <p className="vds-le-compare-rule">
        <strong>Regra editorial:</strong> nunca cita concorrente direto pelo nome. “Curso de
        prompt engineering genérico” descreve a categoria. Honestidade competitiva é mostrar
        diferença real, não atacar pessoa.
      </p>
    </Section>
  );
}
