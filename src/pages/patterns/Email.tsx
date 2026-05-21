import { ArrowRight, Star, Trash2, Reply, MoreHorizontal, Users, TrendingUp, MessageCircle, CheckCircle2 } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import monogram from '../../assets/logos/VIA_monogram_hq.png';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './email.css';

function ClientChrome({ from, subject, time, children }: { from: string; subject: string; time: string; children: React.ReactNode }) {
  return (
    <div className="vds-email-client">
      <header className="vds-email-toolbar">
        <div className="vds-email-toolbar-l">
          <button aria-label="Responder"><Reply size={14} strokeWidth={2} /></button>
          <button aria-label="Favoritar"><Star size={14} strokeWidth={2} /></button>
          <button aria-label="Excluir"><Trash2 size={14} strokeWidth={2} /></button>
        </div>
        <button aria-label="Mais opções"><MoreHorizontal size={14} strokeWidth={2} /></button>
      </header>
      <div className="vds-email-meta">
        <div className="vds-email-from">
          <span className="av"><img src={monogram} alt="" /></span>
          <div>
            <strong>{from}</strong>
            <span>para você</span>
          </div>
        </div>
        <span className="vds-email-time">{time}</span>
      </div>
      <h2 className="vds-email-subject">{subject}</h2>
      <div className="vds-email-body">{children}</div>
    </div>
  );
}

export default function Email() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · email"
        title={<>Email de <em>altíssimo padrão</em> editorial.</>}
        lede="Três templates oficiais — transactional (confirmação), marketing (announcement) e newsletter (curatorial). Logo composta (monograma VIA + wordmark) no header, plate atmosférica navy no hero, cards liquid glass internos pra stats e features. Geist em toda hierarquia. CTA pílula navy. Largura clássica de email 600px."
      />

      <Section title="Transactional · confirmação de inscrição" meta="light + glass stats">
        <ClientChrome from="Viver de IA · Equipe" subject="Sua inscrição na turma 2026.2 foi confirmada" time="quarta · 19:42">
          <div className="vds-email-template light">
            <header className="hdr">
              <BrandLogo variant="black" size="md" />
              <span className="hdr-tag">CONFIRMAÇÃO · TURMA 2026.2</span>
            </header>

            {/* Hero atmosférico navy */}
            <div className="hero-plate">
              <span className="ico"><CheckCircle2 size={20} strokeWidth={1.8} /></span>
              <p className="lbl">Sua vaga está garantida</p>
              <h1>Rafael, vamos<br /><em>operar juntos</em>.</h1>
            </div>

            <div className="cnt">
              <p className="lede">
                Recebemos seu pagamento e sua inscrição na <strong>turma 2026.2</strong> está
                confirmada. As sessões começam em <strong>05 de agosto</strong>, sempre às
                quartas, 19:30. Por aqui, em PT-BR, sem ruído.
              </p>

              {/* Stats em liquid glass */}
              <div className="glass-stats">
                <div className="g-card">
                  <span className="g-lbl">Turma</span>
                  <span className="g-val">2026.2</span>
                  <span className="g-sub">Brasil · remoto</span>
                </div>
                <div className="g-card">
                  <span className="g-lbl">Início</span>
                  <span className="g-val">05 ago</span>
                  <span className="g-sub">quarta · 19:30</span>
                </div>
                <div className="g-card">
                  <span className="g-lbl">Duração</span>
                  <span className="g-val">16 sem</span>
                  <span className="g-sub">ao vivo + 1-a-1</span>
                </div>
              </div>

              <a className="cta">
                Acessar o painel do aluno
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>

              <div className="ps-card">
                <p className="ps-eyebrow">Próximos passos</p>
                <ul>
                  <li><span>1.</span> Link da primeira sessão chega aqui na terça anterior.</li>
                  <li><span>2.</span> Larissa fica na pasta — qualquer dúvida, responde este e-mail.</li>
                  <li><span>3.</span> Material de pré-leitura no painel a partir de hoje.</li>
                </ul>
              </div>
            </div>

            <footer className="ftr">
              <div className="ftr-brand">
                <BrandLogo variant="black" size="sm" />
              </div>
              <p className="ftr-line">São Paulo · Estabelecida 2023 · <a>viverdeia.ai</a></p>
              <p className="ftr-meta">Você recebeu porque se inscreveu na turma 2026.2. <a>Preferências</a> · <a>Sair da lista</a></p>
            </footer>
          </div>
        </ClientChrome>
      </Section>

      <Section title="Marketing · announcement turma" meta="dark variant · glass cards">
        <ClientChrome from="Viver de IA" subject="Turma 2026.2 — últimas 8 vagas" time="terça · 09:12">
          <div className="vds-email-template dark">
            <header className="hdr">
              <BrandLogo variant="white" size="md" />
              <span className="hdr-tag">TURMA 2026.2 · INSCRIÇÕES ABERTAS</span>
            </header>

            <div className="hero-plate dark">
              <span className="ico-dark"><img src={monogramWhite} alt="" /></span>
              <p className="lbl">Mentoria de operadores</p>
              <h1>De hipótese a agente<br /><em>em produção, em 16 semanas</em>.</h1>
              <p className="lede">
                Sessões ao vivo com Caio, acompanhamento individual de implementação e acesso
                aos 206 cases publicados. Você sai com pelo menos um Superagente medido em
                receita ou economia.
              </p>
            </div>

            <div className="cnt">
              {/* Features em glass dark */}
              <div className="glass-feats">
                <div className="f-card">
                  <span className="f-ico"><Users size={16} strokeWidth={1.8} /></span>
                  <h3>Pequenos grupos</h3>
                  <p>Turma de até 24 com acompanhamento 1-a-1.</p>
                </div>
                <div className="f-card">
                  <span className="f-ico"><TrendingUp size={16} strokeWidth={1.8} /></span>
                  <h3>Resultado mensurável</h3>
                  <p>Cada implementação tem KPI próprio — receita ou economia.</p>
                </div>
                <div className="f-card">
                  <span className="f-ico"><MessageCircle size={16} strokeWidth={1.8} /></span>
                  <h3>Comunidade ativa</h3>
                  <p>Acesso ao grupo de operadores formados pela mentoria.</p>
                </div>
              </div>

              <div className="urgency">
                <span>Próximas <strong>8 vagas</strong> · encerra em <strong>12 dias</strong></span>
              </div>

              <a className="cta">
                Garantir minha vaga
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>

              <div className="quote-card">
                <p>"Aqui eu consigo ver rapidamente onde estou perdendo venda, onde posso subir margem e onde preciso agir primeiro."</p>
                <div className="quote-attr">
                  <span className="av">GD</span>
                  <div>
                    <strong>Guilherme Delorenzo</strong>
                    <span>Founder · Efizi</span>
                  </div>
                </div>
              </div>
            </div>

            <footer className="ftr">
              <div className="ftr-brand">
                <BrandLogo variant="white" size="sm" />
              </div>
              <p className="ftr-line">São Paulo · Estabelecida 2023 · <a>viverdeia.ai</a></p>
              <p className="ftr-meta">Você recebeu porque baixou um material da Viver de IA. <a>Preferências</a> · <a>Sair</a></p>
            </footer>
          </div>
        </ClientChrome>
      </Section>

      <Section title="Newsletter · curatorial de cases" meta="quinzenal · glass case cards">
        <ClientChrome from="Viver de IA · Editorial" subject="3 cases novos · receita atrelada a operação 24/7" time="sexta · 07:30">
          <div className="vds-email-template light">
            <header className="hdr">
              <BrandLogo variant="black" size="md" />
              <span className="hdr-tag">CASES · SEMANA 23</span>
            </header>

            <div className="hero-plate">
              <span className="ico"><TrendingUp size={20} strokeWidth={1.8} /></span>
              <p className="lbl">Curatorial editorial</p>
              <h1>Três operadores<br /><em>viraram operação em receita</em>.</h1>
            </div>

            <div className="cnt">
              <p className="lede">
                Cada case dessa quinzena foi publicado depois de validação de métrica com o
                operador — número e contexto na mesma frase, sem fluff editorial.
              </p>

              {/* Cases em glass cards */}
              <div className="glass-cases">
                <article>
                  <header>
                    <span className="sector">E-commerce</span>
                    <span className="stat">+11.920</span>
                  </header>
                  <h3>Efizi: conversas analisadas em 90 dias</h3>
                  <p>Análise automática de WhatsApp em pipeline. Receita por canal mapeada pela primeira vez.</p>
                  <a>Ler case completo →</a>
                </article>
                <article>
                  <header>
                    <span className="sector">Construção</span>
                    <span className="stat">R$ 4.600<em>/mês</em></span>
                  </header>
                  <h3>Balzani & Zimbel: economia recorrente</h3>
                  <p>CRM próprio, 6 ferramentas internalizadas. Operação centralizada num único agente.</p>
                  <a>Ler case completo →</a>
                </article>
                <article>
                  <header>
                    <span className="sector">Seguros</span>
                    <span className="stat">24/7</span>
                  </header>
                  <h3>Comparar Seguro: para vendas e operação</h3>
                  <p>Atendimento ininterrupto sem dependência humana. Conversão noturna recuperada.</p>
                  <a>Ler case completo →</a>
                </article>
              </div>

              <a className="cta">
                Ver todos os 206 cases publicados
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </div>

            <footer className="ftr">
              <div className="ftr-brand">
                <BrandLogo variant="black" size="sm" />
              </div>
              <p className="ftr-line">Editorial · curatorial quinzenal · <a>viverdeia.ai</a></p>
              <p className="ftr-meta">Você assinou a newsletter. <a>Preferências</a> · <a>Sair</a></p>
            </footer>
          </div>
        </ClientChrome>
      </Section>
    </>
  );
}
