import { useState, useCallback } from 'react';
import { questions } from '../data/questions';
import { getTier, scoreByLevel } from '../utils/scoring';
import { saveSession, saveAnswers, getLeaderboard } from '../lib/supabase-service';
import type { UserAnswer, QuizSession, AppScreen } from '../types';

interface QuizState {
  screen: AppScreen;
  nickname: string;
  currentIndex: number;
  answers: UserAnswer[];
  hasAnswered: boolean;
  leaderboard: QuizSession[];
  isLoadingResult: boolean;
  leaderboardError: boolean;
  session: QuizSession | null;
}

const INITIAL_STATE: QuizState = {
  screen: 'start',
  nickname: '',
  currentIndex: 0,
  answers: [],
  hasAnswered: false,
  leaderboard: [],
  isLoadingResult: false,
  leaderboardError: false,
  session: null,
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL_STATE);

  const startQuiz = useCallback((nickname: string) => {
    setState({ ...INITIAL_STATE, screen: 'quiz', nickname });
  }, []);

  const submitAnswer = useCallback((userAnswer: boolean) => {
    setState((prev) => {
      if (prev.hasAnswered) return prev;

      const currentQuestion = questions[prev.currentIndex];
      const isCorrect = userAnswer === currentQuestion.answer;

      return {
        ...prev,
        hasAnswered: true,
        answers: [
          ...prev.answers,
          { questionId: currentQuestion.id, userAnswer, isCorrect },
        ],
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= questions.length) {
        return { ...prev, screen: 'result', isLoadingResult: true };
      }
      return { ...prev, currentIndex: nextIndex, hasAnswered: false };
    });
  }, []);

  const finishQuiz = useCallback(async (answers: UserAnswer[], nickname: string) => {
    const totalScore = answers.filter((a) => a.isCorrect).length;
    const faixa = getTier(totalScore);
    const sessionPayload: Omit<QuizSession, 'id' | 'created_at'> = {
      nickname: nickname.trim() || null,
      total_score: totalScore,
      score_iniciante: scoreByLevel(answers, 'iniciante'),
      score_intermediario: scoreByLevel(answers, 'intermediario'),
      score_avancado: scoreByLevel(answers, 'avancado'),
      faixa,
    };

    try {
      const sessionId = await saveSession(sessionPayload);
      await saveAnswers(
        answers.map((a) => ({
          session_id: sessionId,
          question_id: a.questionId,
          user_answer: a.userAnswer,
          is_correct: a.isCorrect,
        }))
      );
      const leaderboard = await getLeaderboard();
      setState((prev) => ({
        ...prev,
        session: { ...sessionPayload, id: sessionId },
        leaderboard,
        isLoadingResult: false,
        leaderboardError: false,
      }));
    } catch (_err) {
      setState((prev) => ({
        ...prev,
        session: sessionPayload,
        leaderboard: [],
        isLoadingResult: false,
        leaderboardError: true,
      }));
    }
  }, []);

  const resetQuiz = useCallback(() => setState(INITIAL_STATE), []);

  return {
    screen: state.screen,
    nickname: state.nickname,
    currentQuestion: questions[state.currentIndex],
    currentIndex: state.currentIndex,
    totalQuestions: questions.length,
    hasAnswered: state.hasAnswered,
    lastAnswer: state.answers[state.answers.length - 1] ?? null,
    answers: state.answers,
    session: state.session,
    leaderboard: state.leaderboard,
    isLoadingResult: state.isLoadingResult,
    leaderboardError: state.leaderboardError,
    startQuiz,
    submitAnswer,
    nextQuestion,
    finishQuiz,
    resetQuiz,
  };
}
