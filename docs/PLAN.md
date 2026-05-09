# Plano de Desenvolvimento — Quiz Claude Code

## Status
- Iniciado em: 2026-05-08
- Última etapa concluída: Fase 0 — Supabase Setup completo e conexão verificada (2026-05-09)
- Erros encontrados: nenhum

---

## Fase 0 — Supabase Setup

- [x] Acessar supabase.com e criar projeto
- [x] Executar SQL no SQL Editor:
  - [x] Criar tabela `quiz_sessions`
  - [x] Criar tabela `quiz_answers`
  - [x] Criar view `question_analytics`
  - [x] Configurar RLS (insert + select anônimo em ambas as tabelas)
  - [x] Criar índices de performance
- [x] Copiar Project URL e anon public key (Settings → API)
- [x] Verificar: rodar SELECT nas tabelas e testar insert de linha dummy

---

## Fase 1 — Project Scaffold

- [x] Criar `package.json` com scripts dev/build/preview/typecheck e dependências
- [x] Criar `tsconfig.json` (strict, noEmit, jsx: react-jsx)
- [x] Criar `tsconfig.node.json`
- [x] Criar `vite.config.ts` com plugin React
- [x] Criar `postcss.config.js` com `@tailwindcss/postcss` (v4)
- [x] Criar `tailwind.config.ts` com tokens de cor anthropic/quiz
- [x] Criar `index.html` (lang pt-BR, Inter font, favicon)
- [x] Criar `.env.example`
- [x] Criar `.env` com credenciais Supabase reais (não commitar)
- [x] Criar `src/index.css` com `@import "tailwindcss"` e animações fade/slide
- [x] Criar `src/main.tsx` (entry point React com StrictMode)
- [x] Criar `src/App.tsx` stub (renderiza título para testar Tailwind)
- [x] Executar `npm install`
- [x] Verificar: `npm run typecheck` → zero erros

---

## Fase 2 — Types, Data e Utilities

- [x] Criar `src/types/index.ts`
  - [x] `QuestionLevel`, `ResultTier`, `AppScreen`
  - [x] `Question`, `UserAnswer`, `QuizSession`, `QuizAnswer`, `QuestionAnalytics`
- [x] Criar `src/data/questions.ts` com 15 perguntas:
  - [x] Perguntas Iniciante (ids 1–5)
  - [x] Perguntas Intermediário (ids 6–10)
  - [x] Perguntas Avançado (ids 11–15)
- [x] Criar `src/utils/scoring.ts`
  - [x] `getTier(totalScore)` → ResultTier
  - [x] `getTierMessage(tier)` → string
  - [x] `getTierEmoji(tier)` → string
  - [x] `scoreByLevel(answers, level)` → number
- [x] Verificar: `npm run typecheck` → zero erros

---

## Fase 3 — Supabase Library

- [x] Criar `src/lib/supabase.ts` (createClient com env vars; warn se ausentes)
- [x] Criar `src/lib/supabase-service.ts`
  - [x] `saveSession()` → retorna session_id via `.single()`
  - [x] `saveAnswers()` → batch insert das 15 respostas
  - [x] `getLeaderboard()` → top 10 por total_score DESC, created_at ASC
- [x] Verificar: `npm run typecheck` → zero erros

---

## Fase 4 — Hook `useQuiz`

- [x] Criar `src/hooks/useQuiz.ts`
  - [x] Estado inicial (`INITIAL_STATE`)
  - [x] `startQuiz(nickname)` → screen: quiz
  - [x] `submitAnswer(userAnswer)` com guard de double-click
  - [x] `nextQuestion()` → avança ou muda para screen: result + isLoadingResult: true
  - [x] `finishQuiz(answers, nickname)` async com try/catch e fallback
  - [x] `resetQuiz()` → volta ao INITIAL_STATE
- [x] Verificar: `npm run typecheck` → zero erros

---

## Fase 5 — Componentes UI

- [x] Criar `src/components/LevelBadge.tsx`
  - [x] Cores por nível: green/yellow/red
  - [x] aria-label descritivo
- [x] Criar `src/components/ProgressBar.tsx`
  - [x] `role="progressbar"` com aria-valuenow/min/max
  - [x] Barra animada com transition-all
- [x] Criar `src/components/Feedback.tsx`
  - [x] `role="alert"` + `aria-live="polite"`
  - [x] Acerto: confirmação verde simples
  - [x] Erro: vermelho com explanation completa
- [x] Criar `src/components/QuestionCard.tsx`
  - [x] Compõe LevelBadge + ProgressBar + Feedback
  - [x] Botões V/F ocultos após resposta
  - [x] `autoFocus` no botão "Próxima" após resposta
  - [x] Botão mostra "Próxima →" ou "Ver Resultado" na última pergunta
- [x] Criar `src/components/StartScreen.tsx`
  - [x] Input nickname (optional, maxLength=30)
  - [x] Submit via form (Enter funciona)
- [x] Criar `src/components/Leaderboard.tsx`
  - [x] Destaque visual na entrada do usuário atual
  - [x] Fallback para erro Supabase
  - [x] Fallback para lista vazia
  - [x] Medalhas de posição (ouro/prata/bronze)
- [x] Criar `src/components/ResultScreen.tsx`
  - [x] Score total + emoji + tier message
  - [x] Breakdown por nível (3 cards)
  - [x] Spinner enquanto `isLoading`
  - [x] Leaderboard
  - [x] Botão "Refazer Quiz"
- [x] Verificar: `npm run typecheck` → zero erros

---

## Fase 6 — App.tsx Final

- [x] Substituir stub por App.tsx completo
  - [x] `useEffect` para chamar `finishQuiz` quando `screen === 'result' && isLoadingResult`
  - [x] Roteamento entre start / quiz / result / loading spinner
- [ ] Testar flow completo no browser (requer `npm run dev`)
- [x] Verificar: `npm run typecheck` → zero erros; `npm run build` → sem erros

---

## Fase 7 — Assets, Acessibilidade e Polish

- [x] Criar `public/favicon.svg` (SVG terracota com ícone ⚡)
- [ ] Verificar keyboard navigation completo:
  - [ ] StartScreen: Tab → input → Tab → botão → Enter
  - [ ] QuestionCard: Tab → Verdadeiro → Tab → Falso → Enter → autoFocus Próxima → Enter
  - [ ] ResultScreen: Tab até Leaderboard e Refazer
- [ ] Verificar responsividade mobile (375px DevTools):
  - [ ] Botões com min-h-[52px]
  - [ ] Texto legível sem zoom
- [ ] Simular falha Supabase (URL inválida no .env): resultado exibe, leaderboard mostra erro gracioso

---

## Fase 8 — Deploy Vercel

- [ ] Push do repositório para GitHub
- [ ] Criar projeto na Vercel → Import from Git
- [ ] Verificar preset Vite auto-detectado
- [ ] Configurar variáveis de ambiente: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- [ ] Deploy e testar URL pública
- [ ] Completar quiz duas vezes com nicks diferentes e verificar leaderboard
