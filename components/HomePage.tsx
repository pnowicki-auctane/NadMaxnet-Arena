import React from 'react';
import { Game, EventDetails } from '../types';
import Introduction from './Introduction';
import Sponsor from './Sponsor';
import Team from './Team';
import EventCalendar from './EventCalendar';
import GameList from './GameList';
import GamesToCheck from './GamesToCheck';
import PlayerStatus from './PlayerStatus';
import GameVoting from './GameVoting';
import GameRandomizer from './GameRandomizer';

interface HomePageProps {
  games: Game[];
  gamesToCheck: Game[];
  eventDetails: EventDetails;
  onVote: (gameId: string, voteType: 'up' | 'down') => void;
  onOpenLocationModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ games, gamesToCheck, eventDetails, onVote, onOpenLocationModal }) => {
  // Defensive check for date object from Firebase. It should be a Timestamp object with a toDate() method.
  // This prevents a crash if the data is malformed.
  const eventDate = (eventDetails.date && typeof eventDetails.date.toDate === 'function')
    ? eventDetails.date.toDate()
    : new Date();

  return (
    <main className="container mx-auto px-4 py-8 pt-24 md:pt-32">
      <Introduction onOpenLocationModal={onOpenLocationModal} />
      <EventCalendar
        eventName={eventDetails.name}
        eventDate={eventDate}
        eventDuration={eventDetails.duration}
      />
      <PlayerStatus
        confirmed={eventDetails.confirmedPlayers}
        interested={eventDetails.interestedPlayers}
      />
      <GameList games={games} />
      <GamesToCheck games={gamesToCheck} />
      <GameVoting games={games} onVote={onVote} />
      <GameRandomizer games={games} />
      <Sponsor />
      <Team />
    </main>
  );
};

export default HomePage;