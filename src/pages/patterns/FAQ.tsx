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
        lede="FAQ editorial — categorias laterais navegáveis, busca instantânea no topo, acordeões com pergunta em display Geist e resposta em prosa. Bar lateral navy no item ativo. Sem o FAQ canônico chato — cada bloco com peso de marca."
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
    { id: 'mentoria', label: 'Mentoria 1:1', icon: Users, count: 5 },
    { id: 'conteudo', label: 'Conteúdo & aulas', icon: BookOpen, count: 7 },
    { id: 'comunidade', label: 'Comunidade', icon: MessageCircle, count: 4 },
    { id: 'seguranca', label: 'Segurança & dados', icon: ShieldCheck, count: 3 },
  ];

  const questions = [
    {
      id: 'q1',
      q: 'Em quanto tempo recebo acesso depois da inscrição?',
      a: 'Imediato — assim que o pagamento é confirmado pelo gateway, a conta é criada e você recebe um e-mail com o link de primeira sessão. Cartão de crédito confirma na hora; PIX leva entre 2 e 30 minutos dependendo do banco.',
      tag: 'mais frequente',
    },
    {
      id: 'q2',
      q: 'Posso fazer o curso no meu próprio ritmo?',
      a: 'Pode e deve. Cada turma tem um cronograma sugerido de 12 semanas, mas as aulas ficam disponíveis no seu painel pra sempre. A maioria dos alunos termina entre 8 e 16 semanas.',
    },
    {
      id: 'q3',
      q: 'Preciso saber programar pra participar?',
      a: 'Não. A maioria das ferramentas que a gente usa (Nina, ChatGPT, n8n, Make) é no-code ou low-code. Saber Python ajuda em algumas aulas avançadas, mas tem um trilho de "começar do zero" que cobre o necessário.',
    },
    {
      id: 'q4',
      q: 'O que diferencia a Viver de IA de outros cursos?',
      a: 'Três coisas — mentoria 1:1 com Caio Ribeiro, comunidade ativa com 218+ empresas em produção, e currículo atualizado a cada trimestre conforme a tecnologia evolui. Não é curso assinado e esquecido.',
    },
    {
      id: 'q5',
      q: 'Tem suporte se eu travar em alguma aula?',
      a: 'Sim — Discord da turma com resposta média em 4h (mentores monitoram diariamente), além das sessões de mentoria 1:1 a cada 2 semanas no plano Mentoria.',
    },
  ];

  return (
    <Section title="FAQ premium · busca + categorias + acordeão" meta="layout 2 colunas · busca instantânea no topo · 5 questões inline">
      <article className="vds-faq">
        <header className="vds-faq-head">
          <div className="vds-faq-search">
            <Search size={14} strokeWidth={2} />
            <input placeholder="O que você quer saber? · ex: 'como cancelar', 'mentoria 1:1'…" />
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
                        <Icon size={13} strokeWidth={1.8} />
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
                      {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="vds-faq-a">
                      <p>{item.a}</p>
                      <footer>
                        <button className="vds-faq-feedback">Foi útil?</button>
                        <a href="#" className="vds-faq-more">
                          Ver pergunta no help center
                          <ArrowRight size={11} strokeWidth={2.4} />
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
            Time tirando dúvida ativo seg—sex 9h—19h BRT. Tempo médio de resposta: <strong>14 minutos</strong>. Fora desse horário, a Nina cobre o básico e a gente responde no Discord no dia seguinte.
          </p>
        </div>
        <div className="vds-faq-contact-actions">
          <a href="#" className="vds-faq-contact-btn primary">
            <MessageCircle size={13} strokeWidth={2.2} />
            Conversar agora
          </a>
          <a href="#" className="vds-faq-contact-btn ghost">
            Email: time@viverdeia.ai
          </a>
          <a href="#" className="vds-faq-contact-btn ghost">
            Discord aberto · #ajuda
          </a>
        </div>
      </article>
    </Section>
  );
}
