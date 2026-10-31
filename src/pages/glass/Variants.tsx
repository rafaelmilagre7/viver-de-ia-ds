import { useEffect, useRef } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Card } from '../../lib/Card/Card';
import { Button } from '../../lib/Button/Button';
import { Pill } from '../../lib/Pill/Pill';
import { Input } from '../../lib/Input/Input';
import palco from '../../assets/glass/palco-conferencia.webp';
import { useLiveTokens } from './useLiveTokens';
import './glass.css';

/* ══════════════════════════════════════════════════════════════════════
   OS 4 MATERIAIS EM CONTEXTO REAL
   Cada demo é a classe/componente de produto em cima de algo que existe:
   conteúdo rolando (chrome), fotografia (regular, control) e página com
   scrim (thick). A ficha lê o valor VIVO do tema atual (useLiveTokens):
   troque o tema no topo e a tabela muda junto — o que está escrito é o
   que o CSS resolve.
   ══════════════════════════════════════════════════════════════════════ */
type Mat = 'chrome' | 'regular' | 'thick' | 'control';
const PARTS = ['fill', 'blur', 'ring'] as const;
const names = (m: Mat) => PARTS.map((p) => `--via-material-${m}-${p}`);
const tidy = (v: string) => v.replace(/url\("data:[^"]+"\)/, 'var(--via-grain)');

function Spec({ m, utility }: { m: Mat; utility: string }) {
  const live = useLiveTokens(names(m));
  return (
    <div style={{ overflowX: 'auto', marginTop: 20 }}>
      <table className="vds-token-table gl-spec">
        <thead>
          <tr>
            <th style={{ width: '34%' }}>Token</th>
            <th>Valor no tema atual</th>
          </tr>
        </thead>
        <tbody>
          {names(m).map((n) => (
            <tr key={n}>
              <td className="tok">{n}</td>
              <td className="val">{tidy(live[n]) || '—'}</td>
            </tr>
          ))}
          <tr>
            <td className="tok">{`--via-material-${m}-rim / -shadow`}</td>
            <td className="val">aro especular + brilho interno, linha de base e drop</td>
          </tr>
          <tr>
            <td className="tok">HTML cru</td>
            <td className="val">{utility}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const photo = { backgroundImage: `url(${palco})` };

export default function GlassVariants() {
  /* a barra nasce com conteúdo JÁ passando por baixo (em repouso, sem
     depender de alguém rolar pra ver o material trabalhar) */
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 120;
  }, []);

  return (
    <>
      <DocsHeader
        eyebrow="Liquid Glass · materiais"
        title={
          <>
            Chrome, regular, thick, <em>control</em>.
          </>
        }
        lede="Quatro materiais por elevação. Chrome é a barra que deixa o conteúdo passar; regular é o card no conteúdo; thick é tudo que flutua por cima; control é a peça pequena e tocável. No tema escuro cada um vira uma camada que escurece o fundo — troque o tema no topo e veja os mesmos demos."
      />

      <Section title="Chrome" meta="header · sidebar · tab bar">
        <div className="gl-scroll" ref={scrollRef} tabIndex={0} aria-label="Demo: conteúdo rolando por baixo da barra">
          <div className="via-bar-glass">
            <span className="gl-scroll__brand">Viver de IA</span>
            <span className="gl-scroll__nav">Soluções · Cases · Planos</span>
          </div>
          <div className="gl-scroll__body">
            <h3>Role aqui dentro.</h3>
            <p>
              A barra é translúcida de verdade: o título, a foto e os cards passam desfocados por baixo e
              a navegação continua legível. Em repouso ela não tem régua dura — a borda de rolagem aparece
              só quando há conteúdo por trás.
            </p>
            <div className="gl-scroll__strip" style={photo} />
            <p>
              Chrome não carrega texto longo: só marca, navegação e ações. Texto corrido mora no
              conteúdo, sobre superfície sólida ou material regular.
            </p>
            <div className="gl-grid">
              {['Operação', 'Comunidade', 'Conferência'].map((x) => (
                <Card key={x} variant="default">
                  <p className="vds-eyebrow">{x}</p>
                  <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--via-text-body)' }}>Conteúdo da página, rolando.</p>
                </Card>
              ))}
            </div>
            <p>Fim do conteúdo de exemplo.</p>
          </div>
        </div>
        <Spec m="chrome" utility=".via-bar-glass" />
      </Section>

      <Section title="Regular" meta="card e painel no conteúdo">
        <div className="gl-photo" style={photo}>
          <p className="gl-photo__label">Sobre fotografia · palco da conferência</p>
          <div className="gl-grid">
            {[
              { lbl: 'Componentes', num: '46', sub: 'na library React' },
              { lbl: 'Materiais de vidro', num: '4', sub: 'chrome · regular · thick · control' },
              { lbl: 'Temas', num: '2', sub: 'claro primeiro · escuro desenhado' },
            ].map((c) => (
              <Card key={c.lbl} variant="glass" className="gl-stat">
                <p className="vds-eyebrow">{c.lbl}</p>
                <strong>{c.num}</strong>
                <span>{c.sub}</span>
              </Card>
            ))}
          </div>
        </div>
        <CodeBlock>{`<Card variant="glass">…</Card>      // React
<div className="via-glass">…</div>  // HTML cru · mesmo material`}</CodeBlock>
        <Spec m="regular" utility=".via-glass · .via-tile · .via-row-card" />
      </Section>

      <Section title="Thick" meta="tudo que flutua por cima">
        <div className="gl-overlay">
          <div className="gl-overlay__page" aria-hidden="true">
            <b>Relatório do time</b>
            <i /><i /><i />
          </div>
          <div className="gl-overlay__scrim" />
          <div className="via-glass-strong" role="group" aria-label="Demo de overlay">
            <h3>Confirmar inscrição?</h3>
            <p>
              Overlay usa o material mais denso: piso de 90% de branco com tinta navy e grão — o rodapé não
              acinzenta e o texto lê sobre qualquer fundo. O scrim ficou mais leve e mais desfocado.
            </p>
            <div className="gl-actions">
              <Button variant="ghost">Cancelar</Button>
              <Button variant="primary">Confirmar</Button>
            </div>
          </div>
        </div>
        <CodeBlock>{`/* Modal, Sheet, Drawer, Popover, menus, Select, Command, Toast,
   Tooltip e HoverCard já usam — em HTML cru: */
<div className="via-glass-strong">…</div>`}</CodeBlock>
        <Spec m="thick" utility=".via-glass-strong" />
      </Section>

      <Section title="Control" meta="pill · botão secundário · input">
        <div className="gl-photo" style={{ ...photo, backgroundPosition: 'center 70%' }}>
          <p className="gl-photo__label">Controles sobre fotografia</p>
          <div className="gl-row">
            <Button variant="secondary">Ver programação</Button>
            <Pill>inscrições abertas</Pill>
            <span className="via-liquid" style={{ padding: '7px 14px', fontSize: 'var(--via-fs-label)', fontWeight: 500, color: 'var(--via-text-primary)' }}>
              .via-liquid
            </span>
            <a className="via-pill-link" href="#control" onClick={(e) => e.preventDefault()}>.via-pill-link</a>
            <div style={{ width: 240 }}>
              <Input placeholder="Seu email" aria-label="Seu email (demo)" />
            </div>
          </div>
        </div>
        <p className="gl-hint">
          No escuro o botão secundário deixa de ser laje branca: vira controle escuro com aro e texto
          claro.
        </p>
        <Spec m="control" utility=".via-liquid · .via-pill-link" />
      </Section>

      <Section title="Acessibilidade de material" meta="automática nos tokens">
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--via-text-body)', lineHeight: 1.6 }}>
          <li><strong>Menos transparência</strong> (sistema): os 4 materiais viram superfície sólida, sem blur, sem grão; scrim vira cor chapada; a lente desliga.</li>
          <li><strong>Mais contraste</strong>: superfície sólida e ring de 40% (claro) / 45% (escuro).</li>
          <li><strong>Menos movimento</strong>: o reflexo que segue o ponteiro não liga; entradas viram fade.</li>
        </ul>
      </Section>
    </>
  );
}
