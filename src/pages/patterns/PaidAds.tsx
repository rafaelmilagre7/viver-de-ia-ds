import { ArrowRight, MoreHorizontal } from 'lucide-react';
// Note: monogramWhite + appIcon used; wordmark assets not needed in paid ads
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import appIcon from '../../assets/logos/VIA_app_icon.png';
import './paid-ads.css';

/* ============================================================
   Paid ads · Meta + Google Display · 12+ creatives editorial
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
        lede="Meta Ads (single, carousel, video, story, reels) + Google Display Network (6 sizes canônicos). Headlines comprimidas em 40 chars, body em 2 frases, CTA verbal infinitivo. Sem 'GARANTA JÁ!!!'. Sem emoji decorativo. Atmosfera navy editorial."
      />

      <MetaSingleSection />
      <MetaCarouselSection />
      <MetaStorySection />
      <MetaReelSection />
      <GoogleDisplaySection />
      <HeadlineLibrarySection />
    </>
  );
}

/* ---------- Meta · single image ad ---------- */
function MetaSingleSection() {
  return (
    <Section
      title="Meta · single image · 1080×1080"
      meta="ad real renderizado com chrome do Feed · 1 imagem + headline + body + CTA"
    >
      <article className="vds-pa-meta-ad">
        <header className="vds-pa-meta-hdr">
          <div className="vds-pa-meta-page">
            <img src={appIcon} alt="" />
            <div>
              <strong>Viver de IA</strong>
              <em>Patrocinado · <span className="dot">•</span> <Globe /></em>
            </div>
          </div>
          <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={2} /></button>
        </header>

        <div className="vds-pa-meta-text">
          <p>
            <strong>Em 2026, operador que não opera IA, não opera.</strong>
          </p>
          <p>
            220 operadores formados · próxima turma fecha em 9 dias.
          </p>
        </div>

        <div className="vds-pa-meta-canvas via-mesh-navy via-noise">
          <span className="vds-pa-meta-eyebrow">turma 2026.3 · 30 vagas · 4 meses</span>
          <h2>
            90 dias.<br />
            <em>1 agente em produção</em>.
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
      </article>

      <SpecBlock items={[
        { k: 'Headline', v: 'Frase única · ≤40 chars · afirmação não pergunta' },
        { k: 'Primary text', v: 'Hook + razão · até 125 chars antes do "Ver mais"' },
        { k: 'Image', v: '1080×1080 (1:1) · navy editorial · zero foto literal' },
        { k: 'CTA button', v: '"Saiba mais" · "Cadastre-se" · "Ver agora" · NÃO "Garanta já"' },
        { k: 'Link description', v: 'Sub-headline · clarifica o programa em 1 linha' },
      ]} />
    </Section>
  );
}

/* ---------- Meta · carousel ---------- */
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
      <div className="vds-pa-carousel-row">
        {cards.map((c) => (
          <article
            key={c.n}
            className={`vds-pa-carousel-card ${c.type}`}
          >
            <span className="vds-pa-carousel-num mono">{c.n}/5</span>
            <div>
              <h3>{c.h}</h3>
              <p>{c.sub}</p>
            </div>
            {(c.n === 1 || c.n === 5) && (
              <img src={monogramWhite} alt="" />
            )}
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
    </Section>
  );
}

/* ---------- Meta · story / reels ---------- */
function MetaStorySection() {
  return (
    <Section
      title="Meta · story · 1080×1920"
      meta="9:16 vertical · safe area top + bottom · CTA sticker"
    >
      <div className="vds-pa-story-row">
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

/* ---------- Meta · reel ad ---------- */
function MetaReelSection() {
  return (
    <Section
      title="Meta · reel ad · cover frame"
      meta="primeira frame do reel · texto curto · hook visual forte"
    >
      <article className="vds-pa-reel">
        <div className="vds-pa-reel-canvas via-mesh-navy via-noise">
          <span className="vds-pa-reel-eyebrow">3 cicatrizes</span>
          <h2>
            Construindo a Nina,<br />
            <em>cometi 3 erros</em>.
          </h2>
          <p>todos custaram caro · vídeo de 90s</p>
          <img src={monogramWhite} alt="" className="vds-pa-reel-mono" />
        </div>
        <aside>
          <strong>viverdeia.ai</strong>
          <em>Patrocinado</em>
          <p>cases reais · sem teoria · sem guru</p>
          <a href="#" className="vds-pa-reel-cta">Saiba mais</a>
        </aside>
      </article>
    </Section>
  );
}

/* ---------- Google Display ---------- */
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
      <div className="vds-pa-gdn-grid">
        {sizes.map((s) => (
          <article key={s.size}>
            <header>
              <strong>{s.name}</strong>
              <span className="mono">{s.size}</span>
              <em>{s.use}</em>
            </header>
            <div className={`vds-pa-gdn-banner ${s.class} via-mesh-navy via-noise`}>
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
        { k: 'CTA', v: 'Button navy · 11-13px · "Ver programa" · "Cadastre-se"' },
        { k: 'Responsive', v: 'Mesma copy adaptada · prioridade pra short em sizes pequenos' },
        { k: 'Image safe area', v: '20% margin de cada lado · canvas central limpo' },
        { k: 'Animated', v: 'Opcional · fade entre 2 versões da headline máx 15s' },
      ]} />
    </Section>
  );
}

/* ---------- Headline library ---------- */
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
      title="Library de headlines · 4 categorias · 16 exemplos"
      meta="cada categoria com 2 boas + 2 ruins · use como ponto de partida"
    >
      <div className="vds-pa-headlines">
        {lib.map((c) => (
          <article key={c.cat}>
            <h4>{c.cat}</h4>
            <div className="vds-pa-headlines-pair">
              <div className="good">
                <span className="lbl">Tom certo</span>
                {c.good.map((h, i) => <p key={i}>"{h}"</p>)}
              </div>
              <div className="bad">
                <span className="lbl">Tom errado</span>
                {c.bad.map((h, i) => <p key={i}>"{h}"</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Spec block helper ---------- */
function SpecBlock({ items }: { items: { k: string; v: string }[] }) {
  return (
    <article className="vds-pa-spec">
      <span className="vds-pa-spec-eyebrow">Specs canônicas</span>
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

function Globe() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M1 6h10M6 1c1.5 1.5 2.5 3 2.5 5s-1 3.5-2.5 5c-1.5-1.5-2.5-3-2.5-5s1-3.5 2.5-5z" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}
