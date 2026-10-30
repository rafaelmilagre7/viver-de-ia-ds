import { useEffect, useRef } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Card } from '../../lib/Card/Card';
import { Button } from '../../lib/Button/Button';
import palco from '../../assets/glass/palco-conferencia.webp';
import './glass.css';

/* Onde o vidro vive · composições de produto com o material certo em cada
   nível, em cima de conteúdo real. Nada de receita inline: cada peça é a
   classe ou o componente da lib. A foto é escura nos 2 temas (é uma foto);
   o vidro por cima segue o tema — no escuro ele escurece o palco. */
const photo = { backgroundImage: `url(${palco})` };

export default function GlassInContext() {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pageRef.current) pageRef.current.scrollTop = 96;
  }, []);

  return (
    <>
      <DocsHeader
        eyebrow="Liquid Glass · em contexto"
        title={
          <>
            Onde o vidro <em>vive</em>.
          </>
        }
        lede="Cada nível da interface tem o seu material: chrome na barra que fica, regular no card do conteúdo, thick no que flutua por cima, control na peça que se toca. Plano só onde a leitura manda: tabela densa e linha de listagem."
      />

      <Section title="Página com barra fixa" meta="chrome + regular">
        <div className="gl-scroll" ref={pageRef} style={{ height: 420 }} tabIndex={0} aria-label="Demo: página rolando por baixo da barra">
          <div className="via-bar-glass">
            <span className="gl-scroll__brand">Leaders AI</span>
            <span className="gl-scroll__nav">Programação · Palestrantes · Ingressos</span>
          </div>
          <div className="gl-photo" style={{ ...photo, borderRadius: 0, minHeight: 300 }}>
            <p className="gl-photo__label">Conferência · edição [ano]</p>
            <p className="gl-photo__title">IA aplicada ao negócio, no palco.</p>
            <div className="gl-row">
              <Button variant="secondary">Ver programação</Button>
            </div>
          </div>
          <div className="gl-scroll__body">
            <h3>Programação</h3>
            <div className="gl-grid">
              {['Abertura', 'Operação com IA', 'Painel de líderes'].map((x) => (
                <Card key={x} variant="default">
                  <p className="vds-eyebrow">{x}</p>
                  <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--via-text-body)' }}>[horário] · [palestrante]</p>
                </Card>
              ))}
            </div>
            <p>Role pra cima e pra baixo: a foto e os cards passam desfocados por baixo da barra.</p>
          </div>
        </div>
      </Section>

      <Section title="Stat cards sobre fotografia" meta="regular · Card glass">
        <div className="gl-photo" style={photo}>
          <p className="gl-photo__label">Palco · luz fria e movimento</p>
          <div className="gl-grid">
            {[
              { lbl: 'Componentes', num: '46', sub: 'library React' },
              { lbl: 'Materiais', num: '4', sub: 'por elevação' },
              { lbl: 'Temas', num: '2', sub: 'claro e escuro' },
            ].map((c) => (
              <Card key={c.lbl} variant="glass" hoverable className="gl-stat">
                <p className="vds-eyebrow">{c.lbl}</p>
                <strong>{c.num}</strong>
                <span>{c.sub}</span>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Overlay" meta="thick + scrim">
        <div className="gl-overlay" style={{ minHeight: 380 }}>
          <div className="gl-overlay__page" aria-hidden="true">
            <b>Ingressos</b>
            <i /><i /><i />
          </div>
          <div className="gl-overlay__scrim" />
          <div className="via-glass-strong" role="group" aria-label="Demo de modal">
            <h3>Confirmar inscrição?</h3>
            <p>Sua inscrição será confirmada e o pagamento cobrado no método cadastrado.</p>
            <div className="gl-actions">
              <Button variant="ghost">Cancelar</Button>
              <Button variant="primary">Confirmar</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Lente" meta="opt-in · só Chromium">
        <div className="vds-callout ga-layers-item">
          <div className="vds-callout-info">
            <h4>Refração na borda, centro neutro</h4>
            <p>
              A lente dobra o que passa por baixo só na faixa da borda (os 8-24% de cada lado); o meio do
              vidro fica neutro, então o texto em cima não perde leitura. Liga em no máximo 1-2 peças-assinatura
              por tela — aqui, o card arrastável da anatomia.
            </p>
            <p>
              Só o Chromium desenha <code className="vds-code-inline">backdrop-filter: url()</code>.
              Safari, Firefox, menos transparência e mais contraste ficam com o blur normal do material —
              o portão é em JS, nada quebra.
            </p>
          </div>
          <CodeBlock>{`import { enableGlassLens } from '@viverdeia/design-system';
enableGlassLens();               // uma vez, no boot

<Card variant="glass" className="via-glass--lens">…</Card>

/* barra: só dobra no eixo y */
.minha-barra {
  --via-lens: url(#via-lens-bar);
}`}</CodeBlock>
        </div>
      </Section>
    </>
  );
}
