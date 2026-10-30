import { useState, type ComponentType, type ReactNode } from "react";
import { LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubidoLogo } from "@/components/brand/subido-logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/**
 * Moldura do app no DS SUBIDO (igual ao My Dashboard):
 *   · sidebar BRANCA de 264px, grupos com eyebrow em caps, item ativo em pílula navy;
 *   · conteúdo em canvas cinza-claro (--via-gray-50), max-w-6xl (1152px),
 *     respiro de 40px no desktop (px-10 py-10), 24/16px abaixo;
 *   · SEM barra de topo no desktop — o cabeçalho da página (PageTitle) é o topo.
 *     No celular (< 768px) a sidebar vira drawer e aparece uma barra fina.
 *
 * Independe de roteador: passe o componente de link (`Link` do react-router,
 * do TanStack, do Next) em `linkAs` e o caminho atual em `currentPath`.
 */

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}
export interface NavGroup {
  /** Eyebrow do grupo (Painéis, Dados, CRM, Atendimento, Conta, Administração…). */
  label: string;
  items: NavItem[];
}

type LinkLike = ComponentType<{
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  "data-active"?: string;
}>;

export interface AppShellProps {
  /** Nome do produto em caps embaixo do logo (ex.: "My Dashboard", "Flow CRM"). */
  produto: string;
  groups: NavGroup[];
  currentPath: string;
  linkAs: LinkLike;
  /** E-mail no rodapé da sidebar. */
  email?: string | null;
  onSignOut?: () => void;
  /** Banner de configuração / avisos globais, acima do conteúdo. */
  banner?: ReactNode;
  /** Elementos flutuantes (chat de IA etc.). */
  flutuante?: ReactNode;
  children: ReactNode;
}

export function SidebarBrand({ produto, compact = false }: { produto: string; compact?: boolean }) {
  // Logo SUBIDO AI; passar o mouse dispara o "momento" dela (barras atualizam).
  // A marca é a SUBIDO AI; o nome do produto fica embaixo, pequeno, em caps.
  return (
    <span className="ds-brand flex flex-col items-start gap-1.5 text-sidebar-foreground">
      <SubidoLogo height={compact ? 18 : 24} animate="hover" title="subido AI" />
      {!compact && (
        <span
          className="text-[0.6875rem] font-medium uppercase text-[var(--via-text-muted)]"
          style={{ letterSpacing: "var(--via-ls-mark)" }}
        >
          {produto}
        </span>
      )}
    </span>
  );
}

function SidebarNav({
  groups,
  currentPath,
  linkAs: L,
  email,
  onSignOut,
  onNavigate,
}: Pick<AppShellProps, "groups" | "currentPath" | "linkAs" | "email" | "onSignOut"> & {
  onNavigate?: () => void;
}) {
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
              const isActive = item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);
              return (
                <L
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  data-active={isActive ? "true" : undefined}
                  className={cn(
                    "ds-nav-link flex items-center gap-3 rounded-[var(--via-radius-md)] px-3 py-2.5 text-sm font-medium",
                    "transition-all duration-[var(--via-dur)] ease-[var(--via-ease-snap)]",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_6px_16px_-10px_var(--via-shadow-ink-20)]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  {/* ícone um passo mais quieto que o rótulo; no ativo, sobe junto */}
                  <item.icon
                    className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-current" : "text-sidebar-icon")}
                    strokeWidth={2}
                  />
                  <span>{item.label}</span>
                </L>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="ds-nav-foot space-y-1 border-t border-sidebar-border p-3">
        {email && <p className="truncate px-3 py-1 text-xs text-sidebar-meta">{email}</p>}
        {onSignOut && (
          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              onSignOut();
            }}
            className="ds-nav-link flex w-full items-center gap-3 rounded-[var(--via-radius-md)] px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-[var(--via-dur)] ease-[var(--via-ease-snap)] hover:bg-sidebar-accent"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0 text-sidebar-icon" strokeWidth={2} />
            Sair
          </button>
        )}
      </div>
    </>
  );
}

export function AppShell(props: AppShellProps) {
  const { produto, banner, flutuante, children } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ds-shell flex min-h-screen bg-background">
      <aside className="ds-sidebar sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="px-6 py-5">
          <SidebarBrand produto={produto} />
        </div>
        <SidebarNav {...props} />
      </aside>

      <main className="min-w-0 flex-1">
        {/* Só no celular: sem esta barra o app fica sem navegação nem "Sair". */}
        <header className="ds-bar sticky top-0 z-30 flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-3 md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Abrir menu de navegação"
              className="rounded-[var(--via-radius-sm)] p-1.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[17rem] max-w-[85vw] flex-col border-sidebar-border bg-sidebar p-0">
              <SheetTitle className="border-b border-sidebar-border px-6 py-5">
                <SidebarBrand produto={produto} />
              </SheetTitle>
              <SidebarNav {...props} onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <SidebarBrand produto={produto} compact />
        </header>

        {/* overflow-x-hidden: a página nunca rola de lado — tabela e gráfico rolam dentro do próprio contêiner */}
        <div className="mx-auto min-w-0 max-w-6xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
          {banner}
          {children}
        </div>
      </main>
      {flutuante}
    </div>
  );
}
