import type { CSSProperties, ReactNode } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import CodeBlock from '../../components/docs/CodeBlock';
import './photography.css';

/* Acervo real da marca em public/fotos: cada foto em .webp + .jpg do mesmo
   recorte. O texto alternativo descreve o que aparece em CADA versão. */
const RETRATO = { src: '/fotos/rafael-milagre-retrato', w: 960, h: 1200 };
const QUADRADO = { src: '/fotos/rafael-milagre', w: 800, h: 800 };
const YAGO = { src: '/fotos/yago-martins', w: 800, h: 800 };
const SOCIOS = { src: '/fotos/socios', w: 1600, h: 1067 };
const PALCO = { src: '/fotos/evento-palco', w: 1600, h: 900 };
const SALA = { src: '/fotos/evento-sala', w: 1600, h: 900 };

type FotoProps = {
  img?: typeof RETRATO;
  className?: string;
  alt: string;
  focus?: string;
  ratio?: string;
  children?: ReactNode;
};

function Foto({ img = RETRATO, className = '', alt, focus, ratio, children }: FotoProps) {
  const style =
    focus || ratio
      ? ({
          ...(focus && { '--via-photo-focus': focus }),
          ...(ratio && { '--via-photo-ratio': ratio }),
        } as CSSProperties)
      : undefined;
  return (
    <figure className={`via-photo ${className}`.trim()} style={style}>
      <picture>
        <source srcSet={`${img.src}.webp`} type="image/webp" />
        <img src={`${img.src}.jpg`} alt={alt} width={img.w} height={img.h} loading="lazy" decoding="async" />
      </picture>
      {children}
    </figure>
  );
}

function Legenda({ title, code, children }: { title: string; code: string; children: ReactNode }) {
  return (
    <div className="vds-ph-label">
      <p className="vds-ph-label-title">
        {title} <code>{code}</code>
      </p>
      <p className="vds-ph-label-text">{children}</p>
    </div>
  );
}

const CODE_BASE = `<figure class="via-photo via-photo--duotone via-photo--scrim">
  <picture>
    <source srcset="/fotos/rafael-milagre-retrato.webp" type="image/webp">
    <img src="/fotos/rafael-milagre-retrato.jpg"
         alt="Retrato de Rafael Milagre sorrindo, de camiseta clara, sobre fundo escuro"
         width="960" height="1200" loading="lazy" decoding="async">
  </picture>
  <figcaption class="via-photo__caption">
    <strong>Rafael Milagre</strong>
    <span>Fundador · Viver de IA</span>
  </figcaption>
</figure>`;

const CODE_VARIANTES = `<!-- proporção: 4:5 é o padrão · --square (1:1) · --wide (16:9) · ou livre -->
<figure class="via-photo via-photo--wide" style="--via-photo-focus: 50% 45%">…</figure>
<figure class="via-photo" style="--via-photo-ratio: 3 / 2">…</figure>

<!-- vidro sobre foto: scrim embaixo, vidro por cima -->
<figure class="via-photo via-photo--duotone via-photo--scrim">
  <picture>…</picture>
  <div class="via-glass-strong">…</div>
</figure>

<!-- sem foto ainda: monograma na mesma moldura -->
<figure class="via-photo via-photo--monogram">
  <span class="via-photo__initials" aria-hidden="true">LR</span>
  <figcaption class="via-photo__caption">
    <strong>Luccas Riedo</strong>
    <span>CEO</span>
  </figcaption>
</figure>`;

const RECEITA: [string, string][] = [
  ['.via-photo', 'Moldura: raio xl, fio de 1px por dentro, sombra de tinta. Recorta a foto em 4:5.'],
  ['--square · --wide', 'Proporção 1:1 ou 16:9. Para outra, --via-photo-ratio no elemento.'],
  ['--via-photo-focus', 'Onde o recorte se apoia (object-position). Padrão 50% 30%.'],
  ['--duotone', 'Cinza + multiplicação navy. Unifica fotos de origens diferentes.'],
  ['--scrim', 'Escurece a base em navy pra legenda ou vidro por cima.'],
  ['__caption', 'Legenda branca na base: nome em destaque, papel em cinza claro.'],
  ['--monogram', 'Sem foto: iniciais na mesma moldura, superfície clara do tema.'],
];

const ACERVO: [string, string][] = [
  ['rafael-milagre-retrato', 'Rafael Milagre, fundador · 4:5 · 960×1200. Retrato, palestrante, card de pessoa.'],
  ['rafael-milagre', 'O mesmo retrato em 1:1 · 800×800. Avatar, perfil, grade.'],
  ['yago-martins', 'Yago Martins, co-fundador · 1:1 · 800×800.'],
  ['socios', 'Os dois sócios no escritório · 3:2 · 1600×1067.'],
  ['evento-palco', 'Palco da Viver de IA Experience · 16:9 · 1600×900.'],
  ['evento-sala', 'Sala da Experience vista do fundo · 16:9 · 1600×900.'],
];

const LISTA: { what: string; how: string; fmt: string }[] = [
  {
    what: 'Retrato do resto da liderança',
    how: 'Os dois sócios já estão no acervo. Pro restante: fundo liso e neutro, luz de janela de lado, da cintura pra cima com respiro em volta. Uma olhando pra câmera, outra olhando pro lado.',
    fmt: 'vertical · 4:5',
  },
  {
    what: 'Bastidores de mentoria',
    how: 'Check-in em grupo e sessão individual acontecendo de verdade, sem pose. Rosto, mãos e tela no mesmo quadro.',
    fmt: 'horizontal · 16:9',
  },
  {
    what: 'Evento',
    how: 'Palco e sala da Experience já estão no acervo. Falta conversa no intervalo e plateia de perfil, com autorização de quem aparece. A pessoa no centro, não o logo do patrocinador.',
    fmt: '16:9 e 4:5',
  },
  {
    what: 'Telas em uso',
    how: 'Mãos no notebook ou no celular com a plataforma aberta. Tela nítida ou desfocada de propósito, nunca meio termo.',
    fmt: 'horizontal · 16:9',
  },
  {
    what: 'Alunos que topam aparecer',
    how: 'Retrato no lugar de trabalho da pessoa, pra case e depoimento, com autorização de uso de imagem assinada.',
    fmt: '4:5 e 16:9',
  },
];

export default function IconographyPhotography() {
  return (
    <>
      <DocsHeader
        eyebrow="Iconografia · fotografia"
        title={
          <>
            Gente de verdade, <em>luz fria</em>.
          </>
        }
        lede="A foto da marca mostra quem faz a Viver de IA e quem implementa com ela: retrato real, luz natural, tom frio. É a mesma foto nos dois temas. Quem separa a imagem do fundo é a moldura, não um filtro."
      />

      <Section title="Natural e duotone" meta=".via-photo · --duotone · --scrim">
        <div className="vds-ph-trio">
          <div className="vds-ph-item">
            <Foto alt="Retrato de Rafael Milagre sorrindo, de camiseta clara, sobre fundo escuro" />
            <Legenda title="Natural" code=".via-photo">
              Retrato sozinho na página, perfil, depoimento: a pessoa como ela é.
            </Legenda>
          </div>
          <div className="vds-ph-item">
            <Foto className="via-photo--duotone" alt="Retrato de Rafael Milagre sorrindo, em duotone cinza e navy" />
            <Legenda title="Duotone" code="--duotone">
              Cinza com navy por cima. Junta fotos de origens diferentes numa mesma página.
            </Legenda>
          </div>
          <div className="vds-ph-item vds-ph-item--wide-sm">
            <Foto className="via-photo--duotone via-photo--scrim" alt="Retrato de Rafael Milagre em duotone navy, com a base escurecida">
              <figcaption className="via-photo__caption">
                <strong>Rafael Milagre</strong>
                <span>Fundador · Viver de IA</span>
              </figcaption>
            </Foto>
            <Legenda title="Com legenda" code="--scrim + __caption">
              O scrim escurece a base em navy e a legenda branca fica legível sobre qualquer roupa.
            </Legenda>
          </div>
        </div>
      </Section>

      <Section title="Proporções" meta="4:5 · 1:1 · 16:9 · --via-photo-ratio">
        <div className="vds-ph-ratios">
          <div className="vds-ph-item">
            <Foto className="via-photo--duotone" alt="Rafael Milagre em recorte vertical 4 por 5" />
            <Legenda title="4:5" code="padrão">Retrato, card de pessoa, palestrante.</Legenda>
          </div>
          <div className="vds-ph-item">
            <Foto img={QUADRADO} className="via-photo--duotone via-photo--square" alt="Rafael Milagre em recorte quadrado" />
            <Legenda title="1:1" code="--square">Grade densa, post, perfil grande.</Legenda>
          </div>
          <div className="vds-ph-item vds-ph-item--wide">
            <Foto
              img={PALCO}
              className="via-photo--duotone via-photo--wide"
              alt="Palestrante no palco da Viver de IA Experience, com a plateia em silhueta"
            />
            <Legenda title="16:9" code="--wide">Capa, banner, palco. Pede foto aberta, com respiro.</Legenda>
          </div>
        </div>
      </Section>

      <Section title="Enquadramento" meta="--via-photo-focus">
        <p>
          O recorte se apoia em <code className="vds-code-inline">--via-photo-focus</code>. O padrão,{' '}
          <code className="vds-code-inline">50% 30%</code>, serve pra retrato vertical. Em recorte largo, ajuste até os
          olhos ficarem perto do terço de cima, sem cortar boca nem olhos.
        </p>
        <div className="vds-ph-focus">
          <div className="vds-ph-item">
            <Foto
              img={QUADRADO}
              className="via-photo--wide"
              focus="50% 45%"
              alt="Recorte largo com os olhos de Rafael Milagre perto do terço de cima"
            >
              <span className="vds-ph-thirds" aria-hidden="true" />
            </Foto>
            <p className="vds-ph-verdict vds-ph-verdict--do">
              Faça <code>50% 45%</code>
              <span>olhos no terço de cima</span>
            </p>
          </div>
          <div className="vds-ph-item">
            <Foto img={QUADRADO} className="via-photo--wide" focus="50% 0%" alt="Recorte largo que corta o rosto de Rafael Milagre na altura da boca" />
            <p className="vds-ph-verdict vds-ph-verdict--dont">
              Evite <code>50% 0%</code>
              <span>corta na boca</span>
            </p>
          </div>
          <div className="vds-ph-item">
            <Foto img={QUADRADO} className="via-photo--wide" focus="50% 100%" alt="Recorte largo que corta o rosto de Rafael Milagre na altura dos olhos" />
            <p className="vds-ph-verdict vds-ph-verdict--dont">
              Evite <code>50% 100%</code>
              <span>corta nos olhos</span>
            </p>
          </div>
        </div>
      </Section>

      <Section title="Foto sob vidro" meta="--scrim + .via-glass-strong · .via-glass-dark">
        <p>
          Texto em cima de foto sempre tem apoio: scrim, vidro ou os dois. O vidro claro segue o tema da interface; o
          escuro é fixo, pra momento navy. Nos dois, o contraste do texto passa de 4,5:1 medido no pixel.
        </p>
        <div className="vds-ph-glass">
          <div className="vds-ph-item">
            <Foto
              img={QUADRADO}
              className="via-photo--duotone via-photo--scrim via-photo--square"
              alt="Retrato de Rafael Milagre em duotone, com um painel de vidro na base"
            >
              <div className="via-glass-strong vds-ph-glass-card">
                <span className="vds-ph-glass-eyebrow">quem lidera</span>
                <strong>Rafael Milagre</strong>
                <span>Fundador · Viver de IA</span>
              </div>
            </Foto>
            <Legenda title="Vidro da interface" code=".via-glass-strong">
              Segue o tema: claro no claro, escuro no escuro.
            </Legenda>
          </div>
          <div className="vds-ph-item">
            <Foto
              img={QUADRADO}
              className="via-photo--duotone via-photo--scrim via-photo--square"
              alt="Retrato de Rafael Milagre em duotone, com um painel de vidro escuro na base"
            >
              <div className="via-glass-dark vds-ph-glass-card">
                <span className="vds-ph-glass-eyebrow">quem lidera</span>
                <strong>Rafael Milagre</strong>
                <span>Fundador · Viver de IA</span>
              </div>
            </Foto>
            <Legenda title="Vidro escuro" code=".via-glass-dark">
              Fixo nos dois temas, pra capa e momento navy.
            </Legenda>
          </div>
        </div>
      </Section>

      <Section title="Claro e escuro" meta="a foto não muda com o tema">
        <p>
          Foto é conteúdo, não interface: nada de inverter, escurecer ou trocar a imagem no tema escuro. O fio de 1px por
          dentro da moldura separa a foto do fundo nos dois.
        </p>
        <div className="vds-ph-themes">
          <div className="vds-ph-theme vds-ph-theme--light">
            <span className="vds-ph-theme-name">Tema claro</span>
            <div className="vds-ph-theme-row">
              <Foto img={QUADRADO} className="via-photo--duotone via-photo--square" alt="Retrato de Rafael Milagre em duotone, sobre fundo claro" />
              <div>
                <strong>Rafael Milagre</strong>
                <span>Fundador · Viver de IA</span>
              </div>
            </div>
          </div>
          <div className="vds-ph-theme vds-ph-theme--dark">
            <span className="vds-ph-theme-name">Tema escuro</span>
            <div className="vds-ph-theme-row">
              <Foto img={QUADRADO} className="via-photo--duotone via-photo--square" alt="Retrato de Rafael Milagre em duotone, sobre fundo escuro" />
              <div>
                <strong>Rafael Milagre</strong>
                <span>Fundador · Viver de IA</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Sem foto ainda" meta="--monogram">
        <p>
          Enquanto a foto não chega, as iniciais ocupam a mesma moldura e a grade não quebra: foto e monograma convivem
          na mesma fileira. Nada de laje navy vazia, silhueta genérica ou rosto gerado por IA no lugar.
        </p>
        <div className="vds-ph-team">
          <Foto className="via-photo--duotone via-photo--scrim" alt="Retrato de Rafael Milagre sorrindo, em duotone">
            <figcaption className="via-photo__caption">
              <strong>Rafael Milagre</strong>
              <span>Fundador</span>
            </figcaption>
          </Foto>
          <Foto img={YAGO} className="via-photo--duotone via-photo--scrim" alt="Retrato de Yago Martins sorrindo, de óculos, em duotone">
            <figcaption className="via-photo__caption">
              <strong>Yago Martins</strong>
              <span>Co-fundador</span>
            </figcaption>
          </Foto>
          <figure className="via-photo via-photo--monogram">
            <span className="via-photo__initials" aria-hidden="true">LR</span>
            <figcaption className="via-photo__caption">
              <strong>Luccas Riedo</strong>
              <span>CEO</span>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section title="Acervo" meta="fotos reais da marca, prontas pra usar">
        <p>
          Antes de pedir foto nova, comece pelo acervo. Cada foto vem em .webp e .jpg do mesmo recorte, já no tamanho
          pra tela de alta densidade.
        </p>
        <div className="vds-ph-acervo">
          <div className="vds-ph-item">
            <Foto img={SOCIOS} ratio="3 / 2" alt="Rafael Milagre e Yago Martins lado a lado no escritório, com o time trabalhando ao fundo" />
            <Legenda title="Sócios no escritório" code="socios · 3:2">
              Quem somos, sobre, imprensa. O time ao fundo, desfocado, mostra a operação sem tirar o foco dos dois.
            </Legenda>
          </div>
          <div className="vds-ph-item">
            <Foto img={SALA} className="via-photo--wide" alt="Sala da Viver de IA Experience vista do fundo, com a plateia diante do palco" />
            <Legenda title="Sala do evento" code="evento-sala · 16:9">
              Capa de evento e convite. Plateia de costas, sem rosto em destaque.
            </Legenda>
          </div>
        </div>
        <dl className="vds-ph-recipe">
          {ACERVO.map(([k, v]) => (
            <div key={k}>
              <dt>
                <code>{k}</code>
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Faça e evite" meta="regras de uso">
        <div className="vds-do-dont vds-ph-rules">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <ul>
              <li>Pessoas reais da Viver de IA e alunos, com autorização de uso de imagem por escrito.</li>
              <li>Luz natural ou de janela, fundo neutro, pele com textura de verdade.</li>
              <li>
                Texto alternativo que diz quem é e o que aparece: “Rafael Milagre sorrindo, de camiseta clara”. Foto só
                decorativa leva texto alternativo vazio.
              </li>
              <li>A mesma foto nos dois temas, com a moldura fazendo a separação.</li>
              <li>Duotone quando várias fotos de origens diferentes dividem a página.</li>
            </ul>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <ul>
              <li>Banco de imagem genérico: aperto de mão, gente apontando pra tela, cérebro brilhando.</li>
              <li>Rosto gerado por IA apresentado como pessoa real, nem como espaço reservado.</li>
              <li>Texto direto sobre a foto, sem scrim e sem vidro.</li>
              <li>Anel, halo ou borda colorida em volta do retrato.</li>
              <li>Saturação alta, vinheta pesada, filtro que muda com o tema.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Fotos que a marca precisa" meta="lista pra produção">
        <ol className="vds-ph-list">
          {LISTA.map((item, i) => (
            <li key={item.what}>
              <span className="vds-ph-list-n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <strong>{item.what}</strong>
                <p>{item.how}</p>
              </div>
              <span className="vds-ph-list-fmt">{item.fmt}</span>
            </li>
          ))}
        </ol>
        <p className="vds-ph-send">
          <strong>Como mandar:</strong> arquivo original da câmera ou do celular (pelo WhatsApp a foto chega comprimida),
          com nome e cargo de quem aparece e a autorização de uso de imagem.
        </p>
      </Section>

      <Section title="Código" meta="HTML cru · surfaces.css">
        <div className="vds-ph-code">
          <CodeBlock>{CODE_BASE}</CodeBlock>
          <CodeBlock>{CODE_VARIANTES}</CodeBlock>
        </div>
        <dl className="vds-ph-recipe">
          {RECEITA.map(([k, v]) => (
            <div key={k}>
              <dt>
                <code>{k}</code>
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
