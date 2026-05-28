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
              "Efizi: +11.920 conversas analisadas para elevar performance comercial com IA"
            </p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '8px 0 0', lineHeight: 1.55 }}>
              "Balzani & Zimbel: R$ 4.600/mês em economia e 100% da operação centralizada"
            </p>
          </div>
          <div className="vds-dont">
            <p className="vds-dont-title">Evite</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '4px 0', lineHeight: 1.55 }}>
              "Como a Efizi revolucionou as vendas com IA"
            </p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '8px 0 0', lineHeight: 1.55 }}>
              "Conheça o case incrível da Balzani"
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
          Pull quotes são curtas, em primeira pessoa, sempre atribuídas. <em>Italic em Geist</em>
          para a frase, sans-serif para a atribuição. Mantenha a oralidade — o "fala de WhatsApp" é o tom.
        </p>
        <div className="vds-do-dont">
          <div className="vds-do">
            <p className="vds-do-title">Faça</p>
            <p style={{ fontSize: 13, color: 'var(--via-text-body)', margin: '4px 0', lineHeight: 1.55, fontStyle: 'normal' }}>
              "Ela fez isso com pouquíssimas horas. Sem saber nada."<br />
              <span style={{ fontStyle: 'normal', color: 'var(--via-text-muted)' }}>— Márisson Lage Gonçalves</span>
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
            <tr><td className="tok">Reais</td><td className="val">R$ + espaço + ponto</td><td className="use">R$ 4.600 · R$ 2,5M · R$ 248k</td></tr>
            <tr><td className="tok">Porcentagem</td><td className="val">sem espaço</td><td className="use">100% · +42%</td></tr>
            <tr><td className="tok">Plus</td><td className="val">com sinal</td><td className="use">+11.920 · +24 alunos</td></tr>
            <tr><td className="tok">Tempo</td><td className="val">sem espaço · slash</td><td className="use">24/7 · 16 semanas · 3 dias</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Botões" meta="verbo · objeto · objetivo">
        <table className="vds-token-table">
          <thead><tr><th>Função</th><th>Padrão</th><th>Errado</th></tr></thead>
          <tbody>
            <tr><td className="tok">Conversão</td><td className="val">Entrar na turma</td><td className="use">Saiba mais / Quero saber</td></tr>
            <tr><td className="tok">Navegação</td><td className="val">Ver cases</td><td className="use">Clique aqui</td></tr>
            <tr><td className="tok">Confirmação</td><td className="val">Confirmar inscrição</td><td className="use">OK / Sim</td></tr>
            <tr><td className="tok">Cancelamento</td><td className="val">Cancelar</td><td className="use">Voltar / Fechar (em ações)</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
