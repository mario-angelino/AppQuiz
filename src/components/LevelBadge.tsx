import type { QuestionLevel } from '../types';

interface LevelBadgeProps {
  level: QuestionLevel;
}

const levelLabels: Record<QuestionLevel, string> = {
  iniciante:     'Iniciante',
  intermediario: 'Intermediário',
  avancado:      'Avançado',
};

const levelColors: Record<QuestionLevel, string> = {
  iniciante:     'bg-green-100 text-green-800',
  intermediario: 'bg-yellow-100 text-yellow-800',
  avancado:      'bg-red-100 text-red-800',
};

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${levelColors[level]}`}
      aria-label={`Nível: ${levelLabels[level]}`}
    >
      {levelLabels[level]}
    </span>
  );
}
