import { LevelBadge } from './LevelBadge';
import { ProgressBar } from './ProgressBar';
import { Feedback } from './Feedback';
import type { Question, UserAnswer } from '../types';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
  lastAnswer: UserAnswer | null;
  onAnswer: (answer: boolean) => void;
  onNext: () => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  hasAnswered,
  lastAnswer,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const isLastQuestion = currentIndex + 1 >= totalQuestions;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <LevelBadge level={question.level} />
      </div>

      <ProgressBar current={currentIndex} total={totalQuestions} />

      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-lg font-medium text-anthropic-dark leading-relaxed">
          {question.statement}
        </p>
      </div>

      {!hasAnswered && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => onAnswer(true)}
            className="min-h-[52px] rounded-xl border-2 border-anthropic-terracota text-anthropic-terracota font-semibold text-base
                       hover:bg-anthropic-terracota hover:text-white transition-colors duration-200
                       focus-visible:ring-2 focus-visible:ring-anthropic-terracota focus-visible:ring-offset-2"
          >
            Verdadeiro
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="min-h-[52px] rounded-xl border-2 border-anthropic-terracota text-anthropic-terracota font-semibold text-base
                       hover:bg-anthropic-terracota hover:text-white transition-colors duration-200
                       focus-visible:ring-2 focus-visible:ring-anthropic-terracota focus-visible:ring-offset-2"
          >
            Falso
          </button>
        </div>
      )}

      {hasAnswered && lastAnswer !== null && (
        <div className="mt-6 space-y-4">
          <Feedback
            isCorrect={lastAnswer.isCorrect}
            explanation={question.explanation}
          />
          <button
            onClick={onNext}
            autoFocus
            className="w-full min-h-[52px] rounded-xl bg-anthropic-terracota text-white font-semibold text-base
                       hover:bg-anthropic-terracota-hover transition-colors duration-200
                       focus-visible:ring-2 focus-visible:ring-anthropic-terracota focus-visible:ring-offset-2"
          >
            {isLastQuestion ? 'Ver Resultado' : 'Próxima →'}
          </button>
        </div>
      )}
    </div>
  );
}
