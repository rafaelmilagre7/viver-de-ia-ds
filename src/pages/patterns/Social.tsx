import { Heart, MessageCircle, Bookmark, MoreHorizontal, ThumbsUp, Repeat2 } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './social.css';

export default function Social() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · social media"
        title={
          <>
            Posts editoriais <em>na assinatura da marca</em>.
          </>
        }
        lede="Templates pra Instagram (square 1:1 + story 9:16), LinkedIn (3:1 cover), Twitter/X. Plate navy mesh com noise, monograma VIA marca d'água, citação editorial em Geist, métrica como peça tipográfica. Cada post pronto pra exportar."
      />

      <Section title="Instagram · post square 1:1" meta="1080×1080 · feed">
        <div className="vds-soc-stage ig-row">
          <div className="vds-ig-frame">
            <header className="ig-h">
              <span className="ig-av"><img src={monogramWhite} alt="" /></span>
              <div>
                <strong>viverdeia</strong>
                <span>Patrocinado</span>
              </div>
              <MoreHorizontal size={18} strokeWidth={2} className="ig-more" />
            </header>
            <div className="vds-ig-post via-mesh-navy via-noise">
              <div className="ig-content">
                <BrandLogo variant="white" size="sm" />
                <p className="eyebrow">Case · Efizi</p>
                <h2>
                  +11.920<br /><em>conversas analisadas</em>
                </h2>
                <p className="lede">
                  Em 90 dias. Sem mais ninguém precisar olhar planilha de WhatsApp.
                </p>
                <span className="tag">Cases publicados · Viver de IA</span>
              </div>
            </div>
            <footer className="ig-f">
              <div className="ig-acts">
                <button aria-label="Curtir"><Heart size={22} strokeWidth={2} /></button>
                <button aria-label="Comentar"><MessageCircle size={22} strokeWidth={2} /></button>
                <button aria-label="Repetir"><Repeat2 size={22} strokeWidth={2} /></button>
                <button aria-label="Salvar" className="bk"><Bookmark size={22} strokeWidth={2} /></button>
              </div>
              <p className="ig-caption">
                <strong>1.840 curtidas</strong> · <strong>viverdeia</strong> Case completo no link da bio.<br />
                <span>#viverdeia #cases #operacaodeia</span>
              </p>
            </footer>
          </div>

          {/* Variant — Instagram quote */}
          <div className="vds-ig-frame">
            <header className="ig-h">
              <span className="ig-av"><img src={monogramWhite} alt="" /></span>
              <div>
                <strong>viverdeia</strong>
                <span>4h</span>
              </div>
              <MoreHorizontal size={18} strokeWidth={2} className="ig-more" />
            </header>
            <div className="vds-ig-post via-mesh-navy via-noise">
              <div className="ig-content quote-variant">
                <span className="quote-mark">"</span>
                <h2 className="quote">
                  Aqui eu consigo<br /><em>ver rapidamente</em><br />onde estou perdendo venda.
                </h2>
                <div className="ig-attr">
                  <span className="ig-attr-av">GD</span>
                  <div>
                    <strong>Guilherme Delorenzo</strong>
                    <span>Founder · Efizi</span>
                  </div>
                </div>
              </div>
            </div>
            <footer className="ig-f">
              <div className="ig-acts">
                <button aria-label="Curtir"><Heart size={22} strokeWidth={2} /></button>
                <button aria-label="Comentar"><MessageCircle size={22} strokeWidth={2} /></button>
                <button aria-label="Repetir"><Repeat2 size={22} strokeWidth={2} /></button>
                <button aria-label="Salvar" className="bk"><Bookmark size={22} strokeWidth={2} /></button>
              </div>
              <p className="ig-caption">
                <strong>2.412 curtidas</strong> · <strong>viverdeia</strong> Operadores que estão fazendo IA virar receita.<br />
                <span>#depoimento #operadores #vivedeia</span>
              </p>
            </footer>
          </div>
        </div>
      </Section>

      <Section title="Instagram · story 9:16" meta="1080×1920 · vertical">
        <div className="vds-soc-stage">
          <div className="vds-story">
            <div className="story-bar">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`seg ${i <= 2 ? 'done' : ''} ${i === 3 ? 'live' : ''}`}>
                  <div /></div>
              ))}
            </div>
            <header className="story-h">
              <span className="ig-av sm"><img src={monogramWhite} alt="" /></span>
              <strong>viverdeia</strong>
              <span>2min</span>
            </header>
            <div className="story-content via-mesh-navy via-noise">
              <p className="eyebrow">Turma 2026.2</p>
              <h2>8 vagas restantes.<br /><em>12 dias.</em></h2>
              <p className="lede">
                Mentoria de operadores. Sessões ao vivo, acompanhamento individual, 206 cases publicados.
              </p>
              <button className="story-cta">Garantir vaga</button>
            </div>
            <footer className="story-f">
              <input placeholder="Envie uma mensagem…" />
              <button aria-label="Curtir" className="story-like"><Heart size={22} strokeWidth={2} /></button>
            </footer>
          </div>
        </div>
      </Section>

      <Section title="LinkedIn · post 3:1" meta="1584×396 · feed corporativo">
        <div className="vds-soc-stage">
          <div className="vds-li-frame">
            <header className="li-h">
              <span className="li-av"><img src={monogramWhite} alt="" /></span>
              <div>
                <strong>Viver de IA</strong>
                <span>Mentoria + comunidade · São Paulo, SP</span>
                <span className="li-time">2h · 🌐</span>
              </div>
              <button className="li-follow">+ Seguir</button>
            </header>
            <p className="li-text">
              206 cases publicados. Cada um com métrica validada com o operador. Hoje publicamos o 207 — <strong>Balzani &amp; Zimbel: R$ 4.600/mês em economia recorrente com CRM próprio.</strong> Link no primeiro comentário.
            </p>
            <div className="vds-li-post via-mesh-navy via-noise">
              <div className="li-content">
                <BrandLogo variant="white" size="sm" />
                <p className="eyebrow">Case · Balzani &amp; Zimbel</p>
                <h2>R$ 4.600<em>/mês</em></h2>
                <p className="lede">
                  Economia recorrente. CRM próprio, 6 ferramentas internalizadas.
                </p>
              </div>
            </div>
            <footer className="li-f">
              <div className="li-stats">
                <span>👍 248 reações · 32 comentários · 14 reposts</span>
              </div>
              <div className="li-acts">
                <button><ThumbsUp size={16} strokeWidth={2} /> Curtir</button>
                <button><MessageCircle size={16} strokeWidth={2} /> Comentar</button>
                <button><Repeat2 size={16} strokeWidth={2} /> Repostar</button>
              </div>
            </footer>
          </div>
        </div>
      </Section>
    </>
  );
}
