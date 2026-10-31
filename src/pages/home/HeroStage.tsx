import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '../../lib/Card/Card';
import { Pill } from '../../lib/Pill/Pill';
import { Progress } from '../../lib/Progress/Progress';
import { Switch } from '../../lib/Switch/Switch';
import { useTheme } from '../../lib/theming/theming-core';
import '../../lib/Button/Button.css';

/* Composição do hero · peças REAIS da biblioteca (Card de vidro, Pill,
   Progress, Switch, botão) sobre uma atmosfera que se move devagar — o vidro
   tem o que desfocar. O switch "Tema escuro" troca o tema do site de verdade. */

// dados de exemplo do gráfico (demo de interface, não é número do negócio)
const WEEK = [
  { d: 'seg', v: 2 },
  { d: 'ter', v: 3 },
  { d: 'qua', v: 3 },
  { d: 'qui', v: 5 },
  { d: 'sex', v: 4 },
  { d: 'sáb', v: 6 },
  { d: 'dom', v: 7 },
];
const W = 440;
const H = 104;
const MAX = 8;
const pts = WEEK.map((p, i) => [(i / (WEEK.length - 1)) * W, H - (p.v / MAX) * H] as const);
const LINE = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
const AREA = `${LINE} L${W} ${H} L0 ${H} Z`;
const LAST = pts[pts.length - 1];
const TOTAL = WEEK.reduce((s, p) => s + p.v, 0);

export default function HeroStage() {
  const { theme, setMode } = useTheme();
  const [digest, setDigest] = useState(true);

  return (
    <div className="vds-home-stage" role="group" aria-label="Peças da biblioteca em uso">
      <div className="vds-home-stage-atmos" aria-hidden="true">
        <span className="vds-home-orb vds-home-orb--a" />
        <span className="vds-home-orb vds-home-orb--b" />
        <span className="vds-home-orb vds-home-orb--c" />
      </div>

      <Card variant="glass" as="div" className="vds-home-stage-card vds-home-stage-card--chart">
        <div className="vds-home-stage-head">
          <div>
            <p className="vds-home-stage-label">Aulas assistidas</p>
            <p className="vds-home-stage-value">{TOTAL}</p>
          </div>
          <Pill>últimos 7 dias</Pill>
        </div>
        <div
          className="vds-home-chart"
          role="img"
          aria-label={`Gráfico de exemplo: aulas por dia, de ${WEEK[0].v} na segunda a ${WEEK[WEEK.length - 1].v} no domingo`}
        >
          <svg viewBox={`0 -6 ${W} ${H + 12}`} aria-hidden="true">
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} className="vds-home-chart-grid" x1="0" x2={W} y1={H * f} y2={H * f} />
            ))}
            <line className="vds-home-chart-axis" x1="0" x2={W} y1={H} y2={H} />
            <path className="vds-home-chart-area" d={AREA} />
            <path className="vds-home-chart-line" d={LINE} pathLength={1} />
            <circle className="vds-home-chart-dot" cx={LAST[0]} cy={LAST[1]} r="4.5" />
          </svg>
          {/* rótulos em HTML: tamanho de texto real em qualquer largura */}
          <div className="vds-home-chart-ticks" aria-hidden="true">
            {WEEK.map((p) => <span key={p.d}>{p.d}</span>)}
          </div>
        </div>
      </Card>

      <Card variant="glass" as="div" className="vds-home-stage-card vds-home-stage-card--prefs">
        <p className="vds-home-stage-label">Preferências</p>
        <Switch
          label="Tema escuro"
          checked={theme === 'dark'}
          onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
        />
        <Switch label="Resumo semanal" checked={digest} onChange={(e) => setDigest(e.target.checked)} />
      </Card>

      <Card variant="glass" as="div" className="vds-home-stage-card vds-home-stage-card--module">
        <p className="vds-home-stage-label">Módulo 03 · Agentes de IA</p>
        <Progress value={62} label="Progresso" showValue />
        <Link to="/showcase/aluno" className="via-btn via-btn--primary via-btn--sm">
          <span className="via-btn__label">Continuar</span>
          <span className="via-btn__icon"><ArrowRight size={14} strokeWidth={1.75} /></span>
        </Link>
      </Card>
    </div>
  );
}
