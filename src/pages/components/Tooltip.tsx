import { Link2, Plus, Share2 } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './tooltip.css';

function Anchor({ tip, pos, icon: Icon, label }: { tip: string; pos: 'top' | 'bottom' | 'right'; icon: any; label: string }) {
  return (
    <div className="via-tt-item">
      <div className="via-tt-anchor">
        <span className={`via-tt ${pos}`}>{tip}</span>
        <Icon size={14} strokeWidth={2} />
      </div>
      <span className="via-tt-pos">{label}</span>
    </div>
  );
}

export default function Tooltip() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · tooltip"
        title={<>Navy escuro, <em>quase texto puro</em>.</>}
        lede="Tooltips são pílulas navy com texto branco, surgem em três posições (top, bottom, right) com seta apontando para o âncora. Cabe uma frase curta — se precisa de mais, é popover, não tooltip."
      />

      <Section title="3 posições" meta="hover · default 220ms">
        <div className="via-tt-stage">
          <Anchor pos="top" tip="Copiar link" icon={Link2} label="Top" />
          <Anchor pos="bottom" tip="Adicionar à coleção" icon={Plus} label="Bottom" />
          <Anchor pos="right" tip="Compartilhar" icon={Share2} label="Right" />
        </div>
      </Section>

      <Section title="Tokens" meta="anatomia">
        <table className="vds-token-table">
          <thead><tr><th>Token</th><th>Valor</th><th>Onde</th></tr></thead>
          <tbody>
            <tr><td className="tok">Background</td><td className="val">var(--via-navy)</td><td className="use">Pílula opaca, navy sólido</td></tr>
            <tr><td className="tok">Text</td><td className="val">var(--via-white) · 11px · 500</td><td className="use">Sentence case, sem ponto final</td></tr>
            <tr><td className="tok">Padding</td><td className="val">8 12</td><td className="use">Aperta no texto</td></tr>
            <tr><td className="tok">Radius</td><td className="val">8px</td><td className="use">Mais firme que pílula</td></tr>
            <tr><td className="tok">Offset</td><td className="val">10px do âncora</td><td className="use">Respiração</td></tr>
            <tr><td className="tok">Shadow</td><td className="val">navy 20% 32px</td><td className="use">Profundidade discreta</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
