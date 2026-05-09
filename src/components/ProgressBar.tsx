interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const displayNumber = current + 1;
  const percentage = (displayNumber / total) * 100;

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={displayNumber}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Pergunta {displayNumber} de {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-anthropic-terracota h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
