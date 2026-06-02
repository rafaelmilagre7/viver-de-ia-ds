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
        <strong>Viver de IA</strong> · operadores formando operadores · São Paulo, BR
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
          from="Caio · Viver de IA"
          subject="Bem-vindo. Próximos passos em 3 atos."
          preview="sua turma 2026.2 começa em 14 dias. antes disso, faz isso aqui pra entrar no ritmo."
          time="hoje · 09:14"
          notes={{
            when: 'Imediatamente após confirmação de pagamento',
            voice: 'caloroso, mas factual · "você" infinitivo · primeira frase entrega o assunto',
            vars: ['{aluno_first_name}', '{turma_codename}', '{turma_start_date}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p className="vds-ec-em-greet">
              Oi <strong>Rafael</strong>,
            </p>
            <p>
              tua vaga na turma 2026.2 tá confirmada. começa em <strong>14 dias</strong>, e tem
              3 coisas que se tu fizer essa semana, entra no ritmo da turma sem perder a
              primeira aula.
            </p>

            <ol className="vds-ec-em-steps">
              <li>
                <strong>Acessa a plataforma</strong> <em className="mono">app.viverdeia.ai</em> · login com esse email · senha temporária <em className="mono">enviada em separado</em>
              </li>
              <li>
                <strong>Assiste o intro de 12min</strong> · contextualiza o método e o que vais construir nos próximos 90 dias
              </li>
              <li>
                <strong>Marca a primeira mentoria 1:1</strong> · 30min pra alinhar caso real teu e dimensionar o que faz sentido construir
              </li>
            </ol>

            <p>
              não tem prazo apertado nem nada · só ajuda a chegar na semana 1 com contexto.
              qualquer travada, responde esse email que eu cuido.
            </p>

            <a href="#" className="vds-ec-em-cta">
              Acessar a plataforma
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p className="vds-ec-em-sign">
              <strong>Caio Ribeiro</strong> · fundador
              <br />
              <em>responde direto · 14h média</em>
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
          subject="Cobrança em 2 dias · R$ 2.400 · mentoria mensal"
          preview="renovação da tua mentoria entra na fatura sex 23/mai. reduz pra lite em 1 clique se preferir."
          time="qua · 18:22"
          notes={{
            when: '48h antes da cobrança · uma vez só · sem follow-up agressivo',
            voice: 'concierge-direto · primeira frase = fato + valor + label · sem "esperamos que esteja bem"',
            vars: ['{cobranca_data}', '{cobranca_valor}', '{plano_atual}', '{aluno_first_name}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-billing-plate">
              <div>
                <span className="lbl">Próxima cobrança</span>
                <strong className="val">R$ 2.400,00</strong>
                <em>sex · 23 mai · mentoria mensal</em>
              </div>
              <div>
                <span className="lbl">Cartão</span>
                <strong>•••• 4521</strong>
                <em>Visa · cadastrado em 18 jan</em>
              </div>
            </div>

            <p>
              Rafael, a renovação da tua mentoria entra na fatura <strong>sex 23/mai</strong>.
              Se quiser <strong>reduzir pra plano lite</strong> (R$ 980/mês · mantém comunidade
              + plataforma, sem mentoria 1:1), troca aqui:
            </p>

            <div className="vds-ec-em-actions">
              <a href="#" className="vds-ec-em-cta secondary">Reduzir pra lite</a>
              <a href="#" className="vds-ec-em-cta">Manter mentoria</a>
            </div>

            <p className="vds-ec-em-fine">
              Trocar plano até <strong>qui 22/mai 23:59</strong> · depois disso, a cobrança
              cheia já entrou no ciclo e a troca vale pro mês seguinte.
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
          preview="cobrança de R$ 2.400 retornou 'fundos insuficientes'. nada cancelado ainda, tem 5 dias pra resolver."
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
                <AlertCircle size={16} strokeWidth={2} />
              </span>
              <div>
                <strong>Cobrança não passou · R$ 2.400</strong>
                <em>motivo do banco: "fundos insuficientes" · cartão Visa •••• 4521</em>
              </div>
            </div>

            <p>
              Rafael, a cobrança de hoje retornou erro. <strong>Nada foi cancelado</strong> — a
              mentoria continua ativa pelos próximos 5 dias. 3 caminhos:
            </p>

            <ol className="vds-ec-em-steps">
              <li>
                <strong>Re-tentar com o mesmo cartão</strong> · se foi limite ou saldo temporário
              </li>
              <li>
                <strong>Trocar pro outro cartão</strong> · cadastrar agora · cobra na hora
              </li>
              <li>
                <strong>Reduzir pra plano lite (R$ 980)</strong> · mantém acesso, sem mentoria 1:1
              </li>
            </ol>

            <a href="#" className="vds-ec-em-cta">
              Resolver agora
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p className="vds-ec-em-fine">
              Se não resolver até <strong>seg 27/mai</strong>, o acesso entra em pausa
              automática (sem custo) e tu pode voltar quando quiser.
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
          from="Caio · operador da semana"
          subject="A Nina passou de 11k pra 13k conversas · 2 detalhes mudaram tudo"
          preview="semana 18 da Nina. fui parar 3 dias pra entender porque ela tava perdendo no primeiro turno. anotei aqui o que mudei."
          time="dom · 19:42"
          notes={{
            when: 'Domingo 19h · semanal · uma única edição por semana',
            voice: 'crônica-pessoal de operador · começa com case real próprio · sem curadoria "5 dicas"',
            vars: ['{aluno_first_name}', '{semana_numero}', '{operacao_referencia}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-hero-plate">
              <span className="vds-ec-em-hero-eyebrow">Semana 18 · 2026</span>
              <h2>
                A Nina passou de <em>11k pra 13k</em> conversas.
                <br />2 detalhes mudaram tudo.
              </h2>
              <p className="vds-ec-em-hero-meta">
                operação Viver de IA · 7 dias · medido contra a mesma cohort
              </p>
            </div>

            <p>
              tava acontecendo de a Nina perder ~40% das conversas no primeiro turno. lead
              entrava, ela respondia, e o lead simplesmente não voltava. eu ficava olhando o
              gráfico pensando "deve ser prompt".
            </p>
            <p>
              <strong>Não era prompt.</strong> Era 2 coisas: (1) latência da resposta — a Nina
              tava demorando 28s no primeiro turno, no segundo já era 14s. lead estranha 28s,
              acha que é robô e abandona. (2) o tom da Nina no primeiro turno tava
              consultivo demais quando o lead só queria saber preço.
            </p>
            <p>
              Mudei os dois: cache do contexto inicial pra dropar latência pra 4s · e o prompt
              do primeiro turno virou "leitor de intent" antes de "vendedor". <strong>2k
              conversas adicionais em 7 dias.</strong>
            </p>

            <div className="vds-ec-em-pull">
              <strong className="mono">+18% conversão · 4s vs 28s latência primeiro turno</strong>
            </div>

            <h3>O que vale anotar pra tua operação</h3>
            <p>
              latência percebida no primeiro turno é o número que mais subestima impacto. mede
              o teu agora. se passa de 8s, o lead já tá indo embora antes da resposta.
            </p>
            <p>
              segundo: cuidado com agente "consultivo" no turno 1. o lead chega com intent
              específico, mesmo que vago. <em>responder a intent</em> antes de qualquer
              consultoria educa o ritmo e ele volta pra segunda pergunta.
            </p>

            <a href="#" className="vds-ec-em-link-arrow">
              ver o código que reduziu a latência <ArrowRight size={12} strokeWidth={2.4} />
            </a>

            <p className="vds-ec-em-sign">
              até domingo,
              <br />
              <strong>Caio</strong>
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
          from="Caio · Viver de IA"
          subject="O que rolou na live de ontem · 3 prompts auditados ao vivo"
          preview="ontem auditamos 3 prompts da turma na live. quem não foi, vai aqui o resumo + os 3 prints que mais geraram pergunta."
          time="ter · 11:14"
          notes={{
            when: '12-24h após o evento · enquanto memória ainda quente',
            voice: 'crônica curta · case + 2-3 highlights + link pra gravação · sem "obrigado por participar"',
            vars: ['{evento_nome}', '{evento_data}', '{recap_link}', '{proximo_evento}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <h2 className="vds-ec-em-h2-flat">
              Ontem auditamos 3 prompts ao vivo. <em>Vai aqui o que ficou.</em>
            </h2>

            <p>
              live de 90min · 47 alunos presentes · 3 prompts da turma postados antes,
              auditados ao vivo. quem não viu (ou quer rever), gravação tá completa na
              plataforma · timestamps pros 3 cases abaixo.
            </p>

            <ol className="vds-ec-em-recap">
              <li>
                <span className="t mono">12:08</span>
                <div>
                  <strong>Prompt do João · SDR de fintech</strong>
                  <em>"agente respondia 'eu sou IA' quando perguntavam quem era. fix em 3 linhas — antes/depois lado a lado"</em>
                </div>
              </li>
              <li>
                <span className="t mono">34:51</span>
                <div>
                  <strong>Prompt da Camila · automação de proposta</strong>
                  <em>"saída JSON quebrada · adicionei schema validation no system prompt · rodou primeira tentativa"</em>
                </div>
              </li>
              <li>
                <span className="t mono">58:22</span>
                <div>
                  <strong>Prompt do Daniel · onboarding de cliente</strong>
                  <em>"contexto longo demais consumindo tokens · reorganizei pra carregar só o necessário · ficou 73% mais barato"</em>
                </div>
              </li>
            </ol>

            <a href="#" className="vds-ec-em-cta secondary">
              Ver gravação completa (1h 24min)
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p>
              próxima live é <strong>sex 23/mai · 14h</strong> · vamos fazer review do agente
              "build do mês" da turma. quem quer ser auditado, posta link no Discord até
              quarta.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
      subject: 'O agente que paga a mentoria',
      lead:
        'maioria dos alunos chega achando que vai aprender "prompt engineering". o que ensinamos é diferente · constrói um agente que opera todo dia.',
    },
    {
      n: 2,
      delay: 'D+7 (4 dias depois)',
      subject: '3 alunos que viraram operadores em 90 dias',
      lead:
        'João: SDR automatizado · 4h economizadas/semana. Camila: proposta auto-gerada · 73% menos token. Daniel: onboarding agente · 2h → 20min por cliente.',
    },
    {
      n: 3,
      delay: 'D+12 (5 dias depois)',
      subject: 'Por que tem mentoria 1:1 (e por que não é call em grupo)',
      lead:
        'curso online não chega a operação. mentoria 1:1 chega. mostro o que rola dentro de uma sessão real · case do Diego.',
    },
    {
      n: 4,
      delay: 'D+19 (7 dias depois)',
      subject: 'O que não te contam sobre construir agente em produção',
      lead:
        '3 cicatrizes pessoais minhas construindo a Nina. nenhum dos 3 vc lê em curso porque acontece só quando o agente tá em produção real, com cliente real.',
    },
    {
      n: 5,
      delay: 'D+29 (10 dias depois) · final',
      subject: 'Última semana da turma 2026.2 · ou a próxima em 4 meses',
      lead:
        '4 dias até fechar a turma. depois disso, só em outubro. sem urgência fabricada · é fato. se faz sentido pra ti agora, entra; se não, ok também.',
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
        sentido) · sem &ldquo;como prometi no email anterior&rdquo; · sem &ldquo;última chance&rdquo; até o touch 5
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
          from="Nina · alerta"
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
                <AlertCircle size={16} strokeWidth={2} />
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
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p className="vds-ec-em-sign">
              <strong>Nina</strong> · alerta automático
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
          from="Caio · Viver de IA"
          subject="Como tá indo a mentoria? 1 pergunta direta"
          preview="você entrou na turma 2026.2 há 45 dias. quero saber se o ritmo tá ajudando ou atrapalhando."
          time="qua · 10:08"
          notes={{
            when: 'D+45 da entrada na turma · uma única vez · sem follow-up se não responder',
            voice: 'pessoal, sem template corporate · pergunta específica, não escala 1-10 genérica',
            vars: ['{aluno_first_name}', '{dias_na_turma}', '{turma_codename}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael, tu tá há <strong>45 dias</strong> na turma 2026.2. metade do caminho.
            </p>
            <p>
              quero saber 1 coisa só: <strong>o ritmo das aulas + mentoria 1:1 tá ajudando ou
              atrapalhando?</strong>
            </p>
            <p>
              não precisa de resposta longa. clique no que cabe:
            </p>

            <div className="vds-ec-em-nps">
              <a href="#" className="opt good">
                <CheckCircle2 size={16} strokeWidth={2} />
                ajudando · vou na velocidade
              </a>
              <a href="#" className="opt mid">
                <MessageCircle size={16} strokeWidth={2} />
                ok · mas algo poderia mudar
              </a>
              <a href="#" className="opt bad">
                <AlertCircle size={16} strokeWidth={2} />
                atrapalhando · responde aqui e marco call hoje
              </a>
            </div>

            <p className="vds-ec-em-fine">
              se clicar &ldquo;atrapalhando&rdquo;, eu vejo no minuto seguinte e marco uma call de
              30min ainda hoje. zero burocracia.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
          from="Caio · Viver de IA"
          subject="Sex 14h · auditoria de 3 prompts ao vivo"
          preview="3 alunos vão postar prompts antes da live. audito ao vivo, expondo o que mudaria + por quê. 47 vagas, primeiro vem."
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
                <Calendar size={11} strokeWidth={2.2} />
                Live · sex 23 mai · 14h00 BRT
              </span>
              <h2>
                Auditoria de <em>3 prompts ao vivo</em>.
              </h2>
              <p>
                47 vagas · primeiro que confirma, primeiro entra · gravação fica disponível
                pra inscritos
              </p>
            </div>

            <p>
              3 alunos postaram prompts antes da live. cada um conta o problema que tá tentando
              resolver e a versão atual do agente. <strong>eu audito ao vivo</strong>,
              expondo o que mudaria + por quê — sem softening, mas sem trucidar também.
            </p>

            <p>
              cada caso vai dar ~25min · audita + sala faz pergunta. quem assiste vê 3 padrões
              de operação reais (não exemplo de doc) e leva o método de auditoria pra rodar
              nos próprios prompts.
            </p>

            <a href="#" className="vds-ec-em-cta">
              Confirmar presença · 47 vagas
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p className="vds-ec-em-fine">
              <strong>se já confirmou, ignora esse email.</strong> mando reforço quarta com o
              link de entrada.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
          from="Caio · Viver de IA"
          subject="Turma 2026.3 abre amanhã 9h · 30 vagas · 4 meses"
          preview="próxima turma sai em outubro · entre agora ou daqui 4 meses. não tem turma intermediária."
          time="ter · 17:08"
          notes={{
            when: 'D-1 do lançamento · um email só · sem 3 emails seguidos "ÚLTIMAS HORAS"',
            voice: 'fato + condição + razão pra entrar agora · não é "JÁ ABRE!!!"',
            vars: ['{turma_codename}', '{turma_data_abertura}', '{turma_vagas}', '{turma_duracao}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <div className="vds-ec-em-launch-plate via-mesh-navy via-noise">
              <span className="vds-ec-em-launch-eyebrow">Turma 2026.3 · 4 meses</span>
              <h2>
                Próxima vez é <em>outubro</em>.
                <br />Amanhã 9h abre 30 vagas.
              </h2>
              <p className="vds-ec-em-launch-meta">
                método consolidado em 220 operadores · 1 agente em produção em 90 dias ou seu
                dinheiro de volta
              </p>
            </div>

            <p>
              tô abrindo a próxima turma <strong>amanhã, qua 22/mai, 9h00 BRT</strong>. 30 vagas
              · 4 meses · começa primeira semana de junho.
            </p>

            <h3 className="vds-ec-em-h3">Por que entrar agora e não esperar</h3>
            <ol className="vds-ec-em-steps">
              <li>
                Próxima turma só em <strong>outubro 2026</strong> · não tem entre essas
              </li>
              <li>
                Mentoria 1:1 fica trancada em <strong>15 alunos por turma</strong> · primeiro
                que entra, primeiro escolhe o slot
              </li>
              <li>
                Preço sobe na próxima turma · <strong>R$ 2.400 → R$ 2.900</strong> (mantemos pra
                quem entra agora)
              </li>
            </ol>

            <h3 className="vds-ec-em-h3">O que tu recebe</h3>
            <ul className="vds-ec-em-checklist">
              <li><Check /> 18 aulas estruturadas + 4 lives ao vivo + 2 estudos de caso</li>
              <li><Check /> Mentoria 1:1 mensal (4 sessões 60min)</li>
              <li><Check /> Comunidade fechada Discord · acesso vitalício</li>
              <li><Check /> Acesso plataforma + atualizações por tempo indeterminado</li>
              <li><Check /> Templates, prompts, código-base reutilizável</li>
            </ul>

            <a href="#" className="vds-ec-em-cta">
              Ver programa completo
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p className="vds-ec-em-fine">
              Amanhã 9h00 o link de inscrição abre · mando ele direto pra esse email assim que
              estiver no ar.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
          from="Caio · Viver de IA"
          subject="Pelo que vi no teu agente, faria sentido conversar"
          preview="vi tua entrega do módulo 3 · operação tem padrão pra 2-3 agentes paralelos · tem plano cohort que cabe melhor."
          time="qui · 09:42"
          notes={{
            when: 'Quando aluno demonstra perfil pra upgrade · análise manual, não automatizada',
            voice: 'observacional · começa pelo que viu no aluno · sem "oferta especial"',
            vars: ['{aluno_first_name}', '{modulo_concluido}', '{evidencia_perfil}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael, olhei tua entrega do módulo 3 (caso do agente de qualificação de leads
              SDR) ontem.
            </p>
            <p>
              <strong>3 coisas que chamaram atenção:</strong>
            </p>
            <ol className="vds-ec-em-steps">
              <li>Tu já tá pensando arquitetura multi-agente (separou intent reader do responder)</li>
              <li>Operação tem volume pra 2-3 agentes paralelos (qualificação · pós-venda · churn)</li>
              <li>Tem perfil de quem vai construir mais que 1 — provavelmente já tá pensando o próximo</li>
            </ol>

            <p>
              tem um plano que normalmente não menciono no funil padrão chamado <strong>cohort
              avançado</strong> · 6 meses · 3 mentorias por mês · acesso direto ao código-base
              completo (não só os snippets dos módulos). custa mais, mas faz sentido pra quem
              vai construir 3+ agentes em sequência.
            </p>

            <p>
              não tô vendendo no email · só achei que valia mencionar pq talvez tu nem soubesse
              que existe. se quiser conversar, responde esse email com horário que te cabe
              que marco 30min.
            </p>

            <p>
              se não fizer sentido, ignora esse email <strong>sem culpa</strong> · a turma
              2026.2 já cobre o que tu precisa.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
          from="Caio · Viver de IA"
          subject="Tu sumiu há 19 dias · tô curioso, o que rolou"
          preview="vi que tu não entra na plataforma há 19 dias. não tô cobrando · só curioso se foi algo que aconteceu (no curso ou na vida)."
          time="seg · 11:14"
          notes={{
            when: 'D+14 da última atividade · uma única vez · não escala em sequência',
            voice: 'curioso-humano · NÃO comercial · pergunta sem cobrar · oferece "pausa" se necessário',
            vars: ['{aluno_first_name}', '{dias_inativo}', '{ultima_atividade}'],
          }}
        >
          <EmailHeader />
          <div className="vds-ec-em-body">
            <p>
              Rafael,
            </p>
            <p>
              vi que tu não entra na plataforma há <strong>19 dias</strong>. não tô cobrando · só
              curioso pra saber se foi algo.
            </p>

            <p>
              <strong>3 cenários comuns</strong> que costumo ver:
            </p>
            <ol className="vds-ec-em-steps">
              <li>
                <strong>Vida atravessou.</strong> Operação ficou em crise, projeto novo
                explodiu, família precisou. ok, <strong>tem botão de pausa</strong> (1 mês ou
                3) que congela o ciclo sem cobrar e tu volta quando puder.
              </li>
              <li>
                <strong>O curso travou em algum lugar.</strong> Módulo difícil, prompt que não
                quis funcionar, dúvida que não respondeu. me conta o que travou no reply desse
                email · resolvo em 24h.
              </li>
              <li>
                <strong>Não tá fazendo sentido.</strong> Acontece. Aluno entra achando que era
                X e na real era Y. nesse caso, devolução parcial até 60 dias da entrada · sem
                drama.
              </li>
            </ol>

            <p>
              responde esse email com qual dos 3 cabe · ou me conta um quarto. eu leio.
            </p>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
          from="Caio · Viver de IA"
          subject="3 coisas mudaram desde que tu saiu · acho que faz sentido voltar"
          preview="cancelou mentoria em fev. desde então: mentoria virou 1:1 toda semana · plataforma ganhou laboratório de prompt · turma fechou em 25, não 50."
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
              tu saiu da mentoria em <strong>fev 2026</strong> — 3 meses já. te escrevo porque
              3 coisas mudaram desde então que talvez te interessem:
            </p>

            <ol className="vds-ec-em-steps">
              <li>
                <strong>Mentoria 1:1 virou semanal</strong> (era mensal). Quem tava reclamando
                que o ritmo era lento tinha razão · hoje são 4 sessões/mês.
              </li>
              <li>
                <strong>Plataforma ganhou laboratório de prompt</strong>. dá pra testar
                variações dos teus prompts contra dataset real, A/B side-by-side, antes de
                subir pra produção.
              </li>
              <li>
                <strong>Turma fechou em 25, não 50</strong>. menos gente, mais densidade.
                comunidade ficou melhor — todo mundo conhece todo mundo.
              </li>
            </ol>

            <p>
              não tô oferecendo nada · só te contando. se quiser voltar pra próxima turma
              (junho), me responde que eu reservo. se não, ok também — sem follow-up.
            </p>

            <a href="#" className="vds-ec-em-cta secondary">
              Ver o que mudou
              <ArrowRight size={13} strokeWidth={2.2} />
            </a>

            <p className="vds-ec-em-sign">
              <strong>Caio</strong>
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
      <CheckCircle2 size={14} strokeWidth={2.2} />
    </span>
  );
}
