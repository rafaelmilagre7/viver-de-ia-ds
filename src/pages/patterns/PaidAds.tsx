import {
  ArrowRight, MoreHorizontal, Check, X, Play, Search,
  Briefcase, Wrench, Building2, TrendingUp, Target,
  ThumbsUp, MessageCircle, Share2,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import appIcon from '../../assets/logos/VIA_app_icon.png';
import './paid-ads.css';

/* ============================================================
   Paid ads · Meta + LinkedIn + Google Search + Display + YouTube
   ============================================================ */

export default function PaidAds() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · paid ads"
        title={
          <>
            Anúncio pago com <em>peso editorial</em>.
          </>
        }
        lede="Meta Ads (single, carousel, story, reels) · LinkedIn (single, carousel) · Google Search (text + sitelinks) · Google Display (6 sizes) · YouTube pre-roll. Plus audience matrix, A/B variants, pre-flight checklist e libraries de headline/body/CTA. Headlines comprimidas em 40 chars, body em 2 frases, CTA verbal infinitivo. Zero 'GARANTA JÁ!!!', zero emoji decorativo."
      />

      <h2 className="vds-pa-divider">A · Formatos de anúncio</h2>

      <MetaSingleSection />
      <MetaCarouselSection />
      <MetaStorySection />
      <MetaReelSection />
      <LinkedInSingleSection />
      <LinkedInCarouselSection />
      <GoogleSearchSection />
      <GoogleDisplaySection />
      <YouTubePreRollSection />

      <h2 className="vds-pa-divider">B · Estratégia + editorial</h2>

      <AudienceMatrixSection />
      <ABVariantSection />
      <PreflightSection />
      <HeadlineLibrarySection />
      <BodyLibrarySection />
      <CTALibrarySection />
    </>
  );
}

/* ============================================================
   META · SINGLE IMAGE 1080×1080
   ============================================================ */
function MetaSingleSection() {
  return (
    <Section
      title="Meta · single image · 1080×1080"
      meta="ad real renderizado com chrome do Feed · 1 imagem + headline + body + CTA"
    >
      <div className="vds-pa-stage">
        <article className="vds-pa-meta-ad">
          <header className="vds-pa-meta-hdr">
            <div className="vds-pa-meta-page">
              <img src={appIcon} alt="" />
              <div>
                <strong>Viver de IA</strong>
                <em>Patrocinado <span className="dot">·</span> <Globe /></em>
              </div>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={2} /></button>
          </header>

          <div className="vds-pa-meta-text">
            <p><strong>Em 2026, operador que não opera IA, não opera.</strong></p>
            <p>220 operadores formados · próxima turma fecha em 9 dias.</p>
          </div>

          <div className="vds-pa-meta-canvas via-mesh-navy via-noise">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-meta-eyebrow">turma 2026.3 · 30 vagas · 4 meses</span>
            <h2>
              90 dias. <em>1 agente em produção</em>.
            </h2>
            <p>ou seu dinheiro de volta</p>
            <img src={monogramWhite} alt="" className="vds-pa-meta-mono" />
          </div>

          <footer className="vds-pa-meta-footer">
            <div>
              <em className="vds-pa-meta-domain">VIVERDEIA.AI</em>
              <strong>Ver programa</strong>
              <em>Formação técnico-operativa em IA</em>
            </div>
            <a href="#" className="vds-pa-meta-cta">Saiba mais</a>
          </footer>

          <div className="vds-pa-meta-actions">
            <span><ThumbsUp size={14} strokeWidth={2} /> Curtir</span>
            <span><MessageCircle size={14} strokeWidth={2} /> Comentar</span>
            <span><Share2 size={14} strokeWidth={2} /> Compartilhar</span>
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Headline', v: 'Frase única · ≤40 chars · afirmação não pergunta' },
          { k: 'Primary text', v: 'Hook + razão · até 125 chars antes do "Ver mais"' },
          { k: 'Image', v: '1080×1080 (1:1) · navy editorial · zero foto literal' },
          { k: 'CTA button', v: '"Saiba mais" · "Cadastre-se" · "Ver agora" · NÃO "Garanta já"' },
          { k: 'Link description', v: 'Sub-headline · clarifica o programa em 1 linha' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   META · CAROUSEL 5 CARDS
   ============================================================ */
function MetaCarouselSection() {
  const cards = [
    { n: 1, h: '+220', sub: 'operadores formados em 2 anos', type: 'hook' },
    { n: 2, h: '90 dias', sub: 'até primeiro agente em produção', type: 'context' },
    { n: 3, h: '4 meses', sub: 'mentoria 1:1 · comunidade · plataforma', type: 'context' },
    { n: 4, h: 'R$ 1,8M', sub: 'destravado por alunos em 12 meses', type: 'result' },
    { n: 5, h: 'Ver programa', sub: 'turma 2026.3 abre 22 mai', type: 'cta' },
  ];

  return (
    <Section
      title="Meta · carousel · 5 cards"
      meta="primeiro card = hook · meio = contexto + prova · último = CTA"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-carousel-row">
          {cards.map((c) => (
            <article key={c.n} className={`vds-pa-carousel-card ${c.type}`}>
              <span className="vds-pa-aura" aria-hidden="true" />
              <span className="vds-pa-carousel-num">{c.n}/5</span>
              <div>
                <h3>{c.h}</h3>
                <p>{c.sub}</p>
              </div>
              {(c.n === 1 || c.n === 5) && <img src={monogramWhite} alt="" />}
            </article>
          ))}
        </div>

        <SpecBlock items={[
          { k: 'Tamanho', v: '1080×1080 cada card · até 10 cards' },
          { k: 'Hook (card 1)', v: 'Número grande · texto mínimo · curioso pra passar' },
          { k: 'Desenvolvimento', v: 'Contexto + razão · evitar repetir hook' },
          { k: 'CTA (último)', v: 'Verbo no infinitivo · destaque visual diferente' },
          { k: 'Headline', v: 'Mesma em todos · descreve a oferta de cima a baixo' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   META · STORY 9:16
   ============================================================ */
function MetaStorySection() {
  return (
    <Section
      title="Meta · story · 1080×1920"
      meta="9:16 vertical · safe area top + bottom · CTA sticker"
    >
      <div className="vds-pa-stage vds-pa-stage-row">
        <article className="vds-pa-story">
          <div className="vds-pa-story-progress">
            <span style={{ width: '45%' }} />
          </div>
          <header>
            <span className="av"><img src={appIcon} alt="" /></span>
            <strong>viverdeia.ai</strong>
            <em>Patrocinado</em>
          </header>
          <div className="vds-pa-story-canvas via-mesh-navy via-noise">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-story-eyebrow">turma 2026.3</span>
            <h2>
              90 dias.<br />
              1 agente em produção.<br />
              <em>ou seu dinheiro de volta</em>.
            </h2>
            <a href="#" className="vds-pa-story-cta">
              <span>Saiba mais</span>
              <ArrowRight size={13} strokeWidth={2.4} />
            </a>
            <img src={monogramWhite} alt="" className="vds-pa-story-mono" />
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Tamanho', v: '1080×1920 (9:16)' },
          { k: 'Safe area top', v: '250px reservada · username + progress' },
          { k: 'Safe area bottom', v: '250px reservada · CTA sticker + reply' },
          { k: 'Conteúdo central', v: '~1420px usável · headline + sub + CTA' },
          { k: 'CTA sticker', v: 'Posicionado no terço inferior · botão pill 999' },
          { k: 'Logo', v: 'monogram_white inferior centralizado 32px' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   META · REEL COVER FRAME
   ============================================================ */
function MetaReelSection() {
  return (
    <Section
      title="Meta · reel ad · cover frame"
      meta="primeira frame do reel · texto curto · hook visual forte"
    >
      <div className="vds-pa-stage">
        <article className="vds-pa-reel">
          <div className="vds-pa-reel-canvas via-mesh-navy via-noise">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-reel-eyebrow">3 cicatrizes</span>
            <h2>
              Construindo a Nina,<br />
              <em>cometi 3 erros</em>.
            </h2>
            <p>todos custaram caro · vídeo de 90s</p>
            <img src={monogramWhite} alt="" className="vds-pa-reel-mono" />
            <span className="vds-pa-reel-play"><Play size={22} strokeWidth={0} style={{ fill: 'var(--via-navy)' }} /></span>
          </div>
          <aside>
            <strong>viverdeia.ai</strong>
            <em>Patrocinado</em>
            <p>cases reais · sem teoria · sem guru</p>
            <a href="#" className="vds-pa-reel-cta">Saiba mais</a>
          </aside>
        </article>
      </div>
    </Section>
  );
}

/* ============================================================
   LINKEDIN · SINGLE IMAGE 1200×627
   ============================================================ */
function LinkedInSingleSection() {
  return (
    <Section
      title="LinkedIn · single image · 1200×627"
      meta="ad real renderizado com chrome do Feed · tom mais sóbrio · B2B"
    >
      <div className="vds-pa-stage">
        <article className="vds-pa-li-ad">
          <header className="vds-pa-li-hdr">
            <div className="vds-pa-li-page">
              <span className="vds-pa-li-logo">
                <img src={appIcon} alt="" />
              </span>
              <div>
                <strong>Viver de IA</strong>
                <em>4.832 seguidores</em>
                <span className="vds-pa-li-promoted">Promoted</span>
              </div>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={2} /></button>
          </header>

          <div className="vds-pa-li-text">
            <p>
              Operadores que estão construindo agentes em produção compartilham aqui o que aprenderam em 90 dias.
            </p>
            <p>
              <strong>Turma 2026.3</strong> abre 22 mai. 30 vagas. <a href="#">Aplique-se →</a>
            </p>
          </div>

          <div className="vds-pa-li-canvas via-mesh-navy via-noise">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-li-eyebrow">programa técnico-operativo</span>
            <h2>
              90 dias até <em>1 agente em produção</em>.
            </h2>
            <p>4 meses · mentoria 1:1 · comunidade de 220 operadores</p>
            <img src={monogramWhite} alt="" className="vds-pa-li-mono" />
          </div>

          <footer className="vds-pa-li-footer">
            <div>
              <em>viverdeia.ai</em>
              <strong>Ver programa</strong>
            </div>
            <a href="#" className="vds-pa-li-cta">
              Saiba mais
            </a>
          </footer>

          <div className="vds-pa-li-actions">
            <span><ThumbsUp size={14} strokeWidth={2} /> Recomendar</span>
            <span><MessageCircle size={14} strokeWidth={2} /> Comentar</span>
            <span><Share2 size={14} strokeWidth={2} /> Republicar</span>
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Dimensões', v: '1200×627 (1.91:1) · arquivo PNG/JPG' },
          { k: 'Intro text', v: '≤150 chars antes do "see more" · tom B2B sóbrio' },
          { k: 'Headline', v: '≤70 chars · clareza > criatividade · evita superlativos' },
          { k: 'CTA options', v: '"Aplique-se" · "Saiba mais" · "Inscreva-se" · "Baixe agora"' },
          { k: 'Persona-alvo', v: 'Founder · CTO · Head IA · Líder de operações' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   LINKEDIN · CAROUSEL 4 CARDS
   ============================================================ */
function LinkedInCarouselSection() {
  const cards = [
    { n: 1, h: '5 sinais de que sua operação tá pronta pra IA.', type: 'hook' },
    { n: 2, h: '1. Você tem 1 fonte única de verdade no CRM.', type: 'point' },
    { n: 3, h: '2. Tem alguém responsável (não comitê).', type: 'point' },
    { n: 4, h: '3. Mede o que pesa no caixa, não vaidade.', type: 'point' },
  ];

  return (
    <Section
      title="LinkedIn · carousel · 4 cards"
      meta="document carousel · 1080×1080 cada · estrutura editorial 'lista numerada'"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-li-carousel">
          {cards.map((c) => (
            <article key={c.n} className={`vds-pa-li-card via-mesh-navy via-noise ${c.type}`}>
              <span className="vds-pa-aura" aria-hidden="true" />
              <span className="vds-pa-li-card-num">{c.n} / {cards.length}</span>
              <h3>{c.h}</h3>
              {c.n === 1 && <img src={monogramWhite} alt="" className="vds-pa-li-card-mono" />}
              {c.n === cards.length && (
                <span className="vds-pa-li-card-next">arraste pra ver mais →</span>
              )}
            </article>
          ))}
        </div>

        <SpecBlock items={[
          { k: 'Formato', v: 'Document carousel (PDF) · LinkedIn renderiza nativo' },
          { k: 'Cards', v: '4-10 cards · 1080×1080 ou 1080×1350 (vertical)' },
          { k: 'Estrutura', v: 'Hook → desenvolvimento → CTA · narrativa linear' },
          { k: 'Texto', v: 'Curto · 1-2 linhas por card · sem block de prosa' },
          { k: 'Engagement', v: 'Carousel tem 3x mais dwell time que single image' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   GOOGLE SEARCH AD · text + sitelinks
   ============================================================ */
function GoogleSearchSection() {
  return (
    <Section
      title="Google Search · responsive text ad"
      meta="aparece no topo do search · headlines + descrições + sitelinks + callouts"
    >
      <div className="vds-pa-stage">
        <article className="vds-pa-gs-ad">
          <div className="vds-pa-gs-search">
            <Search size={14} strokeWidth={2} />
            <span>curso ia agentes em produção</span>
          </div>

          <div className="vds-pa-gs-result">
            <header>
              <span className="vds-pa-gs-sponsored">Patrocinado</span>
              <div className="vds-pa-gs-url">
                <span className="vds-pa-gs-favicon"><img src={appIcon} alt="" /></span>
                <em>https://viverdeia.ai</em>
                <em>› programa</em>
              </div>
            </header>

            <h3 className="vds-pa-gs-headline">
              Construa 1 Agente IA em 90 Dias · Viver de IA
            </h3>

            <p className="vds-pa-gs-desc">
              Programa técnico-operativo de 4 meses. 220 operadores formados. R$ 1,8M destravado em 12 meses. Turma 2026.3 abre 22 mai · 30 vagas.
            </p>

            <ul className="vds-pa-gs-sitelinks">
              <li><strong>Ver programa</strong><em>4 meses · estrutura completa</em></li>
              <li><strong>Casos reais</strong><em>11.920 conversas/mês</em></li>
              <li><strong>Mentores</strong><em>Caio Ribeiro + 4 ops</em></li>
              <li><strong>Inscrição</strong><em>30 vagas · 22 mai</em></li>
            </ul>

            <div className="vds-pa-gs-callouts">
              <span>Garantia 100%</span>
              <span>·</span>
              <span>4 meses</span>
              <span>·</span>
              <span>30 vagas</span>
              <span>·</span>
              <span>Mentoria 1:1</span>
            </div>
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Headlines', v: '3 obrigatórias · ≤30 chars cada · Title Case · sem caps lock' },
          { k: 'Descriptions', v: '2 obrigatórias · ≤90 chars · frases completas · ponto final' },
          { k: 'Display URL', v: 'Path 1 + Path 2 · ≤15 chars cada · ex: "programa/2026"' },
          { k: 'Sitelinks', v: '4-6 extras · cada com headline 25 chars + 2 descriptions 35 chars' },
          { k: 'Callouts', v: '4-6 frases curtas · ≤25 chars · prova/benefícios não-vendíveis' },
          { k: 'Structured snippets', v: 'Lista de categorias · ex: "Módulos: Fundamentos · Prompt · Agentes"' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   GOOGLE DISPLAY · 6 sizes canônicos
   ============================================================ */
function GoogleDisplaySection() {
  const sizes = [
    { name: 'Medium rectangle', size: '300×250', class: 'g-300-250', use: 'inline article · sidebar desktop' },
    { name: 'Large rectangle', size: '336×280', class: 'g-336-280', use: 'mais peso visual · article body' },
    { name: 'Leaderboard', size: '728×90', class: 'g-728-90', use: 'topo de página · desktop wide' },
    { name: 'Half page', size: '300×600', class: 'g-300-600', use: 'sidebar dedicada · scroll long' },
    { name: 'Mobile banner', size: '320×100', class: 'g-320-100', use: 'topo/rodapé mobile · alta exposure' },
    { name: 'Billboard', size: '970×250', class: 'g-970-250', use: 'hero de portal · luxury inventory' },
  ];

  return (
    <Section
      title="Google Display Network · 6 sizes canônicos"
      meta="cada size com headline + sub + CTA + logo · texto reduz com o canvas"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-gdn-grid">
          {sizes.map((s) => (
            <article key={s.size}>
              <header>
                <strong>{s.name}</strong>
                <span className="vds-pa-gdn-size">{s.size}</span>
                <em>{s.use}</em>
              </header>
              <div className={`vds-pa-gdn-banner ${s.class} via-mesh-navy via-noise`}>
                <span className="vds-pa-aura" aria-hidden="true" />
                <div className="vds-pa-gdn-text">
                  <h3>
                    <em>90 dias</em>.<br />
                    1 agente em produção.
                  </h3>
                  <p>turma 2026.3 · 30 vagas</p>
                </div>
                <a href="#" className="vds-pa-gdn-cta">Ver programa</a>
                <img src={monogramWhite} alt="" />
              </div>
            </article>
          ))}
        </div>

        <SpecBlock items={[
          { k: 'Headline', v: 'Adaptativa · short (≤25 chars) · long (≤90 chars)' },
          { k: 'Logo', v: 'monogram_white · sempre canto inferior direito' },
          { k: 'CTA', v: 'Button branco glass · "Ver programa" · "Cadastre-se"' },
          { k: 'Responsive', v: 'Mesma copy adaptada · prioridade pra short em sizes pequenos' },
          { k: 'Image safe area', v: '20% margin de cada lado · canvas central limpo' },
          { k: 'Animated', v: 'Opcional · fade entre 2 versões da headline máx 15s' },
        ]} />
      </div>
    </Section>
  );
}

/* ============================================================
   YOUTUBE PRE-ROLL · TrueView 15s skippable
   ============================================================ */
function YouTubePreRollSection() {
  return (
    <Section
      title="YouTube · pre-roll · TrueView skippable"
      meta="vídeo de 15s · 1920×1080 horizontal · estrutura de roteiro hook+valor+CTA"
    >
      <div className="vds-pa-stage">
        <article className="vds-pa-yt">
          <div className="vds-pa-yt-player">
            <div className="vds-pa-yt-canvas via-mesh-navy via-noise">
              <span className="vds-pa-aura" aria-hidden="true" />
              <div className="vds-pa-yt-text">
                <span className="vds-pa-yt-eyebrow">90s de transparência</span>
                <h2>
                  Construindo a Nina, <em>cometi 3 erros</em> que custaram caro.
                </h2>
              </div>
              <img src={monogramWhite} alt="" className="vds-pa-yt-mono" />
            </div>

            {/* Player overlay */}
            <div className="vds-pa-yt-overlay">
              <span className="vds-pa-yt-ad-tag">Anúncio</span>
              <button className="vds-pa-yt-skip">
                Pular anúncio em 5s
              </button>
            </div>

            <div className="vds-pa-yt-progress">
              <span style={{ width: '32%' }} />
            </div>
          </div>

          <div className="vds-pa-yt-companion">
            <strong>Viver de IA · viverdeia.ai</strong>
            <p>Pré-roll · 15s · pulável após 5s</p>
            <a href="#" className="vds-pa-yt-cta">Acessar programa</a>
          </div>
        </article>

        <div className="vds-pa-yt-script">
          <header>
            <span className="vds-pa-yt-script-eyebrow">estrutura de roteiro · 15s skippable</span>
            <h4>3 atos editoriais</h4>
          </header>
          <ol>
            <li>
              <span className="vds-pa-yt-script-timer">0–3s</span>
              <div>
                <strong>HOOK · não-skipável psicologicamente</strong>
                <p>Frase forte + visual provocador. "Construindo a Nina, cometi 3 erros que custaram caro." Quem skipa, skipa. Quem fica, fica engajado.</p>
              </div>
            </li>
            <li>
              <span className="vds-pa-yt-script-timer">3–13s</span>
              <div>
                <strong>VALOR · entrega o que prometeu</strong>
                <p>Lista os 3 erros (ou 1 deles em profundidade). Não vende ainda. Vibe editorial · operador-experiente.</p>
              </div>
            </li>
            <li>
              <span className="vds-pa-yt-script-timer">13–15s</span>
              <div>
                <strong>CTA · curto e visual</strong>
                <p>"Programa completo em viverdeia.ai. Turma 2026.3 abre 22 mai." Logo branco + URL legível.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   AUDIENCE MATRIX · persona × variant
   ============================================================ */
function AudienceMatrixSection() {
  const personas = [
    {
      icon: Briefcase,
      name: 'Founder · operador-fundador',
      pain: 'Tá fazendo tudo. Receita não escala porque tempo dele não escala.',
      kpi: 'Receita destravada',
      hook: 'Em 90 dias, você sai do "eu opero" pra "a Nina opera".',
      body: 'Operador-fundador que construiu o produto sozinho consegue manter por 1 ano. Depois disso, ou aparece IA, ou some.',
      cta: 'Ver casos de founders',
    },
    {
      icon: Wrench,
      name: 'Operador técnico',
      pain: 'Sabe que IA muda o jogo. Não sabe por onde começar sem ser cursinho de prompt.',
      kpi: 'Tempo poupado',
      hook: 'Pra quem já tentou prompt sozinho e travou no segundo agente.',
      body: 'Não é teoria. 4 meses construindo 1 agente em produção com mentoria 1:1 e código aberto da comunidade.',
      cta: 'Ver estrutura técnica',
    },
    {
      icon: Building2,
      name: 'Exec corporativo',
      pain: 'Board pediu IA. Time tá perdido. Risco de erro caro é alto.',
      kpi: 'Risco mitigado',
      hook: 'Antes de contratar consultoria de R$ 200K, formar 2 ops internos sai 8x mais barato.',
      body: 'Programa estruturado · framework aplicável · suporte do conselho consultivo. Casos de Mantra Tech e Pivot Studio.',
      cta: 'Falar com consultor',
    },
    {
      icon: TrendingUp,
      name: 'Investor / advisor',
      pain: 'Portfolio companies precisam acelerar IA. Não sabe quem indicar.',
      kpi: 'Múltiplo de portfolio',
      hook: 'Indica 1 founder do seu portfolio. A gente forma. Você acompanha o ROI.',
      body: 'Program parceiro pra fund managers · acompanhamento de progresso · 5 fundos já indicam.',
      cta: 'Parceria com fund',
    },
  ];

  return (
    <Section
      title="Audience matrix · 4 personas × ad própria"
      meta="mesma oferta · copy adaptada por persona · KPI primário muda por audiência"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-audience-grid">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.name} className="vds-pa-audience-card">
                <header>
                  <span className="vds-pa-audience-icon"><Icon size={18} strokeWidth={1.6} /></span>
                  <div>
                    <strong>{p.name}</strong>
                    <em>{p.pain}</em>
                  </div>
                </header>

                <div className="vds-pa-audience-kpi">
                  <span className="lbl">KPI primário</span>
                  <strong>{p.kpi}</strong>
                </div>

                <div className="vds-pa-audience-block">
                  <span className="vds-pa-audience-block-lbl">hook</span>
                  <p>"{p.hook}"</p>
                </div>

                <div className="vds-pa-audience-block">
                  <span className="vds-pa-audience-block-lbl">body</span>
                  <p>"{p.body}"</p>
                </div>

                <footer>
                  <span className="vds-pa-audience-cta-lbl">CTA</span>
                  <span className="vds-pa-audience-cta">{p.cta} →</span>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   A/B TEST VARIANTS · 3 versões lado a lado
   ============================================================ */
function ABVariantSection() {
  const variants = [
    {
      label: 'A · Hook editorial',
      what: 'frase provocadora · sem número',
      h: 'Em 2026, operador que não opera IA, não opera.',
      sub: '220 operadores · turma 2026.3',
      hyp: 'CTR maior em audience cold',
    },
    {
      label: 'B · Hook numérico',
      what: 'prova com número grande',
      h: 'R$ 1,8M destravado em 12 meses. 220 operadores.',
      sub: '90 dias até 1 agente em produção',
      hyp: 'CTR maior em warm/lookalike',
    },
    {
      label: 'C · Hook pessoal',
      what: 'primeira pessoa · cicatriz',
      h: 'Construindo a Nina, cometi 3 erros que custaram caro.',
      sub: 'cases reais · sem teoria',
      hyp: 'Engagement maior · CPC menor',
    },
  ];

  return (
    <Section
      title="A/B test · 3 variants da mesma oferta"
      meta="mesma audience · diferente hook · medir CTR + CPC + CPA por 7 dias"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-ab-row">
          {variants.map((v) => (
            <article key={v.label} className="vds-pa-ab-card">
              <header>
                <span className="vds-pa-ab-label">{v.label}</span>
                <em>{v.what}</em>
              </header>

              <div className="vds-pa-ab-mock via-mesh-navy via-noise">
                <span className="vds-pa-aura" aria-hidden="true" />
                <h3>{v.h}</h3>
                <p>{v.sub}</p>
                <img src={monogramWhite} alt="" />
              </div>

              <footer>
                <span className="vds-pa-ab-hyp-lbl">hipótese</span>
                <p>{v.hyp}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   PRE-FLIGHT CHECKLIST · brief antes de subir ad
   ============================================================ */
function PreflightSection() {
  const checklist = [
    {
      group: '01 · objetivo',
      items: [
        { q: 'Estágio do funil', a: 'cold · warm · hot · retargeting' },
        { q: 'Objetivo Meta/Google', a: 'awareness · traffic · engagement · leads · sales' },
        { q: 'KPI primário', a: 'CTR · CPC · CPL · CPA · ROAS' },
        { q: 'KPI guardrail', a: 'frequência <2.5 · CPC <R$3 · CTR >1.2%' },
      ],
    },
    {
      group: '02 · audience',
      items: [
        { q: 'Persona-alvo', a: 'founder · operador · exec · investor' },
        { q: 'Lookalike base', a: 'NPS 9+ · trial 7d · paying 90d+' },
        { q: 'Interest stacks', a: 'IA · automação · founders · ops' },
        { q: 'Exclude', a: 'já cliente · time interno · funcionários' },
      ],
    },
    {
      group: '03 · creative',
      items: [
        { q: 'Hook escolhido', a: 'da headline library categoria X' },
        { q: 'Body', a: '2 frases · hook + razão · ≤125 chars' },
        { q: 'CTA verbo', a: 'infinitivo · da CTA library · não "garanta já"' },
        { q: 'Formato', a: 'single · carousel · story · reel · video' },
      ],
    },
    {
      group: '04 · tracking',
      items: [
        { q: 'UTM source', a: 'meta · linkedin · google · youtube' },
        { q: 'UTM medium', a: 'paid · paid-social · paid-search · paid-video' },
        { q: 'UTM campaign', a: 'turma-2026-3 · evento-leaders-ai · curso-fund' },
        { q: 'Pixel/Tag', a: 'Meta Pixel · LinkedIn Insight · Google Ads · UA→GA4' },
      ],
    },
  ];

  return (
    <Section
      title="Pre-flight · checklist antes de subir o ad"
      meta="4 grupos · 16 perguntas · time preenche antes de criar a peça"
    >
      <div className="vds-pa-stage">
        <article className="vds-pa-preflight">
          <header>
            <span className="vds-pa-preflight-eyebrow">brief editorial obrigatório</span>
            <h4>Antes de subir qualquer ad, time responde 16 perguntas</h4>
          </header>

          <div className="vds-pa-preflight-grid">
            {checklist.map((g) => (
              <article key={g.group} className="vds-pa-preflight-group">
                <strong className="vds-pa-preflight-group-title">{g.group}</strong>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.q}>
                      <span className="q">{it.q}</span>
                      <span className="a">{it.a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <footer className="vds-pa-preflight-rule">
            <Target size={14} strokeWidth={2} />
            <strong>Kill-switch:</strong> se KPI primário não bate threshold em 72h, pausa.
            Não reaquece com mais budget esperando "começar a render".
          </footer>
        </article>
      </div>
    </Section>
  );
}

/* ============================================================
   HEADLINE LIBRARY · 4 categorias com bom/ruim
   ============================================================ */
function HeadlineLibrarySection() {
  const lib = [
    {
      cat: 'Provocação editorial',
      good: ['Em 2026, operador que não opera IA, não opera.', 'IA não te aposenta. Operador que não usa IA aposenta.'],
      bad: ['🚀 OPORTUNIDADE ÚNICA EM IA!', 'Aprenda IA do ZERO em 7 dias!!!'],
    },
    {
      cat: 'Prova com número',
      good: ['220 operadores. R$ 1,8M destravado. 90 dias.', '11.920 conversas/mês rodando. Eu te ensino como.'],
      bad: ['Centenas de profissionais já transformaram suas carreiras!', 'Milhões em resultados comprovados!'],
    },
    {
      cat: 'Convite direto',
      good: ['Turma 2026.3 · 30 vagas · 4 meses', 'Próxima turma é em outubro. Ou agora.'],
      bad: ['ÚLTIMAS HORAS para garantir sua vaga!!!', 'Não perca essa oportunidade ÚNICA!'],
    },
    {
      cat: 'Identificação',
      good: ['Pra fundador que já tentou prompt sozinho e travou.', 'Operador que precisa fazer IA gerar resultado essa semana.'],
      bad: ['Para você que sonha em dominar a IA do futuro!', 'Você merece transformar sua vida com IA!'],
    },
  ];

  return (
    <Section
      title="Headline library · 4 categorias · 16 exemplos"
      meta="cada categoria com 2 boas + 2 ruins · use como ponto de partida"
    >
      <div className="vds-pa-stage">
        <CompareLibrary items={lib} />
      </div>
    </Section>
  );
}

/* ============================================================
   BODY COPY LIBRARY · primary text expandido
   ============================================================ */
function BodyLibrarySection() {
  const lib = [
    {
      cat: 'Abertura · primeira linha',
      good: [
        '220 operadores formados. Próxima turma fecha em 9 dias.',
        'Operador que construiu 1 agente em produção fala diferente.',
      ],
      bad: [
        '✨ Você está pronto para a revolução da IA? ✨',
        'OPORTUNIDADE IMPERDÍVEL para quem quer mudar de vida!',
      ],
    },
    {
      cat: 'Desenvolvimento · 2ª linha',
      good: [
        'Programa técnico-operativo de 4 meses · mentoria 1:1 · comunidade ativa.',
        'Você sai com 1 agente rodando em produção. Não com um diploma.',
      ],
      bad: [
        'Aulas exclusivas, conteúdo PREMIUM, bônus EXCLUSIVOS, suporte VIP!',
        'Tudo que você precisa para transformar sua carreira e dominar a IA!',
      ],
    },
    {
      cat: 'Convite editorial',
      good: [
        'Turma 2026.3 abre 22 mai. 30 vagas. Aplicação até 9 jun.',
        'Próximo ciclo é outubro. Esse fecha em 9 dias.',
      ],
      bad: [
        'CORRA! Vagas LIMITADAS para essa oportunidade única!',
        'Não fique de fora! Garante AGORA antes que esgote!',
      ],
    },
  ];

  return (
    <Section
      title="Body copy library · primary text editorial"
      meta="3 movimentos canônicos · abertura + desenvolvimento + convite"
    >
      <div className="vds-pa-stage">
        <CompareLibrary items={lib} />
      </div>
    </Section>
  );
}

/* ============================================================
   CTA LIBRARY · verbos por objetivo
   ============================================================ */
function CTALibrarySection() {
  const groups = [
    {
      stage: 'Awareness',
      desc: 'descoberta · primeiro contato',
      good: ['Saiba mais', 'Conheça o programa', 'Veja como funciona', 'Leia o artigo'],
      bad: ['CLIQUE AGORA', 'Garanta JÁ!'],
    },
    {
      stage: 'Consideration',
      desc: 'comparação · educação',
      good: ['Compare os planos', 'Veja casos reais', 'Aprofunde no método', 'Baixe o playbook'],
      bad: ['Não perca essa chance!', 'OFERTA RELÂMPAGO'],
    },
    {
      stage: 'Conversion',
      desc: 'inscrição · compra',
      good: ['Cadastre-se', 'Aplique-se à turma', 'Reserve seu lugar', 'Começar agora'],
      bad: ['GARANTA JÁ COM 80% OFF', 'ÚLTIMAS HORAS'],
    },
    {
      stage: 'Retention',
      desc: 'reativação · cross-sell',
      good: ['Voltar ao programa', 'Renovar acesso', 'Ver novidades', 'Próximo passo'],
      bad: ['NÃO PERCA SEU LUGAR!!!', 'Vamos te esperar até quando??'],
    },
  ];

  return (
    <Section
      title="CTA library · verbos por estágio de funil"
      meta="awareness · consideration · conversion · retention · cada um com vocabulário próprio"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-cta-lib">
          {groups.map((g) => (
            <article key={g.stage} className="vds-pa-cta-group">
              <header>
                <strong>{g.stage}</strong>
                <em>{g.desc}</em>
              </header>

              <div className="vds-pa-cta-good">
                <span className="lbl"><Check size={11} strokeWidth={2.6} /> tom certo</span>
                <ul>
                  {g.good.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>

              <div className="vds-pa-cta-bad">
                <span className="lbl"><X size={11} strokeWidth={2.6} /> banidos</span>
                <ul>
                  {g.bad.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   HELPERS
   ============================================================ */
function SpecBlock({ items }: { items: { k: string; v: string }[] }) {
  return (
    <article className="vds-pa-spec">
      <span className="vds-pa-spec-eyebrow">specs canônicas</span>
      <dl>
        {items.map((it) => (
          <div key={it.k}>
            <dt>{it.k}</dt>
            <dd>{it.v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function CompareLibrary({ items }: { items: { cat: string; good: string[]; bad: string[] }[] }) {
  return (
    <div className="vds-pa-headlines">
      {items.map((c) => (
        <article key={c.cat}>
          <h4>{c.cat}</h4>
          <div className="vds-pa-headlines-pair">
            <div className="good">
              <span className="lbl"><Check size={11} strokeWidth={2.6} /> tom certo</span>
              {c.good.map((h, i) => <p key={i}>“{h}”</p>)}
            </div>
            <div className="bad">
              <span className="lbl"><X size={11} strokeWidth={2.6} /> tom errado</span>
              {c.bad.map((h, i) => <p key={i}>“{h}”</p>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Globe() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M1 6h10M6 1c1.5 1.5 2.5 3 2.5 5s-1 3.5-2.5 5c-1.5-1.5-2.5-3-2.5-5s1-3.5 2.5-5z" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}
