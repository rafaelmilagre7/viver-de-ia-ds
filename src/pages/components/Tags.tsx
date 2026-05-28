import { Plus, X } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './tags.css';

export default function Tags() {
  const [setor, setSetor] = useState<string[]>(['E-commerce', 'Turismo']);
  const [tools, setTools] = useState<string[]>(['Base44']);

  const toggle = (list: string[], setter: Dispatch<SetStateAction<string[]>>, v: string) =>
    setter(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <>
      <DocsHeader
        eyebrow="Componentes · tags"
        title={<>Pílulas de <em>vidro</em>, multi-seleção.</>}
        lede="Tags são pílulas frostadas selecionáveis. Quando ativadas, viram navy sólido com sheen interno. A variante 'adicionar' tem borda tracejada, sugere expansão. Use para seleção múltipla — filtros, categorias, tools."
      />

      <Section title="Setor — selecionados ativos" meta="multi · clique para alternar">
        <div className="via-tag-stage">
          <div className="via-tag-row">
            {['E-commerce', 'Turismo', 'Agência', 'Construção', 'Educação', 'Saúde'].map((t) => {
              const on = setor.includes(t);
              return (
                <button
                  key={t}
                  className={`via-tag ${on ? 'selected' : ''}`}
                  onClick={() => toggle(setor, setSetor, t)}
                >
                  {t}{on && <X className="x" size={13} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title="Tools — com adicionar" meta="dashed glass variant">
        <div className="via-tag-stage">
          <div className="via-tag-row">
            {['Base44', 'Lovable', 'Superagente'].map((t) => {
              const on = tools.includes(t);
              return (
                <button
                  key={t}
                  className={`via-tag ${on ? 'selected' : ''}`}
                  onClick={() => toggle(tools, setTools, t)}
                >
                  {t}{on && <X className="x" size={13} strokeWidth={2.5} />}
                </button>
              );
            })}
            <button className="via-tag add">
              <Plus size={12} strokeWidth={2} />
              Adicionar
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
