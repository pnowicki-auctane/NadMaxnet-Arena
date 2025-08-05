import React from 'react';
import { Game } from '../types';
import Section from './Section';
import DownloadIcon from './icons/DownloadIcon';

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const cardContent = (
    <div className="relative bg-[#2A2A2A] rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 shadow-lg group hover:shadow-[0_0_20px_rgba(102,255,0,0.5)] h-full">
      <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-[#FFA500] to-[#66FF00] transition-colors">{game.name}</h3>
        <p className="text-[#F0F0F0]/70 mt-2 text-sm">{game.description}</p>
      </div>
      {game.downloadUrl && (
        <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DownloadIcon />
        </div>
      )}
    </div>
  );

  if (game.downloadUrl) {
    return (
      <a href={game.downloadUrl} download target="_blank" rel="noopener noreferrer" aria-label={`Pobierz grę ${game.name}`} className="cursor-pointer">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

const NoLolCard: React.FC = () => (
    <div className="relative bg-[#FF8C00]/10 rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-[#FF8C00] flex flex-col items-center justify-center p-4 min-h-[280px] hover:shadow-[0_0_20px_rgba(255,140,0,0.5)]">
         <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-32 h-32 text-[#FF8C00] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
         </div>
        <div className="relative z-10 text-center">
            <h3 className="text-xl font-bold text-[#FFA500]">League of Legends</h3>
            <p className="text-[#FFA500]/80 mt-2 text-sm">Gatunek: MOBA. Lata świetności: Gdzieś indziej!</p>
        </div>
    </div>
);


const GameList: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <Section 
      id="gry" 
      title="Gry, w które gramy"
      subtitle="(i w co na pewno nie gramy!)"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        <NoLolCard />
      </div>
    </Section>
  );
};

export default GameList;