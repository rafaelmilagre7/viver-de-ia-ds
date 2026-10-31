import { useState } from 'react';
import {
  Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal,
  Globe, Play, ThumbsUp, Share2,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import wordmarkWhite from '../../assets/logos/VIVER_DE_IA_white.png';
import wordmarkBlack from '../../assets/logos/VIVER_DE_IA_black.png';
import appIcon from '../../assets/logos/VIA_app_icon_128.png';
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
        eyebrow="Padrões · canais sociais"
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
              <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={1.75} /></button>
            </header>
            <div className="vds-sc-ig-canvas via-mesh-navy via-noise">
              <img src={monogramWhite} alt="" className="watermark" />
              <span className="vds-sc-ig-eyebrow">cases reais · viverdeia.ai/cases</span>
              <h2>
                <em>521</em>
                <br />
                cases reais.
              </h2>
              <p className="vds-sc-ig-caption">
                de implementação de IA · em empresas brasileiras · 29 setores
              </p>
            </div>
            <div className="vds-sc-ig-actions">
              <div className="vds-sc-ig-actions-l">
                <button aria-label="Curtir"><Heart size={20} strokeWidth={1.75} /></button>
                <button aria-label="Comentar"><MessageCircle size={20} strokeWidth={1.75} /></button>
                <button aria-label="Compartilhar"><Share2 size={16} strokeWidth={1.75} /></button>
              </div>
              <button aria-label="Salvar"><Bookmark size={20} strokeWidth={1.75} /></button>
            </div>
            <div className="vds-sc-ig-body">
              <p>
                <strong>viverdeia.ai</strong> 521 cases reais de IA em empresas brasileiras,
                separados por setor. procura o do seu setor · link no perfil.
              </p>
              <span className="vds-sc-ig-time">Há 4 horas · ver tradução</span>
            </div>
          </article>

          <SpecCard
            title="Specs do canvas"
            items={[
              { k: 'Tamanho', v: '1080 × 1080px (1:1)' },
              { k: 'Safe area', v: '60px de cada lado · evitar título no corte' },
              { k: 'Logo', v: 'monogram_white 40px canto inferior esquerdo' },
              { k: 'Headline', v: 'Geist Display · 56-72px · número em peso regular' },
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
              <span className="vds-sc-story-eyebrow">plano pro</span>
              <h2>
                90 dias.<br />
                Receita sobe ou <em>custo cai</em>.<br />
                ou 100% <em>de volta</em>.
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
              { k: 'CTA', v: 'sticker “arrasta pra cima” só se for link real' },
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
              <span className="vds-sc-reel-eyebrow">3 erros comuns</span>
              <h2>
                Implantando IA,
                <br />
                <em>3 erros se repetem</em>.
                <br />
                Todos custam.
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
            { label: 'planos', n: '04' },
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
        title="LinkedIn pessoal · Rafael Milagre"
        meta="post 1ª pessoa · gancho número grande · sem 5-dicas-infalíveis"
      >
        <article className="vds-sc-li-post">
          <header className="vds-sc-li-hdr">
            <div className="vds-sc-li-avatar">RM</div>
            <div>
              <strong>Rafael Milagre</strong>
              <em>Fundador · Viver de IA</em>
              <span>2h · <Globe size={14} strokeWidth={1.75} /></span>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={1.75} /></button>
          </header>

          <div className="vds-sc-li-body">
            <p>
              a Viva Nexo levava 6 horas pra fechar um relatório.
            </p>
            <p>
              hoje são alguns cliques.
            </p>
            <p>
              o case completo (desafio, solução e resultado) tá publicado. vale ler antes de
              abrir mais um projeto de IA do zero — link nos comentários.
            </p>
            <p>
              <em>6h → cliques. R$&nbsp;162.000 de economia.</em>
            </p>
          </div>

          <div className="vds-sc-li-canvas via-mesh-navy via-noise">
            <span className="vds-sc-li-eyebrow">case real · Viva Nexo · saúde</span>
            <h2>
              6h → <em>cliques</em>
            </h2>
            <p>tempo de relatório · case real em viverdeia.ai/cases</p>
            <img src={monogramWhite} alt="" />
          </div>

          <div className="vds-sc-li-actions">
            <div className="vds-sc-li-actions-stats">
              <span className="vds-sc-li-react">
                <ThumbsUp size={14} strokeWidth={1.75} fill="currentColor" />
              </span>
              <em>422 · 38 comentários · 12 compartilhamentos</em>
            </div>
            <div className="vds-sc-li-actions-btns">
              <button><ThumbsUp size={16} strokeWidth={1.75} /> Curtir</button>
              <button><MessageCircle size={16} strokeWidth={1.75} /> Comentar</button>
              <button><Repeat2 size={16} strokeWidth={1.75} /> Republicar</button>
              <button><Share2 size={16} strokeWidth={1.75} /> Enviar</button>
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
              <em>Plataforma B2B de IA para empresas · [N] seguidores</em>
              <span>3h · <Globe size={14} strokeWidth={1.75} /></span>
            </div>
            <button aria-label="Mais opções"><MoreHorizontal size={16} strokeWidth={1.75} /></button>
          </header>

          <div className="vds-sc-li-body">
            <p>
              <strong>521 cases reais de implementação de IA.</strong>
            </p>
            <p>
              em vez de ensinar &ldquo;prompt engineering&rdquo;, a plataforma coloca IA pra trabalhar
              na operação: soluções prontas, formações práticas, Consultor IA e mentoria em
              grupo ao vivo.
            </p>
            <p>
              157 soluções prontas · veja os cases do seu setor.
            </p>
          </div>

          <div className="vds-sc-li-canvas-light">
            <img src={wordmarkBlack} alt="Viver de IA" className="word" />
            <div className="vds-sc-li-stats-grid">
              <div>
                <strong className="mono">521</strong>
                <em>cases reais de IA</em>
              </div>
              <div>
                <strong className="mono">157</strong>
                <em>soluções prontas</em>
              </div>
              <div>
                <strong className="mono">29</strong>
                <em>setores com IA</em>
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
              h: '6h → cliques',
              sub: 'tempo de relatório',
              meta: 'case real · Viva Nexo',
            },
            { n: 2, type: 'context', h: 'O problema', sub: '6 horas pra fechar um relatório' },
            { n: 3, type: 'context', h: 'A hipótese errada', sub: 'achar que IA começa pelo prompt' },
            { n: 4, type: 'reveal', h: 'O que pesa de verdade', sub: 'escolher a tarefa certa pra começar' },
            { n: 5, type: 'fix', h: 'Passo 1', sub: 'listar o que se repete e tem formato fixo' },
            { n: 6, type: 'fix', h: 'Passo 2', sub: 'procurar solução pronta antes de construir' },
            { n: 7, type: 'result', h: 'R$\u00A0162 mil', sub: 'de economia · case Viva Nexo' },
            { n: 8, type: 'learn', h: 'O que vale anotar', sub: 'comece pela tarefa mais repetitiva' },
            { n: 9, type: 'learn', h: 'Segunda lição', sub: 'meça antes e depois, em horas e reais' },
            {
              n: 10,
              type: 'cta',
              h: 'Veja os 521 cases',
              sub: 'separados por setor',
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
          <span className="tag">IA do discurso pra operação · 521 cases reais de implementação</span>
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
            <p>mentoria ao vivo · cases reais</p>
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
            <h3>IA do discurso pra operação.</h3>
            <p>521 cases reais · 157 soluções prontas · 29 setores · formações práticas</p>
          </div>
          <div className="vds-sc-yt-banner-tv-line">Área desktop (2560×423)</div>
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
              <strong>Viva Nexo: de 6h pra cliques</strong>
              <em>case real · 18min</em>
            </article>
            <article>
              <div className="thumb"></div>
              <strong>3 erros ao implantar IA</strong>
              <em>mentoria ao vivo · 22min</em>
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
          <span>IA do discurso pra operação · viverdeia.ai</span>
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
            521 cases reais de implementação ensinam algo que nenhuma aula ensina: IA em
            produção exige mais cicatriz que prompt bom.
          </p>
          <footer>
            <span><MessageCircle size={16} strokeWidth={1.75} /> 42</span>
            <span><Repeat2 size={16} strokeWidth={1.75} /> 187</span>
            <span><Heart size={16} strokeWidth={1.75} /> 941</span>
            <span><Bookmark size={16} strokeWidth={1.75} /> 122</span>
          </footer>
        </article>
      </Section>

      <Section
        title="X · quote tweet com card · post + canvas"
        meta="quote ancora · canvas reforça com 1 número"
      >
        <article className="vds-sc-x-post">
          <header>
            <div className="vds-sc-x-avatar">NM</div>
            <div>
              <strong>[Nome]</strong>
              <em>@[usuario] · 2h</em>
            </div>
          </header>
          <p>
            li os cases de quem colocou IA na operação e anotei o que de fato move o ponteiro.
            <strong> spoiler: não é o prompt.</strong>
          </p>
          <div className="vds-sc-x-card via-mesh-navy via-noise">
            <span className="vds-sc-x-card-eyebrow">case · Place Dreams</span>
            <h3>
              <em>R$&nbsp;42 mil</em> por ano · em 30 dias
            </h3>
            <p>gestão manual virou eficiência digital · case real em viverdeia.ai/cases</p>
            <img src={monogramWhite} alt="" />
          </div>
          <footer>
            <span><MessageCircle size={16} strokeWidth={1.75} /> 28</span>
            <span><Repeat2 size={16} strokeWidth={1.75} /> 94</span>
            <span><Heart size={16} strokeWidth={1.75} /> 412</span>
            <span><Bookmark size={16} strokeWidth={1.75} /> 68</span>
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
            <span className="vds-sc-tiktok-eyebrow">o que os cases ensinam</span>
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
            <button aria-label="Curtir"><Heart size={24} strokeWidth={1.75} /></button>
            <em className="mono">12,4 mil</em>
            <button aria-label="Comentar"><MessageCircle size={24} strokeWidth={1.75} /></button>
            <em className="mono">218</em>
            <button aria-label="Salvar"><Bookmark size={24} strokeWidth={1.75} /></button>
            <em className="mono">1,8 mil</em>
            <button aria-label="Compartilhar"><Share2 size={24} strokeWidth={1.75} /></button>
            <em className="mono">442</em>
          </aside>
          <div className="vds-sc-tiktok-bottom">
            <strong>@viverdeia.ai</strong>
            <p>3 erros comuns com agente em produção · pt 1</p>
            <em>♪ som original · 1,2 mil usando</em>
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
              Receita sobe ou custo cai.<br />
              Ou 100% de volta.
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
              { k: 'Episode count', v: 'eyebrow superior · “ep 12” mono' },
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
            <Play size={16} strokeWidth={1.75} fill="currentColor" />
            episódio 18 · 42min
          </span>
          <h2>
            Implantando IA:<br />
            <em>3 erros e o que mudou</em>
          </h2>
          <div className="vds-sc-podcast-ep-guest">
            <div className="av">RM</div>
            <div>
              <strong>Rafael Milagre</strong>
              <em>fundador · Viver de IA</em>
            </div>
          </div>
          <p className="vds-sc-podcast-ep-where">
            disponível em Spotify · Apple · Pocket Casts
          </p>
          <img src={monogramWhite} alt="" className="vds-sc-podcast-ep-mono" />
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
