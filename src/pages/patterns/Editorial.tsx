import { ArrowRight, Bookmark, ChevronRight, Clock, Headphones, MessageCircle, Play, ThumbsUp } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import monogram from '../../assets/logos/VIA_monogram_hq.png';
import wordmarkBlack from '../../assets/logos/VIVER_DE_IA_black.png';
import './editorial.css';

/* ============================================================
   Editorial / content · newsletter + blog + podcast + YouTube + tutorial
   ============================================================ */

export default function Editorial() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · editorial / content"
        title={
          <>
            Conteúdo editorial <em>com peso de carta</em>.
          </>
        }
        lede="Newsletter, blog post, podcast notes, YouTube description, tutorial how-to. Cada formato com sua voz, hierarquia e CTA. Tom de crônica-operacional · sem '5 dicas infalíveis' · sem curadoria genérica."
      />

      <NewsletterSection />
      <BlogPostSection />
      <PodcastNotesSection />
      <YoutubeDescriptionSection />
      <TutorialSection />
    </>
  );
}

/* ---------- Newsletter ---------- */
function NewsletterSection() {
  return (
    <Section
      title="Newsletter · 4-5 sections · crônica-operacional"
      meta="hero editorial + 3 sections + sign-off · 1 envio por semana"
    >
      <article className="vds-ed-newsletter">
        <header>
          <img src={wordmarkBlack} alt="Viver de IA" />
          <span className="vds-ed-nl-edition mono">edição 42 · dom 18 mai 2026</span>
        </header>

        <div className="vds-ed-nl-hero via-mesh-navy via-noise">
          <span className="vds-ed-nl-eyebrow">Semana 18 · operação Nina</span>
          <h2>
            A Nina passou de 11k pra 13k<br />
            conversas. <em>2 detalhes mudaram tudo.</em>
          </h2>
          <p>operação Viver de IA · 7 dias · medido contra a mesma cohort</p>
        </div>

        <div className="vds-ed-nl-body">
          <article>
            <span className="vds-ed-nl-section-eyebrow">o que aconteceu</span>
            <p>
              tava acontecendo de a Nina perder ~40% das conversas no primeiro turno. lead
              entrava, ela respondia, e o lead simplesmente não voltava. eu ficava olhando o
              gráfico pensando "deve ser prompt".
            </p>
            <p>
              <strong>Não era prompt.</strong> Era 2 coisas: latência da resposta — a Nina
              tava demorando 28s no primeiro turno · e o tom dela tava consultivo demais
              quando o lead só queria saber preço.
            </p>
          </article>

          <article>
            <span className="vds-ed-nl-section-eyebrow">o que mudei</span>
            <p>
              cache do contexto inicial pra dropar latência pra 4s · e o prompt do primeiro
              turno virou "leitor de intent" antes de "vendedor". <strong>2k conversas
              adicionais em 7 dias.</strong>
            </p>
            <div className="vds-ed-nl-pull">
              <strong className="mono">+18% conversão · 4s vs 28s latência</strong>
            </div>
          </article>

          <article>
            <span className="vds-ed-nl-section-eyebrow">o que vale anotar pra ti</span>
            <p>
              latência percebida no primeiro turno é o número que mais subestima impacto.
              mede o teu agora. se passa de 8s, o lead já tá indo embora antes da resposta.
            </p>
            <p>
              segundo: cuidado com agente "consultivo" no turno 1. responde a intent antes de
              consultoria · educa o ritmo e ele volta pra segunda pergunta.
            </p>
          </article>

          <article className="vds-ed-nl-cta">
            <a href="#" className="vds-ed-nl-link-arrow">
              ver o código que reduziu a latência
              <ArrowRight size={12} strokeWidth={2.4} />
            </a>
          </article>

          <p className="vds-ed-nl-sign">
            até domingo,<br />
            <strong>Caio</strong>
          </p>
        </div>

        <footer>
          <img src={monogram} alt="" />
          <p>
            <strong>Viver de IA</strong> · operadores formando operadores · São Paulo, BR
          </p>
          <p className="vds-ed-nl-foot-links">
            <a href="#">Atualizar preferências</a>
            <span>·</span>
            <a href="#">Não quero mais</a>
          </p>
        </footer>
      </article>
    </Section>
  );
}

/* ---------- Blog post ---------- */
function BlogPostSection() {
  return (
    <Section
      title="Blog post · article layout"
      meta="hero + meta + corpo editorial + sidebar com TOC · publishable em 2 cliques"
    >
      <article className="vds-ed-blog">
        <header>
          <span className="vds-ed-blog-cat">Cases · operação Nina</span>
          <h1>
            Como reduzi <em>73% do token</em> de um agente de proposta sem trocar de modelo.
          </h1>
          <p className="vds-ed-blog-lede">
            Auditoria de prompt, schema validation, contexto dinâmico. 3 mudanças que pagaram
            o programa em 2 meses pra Camila Moraes da Mantra Tech.
          </p>
          <div className="vds-ed-blog-meta">
            <div className="vds-ed-blog-author">
              <div className="av">CR</div>
              <div>
                <strong>Caio Ribeiro</strong>
                <em>fundador · Viver de IA</em>
              </div>
            </div>
            <div className="vds-ed-blog-meta-r">
              <span>18 mai 2026</span>
              <span><Clock size={11} strokeWidth={1.8} /> 8 min</span>
            </div>
          </div>
        </header>

        <div className="vds-ed-blog-grid">
          <div className="vds-ed-blog-body">
            <p>
              A Camila Moraes (CTO da Mantra Tech, fintech B2B, 12 pessoas no time) construiu
              primeiro agente em fev 2026 dentro da turma 2025.3. Caso de uso: gerar proposta
              comercial customizada por lead.
            </p>
            <p>
              Funcionou bem · mas custou <strong>8.400 tokens por proposta</strong>. Com 800
              propostas/mês, isso era ~R$ 960/mês só de API. Margem do agente ficou marginal,
              ela tava pensando em matar.
            </p>

            <h2>O que ela trouxe pra mentoria</h2>
            <p>
              Na sessão 1:1 ela trouxe esperando ouvir "muda o modelo pra um mais barato".
              Eu mostrei que o problema não era o modelo. Era o contexto carregando coisa que
              cada proposta não precisava.
            </p>

            <h2>3 mudanças aplicadas</h2>
            <p>Cada uma testada isoladamente pra medir impacto real:</p>
            <ol>
              <li><strong>Auditoria do system prompt</strong> · cortou 40% do contexto repetido</li>
              <li><strong>Schema validation pra saída JSON</strong> · removeu retry loop</li>
              <li><strong>Contexto dinâmico por tipo de lead</strong> · só carrega o necessário</li>
            </ol>

            <h2>Resultado mensurado contra mesma cohort</h2>
            <p>
              8.400 → 2.260 tokens/proposta. <strong>73% menos.</strong> Custo mensal API
              caiu de R$ 960 pra R$ 261. ROI do programa Viver de IA fechou em 2 meses.
            </p>

            <blockquote>
              "Sem essa mentoria eu teria matado o agente. Hoje ele paga o programa."<br />
              <cite>— Camila Moraes</cite>
            </blockquote>
          </div>

          <aside className="vds-ed-blog-toc">
            <span className="vds-ed-blog-toc-eyebrow">nesta página</span>
            <ol>
              <li><a href="#trouxe">O que ela trouxe</a></li>
              <li><a href="#mudancas">3 mudanças aplicadas</a></li>
              <li><a href="#resultado">Resultado mensurado</a></li>
            </ol>
            <div className="vds-ed-blog-share">
              <button aria-label="Curtir"><ThumbsUp size={13} strokeWidth={1.8} /></button>
              <button aria-label="Comentar"><MessageCircle size={13} strokeWidth={1.8} /></button>
              <button aria-label="Salvar"><Bookmark size={13} strokeWidth={1.8} /></button>
            </div>
          </aside>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Podcast notes ---------- */
function PodcastNotesSection() {
  return (
    <Section
      title="Podcast · show notes · descrição do episódio"
      meta="hero + timestamps + recursos · descrição publicável em Spotify/Apple/RSS"
    >
      <article className="vds-ed-podcast">
        <header>
          <div className="vds-ed-podcast-cover via-mesh-navy via-noise">
            <span className="vds-ed-podcast-cover-eyebrow">ep 18 · 42min</span>
            <h3>
              Construindo Nina:<br />
              <em>3 erros e o que mudou</em>
            </h3>
            <img src={monogramWhite} alt="" />
          </div>
          <div className="vds-ed-podcast-meta">
            <span className="vds-ed-podcast-tag">
              <Headphones size={11} strokeWidth={2.2} />
              episódio 18
            </span>
            <h2>
              Construindo Nina · 3 erros e o que mudou
            </h2>
            <p>
              7 meses construindo agente em produção. 3 cicatrizes que valem ouro. Conversa
              com Caio Ribeiro sobre o que ele mudaria se começasse hoje · sem teoria de
              palestra.
            </p>
            <div className="vds-ed-podcast-where">
              <a href="#"><Play size={11} strokeWidth={2.4} /> Spotify</a>
              <a href="#"><Play size={11} strokeWidth={2.4} /> Apple</a>
              <a href="#"><Play size={11} strokeWidth={2.4} /> YouTube</a>
              <a href="#"><Play size={11} strokeWidth={2.4} /> RSS feed</a>
            </div>
          </div>
        </header>

        <section>
          <h3>Timestamps</h3>
          <ol className="vds-ed-podcast-timestamps">
            <li>
              <span className="t mono">00:00</span>
              <div>
                <strong>Intro</strong>
                <em>contexto · 7 meses construindo a Nina · 11.920 conversas/mês</em>
              </div>
            </li>
            <li>
              <span className="t mono">02:14</span>
              <div>
                <strong>Erro 1 · achei que era prompt</strong>
                <em>3 dias debugando o prompt antes de descobrir que era latência</em>
              </div>
            </li>
            <li>
              <span className="t mono">14:32</span>
              <div>
                <strong>Erro 2 · agente consultivo demais no turno 1</strong>
                <em>lead chegava com intent claro, ela respondia com curadoria genérica</em>
              </div>
            </li>
            <li>
              <span className="t mono">28:08</span>
              <div>
                <strong>Erro 3 · sem instrumentação até a virada</strong>
                <em>construí 4 meses cego · primeira métrica veio quando já tava degradando</em>
              </div>
            </li>
            <li>
              <span className="t mono">38:42</span>
              <div>
                <strong>O que mudaria se começasse hoje</strong>
                <em>3 ações concretas pra quem tá construindo agora</em>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h3>Recursos citados</h3>
          <ul className="vds-ed-podcast-resources">
            <li>
              <span className="vds-ed-podcast-res-eyebrow">case</span>
              <a href="#">Camila Moraes · token -73% sem trocar modelo</a>
            </li>
            <li>
              <span className="vds-ed-podcast-res-eyebrow">código</span>
              <a href="#">Snippet de circuit breaker pra retry exponencial</a>
            </li>
            <li>
              <span className="vds-ed-podcast-res-eyebrow">programa</span>
              <a href="#">Turma 2026.3 · abre 22 mai · 30 vagas</a>
            </li>
          </ul>
        </section>
      </article>
    </Section>
  );
}

/* ---------- YouTube description ---------- */
function YoutubeDescriptionSection() {
  return (
    <Section
      title="YouTube · descrição do vídeo · publishable"
      meta="primeira linha = hook · timestamps · links · CTAs · hashtags no fim"
    >
      <article className="vds-ed-youtube">
        <div className="vds-ed-youtube-thumb via-mesh-navy via-noise">
          <h3>Auditando <em>3 prompts</em> ao vivo.</h3>
          <p>turma 2026.2 · cases reais</p>
          <img src={monogramWhite} alt="" />
          <span className="vds-ed-youtube-duration mono">1:24:18</span>
          <button className="vds-ed-youtube-play" aria-label="Reproduzir">
            <Play size={32} strokeWidth={0} fill="white" />
          </button>
        </div>

        <div className="vds-ed-youtube-info">
          <h2>Auditando 3 prompts ao vivo · live ep 18 · turma 2026.2</h2>
          <div className="vds-ed-youtube-meta">
            <span>1.247 visualizações · 19 mai 2026</span>
            <button><ThumbsUp size={13} strokeWidth={2} /> 184</button>
            <button><Bookmark size={13} strokeWidth={2} /> Salvar</button>
          </div>

          <div className="vds-ed-youtube-desc">
            <p>
              <strong>3 alunos postaram prompts antes da live · audito ao vivo expondo o que
              mudaria + por quê.</strong> Cada caso ~25min · sala faz pergunta no fim de cada.
              Quem assistir leva o método de auditoria pra rodar nos próprios prompts.
            </p>

            <pre className="vds-ed-youtube-pre">{`📍 Timestamps
00:00 — Intro · contexto da live
12:08 — Caso 1 · prompt João · SDR fintech
34:51 — Caso 2 · prompt Camila · auto-proposta
58:22 — Caso 3 · prompt Daniel · onboarding cliente
01:18:42 — Q&A final + próxima live

🔗 Links citados
• Turma 2026.3 — viverdeia.ai/turma
• Newsletter semanal — viverdeia.ai/newsletter
• Casos completos — viverdeia.ai/cases

💬 Próxima live
sex 23 mai · 14h · review de "build do mês"
Posta no Discord até quarta pra ser auditado.

#viverdeia #operadoresdeia #agentes`}</pre>

            <a href="#" className="vds-ed-youtube-subscribe">
              Inscreva-se
              <ChevronRight size={11} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Tutorial / how-to ---------- */
function TutorialSection() {
  return (
    <Section
      title="Tutorial · how-to · step-by-step editorial"
      meta="objetivo + pré-requisitos + steps numerados + verificação · estrutura repetível"
    >
      <article className="vds-ed-tutorial">
        <header>
          <span className="vds-ed-tutorial-cat">Tutorial · operação</span>
          <h1>
            Como medir <em>latência percebida</em> do primeiro turno do teu agente.
          </h1>
          <p className="vds-ed-tutorial-lede">
            10 minutos. Sem instrumentar nada novo. Só preciso de logs do que já tá rodando.
            No fim você vai ter um número que muda decisão sobre o que otimizar primeiro.
          </p>

          <div className="vds-ed-tutorial-meta">
            <div>
              <span className="lbl">Duração</span>
              <strong>10 min</strong>
            </div>
            <div>
              <span className="lbl">Nível</span>
              <strong>Operador iniciante+</strong>
            </div>
            <div>
              <span className="lbl">Pré-requisito</span>
              <strong>Acesso aos logs do agente</strong>
            </div>
          </div>
        </header>

        <section>
          <h2>O que você vai fazer</h2>
          <ol className="vds-ed-tutorial-toc">
            <li>Extrair os logs do último mês</li>
            <li>Calcular delta entre "lead enviou" e "agente respondeu"</li>
            <li>Filtrar só primeiros turnos (não conversas inteiras)</li>
            <li>Comparar média + p95 contra o benchmark</li>
            <li>Plotar timeline pra ver tendência</li>
          </ol>
        </section>

        <section>
          <h2>Step 1 · extrair os logs</h2>
          <p>
            Acessa o painel do teu provider (OpenAI · Anthropic · Vercel AI). Exporta logs
            do último mês como CSV ou JSON. Se for plataforma proprietária, normalmente tem
            endpoint <code className="mono">/logs?from=...&amp;to=...</code>.
          </p>

          <h2>Step 2 · calcular delta de latência</h2>
          <p>
            Cada linha precisa ter ao menos <strong>timestamp_in</strong> (lead enviou) e
            <strong> timestamp_out</strong> (agente respondeu). Delta = out - in (em ms).
          </p>
          <pre className="vds-ed-tutorial-code">{`# python
import pandas as pd
df = pd.read_csv('logs.csv')
df['latencia_ms'] = (df['timestamp_out'] - df['timestamp_in']) * 1000`}</pre>

          <h2>Step 3 · filtrar primeiros turnos</h2>
          <p>
            Conversas inteiras incluem turnos onde o lead já está engajado · latência aí
            tolera mais. Você quer só o primeiro turno (turn 1 ou turn = 1).
          </p>

          <h2>Step 4 · média + p95</h2>
          <p>
            Não olha só média. <strong>p95</strong> mostra os 5% piores casos. Se p95 passa
            de 15s, tá perdendo lead que tem pressa.
          </p>
        </section>

        <section className="vds-ed-tutorial-verify">
          <span className="vds-ed-tutorial-verify-eyebrow">verificação · você terminou se</span>
          <ul>
            <li>Tem 1 número (média) e 1 número (p95) de latência do primeiro turno</li>
            <li>Plotou timeline diária do último mês · vê se tá subindo</li>
            <li>Comparou contra benchmark · &lt;8s ok · 8-15s atenção · &gt;15s problema</li>
          </ul>
        </section>

        <footer>
          <p>
            <strong>Próximo tutorial:</strong> como reduzir latência percebida sem trocar
            modelo (cache de contexto + warm-up + streaming).
          </p>
          <a href="#">Ver próximo <ArrowRight size={13} strokeWidth={2.4} /></a>
        </footer>
      </article>
    </Section>
  );
}
