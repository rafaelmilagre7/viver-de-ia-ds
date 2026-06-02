import { useState } from 'react';
import { Copy, Check, FileText, Package, Terminal, ArrowUpRight, Megaphone, PenTool, Code2, MessageCircle } from 'lucide-react';
import DocsHeader from '../components/docs/DocsHeader';
import Section from '../components/docs/Section';
import promptText from '../../docs/system-prompt.md?raw';
import './distribute.css';

type Tool = {
  name: string;
  tag: string;
  steps: string[];
};

const tools: Tool[] = [
  {
    name: 'Claude (claude.ai / Projects)',
    tag: 'upload',
    steps: [
      'Crie um Project novo.',
      'Suba o kit (.zip) ou cole o prompt-mestre em “Project instructions”.',
      'Peça o que quiser — ela já segue o padrão Viver de IA.',
    ],
  },
  {
    name: 'ChatGPT (Custom GPT / instructions)',
    tag: 'colar',
    steps: [
      'Em “Custom instructions” (ou ao criar um GPT), cole o prompt-mestre.',
      'Anexe o .zip se quiser tokens + logos + exemplos.',
      'Gere emails, posts, landing, deck — tudo no padrão.',
    ],
  },
  {
    name: 'Lovable',
    tag: 'knowledge',
    steps: [
      'Em Project Settings → Knowledge, cole o prompt-mestre.',
      'Para apps React, mencione “use @viverdeia/design-system + ThemeProvider”.',
      'O que ela construir já vem com dark mode + contraste AA.',
    ],
  },
  {
    name: 'Cursor',
    tag: '.cursorrules',
    steps: [
      'Baixe o prompt (.md) e salve como .cursorrules na raiz do projeto.',
      'Ou cole em Settings → Rules for AI.',
      'O Cursor aplica o padrão em todo código que gerar.',
    ],
  },
  {
    name: 'Claude Code',
    tag: 'plugin · 2 comandos',
    steps: [
      '/plugin marketplace add rafaelmilagre7/viver-de-ia-ds',
      '/plugin install viver-de-ia@viver-de-ia-ds',
      'Pronto — use /via, /via-email, /via-landing, /via-deck, /via-check.',
    ],
  },
];

type Role = { role: string; icon: React.ReactNode; what: string; cta: string };

const roles: Role[] = [
  {
    role: 'Marketing / conteúdo',
    icon: <Megaphone size={18} strokeWidth={1.8} />,
    what: 'Email, post, anúncio, landing, newsletter.',
    cta: 'Copie o prompt-mestre (logo abaixo) → cole no ChatGPT ou Lovable → peça em português. Sai no padrão.',
  },
  {
    role: 'Design / produto',
    icon: <PenTool size={18} strokeWidth={1.8} />,
    what: 'Telas, protótipos, mockups.',
    cta: 'Navegue o site de referência pra ver tudo pronto, ou use o Lovable com o prompt. Cores, tipografia e componentes já alinhados.',
  },
  {
    role: 'Desenvolvimento',
    icon: <Code2 size={18} strokeWidth={1.8} />,
    what: 'App, plataforma, landing em código.',
    cta: 'No Claude Code: instale o plugin (2 comandos, na seção abaixo). Ou consuma a library React + tokens.',
  },
  {
    role: 'Qualquer um · qualquer IA',
    icon: <MessageCircle size={18} strokeWidth={1.8} />,
    what: 'Na dúvida, ou em outra ferramenta.',
    cta: 'Cole o prompt-mestre em QUALQUER IA e descreva o que quer. Ela já segue a marca.',
  },
];

export default function Distribute() {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard bloqueado — usuário pode baixar o .md */
    }
  };

  return (
    <>
      <DocsHeader
        eyebrow="Compartilhar · qualquer IA"
        title={
          <>
            Use o Viver de IA em <em>qualquer IA</em>.
          </>
        }
        lede="Um padrão, todas as ferramentas — pro time inteiro. Seja você do marketing, do design ou dev: cole o prompt-mestre (ou suba o kit) no Claude, ChatGPT, Lovable ou Cursor, e tudo que a IA gerar sai no padrão Viver de IA — paleta restrita, voz editorial, dark mode e contraste AA nos dois temas."
      />

      <Section title="Comece pelo seu trabalho" meta="ache seu caso">
        <div className="vds-dist-roles">
          {roles.map((r) => (
            <article key={r.role} className="vds-dist-role">
              <span className="i">{r.icon}</span>
              <h3>{r.role}</h3>
              <p className="what">{r.what}</p>
              <p className="do">{r.cta}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Comece aqui" meta="1 prompt · 3 formatos">
        <div className="vds-dist-actions">
          <button className="vds-dist-primary" onClick={copyPrompt}>
            {copied ? <Check size={17} strokeWidth={2.2} /> : <Copy size={17} strokeWidth={2} />}
            {copied ? 'Prompt copiado' : 'Copiar prompt-mestre'}
          </button>
          <a className="vds-dist-secondary" href="/viver-de-ia-kit.zip" download>
            <Package size={16} strokeWidth={2} />
            Baixar kit completo
            <span className="vds-dist-meta">.zip · tokens + logos + prompts + exemplos</span>
          </a>
          <a className="vds-dist-secondary" href="/viver-de-ia-system-prompt.md" target="_blank" rel="noreferrer">
            <FileText size={16} strokeWidth={2} />
            Abrir prompt (.md)
            <span className="vds-dist-meta">pra salvar como .cursorrules ou colar</span>
          </a>
        </div>
        <p className="vds-dist-hint">
          Prefere link puro pra IA ler? <a href="/llms.txt" target="_blank" rel="noreferrer">viver-de-ia-ds.vercel.app/llms.txt</a> — o
          mesmo prompt, sempre atualizado.
        </p>
      </Section>

      <Section title="Passo a passo por ferramenta" meta="2–3 passos cada">
        <div className="vds-dist-tools">
          {tools.map((t) => (
            <article key={t.name} className="vds-dist-tool">
              <header>
                {t.name.includes('Code') ? <Terminal size={18} strokeWidth={1.8} /> : <ArrowUpRight size={18} strokeWidth={1.8} />}
                <div>
                  <h3>{t.name}</h3>
                  <span className="vds-dist-tooltag">{t.tag}</span>
                </div>
              </header>
              <ol>
                {t.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section title="O que vai no kit" meta=".zip universal">
        <ul className="vds-dist-contents">
          <li><strong>system-prompt.md</strong> — as regras canônicas, cola em qualquer LLM</li>
          <li><strong>system-prompts/</strong> — sub-prompts por contexto (email, social, landing, deck, brand, paid)</li>
          <li><strong>tokens/</strong> — <em>tokens.css</em> + <em>tokens.json</em> + <em>style.css</em> da library</li>
          <li><strong>logos/</strong> — monograma, wordmark, app icon, Leaders AI (navy + branco)</li>
          <li><strong>examples/</strong> — specimens HTML prontos (email, post, landing)</li>
        </ul>
        <p className="vds-dist-hint">
          Pra código React de verdade, instale a library:{' '}
          <code>bun add @viverdeia/design-system lucide-react</code> — 47 componentes, dark mode e contraste AA inclusos.
          Referência visual completa: <a href="https://viver-de-ia-ds.vercel.app" target="_blank" rel="noreferrer">o site inteiro</a> (107 rotas vivas).
        </p>
      </Section>
    </>
  );
}
