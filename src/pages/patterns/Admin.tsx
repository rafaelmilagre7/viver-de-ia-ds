import {
  Key, Copy, RefreshCw, Trash2, Eye, EyeOff, CheckCircle2, AlertTriangle,
  CreditCard, ArrowRight, Download, ChevronRight, Shield,
  LogIn, KeyRound, FileEdit, UserPlus, Crown, Webhook, Check,
  Plus, MoreHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './admin.css';

export default function Admin() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · admin & config"
        title={
          <>
            Operação do produto, <em>com a mesma cara</em>.
          </>
        }
        lede="Quando o usuário vira admin, a UI muda mas a marca não. Settings sections editorial, API keys tratadas com cuidado, billing transparente, audit log que conta a história. As 4 peças que aparecem em todo painel administrativo sério."
      />

      <SettingsSection />
      <ApiKeySection />
      <WebhooksSection />
      <PermissionsMatrixSection />
      <BillingSection />
      <AuditLogSection />
    </>
  );
}

/* ---------- Webhooks · com signing secret rotation ---------- */
function WebhooksSection() {
  return (
    <Section title="Webhooks · eventos saindo do produto" meta="endpoints · signing secret · payload viewer · retry policy">
      <article className="vds-wh">
        <header className="vds-wh-head">
          <div>
            <h3>Endpoints conectados</h3>
            <p>4 ativos · 1 com falhas nas últimas 24h · próximo retry em 2 min</p>
          </div>
          <button className="vds-wh-add">
            <Plus size={13} strokeWidth={2.4} />
            Novo endpoint
          </button>
        </header>

        <div className="vds-wh-list">
          {/* Endpoint 1 — healthy */}
          <article className="vds-wh-row">
            <div className="vds-wh-row-l">
              <div className="vds-wh-icon">
                <Webhook size={16} strokeWidth={1.8} />
              </div>
              <div>
                <p className="vds-wh-url mono">
                  https://api.efizi.com.br/<strong>via/webhook</strong>
                </p>
                <p className="vds-wh-meta">
                  <span>3 eventos · <em>operator.created · operator.updated · subscription.renewed</em></span>
                </p>
              </div>
            </div>
            <div className="vds-wh-row-r">
              <span className="vds-wh-status ok">
                ativo
              </span>
              <span className="vds-wh-rate mono">
                <strong>99.8%</strong>
                <em>últimos 30d</em>
              </span>
              <button className="vds-wh-row-more" aria-label="Mais opções">
                <MoreHorizontal size={14} strokeWidth={2} />
              </button>
            </div>
          </article>

          {/* Endpoint 2 — degraded */}
          <article className="vds-wh-row attention">
            <div className="vds-wh-row-l">
              <div className="vds-wh-icon attn">
                <Webhook size={16} strokeWidth={1.8} />
              </div>
              <div>
                <p className="vds-wh-url mono">
                  https://hooks.lumin.app/<strong>via-ingest</strong>
                </p>
                <p className="vds-wh-meta">
                  <span>2 eventos · 12 retries pendentes · próximo em <em>2 min</em></span>
                </p>
              </div>
            </div>
            <div className="vds-wh-row-r">
              <span className="vds-wh-status attn">
                degradado
              </span>
              <span className="vds-wh-rate mono">
                <strong>78.4%</strong>
                <em>últimos 30d</em>
              </span>
              <button className="vds-wh-row-more" aria-label="Mais opções">
                <MoreHorizontal size={14} strokeWidth={2} />
              </button>
            </div>
          </article>

          {/* Endpoint 3 — healthy, low traffic */}
          <article className="vds-wh-row">
            <div className="vds-wh-row-l">
              <div className="vds-wh-icon">
                <Webhook size={16} strokeWidth={1.8} />
              </div>
              <div>
                <p className="vds-wh-url mono">
                  https://api.olara.bank/internal/<strong>via</strong>
                </p>
                <p className="vds-wh-meta">
                  <span>1 evento · <em>audit.log</em> · throughput baixo</span>
                </p>
              </div>
            </div>
            <div className="vds-wh-row-r">
              <span className="vds-wh-status ok">
                ativo
              </span>
              <span className="vds-wh-rate mono">
                <strong>100%</strong>
                <em>últimos 30d</em>
              </span>
              <button className="vds-wh-row-more" aria-label="Mais opções">
                <MoreHorizontal size={14} strokeWidth={2} />
              </button>
            </div>
          </article>
        </div>

        {/* Signing secret block */}
        <div className="vds-wh-secret">
          <header>
            <div className="vds-wh-secret-icon">
              <KeyRound size={16} strokeWidth={1.8} />
            </div>
            <div>
              <h4>Signing secret · HMAC-SHA256</h4>
              <p>Verifique a assinatura no header <code>VIA-Signature</code> antes de processar o payload. Rotação preserva o secret antigo por 24h pra evitar quebra de produção.</p>
            </div>
          </header>
          <div className="vds-wh-secret-key">
            <span className="lbl mono">whsec_·····</span>
            <span className="key mono">whsec_a4f8c0e29f7b4e83b521·····6c1f7a09b482</span>
            <div className="vds-wh-secret-actions">
              <button className="vds-wh-secret-btn">
                <Eye size={12} strokeWidth={2.2} />
                Revelar
              </button>
              <button className="vds-wh-secret-btn">
                <Copy size={12} strokeWidth={2.2} />
                Copiar
              </button>
              <button className="vds-wh-secret-btn warn">
                <RefreshCw size={12} strokeWidth={2.2} />
                Rotacionar
              </button>
            </div>
          </div>
          <p className="vds-wh-secret-foot">
            Última rotação · <strong>12 abr 2026 · 11:42 BRT</strong> · feita por Rafael Milagre
          </p>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Permissions matrix ---------- */
function PermissionsMatrixSection() {
  const roles = ['Owner', 'Admin', 'Editor', 'Operador', 'Visitante'];
  const perms = [
    { name: 'Ver dashboard geral', vals: [true, true, true, true, true] },
    { name: 'Editar operadores', vals: [true, true, true, false, false] },
    { name: 'Criar operadores', vals: [true, true, false, false, false] },
    { name: 'Configurar webhooks', vals: [true, true, false, false, false] },
    { name: 'Acessar audit log', vals: [true, true, false, false, false] },
    { name: 'Rotacionar API keys', vals: [true, false, false, false, false] },
    { name: 'Convidar membros', vals: [true, true, false, false, false] },
    { name: 'Excluir conta', vals: [true, false, false, false, false] },
  ];

  return (
    <Section title="Permissions matrix · 5 papéis · 8 capacidades" meta="grid escalável · linhas filtráveis · células interativas">
      <article className="vds-perm">
        <header className="vds-perm-head">
          <div>
            <h3>Permissões por papel</h3>
            <p>Define o que cada papel pode fazer no produto. Mudanças são auditadas automaticamente — só Owner pode aprovar.</p>
          </div>
          <div className="vds-perm-tag">
            <Shield size={12} strokeWidth={2.2} />
            sincronizado · há 4 min
          </div>
        </header>

        <div className="vds-perm-scroll">
          <table className="vds-perm-table">
            <thead>
              <tr>
                <th className="vds-perm-cap">Capacidade</th>
                {roles.map((r, i) => (
                  <th key={r} className={`vds-perm-role ${i === 0 ? 'highlight' : ''}`}>
                    <span className="role-name">{r}</span>
                    <span className="role-meta mono">{i === 0 ? '1 pessoa' : i === 1 ? '3 pessoas' : i === 2 ? '12 pessoas' : i === 3 ? '47 pessoas' : '218 pessoas'}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perms.map((p) => (
                <tr key={p.name}>
                  <td className="vds-perm-cap">{p.name}</td>
                  {p.vals.map((v, j) => (
                    <td key={j} className={`vds-perm-cell ${v ? 'on' : ''} ${j === 0 ? 'highlight' : ''}`}>
                      {v ? (
                        <span className="vds-perm-mark">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="vds-perm-empty">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="vds-perm-foot">
          <p>
            <strong>281 pessoas</strong> no time · permissões em massa via Owner ou via convite individual.
          </p>
          <div className="vds-perm-actions">
            <button className="vds-perm-btn ghost">Exportar como CSV</button>
            <button className="vds-perm-btn primary">
              Editar matriz
              <ArrowRight size={12} strokeWidth={2.4} />
            </button>
          </div>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Settings sections ---------- */
function SettingsSection() {
  return (
    <Section title="Settings · seções editoriais" meta="cada bloco com título + explicação + controle">
      <div className="vds-settings">
        <article className="vds-settings-row">
          <div className="vds-settings-l">
            <h4>Nome de exibição</h4>
            <p>É como você aparece no Discord, nas discussões e nas menções. Pode mudar quando quiser — mas o histórico dos posts antigos não atualiza.</p>
          </div>
          <div className="vds-settings-r">
            <div className="vds-settings-field">
              <input className="vds-settings-input" aria-label="Nome público" defaultValue="Rafael Milagre" />
              <button className="vds-settings-save">Salvar</button>
            </div>
          </div>
        </article>

        <article className="vds-settings-row">
          <div className="vds-settings-l">
            <h4>Email primário</h4>
            <p>Pra onde mandamos confirmações, recibos e notificações de live. Mudar exige verificação do novo e-mail.</p>
          </div>
          <div className="vds-settings-r">
            <div className="vds-settings-field">
              <input className="vds-settings-input" aria-label="Email primário" defaultValue="rafael@viverdeia.ai" />
              <span className="vds-settings-verified">
                <CheckCircle2 size={12} strokeWidth={2.4} />
                Verificado
              </span>
            </div>
          </div>
        </article>

        <article className="vds-settings-row">
          <div className="vds-settings-l">
            <h4>Notificações por e-mail</h4>
            <p>Você sempre recebe avisos críticos (pagamento, segurança). Aqui você ajusta o que mais quer ouvir.</p>
          </div>
          <div className="vds-settings-r">
            <ul className="vds-settings-toggles">
              <li>
                <span>
                  <strong>Resumo semanal</strong>
                  <em>Toda segunda · novidades e métricas suas</em>
                </span>
                <label className="vds-toggle">
                  <input type="checkbox" aria-label="Receber resumo semanal" defaultChecked />
                  <span />
                </label>
              </li>
              <li>
                <span>
                  <strong>Convites de live</strong>
                  <em>Sempre que tiver evento programado</em>
                </span>
                <label className="vds-toggle">
                  <input type="checkbox" aria-label="Receber convites de live" defaultChecked />
                  <span />
                </label>
              </li>
              <li>
                <span>
                  <strong>Comentários nas suas notas</strong>
                  <em>Quando alguém citar ou responder</em>
                </span>
                <label className="vds-toggle">
                  <input type="checkbox" aria-label="Notificar comentários nas suas notas" />
                  <span />
                </label>
              </li>
            </ul>
          </div>
        </article>

        <article className="vds-settings-row danger">
          <div className="vds-settings-l">
            <h4>Apagar conta</h4>
            <p>Remove todo seu histórico, notas, comentários e progresso. <strong>Ação permanente.</strong> Recibos continuam acessíveis no portal financeiro por 5 anos por exigência legal.</p>
          </div>
          <div className="vds-settings-r">
            <button className="vds-settings-danger">
              <Trash2 size={13} strokeWidth={2.2} />
              Apagar minha conta
            </button>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* ---------- API Key card ---------- */
function ApiKeySection() {
  const [revealed, setRevealed] = useState(false);
  const fullKey = 'sk-via-2026-d8a4c0e29f7b4e83b521-6c1f7a09b482';
  const masked = '••••••••••••••••••••••••••••••' + fullKey.slice(-6);

  return (
    <Section title="API keys · gerenciamento" meta="rotação · revoke · uso recente · copiar com confirmação">
      <div className="vds-apikeys">
        <header>
          <div>
            <h3>Chaves de API · plano Mentoria</h3>
            <p>Você pode criar até 3 chaves simultâneas. Cada uma tem permissões e logs de uso separados.</p>
          </div>
          <button className="vds-apikeys-new">
            <Key size={13} strokeWidth={2.2} />
            Nova chave
          </button>
        </header>

        <article className="vds-apikey-card">
          <div className="vds-apikey-top">
            <div>
              <span className="vds-apikey-tag prod">production</span>
              <h4>nina-classifier · produção</h4>
              <p>Criada por <strong>Rafael Milagre</strong> em 12 mai 2026 · escopo <em>read+write</em></p>
            </div>
            <span className="vds-apikey-status ok">
              ativa
            </span>
          </div>

          <div className="vds-apikey-token">
            <code className="vds-apikey-code">{revealed ? fullKey : masked}</code>
            <button className="vds-apikey-eye" onClick={() => setRevealed(!revealed)}>
              {revealed ? <EyeOff size={12} strokeWidth={2} /> : <Eye size={12} strokeWidth={2} />}
              {revealed ? 'Ocultar' : 'Revelar'}
            </button>
            <button className="vds-apikey-copy">
              <Copy size={12} strokeWidth={2} /> Copiar
            </button>
          </div>

          <div className="vds-apikey-bottom">
            <div className="vds-apikey-meta">
              <span><strong>2.4K</strong> requisições nas últimas 24h</span>
              <span>·</span>
              <span><strong>98,7%</strong> taxa de sucesso</span>
              <span>·</span>
              <span>último uso há 32s</span>
            </div>
            <div className="vds-apikey-actions">
              <button className="vds-apikey-btn ghost">
                <RefreshCw size={12} strokeWidth={2} />
                Rotacionar
              </button>
              <button className="vds-apikey-btn danger">
                <Trash2 size={12} strokeWidth={2} />
                Revogar
              </button>
            </div>
          </div>
        </article>

        <article className="vds-apikey-card warn">
          <div className="vds-apikey-top">
            <div>
              <span className="vds-apikey-tag dev">development</span>
              <h4>nina-classifier · staging</h4>
              <p>Criada por <strong>Yago Almeida</strong> em 03 fev 2026 · escopo <em>read</em></p>
            </div>
            <span className="vds-apikey-status warn">
              <AlertTriangle size={11} strokeWidth={2.2} />
              expira em 8 dias
            </span>
          </div>

          <div className="vds-apikey-token">
            <code className="vds-apikey-code">sk-dev-via-2026-3f••••••••••••••••••••••8a</code>
            <button className="vds-apikey-eye">
              <Eye size={12} strokeWidth={2} /> Revelar
            </button>
            <button className="vds-apikey-copy">
              <Copy size={12} strokeWidth={2} /> Copiar
            </button>
          </div>

          <div className="vds-apikey-bottom">
            <div className="vds-apikey-meta">
              <span><strong>180</strong> req · 24h</span>
              <span>·</span>
              <span>uso esporádico</span>
            </div>
            <div className="vds-apikey-actions">
              <button className="vds-apikey-btn primary">
                <RefreshCw size={12} strokeWidth={2} />
                Renovar agora
              </button>
            </div>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* ---------- Plan / billing ---------- */
function BillingSection() {
  return (
    <Section title="Plan & billing overview · plano corrente + histórico" meta="próxima cobrança · método de pagamento · recibos">
      <div className="vds-billing">
        <div className="vds-billing-current">
          <header>
            <span className="vds-billing-eyebrow">Plano atual</span>
            <h3>
              <Crown size={18} strokeWidth={1.6} />
              Mentoria · trimestral
            </h3>
            <p>R$ 1.840 / trimestre · próxima cobrança em <strong>17 ago 2026</strong></p>
          </header>

          <div className="vds-billing-meta">
            <div>
              <strong>R$ 1.840</strong>
              <em>próxima cobrança</em>
            </div>
            <div>
              <strong>17 ago</strong>
              <em>data prevista</em>
            </div>
            <div>
              <strong>4 / 12</strong>
              <em>sessões neste tri</em>
            </div>
          </div>

          <div className="vds-billing-actions">
            <button className="vds-billing-btn primary">
              <CreditCard size={13} strokeWidth={2.2} />
              Alterar método
            </button>
            <button className="vds-billing-btn ghost">
              Mudar pra anual <span>(2 meses grátis)</span>
              <ChevronRight size={13} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="vds-billing-method">
          <span className="vds-billing-eyebrow">Método de pagamento</span>
          <div className="vds-billing-card">
            <div className="vds-billing-cc">
              <span className="vds-cc-brand">VISA</span>
              <span className="vds-cc-dots">•••• •••• •••• 4821</span>
              <span className="vds-cc-exp">12 / 2028</span>
            </div>
            <p>Cartão principal · cobrança automática habilitada</p>
            <button className="vds-billing-btn ghost sm">Trocar cartão</button>
          </div>
        </div>

        <div className="vds-billing-history">
          <header>
            <h4>Histórico de cobranças</h4>
            <a href="#">Ver todas <ChevronRight size={12} strokeWidth={2.4} /></a>
          </header>
          <ul>
            <li>
              <span className="d">17 mai 2026</span>
              <span className="desc">Mentoria · trimestre · renovação</span>
              <span className="amt">R$ 1.840,00</span>
              <span className="st ok"><CheckCircle2 size={11} strokeWidth={2.4} /> pago</span>
              <button aria-label="Baixar"><Download size={12} strokeWidth={2.2} /></button>
            </li>
            <li>
              <span className="d">17 fev 2026</span>
              <span className="desc">Mentoria · trimestre</span>
              <span className="amt">R$ 1.840,00</span>
              <span className="st ok"><CheckCircle2 size={11} strokeWidth={2.4} /> pago</span>
              <button aria-label="Baixar"><Download size={12} strokeWidth={2.2} /></button>
            </li>
            <li>
              <span className="d">17 nov 2025</span>
              <span className="desc">Mentoria · trimestre</span>
              <span className="amt">R$ 1.840,00</span>
              <span className="st ok"><CheckCircle2 size={11} strokeWidth={2.4} /> pago</span>
              <button aria-label="Baixar"><Download size={12} strokeWidth={2.2} /></button>
            </li>
            <li>
              <span className="d">17 ago 2025</span>
              <span className="desc">Mentoria · trimestre · primeira parcela</span>
              <span className="amt">R$ 1.840,00</span>
              <span className="st ok"><CheckCircle2 size={11} strokeWidth={2.4} /> pago</span>
              <button aria-label="Baixar"><Download size={12} strokeWidth={2.2} /></button>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Audit log timeline ---------- */
function AuditLogSection() {
  const events = [
    { time: '14:32', day: 'Hoje', who: 'Rafael Milagre', action: 'rotacionou chave', detail: 'nina-classifier · production', icon: KeyRound, type: 'security' },
    { time: '11:18', day: 'Hoje', who: 'Yago Almeida', action: 'criou nova API key', detail: 'staging · escopo read', icon: Key, type: 'create' },
    { time: '09:42', day: 'Hoje', who: 'Sistema', action: 'cobrança processada', detail: 'R$ 1.840,00 · método VISA •••• 4821', icon: CreditCard, type: 'system' },
    { time: '23:08', day: 'ontem', who: 'Mateus Silva', action: 'adicionou 3 alunos ao plano Corporate', detail: 'Mantra Tech · convites enviados', icon: UserPlus, type: 'team' },
    { time: '17:42', day: 'ontem', who: 'Rafael Milagre', action: 'editou as configurações de notificação', detail: 'desligou "comentários nas suas notas"', icon: FileEdit, type: 'change' },
    { time: '14:00', day: 'ontem', who: 'Rafael Milagre', action: 'login pela primeira vez de São Paulo', detail: 'IP 187.18.84.22 · macOS Safari', icon: LogIn, type: 'security' },
    { time: '09:30', day: '14 mai', who: 'Sistema', action: 'detectou tentativa de login suspeita', detail: 'IP 102.214.18.7 · bloqueado · usuário não afetado', icon: Shield, type: 'security-warn' },
  ];

  return (
    <Section title="Audit log · histórico de ações sensíveis" meta="quem · quando · o que mudou · sempre filtrável">
      <div className="vds-audit">
        <header>
          <h3>Histórico de operações</h3>
          <div className="vds-audit-tabs">
            <button className="on">Todas</button>
            <button>Segurança</button>
            <button>API</button>
            <button>Time</button>
            <button>Pagamentos</button>
          </div>
        </header>

        <ul className="vds-audit-list">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <li key={i} className={`vds-audit-item ${e.type}`}>
                <div className="vds-audit-meta">
                  <span className="time">{e.time}</span>
                  <span className="day">{e.day}</span>
                </div>
                <span className="vds-audit-icon">
                  <Icon size={13} strokeWidth={2} />
                </span>
                <div className="vds-audit-text">
                  <p>
                    <strong>{e.who}</strong> {e.action}
                  </p>
                  <span>{e.detail}</span>
                </div>
                <span className={`vds-audit-tag ${e.type}`}>
                  {e.type === 'security' && 'segurança'}
                  {e.type === 'security-warn' && 'aviso'}
                  {e.type === 'create' && 'criação'}
                  {e.type === 'system' && 'sistema'}
                  {e.type === 'team' && 'time'}
                  {e.type === 'change' && 'mudança'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
