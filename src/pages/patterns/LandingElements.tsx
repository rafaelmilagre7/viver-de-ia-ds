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
        eyebrow="Padrões · landing elements"
        title={
          <>
            Elementos pra landings <em>sem reinventar a roda</em>.
          </>
        }
        lede="Hero variants (5), CTAs por contexto, trust signals avançados, FAQ editorial expandido, lead magnet inline, countdown editorial, comparativo concorrente. Papel claro por padrão; o navy fica pro momento de fechamento. Cada elemento independente — combina o que precisa pra cada landing nova."
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
   split com cartão da turma · manifesto centrado com prova · cartaz de evento ·
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
      title="Hero variants · 5 contextos"
      meta="cada landing escolhe o hero certo pelo contexto"
    >
      <div className="vds-le-heros">
        <HeroFrame name="Lançamento" context="D-X até D+0 · turma abre amanhã / hoje">
          <div className="vds-le-hero vds-le-hero--launch">
            <div className="vds-le-hero-copy">
              <span className="vds-le-kicker"><span className="vds-le-live" aria-hidden="true" />Inscrições abrem 22 mai · 9h</span>
              <h2>Operador que opera IA, <em>em 90 dias</em>.</h2>
              <p>Em 4 meses você sai daqui com 1 agente em produção — ou seu dinheiro de volta.</p>
              <div className="vds-le-hero-actions">
                <Button size="lg" iconRight={ARROW}>Ver programa</Button>
                <Button size="lg" variant="ghost">Baixar a ementa</Button>
              </div>
            </div>
            <aside className="vds-le-launch-card" aria-label="Turma 2026.3">
              <span className="vds-le-launch-title">Turma 2026.3</span>
              <dl>
                <div><dt>Início</dt><dd>22 mai</dd></div>
                <div><dt>Duração</dt><dd>16 semanas</dd></div>
                <div><dt>Formato</dt><dd>Ao vivo + gravado</dd></div>
                <div><dt>Turma</dt><dd>25 operadores</dd></div>
              </dl>
              <div className="vds-le-launch-meter">
                <span><strong>18</strong> de 25 vagas preenchidas</span>
                <span className="vds-le-launch-bar" aria-hidden="true"><span style={{ width: '72%' }} /></span>
              </div>
            </aside>
          </div>
        </HeroFrame>

        <HeroFrame name="Evergreen sales" context="landing principal · sempre no ar">
          <div className="vds-le-hero vds-le-hero--evergreen">
            <span className="vds-le-kicker">Formação técnico-operativa em IA</span>
            <h2>Viver de IA, <em>não de prompt</em>.</h2>
            <p>O método codificado que leva operador de negócio a colocar agente pra rodar — com mentoria, comunidade e código-base.</p>
            <div className="vds-le-hero-actions">
              <Button size="lg" iconRight={ARROW}>Conhecer o método</Button>
              <Button size="lg" variant="secondary">Falar com mentor</Button>
            </div>
            <dl className="vds-le-proof">
              <div><dt>operadores formados</dt><dd>220</dd></div>
              <div><dt>destravado em 12 meses</dt><dd>R$ 1,8M</dd></div>
              <div><dt>aulas no método</dt><dd>18</dd></div>
            </dl>
          </div>
        </HeroFrame>

        <HeroFrame name="Evento" context="Leaders AI Conference · live · mentoria coletiva">
          <div className="vds-le-hero vds-le-hero--event">
            <div className="vds-le-event-date" aria-label="18 a 20 de junho, São Paulo">
              <strong>18–20</strong>
              <span>junho 2026</span>
              <span>São Paulo</span>
            </div>
            <div className="vds-le-hero-copy">
              <span className="vds-le-kicker">Leaders AI Conference</span>
              <h2>3 dias. 47 cases reais. <em>0 teoria.</em></h2>
              <p>Operadores que já têm agente em produção contam o que mudou — sem palestrante de palco que nunca rodou nada.</p>
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

        <HeroFrame name="Opt-in · lead magnet" context="baixar ebook / webinar · captura email">
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

        <HeroFrame name="Thank-you · pós-conversão" context="depois que pagou / inscreveu · sem pressão">
          <div className="vds-le-hero vds-le-hero--thanks">
            <span className="vds-le-thanks-check" aria-hidden="true"><Check size={24} strokeWidth={1.75} /></span>
            <h2>Confirmado. <em>Próximo passo em 3 atos.</em></h2>
            <p>A turma 2026.3 começa em 14 dias. Enquanto isso, três coisas pra entrar no ritmo:</p>
            <ol className="vds-le-acts">
              <li><span>1</span><strong>Acessar a plataforma</strong>Aula zero e o mapa das 16 semanas.</li>
              <li><span>2</span><strong>Entrar na comunidade</strong>Sua turma já está se apresentando.</li>
              <li><span>3</span><strong>Agendar o diagnóstico</strong>30 min com mentor pra escolher o primeiro agente.</li>
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
    { label: 'Ver programa', context: 'navegação · descoberta', kind: 'primary' },
    { label: 'Entrar na turma', context: 'conversão · decisão', kind: 'accent' },
    { label: 'Falar com mentor', context: 'consultoria · alto ticket', kind: 'primary' },
    { label: 'Baixar guia gratuito', context: 'lead magnet · email capture', kind: 'primary' },
    { label: 'Confirmar presença', context: 'evento · live', kind: 'primary' },
    { label: 'Conversar antes', context: 'objection handling · secundário', kind: 'secondary' },
    { label: 'Ver gravação', context: 'pós-evento · recap', kind: 'ghost' },
    { label: 'Recusar oferta', context: 'cancellation · destrutivo', kind: 'destructive' },
  ] as const;

  return (
    <Section
      title="CTA variants · 8 contextos · sentence-case sempre"
      meta="verbo no infinitivo · 2-4 palavras · sem 'CLIQUE AQUI'"
    >
      <div className="vds-le-ctas">
        {ctas.map((c) => (
          <article key={c.label} className="vds-le-cta-card">
            <Button
              variant={c.kind}
              iconRight={c.kind === 'primary' || c.kind === 'accent' ? <ArrowRight size={14} strokeWidth={1.75} /> : undefined}
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
          <li><strong>Verbo no infinitivo</strong> · "Ver programa" · não "PROGRAMA"</li>
          <li><strong>2-4 palavras</strong> · longo demais confunde, curto demais é vago</li>
          <li><strong>Sentence-case</strong> · não caps lock alérgico</li>
          <li><strong>Sem urgência fabricada</strong> · não "CLIQUE AQUI AGORA!!!"</li>
          <li><strong>Ação concreta</strong> · "Confirmar presença" diz o que vai acontecer</li>
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
      title="Trust signals · 3 padrões avançados"
      meta="números editoriais · provas atribuídas · sem 'avaliado por especialistas'"
    >
      <div className="vds-le-trust-grid">
        <article className="vds-le-trust-numbers">
          <span className="vds-le-trust-eyebrow">prova com número</span>
          <ul>
            <li><strong className="mono">+220</strong><em>operadores formados desde 2024</em></li>
            <li><strong className="mono">R$ 1,8M</strong><em>destravado por alunos em 12 meses</em></li>
            <li><strong className="mono">11.920</strong><em>conversas/mês rodando via Nina</em></li>
            <li><strong className="mono">90 dias</strong><em>até primeiro agente em produção</em></li>
          </ul>
        </article>

        <article className="vds-le-trust-quote">
          <span className="vds-le-trust-eyebrow">prova atribuída</span>
          <blockquote>"Ela fez isso com pouquíssimas horas. Sem saber nada."</blockquote>
          <footer>
            <div className="av">ML</div>
            <div>
              <strong>Márisson Lage</strong>
              <em>CTO · Efizi · turma 2025.3</em>
            </div>
          </footer>
        </article>

        <article className="vds-le-trust-cases">
          <span className="vds-le-trust-eyebrow">casos reais nominais</span>
          <ul>
            <li><strong>Caio Ribeiro</strong><em>construiu a Nina · 11.920 conversas/mês</em></li>
            <li><strong>Camila Moraes</strong><em>agente proposta · 73% menos token</em></li>
            <li><strong>Daniel Pinheiro</strong><em>onboarding agente · 2h → 20min</em></li>
            <li><strong>Diego Martins</strong><em>SDR automatizado · 4h/sem economizadas</em></li>
          </ul>
        </article>
      </div>
    </Section>
  );
}

/* ---------- FAQ avançado ---------- */
function FAQAdvancedSection() {
  const faqs = [
    { cat: 'Pré-requisito', q: 'Preciso saber programar pra entrar?', a: 'Não. Mas precisa estar disposto a ler código (não a escrever do zero), entender lógica de prompts e copy/paste de snippets que a gente fornece. Operador que não toca código nenhum não vai conseguir.' },
    { cat: 'Tempo', q: 'Quantas horas por semana isso pede?', a: 'Médio 6-8h/semana — 2h em aula gravada · 1h em live ao vivo · 3h em prática própria. Pode comprimir em 1 final de semana se a operação tá apertada na semana.' },
    { cat: 'Garantia', q: 'E se eu não chegar no agente em produção em 90 dias?', a: 'Você fica no programa sem mensalidade extra até chegar. Não cobramos turma de segunda chance · sem culpa. Mais de 92% chegam no prazo, mas o contrato é com o resultado.' },
    { cat: 'Devolução', q: 'Tem garantia de devolução?', a: '60 dias · devolução total · sem perguntas. Aluno entra achando que era X e na real era Y, devolve · sem drama.' },
    { cat: 'Mentoria', q: 'A mentoria 1:1 é com quem?', a: 'Operadores que já construíram agente em produção. Caio (fundador) faz a maioria das mentorias da turma. Outros mentores são alunos veteranos que viraram parceiros.' },
    { cat: 'Operação', q: 'E se minha operação for muito específica?', a: 'O método é genérico — agente IA é agente IA. O caso de uso muda. Já formamos operadores em SaaS, fintech, e-commerce, educação, advocacia, marketing, RH, healthcare. Se seu negócio gera texto ou conversa, cabe.' },
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
      title="Lead magnet inline · captura de email"
      meta="oferta direta · sem 'cadastre-se na newsletter pra ficar por dentro'"
    >
      <article className="vds-le-lead-magnet">
        <div className="vds-le-lead-magnet-l">
          <span className="vds-le-kicker">Guia gratuito · 42 páginas</span>
          <h3>7 erros que cometi construindo agente em <em>produção</em>.</h3>
          <p>PDF editorial · cases reais · o que mudaria se começasse hoje · envio direto no email em 60 segundos.</p>
          <ul>
            <li><Check size={14} strokeWidth={1.75} /> Cicatrizes reais documentadas</li>
            <li><Check size={14} strokeWidth={1.75} /> Código-base junto · pra copiar</li>
            <li><Check size={14} strokeWidth={1.75} /> Sem upsell · sem call de venda</li>
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
      meta="só mostra quando urgência é REAL (turma fecha, evento começa)"
    >
      <article className="vds-le-countdown via-mesh-navy via-noise">
        <span className="vds-le-countdown-eyebrow">
          <Calendar size={14} strokeWidth={1.75} />
          Turma 2026.3 fecha em
        </span>
        <div className="vds-le-countdown-grid">
          <div><strong className="mono">09</strong><em>dias</em></div>
          <span className="vds-le-countdown-sep">:</span>
          <div><strong className="mono">14</strong><em>horas</em></div>
          <span className="vds-le-countdown-sep">:</span>
          <div><strong className="mono">22</strong><em>min</em></div>
        </div>
        <p>Depois disso, próxima turma só em <strong>outubro 2026</strong>. Sem turma intermediária.</p>
        <Button variant="secondary" size="lg" iconRight={<ArrowRight size={16} strokeWidth={1.75} />}>
          Ver programa
        </Button>
      </article>

      <p className="vds-le-countdown-rule">
        <strong>Regra:</strong> só mostra countdown se a urgência é real (turma realmente fecha,
        evento realmente começa, preço realmente sobe). Nunca "criar urgência" inventando
        deadline. Se a turma sempre abre, não mostra countdown.
      </p>
    </Section>
  );
}

/* ---------- Comparativo concorrente ---------- */
function CompetitorComparisonSection() {
  const rows = [
    { feature: 'Foco', us: 'Operador construindo agente em produção', them: 'Aprender "prompt engineering" geral' },
    { feature: 'Método', us: '4 meses · 18 aulas + mentoria 1:1 mensal', them: '20-40h gravado · sem mentoria 1:1' },
    { feature: 'Stack', us: 'Real · Claude SDK / OpenAI / open-source', them: 'Genérico · "use ChatGPT melhor"' },
    { feature: 'Garantia', us: '90 dias até agente em produção · ou devolve', them: 'Sem garantia de resultado' },
    { feature: 'Comunidade', us: '25 operadores por turma · Discord fechado', them: 'Grupo aberto de 10k pessoas' },
    { feature: 'Quem ensina', us: 'Caio · construiu agente em produção (Nina)', them: 'Influencer que viu 100 vídeos' },
    { feature: 'Preço', us: 'R$ 2.400/mês · 4 meses · alto-ticket', them: 'R$ 297-997 · low-ticket genérico' },
  ];

  return (
    <Section
      title="Comparativo concorrente · honesto"
      meta="mostra a diferença sem trash-talk · número como evidência"
    >
      <article className="vds-le-compare">
        <header>
          <div className="cell empty"></div>
          <div className="cell us">
            <strong>Viver de IA</strong>
            <em>técnico-operativo</em>
          </div>
          <div className="cell them">
            <strong>Curso "prompt eng"</strong>
            <em>genérico médio</em>
          </div>
        </header>
        {rows.map((r) => (
          <div key={r.feature} className="vds-le-compare-row">
            <div className="cell feature">{r.feature}</div>
            <div className="cell us">
              <Check size={14} strokeWidth={1.75} />
              {r.us}
            </div>
            <div className="cell them">{r.them}</div>
          </div>
        ))}
      </article>

      <p className="vds-le-compare-rule">
        <strong>Regra editorial:</strong> nunca cita concorrente direto pelo nome. "Curso de
        prompt engineering genérico" descreve a categoria. Honestidade competitiva é mostrar
        diferença real, não atacar pessoa.
      </p>
    </Section>
  );
}
