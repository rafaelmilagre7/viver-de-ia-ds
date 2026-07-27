import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './data-page.css';

/* ==============================================================
   FUNDAMENTOS · CAMADA DE DADOS
   Página de referência de /src/styles/data.css — é ela que ensina
   o time (e a IA) a escrever tabela no padrão da casa.

   Todo número desta página fecha. As sub-linhas somam no pai, os
   pais somam no subtotal, os subtotais somam no total, e o
   atingimento é realizado ÷ meta. Tabela com número errado
   desmoraliza a página inteira.
   ============================================================== */

export default function Data() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · camada de dados"
        title={
          <>
            Tabela não é enfeite. É <em>leitura</em>.
          </>
        }
        lede="Toda tela de dados do Viver de IA nasce das mesmas classes globais. Você escreve a tabela em HTML cru, aplica .via-table e ela já sai densa, alinhada e legível — sem inventar CSS, sem componente novo, sem discussão de estilo em code review."
      />

      <TeseSection />
      <EspecimeCanonicoSection />
      <EspecimeDensidadeSection />
      <EspecimeMetricasSection />
      <EspecimeAnatomiaSection />
      <RegrasSection />
    </>
  );
}

/* ==============================================================
   1 · A tese
   ============================================================== */
const decisoes = [
  {
    n: '01',
    titulo: 'Número tabular, sempre à direita',
    corpo:
      'É a decisão que carrega o resto. Com font-variant-numeric: tabular-nums, todo dígito ocupa a mesma largura — as casas decimais empilham na vertical e o olho compara duas linhas sem reler. Alinhado à esquerda ou centralizado, o número vira texto e a coluna vira ruído.',
    classe: '.via-num',
  },
  {
    n: '02',
    titulo: 'Hierarquia por indentação e peso',
    corpo:
      'Sub-conta entra 42px. Total ganha peso 600 e uma régua em cima — convenção contábil de cem anos, não invenção nossa. O que nunca acontece: fundo colorido para dizer "esta linha é diferente". Cor de fundo em linha de dado queima o único recurso que deveria significar alguma coisa.',
    classe: '.via-cell-sub · .via-row-total',
  },
  {
    n: '03',
    titulo: 'Vidro fora da tabela densa',
    corpo:
      'Liquid glass é assinatura da marca — e mata a leitura de 15 linhas de número. O blur reduz contraste exatamente onde a densidade já é alta. A regra: a tabela é sólida sobre superfície branca; o vidro vive nos cards de métrica ao redor dela.',
    classe: '.via-metric',
  },
];

function TeseSection() {
  return (
    <Section title="A tese" meta="três decisões separam tabela boa de tabela genérica">
      <div className="vds-data-tese">
        <p className="vds-data-tese-lede">
          O que faz uma tabela parecer de produto sério não é sombra, borda arredondada nem ícone
          na célula. São três decisões estruturais — e uma camada de CSS global já toma as três por
          você. Se você está escrevendo <code>text-align: right</code> na mão, está reconstruindo
          o que já existe.
        </p>

        <div className="vds-data-tri">
          {decisoes.map((d) => (
            <article key={d.n} className="vds-data-tri-item">
              <span className="vds-data-tri-num mono">{d.n}</span>
              <h3>{d.titulo}</h3>
              <p>{d.corpo}</p>
              <code className="vds-data-tri-class">{d.classe}</code>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ==============================================================
   2 · Espécime 1 — a tabela canônica
   --------------------------------------------------------------
   Receita reconhecida, 1º semestre 2026. Confere:
     anual 2.184 + trimestral    756 = mentoria      2.940
     mentoria 2.940 + comunidade 612 = recorrente    3.552
     lote1 288 + lote2 426           = ingressos       714
     ingressos 714 + patrocínio 372  = leaders       1.086
     leaders 1.086 + workshops 396   = pontual       1.482
     recorrente 3.552 + pontual 1.482 = TOTAL        5.034
   Metas somam do mesmo jeito e fecham em 5.000.
   Ating. = realizado ÷ meta. Delta = vs. 1º sem. 2025.
   ============================================================== */
type LinhaDado = {
  key: string;
  label: string;
  nivel: 0 | 1 | 2;
  real: string;
  meta: string;
  ating: string;
  delta: string;
  dir: 'up' | 'down';
  total?: boolean;
};
type LinhaGrupo = { key: string; grupo: string };
type Linha = LinhaDado | LinhaGrupo;

const isGrupo = (l: Linha): l is LinhaGrupo => 'grupo' in l;

const receita: Linha[] = [
  { key: 'g1', grupo: 'Recorrente · assinatura e mentoria' },
  { key: 'mentoria',   label: 'Mentoria Viver de IA', nivel: 0, real: '2.940.000', meta: '2.800.000', ating: '105,0%', delta: '+10,5%', dir: 'up' },
  { key: 'anual',      label: 'Plano anual',          nivel: 1, real: '2.184.000', meta: '2.000.000', ating: '109,2%', delta: '+20,0%', dir: 'up' },
  { key: 'trimestral', label: 'Plano trimestral',     nivel: 1, real: '756.000',   meta: '800.000',   ating: '94,5%',  delta: '-10,0%', dir: 'down' },
  { key: 'comunidade', label: 'Comunidade VIA',       nivel: 0, real: '612.000',   meta: '640.000',   ating: '95,6%',  delta: '+25,9%', dir: 'up' },
  { key: 'sub1', label: 'Subtotal · recorrente', nivel: 0, real: '3.552.000', meta: '3.440.000', ating: '103,3%', delta: '+12,9%', dir: 'up', total: true },

  { key: 'g2', grupo: 'Pontual · evento e in-company' },
  { key: 'leaders',    label: 'Leaders AI Conference', nivel: 0, real: '1.086.000', meta: '1.200.000', ating: '90,5%',  delta: '+2,5%',  dir: 'up' },
  { key: 'ingressos',  label: 'Ingressos',             nivel: 1, real: '714.000',   meta: '750.000',   ating: '95,2%',  delta: '+20,0%', dir: 'up' },
  { key: 'lote1',      label: 'Lote 1 · early',        nivel: 2, real: '288.000',   meta: '300.000',   ating: '96,0%',  delta: '+20,0%', dir: 'up' },
  { key: 'lote2',      label: 'Lote 2 · pleno',        nivel: 2, real: '426.000',   meta: '450.000',   ating: '94,7%',  delta: '+20,0%', dir: 'up' },
  { key: 'patrocinio', label: 'Patrocínio',            nivel: 1, real: '372.000',   meta: '450.000',   ating: '82,7%',  delta: '-20,0%', dir: 'down' },
  { key: 'workshops',  label: 'Workshops in-company',  nivel: 0, real: '396.000',   meta: '360.000',   ating: '110,0%', delta: '-10,0%', dir: 'down' },
  { key: 'sub2', label: 'Subtotal · pontual', nivel: 0, real: '1.482.000', meta: '1.560.000', ating: '95,0%', delta: '-1,2%', dir: 'down', total: true },

  { key: 'total', label: 'Total · 1º semestre 2026', nivel: 0, real: '5.034.000', meta: '5.000.000', ating: '100,7%', delta: '+8,4%', dir: 'up', total: true },
];

const cellNivel = (n: 0 | 1 | 2) => (n === 1 ? 'via-cell-sub' : n === 2 ? 'via-cell-sub-2' : undefined);

const SNIPPET_CANONICO = `<div class="via-table-wrap">
  <table class="via-table">
    <thead>
      <tr>
        <th>Linha de receita</th>
        <th class="via-num">Realizado · R$</th>
        <th class="via-num">Meta · R$</th>
        <th class="via-num">Ating.</th>
        <th class="via-num">vs. 1º sem. 2025</th>
      </tr>
    </thead>
    <tbody>
      <!-- cabeçalho de grupo: rótulo, não dado -->
      <tr class="via-row-group">
        <td colspan="5">Recorrente · assinatura e mentoria</td>
      </tr>

      <tr>
        <td>Mentoria Viver de IA</td>
        <td class="via-num">2.940.000</td>
        <td class="via-num">2.800.000</td>
        <td class="via-num">105,0%</td>
        <td class="via-num via-delta via-delta--up">+10,5%</td>
      </tr>

      <!-- sub-linha: INDENTAÇÃO, nunca cor de fundo -->
      <tr>
        <td class="via-cell-sub">Plano anual</td>
        <td class="via-num">2.184.000</td>
        <td class="via-num">2.000.000</td>
        <td class="via-num">109,2%</td>
        <td class="via-num via-delta via-delta--up">+20,0%</td>
      </tr>

      <!-- terceiro nível: entra mais um degrau -->
      <tr>
        <td class="via-cell-sub-2">Lote 1 · early</td>
        <td class="via-num">288.000</td>
        <td class="via-num">300.000</td>
        <td class="via-num">96,0%</td>
        <td class="via-num via-delta via-delta--up">+20,0%</td>
      </tr>

      <!-- total: peso + régua superior, convenção contábil -->
      <tr class="via-row-total">
        <td>Total · 1º semestre 2026</td>
        <td class="via-num">5.034.000</td>
        <td class="via-num">5.000.000</td>
        <td class="via-num">100,7%</td>
        <td class="via-num via-delta via-delta--up">+8,4%</td>
      </tr>
    </tbody>
  </table>
</div>`;

function EspecimeCanonicoSection() {
  return (
    <Section
      title="Espécime 1 · a tabela canônica"
      meta="grupo · sub-linha · total · variação"
    >
      <p className="vds-data-intro">
        Receita reconhecida do 1º semestre de 2026 — três níveis de conta, dois subtotais e um
        total. Nenhuma classe fora da camada global, nenhum estilo inline. Repare no que a tabela{' '}
        <em>não</em> faz: não pinta linha, não desenha barra lateral, não centraliza número e só
        deixa <strong>uma</strong> coluna carregar cor.
      </p>

      <div className="via-table-wrap">
        <table className="via-table">
          <thead>
            <tr>
              <th>Linha de receita</th>
              <th className="via-num">Realizado · R$</th>
              <th className="via-num">Meta · R$</th>
              <th className="via-num">Ating.</th>
              <th className="via-num">vs. 1º sem. 2025</th>
            </tr>
          </thead>
          <tbody>
            {receita.map((l) =>
              isGrupo(l) ? (
                <tr key={l.key} className="via-row-group">
                  <td colSpan={5}>{l.grupo}</td>
                </tr>
              ) : (
                <tr key={l.key} className={l.total ? 'via-row-total' : undefined}>
                  <td className={cellNivel(l.nivel)}>{l.label}</td>
                  <td className="via-num">{l.real}</td>
                  <td className="via-num">{l.meta}</td>
                  <td className="via-num">{l.ating}</td>
                  <td className={`via-num via-delta via-delta--${l.dir}`}>{l.delta}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <p className="vds-data-caption">
        <strong>Por que só a última coluna tem cor.</strong> Atingimento fica em navy neutro de
        propósito. Se as duas colunas de percentual carregassem semáforo, nenhuma comunicaria nada
        — e a leitura mais rápida da tabela (quem cresceu, quem caiu) se perderia no meio do
        colorido. Note também que <em>Workshops in-company</em> bate 110% da meta e ainda assim
        aparece em coral: a meta foi cortada, a receita caiu 10,0% contra o ano passado. Duas
        perguntas diferentes, duas colunas diferentes.
      </p>

      <div className="vds-data-snippet">
        <div className="vds-data-snippet-head">
          <span className="vds-data-snippet-title">O HTML que produz isso</span>
          <span className="vds-data-snippet-note">
            copie, troque os dados. Nenhum CSS de página precisa ser escrito.
          </span>
        </div>
        <pre className="vds-data-code mono">{SNIPPET_CANONICO}</pre>
      </div>

      <div className="vds-data-mods">
        <span className="vds-data-mods-label">Modificadores da tabela</span>
        <ul>
          <li>
            <code>.via-table--sticky</code>
            <em>cabeçalho gruda ao rolar · use só quando passar de ~20 linhas</em>
          </li>
          <li>
            <code>.via-table--compact</code>
            <em>padding 9/14 · tela de operação, muitas linhas</em>
          </li>
          <li>
            <code>.via-table--roomy</code>
            <em>padding 18/22 · poucas linhas, leitura de apresentação</em>
          </li>
        </ul>
      </div>
    </Section>
  );
}

/* ==============================================================
   3 · Espécime 2 — densidades
   --------------------------------------------------------------
   Origem dos leads · 2.750 + 1.350 + 510 + 390 = 5.000
   ============================================================== */
const canais = [
  { canal: 'Meta Ads', leads: '2.750', pct: '55,0%', share: 55 },
  { canal: 'Busca orgânica', leads: '1.350', pct: '27,0%', share: 27 },
  { canal: 'Indicação', leads: '510', pct: '10,2%', share: 10.2 },
  { canal: 'Direto', leads: '390', pct: '7,8%', share: 7.8 },
];

const densidades = [
  {
    mod: '--compact',
    classe: 'via-table via-table--compact',
    titulo: 'Compacta',
    quando:
      'Painel de operação, tabela longa, gente que olha o dia inteiro. Cabe mais linha na dobra sem reduzir a fonte.',
  },
  {
    mod: 'padrão',
    classe: 'via-table',
    titulo: 'Padrão',
    quando:
      'O default. Se você não tem um motivo escrito para mudar, é esta. Serve de 5 a 40 linhas em qualquer tela.',
  },
  {
    mod: '--roomy',
    classe: 'via-table via-table--roomy',
    titulo: 'Espaçada',
    quando:
      'Poucas linhas com peso editorial — resumo executivo, comparativo de plano, número que vai pro telão.',
  },
];

function EspecimeDensidadeSection() {
  return (
    <Section title="Espécime 2 · densidade" meta="três padding · a fonte nunca muda">
      <p className="vds-data-intro">
        Densidade se resolve no <strong>padding</strong>, não no tamanho da fonte. Reduzir a fonte
        para caber mais linha é o atalho que estraga a leitura e quebra a escala tipográfica. Os
        três modificadores mudam só o respiro da célula — mesmos 13px, mesmo hairline, mesmo
        alinhamento.
      </p>

      <div className="vds-data-dens">
        {densidades.map((d) => (
          <article key={d.mod} className="vds-data-dens-item">
            <header>
              <h4>{d.titulo}</h4>
              <code>{d.mod}</code>
            </header>
            <div className="via-table-wrap">
              <table className={d.classe}>
                <thead>
                  <tr>
                    <th>Canal</th>
                    <th className="via-num">Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {canais.map((c) => (
                    <tr key={c.canal}>
                      <td>{c.canal}</td>
                      <td className="via-num">{c.leads}</td>
                    </tr>
                  ))}
                  <tr className="via-row-total">
                    <td>Total</td>
                    <td className="via-num">5.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>{d.quando}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ==============================================================
   4 · Espécime 3 — cards de métrica
   --------------------------------------------------------------
   Receita mensal (R$ mil): 762 + 786 + 818 + 856 + 892 + 920 = 5.034
   Ticket médio mentoria: 2.940.000 ÷ 240 contratos = 12.250
   Semestre anterior:     2.660.000 ÷ 200 contratos = 13.300  (-7,9%)
   ============================================================== */
const receitaMensal = [762, 786, 818, 856, 892, 920];
const projecaoJulho = [920, 968];

function Spark({
  values,
  projected,
  down = false,
}: {
  values: number[];
  projected?: number[];
  down?: boolean;
}) {
  const w = 120;
  const h = 34;
  const pad = 3;
  const todos = projected ? [...values, ...projected.slice(1)] : values;
  const min = Math.min(...todos);
  const max = Math.max(...todos);
  const span = max - min || 1;
  const step = (w - pad * 2) / (todos.length - 1);

  const ponto = (v: number, i: number) => ({
    x: pad + i * step,
    y: h - pad - ((v - min) / span) * (h - pad * 2),
  });

  const pts = todos.map(ponto);
  const corte = values.length - 1;
  const traco = (from: number, to: number) =>
    pts
      .slice(from, to + 1)
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ');

  const linha = traco(0, corte);
  const area = `${linha} L${pts[corte].x.toFixed(1)},${h} L${pad.toFixed(1)},${h} Z`;

  return (
    <svg
      className={`via-spark${down ? ' via-spark--down' : ''}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="tendência dos últimos meses"
    >
      <path className="via-spark__area" d={area} />
      <path d={linha} vectorEffect="non-scaling-stroke" />
      {projected && (
        <path className="via-projected" d={traco(corte, pts.length - 1)} vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}

function EspecimeMetricasSection() {
  return (
    <Section title="Espécime 3 · cards de métrica" meta="aqui o vidro é bem-vindo">
      <p className="vds-data-intro">
        O KPI é o oposto da tabela: pouco dado, muito peso. Aqui o liquid glass funciona porque não
        há densidade para atrapalhar — e é ele que dá o contraste entre o resumo e a tabela sólida
        logo abaixo. A grade é <code>auto-fit minmax(210px, 1fr)</code>: 4 no desktop, 2 no tablet,
        1 no celular, sem media query na página.
      </p>

      <div className="via-metric-grid">
        <article className="via-metric via-metric--atmos">
          <span className="via-metric__label">Receita · 1º sem. 2026</span>
          <span className="via-metric__value">
            <small>R$</small>5.034.000
          </span>
          <span className="via-metric__foot">
            <span className="via-delta via-delta--up">+8,4%</span>
            vs. 1º sem. 2025
          </span>
        </article>

        <article className="via-metric">
          <span className="via-metric__label">Atingimento da meta</span>
          <span className="via-metric__value">100,7%</span>
          <span className="via-metric__foot">
            <span className="via-delta via-delta--up">+R$ 34.000</span>
            sobre a meta de R$ 5.000.000
          </span>
        </article>

        <article className="via-metric">
          <span className="via-metric__label">Receita · junho</span>
          <span className="via-metric__value">
            <small>R$</small>920.000
          </span>
          <Spark values={receitaMensal} />
          <span className="via-metric__foot">6º mês seguido de alta</span>
        </article>

        <article className="via-metric">
          <span className="via-metric__label">Ticket médio · mentoria</span>
          <span className="via-metric__value">
            <small>R$</small>12.250
          </span>
          <span className="via-metric__foot">
            <span className="via-delta via-delta--down">-7,9%</span>
            240 contratos · +20,0% em volume
          </span>
        </article>
      </div>

      <p className="vds-data-caption">
        <strong>Anatomia do card.</strong> <code>--atmos</code> acende o radial navy no canto
        superior esquerdo — use em <em>um</em> card por tela, o principal; nos quatro vira papel de
        parede. O <code>&lt;small&gt;</code> dentro de <code>.via-metric__value</code> reduz o
        "R$" a 52% do tamanho: quem é protagonista é o número, não a moeda. E o valor herda{' '}
        <code>tabular-nums</code>, então dois cards lado a lado com valores diferentes mantêm o
        mesmo ritmo de dígito.
      </p>
    </Section>
  );
}

/* ==============================================================
   5 · Espécime 4 — anatomia das células
   ============================================================== */
function EspecimeAnatomiaSection() {
  return (
    <Section title="Espécime 4 · anatomia da célula" meta="seis classes · o que cada uma resolve">
      <p className="vds-data-intro">
        Cada classe abaixo resolve um problema específico de leitura. Nenhuma é decorativa — se
        você não consegue dizer que pergunta a classe responde, ela não deveria estar ali.
      </p>

      <div className="vds-data-anatomy">
        {/* .via-num */}
        <article className="vds-data-anat vds-data-anat--wide">
          <header>
            <code>.via-num</code>
            <h4>Número tabular à direita</h4>
          </header>
          <p>
            A regra mais importante da camada. Sem ela os dígitos têm larguras diferentes e as
            casas decimais desalinham de linha para linha — o olho precisa reler cada número em vez
            de comparar a coluna inteira de uma vez.
          </p>
          <div className="vds-data-compare">
            <div className="vds-data-compare-col vds-data-compare-col--bad">
              <span className="vds-data-compare-tag">Sem .via-num</span>
              <div className="via-table-wrap">
                <table className="via-table via-table--compact">
                  <tbody>
                    <tr><td>Meta Ads</td><td>2.750</td></tr>
                    <tr><td>Busca orgânica</td><td>1.350</td></tr>
                    <tr><td>Indicação</td><td>510</td></tr>
                    <tr><td>Direto</td><td>390</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="vds-data-compare-col">
              <span className="vds-data-compare-tag">Com .via-num</span>
              <div className="via-table-wrap">
                <table className="via-table via-table--compact">
                  <tbody>
                    <tr><td>Meta Ads</td><td className="via-num">2.750</td></tr>
                    <tr><td>Busca orgânica</td><td className="via-num">1.350</td></tr>
                    <tr><td>Indicação</td><td className="via-num">510</td></tr>
                    <tr><td>Direto</td><td className="via-num">390</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>

        {/* .via-delta */}
        <article className="vds-data-anat">
          <header>
            <code>.via-delta--up / --down / --flat</code>
            <h4>Variação com cor semântica</h4>
          </header>
          <p>
            Verde sóbrio para favorável, coral para desfavorável, cinza para estável. Cor aqui é
            informação, não enfeite — por isso só uma coluna da tabela recebe delta.
          </p>
          <div className="vds-data-demo">
            <div className="vds-data-demo-row">
              <span className="vds-data-demo-lbl">Assinatura mensal</span>
              <span className="via-delta via-delta--up">+20,0%</span>
            </div>
            <div className="vds-data-demo-row">
              <span className="vds-data-demo-lbl">Patrocínio do evento</span>
              <span className="via-delta via-delta--down">-20,0%</span>
            </div>
            <div className="vds-data-demo-row">
              <span className="vds-data-demo-lbl">Renovação anual</span>
              <span className="via-delta via-delta--flat">0,0%</span>
            </div>
          </div>
        </article>

        {/* .via-cell-sub */}
        <article className="vds-data-anat">
          <header>
            <code>.via-cell-sub · .via-cell-sub-2</code>
            <h4>Hierarquia por indentação</h4>
          </header>
          <p>
            42px e 66px de recuo (30px e 46px no celular). O segundo nível também esmaece a cor do
            texto um passo. Nunca use fundo colorido para dizer que a linha é filha.
          </p>
          <div className="via-table-wrap">
            <table className="via-table via-table--compact">
              <thead>
                <tr>
                  <th>Conta</th>
                  <th className="via-num">R$</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Leaders AI Conference</td><td className="via-num">1.086.000</td></tr>
                <tr><td className="via-cell-sub">Ingressos</td><td className="via-num">714.000</td></tr>
                <tr><td className="via-cell-sub-2">Lote 1 · early</td><td className="via-num">288.000</td></tr>
                <tr><td className="via-cell-sub-2">Lote 2 · pleno</td><td className="via-num">426.000</td></tr>
                <tr><td className="via-cell-sub">Patrocínio</td><td className="via-num">372.000</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* .via-bar */}
        <article className="vds-data-anat vds-data-anat--wide">
          <header>
            <code>.via-bar · .via-bar__fill</code>
            <h4>Micro-barra de proporção</h4>
          </header>
          <p>
            Comunica peso relativo sem virar gráfico. 4px de altura, largura máxima de 160px,
            preenchimento em gradiente navy. Sempre acompanhada do número — a barra ajuda a
            escanear, o número é a fonte da verdade.
          </p>
          <div className="via-table-wrap">
            <table className="via-table via-table--compact">
              <thead>
                <tr>
                  <th>Canal</th>
                  <th className="via-num">Leads</th>
                  <th>Peso</th>
                  <th className="via-num">Share</th>
                </tr>
              </thead>
              <tbody>
                {canais.map((c) => (
                  <tr key={c.canal}>
                    <td>{c.canal}</td>
                    <td className="via-num">{c.leads}</td>
                    <td>
                      <span className="via-bar">
                        <span className="via-bar__fill" style={{ width: `${c.share}%` }} />
                      </span>
                    </td>
                    <td className="via-num">{c.pct}</td>
                  </tr>
                ))}
                <tr className="via-row-total">
                  <td>Total</td>
                  <td className="via-num">5.000</td>
                  <td />
                  <td className="via-num">100,0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* .via-projected */}
        <article className="vds-data-anat">
          <header>
            <code>.via-projected · .via-spark--projected</code>
            <h4>Projeção nunca parece realizado</h4>
          </header>
          <p>
            Traço tracejado e opacidade 72%. Dado estimado que se veste de dado apurado é o erro
            mais caro de uma tela de números — alguém vai tomar decisão em cima dele.
          </p>
          <div className="vds-data-demo vds-data-demo--spark">
            <Spark values={receitaMensal} projected={projecaoJulho} />
          </div>
          <div className="via-table-wrap">
            <table className="via-table via-table--compact">
              <tbody>
                <tr><td>Junho · realizado</td><td className="via-num">920.000</td></tr>
                <tr>
                  <td className="via-projected">Julho · projeção</td>
                  <td className="via-num via-projected">968.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* .via-mono */}
        <article className="vds-data-anat">
          <header>
            <code>.via-mono</code>
            <h4>Código, id e timestamp</h4>
          </header>
          <p>
            Monoespaçado é para o que se lê caractere a caractere — id de contrato, hash, horário.
            <strong> Dinheiro não é mono</strong>: <code>.via-num</code> já entrega o alinhamento
            sem trocar a fonte do produto.
          </p>
          <div className="via-table-wrap">
            <table className="via-table via-table--compact">
              <thead>
                <tr>
                  <th>Contrato</th>
                  <th>Fechado em</th>
                  <th className="via-num">R$</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="via-mono">VIA-2026-0418</td>
                  <td className="via-mono">30/06 · 18:42</td>
                  <td className="via-num">18.200</td>
                </tr>
                <tr>
                  <td className="via-mono">VIA-2026-0419</td>
                  <td className="via-mono">30/06 · 21:07</td>
                  <td className="via-num">9.800</td>
                </tr>
                <tr>
                  <td className="via-mono">VIA-2026-0420</td>
                  <td className="via-mono">30/06 · 23:51</td>
                  <td className="via-num">12.250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* ==============================================================
   6 · Regras
   ============================================================== */
const garante = [
  'Moldura com corte por token e scroll horizontal preso na tabela — a página nunca rola de lado no celular.',
  'Hairline de 1px entre linhas e nenhuma borda na última — a régua some quando não tem mais o que separar.',
  'Cabeçalho em micro-caps, peso 600, cor muted. Rótulo não compete com dado.',
  'Alinhamento tabular à direita em qualquer célula com .via-num, inclusive no <th>.',
  'Total com peso 600 e régua superior; grupo com micro-caps e fundo de 2% — rótulo, não dado.',
  'Três densidades sem tocar em font-size, e padding reduzido automaticamente abaixo de 720px.',
  'Hover de linha em 3% de navy, desligado em prefers-reduced-motion.',
  'Vidro isolado no .via-metric, com o radial atrás do conteúdo (z-index -1) — nunca por cima do número.',
];

const nunca = [
  'Vidro, blur ou gradiente atrás de tabela densa — mata o contraste onde ele mais importa.',
  'Barra ou linha lateral colorida em linha, célula ou card. Banida na marca inteira.',
  'Zebra (linha sim, linha não). A hairline já separa; a zebra só adiciona ruído.',
  'Número centralizado, alinhado à esquerda ou com fonte proporcional.',
  'Cor de fundo para marcar hierarquia. Hierarquia é indentação e peso.',
  'Cor decorativa: verde e coral só entram como semântica de variação.',
  'Fonte mono para dinheiro — mono é id, código e timestamp.',
  'Mais de uma coluna colorida na mesma tabela; e projeção com o mesmo traço do realizado.',
];

function RegrasSection() {
  return (
    <Section title="Regras" meta="o que garante · o que nunca fazer">
      <div className="vds-data-rules">
        <article className="vds-data-rules-col vds-data-rules-col--good">
          <span className="vds-data-rules-eyebrow">A camada já garante</span>
          <ul>
            {garante.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </article>

        <article className="vds-data-rules-col vds-data-rules-col--bad">
          <span className="vds-data-rules-eyebrow">Nunca</span>
          <ul>
            {nunca.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </article>
      </div>

      <p className="vds-data-closing">
        Se a tela precisa de algo que não está aqui, o caminho é estender{' '}
        <code>src/styles/data.css</code> — não escrever CSS de tabela dentro da página. A camada só
        continua sendo padrão enquanto for o lugar onde a decisão mora.
      </p>
    </Section>
  );
}
