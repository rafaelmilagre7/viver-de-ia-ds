import { useEffect, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Recomendacao } from "@/components/settings/IntegrationHeader";
import { LinkGuia } from "@/components/ajuda/LinkGuia";
import { BrandTile } from "@/components/brand/brand-icon";

/** Estado de status exibido no header — sempre o real, nunca otimista. */
export type StatusIntegracao = "ok" | "pendente" | "ausente";

const RECOMENDACAO_LABEL: Record<Recomendacao, string> = {
  essencial: "Essencial",
  recomendado: "Recomendado",
  opcional: "Opcional",
};

/**
 * Card colapsável de Configurações > Integrações.
 *
 * A aba era uma pilha de formulários abertos: para saber o que estava ligado o
 * usuário rolava tudo. Fechado, cada integração ocupa uma linha escaneável
 * (ícone + nome + propósito + relevância + status); expandida, mostra a
 * configuração completa. `abrirPorPadrao` existe só para navegação direcionada
 * (link com ?integration=...).
 */
export function IntegrationCard({
  icon: Icon,
  marcas,
  title,
  purpose,
  recomendacao,
  status,
  statusLabel,
  headerAction,
  guia,
  abrirPorPadrao = false,
  testId,
  children,
}: {
  icon: LucideIcon;
  /** Logos oficiais dos provedores (ids do brand-icon). Regra do DS: com
   *  provedor conhecido, aparece o logo; o ícone fica só para o genérico. */
  marcas?: string[];
  title: string;
  purpose: string;
  recomendacao: Recomendacao;
  status: StatusIntegracao;
  statusLabel: string;
  /** Controle que precisa ficar acessível com o card fechado (ex.: switch do ERP). */
  headerAction?: ReactNode;
  /** Id do guia da Central de ajuda: mostra "Como configurar" no cabeçalho. */
  guia?: string;
  abrirPorPadrao?: boolean;
  testId?: string;
  children: ReactNode;
}) {
  const [aberto, setAberto] = useState(abrirPorPadrao);

  // Navegação direcionada pode chegar depois da primeira renderização (o param
  // é lido no pai) — então o card acompanha quando ela aponta para ele.
  useEffect(() => {
    if (abrirPorPadrao) setAberto(true);
  }, [abrirPorPadrao]);

  return (
    <Collapsible open={aberto} onOpenChange={setAberto} className="via-card p-0" data-testid={testId}>
      <div className="flex items-start gap-3 p-4">
        <CollapsibleTrigger
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
          data-testid={testId ? `${testId}-toggle` : undefined}
        >
          {marcas?.length ? (
            <span className="flex shrink-0 -space-x-2">
              {marcas.map((m) => (
                <BrandTile
                  key={m}
                  id={m}
                  size={36}
                  className="bg-white ring-2 ring-[var(--via-surface)]"
                />
              ))}
            </span>
          ) : (
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)]"
              style={{ background: "var(--via-navy-04)" }}
            >
              <Icon
                className="h-[18px] w-[18px]"
                strokeWidth={1.5}
                aria-hidden
                style={{ color: "var(--via-text-primary)" }}
              />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span
              className="block truncate text-sm font-medium"
              style={{ color: "var(--via-text-primary)" }}
            >
              {title}
            </span>
            <span className="block truncate text-xs" style={{ color: "var(--via-text-muted)" }}>
              {purpose}
            </span>
            {/* DS SUBIDO: selos embaixo do nome, e não na mesma linha — em
                duas colunas eles comiam a largura e o nome sumia. */}
            <span className="mt-2 flex flex-wrap items-center gap-1.5">
              <Badge variant={recomendacao === "essencial" ? "default" : "secondary"}>
                {RECOMENDACAO_LABEL[recomendacao]}
              </Badge>
              <StatusBadge status={status} label={statusLabel} />
            </span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform ${aberto ? "rotate-180" : ""}`}
            strokeWidth={1.5}
            aria-hidden
          />
        </CollapsibleTrigger>
        {headerAction}
      </div>
      {guia && (
        <div className="-mt-2 px-4 pb-3 pl-[4.25rem]">
          <LinkGuia guia={guia} />
        </div>
      )}
      <CollapsibleContent>
        <div className="border-t px-4 py-4" style={{ borderColor: "var(--via-border)" }}>
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function StatusBadge({ status, label }: { status: StatusIntegracao; label: string }) {
  if (status === "ok") {
    return (
      <Badge className="gap-1 bg-success text-success-foreground">
        <CheckCircle2 className="h-3 w-3" strokeWidth={2} aria-hidden /> {label}
      </Badge>
    );
  }
  if (status === "pendente") {
    return (
      <Badge className="gap-1 bg-warning text-warning-foreground" data-testid="status-pendente">
        {label}
      </Badge>
    );
  }
  return <Badge variant="secondary">{label}</Badge>;
}
