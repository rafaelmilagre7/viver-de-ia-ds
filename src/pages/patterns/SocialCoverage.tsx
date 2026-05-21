import { useState } from 'react';
import {
  Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal,
  Globe, Play, ThumbsUp, Share2,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import monogram from '../../assets/logos/VIA_monogram_hq.png';
import wordmarkWhite from '../../assets/logos/VIVER_DE_IA_white.png';
import wordmarkBlack from '../../assets/logos/VIVER_DE_IA_black.png';
import appIcon from '../../assets/logos/VIA_app_icon.png';
import './social-coverage.css';

/* ============================================================
   Social coverage · 18+ templates por canal · todos com chrome authentic
   ============================================================ */

export default function SocialCoverage() {
  const [channel, setChannel] = useState<string>('instagram');

  const channels = [
    { id: 'instagram', label: 'Instagram', count: 4, sub: 'post · story · reel · highlight' },
    { id: 'linkedin', label: 'LinkedIn', count: 4, sub: 'pessoal · empresa · carousel · banner' },
    { id: 'youtube', label: 'YouTube', count: 3, sub: 'thumb · channel art · end card' },
    { id: 'x', label: 'X / Twitter', count: 3, sub: 'header · post · quote' },
    { id: 'tiktok', label: 'TikTok', count: 2, sub: 'cover · text overlay' },
    { id: 'podcast', label: 'Podcast', count: 2, sub: 'cover · episode card' },
  ];

  return (
    <>
      <DocsHeader
        eyebrow="Padrões · social coverage"
        title={
          <>
            18 templates de social <em>cobrindo todo canal</em>.
          </>
        }
        lede="Cada canal renderizado com chrome authentic do app (perfil, like, comment). Logo correta por contexto (app icon em profile, monogram white em post sobre navy). Voice editorial sem clichê de IA. Specs de tamanho oficiais por plataforma."
      />

      <nav className="vds-sc-nav">
        {channels.map((c) => (
          <button
            key={c.id}
            className={`vds-sc-nav-btn ${channel === c.id ? 'is-active' : ''}`}
            onClick={() => setChannel(c.id)}
          >
            <div>
              <strong>{c.label}</strong>
              <em>{c.sub}</em>
            </div>
            <span className="mono">{c.count}</span>
          </button>
        ))}
      </nav>

      {channel === 'instagram' && <InstagramSection />}
      {channel === 'linkedin' && <LinkedInSection />}
      {channel === 'youtube' && <YouTubeSection />}
      {channel === 'x' && <XSection />}
      {channel === 'tiktok' && <TikTokSection />}
      {channel === 'podcast' && <PodcastSection />}
    </>
  );
}

/* ---------- Instagram ---------- */
function InstagramSection() {
  return (
    <>
      <Section
        title="Instagram · feed post · 1080×1080"
        meta="atmosfera navy · 1 número grande · 1 atribuição"
      >
        <div className="vds-sc-ig-grid">
          <article className="vds-sc-ig-chrome">
            <header className="vds-sc-ig-hdr">
              <span className="vds-sc-ig-avatar">
                <img src={appIcon} alt="Viver de IA" />
              </span>
              <div className="vds-sc-ig-meta">
                <strong>viverdeia.ai</strong>
                <em>Promovido</em>
              </div>
              <button aria-label="Mais opções"><MoreHorizontal size={14} strokeWidth={2} /></button>
            </header>
            <div className="vds-sc-ig-canvas via-mesh-navy via-noise">
              <img src={monogramWhite} alt="" className="watermark" />
              <span className="vds-sc-ig-eyebrow">turma 2026.2 · 45 dias dentro</span>
              <h2>
                +<em>11.920</em>
                <br />
                conversas/mês.
              </h2>
              <p className="vds-sc-ig-caption">
                operação real · auditada · método codificado em 18 aulas
              </p>
            </div>
            <div className="vds-sc-ig-actions">
              <div className="vds-sc-ig-actions-l">
                <button aria-label="Curtir"><Heart size={20} strokeWidth={2} /></button>
                <button aria-label="Comentar"><MessageCircle size={20} strokeWidth={2} /></button>
                <button aria-label="Compartilhar"><Share2 size={18} strokeWidth={2} /></button>
              </div>
              <button aria-label="Salvar"><Bookmark size={20} strokeWidth={2} /></button>
            </div>
            <div className="vds-sc-ig-body">
              <p>
                <strong>viverdeia.ai</strong> sete meses observando a Nina rodar. anotei o que
                não tá em curso nenhum. próxima turma abre 22/mai · 30 vagas. link no perfil.
              </p>
              <span className="vds-sc-ig-time">há 4 horas · ver tradução</span>
            </div>
          </article>

          <SpecCard
            title="Specs do canvas"
            items={[
              { k: 'Tamanho', v: '1080 × 1080px (1:1)' },
              { k: 'Safe area', v: '60px de cada lado · evitar título no corte' },
              { k: 'Logo', v: 'monogram_white 40px canto inferior esquerdo' },
              { k: 'Headline', v: 'Geist Display · 56-72px · italic em número' },
              { k: 'Caption', v: '60% transparency · sem emoji decorativo' },
              { k: 'Cor', v: 'mesh-navy + noise · sem foto literal' },
            ]}
          />
        </div>
      </Section>

      <Section
        title="Instagram · story · 1080×1920"
        meta="9:16 vertical · safe zone interna · CTA stickers respeitam navbar"
      >
        <div className="vds-sc-ig-grid">
          <article className="vds-sc-story-chrome">
            <div className="vds-sc-story-progress">
              <span style={{ width: '40%' }} />
            </div>
            <header className="vds-sc-story-hdr">
              <span className="vds-sc-ig-avatar small">
                <img src={appIcon} alt="" />
              </span>
              <strong>viverdeia.ai</strong>
              <em>há 2h</em>
            </header>
            <div className="vds-sc-story-canvas via-mesh-navy via-noise">
              <span className="vds-sc-story-eyebrow">turma 2026.2</span>
              <h2>
                90 dias.<br />
                1 agente em <em>produção</em>.<br />
                ou seu dinheiro <em>de volta</em>.
              </h2>
              <div className="vds-sc-story-cta">
                <span>arrasta pra cima</span>
              </div>
              <img src={monogramWhite} alt="" className="vds-sc-story-mono" />
            </div>
          </article>

          <SpecCard
            title="Specs da story"
            items={[
              { k: 'Tamanho', v: '1080 × 1920px (9:16)' },
              { k: 'Safe top', v: '250px reservada · username + progress' },
              { k: 'Safe bottom', v: '250px reservada · reply + nav bar' },
              { k: 'Conteúdo central', v: '~1420px de altura usável' },
              { k: 'Logo', v: 'monogram_white centralizado fim · 40px' },
              { k: 'CTA', v: 'sticker "arrasta pra cima" só se for link real' },
            ]}
          />
        </div>
      </Section>

      <Section
        title="Instagram · reel cover · 1080×1920"
        meta="primeira frame congela · igual a story mas otimizada pra grid 1:1.91 do feed"
      >
        <div className="vds-sc-ig-grid">
          <article className="vds-sc-reel-chrome">
            <div className="vds-sc-reel-canvas via-mesh-navy via-noise">
              <span className="vds-sc-reel-eyebrow">3 cicatrizes</span>
              <h2>
                Construindo a Nina,
                <br />
                <em>cometi 3 erros</em>.
                <br />
                Todos custaram.
              </h2>
              <p className="vds-sc-reel-sub">
                vídeo de 90s · play pra ver os 3
              </p>
              <span className="vds-sc-reel-duration mono">1:32</span>
              <img src={monogramWhite} alt="" className="vds-sc-reel-mono" />
            </div>
          </article>

          <SpecCard
            title="Specs do reel cover"
            items={[
              { k: 'Tamanho cover', v: '1080 × 1920px · centro 1:1 visível no grid' },
              { k: 'Conteúdo central', v: 'topo + meio · evitar bottom 25%' },
              { k: 'Texto', v: 'até 4 linhas · headline + sub' },
              { k: 'Hook', v: 'primeira frame congela 3s · vale ouro' },
              { k: 'Duração badge', v: 'mono · canto superior direito' },
              { k: 'Logo', v: 'monogram_white inferior centro' },
            ]}
          />
        </div>
      </Section>

      <Section
        title="Instagram · highlight cover · 1080×1080"
        meta="ícone simples · 1 palavra · paleta navy"
      >
        <div className="vds-sc-highlight-grid">
          {[
            { label: 'método', n: '01' },
            { label: 'cases', n: '02' },
            { label: 'lives', n: '03' },
            { label: 'turma', n: '04' },
          ].map((h) => (
            <article key={h.label} className="vds-sc-highlight">
              <div className="vds-sc-highlight-circle via-mesh-navy via-noise">
                <span className="mono">{h.n}</span>
              </div>
              <em>{h.label}</em>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ---------- LinkedIn ---------- */
function LinkedInSection() {
  return (
    <>
      <Section
        title="LinkedIn pessoal · Caio Ribeiro"
        meta="post 1ª pessoa · gancho número grande · sem 5-dicas-infalíveis"
      >
        <article className="vds-sc-li-post">
          <header className="vds-sc-li-hdr">
            <div className="vds-sc-li-avatar">CR</div>
            <div>
              <strong>Caio Ribeiro</strong>
              <em>Fundador · Viver de IA · construindo Nina</em>
              <span>2h · <Globe size={11} strokeWidth={2} /></span>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={2} /></button>
          </header>

          <div className="vds-sc-li-body">
            <p>
              7 meses atrás a Nina perdia 40% das conversas no primeiro turno.
            </p>
            <p>
              essa semana ela passou de 96%.
            </p>
            <p>
              o segredo não foi prompt. foi observar o que cada falha tinha em comum durante 3
              dias. anotei aqui o que mudei — vou postar no link nos comentários.
            </p>
            <p>
              <em>2 mudanças. 18% de conversão a mais.</em>
            </p>
          </div>

          <div className="vds-sc-li-canvas via-mesh-navy via-noise">
            <span className="vds-sc-li-eyebrow">case · Nina · semana 18</span>
            <h2>
              28s → <em>4s</em>
            </h2>
            <p>latência do primeiro turno · medido contra mesma cohort</p>
            <img src={monogramWhite} alt="" />
          </div>

          <div className="vds-sc-li-actions">
            <div className="vds-sc-li-actions-stats">
              <span className="vds-sc-li-react">
                <ThumbsUp size={11} strokeWidth={2.4} fill="currentColor" />
              </span>
              <em>422 · 38 comentários · 12 compartilhamentos</em>
            </div>
            <div className="vds-sc-li-actions-btns">
              <button><ThumbsUp size={14} strokeWidth={2} /> Curtir</button>
              <button><MessageCircle size={14} strokeWidth={2} /> Comentar</button>
              <button><Repeat2 size={14} strokeWidth={2} /> Republicar</button>
              <button><Share2 size={14} strokeWidth={2} /> Enviar</button>
            </div>
          </div>
        </article>
      </Section>

      <Section
        title="LinkedIn empresa · página Viver de IA"
        meta="tom institucional · número como protagonista · sem 1ª pessoa"
      >
        <article className="vds-sc-li-post">
          <header className="vds-sc-li-hdr">
            <div className="vds-sc-li-avatar company">
              <img src={appIcon} alt="" />
            </div>
            <div>
              <strong>Viver de IA</strong>
              <em>Formação técnico-operativa em IA · 2.847 seguidores</em>
              <span>3h · <Globe size={11} strokeWidth={2} /></span>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={2} /></button>
          </header>

          <div className="vds-sc-li-body">
            <p>
              <strong>220 operadores formados em 2 anos.</strong>
            </p>
            <p>
              em vez de ensinar &ldquo;prompt engineering&rdquo;, a gente forma operadores que constroem,
              mantém e medem agentes em produção. cada turma tem 25 pessoas, 4 meses, mentoria
              1:1 mensal.
            </p>
            <p>
              próxima turma abre em maio · veja como funciona o método.
            </p>
          </div>

          <div className="vds-sc-li-canvas-light">
            <img src={wordmarkBlack} alt="Viver de IA" className="word" />
            <div className="vds-sc-li-stats-grid">
              <div>
                <strong className="mono">220</strong>
                <em>operadores formados</em>
              </div>
              <div>
                <strong className="mono">R$ 1,8M</strong>
                <em>destravado em 12 meses</em>
              </div>
              <div>
                <strong className="mono">90 dias</strong>
                <em>até agente em produção</em>
              </div>
            </div>
          </div>
        </article>
      </Section>

      <Section
        title="LinkedIn · carousel · 10 cards (1080×1350 portrait)"
        meta="card 1 = hook · cards 2-9 = desenvolvimento · card 10 = CTA"
      >
        <div className="vds-sc-carousel">
          {[
            {
              n: 1,
              type: 'hook',
              h: '+18%',
              sub: 'conversão',
              meta: 'em 7 dias mudando 2 coisas',
            },
            { n: 2, type: 'context', h: 'O problema', sub: '40% das conversas perdidas no 1º turno' },
            { n: 3, type: 'context', h: 'A hipótese errada', sub: 'eu achava que era prompt' },
            { n: 4, type: 'reveal', h: 'O que era de verdade', sub: 'latência + tom consultivo demais' },
            { n: 5, type: 'fix', h: 'Mudança 1', sub: 'cache de contexto · 28s → 4s' },
            { n: 6, type: 'fix', h: 'Mudança 2', sub: 'turno 1 vira "leitor de intent"' },
            { n: 7, type: 'result', h: '11k → 13k', sub: '2k conversas a mais em 7 dias' },
            { n: 8, type: 'learn', h: 'O que vale anotar', sub: 'meça a latência percebida do 1º turno' },
            { n: 9, type: 'learn', h: 'Segundo aprendizado', sub: 'agente consultivo perde lead com intent claro' },
            {
              n: 10,
              type: 'cta',
              h: 'Vou ensinar isso',
              sub: 'turma 2026.3 abre 22/mai',
              meta: 'link no perfil',
            },
          ].map((card) => (
            <article
              key={card.n}
              className={`vds-sc-carousel-card ${card.type}`}
            >
              <span className="vds-sc-carousel-num mono">
                {card.n}/10
              </span>
              <div className="vds-sc-carousel-body">
                <h3>
                  {card.type === 'hook' || card.type === 'result' ? (
                    <em>{card.h}</em>
                  ) : (
                    card.h
                  )}
                </h3>
                <p>{card.sub}</p>
                {card.meta && <em className="meta">{card.meta}</em>}
              </div>
              {(card.n === 1 || card.n === 10) && (
                <img src={monogramWhite} alt="" className="vds-sc-carousel-mono" />
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="LinkedIn · page banner · 1128×191"
        meta="wordmark + tagline · 1 número como prova social"
      >
        <article className="vds-sc-li-banner via-mesh-navy via-noise">
          <img src={wordmarkWhite} alt="Viver de IA" className="word" />
          <span className="tag">operadores formando operadores · 220 alunos em 24 meses</span>
        </article>
      </Section>
    </>
  );
}

/* ---------- YouTube ---------- */
function YouTubeSection() {
  return (
    <>
      <Section
        title="YouTube · thumbnail · 1280×720"
        meta="texto grande · alto contraste · evitar foto do rosto óbvia"
      >
        <div className="vds-sc-yt-grid">
          <article className="vds-sc-yt-thumb via-mesh-navy via-noise">
            <span className="vds-sc-yt-eyebrow">live · ep 18</span>
            <h2>
              Auditando <em>3 prompts</em>
              <br />
              <em>ao vivo</em>.
            </h2>
            <p>turma 2026.2 · cases reais</p>
            <img src={monogramWhite} alt="" />
            <span className="vds-sc-yt-duration mono">1h 24m</span>
          </article>

          <SpecCard
            title="Specs do thumbnail"
            items={[
              { k: 'Tamanho', v: '1280 × 720px (16:9) · até 2MB' },
              { k: 'Texto', v: 'até 4 linhas · Geist Display 80-120px' },
              { k: 'Contraste', v: 'navy + white · evitar cinza médio que some' },
              { k: 'Safe area', v: 'evitar canto inferior direito (duração)' },
              { k: 'Sem foto literal', v: 'usa atmosphere · não rosto cortado' },
              { k: 'Duração', v: 'badge mono canto inferior direito' },
            ]}
          />
        </div>
      </Section>

      <Section
        title="YouTube · channel art · 2560×1440"
        meta="wordmark + tagline · safe area central pra TV/mobile"
      >
        <article className="vds-sc-yt-banner via-mesh-navy via-noise">
          <div className="vds-sc-yt-banner-safe">
            <img src={wordmarkWhite} alt="Viver de IA" />
            <h3>Operadores formando operadores.</h3>
            <p>220 alunos · 90 dias até agente em produção · método codificado em vídeo</p>
          </div>
          <div className="vds-sc-yt-banner-tv-line">Safe area TV (1546×423)</div>
          <div className="vds-sc-yt-banner-mobile-line">Safe area mobile (1546×423)</div>
        </article>
      </Section>

      <Section
        title="YouTube · end card · 1280×720"
        meta="2 vídeos sugeridos + 1 CTA inscreva-se · navy plain"
      >
        <article className="vds-sc-yt-end via-mesh-navy via-noise">
          <h3>
            Vai pra próxima.<br />
            <em>Mesma operação real.</em>
          </h3>
          <div className="vds-sc-yt-end-grid">
            <article>
              <div className="thumb"></div>
              <strong>Como construí a Nina em 7 meses</strong>
              <em>Caio Ribeiro · 18min</em>
            </article>
            <article>
              <div className="thumb"></div>
              <strong>3 cicatrizes em produção</strong>
              <em>Caio Ribeiro · 22min</em>
            </article>
            <article className="cta">
              <strong>Inscreva-se</strong>
              <em>novo vídeo toda terça</em>
            </article>
          </div>
        </article>
      </Section>
    </>
  );
}

/* ---------- X / Twitter ---------- */
function XSection() {
  return (
    <>
      <Section
        title="X / Twitter · header · 1500×500"
        meta="wordmark + 1 linha de copy · paleta navy"
      >
        <article className="vds-sc-x-header via-mesh-navy via-noise">
          <img src={wordmarkWhite} alt="" />
          <span>operadores formando operadores · viverdeia.ai</span>
        </article>
      </Section>

      <Section
        title="X · post simples · 280 chars"
        meta="frase curta + número · sem emoji · sem thread compulsiva"
      >
        <article className="vds-sc-x-post">
          <header>
            <div className="vds-sc-x-avatar">
              <img src={appIcon} alt="" />
            </div>
            <div>
              <strong>Viver de IA</strong>
              <em>@viverdeia.ai · 14h</em>
            </div>
          </header>
          <p>
            7 meses observando a Nina rodar. 11.920 conversas/mês ensinam algo que nenhuma aula
            ensina: agente em produção exige mais cicatriz que prompt bom.
          </p>
          <footer>
            <span><MessageCircle size={14} strokeWidth={1.6} /> 42</span>
            <span><Repeat2 size={14} strokeWidth={1.6} /> 187</span>
            <span><Heart size={14} strokeWidth={1.6} /> 941</span>
            <span><Bookmark size={14} strokeWidth={1.6} /> 122</span>
          </footer>
        </article>
      </Section>

      <Section
        title="X · quote tweet com card · post + canvas"
        meta="quote ancora · canvas reforça com 1 número"
      >
        <article className="vds-sc-x-post">
          <header>
            <div className="vds-sc-x-avatar">CR</div>
            <div>
              <strong>Caio Ribeiro</strong>
              <em>@caioribeiro · 2h</em>
            </div>
          </header>
          <p>
            depois desses 7 meses, anotei o que de fato move o ponteiro em agente em produção.
            <strong> spoiler: não é o prompt.</strong>
          </p>
          <div className="vds-sc-x-card via-mesh-navy via-noise">
            <span className="vds-sc-x-card-eyebrow">case · Nina</span>
            <h3>
              <em>+18%</em> conversão · 2 mudanças
            </h3>
            <p>latência + tom no turno 1 · 28s → 4s · consultivo → leitor de intent</p>
            <img src={monogramWhite} alt="" />
          </div>
          <footer>
            <span><MessageCircle size={14} strokeWidth={1.6} /> 28</span>
            <span><Repeat2 size={14} strokeWidth={1.6} /> 94</span>
            <span><Heart size={14} strokeWidth={1.6} /> 412</span>
            <span><Bookmark size={14} strokeWidth={1.6} /> 68</span>
          </footer>
        </article>
      </Section>
    </>
  );
}

/* ---------- TikTok ---------- */
function TikTokSection() {
  return (
    <>
      <Section
        title="TikTok · cover · 1080×1920"
        meta="9:16 vertical · 1 frame fica como capa no perfil · hook visual"
      >
        <article className="vds-sc-tiktok-chrome">
          <div className="vds-sc-tiktok-canvas via-mesh-navy via-noise">
            <span className="vds-sc-tiktok-eyebrow">7 meses construindo agente</span>
            <h2>
              o que ninguém te conta
              <br />
              sobre <em>agente em produção</em>
            </h2>
            <p>3 cicatrizes · pt 1/3</p>
            <img src={monogramWhite} alt="" className="vds-sc-tiktok-mono" />
          </div>
          <aside className="vds-sc-tiktok-side">
            <div className="vds-sc-tiktok-avatar">
              <img src={appIcon} alt="" />
              <span className="plus">+</span>
            </div>
            <button aria-label="Curtir"><Heart size={26} strokeWidth={2} /></button>
            <em className="mono">12.4k</em>
            <button aria-label="Comentar"><MessageCircle size={26} strokeWidth={2} /></button>
            <em className="mono">218</em>
            <button aria-label="Salvar"><Bookmark size={26} strokeWidth={2} /></button>
            <em className="mono">1.8k</em>
            <button aria-label="Compartilhar"><Share2 size={26} strokeWidth={2} /></button>
            <em className="mono">442</em>
          </aside>
          <div className="vds-sc-tiktok-bottom">
            <strong>@viverdeia.ai</strong>
            <p>3 erros que cometi com agente em produção · pt 1</p>
            <em>♪ som original · 1.2k usando</em>
          </div>
        </article>
      </Section>

      <Section
        title="TikTok · text overlay style"
        meta="texto bold sobre o vídeo · navy/white por contexto"
      >
        <div className="vds-sc-tiktok-overlay-row">
          <article className="vds-sc-tiktok-overlay-demo via-mesh-navy via-noise">
            <span className="overlay-pos top-left">
              POV: você quer aprender IA<br />sem virar técnico
            </span>
          </article>
          <article className="vds-sc-tiktok-overlay-demo via-mesh-navy via-noise">
            <span className="overlay-pos center">
              90 dias.<br />
              1 agente em produção.
            </span>
          </article>
          <article className="vds-sc-tiktok-overlay-demo via-mesh-navy via-noise">
            <span className="overlay-pos bottom">
              continua nos comentários ↓
            </span>
          </article>
        </div>
      </Section>
    </>
  );
}

/* ---------- Podcast ---------- */
function PodcastSection() {
  return (
    <>
      <Section
        title="Podcast cover · 3000×3000"
        meta="quadrado · safe area canto inferior direito · wordmark + tagline"
      >
        <div className="vds-sc-podcast-grid">
          <article className="vds-sc-podcast-cover via-mesh-navy via-noise">
            <span className="vds-sc-podcast-eyebrow">podcast · semanal</span>
            <h2>
              Viver
              <br />
              de IA
              <br />
              <em>operações</em>
            </h2>
            <p>cases reais · sem teoria · sem guru</p>
            <img src={monogramWhite} alt="" className="vds-sc-podcast-mono" />
          </article>

          <SpecCard
            title="Specs do cover"
            items={[
              { k: 'Tamanho', v: '3000 × 3000px (1:1) · até 500KB JPG' },
              { k: 'Safe area', v: '300px de cada lado · não cortar título' },
              { k: 'Tipografia', v: 'Geist Display · peso 500 · 220-280px' },
              { k: 'Cor', v: 'mesh-navy · sem foto literal' },
              { k: 'Logo', v: 'monogram_white canto inferior direito 200px' },
              { k: 'Episode count', v: 'eyebrow superior · "ep 12" mono' },
            ]}
          />
        </div>
      </Section>

      <Section
        title="Podcast · episode card · 1080×1080"
        meta="formato pra divulgar episódio individual em social"
      >
        <article className="vds-sc-podcast-ep via-mesh-navy via-noise">
          <span className="vds-sc-podcast-ep-eyebrow">
            <Play size={11} strokeWidth={2.4} fill="currentColor" />
            episódio 18 · 42min
          </span>
          <h2>
            Construindo Nina:<br />
            <em>3 erros e o que mudou</em>
          </h2>
          <div className="vds-sc-podcast-ep-guest">
            <div className="av">CR</div>
            <div>
              <strong>Caio Ribeiro</strong>
              <em>fundador · Viver de IA</em>
            </div>
          </div>
          <p className="vds-sc-podcast-ep-where">
            disponível em Spotify · Apple · Pocket Casts
          </p>
          <img src={monogram} alt="" className="vds-sc-podcast-ep-mono" />
        </article>
      </Section>
    </>
  );
}

/* ---------- Spec card helper ---------- */
function SpecCard({ title, items }: { title: string; items: { k: string; v: string }[] }) {
  return (
    <article className="vds-sc-spec">
      <h4>{title}</h4>
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
