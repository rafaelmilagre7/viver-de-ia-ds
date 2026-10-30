import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Database,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  Rocket,
  Search,
  Settings as SettingsIcon,
  Share2,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRevenuePP } from "@/lib/ds-variant";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/help")({
  component: HelpPage,
  head: () => ({
    meta: [
      { title: "Ajuda — My Dashboard" },
      {
        name: "description",
        content:
          "Guia completo de uso do My Dashboard: criação de dashboards, fontes de dados, templates, alertas, compartilhamento e configurações.",
      },
    ],
  }),
});

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "visao-geral",
    title: "Visão geral",
    icon: HelpCircle,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>
          O <strong className="text-text">My Dashboard</strong> transforma uma descrição em
          linguagem natural em um dashboard pronto para apresentar — com KPIs, gráficos, tabelas e
          insights gerados por IA.
        </p>
        <p>O fluxo padrão é simples:</p>
        <ol className="list-inside list-decimal space-y-1 pl-2">
          <li>Você descreve o que quer monitorar (ex.: "vendas mensais por canal").</li>
          <li>A IA gera o layout completo em segundos.</li>
          <li>Você conecta uma fonte de dados (planilha, Sheets, webhook, CRM).</li>
          <li>Refina via chat, exporta, compartilha ou cria alertas.</li>
        </ol>
        {/* O menu tinha uma tela "Conexões" separada de "Fontes", e a Ajuda
            ensinava o vaivém entre as duas. Agora conta e conjunto de dados
            vivem juntos em Fontes, e o que é da instalação inteira saiu para
            Administração → Instalação. O mapa abre a Ajuda porque é a primeira
            coisa que quem se perdeu vem procurar aqui. */}
        <p className="mb-3 mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
          Onde fica cada coisa
        </p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>
            <strong className="text-[var(--via-text-primary)]">Painéis:</strong> Início, Dashboards,
            Alertas e Templates — tudo o que você olha ou apresenta.
          </li>
          <li>
            <strong className="text-[var(--via-text-primary)]">Dados:</strong> Fontes, Modelos e
            Consulta SQL — de onde os números vêm.
          </li>
          <li>
            <strong className="text-[var(--via-text-primary)]">Conta:</strong> Configurações e
            Ajuda.
          </li>
          <li>
            <strong className="text-[var(--via-text-primary)]">Administração:</strong> Usuários e
            Instalação, visível só para administradores. Em Instalação ficam as credenciais que
            valem para todo mundo (chave da Resend, cliente OAuth do Google, apps de ERP) e que se
            cadastram uma vez só.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "primeiros-passos",
    title: "Primeiros passos",
    icon: Rocket,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>
          <strong className="text-text">Criar conta:</strong> acesse a tela de cadastro com email e
          senha ou continue com o Google. Você precisa confirmar o email antes do primeiro login.
        </p>
        <p>
          <strong className="text-text">Login:</strong> use email/senha ou Google. Caso esqueça a
          senha, você pode redefini-la em "Configurações → Conta".
        </p>
        <p>
          <strong className="text-text">Primeiro dashboard:</strong> na tela inicial, digite no
          campo central de prompt o que você deseja visualizar e pressione enviar. O dashboard será
          criado automaticamente em modo "Gerando" e migra para "Pronto" assim que a IA terminar.
        </p>
      </div>
    ),
  },
  {
    id: "criando-dashboards",
    title: "Criando dashboards",
    icon: Sparkles,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>Existem três formas de criar um dashboard:</p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong className="text-text">Pela home:</strong> use o prompt central na página
            inicial.
          </li>
          <li>
            <strong className="text-text">Pela tela "Dashboards":</strong> clique em "Novo
            dashboard" para abrir o assistente.
          </li>
          <li>
            <strong className="text-text">A partir de um template:</strong> em "Templates", escolha
            um modelo pronto por vertical (Vendas, Marketing, Financeiro, etc.) e personalize.
          </li>
        </ul>
        <p>
          Se o prompt for muito vago, a IA pode fazer perguntas de esclarecimento antes de gerar
          (clarify). Responda com o máximo de contexto possível para um resultado melhor.
        </p>
      </div>
    ),
  },
  {
    id: "editor",
    title: "Editor de dashboard",
    icon: LayoutDashboard,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>O editor mostra o canvas com todos os componentes e uma barra de ações no topo:</p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong className="text-text">Componentes suportados:</strong> KPI cards, line chart,
            bar chart, pie/donut, area chart, tabela de dados, progress bar e gráfico de metas.
          </li>
          <li>
            <strong className="text-text">Reorganizar:</strong> arraste componentes (drag-and-drop)
            para reordená-los livremente.
          </li>
          <li>
            <strong className="text-text">Trocar tipo:</strong> clique no menu de um componente para
            alterar o tipo de visualização sem perder os dados.
          </li>
          <li>
            <strong className="text-text">Editar título:</strong> clique no título do dashboard para
            renomeá-lo inline.
          </li>
          <li>
            <strong className="text-text">Auto-save:</strong> todas as alterações são salvas
            automaticamente. O indicador ao lado do título mostra o status (salvando, salvo, erro
            com botão "tentar novamente").
          </li>
          <li>
            <strong className="text-text">Período comparativo:</strong> use o seletor para comparar
            métricas entre semana, mês, trimestre ou ano.
          </li>
          <li>
            <strong className="text-text">Fale com seus dados:</strong> o botão com o ícone de IA, no
            canto da tela, abre uma conversa sobre as suas fontes ("quanto entrou de receita nos
            últimos 30 dias?"). A IA consulta só os seus dados, sem alterar nada, e toda resposta
            mostra as linhas e o cálculo usados.
          </li>
          <li>
            <strong className="text-text">Insights automáticos:</strong> clique em "Analisar" para a
            IA detectar anomalias e tendências relevantes, exibidas em um banner no topo.
          </li>
          <li>
            <strong className="text-text">Duplicar / Excluir:</strong> use os botões do header.
            Duplicar copia toda a estrutura e dados.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "fontes",
    title: "Fontes de dados",
    icon: Database,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        {/* Dizia só "Fontes" e "conexões de dados", de um tempo em que conectar
            a conta era numa tela e trazer o dado era em outra. Quem lia ainda
            procurava a tela Conexões; ela não existe mais, e a conta entra no
            mesmo lugar em que a fonte nasce. */}
        <p>
          Acesse <strong className="text-[var(--via-text-primary)]">Dados → Fontes</strong> no menu
          lateral. Cada fonte guarda junto a conta conectada e os dados que vieram dela — conectar e
          importar acontecem no mesmo lugar:
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong className="text-text">Upload CSV/Excel:</strong> arraste o arquivo para o
            uploader. O sistema detecta colunas, tipos e separadores automaticamente.
          </li>
          <li>
            <strong className="text-text">Google Sheets:</strong> conecte sua conta Google via
            OAuth, escolha a planilha e a aba. O sync pode ser refeito a qualquer momento.
          </li>
          <li>
            <strong className="text-text">Webhook:</strong> cada dashboard pode ter um endpoint
            próprio que aceita POST com JSON para ingestão em tempo real.
          </li>
          <li>
            <strong className="text-text">Conectores CRM:</strong> integre com seu CRM via webhook
            autenticado por assinatura.
          </li>
        </ul>
        <p>
          Para vincular uma fonte ao dashboard, abra o editor e clique em "Conectar dados" (ou
          "Dados" no header). A IA mapeia automaticamente as colunas para os componentes corretos.
        </p>
        <p className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-warning">
          Enquanto não houver fonte conectada, o dashboard exibe dados de exemplo (mock) apenas para
          visualização do layout.
        </p>
      </div>
    ),
  },
  {
    id: "templates",
    title: "Templates",
    icon: BarChart3,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>
          A galeria de <strong className="text-text">Templates</strong> oferece dashboards
          pré-configurados para os setores mais comuns: Vendas, Marketing, Financeiro, Jurídico,
          Projetos, Estoque e mais.
        </p>
        <p>
          Clique em um template para criar um dashboard novo já com a estrutura, componentes e
          métricas típicas daquele setor. Depois é só conectar a sua fonte e personalizar via chat
          IA.
        </p>
      </div>
    ),
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento e exportação",
    icon: Share2,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>No editor, abra o menu de compartilhamento para:</p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong className="text-text">Link público (view-only):</strong> qualquer pessoa com o
            link visualiza o dashboard, sem editar.
          </li>
          <li>
            <strong className="text-text">Senha opcional:</strong> proteja o link com uma senha que
            será exigida ao acessar.
          </li>
          <li>
            <strong className="text-text">Embed iframe:</strong> copie o snippet HTML para
            incorporar o dashboard em sites e portais internos.
          </li>
        </ul>
        <p>
          Use o menu <strong className="text-text">Exportar</strong> para baixar o dashboard em PDF
          formatado ou em planilha Excel com os dados subjacentes.
        </p>
      </div>
    ),
  },
  {
    id: "alertas",
    title: "Alertas",
    icon: Bell,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>
          {/* A tela chama "Alertas" no menu, no título e no cabeçalho; a Ajuda
              dizia "Alerts" e mandava o usuário procurar um item que não existe.
              O grupo também mudou: alerta não é encanamento, é saída — ele
              observa a métrica de um painel, e é em Painéis que a pessoa vai
              procurá-lo, não em Dados. */}
          Em <strong className="text-[var(--via-text-primary)]">Painéis → Alertas</strong>, você
          cria regras automáticas que avisam quando uma métrica ultrapassa um limite.
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong className="text-text">Métrica:</strong> escolha o KPI ou campo do dashboard que
            deseja monitorar.
          </li>
          <li>
            <strong className="text-text">Condição:</strong> maior que, menor que ou variação %
            maior que.
          </li>
          <li>
            <strong className="text-text">Limite:</strong> valor numérico de referência.
          </li>
          {/* Antes esta linha dizia só "email cadastrado na sua conta": o Slack
              existe desde que o webhook passou para o cartão "Canais de envio",
              e quem lia a Ajuda desistia de um canal que o produto tem. Cada
              destino depende de uma credencial diferente — sem ela o alerta
              dispara e a notificação não sai —, por isso as duas aparecem aqui. */}
          <li>
            <strong className="text-[var(--via-text-primary)]">Canal — e-mail:</strong> o endereço
            da sua conta. O envio usa a Resend: um administrador cadastra a chave em Administração →
            Instalação, e sem ela o alerta dispara mas o e-mail não sai.
          </li>
          <li>
            <strong className="text-[var(--via-text-primary)]">Canal — Slack:</strong> a URL de um
            webhook de entrada, que você mesmo cadastra no cartão "Canais de envio", na tela de
            Alertas. Enquanto não houver webhook, a opção fica desabilitada no assistente.
          </li>
        </ul>
        <p>
          O sistema verifica todos os alertas a cada 15 minutos. Quando um alerta dispara, fica
          registrado no histórico com data, valor e status do envio. Você pode pausar ou reativar
          qualquer alerta a qualquer momento.
        </p>
      </div>
    ),
  },
  {
    id: "configuracoes",
    title: "Configurações",
    icon: SettingsIcon,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <p>
          Em <strong className="text-[var(--via-text-primary)]">Conta → Configurações</strong>, a
          tela é dividida em três abas:
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong className="text-text">Perfil:</strong> edite seu nome de exibição. O email é
            fixo (vinculado ao login).
          </li>
          {/* Dizia "sem chave configurada, a geração via IA fica indisponível" — e não
              fica: publicado no Lovable o motor usa o crédito de IA da plataforma. Fora
              de lá, sem a variável LOVABLE_API_KEY, aí sim a chave é obrigatória, e é
              por isso que a frase carrega a condição em vez de prometer demais. */}
          <li>
            <strong className="text-text">IA:</strong> selecione o provedor preferido (OpenAI,
            Anthropic, Google Gemini, xAI ou DeepSeek), cadastre sua API Key e, se quiser, o modelo.
            Cada provedor traz o link de onde tirar a chave. Sem chave própria, a geração usa o
            crédito de IA do Lovable quando o app está publicado lá; fora do Lovable, a chave é
            obrigatória.
          </li>
          <li>
            <strong className="text-text">Conta:</strong> altere sua senha, faça logout ou solicite
            a exclusão da conta (ação irreversível).
          </li>
        </ul>
        {/* A confusão que sobrava: a pessoa vinha para cá procurar a chave da
            Resend ou o cliente OAuth do Google, que não são dela — são da
            instalação, valem para todo mundo e se cadastram uma vez. Dizer aqui
            onde elas ficam evita a volta inteira. */}
        <p>
          Aqui só entram credenciais suas. As que valem para a instalação inteira — chave da Resend,
          cliente OAuth e chave de API do Google, apps de ERP — ficam em{" "}
          <strong className="text-[var(--via-text-primary)]">Administração → Instalação</strong>, e
          quem as cadastra é um administrador.
        </p>
      </div>
    ),
  },
  {
    id: "faq",
    title: "FAQ e solução de problemas",
    icon: LifeBuoy,
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
        <div>
          <p className="font-semibold text-text">Meu dashboard mostra dados que não são meus.</p>
          <p>
            São dados de exemplo. Conecte uma fonte (CSV, Excel, Google Sheets ou webhook) pelo
            botão "Conectar dados" no editor.
          </p>
        </div>
        <div>
          <p className="font-semibold text-text">A geração falhou ou ficou em "Erro".</p>
          <p>
            Verifique se há uma API Key válida em "Configurações → IA". Se sim, tente criar um novo
            dashboard com o mesmo prompt — a IA pode ter atingido um timeout pontual.
          </p>
        </div>
        <div>
          <p className="font-semibold text-text">Aparece o aviso "API Key não configurada".</p>
          <p>
            Vá em "Configurações → IA", escolha o provedor e cole sua chave — o formato esperado
            aparece no próprio campo —, depois clique em "Salvar".
          </p>
        </div>
        <div>
          <p className="font-semibold text-text">Não recebo os emails de alerta.</p>
          {/* A tela se chama "Alertas", não "Alerts". E faltava a causa mais silenciosa:
              sem a chave da Resend o envio nem tenta — o servidor só registra um aviso no
              log e o alerta consta como disparado, então o usuário procurava no lugar
              errado. */}
          <p>
            Verifique a caixa de spam e confirme que o alerta está marcado como ativo na tela
            "Alertas". Se o alerta consta como disparado e nada chegou, peça a um administrador para
            conferir a chave da Resend em Administração → Instalação: sem ela o e-mail não sai. O
            cron roda a cada 15 minutos, então pode haver um pequeno delay entre o disparo e o
            email.
          </p>
        </div>
        <div>
          <p className="font-semibold text-text">Limites e quotas.</p>
          <p>
            Datasets de até 100.000 linhas por fonte no plano Pro. Geração de dashboards é otimizada
            para 95% das execuções abaixo de 30 segundos.
          </p>
        </div>
      </div>
    ),
  },
];

function HelpPage() {
  const revenuePP = useRevenuePP();
  if (revenuePP) return <HelpPageRpp />;
  return (
    <AppShell>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
            Ajuda
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Guia completo de todas as funcionalidades, fluxos e configurações do sistema.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sumário lateral */}
        <aside className="hidden lg:block">
          <nav className="sticky top-8 space-y-1">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Sumário
            </p>
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text"
              >
                <section.icon className="h-4 w-4 shrink-0" />
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Conteúdo */}
        <div className="min-w-0">
          <Accordion type="multiple" defaultValue={SECTIONS.map((s) => s.id)} className="space-y-3">
            {SECTIONS.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                id={section.id}
                className="scroll-mt-8 rounded-xl border border-border bg-surface px-5"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-3 text-base font-semibold text-text">
                    <section.icon className="h-5 w-5 text-primary" />
                    {section.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{section.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start gap-3">
              <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-text">Pronto para começar?</p>
                <p className="text-sm text-text-secondary">
                  Crie seu primeiro dashboard em menos de dois minutos.
                </p>
              </div>
            </div>
            <Link
              to="/dashboards"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ir para Dashboards
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ==========================================================================
 * Revenue++ · Ajuda no padrão das outras telas: eyebrow + título, busca,
 * atalhos para o que mais se pergunta, sumário que marca onde você está e
 * seções em cards com o mesmo ritmo do resto do produto.
 * ======================================================================== */

/** As perguntas que trazem alguém à Ajuda, cada uma levando direto à seção. */
const COMMON: { q: string; section: string }[] = [
  { q: "Como crio meu primeiro dashboard?", section: "criando-dashboards" },
  { q: "Como conecto uma planilha ou CSV?", section: "fontes" },
  { q: "Como recebo um alerta por e-mail?", section: "alertas" },
  { q: "O dashboard mostra dados que não são meus", section: "faq" },
];

function HelpPageRpp() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(SECTIONS[0].id);
  // texto de cada seção, lido do DOM: o conteúdo é JSX, não string
  const [texts, setTexts] = useState<Record<string, string>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const sec of SECTIONS) {
      next[sec.id] = normalize(`${sec.title} ${refs.current[sec.id]?.textContent ?? ""}`);
    }
    setTexts(next);
  }, []);

  // sumário acompanha a rolagem: a seção mais alta ainda visível fica marcada
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px" },
    );
    for (const el of Object.values(refs.current)) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const q = normalize(query.trim());
  const shown = useMemo(
    () => (q ? SECTIONS.filter((sec) => (texts[sec.id] ?? "").includes(q)) : SECTIONS),
    [q, texts],
  );

  function go(id: string) {
    setQuery("");
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
          Conta
        </p>
        <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
          Ajuda
        </h1>
        <p className="mt-1 text-sm text-[var(--via-text-muted)]">
          O que o My Dashboard faz, onde fica cada coisa e o que fazer quando algo não funciona.
        </p>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--via-text-soft)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar na ajuda: planilha, alerta, compartilhar…"
            aria-label="Buscar na ajuda"
            className="h-11 pl-10"
          />
        </div>

        {!q && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {COMMON.map((c) => (
              <button
                key={c.q}
                type="button"
                onClick={() => go(c.section)}
                className="group flex items-center justify-between gap-3 rounded-[var(--via-radius-md)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] px-4 py-3 text-left text-sm text-[var(--via-text-primary)] transition-colors hover:border-[var(--via-navy-20)]"
              >
                {c.q}
                <span className="text-[var(--via-text-soft)] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <nav aria-label="Sumário" className="hidden lg:block">
            <div className="sticky top-8 space-y-0.5">
              <p className="mb-2 px-3 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
                Sumário
              </p>
              {SECTIONS.map((sec) => {
                const on = !q && active === sec.id;
                const dim = q && !shown.includes(sec);
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[var(--via-radius-sm)] px-3 py-2 text-sm transition-colors",
                      on
                        ? "bg-[var(--via-navy-04)] font-medium text-[var(--via-text-primary)]"
                        : "text-[var(--via-text-muted)] hover:bg-[var(--via-navy-02)] hover:text-[var(--via-text-primary)]",
                      dim && "opacity-40",
                    )}
                  >
                    <sec.icon className="h-4 w-4 shrink-0" />
                    <span>{sec.title}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="min-w-0 space-y-4">
            {q && (
              <p className="text-sm text-[var(--via-text-muted)]">
                {shown.length === 0
                  ? `Nada encontrado para "${query.trim()}".`
                  : `${shown.length} ${shown.length === 1 ? "seção fala" : "seções falam"} de "${query.trim()}".`}
              </p>
            )}
            {SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                ref={(el) => {
                  refs.current[sec.id] = el;
                }}
                hidden={!shown.includes(sec)}
                className="scroll-mt-8 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] bg-[var(--via-navy-04)] text-[var(--via-navy)]">
                    <sec.icon className="h-[18px] w-[18px]" />
                  </span>
                  <h2 className="text-lg font-medium tracking-[-0.015em] text-[var(--via-text-primary)]">
                    {sec.title}
                  </h2>
                </div>
                <div className="ds-help-body">{sec.content}</div>
              </section>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)] p-6">
              <div>
                <p className="text-base font-medium text-[var(--via-text-primary)]">
                  Não achou o que procurava?
                </p>
                <p className="mt-0.5 text-sm text-[var(--via-text-muted)]">
                  O jeito mais rápido de entender é criar um dashboard e mexer nele.
                </p>
              </div>
              <Link to="/dashboards">
                <Button>Ir para Dashboards</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
