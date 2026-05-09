# PRD - Quiz Verdadeiro ou Falso: Claude Code

## 1. Visão Geral

**Produto:** Quiz web interativo de Verdadeiro ou Falso sobre Claude Code
**Objetivo:** Testar e educar usuários sobre Claude Code através de um quiz gamificado com 3 níveis de dificuldade
**Público-alvo:** Desenvolvedores, PMs e profissionais de tecnologia interessados em Claude Code

## 2. Requisitos de Negócio

### 2.1 Proposta de Valor
- Aprendizado gamificado sobre Claude Code
- Formato V/F: rápido, acessível, baixa barreira de entrada
- Feedback educativo quando o usuário erra, reforçando o aprendizado
- Ranking público para incentivar competição e replays

### 2.2 Métricas de Sucesso
- Usuários completam o quiz até o final (taxa de conclusão)
- Tempo médio de conclusão ~3-5 minutos
- Engajamento: usuários refazem o quiz para melhorar posição no ranking
- Analytics: taxa de acerto por pergunta para identificar gaps de conhecimento

### 2.3 Níveis de Dificuldade

| Nível | Público | Temas |
|-------|---------|-------|
| **Iniciante** (5 perguntas) | PMs, curiosos, devs iniciantes | O que é Claude Code, casos de uso, conceitos gerais, diferença entre Claude Code e Claude.ai |
| **Intermediário** (5 perguntas) | Devs que já usaram | Slash commands, CLAUDE.md, permissões, hooks, MCP servers, modo de permissão |
| **Avançado** (5 perguntas) | Power users | Agent SDK, worktrees, prompt caching, modelos disponíveis, configurações avançadas, subagents |

### 2.4 Fluxo do Usuário

```
[Tela Inicial (apelido opcional)] → [Perguntas Iniciante 1-5] → [Perguntas Intermediário 6-10] → [Perguntas Avançado 11-15] → [Tela de Resultado + Ranking]
```

1. **Tela Inicial:** Título, subtítulo, campo de apelido (opcional, pode pular) e botão "Iniciar Quiz"
2. **Perguntas:** Sequencial por nível (iniciante → intermediário → avançado), sem timer
3. **Feedback:** Após cada resposta errada, exibir explicação educativa. Acertos mostram apenas confirmação visual
4. **Resultado Final:** Score total (ex: 12/15) + classificação por faixa + ranking dos melhores scores

### 2.5 Faixas de Resultado

| Acertos | Faixa | Mensagem |
|---------|-------|----------|
| 0-5 | Iniciante | "Você está começando! Claude Code tem muito a oferecer — explore a documentação." |
| 6-10 | Praticante | "Bom conhecimento! Você já domina o básico e está no caminho certo." |
| 11-13 | Avançado | "Impressionante! Você conhece bem o Claude Code." |
| 14-15 | Expert | "Você é um expert em Claude Code! Poucos chegam aqui." |

## 3. Requisitos Técnicos

### 3.1 Stack

- **React 18** — Biblioteca de UI, componentizado
- **TypeScript** — Tipagem estática em todo o projeto
- **Vite** — Bundler e dev server
- **Tailwind CSS v4** — Estilização utility-first
- **@supabase/supabase-js** — Client oficial para persistência de dados
- **Supabase** — Backend as a Service (PostgreSQL + API REST automática)

### 3.2 Estrutura de Arquivos

```
AppQuiz/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .env                        # VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
├── .env.example                # Template sem valores reais
├── src/
│   ├── main.tsx                # Entry point React
│   ├── App.tsx                 # Componente raiz, controle de telas
│   ├── index.css               # Import do Tailwind + estilos base
│   ├── types/
│   │   └── index.ts            # Tipos globais (Question, QuizSession, QuizAnswer, etc.)
│   ├── data/
│   │   └── questions.ts        # Banco de perguntas (array tipado)
│   ├── lib/
│   │   ├── supabase.ts         # Inicialização do client Supabase
│   │   └── supabase-service.ts # Funções de leitura/escrita no Supabase
│   ├── hooks/
│   │   └── useQuiz.ts          # Custom hook com lógica do quiz (estado, score, navegação)
│   ├── components/
│   │   ├── StartScreen.tsx     # Tela inicial (título, apelido, botão iniciar)
│   │   ├── QuestionCard.tsx    # Card da pergunta + botões V/F
│   │   ├── ProgressBar.tsx     # Barra de progresso
│   │   ├── LevelBadge.tsx      # Indicador de nível atual
│   │   ├── Feedback.tsx        # Feedback de acerto/erro com explicação
│   │   ├── ResultScreen.tsx    # Tela de resultado + scores por nível
│   │   └── Leaderboard.tsx     # Ranking top 10
│   └── utils/
│       └── scoring.ts          # Cálculo de faixa e scores por nível
└── public/
    └── (ícones, favicon, imagens)
```

### 3.3 Tipos TypeScript

```typescript
// src/types/index.ts

type QuestionLevel = 'iniciante' | 'intermediario' | 'avancado';

type ResultTier = 'Iniciante' | 'Praticante' | 'Avançado' | 'Expert';

interface Question {
  id: number;
  level: QuestionLevel;
  statement: string;
  answer: boolean;
  explanation: string;
}

interface UserAnswer {
  questionId: number;
  userAnswer: boolean;
  isCorrect: boolean;
}

interface QuizSession {
  id?: string;
  nickname: string | null;
  total_score: number;
  score_iniciante: number;
  score_intermediario: number;
  score_avancado: number;
  faixa: ResultTier;
  created_at?: string;
}

interface QuizAnswer {
  id?: string;
  session_id: string;
  question_id: number;
  user_answer: boolean;
  is_correct: boolean;
  created_at?: string;
}

interface QuestionAnalytics {
  question_id: number;
  total_respostas: number;
  total_acertos: number;
  taxa_acerto_percent: number;
}
```

### 3.4 Design Visual

- **Paleta:** Baseada na identidade Anthropic
  - Primária: Terracota (#D97757)
  - Fundo: Bege claro (#FAF7F2)
  - Texto: Cinza escuro (#1A1A1A)
  - Acerto: Verde (#4CAF50)
  - Erro: Vermelho (#E53935)
  - Cards: Branco (#FFFFFF) com sombra suave
- **Tipografia:** Inter (via Google Fonts ou Tailwind default)
- **Layout:** Centralizado, `max-w-2xl`, mobile-first
- **Animações:** Transições com classes Tailwind (`transition`, `duration-300`) + CSS custom para fade/slide entre perguntas

### 3.5 Tailwind — Configuração de Cores Customizadas

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        anthropic: {
          terracota: '#D97757',
          'terracota-hover': '#C4684A',
          bege: '#FAF7F2',
          dark: '#1A1A1A',
        },
        quiz: {
          correct: '#4CAF50',
          wrong: '#E53935',
        },
      },
    },
  },
};
```

### 3.6 Estrutura de Dados — Pergunta (local)

As perguntas ficam em `src/data/questions.ts` (não no Supabase), pois são estáticas:

```typescript
// src/data/questions.ts
import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    level: 'iniciante',
    statement: 'Claude Code é uma ferramenta CLI oficial da Anthropic.',
    answer: true,
    explanation: 'Claude Code é a CLI oficial da Anthropic para interagir com Claude diretamente no terminal.',
  },
  // ... demais perguntas
];
```

### 3.7 Supabase — Modelagem de Dados

#### Tabela: `quiz_sessions`
Registro de cada sessão de quiz completa.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` (PK, default `gen_random_uuid()`) | ID único da sessão |
| `nickname` | `text` (nullable) | Apelido do usuário (opcional) |
| `total_score` | `integer` | Total de acertos (0-15) |
| `score_iniciante` | `integer` | Acertos nível iniciante (0-5) |
| `score_intermediario` | `integer` | Acertos nível intermediário (0-5) |
| `score_avancado` | `integer` | Acertos nível avançado (0-5) |
| `faixa` | `text` | Faixa de resultado (Iniciante/Praticante/Avançado/Expert) |
| `created_at` | `timestamptz` (default `now()`) | Data/hora da sessão |

#### Tabela: `quiz_answers`
Registro de cada resposta individual para analytics.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` (PK, default `gen_random_uuid()`) | ID único da resposta |
| `session_id` | `uuid` (FK → `quiz_sessions.id`) | Sessão a que pertence |
| `question_id` | `integer` | ID da pergunta respondida |
| `user_answer` | `boolean` | Resposta dada pelo usuário (true/false) |
| `is_correct` | `boolean` | Se a resposta está correta |
| `created_at` | `timestamptz` (default `now()`) | Data/hora da resposta |

#### View: `question_analytics`
View para analytics de taxa de acerto por pergunta.

```sql
CREATE VIEW question_analytics AS
SELECT
  question_id,
  COUNT(*) AS total_respostas,
  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS total_acertos,
  ROUND(
    (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100, 1
  ) AS taxa_acerto_percent
FROM quiz_answers
GROUP BY question_id
ORDER BY question_id;
```

#### Row Level Security (RLS)

```sql
-- quiz_sessions: qualquer um pode inserir e ler (anon)
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir insert anônimo" ON quiz_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura pública" ON quiz_sessions FOR SELECT USING (true);

-- quiz_answers: qualquer um pode inserir e ler (anon)
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir insert anônimo" ON quiz_answers FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura pública" ON quiz_answers FOR SELECT USING (true);
```

### 3.8 Supabase — Setup do Projeto

Instruções para criar o projeto no Supabase:

1. Acessar [supabase.com](https://supabase.com) e criar conta/projeto
2. Criar as tabelas `quiz_sessions` e `quiz_answers` conforme schema acima (via SQL Editor)
3. Criar a view `question_analytics`
4. Configurar RLS conforme policies acima
5. Copiar a **Project URL** e a **anon public key** (em Settings → API)
6. Criar arquivo `.env` na raiz do projeto:
   ```env
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
   ```

### 3.9 Supabase — Client e Service

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

```typescript
// src/lib/supabase-service.ts — funções principais
saveSession(session: QuizSession): Promise<string>       // retorna session_id
saveAnswers(answers: QuizAnswer[]): Promise<void>        // batch insert
getLeaderboard(): Promise<QuizSession[]>                 // top 10 por total_score DESC
```

### 3.10 Fluxo de Dados

```
[Usuário responde pergunta]
  → Armazena resposta no state local (useQuiz hook)

[Usuário finaliza quiz]
  → saveSession() → retorna session_id
  → saveAnswers() → batch de 15 respostas com session_id
  → getLeaderboard() → top 10 para exibir ranking
```

- **Importante:** Todas as respostas são acumuladas no state do React durante o quiz. O envio ao Supabase acontece **apenas ao final**, em uma única operação. Isso evita requisições desnecessárias e garante funcionamento mesmo com conexão instável.
- **Fallback:** Se o envio ao Supabase falhar, o resultado é exibido normalmente (dados locais). O ranking simplesmente não aparece.

### 3.11 Componentes da UI

1. **StartScreen**
   - Título: "Quiz Claude Code"
   - Subtítulo: "Teste seus conhecimentos sobre a CLI da Anthropic"
   - Input: "Seu apelido (opcional)"
   - Botão: "Iniciar Quiz"

2. **QuestionCard + Feedback**
   - `LevelBadge`: indicador de nível atual (Iniciante / Intermediário / Avançado)
   - `ProgressBar`: barra de progresso (pergunta X de 15)
   - Texto da afirmação
   - Dois botões: "Verdadeiro" e "Falso"
   - `Feedback`: área de feedback (aparece após responder, apenas em erros)
   - Botão "Próxima" (aparece após responder)

3. **ResultScreen + Leaderboard**
   - Score: "X/15 acertos"
   - Faixa de classificação com ícone contextual
   - Mensagem personalizada
   - Score por nível (Iniciante: X/5, Intermediário: X/5, Avançado: X/5)
   - `Leaderboard`: Top 10 melhores scores (apelido + score + faixa)
   - Botão "Refazer Quiz"

### 3.12 Responsividade

- Mobile-first (min 320px)
- Breakpoints Tailwind: `sm` (640px), `md` (768px), `lg` (1024px+)
- Botões com área de toque mínima (`min-h-[44px]`)
- Texto legível sem zoom (`text-base` = 16px)

### 3.13 Acessibilidade

- Semântica HTML5 (`role`, `aria-labels`)
- Navegação por teclado (Tab, Enter, Space)
- Contraste WCAG AA nos textos
- Focus visible nos elementos interativos (`focus-visible:ring`)

### 3.14 Deploy

- **Plataforma:** Vercel
- **Framework preset:** Vite (auto-detectado pela Vercel)
- **Método:** Import do repositório Git ou deploy via CLI (`vercel` / `vercel --prod`)
- **Domínio:** Subdomínio Vercel padrão (*.vercel.app)
- **Variáveis de ambiente na Vercel:**
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### 3.15 Scripts do Projeto

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 4. Banco de Perguntas

O arquivo `src/data/questions.ts` deve conter 15 perguntas distribuídas assim:

### 4.1 Iniciante (5 perguntas)
Temas sugeridos:
- O que é Claude Code (definição)
- Onde ele roda (terminal/CLI)
- Diferença entre Claude Code e Claude.ai
- Casos de uso básicos (editar código, criar commits)
- Plataformas suportadas

### 4.2 Intermediário (5 perguntas)
Temas sugeridos:
- Arquivo CLAUDE.md e seu propósito
- Slash commands (ex: /help, /clear, /review)
- Sistema de permissões (allow/deny)
- Hooks e quando são executados
- MCP servers e o que permitem

### 4.3 Avançado (5 perguntas)
Temas sugeridos:
- Claude Agent SDK
- Modelos disponíveis (Opus, Sonnet, Haiku) e como selecionar
- Subagents e worktrees
- Prompt caching no contexto do Claude Code
- Configurações avançadas (settings.json, keybindings)

## 5. Critérios de Aceite

### 5.1 Quiz Core
- [ ] Tela inicial renderiza com título, subtítulo, campo de apelido e botão "Iniciar"
- [ ] Campo de apelido é opcional — quiz inicia mesmo sem preencher
- [ ] Quiz apresenta 15 perguntas na ordem: 5 iniciante, 5 intermediário, 5 avançado
- [ ] Botões "Verdadeiro" e "Falso" registram a resposta corretamente
- [ ] Feedback com explicação aparece APENAS quando o usuário erra
- [ ] Acertos mostram confirmação visual (cor verde) sem texto de explicação
- [ ] Barra de progresso atualiza a cada pergunta
- [ ] Indicador de nível muda conforme a progressão

### 5.2 Resultado e Ranking
- [ ] Tela de resultado mostra score total, score por nível e faixa de classificação
- [ ] Ranking exibe top 10 scores carregados do Supabase
- [ ] Usuários sem apelido aparecem como "Anônimo" no ranking
- [ ] Botão "Refazer Quiz" reinicia o quiz do zero

### 5.3 Supabase
- [ ] Sessão é salva na tabela `quiz_sessions` ao finalizar o quiz
- [ ] As 15 respostas são salvas na tabela `quiz_answers` com `session_id` correto
- [ ] View `question_analytics` retorna taxa de acerto por pergunta
- [ ] RLS configurado: insert e select públicos, sem update/delete anônimo
- [ ] Quiz funciona normalmente mesmo se Supabase estiver fora do ar (fallback gracioso)

### 5.4 Qualidade Técnica
- [ ] Zero erros de TypeScript (`tsc --noEmit` passa limpo)
- [ ] Todos os componentes e funções tipados (sem `any`)
- [ ] `npm run build` compila sem erros
- [ ] Layout responsivo funciona em mobile (320px+), tablet e desktop
- [ ] Navegação por teclado funciona (Tab, Enter, Space)
- [ ] Deploy funcional na Vercel com variáveis de ambiente configuradas
