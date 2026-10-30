import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  /** Grupo da tela em caps — o MESMO rótulo do grupo na sidebar (Painéis, Dados, CRM, Conta…). */
  eyebrow: string;
  title: ReactNode;
  /** Uma linha dizendo para que serve a tela (o resultado, não a função). */
  description?: ReactNode;
  /** A ação dominante da tela (1 botão primário) e, no máximo, secundárias em texto. */
  actions?: ReactNode;
  className?: string;
}

/**
 * Cabeçalho de tela do DS SUBIDO — o topo de toda tela interna.
 *
 *   EYEBROW            11px · 500 · caps · tracking 0.08em · --via-text-muted
 *   Título             30px (text-3xl) · 500 · -0.025em · --via-text-primary
 *   Descrição          14px · --via-text-muted · 1 linha
 *
 * Sem ícone ao lado do título (o ícone já está na sidebar). A hierarquia vem
 * do par rótulo pequeno + título grande, nunca de negrito.
 */
export function PageTitle({ eyebrow, title, description, actions, className }: PageTitleProps) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[var(--via-text-muted)]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
