import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Bell, Check, Database, Loader2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { StatCard } from "@/components/dashboard/stat-card";
import { HomeHeroChat } from "@/components/chat/home-hero-chat";
import { supabase } from "@/integrations/supabase/client";
import { authHeaders } from "@/lib/api-headers";
import { useRevenuePlus, useRevenuePP } from "@/lib/ds-variant";
import { useHasData } from "@/lib/data-readiness";
import { requestConnectData } from "@/components/onboarding/onboarding-gate";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ title: "My Dashboard" }, { name: "description", content: "My Dashboard" }],
  }),
});

interface Counts {
  sources: number;
  dashboards: number;
  alerts: number;
  templates: number;
}

/**
 * Revenue+ (variação do seletor de DS): a home diz o que o número significa e
 * qual é o próximo passo, em vez de só listar contagens — "information without
 * context is spam" e "make the dashboard answer 'what do I do now?'" (skill
 * Revenue-Centric Design). Fora dessa variação a home fica como sempre foi.
 */
function plural(n: number, um: string, varios: string) {
  return n === 1 ? um : varios;
}

function revenuePlusCopy(c: Counts) {
  const noSource = c.sources === 0;
  const noDashboard = c.dashboards === 0;
  return {
    heroLead: noSource
      ? "Conecte uma fonte e a IA monta o seu primeiro painel em segundos."
      : noDashboard
        ? "Seus dados já estão aqui. Descreva o que quer ver e a IA monta o painel."
        : "Descreva seu negócio. A IA monta um dashboard pronto em segundos.",
    sectionTitle: noSource
      ? "Comece conectando seus dados."
      : noDashboard
        ? "Sua fonte já pode virar painel."
        : "O que você já tem aqui.",
    sources: noSource ? "Conecte a primeira para ver seus dados" : "Alimentando seus painéis",
    dashboards: noSource
      ? "Nasce depois da primeira fonte"
      : noDashboard
        ? "Crie o primeiro com a IA, acima"
        : plural(c.dashboards, "Painel criado por você", "Painéis criados por você"),
    templates: noSource ? "Prontos para usar quando conectar" : "Use um pronto em 1 clique",
    alerts: noDashboard
      ? "Disponível depois do primeiro painel"
      : c.alerts === 0
        ? "Seja avisado quando uma métrica cair"
        : plural(c.alerts, "Métrica sob vigia", "Métricas sob vigia"),
  };
}

/**
 * Revenue++ · primeiro acesso sem dado. Em vez de um campo de prompt que não
 * pode gerar e de quatro KPIs zerados (o "dashboard em branco" que a skill
 * condena), a home vira um checklist com UM passo ativo:
 *   · "Never ship a blank dashboard" — o vazio aponta para o valor
 *   · started-progress effect — "1 de 3", porque a conta já foi criada
 *   · "one single clear action" — só "Conectar minha primeira fonte"
 *   · "deliver the promised result before teaching" — a promessa vem antes
 *   · "seed sample data / see the destination" — link para um painel pronto
 */
function FirstSteps({ hasDashboard }: { hasDashboard: boolean }) {
  const navigate = useNavigate();
  const steps = [
    { label: "Conta criada", detail: "Feito.", done: true },
    {
      label: "Conectar a primeira fonte",
      // mesma recomendação do onboarding ("mais rápido" = SUBIDO AI)
      detail:
        "Usa uma solução da Viver de IA? Conecte com um código. Se não, uma planilha resolve.",
      done: false,
    },
    {
      label: "Gerar o primeiro painel com IA",
      detail: "Você descreve o que quer acompanhar; a IA monta sobre os seus dados.",
      done: hasDashboard,
    },
  ];
  const done = steps.filter((s) => s.done).length;
  const current = steps.findIndex((s) => !s.done);

  return (
    <div className="ds-first-steps rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-6 sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
            Seu progresso
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-[-0.03em] text-[var(--via-text-primary)] tabular-nums">
            {done} de {steps.length}
          </p>
        </div>
        <p className="pb-1 text-sm text-[var(--via-text-muted)]">
          {steps.length - done === 1 ? "Falta 1 passo" : `Faltam ${steps.length - done} passos`}
        </p>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--via-navy-08)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={done}
        aria-label="Progresso da configuração"
      >
        <div
          className="h-full rounded-full bg-[var(--via-navy)] transition-[width] duration-500"
          style={{ width: `${(done / steps.length) * 100}%` }}
        />
      </div>

      <ol className="mt-6 space-y-1">
        {steps.map((s, i) => {
          const active = i === current;
          return (
            <li
              key={s.label}
              className={
                active
                  ? "flex gap-4 rounded-[var(--via-radius-md)] bg-[var(--via-navy-04)] p-4"
                  : "flex gap-4 p-4"
              }
            >
              <span
                className={
                  s.done
                    ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy)] text-white"
                    : active
                      ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--via-navy)] text-xs font-semibold text-[var(--via-navy)]"
                      : "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--via-border)] text-xs text-[var(--via-text-muted)]"
                }
              >
                {s.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={
                    s.done
                      ? "block text-[0.9375rem] text-[var(--via-text-muted)] line-through decoration-[var(--via-navy-20)]"
                      : active
                        ? "block text-base font-medium text-[var(--via-text-primary)]"
                        : "block text-[0.9375rem] text-[var(--via-text-muted)]"
                  }
                >
                  {s.label}
                </span>
                {!s.done && (
                  <span className="mt-0.5 block text-sm text-[var(--via-text-muted)]">
                    {s.detail}
                  </span>
                )}
                {active && (
                  <Button
                    size="lg"
                    className="mt-4"
                    onClick={() => {
                      if (!requestConnectData()) void navigate({ to: "/sources" });
                    }}
                  >
                    Conectar minha primeira fonte
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 border-t border-[var(--via-border-soft)] pt-4">
        <Link
          to="/templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--via-text-primary)] hover:underline"
        >
          Antes, veja como fica um painel pronto
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Index() {
  const navigate = useNavigate();
  const revenuePlus = useRevenuePlus();
  const revenuePP = useRevenuePP();
  const { hasData } = useHasData();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Counts>({
    sources: 0,
    dashboards: 0,
    alerts: 0,
    templates: 0,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase.auth.getUser();
      if (cancelled) return;
      if (error || !data.user) {
        void navigate({ to: "/login" });
        return;
      }

      const [sources, dashboards, alerts, templates] = await Promise.all([
        // "id" e não "*": o segredo da fonte saiu do privilégio de leitura do
        // cliente, e contar com "*" virava "permission denied" — o cartão de
        // fontes mostrava zero mesmo com fonte cadastrada.
        supabase.from("data_sources").select("id", { count: "exact", head: true }),
        supabase.from("dashboards").select("*", { count: "exact", head: true }),
        supabase.from("alerts").select("*", { count: "exact", head: true }),
        // A rota semeia o catálogo num remix recém-nascido; a página inicial
        // é a primeira que a pessoa vê, então é aqui que o banco vazio se
        // conserta. Sem a rota, a contagem direta continua valendo.
        (async () => {
          const headers = await authHeaders();
          if (headers) {
            try {
              const resp = await fetch("/api/templates", { headers });
              if (resp.ok) {
                const j = (await resp.json()) as { templates: unknown[] };
                return { count: j.templates.length };
              }
            } catch {
              // cai na contagem direta
            }
          }
          return supabase.from("templates").select("*", { count: "exact", head: true });
        })(),
      ]);

      if (cancelled) return;

      setCounts({
        sources: sources.count ?? 0,
        dashboards: dashboards.count ?? 0,
        alerts: alerts.count ?? 0,
        templates: templates.count ?? 0,
      });
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const rp = revenuePlusCopy(counts);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // Revenue++ sem dado: a home é só o checklist (ver FirstSteps)
  if (revenuePP && hasData === false) {
    return (
      <AppShell>
        <section className="mx-auto mb-12 max-w-2xl pt-2">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)] sm:text-4xl">
              Seus números num painel só.
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Comece pela fonte que você já usa. O painel nasce dela.
            </p>
          </div>
          <FirstSteps hasDashboard={counts.dashboards > 0} />
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Hero — chat de criação com IA (diferencial do produto) */}
      <section className="mx-auto mb-12 max-w-3xl pt-2">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)] sm:text-4xl">
            O que vamos analisar hoje?
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            {revenuePlus
              ? rp.heroLead
              : "Descreva seu negócio. A IA monta um dashboard pronto em segundos."}
          </p>
        </div>
        <HomeHeroChat />
      </section>

      {/* Workspace overview */}
      <section className="mb-10">
        <SectionHeading
          eyebrow="Seu workspace"
          title={revenuePlus ? rp.sectionTitle : "O que você já tem aqui."}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Fontes"
            value={counts.sources}
            icon={Database}
            description={revenuePlus ? rp.sources : "CRMs, planilhas, APIs"}
          />
          <StatCard
            title="Dashboards"
            value={counts.dashboards}
            icon={BarChart3}
            description={revenuePlus ? rp.dashboards : "Criados por você"}
          />
          <StatCard
            title="Templates"
            value={counts.templates}
            icon={Sparkles}
            description={revenuePlus ? rp.templates : "Prontos para usar"}
          />
          <StatCard
            title="Alertas"
            value={counts.alerts}
            icon={Bell}
            description={revenuePlus ? rp.alerts : "Métricas monitoradas"}
          />
        </div>
      </section>

      {/* Atalhos discretos. Revenue+: uma ação só, a que destrava o próximo
          passo ("one single clear action, not eight") */}
      {revenuePlus ? (
        <section className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-muted-foreground">Próximo passo:</span>
          {counts.sources === 0 ? (
            <Link
              to="/sources"
              className="font-medium text-accent transition-colors hover:underline"
            >
              Conectar a primeira fonte
            </Link>
          ) : counts.dashboards === 0 ? (
            <Link
              to="/templates"
              className="font-medium text-accent transition-colors hover:underline"
            >
              Criar o primeiro painel a partir de um template
            </Link>
          ) : (
            <Link
              to="/alerts"
              className="font-medium text-accent transition-colors hover:underline"
            >
              Criar um alerta para a métrica que mais importa
            </Link>
          )}
        </section>
      ) : (
        <section className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-muted-foreground">Atalhos:</span>
          <Link to="/sources" className="font-medium text-accent transition-colors hover:underline">
            Conectar fonte
          </Link>
          <Link
            to="/templates"
            className="font-medium text-accent transition-colors hover:underline"
          >
            Explorar templates
          </Link>
          <Link
            to="/dashboards"
            className="font-medium text-accent transition-colors hover:underline"
          >
            Ver todos os dashboards
          </Link>
        </section>
      )}
    </AppShell>
  );
}
