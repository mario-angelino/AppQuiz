import { Leaderboard } from './Leaderboard';
import { getTierMessage, getTierEmoji } from '../utils/scoring';
import type { QuizSession } from '../types';

interface ResultScreenProps {
  session: QuizSession;
  leaderboard: QuizSession[];
  isLoading: boolean;
  hasLeaderboardError: boolean;
  onReset: () => void;
}

export function ResultScreen({
  session,
  leaderboard,
  isLoading,
  hasLeaderboardError,
  onReset,
}: ResultScreenProps) {
  const tierEmoji = getTierEmoji(session.faixa);
  const tierMessage = getTierMessage(session.faixa);

  const breakdown = [
    { label: 'Iniciante',     score: session.score_iniciante },
    { label: 'Intermediário', score: session.score_intermediario },
    { label: 'Avançado',      score: session.score_avancado },
  ] as const;

  return (
    <div className="min-h-screen bg-anthropic-bege px-4 py-8">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-6xl mb-3" aria-hidden="true">{tierEmoji}</div>
          <h1 className="text-3xl font-bold text-anthropic-dark">
            {session.total_score}/15 acertos
          </h1>
          <p className="mt-2 text-lg font-semibold text-anthropic-terracota">
            {session.faixa}
          </p>
          <p className="mt-3 text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            {tierMessage}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {breakdown.map(({ label, score }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-100 p-4 text-center"
            >
              <p className="text-2xl font-bold text-anthropic-dark">{score}/5</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="mt-8 text-center py-8">
            <div
              className="inline-block w-8 h-8 border-4 border-anthropic-terracota border-t-transparent rounded-full animate-spin"
              role="status"
              aria-label="Carregando ranking"
            />
            <p className="mt-3 text-gray-500 text-sm">
              Salvando resultado e carregando ranking...
            </p>
          </div>
        ) : (
          <Leaderboard
            entries={leaderboard}
            currentSessionId={session.id}
            hasError={hasLeaderboardError}
          />
        )}

        <button
          onClick={onReset}
          className="mt-8 w-full min-h-[52px] rounded-xl bg-anthropic-terracota text-white font-semibold text-base
                     hover:bg-anthropic-terracota-hover transition-colors duration-200
                     focus-visible:ring-2 focus-visible:ring-anthropic-terracota focus-visible:ring-offset-2"
        >
          Refazer Quiz
        </button>
      </div>
    </div>
  );
}
