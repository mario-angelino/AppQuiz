import type { QuizSession } from '../types';

interface LeaderboardProps {
  entries: QuizSession[];
  currentSessionId: string | undefined;
  hasError: boolean;
}

export function Leaderboard({ entries, currentSessionId, hasError }: LeaderboardProps) {
  if (hasError) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Ranking temporariamente indisponível. Seu score foi registrado.
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
        <p className="text-gray-500 text-sm">Nenhuma entrada no ranking ainda.</p>
      </div>
    );
  }

  return (
    <section className="mt-8" aria-label="Ranking top 10">
      <h2 className="text-xl font-bold text-anthropic-dark mb-4">
        🏅 Top 10 — Melhores Scores
      </h2>
      <ol className="space-y-2">
        {entries.map((entry, index) => {
          const isCurrentUser = entry.id === currentSessionId;
          const medalColor =
            index === 0 ? 'bg-yellow-400 text-yellow-900' :
            index === 1 ? 'bg-gray-300 text-gray-700' :
            index === 2 ? 'bg-orange-300 text-orange-900' :
            'bg-gray-100 text-gray-600';

          return (
            <li
              key={entry.id ?? index}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors
                ${isCurrentUser
                  ? 'bg-orange-50 border-anthropic-terracota font-semibold'
                  : 'bg-white border-gray-100'
                }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${medalColor}`}
                  aria-label={`Posição ${index + 1}`}
                >
                  {index + 1}
                </span>
                <div>
                  <span className="text-anthropic-dark text-sm">
                    {entry.nickname ?? 'Anônimo'}
                  </span>
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-anthropic-terracota font-medium">
                      (você)
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-anthropic-dark">{entry.total_score}/15</span>
                <span className="ml-2 text-xs text-gray-500">{entry.faixa}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
