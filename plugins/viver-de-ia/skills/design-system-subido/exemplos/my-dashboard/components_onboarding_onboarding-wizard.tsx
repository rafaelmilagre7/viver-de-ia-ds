import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Circle,
  ExternalLink,
  KeyRound,
  LayoutDashboard,
  LayoutGrid,
  Loader2,
  Plug,
  SkipForward,
  Sparkles,
  Wand2,
  Zap,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogEmbed } from "@/components/ui/embeddable-dialog";
import { supabase } from "@/integrations/supabase/client";
import { SELECTABLE_PROVIDERS, type AIProviderId } from "@/lib/ai/catalog";
import { fetchConnectorCatalog } from "@/lib/connectors/fetch-catalog";
import type { ConnectorMeta } from "@/lib/connectors/types";
import { cn } from "@/lib/utils";
import { BrandTile } from "@/components/sources/brand-icon";
import { ConnectorWizard } from "@/components/sources/connector-wizard";
import { CrmConnector } from "@/components/sources/crm-connector";
import { CsvUploader } from "@/components/sources/csv-uploader";
import { SheetsConnector } from "@/components/sources/sheets-connector";
import { SubidoConnector } from "@/components/sources/subido-connector";
import { WebhookCreator } from "@/components/sources/webhook-creator";
import { ReadyPanelsStrip } from "@/components/dashboard/ready-panels-strip";
import { AnimatedCheck, Burst, Celebration } from "./celebration";
import { ImportReview } from "./import-review";
import { SourceHelp } from "./source-help";
import { SubidoLogo } from "@/components/brand/subido-logo";
import { NoDataNotice } from "@/components/data/no-data-notice";
import { useHasData } from "@/lib/data-readiness";
import { useRevenuePP } from "@/lib/ds-variant";

/**
 * Onboarding em 4 passos, numa janela grande: IA → escolher as fontes →
 * conectar uma por uma (os cadastros de verdade, embutidos) → primeiro
 * dashboard. Cada avanço tem retorno visível: check que se desenha, faíscas
 * quando um passo fecha e a fonte da vez pulsando na fila.
 */

export interface OnboardingStatus {
  aiKeyConfigured: boolean;
  hasDataSource: boolean;
  hasDashboard: boolean;
}

type StepKey = "ia" | "escolher" | "configurar" | "dashboard";

const STEPS: { key: StepKey; title: string; subtitle: string; icon: React.ElementType }[] = [
  { key: "ia", title: "Sua IA", subtitle: "Quem monta os painéis", icon: Bot },
  {
    key: "escolher",
    title: "Escolha suas fontes",
    subtitle: "De onde vêm os dados",
    icon: LayoutGrid,
  },
  { key: "configurar", title: "Conecte cada fonte", subtitle: "Uma de cada vez", icon: Plug },
  {
    key: "dashboard",
    title: "Primeiro dashboard",
    subtitle: "Seus dados na tela",
    icon: LayoutDashboard,
  },
];

interface SourceOption {
  id: string;
  label: string;
  description: string;
}

const SUBIDO_ID = "subido";

// Fonte escolhida que ficou sem chave (pulada): fica marcada no tom de alerta do DS (coral) onde aparecer.
const PENDING_TINT =
  "border-[color-mix(in_srgb,var(--via-coral)_40%,transparent)] bg-[color-mix(in_srgb,var(--via-coral)_7%,transparent)]";

// As principais fontes, por assunto. O catálogo completo continua em Fontes;
// aqui é o que a maioria dos clientes conecta primeiro.
const SOURCE_GROUPS: { title: string; items: SourceOption[] }[] = [
  {
    title: "Arquivos e planilhas",
    items: [
      { id: "csv", label: "CSV ou Excel", description: "Suba um arquivo ou cole o link" },
      { id: "sheets", label: "Google Sheets", description: "Uma aba, sempre atualizada" },
    ],
  },
  {
    title: "Vendas e CRM",
    items: [
      { id: "pipedrive", label: "Pipedrive", description: "Negócios e funil" },
      { id: "hubspot", label: "HubSpot", description: "Negócios, contatos e empresas" },
      { id: "rdstation", label: "RD Station CRM", description: "Negociações e funil" },
    ],
  },
  {
    title: "Financeiro e ERP",
    items: [
      { id: "asaas", label: "Asaas", description: "Cobranças e assinaturas" },
      { id: "stripe", label: "Stripe", description: "Pagamentos e assinaturas" },
      { id: "contaazul", label: "Conta Azul", description: "Vendas e financeiro" },
      { id: "omie", label: "Omie", description: "Pedidos, contas e estoque" },
      { id: "bling", label: "Bling", description: "Pedidos, produtos e notas" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { id: "meta_ads", label: "Meta Ads", description: "Campanhas do Facebook e Instagram" },
      { id: "google_ads", label: "Google Ads", description: "Campanhas e conversões" },
      { id: "ga4", label: "Google Analytics", description: "Visitas e eventos do site" },
    ],
  },
  {
    title: "Bancos e outros",
    items: [
      { id: "supabase", label: "Supabase", description: "Tabelas pela API" },
      { id: "postgres", label: "Postgres", description: "Conexão direta, só leitura" },
      { id: "webhook", label: "Webhook", description: "Receba linhas por HTTP" },
    ],
  },
];

const ALL_OPTIONS: SourceOption[] = [
  {
    id: SUBIDO_ID,
    label: "Soluções SUBIDO AI",
    description: "Nina SDR e outras soluções da Viver de IA",
  },
  ...SOURCE_GROUPS.flatMap((g) => g.items),
];

function optionOf(id: string): SourceOption {
  return ALL_OPTIONS.find((o) => o.id === id) ?? { id, label: id, description: "" };
}

/** Ícone da marca; SUBIDO AI não tem marca única, usa o brilho da categoria. */
function SourceIcon({ id, size = 40 }: { id: string; size?: number }) {
  if (id !== SUBIDO_ID) return <BrandTile id={id} size={size} />;
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] text-white"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, var(--via-navy-deep) 0%, var(--via-blue) 100%)",
      }}
      aria-hidden
    >
      <Sparkles style={{ width: size / 2, height: size / 2 }} />
    </span>
  );
}

// ── Estado do fluxo (por usuário, sobrevive a fechar a janela e trocar de tela) ──

type ItemState = "done" | "skipped";

interface Flow {
  /** "plataforma" = escolheu seguir com o crédito de IA do Lovable, sem chave própria. */
  ia: "plataforma" | null;
  selected: string[];
  confirmed: boolean;
  items: Record<string, ItemState>;
}

const EMPTY_FLOW: Flow = { ia: null, selected: [], confirmed: false, items: {} };

function flowKey(userId: string) {
  return `onboarding:fluxo:${userId}`;
}

function readFlow(userId: string): Flow {
  try {
    const raw = localStorage.getItem(flowKey(userId));
    if (!raw) return EMPTY_FLOW;
    const parsed = JSON.parse(raw) as Partial<Flow>;
    return {
      ia: parsed.ia === "plataforma" ? "plataforma" : null,
      selected: Array.isArray(parsed.selected)
        ? parsed.selected.filter((s) => typeof s === "string")
        : [],
      confirmed: parsed.confirmed === true,
      items: parsed.items && typeof parsed.items === "object" ? parsed.items : {},
    };
  } catch {
    return EMPTY_FLOW;
  }
}

function writeFlow(userId: string, flow: Flow) {
  try {
    localStorage.setItem(flowKey(userId), JSON.stringify(flow));
  } catch {
    /* armazenamento bloqueado: o fluxo vale só enquanto a janela estiver aberta */
  }
}

async function authHeaders(): Promise<Record<string, string> | null> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : null;
}

// ── Componente ──

interface OnboardingWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  status: OnboardingStatus;
  refresh: () => Promise<void>;
  /** Passo em que abrir; sem ele, o primeiro que falta. */
  initialStep?: number | null;
}

export function OnboardingWizard({
  open,
  onOpenChange,
  userId,
  status,
  refresh,
  initialStep,
}: OnboardingWizardProps) {
  const [flow, setFlowState] = useState<Flow>(() => readFlow(userId));
  const setFlow = useCallback(
    (update: (f: Flow) => Flow) => {
      setFlowState((prev) => {
        const next = update(prev);
        writeFlow(userId, next);
        return next;
      });
    },
    [userId],
  );

  const [catalog, setCatalog] = useState<ConnectorMeta[] | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [celebration, setCelebration] = useState<{ title: string; subtitle?: string } | null>(null);
  const celebrationTimer = useRef<number | undefined>(undefined);

  const resolved = (id: string) => !!flow.items[id];
  const anyDone = flow.selected.some((id) => flow.items[id] === "done");

  const done: Record<StepKey, boolean> = {
    ia: status.aiKeyConfigured || flow.ia === "plataforma",
    escolher: flow.confirmed || status.hasDataSource,
    configurar:
      flow.confirmed && flow.selected.length > 0
        ? flow.selected.every(resolved) && (anyDone || status.hasDataSource)
        : status.hasDataSource,
    dashboard: status.hasDashboard,
  };
  const doneCount = STEPS.filter((s) => done[s.key]).length;
  const allDone = doneCount === STEPS.length;

  // Ao abrir: no passo pedido ou no primeiro que falta.
  useEffect(() => {
    if (!open) return;
    setFlowState(readFlow(userId));
    const firstPending = STEPS.findIndex((s) => !done[s.key]);
    setStepIndex(initialStep ?? (firstPending === -1 ? STEPS.length - 1 : firstPending));
    if (!catalog) {
      fetchConnectorCatalog()
        .then(setCatalog)
        .catch(() => setCatalog([])); // sem catálogo: mostra a lista fixa inteira
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => window.clearTimeout(celebrationTimer.current), []);

  /** Mostra a comemoração por um instante e, depois, segue (then). */
  function celebrate(c: { title: string; subtitle?: string }, then?: () => void, ms = 1600) {
    window.clearTimeout(celebrationTimer.current);
    setCelebration(c);
    celebrationTimer.current = window.setTimeout(() => {
      setCelebration(null);
      then?.();
    }, ms);
  }

  function goTo(key: StepKey) {
    setStepIndex(STEPS.findIndex((s) => s.key === key));
  }

  const step = STEPS[stepIndex];

  // Opções disponíveis: some o que o catálogo marca como "em breve".
  const unavailable = useMemo(() => {
    const set = new Set<string>();
    for (const c of catalog ?? []) if (c.comingSoon) set.add(c.id);
    return set;
  }, [catalog]);
  const subidoSolutions = useMemo(
    () => (catalog ?? []).filter((c) => c.category === "subido" && !c.comingSoon),
    [catalog],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100%-1rem)] max-w-[1120px] gap-0 overflow-hidden p-0 sm:rounded-[var(--via-radius-xl)]",
          "h-[min(800px,calc(100dvh-1rem))] grid-rows-[auto_1fr] md:grid-cols-[272px_1fr] md:grid-rows-1",
        )}
      >
        <StepRail
          stepIndex={stepIndex}
          done={done}
          doneCount={doneCount}
          notConfigured={flow.selected.filter((id) => flow.items[id] === "skipped").length}
          onPick={setStepIndex}
          onLater={() => onOpenChange(false)}
        />

        <section className="relative flex min-h-0 flex-col bg-[var(--via-surface)]">
          {celebration && <Celebration {...celebration} />}

          <div
            key={step.key}
            className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-right-6 duration-300"
          >
            {step.key === "ia" && (
              <IaStep
                configured={status.aiKeyConfigured}
                platformChosen={flow.ia === "plataforma"}
                onPlatform={() => {
                  setFlow((f) => ({ ...f, ia: "plataforma" }));
                  celebrate(
                    {
                      title: "IA pronta!",
                      subtitle: "Os painéis vão ser gerados com a Lovable AI.",
                    },
                    () => goTo("escolher"),
                  );
                }}
                onKeySaved={async (label) => {
                  await refresh();
                  celebrate(
                    {
                      title: "Chave guardada no cofre",
                      subtitle: `${label} vai montar seus painéis.`,
                    },
                    () => goTo("escolher"),
                  );
                }}
                onNext={() => goTo("escolher")}
              />
            )}

            {step.key === "escolher" && (
              <ChooseStep
                selected={flow.selected}
                items={flow.items}
                unavailable={unavailable}
                subidoSolutions={subidoSolutions}
                hasDataSource={status.hasDataSource}
                onToggle={(id) =>
                  setFlow((f) => ({
                    ...f,
                    selected: f.selected.includes(id)
                      ? f.selected.filter((s) => s !== id)
                      : [...f.selected, id],
                  }))
                }
                onBack={() => goTo("ia")}
                onConfirm={() => {
                  const pending = flow.selected.filter((id) => !flow.items[id]).length;
                  setFlow((f) => ({ ...f, confirmed: true }));
                  celebrate(
                    {
                      title: "Ótima escolha!",
                      subtitle:
                        pending > 0
                          ? `Agora vamos conectar ${pending === 1 ? "essa fonte" : `essas ${pending} fontes`}, uma de cada vez.`
                          : "Essas fontes já estão conectadas.",
                    },
                    () => goTo(pending > 0 ? "configurar" : "dashboard"),
                    1400,
                  );
                }}
                onSkip={() => goTo("dashboard")}
              />
            )}

            {step.key === "configurar" && (
              <ConfigureStep
                flow={flow}
                userId={userId}
                hasDataSource={status.hasDataSource}
                celebrating={!!celebration}
                celebrate={celebrate}
                refresh={refresh}
                setItem={(id, state) =>
                  setFlow((f) => ({ ...f, items: { ...f.items, [id]: state } }))
                }
                onAllDone={(connected, skipped) => {
                  if (connected === 0 && !status.hasDataSource) return; // fica no aviso "nenhuma conectada"
                  celebrate(
                    {
                      title: "Fontes conectadas!",
                      subtitle:
                        `${connected} ${connected === 1 ? "fonte pronta" : "fontes prontas"} para virar painel.` +
                        (skipped > 0
                          ? ` ${skipped} ${skipped === 1 ? "ficou" : "ficaram"} sem configurar.`
                          : ""),
                    },
                    () => goTo("dashboard"),
                    1900,
                  );
                }}
                onUnskip={(id) =>
                  setFlow((f) => {
                    const items = { ...f.items };
                    delete items[id];
                    return { ...f, items };
                  })
                }
                onChooseMore={() => goTo("escolher")}
                onNext={() => goTo("dashboard")}
                onLeave={() => onOpenChange(false)}
              />
            )}

            {step.key === "dashboard" && (
              <DashboardStep
                allDone={allDone}
                hasDashboard={status.hasDashboard}
                onClose={() => onOpenChange(false)}
                onBack={() => goTo("configurar")}
                onConnectData={() => goTo("escolher")}
              />
            )}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

// ── Trilho lateral com os passos ──

function StepRail({
  stepIndex,
  done,
  doneCount,
  notConfigured,
  onPick,
  onLater,
}: {
  stepIndex: number;
  done: Record<StepKey, boolean>;
  doneCount: number;
  /** Fontes escolhidas e puladas: o passo 3 avisa em coral. */
  notConfigured: number;
  onPick: (i: number) => void;
  onLater: () => void;
}) {
  // Revenue++: a conta criada conta como passo feito — o mesmo "1 de 3" da
  // home, e a barra nasce em 20% ("start the bar at 20%, not 0%").
  const revenuePP = useRevenuePP();
  const pct = revenuePP
    ? Math.round(((doneCount + 1) / (STEPS.length + 1)) * 100)
    : Math.round((doneCount / STEPS.length) * 100);
  return (
    <aside
      className="relative flex flex-col gap-4 overflow-hidden p-4 text-white md:gap-6 md:p-6"
      style={{
        background:
          "linear-gradient(165deg, var(--via-navy-deep) 0%, var(--via-navy) 55%, var(--via-blue) 130%)",
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      <div className="relative">
        <span className="ds-brand-subido inline-flex">
          <SubidoLogo height={26} animate="intro" loopEvery={12000} tone="inverse" />
        </span>
        <DialogTitle className="mt-4 text-lg font-semibold tracking-[-0.01em] text-white">
          Bem-vindo ao My Dashboard
        </DialogTitle>
        <DialogDescription className="mt-1 hidden text-sm text-white/70 md:block">
          Em poucos minutos seus dados viram painéis. Dá para sair e voltar quando quiser.
        </DialogDescription>
      </div>

      {/* Celular: os passos viram uma linha de bolinhas */}
      <ol className="relative flex gap-2 md:hidden">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex-1">
            <button
              type="button"
              onClick={() => onPick(i)}
              aria-label={`Passo ${i + 1}: ${s.title}`}
              aria-current={i === stepIndex ? "step" : undefined}
              className={cn(
                "h-1.5 w-full rounded-full transition-colors duration-300",
                done[s.key]
                  ? "bg-[var(--via-success)]"
                  : i === stepIndex
                    ? "bg-white"
                    : "bg-white/25",
              )}
            />
          </li>
        ))}
      </ol>

      <ol className="relative hidden flex-1 flex-col md:flex">
        {STEPS.map((s, i) => {
          const isDone = done[s.key];
          const current = i === stepIndex;
          const Icon = s.icon;
          return (
            <li key={s.key} className="relative pb-7 last:pb-0">
              {i < STEPS.length - 1 && (
                <span className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-0.5 overflow-hidden rounded-full bg-white/15">
                  <span
                    className="block w-full bg-[var(--via-success)] transition-[height] duration-700 ease-out"
                    style={{ height: isDone ? "100%" : "0%" }}
                  />
                </span>
              )}
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-[var(--via-radius-md)] p-1 text-left transition-colors",
                  current ? "bg-white/10" : "hover:bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isDone
                      ? ""
                      : current
                        ? "ob-ring bg-white text-[var(--via-navy)]"
                        : "bg-white/10 text-white/70 ring-1 ring-white/20",
                  )}
                >
                  {isDone ? (
                    <AnimatedCheck size={36} key={`${s.key}-done`} />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/50">
                    Passo {i + 1}
                    {s.key === "ia" && " · opcional"}
                  </span>
                  <span
                    className={cn(
                      "block truncate text-sm font-medium",
                      current ? "text-white" : "text-white/80",
                    )}
                  >
                    {s.title}
                  </span>
                  {s.key === "configurar" && notConfigured > 0 ? (
                    <span className="flex items-center gap-1 truncate text-xs font-medium text-[color-mix(in_srgb,var(--via-coral)_55%,white)]">
                      <CircleAlert className="h-3 w-3 shrink-0" />
                      {notConfigured === 1
                        ? "1 não configurada"
                        : `${notConfigured} não configuradas`}
                    </span>
                  ) : (
                    <span className="block truncate text-xs text-white/55">{s.subtitle}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative hidden space-y-3 md:block">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-white/70">
            <span>Sua conta</span>
            <span className="font-medium text-white">{pct}% pronta</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/15">
            <div
              className="ob-shine h-full rounded-full bg-[var(--via-success)] transition-[width] duration-700 ease-out"
              style={{ width: `${Math.max(pct, 4)}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onLater}
          className="text-xs text-white/60 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          Deixar para depois
        </button>
      </div>
    </aside>
  );
}

// ── Cabeçalho e rodapé padrão de um passo ──

function StepHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="space-y-1.5 px-5 pt-6 pr-12 md:px-8 md:pt-8">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-navy)]">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--via-text-primary)]">
        {title}
      </h2>
      <p className="max-w-[62ch] text-sm text-[var(--via-text-muted)]">{text}</p>
    </header>
  );
}

function StepFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--via-border-soft)] bg-[var(--via-surface)] px-5 py-4 md:px-8">
      {children}
    </footer>
  );
}

// ── Passo 1: IA ──

function IaStep({
  configured,
  platformChosen,
  onPlatform,
  onKeySaved,
  onNext,
}: {
  configured: boolean;
  platformChosen: boolean;
  onPlatform: () => void;
  onKeySaved: (providerLabel: string) => Promise<void>;
  onNext: () => void;
}) {
  const [mode, setMode] = useState<"plataforma" | "chave" | null>(
    configured ? "chave" : platformChosen ? "plataforma" : null,
  );
  const [provider, setProvider] = useState<AIProviderId>(SELECTABLE_PROVIDERS[0].id);
  const [key, setKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const meta = SELECTABLE_PROVIDERS.find((p) => p.id === provider) ?? SELECTABLE_PROVIDERS[0];

  async function save() {
    const value = key.trim();
    if (!value) return;
    setSaving(true);
    setMessage(null);
    try {
      const headers = await authHeaders();
      if (!headers) throw new Error("Sua sessão expirou. Entre de novo para salvar.");
      // A chave vai antes da preferência: se ela falhar, o provedor preferido não muda.
      const resp = await fetch("/api/keys", {
        method: "POST",
        headers,
        body: JSON.stringify({ service: provider, value }),
      });
      const body = (await resp.json().catch(() => ({}))) as { error?: string };
      if (!resp.ok) throw new Error(body.error ?? "Não foi possível guardar a chave.");
      await fetch("/api/keys", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ preferred_provider: provider, preferred_model: "" }),
      });
      setKey("");
      await onKeySaved(meta.label);
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : String(err) });
    } finally {
      setSaving(false);
    }
  }

  const choice = (
    id: "plataforma" | "chave",
    Icon: React.ElementType,
    title: string,
    text: string,
    tag?: string,
  ) => {
    const active = mode === id;
    return (
      <button
        type="button"
        onClick={() => {
          setMode(id);
          if (id === "plataforma") onPlatform();
        }}
        aria-pressed={active}
        className={cn(
          "relative flex flex-col gap-3 rounded-[var(--via-radius-lg)] border p-5 text-left transition-all duration-200",
          "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)]",
          active
            ? "border-[var(--via-navy)] bg-[var(--via-navy-04)] shadow-[0_14px_32px_-20px_var(--via-shadow-ink-40)]"
            : "border-[var(--via-border)] bg-[var(--via-surface)] hover:border-[var(--via-navy-20)]",
        )}
      >
        {active && (
          <span className="absolute right-3 top-3">
            <AnimatedCheck size={22} />
          </span>
        )}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--via-navy-08)] text-[var(--via-navy)]">
          <Icon className="h-5 w-5" />
        </span>
        <span>
          <span className="flex items-center gap-2 text-base font-semibold text-[var(--via-text-primary)]">
            {title}
            {tag && (
              <span className="rounded-full bg-[var(--via-navy-08)] px-2 py-0.5 text-[0.6875rem] font-medium text-[var(--via-navy)]">
                {tag}
              </span>
            )}
          </span>
          <span className="mt-1 block text-sm text-[var(--via-text-muted)]">{text}</span>
        </span>
      </button>
    );
  };

  return (
    <>
      <StepHeader
        eyebrow="Passo 1 · opcional"
        title="Quem vai montar seus painéis?"
        text="Você descreve o painel numa frase e a IA monta. Dá para começar com a Lovable AI e trocar pela sua chave quando quiser."
      />
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {choice(
            "plataforma",
            Zap,
            "Usar a Lovable AI",
            "Zero configuração, funciona na hora. O porém: consome créditos da sua conta Lovable e pode sair até 8x mais cara que uma API externa.",
            "nativa",
          )}
          {choice(
            "chave",
            KeyRound,
            "Minha própria chave",
            "Use seu provedor, seu modelo e seus limites. A chave fica no cofre do servidor.",
          )}
        </div>

        {mode === "chave" && (
          <div className="space-y-4 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-navy-03)] p-5 animate-in fade-in slide-in-from-top-2 duration-300">
            {configured ? (
              <p className="flex items-center gap-2 text-sm font-medium text-[var(--via-text-primary)]">
                <AnimatedCheck size={20} /> Você já tem uma chave guardada. Para trocar, use
                Configurações › IA.
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--via-text-primary)]">Provedor</p>
                  <div className="flex flex-wrap gap-2">
                    {SELECTABLE_PROVIDERS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setProvider(p.id)}
                        aria-pressed={provider === p.id}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
                          provider === p.id
                            ? "ob-pop border-[var(--via-navy)] bg-[var(--via-navy)] text-white"
                            : "border-[var(--via-border)] bg-[var(--via-surface)] text-[var(--via-text-primary)] hover:border-[var(--via-navy-20)]",
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="ob-key"
                    className="text-sm font-medium text-[var(--via-text-primary)]"
                  >
                    Chave de API · {meta.label}
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      id="ob-key"
                      type="password"
                      autoComplete="off"
                      placeholder={meta.keyPlaceholder}
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && void save()}
                    />
                    <Button onClick={() => void save()} disabled={saving || !key.trim()}>
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Guardar chave
                    </Button>
                  </div>
                  <a
                    href={meta.consoleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--via-navy)] underline-offset-2 hover:underline"
                  >
                    Onde pego a chave? {meta.consoleLabel} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                {message && (
                  <p
                    role="status"
                    className={cn(
                      "text-sm",
                      message.ok ? "text-[var(--via-success)]" : "text-destructive",
                    )}
                  >
                    {message.text}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <StepFooter>
        <span className="text-xs text-[var(--via-text-muted)]">
          Você pode mudar isso depois em Configurações › IA.
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onNext}>
            Configurar depois
            <SkipForward className="h-4 w-4" />
          </Button>
          {(configured || platformChosen) && (
            <Button onClick={onNext}>
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </StepFooter>
    </>
  );
}

// ── Passo 2: escolher as fontes ──

function ChooseStep({
  selected,
  items,
  unavailable,
  subidoSolutions,
  hasDataSource,
  onToggle,
  onBack,
  onConfirm,
  onSkip,
}: {
  selected: string[];
  items: Record<string, ItemState>;
  unavailable: Set<string>;
  subidoSolutions: ConnectorMeta[];
  hasDataSource: boolean;
  onToggle: (id: string) => void;
  onBack: () => void;
  onConfirm: () => void;
  onSkip: () => void;
}) {
  const isOn = (id: string) => selected.includes(id);
  const subidoOn = isOn(SUBIDO_ID);

  return (
    <>
      <StepHeader
        eyebrow="Passo 2"
        title="De onde vêm seus dados?"
        text="Marque todas as que você usa. No próximo passo a gente conecta uma de cada vez, sem sair desta janela."
      />
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-6 md:px-8">
        {/* SUBIDO AI em destaque: é o caminho mais curto para quem já usa uma solução da Viver de IA */}
        <button
          type="button"
          onClick={() => onToggle(SUBIDO_ID)}
          aria-pressed={subidoOn}
          className={cn(
            "group relative flex w-full items-center gap-4 overflow-hidden rounded-[var(--via-radius-lg)] p-5 text-left text-white transition-all duration-200 hover:-translate-y-0.5",
            subidoOn
              ? "shadow-[0_0_0_3px_var(--via-success),0_18px_40px_-20px_var(--via-shadow-ink-60)]"
              : "shadow-[0_14px_32px_-18px_var(--via-shadow-ink-60)]",
          )}
          style={{
            background: "linear-gradient(135deg, var(--via-navy-deep) 0%, var(--via-blue) 100%)",
          }}
        >
          <span className="ob-shine pointer-events-none absolute inset-0" />
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--via-radius-md)] bg-white/10 ring-1 ring-white/20">
            <Sparkles className="ob-float h-6 w-6" />
          </span>
          <span className="relative min-w-0 flex-1">
            <span className="flex items-center gap-2 text-base font-semibold">
              Soluções SUBIDO AI
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.6875rem] font-medium">
                mais rápido
              </span>
            </span>
            <span className="mt-0.5 block text-sm text-white/75">
              Use os dados das suas soluções da Viver de IA com um código de conexão.
            </span>
            {subidoSolutions.length > 0 && (
              <span className="mt-2 flex flex-wrap gap-1.5">
                {subidoSolutions.map((c) => (
                  <span
                    key={c.id}
                    className="rounded-full bg-white/10 px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-white/15"
                  >
                    {c.label}
                  </span>
                ))}
              </span>
            )}
          </span>
          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
            {subidoOn ? (
              <AnimatedCheck size={28} key="subido-on" />
            ) : (
              <span className="h-6 w-6 rounded-full border-2 border-white/50" />
            )}
          </span>
        </button>

        {SOURCE_GROUPS.map((group) => {
          const visible = group.items.filter((o) => !unavailable.has(o.id));
          if (visible.length === 0) return null;
          return (
            <div key={group.title}>
              <p className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
                {group.title}
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((o) => {
                  const on = isOn(o.id);
                  const connected = items[o.id] === "done";
                  const skipped = on && items[o.id] === "skipped";
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => onToggle(o.id)}
                      aria-pressed={on}
                      className={cn(
                        "relative flex items-center gap-3 rounded-[var(--via-radius-md)] border p-3 text-left transition-all duration-200",
                        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)]",
                        on
                          ? "border-[var(--via-navy)] bg-[var(--via-navy-04)] shadow-[0_10px_24px_-18px_var(--via-shadow-ink-40)]"
                          : "border-[var(--via-border-soft)] bg-[var(--via-surface)] hover:border-[var(--via-navy-20)]",
                      )}
                    >
                      <span className={cn("transition-transform duration-200", on && "scale-105")}>
                        <SourceIcon id={o.id} size={38} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-[var(--via-text-primary)]">
                          {o.label}
                        </span>
                        <span
                          className={cn(
                            "block truncate text-xs",
                            skipped
                              ? "font-medium text-[var(--via-coral-dark)]"
                              : "text-[var(--via-text-muted)]",
                          )}
                        >
                          {connected
                            ? "Já conectada"
                            : skipped
                              ? "Ainda não configurada"
                              : o.description}
                        </span>
                      </span>
                      {on ? (
                        <AnimatedCheck size={20} key={`${o.id}-on`} />
                      ) : (
                        <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[var(--via-border)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <p className="text-xs text-[var(--via-text-muted)]">
          Não achou a sua? Bancos como MySQL e BigQuery, outros ERPs e mais estão em Fontes › Nova
          fonte.
        </p>
      </div>

      <StepFooter>
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          {/* As escolhidas aparecem aqui, uma a uma */}
          <div className="hidden min-w-0 items-center -space-x-2 sm:flex">
            {selected.slice(0, 7).map((id) => (
              <span
                key={id}
                className="ob-pop rounded-[var(--via-radius-sm)] ring-2 ring-[var(--via-surface)]"
              >
                <SourceIcon id={id} size={30} />
              </span>
            ))}
            {selected.length > 7 && (
              <span className="flex h-[30px] items-center pl-3 text-xs text-[var(--via-text-muted)]">
                +{selected.length - 7}
              </span>
            )}
          </div>
          {selected.length > 0 && (
            <span
              key={selected.length}
              className="ob-pop text-sm font-medium text-[var(--via-text-primary)]"
            >
              {selected.length} {selected.length === 1 ? "selecionada" : "selecionadas"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasDataSource && selected.length === 0 && (
            <Button variant="outline" onClick={onSkip}>
              Já conectei minhas fontes
            </Button>
          )}
          <Button onClick={onConfirm} disabled={selected.length === 0}>
            {selected.length === 0
              ? "Escolha ao menos uma"
              : `Conectar ${selected.length === 1 ? "esta fonte" : `${selected.length} fontes`}`}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </StepFooter>
    </>
  );
}

// ── Passo 3: conectar uma por uma ──

type Celebrate = (c: { title: string; subtitle?: string }, then?: () => void, ms?: number) => void;

function ConfigureStep({
  flow,
  userId,
  hasDataSource,
  celebrating,
  celebrate,
  setItem,
  refresh,
  onAllDone,
  onUnskip,
  onChooseMore,
  onNext,
  onLeave,
}: {
  flow: Flow;
  userId: string;
  hasDataSource: boolean;
  celebrating: boolean;
  celebrate: Celebrate;
  setItem: (id: string, state: ItemState) => void;
  refresh: () => Promise<void>;
  /** Fila resolvida: quantas conectadas e quantas puladas. */
  onAllDone: (connected: number, skipped: number) => void;
  onUnskip: (id: string) => void;
  onChooseMore: () => void;
  onNext: () => void;
  /** Sai do onboarding (abrir o editor de um dashboard). */
  onLeave: () => void;
}) {
  const pending = flow.selected.filter((id) => !flow.items[id]);
  const [currentId, setCurrentId] = useState<string | null>(pending[0] ?? null);
  // connect = cadastro embutido; review = conferência dos dados que chegaram + dashboard.
  const [phase, setPhase] = useState<"connect" | "review">("connect");
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  // Recomeça o cadastro da vez (o próprio cadastro pediu para fechar sem criar nada).
  const [attempt, setAttempt] = useState(0);
  // Google Sheets → "colar o link": o mesmo item passa a usar o envio de arquivo no modo link.
  const [sheetsAsLink, setSheetsAsLink] = useState(false);
  const succeeded = useRef(new Set<string>());
  const celebratedConnect = useRef(new Set<string>());
  // Fontes que já existiam quando o cadastro da vez começou: o que aparecer
  // depois é o que ele criou. Vale para todos os cadastros, inclusive os que
  // não devolvem o id (CSV, Sheets), e não depende do relógio do navegador.
  const before = useRef<{ id: string; ids: Set<string> } | null>(null);

  async function sourceIdsNow(): Promise<string[]> {
    const { data } = await supabase
      .from("data_sources")
      .select("id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    return ((data as { id: string }[] | null) ?? []).map((r) => r.id);
  }

  useEffect(() => {
    if (!currentId || phase !== "connect") return;
    const id = currentId;
    void sourceIdsNow().then((ids) => {
      before.current = { id, ids: new Set(ids) };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, attempt, phase]);

  // Item da vez resolvido (ou nenhum): passa para o próximo pendente — mas só
  // depois da comemoração e fora da conferência, para nada sumir no meio.
  useEffect(() => {
    if (celebrating || phase === "review") return;
    if (currentId && !flow.items[currentId] && flow.selected.includes(currentId)) return;
    setCurrentId(pending[0] ?? null);
    setSheetsAsLink(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow, celebrating, phase]);

  const total = flow.selected.length;
  const connected = flow.selected.filter((id) => flow.items[id] === "done").length;
  const notConfigured = flow.selected.filter((id) => flow.items[id] === "skipped").length;
  const resolvedCount = flow.selected.filter((id) => flow.items[id]).length;
  const position = currentId ? flow.selected.indexOf(currentId) + 1 : total;
  const nextPending = pending.find((id) => id !== currentId) ?? null;

  /** Quantas ficam conectadas/puladas depois de marcar `id` como `state`. */
  function countsAfter(id: string, state: ItemState) {
    const items = { ...flow.items, [id]: state };
    return {
      connected: flow.selected.filter((s) => items[s] === "done").length,
      skipped: flow.selected.filter((s) => items[s] === "skipped").length,
      remaining: flow.selected.filter((s) => !items[s]).length,
    };
  }

  function connectedNow(id: string) {
    celebratedConnect.current.add(id);
    celebrate(
      { title: `Conectado ao ${optionOf(id).label}!`, subtitle: "Agora escolha o que importar." },
      undefined,
      1500,
    );
  }

  // Os cadastros chamam "fechar" e "sucesso" em ordens diferentes (CSV e
  // Pipedrive fecham e logo depois avisam o sucesso; o assistente genérico
  // avisa o sucesso e depois fecha). Por isso o fechamento espera um tique
  // antes de decidir se foi conclusão ou desistência.
  function success(id: string) {
    succeeded.current.add(id);
  }
  function closed(id: string) {
    window.setTimeout(() => {
      if (succeeded.current.has(id)) void finishImport(id);
      else setAttempt((a) => a + 1);
    }, 0);
  }

  async function finishImport(id: string) {
    const known = before.current?.id === id ? before.current.ids : new Set<string>();
    const created = (await sourceIdsNow()).filter((s) => !known.has(s));
    setReviewIds(created);
    setPhase("review");
    setItem(id, "done");
    void refresh();
    // Quem não teve o momento "conectado" separado (CSV, Sheets, Pipedrive, webhook) comemora aqui.
    if (!celebratedConnect.current.has(id))
      celebrate({
        title: `${optionOf(id).label} conectado!`,
        subtitle: "Confira os dados que chegaram.",
      });
  }

  function goNext() {
    if (!currentId) return;
    const { connected: c, skipped, remaining } = countsAfter(currentId, "done");
    setPhase("connect");
    setReviewIds([]);
    if (remaining === 0) onAllDone(c, skipped);
  }

  function skip(id: string) {
    setItem(id, "skipped");
    const { connected: c, skipped, remaining } = countsAfter(id, "skipped");
    if (remaining === 0) onAllDone(c, skipped);
  }

  function renderConnector(id: string) {
    const common = {
      open: true,
      onOpenChange: (o: boolean) => {
        if (!o) closed(id);
      },
    };
    switch (id) {
      case SUBIDO_ID:
        return (
          <SubidoConnector
            {...common}
            onSuccess={() => success(id)}
            onConnected={() => connectedNow(id)}
          />
        );
      case "csv":
        return <CsvUploader {...common} onSuccess={() => success(id)} />;
      case "sheets":
        return sheetsAsLink ? (
          <CsvUploader {...common} modoInicial="link" onSuccess={() => success(id)} />
        ) : (
          <SheetsConnector
            {...common}
            onSuccess={() => success(id)}
            onScriptCriado={() => success(id)}
            onColarLink={() => setSheetsAsLink(true)}
          />
        );
      case "pipedrive":
        return <CrmConnector {...common} onSuccess={() => success(id)} />;
      case "webhook":
        return <WebhookCreator {...common} onSuccess={() => success(id)} />;
      default:
        return (
          <ConnectorWizard
            {...common}
            initialConnector={id}
            onCreated={() => success(id)}
            onConnected={() => connectedNow(id)}
            onCustomFlow={() => setAttempt((a) => a + 1)}
          />
        );
    }
  }

  return (
    <>
      <StepHeader
        eyebrow="Passo 3"
        title={
          currentId && phase === "review"
            ? `${optionOf(currentId).label}: confira os dados`
            : currentId
              ? `Conectando ${optionOf(currentId).label}`
              : resolvedCount === total && total > 0
                ? "Fontes conectadas"
                : "Nenhuma fonte na fila"
        }
        text={
          currentId && phase === "review"
            ? "Veja o que chegou e, se quiser, já crie um dashboard com esses dados."
            : currentId
              ? "Siga os passos abaixo. As chaves vão direto para o cofre do servidor e nunca ficam no navegador."
              : "Tudo o que você escolheu já foi resolvido."
        }
      />

      {/* Progresso da fila */}
      {total > 0 && (
        <div className="px-5 pt-4 md:px-8">
          <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--via-text-muted)]">
            <span>
              {currentId
                ? `Fonte ${position} de ${total}`
                : `${total} ${total === 1 ? "fonte" : "fontes"}`}
            </span>
            <span key={connected} className="ob-pop font-medium text-[var(--via-text-primary)]">
              {connected} {connected === 1 ? "conectada" : "conectadas"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--via-navy-06)]">
            <div
              className="h-full rounded-full bg-[var(--via-success)] transition-[width] duration-700 ease-out"
              style={{ width: `${total ? (resolvedCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-5 py-4 lg:flex-row lg:gap-6 md:px-8">
        {/* Fila das escolhidas, ao lado do cadastro */}
        <ol className="flex shrink-0 gap-2 overflow-x-auto pb-1 lg:w-56 lg:flex-col lg:overflow-y-auto lg:pb-0">
          {flow.selected.map((id) => {
            const state = flow.items[id];
            const current = id === currentId;
            const o = optionOf(id);
            return (
              <li key={id} className="shrink-0">
                <button
                  type="button"
                  disabled={state === "done" || phase === "review"}
                  onClick={() => {
                    if (state === "skipped") onUnskip(id);
                    setCurrentId(id);
                    setSheetsAsLink(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-[var(--via-radius-md)] border p-2 pr-3 text-left transition-all duration-300",
                    current
                      ? "border-[var(--via-navy)] bg-[var(--via-navy-04)] shadow-[0_10px_24px_-18px_var(--via-shadow-ink-40)]"
                      : state === "done"
                        ? "border-transparent bg-[var(--via-navy-03)]"
                        : state === "skipped"
                          ? PENDING_TINT
                          : "border-[var(--via-border-soft)] bg-[var(--via-surface)] hover:border-[var(--via-navy-20)]",
                  )}
                >
                  <span className={cn("rounded-[var(--via-radius-sm)]", current && "ob-ring")}>
                    <SourceIcon id={id} size={32} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-[var(--via-text-primary)]">
                      {o.label}
                    </span>
                    <span
                      className={cn(
                        "block text-[0.6875rem]",
                        state === "skipped"
                          ? "font-medium text-[var(--via-coral-dark)]"
                          : "text-[var(--via-text-muted)]",
                      )}
                    >
                      {state === "done"
                        ? "Conectada"
                        : state === "skipped"
                          ? "Ainda não configurada"
                          : current
                            ? "Configurando agora"
                            : "Na fila · não configurada"}
                    </span>
                  </span>
                  {state === "done" ? (
                    <AnimatedCheck size={20} key={`${id}-ok`} />
                  ) : state === "skipped" ? (
                    <CircleAlert
                      className="h-4 w-4 text-[var(--via-coral)]"
                      aria-label="Ainda não configurada"
                    />
                  ) : (
                    <Circle
                      className={cn(
                        "h-4 w-4",
                        current ? "text-[var(--via-navy)]" : "text-[var(--via-border)]",
                      )}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* Cadastro da vez, embutido */}
        <div className="min-h-0 flex-1 overflow-y-auto rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-bg-soft)] p-4 md:p-6">
          {currentId && phase === "review" ? (
            <ImportReview
              key={`review:${currentId}`}
              sourceIds={reviewIds}
              onDashboardCreated={() => void refresh()}
              onLeave={onLeave}
            />
          ) : currentId ? (
            <div
              key={`${currentId}:${attempt}:${sheetsAsLink}`}
              className="animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <SourceHelp id={currentId} />
              <DialogEmbed>{renderConnector(currentId)}</DialogEmbed>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
              {connected > 0 || hasDataSource ? (
                <>
                  <span className="relative flex h-16 w-16 items-center justify-center">
                    <Burst />
                    <AnimatedCheck size={56} />
                  </span>
                  <p className="text-base font-semibold text-[var(--via-text-primary)]">
                    {notConfigured > 0 ? "Fontes conectadas" : "Tudo conectado"}
                  </p>
                  {notConfigured > 0 && (
                    <p
                      className={cn(
                        "flex max-w-sm items-start gap-2 rounded-[var(--via-radius-md)] border px-3 py-2 text-left text-sm text-[var(--via-text-primary)]",
                        PENDING_TINT,
                      )}
                    >
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--via-coral)]" />
                      <span>
                        {notConfigured === 1
                          ? "1 fonte ainda não configurada."
                          : `${notConfigured} fontes ainda não configuradas.`}{" "}
                        Clique nela na lista ao lado para configurar agora, ou depois em Fontes.
                      </span>
                    </p>
                  )}
                  <Button onClick={onNext}>
                    Criar meu primeiro dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-[var(--via-text-primary)]">
                    Nenhuma fonte foi conectada ainda
                  </p>
                  <p className="max-w-sm text-sm text-[var(--via-text-muted)]">
                    Sem dados os painéis ficam vazios. Clique numa fonte pulada para tentar de novo
                    ou escolha outras.
                  </p>
                  <Button variant="outline" onClick={onChooseMore}>
                    Escolher outras fontes
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <StepFooter>
        <Button variant="ghost" size="sm" onClick={onChooseMore}>
          <ArrowLeft className="h-4 w-4" /> Mudar a escolha
        </Button>
        {currentId && phase === "review" ? (
          <Button onClick={goNext}>
            {nextPending ? `Próxima fonte: ${optionOf(nextPending).label}` : "Concluir as fontes"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          currentId && (
            <Button variant="outline" onClick={() => skip(currentId)}>
              <SkipForward className="h-4 w-4" />
              Pular {optionOf(currentId).label}
            </Button>
          )
        )}
      </StepFooter>
    </>
  );
}

// ── Passo 4: primeiro dashboard ──

function DashboardStep({
  allDone,
  hasDashboard,
  onClose,
  onBack,
  onConnectData,
}: {
  allDone: boolean;
  hasDashboard: boolean;
  onClose: () => void;
  onBack: () => void;
  onConnectData: () => void;
}) {
  const [offers, setOffers] = useState<number | null>(null);
  const { hasData } = useHasData();

  if (hasDashboard) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="relative flex h-28 w-28 items-center justify-center">
          <Burst count={16} distance={84} />
          <AnimatedCheck size={88} />
        </span>
        {/* o momento da marca: a logo entra de novo, subindo */}
        <span className="ds-brand-subido inline-flex">
          <SubidoLogo height={34} animate="intro" />
        </span>
        <div className="ob-pop space-y-1.5" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--via-text-primary)]">
            {allDone ? "Sua conta está pronta!" : "Seu primeiro dashboard já existe"}
          </h2>
          <p className="max-w-md text-sm text-[var(--via-text-muted)]">
            Seus dados já viram painel. Crie outros quando quiser, pela tela de Dashboards.
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/dashboards" onClick={onClose}>
            Ver meus dashboards <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <StepHeader
        eyebrow="Passo 4"
        title="Hora de ver seus dados"
        text="Escolha um painel pronto para as fontes que você conectou, ou descreva o que quer ver e a IA monta."
      />
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-6 md:px-8">
        {/* sem fonte com dados, não há o que montar: o aviso leva de volta à escolha das fontes */}
        {hasData === false ? (
          <NoDataNotice onAction={onConnectData} />
        ) : (
          <>
            {offers !== 0 && (
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm font-medium text-[var(--via-text-primary)]">
                  <LayoutDashboard className="h-4 w-4 text-[var(--via-navy)]" />
                  Painéis prontos, um clique
                </p>
                {offers === null && (
                  <div className="flex items-center gap-2 text-sm text-[var(--via-text-muted)]">
                    <Loader2 className="h-4 w-4 animate-spin" /> Procurando painéis para suas
                    fontes…
                  </div>
                )}
                <ReadyPanelsStrip compact onOffers={setOffers} />
              </div>
            )}

            <Link
              to="/dashboards/new"
              onClick={onClose}
              className="group flex items-center gap-4 rounded-[var(--via-radius-lg)] border border-[var(--via-border)] bg-[var(--via-surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--via-navy-20)] hover:shadow-[0_14px_32px_-22px_var(--via-shadow-ink-40)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy-08)] text-[var(--via-navy)]">
                <Wand2 className="ob-float h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-[var(--via-text-primary)]">
                  Descrever com minhas palavras
                </span>
                <span className="mt-0.5 block text-sm text-[var(--via-text-muted)]">
                  Ex.: “vendas por mês com meta” — a IA monta o painel com as suas fontes.
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-[var(--via-navy)] transition-transform group-hover:translate-x-1" />
            </Link>
          </>
        )}
      </div>
      <StepFooter>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <span className="text-xs text-[var(--via-text-muted)]">
          O painel criado abre no editor, já ligado à fonte.
        </span>
      </StepFooter>
    </>
  );
}
