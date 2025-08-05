import React, { useState, useCallback } from 'react';
import { Game } from '../types';
import Section from './Section';
import ThumbsUpIcon from './icons/ThumbsUpIcon';
import ThumbsDownIcon from './icons/ThumbsDownIcon';

interface GameVotingProps {
  games: Game[];
  onVote: (gameId: string, voteType: 'up' | 'down') => void;
}

const GameVoteCard: React.FC<{ game: Game; onVote: (gameId: string, voteType: 'up' | 'down') => void }> = ({ game, onVote }) => {
  const [voted, setVoted] = useState(false);

  const handleVoteClick = useCallback((voteType: 'up' | 'down') => {
    if (!voted) {
      onVote(game.id, voteType);
      setVoted(true);
    }
  }, [voted, onVote, game.id]);

  const totalVotes = game.upvotes + game.downvotes;
  const upvotePercentage = totalVotes > 0 ? (game.upvotes / totalVotes) * 100 : 50;

  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-[#32CD32]/20 hover:border-[#66FF00]/50 hover:shadow-[0_0_15px_rgba(102,255,0,0.3)] transition-all duration-300">
      <img src={game.imageUrl} alt={game.name} className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-md" />
      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-bold text-lg text-white">{game.name}</h3>
        {/* Progress bar for votes */}
        <div className="w-full bg-[#1A1A1A] rounded-full h-2.5 my-2">
            <div className="bg-gradient-to-r from-[#32CD32] to-[#66FF00] h-2.5 rounded-full" style={{ width: `${upvotePercentage}%` }}></div>
        </div>
        <div className="flex justify-between text-xs text-[#F0F0F0]/70">
            <span>{game.upvotes} Głosów na TAK</span>
            <span>{game.downvotes} Głosów na NIE</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleVoteClick('up')}
          disabled={voted}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${voted ? 'bg-[#3A3A3A] text-gray-500 cursor-not-allowed' : 'bg-gradient-to-br from-[#32CD32] to-[#66FF00] hover:brightness-125 text-white'}`}
          aria-label="Głosuj na tak"
        >
          <ThumbsUpIcon />
        </button>
        <button
          onClick={() => handleVoteClick('down')}
          disabled={voted}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${voted ? 'bg-[#3A3A3A] text-gray-500 cursor-not-allowed' : 'bg-gradient-to-br from-[#FF8C00] to-[#FFA500] hover:brightness-125 text-white'}`}
          aria-label="Głosuj na nie"
        >
          <ThumbsDownIcon />
        </button>
      </div>
    </div>
  );
};

const GameVoting: React.FC<GameVotingProps> = ({ games, onVote }) => {
  return (
    <Section id="glosowanie" title="Zagłosuj na swoją ulubioną grę!" subtitle="Twój głos ma znaczenie dla kolejności grania!">
      <div className="space-y-4 max-w-3xl mx-auto">
        {games.map((game) => (
          <GameVoteCard key={game.id} game={game} onVote={onVote} />
        ))}
      </div>
    </Section>
  );
};

export default GameVoting;