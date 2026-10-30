import { cn } from "@/lib/utils";

/**
 * KPI do DS SUBIDO (stat tile).
 *
 *   rótulo     13px · --via-text-muted · sentence case (não caps)
 *   valor      escala com a largura do card (cqi); destaque até 44px
 *   variação   pílula: alta navy, queda coral, estável cinza — NUNCA semáforo verde/vermelho
 *              e sempre contra um período NOMEADO ("vs. 30 dias anteriores")
 *
 * Padrão F: o PRIMEIRO KPI (topo-esquerda) é o "North Star" da tela — o número
 * que o dono do negócio olharia primeiro (receita, em geral). Ele leva o maior
 * valor e borda navy-20; os demais ficam um passo abaixo, em cinza.
 *
 * Sem ícone decorativo no card: não diz nada que o rótulo já não diga.
 * Valor ≥ 10 mil vai compacto ("R$ 482,6 mil"). Sem valor → "—", nunca "0".
 * Sem nenhum dado na tela → não renderize a fileira de KPIs (FirstSteps no lugar).
 */
export function Kpi({
  label,
  value,
  variacao,
  periodo = "vs. período anterior",
  detalhe,
  destaque = false,
}: {
  label: string;
  value: string;
  /** Percentual assinado (ex.: 18.4, -3.2). Omitir quando não há comparação real. */
  variacao?: number;
  periodo?: string;
  detalhe?: string;
  destaque?: boolean;
}) {
  const pos = (variacao ?? 0) > 0;
  const neg = (variacao ?? 0) < 0;
  return (
    <div className="@container h-full">
      <div
        className={cn(
          "ds-metric flex h-full min-h-[8.5rem] flex-col rounded-[var(--via-radius-lg)] border bg-[var(--via-surface)] px-6 py-5",
          destaque ? "border-[var(--via-navy-20)]" : "border-[var(--via-border-soft)]",
        )}
      >
        <p className="ds-metric-label text-[0.8125rem] leading-snug text-[var(--via-text-muted)]">{label}</p>
        <p
          className={cn(
            "ds-metric-value mt-3 truncate leading-none tabular-nums",
            destaque
              ? "text-[clamp(1.5rem,14cqi,2.75rem)] font-semibold tracking-[-0.035em] text-[var(--via-text-primary)]"
              : "text-[clamp(1.25rem,11cqi,1.5rem)] font-medium tracking-[-0.02em] text-[var(--via-text-muted)]",
          )}
          title={value}
        >
          {value}
        </p>
        {variacao !== undefined && (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[0.6875rem] font-medium tabular-nums",
                pos && "bg-[var(--via-navy-06)] text-[var(--via-navy)]",
                neg && "bg-[var(--via-coral)]/10 text-[var(--via-coral-dark)]",
                !pos && !neg && "bg-[var(--via-gray-100)] text-[var(--via-text-muted)]",
              )}
            >
              {pos ? "↑" : neg ? "↓" : "→"}
              {Math.abs(variacao).toFixed(1).replace(".", ",")}%
            </span>
            <span className="whitespace-nowrap text-[0.8125rem] text-[var(--via-text-soft)]">{periodo}</span>
          </div>
        )}
        {detalhe && <p className="mt-auto pt-2 text-[0.8125rem] text-[var(--via-text-muted)]">{detalhe}</p>}
      </div>
    </div>
  );
}

/** Fileira de KPIs: 4 por linha no desktop, 2 no tablet, 1 no celular. */
export function KpiRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}

/** "R$ 482,6 mil" a partir de 10 mil; exato abaixo disso. */
export function formatarCompacto(valor: number, moeda = true): string {
  const abs = Math.abs(valor);
  const fmt = (n: number, suf: string) =>
    `${moeda ? "R$ " : ""}${n.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${suf}`;
  if (abs >= 1e9) return fmt(valor / 1e9, "bi");
  if (abs >= 1e6) return fmt(valor / 1e6, "mi");
  if (abs >= 1e4) return fmt(valor / 1e3, "mil");
  return moeda
    ? valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : valor.toLocaleString("pt-BR");
}
