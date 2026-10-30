import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  AppIntegrationsCard,
  AppIntegrationsPanel,
} from "@/components/connections/app-integrations";
import { useRevenuePP } from "@/lib/ds-variant";
import { isAdmin } from "@/lib/admin/access";
import { supabase } from "@/integrations/supabase/client";

/**
 * Instalação: as credenciais do APLICATIVO — Client ID do Google, chave de API
 * do seletor de planilhas, número do projeto, apps de ERP.
 *
 * Elas moravam em Conexões, embaixo dos cartões em que cada pessoa liga a
 * PRÓPRIA conta. Eram duas coisas de donos diferentes na mesma tela: o usuário
 * comum descia a página procurando "conectar minha conta" e esbarrava em Client
 * ID de ERP, e o administrador não tinha como saber se o que estava cadastrando
 * valia só para ele ou para a instalação inteira. Separar por dono responde a
 * pergunta antes de ela existir — conta pessoal fica em Dados → Fontes,
 * credencial da instalação fica aqui, é igual para todo mundo e se faz uma vez.
 */
export const Route = createFileRoute("/admin/instalacao")({
  component: AdminInstalacaoPage,
  head: () => ({ meta: [{ title: "Instalação — My Dashboard" }] }),
});

function AdminInstalacaoPage() {
  const navigate = useNavigate();
  const revenuePP = useRevenuePP();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!auth.user) {
        void navigate({ to: "/login" });
        return;
      }
      if (!(await isAdmin())) {
        toast.error("Só administradores acessam esta área.");
        void navigate({ to: "/" });
        return;
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Sem esta espera, quem não é administrador via o cabeçalho "Instalação"
  // aparecer por um instante antes de ser mandado embora — parecia que a tela
  // existia para ele e tinha falhado.
  if (!ready) {
    return (
      <AppShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--via-navy)]" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl space-y-[var(--via-space-8)]">
        <SectionHeading
          eyebrow="Administração"
          title="Instalação"
          description="As credenciais desta instalação do My Dashboard: valem para todos os usuários e são cadastradas uma vez, por um administrador. Não são a conta de ninguém — quem quer ligar a própria conta faz isso em Dados → Fontes."
        />

        {/* O cartão traz o próprio rótulo ("Integrações do app") e devolve null
            para quem não é administrador: o servidor responde app:null em
            /api/keys e a seção some inteira. A guarda da rota acima é a primeira
            porta; esta é a segunda, e é a que vale. */}
        {revenuePP ? <AppIntegrationsPanel /> : <AppIntegrationsCard />}
      </div>
    </AppShell>
  );
}
