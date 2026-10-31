import {
  Navigation, Calendar, Clock, Car, Train,
  ArrowUpRight, Phone, Mail, Building2,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './location-card.css';

export default function LocationCard() {
  return (
    <>
      <DocsHeader
        eyebrow="Padrões · location / venue"
        title={
          <>
            O endereço como <em>parte da experiência</em>.
          </>
        }
        lede="Card de localização — mapa SVG autoral (não Google Maps embed), endereço editorial, instruções de acesso (carro · metrô · estacionamento), info de contato e CTA pra adicionar ao calendário. Usado em conferências, eventos, sede e endereços comerciais."
      />

      <LocationVenueSection />
      <LocationCompactSection />
    </>
  );
}

/* ---------- Venue principal · Leaders AI Conference ---------- */
function LocationVenueSection() {
  return (
    <Section title="Venue completo · evento + acesso + contato" meta="card 3 cols · mapa SVG · address + access tips + contato">
      <article className="vds-loc">
        {/* Atmospheric SVG map */}
        <div className="vds-loc-map">
          <svg viewBox="0 0 400 300" className="vds-loc-map-svg" preserveAspectRatio="xMidYMid slice">
            {/* Grid pattern background */}
            <defs>
              <pattern id="loc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--via-navy-06)" strokeWidth="0.5" />
              </pattern>
              {/* tinta primária (navy no claro, clara no escuro) — navy fixo sumia no dark */}
              <radialGradient id="loc-pulse" cx="50%" cy="50%">
                <stop offset="0" stopColor="var(--via-text-primary)" stopOpacity="0.5" />
                <stop offset="1" stopColor="var(--via-text-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#loc-grid)" />

            {/* Streets (curves) */}
            <path d="M0,180 Q100,160 200,170 T400,150" stroke="var(--via-navy-16)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M0,100 Q120,110 240,90 T400,70" stroke="var(--via-navy-10)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M80,0 Q100,80 90,160 T100,300" stroke="var(--via-navy-12)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M280,0 Q260,100 290,200 T280,300" stroke="var(--via-navy-08)" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Park / area */}
            <ellipse cx="320" cy="220" rx="60" ry="40" fill="var(--via-navy-08)" />
            <ellipse cx="60" cy="60" rx="40" ry="30" fill="var(--via-navy-06)" />

            {/* Building markers (secondary) */}
            <rect x="140" y="120" width="14" height="14" fill="var(--via-navy-16)" rx="2" />
            <rect x="220" y="200" width="16" height="16" fill="var(--via-navy-16)" rx="2" />
            <rect x="50" y="200" width="12" height="12" fill="var(--via-navy-12)" rx="2" />

            {/* Pulse ring */}
            <circle cx="200" cy="150" r="40" fill="url(#loc-pulse)">
              <animate attributeName="r" values="20;50;20" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
            </circle>

            {/* Main marker · aro branco + glifo branco: o disco navy sumia no mapa
                escuro e o prédio navy-sobre-navy era invisível nos 2 temas */}
            <g transform="translate(200, 150)">
              <circle r="22" style={{ fill: "var(--via-navy)" }} />
              <circle r="22" fill="none" stroke="var(--via-white)" strokeWidth="2" />
              <path d="M-7,-2 L0,-8 L7,-2 L7,8 L-7,8 Z" fill="var(--via-white)" />
              <circle cx="0" cy="2" r="3" style={{ fill: "var(--via-navy)" }} />
            </g>

            {/* Label callout · rect de 116 cortava o texto mono (~146 de largura);
                o excesso ficava navy sobre o mapa escuro = rótulo mutilado no dark */}
            <g transform="translate(200, 110)">
              <rect x="-80" y="-22" width="160" height="22" rx="4" fill="var(--via-white)" stroke="var(--via-navy-16)" />
              <text x="0" y="-7" textAnchor="middle" fontSize="11" fontFamily="var(--via-mono)" style={{ fill: "var(--via-navy)" }} letterSpacing="0.02em">
                [local do evento]
              </text>
            </g>
          </svg>

          <div className="vds-loc-map-attr mono">© Viver de IA · mapa editorial autoral</div>
        </div>

        {/* Right column — venue info */}
        <div className="vds-loc-body">
          <header>
            <span className="vds-loc-eyebrow">Leaders AI Conference · [ano]</span>
            <h3>[Local do evento]</h3>
            <p className="vds-loc-address">
              [Endereço] · [andar]<br />
              [Bairro] · [cidade] · [UF] · [CEP]
            </p>
          </header>

          {/* Date / hours */}
          <div className="vds-loc-dates">
            <article>
              <div className="vds-loc-date-icon">
                <Calendar size={14} strokeWidth={1.75} />
              </div>
              <div>
                <strong>[data]</strong>
                <em>[dias da semana]</em>
              </div>
            </article>
            <article>
              <div className="vds-loc-date-icon">
                <Clock size={14} strokeWidth={1.75} />
              </div>
              <div>
                <strong>[horário]</strong>
                <em>credenciamento abre [hora]</em>
              </div>
            </article>
          </div>

          {/* Access tips */}
          <div className="vds-loc-access">
            <p className="vds-loc-section-eyebrow">Como chegar</p>
            <ul>
              <li>
                <span className="vds-loc-access-icon"><Train size={14} strokeWidth={1.75} /></span>
                <div>
                  <strong>Metrô · [estação mais próxima]</strong>
                  <em>[linha] · [N] min caminhando</em>
                </div>
              </li>
              <li>
                <span className="vds-loc-access-icon"><Car size={14} strokeWidth={1.75} /></span>
                <div>
                  <strong>Estacionamento conveniado</strong>
                  <em>R$ [valor] / dia · validação no check-in</em>
                </div>
              </li>
              <li>
                <span className="vds-loc-access-icon"><Building2 size={14} strokeWidth={1.75} /></span>
                <div>
                  <strong>Hotéis parceiros · [N] opções</strong>
                  <em>desconto [N]% com código [CÓDIGO]</em>
                </div>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="vds-loc-actions">
            <button className="vds-loc-btn primary">
              <Navigation size={14} strokeWidth={1.75} />
              Abrir rota no Google Maps
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </button>
            <button className="vds-loc-btn ghost">
              <Calendar size={14} strokeWidth={1.75} />
              Adicionar ao calendário
            </button>
          </div>

          {/* Contact footer */}
          <footer className="vds-loc-contact">
            <div>
              <span className="vds-loc-contact-lbl">
                <Phone size={14} strokeWidth={1.75} />
                [telefone]
              </span>
              <span className="vds-loc-contact-lbl">
                <Mail size={14} strokeWidth={1.75} />
                eventos@viverdeia.ai
              </span>
            </div>
            <a href="#" className="vds-loc-foot-link">
              Página completa do evento →
            </a>
          </footer>
        </div>
      </article>
    </Section>
  );
}

/* ---------- Compact card · sede ---------- */
function LocationCompactSection() {
  return (
    <Section title="Variante compacta · sede / contato comercial" meta="info-card pra footer · endereço + mapa mini + 1 CTA">
      <div className="vds-loc-compact-row">
        <article className="vds-loc-compact">
          <div className="vds-loc-compact-mini-map">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mini-grid" width="14" height="14" patternUnits="userSpaceOnUse">
                  <path d="M 14 0 L 0 0 0 14" fill="none" stroke="var(--via-navy-08)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="200" height="120" fill="url(#mini-grid)" />
              <path d="M0,70 Q60,60 120,68 T200,58" stroke="var(--via-navy-16)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M60,0 Q70,40 65,80 T70,120" stroke="var(--via-navy-12)" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* mesma receita do pin alt: aro + miolo brancos (navy puro sumia no dark) */}
              <g transform="translate(100, 60)">
                <circle r="11" style={{ fill: "var(--via-navy)" }} />
                <circle r="11" fill="none" stroke="var(--via-white)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" fill="var(--via-white)" />
              </g>
            </svg>
          </div>
          <div className="vds-loc-compact-body">
            <span className="vds-loc-eyebrow">Sede Viver de IA</span>
            <h4>[Endereço da sede]</h4>
            <p>[Bairro] · [cidade] · [UF] · CEP [00000-000]</p>
            <button className="vds-loc-compact-cta">
              Ver no mapa
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </button>
          </div>
        </article>

        <article className="vds-loc-compact">
          <div className="vds-loc-compact-mini-map alt">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mini-grid2" width="14" height="14" patternUnits="userSpaceOnUse">
                  <path d="M 14 0 L 0 0 0 14" fill="none" stroke="var(--via-navy-18)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="200" height="120" fill="url(#mini-grid2)" />
              <path d="M0,50 Q70,40 140,58 T200,68" stroke="rgba(255,255,255,0.18)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <g transform="translate(100, 60)">
                <circle r="11" style={{ fill: "var(--via-navy)" }} />
                <circle r="11" fill="none" stroke="var(--via-white)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" style={{ fill: "var(--via-navy)" }} />
              </g>
            </svg>
          </div>
          <div className="vds-loc-compact-body dark">
            <span className="vds-loc-eyebrow accent">Imersão presencial · sede</span>
            <h4>[Sala da imersão] · [andar]</h4>
            <p>[Bairro] · [cidade] · [UF] · CEP [00000-000]</p>
            <button className="vds-loc-compact-cta dark">
              Ver no mapa
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </button>
          </div>
        </article>
      </div>
    </Section>
  );
}
