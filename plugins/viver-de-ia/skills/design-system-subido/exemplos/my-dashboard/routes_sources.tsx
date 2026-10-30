import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Combine,
  Database,
  Eye,
  FileSpreadsheet,
  FileText,
  Globe,
  History,
  LayoutDashboard,
  Loader2,
  Megaphone,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Wallet,
  Webhook,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRevenuePP } from "@/lib/ds-variant";
import { AppShell } from "@/components/layout/app-shell";
import { GoogleConnectionCard } from "@/components/connections/google-connection";
import { OAuthAccountsCard } from "@/components/connections/oauth-accounts";
import { CrmConnector } from "@/components/sources/crm-connector";
import { SubidoConnector } from "@/components/sources/subido-connector";
import { SubidoGroupCard } from "@/components/sources/subido-group-card";
import { groupSourceCards } from "@/lib/sources/subido-groups";
import { CsvUploader } from "@/components/sources/csv-uploader";
import { SheetsConnector } from "@/components/sources/sheets-connector";
import { WebhookCreator } from "@/components/sources/webhook-creator";
import { WebhookDocs } from "@/components/sources/webhook-docs";
import { CombineSourcesDialog } from "@/components/sources/combine-sources-dialog";
import { ConnectorWizard } from "@/components/sources/connector-wizard";
import { createDashboardFromPanel } from "@/lib/dashboards/create";
import { panelsForSource, type ReadyPanel } from "@/lib/dashboards/ready-panels";
import { SyncHistoryDialog } from "@/components/sources/sync-history";
import { SourcePreview } from "@/components/sources/source-preview";
import { BrandTile } from "@/components/sources/brand-icon";
import { QuickSources, type QuickSourceId } from "@/components/sources/quick-sources";
import { recombineSource } from "@/lib/sources/combined-source";
import { supabase } from "@/integrations/supabase/client";
import { formatRelativeDate } from "@/lib/format-relative-date";
import { cn } from "@/lib/utils";
import type { ColumnDef, ColumnType, DataSource, DataSourceType } from "@/types/data-source";
import type { Json } from "@/integrations/supabase/types";

// my_source_secrets não está nos tipos gerados; chamada sem tipagem.
const untyped = supabase as unknown as SupabaseClient;

/** O que só o dono da fonte pode ler — vem do RPC, nunca do select da tabela. */
interface SourceSecrets {
  id: string;
  api_key: string | null;
  webhook_secret: string | null;
  last_sync_error: string | null;
}

const TYPE_ICON: Record<DataSourceType, { Icon: typeof Building2; label: string }> = {
  csv: { Icon: FileText, label: "CSV" },
  excel: { Icon: FileSpreadsheet, label: "Excel" },
  sheets: { Icon: Globe, label: "Google Sheets" },
  webhook: { Icon: Webhook, label: "Webhook" },
  crm: { Icon: Building2, label: "CRM" },
  combined: { Icon: Combine, label: "Combinada" },
  database: { Icon: Database, label: "Banco de dados" },
  erp: { Icon: Building2, label: "ERP" },
  ads: { Icon: Megaphone, label: "Anúncios" },
  finance: { Icon: Wallet, label: "Financeiro" },
};

// Fontes que o app consegue puxar por API (têm conector pull): sincronizam no
// clique e no intervalo. CSV, Excel e webhook são empurrados de fora.
function canPull(source: DataSource): boolean {
  // conector novo (HubSpot, RD Station, ERPs...): sincroniza por API
  if (source.connector) return !["csv", "excel", "webhook", "combined"].includes(source.connector);
  if (source.type === "crm") return source.crm_provider === "pipedrive";
  return ["sheets", "database", "erp", "ads", "finance"].includes(source.type);
}

/** Id de marca do card: conector novo, ou o tipo/CRM das fontes antigas. */
function brandIdOf(source: DataSource): string {
  if (source.connector) return source.connector;
  if (source.type === "crm") return source.crm_provider ?? "pipedrive";
  return source.type;
}

/** O que a fonte lê: consulta SQL ou tabela, quando o conector guarda isso na config. */
function readsLabel(source: DataSource): string | null {
  const cfg = source.config;
  if (!cfg) return null;
  if (typeof cfg.query === "string" && cfg.query.trim()) return "consulta SQL";
  if (typeof cfg.table === "string" && cfg.table) return `tabela ${cfg.table}`;
  return null;
}

function intervalLabel(minutes: number | null | undefined): string {
  if (!minutes) return "manual";
  if (minutes % 1440 === 0) return `a cada ${minutes / 1440} dia${minutes / 1440 > 1 ? "s" : ""}`;
  if (minutes % 60 === 0) return `a cada ${minutes / 60} h`;
  return `a cada ${minutes} min`;
}

const COLUMN_TYPE_LABELS: Record<ColumnType, string> = {
  number: "Número",
  currency: "Moeda",
  date: "Data",
  text: "Texto",
};

// As mesmas opções do assistente de conectores, para a edição não oferecer um
// intervalo que a criação não oferece.
const EDIT_INTERVALS: { value: string; label: string }[] = [
  { value: "manual", label: "Só quando eu sincronizar" },
  { value: "15", label: "A cada 15 minutos" },
  { value: "60", label: "A cada hora" },
  { value: "360", label: "A cada 6 horas" },
  { value: "1440", label: "Uma vez por dia" },
];

// Mensagens que o fluxo ANTIGO do Google devolvia por query string. O retorno
// agora acontece em /api/google/callback, numa janela que fala com a tela por
// postMessage; isto fica só para não deixar um link antigo sem resposta.
const GOOGLE_CALLBACK_ERRORS: Record<string, string> = {
  google_not_configured:
    "Google não configurado. Um administrador precisa salvar o Client ID e o Client Secret em Administração → Instalação.",
  oauth_denied: "Você cancelou a autorização no Google.",
  invalid_callback: "Retorno inválido do Google. Tente conectar novamente.",
  invalid_state: "A autorização expirou ou é inválida. Tente conectar novamente.",
  no_refresh_token:
    "O Google não devolveu autorização permanente. Remova o app em myaccount.google.com/permissions e conecte de novo.",
  token_storage_failed: "Não foi possível guardar a autorização. Tente novamente.",
  callback_failed: "Falha ao concluir a conexão com o Google.",
};

export const Route = createFileRoute("/sources")({
  component: SourcesPage,
  head: () => ({ meta: [{ title: "Fontes de dados — My Dashboard" }] }),
});

function SourcesPage() {
  // Revenue++: no estado vazio, as fontes do caminho mais curto até o primeiro
  // painel aparecem primeiro e marcadas ("make the first step obvious").
  const revenuePP = useRevenuePP();
  const navigate = useNavigate();
  const [sources, setSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [crmOpen, setCrmOpen] = useState(false);
  const [subidoOpen, setSubidoOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  // O diálogo de arquivo também recebe link do Google; quem vem do diálogo do
  // Sheets pedindo o link o vê primeiro.
  const [csvModo, setCsvModo] = useState<"arquivo" | "link">("arquivo");
  const [sheetsOpen, setSheetsOpen] = useState(false);
  const [webhookOpen, setWebhookOpen] = useState(false);
  const [combineOpen, setCombineOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardInitial, setWizardInitial] = useState<string | null>(null);
  const [wizardMode, setWizardMode] = useState<"sql" | null>(null);
  const [recombiningId, setRecombiningId] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedWebhook, setSelectedWebhook] = useState<DataSource | null>(null);
  const [editingSource, setEditingSource] = useState<DataSource | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editColumns, setEditColumns] = useState<ColumnDef[]>([]);
  // "manual" ou os minutos em texto, como o Select espera
  const [editInterval, setEditInterval] = useState<string>("manual");
  const [previewSource, setPreviewSource] = useState<DataSource | null>(null);
  const [deletingSource, setDeletingSource] = useState<DataSource | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Sem isto, uma falha na consulta virava "nenhuma fonte" na tela.
  const [loadError, setLoadError] = useState<string | null>(null);
  // A lista inclui fontes de outros usuários compartilhadas por dashboard;
  // painel pronto só nas próprias (ver ready-panels-strip).
  const [userId, setUserId] = useState<string | null>(null);
  // Histórico: por que a fonte parou de trazer dado ontem
  const [historyFor, setHistoryFor] = useState<DataSource | null>(null);

  const loadSources = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("data_sources")
      // Sem api_key, webhook_secret e last_sync_error: esta lista inclui fontes
      // de outros usuários (compartilhadas por dashboard), e o api_key da fonte
      // é o mesmo token que /api/ingest aceita para GRAVAR — quem recebia
      // leitura levava junto a chave de escrita na fonte do dono. Os três
      // voltam logo abaixo, pelo RPC, só para as fontes próprias.
      // sync_cursor também fica fora: é estado interno do conector e pode ser
      // grande (mapa de estoque do Tiny).
      .select(
        "id, user_id, name, type, columns, file_path, sheets_id, sheets_range, sync_enabled, last_synced_at, row_count, ingestion_log, crm_provider, field_mapping, event_types, combine_config, connector, config, sync_interval_minutes, last_sync_status, created_at",
      )
      .order("created_at", { ascending: false });
    if (error) {
      setLoadError(error.message);
      setLoading(false);
      return [];
    }
    setLoadError(null);
    const list = (data ?? []) as unknown as DataSource[];

    const { data: secrets, error: secretsError } = await untyped.rpc("my_source_secrets");
    // Falhar calado aqui deixaria o painel do webhook sem token e o card sem o
    // motivo do erro, sem nenhuma pista de por quê. O resto da tela funciona,
    // então isto não derruba a lista inteira.
    if (secretsError) {
      console.error("Não foi possível carregar os segredos das fontes:", secretsError);
    }
    const secretById = new Map(
      ((secrets ?? []) as SourceSecrets[]).map((secret) => [secret.id, secret]),
    );
    const completas = list.map((source) => {
      const secret = secretById.get(source.id);
      return secret ? { ...source, ...secret } : source;
    });
    setSources(completas);
    setLoading(false);
    // Devolve a lista além de guardá-la no estado: quem acabou de CRIAR uma
    // fonte precisa dela agora, e o `sources` do escopo ainda é o array de
    // antes do recarregamento — a fonte recém-criada nunca estava lá, então o
    // painel do webhook não abria e a pessoa caía na lista sem entender.
    return completas;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();
      if (cancelled) return;
      if (error || !data.user) {
        void navigate({ to: "/login" });
        return;
      }
      setUserId(data.user.id);
      void loadSources();
    }

    void checkAuth();
    return () => {
      cancelled = true;
    };
  }, [navigate, loadSources]);

  // O callback do Google volta para cá com ?google_connected ou ?error=...
  // Sem ler esses parâmetros a conexão terminava em silêncio — e a falha
  // também.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("google_connected");
    const error = params.get("error");
    if (!connected && !error) return;

    if (connected) {
      toast.success("Google conectado. Escolha uma planilha para importar.");
    } else if (error) {
      toast.error(GOOGLE_CALLBACK_ERRORS[error] ?? "Não foi possível conectar ao Google.");
    }

    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const refresh = useCallback(() => {
    void loadSources();
  }, [loadSources]);

  const handleSyncPipedrive = useCallback(
    async (sourceId: string) => {
      setSyncingId(sourceId);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const sessionToken = sessionData.session?.access_token;
        if (!sessionToken) {
          toast.error("Sessão expirada. Faça login novamente.");
          return;
        }

        // Rota genérica: vale para qualquer conector com pull (Sheets, Pipedrive...).
        const res = await fetch(`/api/sources/${sourceId}/sync`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });

        const data = (await res.json()) as {
          ok: boolean;
          rowsWritten?: number;
          error?: string;
          message?: string;
        };

        if (!res.ok || !data.ok) {
          toast.error(data.error ?? "Erro ao sincronizar");
          return;
        }

        const n = data.rowsWritten ?? 0;
        toast.success(
          n > 0
            ? `${n.toLocaleString("pt-BR")} ${n === 1 ? "linha" : "linhas"} sincronizadas`
            : "Sincronizado — sem linhas novas",
        );
        void loadSources();
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Erro";
        toast.error(`Erro ao sincronizar: ${msg}`);
      } finally {
        setSyncingId(null);
      }
    },
    [loadSources],
  );

  // SUBIDO AI: uma conexão = vários conjuntos (uma fonte por conjunto por baixo). Sincroniza todos, um
  // por vez, e avisa uma vez só com o total.
  const handleSyncGroup = useCallback(
    async (key: string, group: DataSource[]) => {
      setSyncingId(key);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const sessionToken = sessionData.session?.access_token;
        if (!sessionToken) {
          toast.error("Sessão expirada. Faça login novamente.");
          return;
        }
        let rows = 0;
        const falhas: string[] = [];
        for (const source of group) {
          const res = await fetch(`/api/sources/${source.id}/sync`, {
            method: "POST",
            headers: { Authorization: `Bearer ${sessionToken}` },
          });
          const data = (await res.json().catch(() => ({}))) as {
            ok?: boolean;
            rowsWritten?: number;
            error?: string;
          };
          if (!res.ok || !data.ok) falhas.push(`${source.name}: ${data.error ?? "erro"}`);
          else rows += data.rowsWritten ?? 0;
        }
        if (falhas.length > 0) toast.error(`Falha ao sincronizar ${falhas.join("; ")}`);
        else
          toast.success(
            rows > 0
              ? `${rows.toLocaleString("pt-BR")} ${rows === 1 ? "linha" : "linhas"} sincronizadas`
              : "Sincronizado — sem linhas novas",
          );
        void loadSources();
      } finally {
        setSyncingId(null);
      }
    },
    [loadSources],
  );

  const handleDisconnectGroup = useCallback(
    async (group: DataSource[]) => {
      const { error } = await supabase
        .from("data_sources")
        .delete()
        .in(
          "id",
          group.map((s) => s.id),
        );
      if (error) {
        toast.error(`Erro ao desconectar: ${error.message}`);
        return;
      }
      toast.success("Conexão removida");
      void loadSources();
    },
    [loadSources],
  );

  const handleWebhookSuccess = useCallback(
    (sourceId: string) => {
      void loadSources().then((lista) => {
        const found = lista.find((s) => s.id === sourceId);
        if (found) setSelectedWebhook(found);
      });
    },
    [loadSources],
  );

  const handleRecombine = useCallback(
    async (source: DataSource) => {
      setRecombiningId(source.id);
      try {
        const n = await recombineSource(source);
        toast.success(`Fonte recombinada: ${n.toLocaleString("pt-BR")} linhas.`);
        void loadSources();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Não foi possível recombinar.");
      } finally {
        setRecombiningId(null);
      }
    },
    [loadSources],
  );

  const openEdit = useCallback((source: DataSource) => {
    setEditingSource(source);
    setEditName(source.name);
    setEditColumns(Array.isArray(source.columns) ? source.columns : []);
    setEditInterval(source.sync_interval_minutes ? String(source.sync_interval_minutes) : "manual");
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editingSource) return;
    const trimmed = editName.trim();
    if (trimmed.length < 1 || trimmed.length > 80) {
      toast.error("Nome deve ter entre 1 e 80 caracteres");
      return;
    }
    setSavingEdit(true);
    const { error } = await supabase
      .from("data_sources")
      .update({
        name: trimmed,
        ...(editColumns.length > 0 ? { columns: editColumns as unknown as Json } : {}),
        // intervalo só onde há o que sincronizar; null = só manual
        ...(canPull(editingSource)
          ? { sync_interval_minutes: editInterval === "manual" ? null : Number(editInterval) }
          : {}),
      })
      .eq("id", editingSource.id);
    setSavingEdit(false);
    if (error) {
      toast.error(`Erro ao salvar: ${error.message}`);
      return;
    }
    toast.success("Fonte atualizada");
    setEditingSource(null);
    void loadSources();
  }, [editingSource, editName, editColumns, editInterval, loadSources]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingSource) return;
    setDeleting(true);
    const { error } = await supabase.from("data_sources").delete().eq("id", deletingSource.id);
    setDeleting(false);
    if (error) {
      toast.error(`Erro ao excluir: ${error.message}`);
      return;
    }
    toast.success("Fonte excluída");
    setDeletingSource(null);
    void loadSources();
  }, [deletingSource, loadSources]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedWebhook) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="mb-6 flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedWebhook(null)}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>
          <WebhookDocs
            sourceId={selectedWebhook.id}
            sourceName={selectedWebhook.name}
            columns={selectedWebhook.columns}
            ingestionLog={selectedWebhook.ingestion_log}
            apiKey={selectedWebhook.api_key}
          />
        </div>
      </div>
    );
  }

  // Atalhos: fluxos com tela própria abrem o diálogo; conectores abrem a
  // janela "Nova fonte" já no conector.
  function openQuick(id: QuickSourceId) {
    if (id === "csv") setCsvOpen(true);
    else if (id === "sheets") setSheetsOpen(true);
    else if (id === "pipedrive") setCrmOpen(true);
    else if (id === "webhook") setWebhookOpen(true);
    else if (id === "sql") {
      setWizardInitial(null);
      setWizardMode("sql");
      setWizardOpen(true);
    } else {
      setWizardInitial(id);
      setWizardMode(null);
      setWizardOpen(true);
    }
  }

  // Painel pronto: dashboard determinístico já vinculado à fonte canônica.
  async function createPanel(sourceId: string, panel: ReadyPanel) {
    const source = sources.find((s) => s.id === sourceId);
    try {
      const id = await createDashboardFromPanel(panel, sourceId, source?.name);
      toast.success(`Painel "${panel.label}" criado.`);
      void navigate({ to: "/dashboards/$dashboardId/edit", params: { dashboardId: id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
    }
  }

  function openCatalog() {
    setWizardInitial(null);
    setWizardMode(null);
    setWizardOpen(true);
  }

  return (
    <AppShell>
      <div>
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
              Fontes de dados
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Conecte bancos, ERPs, planilhas e APIs para alimentar seus dashboards.
            </p>
          </div>
          <Button onClick={openCatalog}>
            <Plus className="h-4 w-4" />
            Nova fonte
          </Button>
        </div>

        {loadError ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="flex items-start gap-2 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Não foi possível carregar as fontes. {loadError}</span>
            </p>
            <Button className="mt-4" variant="outline" onClick={refresh}>
              <RefreshCw className="h-4 w-4" />
              Tentar de novo
            </Button>
          </div>
        ) : sources.length === 0 ? (
          <QuickSources
            variant="empty"
            onPick={openQuick}
            onAll={openCatalog}
            recommend={revenuePP ? ["csv", "sheets"] : []}
          />
        ) : (
          <>
            {/* Mesmo rótulo em caps do "Adicionar rapidamente": diz o que é a
                grade abaixo, que antes começava sem apresentação. */}
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
              Fontes conectadas ({groupSourceCards(sources).length})
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupSourceCards(sources).map((card) => {
                if (card.kind === "subido") {
                  const intervals = new Set(
                    card.sources.map((s) => s.sync_interval_minutes ?? null),
                  );
                  return (
                    <SubidoGroupCard
                      key={card.key}
                      label={card.label}
                      sources={card.sources}
                      userId={userId}
                      syncing={syncingId === card.key}
                      intervalLabel={
                        intervals.size === 1
                          ? intervalLabel(card.sources[0].sync_interval_minutes)
                          : "intervalos variados"
                      }
                      onSyncAll={() => void handleSyncGroup(card.key, card.sources)}
                      onPreview={setPreviewSource}
                      onCreatePanel={(sourceId, panel) => void createPanel(sourceId, panel)}
                      onDisconnect={() => handleDisconnectGroup(card.sources)}
                    />
                  );
                }
                const source = card.source;
                const cfg = TYPE_ICON[source.type];
                const clickable = source.type === "webhook";
                const pullable = canPull(source);
                const isSyncing = syncingId === source.id;
                const lastSync = source.last_synced_at;
                const syncFailed = source.last_sync_status === "error";
                return (
                  <div
                    key={source.id}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : undefined}
                    onClick={clickable ? () => setSelectedWebhook(source) : undefined}
                    className={cn(
                      "rounded-xl border border-border bg-card p-5",
                      clickable &&
                        "cursor-pointer transition-all hover:-translate-y-0.5 hover:border-primary/40",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <BrandTile id={brandIdOf(source)} size={44} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {source.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {cfg.label}
                          {readsLabel(source) ? ` · ${readsLabel(source)}` : ""} —{" "}
                          {source.row_count.toLocaleString("pt-BR")} linhas
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {lastSync
                            ? `Sincronizado ${formatRelativeDate(lastSync)}`
                            : formatRelativeDate(source.created_at)}
                          {pullable && ` · ${intervalLabel(source.sync_interval_minutes)}`}
                        </p>
                        {syncFailed && source.last_sync_error && (
                          <p
                            className="mt-1 flex items-start gap-1 text-xs text-destructive"
                            title={source.last_sync_error}
                          >
                            <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                            <span className="line-clamp-2">{source.last_sync_error}</span>
                          </p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Ações da fonte"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              setPreviewSource(source);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            Ver dados
                          </DropdownMenuItem>
                          {source.row_count > 0 &&
                            source.user_id === userId &&
                            panelsForSource(source).map((p) => (
                              <DropdownMenuItem
                                key={p.id}
                                onClick={() => void createPanel(source.id, p)}
                              >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Painel pronto: {p.label}
                              </DropdownMenuItem>
                            ))}
                          {/* sync_runs só é legível pelo dono. Em fonte compartilhada o
                              diálogo abria vazio dizendo "a próxima já aparece aqui" —
                              promessa falsa: nenhuma execução chegaria a esse espectador. */}
                          {source.user_id === userId && (
                            <DropdownMenuItem onClick={() => setHistoryFor(source)}>
                              <History className="mr-2 h-4 w-4" />
                              Histórico de sincronização
                            </DropdownMenuItem>
                          )}
                          {source.type === "combined" && (
                            <DropdownMenuItem
                              disabled={recombiningId === source.id}
                              onSelect={(e) => {
                                e.preventDefault();
                                void handleRecombine(source);
                              }}
                            >
                              <RefreshCw className="h-4 w-4" />
                              Recombinar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              openEdit(source);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={(e) => {
                              e.preventDefault();
                              setDeletingSource(source);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {/* Ver dados em todo card: conferir o que entrou não deveria
                        exigir montar um painel. Sincronizar continua só onde há
                        o que sincronizar. */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewSource(source);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Ver dados
                      </Button>
                      {pullable && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isSyncing}
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleSyncPipedrive(source.id);
                          }}
                        >
                          {isSyncing ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <RefreshCw className="h-3.5 w-3.5" />
                          )}
                          {isSyncing ? "Sincronizando..." : "Sincronizar"}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <QuickSources
              variant="row"
              onPick={openQuick}
              onAll={openCatalog}
              canCombine={
                sources.filter((s) => s.type !== "combined" && s.row_count > 0).length >= 2
              }
              onCombine={() => setCombineOpen(true)}
            />
          </>
        )}

        {/* Contas conectadas vem no FIM de propósito. Isto era a tela /connections,
            separada: a pessoa ligava o Google lá, voltava para cá para trazer o
            dado e nada dizia que faltava a segunda metade — e o assistente de
            Fontes ainda mandava de volta para Conexões. Na mesma tela o caminho
            fica inteiro; embaixo porque conectar a conta se faz uma vez, e o topo
            pertence a quem veio ver ou adicionar fonte. */}
        <section className="mt-10 border-t border-[var(--via-border-soft)] pt-8">
          <p className="mb-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
            Contas conectadas
          </p>
          <p className="mb-4 max-w-[68ch] text-sm text-[var(--via-text-muted)]">
            Conecte a sua conta uma vez e reaproveite em quantas fontes quiser. O app só lê, e você
            desconecta quando quiser.
          </p>
          <div className="space-y-4">
            {/* Em /connections o cartão do Google era remontado por uma chave
                quando o admin salvava o Client ID logo abaixo. Aqui não existe
                esse "logo abaixo": credencial de instalação virou Administração →
                Instalação, outra tela. E o retorno da autorização o cartão
                resolve sozinho — a janela do Google avisa por postMessage e ele
                refaz o fetch de /api/google/providers antes de se redesenhar. */}
            <GoogleConnectionCard />
            <OAuthAccountsCard />
          </div>
        </section>

        {historyFor && (
          <SyncHistoryDialog
            sourceId={historyFor.id}
            sourceName={historyFor.name}
            onClose={() => setHistoryFor(null)}
          />
        )}

        <ConnectorWizard
          open={wizardOpen}
          onOpenChange={(o) => {
            setWizardOpen(o);
            if (!o) setWizardInitial(null);
          }}
          initialConnector={wizardInitial}
          initialMode={wizardMode}
          onCreated={() => void loadSources()}
          onCreatePanel={(sourceId, panel) => void createPanel(sourceId, panel)}
          onCustomFlow={(flow) => {
            if (flow === "sheets") setSheetsOpen(true);
            else if (flow === "crm") setCrmOpen(true);
            else if (flow === "csv") setCsvOpen(true);
            else if (flow === "webhook") setWebhookOpen(true);
            else if (flow === "subido") setSubidoOpen(true);
          }}
        />
        <CrmConnector open={crmOpen} onOpenChange={setCrmOpen} onSuccess={refresh} />
        <SubidoConnector
          open={subidoOpen}
          onOpenChange={setSubidoOpen}
          onSuccess={refresh}
          onCreatePanel={(sourceId, panel) => void createPanel(sourceId, panel)}
        />
        <CsvUploader
          open={csvOpen}
          onOpenChange={(value) => {
            setCsvOpen(value);
            if (!value) setCsvModo("arquivo");
          }}
          onSuccess={refresh}
          modoInicial={csvModo}
        />
        <SheetsConnector
          open={sheetsOpen}
          onOpenChange={setSheetsOpen}
          onSuccess={refresh}
          // Pelo caminho do Apps Script a fonte nasce vazia: recarregar a lista
          // deixaria a pessoa olhando um card de 0 linhas sem saber o que fazer.
          // O que ela precisa é do script, e ele só existe no painel da fonte.
          onScriptCriado={handleWebhookSuccess}
          onColarLink={() => {
            setSheetsOpen(false);
            setCsvModo("link");
            setCsvOpen(true);
          }}
        />
        <WebhookCreator
          open={webhookOpen}
          onOpenChange={setWebhookOpen}
          onSuccess={handleWebhookSuccess}
        />
        <CombineSourcesDialog
          open={combineOpen}
          onOpenChange={setCombineOpen}
          sources={sources}
          onSuccess={refresh}
        />

        <SourcePreview
          source={previewSource}
          onOpenChange={(open) => !open && setPreviewSource(null)}
        />

        <Dialog
          open={editingSource !== null}
          onOpenChange={(open) => !open && setEditingSource(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar fonte</DialogTitle>
              <DialogDescription>
                O nome, o tipo de cada coluna e, quando a fonte sincroniza sozinha, o intervalo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="source-name">Nome</Label>
              <Input
                id="source-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={80}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !savingEdit) {
                    e.preventDefault();
                    void handleSaveEdit();
                  }
                }}
              />
            </div>
            {editingSource && canPull(editingSource) && (
              <div className="space-y-2">
                <Label>Sincronização</Label>
                <Select value={editInterval} onValueChange={setEditInterval}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EDIT_INTERVALS.map((i) => (
                      <SelectItem key={i.value} value={i.value}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {editColumns.length > 0 && (
              <div className="space-y-2">
                {/* O tipo decide o que a IA sugere como número e o que "Combinar
                    fontes" soma. A importação deixa escolher; depois dela não
                    havia como mudar — "moeda" que entrou como "texto" ficava
                    assim para sempre. */}
                <Label>Colunas</Label>
                <div className="max-h-64 divide-y divide-border overflow-y-auto rounded-md border border-border">
                  {editColumns.map((col, idx) => (
                    <div
                      key={`${idx}-${col.name}`}
                      className="flex items-center justify-between gap-3 px-3 py-1.5"
                    >
                      <span className="truncate text-sm text-foreground" title={col.name}>
                        {col.name}
                      </span>
                      <Select
                        value={col.type}
                        onValueChange={(value) =>
                          setEditColumns((prev) =>
                            prev.map((c, i) =>
                              i === idx ? { ...c, type: value as ColumnType } : c,
                            ),
                          )
                        }
                      >
                        <SelectTrigger className="h-7 w-28 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(COLUMN_TYPE_LABELS) as ColumnType[]).map((t) => (
                            <SelectItem key={t} value={t}>
                              {COLUMN_TYPE_LABELS[t]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingSource(null)}
                disabled={savingEdit}
              >
                Cancelar
              </Button>
              <Button onClick={() => void handleSaveEdit()} disabled={savingEdit}>
                {savingEdit && <Loader2 className="h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={deletingSource !== null}
          onOpenChange={(open) => !open && setDeletingSource(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir fonte de dados?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. A fonte <strong>{deletingSource?.name}</strong> e
                todas as linhas ingeridas serão removidas. Dashboards que usam esta fonte voltarão a
                mostrar dados de exemplo.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  void handleConfirmDelete();
                }}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppShell>
  );
}
