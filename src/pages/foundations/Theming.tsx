import { useEffect, useState } from 'react';
import { ThemeProvider } from '../../lib/theming/theming';
import { useTheme, type Theme } from '../../lib/theming/theming-core';
import { Button } from '../../lib/Button/Button';
import { Pill } from '../../lib/Pill/Pill';
import { Alert } from '../../lib/Alert/Alert';
import { tokens, tokensList } from '../../lib/tokens';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Sun, Moon, Monitor } from 'lucide-react';
import './theming.css';

/* ------------------------------------------------------------------
   Números desta página saem do registro real de tokens (src/lib/tokens.ts,
   gerado de src/styles/tokens.css). Nada de contagem escrita à mão — se um
   token nascer ou morrer, a página conta certo sozinha.
   ------------------------------------------------------------------ */
const TOTAL_TOKENS = tokensList.length;

const CATEGORY_LABEL: Record<string, string> = {
  color: 'cor · paleta, texto, borda, alfas',
  other: 'outros · tipografia fina, vidro, z-index, layout',
  shadow: 'sombra · escala de elevação + tinta (ink)',
  spacing: 'espaçamento · escala base 4px',
  radius: 'raio · xs → 2xl + pill',
  font: 'fonte · famílias e aliases',
  surface: 'superfície · malhas, ruído, backgrounds',
  motion: 'movimento · duração e easing',
};

const CATEGORIES = Object.entries(
  tokensList.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);

/** Tema que está no <html> agora. O demo parte daqui — nunca impõe o dele. */
function currentDocTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function ThemeSwitcher() {
  const { mode, setMode, theme } = useTheme();

  /* O Provider guarda o estado dele, mas o tema mora no <html> — e o botão do
     topo do site escreve lá. Sem escutar o atributo, este leitor passa a mentir
     (dizer "claro" com a página escura). Leitor de tema que mente é pior que
     leitor nenhum, então o demo acompanha quem mexeu por último. */
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const doc: Theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      if (doc !== theme) setMode(doc);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [theme, setMode]);

  return (
    <>
      <div className="vds-thm-readout">
        <Pill size="sm">preferência · {mode}</Pill>
        <Pill size="sm">tema resolvido · {theme}</Pill>
      </div>
      <div className="vds-thm-switch">
        <Button
          size="sm"
          variant={mode === 'light' ? 'primary' : 'secondary'}
          onClick={() => setMode('light')}
          iconLeft={<Sun size={14} />}
        >
          Claro
        </Button>
        <Button
          size="sm"
          variant={mode === 'dark' ? 'primary' : 'secondary'}
          onClick={() => setMode('dark')}
          iconLeft={<Moon size={14} />}
        >
          Escuro
        </Button>
        <Button
          size="sm"
          variant={mode === 'system' ? 'primary' : 'secondary'}
          onClick={() => setMode('system')}
          iconLeft={<Monitor size={14} />}
        >
          Sistema
        </Button>
      </div>
    </>
  );
}

export default function Theming() {
  /* O demo nasce no tema que a página já está. Se ele começasse em 'system',
     o Provider aplicaria o tema do sistema operacional no <html> na montagem —
     ou seja, esta página de documentação trocaria o tema do site inteiro só
     por ter sido aberta. */
  const [demoStart] = useState<Theme>(() => currentDocTheme());

  return (
    <>
      <DocsHeader
        eyebrow="foundations · theming"
        title={<>Theming · <em>CSS-first · token override · ThemeProvider opcional</em></>}
        lede={
          <>
            O DS Viver de IA é CSS-first. Os tokens vivem em custom properties{' '}
            <code className="vds-code-inline">--via-*</code> e o tema inteiro troca por um atributo{' '}
            <code className="vds-code-inline">data-theme</code> no elemento raiz. O ThemeProvider é
            opcional — entra quando você quer estado React-aware, persistência em localStorage e
            escuta de prefers-color-scheme. Para white-label, createThemeOverride gera o CSS do
            override.
          </>
        }
      />

      <Section
        meta="arquitetura"
        title="3 camadas independentes">
        <p className="vds-thm-lead">
          Cada camada funciona sozinha. Não há acoplamento forte — você escolhe o nível de
          abstração e para por ali.
        </p>
        <div className="vds-thm-grid">
          <div className="via-tile vds-thm-tile">
            <Pill size="sm">camada 1 · base</Pill>
            <h3>tokens CSS</h3>
            <p>
              Tokens como <code className="vds-code-inline">--via-navy</code> e{' '}
              <code className="vds-code-inline">--via-text-primary</code> aplicados direto no CSS.
              Sempre disponível, com ou sem React.
            </p>
          </div>
          <div className="via-tile vds-thm-tile">
            <Pill size="sm">camada 2 · imperativo</Pill>
            <h3>applyTheme()</h3>
            <p>
              Função pura. <code className="vds-code-inline">applyTheme('dark')</code> escreve{' '}
              <code className="vds-code-inline">data-theme</code> no{' '}
              <code className="vds-code-inline">&lt;html&gt;</code> e nada mais. Não exige React.
            </p>
          </div>
          <div className="via-tile vds-thm-tile">
            <Pill size="sm">camada 3 · React</Pill>
            <h3>ThemeProvider + useTheme</h3>
            <p>
              Estado React-aware, persistência em localStorage e listener de
              prefers-color-scheme.
            </p>
            <p>
              <code className="vds-code-inline">useTheme()</code> também funciona sem Provider: aí
              ele lê o <code className="vds-code-inline">data-theme</code> do DOM e observa
              mudanças.
            </p>
          </div>
        </div>
      </Section>

      <Section
        meta="exemplo · react"
        title="ThemeProvider + useTheme">
        <p className="vds-thm-lead">
          O Provider guarda o estado, persiste no localStorage e escuta mudanças de
          prefers-color-scheme. Sem a prop <code className="vds-code-inline">defaultMode</code> o
          app nasce claro — o padrão da marca. Seguir o sistema operacional é opt-in explícito.
        </p>
        <CodeBlock>{`import { ThemeProvider, useTheme } from '@viverdeia/design-system';

function App() {
  // sem defaultMode: claro, ou a preferência salva pelo usuário
  // <ThemeProvider defaultMode="system"> segue o prefers-color-scheme
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  // theme  · resolvido · 'light' | 'dark'
  // mode   · preferência declarada · pode ser 'system'
  const { theme, mode, setMode, toggle } = useTheme();

  return (
    <button onClick={toggle}>
      tema atual · {theme}
    </button>
  );
}`}</CodeBlock>

        <div className="via-tile vds-thm-demo">
          <p className="vds-thm-demo-note">
            <strong>Demo ao vivo.</strong> O tema mora no elemento{' '}
            <code className="vds-code-inline">&lt;html&gt;</code> — então estes botões trocam o tema
            do site inteiro, que é exatamente como a camada funciona. Este demo não persiste: ao
            recarregar, sua preferência salva volta.
          </p>
          <ThemeProvider defaultMode={demoStart} persist={false}>
            <ThemeSwitcher />
          </ThemeProvider>
        </div>
      </Section>

      <Section
        meta="exemplo · imperativo"
        title="applyTheme() — sem React">
        <p className="vds-thm-lead">
          Para apps vanilla, SSR, ou o script inicial que precisa pintar o tema antes do React
          montar. A regra que não pode falhar aqui: sem preferência salva, o tema é{' '}
          <strong>claro</strong> — nunca o do sistema operacional. Senão um app novo nasce escuro
          só porque o SO do desenvolvedor está escuro, contra a identidade da marca.
        </p>
        <CodeBlock>{`<!-- No <head>, antes do bundle principal · evita flash of unstyled content -->
<script>
  (function () {
    try {
      var stored = localStorage.getItem('via-theme'); // 'light' | 'dark' | 'system' | null
      var theme =
        stored === 'light' || stored === 'dark'
          ? stored
          : stored === 'system'
            ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : 'light'; // sem preferência salva: CLARO, o padrão da marca
      document.documentElement.dataset.theme = theme;
    } catch (e) {}
  })();
</script>

// Depois, em qualquer momento
import { applyTheme } from '@viverdeia/design-system';
applyTheme('dark');   // escreve data-theme="dark" no <html>`}</CodeBlock>
        <p className="vds-thm-after">
          A chave do localStorage é <code className="vds-code-inline">via-theme</code> — a mesma que
          o ThemeProvider usa. Misturar Provider e applyTheme imperativo no mesmo app deixa os dois
          estados brigando: escolha um.
        </p>
      </Section>

      <Section
        meta="o que quebra na prática"
        title="3 regras do tema escuro">
        <p className="vds-thm-lead">
          As três já falharam em produção neste DS, cada uma com sintoma próprio. Quem escreve
          token novo passa por aqui antes.
        </p>
        <div className="vds-thm-grid">
          <div className="via-tile vds-thm-tile">
            <span className="vds-thm-rule-mark">regra 1</span>
            <h3>Todo token existe nos dois temas</h3>
            <p>
              Um <code className="vds-code-inline">--via-*</code> declarado só no escuro deixa o{' '}
              <code className="vds-code-inline">var()</code> vazio no claro — e um var vazio
              invalida a declaração inteira, não só aquela camada.
            </p>
            <p>
              Sintoma: fundo que some, e texto branco que contava com ele virando branco no branco.
            </p>
          </div>
          <div className="via-tile vds-thm-tile">
            <span className="vds-thm-rule-mark">regra 2</span>
            <h3>Especificidade do bloco escuro</h3>
            <p>
              <code className="vds-code-inline">[data-theme="dark"]</code> sozinho empata em
              especificidade com <code className="vds-code-inline">:root</code> e perde para
              qualquer <code className="vds-code-inline">:root</code> escrito depois no arquivo. O
              seletor certo é <code className="vds-code-inline">:root[data-theme="dark"]</code> — um
              a mais, ganha sempre.
            </p>
            <p>
              Sintoma: parte dos tokens do escuro simplesmente não pega — e você jura que declarou.
            </p>
          </div>
          <div className="via-tile vds-thm-tile">
            <span className="vds-thm-rule-mark">regra 3</span>
            <h3>Sombra usa tinta, não navy</h3>
            <p>
              Em <code className="vds-code-inline">box-shadow</code> de elevação a cor vem da
              família <code className="vds-code-inline">--via-shadow-ink-*</code> — navy no claro,
              preta e mais densa no escuro. Já{' '}
              <code className="vds-code-inline">--via-navy-*</code> inverte para branco no escuro.
            </p>
            <p>
              Sintoma: halo branco em volta do card. A única exceção legítima é a linha de luz do
              vidro, <code className="vds-code-inline">inset 0 1px 0 var(--via-edge-hi)</code> —
              ali o branco é o efeito desejado.
            </p>
          </div>
        </div>
      </Section>

      <Section
        meta="exemplo · custom"
        title="createThemeOverride · white-label">
        <p className="vds-thm-lead">
          Para customizar tokens de um cliente específico — raro, porque a paleta Viver de IA é
          restrita por design. A função devolve CSSText, que você injeta numa tag style.
        </p>
        <Alert tone="attn" title="Paleta restrita é parte da marca">
          A paleta canônica é branco, off-white, cinza, azul-escuro, navy e preto — com coral
          reservado ao destrutivo. Override para dourado, amarelo ou roxo quebra o contrato de
          marca: use só em white-label legítimo.
        </Alert>

        <CodeBlock>{`import { createThemeOverride } from '@viverdeia/design-system';

// Cliente "Acme Corp" usa um azul mais saturado
const css = createThemeOverride({
  '--via-navy': '#0F2A4E',
  '--via-accent': '#1E5A99',
});
// :root {
//   --via-navy: #0F2A4E;
//   --via-accent: #1E5A99;
// }

document.head.insertAdjacentHTML('beforeend', \`<style>\${css}</style>\`);

// Escopo por tema · o seletor já sai com a especificidade certa
createThemeOverride({ '--via-bg': '#020812' }, { scope: 'dark' });
// :root[data-theme="dark"] {
//   --via-bg: #020812;
// }`}</CodeBlock>
        <p className="vds-thm-after">
          Chave que não começa com <code className="vds-code-inline">--via-</code> é descartada em
          silêncio — é a trava que impede um override de virar um design system paralelo.
        </p>
      </Section>

      <Section
        meta="tokens disponíveis"
        title={`${TOTAL_TOKENS} tokens nominais`}>
        <p className="vds-thm-lead">
          Todos vivem em <code className="vds-code-inline">--via-*</code> e o registro TypeScript
          sai de <code className="vds-code-inline">src/styles/tokens.css</code> pelo script{' '}
          <code className="vds-code-inline">build-tokens.mjs</code> a cada build. A tabela abaixo é
          contada do próprio registro, não escrita à mão.
        </p>

        <table className="vds-token-table">
          <thead>
            <tr>
              <th>categoria</th>
              <th>tokens</th>
              <th>o que entra</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map(([cat, count]) => (
              <tr key={cat}>
                <td className="tok">{cat}</td>
                <td className="val">{count}</td>
                <td className="use">{CATEGORY_LABEL[cat] ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <CodeBlock>{`import { tokens, tokensList, cssVar } from '@viverdeia/design-system';

// Chave SEM os dois hifens · o valor é a string crua do tokens.css
tokens['via-navy'];        // '${tokens['via-navy']}'
tokens['via-radius-lg'];   // '${tokens['via-radius-lg']}'

// Helper pra styles inline
cssVar('via-navy');        // 'var(--via-navy)'

// Lista completa · útil em design tools, docs, plugin de Figma
tokensList[0];             // { name, css, value, category }`}</CodeBlock>
      </Section>

      <Section
        meta="dos e donts"
        title="quando customizar"
      >
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <ul className="vds-thm-list">
              <li>ThemeProvider em app React (Vite, Next, Remix)</li>
              <li>applyTheme com script inline no SSR, para evitar FOUC</li>
              <li>Override em white-label legítimo, respeitando contraste AA</li>
              <li>Token novo declarado no claro e no escuro, na mesma leva</li>
            </ul>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <ul className="vds-thm-list">
              <li>Override de <code className="vds-code-inline">--via-*</code> para dourado, amarelo ou roxo</li>
              <li>Sobrescrever 50+ tokens — a essa altura é outro design system</li>
              <li>ThemeProvider e applyTheme imperativo no mesmo app</li>
              <li>Componente que impõe o tema dele ao <code className="vds-code-inline">&lt;html&gt;</code> ao montar</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
