# Microcopy de produto · Viver de IA

> Gerado de `src/content/microcopy.ts` por `bun scripts/build-microcopy-md.mjs`. Não edite à mão.
> Página viva: `/guidelines/microcopy`.

Textos canônicos de interface em PT-BR (65 textos em 8 grupos). Quando a situação bate com uma entrada, use o texto como está, trocando só os {campos}. Quando não bate, escreva no mesmo molde.

## Regras

- "você", nunca tu/teu/tua/contigo. Mensagem no imperativo de você: confira, tente, envie. Botão no infinitivo: Salvar alterações.
- Sem exclamação, sem emoji, sem itálico, sem caps lock. Sentence case.
- Números no formato brasileiro: R$ 1.200,00 · 14,2 MB · 1.240 · 12/06/2026 · 14h32.
- Erro diz o que aconteceu, de quem é a falha e o próximo passo. Nunca culpa a pessoa.
- {campo} = valor que o produto preenche na hora.

## Erros

O que aconteceu, de quem é a falha e o próximo passo. Nunca culpe a pessoa.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `erro-sem-conexao` | Sem internet, com rascunho guardado | Sem conexão. O que você fez fica salvo neste aparelho e sobe quando a internet voltar. | Banner quando o navegador fica offline e o app guarda as mudanças localmente. Se não guarda, use erro-rede. | Ops! Você está offline. |
| `erro-rede` | Ação não completou por falha de rede | Não conseguimos conectar. Confira sua internet e tente de novo. | Falha de rede numa ação pontual (salvar, enviar). Vem junto do botão Tentar de novo. | Erro de rede. Por favor, tente novamente mais tarde. |
| `erro-servidor` | Falha do nosso lado (500, 503) | Algo travou do nosso lado. Não foi você — tente de novo em alguns minutos. | Erro 5xx. Assume a responsabilidade e não pede pra pessoa conferir nada. | Erro desconhecido. Contate o administrador. |
| `erro-campo-obrigatorio` | Campo obrigatório vazio | Preencha {campo} pra continuar. | Abaixo do campo, ao sair dele ou ao enviar. {campo} com artigo: "o nome", "a empresa". | Campo obrigatório! |
| `erro-email-invalido` | Email com formato errado | Esse email parece incompleto. Confira se tem @ e o domínio, como nome@empresa.com.br. | Validação de formato no campo de email. Mostre ao sair do campo, não a cada tecla. | Email inválido. |
| `erro-email-em-uso` | Email já cadastrado | Esse email já tem conta. Entre com ele ou recupere a senha. | Cadastro com email que já existe. "Entre" e "recupere a senha" viram links. |  |
| `erro-senha-curta` | Senha abaixo do mínimo | A senha precisa de pelo menos 8 caracteres. Faltam {n}. | Validação enquanto a pessoa digita. Troque 8 pelo mínimo real do produto. | Senha fraca. |
| `erro-login` | Email ou senha não conferem | Email ou senha não conferem. Confira os dois e tente de novo. | Falha de login. Não diga qual dos dois está errado — isso protege a conta. | Senha incorreta para este usuário. |
| `erro-telefone` | Telefone sem DDD ou incompleto | Inclua o DDD, como (11) 98765-4321. | Telefone brasileiro. Aceite com ou sem máscara e aponte só o que falta. | Telefone inválido. |
| `erro-cpf` | CPF que não passa na verificação | Esse CPF não confere. Confira os 11 dígitos. | Dígito verificador falhou. Não repita o CPF na mensagem. |  |
| `erro-data` | Data em formato errado | Use o formato dd/mm/aaaa, como 12/06/2026. | Data digitada à mão. Com seletor de data, esse erro nem deve aparecer. |  |
| `erro-arquivo-grande` | Arquivo acima do limite | O arquivo tem {tamanho} e o limite é 10 MB. Envie um menor ou comprima este. | Upload. {tamanho} com vírgula decimal, como 14,2 MB. Troque 10 MB pelo limite real. | Arquivo muito grande! |
| `erro-arquivo-formato` | Formato de arquivo não aceito | Esse formato não é aceito. Envie PDF, PNG ou JPG. | Upload com tipos restritos. Liste só os formatos que o campo aceita de fato. |  |
| `erro-sem-permissao` | Sem permissão (403) | Você não tem acesso a esta área. Ela depende do plano ou da função na conta — peça acesso ao admin. | Página ou ação bloqueada por permissão. Diga o motivo provável e quem libera. | Acesso negado. |
| `erro-pagamento-recusado` | Cartão recusado | O banco recusou o cartão final {final}. Nenhum valor foi cobrado. Tente outro cartão ou pague com Pix. | Checkout e renovação. Sempre diga se houve cobrança ou não. | Pagamento negado! Verifique seus dados. |
| `erro-sessao-expirada` | Sessão expirou no meio de uma tarefa | Sua sessão expirou. Entre de novo — o que você escreveu continua aqui. | Login vencido com trabalho em aberto. Só prometa que o texto continua se o app guarda o rascunho. | Sessão inválida. Faça login novamente. |
| `erro-nao-encontrado` | Página não existe (404) | Esta página saiu de cena. Pode ter mudado de endereço ou sido removida. | 404. Sempre com um caminho de volta: início ou busca. | Oops! Página não encontrada. |
| `erro-limite-tentativas` | Muitas tentativas seguidas | Muitas tentativas seguidas. Espere 5 minutos e tente de novo. | Bloqueio temporário (login, código de verificação). Diga o tempo exato. |  |

## Estados vazios

Por que está vazio e qual ação enche a tela.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `vazio-primeiro-uso` | Primeiro uso, nada criado ainda | Você ainda não criou nenhum agente. Comece por um modelo pronto — leva uns 10 minutos. | Tela vazia na primeira visita. Troque "agente" pelo objeto da tela e mantenha a ação concreta. | Nada por aqui ainda! Que tal começar? |
| `vazio-salvos` | Coleção pessoal vazia | Nenhuma aula salva ainda. Use Salvar em qualquer aula e ela aparece aqui. | Salvos, favoritos, listas que a própria pessoa monta. |  |
| `vazio-sem-resultados` | Busca sem resultado | Nada encontrado pra “{termo}”. Tente um termo mais curto ou confira a grafia. | Busca sem retorno. Repita o termo buscado entre aspas. | Nenhum resultado encontrado. |
| `vazio-filtros` | Filtros esconderam tudo | Nenhum item com esses filtros. Limpe um ou mais filtros pra ver o resto. | A lista tem itens, mas os filtros zeraram a visão. Vem com o botão Limpar filtros. |  |
| `vazio-tudo-lido` | Caixa zerada pela própria pessoa | Tudo lido. As próximas notificações aparecem aqui. | Notificações, pendências ou inbox esvaziados. Fato, sem comemoração. | Parabéns! Você zerou tudo! |
| `vazio-dados-insuficientes` | Gráfico ainda sem dados | Ainda não há dados suficientes. O gráfico aparece depois de 7 dias de uso. | Dashboard novo. Diga quando os dados chegam, com o prazo real. |  |

## Confirmações

Pergunta com o verbo da ação e a consequência concreta. O botão repete o verbo.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `confirmar-excluir` | Exclusão sem volta | Excluir o agente “{nome}”? As {n} conversas dele também são apagadas, e não dá pra recuperar. | Diálogo antes de apagar de vez. Botão principal: Excluir agente (coral). Secundário: Cancelar. | Tem certeza? Esta ação não pode ser desfeita. |
| `confirmar-lixeira` | Exclusão que dá pra desfazer | Agente movido pra lixeira. Ele fica lá por 30 dias. | Toast logo depois de apagar algo recuperável, com o botão Desfazer. Nesse caso não precisa de diálogo antes. |  |
| `confirmar-sair-sem-salvar` | Sair com alterações pendentes | Você tem alterações não salvas. Se sair agora, elas se perdem. | Fechar editor ou navegar com mudanças. Botões: Sair sem salvar e Continuar editando. | Deseja realmente sair? |
| `confirmar-cancelar-assinatura` | Cancelar assinatura | Cancelar a assinatura? Seu acesso continua até {data} e não há nova cobrança. | Fluxo de cancelamento. Botões Cancelar assinatura e Manter assinatura com o mesmo peso visual. {data} como 12/07/2026. | Tem certeza que quer perder todos os seus benefícios? |
| `confirmar-remover-membro` | Remover pessoa do time | Remover {nome} do time? A pessoa perde o acesso na hora; o que ela criou continua no projeto. | Gestão de membros. Botão principal: Remover do time. |  |
| `confirmar-publicar` | Ação que avisa outras pessoas | Publicar a aula pra turma {turma}? Os {n} alunos recebem um aviso. | Não destrutiva, mas notifica gente. Botão principal: Publicar aula. |  |
| `confirmar-mudar-plano` | Mudar de plano | Mudar pro plano anual? A diferença de {valor} entra na próxima fatura, em {data}. | Upgrade ou downgrade. {valor} como R$ 1.200,00 e {data} como 05/07/2026. | Aproveite agora e economize muito! |

## Sucesso

Fato curto no passado. Sem "com sucesso", sem comemoração.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `sucesso-salvo` | Alterações salvas | Alterações salvas. | Toast depois de salvar à mão. Some sozinho em 4 segundos. | Sucesso! Suas alterações foram salvas com sucesso. |
| `sucesso-autosave` | Salvamento automático | Salvo às {hora}. | Indicador discreto perto do título, não toast. {hora} como 14h32. |  |
| `sucesso-enviado` | Convite ou mensagem enviada | Convite enviado pra {email}. | Repita o destino pra pessoa conferir que foi pro lugar certo. |  |
| `sucesso-copiado` | Copiado pra área de transferência | Link copiado. | Toast curto ou troca do rótulo do botão por 2 segundos. Troque "Link" pelo que foi copiado. |  |
| `sucesso-pagamento` | Pagamento confirmado | Pagamento confirmado. O recibo de {valor} foi pro seu email. | Fim do checkout. {valor} como R$ 6.000,00. | Parabéns! Sua compra foi realizada com sucesso! |
| `sucesso-publicado` | Publicação feita | Aula publicada. A turma {turma} já consegue ver. | Depois de publicar. Diga quem passa a ver. |  |
| `sucesso-senha-alterada` | Senha trocada | Senha alterada. Nos outros aparelhos, você vai precisar entrar de novo. | Troca de senha que derruba as outras sessões. Avise a consequência junto do fato. |  |

## Carregamento

Diga o que está carregando e, quando passar de alguns segundos, quanto falta.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `carregando-conteudo` | Carregando uma lista ou página | Carregando suas aulas… | Diga o que está carregando. Se a estrutura da tela é conhecida, prefira skeleton. | Aguarde… |
| `carregando-salvando` | Salvando | Salvando… | Rótulo do botão ou indicador enquanto salva. No fim, vira "Salvo às {hora}." |  |
| `carregando-processo-longo` | Processamento com tempo conhecido | Analisando {n} conversas. Leva cerca de 2 minutos. | IA processando um lote. {n} com ponto de milhar, como 1.240. Use a estimativa real. |  |
| `carregando-etapas` | Processo em etapas | Etapa {atual} de {total} · {etapa} | Configuração em várias fases. {etapa} no gerúndio e em minúscula: "conectando o WhatsApp". |  |
| `carregando-lento` | Demorando mais que o normal | Está demorando mais que o normal. Você pode esperar mais um pouco ou tentar de novo. | Depois de 10 segundos sem resposta. Vem com o botão Tentar de novo. |  |
| `carregando-segundo-plano` | Tarefa em segundo plano | Gerando o relatório. A gente avisa por email quando ficar pronto — pode fechar esta tela. | Processo que passa de 1 minuto. Libere a pessoa em vez de prender na tela. |  |

## Onboarding

Uma dica por vez, ligada ao próximo passo real.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `onboarding-boas-vindas` | Primeira tela depois do cadastro | Que bom ter você aqui, {nome}. São 3 passos até o primeiro agente rodar. | Abertura do onboarding. Diga quantos passos são e onde eles chegam. | Bem-vindo(a) à revolução da IA! |
| `onboarding-progresso` | Checklist incompleto | Faltam {n} passos pra liberar a trilha completa. | Barra de progresso do onboarding. No singular: "Falta 1 passo". |  |
| `onboarding-perfil` | Pedido de contexto sobre a pessoa | Conte o que você faz e o que quer automatizar. A gente usa isso pra sugerir as primeiras aulas. | Campo aberto no onboarding. Diga pra que a informação serve. |  |
| `onboarding-pular` | Etapa que dá pra pular | Dá pra voltar a este passo em Configurações, quando quiser. | Abaixo do botão Pular por agora. Tira o medo de perder a etapa. |  |
| `onboarding-concluido` | Configuração terminada | Configuração concluída. Seu agente já responde no WhatsApp. | Último passo. Diga o que passou a funcionar, não só que acabou. | Tudo pronto! Agora é só decolar! |

## Botões

Verbo no infinitivo + objeto, até 3 palavras, sentence case.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `botao-salvar` | Salvar | Salvar alterações | Ação principal de formulário e editor. | OK |
| `botao-cancelar` | Desistir da ação | Cancelar | Fecha o diálogo sem fazer nada. Em fluxo de assinatura, use Manter assinatura pra não confundir. |  |
| `botao-excluir` | Ação destrutiva | Excluir agente | Verbo + objeto, em coral, só dentro do diálogo de confirmação. | Sim |
| `botao-tentar-de-novo` | Repetir depois de erro | Tentar de novo | Junto de erros de rede, servidor ou demora. | Tentar novamente! |
| `botao-criar` | Criar item | Criar agente | Troque "agente" pelo objeto da tela. | + Novo |
| `botao-entrar` | Login | Entrar | Tela de login e links pra ela. | Fazer login |
| `botao-continuar` | Avançar etapa | Continuar | Passos intermediários. No último, use o verbo do resultado: Publicar aula, Concluir configuração. |  |
| `botao-desfazer` | Desfazer no toast | Desfazer | Dentro do toast de exclusão recuperável ou de mudança em massa. |  |
| `botao-manter-assinatura` | Ficar no plano | Manter assinatura | Par do Cancelar assinatura, com o mesmo peso visual. | Não, quero perder meus benefícios |
| `botao-ver-detalhes` | Abrir o detalhe | Ver detalhes | Navegação pra uma página ou painel de detalhe. Se der, troque "detalhes" pelo objeto: Ver fatura. | Clique aqui |

## Ajuda de formulário

Diga o formato antes do erro, não depois.

| id | situação | texto | quando usar | não escreva |
|---|---|---|---|---|
| `form-email` | Ajuda do campo de email | Use o email em que você quer receber os avisos da turma. | Abaixo do campo, antes de qualquer erro. |  |
| `form-senha` | Ajuda do campo de senha | Mínimo de 8 caracteres. Uma frase longa protege mais que símbolos. | Cadastro e troca de senha. Mesmo mínimo do erro-senha-curta. |  |
| `form-telefone` | Ajuda do campo de telefone | Com DDD. Usamos só pra avisos da mentoria. | Diga pra que o dado serve. Dado pessoal sem motivo claro afasta. |  |
| `form-valor` | Campo de valor em reais | Em reais, com centavos: 1.250,00. | Campo monetário sem máscara. Com máscara, o prefixo R$ já explica. |  |
| `form-opcional` | Marcar campo opcional | (opcional) | Ao lado do rótulo. Marque o opcional, não o obrigatório: nada de asterisco vermelho. |  |
| `form-busca` | Placeholder de busca | Buscar aulas, agentes ou pessoas | O placeholder diz o que dá pra buscar. Nunca use placeholder no lugar do rótulo de campo. | Pesquisar... |
