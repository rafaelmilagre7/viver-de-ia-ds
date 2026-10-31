import { useState } from 'react';
import {
  Search, Plus, Minus, MessageCircle, ArrowRight,
  Compass, CreditCard, BookOpen, Users, ShieldCheck,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './faq.css';

export default function FAQ() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · FAQ"
        title={
          <>
            Perguntas frequentes, <em>respondidas com cuidado</em>.
          </>
        }
        lede="FAQ editorial — categorias laterais navegáveis, busca instantânea no topo, acordeões com pergunta em display Geist e resposta em prosa. Anel navy fino no item ativo. Sem o FAQ canônico chato — cada bloco com peso de marca."
      />

      <FAQPremiumSection />
      <FAQContactSection />
    </>
  );
}

function FAQPremiumSection() {
  const [openId, setOpenId] = useState<string>('q1');
  const [activeCat, setActiveCat] = useState<string>('comecar');

  const categories = [
    { id: 'comecar', label: 'Começando', icon: Compass, count: 8 },
    { id: 'plano', label: 'Plano & pagamento', icon: CreditCard, count: 6 },
    { id: 'mentoria', label: 'Mentoria ao vivo', icon: Users, count: 5 },
    { id: 'conteudo', label: 'Formações & soluções', icon: BookOpen, count: 7 },
    { id: 'comunidade', label: 'Comunidade', icon: MessageCircle, count: 4 },
    { id: 'seguranca', label: 'Segurança & dados', icon: ShieldCheck, count: 3 },
  ];

  const questions = [
    {
      id: 'q1',
      q: 'Em quanto tempo recebo acesso depois da adesão?',
      a: 'Assim que a adesão é confirmada, a conta é criada e você recebe um e-mail com o link da trilha de onboarding. [Prazo de liberação e formas de pagamento conforme contrato.]',
      tag: 'mais frequente',
    },
    {
      id: 'q2',
      q: 'Cada pessoa do time segue o próprio ritmo?',
      a: 'Sim. A trilha personalizada com IA adapta o conteúdo ao nível de cada colaborador, do CEO ao analista. As equipes começam a implementar soluções já na primeira semana.',
    },
    {
      id: 'q3',
      q: 'Preciso saber programar pra participar?',
      a: 'Não. As soluções são plug and play, sem necessidade de programação. Alfabetizamos antes de automatizar: a trilha de onboarding cobre o necessário pra quem começa do zero.',
    },
    {
      id: 'q4',
      q: 'O que diferencia a Viver de IA de um curso?',
      a: 'Curso avulso ensina teoria e para por aí. A Viver de IA é uma plataforma de alfabetização e aplicação — 157 soluções prontas, formações práticas, mentorias ao vivo e 521 cases reais de implementação.',
    },
    {
      id: 'q5',
      q: 'Tem apoio se o time travar numa solução?',
      a: 'Sim — o Consultor IA dentro da plataforma, 24/7, e a comunidade. No Pro, 10 check-ins por mês de mentoria em grupo; no Enterprise, também 1 hora por mês de mentoria individual.',
    },
  ];

  return (
    <Section title="FAQ premium · busca + categorias + acordeão" meta="layout 2 colunas · busca instantânea no topo · 5 questões inline">
      <article className="vds-faq">
        <header className="vds-faq-head">
          <div className="vds-faq-search">
            <Search size={16} strokeWidth={1.75} />
            <input placeholder="O que você quer saber? · ex: 'como cancelar', 'mentoria em grupo'…" />
            <span className="vds-faq-search-shortcut mono">⌘ K</span>
          </div>
          <p className="vds-faq-help">
            <strong>33 perguntas</strong> respondidas pela equipe · não achou? <a href="#contact">fala direto com a gente</a>.
          </p>
        </header>

        <div className="vds-faq-grid">
          {/* Sidebar — categories */}
          <aside className="vds-faq-cats">
            <p className="vds-faq-cats-eyebrow">Categorias</p>
            <ul>
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.id} className={c.id === activeCat ? 'on' : ''}>
                    <button onClick={() => setActiveCat(c.id)}>
                      <span className="vds-faq-cat-icon">
                        <Icon size={14} strokeWidth={1.75} />
                      </span>
                      <span className="vds-faq-cat-label">{c.label}</span>
                      <span className="vds-faq-cat-count mono">{c.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Questions list */}
          <ul className="vds-faq-questions">
            {questions.map((item) => {
              const isOpen = item.id === openId;
              return (
                <li key={item.id} className={`vds-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="vds-faq-q"
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                  >
                    <div className="vds-faq-q-text">
                      {item.tag && <span className="vds-faq-q-tag">{item.tag}</span>}
                      <h4>{item.q}</h4>
                    </div>
                    <span className="vds-faq-q-icon">
                      {isOpen ? <Minus size={16} strokeWidth={1.75} /> : <Plus size={16} strokeWidth={1.75} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="vds-faq-a">
                      <p>{item.a}</p>
                      <footer>
                        <button className="vds-faq-feedback">Foi útil?</button>
                        <a href="#" className="vds-faq-more">
                          Ver pergunta no help center
                          <ArrowRight size={14} strokeWidth={1.75} />
                        </a>
                      </footer>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </Section>
  );
}

function FAQContactSection() {
  return (
    <Section title="Não achou? · fallback contact" meta="banner inline com voz da marca e 3 caminhos">
      <article className="vds-faq-contact via-mesh-navy via-noise">
        <div className="vds-faq-contact-body">
          <span className="vds-faq-contact-eyebrow">Ainda na dúvida?</span>
          <h3>
            A gente <em>responde de verdade</em> — não bot.
          </h3>
          <p>
            Time tirando dúvida em <strong>[horário de atendimento]</strong>. Fora desse horário, o Consultor IA cobre o básico na plataforma e a gente retoma no próximo horário de atendimento.
          </p>
        </div>
        <div className="vds-faq-contact-actions">
          <a href="#" className="vds-faq-contact-btn primary">
            <MessageCircle size={16} strokeWidth={1.75} />
            Conversar agora
          </a>
          <a href="#" className="vds-faq-contact-btn ghost">
            Email: [email de contato]
          </a>
          <a href="#" className="vds-faq-contact-btn ghost">
            Comunidade · #ajuda
          </a>
        </div>
      </article>
    </Section>
  );
}
