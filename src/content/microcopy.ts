/* ============================================================
   Microcopy de produto · textos canônicos de interface (PT-BR)
   ------------------------------------------------------------
   FONTE ÚNICA. Daqui saem:
   · a página /guidelines/microcopy (src/pages/guidelines/Microcopy.tsx)
   · o espelho pras IAs: plugins/viver-de-ia/skills/viver-de-ia-design/microcopy.md
     → regenere com `bun scripts/build-microcopy-md.mjs` (o teste ao lado barra drift)

   {campo} = valor que o produto preenche na hora.
   ============================================================ */

export type MicrocopyGroupId =
  | 'erros'
  | 'vazios'
  | 'confirmacoes'
  | 'sucesso'
  | 'carregamento'
  | 'onboarding'
  | 'botoes'
  | 'formulario';

export interface MicrocopyGroup {
  id: MicrocopyGroupId;
  label: string;
  regra: string;
}

export interface MicrocopyEntry {
  id: string;
  grupo: MicrocopyGroupId;
  situacao: string;
  texto: string;
  quandoUsar: string;
  naoEscreva?: string;
}

export const MICROCOPY_GROUPS: MicrocopyGroup[] = [
  { id: 'erros', label: 'Erros', regra: 'O que aconteceu, de quem é a falha e o próximo passo. Nunca culpe a pessoa.' },
  { id: 'vazios', label: 'Estados vazios', regra: 'Por que está vazio e qual ação enche a tela.' },
  { id: 'confirmacoes', label: 'Confirmações', regra: 'Pergunta com o verbo da ação e a consequência concreta. O botão repete o verbo.' },
  { id: 'sucesso', label: 'Sucesso', regra: 'Fato curto no passado. Sem "com sucesso", sem comemoração.' },
  { id: 'carregamento', label: 'Carregamento', regra: 'Diga o que está carregando e, quando passar de alguns segundos, quanto falta.' },
  { id: 'onboarding', label: 'Onboarding', regra: 'Uma dica por vez, ligada ao próximo passo real.' },
  { id: 'botoes', label: 'Botões', regra: 'Verbo no infinitivo + objeto, até 3 palavras, sentence case.' },
  { id: 'formulario', label: 'Ajuda de formulário', regra: 'Diga o formato antes do erro, não depois.' },
];

export const microcopy: MicrocopyEntry[] = [
  /* ---------- Erros ---------- */
  {
    id: 'erro-sem-conexao',
    grupo: 'erros',
    situacao: 'Sem internet, com rascunho guardado',
    texto: 'Sem conexão. O que você fez fica salvo neste aparelho e sobe quando a internet voltar.',
    quandoUsar: 'Banner quando o navegador fica offline e o app guarda as mudanças localmente. Se não guarda, use erro-rede.',
    naoEscreva: 'Ops! Você está offline.',
  },
  {
    id: 'erro-rede',
    grupo: 'erros',
    situacao: 'Ação não completou por falha de rede',
    texto: 'Não conseguimos conectar. Confira sua internet e tente de novo.',
    quandoUsar: 'Falha de rede numa ação pontual (salvar, enviar). Vem junto do botão Tentar de novo.',
    naoEscreva: 'Erro de rede. Por favor, tente novamente mais tarde.',
  },
  {
    id: 'erro-servidor',
    grupo: 'erros',
    situacao: 'Falha do nosso lado (500, 503)',
    texto: 'Algo travou do nosso lado. Não foi você — tente de novo em alguns minutos.',
    quandoUsar: 'Erro 5xx. Assume a responsabilidade e não pede pra pessoa conferir nada.',
    naoEscreva: 'Erro desconhecido. Contate o administrador.',
  },
  {
    id: 'erro-campo-obrigatorio',
    grupo: 'erros',
    situacao: 'Campo obrigatório vazio',
    texto: 'Preencha {campo} pra continuar.',
    quandoUsar: 'Abaixo do campo, ao sair dele ou ao enviar. {campo} com artigo: "o nome", "a empresa".',
    naoEscreva: 'Campo obrigatório!',
  },
  {
    id: 'erro-email-invalido',
    grupo: 'erros',
    situacao: 'Email com formato errado',
    texto: 'Esse email parece incompleto. Confira se tem @ e o domínio, como nome@empresa.com.br.',
    quandoUsar: 'Validação de formato no campo de email. Mostre ao sair do campo, não a cada tecla.',
    naoEscreva: 'Email inválido.',
  },
  {
    id: 'erro-email-em-uso',
    grupo: 'erros',
    situacao: 'Email já cadastrado',
    texto: 'Esse email já tem conta. Entre com ele ou recupere a senha.',
    quandoUsar: 'Cadastro com email que já existe. "Entre" e "recupere a senha" viram links.',
  },
  {
    id: 'erro-senha-curta',
    grupo: 'erros',
    situacao: 'Senha abaixo do mínimo',
    texto: 'A senha precisa de pelo menos 8 caracteres. Faltam {n}.',
    quandoUsar: 'Validação enquanto a pessoa digita. Troque 8 pelo mínimo real do produto.',
    naoEscreva: 'Senha fraca.',
  },
  {
    id: 'erro-login',
    grupo: 'erros',
    situacao: 'Email ou senha não conferem',
    texto: 'Email ou senha não conferem. Confira os dois e tente de novo.',
    quandoUsar: 'Falha de login. Não diga qual dos dois está errado — isso protege a conta.',
    naoEscreva: 'Senha incorreta para este usuário.',
  },
  {
    id: 'erro-telefone',
    grupo: 'erros',
    situacao: 'Telefone sem DDD ou incompleto',
    texto: 'Inclua o DDD, como (11) 98765-4321.',
    quandoUsar: 'Telefone brasileiro. Aceite com ou sem máscara e aponte só o que falta.',
    naoEscreva: 'Telefone inválido.',
  },
  {
    id: 'erro-cpf',
    grupo: 'erros',
    situacao: 'CPF que não passa na verificação',
    texto: 'Esse CPF não confere. Confira os 11 dígitos.',
    quandoUsar: 'Dígito verificador falhou. Não repita o CPF na mensagem.',
  },
  {
    id: 'erro-data',
    grupo: 'erros',
    situacao: 'Data em formato errado',
    texto: 'Use o formato dd/mm/aaaa, como 12/06/2026.',
    quandoUsar: 'Data digitada à mão. Com seletor de data, esse erro nem deve aparecer.',
  },
  {
    id: 'erro-arquivo-grande',
    grupo: 'erros',
    situacao: 'Arquivo acima do limite',
    texto: 'O arquivo tem {tamanho} e o limite é 10 MB. Envie um menor ou comprima este.',
    quandoUsar: 'Upload. {tamanho} com vírgula decimal, como 14,2 MB. Troque 10 MB pelo limite real.',
    naoEscreva: 'Arquivo muito grande!',
  },
  {
    id: 'erro-arquivo-formato',
    grupo: 'erros',
    situacao: 'Formato de arquivo não aceito',
    texto: 'Esse formato não é aceito. Envie PDF, PNG ou JPG.',
    quandoUsar: 'Upload com tipos restritos. Liste só os formatos que o campo aceita de fato.',
  },
  {
    id: 'erro-sem-permissao',
    grupo: 'erros',
    situacao: 'Sem permissão (403)',
    texto: 'Você não tem acesso a esta área. Ela depende do plano ou da função na conta — peça acesso ao admin.',
    quandoUsar: 'Página ou ação bloqueada por permissão. Diga o motivo provável e quem libera.',
    naoEscreva: 'Acesso negado.',
  },
  {
    id: 'erro-pagamento-recusado',
    grupo: 'erros',
    situacao: 'Cartão recusado',
    texto: 'O banco recusou o cartão final {final}. Nenhum valor foi cobrado. Tente outro cartão ou pague com Pix.',
    quandoUsar: 'Checkout e renovação. Sempre diga se houve cobrança ou não.',
    naoEscreva: 'Pagamento negado! Verifique seus dados.',
  },
  {
    id: 'erro-sessao-expirada',
    grupo: 'erros',
    situacao: 'Sessão expirou no meio de uma tarefa',
    texto: 'Sua sessão expirou. Entre de novo — o que você escreveu continua aqui.',
    quandoUsar: 'Login vencido com trabalho em aberto. Só prometa que o texto continua se o app guarda o rascunho.',
    naoEscreva: 'Sessão inválida. Faça login novamente.',
  },
  {
    id: 'erro-nao-encontrado',
    grupo: 'erros',
    situacao: 'Página não existe (404)',
    texto: 'Esta página saiu de cena. Pode ter mudado de endereço ou sido removida.',
    quandoUsar: '404. Sempre com um caminho de volta: início ou busca.',
    naoEscreva: 'Oops! Página não encontrada.',
  },
  {
    id: 'erro-limite-tentativas',
    grupo: 'erros',
    situacao: 'Muitas tentativas seguidas',
    texto: 'Muitas tentativas seguidas. Espere 5 minutos e tente de novo.',
    quandoUsar: 'Bloqueio temporário (login, código de verificação). Diga o tempo exato.',
  },

  /* ---------- Estados vazios ---------- */
  {
    id: 'vazio-primeiro-uso',
    grupo: 'vazios',
    situacao: 'Primeiro uso, nada criado ainda',
    texto: 'Você ainda não criou nenhum agente. Comece por um modelo pronto — leva uns 10 minutos.',
    quandoUsar: 'Tela vazia na primeira visita. Troque "agente" pelo objeto da tela e mantenha a ação concreta.',
    naoEscreva: 'Nada por aqui ainda! Que tal começar?',
  },
  {
    id: 'vazio-salvos',
    grupo: 'vazios',
    situacao: 'Coleção pessoal vazia',
    texto: 'Nenhuma aula salva ainda. Use Salvar em qualquer aula e ela aparece aqui.',
    quandoUsar: 'Salvos, favoritos, listas que a própria pessoa monta.',
  },
  {
    id: 'vazio-sem-resultados',
    grupo: 'vazios',
    situacao: 'Busca sem resultado',
    texto: 'Nada encontrado pra “{termo}”. Tente um termo mais curto ou confira a grafia.',
    quandoUsar: 'Busca sem retorno. Repita o termo buscado entre aspas.',
    naoEscreva: 'Nenhum resultado encontrado.',
  },
  {
    id: 'vazio-filtros',
    grupo: 'vazios',
    situacao: 'Filtros esconderam tudo',
    texto: 'Nenhum item com esses filtros. Limpe um ou mais filtros pra ver o resto.',
    quandoUsar: 'A lista tem itens, mas os filtros zeraram a visão. Vem com o botão Limpar filtros.',
  },
  {
    id: 'vazio-tudo-lido',
    grupo: 'vazios',
    situacao: 'Caixa zerada pela própria pessoa',
    texto: 'Tudo lido. As próximas notificações aparecem aqui.',
    quandoUsar: 'Notificações, pendências ou inbox esvaziados. Fato, sem comemoração.',
    naoEscreva: 'Parabéns! Você zerou tudo!',
  },
  {
    id: 'vazio-dados-insuficientes',
    grupo: 'vazios',
    situacao: 'Gráfico ainda sem dados',
    texto: 'Ainda não há dados suficientes. O gráfico aparece depois de 7 dias de uso.',
    quandoUsar: 'Dashboard novo. Diga quando os dados chegam, com o prazo real.',
  },

  /* ---------- Confirmações ---------- */
  {
    id: 'confirmar-excluir',
    grupo: 'confirmacoes',
    situacao: 'Exclusão sem volta',
    texto: 'Excluir o agente “{nome}”? As {n} conversas dele também são apagadas, e não dá pra recuperar.',
    quandoUsar: 'Diálogo antes de apagar de vez. Botão principal: Excluir agente (coral). Secundário: Cancelar.',
    naoEscreva: 'Tem certeza? Esta ação não pode ser desfeita.',
  },
  {
    id: 'confirmar-lixeira',
    grupo: 'confirmacoes',
    situacao: 'Exclusão que dá pra desfazer',
    texto: 'Agente movido pra lixeira. Ele fica lá por 30 dias.',
    quandoUsar: 'Toast logo depois de apagar algo recuperável, com o botão Desfazer. Nesse caso não precisa de diálogo antes.',
  },
  {
    id: 'confirmar-sair-sem-salvar',
    grupo: 'confirmacoes',
    situacao: 'Sair com alterações pendentes',
    texto: 'Você tem alterações não salvas. Se sair agora, elas se perdem.',
    quandoUsar: 'Fechar editor ou navegar com mudanças. Botões: Sair sem salvar e Continuar editando.',
    naoEscreva: 'Deseja realmente sair?',
  },
  {
    id: 'confirmar-cancelar-assinatura',
    grupo: 'confirmacoes',
    situacao: 'Cancelar assinatura',
    texto: 'Cancelar a assinatura? Seu acesso continua até {data} e não há nova cobrança.',
    quandoUsar: 'Fluxo de cancelamento. Botões Cancelar assinatura e Manter assinatura com o mesmo peso visual. {data} como 12/07/2026.',
    naoEscreva: 'Tem certeza que quer perder todos os seus benefícios?',
  },
  {
    id: 'confirmar-remover-membro',
    grupo: 'confirmacoes',
    situacao: 'Remover pessoa do time',
    texto: 'Remover {nome} do time? A pessoa perde o acesso na hora; o que ela criou continua no projeto.',
    quandoUsar: 'Gestão de membros. Botão principal: Remover do time.',
  },
  {
    id: 'confirmar-publicar',
    grupo: 'confirmacoes',
    situacao: 'Ação que avisa outras pessoas',
    texto: 'Publicar a aula pra turma {turma}? Os {n} alunos recebem um aviso.',
    quandoUsar: 'Não destrutiva, mas notifica gente. Botão principal: Publicar aula.',
  },
  {
    id: 'confirmar-mudar-plano',
    grupo: 'confirmacoes',
    situacao: 'Mudar de plano',
    texto: 'Mudar pro plano anual? A diferença de {valor} entra na próxima fatura, em {data}.',
    quandoUsar: 'Upgrade ou downgrade. {valor} como R$ 1.200,00 e {data} como 05/07/2026.',
    naoEscreva: 'Aproveite agora e economize muito!',
  },

  /* ---------- Sucesso ---------- */
  {
    id: 'sucesso-salvo',
    grupo: 'sucesso',
    situacao: 'Alterações salvas',
    texto: 'Alterações salvas.',
    quandoUsar: 'Toast depois de salvar à mão. Some sozinho em 4 segundos.',
    naoEscreva: 'Sucesso! Suas alterações foram salvas com sucesso.',
  },
  {
    id: 'sucesso-autosave',
    grupo: 'sucesso',
    situacao: 'Salvamento automático',
    texto: 'Salvo às {hora}.',
    quandoUsar: 'Indicador discreto perto do título, não toast. {hora} como 14h32.',
  },
  {
    id: 'sucesso-enviado',
    grupo: 'sucesso',
    situacao: 'Convite ou mensagem enviada',
    texto: 'Convite enviado pra {email}.',
    quandoUsar: 'Repita o destino pra pessoa conferir que foi pro lugar certo.',
  },
  {
    id: 'sucesso-copiado',
    grupo: 'sucesso',
    situacao: 'Copiado pra área de transferência',
    texto: 'Link copiado.',
    quandoUsar: 'Toast curto ou troca do rótulo do botão por 2 segundos. Troque "Link" pelo que foi copiado.',
  },
  {
    id: 'sucesso-pagamento',
    grupo: 'sucesso',
    situacao: 'Pagamento confirmado',
    texto: 'Pagamento confirmado. O recibo de {valor} foi pro seu email.',
    quandoUsar: 'Fim do checkout. {valor} como R$ 6.000,00.',
    naoEscreva: 'Parabéns! Sua compra foi realizada com sucesso!',
  },
  {
    id: 'sucesso-publicado',
    grupo: 'sucesso',
    situacao: 'Publicação feita',
    texto: 'Aula publicada. A turma {turma} já consegue ver.',
    quandoUsar: 'Depois de publicar. Diga quem passa a ver.',
  },
  {
    id: 'sucesso-senha-alterada',
    grupo: 'sucesso',
    situacao: 'Senha trocada',
    texto: 'Senha alterada. Nos outros aparelhos, você vai precisar entrar de novo.',
    quandoUsar: 'Troca de senha que derruba as outras sessões. Avise a consequência junto do fato.',
  },

  /* ---------- Carregamento ---------- */
  {
    id: 'carregando-conteudo',
    grupo: 'carregamento',
    situacao: 'Carregando uma lista ou página',
    texto: 'Carregando suas aulas…',
    quandoUsar: 'Diga o que está carregando. Se a estrutura da tela é conhecida, prefira skeleton.',
    naoEscreva: 'Aguarde…',
  },
  {
    id: 'carregando-salvando',
    grupo: 'carregamento',
    situacao: 'Salvando',
    texto: 'Salvando…',
    quandoUsar: 'Rótulo do botão ou indicador enquanto salva. No fim, vira "Salvo às {hora}."',
  },
  {
    id: 'carregando-processo-longo',
    grupo: 'carregamento',
    situacao: 'Processamento com tempo conhecido',
    texto: 'Analisando {n} conversas. Leva cerca de 2 minutos.',
    quandoUsar: 'IA processando um lote. {n} com ponto de milhar, como 1.240. Use a estimativa real.',
  },
  {
    id: 'carregando-etapas',
    grupo: 'carregamento',
    situacao: 'Processo em etapas',
    texto: 'Etapa {atual} de {total} · {etapa}',
    quandoUsar: 'Configuração em várias fases. {etapa} no gerúndio e em minúscula: "conectando o WhatsApp".',
  },
  {
    id: 'carregando-lento',
    grupo: 'carregamento',
    situacao: 'Demorando mais que o normal',
    texto: 'Está demorando mais que o normal. Você pode esperar mais um pouco ou tentar de novo.',
    quandoUsar: 'Depois de 10 segundos sem resposta. Vem com o botão Tentar de novo.',
  },
  {
    id: 'carregando-segundo-plano',
    grupo: 'carregamento',
    situacao: 'Tarefa em segundo plano',
    texto: 'Gerando o relatório. A gente avisa por email quando ficar pronto — pode fechar esta tela.',
    quandoUsar: 'Processo que passa de 1 minuto. Libere a pessoa em vez de prender na tela.',
  },

  /* ---------- Onboarding ---------- */
  {
    id: 'onboarding-boas-vindas',
    grupo: 'onboarding',
    situacao: 'Primeira tela depois do cadastro',
    texto: 'Que bom ter você aqui, {nome}. São 3 passos até o primeiro agente rodar.',
    quandoUsar: 'Abertura do onboarding. Diga quantos passos são e onde eles chegam.',
    naoEscreva: 'Bem-vindo(a) à revolução da IA!',
  },
  {
    id: 'onboarding-progresso',
    grupo: 'onboarding',
    situacao: 'Checklist incompleto',
    texto: 'Faltam {n} passos pra liberar a trilha completa.',
    quandoUsar: 'Barra de progresso do onboarding. No singular: "Falta 1 passo".',
  },
  {
    id: 'onboarding-perfil',
    grupo: 'onboarding',
    situacao: 'Pedido de contexto sobre a pessoa',
    texto: 'Conte o que você faz e o que quer automatizar. A gente usa isso pra sugerir as primeiras aulas.',
    quandoUsar: 'Campo aberto no onboarding. Diga pra que a informação serve.',
  },
  {
    id: 'onboarding-pular',
    grupo: 'onboarding',
    situacao: 'Etapa que dá pra pular',
    texto: 'Dá pra voltar a este passo em Configurações, quando quiser.',
    quandoUsar: 'Abaixo do botão Pular por agora. Tira o medo de perder a etapa.',
  },
  {
    id: 'onboarding-concluido',
    grupo: 'onboarding',
    situacao: 'Configuração terminada',
    texto: 'Configuração concluída. Seu agente já responde no WhatsApp.',
    quandoUsar: 'Último passo. Diga o que passou a funcionar, não só que acabou.',
    naoEscreva: 'Tudo pronto! Agora é só decolar!',
  },

  /* ---------- Botões ---------- */
  {
    id: 'botao-salvar',
    grupo: 'botoes',
    situacao: 'Salvar',
    texto: 'Salvar alterações',
    quandoUsar: 'Ação principal de formulário e editor.',
    naoEscreva: 'OK',
  },
  {
    id: 'botao-cancelar',
    grupo: 'botoes',
    situacao: 'Desistir da ação',
    texto: 'Cancelar',
    quandoUsar: 'Fecha o diálogo sem fazer nada. Em fluxo de assinatura, use Manter assinatura pra não confundir.',
  },
  {
    id: 'botao-excluir',
    grupo: 'botoes',
    situacao: 'Ação destrutiva',
    texto: 'Excluir agente',
    quandoUsar: 'Verbo + objeto, em coral, só dentro do diálogo de confirmação.',
    naoEscreva: 'Sim',
  },
  {
    id: 'botao-tentar-de-novo',
    grupo: 'botoes',
    situacao: 'Repetir depois de erro',
    texto: 'Tentar de novo',
    quandoUsar: 'Junto de erros de rede, servidor ou demora.',
    naoEscreva: 'Tentar novamente!',
  },
  {
    id: 'botao-criar',
    grupo: 'botoes',
    situacao: 'Criar item',
    texto: 'Criar agente',
    quandoUsar: 'Troque "agente" pelo objeto da tela.',
    naoEscreva: '+ Novo',
  },
  {
    id: 'botao-entrar',
    grupo: 'botoes',
    situacao: 'Login',
    texto: 'Entrar',
    quandoUsar: 'Tela de login e links pra ela.',
    naoEscreva: 'Fazer login',
  },
  {
    id: 'botao-continuar',
    grupo: 'botoes',
    situacao: 'Avançar etapa',
    texto: 'Continuar',
    quandoUsar: 'Passos intermediários. No último, use o verbo do resultado: Publicar aula, Concluir configuração.',
  },
  {
    id: 'botao-desfazer',
    grupo: 'botoes',
    situacao: 'Desfazer no toast',
    texto: 'Desfazer',
    quandoUsar: 'Dentro do toast de exclusão recuperável ou de mudança em massa.',
  },
  {
    id: 'botao-manter-assinatura',
    grupo: 'botoes',
    situacao: 'Ficar no plano',
    texto: 'Manter assinatura',
    quandoUsar: 'Par do Cancelar assinatura, com o mesmo peso visual.',
    naoEscreva: 'Não, quero perder meus benefícios',
  },
  {
    id: 'botao-ver-detalhes',
    grupo: 'botoes',
    situacao: 'Abrir o detalhe',
    texto: 'Ver detalhes',
    quandoUsar: 'Navegação pra uma página ou painel de detalhe. Se der, troque "detalhes" pelo objeto: Ver fatura.',
    naoEscreva: 'Clique aqui',
  },

  /* ---------- Ajuda de formulário ---------- */
  {
    id: 'form-email',
    grupo: 'formulario',
    situacao: 'Ajuda do campo de email',
    texto: 'Use o email em que você quer receber os avisos da turma.',
    quandoUsar: 'Abaixo do campo, antes de qualquer erro.',
  },
  {
    id: 'form-senha',
    grupo: 'formulario',
    situacao: 'Ajuda do campo de senha',
    texto: 'Mínimo de 8 caracteres. Uma frase longa protege mais que símbolos.',
    quandoUsar: 'Cadastro e troca de senha. Mesmo mínimo do erro-senha-curta.',
  },
  {
    id: 'form-telefone',
    grupo: 'formulario',
    situacao: 'Ajuda do campo de telefone',
    texto: 'Com DDD. Usamos só pra avisos da mentoria.',
    quandoUsar: 'Diga pra que o dado serve. Dado pessoal sem motivo claro afasta.',
  },
  {
    id: 'form-valor',
    grupo: 'formulario',
    situacao: 'Campo de valor em reais',
    texto: 'Em reais, com centavos: 1.250,00.',
    quandoUsar: 'Campo monetário sem máscara. Com máscara, o prefixo R$ já explica.',
  },
  {
    id: 'form-opcional',
    grupo: 'formulario',
    situacao: 'Marcar campo opcional',
    texto: '(opcional)',
    quandoUsar: 'Ao lado do rótulo. Marque o opcional, não o obrigatório: nada de asterisco vermelho.',
  },
  {
    id: 'form-busca',
    grupo: 'formulario',
    situacao: 'Placeholder de busca',
    texto: 'Buscar aulas, agentes ou pessoas',
    quandoUsar: 'O placeholder diz o que dá pra buscar. Nunca use placeholder no lugar do rótulo de campo.',
    naoEscreva: 'Pesquisar...',
  },
];

/* ============================================================
   Espelho em Markdown pras IAs (microcopy.md da skill).
   Mantenha o formato estável: o teste compara byte a byte.
   ============================================================ */
const cell = (s: string) => s.replace(/\|/g, '\\|');

export function microcopyMarkdown(): string {
  const lines: string[] = [
    '# Microcopy de produto · Viver de IA',
    '',
    '> Gerado de `src/content/microcopy.ts` por `bun scripts/build-microcopy-md.mjs`. Não edite à mão.',
    '> Página viva: `/guidelines/microcopy`.',
    '',
    `Textos canônicos de interface em PT-BR (${microcopy.length} textos em ${MICROCOPY_GROUPS.length} grupos). Quando a situação bate com uma entrada, use o texto como está, trocando só os {campos}. Quando não bate, escreva no mesmo molde.`,
    '',
    '## Regras',
    '',
    '- "você", nunca tu/teu/tua/contigo. Mensagem no imperativo de você: confira, tente, envie. Botão no infinitivo: Salvar alterações.',
    '- Sem exclamação, sem emoji, sem itálico, sem caps lock. Sentence case.',
    '- Números no formato brasileiro: R$ 1.200,00 · 14,2 MB · 1.240 · 12/06/2026 · 14h32.',
    '- Erro diz o que aconteceu, de quem é a falha e o próximo passo. Nunca culpa a pessoa.',
    '- {campo} = valor que o produto preenche na hora.',
  ];

  for (const g of MICROCOPY_GROUPS) {
    lines.push('', `## ${g.label}`, '', g.regra, '', '| id | situação | texto | quando usar | não escreva |', '|---|---|---|---|---|');
    for (const e of microcopy.filter((m) => m.grupo === g.id)) {
      lines.push(`| \`${e.id}\` | ${cell(e.situacao)} | ${cell(e.texto)} | ${cell(e.quandoUsar)} | ${e.naoEscreva ? cell(e.naoEscreva) : ''} |`);
    }
  }

  return lines.join('\n') + '\n';
}
