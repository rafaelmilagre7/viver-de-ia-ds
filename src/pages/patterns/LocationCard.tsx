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
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(10,31,59,0.06)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="loc-pulse" cx="50%" cy="50%">
                <stop offset="0" stopColor="var(--via-navy)" stopOpacity="0.5" />
                <stop offset="1" stopColor="var(--via-navy)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#loc-grid)" />

            {/* Streets (curves) */}
            <path d="M0,180 Q100,160 200,170 T400,150" stroke="rgba(10,31,59,0.16)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M0,100 Q120,110 240,90 T400,70" stroke="rgba(10,31,59,0.1)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M80,0 Q100,80 90,160 T100,300" stroke="rgba(10,31,59,0.12)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M280,0 Q260,100 290,200 T280,300" stroke="rgba(10,31,59,0.08)" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Park / area */}
            <ellipse cx="320" cy="220" rx="60" ry="40" fill="rgba(10,31,59,0.08)" />
            <ellipse cx="60" cy="60" rx="40" ry="30" fill="rgba(10,31,59,0.06)" />

            {/* Building markers (secondary) */}
            <rect x="140" y="120" width="14" height="14" fill="rgba(10,31,59,0.16)" rx="2" />
            <rect x="220" y="200" width="16" height="16" fill="rgba(10,31,59,0.16)" rx="2" />
            <rect x="50" y="200" width="12" height="12" fill="rgba(10,31,59,0.12)" rx="2" />

            {/* Pulse ring */}
            <circle cx="200" cy="150" r="40" fill="url(#loc-pulse)">
              <animate attributeName="r" values="20;50;20" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
            </circle>

            {/* Main marker */}
            <g transform="translate(200, 150)">
              <circle r="22" style={{ fill: "var(--via-navy)" }} />
              <circle r="22" fill="none" style={{ stroke: "var(--via-navy)" }} strokeWidth="2" />
              <path d="M-7,-2 L0,-8 L7,-2 L7,8 L-7,8 Z" style={{ fill: "var(--via-navy)" }} />
              <circle cx="0" cy="2" r="3" style={{ fill: "var(--via-navy)" }} />
            </g>

            {/* Label callout */}
            <g transform="translate(200, 110)">
              <rect x="-58" y="-22" width="116" height="22" rx="4" fill="var(--via-white)" stroke="rgba(10,31,59,0.16)" />
              <text x="0" y="-7" textAnchor="middle" fontSize="11" fontFamily="var(--via-mono)" style={{ fill: "var(--via-navy)" }} letterSpacing="0.02em">
                Centro de Eventos Frei
              </text>
            </g>
          </svg>

          <div className="vds-loc-map-attr mono">© Viver de IA · mapa editorial autoral</div>
        </div>

        {/* Right column — venue info */}
        <div className="vds-loc-body">
          <header>
            <span className="vds-loc-eyebrow">Leaders AI Conference · 2026</span>
            <h3>Centro de Eventos Frei Caneca</h3>
            <p className="vds-loc-address">
              Rua Frei Caneca, 569 · 4º andar<br />
              Consolação · São Paulo · SP · 01307-001
            </p>
          </header>

          {/* Date / hours */}
          <div className="vds-loc-dates">
            <article>
              <div className="vds-loc-date-icon">
                <Calendar size={13} strokeWidth={1.8} />
              </div>
              <div>
                <strong>18 · 19 · 20 jun 2026</strong>
                <em>quinta a sábado</em>
              </div>
            </article>
            <article>
              <div className="vds-loc-date-icon">
                <Clock size={13} strokeWidth={1.8} />
              </div>
              <div>
                <strong>08h30 — 18h00</strong>
                <em>credenciamento abre 08h00</em>
              </div>
            </article>
          </div>

          {/* Access tips */}
          <div className="vds-loc-access">
            <p className="vds-loc-section-eyebrow">Como chegar</p>
            <ul>
              <li>
                <span className="vds-loc-access-icon"><Train size={12} strokeWidth={1.8} /></span>
                <div>
                  <strong>Metrô · Estação Higienópolis-Mackenzie</strong>
                  <em>linha amarela · 6 min caminhando</em>
                </div>
              </li>
              <li>
                <span className="vds-loc-access-icon"><Car size={12} strokeWidth={1.8} /></span>
                <div>
                  <strong>Estacionamento conveniado</strong>
                  <em>R$ 25 / dia · vagas limitadas · validação no check-in</em>
                </div>
              </li>
              <li>
                <span className="vds-loc-access-icon"><Building2 size={12} strokeWidth={1.8} /></span>
                <div>
                  <strong>Hotéis parceiros · 4 opções</strong>
                  <em>desconto 15% com código LEADERS26</em>
                </div>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="vds-loc-actions">
            <button className="vds-loc-btn primary">
              <Navigation size={13} strokeWidth={2.2} />
              Abrir rota no Google Maps
              <ArrowUpRight size={11} strokeWidth={2.4} />
            </button>
            <button className="vds-loc-btn ghost">
              <Calendar size={13} strokeWidth={2.2} />
              Adicionar ao calendário
            </button>
          </div>

          {/* Contact footer */}
          <footer className="vds-loc-contact">
            <div>
              <span className="vds-loc-contact-lbl">
                <Phone size={10} strokeWidth={2.2} />
                +55 11 4040-1820
              </span>
              <span className="vds-loc-contact-lbl">
                <Mail size={10} strokeWidth={2.2} />
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
                  <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(10,31,59,0.08)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="200" height="120" fill="url(#mini-grid)" />
              <path d="M0,70 Q60,60 120,68 T200,58" stroke="rgba(10,31,59,0.16)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M60,0 Q70,40 65,80 T70,120" stroke="rgba(10,31,59,0.12)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <g transform="translate(100, 60)">
                <circle r="11" style={{ fill: "var(--via-navy)" }} />
                <circle r="11" fill="none" style={{ stroke: "var(--via-navy)" }} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" style={{ fill: "var(--via-navy)" }} />
              </g>
            </svg>
          </div>
          <div className="vds-loc-compact-body">
            <span className="vds-loc-eyebrow">Sede Viver de IA</span>
            <h4>Av. Paulista, 1842 · cj. 1602</h4>
            <p>Bela Vista · São Paulo · SP · CEP 01310-200</p>
            <button className="vds-loc-compact-cta">
              Ver no mapa
              <ArrowUpRight size={11} strokeWidth={2.4} />
            </button>
          </div>
        </article>

        <article className="vds-loc-compact">
          <div className="vds-loc-compact-mini-map alt">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mini-grid2" width="14" height="14" patternUnits="userSpaceOnUse">
                  <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(10,31,59,0.18)" strokeWidth="0.5" />
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
            <span className="vds-loc-eyebrow accent">Sala de mentoria · Pinheiros</span>
            <h4>Rua dos Pinheiros, 870 · cj. 32</h4>
            <p>Pinheiros · São Paulo · SP · CEP 05422-001</p>
            <button className="vds-loc-compact-cta dark">
              Ver no mapa
              <ArrowUpRight size={11} strokeWidth={2.4} />
            </button>
          </div>
        </article>
      </div>
    </Section>
  );
}
