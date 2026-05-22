import { ArrowRight, Quote } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './slides.css';

export default function Slides() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · slide deck"
        title={
          <>
            Apresentação editorial, <em>chapter por chapter</em>.
          </>
        }
        lede="Sistema de slides como peça da marca — title com mesh navy + watermark monograma, stat com número monumental, quote editorial, content com bullets ritmados, closing com call-to-action. 16:9 nativo, presentes em keynote, PDF ou exportado pro Notion."
      />

      <DeckSection />
      <SlideContentSection />
    </>
  );
}

function DeckSection() {
  return (
    <Section title="Deck · 6 slides canônicos" meta="16:9 · apresentação Leaders AI Conference 2026">
      <div className="vds-deck">
        {/* 01 · Title slide */}
        <article className="vds-slide title via-mesh-navy via-noise">
          <span className="vds-slide-aura" aria-hidden="true" />

          <header className="vds-slide-top">
            <span className="vds-slide-chapter">Cap. 01 · 2026</span>
            <img src={monogramWhite} alt="" className="vds-slide-mark" />
          </header>

          <h2 className="vds-slide-title-h2">
            Quando a IA <em>vira receita</em>, sem a tração virar caos.
          </h2>

          <footer className="vds-slide-foot">
            <span className="vds-slide-author">
              <span className="av">CR</span>
              <span>Caio Ribeiro <em>· Viver de IA</em></span>
            </span>
            <span className="vds-slide-num">01 / 12</span>
          </footer>
        </article>

        {/* 02 · Section divider */}
        <article className="vds-slide divider via-mesh-navy via-noise">
          <span className="vds-slide-aura" aria-hidden="true" />

          <header className="vds-slide-top">
            <span className="vds-slide-chapter">Cap. 02</span>
            <span className="vds-slide-chapter-num">02 / 12</span>
          </header>

          <div className="vds-slide-divider-body">
            <h2 className="vds-slide-divider-h2">
              O playbook
              <br />
              <em>na prática.</em>
            </h2>
            <p className="vds-slide-divider-meta">3 estudos de caso · 38 minutos</p>
          </div>

          <span className="vds-slide-divider-rule" aria-hidden="true" />
        </article>

        {/* 03 · Stat slide */}
        <article className="vds-slide stat via-mesh-navy via-noise">
          <span className="vds-slide-aura" aria-hidden="true" />

          <header className="vds-slide-top">
            <span className="vds-slide-eyebrow">Implementação Efizi · 90 dias</span>
          </header>

          <div className="vds-stat-body">
            <p className="vds-stat-number">
              <span className="num">11.920</span>
              <span className="vds-stat-unit">conversas analisadas</span>
            </p>
            <p className="vds-stat-meta">
              do canal de vendas em 12 semanas — o que era invisível, virou base de decisão.
            </p>
          </div>

          <footer className="vds-slide-foot">
            <span className="vds-slide-eyebrow-foot">Fonte · CRM Efizi + Nina IA</span>
            <span className="vds-slide-num">04 / 12</span>
          </footer>
        </article>

        {/* 04 · Quote slide */}
        <article className="vds-slide quote">
          <header className="vds-slide-top">
            <Quote size={28} strokeWidth={1.4} className="vds-quote-mark" />
            <span className="vds-slide-eyebrow-dark">Testemunho · cliente</span>
          </header>

          <blockquote className="vds-quote-body">
            A IA não substituiu meu time. Ela <em>devolveu tempo</em> pra eles fazerem o que só humanos fazem — escutar de verdade.
          </blockquote>

          <footer className="vds-slide-foot light">
            <span className="vds-slide-author">
              <span className="av light">ML</span>
              <span>
                <strong>Márisson Lage</strong>
                <em>CEO · Efizi Soluções</em>
              </span>
            </span>
            <span className="vds-slide-num">07 / 12</span>
          </footer>
        </article>

        {/* 05 · Content slide */}
        <article className="vds-slide content">
          <header className="vds-slide-top">
            <span className="vds-slide-eyebrow-dark">Cap. 03 · O que muda</span>
          </header>

          <h3 className="vds-slide-content-h3">
            Três coisas que precisam estar no chão antes da IA <em>render qualquer coisa.</em>
          </h3>

          <ol className="vds-slide-bullets">
            <li>
              <span className="num">01</span>
              <div>
                <strong>Um único registro de verdade</strong>
                <p>CRM, conversas, financeiro. Sem isso, a IA aprende contradição.</p>
              </div>
            </li>
            <li>
              <span className="num">02</span>
              <div>
                <strong>Pessoa responsável, não comitê</strong>
                <p>Uma decisão por semana, executada — vale mais que três sem dono.</p>
              </div>
            </li>
            <li>
              <span className="num">03</span>
              <div>
                <strong>Medir o que pesa no caixa</strong>
                <p>Hora poupada não é métrica. Receita destravada, ticket, retenção — são.</p>
              </div>
            </li>
          </ol>

          <footer className="vds-slide-foot light">
            <span className="vds-slide-eyebrow-foot">Playbook · capítulo 03</span>
            <span className="vds-slide-num">09 / 12</span>
          </footer>
        </article>

        {/* 06 · Closing slide */}
        <article className="vds-slide closing via-mesh-navy via-noise">
          <span className="vds-slide-aura" aria-hidden="true" />

          <header className="vds-slide-top">
            <BrandLogo variant="white" size="sm" />
            <span className="vds-slide-chapter-num">12 / 12</span>
          </header>

          <div className="vds-slide-closing-body">
            <h3 className="vds-slide-closing-h3">
              Pronto pra começar <em>seu próximo capítulo?</em>
            </h3>
            <p className="vds-slide-lede">
              Mentoria 1:1, comunidade de operadores e o playbook que está sendo escrito enquanto você lê isso.
            </p>
          </div>

          <footer className="vds-slide-foot transparent">
            <a className="vds-slide-cta" href="#">
              viverdeia.ai/comecar
              <ArrowRight size={14} strokeWidth={2.4} />
            </a>
            <span className="vds-slide-eyebrow-foot">Caio Ribeiro · 17 mai 2026</span>
          </footer>
        </article>
      </div>
    </Section>
  );
}

function SlideContentSection() {
  return (
    <Section title="Anatomia · ritmo do deck" meta="hierarquia visual entre slides">
      <div className="vds-deck-anatomy">
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">01</span>
          <div>
            <p className="vds-anatomy-name">Title slide</p>
            <p className="vds-anatomy-desc">Mesh navy + monogram watermark · pergunta editorial que abre o tema · autoria + slide number embaixo. Único slide com peso "manchete".</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">02</span>
          <div>
            <p className="vds-anatomy-name">Section divider</p>
            <p className="vds-anatomy-desc">Mesh navy mais escuro · chapter number + título de 2 linhas · meta editorial discreta. Marca quebra entre macro-temas.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">03</span>
          <div>
            <p className="vds-anatomy-name">Stat slide</p>
            <p className="vds-anatomy-desc">Número monumental (80-96px) · unidade subordinada · uma linha de contexto editorial. Pra dado que muda a conversa.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">04</span>
          <div>
            <p className="vds-anatomy-name">Quote slide</p>
            <p className="vds-anatomy-desc">Fundo claro pra contraste · aspas grandes · pull quote em 22-26px · atribuição com avatar. Quando alguém disser uma frase que você não tem como melhorar.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">05</span>
          <div>
            <p className="vds-anatomy-name">Content slide</p>
            <p className="vds-anatomy-desc">Lista numerada com strong + descritivo · respiro entre items · no máximo 3 pontos. Sempre que precisar pluralizar uma ideia.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">06</span>
          <div>
            <p className="vds-anatomy-name">Closing slide</p>
            <p className="vds-anatomy-desc">Logo composta + CTA em pill glass + URL legível · slide final do deck. Espelha o title slide em tom mais convidativo.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
