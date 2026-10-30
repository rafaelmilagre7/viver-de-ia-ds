import { Link } from 'react-router-dom';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Card } from '../../lib/Card/Card';
import { tokens } from '../../lib/tokens';
import DraggableGlass from './DraggableGlass';
import './glass.css';

/* ══════════════════════════════════════════════════════════════════════
   FONTE ÚNICA
   O hero usa o <Card variant="glass"> de produto (material regular) com a
   lente opt-in, e os blocos de código leem os valores de `tokens` — gerado
   de src/styles/tokens.css. A página não consegue ensinar um valor e
   renderizar outro: os dois vêm do mesmo arquivo.
   ══════════════════════════════════════════════════════════════════════ */
const t = (name: string) => tokens[name as keyof typeof tokens] ?? '';
const pretty = (v: string) => v.replace(/url\("data:[^"]+"\)/, 'var(--via-grain)').replace(/\s+/g, ' ').replace(/, (?=(linear|radial|inset|0 |var))/g, ',\n    ');

const MATERIALS = [
  { id: 'chrome', where: 'header, sidebar, tab bar', why: 'translúcido de verdade · o conteúdo passa desfocado' },
  { id: 'regular', where: 'card e painel no conteúdo', why: 'piso de leitura pra texto' },
  { id: 'thick', where: 'Modal, Sheet, Drawer, Popover, menus, Select, Command, Toast, Tooltip', why: 'flutua por cima de tudo · piso ≥ .90 + grão' },
  { id: 'control', where: 'pill, botão secundário, input, segmented', why: 'peça pequena e tocável sobre vidro' },
] as const;

/* Nome de token dentro da prosa (monospace + cor de título, sem chip). */
function Tok({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--via-font-mono)', fontSize: '0.92em', color: 'var(--via-text-primary)', whiteSpace: 'nowrap' }}>
      {children}
    </code>
  );
}

export default function GlassAnatomy() {
  return (
    <>
      <DocsHeader
        eyebrow="Liquid Glass · anatomia"
        title={
          <>
            Quatro materiais, <em>um</em> vidro.
          </>
        }
        lede="Vidro líquido não é um blur solto: é um material escolhido pela elevação da peça — chrome, regular, thick ou control. Cada um junta cinco partes: fill, blur, ring, aro especular e sombra. No escuro ele não inverte: vira uma camada que escurece o que passa por trás, com piso de leitura."
      />

      <Section title="Arraste o vidro" meta="conteúdo real por trás">
        <div className="gl-hero">
          <div className="gl-hero__page" aria-hidden="true">
            <div>
              <p className="gl-hero__title">Vidro que lê sobre qualquer fundo.</p>
              <p className="gl-hero__lede">
                Esta é uma página de verdade: título, números e um gráfico. O vidro passa por cima — o
                fundo desfoca, o texto do vidro continua com leitura.
              </p>
              <div className="gl-hero__metrics">
                <div><strong>46</strong><span>componentes</span></div>
                <div><strong>4</strong><span>materiais</span></div>
                <div><strong>2</strong><span>temas</span></div>
              </div>
            </div>
            <div className="gl-hero__chart">
              {[42, 58, 36, 74, 66, 88, 54, 92, 70, 96].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <DraggableGlass initial={{ left: '54%', top: '16%' }} label="Card de vidro">
            <Card variant="glass" hoverable className="via-glass--lens">
              <p className="vds-eyebrow">Material regular</p>
              <h3>Arraste o vidro.</h3>
              <p>
                Fill com piso de leitura, blur saturado, ring hairline, aro especular e sombra em
                camadas. Passe o mouse: o reflexo segue o ponteiro.
              </p>
            </Card>
          </DraggableGlass>
        </div>
        <p className="gl-hint">
          No Chrome/Edge o vidro ganha a <strong>lente</strong>: a borda dobra o que passa por baixo
          (opt-in, <Tok>.via-glass--lens</Tok>). Safari e Firefox ficam com o blur normal do material —
          mesma leitura, sem a refração.
        </p>
      </Section>

      <Section title="As 5 partes do material" meta="valores lidos de tokens.css">
        <ol className="ga-layers" style={{ marginTop: 8, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>1 · Fill com piso</h4>
              <p>
                Branco forte no topo, nunca abaixo do piso de leitura na base — e uma tinta navy de 2% por
                baixo, pra o vidro sobre foto escura ficar azulado, não cinza-plástico. O thick (overlays)
                ainda leva grão de 2-3%. No escuro o fill é navy denso (.80 → .86): o vidro{' '}
                <strong>escurece</strong> o que passa atrás.
              </p>
            </div>
            <CodeBlock>{`background: var(--via-material-regular-fill);
/* = ${pretty(t('via-material-regular-fill'))} */`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>2 · Blur saturado</h4>
              <p>
                O desfoque separa o vidro do fundo; a saturação é o sabor da marca. No escuro entra{' '}
                <Tok>brightness(.75)</Tok> e a saturação desce: fundo movimentado não atravessa o texto.
                Sempre com o prefixo <Tok>-webkit-</Tok> primeiro — na ordem inversa o minificador apaga o
                vidro.
              </p>
            </div>
            <CodeBlock>{`-webkit-backdrop-filter: var(--via-material-regular-blur);
backdrop-filter: var(--via-material-regular-blur);
/* claro = ${t('via-material-regular-blur')} */`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>3 · Ring hairline</h4>
              <p>
                1px navy de 9% no claro, branco de 8% no escuro. É o ring que desenha a borda sobre página
                branca — onde o vidro não tem o que refletir. No alto contraste do sistema ele sobe pra 40%
                sozinho.
              </p>
            </div>
            <CodeBlock>{`border: var(--via-material-regular-ring);
/* = ${t('via-material-regular-ring')} */
border-radius: var(--via-radius-lg);   /* 20px */`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>4 · Aro especular</h4>
              <p>
                O que faz parecer vidro e não plástico: um gradiente pintado só no anel de 1px — forte no
                canto de cima à esquerda, some no meio da lateral, volta fraco na base. Fica por dentro do
                ring: sobre branco quem aparece é o ring, sobre foto quem acende é o aro.
              </p>
            </div>
            <CodeBlock>{`.peca { position: relative; }
.peca::after {
  content: ''; position: absolute; inset: 0;
  padding: 1px; border-radius: inherit;
  background: var(--via-material-regular-rim);
  -webkit-mask: var(--via-rim-mask);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}`}</CodeBlock>
          </li>
          <li className="vds-callout">
            <div className="vds-callout-info">
              <h4>5 · Sombra em camadas</h4>
              <p>
                Brilho interno macio no topo, linha de tinta de 1px na base e o drop em{' '}
                <Tok>--via-shadow-ink-*</Tok> — navy no claro, preto no escuro. Nunca{' '}
                <Tok>--via-navy-*</Tok> numa sombra: no escuro ele vira halo branco.
              </p>
            </div>
            <CodeBlock>{`box-shadow: var(--via-material-regular-shadow);
/* hover: var(--via-material-regular-lift) */`}</CodeBlock>
          </li>
        </ol>
      </Section>

      <Section title="Escolha pelo nível, não pelo gosto" meta="4 materiais">
        <div style={{ overflowX: 'auto' }}>
          <table className="vds-token-table gl-spec">
            <thead>
              <tr>
                <th style={{ width: '14%' }}>Material</th>
                <th style={{ width: '34%' }}>Onde</th>
                <th>Blur (claro)</th>
                <th>Por quê</th>
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map((m) => (
                <tr key={m.id}>
                  <td className="tok">{m.id}</td>
                  <td className="use">{m.where}</td>
                  <td className="val">{t(`via-material-${m.id}-blur`)}</td>
                  <td className="use">{m.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="gl-hint">
          Os nomes antigos continuam valendo como apelido: <Tok>--via-glass-card</Tok> e{' '}
          <Tok>--via-glass-blur</Tok> = regular, <Tok>--via-glass-bar</Tok> e{' '}
          <Tok>--via-glass-blur-bar</Tok> = chrome. Os 4 materiais lado a lado, em contexto, estão em{' '}
          <Link to="/glass/variants">Variantes</Link>.
        </p>
      </Section>

      <Section title="Quando usar" meta="restrição é a estética">
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Sim</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Nav sticky (chrome), card de destaque e stat sobre fotografia (regular), modal, menu e
              toast (thick), pill e botão secundário sobre vidro ou foto (control).
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Não</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: 0, lineHeight: 1.55 }}>
              Tabela densa (o DataTable é sólido de propósito), vidro dentro de vidro, card comum sobre
              página branca lisa (use o Card padrão, que é papel), blur à mão com números soltos.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
