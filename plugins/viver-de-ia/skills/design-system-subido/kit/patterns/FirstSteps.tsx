import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Home SEM dado (ou instalação nova): o checklist de ativação é a tela inteira.
 *
 *   "Never ship a blank dashboard" — sem dado, a home não mostra KPI zerado,
 *   filtro, exportação nem gráfico vazio. Mostra o progresso (efeito Zeigarnik
 *   + goal gradient: "2 de 3, falta 1 passo") e UMA ação navy, no passo atual.
 *
 * Regras:
 *   · o 1º passo já vem feito ("Conta criada") — começar com progresso > 0
 *     (endowed progress) aumenta a conclusão;
 *   · os passos vão na ordem do MOMENTO DE VALOR do produto (o que faz o
 *     usuário sentir o produto funcionando primeiro), não na ordem do banco;
 *   · só o passo atual tem botão; os outros são texto;
 *   · "ver um exemplo antes" é link secundário no rodapé, nunca 2º botão.
 */
export interface Passo {
  label: string;
  /** Uma frase de por quê/como — some quando o passo está feito. */
  detail: string;
  done: boolean;
  /** Rótulo e ação do botão quando este é o passo atual. */
  acao?: { label: string; onClick: () => void };
}

export function FirstSteps({
  passos,
  secundaria,
}: {
  passos: Passo[];
  /** Link de rodapé (ex.: "Antes, veja como fica um painel pronto →"). */
  secundaria?: ReactNode;
}) {
  const done = passos.filter((s) => s.done).length;
  const current = passos.findIndex((s) => !s.done);
  const faltam = passos.length - done;

  return (
    <div className="ds-first-steps rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-6 sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
            Seu progresso
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-[-0.03em] text-[var(--via-text-primary)] tabular-nums">
            {done} de {passos.length}
          </p>
        </div>
        <p className="pb-1 text-sm text-[var(--via-text-muted)]">
          {faltam === 0 ? "Tudo pronto" : faltam === 1 ? "Falta 1 passo" : `Faltam ${faltam} passos`}
        </p>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--via-navy-08)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={passos.length}
        aria-valuenow={done}
        aria-label="Progresso da configuração"
      >
        <div
          className="h-full rounded-full bg-[var(--via-navy)] transition-[width] duration-500"
          style={{ width: `${(done / passos.length) * 100}%` }}
        />
      </div>

      <ol className="mt-6 space-y-1">
        {passos.map((s, i) => {
          const active = i === current;
          return (
            <li
              key={s.label}
              className={active ? "flex gap-4 rounded-[var(--via-radius-md)] bg-[var(--via-navy-04)] p-4" : "flex gap-4 p-4"}
            >
              <span
                className={
                  s.done
                    ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy)] text-white"
                    : active
                      ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--via-navy)] text-xs font-semibold text-[var(--via-navy)]"
                      : "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--via-border)] text-xs text-[var(--via-text-muted)]"
                }
              >
                {s.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={
                    s.done
                      ? "block text-[0.9375rem] text-[var(--via-text-muted)] line-through decoration-[var(--via-navy-20)]"
                      : active
                        ? "block text-base font-medium text-[var(--via-text-primary)]"
                        : "block text-[0.9375rem] text-[var(--via-text-muted)]"
                  }
                >
                  {s.label}
                </span>
                {!s.done && <span className="mt-0.5 block text-sm text-[var(--via-text-muted)]">{s.detail}</span>}
                {active && s.acao && (
                  <Button size="lg" className="mt-4" onClick={s.acao.onClick}>
                    {s.acao.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {secundaria && <div className="mt-5 border-t border-[var(--via-border-soft)] pt-4 text-sm">{secundaria}</div>}
    </div>
  );
}

/**
 * Cabeçalho da home sem dado: promessa + instrução, centralizado, acima do
 * FirstSteps. Ex.: "Seus números num painel só." / "Comece pela fonte que você já usa."
 */
export function HomeHero({ titulo, subtitulo }: { titulo: ReactNode; subtitulo: ReactNode }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">{titulo}</h1>
      <p className="mt-2 text-[0.9375rem] text-[var(--via-text-muted)]">{subtitulo}</p>
    </div>
  );
}
