import { MessageCircle, ChevronRight, Search, Filter, Link2 } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import { Button } from '../../lib/Button/Button';
import './people.css';

/* Quem aparece aqui: só a liderança real (ficha de fatos) ou espaço reservado
   à vista ([Aluno 1]…). Número só da ficha, com a fonte do lado. */
const FOTO = '/fotos/rafael-milagre';

function Retrato({ alt, className = '' }: { alt: string; className?: string }) {
  return (
    <picture>
      <source srcSet={`${FOTO}.webp`} type="image/webp" />
      <img className={className} src={`${FOTO}.jpg`} alt={alt} width={512} height={512} loading="lazy" decoding="async" />
    </picture>
  );
}

/* Rosto pequeno (lista, prévia) · foto recortada no círculo, ou iniciais em
   superfície clara. Fio de 1px por dentro, igual à moldura da foto: sem anel. */
function Rosto({ iniciais, foto, alt, status }: { iniciais: string; foto?: boolean; alt?: string; status?: string }) {
  return (
    <span className={`vds-pp-face${foto ? ' has-photo' : ''}`}>
      {foto ? <Retrato alt={alt ?? ''} /> : <span aria-hidden="true">{iniciais}</span>}
      {status && <span className={`vds-pp-dot ${status}`} aria-hidden="true" />}
    </span>
  );
}

export default function People() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · pessoas"
        title={
          <>
            Pessoas, <em>cada uma na sua escala</em>.
          </>
        }
        lede="Quatro intensidades pra mostrar gente: perfil, grade do time, lista de membros e prévia rápida. Com foto, entra a receita da marca; sem foto, as iniciais ocupam a mesma moldura. Nenhum número sem fonte."
      />

      <ProfileSection />
      <TeamGridSection />
      <MemberListSection />
      <UserPopoverSection />
    </>
  );
}

/* ---------- Perfil ---------- */
const FATOS = [
  { n: '521', t: 'cases reais de implementação de IA' },
  { n: '157', t: 'soluções de IA prontas para usar' },
  { n: '29', t: 'setores já transformados com IA' },
];

function ProfileSection() {
  return (
    <Section title="Perfil · cabeçalho editorial" meta="página sobre · palestrante · mentor">
      <article className="vds-pf">
        <figure className="via-photo vds-pf-photo">
          <Retrato alt="Retrato de Rafael Milagre sorrindo, de camiseta clara, com o escritório escuro ao fundo" />
        </figure>

        <div className="vds-pf-body">
          <p className="vds-pf-eyebrow">Fundador · Viver de IA</p>
          <h3>Rafael Milagre</h3>
          <p className="vds-pf-bio">
            [Bio em duas ou três frases, escrita pela própria pessoa: trajetória e o que conduz hoje na Viver de IA.]
          </p>

          <div className="vds-pf-facts">
            <p className="vds-pf-facts-label">A Viver de IA hoje</p>
            <dl>
              {FATOS.map((f) => (
                <div key={f.t}>
                  <dt>{f.t}</dt>
                  <dd>{f.n}</dd>
                </div>
              ))}
            </dl>
            <p className="vds-pf-source">Fonte: ficha de fatos do site oficial, 30/out/2026.</p>
          </div>

          <div className="vds-pf-actions">
            <Button variant="primary" size="md">
              Conhecer a mentoria
            </Button>
            <Button variant="secondary" size="md" iconLeft={<Link2 size={16} strokeWidth={1.75} />}>
              LinkedIn
            </Button>
          </div>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Grade do time ---------- */
const TIME = [
  { nome: 'Rafael Milagre', cargo: 'Fundador', ini: 'RM', foto: true },
  { nome: 'Yago Martins', cargo: 'Co-fundador', ini: 'YM' },
  { nome: 'Luccas Riedo', cargo: 'CEO', ini: 'LR' },
];

function TeamGridSection() {
  return (
    <Section title="Grade do time" meta="página sobre · quem somos">
      <ul className="vds-team">
        {TIME.map((p) => (
          <li key={p.nome}>
            {p.foto ? (
              <figure className="via-photo via-photo--duotone">
                <Retrato alt={`Retrato de ${p.nome} sorrindo, em duotone`} />
              </figure>
            ) : (
              <figure className="via-photo via-photo--monogram" aria-hidden="true">
                <span className="via-photo__initials">{p.ini}</span>
              </figure>
            )}
            <h4>{p.nome}</h4>
            <p>{p.cargo}</p>
          </li>
        ))}
      </ul>
      <p className="vds-pp-note">
        Sem foto ainda, as iniciais ficam na mesma moldura, do mesmo tamanho: a grade não quebra e ninguém vira um bloco
        navy vazio. Quando a foto chegar, entra no lugar.
      </p>
    </Section>
  );
}

/* ---------- Lista de membros ---------- */
const MEMBROS = [
  { nome: '[Aluno 1]', papel: '[cargo] · [empresa]', ini: 'A1', plano: 'Pro', mentoria: 'em grupo', ultima: 'agora', status: 'online' },
  { nome: '[Aluno 2]', papel: '[cargo] · [empresa]', ini: 'A2', plano: 'Enterprise', mentoria: 'individual', ultima: 'hoje', status: 'away' },
  { nome: '[Aluno 3]', papel: '[cargo] · [empresa]', ini: 'A3', plano: 'Starter', mentoria: '—', ultima: 'ontem', status: 'offline' },
  { nome: '[Aluno 4]', papel: '[cargo] · [empresa]', ini: 'A4', plano: 'Pro', mentoria: 'em grupo', ultima: 'esta semana', status: 'busy' },
];
const STATUS: Record<string, string> = { online: 'online', away: 'ausente', busy: 'ocupado', offline: 'offline' };

function MemberListSection() {
  return (
    <Section title="Lista de membros · com status" meta="admin · diretório · plano">
      <div className="vds-member-list">
        <header>
          <div>
            <h3>Membros · todos os planos</h3>
            <p>[N] ativos · 4 mostrados</p>
          </div>
          <div className="vds-member-actions">
            <label className="vds-member-search">
              <Search size={14} strokeWidth={1.75} aria-hidden="true" />
              <span className="vds-pp-sr">Buscar membro</span>
              <input placeholder="Buscar membro" />
            </label>
            <Button variant="secondary" size="sm" iconLeft={<Filter size={14} strokeWidth={1.75} />}>
              Filtros
            </Button>
          </div>
        </header>

        <div className="via-table-wrap">
          <table className="via-table vds-member-table">
            <thead>
              <tr>
                <th scope="col">Membro</th>
                <th scope="col">Plano</th>
                <th scope="col">Mentoria</th>
                <th scope="col">Última atividade</th>
              </tr>
            </thead>
            <tbody>
              {MEMBROS.map((m) => (
                <tr key={m.nome}>
                  <td>
                    <div className="vds-member-user">
                      <Rosto iniciais={m.ini} status={m.status} />
                      <div>
                        <p>
                          <strong>{m.nome}</strong>
                        </p>
                        <span>
                          {m.papel} · <span className="vds-member-status">{STATUS[m.status]}</span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="vds-member-plan">{m.plano}</span>
                  </td>
                  <td className="vds-member-muted">{m.mentoria}</td>
                  <td className="vds-member-muted">{m.ultima}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Prévia ao passar o mouse ---------- */
function UserPopoverSection() {
  return (
    <Section title="Prévia rápida · ao passar o mouse ou citar" meta="quem é a pessoa, sem abrir a página inteira">
      <div className="vds-userpop-row">
        <div className="vds-userpop-card">
          <header>
            <Rosto iniciais="RM" foto alt="Retrato de Rafael Milagre" />
            <span className="vds-userpop-plan">Liderança</span>
          </header>
          <h4>Rafael Milagre</h4>
          <p className="vds-userpop-role">Fundador · Viver de IA</p>
          <p className="vds-userpop-bio">[Uma frase sobre o que a pessoa conduz hoje.]</p>
          <div className="vds-userpop-actions">
            <Button variant="secondary" size="sm" fullWidth iconRight={<ChevronRight size={14} strokeWidth={1.75} />}>
              Ver perfil
            </Button>
          </div>
        </div>

        <div className="vds-userpop-card">
          <header>
            <Rosto iniciais="A1" />
            <span className="vds-userpop-plan">Plano Pro</span>
          </header>
          <h4>[Aluno 1]</h4>
          <p className="vds-userpop-role">[cargo] · [empresa]</p>
          <p className="vds-userpop-bio">Mentoria em grupo: 10 check-ins por mês no plano Pro.</p>
          <div className="vds-userpop-actions">
            <Button variant="primary" size="sm" iconLeft={<MessageCircle size={14} strokeWidth={1.75} />}>
              Mensagem
            </Button>
            <Button variant="secondary" size="sm" iconRight={<ChevronRight size={14} strokeWidth={1.75} />}>
              Perfil
            </Button>
          </div>
        </div>

        <div className="vds-userpop-card">
          <header>
            <Rosto iniciais="A2" />
            <span className="vds-userpop-plan">Enterprise · admin</span>
          </header>
          <h4>[Aluno 2]</h4>
          <p className="vds-userpop-role">[cargo] · [empresa]</p>
          <p className="vds-userpop-bio">Mentoria individual: 1 hora por mês no plano Enterprise.</p>
          <div className="vds-userpop-actions">
            <Button variant="secondary" size="sm" fullWidth iconRight={<ChevronRight size={14} strokeWidth={1.75} />}>
              Ver painel do time
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
