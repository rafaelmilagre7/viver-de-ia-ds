import { Megaphone, Mail, MessageCircle, Headphones, Target, Users, Briefcase, Mic } from 'lucide-react';
import DocsHeader from '../../components/docs/DocsHeader';
import Section from '../../components/docs/Section';
import './voice-extended.css';

const contexts = [
  {
    id: 'marketing-landing',
    icon: Megaphone,
    name: 'Marketing · landing / sales direto',
    register: 'editorial-comercial',
    person: '"você" · 2ª pessoa singular',
    rhythm: 'frase curta + número grande + atribuição',
    sample_good: '"+220 operadores. 90 dias até o primeiro agente em produção. Você é o próximo."',
    sample_bad:  '"Junte-se a centenas de profissionais que já transformaram suas carreiras com IA!"',
    rules: [
      'Promessa específica + condição realista (não "vai mudar sua vida")',
      'Sempre número com período ("R$ 1,8M em 12 meses", não "milhões")',
      'CTA imperativo curto ("entrar na próxima turma", não "garanta sua vaga AGORA!!!")',
      'Sem exclamação · sem caps-lock · sem emoji decorativo',
    ],
  },
  {
    id: 'email-transactional',
    icon: Mail,
    name: 'Email transacional · billing / sync / alert',
    register: 'concierge-direto',
    person: '"você" · neutro, factual',
    rhythm: 'assunto = fato · primeira frase = resumo · resto = detalhe',
    sample_good: 'Subject: "Cobrança em 2 dias · R$ 6.000"\nBody: "A renovação da sua mentoria entra na fatura sex 23/mai. Reduz pra plano lite em 1 clique se preferir."',
    sample_bad:  'Subject: "🚨 ATENÇÃO Rafael! Sua fatura está chegando 💰"\nBody: "Olá Rafael, esperamos que você esteja bem! Gostaríamos de informar que..."',
    rules: [
      'Subject = frase de amigo, sem "Olá", sem emoji, sem urgência fabricada',
      'Primeira frase já entrega o fato · sem "esperamos que esteja bem"',
      'Sempre ação clara ("reduz pra plano lite em 1 clique") · não só informe',
      'Assinatura humana ("Caio · time Viver de IA"), não corporativa',
    ],
  },
  {
    id: 'email-editorial',
    icon: Mail,
    name: 'Email editorial · newsletter / drip / recap',
    register: 'crônica-operacional',
    person: '"a gente" · "você" · misto coloquial-editorial',
    rhythm: 'longa abertura editorial · 2-3 sections com peso · CTA discreto',
    sample_good: '"Essa semana vi a Nina passar de 11k pra 13k conversas. Pra quem tá começando a operar agente, dois detalhes mudam tudo aqui — vou contar."',
    sample_bad:  '"📰 Newsletter Semanal #42 — As 5 maiores novidades de IA dessa semana! 🤖"',
    rules: [
      'Voz de quem operou nessa semana · não curadoria genérica de "as 5 melhores"',
      'Sempre 1 número real próprio ou 1 case próprio · sem reproduzir tweet de IA influencer',
      'Tom de carta pessoal, não de newsletter corporate',
      'Pode ter ênfase em italic · não emoji · não "🔥"',
    ],
  },
  {
    id: 'community',
    icon: MessageCircle,
    name: 'Comunidade · Discord / comments / replies',
    register: 'mentor-presente',
    person: '"você" · pode ser "tu" em respostas mais coloquiais',
    rhythm: 'mais solto · pode quebrar regra editorial pra parecer humano',
    sample_good: '"oi pessoal, esse caso do João é exatamente o que conversei com a turma 2025.4. ele resolveu com 3 prompts encadeados + 1 fallback. cola o screenshot que eu comento."',
    sample_bad:  '"Olá comunidade! Adorei ver essa discussão produtiva. Vamos manter o engajamento alto!"',
    rules: [
      'Lowercase ok em opens · "oi pessoal" não "Olá comunidade"',
      'Resposta ancora em caso específico, nome próprio se houver',
      'Pode usar gírias técnicas ("rodar", "subir", "deploy") · sem pose de palestrante',
      'Cita aluno por nome quando conhece · "lembra do caso da Camila"',
    ],
  },
  {
    id: 'support',
    icon: Headphones,
    name: 'Suporte 1:1 · ticket / DM / sessão privada',
    register: 'pragmático-humano',
    person: '"você" · 1ª pessoa singular ("eu cuido")',
    rhythm: 'reconhece problema · explica causa · entrega solução · pergunta se ficou',
    sample_good: '"vi aqui que o webhook tá retornando 504 desde ontem 14h. é timeout do provider de embeddings, fora do nosso lado. já fiz failover e tá rodando. quer que eu envie o relatório completo do que aconteceu?"',
    sample_bad:  '"Prezado(a), recebemos sua solicitação. Em até 48h um analista entrará em contato. Aguardamos seu retorno."',
    rules: [
      'Sempre nome próprio no início se conhecer ("João, vi aqui que...")',
      'Reconhece o que o cliente trouxe antes de explicar',
      'Causa e ação em 1 frase cada · sem jargão burocrático ("conforme nossa política")',
      'Termina com pergunta concreta · não "ficamos à disposição"',
    ],
  },
  {
    id: 'paid-ads',
    icon: Target,
    name: 'Paid ads · Meta / Google · headline + body curtos',
    register: 'editorial-comprimido',
    person: '"você" · 2ª pessoa singular direta',
    rhythm: 'headline = afirmação corajosa · body = razão + métrica · CTA = ação curta',
    sample_good: 'Headline: "Em 2026, operador que não opera IA, não opera."\nBody: "220 operadores formados. Próxima turma fecha em 9 dias."\nCTA: "Ver programa"',
    sample_bad:  'Headline: "🚀 OPORTUNIDADE ÚNICA - Aprenda IA do ZERO!"\nBody: "Curso completo com mais de 50 aulas, certificado e suporte! Inscreva-se JÁ!"\nCTA: "Quero entrar agora"',
    rules: [
      'Headline em 1 linha (até 40 chars idealmente) · afirmação, não pergunta',
      'Body com no máximo 2 frases · 1 fato + 1 condição/urgência real',
      'CTA verbal infinitivo, 2-4 palavras ("ver programa", "entrar na turma")',
      'Sem palavra "garanta" · sem "OPORTUNIDADE ÚNICA" · sem "JÁ"',
    ],
  },
  {
    id: 'social-organic',
    icon: Users,
    name: 'Social orgânico · LinkedIn / Instagram / X',
    register: 'crônica-pessoal',
    person: '"eu" · post em 1ª pessoa do operador',
    rhythm: 'gancho na primeira linha · 3 parágrafos curtos · sem CTA agressivo',
    sample_good: '"7 meses atrás a Nina perdia 40% das conversas no primeiro turno. essa semana ela passou de 96%. o segredo não foi prompt — foi observar o que cada falha tinha em comum durante 3 dias. anotei aqui o que mudei."',
    sample_bad:  '"🚀 5 dicas INFALÍVEIS para você dominar IA em 2026! 👉 1. Aprenda prompt engineering 2. Use ChatGPT diariamente..."',
    rules: [
      'Primeira linha = gancho com número OU pergunta operacional ("por que o agente travou?")',
      'Sempre case próprio · pode ser anônimo se for cliente',
      'Sem listas numeradas com emoji · sem "5 dicas infalíveis"',
      'CTA discreto no fim (em texto natural): "se quiser ver o código, comenta aqui"',
    ],
  },
  {
    id: 'sales-b2b',
    icon: Briefcase,
    name: 'Sales B2B · pitch deck / proposta / call',
    register: 'consultivo-objetivo',
    person: '"vocês" · pode incluir "nós" quando explicando solução',
    rhythm: 'problema do cliente · custo atual · solução · prova · próximo passo',
    sample_good: '"Vocês perdem ~4h/semana só com triagem de leads no Meta. Nossa equipe construiu Nina pra Viver de IA reduzir isso em 89%. O método é replicável aqui — vou mostrar como em 15 min."',
    sample_bad:  '"Olá! Somos uma empresa líder em soluções inovadoras de IA. Gostaríamos de apresentar nossa proposta revolucionária..."',
    rules: [
      'Sempre começar pelo custo atual do cliente, não pela apresentação da empresa',
      'Métrica específica que se possa medir depois ("89% menos", não "muito mais eficiente")',
      'Caso próprio + análogo · "construímos isso pra Viver de IA, replicável aqui"',
      'Próximo passo concreto · "15 min de call sex" não "ficamos à disposição"',
    ],
  },
  {
    id: 'event-speaker',
    icon: Mic,
    name: 'Eventos · Leaders AI Conference / palestra / podcast',
    register: 'palco-operacional',
    person: 'misto · "vocês aqui" → "a gente" → "eu vi"',
    rhythm: 'abertura forte · 1-2 cases longos · provocação final · sem agradecimento corporate',
    sample_good: 'Abertura: "Vou contar 3 erros que cometi construindo a Nina nos últimos 7 meses, e o que aprendi com cada um. Acho que vocês vão se reconhecer em pelo menos 1." · Encerramento: "Se a próxima turma fechar com 30 operadores em produção, esse palco se paga. Volta semestre que vem pra eu prestar contas."',
    sample_bad:  '"Boa tarde a todos! É uma honra estar aqui hoje compartilhando meu conhecimento sobre o futuro da IA..."',
    rules: [
      'Sem "boa tarde a todos" no início · entra pelo case',
      'Compartilha erro próprio antes de acerto · cria credibilidade',
      'Provocação no fim, não agradecimento · "volta semestre que vem"',
      'Pode usar humor seco · não comédia stand-up · não emoji verbal ("né galera!")',
    ],
  },
];

export default function VoiceExtended() {
  return (
    <>
      <DocsHeader
        eyebrow="Fundamentos · voz estendida"
        title={
          <>
            Voz <em>muda de registro</em>, mantém a marca.
          </>
        }
        lede="Voz Viver de IA não é uma só. Tem 9 registros diferentes — landing, email transacional, email editorial, comunidade, suporte, paid ads, social, sales, palco. Cada um com regras próprias, exemplo bom, exemplo ruim. Mantém o esqueleto (operador-experiente, número-sobre-adjetivo, sem-guru-bro), muda o formalismo e o ritmo."
      />

      {contexts.map((c) => {
        const Icon = c.icon;
        return (
          <Section
            key={c.id}
            title={c.name}
            meta={`${c.register} · ${c.person}`}
          >
            <article className="vds-ve-context">
              <header>
                <div className="vds-ve-icon">
                  <Icon size={15} strokeWidth={1.8} />
                </div>
                <div>
                  <span className="vds-ve-eyebrow">Ritmo</span>
                  <p className="vds-ve-rhythm">{c.rhythm}</p>
                </div>
              </header>

              <div className="vds-ve-samples">
                <article className="vds-ve-sample good">
                  <span className="lbl">Exemplo · tom certo</span>
                  <pre>{c.sample_good}</pre>
                </article>
                <article className="vds-ve-sample bad">
                  <span className="lbl">Exemplo · tom errado</span>
                  <pre>{c.sample_bad}</pre>
                </article>
              </div>

              <div className="vds-ve-rules">
                <span className="vds-ve-rules-eyebrow">Regras específicas deste contexto</span>
                <ul>
                  {c.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Section>
        );
      })}

      <Section
        title="O esqueleto que NUNCA muda"
        meta="independente de contexto, 5 invariantes"
      >
        <article className="vds-ve-spine">
          <ol>
            <li>
              <strong>Número sempre que possível.</strong> Toda afirmação carrega métrica ou citação atribuída. "+220 operadores", "R$ 1,8M destravado", "14h de resposta média". Nunca "centenas", "muito mais", "grande parte".
            </li>
            <li>
              <strong>Sem clichê de IA.</strong> Banidos em qualquer contexto: "revolucione", "transforme", "o futuro chegou", "potencialize", "alavanque", "disrupt", "game-changer". Operador maduro não usa essas palavras.
            </li>
            <li>
              <strong>Sem urgência fabricada.</strong> "ÚLTIMOS DIAS", "OPORTUNIDADE ÚNICA", "GARANTA JÁ" são proibidos. Urgência real (data de turma, vagas limitadas) sempre em frase factual: "Próxima turma fecha sex 22/mai · restam 4 vagas".
            </li>
            <li>
              <strong>Sem emoji decorativo no corpo.</strong> ✨🚀💪🔥 banidos. Único emoji aceito em raríssimas exceções: 1 emoji isolado fim de frase pessoal em social orgânico (e ainda assim, evitar).
            </li>
            <li>
              <strong>Sempre ação concreta no fim.</strong> Toda peça termina com próximo passo claro · não com "ficamos à disposição" ou "qualquer dúvida estou aqui". "Vai aqui ver o programa", "Reply esse email com seu caso", "Comenta o que travou".
            </li>
          </ol>
        </article>
      </Section>
    </>
  );
}
