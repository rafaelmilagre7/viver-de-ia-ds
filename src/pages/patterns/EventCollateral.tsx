import { Calendar, Mic, Map, FileText, BookOpen, Users } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import leadersAI from '../../assets/logos/leaders-ai-conference-logo.png';
import './event-collateral.css';

/* ============================================================
   Event collateral · guidelines · Leaders AI Conference
   ============================================================ */

export default function EventCollateral() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · event collateral"
        title={
          <>
            Material de evento · <em>guidelines + 6 peças</em>.
          </>
        }
        lede="Leaders AI Conference é evento próprio derivado do VIA. Mantém paleta navy + tipografia editorial Geist, com sub-brand mark própria. Esta página descreve as 6 peças canônicas do evento + regras de combinação com o brand principal."
      />

      <BrandRelationSection />
      <PiecesSection />
      <RulesSection />
    </>
  );
}

/* ---------- Brand relation ---------- */
function BrandRelationSection() {
  return (
    <Section
      title="Como Leaders AI Conference se relaciona com Viver de IA"
      meta="sub-brand quase independente · mesma família visual · mark própria"
    >
      <article className="vds-ev-relation">
        <div className="vds-ev-relation-canvas via-mesh-navy via-noise">
          <span className="vds-ev-relation-aura-1" aria-hidden="true" />
          <span className="vds-ev-relation-aura-2" aria-hidden="true" />

          <div className="vds-ev-relation-marks">
            <div className="vds-ev-mark">
              <img src={monogramWhite} alt="Viver de IA" />
              <span className="vds-ev-mark-label">
                <em>institucional</em>
                <strong>Viver de IA</strong>
              </span>
            </div>

            <span className="vds-ev-relation-rule" aria-hidden="true">
              <span className="vds-ev-relation-rule-dot" />
            </span>

            <div className="vds-ev-mark leaders">
              <img src={leadersAI} alt="Leaders AI Conference" />
              <span className="vds-ev-mark-label">
                <em>sub-brand evento</em>
                <strong>Leaders AI Conference</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="vds-ev-relation-text">
          <span className="vds-ev-relation-eyebrow">arquitetura de marca</span>
          <h3>Sub-brand · <em>não substitui o principal</em></h3>

          <ul className="vds-ev-relation-list">
            <li>
              <strong>Material de evento usa Leaders AI mark como protagonista</strong>
              <span>capa de deck, badge, signage, programa · monogram VIA aparece como assinatura no rodapé</span>
            </li>
            <li>
              <strong>Material institucional VIA continua com monogram + wordmark canônicos</strong>
              <span>Leaders AI mark não aparece em landing principal, email transacional, ou pitch deck genérico</span>
            </li>
            <li>
              <strong>Paleta + tipografia · mesma família visual</strong>
              <span>navy mesh, Geist Display, sem foto literal, mesmas regras editoriais · a diferença é só o mark dominante</span>
            </li>
          </ul>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Pieces ---------- */
function PiecesSection() {
  const pieces = [
    {
      icon: Calendar,
      name: 'Save-the-date',
      use: '120 dias antes · email + social + landing pré',
      brief: 'Anuncia data + cidade + tema. 1 linha de copy editorial · CTA "Reserve a data". Não vende ingresso ainda. Cria expectativa.',
      mock: 'navy mesh · Leaders AI mark centralizado · data em mono grande · cidade pequena · sem CTA forte',
    },
    {
      icon: Mic,
      name: 'Speaker kit',
      use: 'após confirmação · 3 dias antes',
      brief: 'PDF A4 multipágina. Logo Leaders AI capa + monogram VIA assinatura · briefing do tema · timing · contatos de produção · hotel · transfer · próximos passos.',
      mock: 'capa navy + Leaders AI · 4-6 páginas internas com hierarquia editorial · checklist visual',
    },
    {
      icon: Map,
      name: 'Signage venue',
      use: 'no dia · banners físicos · totens · wayfinding',
      brief: '3 categorias: wayfinding (placas direcionais), institucional (banners atrás do palco), promocional (sponsors). Leaders AI mark grande em institucional. Wayfinding com setas grandes + texto curto.',
      mock: 'roll-up 80×200cm · banner palco 600×200cm · placa direcional 60×40cm',
    },
    {
      icon: BookOpen,
      name: 'Program book',
      use: 'distribuído no credenciamento · A5 impresso',
      brief: '24-32 páginas. Capa Leaders AI navy mesh · index editorial · agenda dia-a-dia · perfil dos speakers (1 página cada) · mapa do venue · agradecimento sponsors · rodapé com monogram VIA.',
      mock: 'A5 paisagem · offset 90g · grampo central · acabamento fosco',
    },
    {
      icon: Users,
      name: 'Badge físico',
      use: 'credencial do participante · 4 dias no pescoço',
      brief: 'Front: nome (44pt) + role (16pt) + empresa (14pt) + QR code de check-in. Verso: agenda condensada do dia + emergency contacts. Material polipropileno reciclado · cordão navy.',
      mock: 'CR80 paisagem 105×64mm · 2 lados · QR canto inferior direito',
    },
    {
      icon: FileText,
      name: 'After-event recap',
      use: 'D+1 a D+7 · email + social + blog + YouTube',
      brief: 'Editorial · não promocional. "3 momentos que ficaram" · 1 número marcante por dia · quote atribuído de speaker · próximo evento. Sem "obrigado por participar!", com peso real.',
      mock: 'email coverage padrão · blog post editorial · reel 60s · LinkedIn carousel 10 cards',
    },
  ];

  return (
    <Section
      title="6 peças canônicas do evento"
      meta="cada uma com briefing editorial · spec de produção"
    >
      <div className="vds-ev-pieces">
        {pieces.map((p, i) => {
          const Icon = p.icon;
          return (
            <article key={p.name} className="vds-ev-piece">
              <header>
                <span className="vds-ev-piece-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="vds-ev-piece-icon">
                  <Icon size={15} strokeWidth={1.8} />
                </span>
                <div>
                  <strong>{p.name}</strong>
                  <em>{p.use}</em>
                </div>
              </header>

              <div className="vds-ev-piece-body">
                <span className="vds-ev-piece-eyebrow">briefing editorial</span>
                <p>{p.brief}</p>
              </div>

              <footer className="vds-ev-piece-mock">
                <span className="vds-ev-piece-mock-eyebrow">spec física</span>
                <p>{p.mock}</p>
              </footer>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Rules ---------- */
function RulesSection() {
  const rules = [
    {
      title: 'Leaders AI mark domina material do evento',
      desc: 'Monogram VIA aparece como assinatura rodapé / canto, indicando organização. Nunca os dois com peso visual igual no mesmo material.',
    },
    {
      title: 'Paleta restrita continua valendo',
      desc: 'Navy + cinza + branco. Evento não introduz cor de marca nova. Quem fizer signage colorida pra "destacar o palco" tá quebrando o sistema.',
    },
    {
      title: 'Tipografia · Geist Display + Geist Mono',
      desc: 'Iguais ao DS principal. Nada de "font do evento". Quem comprar template pronto na Canva e usar Inter no badge tá fora.',
    },
    {
      title: 'Voz editorial mantém',
      desc: '"Operador-experiente, sem guru-bro". Speaker kit não vira folder corporativo. Recap não vira "obrigado por participar!". Vibe de revista editorial densa, não de evento de coaching motivacional.',
    },
    {
      title: 'Speaker kit + program book = peças premium',
      desc: 'Investimento maior em papel/acabamento porque saem com o participante e viram lembrança física. Badge é descartável, mas program é guardado.',
    },
  ];

  return (
    <Section
      title="Regras canônicas de material de evento"
      meta="quando usar mark principal vs sub-brand · paleta · voz"
    >
      <article className="vds-ev-rules">
        <header className="vds-ev-rules-head">
          <span className="vds-ev-rules-eyebrow">guidelines</span>
          <h4>5 regras não-negociáveis</h4>
        </header>

        <ol className="vds-ev-rules-list">
          {rules.map((r, i) => (
            <li key={r.title}>
              <span className="vds-ev-rule-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{r.title}</strong>
                <p>{r.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </Section>
  );
}
