import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Database } from "lucide-react";
import { requestConnectData } from "@/components/onboarding/onboarding-events";
import { NO_DATA_MESSAGE } from "@/lib/data-readiness";
import { cn } from "@/lib/utils";

/**
 * Aviso discreto de "sem dados" com o atalho para conectar. Aparece onde a
 * pessoa tentaria criar um dashboard (ou perguntar aos dados) sem ter fonte.
 * O atalho abre o onboarding já na escolha das fontes; sem onboarding na tela,
 * vai para Fontes.
 */
export function NoDataNotice({
  className,
  compact = false,
  onConnect,
  onAction,
  detail = "Os dashboards nascem das suas fontes: planilha, CRM, ERP ou uma solução da Viver de IA.",
}: {
  className?: string;
  compact?: boolean;
  /** Segunda linha do aviso (some no modo compacto). */
  detail?: string;
  /** Substitui o atalho padrão (ex.: dentro do próprio onboarding, ir ao passo das fontes). */
  onAction?: () => void;
  /** Chamado antes de abrir o fluxo de conexão (ex.: fechar o modal de quem chamou). */
  onConnect?: () => void;
}) {
  const navigate = useNavigate();

  function connect() {
    if (onAction) {
      onAction();
      return;
    }
    onConnect?.();
    if (!requestConnectData()) void navigate({ to: "/sources" });
  }

  return (
    <div
      role="status"
      className={cn(
        "ds-next-step flex items-center gap-3 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-navy-03)] text-left animate-in fade-in slide-in-from-bottom-1 duration-300",
        compact ? "px-3 py-2.5" : "px-4 py-3.5",
        className,
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-[var(--via-navy-08)] text-[var(--via-navy)]",
          compact ? "h-8 w-8" : "h-10 w-10",
        )}
      >
        <Database className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-[var(--via-text-primary)]">
          {NO_DATA_MESSAGE}
        </span>
        {!compact && <span className="block text-xs text-[var(--via-text-muted)]">{detail}</span>}
      </span>
      <button
        type="button"
        onClick={connect}
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--via-navy)] px-3.5 py-1.5 text-xs font-medium text-white transition-transform duration-[var(--via-dur)] hover:-translate-y-px focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)]"
      >
        Vamos conectar agora?
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
