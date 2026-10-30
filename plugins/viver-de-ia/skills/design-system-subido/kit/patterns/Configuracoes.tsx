import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ==============================================================
   Configurações / áreas com várias seções (DS SUBIDO)
     · nav lateral de 15rem: ícone + rótulo + uma linha de apoio por seção;
       a linha de apoio vira o AVISO do que falta ("Falta a chave de IA"),
       em navy — nunca um ponto solto sem explicação;
     · conteúdo à direita: cabeçalho da seção (h2 20px) + cards;
     · ações de conta em linhas (ActionRow), destrutivas numa "Zona de perigo"
       separada, com consequência escrita ("Não dá para desfazer").
   ============================================================== */

type Icone = ComponentType<{ className?: string }>;

export interface Secao<T extends string> {
  id: T;
  label: string;
  hint: string;
  icon: Icone;
  /** Texto do que falta, mostrado no lugar do hint, em navy. */
  pendencia?: string;
}

export function SettingsLayout<T extends string>({
  secoes,
  ativa,
  onTrocar,
  children,
}: {
  secoes: Secao<T>[];
  ativa: T;
  onTrocar: (id: T) => void;
  children: ReactNode;
}) {
  const atual = secoes.find((s) => s.id === ativa) ?? secoes[0];
  return (
    <div className="grid gap-8 md:grid-cols-[15rem_minmax(0,1fr)]">
      <nav aria-label="Seções" className="flex gap-1 overflow-x-auto md:flex-col">
        {secoes.map((n) => {
          const on = n.id === ativa;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onTrocar(n.id)}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-[var(--via-radius-md)] px-3 py-2.5 text-left transition-colors",
                on ? "bg-[var(--via-navy-06)]" : "hover:bg-[var(--via-navy-03)]",
              )}
            >
              <n.icon className={cn("h-4 w-4 shrink-0", on ? "text-[var(--via-text-primary)]" : "text-[var(--via-text-muted)]")} />
              <span className="min-w-0">
                <span className={cn("block text-sm", on ? "font-medium text-[var(--via-text-primary)]" : "text-[var(--via-text-body)]")}>
                  {n.label}
                </span>
                {n.pendencia ? (
                  <span className="hidden text-xs font-medium text-[var(--via-navy)] md:block">{n.pendencia}</span>
                ) : (
                  <span className="hidden text-xs text-[var(--via-text-muted)] md:block">{n.hint}</span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
      <section className="min-w-0">
        <h2 className="text-xl font-medium tracking-[-0.015em] text-[var(--via-text-primary)]">{atual.label}</h2>
        <p className="mb-5 mt-0.5 text-sm text-[var(--via-text-muted)]">{atual.hint}</p>
        <div className="space-y-4">{children}</div>
      </section>
    </div>
  );
}

/** Card de seção: título 16px/500 + texto de apoio + conteúdo. */
export function SettingsCard({ titulo, apoio, children }: { titulo: string; apoio?: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)]">
      <header className="border-b border-[var(--via-border-soft)] p-5">
        <h3 className="text-base font-medium text-[var(--via-text-primary)]">{titulo}</h3>
        {apoio && <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">{apoio}</p>}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

/** Linha de ação de conta (Senha, Sessão, Configuração inicial…). Use dentro de <ul className="divide-y">. */
export function ActionRow({ icon: Icon, titulo, texto, acao }: { icon: Icone; titulo: string; texto: string; acao: ReactNode }) {
  return (
    <li className="flex flex-wrap items-center gap-4 px-5 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] bg-[var(--via-navy-06)] text-[var(--via-text-primary)]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--via-text-primary)]">{titulo}</p>
        <p className="text-sm text-[var(--via-text-muted)]">{texto}</p>
      </div>
      {acao}
    </li>
  );
}

/** Zona de perigo: separada, borda coral suave, consequência escrita, botão destrutivo em outline. */
export function DangerZone({ titulo, texto, acao }: { titulo: string; texto: string; acao: ReactNode }) {
  return (
    <section className="rounded-[var(--via-radius-lg)] border border-[var(--via-coral)]/25 bg-[var(--via-surface)] p-5">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-coral-dark)]">Zona de perigo</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--via-text-primary)]">{titulo}</p>
          <p className="text-sm text-[var(--via-text-muted)]">{texto}</p>
        </div>
        {acao}
      </div>
    </section>
  );
}
