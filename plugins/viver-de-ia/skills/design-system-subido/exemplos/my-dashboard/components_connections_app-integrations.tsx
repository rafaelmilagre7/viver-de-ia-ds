import { useEffect, useRef, useState } from "react";
import { useCallbackOrigin } from "@/lib/connectors/use-callback-origin";
import { CheckCircle2, ChevronDown, Copy, Loader2, Save } from "lucide-react";
import { BrandIcon } from "@/components/sources/brand-icon";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authHeaders } from "@/lib/api-headers";
import { cn } from "@/lib/utils";

/**
 * Credenciais do aplicativo desta instalação: valem para todos os usuários e só
 * administrador cadastra.
 *
 * Moravam em Configurações → IA, aba que não tem nada a ver com OAuth de ERP nem
 * com remetente de e-mail, e num bloco só, onde Resend, Google e Bling se
 * misturavam. Aqui ficam ao lado das conexões que elas destravam, separadas por
 * assunto.
 */

interface AppField {
  service: string;
  label: string;
  /** Ensina de onde sai o valor — sem isso o admin procurava no portal errado. */
  placeholder: string;
  secret: boolean;
  /**
   * Instrução que não cabe no placeholder e que, se faltar, faz a credencial
   * ser cadastrada de um jeito que funciona no teste e vaza em produção (o
   * caso é a chave do seletor de planilhas, que precisa de restrição por
   * referenciador). Fica visível embaixo do campo, não escondida no sumiço do
   * placeholder quando o admin começa a digitar.
   */
  help?: string;
}

interface AppGroup {
  id: string;
  label: string;
  fields: AppField[];
  /**
   * URLs de retorno a cadastrar no app do fornecedor. É uma lista porque a
   * mesma credencial pode ser usada por mais de um caminho do app: quando só
   * uma aparecia, o admin cadastrava uma URI só e a outra falhava.
   */
  callbacks?: { path: string; help: string }[];
}

const GROUPS: AppGroup[] = [
  {
    id: "google",
    label: "Conta Google",
    // As duas URIs saem da MESMA credencial OAuth do Google Cloud. Mostrar só a
    // primeira ensinava a configurar errado: o Google Ads não passa pelo
    // /api/google/callback — o conector declara oauth com appService "google"
    // (google-ads.server.ts) e o fluxo genérico monta o retorno como
    // /api/oauth/callback (oauth.server.ts). Com uma URI só cadastrada, conectar
    // o Google Ads em Fontes → Nova fonte morria em redirect_uri_mismatch, e
    // nada na tela dizia o que faltava.
    callbacks: [
      {
        path: "/api/google/callback",
        help: "Para a conta Google desta tela (Analytics, Search Console, Planilhas). Cadastre como URI de redirecionamento autorizado na credencial OAuth do Google Cloud Console.",
      },
      {
        path: "/api/oauth/callback",
        help: "Para o Google Ads, conectado em Fontes → Nova fonte com a mesma credencial (escopo adwords). Cadastre esta segunda URI na mesma credencial do Google Cloud Console — sem ela o Google recusa com erro 400, redirect_uri_mismatch.",
      },
    ],
    fields: [
      {
        service: "google_client_id",
        label: "ID do cliente OAuth",
        placeholder: "…apps.googleusercontent.com — Google Cloud Console → Credenciais",
        secret: false,
      },
      {
        service: "google_client_secret",
        label: "Chave secreta do cliente OAuth",
        placeholder: "GOCSPX-… — a mesma credencial do Google Cloud Console",
        secret: true,
      },
      {
        // O Sheets pedia spreadsheets.readonly, escopo que o Google classifica
        // como SENSÍVEL: enquanto a verificação do app não sai, são no máximo
        // 100 usuários cadastrados um a um, tela de "app não verificado" na
        // cara do cliente e refresh token morrendo em 7 dias. Agora o app pede
        // drive.file, que é NÃO SENSÍVEL e só alcança o arquivo que a pessoa
        // escolheu no seletor do próprio Google (Picker). O seletor, além do
        // login, exige uma chave de API — daí este campo: sem ele o cliente
        // clica em "escolher planilha" e não abre nada.
        service: "google_picker_api_key",
        label: "Chave de API do seletor de planilhas",
        placeholder:
          "AIza… — Google Cloud Console → Credenciais → Criar credenciais → Chave de API",
        secret: false,
        help: "Restrinja a chave por referenciador HTTP aos endereços deste app (por exemplo https://seupainel.com.br/*) em Restrições do aplicativo. O seletor do Google roda no navegador e a chave vai junto: sem essa restrição, qualquer site poderia usá-la na sua cota.",
      },
      {
        // O Google EXIGE o número do projeto no seletor quando o escopo é
        // drive.file: é ele que amarra o arquivo escolhido a ESTE app. Sem o
        // número, a pessoa escolhe a planilha e o app não recebe acesso a ela —
        // e o erro aparece dentro do quadro do Google, longe daqui.
        service: "google_project_number",
        label: "Número do projeto do Google Cloud",
        placeholder:
          "123456789012 — Google Cloud Console → Página inicial → Informações do projeto",
        secret: false,
        help: "É o número, não o ID do projeto. Ele vai junto com a chave de API quando o seletor abre, e sem ele o Google não libera para o app a planilha que a pessoa escolheu.",
      },
      {
        service: "google_ads_developer_token",
        label: "Token de desenvolvedor do Google Ads",
        placeholder: "Central de API do Google Ads — acesso Básico ou Padrão",
        secret: true,
      },
    ],
  },
  {
    id: "erp",
    label: "ERPs",
    callbacks: [
      {
        path: "/api/oauth/callback",
        help: "Cadastre como URL de retorno no app criado em developer.bling.com.br e no de developers-portal.contaazul.com.",
      },
    ],
    fields: [
      {
        service: "bling_client_id",
        label: "Bling · ID do cliente",
        placeholder: "Client ID do app criado em developer.bling.com.br",
        secret: false,
      },
      {
        service: "bling_client_secret",
        label: "Bling · Chave secreta",
        placeholder: "Client Secret do mesmo app do Bling",
        secret: true,
      },
      {
        service: "contaazul_client_id",
        label: "Conta Azul · ID do cliente",
        placeholder: "Client ID do app criado em developers-portal.contaazul.com",
        secret: false,
      },
      {
        service: "contaazul_client_secret",
        label: "Conta Azul · Chave secreta",
        placeholder: "Client Secret do mesmo app da Conta Azul",
        secret: true,
      },
    ],
  },
  {
    id: "email",
    label: "Envio de e-mail",
    fields: [
      {
        service: "resend",
        label: "Chave de API da Resend",
        placeholder: "re_… — API Keys no painel da Resend",
        secret: true,
      },
      {
        service: "resend_from",
        label: "Remetente dos alertas",
        placeholder: "Minha Empresa <alertas@seudominio.com> — domínio verificado na Resend",
        secret: false,
      },
    ],
  },
];

const ALL_FIELDS = GROUPS.flatMap((group) => group.fields);

const LABEL_CLASS =
  "text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]";

/**
 * Copia um texto e diz se conseguiu.
 *
 * navigator.clipboard só existe em contexto seguro (https ou localhost). Numa
 * instalação aberta por http (rede interna, http://192.168.0.20:3000) o objeto
 * é undefined e `navigator.clipboard.writeText(...)` estourava um TypeError
 * SÍNCRONO: nenhuma promise chegava a existir, o tratamento de erro no .then
 * nunca rodava e o botão ficava mudo — o admin colava no Google Cloud o que já
 * estava na área de transferência. O try/catch pega esse caso (e também o de
 * navegador que lança com o documento sem foco), e o caminho antigo com
 * execCommand ainda copia de verdade em http.
 */
async function copiarTexto(texto: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(texto);
      return true;
    }
  } catch {
    /* segue para o caminho antigo */
  }
  try {
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

/** Linha da URL de retorno, com botão de copiar. */
function CallbackRow({ path, help }: { path: string; help: string }) {
  const [copied, setCopied] = useState(false);
  const urlRef = useRef<HTMLElement>(null);
  // no servidor não existe window; o cartão só chega ao DOM depois do fetch, mas
  // o caminho sozinho ainda é um texto honesto se alguém renderizar antes disso
  // a origem vem do servidor: é ele quem monta o redirect_uri que o provedor
  // recebe, e atrás de um proxy ela não é a mesma do navegador
  const origin = useCallbackOrigin();
  const url = origin ? `${origin}${path}` : path;

  /** Deixa a URL selecionada na tela: quando não dá para copiar, ao menos dá para pegar à mão. */
  function selecionarUrl() {
    const node = urlRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return (
    <div className="mb-[var(--via-space-4)] rounded-[var(--via-radius-md)] border border-[var(--via-border-soft)] bg-[var(--via-navy-03)] p-[var(--via-space-3)]">
      <div className="flex flex-wrap items-center gap-2">
        {/* select-all: um clique já marca a URL inteira, sem arrastar o mouse */}
        <code
          ref={urlRef}
          className="min-w-0 flex-1 truncate font-mono text-[11px] text-[var(--via-text-primary)] select-all"
        >
          {url}
        </code>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            void copiarTexto(url).then((ok) => {
              if (ok) {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
                return;
              }
              // não conseguiu copiar: em vez de fingir que copiou, marca a URL na
              // tela e diz o que fazer
              selecionarUrl();
              toast.error("O navegador não deixou copiar.", {
                description: "A URL ficou selecionada aqui na tela: use Ctrl+C (ou ⌘C).",
              });
            });
          }}
        >
          <Copy className="mr-2 h-3.5 w-3.5" />
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      <p className="mt-1.5 text-xs text-[var(--via-text-soft)]">{help}</p>
    </div>
  );
}

interface AppIntegrationsCardProps {
  /**
   * Avisa a página quais credenciais acabaram de entrar no cofre.
   *
   * Sem isso, salvar o Client ID do Google aqui não mexia no cartão do Google
   * logo acima: a tela dizia "salvo" embaixo e "Ainda não configurado nesta
   * instalação" em cima, no mesmo rolar de página.
   */
  onSaved?: (services: string[]) => void;
}

export function AppIntegrationsCard({ onSaved }: AppIntegrationsCardProps = {}) {
  const [configured, setConfigured] = useState<Record<string, boolean> | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const headers = await authHeaders();
      if (!headers) return;
      try {
        const resp = await fetch("/api/keys", { headers });
        if (!resp.ok) return;
        const data = (await resp.json()) as { app?: Record<string, boolean> | null };
        // app: null é a resposta para quem não é administrador. Falha de rede cai
        // aqui também e some com o cartão de propósito: não dá para distinguir os
        // dois casos, e um aviso de erro apareceria para todo usuário comum.
        if (!cancelled && data.app) setConfigured(data.app);
      } catch {
        /* segue sem o cartão */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    const filled = ALL_FIELDS.map((field) => ({
      field,
      value: (values[field.service] ?? "").trim(),
    })).filter((entry) => entry.value);

    // campo vazio é ignorado: é assim que "deixar como está" funciona
    if (filled.length === 0) {
      setMessage({ ok: false, text: "Preencha ao menos um campo para salvar." });
      return;
    }

    setSaving(true);
    setMessage(null);
    const headers = await authHeaders();
    if (!headers) {
      setSaving(false);
      setMessage({ ok: false, text: "Sua sessão expirou. Entre de novo para salvar." });
      return;
    }

    const results = await Promise.all(
      filled.map(async ({ field, value }) => {
        try {
          const resp = await fetch("/api/keys", {
            method: "POST",
            headers,
            body: JSON.stringify({ service: field.service, value }),
          });
          const body = (await resp.json().catch(() => ({}))) as { error?: string };
          return { field, ok: resp.ok, error: body.error };
        } catch {
          return { field, ok: false, error: "Não foi possível falar com o servidor." };
        }
      }),
    );
    setSaving(false);

    const saved = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    if (saved.length > 0) {
      setConfigured((prev) => ({
        ...(prev ?? {}),
        ...Object.fromEntries(saved.map((r) => [r.field.service, true])),
      }));
      // só limpa o que entrou no cofre: o que falhou continua digitado para o
      // admin corrigir e tentar de novo sem redigitar tudo
      setValues((prev) => {
        const next = { ...prev };
        for (const r of saved) delete next[r.field.service];
        return next;
      });
      // avisa mesmo quando só parte dos campos entrou: o cartão de cima pode
      // depender justamente do que deu certo
      onSaved?.(saved.map((r) => r.field.service));
    }

    if (failed.length === 0) {
      const n = saved.length;
      setMessage({ ok: true, text: `${n} campo${n === 1 ? "" : "s"} salvo${n === 1 ? "" : "s"}.` });
      return;
    }

    // A tela antiga trocava qualquer resposta !ok por "Erro ao salvar. Tente
    // novamente." e jogava fora o motivo real ("Apenas administradores configuram
    // integrações do app"), que é justamente o que resolve o problema. Agora vem
    // o texto do servidor e, quando só parte falhou, o nome dos campos.
    const reasons = new Set(failed.map((r) => r.error ?? "não foi possível salvar"));
    const detail =
      saved.length === 0 && reasons.size === 1
        ? [...reasons][0]
        : failed.map((r) => `${r.field.label} (${r.error ?? "falhou"})`).join(" · ");
    setMessage({
      ok: false,
      text:
        saved.length === 0
          ? detail
          : `${saved.length} de ${results.length} campos salvos. Não deu para salvar: ${detail}`,
    });
  }

  if (!configured) return null;

  return (
    <section className="space-y-[var(--via-space-3)]">
      {/* o rótulo mora aqui, e não na página, porque a seção inteira some para
          quem não é administrador */}
      <p className={LABEL_CLASS}>Integrações do app</p>

      <div className="overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] shadow-[0_1px_0_var(--via-edge-hi)_inset,0_10px_24px_-16px_var(--via-shadow-ink-14)]">
        <header className="border-b border-[var(--via-border-soft)] p-[var(--via-space-5)]">
          <h2 className="text-base font-medium text-[var(--via-text-primary)]">
            Credenciais desta instalação
          </h2>
          <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">
            Cadastradas uma vez por um administrador e usadas por todos os usuários. Ficam
            criptografadas no cofre — o valor nunca volta para a tela.
          </p>
        </header>

        <div className="space-y-[var(--via-space-6)] p-[var(--via-space-5)]">
          {GROUPS.map((group) => (
            <div key={group.id}>
              <p className={cn("mb-3", LABEL_CLASS)}>{group.label}</p>
              {group.callbacks?.map((callback) => (
                <CallbackRow key={callback.path} path={callback.path} help={callback.help} />
              ))}
              <div className="space-y-[var(--via-space-4)]">
                {group.fields.map((field) => (
                  <div key={field.service} className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor={`app-${field.service}`}
                        className="text-sm font-medium text-[var(--via-text-primary)]"
                      >
                        {field.label}
                      </label>
                      {configured[field.service] && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--via-border-soft)] bg-[var(--via-navy-04)] px-2 py-0.5 text-[11px] font-medium text-[var(--via-navy)]">
                          <CheckCircle2 className="h-3 w-3" /> configurado
                        </span>
                      )}
                    </div>
                    <Input
                      id={`app-${field.service}`}
                      type={field.secret ? "password" : "text"}
                      autoComplete="off"
                      spellCheck={false}
                      className="font-mono"
                      placeholder={field.placeholder}
                      value={values[field.service] ?? ""}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.service]: e.target.value }))
                      }
                    />
                    {field.help && (
                      <p className="text-xs text-[var(--via-text-soft)]">{field.help}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--via-border-soft)] px-[var(--via-space-5)] py-[var(--via-space-4)]">
          <Button disabled={saving} onClick={() => void save()}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Salvar integrações
          </Button>
          <span className="text-xs text-[var(--via-text-soft)]">
            Campo em branco fica como está.
          </span>
          {message && (
            <p
              role="status"
              className={cn(
                "w-full text-sm",
                message.ok ? "text-[var(--via-navy)]" : "text-[var(--via-coral-dark)]",
              )}
            >
              {message.text}
            </p>
          )}
        </footer>
      </div>
    </section>
  );
}

/* ==========================================================================
 * Revenue++ · Instalação redesenhada
 *
 * O cartão acima despejava 11 campos num bloco só, com Bling e Conta Azul
 * misturados em "ERPs". Aqui cada serviço é um cartão com o logo, o que ele
 * destrava e o status; o formulário fica recolhido até a pessoa ir configurar,
 * em dois passos numerados (URL de retorno → credenciais), com Salvar próprio.
 * Mesmos campos, mesma rota (/api/keys) e mesmo cofre do cartão antigo.
 * ======================================================================== */

interface Provider {
  id: string;
  brand: string;
  /** logotipo oficial (só por extenso, sem símbolo): ocupa um espaço largo */
  logo?: { src: string; height: number };
  name: string;
  unlocks: string;
  fields: AppField[];
  callbacks?: { path: string; help: string }[];
}

const byService = (prefix: string) => ALL_FIELDS.filter((f) => f.service.startsWith(prefix));
const googleGroup = GROUPS.find((g) => g.id === "google");

const PROVIDERS: Provider[] = [
  {
    id: "google",
    brand: "google",
    name: "Google",
    unlocks: "Planilhas, Analytics, Search Console e Google Ads em Fontes",
    fields: byService("google_"),
    callbacks: googleGroup?.callbacks,
  },
  {
    id: "bling",
    brand: "bling",
    logo: { src: "/brand/integracoes/bling.svg", height: 22 },
    name: "Bling",
    unlocks: "Pedidos, produtos e notas do ERP Bling",
    fields: byService("bling_"),
    callbacks: [
      {
        path: "/api/oauth/callback",
        help: "Cadastre como URL de retorno no app criado em developer.bling.com.br.",
      },
    ],
  },
  {
    id: "contaazul",
    brand: "contaazul",
    logo: { src: "/brand/integracoes/contaazul.svg", height: 13 },
    name: "Conta Azul",
    unlocks: "Financeiro, vendas e clientes do ERP Conta Azul",
    fields: byService("contaazul_"),
    callbacks: [
      {
        path: "/api/oauth/callback",
        help: "Cadastre como URL de retorno no app criado em developers-portal.contaazul.com.",
      },
    ],
  },
  {
    id: "resend",
    brand: "resend",
    name: "Resend",
    unlocks: "Envio por e-mail dos alertas de métricas",
    fields: byService("resend"),
  },
];

/** "Bling · ID do cliente" → "ID do cliente": o cartão já diz de quem é. */
function shortLabel(label: string) {
  const i = label.indexOf(" · ");
  return i >= 0 ? label.slice(i + 3) : label;
}

/** Bling e Conta Azul só têm logotipo por extenso: num quadrado ficariam
 *  ilegíveis, então todo provedor ganha o mesmo espaço largo, de fundo
 *  branco nos dois temas (o Bling é quase preto). */
function ProviderLogo({ provider, compact }: { provider: Provider; compact?: boolean }) {
  const scale = compact ? 0.72 : 1;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] bg-white",
        compact ? "h-8 w-[4.5rem]" : "h-11 w-[6.5rem]",
      )}
    >
      {provider.logo ? (
        <img
          src={provider.logo.src}
          alt={provider.name}
          style={{ height: Math.round(provider.logo.height * scale) }}
          className="w-auto"
        />
      ) : (
        <BrandIcon id={provider.brand} size={compact ? 16 : 22} />
      )}
    </span>
  );
}

function ProviderCard({
  provider,
  configured,
  onSaved,
}: {
  provider: Provider;
  configured: Record<string, boolean>;
  onSaved: (services: string[]) => void;
}) {
  const done = provider.fields.filter((f) => configured[f.service]).length;
  const total = provider.fields.length;
  const ready = done === total;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function save() {
    const filled = provider.fields
      .map((field) => ({ field, value: (values[field.service] ?? "").trim() }))
      .filter((e) => e.value);
    if (filled.length === 0) {
      setMessage({ ok: false, text: "Preencha ao menos um campo para salvar." });
      return;
    }
    setSaving(true);
    setMessage(null);
    const headers = await authHeaders();
    if (!headers) {
      setSaving(false);
      setMessage({ ok: false, text: "Sua sessão expirou. Entre de novo para salvar." });
      return;
    }
    const results = await Promise.all(
      filled.map(async ({ field, value }) => {
        try {
          const resp = await fetch("/api/keys", {
            method: "POST",
            headers,
            body: JSON.stringify({ service: field.service, value }),
          });
          const body = (await resp.json().catch(() => ({}))) as { error?: string };
          return { field, ok: resp.ok, error: body.error };
        } catch {
          return { field, ok: false, error: "Não foi possível falar com o servidor." };
        }
      }),
    );
    setSaving(false);
    const saved = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);
    if (saved.length) {
      setValues((prev) => {
        const next = { ...prev };
        for (const r of saved) delete next[r.field.service];
        return next;
      });
      onSaved(saved.map((r) => r.field.service));
    }
    setMessage(
      failed.length === 0
        ? { ok: true, text: `${provider.name} salvo.` }
        : {
            ok: false,
            text: failed
              .map((r) => `${shortLabel(r.field.label)}: ${r.error ?? "falhou"}`)
              .join(" · "),
          },
    );
  }

  return (
    <article className="overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[var(--via-navy-02)]"
      >
        <ProviderLogo provider={provider} />
        <span className="min-w-0 flex-1">
          <span className="block text-base font-medium text-[var(--via-text-primary)]">
            {provider.name}
          </span>
          <span className="mt-0.5 block text-sm text-[var(--via-text-muted)]">
            {provider.unlocks}
          </span>
        </span>
        <span
          className={cn(
            "hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex",
            ready
              ? "bg-[var(--via-navy)] text-white"
              : done > 0
                ? "border border-[var(--via-border)] text-[var(--via-text-primary)]"
                : "border border-dashed border-[var(--via-border)] text-[var(--via-text-muted)]",
          )}
        >
          {ready && <CheckCircle2 className="h-3.5 w-3.5" />}
          {ready ? "Pronta" : done > 0 ? `${done} de ${total} campos` : "Não configurada"}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--via-text-primary)]">
          {ready ? "Editar" : "Configurar"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </span>
      </button>

      {open && (
        <div className="border-t border-[var(--via-border-soft)] bg-[var(--via-navy-02)] p-5">
          <ol className="space-y-6">
            {provider.callbacks && provider.callbacks.length > 0 && (
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy)] text-xs font-semibold text-white">
                  1
                </span>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-sm font-medium text-[var(--via-text-primary)]">
                    Cadastre {provider.callbacks.length > 1 ? "as URLs" : "a URL"} de retorno no{" "}
                    {provider.name}
                  </p>
                  {provider.callbacks.map((c) => (
                    <CallbackRow key={c.path + c.help} path={c.path} help={c.help} />
                  ))}
                </div>
              </li>
            )}
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy)] text-xs font-semibold text-white">
                {provider.callbacks?.length ? 2 : 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="mb-3 text-sm font-medium text-[var(--via-text-primary)]">
                  Cole as credenciais
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {provider.fields.map((field) => (
                    <div
                      key={field.service}
                      className={cn("space-y-1.5", field.help && "sm:col-span-2")}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <label
                          htmlFor={`rpp-${field.service}`}
                          className="text-sm text-[var(--via-text-primary)]"
                        >
                          {shortLabel(field.label)}
                        </label>
                        {configured[field.service] && (
                          <span className="inline-flex items-center gap-1 text-xs text-[var(--via-text-muted)]">
                            <CheckCircle2 className="h-3 w-3" /> salvo
                          </span>
                        )}
                      </div>
                      <Input
                        id={`rpp-${field.service}`}
                        type={field.secret ? "password" : "text"}
                        autoComplete="off"
                        spellCheck={false}
                        className="font-mono"
                        placeholder={
                          configured[field.service]
                            ? "•••••• guardado no cofre — preencha só para trocar"
                            : field.placeholder
                        }
                        value={values[field.service] ?? ""}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [field.service]: e.target.value }))
                        }
                      />
                      {field.help && (
                        <p className="text-xs leading-relaxed text-[var(--via-text-muted)]">
                          {field.help}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--via-border-soft)] pt-4">
            <Button disabled={saving} onClick={() => void save()}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar {provider.name}
            </Button>
            <span className="text-xs text-[var(--via-text-muted)]">
              Campo em branco fica como está. Os valores ficam criptografados e não voltam para a
              tela.
            </span>
            {message && (
              <p
                role="status"
                className={cn(
                  "w-full text-sm",
                  message.ok ? "text-[var(--via-text-primary)]" : "text-[var(--via-coral-dark)]",
                )}
              >
                {message.text}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/** Revenue++ · a Instalação em cartões por serviço, com resumo no topo. */
export function AppIntegrationsPanel() {
  const [configured, setConfigured] = useState<Record<string, boolean> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const headers = await authHeaders();
      if (!headers) return;
      try {
        const resp = await fetch("/api/keys", { headers });
        if (!resp.ok) return;
        const data = (await resp.json()) as { app?: Record<string, boolean> | null };
        if (!cancelled && data.app) setConfigured(data.app);
      } catch {
        /* segue sem o painel, como o cartão antigo */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!configured) return null;

  const readyCount = PROVIDERS.filter((p) => p.fields.every((f) => configured[f.service])).length;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-5">
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
            Integrações desta instalação
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-[var(--via-text-primary)] tabular-nums">
            {readyCount} de {PROVIDERS.length} prontas
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PROVIDERS.map((p) => {
            const ok = p.fields.every((f) => configured[f.service]);
            return (
              <span
                key={p.id}
                title={`${p.name}: ${ok ? "pronta" : "pendente"}`}
                className={cn(
                  "rounded-[var(--via-radius-sm)] ring-2 ring-[var(--via-surface)]",
                  !ok && "opacity-40 grayscale",
                )}
              >
                <ProviderLogo provider={p} compact />
              </span>
            );
          })}
        </div>
      </div>
      {PROVIDERS.map((p) => (
        <ProviderCard
          key={p.id}
          provider={p}
          configured={configured}
          onSaved={(services) =>
            setConfigured((prev) => ({
              ...(prev ?? {}),
              ...Object.fromEntries(services.map((sv) => [sv, true])),
            }))
          }
        />
      ))}
    </section>
  );
}
