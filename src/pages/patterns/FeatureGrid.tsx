import { Clock, Zap, Users, Compass, ShieldCheck, Layers } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './feature-grid.css';

const feats = [
  { I: Clock, title: 'Operação', em: '24/7', desc: 'Superagentes em produção que respondem dia e noite sem dependência humana.' },
  { I: Zap, title: 'Resultado', em: 'mensurável', desc: 'Cada implementação tem KPI próprio. Sem demo bonita, sem relatório vago.' },
  { I: Users, title: 'Pequenos', em: 'grupos', desc: 'Turmas de até 24 pessoas com acompanhamento individual de implementação.' },
  { I: Compass, title: 'Orientação', em: 'estratégica', desc: 'Decisão de stack, modelagem de processo, definição de métrica.' },
  { I: ShieldCheck, title: 'Governança', em: 'séria', desc: 'Logs, custos, observabilidade, fallback humano. Tudo o que vai pra produção precisa.' },
  { I: Layers, title: 'Implementação', em: 'guiada', desc: 'Sessões de pareamento durante a turma. Você sai com pelo menos um agente vivo.' },
];

export default function FeatureGrid() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · grid de features"
        title={<>Ícone, headline, <em>uma linha</em>.</>}
        lede="Grid de 3 ou 6 features. Ícone Lucide num quadrado navy@06, headline Geist 20 com italic numa palavra, descrição Inter 12. Use para apresentar pilares ou capacidades — não confunda com cards de produto."
      />

      <Section title="3 colunas" meta="usado em hero ou meio de página">
        <div className="vds-feat-grid">
          {feats.slice(0, 3).map((f) => (
            <div key={f.em} className="vds-feat">
              <span className="ico"><f.I size={18} strokeWidth={2} /></span>
              <h3>{f.title} <em>{f.em}</em></h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="6 features · 2 fileiras" meta="manifesto longo">
        <div className="vds-feat-grid">
          {feats.map((f) => (
            <div key={f.em} className="vds-feat">
              <span className="ico"><f.I size={18} strokeWidth={2} /></span>
              <h3>{f.title} <em>{f.em}</em></h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
