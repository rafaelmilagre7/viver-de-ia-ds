import { useState } from 'react';
import { AlertCircle, ChevronDown, Check, Search } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './form.css';

export default function Form() {
  const [empresa, setEmpresa] = useState('');
  const [setor] = useState('E-commerce');
  const [email, setEmail] = useState('rafael@gmail');
  const [plano] = useState('Mentoria avançada');
  const [bio, setBio] = useState('Operador de e-commerce há 6 anos. Estamos automatizando WhatsApp e CRM.');
  const [valor, setValor] = useState('4800');
  const [termo, setTermo] = useState(true);
  const [news, setNews] = useState(false);
  const [turma, setTurma] = useState('2026.2');

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · formulário"
        title={<>Vidro <em>suspenso</em>, label em cima, foco em navy.</>}
        lede="Cada campo é um vidro flutuando sobre a superfície. Label uppercase em cima, valor em Geist 15 navy. Foco abre um anel navy 12% e endurece a borda. Erro vira danger. O conjunto vive dentro de um wrapper glass com radius 28px e sombra navy-tinted profunda."
      />

      <Section title="4 estados" meta="default · focused · error · disabled">
        <div className="vds-form-stage">
          <div className="vds-form-card">
            <header className="vds-form-h">
              <p className="vds-eyebrow">Cadastro · turma 2026.2</p>
              <h3>Dados da operação</h3>
            </header>

            <div className="vds-form-fields">
              <div className="via-field">
                <label className="lbl">Empresa</label>
                <input className="val" aria-label="Empresa" placeholder="Nome da empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
              </div>

              <div className="via-field focused">
                <label className="lbl">Setor</label>
                <input className="val" aria-label="Setor" defaultValue={setor} readOnly />
                <span className="cue navy">Em foco</span>
              </div>

              <div>
                <div className="via-field error">
                  <label className="lbl">E-mail</label>
                  <input className="val" aria-label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="via-field-err"><AlertCircle size={12} strokeWidth={2.4} /> Falta o domínio depois do @.</div>
              </div>

              <div className="via-field disabled">
                <label className="lbl">Plano contratado</label>
                <input className="val" aria-label="Plano contratado" value={plano} disabled />
                <span className="cue muted">Travado</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tipos de campo" meta="text · textarea · select · prefix · search">
        <div className="vds-form-stage">
          <div className="vds-form-card">
            <div className="vds-form-fields">
              <div className="via-field">
                <label className="lbl">Buscar caso</label>
                <div className="val-with-icon">
                  <Search size={14} strokeWidth={2} className="leading-ico" />
                  <input className="val" aria-label="Buscar caso" placeholder="Pesquise por nome ou setor…" />
                </div>
              </div>

              <div className="vds-form-cols">
                <div className="via-field">
                  <label className="lbl">Investimento mensal</label>
                  <div className="val-with-prefix">
                    <span className="prefix">R$</span>
                    <input className="val" aria-label="Investimento mensal em reais" value={valor} onChange={(e) => setValor(e.target.value)} />
                  </div>
                </div>

                <div className="via-field">
                  <label className="lbl">Turma desejada</label>
                  <button className="val-select" type="button">
                    <span>{turma}</span>
                    <ChevronDown size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="via-field">
                <label className="lbl">Bio profissional</label>
                <textarea
                  className="val"
                  aria-label="Bio profissional"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <span className="counter">{bio.length}/280</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Seletores" meta="checkbox · radio · toggle inline">
        <div className="vds-form-stage compact">
          <div className="vds-form-card">
            <p className="vds-eyebrow" style={{ marginBottom: 18 }}>Preferências da turma</p>
            <div className="vds-form-selectors">
              <label className="via-check" onClick={() => setTermo(!termo)}>
                <span className={`box ${termo ? 'checked' : ''}`}>
                  {termo && <Check size={12} strokeWidth={3} />}
                </span>
                <div>
                  <strong>Aceito os termos</strong>
                  <span>Concordo com o contrato de mentoria e a política de uso.</span>
                </div>
              </label>

              <label className="via-check" onClick={() => setNews(!news)}>
                <span className={`box ${news ? 'checked' : ''}`}>
                  {news && <Check size={12} strokeWidth={3} />}
                </span>
                <div>
                  <strong>Receber novidades</strong>
                  <span>Cases recentes e turmas que abrirem no semestre.</span>
                </div>
              </label>

              <div className="vds-form-radio-group">
                <p className="vds-eyebrow">Turma</p>
                <div className="vds-form-radios">
                  {[
                    { v: '2026.2', l: 'Turma 2026.2', d: 'Início em agosto · inscrições abertas' },
                    { v: '2027.1', l: 'Turma 2027.1', d: 'Início em fevereiro · lista de interesse' },
                  ].map((o) => (
                    <label
                      key={o.v}
                      className={`via-radio ${turma === o.v ? 'on' : ''}`}
                      onClick={() => setTurma(o.v)}
                    >
                      <span className={`ring ${turma === o.v ? 'checked' : ''}`}>
                        <span className="dot" />
                      </span>
                      <div>
                        <strong>{o.l}</strong>
                        <span>{o.d}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tokens" meta="anatomia do vidro">
        <table className="vds-token-table">
          <thead><tr><th>Token</th><th>Valor</th></tr></thead>
          <tbody>
            <tr><td className="tok">Wrapper radius</td><td className="val">28px</td></tr>
            <tr><td className="tok">Wrapper shadow</td><td className="val">0 24px 56px navy 14% + inner 1px white</td></tr>
            <tr><td className="tok">Field surface</td><td className="val">white 85% + blur 24 saturate 180%</td></tr>
            <tr><td className="tok">Field border</td><td className="val">1px white 95% (rest) → navy 100% (focus)</td></tr>
            <tr><td className="tok">Field radius</td><td className="val">16px</td></tr>
            <tr><td className="tok">Focus ring</td><td className="val">0 0 0 4px navy 12%</td></tr>
            <tr><td className="tok">Padding</td><td className="val">14 18</td></tr>
            <tr><td className="tok">Label</td><td className="val">Geist 10 · 700 · 0.20em uppercase</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
