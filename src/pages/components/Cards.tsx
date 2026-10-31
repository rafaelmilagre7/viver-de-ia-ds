import { ArrowUpRight, TrendingUp, MessageCircle } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './cards.css';

export default function Cards() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · cards"
        title={<>Hairline, <em>radius 20</em>, padding generoso.</>}
        lede="Cards default em vidro sobre o papel do tema — hairline, radius 20px, padding 26px. Hover levanta com sombra de tinta, que vira preto no escuro. O stat card sobre navy é só para superfícies onde o vidro claro faz sentido."
      />

      <Section title="Default · adaptativo" meta="hairline + hover lift">
        <div className="via-card-grid">
          <article className="via-card">
            <p className="vds-eyebrow">Plano Pro · mentoria em grupo</p>
            <h3>10 check-ins por mês</h3>
            <p className="body">Mentorias em grupo ao vivo pra tirar dúvidas e adaptar as soluções prontas à sua operação.</p>
            <a className="link">Saber mais <ArrowUpRight size={16} strokeWidth={1.75} /></a>
          </article>
          <article className="via-card">
            <p className="vds-eyebrow">Case · Trivia Studio</p>
            <h3>R$ 120.000 de economia anual</h3>
            <p className="body">De processos manuais à produção de conteúdo em escala. Case real publicado em viverdeia.ai/cases.</p>
            <a className="link">Ler case <ArrowUpRight size={16} strokeWidth={1.75} /></a>
          </article>
          <article className="via-card featured">
            <p className="vds-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Featured · destaque</p>
            <h3 style={{ color: 'var(--via-white)' }}>O DS em produto</h3>
            <p className="body" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Páginas-modelo navegáveis mostrando tudo aplicado ao vivo. Marketing site, Leaders AI, área do aluno.
            </p>
            <a className="link" style={{ color: 'var(--via-white)' }}>Ver <ArrowUpRight size={16} strokeWidth={1.75} /></a>
          </article>
        </div>
      </Section>

      <Section title="Stat card · glass" meta="hero use">
        <div className="via-card-stat-stage">
          <div className="via-card-stat">
            <MessageCircle size={16} strokeWidth={1.75} style={{ color: 'var(--via-text-muted)' }} />
            <p className="vds-eyebrow">Atendimento com IA</p>
            <div className="num">24h</div>
            <p className="sub"><em>Pasetti Viagens &amp; AGX</em> · turismo</p>
          </div>
          <div className="via-card-stat">
            <TrendingUp size={16} strokeWidth={1.75} style={{ color: 'var(--via-text-muted)' }} />
            <p className="vds-eyebrow">Economia recorrente</p>
            <div className="num">R$ 2.000<span className="suffix">/mês</span></div>
            <p className="sub"><em>Assessoria MAP</em></p>
          </div>
        </div>
      </Section>
    </>
  );
}
