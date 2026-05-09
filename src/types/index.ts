export type QuestionLevel = 'iniciante' | 'intermediario' | 'avancado';

export type ResultTier = 'Iniciante' | 'Praticante' | 'Avançado' | 'Expert';

export type AppScreen = 'start' | 'quiz' | 'result';

export interface Question {
  id: number;
  level: QuestionLevel;
  statement: string;
  answer: boolean;
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  userAnswer: boolean;
  isCorrect: boolean;
}

export interface QuizSession {
  id?: string;
  nickname: string | null;
  total_score: number;
  score_iniciante: number;
  score_intermediario: number;
  score_avancado: number;
  faixa: ResultTier;
  created_at?: string;
}

export interface QuizAnswer {
  id?: string;
  session_id: string;
  question_id: number;
  user_answer: boolean;
  is_correct: boolean;
  created_at?: string;
}

export interface QuestionAnalytics {
  question_id: number;
  total_respostas: number;
  total_acertos: number;
  taxa_acerto_percent: number;
}
