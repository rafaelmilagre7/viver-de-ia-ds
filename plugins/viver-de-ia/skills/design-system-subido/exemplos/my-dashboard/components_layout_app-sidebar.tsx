import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Database,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  Layers,
  LogOut,
  Settings as SettingsIcon,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ROLE_READY_EVENT } from "@/lib/auth/bootstrap";
import { cn } from "@/lib/utils";
import { SubidoLogo } from "@/components/brand/subido-logo";

/**
 * Navegação agrupada com eyebrow, como na plataforma da Viver de IA: o grupo
 * diz de que assunto é o item antes de o usuário ler o rótulo. Sete itens
 * soltos numa lista única é onde o menu antigo perdia a hierarquia.
 */
const NAV_GROUPS = [
  {
    label: "Painéis",
    items: [
      { to: "/", label: "Início", icon: LayoutDashboard },
      { to: "/dashboards", label: "Dashboards", icon: BarChart3 },
      // Alertas estava em Dados, junto do encanamento. Alerta não é encanamento,
      // é saída: ele observa a métrica de um painel, e é olhando o painel que a
      // pessoa pensa "quero ser avisado quando isto cair".
      { to: "/alerts", label: "Alertas", icon: Bell },
      { to: "/templates", label: "Templates", icon: Sparkles },
    ],
  },
  {
    // "Conexões" saiu daqui. Fonte e conexão eram a mesma coisa na cabeça de
    // quem usa ("meus dados do Pipedrive") e duas telas no app, porque é assim
    // que o código modela — conta de um lado, conjunto de dados do outro. O
    // resultado era vaivém: conectava o Google em Conexões e ainda precisava vir
    // a Fontes buscar o dado. As contas agora vivem no fim de Fontes.
    label: "Dados",
    items: [
      { to: "/sources", label: "Fontes", icon: Database },
      { to: "/models", label: "Modelos", icon: Layers },
      { to: "/sql", label: "Consulta SQL", icon: Terminal },
    ],
  },
  {
    label: "Conta",
    items: [
      { to: "/settings", label: "Configurações", icon: SettingsIcon },
      { to: "/help", label: "Ajuda", icon: HelpCircle },
    ],
  },
] as const;

// Só aparece para administradores — a RLS já barra o resto, isto é só para
// não mostrar uma porta que não abre.
const ADMIN_GROUP = {
  label: "Administração",
  items: [
    { to: "/admin/usuarios", label: "Usuários", icon: Users },
    // KeyRound, e não ServerCog: o que se cadastra ali é chave — Client ID,
    // Client Secret, chave de API. ServerCog prometeria configuração de
    // servidor, que não é o que a tela faz, e ainda brigaria com a engrenagem
    // de Configurações logo acima.
    { to: "/admin/instalacao", label: "Instalação", icon: KeyRound },
  ],
} as const;

/** Marca da aplicação — caps com o tracking de marca do DS. */
export function SidebarBrand({ compact = false }: { compact?: boolean }) {
  // Logo SUBIDO AI; passar o mouse dispara o "momento" dela (barras atualizam).
  // O nome do produto fica embaixo, pequeno: a marca é a SUBIDO AI, o app é o My Dashboard.
  // Variação "Flat" (data-ds="flat") mostra a marca de antes do commit da
  // SUBIDO AI; todas as outras mostram a logo. As duas ficam no DOM e o CSS
  // (.ds-brand-flat / .ds-brand-subido em styles.css) escolhe.
  return (
    <>
      <span className="ds-brand ds-brand-subido flex flex-col items-start gap-1.5 text-sidebar-foreground">
        <SubidoLogo height={compact ? 18 : 24} animate="hover" />
        {!compact && (
          <span
            className="text-[0.6875rem] font-medium uppercase text-[var(--via-text-muted)]"
            style={{ letterSpacing: "var(--via-ls-mark)" }}
          >
            My Dashboard
          </span>
        )}
      </span>
      <span
        className={cn(
          "ds-brand ds-brand-flat flex items-center gap-2.5 font-medium uppercase text-sidebar-foreground",
          compact ? "text-xs" : "text-[0.8125rem]",
        )}
        style={{ letterSpacing: "var(--via-ls-mark)" }}
      >
        <BarChart3 className="h-5 w-5 shrink-0" strokeWidth={2} />
        My Dashboard
      </span>
    </>
  );
}

/**
 * Conteúdo da navegação, sem a moldura. A sidebar fixa (desktop) e o drawer
 * (mobile) renderizam o MESMO componente — antes o menu só existia dentro do
 * `<aside className="hidden md:flex">` e o celular ficava sem navegação
 * nenhuma: nem Dashboards, nem Configurações, nem Sair.
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [email, setEmail] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setEmail(data.user?.email ?? null);
    });
    void supabase.rpc("is_admin").then(({ data }) => {
      if (!cancelled) setAdmin(data === true);
    });
    // No primeiro acesso o papel nasce durante a montagem (bootstrap_self):
    // sem isto o dono recém-criado não via o menu de Administração até recarregar.
    const onRole = (e: Event) => setAdmin((e as CustomEvent<string>).detail === "admin");
    window.addEventListener(ROLE_READY_EVENT, onRole);
    return () => {
      cancelled = true;
      window.removeEventListener(ROLE_READY_EVENT, onRole);
    };
  }, []);

  const groups = admin ? [...NAV_GROUPS, ADMIN_GROUP] : [...NAV_GROUPS];

  async function handleSignOut() {
    onNavigate?.();
    await supabase.auth.signOut();
    void navigate({ to: "/login" });
  }

  return (
    <>
      <nav className="ds-nav flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {groups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p
              className="ds-nav-eyebrow px-3 pb-1.5 text-[0.6875rem] font-medium uppercase text-sidebar-eyebrow"
              style={{ letterSpacing: "var(--via-ls-label)" }}
            >
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive =
                item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  data-active={isActive ? "true" : undefined}
                  className={cn(
                    "ds-nav-link flex items-center gap-3 rounded-[var(--via-radius-md)] px-3 py-2.5 text-sm font-medium",
                    "transition-all duration-[var(--via-dur)] ease-[var(--via-ease-snap)]",
                    isActive
                      ? // Pílula navy: é o item ativo que carrega a marca, e o
                        // texto sobre ela vem do passo claro da escada do DS.
                        "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_6px_16px_-10px_var(--via-shadow-ink-20)]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  {/* Ícone um passo mais quieto que o rótulo — só no ativo ele
                      sobe para a mesma cor do texto. */}
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive ? "text-current" : "text-sidebar-icon",
                    )}
                    strokeWidth={2}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="ds-nav-foot space-y-1 border-t border-sidebar-border p-3">
        {email && <p className="truncate px-3 py-1 text-xs text-sidebar-meta">{email}</p>}
        <button
          type="button"
          onClick={() => void handleSignOut()}
          className="ds-nav-link flex w-full items-center gap-3 rounded-[var(--via-radius-md)] px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-[var(--via-dur)] ease-[var(--via-ease-snap)] hover:bg-sidebar-accent"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0 text-sidebar-icon" strokeWidth={2} />
          Sair
        </button>
      </div>
    </>
  );
}

export function AppSidebar() {
  return (
    <aside className="ds-sidebar sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="px-6 py-5">
        <SidebarBrand />
      </div>
      <SidebarNav />
    </aside>
  );
}
