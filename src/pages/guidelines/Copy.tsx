import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';

export default function Copy() {
  return (
    <>
      <DocsHeader
        eyebrow="Diretrizes · copy patterns"
        title={<>Padrões <em>recorrentes</em>.</>}
        lede="Estruturas de copy que se repetem na marca. Não são fórmulas — são pontos de partida que mantêm coerência editorial em qualquer canal. Use, adapte, mas não saia do espírito."
      />

      <Section title="Headlines de case" meta="company · outcome · método">
        <p>
          O padrão canônico é <em>"&lt;Empresa&gt;: &lt;outcome com métrica&gt;"</em>. Vem direto
          do diretório de cases — quando o resultado é a manchete, a métrica é o atestado.
        </p>
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '4px 0', lineHeight: 1.55 }}>
              "Trivia Studio: de processos manuais a R$&nbsp;120.000 de economia anual"
            </p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '8px 0 0', lineHeight: 1.55 }}>
              "Place Dreams: R$&nbsp;42.000 de economia por ano, em 30 dias"
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '4px 0', lineHeight: 1.55 }}>
              "Como a [empresa] revolucionou as vendas com IA"
            </p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '8px 0 0', lineHeight: 1.55 }}>
              "Conheça o case incrível da [empresa]"
            </p>
          </div>
        </div>
      </Section>

      <Section title="Subheads" meta="como o resultado foi atingido">
        <p>
          Comece com <em>"Como a &lt;empresa&gt;…"</em> ou <em>"Uma &lt;coisa&gt; própria…"</em>.
          O subhead enquadra o método — explica como o número da headline foi alcançado.
        </p>
      </Section>

      <Section title="Depoimentos" meta="conversa, atribuído">
        <p>
          Pull quotes são curtas, em primeira pessoa, sempre atribuídas. <em>Geist regular</em> para a
          frase — ênfase é peso e cor, nunca itálico — e atribuição em cinza apagado. Mantenha a
          oralidade — o "fala de WhatsApp" é o tom.
        </p>
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '4px 0', lineHeight: 1.55, fontStyle: 'normal' }}>
              "[Frase curta, em primeira pessoa, do jeito que o cliente falou.]"<br />
              <span style={{ fontStyle: 'normal', color: 'var(--via-text-muted)' }}>— [Nome] · [cargo] · [empresa]</span>
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '4px 0', lineHeight: 1.55, fontStyle: 'normal' }}>
              "A mentoria foi extremamente transformadora e revolucionou minha visão sobre IA aplicada ao negócio."
            </p>
          </div>
        </div>
      </Section>

      <Section title="Números & moeda" meta="formatação">
        <table className="vds-token-table">
          <thead><tr><th>Caso</th><th>Formato</th><th>Exemplo</th></tr></thead>
          <tbody>
            <tr><td className="tok">Reais</td><td className="val">R$ + espaço inseparável + ponto · compacto em mil/mi</td><td className="use">R$&nbsp;3.780 · R$&nbsp;2,5 mi · R$&nbsp;248 mil</td></tr>
            <tr><td className="tok">Porcentagem</td><td className="val">sem espaço</td><td className="use">100% · +42%</td></tr>
            <tr><td className="tok">Variação</td><td className="val">sempre com sinal · menos tipográfico</td><td className="use">+1.240 · −3,2% · +24 membros</td></tr>
            <tr><td className="tok">Tempo</td><td className="val">sem espaço · slash</td><td className="use">24/7 · 90 dias · 6h</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Botões" meta="verbo · objeto · objetivo">
        <table className="vds-token-table">
          <thead><tr><th>Função</th><th>Padrão</th><th>Errado</th></tr></thead>
          <tbody>
            <tr><td className="tok">Conversão</td><td className="val">Ver os planos</td><td className="use">Saiba mais / Quero saber</td></tr>
            <tr><td className="tok">Navegação</td><td className="val">Ver cases</td><td className="use">Clique aqui</td></tr>
            <tr><td className="tok">Confirmação</td><td className="val">Confirmar adesão</td><td className="use">OK / Sim</td></tr>
            <tr><td className="tok">Cancelamento</td><td className="val">Cancelar</td><td className="use">Voltar / Fechar (em ações)</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
