import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

export default function Voice() {
  return (
    <>
      <DocsHeader
        eyebrow="Diretrizes · voz & tom"
        title={<>Especialista, <em>nunca guru</em>.</>}
        lede="A voz da Viver de IA é a de um operador experiente compartilhando o que funciona. Não acadêmico, não 'guru-bro' com promessas instantâneas, não vendedor de curso. Confiante, calmo, com números."
      />

      <Section title="Princípios" meta="o que nunca muda">
        <p>
          <em>Transformação maior que ferramenta.</em> Toda história é sobre o que o operador
          consegue depois — receita, margem, autonomia. A stack é meio, nunca fim.
        </p>
        <p>
          <em>Toda afirmação carrega número ou citação.</em> "+11.920 conversas", "R$ 4.600/mês",
          "100% automatizado". Sem isso é blog, não é cases.
        </p>
        <p>
          <em>Pontos finais, não exclamações.</em> A marca é confiante sem ser estridente.
          Exclamações são reservadas para cumprimento real ou citação literal.
        </p>
        <p>
          <em>Brasilidade quente, sem clichê.</em> PT-BR direto, "você" infinitivo, nunca
          "o senhor". Sem emoji, sem unicode decorativo, sem clichê visual de IA.
        </p>
      </Section>

      <Section title="Quatro tons em que escrever" meta="quando escolher cada">
        <table className="vds-token-table">
          <thead><tr><th>Tom</th><th>Quando usar</th><th>Exemplo</th></tr></thead>
          <tbody>
            <tr>
              <td className="tok">Editorial calmo</td>
              <td className="val">Hero, manifesto, página inicial</td>
              <td className="use"><em>"Viver de IA, não de prompt."</em></td>
            </tr>
            <tr>
              <td className="tok">Operacional direto</td>
              <td className="val">Botão, label, alerta</td>
              <td className="use">"Entrar na turma" · "Inscrições fecham em 3 dias"</td>
            </tr>
            <tr>
              <td className="tok">Atribuído humano</td>
              <td className="val">Depoimentos, citações</td>
              <td className="use"><em>"Sem saber nada. Em pouquíssimas horas."</em> — Márisson</td>
            </tr>
            <tr>
              <td className="tok">Métrica seca</td>
              <td className="val">Stat card, KPI, headline de case</td>
              <td className="use">"+11.920 conversas analisadas em 90 dias"</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Comprimento" meta="onde respirar">
        <table className="vds-token-table">
          <thead><tr><th>Elemento</th><th>Limite</th><th>Por quê</th></tr></thead>
          <tbody>
            <tr><td className="tok">Display headline</td><td className="val">3 linhas</td><td className="use">Mais que isso cansa</td></tr>
            <tr><td className="tok">Lede</td><td className="val">2 frases</td><td className="use">Promessa + diferencial</td></tr>
            <tr><td className="tok">Body em card</td><td className="val">3 linhas</td><td className="use">Resumo, não artigo</td></tr>
            <tr><td className="tok">Botão</td><td className="val">3 palavras</td><td className="use">Verbo + objeto</td></tr>
            <tr><td className="tok">Eyebrow</td><td className="val">4 palavras</td><td className="use">Categoria, não título</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
