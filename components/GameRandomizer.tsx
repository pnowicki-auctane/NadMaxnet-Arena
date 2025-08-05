import React, { useState, useEffect, useCallback } from 'react';
import { Game } from '../types';
import Section from './Section';
import ShuffleIcon from './icons/ShuffleIcon';

interface GameRandomizerProps {
  games: Game[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GameRandomizer: React.FC<GameRandomizerProps> = ({ games }) => {
  const [randomizedGames, setRandomizedGames] = useState<Game[]>([]);

  const randomize = useCallback(() => {
    setRandomizedGames(shuffleArray(games));
  }, [games]);

  useEffect(() => {
    if (games.length > 0) {
      randomize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]); // Run only when games array is populated

  return (
    <Section id="losowanie" title="Co gramy dalej?" subtitle="Oto wylosowana kolejność na dzisiejszy wieczór!">
      <ul className="space-y-3 max-w-md mx-auto mb-8">
        {randomizedGames.map((game, index) => (
          <li
            key={game.id}
            className="bg-[#2A2A2A] rounded-md p-4 flex items-center gap-4 text-left border-l-4 border-l-[#66FF00] shadow-lg"
          >
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#66FF00] to-[#32CD32] w-8">{index + 1}.</span>
            <span className="text-lg text-white">{game.name}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={randomize}
        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00] bg-[length:200%_auto] hover:bg-[right_center] text-white font-bold rounded-lg transition-all duration-500 transform hover:scale-105 shadow-lg shadow-[#66FF00]/20"
      >
        <ShuffleIcon />
        Wylosuj ponownie
      </button>
    </Section>
  );
};

export default GameRandomizer;