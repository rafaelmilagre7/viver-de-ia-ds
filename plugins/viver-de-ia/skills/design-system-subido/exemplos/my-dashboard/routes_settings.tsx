import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import {
  Bot,
  ChevronRight,
  KeyRound,
  Lock,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Save,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { requestOnboardingRestart } from "@/components/onboarding/onboarding-gate";
import { MIN_PASSWORD_LENGTH } from "@/components/auth/login-signup-form";
import { authHeaders } from "@/lib/api-headers";
import {
  SELECTABLE_PROVIDERS,
  getProvider,
  isProviderId,
  type AIProviderId,
} from "@/lib/ai/catalog";
import { cn } from "@/lib/utils";
import { BrandTile } from "@/components/sources/brand-icon";
import { useRevenuePP } from "@/lib/ds-variant";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    const tab = search.tab;
    return tab === "perfil" || tab === "ia" || tab === "conta" ? { tab } : {};
  },
  head: () => ({ meta: [{ title: "Configurações — My Dashboard" }] }),
});

type Tab = "perfil" | "conta" | "ia";

interface UserProfile {
  email: string;
  displayName: string;
  initials: string;
}

/**
 * Quais provedores têm chave ativa no cofre. Nunca guarda o valor das chaves: o
 * cliente só enxerga o status do registro. É parcial de propósito — a tela só
 * conhece os provedores escolhíveis, e "lovable" nunca entra aqui.
 */
type SavedKeys = Partial<Record<AIProviderId, boolean>>;

interface FormMessage {
  ok: boolean;
  text: string;
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "ia", label: "IA", icon: Bot },
  { id: "conta", label: "Conta", icon: Shield },
];

// Mesma ordem do catálogo, que é também a ordem de fallback do motor.
const DEFAULT_PROVIDER: AIProviderId = SELECTABLE_PROVIDERS[0].id;

const CARD_CLASS =
  "overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] shadow-[0_1px_0_var(--via-edge-hi)_inset,0_10px_24px_-16px_var(--via-shadow-ink-14)]";

const FIELD_LABEL_CLASS = "text-sm font-medium text-[var(--via-text-primary)]";

function SettingsPage() {
  const navigate = useNavigate();
  const { tab } = Route.useSearch();
  const [activeTab, setActiveTab] = useState<Tab>(tab ?? "perfil");
  const revenuePP = useRevenuePP();

  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    displayName: "",
    initials: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Um campo de chave só, o do provedor selecionado: antes havia um bloco de JSX
  // inteiro por provedor, e cada provedor novo custava outro bloco igual.
  const [savedKeys, setSavedKeys] = useState<SavedKeys>({});
  const [preferredProvider, setPreferredProvider] = useState<AIProviderId>(DEFAULT_PROVIDER);
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [modelInput, setModelInput] = useState("");
  const [savingKeys, setSavingKeys] = useState(false);
  const [keysMessage, setKeysMessage] = useState<FormMessage | null>(null);
  const didLoadKeys = useRef(false);

  // O modelo guardado pertence ao provedor guardado. Sem lembrar de quem ele é,
  // passear pelo seletor e voltar deixava o campo vazio — e salvar depois disso
  // apagava o modelo que a pessoa nunca quis mexer.
  const savedModelRef = useRef<{ provider: AIProviderId; model: string } | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const didLoad = useRef(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        void navigate({ to: "/login" });
        return;
      }

      const user = session.user;
      setUserId(user.id);
      const email = user.email ?? "";
      const name =
        (user.user_metadata?.display_name as string) ??
        (user.user_metadata?.full_name as string) ??
        email.split("@")[0];
      const initials = name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      setProfile({ email, displayName: name, initials });
      if (!didLoad.current) {
        setDisplayNameInput(name);
        didLoad.current = true;
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!userId || didLoadKeys.current) return;

    // Só o status sai do banco: qual serviço tem chave ativa e a preferência.
    // O valor das chaves vive no Vault e nunca chega ao navegador.
    async function loadKeys() {
      const [{ data: registry }, { data: userRow }] = await Promise.all([
        supabase
          .from("api_keys_registry")
          .select("service_name")
          .eq("user_id", userId as string)
          .eq("is_active", true),
        supabase
          .from("users")
          .select("preferred_ai_provider, preferred_ai_model")
          .eq("id", userId as string)
          .single(),
      ]);

      const services = new Set((registry ?? []).map((r) => r.service_name));
      const status: SavedKeys = {};
      for (const provider of SELECTABLE_PROVIDERS) status[provider.id] = services.has(provider.id);
      setSavedKeys(status);

      // "lovable" também passa por isProviderId, mas não é escolhível: deixá-lo
      // entrar no seletor mostrava um valor sem opção correspondente e o campo
      // aparecia em branco.
      const preferred = userRow?.preferred_ai_provider;
      const selectable =
        isProviderId(preferred) && SELECTABLE_PROVIDERS.some((p) => p.id === preferred)
          ? preferred
          : DEFAULT_PROVIDER;
      setPreferredProvider(selectable);

      const model = userRow?.preferred_ai_model ?? "";
      savedModelRef.current = { provider: selectable, model };
      setModelInput(model);
      didLoadKeys.current = true;
    }

    void loadKeys();
  }, [userId]);

  async function handleSaveProfile() {
    setSaving(true);
    setSaveMessage("");
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayNameInput.trim() },
    });
    setSaveMessage(error ? "Erro ao salvar. Tente novamente." : "Perfil salvo com sucesso!");
    setSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  }

  // Trocar de provedor limpa a chave digitada e o modelo: um id de modelo da
  // OpenAI enviado ao Gemini volta 404 "model not found", sem pista do motivo.
  function handleChangeProvider(next: AIProviderId) {
    setPreferredProvider(next);
    setKeyInput("");
    setShowKey(false);
    setKeysMessage(null);
    const saved = savedModelRef.current;
    setModelInput(saved?.provider === next ? saved.model : "");
  }

  // Grava via rota server-side, que guarda o valor no Vault (set_secret).
  async function handleSaveApiKeys() {
    if (!userId) return;
    setSavingKeys(true);
    setKeysMessage(null);

    const headers = await authHeaders();
    if (!headers) {
      setSavingKeys(false);
      setKeysMessage({ ok: false, text: "Sua sessão expirou. Entre de novo para salvar." });
      return;
    }

    const key = keyInput.trim();
    const model = modelInput.trim();
    try {
      // A chave vai antes da preferência: se ela falhar, o provedor preferido
      // não muda para um que ficou sem chave.
      if (key) {
        const resp = await fetch("/api/keys", {
          method: "POST",
          headers,
          body: JSON.stringify({ service: preferredProvider, value: key }),
        });
        const body = (await resp.json().catch(() => ({}))) as { error?: string };
        if (!resp.ok) throw new Error(body.error ?? "Não foi possível guardar a chave.");
        setSavedKeys((prev) => ({ ...prev, [preferredProvider]: true }));
        setKeyInput("");
        setShowKey(false);
      }

      const resp = await fetch("/api/keys", {
        method: "PATCH",
        headers,
        // Manda o modelo sempre: o que está na tela é a verdade, e campo em
        // branco é o jeito de voltar ao padrão do provedor.
        body: JSON.stringify({ preferred_provider: preferredProvider, preferred_model: model }),
      });
      const body = (await resp.json().catch(() => ({}))) as { error?: string };
      if (!resp.ok) throw new Error(body.error ?? "Não foi possível salvar a preferência.");

      savedModelRef.current = { provider: preferredProvider, model };
      setKeysMessage({
        ok: true,
        text: key
          ? `Chave guardada no cofre. ${getProvider(preferredProvider).label} é o provedor preferido.`
          : "Preferência salva.",
      });
    } catch (err) {
      setKeysMessage({
        ok: false,
        text: err instanceof Error ? err.message : "Erro ao salvar. Tente novamente.",
      });
    }
    setSavingKeys(false);
  }

  async function handleRemoveApiKey(service: AIProviderId) {
    setSavingKeys(true);
    setKeysMessage(null);

    const headers = await authHeaders();
    if (!headers) {
      setSavingKeys(false);
      setKeysMessage({ ok: false, text: "Sua sessão expirou. Entre de novo para remover." });
      return;
    }

    try {
      const resp = await fetch("/api/keys", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ service }),
      });
      const body = (await resp.json().catch(() => ({}))) as { error?: string };
      if (!resp.ok) throw new Error(body.error ?? "Não foi possível remover a chave.");
      setSavedKeys((prev) => ({ ...prev, [service]: false }));
      setKeysMessage({ ok: true, text: `Chave de ${getProvider(service).label} removida.` });
    } catch (err) {
      setKeysMessage({
        ok: false,
        text: err instanceof Error ? err.message : "Erro ao remover a chave. Tente novamente.",
      });
    }
    setSavingKeys(false);
  }

  async function handleChangePassword() {
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setPasswordMessage(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }
    setPasswordSaving(true);
    setPasswordMessage("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordMessage("Erro ao alterar senha. Tente novamente.");
    } else {
      setPasswordMessage("Senha alterada com sucesso!");
      setNewPassword("");
      setTimeout(() => {
        setShowPasswordDialog(false);
        setPasswordMessage("");
      }, 1500);
    }
    setPasswordSaving(false);
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteMessage("");
    try {
      const headers = await authHeaders();
      if (!headers) throw new Error("no session");
      const resp = await fetch("/api/account", { method: "DELETE", headers });
      if (!resp.ok) throw new Error("delete failed");
    } catch {
      setDeleteMessage("Não foi possível excluir a conta. Tente novamente.");
      setDeleting(false);
      return;
    }
    await supabase.auth.signOut();
    void navigate({ to: "/login" });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    void navigate({ to: "/login" });
  }

  const preferredMeta = getProvider(preferredProvider);
  const preferredHasKey = !!savedKeys[preferredProvider];
  const providersWithKey = SELECTABLE_PROVIDERS.filter((p) => savedKeys[p.id]);

  // a seção de IA é a mesma nos dois layouts (o antigo e o da Revenue++)
  const iaContent = (
    <div className="space-y-[var(--via-space-4)]">
      <section className={CARD_CLASS}>
        <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--via-border-soft)] p-[var(--via-space-5)]">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-medium text-[var(--via-text-primary)]">Conexão de IA</h2>
            <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">
              Escolha quem gera seus dashboards e guarde a chave dele. A chave entra no cofre do
              servidor e nunca volta para a tela.
            </p>
          </div>
          {preferredHasKey && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--via-border-soft)] bg-[var(--via-navy-04)] px-2 py-0.5 text-[11px] font-medium text-[var(--via-navy)]">
              <CheckCircle2 className="h-3 w-3" />
              {preferredMeta.label} ativo
            </span>
          )}
        </header>

        <div className="space-y-[var(--via-space-5)] p-[var(--via-space-5)]">
          {!preferredHasKey && (
            <p className="rounded-[var(--via-radius-md)] border border-[var(--via-border-soft)] bg-[var(--via-navy-03)] p-[var(--via-space-3)] text-sm text-[var(--via-text-muted)]">
              {providersWithKey.length > 0
                ? `Você ainda não guardou uma chave de ${preferredMeta.label}. Cole a chave abaixo ou volte a um provedor que já tem chave.`
                : // Antes esta frase dizia "Sem ela, o app não consegue gerar
                  // dashboards" — e gera: sem chave do usuário o motor cai no
                  // gateway da Lovable (LOVABLE_API_KEY, provisionada em todo
                  // projeto publicado lá). Quem lia isso achava o produto
                  // inoperante e ia comprar chave sem precisar. A ressalva
                  // "publicado no Lovable" é obrigatória: fora de lá, sem a
                  // variável, a geração realmente falha com 503.
                  "Nenhuma chave de IA guardada. Publicado no Lovable, o app gera dashboards com o crédito de IA da plataforma; salve sua própria chave para usar seu provedor, seu modelo e seus limites."}
            </p>
          )}

          {/* o seletor usa as mesmas medidas e o mesmo vidro do <Input>: fundo
              diferente fazia ele parecer um controle de outra tela */}
          {revenuePP ? (
            // Revenue++: provedor é marca — escolhe-se pelo logo, não numa lista
            // de texto; o estado da chave fica à vista em cada opção
            <div className="space-y-2">
              <p className={FIELD_LABEL_CLASS} id="preferred-provider-label">
                Provedor preferido
              </p>
              <div
                role="radiogroup"
                aria-labelledby="preferred-provider-label"
                className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3"
              >
                {SELECTABLE_PROVIDERS.map((p) => {
                  const on = p.id === preferredProvider;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => handleChangeProvider(p.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-[var(--via-radius-md)] border bg-[var(--via-surface)] p-3 text-left transition-colors",
                        on
                          ? "border-[var(--via-navy)] shadow-[0_0_0_1px_var(--via-navy)]"
                          : "border-[var(--via-border-soft)] hover:border-[var(--via-navy-20)]",
                      )}
                    >
                      <BrandTile id={p.id} size={36} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-[var(--via-text-primary)]">
                          {p.label}
                        </span>
                        <span
                          className={cn(
                            "block text-xs",
                            savedKeys[p.id]
                              ? "text-[var(--via-navy)]"
                              : "text-[var(--via-text-soft)]",
                          )}
                        >
                          {savedKeys[p.id] ? "Chave guardada" : "Sem chave"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[var(--via-text-soft)]">
                É este que o app tenta primeiro. Sem chave dele, cai para outro provedor que você
                tenha configurado.
              </p>
            </div>
          ) : (
          <div className="space-y-1.5">
            <label htmlFor="preferred-provider" className={FIELD_LABEL_CLASS}>
              Provedor preferido
            </label>
            <select
              id="preferred-provider"
              value={preferredProvider}
              onChange={(e) => {
                const next = e.target.value;
                if (isProviderId(next)) handleChangeProvider(next);
              }}
              className="h-9 w-full rounded-[var(--via-radius-md)] border border-[var(--via-border)] bg-[var(--via-glass-card)] px-3 text-sm text-[var(--via-text-primary)] transition-all duration-[var(--via-dur)] focus-visible:border-[var(--via-navy-20)] focus-visible:shadow-[0_0_0_3px_var(--via-navy-10)] focus-visible:outline-none"
            >
              {SELECTABLE_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                  {savedKeys[p.id] ? " · chave guardada" : ""}
                </option>
              ))}
            </select>
            <p className="text-xs text-[var(--via-text-soft)]">
              É este que o app tenta primeiro. Sem chave dele, cai para outro provedor que você
              tenha configurado.
            </p>
          </div>
          )}

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="provider-key" className={FIELD_LABEL_CLASS}>
                Chave de API · {preferredMeta.label}
              </label>
              {preferredHasKey && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--via-border-soft)] bg-[var(--via-navy-04)] px-2 py-0.5 text-[11px] font-medium text-[var(--via-navy)]">
                  <CheckCircle2 className="h-3 w-3" /> guardada
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="provider-key"
                type={showKey ? "text" : "password"}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder={
                  preferredHasKey
                    ? "•••••• cole uma nova chave para substituir"
                    : preferredMeta.keyPlaceholder
                }
                autoComplete="off"
                spellCheck={false}
                className="pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                aria-label={showKey ? "Esconder a chave" : "Mostrar a chave"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--via-text-soft)] hover:text-[var(--via-text-primary)]"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-[var(--via-text-soft)]">
              Pegue a chave em{" "}
              <a
                href={preferredMeta.consoleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[var(--via-text-primary)] underline underline-offset-2"
              >
                {preferredMeta.consoleLabel}
                <ExternalLink className="h-3 w-3" />
              </a>
              , cole aqui e salve. Guardamos no cofre; ela não é exibida de volta.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="preferred-model" className={FIELD_LABEL_CLASS}>
              Modelo (opcional)
            </label>
            <Input
              id="preferred-model"
              type="text"
              value={modelInput}
              onChange={(e) => setModelInput(e.target.value)}
              placeholder={preferredMeta.defaultModel}
              autoComplete="off"
              spellCheck={false}
              className="font-mono"
            />
            <p className="text-xs text-[var(--via-text-soft)]">
              Em branco usa o modelo padrão de {preferredMeta.label}:{" "}
              <code className="font-mono">{preferredMeta.defaultModel}</code>. Preencha só para
              fixar outro modelo — use o id do provedor, sem espaços.
            </p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--via-border-soft)] px-[var(--via-space-5)] py-[var(--via-space-4)]">
          <Button disabled={savingKeys} onClick={() => void handleSaveApiKeys()}>
            {savingKeys ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Salvar
          </Button>
          <span className="text-xs text-[var(--via-text-soft)]">
            Chave em branco mantém a que já está guardada.
          </span>
          {keysMessage && (
            <p
              role="status"
              className={cn(
                "w-full text-sm",
                keysMessage.ok ? "text-[var(--via-navy)]" : "text-[var(--via-coral-dark)]",
              )}
            >
              {keysMessage.text}
            </p>
          )}
        </footer>
      </section>

      <section className={CARD_CLASS}>
        <header className="border-b border-[var(--via-border-soft)] p-[var(--via-space-5)]">
          <h2 className="text-base font-medium text-[var(--via-text-primary)]">Chaves guardadas</h2>
          <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">
            Uma chave por provedor. Pode manter várias e trocar o preferido quando quiser; remover
            aqui apaga a chave do cofre.
          </p>
        </header>
        {providersWithKey.length === 0 ? (
          <p className="p-[var(--via-space-5)] text-sm text-[var(--via-text-muted)]">
            Nenhuma chave guardada ainda.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--via-border-soft)]">
            {providersWithKey.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 p-[var(--via-space-4)]"
              >
                {revenuePP && <BrandTile id={p.id} size={36} />}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-medium text-[var(--via-text-primary)]">
                      {p.label}
                    </span>
                    {p.id === preferredProvider && (
                      <span className="text-[11px] font-medium text-[var(--via-navy)]">
                        preferido
                      </span>
                    )}
                  </div>
                  <a
                    href={p.consoleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs text-[var(--via-text-soft)] hover:text-[var(--via-text-primary)]"
                  >
                    {p.consoleLabel}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={savingKeys}
                  onClick={() => void handleRemoveApiKey(p.id)}
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );

  const dialogs = (
    <>
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua nova senha. Mínimo de {MIN_PASSWORD_LENGTH} caracteres.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <label htmlFor="new-password" className="text-sm font-medium text-text">
              Nova senha
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nova senha"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
            {passwordMessage && (
              <p
                className={cn(
                  "text-sm",
                  passwordMessage.includes("Erro") || passwordMessage.includes("deve")
                    ? "text-error"
                    : "text-success",
                )}
              >
                {passwordMessage}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setNewPassword("");
                setPasswordMessage("");
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleChangePassword} disabled={passwordSaving}>
              {passwordSaving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-error">Excluir Conta</DialogTitle>
            <DialogDescription>Esta ação é permanente e não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <label htmlFor="delete-confirm" className="text-sm font-medium text-text">
              Digite <span className="font-mono text-error">EXCLUIR</span> para confirmar
            </label>
            <input
              id="delete-confirm"
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="EXCLUIR"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
            {deleteMessage && (
              <p className="text-sm text-error" role="alert">
                {deleteMessage}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setDeleteConfirmText("");
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={deleteConfirmText !== "EXCLUIR" || deleting}
              onClick={handleDeleteAccount}
            >
              {deleting ? "Excluindo…" : "Excluir Conta Permanentemente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  if (revenuePP) {
    return (
      <AppShell>
        <SettingsRpp
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profile={profile}
          displayNameInput={displayNameInput}
          setDisplayNameInput={setDisplayNameInput}
          saving={saving}
          saveMessage={saveMessage}
          onSaveProfile={() => void handleSaveProfile()}
          iaContent={iaContent}
          iaReady={providersWithKey.length > 0}
          onPassword={() => setShowPasswordDialog(true)}
          onOnboarding={() => requestOnboardingRestart()}
          onLogout={() => void handleLogout()}
          onDelete={() => setShowDeleteDialog(true)}
        />
        {dialogs}
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie seu perfil, a conexão de IA e sua conta.
        </p>

        <div className="mt-6 flex gap-1 rounded-lg border border-border bg-surface p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150",
                activeTab === tab.id
                  ? "bg-surface-elevated text-text shadow-sm"
                  : "text-text-secondary hover:text-text",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "perfil" && (
            <div className="space-y-6 rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                  {profile.initials || "?"}
                </div>
                <div>
                  <p className="font-semibold text-text">{profile.displayName}</p>
                  <p className="text-sm text-text-secondary">{profile.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <label htmlFor="display-name" className="text-sm font-medium text-text">
                  Nome de exibição
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={displayNameInput}
                  onChange={(e) => setDisplayNameInput(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  readOnly
                  className="h-10 w-full cursor-not-allowed rounded-lg border border-border bg-surface-elevated px-3 text-sm text-text-secondary"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Salvando..." : "Salvar"}
                </Button>
                {saveMessage && (
                  <span
                    className={cn(
                      "text-sm",
                      saveMessage.includes("Erro") ? "text-error" : "text-success",
                    )}
                  >
                    {saveMessage}
                  </span>
                )}
              </div>
            </div>
          )}

          {activeTab === "ia" && iaContent}

          {activeTab === "conta" && (
            <div className="space-y-6 rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text">Refazer onboarding</p>
                  <p className="text-sm text-text-secondary">
                    Reveja o passo a passo de configuração da sua conta
                  </p>
                </div>
                <Button variant="outline" onClick={() => requestOnboardingRestart()}>
                  Refazer onboarding
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text">Alterar Senha</p>
                  <p className="text-sm text-text-secondary">Atualize sua senha de acesso</p>
                </div>
                <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                  Alterar Senha
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text">Sair</p>
                  <p className="text-sm text-text-secondary">Encerrar sua sessão atual</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-error">Excluir Conta</p>
                  <p className="text-sm text-text-secondary">Esta ação é irreversível</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir Conta
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {dialogs}
    </AppShell>
  );
}

/* ==========================================================================
 * Revenue++ · Configurações redesenhada
 *
 * A tela antiga eram três abas iguais em cima de blocos com estilos diferentes
 * entre si (o Perfil com input cru, a Conta com quatro linhas iguais, e o
 * "Excluir Conta" na mesma lista que "Sair"). Aqui: navegação lateral com o que
 * cada seção resolve, cartões no padrão das outras telas, ações em linhas com
 * ícone + explicação + botão à direita, e a exclusão isolada numa zona de
 * perigo no fim. A seção de IA é a mesma do layout antigo.
 * ======================================================================== */

const NAV_RPP: { id: Tab; label: string; hint: string; icon: React.ElementType }[] = [
  { id: "perfil", label: "Perfil", hint: "Seu nome e e-mail", icon: User },
  { id: "ia", label: "Inteligência artificial", hint: "Quem monta os painéis", icon: Bot },
  { id: "conta", label: "Conta e segurança", hint: "Senha, sessão e exclusão", icon: Shield },
];

function ActionRow({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  action: React.ReactNode;
}) {
  return (
    <li className="flex flex-wrap items-center gap-4 px-5 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] bg-[var(--via-navy-06)] text-[var(--via-text-primary)]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--via-text-primary)]">{title}</p>
        <p className="text-sm text-[var(--via-text-muted)]">{text}</p>
      </div>
      {action}
    </li>
  );
}

function SettingsRpp(props: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  profile: UserProfile;
  displayNameInput: string;
  setDisplayNameInput: (v: string) => void;
  saving: boolean;
  saveMessage: string;
  onSaveProfile: () => void;
  iaContent: React.ReactNode;
  iaReady: boolean;
  onPassword: () => void;
  onOnboarding: () => void;
  onLogout: () => void;
  onDelete: () => void;
}) {
  const { activeTab, profile } = props;
  const current = NAV_RPP.find((n) => n.id === activeTab) ?? NAV_RPP[0];
  const dirty = props.displayNameInput.trim() !== profile.displayName.trim();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
        Conta
      </p>
      <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
        Configurações
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[15rem_minmax(0,1fr)]">
        <nav aria-label="Seções" className="flex gap-1 overflow-x-auto md:flex-col">
          {NAV_RPP.map((n) => {
            const on = n.id === activeTab;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => props.setActiveTab(n.id)}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-[var(--via-radius-md)] px-3 py-2.5 text-left transition-colors",
                  on ? "bg-[var(--via-navy-06)]" : "hover:bg-[var(--via-navy-03)]",
                )}
              >
                <n.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    on ? "text-[var(--via-text-primary)]" : "text-[var(--via-text-muted)]",
                  )}
                />
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-sm",
                      on
                        ? "font-medium text-[var(--via-text-primary)]"
                        : "text-[var(--via-text-body)]",
                    )}
                  >
                    {n.label}
                  </span>
                  {/* um ponto solto ao lado não dizia nada: sem chave de IA, a
                      linha de apoio diz o que falta */}
                  {n.id === "ia" && !props.iaReady ? (
                    <span className="hidden text-xs font-medium text-[var(--via-navy)] md:block">
                      Falta a chave de IA
                    </span>
                  ) : (
                    <span className="hidden text-xs text-[var(--via-text-muted)] md:block">
                      {n.hint}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="min-w-0 space-y-6">
          <div>
            <h2 className="text-xl font-medium tracking-[-0.015em] text-[var(--via-text-primary)]">
              {current.label}
            </h2>
            <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">{current.hint}.</p>
          </div>

          {activeTab === "perfil" && (
            <section className="overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)]">
              <div className="flex items-center gap-4 border-b border-[var(--via-border-soft)] p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy)] text-lg font-semibold text-white">
                  {profile.initials || "?"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-[var(--via-text-primary)]">
                    {profile.displayName}
                  </p>
                  <p className="truncate text-sm text-[var(--via-text-muted)]">{profile.email}</p>
                </div>
              </div>
              <div className="grid gap-5 p-5 xl:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="rpp-name" className="text-sm text-[var(--via-text-primary)]">
                    Nome de exibição
                  </label>
                  <Input
                    id="rpp-name"
                    value={props.displayNameInput}
                    onChange={(e) => props.setDisplayNameInput(e.target.value)}
                  />
                  <p className="text-xs text-[var(--via-text-muted)]">
                    Aparece no menu lateral e para quem divide painéis com você.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="rpp-email" className="text-sm text-[var(--via-text-primary)]">
                    E-mail
                  </label>
                  <div className="relative">
                    <Input
                      id="rpp-email"
                      value={profile.email}
                      readOnly
                      disabled
                      className="pr-9"
                    />
                    <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--via-text-muted)]" />
                  </div>
                  <p className="text-xs text-[var(--via-text-muted)]">
                    É o seu login. Para trocar, fale com um administrador.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 border-t border-[var(--via-border-soft)] px-5 py-4">
                <Button onClick={props.onSaveProfile} disabled={props.saving || !dirty}>
                  {props.saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Salvar alterações
                </Button>
                {props.saveMessage ? (
                  <span
                    className={cn(
                      "text-sm",
                      props.saveMessage.includes("Erro")
                        ? "text-[var(--via-coral-dark)]"
                        : "text-[var(--via-text-primary)]",
                    )}
                  >
                    {props.saveMessage}
                  </span>
                ) : (
                  !dirty && (
                    <span className="text-xs text-[var(--via-text-muted)]">Nada para salvar.</span>
                  )
                )}
              </div>
            </section>
          )}

          {activeTab === "ia" && props.iaContent}

          {activeTab === "conta" && (
            <>
              <ul className="divide-y divide-[var(--via-border-soft)] overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)]">
                <ActionRow
                  icon={KeyRound}
                  title="Senha"
                  text="Troque a senha que você usa para entrar."
                  action={
                    <Button variant="outline" size="sm" onClick={props.onPassword}>
                      Alterar senha
                    </Button>
                  }
                />
                <ActionRow
                  icon={RotateCcw}
                  title="Configuração inicial"
                  text="Refaça o passo a passo: IA, fontes e primeiro painel."
                  action={
                    <Button variant="outline" size="sm" onClick={props.onOnboarding}>
                      Refazer
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  }
                />
                <ActionRow
                  icon={LogOut}
                  title="Sessão"
                  text="Encerra o acesso neste navegador."
                  action={
                    <Button variant="outline" size="sm" onClick={props.onLogout}>
                      Sair
                    </Button>
                  }
                />
              </ul>

              <section className="rounded-[var(--via-radius-lg)] border border-[rgba(184,92,92,0.35)] p-5">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-coral-dark)]">
                  Zona de perigo
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--via-text-primary)]">
                      Excluir conta
                    </p>
                    <p className="text-sm text-[var(--via-text-muted)]">
                      Apaga seus painéis, fontes e alertas. Não dá para desfazer.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={props.onDelete}>
                    <Trash2 className="h-4 w-4" />
                    Excluir conta
                  </Button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
