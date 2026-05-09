interface FeedbackProps {
  isCorrect: boolean;
  explanation: string;
}

export function Feedback({ isCorrect, explanation }: FeedbackProps) {
  if (isCorrect) {
    return (
      <div
        className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in"
        role="alert"
        aria-live="polite"
      >
        <span className="text-quiz-correct text-xl" aria-hidden="true">✓</span>
        <span className="text-green-800 font-medium">Correto!</span>
      </div>
    );
  }

  return (
    <div
      className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-quiz-wrong text-xl" aria-hidden="true">✗</span>
        <span className="text-red-800 font-medium">Incorreto</span>
      </div>
      <p className="text-red-700 text-sm leading-relaxed">{explanation}</p>
    </div>
  );
}
