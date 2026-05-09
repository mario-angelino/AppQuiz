import { useEffect } from 'react';
import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const {
    screen,
    nickname,
    currentQuestion,
    currentIndex,
    totalQuestions,
    hasAnswered,
    lastAnswer,
    answers,
    session,
    leaderboard,
    isLoadingResult,
    leaderboardError,
    startQuiz,
    submitAnswer,
    nextQuestion,
    finishQuiz,
    resetQuiz,
  } = useQuiz();

  useEffect(() => {
    if (screen === 'result' && isLoadingResult) {
      void finishQuiz(answers, nickname);
    }
    // finishQuiz é estável (useCallback sem deps), answers e nickname mudam apenas ao resetar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, isLoadingResult]);

  if (screen === 'start') {
    return <StartScreen onStart={startQuiz} />;
  }

  if (screen === 'quiz' && currentQuestion !== undefined) {
    return (
      <main className="min-h-screen bg-anthropic-bege flex items-start justify-center pt-8 pb-16">
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          hasAnswered={hasAnswered}
          lastAnswer={lastAnswer}
          onAnswer={submitAnswer}
          onNext={nextQuestion}
        />
      </main>
    );
  }

  if (screen === 'result' && session !== null) {
    return (
      <ResultScreen
        session={session}
        leaderboard={leaderboard}
        isLoading={isLoadingResult}
        hasLeaderboardError={leaderboardError}
        onReset={resetQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-anthropic-bege flex items-center justify-center">
      <div
        className="w-10 h-10 border-4 border-anthropic-terracota border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Carregando"
      />
      <p>Oxente!!!</p>
    </div>
  );
}
