import {
  X, AlertTriangle, Check, ChevronRight, MoreHorizontal, Settings, User, LogOut,
  Bell, Star, Filter, ArrowDownToLine, Share2, Trash2,
  ChevronLeft, ChevronRight as ArrowRightIcon, ZoomIn, Heart, Calendar, Bookmark,
} from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import BrandLogo from '../../components/BrandLogo';
import monogramWhite from '../../assets/logos/VIA_monogram_hq_white.png';
import './overlays.css';

export default function Overlays() {
  return (
    <>
      <DocsHeader
        eyebrow="Componentes · overlay system"
        title={
          <>
            Drawer, sheet, popover, dialog, lightbox — <em>5 superfícies sobre o app</em>.
          </>
        }
        lede="Modal já existe e cobre o caso central. Aqui são os 5 outros tipos de superfície que aparecem sobre o app — drawer pra navegação mobile, sheet pra ação detalhada, popover pra menu contextual, dialog pra decisão crítica, lightbox pra mídia em foco."
      />

      <DrawerSection />
      <SheetSection />
      <BottomSheetSection />
      <PopoverSection />
      <DialogSection />
      <LightboxSection />
    </>
  );
}

/* ---------- Drawer lateral ---------- */
function DrawerSection() {
  return (
    <Section title="Drawer · navegação lateral" meta="mobile drawer · menu de seções · onboarding tour">
      <div className="vds-drawer-stage">
        <div className="vds-drawer-scrim" />
        <aside className="vds-drawer">
          <header>
            <BrandLogo variant="auto" size="sm" />
            <button className="vds-drawer-close" aria-label="Fechar">
              <X size={14} strokeWidth={2.2} />
            </button>
          </header>

          <nav>
            <p className="vds-drawer-eyebrow">Curso</p>
            <ul>
              <li className="on">
                <a>
                  <span className="vds-drawer-mark" />
                  Continue de onde parou
                  <span className="vds-drawer-chip">02.02</span>
                </a>
              </li>
              <li><a><span className="vds-drawer-mark" /> Grade completa</a></li>
              <li><a><span className="vds-drawer-mark" /> Material de apoio</a></li>
              <li><a><span className="vds-drawer-mark" /> Discussões</a></li>
            </ul>

            <p className="vds-drawer-eyebrow">Comunidade</p>
            <ul>
              <li><a><span className="vds-drawer-mark" /> Discord interno</a></li>
              <li>
                <a>
                  <span className="vds-drawer-mark live" />
                  Próxima live
                  <span className="vds-drawer-chip">sex 22</span>
                </a>
              </li>
              <li><a><span className="vds-drawer-mark" /> Diretório de alunos</a></li>
            </ul>

            <p className="vds-drawer-eyebrow">Conta</p>
            <ul>
              <li><a><User size={13} strokeWidth={2} /> Meu perfil</a></li>
              <li><a><Settings size={13} strokeWidth={2} /> Configurações</a></li>
              <li><a className="sub"><LogOut size={13} strokeWidth={2} /> Sair</a></li>
            </ul>
          </nav>

          <footer>
            <div className="vds-drawer-user">
              <span className="av">RM</span>
              <div>
                <p>Rafael Milagre</p>
                <span>Plano Mentoria</span>
              </div>
            </div>
          </footer>
        </aside>
      </div>
    </Section>
  );
}

/* ---------- Sheet (right side) ---------- */
function SheetSection() {
  return (
    <Section title="Sheet · painel lateral à direita" meta="detalhe sem perder contexto · edição · filtro avançado">
      <div className="vds-sheet-stage">
        <div className="vds-sheet-scrim" />
        <aside className="vds-sheet">
          <header>
            <div>
              <span className="vds-sheet-eyebrow">Aluno · perfil completo</span>
              <h3>Márisson Lage</h3>
              <p>Efizi Soluções · plano Mentoria · ingressou em out 2024</p>
            </div>
            <button className="vds-sheet-close" aria-label="Fechar sheet"><X size={16} strokeWidth={2.2} /></button>
          </header>

          <div className="vds-sheet-body">
            <div className="vds-sheet-stats">
              <div>
                <strong>14</strong>
                <em>aulas concluídas</em>
              </div>
              <div>
                <strong>4.8</strong>
                <em>NPS médio</em>
              </div>
              <div>
                <strong>87 dias</strong>
                <em>desde último login</em>
              </div>
            </div>

            <div className="vds-sheet-section">
              <p className="vds-sheet-section-title">Atividade recente</p>
              <ul>
                <li>
                  <span className="d">17 mai</span>
                  <span>Comentou na aula <strong>02.02</strong> — sobre few-shot na Nina</span>
                </li>
                <li>
                  <span className="d">14 mai</span>
                  <span>Marcou aula <strong>02.01</strong> como concluída</span>
                </li>
                <li>
                  <span className="d">12 mai</span>
                  <span>Live · presença confirmada · 60min</span>
                </li>
                <li>
                  <span className="d">07 mai</span>
                  <span>Renovou plano Mentoria · trimestre</span>
                </li>
              </ul>
            </div>

            <div className="vds-sheet-section">
              <p className="vds-sheet-section-title">Notas internas do mentor</p>
              <div className="vds-sheet-note">
                <p>
                  Mârisson está num momento de implementar agentes em produção. Discutimos few-shot vs zero-shot na última sessão. Próxima sessão: revisar arquitetura do classifier.
                </p>
                <span>Caio Ribeiro · 14 mai</span>
              </div>
            </div>
          </div>

          <footer>
            <button className="vds-sheet-btn ghost">
              <Share2 size={13} strokeWidth={2} />
              Compartilhar perfil
            </button>
            <button className="vds-sheet-btn primary">
              Abrir mentoria
              <ChevronRight size={13} strokeWidth={2.5} />
            </button>
          </footer>
        </aside>
      </div>
    </Section>
  );
}

/* ---------- Bottom sheet · mobile ---------- */
function BottomSheetSection() {
  return (
    <Section title="Bottom sheet · drawer mobile sobe do chão" meta="ações em contexto · seletor de plano · agendar live">
      <div className="vds-bs-stage">
        {/* Mobile frame */}
        <div className="vds-bs-frame">
          {/* Phone bg simulation */}
          <div className="vds-bs-phone-bg">
            <div className="vds-bs-status-bar">
              <span className="vds-bs-time">14:32</span>
              <span className="vds-bs-status-icons">
                <span className="vds-bs-bars" />
                <span className="vds-bs-wifi" />
                <span className="vds-bs-battery" />
              </span>
            </div>
            <div className="vds-bs-faded-content">
              <h4>Construindo agentes IA</h4>
              <p>Módulo 02 · Prompt como engenharia</p>
              <div className="vds-bs-faded-lessons">
                <span /><span /><span /><span /><span />
              </div>
            </div>
          </div>

          {/* Scrim */}
          <div className="vds-bs-scrim" />

          {/* The sheet */}
          <aside className="vds-bs">
            <span className="vds-bs-handle" aria-hidden="true" />

            <header>
              <div>
                <span className="vds-bs-eyebrow">Ação rápida</span>
                <h3>Reservar próxima live</h3>
              </div>
              <button className="vds-bs-close" aria-label="Fechar">
                <X size={14} strokeWidth={2.2} />
              </button>
            </header>

            <div className="vds-bs-body">
              <div className="vds-bs-when">
                <span className="vds-bs-when-day">qui</span>
                <strong>22</strong>
                <span className="vds-bs-when-month">mai 2026</span>
                <span className="vds-bs-when-time">
                  <Calendar size={11} strokeWidth={2.4} />
                  14h00 BRT · 2h 30min
                </span>
              </div>

              <p className="vds-bs-title">
                Construindo o primeiro <em>agente em produção</em>
              </p>
              <p className="vds-bs-desc">
                Caio mostra do zero como subir um agente de classificação que ouve o canal de vendas. Sessão prática · levar laptop com chave OpenAI.
              </p>

              <ul className="vds-bs-options">
                <li className="on">
                  <span className="vds-bs-opt-ic">
                    <Check size={13} strokeWidth={2.6} />
                  </span>
                  <div>
                    <strong>Confirmar presença</strong>
                    <em>Adiciono no calendário · lembrete 30min antes</em>
                  </div>
                </li>
                <li>
                  <span className="vds-bs-opt-ic">
                    <Bookmark size={13} strokeWidth={2} />
                  </span>
                  <div>
                    <strong>Marcar pra assistir depois</strong>
                    <em>Gravação fica no arquivo da turma</em>
                  </div>
                </li>
                <li>
                  <span className="vds-bs-opt-ic">
                    <Heart size={13} strokeWidth={2} />
                  </span>
                  <div>
                    <strong>Indicar pra um colega</strong>
                    <em>Manda convite com seu nome</em>
                  </div>
                </li>
              </ul>
            </div>

            <footer>
              <button className="vds-bs-cta">
                Reservar lugar
                <ChevronRight size={13} strokeWidth={2.5} />
              </button>
            </footer>
          </aside>
        </div>

        {/* Variant 2 — short bottom sheet (sort/filter) */}
        <div className="vds-bs-frame">
          <div className="vds-bs-phone-bg">
            <div className="vds-bs-status-bar">
              <span className="vds-bs-time">14:32</span>
              <span className="vds-bs-status-icons">
                <span className="vds-bs-bars" />
                <span className="vds-bs-wifi" />
                <span className="vds-bs-battery" />
              </span>
            </div>
            <div className="vds-bs-faded-content">
              <h4>Operadores · turma 2026.2</h4>
              <p>24 alunos · ordenado por atividade</p>
              <div className="vds-bs-faded-lessons">
                <span /><span /><span /><span /><span />
              </div>
            </div>
          </div>

          <div className="vds-bs-scrim" />

          <aside className="vds-bs short">
            <span className="vds-bs-handle" aria-hidden="true" />

            <header>
              <div>
                <span className="vds-bs-eyebrow">Ordenar por</span>
                <h3>Como exibir a lista</h3>
              </div>
              <button className="vds-bs-close" aria-label="Fechar">
                <X size={14} strokeWidth={2.2} />
              </button>
            </header>

            <div className="vds-bs-body">
              <ul className="vds-bs-radios">
                <li>
                  <span className="vds-bs-radio on">
                    <span />
                  </span>
                  <span>Atividade recente</span>
                  <em>padrão</em>
                </li>
                <li>
                  <span className="vds-bs-radio">
                    <span />
                  </span>
                  <span>Progresso na trilha</span>
                </li>
                <li>
                  <span className="vds-bs-radio">
                    <span />
                  </span>
                  <span>Nome A-Z</span>
                </li>
                <li>
                  <span className="vds-bs-radio">
                    <span />
                  </span>
                  <span>Data de entrada na turma</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Popover ---------- */
function PopoverSection() {
  return (
    <Section title="Popover · menu contextual leve" meta="ações rápidas · filtro inline · três pontinhos">
      <div className="vds-pop-stage">
        {/* Anchor 1 — three dots menu */}
        <div className="vds-pop-anchor-wrap">
          <button aria-label="Mais opções" className="vds-pop-anchor">
            <MoreHorizontal size={14} strokeWidth={2.2} />
          </button>
          <div className="vds-popover top-right">
            <div className="vds-pop-arrow" />
            <ul>
              <li><a><Star size={13} strokeWidth={2} /> Favoritar aula</a></li>
              <li><a><ArrowDownToLine size={13} strokeWidth={2} /> Baixar transcript</a></li>
              <li><a><Share2 size={13} strokeWidth={2} /> Copiar link</a></li>
              <li className="divider"></li>
              <li className="danger"><a><Trash2 size={13} strokeWidth={2} /> Apagar nota</a></li>
            </ul>
          </div>
        </div>

        {/* Anchor 2 — filter popover */}
        <div className="vds-pop-anchor-wrap mid">
          <button className="vds-pop-anchor pill">
            <Filter size={12} strokeWidth={2.2} />
            Filtrar por tipo
          </button>
          <div className="vds-popover top-left wide">
            <div className="vds-pop-arrow" />
            <div className="vds-pop-section">
              <p className="vds-pop-eyebrow">Tipo de aula</p>
              <label><input type="checkbox" defaultChecked /> <span>Vídeo</span><em className="count">12</em></label>
              <label><input type="checkbox" defaultChecked /> <span>Exercício</span><em className="count">4</em></label>
              <label><input type="checkbox" /> <span>Material PDF</span><em className="count">3</em></label>
              <label><input type="checkbox" /> <span>Live</span><em className="count">2</em></label>
            </div>
            <footer>
              <button className="vds-pop-clear">Limpar</button>
              <button className="vds-pop-apply">Aplicar (16)</button>
            </footer>
          </div>
        </div>

        {/* Anchor 3 — user mini */}
        <div className="vds-pop-anchor-wrap right">
          <button className="vds-pop-anchor avatar">
            <span>RM</span>
          </button>
          <div className="vds-popover bottom-right user">
            <div className="vds-pop-arrow" />
            <div className="vds-pop-user-head">
              <span className="av">RM</span>
              <div>
                <strong>Rafael Milagre</strong>
                <em>rafael@viverdeia.ai</em>
              </div>
            </div>
            <ul>
              <li><a><User size={13} strokeWidth={2} /> Meu perfil</a></li>
              <li><a><Bell size={13} strokeWidth={2} /> Notificações</a></li>
              <li><a><Settings size={13} strokeWidth={2} /> Configurações</a></li>
              <li className="divider"></li>
              <li><a><LogOut size={13} strokeWidth={2} /> Sair</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Confirmation dialog ---------- */
function DialogSection() {
  return (
    <Section title="Confirmation dialog · decisão crítica" meta="destructive vs neutral · pausa antes de agir">
      <div className="vds-dialog-row">
        {/* Destructive */}
        <div className="vds-dialog-stage">
          <div className="vds-dialog-scrim" />
          <div className="vds-dialog destructive">
            <div className="vds-dialog-icon destructive">
              <AlertTriangle size={22} strokeWidth={1.6} />
            </div>
            <span className="vds-dialog-eyebrow danger">Ação irreversível</span>
            <h3>Cancelar plano Mentoria?</h3>
            <p>
              Você perde acesso à comunidade, ao playbook e à próxima sessão (agendada pra <strong>22 mai · 14h</strong>). A renovação automática também desliga.
            </p>
            <div className="vds-dialog-warn">
              <span className="vds-dialog-warn-dot" />
              Não pode ser desfeita pelo app — só pelo time financeiro.
            </div>
            <div className="vds-dialog-actions">
              <button className="vds-dialog-btn ghost">Manter plano</button>
              <button className="vds-dialog-btn danger">Sim, cancelar plano</button>
            </div>
          </div>
        </div>

        {/* Neutral */}
        <div className="vds-dialog-stage">
          <div className="vds-dialog-scrim" />
          <div className="vds-dialog">
            <div className="vds-dialog-icon">
              <Check size={22} strokeWidth={1.8} />
            </div>
            <span className="vds-dialog-eyebrow">Confirmar ação</span>
            <h3>Marcar todas as 8 notificações como lidas?</h3>
            <p>
              Ação reversível — você pode ver tudo de novo na aba <em>"Histórico"</em> da caixa de entrada.
            </p>
            <div className="vds-dialog-actions">
              <button className="vds-dialog-btn ghost">Voltar</button>
              <button className="vds-dialog-btn primary">Marcar todas</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Image lightbox ---------- */
function LightboxSection() {
  return (
    <Section title="Image lightbox · mídia em foco" meta="galeria · screenshot · slide ampliado">
      <div className="vds-lightbox-stage via-mesh-navy via-noise">
        <button className="vds-lightbox-close" aria-label="Fechar lightbox"><X size={16} strokeWidth={2} /></button>
        <button aria-label="Anterior" className="vds-lightbox-nav prev"><ChevronLeft size={20} strokeWidth={2} /></button>
        <button aria-label="Avançar" className="vds-lightbox-nav next"><ArrowRightIcon size={20} strokeWidth={2} /></button>

        <div className="vds-lightbox-main">
          <div className="vds-lightbox-img via-mesh-navy via-noise">
            <img src={monogramWhite} alt="" className="vds-lightbox-mono" />
            <span className="vds-lightbox-pill">Aula 03.02 · Tools · contrato, validação, fallback</span>
          </div>

          <div className="vds-lightbox-meta">
            <p className="vds-lightbox-caption">
              Slide 14 de 22 — diagrama de fallback do agente quando a tool externa falha. Padrão "circuit breaker" aplicado em IA.
            </p>
            <div className="vds-lightbox-actions">
              <button className="vds-lightbox-btn">
                <ZoomIn size={13} strokeWidth={2.2} />
                100%
              </button>
              <button className="vds-lightbox-btn">
                <ArrowDownToLine size={13} strokeWidth={2.2} />
                Baixar
              </button>
            </div>
          </div>
        </div>

        <div className="vds-lightbox-strip">
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} className={`vds-lightbox-thumb ${i === 2 ? 'on' : ''}`}>
              <span>{(i + 12).toString().padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
