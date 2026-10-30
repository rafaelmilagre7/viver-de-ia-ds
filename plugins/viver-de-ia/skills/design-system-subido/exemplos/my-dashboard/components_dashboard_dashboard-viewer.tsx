import { useMemo } from "react";
import { useRevenuePP } from "@/lib/ds-variant";
import { COMPONENT_REGISTRY } from "@/components/dashboard/component-registry";
import { GRID_CLASSES, GRID_CONTAINER_CLASSES, layoutFor } from "@/lib/dashboards/layout";
import type { DashboardConfig, DashboardComponent } from "@/types/dashboard";

interface DashboardViewerProps {
  config: DashboardConfig;
  /** Painel sem vínculo com fonte: os números são de exemplo. */
  sample?: boolean;
}

function ComponentRenderer({ component }: { component: DashboardComponent }) {
  const Component = COMPONENT_REGISTRY[component.type];

  if (!Component) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-surface">
        <p className="text-sm text-text-muted">Componente não suportado: {component.type}</p>
      </div>
    );
  }

  return <Component component={component} />;
}

export function DashboardViewer({ config, sample = false }: DashboardViewerProps) {
  const layout = useMemo(() => layoutFor(config.components), [config.components]);
  // Revenue++: número de exemplo apresentado como se fosse real quebra a
  // confiança ("your promise is the size of your proof"). O aviso existia só
  // no editor; quem só VÊ o painel (e a TV na parede) não sabia.
  const revenuePP = useRevenuePP();
  const sortedComponents = layout.components;

  return (
    <div className="space-y-6">
      {config.title && (
        <h1 className="text-2xl font-medium tracking-[-0.015em] text-[var(--via-text-primary)]">
          {config.title}
        </h1>
      )}
      {revenuePP && sample && (
        <p className="ds-sample-flag inline-flex items-center gap-2 rounded-full border border-[var(--via-border)] bg-[var(--via-navy-04)] px-3 py-1.5 text-[0.8125rem] text-[var(--via-text-primary)]">
          <span className="font-medium">Dados de exemplo</span>
          <span className="text-[var(--via-text-muted)]">
            · estes números não são da sua empresa. Conecte uma fonte para ver os seus.
          </span>
        </p>
      )}
      <div className={GRID_CONTAINER_CLASSES}>
        <div className={GRID_CLASSES}>
          {sortedComponents.map((component) => (
            <div
              key={component.id}
              id={`comp-${component.id}`}
              className={layout.classFor(component.id)}
            >
              <ComponentRenderer component={component} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
