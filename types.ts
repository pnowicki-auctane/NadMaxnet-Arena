
import type firebase from 'firebase/compat/app';

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  downloadUrl?: string;
}

export interface EventDetails {
  name: string;
  date: firebase.firestore.Timestamp;
  duration: string;
  confirmedPlayers: number;
  interestedPlayers: number;
}