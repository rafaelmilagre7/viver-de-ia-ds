import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardSearchList } from "@/components/dashboard/dashboard-search-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PromptInput } from "@/components/dashboard/prompt-input";
import { ReadyPanelsStrip } from "@/components/dashboard/ready-panels-strip";
import { NoDataNotice } from "@/components/data/no-data-notice";
import { useHasData } from "@/lib/data-readiness";
import { useRevenuePP } from "@/lib/ds-variant";
import { supabase } from "@/integrations/supabase/client";
import type { Dashboard } from "@/types/dashboard";

export const Route = createFileRoute("/dashboards/")({
  component: DashboardsPage,
  head: () => ({ meta: [{ title: "Dashboards — My Dashboard" }] }),
});

function DashboardsPage() {
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("dashboards")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setDashboards(data as unknown as Dashboard[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setCurrentUserId(data.user.id);
      if (cancelled) return;
      if (error || !data.user) {
        void navigate({ to: "/login" });
        return;
      }
      void load();
    }
    void checkAuth();
    return () => {
      cancelled = true;
    };
  }, [navigate, load]);

  // Hook antes do return de carregamento: chamado depois dele, o primeiro
  // render saía sem o hook e o seguinte o chamava — "Rendered more hooks than
  // during the previous render" e a tela de Dashboards quebrava.
  const { hasData } = useHasData();
  const revenuePP = useRevenuePP();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasDashboards = dashboards.length > 0;

  return (
    <AppShell>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
            Meus dashboards
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie um novo dashboard ou acesse um existente.
          </p>
        </div>
        <Link to="/dashboards/new">
          {/* Revenue++: sem dado, criar falha — o botão recua para não
              competir com a única ação que destrava a tela (conectar) */}
          <Button
            className="gap-2"
            variant={revenuePP && hasData === false ? "outline" : "default"}
          >
            <Plus className="h-4 w-4" />
            Novo
          </Button>
        </Link>
      </div>

      {/* Revenue++: o campo de criar (no estado vazio ou acima da lista) já
          traz o mesmo aviso; dois blocos idênticos competindo é "se tudo
          chama atenção, nada chama" */}
      {hasData === false && !revenuePP && <NoDataNotice className="mb-8" />}

      <ReadyPanelsStrip className="mb-10" />

      {hasDashboards ? (
        <div className="space-y-10">
          <div className="flex flex-col items-center gap-6">
            <PromptInput compact showSuggestions />
          </div>
          <DashboardSearchList
            dashboards={dashboards}
            onChanged={load}
            currentUserId={currentUserId}
          />
        </div>
      ) : (
        <EmptyState />
      )}
    </AppShell>
  );
}
