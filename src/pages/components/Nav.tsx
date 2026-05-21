import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import wordmark from '../../assets/logos/VIVER_DE_IA_black.png';
import wordmarkWhite from '../../assets/logos/VIVER_DE_IA_white.png';
import './nav.css';

export default function Nav() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · navegação"
        title={<>Sticky, <em>vidro leve</em>, hairline.</>}
        lede="Nav padrão fica grudada no topo com glass de 18px e borda-inferior hairline. À esquerda, wordmark. No meio, links em uppercase 0.16em. À direita, um CTA e talvez um avatar. Duas variantes — light e dark."
      />

      <Section title="Light · sobre off-white" meta="default">
        <div className="via-nav-stage light">
          <header className="via-nav-l">
            <img src={wordmark} alt="Viver de IA" />
            <nav>
              <a className="active">Mentoria</a>
              <a>Cases</a>
              <a>Manifesto</a>
              <a>Imprensa</a>
            </nav>
            <button>Entrar</button>
          </header>
        </div>
      </Section>

      <Section title="Dark · sobre navy" meta="event / hero">
        <div className="via-nav-stage dark">
          <header className="via-nav-d">
            <img src={wordmarkWhite} alt="Viver de IA" />
            <nav>
              <a className="active">Agenda</a>
              <a>Speakers</a>
              <a>Ingressos</a>
              <a>Parceiros</a>
            </nav>
            <button>Comprar</button>
          </header>
        </div>
      </Section>
    </>
  );
}
