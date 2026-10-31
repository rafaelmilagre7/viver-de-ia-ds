import { AlertCircle, BarChart3, RotateCw } from 'lucide-react';
import { Button } from '../../lib/Button/Button';
import { Skeleton } from '../../lib/Skeleton/Skeleton';
import { microcopy } from '../../content/microcopy';
import './chart-state.css';

/* ============================================================
   Estados de gráfico · carregando, sem dados, erro
   ------------------------------------------------------------
   Ocupa a MESMA área do plot que substitui (nada pula quando o
   dado chega) e desenha o eixo fantasma por trás, pra a pessoa já
   ler "aqui vai um gráfico" antes do número existir.
   O texto vem da biblioteca de microcopy — não reescreva aqui.
   ============================================================ */

const texto = (id: string) => microcopy.find((m) => m.id === id)?.texto ?? '';
const VAZIO = texto('vazio-dados-insuficientes');
const ERRO = texto('erro-rede');
const TENTAR = texto('botao-tentar-de-novo');

/** Primeira frase em destaque, o resto como apoio · sem mudar uma vírgula do texto canônico. */
function emDuas(t: string): [string, string] {
  const i = t.indexOf('. ');
  return i < 0 ? [t, ''] : [t.slice(0, i + 1), t.slice(i + 2)];
}

export type ChartStateKind = 'loading' | 'empty' | 'error';

type Props = {
  state: ChartStateKind;
  /** O que está sendo carregado, pro leitor de tela · ex.: "o gráfico de receita" */
  label: string;
  /** Erro: ação do botão Tentar de novo. Sem ela, o botão não aparece. */
  onRetry?: () => void;
  /** chart = área de plot inteira · spark = faixa de sparkline dentro de um tile */
  size?: 'chart' | 'spark';
  /** Altura do plot que este estado substitui (px). */
  height?: number;
};

/* Curva-guia do esqueleto · forma genérica de série, sem dado nenhum */
const ONDA = 'M 4 150 C 72 150, 104 118, 170 120 S 280 82, 356 88 S 476 52, 596 46';
/* y da grade e da base no viewBox 600×200 · os rótulos fantasma seguem os mesmos y */
const GRADE = [24, 66, 108];
const BASE = 150;
const ONDA_SPARK = 'M 0 30 C 30 30, 46 22, 76 23 S 130 14, 160 15 S 186 8, 200 7';

export default function ChartState({ state, label, onRetry, size = 'chart', height }: Props) {
  const spark = size === 'spark';
  const [titulo, apoio] = emDuas(state === 'empty' ? VAZIO : ERRO);

  return (
    <div
      className={`vds-cstate is-${state} is-${size}`}
      style={height ? { minHeight: height } : undefined}
      aria-live="polite"
    >
      {/* eixo fantasma · grade + linha de base, sempre presente */}
      <svg
        className="vds-cstate-ghost"
        viewBox={spark ? '0 0 200 40' : '0 0 600 200'}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {!spark && GRADE.map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} className="grid" />)}
        <line
          x1="0"
          x2={spark ? 200 : 600}
          y1={spark ? 39 : BASE}
          y2={spark ? 39 : BASE}
          className="axis"
        />
        {state === 'loading' && <path d={spark ? ONDA_SPARK : ONDA} className="wave" />}
      </svg>

      {state === 'loading' && (
        <>
          <span className="vds-cstate-sr">Carregando {label}…</span>
          {!spark && (
            <div className="vds-cstate-ticks" aria-hidden="true">
              {[...GRADE, BASE].map((y) => (
                <Skeleton
                  key={y}
                  variant="text"
                  width={y === BASE ? 10 : 24}
                  className="vds-cstate-tick is-y"
                  style={{ top: `${(y / 200) * 100}%` }}
                />
              ))}
              <div className="x">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} variant="text" width={24} className="vds-cstate-tick" />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {state !== 'loading' && (
        <div className="vds-cstate-msg">
          {!spark && (
            <span className="vds-cstate-ico" aria-hidden="true">
              {state === 'error' ? (
                <AlertCircle size={16} strokeWidth={1.75} />
              ) : (
                <BarChart3 size={16} strokeWidth={1.75} />
              )}
            </span>
          )}
          <p className="vds-cstate-text">
            <strong>{titulo}</strong> {apoio}
          </p>
          {state === 'error' && onRetry && (
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<RotateCw size={14} strokeWidth={1.75} aria-hidden="true" />}
              onClick={onRetry}
            >
              {TENTAR}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
