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
        lede="Cards default em fundo branco com border navy@12, radius 20px, padding 24–28px. Hover levanta com sombra navy-tinted. A variante glass é só para superfícies onde o vidro faz sentido."
      />

      <Section title="Default · light" meta="hairline + hover lift">
        <div className="via-card-grid">
          <article className="via-card">
            <p className="vds-eyebrow">Mentoria · turma 2026.2</p>
            <h3>16 semanas com Caio</h3>
            <p className="body">Sessões ao vivo + acompanhamento individual de implementação. Sai com pelo menos um Superagente em produção.</p>
            <a className="link">Saber mais <ArrowUpRight size={14} strokeWidth={2.5} /></a>
          </article>
          <article className="via-card">
            <p className="vds-eyebrow">Case · Efizi</p>
            <h3>+11.920 conversas analisadas</h3>
            <p className="body">Análise automática de WhatsApp em 90 dias. Receita por canal mapeada pela primeira vez.</p>
            <a className="link">Ler case <ArrowUpRight size={14} strokeWidth={2.5} /></a>
          </article>
          <article className="via-card featured">
            <p className="vds-eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Featured · destaque</p>
            <h3 style={{ color: 'var(--via-white)' }}>O DS em produto</h3>
            <p className="body" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Páginas-modelo navegáveis mostrando tudo aplicado ao vivo. Marketing site, Leaders AI, área do aluno.
            </p>
            <a className="link" style={{ color: 'var(--via-white)' }}>Ver <ArrowUpRight size={14} strokeWidth={2.5} /></a>
          </article>
        </div>
      </Section>

      <Section title="Stat card · glass" meta="hero use">
        <div className="via-card-stat-stage">
          <div className="via-card-stat">
            <MessageCircle size={14} strokeWidth={2} style={{ color: 'var(--via-gray-500)' }} />
            <p className="vds-eyebrow">Conversas analisadas</p>
            <div className="num">+11.920</div>
            <p className="sub"><em>Efizi</em> · 90 dias</p>
          </div>
          <div className="via-card-stat">
            <TrendingUp size={14} strokeWidth={2} style={{ color: 'var(--via-gray-500)' }} />
            <p className="vds-eyebrow">Economia recorrente</p>
            <div className="num">R$ 4.600<span className="suffix">/mês</span></div>
            <p className="sub"><em>Balzani &amp; Zimbel</em></p>
          </div>
        </div>
      </Section>
    </>
  );
}
