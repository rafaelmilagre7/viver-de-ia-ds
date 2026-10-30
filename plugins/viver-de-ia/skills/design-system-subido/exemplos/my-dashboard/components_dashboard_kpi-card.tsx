import { useState, useRef } from "react";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { TargetPopover } from "@/components/dashboard/target-popover";
import { formatCompact, formatNumber } from "@/lib/dashboards/format";
import { useRevenuePlus } from "@/lib/ds-variant";
import type { DashboardComponent, KpiCardConfig, ComponentConfig } from "@/types/dashboard";

interface KpiCardProps {
  component: DashboardComponent;
  onConfigChange?: (componentId: string, config: ComponentConfig) => void;
}

function calculateVariation(value: number, previousValue: number): number {
  if (previousValue === 0) return value > 0 ? 100 : 0;
  return ((value - previousValue) / Math.abs(previousValue)) * 100;
}

/**
 * Stat tile: rótulo em sentence case, valor grande com algarismos
 * proporcionais (tabular deixa "121" frouxo em tamanho de display), variação
 * assinada contra um período nomeado — só quando existe comparação de verdade.
 */
export function KpiCard({ component, onConfigChange }: KpiCardProps) {
  const config = component.config as KpiCardConfig;
  const mockData = component.mockData as KpiCardConfig;

  // Quando há dado ligado (mockData tem value), ele é a autoridade: sem
  // previousValue ali, não existe comparação — nunca cair no valor do config.
  const bound = mockData.value !== undefined;
  const rawValue = bound ? mockData.value : config.value;
  // Null = sem valor (razão sem denominador: nenhuma conversão, nenhum
  // negócio fechado). Mostra um traço, sem variação nem meta.
  const hasValue = typeof rawValue === "number" && Number.isFinite(rawValue);
  const value = hasValue ? rawValue : 0;
  const previousValue = bound ? mockData.previousValue : config.previousValue;
  const format = config.format ?? "number";

  const hasComparison = hasValue && previousValue !== undefined;
  // "currency" já imprime R$; um prefix "R$" vindo da IA virava "R$ R$ 14 mil".
  const prefix = config.prefix && format !== "currency" ? `${config.prefix} ` : "";
  // Revenue+: "round everything" — 10.234 vira "10,2 mil"; abaixo de 10 mil o
  // número já é legível e fica exato.
  const revenuePlus = useRevenuePlus();
  const formatted =
    revenuePlus && format !== "percent" && Math.abs(value) >= 10_000
      ? formatCompact(value, format)
      : formatNumber(value, format);
  const displayValue = hasValue ? `${prefix}${formatted}` : "—";
  const variation =
    hasComparison && previousValue !== undefined ? calculateVariation(value, previousValue) : 0;
  const isPositive = variation > 0;
  const isNegative = variation < 0;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleSaveTarget(target: number, display: "linear" | "circular") {
    if (!onConfigChange) return;
    onConfigChange(component.id, { ...config, target, targetDisplay: display });
  }

  function handleRemoveTarget() {
    if (!onConfigChange) return;
    const updatedConfig: KpiCardConfig = {
      value: config.value,
      previousValue: config.previousValue,
      format: config.format,
      ...(config.prefix !== undefined && { prefix: config.prefix }),
    };
    onConfigChange(component.id, updatedConfig);
  }

  return (
    <div ref={cardRef} className="group relative h-full @container">
      <div className="ds-metric flex h-full min-h-[9rem] min-w-0 flex-col overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] px-[var(--via-space-6)] py-[var(--via-space-5_5)] shadow-[0_1px_0_var(--via-edge-hi)_inset,0_10px_24px_-16px_var(--via-shadow-ink-14)] transition-[transform,box-shadow] duration-[var(--via-dur)] ease-[var(--via-ease-snap)]">
        <div className="flex items-start justify-between gap-3">
          <p className="ds-metric-label line-clamp-2 min-w-0 text-[0.8125rem] leading-snug text-[var(--via-text-muted)]">
            {component.title}
          </p>
          {onConfigChange && (
            <button
              type="button"
              onClick={() => setPopoverOpen((prev) => !prev)}
              className="-mr-1.5 -mt-1.5 rounded-[var(--via-radius-xs)] p-1.5 text-[var(--via-text-soft)] opacity-0 transition-all duration-[var(--via-dur)] hover:bg-[var(--via-navy-06)] hover:text-[var(--via-text-primary)] focus-visible:opacity-100 group-hover:opacity-100"
              aria-label="Configurar meta"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* O número é o herói do card e nunca quebra linha. A fonte escala
            com a largura do próprio card (cqi), entre 1.25rem e 2rem (h2 do
            DS); só reticencia se nem o mínimo couber. */}
        <p
          className="ds-metric-value mt-3 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1.25rem,11cqi,2rem)] font-medium leading-none tracking-[-0.02em] text-[var(--via-text-primary)]"
          title={displayValue}
        >
          {displayValue}
        </p>

        {hasComparison && (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[0.6875rem] font-medium tabular-nums",
                // Sem semáforo: alta é navy (a marca), queda é coral (o único
                // uso permitido de cor quente), estável é o cinza da escada.
                isPositive && "bg-[var(--via-navy-06)] text-[var(--via-navy)]",
                isNegative && "bg-[var(--via-coral)]/10 text-[var(--via-coral-dark)]",
                !isPositive &&
                  !isNegative &&
                  "bg-[var(--via-gray-100)] text-[var(--via-text-muted)]",
              )}
            >
              {isPositive ? "↑" : isNegative ? "↓" : "→"}
              {Math.abs(variation).toFixed(1).replace(".", ",")}%
            </span>
            <span className="whitespace-nowrap text-xs text-[var(--via-text-soft)]">
              vs período anterior
            </span>
          </div>
        )}

        {hasValue && config.target !== undefined && (
          <div className="mt-auto pt-4">
            <ProgressBar
              current={value}
              target={config.target}
              format={format}
              display={config.targetDisplay ?? "linear"}
            />
          </div>
        )}
      </div>

      <TargetPopover
        config={config}
        open={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        onSave={handleSaveTarget}
        onRemove={handleRemoveTarget}
        anchorRef={cardRef}
      />
    </div>
  );
}
