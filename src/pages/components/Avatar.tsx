import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './avatar.css';

const people = [
  { name: 'Caio Fontana', initials: 'BF', tone: 'navy' },
  { name: 'Márisson Lage', initials: 'ML', tone: 'gray' },
  { name: 'Guilherme Delorenzo', initials: 'GD', tone: 'navy' },
  { name: 'Larissa Tavares', initials: 'LT', tone: 'gray' },
  { name: 'Rafael Milagre', initials: 'RM', tone: 'navy' },
];

export default function Avatar() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · avatar"
        title={<>Iniciais em <em>Geist</em>, círculo navy.</>}
        lede="Avatar com iniciais em serif sobre fundo navy ou cinza. Quando há foto, ela vem em duotone navy. Tamanhos sm/md/lg para nav, lista e perfil — sempre pareados ao tamanho do texto vizinho."
      />

      <Section title="Tamanhos" meta="sm 28 · md 40 · lg 56">
        <div className="via-avatar-row">
          <div className="via-avatar sm">RM</div>
          <div className="via-avatar md">RM</div>
          <div className="via-avatar lg">RM</div>
        </div>
      </Section>

      <Section title="Stack" meta="grupos · -8 overlap">
        <div className="via-avatar-stack">
          {people.map((p) => (
            <span key={p.name} className={`via-avatar md ${p.tone}`} title={p.name}>{p.initials}</span>
          ))}
          <span className="via-avatar md more">+12</span>
        </div>
      </Section>

      <Section title="Com texto" meta="lista">
        <div className="via-avatar-list">
          {people.slice(0, 3).map((p) => (
            <div className="row" key={p.name}>
              <span className={`via-avatar sm ${p.tone}`}>{p.initials}</span>
              <div>
                <div className="name">{p.name}</div>
                <div className="role">Mentoria · turma 2026.2</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
