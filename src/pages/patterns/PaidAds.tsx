import {
  ArrowRight, MoreHorizontal, Check, X, Play, Search,
  Briefcase, Wrench, Building2, TrendingUp, Target,
  ThumbsUp, MessageCircle, Share2,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import monogramNavy from '../../assets/logos/VIA_monogram_hq.png';
import appIcon from '../../assets/logos/VIA_app_icon_128.png';
import './paid-ads.css';

/* ============================================================
   Paid ads · Meta + LinkedIn + Google Search + Display + YouTube
   ============================================================ */

export default function PaidAds() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · anúncios pagos"
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
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={1.75} /></button>
          </header>

          <div className="vds-pa-meta-text">
            <p><strong>Em 2026, operador que não opera IA, não opera.</strong></p>
            <p>521 cases reais de implementação de IA · 157 soluções prontas.</p>
          </div>

          <div className="vds-pa-meta-canvas vds-pa-light">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-meta-eyebrow">plano pro · 10 check-ins de mentoria/mês</span>
            <h2>
              90 dias. <em>Receita sobe ou custo cai</em>.
            </h2>
            <p>ou 100% do investimento de volta</p>
            <img src={monogramNavy} alt="" className="vds-pa-meta-mono" />
          </div>

          <footer className="vds-pa-meta-footer">
            <div>
              <em className="vds-pa-meta-domain">VIVERDEIA.AI</em>
              <strong>Ver planos</strong>
              <em>Plataforma de implementação de IA</em>
            </div>
            <a href="#" className="vds-pa-meta-cta">Saiba mais</a>
          </footer>

          <div className="vds-pa-meta-actions">
            <span><ThumbsUp size={16} strokeWidth={1.75} /> Curtir</span>
            <span><MessageCircle size={16} strokeWidth={1.75} /> Comentar</span>
            <span><Share2 size={16} strokeWidth={1.75} /> Compartilhar</span>
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Headline', v: 'Frase única · ≤40 chars · afirmação não pergunta' },
          { k: 'Primary text', v: 'Hook + razão · até 125 chars antes do “Ver mais”' },
          { k: 'Image', v: '1080×1080 (1:1) · navy editorial · zero foto literal' },
          { k: 'CTA button', v: '“Saiba mais” · “Cadastre-se” · “Ver agora” · NÃO “Garanta já”' },
          { k: 'Link description', v: 'Sub-headline · clarifica a oferta em 1 linha' },
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
    { n: 1, h: '521', sub: 'cases reais de implementação de IA', type: 'hook' },
    { n: 2, h: '157', sub: 'soluções de IA prontas pra usar', type: 'context' },
    { n: 3, h: '29', sub: 'setores já transformados com IA', type: 'context' },
    { n: 4, h: 'R$\u00A0120 mil', sub: 'economia anual · case Trivia Studio', type: 'result' },
    { n: 5, h: 'Ver planos', sub: 'Starter · Pro · Enterprise', type: 'cta' },
  ];

  return (
    <Section
      title="Meta · carousel · 5 cards"
      meta="primeiro card = hook · meio = contexto + prova · último = CTA"
    >
      <div className="vds-pa-stage">
        <div className="vds-pa-carousel-row">
          {cards.map((c) => (
            <article key={c.n} className={`vds-pa-carousel-card ${c.type}${c.type === 'cta' ? '' : ' vds-pa-light'}`}>
              <span className="vds-pa-aura" aria-hidden="true" />
              <span className="vds-pa-carousel-num">{c.n}/5</span>
              <div>
                <h3>{c.h}</h3>
                <p>{c.sub}</p>
              </div>
              {(c.n === 1 || c.n === 5) && <img src={c.type === 'cta' ? monogramWhite : monogramNavy} alt="" />}
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
        <article className="vds-pa-story vds-pa-light">
          <div className="vds-pa-story-progress">
            <span style={{ width: '45%' }} />
          </div>
          <header>
            <span className="av"><img src={appIcon} alt="" /></span>
            <strong>viverdeia.ai</strong>
            <em>Patrocinado</em>
          </header>
          <div className="vds-pa-story-canvas">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-story-eyebrow">plano pro</span>
            <h2>
              90 dias.<br />
              Receita sobe ou custo cai.<br />
              <em>ou 100% de volta</em>.
            </h2>
            <a href="#" className="vds-pa-story-cta">
              <span>Saiba mais</span>
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>
            <img src={monogramNavy} alt="" className="vds-pa-story-mono" />
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Tamanho', v: '1080×1920 (9:16)' },
          { k: 'Safe area top', v: '250px reservada · username + progress' },
          { k: 'Safe area bottom', v: '250px reservada · CTA sticker + reply' },
          { k: 'Conteúdo central', v: '~1420px usável · headline + sub + CTA' },
          { k: 'CTA sticker', v: 'Posicionado no terço inferior · botão pill 999' },
          { k: 'Logo', v: 'monogram_white inferior centralizado 24px' },
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
          <div className="vds-pa-reel-canvas vds-pa-light">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-reel-eyebrow">3 erros comuns</span>
            <h2>
              Implantando IA,<br />
              <em>evite 3 erros</em>.
            </h2>
            <p>todos custaram caro · vídeo de 90s</p>
            <img src={monogramNavy} alt="" className="vds-pa-reel-mono" />
            <span className="vds-pa-reel-play"><Play size={20} strokeWidth={0} style={{ fill: 'currentColor' }} /></span>
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
                <em>[N] seguidores</em>
                <span className="vds-pa-li-promoted">Promoted</span>
              </div>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={1.75} /></button>
          </header>

          <div className="vds-pa-li-text">
            <p>
              Empresários e líderes que colocaram IA na operação compartilham aqui o que mudou em 90 dias.
            </p>
            <p>
              <strong>Plano Pro</strong> · 10 check-ins de mentoria por mês. <a href="#">Ver planos →</a>
            </p>
          </div>

          <div className="vds-pa-li-canvas vds-pa-light">
            <span className="vds-pa-aura" aria-hidden="true" />
            <span className="vds-pa-li-eyebrow">plataforma de implementação</span>
            <h2>
              157 soluções de IA <em>prontas pra usar</em>.
            </h2>
            <p>formações · mentoria em grupo · comunidade de líderes</p>
            <img src={monogramNavy} alt="" className="vds-pa-li-mono" />
          </div>

          <footer className="vds-pa-li-footer">
            <div>
              <em>viverdeia.ai</em>
              <strong>Ver planos</strong>
            </div>
            <a href="#" className="vds-pa-li-cta">
              Saiba mais
            </a>
          </footer>

          <div className="vds-pa-li-actions">
            <span><ThumbsUp size={16} strokeWidth={1.75} /> Recomendar</span>
            <span><MessageCircle size={16} strokeWidth={1.75} /> Comentar</span>
            <span><Share2 size={16} strokeWidth={1.75} /> Republicar</span>
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Dimensões', v: '1200×627 (1.91:1) · arquivo PNG/JPG' },
          { k: 'Intro text', v: '≤150 chars antes do “see more” · tom B2B sóbrio' },
          { k: 'Headline', v: '≤70 chars · clareza > criatividade · evita superlativos' },
          { k: 'CTA options', v: '“Aplique-se” · “Saiba mais” · “Inscreva-se” · “Baixe agora”' },
          { k: 'Persona-alvo', v: 'Fundador · CTO · Head de IA · Líder de operações' },
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
            <article key={c.n} className={`vds-pa-li-card vds-pa-light ${c.type}`}>
              <span className="vds-pa-aura" aria-hidden="true" />
              <span className="vds-pa-li-card-num">{c.n} / {cards.length}</span>
              <h3>{c.h}</h3>
              {c.n === 1 && <img src={monogramNavy} alt="" className="vds-pa-li-card-mono" />}
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
            <Search size={16} strokeWidth={1.75} />
            <span>soluções de ia para empresas</span>
          </div>

          <div className="vds-pa-gs-result">
            <header>
              <span className="vds-pa-gs-sponsored">Patrocinado</span>
              <div className="vds-pa-gs-url">
                <span className="vds-pa-gs-favicon"><img src={appIcon} alt="" /></span>
                <em>https://viverdeia.ai</em>
                <em>› planos</em>
              </div>
            </header>

            <h3 className="vds-pa-gs-headline">
              IA na Operação da Sua Empresa · Viver de IA
            </h3>

            <p className="vds-pa-gs-desc">
              Plataforma B2B com 157 soluções de IA prontas e 521 cases reais. Planos a partir de R$&nbsp;2.580/mês, em contratação anual.
            </p>

            <ul className="vds-pa-gs-sitelinks">
              <li><strong>Ver planos</strong><em>Starter · Pro · Enterprise</em></li>
              <li><strong>Cases reais</strong><em>521 cases em 29 setores</em></li>
              <li><strong>Mentoria</strong><em>10 check-ins/mês no Pro</em></li>
              <li><strong>Garantia</strong><em>90 dias · cláusula 7</em></li>
            </ul>

            <div className="vds-pa-gs-callouts">
              <span>Garantia de 90 dias</span>
              <span>·</span>
              <span>157 soluções</span>
              <span>·</span>
              <span>Consultor IA</span>
              <span>·</span>
              <span>Mentoria em grupo</span>
            </div>
          </div>
        </article>

        <SpecBlock items={[
          { k: 'Headlines', v: '3 obrigatórias · ≤30 chars cada · Title Case · sem caps lock' },
          { k: 'Descriptions', v: '2 obrigatórias · ≤90 chars · frases completas · ponto final' },
          { k: 'Display URL', v: 'Path 1 + Path 2 · ≤15 chars cada · ex: “planos/pro”' },
          { k: 'Sitelinks', v: '4-6 extras · cada com headline 25 chars + 2 descriptions 35 chars' },
          { k: 'Callouts', v: '4-6 frases curtas · ≤25 chars · prova/benefícios não-vendíveis' },
          { k: 'Structured snippets', v: 'Lista de categorias · ex: “Módulos: Fundamentos · Prompt · Agentes”' },
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
              <div className={`vds-pa-gdn-banner ${s.class} vds-pa-light`}>
                <span className="vds-pa-aura" aria-hidden="true" />
                <div className="vds-pa-gdn-text">
                  <h3>
                    <em>90 dias</em>.<br />
                    Receita sobe ou custo cai.
                  </h3>
                  <p>ou 100% do investimento</p>
                </div>
                <a href="#" className="vds-pa-gdn-cta">Ver planos</a>
                <img src={monogramNavy} alt="" />
              </div>
            </article>
          ))}
        </div>

        <SpecBlock items={[
          { k: 'Headline', v: 'Adaptativa · short (≤25 chars) · long (≤90 chars)' },
          { k: 'Logo', v: 'monogram_white canto inferior direito · sai no 320×100' },
          { k: 'CTA', v: 'Button branco sólido · “Ver planos” · “Cadastre-se”' },
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
            <div className="vds-pa-yt-canvas vds-pa-light">
              <span className="vds-pa-aura" aria-hidden="true" />
              <div className="vds-pa-yt-text">
                <span className="vds-pa-yt-eyebrow">90s de transparência</span>
                <h2>
                  Implantando IA na empresa, <em>3 erros</em> custam caro.
                </h2>
              </div>
              <img src={monogramNavy} alt="" className="vds-pa-yt-mono" />
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
            <a href="#" className="vds-pa-yt-cta">Ver planos</a>
          </div>
        </article>

        <div className="vds-pa-yt-script">
          {/* h4 visual, nível 3 pro leitor de tela: vem logo abaixo do h2 da seção */}
          <header>
            <span className="vds-pa-yt-script-eyebrow">estrutura de roteiro · 15s skippable</span>
            <h4 aria-level={3}>3 atos editoriais</h4>
          </header>
          <ol>
            <li>
              <span className="vds-pa-yt-script-timer">0–3s</span>
              <div>
                <strong>HOOK · não-skipável psicologicamente</strong>
                <p>Frase forte + visual provocador. “Implantando IA na empresa, 3 erros custam caro.” Quem skipa, skipa. Quem fica, fica engajado.</p>
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
                <p>“Planos e cases em viverdeia.ai. São 521 cases reais.” Logo branco + URL legível.</p>
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
      name: 'Fundador · opera tudo sozinho',
      pain: 'Tá fazendo tudo. Receita não escala porque tempo dele não escala.',
      kpi: 'Receita destravada',
      hook: 'Você sai do “eu opero” pra “a IA opera”.',
      body: 'Operador-fundador que construiu o produto sozinho consegue manter por 1 ano. Depois disso, ou aparece IA, ou some.',
      cta: 'Ver cases reais',
    },
    {
      icon: Wrench,
      name: 'Operador técnico',
      pain: 'Sabe que IA muda o jogo. Não sabe por onde começar sem ser cursinho de prompt.',
      kpi: 'Tempo poupado',
      hook: 'Pra quem já tentou prompt sozinho e travou no segundo agente.',
      body: 'Não é teoria. Soluções prontas, formações práticas e mentoria em grupo ao vivo pra colocar IA na operação.',
      cta: 'Ver estrutura técnica',
    },
    {
      icon: Building2,
      name: 'Exec corporativo',
      pain: 'Board pediu IA. Time tá perdido. Risco de erro caro é alto.',
      kpi: 'Risco mitigado',
      hook: 'Antes de contratar consultoria, veja 521 cases reais de implementação de IA.',
      body: 'Plataforma B2B · trilha de onboarding · arquiteto de soluções AI Builder no Enterprise. Cases em 29 setores.',
      cta: 'Falar com consultor',
    },
    {
      icon: TrendingUp,
      name: 'Investor / advisor',
      pain: 'Portfolio companies precisam acelerar IA. Não sabe quem indicar.',
      kpi: 'Múltiplo de portfolio',
      hook: 'Indica 1 empresa do seu portfolio. Você acompanha o ROI no dashboard.',
      body: 'O dashboard mostra quem está aplicando, o engajamento e o ROI gerado · sem planilha paralela.',
      cta: 'Indicar uma empresa',
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
                  <span className="vds-pa-audience-icon"><Icon size={16} strokeWidth={1.75} /></span>
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
                  <span className="vds-pa-audience-block-lbl">Hook</span>
                  <p>"{p.hook}"</p>
                </div>

                <div className="vds-pa-audience-block">
                  <span className="vds-pa-audience-block-lbl">Body</span>
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
      sub: '521 cases reais · plano Pro',
      hyp: 'CTR maior em audience cold',
    },
    {
      label: 'B · Hook numérico',
      what: 'prova com número grande',
      h: '521 cases reais. 157 soluções prontas.',
      sub: '29 setores · garantia de 90 dias',
      hyp: 'CTR maior em warm/lookalike',
    },
    {
      label: 'C · Hook de erro',
      what: 'cicatriz comum · sem número',
      h: 'Implantando IA na empresa, 3 erros custam caro.',
      sub: 'cases reais · sem teoria',
      hyp: 'Engagement maior · CPC menor',
    },
  ];

  return (
    <Section
      title="Teste A/B · 3 variações da mesma oferta"
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

              <div className="vds-pa-ab-mock vds-pa-light">
                <span className="vds-pa-aura" aria-hidden="true" />
                <h3>{v.h}</h3>
                <p>{v.sub}</p>
                <img src={monogramNavy} alt="" />
              </div>

              <footer>
                <span className="vds-pa-ab-hyp-lbl">Hipótese</span>
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
        { q: 'KPI guardrail', a: 'frequência <2,5 · CPC <R$\u00A03 · CTR >1,2%' },
      ],
    },
    {
      group: '02 · audience',
      items: [
        { q: 'Persona-alvo', a: 'fundador · operador · executivo · investidor' },
        { q: 'Lookalike base', a: 'NPS 9+ · trial 7d · paying 90d+' },
        { q: 'Interesses combinados', a: 'IA · automação · fundadores · operações' },
        { q: 'Exclude', a: 'já cliente · time interno · funcionários' },
      ],
    },
    {
      group: '03 · creative',
      items: [
        { q: 'Hook escolhido', a: 'da headline library categoria X' },
        { q: 'Body', a: '2 frases · hook + razão · ≤125 chars' },
        { q: 'CTA verbo', a: 'infinitivo · da CTA library · não “garanta já”' },
        { q: 'Formato', a: 'single · carousel · story · reel · video' },
      ],
    },
    {
      group: '04 · tracking',
      items: [
        { q: 'UTM source', a: 'meta · linkedin · google · youtube' },
        { q: 'UTM medium', a: 'paid · paid-social · paid-search · paid-video' },
        { q: 'UTM campaign', a: 'plano-pro · evento-leaders-ai · imersao-sede' },
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
            <h4 aria-level={3}>Antes de subir qualquer ad, time responde 16 perguntas</h4>
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
            <Target size={16} strokeWidth={1.75} />
            <strong>Kill-switch:</strong> se KPI primário não bate threshold em 72h, pausa.
            Não reaquece com mais budget esperando “começar a render”.
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
      good: ['521 cases reais. 157 soluções prontas. 29 setores.', 'Viva Nexo foi de 6h pra cliques. Veja o case.'],
      bad: ['Centenas de profissionais já transformaram suas carreiras!', 'Milhões em resultados comprovados!'],
    },
    {
      cat: 'Convite direto',
      good: ['Plano Pro · 10 check-ins de mentoria por mês', 'Starter, Pro ou Enterprise. Contratação anual.'],
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
        '521 cases reais de IA em empresas brasileiras.',
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
        'Soluções prontas · formações práticas · mentoria em grupo ao vivo.',
        'Seu time sai com solução rodando na operação. Não com um diploma.',
      ],
      bad: [
        'Aulas exclusivas, conteúdo PREMIUM, bônus EXCLUSIVOS, suporte VIP!',
        'Tudo que você precisa para transformar sua carreira e dominar a IA!',
      ],
    },
    {
      cat: 'Convite editorial',
      good: [
        'Plano Pro: R$\u00A03.780/mês, em contratação anual.',
        'Garantia de 90 dias. Condições na cláusula 7.',
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
      good: ['Saiba mais', 'Conheça a plataforma', 'Veja como funciona', 'Leia o artigo'],
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
      good: ['Cadastre-se', 'Assine o plano', 'Reserve seu lugar', 'Começar agora'],
      bad: ['GARANTA JÁ COM 80% OFF', 'ÚLTIMAS HORAS'],
    },
    {
      stage: 'Retention',
      desc: 'reativação · cross-sell',
      good: ['Voltar à plataforma', 'Renovar acesso', 'Ver novidades', 'Próximo passo'],
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
                <span className="lbl"><Check size={14} strokeWidth={1.75} /> Tom certo</span>
                <ul>
                  {g.good.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>

              <div className="vds-pa-cta-bad">
                <span className="lbl"><X size={14} strokeWidth={1.75} /> Banidos</span>
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
          <h4 aria-level={3}>{c.cat}</h4>
          <div className="vds-pa-headlines-pair">
            <div className="good">
              <span className="lbl"><Check size={14} strokeWidth={1.75} /> Tom certo</span>
              {c.good.map((h, i) => <p key={i}>“{h}”</p>)}
            </div>
            <div className="bad">
              <span className="lbl"><X size={14} strokeWidth={1.75} /> Tom errado</span>
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
