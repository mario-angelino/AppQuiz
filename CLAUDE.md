# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Quiz Verdadeiro ou Falso: Claude Code** — A gamified true/false quiz that educates users about Claude Code across three difficulty levels, with scoring and a public leaderboard.

**Status:** Specification complete (`prd.md`), implementation not yet started.

## Tech Stack

- **React 18 + TypeScript** — component framework
- **Vite** — bundler and dev server
- **Tailwind CSS v4** — styling with custom terracota (`#D97757`) theme
- **Supabase** — PostgreSQL backend (anonymous insert/select via RLS)
- **Vercel** — deployment target

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc && vite build
npm run preview   # preview production build locally
```

## Architecture

### State & Data Flow

All quiz state lives in `src/hooks/useQuiz.ts`. During the quiz, answers accumulate in React local state. On completion, a single batch write goes to Supabase — the leaderboard is fetched once at the result screen. If Supabase fails, results still display (graceful degradation).

```
App
├── StartScreen          (nickname input → start)
├── QuestionCard         (question display)
│   ├── ProgressBar
│   ├── LevelBadge
│   └── Feedback         (per-answer result)
└── ResultScreen
    └── Leaderboard      (top 10 by score DESC)
```

### Database Schema

**`quiz_sessions`** — one row per completed quiz
- `id` (UUID), `nickname` (nullable), `total_score` (0–15), `score_iniciante/intermediario/avancado` (0–5 each), `faixa` (text tier), `created_at`

**`quiz_answers`** — one row per answered question
- `id` (UUID), `session_id` (FK), `question_id` (int), `user_answer` (bool), `is_correct` (bool), `created_at`

**`question_analytics`** (view) — success rate per question

RLS: anonymous insert + select on both tables.

#### Documentação do Database
Sempre salve os scripts SQL necessários em `docs/DATABASE.md` no projeto, com:
- Etapas numeradas com título (TABELAS, VIEWS, RLS, etc)
- Subetapas indentadas quando necessário


### Service Layer (`src/lib/supabase-service.ts`)

```typescript
saveSession(session: QuizSession): Promise<string>   // returns session ID
saveAnswers(answers: QuizAnswer[]): Promise<void>
getLeaderboard(): Promise<QuizSession[]>             // top 10
```

### Quiz Content (`src/data/questions.ts`)

15 static true/false questions: 5 Iniciante, 5 Intermediário, 5 Avançado. See `prd.md` for the exact topics per level.

### Scoring Tiers

| Score | Tier |
|-------|------|
| 0–5   | Iniciante |
| 6–10  | Praticante |
| 11–13 | Avançado |
| 14–15 | Expert |

## Environment Variables

```env
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-public-key]
```

Vite exposes these via `import.meta.env.VITE_*`. Set them in the Vercel dashboard for production.

## Design Tokens

- Background: `#FAF7F2` (beige)
- Primary/CTA: `#D97757` (terracota), hover `#C4684A`
- Success: `#4CAF50`, Error: `#E53935`
- Font: Inter
- Transitions: 300ms, mobile-first, min-width 320px

## Planejamento e Execução

### Ao criar um plano (`/plan`)
Sempre salve o plano completo em `docs/PLAN.md` no projeto, com:
- Fases numeradas com título
- Cada etapa como checkbox `- [ ] descrição`
- Subetapas indentadas quando necessário
- Seção `## Status` no topo com data de início

Formato obrigatório:
```markdown
## Status
- Iniciado em: YYYY-MM-DD
- Última etapa concluída: —
- Erros encontrados: nenhum

## Fase 1 — Nome da Fase
- [ ] Etapa 1
  - [ ] Subetapa 1.1
  - [ ] Subetapa 1.2
- [ ] Etapa 2

## Fase 2 — Nome da Fase
- [ ] Etapa 3
```

### Durante a execução
- Antes de iniciar cada etapa, marque `- [~]` (em progresso)
- Ao concluir, marque `- [x]`
- Se falhar, marque `- [!]` e registre o erro na seção Status
- Sempre releia `docs/PLAN.md` no início de cada sessão

### Para retomar após interrupção
Ao receber "continue" ou "retome o plano":
1. Leia `docs/PLAN.md`
2. Encontre a primeira etapa sem `[x]`
3. Continue a partir dela sem repetir o que já foi feito