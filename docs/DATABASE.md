# DATABASE.md — Quiz Claude Code

Scripts SQL para execução no **SQL Editor** do Supabase, na ordem abaixo.

---

## 1. TABELAS

### 1.1 Criar `quiz_sessions`

```sql
CREATE TABLE quiz_sessions (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname             text,
  total_score          integer     NOT NULL CHECK (total_score BETWEEN 0 AND 15),
  score_iniciante      integer     NOT NULL CHECK (score_iniciante BETWEEN 0 AND 5),
  score_intermediario  integer     NOT NULL CHECK (score_intermediario BETWEEN 0 AND 5),
  score_avancado       integer     NOT NULL CHECK (score_avancado BETWEEN 0 AND 5),
  faixa                text        NOT NULL CHECK (faixa IN ('Iniciante', 'Praticante', 'Avançado', 'Expert')),
  created_at           timestamptz NOT NULL DEFAULT now()
);
```

### 1.2 Criar `quiz_answers`

```sql
CREATE TABLE quiz_answers (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  uuid        NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id integer     NOT NULL CHECK (question_id BETWEEN 1 AND 15),
  user_answer boolean     NOT NULL,
  is_correct  boolean     NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

---

## 2. ÍNDICES

```sql
-- Leaderboard: top 10 por score desc, desempate por data asc
CREATE INDEX idx_quiz_sessions_leaderboard
  ON quiz_sessions (total_score DESC, created_at ASC);

-- Analytics: filtro por question_id
CREATE INDEX idx_quiz_answers_question_id
  ON quiz_answers (question_id);

-- Junção answers ↔ sessions
CREATE INDEX idx_quiz_answers_session_id
  ON quiz_answers (session_id);
```

---

## 3. VIEWS

### 3.1 Criar `question_analytics`

```sql
CREATE VIEW question_analytics AS
SELECT
  question_id,
  COUNT(*)                                                                      AS total_respostas,
  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)                                   AS total_acertos,
  ROUND(
    (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100, 1
  )                                                                              AS taxa_acerto_percent
FROM quiz_answers
GROUP BY question_id
ORDER BY question_id;
```

---

## 4. RLS (Row Level Security)

### 4.1 Habilitar RLS nas tabelas

```sql
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers  ENABLE ROW LEVEL SECURITY;
```

### 4.2 Policies para `quiz_sessions`

```sql
CREATE POLICY "Permitir insert anônimo"
  ON quiz_sessions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura pública"
  ON quiz_sessions
  FOR SELECT
  USING (true);
```

### 4.3 Policies para `quiz_answers`

```sql
CREATE POLICY "Permitir insert anônimo"
  ON quiz_answers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura pública"
  ON quiz_answers
  FOR SELECT
  USING (true);
```

---

## 5. VERIFICAÇÃO

Rode os selects abaixo para confirmar que tudo foi criado corretamente:

```sql
-- Listar tabelas criadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('quiz_sessions', 'quiz_answers');

-- Listar view criada
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name = 'question_analytics';

-- Listar policies ativas
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('quiz_sessions', 'quiz_answers')
ORDER BY tablename, policyname;

-- Inserir sessão de teste e verificar FK/RLS
INSERT INTO quiz_sessions
  (nickname, total_score, score_iniciante, score_intermediario, score_avancado, faixa)
VALUES
  ('teste-rls', 10, 4, 3, 3, 'Praticante')
RETURNING id;

-- Após capturar o id retornado, testar insert em quiz_answers:
-- INSERT INTO quiz_answers (session_id, question_id, user_answer, is_correct)
-- VALUES ('<id-retornado>', 1, true, true);

-- Limpar dados de teste
DELETE FROM quiz_sessions WHERE nickname = 'teste-rls';
```
