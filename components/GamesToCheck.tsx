import React from 'react';
import { Game } from '../types';
import Section from './Section';
import DownloadIcon from './icons/DownloadIcon';

const GameToCheckCard: React.FC<{ game: Game }> = ({ game }) => {
  const cardContent = (
    <div className="relative h-full bg-[#2A2A2A]/70 rounded-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 shadow-md group border border-dashed border-white/10 hover:border-white/30">
      <img src={game.imageUrl} alt={game.name} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h3 className="text-md font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-[#FFA500] to-[#66FF00] transition-colors">{game.name}</h3>
        <p className="text-[#F0F0F0]/60 mt-1 text-xs">{game.description}</p>
      </div>
       {game.downloadUrl && (
        <div className="absolute top-1.5 right-1.5 p-1.5 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DownloadIcon className="h-5 w-5"/>
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

const GamesToCheck: React.FC<{ games: Game[] }> = ({ games }) => {
  if (games.length === 0) return null;
  
  return (
    <Section 
      id="gry-do-sprawdzenia" 
      title="Kandydaci do sprawdzenia!"
      subtitle="Gry, które rozważamy na przyszłe LANy. Daj znać adminom, jeśli któraś Ci się podoba!"
      className="bg-[#1A1A1A] rounded-xl border-y-0"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <GameToCheckCard key={game.id} game={game} />
        ))}
      </div>
    </Section>
  );
};

export default GamesToCheck;