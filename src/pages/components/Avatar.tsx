import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import { Avatar as Av } from '../../lib/Avatar/Avatar';
import './avatar.css';

const FOTO = '/fotos/rafael-milagre.jpg';
/* Imagem que não decodifica: simula a foto que falha (link quebrado, arquivo
   removido) sem gerar requisição 404 na página. */
const FOTO_QUEBRADA = 'data:image/png;base64,AAAA';

const SIZES = [
  { size: 'xs', px: 20 },
  { size: 'sm', px: 28 },
  { size: 'md', px: 36 },
  { size: 'lg', px: 52 },
  { size: 'xl', px: 80 },
] as const;

const LISTA = [
  { nome: 'Rafael Milagre', papel: 'Fundador', foto: FOTO },
  { nome: 'Yago Martins', papel: 'Co-fundador' },
  { nome: 'Luccas Riedo', papel: 'CEO' },
];

const CODE = `import { Avatar } from '@viverdeia/design-system';

// com foto: o alt dá o nome pro leitor de tela
<Avatar src="/fotos/rafael-milagre.jpg" alt="Rafael Milagre" size="lg" />

// sem foto, ou foto que falha: as iniciais vêm do alt ("YM")
<Avatar alt="Yago Martins" size="lg" />`;

export default function Avatar() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · avatar"
        title={
          <>
            O rosto quando há foto, <em>as iniciais</em> quando não.
          </>
        }
        lede="O avatar recorta a foto no próprio círculo, sem anel nem halo. Se a foto não existe ou falha ao carregar, as iniciais entram no mesmo lugar e no mesmo tamanho. Cinco tamanhos, sempre pareados ao texto ao lado."
      />

      <Section title="Com foto" meta="src + alt · xs 20 · sm 28 · md 36 · lg 52 · xl 80">
        <div className="vds-av-stage">
          <div className="vds-av-sizes">
            {SIZES.map((s) => (
              <figure key={s.size} className="vds-av-size">
                <Av src={FOTO} alt="Rafael Milagre" size={s.size} />
                <figcaption>
                  {s.size} <span>· {s.px}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Quando a foto falha" meta="fallback de iniciais">
        <p>
          O <code className="vds-code-inline">alt</code> com o nome completo faz as duas coisas: dá o nome pro leitor de
          tela e gera as iniciais. Se a imagem não carrega, o avatar troca sozinho pras iniciais; trocar o{' '}
          <code className="vds-code-inline">src</code> tenta de novo.
        </p>
        <div className="vds-av-cases">
          <figure className="vds-av-stage vds-av-case">
            <Av src={FOTO} alt="Rafael Milagre" size="xl" />
            <figcaption>
              <strong>Foto carregou</strong>
              <span>src válido</span>
            </figcaption>
          </figure>
          <figure className="vds-av-stage vds-av-case">
            <Av src={FOTO_QUEBRADA} alt="Rafael Milagre" size="xl" />
            <figcaption>
              <strong>Foto falhou</strong>
              <span>src quebrado → iniciais</span>
            </figcaption>
          </figure>
          <figure className="vds-av-stage vds-av-case">
            <Av alt="Yago Martins" size="xl" />
            <figcaption>
              <strong>Sem foto</strong>
              <span>sem src → iniciais</span>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section title="Grupo" meta="pilha · −8px · recorte na cor da superfície">
        <div className="vds-av-stage vds-av-group-row">
          <div className="vds-av-stack" role="group" aria-label="Rafael Milagre, Yago Martins, Luccas Riedo e mais 2 pessoas">
            <Av src={FOTO} alt="Rafael Milagre" size="md" />
            <Av alt="Yago Martins" size="md" />
            <Av alt="Luccas Riedo" size="md" />
            <span className="vds-av-more" aria-hidden="true">
              +2
            </span>
          </div>
          <p className="vds-av-group-text">
            <strong>Rafael, Yago, Luccas</strong> e mais 2
          </p>
        </div>
        <p className="vds-av-note">
          A sobreposição se separa por um recorte na cor da superfície embaixo, não por anel. Mostre no máximo três ou
          quatro rostos e resuma o resto num número.
        </p>
      </Section>

      <Section title="Na lista" meta="avatar + nome + papel">
        <ul className="vds-av-stage vds-av-list">
          {LISTA.map((p) => (
            <li key={p.nome}>
              <Av src={p.foto} alt={p.nome} size="md" />
              <div>
                <strong>{p.nome}</strong>
                <span>{p.papel} · Viver de IA</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Faça e evite" meta="regras de uso">
        <div className="vds-do-dont vds-av-rules">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <ul>
              <li>Foto recortada pelo próprio círculo, encostando na borda.</li>
              <li>alt com o nome completo da pessoa, nunca “usuário”.</li>
              <li>Retrato real, com autorização, do mesmo jeito da página de fotografia.</li>
            </ul>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <ul>
              <li>Anel, halo ou borda colorida em volta da foto.</li>
              <li>Status pintado em anel: ele mora só no ponto.</li>
              <li>Banco de imagem ou rosto gerado por IA no lugar de alguém.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Código" meta="React">
        <CodeBlock>{CODE}</CodeBlock>
      </Section>
    </>
  );
}
