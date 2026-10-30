import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Rocket, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ==============================================================
   Estados de tela do DS SUBIDO: próximo passo, vazio, banner de
   configuração e selo de "dados de exemplo".
   ============================================================== */

/**
 * PRÓXIMO PASSO · o bloco mais forte da tela quando falta um pré-requisito
 * (sem dado, sem canal, sem integração). Navy em gradiente, botão branco.
 * Classe-gancho `ds-next-step` (revenue.css pinta o gradiente).
 *
 * Use UM por tela. Se a tela já tem um estado vazio que leva ao mesmo lugar,
 * não empilhe os dois ("se tudo chama atenção, nada chama").
 */
export function NextStep({
  icon: Icon,
  titulo,
  detalhe,
  acao,
  onAcao,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  titulo: ReactNode;
  detalhe?: ReactNode;
  acao: string;
  onAcao: () => void;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "ds-next-step flex items-center gap-3 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-navy-03)] px-4 py-3.5 text-left",
        className,
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy-08)] text-[var(--via-navy)]">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-[var(--via-text-primary)]">{titulo}</span>
        {detalhe && <span className="block text-xs text-[var(--via-text-muted)]">{detalhe}</span>}
      </span>
      <button
        type="button"
        onClick={onAcao}
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--via-navy)] px-3.5 py-1.5 text-xs font-medium text-white transition-transform duration-[var(--via-dur)] hover:-translate-y-px focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)]"
      >
        {acao}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

/**
 * ESTADO VAZIO de lista (contatos, tarefas, alertas…): ícone num círculo,
 * título, uma frase do PORQUÊ ter isso e UMA ação. Quando a lista está vazia,
 * o botão "Novo…" do cabeçalho recua para outline — a ação dominante passa a
 * ser a deste bloco.
 */
export function EmptyState({
  icon: Icon,
  titulo,
  descricao,
  acao,
  secundaria,
  className,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  titulo: string;
  descricao?: ReactNode;
  /** O botão primário (Button do kit). */
  acao?: ReactNode;
  /** Link de texto (ex.: "Importar planilha"). Nunca um 2º botão navy. */
  secundaria?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] px-6 py-12 text-center",
        className,
      )}
    >
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--via-navy-04)] text-[var(--via-navy)]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <p className="text-base font-medium text-[var(--via-text-primary)]">{titulo}</p>
      {descricao && <p className="mx-auto mt-1 max-w-md text-sm text-[var(--via-text-muted)]">{descricao}</p>}
      {acao && <div className="mt-5 flex justify-center">{acao}</div>}
      {secundaria && <div className="mt-3 text-sm">{secundaria}</div>}
    </div>
  );
}

/**
 * BANNER DE CONFIGURAÇÃO · progresso da ativação no topo das telas internas,
 * enquanto falta passo. Tracejado e quieto (revenue.css · ds-setup-banner):
 * aponta para o mesmo lugar que o próximo passo, então não compete.
 *
 * Esconda onde a própria tela já é o progresso (home com FirstSteps) ou onde
 * já existe aviso do mesmo pré-requisito (lista com NextStep), e em Ajuda e
 * Configurações (não são passos da configuração).
 */
export function SetupBanner({
  feitos,
  total,
  proximo,
  onContinuar,
  onFechar,
}: {
  feitos: number;
  total: number;
  /** "Próximo: conectar suas fontes." — contextual à tela, quando der. */
  proximo: string;
  onContinuar: () => void;
  onFechar?: () => void;
}) {
  return (
    <div className="ds-setup-banner mb-6 flex items-center gap-3 rounded-xl border px-4 py-3">
      <Rocket className="h-5 w-5 shrink-0 text-[var(--via-navy)]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--via-text-primary)]">
          Você já começou: {feitos} de {total} passos
        </p>
        <p className="text-sm text-[var(--via-text-muted)]">{proximo}</p>
        <div className="mt-2 h-1 max-w-[240px] overflow-hidden rounded-full bg-[var(--via-navy-08)]">
          <div className="h-full rounded-full bg-[var(--via-navy)]" style={{ width: `${(feitos / total) * 100}%` }} />
        </div>
      </div>
      <button
        type="button"
        onClick={onContinuar}
        className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--via-text-primary)] hover:bg-[var(--via-navy-04)]"
      >
        Continuar configuração
      </button>
      {onFechar && (
        <button
          type="button"
          aria-label="Fechar"
          onClick={onFechar}
          className="shrink-0 rounded-full p-1.5 text-[var(--via-text-muted)] hover:bg-[var(--via-navy-04)]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/**
 * SELO DE DADOS DE EXEMPLO · em todo painel/tela que mostra número fictício.
 * "Dados de exemplo · estes números não são da sua empresa." — sem ele, o
 * usuário toma decisão em cima de dado de mentira (e perde a confiança depois).
 */
export function SampleFlag({ acao }: { acao?: ReactNode }) {
  return (
    <div className="ds-sample-flag mb-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--via-border)] bg-[var(--via-surface)] px-3 py-1.5 text-[0.8125rem] text-[var(--via-text-body)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--via-navy)]" />
      Dados de exemplo · estes números não são da sua empresa.
      {acao}
    </div>
  );
}
