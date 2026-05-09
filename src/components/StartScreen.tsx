import { useState, type FormEvent } from 'react';

interface StartScreenProps {
  onStart: (nickname: string) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [nickname, setNickname] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onStart(nickname);
  }

  return (
    <div className="min-h-screen bg-anthropic-bege flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center animate-fade-in">
        <div className="mb-8">
          <div
            className="w-20 h-20 rounded-2xl bg-anthropic-terracota flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <span className="text-white text-4xl">⚡</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-anthropic-dark">
            Quiz Claude Code
          </h1>
          <p className="mt-3 text-gray-600 text-base leading-relaxed">
            Teste seus conhecimentos sobre a CLI da Anthropic.<br />
            15 perguntas · 3 níveis · Verdadeiro ou Falso
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Seu apelido{' '}
              <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ex: devmaster"
              maxLength={30}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base
                         focus:outline-none focus:ring-2 focus:ring-anthropic-terracota focus:border-transparent
                         placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] rounded-xl bg-anthropic-terracota text-white font-semibold text-lg
                       hover:bg-anthropic-terracota-hover transition-colors duration-200
                       focus-visible:ring-2 focus-visible:ring-anthropic-terracota focus-visible:ring-offset-2"
          >
            Iniciar Quiz
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Sem cadastro necessário · Aparece como "Anônimo" no ranking se não preenchido
        </p>
      </div>
    </div>
  );
}
