import type { ResultTier, UserAnswer, QuestionLevel } from '../types';

export function getTier(totalScore: number): ResultTier {
  if (totalScore <= 5)  return 'Iniciante';
  if (totalScore <= 10) return 'Praticante';
  if (totalScore <= 13) return 'Avançado';
  return 'Expert';
}

export function getTierMessage(tier: ResultTier): string {
  const messages: Record<ResultTier, string> = {
    Iniciante:  'Você está começando! Claude Code tem muito a oferecer — explore a documentação.',
    Praticante: 'Bom conhecimento! Você já domina o básico e está no caminho certo.',
    Avançado:   'Impressionante! Você conhece bem o Claude Code.',
    Expert:     'Você é um expert em Claude Code! Poucos chegam aqui.',
  };
  return messages[tier];
}

export function getTierEmoji(tier: ResultTier): string {
  const emojis: Record<ResultTier, string> = {
    Iniciante:  '🌱',
    Praticante: '⚡',
    Avançado:   '🚀',
    Expert:     '🏆',
  };
  return emojis[tier];
}

export function scoreByLevel(answers: UserAnswer[], level: QuestionLevel): number {
  const levelMap: Record<QuestionLevel, [number, number]> = {
    iniciante:     [1, 5],
    intermediario: [6, 10],
    avancado:      [11, 15],
  };
  const [min, max] = levelMap[level];
  return answers.filter(
    (a) => a.questionId >= min && a.questionId <= max && a.isCorrect
  ).length;
}
