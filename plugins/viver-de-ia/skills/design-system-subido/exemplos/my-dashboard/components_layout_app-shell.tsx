import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { AppSidebar, SidebarBrand, SidebarNav } from "./app-sidebar";
import { OnboardingGate } from "@/components/onboarding/onboarding-gate";
import { SessionBootstrap } from "@/components/auth/session-bootstrap";
import { DataChat } from "@/components/chat/data-chat";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ds-shell flex min-h-screen bg-background">
      <AppSidebar />
      <main className="min-w-0 flex-1">
        {/* Abaixo de 768px a sidebar some; sem esta barra o app fica sem
            nenhuma forma de navegar ou sair da conta no celular. */}
        <header className="ds-bar sticky top-0 z-30 flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-3 md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Abrir menu de navegação"
              className="rounded-[var(--via-radius-sm)] p-1.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-[17rem] max-w-[85vw] flex-col border-sidebar-border bg-sidebar p-0"
            >
              <SheetTitle className="border-b border-sidebar-border px-6 py-5">
                <SidebarBrand />
              </SheetTitle>
              {/* Fecha ao navegar: drawer aberto por cima da tela nova é o
                  defeito clássico do menu mobile. */}
              <SidebarNav onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <SidebarBrand compact />
        </header>

        {/* overflow-x-hidden: a página nunca rola de lado — tabela e gráfico já
            rolam dentro do próprio contêiner. O overflow-x-auto anterior criava
            uma barra horizontal no conteúdo sempre que um toolbar transbordava. */}
        <div className="mx-auto min-w-0 max-w-6xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
          <SessionBootstrap />
          <OnboardingGate />
          {children}
        </div>
      </main>
      {/* "Fale com seus dados": o chat de IA fica fora dos dashboards, sempre à mão */}
      <DataChat />
    </div>
  );
}
