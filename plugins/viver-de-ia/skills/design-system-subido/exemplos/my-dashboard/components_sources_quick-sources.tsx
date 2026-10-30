import { LayoutGrid, Combine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandTile } from "@/components/sources/brand-icon";
import { cn } from "@/lib/utils";

/**
 * Atalhos para as fontes mais comuns. Uma lista só, dois tamanhos: tiles com
 * descrição no estado vazio; chips compactos abaixo da lista de fontes.
 */
export type QuickSourceId =
  "csv" | "sheets" | "pipedrive" | "supabase" | "postgres" | "sql" | "asaas" | "stripe" | "webhook";

const QUICK: { id: QuickSourceId; label: string; description: string }[] = [
  {
    id: "csv",
    label: "CSV ou Excel",
    description: "Suba um arquivo ou cole o link de uma planilha do Google",
  },
  { id: "sheets", label: "Google Sheets", description: "Uma aba, sincronizada no intervalo" },
  { id: "pipedrive", label: "Pipedrive", description: "Deals por API e webhook" },
  { id: "supabase", label: "Supabase", description: "Tabelas pela API REST" },
  { id: "postgres", label: "Postgres", description: "Conexão direta, só leitura" },
  { id: "sql", label: "Consulta SQL", description: "Cole um SELECT ou suba um .sql" },
  { id: "asaas", label: "Asaas", description: "Cobranças, assinaturas, clientes" },
  { id: "stripe", label: "Stripe", description: "Cobranças e assinaturas" },
  { id: "webhook", label: "Webhook", description: "Receba linhas por HTTP" },
];

interface QuickSourcesProps {
  variant: "empty" | "row";
  onPick: (id: QuickSourceId) => void;
  onAll: () => void;
  canCombine?: boolean;
  onCombine?: () => void;
  /** Revenue++: destaca as fontes do caminho mais curto até o primeiro painel. */
  recommend?: QuickSourceId[];
}

export function QuickSources({
  variant,
  onPick,
  onAll,
  canCombine,
  onCombine,
  recommend = [],
}: QuickSourcesProps) {
  if (variant === "empty") {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...QUICK]
            .sort((a, b) => Number(recommend.includes(b.id)) - Number(recommend.includes(a.id)))
            .map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => onPick(q.id)}
                data-recommended={recommend.includes(q.id) ? "true" : undefined}
                className={cn(
                  "relative flex flex-col items-start gap-4 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-[var(--via-space-5_5)] text-left",
                  "shadow-[0_1px_0_var(--via-edge-hi)_inset,0_10px_24px_-16px_var(--via-shadow-ink-14)]",
                  "transition-[transform,border-color] duration-[var(--via-dur)] hover:-translate-y-0.5 hover:border-[var(--via-navy-20)] focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)]",
                )}
              >
                {recommend.includes(q.id) && (
                  <span className="absolute right-4 top-4 rounded-full bg-[var(--via-navy)] px-2.5 py-1 text-[11px] font-medium text-white">
                    Comece por aqui
                  </span>
                )}
                <BrandTile id={q.id} size={48} />
                <span>
                  <span className="block text-sm font-medium text-[var(--via-text-primary)]">
                    {q.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--via-text-muted)]">
                    {q.description}
                  </span>
                </span>
              </button>
            ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" onClick={onAll}>
            <LayoutGrid className="h-4 w-4" />
            Ver todos os conectores
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t border-[var(--via-border-soft)] pt-6">
      <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
        Adicionar rapidamente
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => onPick(q.id)}
            title={q.description}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-[var(--via-border)] bg-[var(--via-surface)] py-1.5 pl-1.5 pr-3.5 text-sm text-[var(--via-text-primary)]",
              "transition-colors duration-[var(--via-dur)] hover:border-[var(--via-navy-20)] hover:bg-[var(--via-navy-04)] focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)]",
            )}
          >
            <BrandTile id={q.id} size={26} className="rounded-full border-0" />
            {q.label}
          </button>
        ))}
        {canCombine && onCombine && (
          <button
            type="button"
            onClick={onCombine}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--via-border)] bg-[var(--via-surface)] py-1.5 pl-1.5 pr-3.5 text-sm text-[var(--via-text-primary)] transition-colors hover:border-[var(--via-navy-20)] hover:bg-[var(--via-navy-04)]"
          >
            <BrandTile id="combined" size={26} className="rounded-full border-0" />
            Combinar fontes
          </button>
        )}
        <Button variant="ghost" size="sm" onClick={onAll} className="rounded-full">
          <LayoutGrid className="h-4 w-4" />
          Todos os conectores
        </Button>
      </div>
    </div>
  );
}
