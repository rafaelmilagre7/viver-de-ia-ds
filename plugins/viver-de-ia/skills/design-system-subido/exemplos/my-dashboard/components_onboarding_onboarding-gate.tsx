import { useCallback, useEffect, useState } from "react";
import { Rocket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SELECTABLE_PROVIDERS } from "@/lib/ai/catalog";
import { OnboardingWizard, type OnboardingStatus } from "./onboarding-wizard";
import { gateMounted, OPEN_EVENT, readDismissed, writeDismissed } from "./onboarding-events";
import { useRevenuePlus, useRevenuePP } from "@/lib/ds-variant";
import { useRouterState } from "@tanstack/react-router";

export { requestConnectData, requestOnboardingRestart } from "./onboarding-events";

const SEEN_KEY = "onboarding:visto";

// Os ids de provedor do catálogo. api_keys_registry guarda muito mais do que
// chave de modelo — slack_webhook, google:<id>, oauth:<conector>:<id> e os
// segredos de aplicativo do administrador —, então a consulta precisa recortar
// por esta lista. Sem o recorte, salvar o webhook do Slack em Alertas dava o
// passo "Conecte sua IA" por concluído e o usuário só descobria a mentira no
// 503 de /api/generate.
const PROVIDER_IDS: string[] = SELECTABLE_PROVIDERS.map((p) => p.id);

async function loadStatus(userId: string): Promise<OnboardingStatus> {
  const [registry, sources, dashboards] = await Promise.all([
    supabase
      .from("api_keys_registry")
      .select("service_name")
      .eq("user_id", userId)
      .eq("is_active", true)
      .in("service_name", PROVIDER_IDS),
    supabase
      .from("data_sources")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase.from("dashboards").select("id", { count: "exact", head: true }).eq("user_id", userId),
  ]);

  return {
    aiKeyConfigured: (registry.data ?? []).length > 0,
    hasDataSource: (sources.count ?? 0) > 0,
    hasDashboard: (dashboards.count ?? 0) > 0,
  };
}

// O que o aviso do topo cobra. A chave de IA não entra: publicado no Lovable o
// app gera sem ela, e o aviso antigo dizia "não está pronta para gerar
// dashboards" a quem já podia gerar.
const REQUIRED: { key: keyof OnboardingStatus; label: string }[] = [
  { key: "hasDataSource", label: "conectar suas fontes" },
  { key: "hasDashboard", label: "criar o primeiro dashboard" },
];

export function OnboardingGate() {
  const revenuePlus = useRevenuePlus();
  const revenuePP = useRevenuePP();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialStep, setInitialStep] = useState<number | null>(null);
  // O inicializador do useState roda também no SSR, onde sessionStorage não
  // existe: ler direto derrubava a renderização de toda página protegida
  // ("ReferenceError: sessionStorage is not defined") e só o cliente salvava.
  const [bannerDismissed, setBannerDismissed] = useState(() => readDismissed());

  const refresh = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    setUserId(data.user.id);
    setStatus(await loadStatus(data.user.id));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Primeiro acesso (nada conectado, nada criado): a janela abre sozinha, uma
  // vez por usuário neste navegador. Depois disso fica o aviso do topo.
  useEffect(() => {
    if (!status || !userId) return;
    if (status.hasDataSource || status.hasDashboard) return;
    const key = `${SEEN_KEY}:${userId}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      return; // sem armazenamento abriria a cada tela; fica só o aviso
    }
    setInitialStep(null);
    setModalOpen(true);
  }, [status, userId]);

  // Reabertura via "Refazer onboarding" nas Configurações — relê o estado
  // atual antes de abrir e começa do primeiro passo (wizard bidirecional).
  useEffect(() => {
    const unmount = gateMounted();
    const open = (e: Event) => {
      const step = (e as CustomEvent<{ step?: number }>).detail?.step ?? 0;
      setBannerDismissed(false);
      setInitialStep(step);
      void refresh().then(() => setModalOpen(true));
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      unmount();
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [refresh]);

  if (!status || !userId) return null;

  const pending = REQUIRED.filter((s) => !status[s.key]);
  // Revenue+: progresso que não começa do zero ("start the bar at 20%, not
  // 0%"). Criar a conta é um passo de verdade e já está feito, então conta.
  const totalSteps = REQUIRED.length + 1;
  const doneSteps = totalSteps - pending.length;

  return (
    <>
      {pending.length > 0 &&
        !bannerDismissed &&
        !modalOpen &&
        // Revenue++: na home o checklist já é o progresso, e Dashboards,
        // Novo dashboard e Templates já mostram o aviso "conecte seus dados"
        // — o banner empilhado em cima repetiria a mesma chamada.
        !(
          revenuePP &&
          (pathname === "/" ||
            pathname.startsWith("/dashboards") ||
            pathname.startsWith("/templates") ||
            // Ajuda e Configurações não são passos da configuração: o banner
            // ali só empurra a tela para baixo
            pathname.startsWith("/help") ||
            pathname.startsWith("/settings"))
        ) && (
          <div className="ds-setup-banner mb-6 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
            <Rocket className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">
                {revenuePlus
                  ? `Você já começou: ${doneSteps} de ${totalSteps} passos`
                  : "Falta pouco para ver seus dados em painéis"}
              </p>
              <p className="truncate text-sm text-text-secondary">
                {revenuePP && pathname.startsWith("/sources") && pending[0].key === "hasDataSource"
                  ? "Escolha uma fonte abaixo. Planilha ou CSV é o mais rápido."
                  : revenuePlus
                    ? `Próximo: ${pending[0].label}.`
                    : `${pending.length === 1 ? "Falta 1 passo: " : `Faltam ${pending.length} passos: `}${pending.map((s) => s.label).join(" e ")}.`}
              </p>
              {revenuePlus && (
                <div
                  className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-[var(--via-navy-08)]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={totalSteps}
                  aria-valuenow={doneSteps}
                  aria-label="Progresso da configuração"
                >
                  <div
                    className="h-full rounded-full bg-[var(--via-navy)] transition-[width] duration-500"
                    style={{ width: `${(doneSteps / totalSteps) * 100}%` }}
                  />
                </div>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => {
                setInitialStep(null);
                void refresh().then(() => setModalOpen(true));
              }}
            >
              Continuar configuração
            </Button>
            <button
              type="button"
              aria-label="Dispensar aviso"
              className="shrink-0 text-text-muted transition-colors hover:text-text"
              onClick={() => {
                writeDismissed("1");
                setBannerDismissed(true);
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

      <OnboardingWizard
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          // fechou: a tela de trás pode ter mudado (fonte nova, chave nova)
          if (!open) void refresh();
        }}
        userId={userId}
        status={status}
        refresh={refresh}
        initialStep={initialStep}
      />
    </>
  );
}
