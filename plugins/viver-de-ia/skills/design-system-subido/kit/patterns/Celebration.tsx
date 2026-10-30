import { cn } from "@/lib/utils";

/** Check que entra com um "pop" e se desenha (classes ob-* em styles.css). */
export function AnimatedCheck({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("ob-check shrink-0", className)}
      aria-hidden
    >
      <circle cx="12" cy="12" r="12" fill="var(--via-success)" />
      <path
        className="ob-check-path"
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BURST_COLORS = [
  "var(--via-success)",
  "var(--via-navy)",
  "var(--via-blue)",
  "var(--via-accent)",
  "var(--via-coral)",
];

/** Faíscas saindo do centro do elemento pai (que precisa ser relative). */
export function Burst({ count = 12, distance = 64 }: { count?: number; distance?: number }) {
  return (
    <span className="ob-burst pointer-events-none absolute inset-0" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={
            {
              "--a": `${(360 / count) * i}deg`,
              "--d": `-${distance + (i % 3) * 10}px`,
              background: BURST_COLORS[i % BURST_COLORS.length],
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

/**
 * Comemoração de etapa: cobre a área de conteúdo por um instante com o check
 * grande e as faíscas. Quem chama decide quando some (e para onde avança).
 */
export function Celebration({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[var(--via-surface)]/95 text-center backdrop-blur-sm animate-in fade-in duration-200"
    >
      <span className="relative flex h-24 w-24 items-center justify-center">
        <Burst count={14} distance={72} />
        <AnimatedCheck size={72} />
      </span>
      <div className="ob-pop space-y-1" style={{ animationDelay: "220ms" }}>
        <p className="text-xl font-semibold tracking-[-0.01em] text-[var(--via-text-primary)]">
          {title}
        </p>
        {subtitle && <p className="text-sm text-[var(--via-text-muted)]">{subtitle}</p>}
      </div>
    </div>
  );
}
