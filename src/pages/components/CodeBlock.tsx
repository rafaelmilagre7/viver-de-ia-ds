import { useState } from 'react';
import { Copy, Check, Terminal as TerminalIcon, GitBranch, Maximize2, FileCode } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './code-block.css';

export default function CodeBlock() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · code, terminal, diff"
        title={
          <>
            UI técnica <em>tratada como peça da marca</em>.
          </>
        }
        lede="Code blocks, terminais e diffs são onde a aula vira execução. Cada um desenhado com tipografia mono ritmada, paleta navy editorial nos dois modos (claro e escuro), header com nome de arquivo e ações sutis. Pronto pra documentar qualquer trecho técnico sem perder o tom."
      />

      <CodeLightSection />
      <CodeDarkSection />
      <TerminalSection />
      <DiffSection />
    </>
  );
}

/* ---------- Code · light variant ---------- */
function CodeLightSection() {
  const [copied, setCopied] = useState(false);
  const code = [
    { ln: 1, content: <><span className="k">import</span> {'{ '}<span className="v">openai</span>{' }'} <span className="k">from</span> <span className="s">"@openai/client"</span>;</> },
    { ln: 2, content: <></> },
    { ln: 3, content: <><span className="c">// few-shot · 3 exemplos canônicos</span></> },
    { ln: 4, content: <><span className="k">const</span> <span className="v">examples</span> = [</> },
    { ln: 5, content: <>{'  '}{'{'} <span className="p">input</span>: <span className="s">"Quero cancelar"</span>, <span className="p">tag</span>: <span className="s">"churn-risk"</span> {'}'},</> },
    { ln: 6, content: <>{'  '}{'{'} <span className="p">input</span>: <span className="s">"Posso adiar 10 dias?"</span>, <span className="p">tag</span>: <span className="s">"payment-delay"</span> {'}'},</> },
    { ln: 7, content: <>{'  '}{'{'} <span className="p">input</span>: <span className="s">"Adorei a aula 03"</span>, <span className="p">tag</span>: <span className="s">"praise"</span> {'}'},</> },
    { ln: 8, content: <>];</> },
    { ln: 9, content: <></> },
    { ln: 10, content: <><span className="k">export async function</span> <span className="f">classify</span>(message: <span className="t">string</span>) {'{'}</>, active: true },
    { ln: 11, content: <>{'  '}<span className="k">const</span> <span className="v">res</span> = <span className="k">await</span> openai.<span className="f">chat</span>({'{'}</> },
    { ln: 12, content: <>{'    '}<span className="p">model</span>: <span className="s">"claude-opus-4-7"</span>,</> },
    { ln: 13, content: <>{'    '}<span className="p">messages</span>: [<span className="v">systemPrompt</span>, ...examples, {'{ '}<span className="p">role</span>: <span className="s">"user"</span>, <span className="p">content</span>: message {'}'}],</> },
    { ln: 14, content: <>{'  '}{'}'});</> },
    { ln: 15, content: <>{'  '}<span className="k">return</span> res.choices[<span className="n">0</span>].message.content;</> },
    { ln: 16, content: <>{'}'}</> },
  ];

  return (
    <Section title="Code block · variante clara" meta="docs · embed em artigo · trecho citado">
      <div className="vds-code light">
        <header className="vds-code-head">
          <span className="vds-code-icon"><FileCode size={13} strokeWidth={2} /></span>
          <span className="vds-code-path">
            <em>meu-agente /</em> src / agents / classifier.ts
          </span>
          <span className="vds-code-lang">TypeScript</span>
          <button className="vds-code-copy" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }}>
            {copied ? <><Check size={12} strokeWidth={2.6} /> Copiado</> : <><Copy size={12} strokeWidth={2} /> Copiar</>}
          </button>
        </header>

        <pre className="vds-code-pre">
          {code.map((l) => (
            <div key={l.ln} className={`vds-code-line ${l.active ? 'active' : ''}`}>
              <span className="vds-code-ln">{l.ln}</span>
              <span className="vds-code-content">{l.content}</span>
            </div>
          ))}
        </pre>
      </div>
    </Section>
  );
}

/* ---------- Code · dark variant ---------- */
function CodeDarkSection() {
  return (
    <Section title="Code block · variante escura" meta="apresentação · slide deck · aula gravada">
      <div className="vds-code dark via-mesh-navy via-noise">
        <header className="vds-code-head dark">
          <span className="vds-code-icon"><FileCode size={13} strokeWidth={2} /></span>
          <span className="vds-code-path">
            <em>meu-agente /</em> prompts / SOUL.md
          </span>
          <span className="vds-code-lang dark">Markdown</span>
          <button className="vds-code-copy dark">
            <Copy size={12} strokeWidth={2} /> Copiar
          </button>
        </header>

        <pre className="vds-code-pre dark">
          <div className="vds-code-line"><span className="vds-code-ln">1</span><span className="vds-code-content"><span className="h">## Sobre quem você é</span></span></div>
          <div className="vds-code-line"><span className="vds-code-ln">2</span><span className="vds-code-content"></span></div>
          <div className="vds-code-line"><span className="vds-code-ln">3</span><span className="vds-code-content">Você é a <span className="b">Íris</span> — sócia executiva da Viver de IA, não assistente.</span></div>
          <div className="vds-code-line"><span className="vds-code-ln">4</span><span className="vds-code-content">Sua função é <span className="i">operar com Rafael</span>, não tirar dúvida.</span></div>
          <div className="vds-code-line"><span className="vds-code-ln">5</span><span className="vds-code-content"></span></div>
          <div className="vds-code-line"><span className="vds-code-ln">6</span><span className="vds-code-content"><span className="h">### Regras invioláveis</span></span></div>
          <div className="vds-code-line"><span className="vds-code-ln">7</span><span className="vds-code-content"></span></div>
          <div className="vds-code-line active"><span className="vds-code-ln">8</span><span className="vds-code-content">- Mensagens públicas <span className="b">SEM</span> jargão técnico, IDs, ou checklist.</span></div>
          <div className="vds-code-line"><span className="vds-code-ln">9</span><span className="vds-code-content">- Criação de cron: <span className="b">apenas admins</span> autorizam.</span></div>
          <div className="vds-code-line"><span className="vds-code-ln">10</span><span className="vds-code-content">- Em caso de dúvida sobre escopo: <span className="i">pergunta primeiro</span>.</span></div>
        </pre>
      </div>
    </Section>
  );
}

/* ---------- Terminal ---------- */
function TerminalSection() {
  return (
    <Section title="Terminal · output editorial" meta="aula gravada · screencast · demo no slide deck">
      <div className="vds-terminal">
        <header className="vds-terminal-head">
          <div className="vds-terminal-dots">
            <span /><span /><span />
          </div>
          <span className="vds-terminal-title">
            <TerminalIcon size={11} strokeWidth={2} />
            zsh · ~/meu-agente
          </span>
          <button aria-label="Tela cheia" className="vds-terminal-max">
            <Maximize2 size={12} strokeWidth={2} />
          </button>
        </header>

        <div className="vds-terminal-body">
          <div className="row">
            <span className="prompt">dev@vps</span>
            <span className="path">~/meu-agente</span>
            <span className="sep">$</span>
            <span className="cmd">bun run deploy</span>
          </div>
          <div className="row out">
            <span className="out-line"><span className="ok">✓</span> bundle hash <b>4f2a9c</b> · 184 KB gzip</span>
            <span className="out-line"><span className="ok">✓</span> uploading to Cloudflare Workers · meu-app.com</span>
            <span className="out-line"><span className="ok">✓</span> deployment <b>v428</b> live in <b>1.4s</b></span>
            <span className="out-line muted">→ inspect at https://dash.cloudflare.com/meu-agente</span>
          </div>

          <div className="row">
            <span className="prompt">dev@vps</span>
            <span className="path">~/meu-agente</span>
            <span className="sep">$</span>
            <span className="cmd">curl -sS https://meu-app.com/health | jq .version</span>
          </div>
          <div className="row out">
            <span className="out-line">"4.7.1"</span>
          </div>

          <div className="row">
            <span className="prompt">dev@vps</span>
            <span className="path">~/meu-agente</span>
            <span className="sep">$</span>
            <span className="cmd">_<span className="cursor" /></span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Diff viewer ---------- */
function DiffSection() {
  return (
    <Section title="Diff viewer · revisão lado a lado" meta="pull request · aula sobre refactor · code review">
      <div className="vds-diff">
        <header className="vds-diff-head">
          <span className="vds-diff-icon"><GitBranch size={13} strokeWidth={2} /></span>
          <span className="vds-diff-meta">
            <strong>prompts / classifier.ts</strong>
            <em>+8 / −5 · 2 minutos atrás · Caio Ribeiro</em>
          </span>
          <span className="vds-diff-stats">
            <span className="add">+8</span>
            <span className="del">−5</span>
          </span>
        </header>

        <div className="vds-diff-body">
          <div className="vds-diff-col">
            <div className="vds-diff-colhead">
              <span className="pill old">Antes</span>
              <span className="meta">commit a4f29</span>
            </div>
            <pre>
              <div className="vds-diff-line"><span className="ln">11</span><span>messages: [</span></div>
              <div className="vds-diff-line del"><span className="ln">12</span><span>  systemPrompt,</span></div>
              <div className="vds-diff-line del"><span className="ln">13</span><span>  {'{ role: "user", content: message }'},</span></div>
              <div className="vds-diff-line"><span className="ln">14</span><span>]</span></div>
              <div className="vds-diff-line"><span className="ln">15</span><span>{'}'}.</span></div>
              <div className="vds-diff-line del"><span className="ln">16</span><span>model: "gpt-3.5-turbo",</span></div>
              <div className="vds-diff-line"><span className="ln">17</span><span>temperature: 0.2,</span></div>
              <div className="vds-diff-line del"><span className="ln">18</span><span>max_tokens: 800,</span></div>
              <div className="vds-diff-line del"><span className="ln">19</span><span>// TODO: revisitar</span></div>
            </pre>
          </div>

          <div className="vds-diff-col">
            <div className="vds-diff-colhead">
              <span className="pill new">Depois</span>
              <span className="meta">commit 4f2a9c</span>
            </div>
            <pre>
              <div className="vds-diff-line"><span className="ln">11</span><span>messages: [</span></div>
              <div className="vds-diff-line add"><span className="ln">12</span><span>  systemPrompt,</span></div>
              <div className="vds-diff-line add"><span className="ln">13</span><span>  ...examples,</span></div>
              <div className="vds-diff-line add"><span className="ln">14</span><span>  {'{ role: "user", content: message }'},</span></div>
              <div className="vds-diff-line"><span className="ln">15</span><span>]</span></div>
              <div className="vds-diff-line"><span className="ln">16</span><span>{'}'}.</span></div>
              <div className="vds-diff-line add"><span className="ln">17</span><span>model: "claude-opus-4-7",</span></div>
              <div className="vds-diff-line"><span className="ln">18</span><span>temperature: 0.2,</span></div>
              <div className="vds-diff-line add"><span className="ln">19</span><span>max_tokens: 2048,</span></div>
              <div className="vds-diff-line add"><span className="ln">20</span><span>response_format: {'{ type: "json_object" }'},</span></div>
            </pre>
          </div>
        </div>

        <footer className="vds-diff-foot">
          <span>Trocamos o modelo, adicionamos few-shot e fixamos o formato em JSON — 3 mudanças, uma direção.</span>
        </footer>
      </div>
    </Section>
  );
}
