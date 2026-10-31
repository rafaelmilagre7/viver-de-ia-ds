import { useState, type ReactNode } from 'react';
import {
  ArrowRight, Calendar, CheckCircle2, MessageCircle, AlertCircle,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import monogram from '../../assets/logos/VIA_monogram_hq.png';
import './email-coverage.css';

/* ============================================================
   Email coverage · 13 templates editoriais cobrindo TUDO que VIA produz
   ============================================================ */

interface EmailFrameProps {
  from: string;
  subject: string;
  preview: string;
  time: string;
  category: string;
  children: ReactNode;
  notes: { when: string; voice: string; vars?: string[] };
}

function EmailFrame({ from, subject, preview, time, category, children, notes }: EmailFrameProps) {
  return (
    <article className="vds-ec-card">
      <header className="vds-ec-meta">
        <span className="vds-ec-category">{category}</span>
        <div className="vds-ec-subject-line">
          <strong className="vds-ec-from">{from}</strong>
          <span className="vds-ec-time mono">{time}</span>
        </div>
        <h3 className="vds-ec-subject">{subject}</h3>
        <p className="vds-ec-preview">{preview}</p>
      </header>

      <div className="vds-ec-frame">{children}</div>

      <footer className="vds-ec-notes">
        <div className="vds-ec-note">
          <span className="lbl">Quando enviar</span>
          <p>{notes.when}</p>
        </div>
        <div className="vds-ec-note">
          <span className="lbl">Voz</span>
          <p>{notes.voice}</p>
        </div>
        {notes.vars && (
          <div className="vds-ec-note">
            <span className="lbl">Variáveis</span>
            <p className="mono">{notes.vars.join(' · ')}</p>
          </div>
        )}
      </footer>
    </article>
  );
}

function EmailHeader() {
  return (
    <header className="vds-ec-em-hdr">
      <BrandLogo variant="black" size="sm" />
    </header>
  );
}

function EmailFooter({ unsubscribe = true }: { unsubscribe?: boolean }) {
  return (
    <footer className="vds-ec-em-foot">
      <img src={monogram} alt="" className="mono" />
      <p>
        <strong>Viver de IA</strong> · tirar a IA do discurso e colocar em operação
      </p>
      {unsubscribe && (
        <p className="vds-ec-em-foot-links">
          <a href="#">Atualizar preferências</a>
          <span>·</span>
          <a href="#">Não quero mais</a>
        </p>
      )}
    </footer>
  );
}

export default function EmailCoverage() {
  const [activeTab, setActiveTab] = useState<string>('transactional');

  const categories = [
    { id: 'transactional', label: 'Transacional', count: 3 },
    { id: 'editorial', label: 'Editorial', count: 3 },
    { id: 'concierge', label: 'Concierge', count: 2 },
    { id: 'commercial', label: 'Comercial', count: 3 },
    { id: 'lifecycle', label: 'Lifecycle', count: 2 },
  ];

  return (
    <>
      <DocsHeader
        eyebrow="Padrões · email coverage"
        title={
          <>
            13 templates de email <em>cobrindo todo o ciclo</em>.
          </>
        }
        lede="Welcome, billing, churn, weekly digest, urgent ops, drip, event invite, recap, lançamento, NPS, oferta, win-back. Cada um com subject editorial (sem 'Olá', sem emoji, sem urgência fabricada), body em voz certa pro contexto, e notas de aplicação. Tudo navegável + copy-paste."
      />

      <nav className="vds-ec-nav">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`vds-ec-nav-btn ${activeTab === c.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(c.id)}
          >
            {c.label}
            <span className="mono">{c.count}</span>
          </button>
        ))}
      </nav>

      {activeTab === 'transactional' && <TransactionalSection />}
      {activeTab === 'editorial' && <EditorialSection />}
      {activeTab === 'concierge' && <ConciergeSection />}
      {activeTab === 'commercial' && <CommercialSection />}
      {activeTab === 'lifecycle' && <LifecycleSection />}
    </>
  );
}

/* ---------- Transacional · 3 templates ---------- */
function TransactionalSection() {
  return (
    <>
      <Section
        title="Welcome · primeiro contato após inscrição"
        meta="caloroso-operacional · ação concreta no fim"
      >
        <EmailFrame
          category="Transacional · welcome"
          from="Rafael · Viver de IA"
          subject="Boas-vindas. Próximos passos em 3 atos."
          preview="sua adesão ao plano Pro tá confirmada. antes do primeiro check-in, faz isso aqui pra entrar no ritmo."
          time="hoje · 09:14"
          notes={{
            when: 'Imediatamente após confirmação de pagamento',
            voice: 'caloroso, mas factual · “você” infinitivo · primeira frase entrega o assunto',
            vars: ['{membro_first_name}', '{plano_nome}', '{onboarding_start_date}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p className="vds-ec-em-greet">
              Oi <strong>Rafael</strong>,
            </p>
            <p>
              sua adesão ao plano Pro tá confirmada. a trilha de onboarding já tá liberada, e
              tem <strong>3 coisas</strong> que se você fizer essa semana, entra no ritmo sem
              perder o primeiro check-in.
            </p>

            <ol className="vds-ec-em-steps">
              <li>
                <strong>Acessa a plataforma</strong> <em className="mono">app.viverdeia.ai</em> · login com esse email · senha temporária <em className="mono">enviada em separado</em>
              </li>
              <li>
                <strong>Começa a trilha de onboarding</strong> · contextualiza o método e as 3 soluções que você vai implementar
              </li>
              <li>
                <strong>Reserva o primeiro check-in em grupo</strong> · mentoria ao vivo pra alinhar seu caso real e escolher por onde começar
              </li>
            </ol>

            <p>
              não tem prazo apertado nem nada · só ajuda a chegar na semana 1 com contexto.
              qualquer travada, responde esse email que eu cuido.
            </p>

            <a href="#" className="vds-ec-em-cta">
              Acessar a plataforma
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-sign">
              <strong>Rafael Milagre</strong> · fundador
              <br />
              <em>responde direto esse email</em>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>

      <Section
        title="Billing · próxima cobrança"
        meta="factual · sem 'olá' · sem emoji"
      >
        <EmailFrame
          category="Transacional · billing"
          from="Viver de IA · cobrança"
          subject="Cobrança em 2 dias · R$&nbsp;3.780 · plano Pro"
          preview="a mensalidade do plano Pro entra na fatura sex 23/mai. upgrade pro Enterprise em 1 clique se preferir."
          time="qua · 18:22"
          notes={{
            when: '48h antes da cobrança · uma vez só · sem follow-up agressivo',
            voice: 'concierge-direto · primeira frase = fato + valor + label · sem “esperamos que esteja bem”',
            vars: ['{cobranca_data}', '{cobranca_valor}', '{plano_atual}', '{aluno_first_name}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-billing-plate">
              <div>
                <span className="lbl">Próxima cobrança</span>
                <strong className="val">R$&nbsp;3.780,00</strong>
                <em>sex · 23 mai · plano Pro</em>
              </div>
              <div>
                <span className="lbl">Cartão</span>
                <strong>•••• 4521</strong>
                <em>Visa · cadastrado em 18 jan</em>
              </div>
            </div>

            <p>
              Rafael, a mensalidade do plano Pro entra na fatura <strong>sex 23/mai</strong>.
              Se quiser <strong>subir pro Enterprise</strong> (R$&nbsp;6.180/mês · soma 1 hora/mês
              de mentoria individual + arquiteto AI Builder), troca aqui:
            </p>

            <div className="vds-ec-em-actions">
              <a href="#" className="vds-ec-em-cta secondary">Ver o Enterprise</a>
              <a href="#" className="vds-ec-em-cta">Manter o Pro</a>
            </div>

            <p className="vds-ec-em-fine">
              Valor mensal em <strong>contratação anual</strong> · prazos e condições de troca
              de plano seguem os termos de uso.
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>

      <Section
        title="Billing · pagamento falhou"
        meta="reconhece + entrega ação · sem culpar cliente"
      >
        <EmailFrame
          category="Transacional · billing"
          from="Viver de IA · cobrança"
          subject="Pagamento não passou · 3 ações em 1 clique"
          preview="cobrança de R$&nbsp;3.780 retornou 'fundos insuficientes'. nada cancelado ainda, dá pra resolver em 1 clique."
          time="hoje · 06:48"
          notes={{
            when: 'Imediatamente após retry falhar · NÃO no momento da primeira tentativa',
            voice: 'pragmático sem culpar · entrega contexto + 3 opções · sem urgência fabricada',
            vars: ['{cobranca_valor}', '{motivo_falha}', '{prazo_resolver}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-alert">
              <span className="ico">
                <AlertCircle size={16} strokeWidth={1.75} />
              </span>
              <div>
                <strong>Cobrança não passou · R$&nbsp;3.780</strong>
                <em>motivo do banco: “fundos insuficientes” · cartão Visa •••• 4521</em>
              </div>
            </div>

            <p>
              Rafael, a cobrança de hoje retornou erro. <strong>Nada foi cancelado</strong> — o
              plano Pro continua ativo enquanto você resolve. 3 caminhos:
            </p>

            <ol className="vds-ec-em-steps">
              <li>
                <strong>Re-tentar com o mesmo cartão</strong> · se foi limite ou saldo temporário
              </li>
              <li>
                <strong>Trocar pro outro cartão</strong> · cadastrar agora · cobra na hora
              </li>
              <li>
                <strong>Falar com o time</strong> · ajusta a forma de pagamento com a gente
              </li>
            </ol>

            <a href="#" className="vds-ec-em-cta">
              Resolver agora
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-fine">
              Se não resolver até <strong>[data]</strong>, vale o que está nos termos de uso ·
              qualquer dúvida, responde esse email.
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>
    </>
  );
}

/* ---------- Editorial · 3 templates ---------- */
function EditorialSection() {
  return (
    <>
      <Section
        title="Weekly digest · newsletter editorial"
        meta="crônica-operacional · 1ª pessoa · case real + número"
      >
        <EmailFrame
          category="Editorial · newsletter"
          from="Rafael · Viver de IA"
          subject="Viva Nexo saiu de 6h pra cliques · o que dá pra copiar daí"
          preview="semana 18. separei um case real da plataforma e o que ele ensina pra quem ainda monta relatório na mão. anotei aqui."
          time="dom · 19:42"
          notes={{
            when: 'Domingo 19h · semanal · uma única edição por semana',
            voice: 'crônica de operador · começa com case real publicado · sem curadoria “5 dicas”',
            vars: ['{membro_first_name}', '{semana_numero}', '{case_referencia}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-hero-plate">
              <span className="vds-ec-em-hero-eyebrow">Semana 18 · 2026</span>
              <h2>
                Viva Nexo foi de <em>6h pra cliques</em>.
                <br />E economiza R$&nbsp;162.000.
              </h2>
              <p className="vds-ec-em-hero-meta">
                case real · Saúde · publicado em viverdeia.ai/cases
              </p>
            </div>

            <p>
              o título do case resume: um relatório que levava 6 horas virou alguns cliques.
              não é o tipo de ganho que aparece em demo · aparece na rotina de quem fecha o
              mês e não aguenta mais montar planilha na mão.
            </p>
            <p>
              <strong>Não começa por prompt.</strong> Começa por achar a tarefa que se repete
              toda semana, tem formato fixo e consome horas de alguém caro. relatório é o caso
              clássico: entrada previsível, saída previsível, ninguém gosta de fazer. é ali que
              a IA paga a conta primeiro.
            </p>
            <p>
              a história completa (desafio, solução, resultado) tá no case publicado. <strong>São
              521 cases reais de implementação</strong> como esse, separados por setor.
            </p>

            <div className="vds-ec-em-pull">
              <strong className="mono">6h → cliques · R$&nbsp;162.000 de economia · Viva Nexo</strong>
            </div>

            <h3>O que vale anotar pra sua operação</h3>
            <p>
              lista as tarefas da sua operação que levam mais de 2h por semana e têm formato
              fixo. a primeira da lista é candidata a solução pronta antes de virar projeto.
            </p>
            <p>
              segundo: antes de construir do zero, procura no catálogo. são 157 soluções de IA
              prontas · <em>implementar o que já existe</em> costuma ser mais rápido e libera o
              time pro que é específico do seu negócio.
            </p>

            <a href="#" className="vds-ec-em-link-arrow">
              ler o case completo da Viva Nexo <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-sign">
              até domingo,
              <br />
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>

      <Section
        title="Drip nurture · 5 touches editorial"
        meta="série de 5 emails · cadência 3-4-5-7-10 dias · cada um stand-alone"
      >
        <DripSequence />
      </Section>

      <Section
        title="Recap pós-evento · após live ou aula coletiva"
        meta="memória + próximo passo · sem 'agradecimento corporativo'"
      >
        <EmailFrame
          category="Editorial · recap"
          from="Rafael · Viver de IA"
          subject="O que rolou na live de ontem · 3 prompts auditados ao vivo"
          preview="ontem auditamos 3 prompts de membros no check-in ao vivo. quem não foi, vai aqui o resumo + os 3 prints que mais geraram pergunta."
          time="ter · 11:14"
          notes={{
            when: '12-24h após o evento · enquanto memória ainda quente',
            voice: 'crônica curta · case + 2-3 highlights + link pra gravação · sem “obrigado por participar”',
            vars: ['{evento_nome}', '{evento_data}', '{recap_link}', '{proximo_evento}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <h2 className="vds-ec-em-h2-flat">
              Ontem auditamos 3 prompts ao vivo. <em>Vai aqui o que ficou.</em>
            </h2>

            <p>
              check-in de 90min · [N] membros presentes · 3 prompts postados antes,
              auditados ao vivo. quem não viu (ou quer rever), gravação tá completa na
              plataforma · timestamps pros 3 cases abaixo.
            </p>

            <ol className="vds-ec-em-recap">
              <li>
                <span className="t mono">12:08</span>
                <div>
                  <strong>Prompt do João · SDR de fintech</strong>
                  <em>“agente respondia 'eu sou IA' quando perguntavam quem era. fix em 3 linhas — antes/depois lado a lado”</em>
                </div>
              </li>
              <li>
                <span className="t mono">34:51</span>
                <div>
                  <strong>Prompt da Ana · automação de proposta</strong>
                  <em>“saída JSON quebrada · adicionei schema validation no system prompt · rodou primeira tentativa”</em>
                </div>
              </li>
              <li>
                <span className="t mono">58:22</span>
                <div>
                  <strong>Prompt do Bruno · onboarding de cliente</strong>
                  <em>“contexto longo demais consumindo tokens · reorganizei pra carregar só o necessário · custo por conversa caiu”</em>
                </div>
              </li>
            </ol>

            <a href="#" className="vds-ec-em-cta secondary">
              Ver gravação completa (1h 24min)
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p>
              próximo check-in é <strong>sex 23/mai · 14h</strong> · vamos fazer review da
              solução que mais gente implementou no mês. quem quer ser auditado, posta o link
              na comunidade até quarta.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>
    </>
  );
}

function DripSequence() {
  const touches = [
    {
      n: 1,
      delay: 'D+3 (3 dias após optin)',
      subject: 'A solução que paga o plano',
      lead:
        'maioria das empresas chega achando que vai aprender “prompt engineering”. o foco é outro · colocar uma solução pronta pra operar todo dia.',
    },
    {
      n: 2,
      delay: 'D+7 (4 dias depois)',
      subject: '3 cases reais que saíram do discurso pra operação',
      lead:
        'Place Dreams: economiza R$\u00A042.000 por ano em 30 dias. Trivia Studio: R$\u00A0120.000 de economia anual. Viva Nexo: de 6h para cliques. Todos em viverdeia.ai/cases.',
    },
    {
      n: 3,
      delay: 'D+12 (5 dias depois)',
      subject: 'Por que a mentoria é em grupo (e por que isso acelera)',
      lead:
        'curso avulso ensina teoria e para por aí. mentoria ao vivo chega na operação. no Pro são 10 check-ins por mês · mostro o que rola dentro de um.',
    },
    {
      n: 4,
      delay: 'D+19 (7 dias depois)',
      subject: 'O que não te contam sobre construir agente em produção',
      lead:
        '3 erros que mais vejo em quem coloca agente em produção. nenhum dos 3 vc lê em curso porque acontece só quando o agente tá em produção real, com cliente real.',
    },
    {
      n: 5,
      delay: 'D+29 (10 dias depois) · final',
      subject: 'A garantia de 90 dias, explicada sem letra miúda',
      lead:
        '100% do investimento de volta se, em 90 dias, não houver aumento de receita nem redução de custos · cumprindo 3 requisitos. se faz sentido agora, entra; se não, ok também.',
    },
  ];

  return (
    <div className="vds-ec-drip">
      {touches.map((t) => (
        <article key={t.n} className="vds-ec-drip-step">
          <span className="vds-ec-drip-num mono">{String(t.n).padStart(2, '0')}</span>
          <div className="vds-ec-drip-body">
            <span className="vds-ec-drip-when mono">{t.delay}</span>
            <strong>{t.subject}</strong>
            <p>{t.lead}</p>
          </div>
        </article>
      ))}
      <p className="vds-ec-drip-notes">
        <strong>Princípio:</strong> cada email da série é stand-alone (lê fora de ordem e faz
        sentido) · sem &ldquo;como prometi no email anterior&rdquo; · sem &ldquo;última chance&rdquo; em nenhum touch
        · cada um termina com 1 ação concreta, não obrigatória.
      </p>
    </div>
  );
}

/* ---------- Concierge · 2 templates ---------- */
function ConciergeSection() {
  return (
    <>
      <Section
        title="Urgent ops alert · operação interna"
        meta="dentro do time · sem voz comercial · só fato + ação"
      >
        <EmailFrame
          category="Concierge · ops internas"
          from="Plataforma · alerta"
          subject="Webhook timeout · 504 desde 14:08 · provider embedding"
          preview="failover automático já rodou. tráfego 100% restaurado. relatório completo abaixo + janela impactada."
          time="hoje · 14:42"
          notes={{
            when: 'Quando agente detecta falha crítica · enviado em <60s do evento',
            voice: 'concierge-técnico · timeline + causa + ação executada + próximo passo',
            vars: ['{evento_horario}', '{servico_afetado}', '{duracao_impacto}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-alert">
              <span className="ico">
                <AlertCircle size={16} strokeWidth={1.75} />
              </span>
              <div>
                <strong>Provider de embeddings · 504 timeout</strong>
                <em>impacto: 14:08 → 14:34 · 26min de embeddings degradados · failover ok</em>
              </div>
            </div>

            <h3 className="vds-ec-em-h3">Timeline</h3>
            <ul className="vds-ec-em-timeline">
              <li>
                <span className="t mono">14:08</span>
                <div>Primeiro timeout detectado · API embeddings retornou 504 (4 req sequenciais)</div>
              </li>
              <li>
                <span className="t mono">14:09</span>
                <div>Circuit breaker disparado · failover automático pra provider B</div>
              </li>
              <li>
                <span className="t mono">14:11</span>
                <div>Latência normalizada · embeddings rodando via provider B</div>
              </li>
              <li>
                <span className="t mono">14:34</span>
                <div>Provider A voltou · alternância gradual de volta · sem incidente reverso</div>
              </li>
            </ul>

            <h3 className="vds-ec-em-h3">Impacto medido</h3>
            <p>
              <strong>847 conversas</strong> processaram com embedding de provider alternativo
              · latência média +180ms (aceitável) · zero conversas perdidas · zero
              cliente reportou.
            </p>

            <a href="#" className="vds-ec-em-cta secondary">
              Ver dashboard completo
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-sign">
              <strong>Monitor da plataforma</strong> · alerta automático
              <br />
              <em>checagem manual: <a href="#">/status</a></em>
            </p>
          </div>
          <EmailFooter unsubscribe={false} />
        </EmailFrame>
      </Section>

      <Section
        title="NPS / feedback · curto e específico"
        meta="1 pergunta · 1 botão · sem 'sua opinião é importante pra nós'"
      >
        <EmailFrame
          category="Concierge · feedback"
          from="Rafael · Viver de IA"
          subject="Como tá indo a plataforma? 1 pergunta direta"
          preview="você aderiu ao plano Pro há 45 dias. quero saber se o ritmo tá ajudando ou atrapalhando."
          time="qua · 10:08"
          notes={{
            when: 'D+45 da adesão ao plano · uma única vez · sem follow-up se não responder',
            voice: 'pessoal, sem template corporate · pergunta específica, não escala 1-10 genérica',
            vars: ['{membro_first_name}', '{dias_desde_adesao}', '{plano_nome}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael, você tá há <strong>45 dias</strong> no plano Pro. metade da janela da garantia.
            </p>
            <p>
              quero saber 1 coisa só: <strong>o ritmo das formações + check-ins tá ajudando ou
              atrapalhando?</strong>
            </p>
            <p>
              não precisa de resposta longa. clique no que cabe:
            </p>

            <div className="vds-ec-em-nps">
              <a href="#" className="opt good">
                <CheckCircle2 size={16} strokeWidth={1.75} />
                ajudando · vou na velocidade
              </a>
              <a href="#" className="opt mid">
                <MessageCircle size={16} strokeWidth={1.75} />
                ok · mas algo poderia mudar
              </a>
              <a href="#" className="opt bad">
                <AlertCircle size={16} strokeWidth={1.75} />
                atrapalhando · responde aqui e marco call hoje
              </a>
            </div>

            <p className="vds-ec-em-fine">
              se clicar &ldquo;atrapalhando&rdquo;, eu vejo no minuto seguinte e marco uma call de
              30min ainda hoje. zero burocracia.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>
    </>
  );
}

/* ---------- Comercial · 3 templates ---------- */
function CommercialSection() {
  return (
    <>
      <Section
        title="Event invite · live / mentoria coletiva / Leaders AI"
        meta="atmosphere navy + 1 CTA forte · sem 'JÁ ESTÁ ROLANDO!!! GARANTA SUA VAGA!'"
      >
        <EmailFrame
          category="Comercial · evento"
          from="Rafael · Viver de IA"
          subject="Sex 14h · auditoria de 3 prompts ao vivo"
          preview="3 membros vão postar prompts antes da live. audito ao vivo, expondo o que mudaria + por quê. [N] vagas, primeiro vem."
          time="seg · 16:22"
          notes={{
            when: '7 dias antes do evento · reforço 24h antes',
            voice: 'editorial-direta · descrição do que vai rolar · sem urgência fabricada',
            vars: ['{evento_nome}', '{evento_data}', '{evento_horario}', '{vagas_restantes}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-event-plate via-mesh-navy via-noise">
              <span className="lbl">
                <Calendar size={14} strokeWidth={1.75} />
                Live · sex 23 mai · 14h00 BRT
              </span>
              <h2>
                Auditoria de <em>3 prompts ao vivo</em>.
              </h2>
              <p>
                [N] vagas · primeiro que confirma, primeiro entra · gravação fica disponível
                na plataforma
              </p>
            </div>

            <p>
              3 membros postaram prompts antes da live. cada um conta o problema que tá tentando
              resolver e a versão atual do agente. <strong>eu audito ao vivo</strong>,
              expondo o que mudaria + por quê — sem softening, mas sem trucidar também.
            </p>

            <p>
              cada caso vai dar ~25min · audita + sala faz pergunta. quem assiste vê 3 padrões
              de operação reais (não exemplo de doc) e leva o método de auditoria pra rodar
              nos próprios prompts.
            </p>

            <a href="#" className="vds-ec-em-cta">
              Confirmar presença · [N] vagas
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-fine">
              <strong>se já confirmou, ignora esse email.</strong> mando reforço quarta com o
              link de entrada.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>

      <Section
        title="Lançamento de produto / curso"
        meta="hero forte + 3-4 razões + 1 CTA · sem countdown agressivo no body"
      >
        <EmailFrame
          category="Comercial · lançamento"
          from="Rafael · Viver de IA"
          subject="Plano Pro · 10 check-ins de mentoria em grupo por mês"
          preview="plataforma + mentoria ao vivo · R$&nbsp;3.780/mês em contratação anual · garantia de 90 dias."
          time="ter · 17:08"
          notes={{
            when: 'Dia do lançamento · um email só · sem 3 emails seguidos “ÚLTIMAS HORAS”',
            voice: 'fato + condição + razão pra entrar agora · não é “JÁ ABRE!!!”',
            vars: ['{plano_nome}', '{plano_preco}', '{plano_mentoria}', '{plano_contratacao}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-launch-plate via-mesh-navy via-noise">
              <span className="vds-ec-em-launch-eyebrow">Plano Pro · contratação anual</span>
              <h2>
                Mentoria em grupo <em>ao vivo</em>.
                <br />10 check-ins por mês.
              </h2>
              <p className="vds-ec-em-launch-meta">
                521 cases reais de implementação de IA · garantia de 90 dias, condições na
                cláusula 7
              </p>
            </div>

            <p>
              o plano Pro soma <strong>10 check-ins por mês de mentoria em grupo</strong> ao que
              todo plano já tem. R$&nbsp;3.780/mês · contratação anual.
            </p>

            <h3 className="vds-ec-em-h3">Por que o Pro e não o Starter</h3>
            <ol className="vds-ec-em-steps">
              <li>
                Mentoria em grupo ao vivo · <strong>10 check-ins por mês</strong> pra destravar
              </li>
              <li>
                Garantia de <strong>90 dias</strong> · 100% de volta sem aumento de receita nem
                redução de custos, cumprindo 3 requisitos
              </li>
              <li>
                Comunidade de <strong>empresários e líderes</strong> + imersão presencial de
                implementação na sede
              </li>
            </ol>

            <h3 className="vds-ec-em-h3">O que você recebe</h3>
            <ul className="vds-ec-em-checklist">
              <li><Check /> Todas as soluções Plug-and-Play · 157 soluções de IA prontas</li>
              <li><Check /> 10 check-ins/mês de mentoria em grupo</li>
              <li><Check /> Comunidade de empresários e líderes</li>
              <li><Check /> Formações práticas + Consultor IA dentro da plataforma</li>
              <li><Check /> Imersão presencial de implementação na sede</li>
            </ul>

            <a href="#" className="vds-ec-em-cta">
              Ver os planos
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-fine">
              Valor mensal em contratação anual · condições completas da garantia na cláusula 7
              dos termos de uso.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>

      <Section
        title="Oferta comercial sutil · upsell / cross-sell"
        meta="sem desconto agressivo · razão clara pro upgrade"
      >
        <EmailFrame
          category="Comercial · oferta"
          from="Rafael · Viver de IA"
          subject="Pelo que vi no seu agente, faria sentido conversar"
          preview="vi sua entrega do módulo 3 · operação tem padrão pra 2-3 agentes paralelos · o Enterprise talvez caiba melhor."
          time="qui · 09:42"
          notes={{
            when: 'Quando aluno demonstra perfil pra upgrade · análise manual, não automatizada',
            voice: 'observacional · começa pelo que viu no aluno · sem “oferta especial”',
            vars: ['{aluno_first_name}', '{modulo_concluido}', '{evidencia_perfil}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael, olhei sua entrega do módulo 3 (caso do agente de qualificação de leads
              SDR) ontem.
            </p>
            <p>
              <strong>3 coisas que chamaram atenção:</strong>
            </p>
            <ol className="vds-ec-em-steps">
              <li>Você já tá pensando arquitetura multi-agente (separou intent reader do responder)</li>
              <li>Operação tem volume pra 2-3 agentes paralelos (qualificação · pós-venda · churn)</li>
              <li>Tem perfil de quem vai construir mais que 1 — provavelmente já tá pensando o próximo</li>
            </ol>

            <p>
              tem o plano <strong>Enterprise</strong> · soma 1 hora por mês de mentoria
              individual e o arquiteto de soluções AI Builder. custa mais (R$&nbsp;6.180/mês,
              contratação anual), mas faz sentido pra quem vai implementar 3+ soluções em
              sequência.
            </p>

            <p>
              não tô vendendo no email · só achei que valia mencionar pq talvez você nem soubesse
              que existe. se quiser conversar, responde esse email com horário que te cabe
              que marco 30min.
            </p>

            <p>
              se não fizer sentido, ignora esse email <strong>sem culpa</strong> · o plano
              Pro já cobre o que você precisa.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>
    </>
  );
}

/* ---------- Lifecycle · 2 templates ---------- */
function LifecycleSection() {
  return (
    <>
      <Section
        title="Churn alert · aluno parou de entrar"
        meta="curiosidade, não cobrança · pergunta concreta"
      >
        <EmailFrame
          category="Lifecycle · churn"
          from="Rafael · Viver de IA"
          subject="Você sumiu há 19 dias · tô curioso, o que rolou"
          preview="vi que você não entra na plataforma há 19 dias. não tô cobrando · só curioso se foi algo que aconteceu (na operação ou na vida)."
          time="seg · 11:14"
          notes={{
            when: 'D+14 da última atividade · uma única vez · não escala em sequência',
            voice: 'curioso-humano · NÃO comercial · pergunta sem cobrar · oferece “pausa” se necessário',
            vars: ['{aluno_first_name}', '{dias_inativo}', '{ultima_atividade}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael,
            </p>
            <p>
              vi que você não entra na plataforma há <strong>19 dias</strong>. não tô cobrando · só
              curioso pra saber se foi algo.
            </p>

            <p>
              <strong>3 cenários comuns</strong> que costumo ver:
            </p>
            <ol className="vds-ec-em-steps">
              <li>
                <strong>Vida atravessou.</strong> Operação ficou em crise, projeto novo
                explodiu, família precisou. ok, <strong>me conta no reply</strong> e a gente
                ajusta o ritmo da trilha pra você voltar quando puder.
              </li>
              <li>
                <strong>A formação travou em algum lugar.</strong> Módulo difícil, prompt que não
                quis funcionar, dúvida que não respondeu. me conta o que travou no reply desse
                email · resolvo em 24h.
              </li>
              <li>
                <strong>Não tá fazendo sentido.</strong> Acontece. Aluno entra achando que era
                X e na real era Y. nesse caso, vale olhar a garantia de 90 dias · condições na
                cláusula 7 dos termos de uso.
              </li>
            </ol>

            <p>
              responde esse email com qual dos 3 cabe · ou me conta um quarto. eu leio.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>

      <Section
        title="Win-back · ex-aluno · 3+ meses depois"
        meta="reconhece que foi embora · entrega novidade real · sem desconto guilt-trip"
      >
        <EmailFrame
          category="Lifecycle · win-back"
          from="Rafael · Viver de IA"
          subject="3 coisas mudaram desde que você saiu · acho que faz sentido voltar"
          preview="cancelou em fev. desde então: mentoria em grupo ao vivo no Pro · Consultor IA na plataforma · 157 soluções prontas."
          time="qua · 14:42"
          notes={{
            when: 'D+90 do churn · uma única vez · sem follow-up se não responder',
            voice: 'observa que saiu, entrega novidade real, sugere volta mas não força',
            vars: ['{ex_aluno_first_name}', '{meses_fora}', '{razao_churn_se_souber}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael,
            </p>
            <p>
              você saiu da plataforma em <strong>fev 2026</strong> — 3 meses já. te escrevo porque
              3 coisas mudaram desde então que talvez te interessem:
            </p>

            <ol className="vds-ec-em-steps">
              <li>
                <strong>Mentoria em grupo ao vivo</strong> no plano Pro · são 10 check-ins por
                mês pra destravar a implementação com gente do seu nível.
              </li>
              <li>
                <strong>Consultor IA dentro da plataforma</strong>. você descreve o seu cenário
                e recebe o caminho específico pro seu caso, a qualquer hora do dia.
              </li>
              <li>
                <strong>157 soluções de IA prontas</strong>. dá pra implementar o que já existe
                em vez de construir do zero · o time aplica sem programar.
              </li>
            </ol>

            <p>
              não tô oferecendo nada · só te contando. se quiser voltar, me responde que eu
              te mostro o plano que cabe. se não, ok também — sem follow-up.
            </p>

            <a href="#" className="vds-ec-em-cta secondary">
              Ver o que mudou
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>

            <p className="vds-ec-em-sign">
              <strong>Rafael</strong>
            </p>
          </div>
          <EmailFooter />
        </EmailFrame>
      </Section>
    </>
  );
}

/* small visual helper */
function Check() {
  return (
    <span className="vds-ec-em-check">
      <CheckCircle2 size={16} strokeWidth={1.75} />
    </span>
  );
}
