import type { Question } from '../types';

export const questions: Question[] = [
  // INICIANTE (1-5)
  {
    id: 1,
    level: 'iniciante',
    statement: 'Claude Code é uma ferramenta de linha de comando (CLI) oficial da Anthropic para usar o Claude diretamente no terminal.',
    answer: true,
    explanation: 'Claude Code é exatamente isso: a CLI oficial da Anthropic. Ele roda no terminal e permite editar código, criar commits e muito mais sem sair do ambiente de desenvolvimento.',
  },
  {
    id: 2,
    level: 'iniciante',
    statement: 'Claude Code e Claude.ai (o chat web) são a mesma ferramenta acessada por interfaces diferentes.',
    answer: false,
    explanation: 'São produtos distintos. Claude.ai é uma interface web de chat de propósito geral. Claude Code é uma CLI especializada para fluxos de desenvolvimento: lê arquivos do sistema, executa comandos e tem acesso direto ao projeto.',
  },
  {
    id: 3,
    level: 'iniciante',
    statement: 'Com Claude Code, é possível pedir ao Claude que crie commits do Git, escreva testes e execute scripts de terminal diretamente.',
    answer: true,
    explanation: 'Essas são capacidades centrais do Claude Code. Ele tem acesso ao sistema de arquivos e ao shell, podendo rodar git, executar testes, instalar dependências e realizar outras tarefas de desenvolvimento autonomamente.',
  },
  {
    id: 4,
    level: 'iniciante',
    statement: 'Claude Code só funciona em sistemas operacionais Linux e macOS, não sendo suportado no Windows.',
    answer: false,
    explanation: 'Claude Code é suportado no Windows via WSL (Windows Subsystem for Linux). Usuários Windows precisam instalar o WSL e rodar o Claude Code dentro do ambiente Linux — plataforma oficialmente suportada.',
  },
  {
    id: 5,
    level: 'iniciante',
    statement: 'Para instalar o Claude Code, basta executar o comando "npm install -g @anthropic-ai/claude-code" no terminal.',
    answer: true,
    explanation: 'Essa é a forma oficial de instalação. O Claude Code é publicado no npm como pacote global sob o escopo @anthropic-ai, e requer Node.js instalado na máquina.',
  },

  // INTERMEDIÁRIO (6-10)
  {
    id: 6,
    level: 'intermediario',
    statement: 'O arquivo CLAUDE.md na raiz do projeto serve como um conjunto de instruções persistentes que o Claude Code lê automaticamente ao iniciar em um diretório.',
    answer: true,
    explanation: 'O CLAUDE.md é o mecanismo de contexto persistente do Claude Code. Pode conter convenções do projeto, comandos importantes, arquitetura e regras de estilo — tudo que o Claude precisa saber ao trabalhar no repositório.',
  },
  {
    id: 7,
    level: 'intermediario',
    statement: 'O comando /clear no Claude Code apaga permanentemente o histórico de conversas salvo no disco.',
    answer: false,
    explanation: 'O /clear limpa o contexto da sessão atual em memória, reduzindo o uso de tokens na janela de contexto. Ele não apaga arquivos de histórico do disco. Para gerenciar sessões persistidas, existem outros mecanismos como o /resume.',
  },
  {
    id: 8,
    level: 'intermediario',
    statement: 'O sistema de permissões do Claude Code permite configurar quais ferramentas e comandos o Claude pode executar automaticamente, sem precisar de aprovação manual a cada vez.',
    answer: true,
    explanation: 'Claude Code tem um sistema de allow/deny configurável no settings.json. Você pode permitir categorias inteiras (como todos os comandos npm) ou padrões individuais, evitando prompts repetitivos para operações de baixo risco.',
  },
  {
    id: 9,
    level: 'intermediario',
    statement: 'Hooks no Claude Code são scripts que são executados automaticamente em momentos específicos do ciclo de vida, como antes ou depois de o Claude fazer uma alteração no código.',
    answer: true,
    explanation: 'Os hooks permitem automatizar ações como rodar um linter após cada edição ou notificar quando uma tarefa termina. São configurados no settings.json e executados pelo harness do Claude Code em pontos definidos do workflow.',
  },
  {
    id: 10,
    level: 'intermediario',
    statement: 'MCP Servers (Model Context Protocol) são extensões que permitem ao Claude Code acessar fontes de dados externas e ferramentas além do sistema de arquivos local, como APIs, bancos de dados e serviços web.',
    answer: true,
    explanation: 'O MCP é um protocolo aberto que expande as capacidades do Claude Code. Com MCP servers configurados, o Claude pode consultar bancos de dados, fazer chamadas a APIs, pesquisar na web e interagir com serviços externos.',
  },

  // AVANÇADO (11-15)
  {
    id: 11,
    level: 'avancado',
    statement: 'O Claude Code SDK permite criar agentes autônomos que executam tarefas de programação de forma não-interativa, integrando o Claude em pipelines de CI/CD e automações customizadas.',
    answer: true,
    explanation: 'O Agent SDK expõe uma API programática que permite invocar o Claude de forma headless em scripts, pipelines de CI, automações e ferramentas customizadas, sem interação humana em tempo real.',
  },
  {
    id: 12,
    level: 'avancado',
    statement: 'No Claude Code, todos os usuários usam obrigatoriamente o mesmo modelo (claude-sonnet), sem possibilidade de trocar para Opus ou Haiku.',
    answer: false,
    explanation: 'Claude Code permite selecionar o modelo via flag --model ou configurando o padrão. Usuários com acesso podem usar claude-opus para tarefas complexas ou claude-haiku para menor latência e custo.',
  },
  {
    id: 13,
    level: 'avancado',
    statement: 'Git Worktrees integrados ao Claude Code permitem que múltiplas instâncias do agente trabalhem em paralelo em diferentes branches do mesmo repositório sem conflitos.',
    answer: true,
    explanation: 'Worktrees do Git criam checkouts independentes de branches diferentes no mesmo repositório. No Claude Code, isso permite paralelizar tarefas: um agente corrige um bug em hotfix enquanto outro desenvolve uma feature em outra branch.',
  },
  {
    id: 14,
    level: 'avancado',
    statement: 'O prompt caching no contexto do Claude Code reduz latência e custos ao reutilizar partes do contexto (como o conteúdo do CLAUDE.md e arquivos de projeto) que não mudaram entre as requisições.',
    answer: true,
    explanation: 'Prompt caching é uma feature da API da Anthropic utilizada automaticamente pelo Claude Code. Partes estáticas do contexto — instruções do CLAUDE.md, conteúdo de arquivos lidos — são cacheadas na API, reduzindo tempo de resposta e custo por token.',
  },
  {
    id: 15,
    level: 'avancado',
    statement: 'Subagentes no Claude Code são instâncias completamente independentes que não compartilham nenhuma informação com o agente pai que as invocou.',
    answer: false,
    explanation: 'Subagentes são lançados pelo agente orquestrador e recebem contexto delegado: a tarefa, arquivos relevantes e instruções. O agente pai coordena os subagentes e consolida os resultados — a comunicação é fundamental ao padrão.',
  },
];
