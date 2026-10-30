import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRevenuePP } from "@/lib/ds-variant";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Database, Loader2, Play, Table2 } from "lucide-react";
import { requestConnectData } from "@/components/onboarding/onboarding-events";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { montarInsercao } from "@/lib/sql/inserir-no-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { aliasFor } from "@/lib/models/definition";
import type { ColumnDef } from "@/types/data-source";

/**
 * Consulta SQL sobre os dados já coletados.
 *
 * Quem escreve SQL não precisa do assistente: escolhe as fontes, escreve o
 * SELECT e vê o resultado. As fontes viram tabelas com o nome que aparece na
 * lista ao lado, já com as colunas tipadas — nada de `data->>'valor'`.
 */
export const Route = createFileRoute("/sql")({
  component: SqlPage,
  head: () => ({ meta: [{ title: "Consulta SQL — My Dashboard" }] }),
});

/** O tipo em palavra: escrever sum() sobre coluna de texto é o erro mais comum. */
const TIPO: Record<string, string> = {
  text: "texto",
  number: "número",
  currency: "moeda",
  date: "data",
};

interface SourceRow {
  id: string;
  name: string;
  columns: ColumnDef[];
  row_count: number;
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
}

function SqlPage() {
  const navigate = useNavigate();
  const [sources, setSources] = useState<SourceRow[] | null>(null);
  const [chosen, setChosen] = useState<string[]>([]);
  const [sql, setSql] = useState("");
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const revenuePP = useRevenuePP();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (cancelled) return;
      if (authError || !auth.user) {
        void navigate({ to: "/login" });
        return;
      }
      const { data } = await supabase
        .from("data_sources")
        .select("id, name, columns, row_count")
        .eq("user_id", auth.user.id)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      setSources(((data as unknown as SourceRow[] | null) ?? []).filter((s) => s.columns?.length));
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  /** Nome de tabela de cada fonte, estável e sem acento. */
  const aliases = useMemo(() => {
    const taken: string[] = [];
    const map = new Map<string, string>();
    for (const source of sources ?? []) {
      const alias = aliasFor(source.name, taken);
      taken.push(alias);
      map.set(source.id, alias);
    }
    return map;
  }, [sources]);

  const selected = (sources ?? []).filter((s) => chosen.includes(s.id));

  // Revenue++: com uma fonte só, ela já vem marcada e o editor já traz uma
  // consulta que roda nela — o exemplo antigo citava "pedidos", que não existe.
  useEffect(() => {
    if (!revenuePP || !sources || sources.length !== 1) return;
    const only = sources[0];
    if (chosen.length === 0) setChosen([only.id]);
    if (!sql.trim()) {
      const alias = aliases.get(only.id) ?? "dados";
      const text = only.columns.find((c) => c.type === "text")?.name;
      const num = (
        only.columns.find((c) => c.type === "currency") ??
        only.columns.find((c) => c.type === "number")
      )?.name;
      setSql(
        text && num
          ? `select ${text}, sum(${num}::numeric) as total\n  from ${alias}\n group by 1\n order by 2 desc`
          : `select *\n  from ${alias}\n limit 50`,
      );
    }
    // só na carga: depois disso o editor é da pessoa
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revenuePP, sources]);

  // Revenue++: o banco devolve as colunas em ordem alfabética (jsonb); aqui
  // elas voltam para a ordem do SELECT, e número sai formatado e à direita.
  const shownColumns = useMemo(() => {
    if (!revenuePP) return columns;
    const list = /select([\s\S]*?)\bfrom\b/i.exec(sql)?.[1];
    if (!list) return columns;
    const order: string[] = [];
    let depth = 0;
    let part = "";
    for (const ch of list + ",") {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && depth === 0) {
        const name = /(?:\bas\s+)?"?([\p{L}_][\p{L}\p{N}_]*)"?\s*$/iu.exec(part.trim())?.[1];
        if (name) order.push(name.toLowerCase());
        part = "";
      } else part += ch;
    }
    const known = order.filter((n) => columns.includes(n));
    return [...known, ...columns.filter((c) => !known.includes(c))];
  }, [revenuePP, columns, sql]);

  const cell = (v: unknown) => {
    if (v === null || v === undefined) return { text: "—", num: false };
    const n =
      typeof v === "number"
        ? v
        : typeof v === "string" && /^-?\d+(\.\d+)?$/.test(v)
          ? Number(v)
          : NaN;
    if (!revenuePP || Number.isNaN(n)) return { text: String(v), num: false };
    return {
      text: new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: Math.abs(n) >= 100 ? 0 : 2,
      }).format(n),
      num: true,
    };
  };

  const run = useCallback(async () => {
    setRunning(true);
    setError(null);
    const resp = await fetch("/api/sql/run", {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify({
        sql,
        sources: selected.map((s) => ({ alias: aliases.get(s.id), sourceId: s.id })),
      }),
    });
    const data = (await resp.json()) as {
      rows?: Record<string, unknown>[];
      columns?: string[];
      truncated?: boolean;
      error?: string;
    };
    setRunning(false);
    if (!resp.ok) {
      setError(data.error ?? "Não foi possível executar.");
      setRows(null);
      return;
    }
    setRows(data.rows ?? []);
    setColumns(data.columns ?? []);
    setTruncated(!!data.truncated);
  }, [sql, selected, aliases]);

  /**
   * Escreve no ponto onde o cursor está, e devolve o foco.
   *
   * Antes o clique na fonte só servia quando o editor estava vazio: ele montava
   * um SELECT de exemplo e, dali em diante, clicar não fazia nada. Quem estava
   * no meio de uma consulta tinha de ler o nome da coluna na lista e digitar.
   */
  function inserirNoEditor(texto: string) {
    const campo = editorRef.current;
    if (!campo) {
      setSql((prev) => (prev ? `${prev} ${texto}` : texto));
      return;
    }
    const inicio = campo.selectionStart ?? sql.length;
    const fim = campo.selectionEnd ?? sql.length;
    const { texto: novo, cursor } = montarInsercao(sql, inicio, fim, texto);
    setSql(novo);
    requestAnimationFrame(() => {
      campo.focus();
      campo.setSelectionRange(cursor, cursor);
    });
  }

  /** Marca a fonte, se ainda não estiver: sem isso ela não vira tabela na consulta. */
  function garantirEscolhida(sourceId: string) {
    setChosen((prev) => (prev.includes(sourceId) ? prev : [...prev, sourceId]));
  }

  function insertSource(source: SourceRow) {
    const alias = aliases.get(source.id) ?? "fonte";
    garantirEscolhida(source.id);
    // editor vazio ganha uma consulta que já roda; com texto, insere só o nome
    if (!sql.trim()) setSql(`select *\n  from ${alias}\n limit 50`);
    else inserirNoEditor(alias);
  }

  function inserirColuna(source: SourceRow, coluna: string) {
    const alias = aliases.get(source.id) ?? "fonte";
    garantirEscolhida(source.id);
    // qualificada pelo apelido: com duas fontes na consulta, "valor" sozinho é ambíguo
    inserirNoEditor(`${alias}.${coluna}`);
  }

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-[var(--via-space-5)]">
        {revenuePP ? (
          // Revenue++: o mesmo cabeçalho das outras telas (eyebrow + título 3xl)
          <div>
            <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
              Dados
            </p>
            <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
              Consulta SQL
            </h1>
            <p className="mt-1 text-sm text-[var(--via-text-muted)]">
              Escreva SELECT sobre as suas fontes. Cada fonte vira uma tabela com o nome mostrado
              ao lado, já com as colunas tipadas.
            </p>
          </div>
        ) : (
          <SectionHeading
            eyebrow="Dados"
            title="Consulta SQL"
            description="Escreva SELECT sobre as suas fontes. Cada fonte vira uma tabela com o nome mostrado ao lado, já com as colunas tipadas."
          />
        )}

        {/* Revenue++: sem fonte não há o que consultar — em vez de um editor
            com exemplo de uma tabela que não existe e um botão apagado, a
            tela diz por quê e leva à única ação que destrava */}
        {revenuePP && sources?.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-6 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--via-navy-04)] text-[var(--via-navy)]">
              <Database className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-medium text-[var(--via-text-primary)]">
                Conecte uma fonte para consultar
              </p>
              <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">
                Cada fonte vira uma tabela aqui, com as colunas prontas para clicar. Planilha ou
                CSV leva menos de um minuto.
              </p>
            </div>
            <Button
              className="gap-2"
              onClick={() => {
                if (!requestConnectData()) void navigate({ to: "/sources" });
              }}
            >
              Conectar minha primeira fonte
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
              Tabelas disponíveis
            </p>
            <p className="text-xs text-[var(--via-text-soft)]">
              Marque as que a consulta vai usar. Clique no nome da tabela ou de uma coluna para
              escrevê-la no editor, onde o cursor estiver.
            </p>
            {sources === null && (
              <p className="text-sm text-[var(--via-text-muted)]">Carregando…</p>
            )}
            {sources?.length === 0 && (
              <p className="text-sm text-[var(--via-text-muted)]">
                Nenhuma fonte com colunas conhecidas ainda.
              </p>
            )}
            <ul className="space-y-2">
              {(sources ?? []).map((source) => {
                const alias = aliases.get(source.id) ?? "";
                const on = chosen.includes(source.id);
                return (
                  <li
                    key={source.id}
                    className="rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] p-2"
                  >
                    {/* A caixa de marcar fica sozinha no <label>: com os botões de
                        coluna dentro dele, clicar numa coluna também desmarcava a
                        fonte, e a consulta perdia a tabela no meio da escrita. */}
                    <label className="flex cursor-pointer items-start gap-2">
                      <Checkbox
                        checked={on}
                        onCheckedChange={() =>
                          setChosen((prev) =>
                            on ? prev.filter((id) => id !== source.id) : [...prev, source.id],
                          )
                        }
                        className="mt-0.5"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-[var(--via-text-primary)]">
                          {source.name}
                        </span>
                        <span className="block text-[11px] text-[var(--via-text-soft)]">
                          {source.row_count.toLocaleString("pt-BR")} linha
                          {source.row_count === 1 ? "" : "s"}
                        </span>
                      </span>
                    </label>

                    <div className="mt-1.5 pl-6">
                      <button
                        type="button"
                        onClick={() => insertSource(source)}
                        title="Escrever o nome desta tabela no editor"
                        className="font-mono text-xs text-[var(--via-navy)] underline underline-offset-2"
                      >
                        {alias}
                      </button>

                      {/* As colunas ficam sempre à vista, e não só quando a fonte
                          está marcada: é aqui que a pessoa descobre o que existe
                          para consultar. O tipo vem junto porque somar coluna de
                          texto é o erro mais comum de quem escreve às cegas. */}
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {source.columns.map((coluna) => (
                          <button
                            key={coluna.name}
                            type="button"
                            onClick={() => inserirColuna(source, coluna.name)}
                            title={`Escrever ${alias}.${coluna.name} no editor`}
                            className="rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] px-1.5 py-0.5 text-left text-[11px] text-[var(--via-text-muted)] transition-colors hover:border-[var(--via-navy-20)] hover:text-[var(--via-text-primary)]"
                          >
                            <span className="font-mono">{coluna.name}</span>
                            <span className="ml-1 text-[var(--via-text-soft)]">
                              {TIPO[coluna.type] ?? coluna.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>

          <section className="space-y-3">
            <textarea
              ref={editorRef}
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              onKeyDown={(e) => {
                // atalho de quem escreve SQL o dia inteiro
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") void run();
              }}
              spellCheck={false}
              rows={10}
              placeholder={
                "select vendedor, sum(valor) as total\n  from pedidos\n group by 1\n order by 2 desc"
              }
              className="w-full rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-3 font-mono text-sm text-[var(--via-text-primary)] focus:border-[var(--via-navy-20)] focus:outline-none"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button
                disabled={running || !sql.trim() || selected.length === 0}
                onClick={() => void run()}
              >
                {running ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Executar
              </Button>
              <span className="text-xs text-[var(--via-text-soft)]">
                {revenuePP && selected.length === 0 && sources?.length
                  ? "Marque ao lado ao menos uma tabela para executar"
                  : "Ctrl+Enter executa · somente leitura · 15 s de limite"}
              </span>
            </div>

            {error && (
              <pre className="whitespace-pre-wrap rounded-[var(--via-radius-sm)] border border-[var(--via-coral)]/30 bg-[var(--via-coral)]/5 p-3 font-mono text-xs text-[var(--via-coral-dark)]">
                {error}
              </pre>
            )}

            {rows !== null && !error && (
              <div className="space-y-2">
                <p className="text-xs text-[var(--via-text-muted)]">
                  {rows.length} linha{rows.length === 1 ? "" : "s"}
                  {truncated ? " (limite atingido)" : ""}
                </p>
                {rows.length === 0 ? (
                  <div className="flex items-center gap-2 rounded-[var(--via-radius-sm)] border border-dashed border-[var(--via-border-soft)] p-6 text-sm text-[var(--via-text-muted)]">
                    <Table2 className="h-4 w-4" /> A consulta não devolveu linhas.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)]">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[var(--via-border-soft)] bg-[var(--via-navy-04)]">
                          {shownColumns.map((c) => (
                            <th
                              key={c}
                              className="whitespace-nowrap px-3 py-2 text-left font-medium text-[var(--via-text-primary)]"
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr
                            key={i}
                            className="border-b border-[var(--via-border-soft)] last:border-0"
                          >
                            {shownColumns.map((c) => {
                              const v = cell(row[c]);
                              return (
                                <td
                                  key={c}
                                  className={
                                    v.num
                                      ? "whitespace-nowrap px-3 py-2 text-right text-[var(--via-text-primary)] tabular-nums"
                                      : "whitespace-nowrap px-3 py-2 text-[var(--via-text-muted)] tabular-nums"
                                  }
                                >
                                  {v.text}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
        )}
      </div>
    </AppShell>
  );
}
