import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

const pairs = [
  {
    title: 'Cor',
    do: 'Branco/off-white dominando ~80%. Navy protagonista (texto, CTA, surfaces dark). Cinza estruturando hairlines e secundários. Coral só pra destrutivo real.',
    dont: 'Accent, dourado, amarelo, amber em qualquer nível. Roxo "IA". Cyan, magenta, neon. Semáforo verde/vermelho de framework genérico. Cores quentes saturadas. Bolinha colorida em pill que não representa status real.',
  },
  {
    title: 'Tipografia',
    do: 'Geist single family (display + corpo). Italic morto — Geist não tem italic real. Use weight + cor pra hierarquia.',
    dont: 'Mistura de famílias. Letterspacing positivo em corpo. Uppercase em texto longo.',
  },
  {
    title: 'Glass',
    do: 'Nav sticky, hero stat card, modal frame, CTA pílula. Sobre navy ou foto, restrito.',
    dont: 'Dashboard denso. Tabela de dados. Form longo. Tudo glass — perde a presença.',
  },
  {
    title: 'Ícones',
    do: 'Lucide stroke 2px, currentColor, tamanho proporcional ao contexto.',
    dont: 'Emoji ★ ✓ → como ícone. Sparkle pra "marcar IA". Outlined + filled juntos.',
  },
  {
    title: 'Voz',
    do: 'Especialista que opera. PT-BR direto. Números em vez de adjetivos.',
    dont: 'Guru-bro. "Revolucionário". "Transformador". Promessas sem métrica.',
  },
  {
    title: 'Botões',
    do: 'Pill 999, sentence-case 13-14px peso 500, gradient navy → navy-deep com inset highlight. Lift translateY(-1px) no hover.',
    dont: 'Uppercase 0.10em em CTA (caps lock alérgico). Cor de semáforo verde/vermelho em primary. Verbos genéricos ("Clique aqui").',
  },
  {
    title: 'Movimento',
    do: 'Hover sutil, scale(0.98) no pressed, drift lento em hero glass.',
    dont: 'Spring bouncy. Parallax. Partículas. Ripple. Autoplay infinito.',
  },
  {
    title: 'Fotografia',
    do: 'Cool/neutro, levemente dessaturada. Preto-e-branco ou duotone navy. Pessoas trabalhando.',
    dont: 'AI stock — cérebros, neurônios, mãos androides. Hipersaturada. "Silicon Valley".',
  },
  {
    title: 'Densidade',
    do: 'Branco respira. Saltos de 32 / 64 / 96 / 128 entre seções.',
    dont: '"Preencher" branco com decoração. Comprimir espaço pra caber mais coisa.',
  },
  {
    title: 'Sombras',
    do: 'Navy-tinted sempre. Inner highlight + outer drop no vidro.',
    dont: 'Preto puro. Sombra pesada estilo material-design.',
  },
];

export default function DosDonts() {
  return (
    <>
      <DocsHeader
        eyebrow="Diretrizes · do's & don'ts"
        title={<>O que <em>sempre</em>. O que <em>nunca</em>.</>}
        lede="As 10 decisões que separam um produto Viver de IA de um produto genérico. Use como checklist antes de marcar qualquer tela como pronta."
      />

      {pairs.map((p) => (
        <Section key={p.title} title={p.title}>
          <div className="vds-do-dont">
            <div className="vds-do">
              <p className="vds-do-title">Faça</p>
              <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>{p.do}</p>
            </div>
            <div className="vds-dont">
              <p className="vds-dont-title">Evite</p>
              <p style={{ fontSize: 13, color: 'var(--via-gray-600)', margin: 0, lineHeight: 1.55 }}>{p.dont}</p>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
