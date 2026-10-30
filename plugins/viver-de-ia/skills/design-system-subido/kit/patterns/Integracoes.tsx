import { useState, type ReactNode } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandIcon, BrandTile } from "@/components/brand/brand-icon";

/* ==============================================================
   Provedores e ferramentas · REGRA DO DS: quando é marca (WhatsApp,
   Google, OpenAI, Bling, Pipedrive…), aparece o LOGO OFICIAL. Ícone
   genérico só para o que não é marca (Webhook, CSV, SQL).
     · tile quadrado (BrandTile) para ícone de app/símbolo;
     · espaço LARGO (ProviderLogo) quando a marca só existe por extenso
       (Bling, Conta Azul) — num quadrado de 44px ficaria ilegível.
   Logos em public/brand/marcas (ícone de app) e public/brand/integracoes
   (logotipo por extenso). Para marca nova: baixar do site oficial da marca,
   conferir o SVG (sem <script>, sem href externo) e registrar no brand-icon.
   ============================================================== */

/** Logotipo por extenso num espaço largo de fundo branco (nos dois temas). */
export function ProviderLogo({
  marca,
  logo,
  compact,
}: {
  marca: string;
  /** Arquivo por extenso; sem ele, usa o símbolo do brand-icon. */
  logo?: { src: string; height: number; alt: string };
  compact?: boolean;
}) {
  const scale = compact ? 0.72 : 1;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] bg-white",
        compact ? "h-8 w-[4.5rem]" : "h-11 w-[6.5rem]",
      )}
    >
      {logo ? (
        <img src={logo.src} alt={logo.alt} style={{ height: Math.round(logo.height * scale) }} className="w-auto" />
      ) : (
        <BrandIcon id={marca} size={compact ? 16 : 22} />
      )}
    </span>
  );
}

/**
 * Card de integração colapsável (Configurações › Integrações, Instalação).
 * Fechado = uma linha escaneável: logo(s) + nome + o que destrava + selos.
 * Selos EMBAIXO do nome (na mesma linha eles comem a largura e o nome some).
 * Lista em UMA coluna; duas só em telas ≥ 2xl.
 */
export function IntegrationCard({
  marcas,
  titulo,
  destrava,
  pronto,
  statusLabel,
  selo,
  abrirPorPadrao = false,
  children,
}: {
  /** ids do brand-icon (1 a 3). */
  marcas: string[];
  titulo: string;
  /** O que esta integração destrava, em uma frase (benefício, não técnica). */
  destrava: string;
  pronto: boolean;
  statusLabel?: string;
  /** "Essencial" | "Recomendado" | "Opcional". */
  selo?: string;
  abrirPorPadrao?: boolean;
  children: ReactNode;
}) {
  const [aberto, setAberto] = useState(abrirPorPadrao);
  return (
    <article className="ds-integration overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)]">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-[var(--via-navy-02)]"
      >
        <span className="flex shrink-0 -space-x-2">
          {marcas.map((m) => (
            <BrandTile key={m} id={m} size={40} className="bg-white ring-2 ring-[var(--via-surface)]" />
          ))}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-medium text-[var(--via-text-primary)]">{titulo}</span>
          <span className="mt-0.5 block text-sm text-[var(--via-text-muted)]">{destrava}</span>
          <span className="mt-2 flex flex-wrap items-center gap-1.5">
            {selo && (
              <span className="rounded-full border border-[var(--via-border)] px-2 py-0.5 text-[0.6875rem] font-medium text-[var(--via-text-primary)]">
                {selo}
              </span>
            )}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium",
                pronto
                  ? "bg-[var(--via-text-primary)] text-[var(--via-surface)]"
                  : "border border-dashed border-[var(--via-border)] text-[var(--via-text-muted)]",
              )}
            >
              {pronto && <CheckCircle2 className="h-3 w-3" />}
              {statusLabel ?? (pronto ? "Pronta" : "Não configurada")}
            </span>
          </span>
        </span>
        <ChevronDown
          className={cn("mt-1 h-4 w-4 shrink-0 text-[var(--via-text-muted)] transition-transform duration-[var(--via-dur)] ease-[var(--via-ease-out)]", aberto && "rotate-180")}
        />
      </button>
      {aberto && <div className="ds-reveal border-t border-[var(--via-border-soft)] p-5">{children}</div>}
    </article>
  );
}

/**
 * Escolha entre provedores (IA, WhatsApp, e-mail…) — cartões com logo, nunca
 * <select> de texto. O escolhido ganha borda navy; cada opção mostra o estado
 * ("Chave guardada" / "Sem chave").
 */
export function ProviderChoice<T extends string>({
  opcoes,
  valor,
  onChange,
  rotulo,
}: {
  opcoes: { id: T; marca: string; nome: string; estado?: string; pronto?: boolean }[];
  valor: T;
  onChange: (id: T) => void;
  rotulo: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[var(--via-text-primary)]">{rotulo}</p>
      <div role="radiogroup" aria-label={rotulo} className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {opcoes.map((p) => {
          const on = p.id === valor;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(p.id)}
              className={cn(
                "flex items-center gap-3 rounded-[var(--via-radius-md)] border bg-[var(--via-surface)] p-3 text-left transition-colors",
                on
                  ? "border-[var(--via-text-primary)] shadow-[0_0_0_1px_var(--via-text-primary)]"
                  : "border-[var(--via-border-soft)] hover:border-[var(--via-navy-20)]",
              )}
            >
              <BrandTile id={p.marca} size={36} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-[var(--via-text-primary)]">{p.nome}</span>
                {p.estado && (
                  <span className={cn("block text-xs", p.pronto ? "text-[var(--via-text-primary)]" : "text-[var(--via-text-soft)]")}>
                    {p.estado}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
