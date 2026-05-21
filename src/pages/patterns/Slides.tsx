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
        lede="Sistema de slides como peça da marca — title slide com mesh navy + watermark monograma, stat slide com número monumental, quote slide editorial, content slide com bullets ritmados, closing slide com call-to-action. 16:9 nativo, presentes em keynote, PDF ou exportado pro Notion."
      />

      <DeckSection />
      <SlideContentSection />
    </>
  );
}

function DeckSection() {
  return (
    <Section title="Deck · 5 slides canônicos" meta="16:9 · apresentação Leaders AI Conference 2026">
      <div className="vds-deck">
        {/* Title slide */}
        <article className="vds-slide title via-mesh-navy via-noise">
          <div className="vds-slide-mark">
            <img src={monogramWhite} alt="" />
          </div>
          <span className="vds-slide-chapter">Cap. 01 · 2026</span>
          <h2>
            Quando a IA <em>vira receita</em>,
            <br />
            sem a tração virar caos.
          </h2>
          <div className="vds-slide-foot">
            <span className="vds-slide-author">
              <span className="av">CR</span>
              Caio Ribeiro · Viver de IA
            </span>
            <span className="vds-slide-num">01 / 12</span>
          </div>
        </article>

        {/* Stat slide */}
        <article className="vds-slide stat via-mesh-navy via-noise">
          <span className="vds-slide-eyebrow">Implementação Efizi · 90 dias</span>
          <p className="vds-stat-number">
            11.920
            <span className="vds-stat-unit">conversas analisadas</span>
          </p>
          <p className="vds-stat-meta">
            do canal de vendas, em 12 semanas — o que era invisível, virou base de decisão.
          </p>
          <div className="vds-slide-foot">
            <span className="vds-slide-eyebrow-foot">Fonte · CRM Efizi + Nina IA</span>
            <span className="vds-slide-num">04 / 12</span>
          </div>
        </article>

        {/* Quote slide */}
        <article className="vds-slide quote">
          <Quote size={36} strokeWidth={1.4} className="vds-quote-mark" />
          <blockquote>
            "A IA não substituiu meu time. Ela <em>devolveu tempo</em> pra eles fazerem o que só humanos fazem
            — escutar de verdade."
          </blockquote>
          <div className="vds-slide-foot dark">
            <span className="vds-slide-author">
              <span className="av light">ML</span>
              <span>
                <strong>Márisson Lage</strong>
                <em>CEO · Efizi Soluções</em>
              </span>
            </span>
            <span className="vds-slide-num">07 / 12</span>
          </div>
        </article>

        {/* Content slide */}
        <article className="vds-slide content">
          <span className="vds-slide-eyebrow-dark">Cap. 03 · O que muda</span>
          <h3>
            Três coisas que precisam estar no chão antes da IA
            <br />
            <em>render qualquer coisa.</em>
          </h3>
          <ol className="vds-slide-bullets">
            <li>
              <span className="num">01</span>
              <div>
                <strong>Um único registro de verdade.</strong>
                <p>CRM, base de conversas, financeiro — sem isso, a IA aprende contradição.</p>
              </div>
            </li>
            <li>
              <span className="num">02</span>
              <div>
                <strong>Pessoa responsável, não comitê.</strong>
                <p>Uma decisão por semana, executada — vale mais que três deliberações sem dono.</p>
              </div>
            </li>
            <li>
              <span className="num">03</span>
              <div>
                <strong>Medir o que pesa no caixa.</strong>
                <p>Hora poupada não é métrica. Receita destravada, ticket médio, retenção — são.</p>
              </div>
            </li>
          </ol>
          <div className="vds-slide-foot dark">
            <span className="vds-slide-eyebrow-foot">Playbook · capítulo 03</span>
            <span className="vds-slide-num">09 / 12</span>
          </div>
        </article>

        {/* Closing slide */}
        <article className="vds-slide closing via-mesh-navy via-noise">
          <BrandLogo variant="white" size="md" />
          <h3>
            Pronto pra começar
            <br />
            <em>seu próximo capítulo?</em>
          </h3>
          <p className="vds-slide-lede">
            Mentoria 1:1, comunidade de operadores e o playbook que está sendo escrito enquanto você lê isso.
          </p>
          <a className="vds-slide-cta" href="#">
            viverdeia.ai/comecar
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <div className="vds-slide-foot transparent">
            <span className="vds-slide-eyebrow-foot light">Caio Ribeiro · 17 mai 2026</span>
            <span className="vds-slide-num light">12 / 12</span>
          </div>
        </article>

        {/* Section divider */}
        <article className="vds-slide divider via-mesh-navy via-noise">
          <span className="vds-slide-chapter">Cap. 02</span>
          <h2>
            O playbook
            <br />
            <em>na prática</em>.
          </h2>
          <p className="vds-slide-divider-meta">3 estudos de caso · 38 minutos</p>
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
            <p className="vds-anatomy-desc">Número monumental (120-160px) · unidade subordinada em 16px · uma linha de contexto editorial. Pra dado que muda a conversa.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">04</span>
          <div>
            <p className="vds-anatomy-name">Quote slide</p>
            <p className="vds-anatomy-desc">Fundo claro pra contraste · aspas grandes · pull quote em 36-40px · atribuição com foto/avatar. Quando alguém disser uma frase que você não tem como melhorar.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">05</span>
          <div>
            <p className="vds-anatomy-name">Content slide</p>
            <p className="vds-anatomy-desc">Lista numerada com strong + descritivo · respiro entre items · no máximo 3-4 pontos. Sempre que precisar pluralizar uma ideia.</p>
          </div>
        </div>
        <div className="vds-anatomy-row">
          <span className="vds-anatomy-num">06</span>
          <div>
            <p className="vds-anatomy-name">Closing slide</p>
            <p className="vds-anatomy-desc">Logo composta + CTA em ring navy + URL legível · slide final do deck. Espelha o title slide em tom mais convidativo.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
