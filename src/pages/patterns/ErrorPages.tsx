import { useState } from 'react';
import { Compass, Lock, Construction, AlertOctagon, Home, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './error-pages.css';

type Code = '404' | '500' | '403' | 'maintenance';
type Tone = 'default' | 'attn' | 'danger';

const ERROR_DEFS: Record<Code, { headline: string; lede: string; tone: Tone; icon: React.ReactNode; label: string }> = {
  '404': {
    headline: 'Esta página saiu de cena',
    lede: 'Pode ter sido movida, renomeada, ou nunca existiu por aqui. A gente sente — mas tem caminhos abertos.',
    tone: 'default',
    icon: <Compass size={36} strokeWidth={1.6} />,
    label: 'erro · 404',
  },
  '403': {
    headline: 'Sem acesso por enquanto',
    lede: 'Essa parte exige permissão específica · pode ser plano, função ou convite pendente.',
    tone: 'attn',
    icon: <Lock size={34} strokeWidth={1.8} />,
    label: 'erro · 403',
  },
  '500': {
    headline: 'Algo travou do nosso lado',
    lede: 'Não foi você. Já fomos notificados · estamos olhando. Tente em alguns instantes.',
    tone: 'danger',
    icon: <AlertOctagon size={34} strokeWidth={1.8} />,
    label: 'erro · 500',
  },
  maintenance: {
    headline: 'Janela de manutenção · 04h‒05h BRT',
    lede: 'Atualização programada do core. Não há perda de dados · acesso volta em breve.',
    tone: 'attn',
    icon: <Construction size={34} strokeWidth={1.7} />,
    label: 'manutenção',
  },
};

const COPY_GUIDES = [
  { code: '404', title: 'Página não existe', yes: 'fala "saiu de cena" ou "não está aqui"', no: '"oops!", "ops!", emoji de robô' },
  { code: '403', title: 'Sem permissão', yes: 'diz o motivo provável (plano, função, convite)', no: 'culpar o usuário · "você não tem direito"' },
  { code: '500', title: 'Falha do servidor', yes: 'assumir responsabilidade · "do nosso lado"', no: '"erro desconhecido", "tente de novo"' },
  { code: 'maintenance', title: 'Manutenção programada', yes: 'horário previsto + impacto claro', no: '"em breve", "logo, logo"' },
];

export default function ErrorPages() {
  const [code, setCode] = useState<Code>('404');
  const def = ERROR_DEFS[code];

  return (
    <>
      <DocsHeader
        eyebrow="Padrões · error pages"
        title={<>Erros honestos — <em>com porta de saída e voz humana</em>.</>}
        lede="4 estados editoriais (404 · 403 · 500 · maintenance) com a mesma estrutura: ícone + headline curto + frase honesta + 2 caminhos de saída. Sem '#$@!' nem '🤖 oops'. A linguagem assume responsabilidade quando é nossa, e devolve agency quando é do user."
      />

      <Section meta="navegador" title="alterne entre os 4 estados">
        <p style={{ margin: '0 0 24px', fontSize: 13.5, color: 'var(--via-text-muted)', lineHeight: 1.65 }}>
          Mesmo layout · só muda ícone, headline, lede, tom semântico e o segundo CTA.
        </p>

        <div className="vds-err">
          <div className="vds-err-switcher" role="tablist" aria-label="Códigos de erro">
            {(['404', '403', '500', 'maintenance'] as Code[]).map((c) => (
              <button
                key={c}
                className={`vds-err-switcher__btn ${code === c ? 'is-active' : ''}`}
                onClick={() => setCode(c)}
                role="tab"
                aria-selected={code === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="vds-err-stage" role="region" aria-live="polite" aria-label={def.label}>
            <div className="vds-err-content">
              <span className={`vds-err-pill ${def.tone === 'attn' ? 'is-attn' : ''} ${def.tone === 'danger' ? 'is-danger' : ''}`}>
                <span className="vds-err-pill__dot" aria-hidden="true" />
                {def.label}
              </span>

              <div className="vds-err-icon" aria-hidden="true">{def.icon}</div>

              <h2 className="vds-err-headline">{def.headline}</h2>
              <p className="vds-err-lede">{def.lede}</p>

              <div className="vds-err-actions">
                <Button iconLeft={<Home size={14} />}>Voltar pro início</Button>
                {code === '500' ? (
                  <Button variant="ghost" iconLeft={<Mail size={14} />}>Avisar suporte</Button>
                ) : code === '403' ? (
                  <Button variant="ghost">Solicitar acesso</Button>
                ) : code === 'maintenance' ? (
                  <Button variant="ghost">Ver status em tempo real</Button>
                ) : (
                  <Button variant="ghost" iconLeft={<ArrowLeft size={14} />}>Voltar pra página anterior</Button>
                )}
              </div>

              <p className="vds-err-incident">
                <strong>incident</strong>
                6c1f-ax3{code === '500' ? '-srv-fail' : code === '403' ? '-auth-deny' : code === 'maintenance' ? '-maint-win' : ''}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section meta="copy editorial" title="o que cada estado deve dizer · e evitar">
        <div className="vds-err-guides">
          {COPY_GUIDES.map((g) => (
            <article key={g.code} className="vds-err-guide">
              <span className="vds-err-guide__code">{g.code}</span>
              <h3>{g.title}</h3>
              <div className="vds-err-guide__lines">
                <div className="vds-err-guide__line is-yes">
                  <span className="vds-err-guide__lbl">sim</span>
                  <span className="vds-err-guide__txt">{g.yes}</span>
                </div>
                <div className="vds-err-guide__line is-no">
                  <span className="vds-err-guide__lbl">evite</span>
                  <span className="vds-err-guide__txt">{g.no}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
