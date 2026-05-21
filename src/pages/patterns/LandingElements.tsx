import { ArrowRight, Calendar, Check, ChevronDown, Mail, Zap } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
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
        lede="Hero variants (5), CTAs por contexto, trust signals avançados, FAQ editorial expandido, lead magnet inline, countdown editorial, comparativo concorrente. Cada elemento independente — combina o que precisa pra cada landing nova."
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

/* ---------- Hero variants · 5 contextos ---------- */
function HeroVariantsSection() {
  return (
    <Section
      title="Hero variants · 5 contextos"
      meta="cada landing escolhe o hero certo pelo contexto"
    >
      <div className="vds-le-heros">
        <article className="vds-le-hero-card">
          <header>
            <span className="vds-le-hero-name">Lançamento</span>
            <em>D-X até D+0 · turma abre amanhã / hoje</em>
          </header>
          <div className="vds-le-hero-canvas via-mesh-navy via-noise">
            <span className="vds-le-hero-eyebrow">turma 2026.3 · abre 22 mai 9h</span>
            <h2>Operador que opera IA · <em>90 dias</em></h2>
            <p>em 4 meses sai daqui com 1 agente em produção · ou seu dinheiro de volta</p>
            <div className="vds-le-hero-actions">
              <a href="#" className="vds-le-hero-cta">Ver programa<ArrowRight size={13} strokeWidth={2.4} /></a>
              <a href="#" className="vds-le-hero-ghost">Ver programa completo</a>
            </div>
            <img src={monogramWhite} alt="" className="vds-le-hero-mono" />
          </div>
        </article>

        <article className="vds-le-hero-card">
          <header>
            <span className="vds-le-hero-name">Evergreen sales</span>
            <em>landing principal · sempre no ar</em>
          </header>
          <div className="vds-le-hero-canvas via-mesh-navy via-noise">
            <span className="vds-le-hero-eyebrow">formação técnico-operativa em IA</span>
            <h2>Viver de IA, <em>não de prompt</em>.</h2>
            <p>220 operadores formados · R$ 1,8M destravado em 12 meses · método codificado em 18 aulas</p>
            <div className="vds-le-hero-actions">
              <a href="#" className="vds-le-hero-cta">Conhecer o método<ArrowRight size={13} strokeWidth={2.4} /></a>
              <a href="#" className="vds-le-hero-ghost">Falar com mentor</a>
            </div>
            <img src={monogramWhite} alt="" className="vds-le-hero-mono" />
          </div>
        </article>

        <article className="vds-le-hero-card">
          <header>
            <span className="vds-le-hero-name">Evento</span>
            <em>Leaders AI Conference · live · mentoria coletiva</em>
          </header>
          <div className="vds-le-hero-canvas via-mesh-navy via-noise">
            <span className="vds-le-hero-eyebrow">leaders AI conference · 18-20 jun · SP</span>
            <h2>3 dias. 47 cases reais. <em>0 teoria.</em></h2>
            <p>operadores que já têm agente em produção contam o que mudou · sem palestrante de palco que nunca rodou nada</p>
            <div className="vds-le-hero-actions">
              <a href="#" className="vds-le-hero-cta">Garantir ingresso<ArrowRight size={13} strokeWidth={2.4} /></a>
              <a href="#" className="vds-le-hero-ghost">Ver speakers</a>
            </div>
            <img src={monogramWhite} alt="" className="vds-le-hero-mono" />
          </div>
        </article>

        <article className="vds-le-hero-card">
          <header>
            <span className="vds-le-hero-name">Opt-in · lead magnet</span>
            <em>baixar ebook / webinar · captura email</em>
          </header>
          <div className="vds-le-hero-canvas via-mesh-navy via-noise">
            <span className="vds-le-hero-eyebrow">guia gratuito · 42 páginas</span>
            <h2>7 erros que cometi construindo agente em <em>produção</em></h2>
            <p>PDF editorial · cases reais · o que mudaria se começasse hoje · envio direto no email</p>
            <div className="vds-le-hero-actions">
              <a href="#" className="vds-le-hero-cta">Baixar grátis<ArrowRight size={13} strokeWidth={2.4} /></a>
            </div>
            <img src={monogramWhite} alt="" className="vds-le-hero-mono" />
          </div>
        </article>

        <article className="vds-le-hero-card">
          <header>
            <span className="vds-le-hero-name">Thank-you · pós-conversão</span>
            <em>depois que pagou / inscreveu · sem pressão</em>
          </header>
          <div className="vds-le-hero-canvas via-mesh-navy via-noise">
            <span className="vds-le-hero-eyebrow">tua vaga tá garantida</span>
            <h2>Confirmado. <em>Próximo passo</em> em 3 atos.</h2>
            <p>turma 2026.3 começa em 14 dias · enquanto isso, 3 coisas pra entrar no ritmo</p>
            <div className="vds-le-hero-actions">
              <a href="#" className="vds-le-hero-cta">Acessar plataforma<ArrowRight size={13} strokeWidth={2.4} /></a>
            </div>
            <img src={monogramWhite} alt="" className="vds-le-hero-mono" />
          </div>
        </article>
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
    { label: 'Conversar antes', context: 'objection handling · ghost CTA', kind: 'ghost' },
    { label: 'Ver gravação', context: 'pós-evento · recap', kind: 'ghost' },
    { label: 'Recusar oferta', context: 'cancellation · destrutivo', kind: 'destructive' },
  ];

  return (
    <Section
      title="CTA variants · 8 contextos · sentence-case sempre"
      meta="verbo no infinitivo · 2-4 palavras · sem 'CLIQUE AQUI'"
    >
      <div className="vds-le-ctas">
        {ctas.map((c) => (
          <article key={c.label} className="vds-le-cta-card">
            <button className={`vds-le-cta ${c.kind}`}>
              {c.label}
              {c.kind !== 'ghost' && c.kind !== 'destructive' && (
                <ArrowRight size={13} strokeWidth={2.4} />
              )}
            </button>
            <em>{c.context}</em>
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
          <li><strong>Variant accent só pra THE CTA</strong> · 1 por hero, não 5</li>
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
            <li><strong>Yago Almeida</strong><em>SDR automatizado · 4h/sem economizadas</em></li>
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
              <ChevronDown size={14} strokeWidth={2.2} />
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
      <article className="vds-le-lead-magnet via-mesh-navy via-noise">
        <div className="vds-le-lead-magnet-l">
          <span className="vds-le-lead-magnet-eyebrow">
            <Zap size={11} strokeWidth={2.4} />
            guia gratuito · 42 páginas
          </span>
          <h3>7 erros que cometi construindo agente em <em>produção</em>.</h3>
          <p>PDF editorial · cases reais · o que mudaria se começasse hoje · envio direto no email em 60 segundos.</p>
          <ul>
            <li><Check size={13} strokeWidth={2.4} /> Cicatrizes reais documentadas</li>
            <li><Check size={13} strokeWidth={2.4} /> Código-base junto · pra copiar</li>
            <li><Check size={13} strokeWidth={2.4} /> Sem upsell · sem call de venda</li>
          </ul>
        </div>
        <form className="vds-le-lead-magnet-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="lm-email">Seu email</label>
          <div className="vds-le-lead-magnet-input">
            <Mail size={14} strokeWidth={1.8} />
            <input id="lm-email" type="email" placeholder="rafael@viverdeia.ai" />
          </div>
          <button type="submit" className="vds-le-lead-magnet-cta">
            Baixar grátis
            <ArrowRight size={13} strokeWidth={2.4} />
          </button>
          <em className="vds-le-lead-magnet-fine">
            envio direto no email · sem spam · pode descadastrar com 1 clique
          </em>
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
          <Calendar size={11} strokeWidth={2.4} />
          turma 2026.3 fecha em
        </span>
        <div className="vds-le-countdown-grid">
          <div><strong className="mono">09</strong><em>dias</em></div>
          <span className="vds-le-countdown-sep">:</span>
          <div><strong className="mono">14</strong><em>horas</em></div>
          <span className="vds-le-countdown-sep">:</span>
          <div><strong className="mono">22</strong><em>min</em></div>
        </div>
        <p>depois disso, próxima turma só em <strong>outubro 2026</strong>. sem turma intermediária.</p>
        <a href="#" className="vds-le-countdown-cta">
          Ver programa
          <ArrowRight size={13} strokeWidth={2.4} />
        </a>
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
              <Check size={13} strokeWidth={2.4} />
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
