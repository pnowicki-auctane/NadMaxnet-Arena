
import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import HomePage from './components/HomePage';
import AdminModal from './components/AdminModal';
import CoD2KeysPage from './components/CoD2KeysPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LocationModal from './components/LocationModal';
import PasswordEntryPage from './components/PasswordEntryPage';
import { Game, EventDetails } from './types';

// --- Firebase Initialization ---
const firebaseConfig = {
  apiKey: "AIzaSyAfIdCmRzfFjEY-MzcqNt6VOZnzCKurBLk",
  authDomain: "nadmaxnet.firebaseapp.com",
  projectId: "nadmaxnet",
  storageBucket: "nadmaxnet.firebasestorage.app",
  messagingSenderId: "203195054547",
  appId: "1:203195054547:web:9f30570848dd2916e6d726"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
const Timestamp = firebase.firestore.Timestamp;

export type View = 'home' | 'cod2keys';

const App: React.FC = () => {
    // --- State Management ---
    const [isSiteAuthenticated, setIsSiteAuthenticated] = useState(sessionStorage.getItem('isSiteAuthenticated') === 'true');
    const [sitePassword, setSitePassword] = useState('lan');
    const [games, setGames] = useState<Game[]>([]);
    const [gamesToCheck, setGamesToCheck] = useState<Game[]>([]);
    const [eventDetails, setEventDetails] = useState<EventDetails>({ name: "NadMaxnet Arena", date: Timestamp.now(), duration: "Ładowanie...", confirmedPlayers: 0, interestedPlayers: 0 });
    const [adminUser, setAdminUser] = useState<firebase.User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [view, setView] = useState<View>('home');
    const [loading, setLoading] = useState(true);

    // --- Data Seeding ---
    const seedDatabase = useCallback(async () => {
        const gamesCollection = db.collection("games");
        const gamesSnapshot = await gamesCollection.get();
        if (gamesSnapshot.empty) {
            console.log("Database appears to be empty. Seeding with initial data...");
            const batch = db.batch();

            const initialGames: Omit<Game, 'id'>[] = [
                { name: 'Counter-Strike 1.6', description: 'Klasyka gatunku FPS.', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.S7RzZCovJQEJX6dtb9qBHgHaJ4?pid=Api', upvotes: 12, downvotes: 1, downloadUrl: 'https://archive.org/download/counter-strike-1.6-full-v7/CS1.6.zip' },
                { name: 'Counter-Strike 2', description: 'Nowa era Counter-Strike.', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', upvotes: 8, downvotes: 3 },
                { name: 'Call of Duty 2', description: 'Kultowa strzelanka z IIWŚ.', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Call_of_Duty_2_Box.jpg', upvotes: 15, downvotes: 0, downloadUrl: 'https://archive.org/download/call-of-duty-2_202111/Call%20of%20Duty%202.zip' },
                { name: 'Call of Duty 4', description: 'Nowoczesna wojna, która zmieniła FPSy.', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Call_of_Duty_4_Modern_Warfare.jpg', upvotes: 14, downvotes: 2 },
                { name: 'Quake III Arena', description: 'Czysta, rakietowa rozrywka.', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.L_C1IbHMUBa5SMXSTzVrXQHaHa?pid=Api', upvotes: 18, downvotes: 0, downloadUrl: 'https://archive.org/download/Quake3arena.zip' },
                { name: 'Savage 2', description: 'Unikalne połączenie RTS i FPS.', imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/13700/header.jpg', upvotes: 5, downvotes: 5 },
                { name: 'Warcraft III', description: 'Strategia czasu rzeczywistego w świecie Azeroth.', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.4X_wm4VdzQCuwQpaDjea5gHaI5?pid=Api', upvotes: 10, downvotes: 4 },
                { name: 'Left 4 Dead 2', description: 'Kooperacyjna walka z zombie.', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.P37hPfmGucMWvagFkpTetQHaKm?pid=Api', upvotes: 16, downvotes: 1 },
            ];
            initialGames.forEach(game => {
                const gameRef = db.collection("games").doc();
                batch.set(gameRef, game);
            });

            const initialGamesToCheck: Omit<Game, 'id'>[] = [
                { name: 'Fallout Tactics', description: 'Klasyk do odświeżenia w trybie multiplayer.', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/38400/header.jpg?t=1592862483', upvotes: 0, downvotes: 0, downloadUrl: 'https://archive.org/download/fallout_tactics_pc_game/FalloutTactics.iso' },
                { name: 'Red Faction Guerrilla', description: 'Nowość warta uwagi - totalna destrukcja!', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/667720/header.jpg?t=1667300325', upvotes: 0, downvotes: 0 },
            ];
            initialGamesToCheck.forEach(game => {
                const gameRef = db.collection("gamesToCheck").doc();
                batch.set(gameRef, game);
            });

            const initialEventDetails: Omit<EventDetails, 'id' | 'date'> & { date: firebase.firestore.Timestamp } = {
                name: "NADMAXNET LANPARTY 2025 Summer edition",
                date: Timestamp.fromDate(new Date('2025-08-29T16:00:00')),
                duration: "29.08.2025 (16:00) - 31.08.2025 (do oporu)",
                confirmedPlayers: 12,
                interestedPlayers: 25,
            };
            const eventRef = db.collection("event").doc("details");
            batch.set(eventRef, initialEventDetails);

            const configRef = db.collection("config").doc("site");
            batch.set(configRef, { password: 'lan' });

            await batch.commit();
            console.log("Database seeded successfully.");
        }
    }, []);

    // --- Data Fetching & Real-time Updates ---
    useEffect(() => {
        seedDatabase();
        setLoading(true);
        
        const unsubGames = db.collection("games").onSnapshot((snapshot) => {
            const gamesData = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as Game[];
            setGames(gamesData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching games: ", error);
            setLoading(false);
        });

        const unsubGamesToCheck = db.collection("gamesToCheck").onSnapshot((snapshot) => {
            const gamesToCheckData = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as Game[];
            setGamesToCheck(gamesToCheckData);
        });

        const unsubEvent = db.collection("event").doc("details").onSnapshot((d) => {
            if (d.exists) {
                setEventDetails(d.data() as EventDetails);
            }
        });

        const unsubConfig = db.collection("config").doc("site").onSnapshot((d) => {
            const configData = d.data();
            if (d.exists && configData?.password) {
                setSitePassword(configData.password);
            }
        });
        
        const unsubAuth = auth.onAuthStateChanged((user) => {
            setAdminUser(user);
        });

        return () => {
            unsubGames();
            unsubGamesToCheck();
            unsubEvent();
            unsubConfig();
            unsubAuth();
        };
    }, [seedDatabase]);

    // --- Site-wide Auth ---
    const handleSiteLoginSuccess = useCallback(() => {
        sessionStorage.setItem('isSiteAuthenticated', 'true');
        setIsSiteAuthenticated(true);
    }, []);

    const handleSitePasswordUpdate = useCallback(async (newPassword: string) => {
        await db.collection("config").doc("site").set({ password: newPassword });
    }, []);

    // --- Modals & Navigation ---
    const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
    const handleOpenLocationModal = useCallback(() => setIsLocationModalOpen(true), []);
    const handleCloseLocationModal = useCallback(() => setIsLocationModalOpen(false), []);
    const handleNavigate = useCallback((targetView: View) => {
        setView(targetView);
        window.scrollTo(0, 0);
    }, []);
    
    // --- Data Handlers (Firestore) ---
    const handleVote = useCallback(async (gameId: string, voteType: 'up' | 'down') => {
        await db.collection('games').doc(gameId).update({
            [voteType === 'up' ? 'upvotes' : 'downvotes']: firebase.firestore.FieldValue.increment(1)
        });
    }, []);

    const handleEventUpdate = useCallback(async (updatedDetails: EventDetails) => {
        const eventRef = db.collection("event").doc("details");
        const detailsToSave = {
          ...updatedDetails,
          date: updatedDetails.date instanceof Date ? Timestamp.fromDate(updatedDetails.date) : updatedDetails.date
        };
        await eventRef.set(detailsToSave);
    }, []);
    
    const handleGameAdd = useCallback(async (newGameData: Omit<Game, 'id'>) => {
        await db.collection('games').add(newGameData);
    }, []);

    const handleGameUpdate = useCallback(async (updatedGame: Game) => {
        const { id, ...dataToUpdate } = updatedGame;
        await db.collection('games').doc(id).update(dataToUpdate);
    }, []);

    const handleGameDelete = useCallback(async (gameId: string) => {
        await db.collection('games').doc(gameId).delete();
    }, []);
    
    const handleResetVotes = useCallback(async (gameId: string) => {
        await db.collection('games').doc(gameId).update({ upvotes: 0, downvotes: 0 });
    }, []);

    const handleGameToCheckAdd = useCallback(async (newGameData: Omit<Game, 'id'>) => {
        await db.collection('gamesToCheck').add(newGameData);
    }, []);

    const handleGameToCheckUpdate = useCallback(async (updatedGame: Game) => {
        const { id, ...dataToUpdate } = updatedGame;
        await db.collection('gamesToCheck').doc(id).update(dataToUpdate);
    }, []);

    const handleGameToCheckDelete = useCallback(async (gameId: string) => {
        await db.collection('gamesToCheck').doc(gameId).delete();
    }, []);

    const handleMoveGameToMain = useCallback(async (gameToMove: Game) => {
        const batch = db.batch();
        const { id, ...gameData } = { ...gameToMove, upvotes: 0, downvotes: 0 };
        batch.set(db.collection("games").doc(id), gameData);
        batch.delete(db.collection("gamesToCheck").doc(id));
        await batch.commit();
    }, []);

    const handleLogout = useCallback(async () => {
        await auth.signOut();
    }, []);

    const adminModalProps = {
        games,
        gamesToCheck,
        eventDetails,
        sitePassword,
        onEventUpdate: handleEventUpdate,
        onGameAdd: handleGameAdd,
        onGameUpdate: handleGameUpdate,
        onGameDelete: handleGameDelete,
        onGameToCheckAdd: handleGameToCheckAdd,
        onGameToCheckUpdate: handleGameToCheckUpdate,
        onGameToCheckDelete: handleGameToCheckDelete,
        onMoveGameToMain: handleMoveGameToMain,
        onResetVotes: handleResetVotes,
        onSitePasswordUpdate: handleSitePasswordUpdate,
        onClose: handleCloseModal,
        isLoggedIn: !!adminUser,
        onLogout: handleLogout,
    };
    
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white text-2xl animate-pulse">Ładowanie danych z Firebase...</div>;
    }

    if (!isSiteAuthenticated) {
        return (
            <>
                <PasswordEntryPage 
                    correctPassword={sitePassword}
                    onLoginSuccess={handleSiteLoginSuccess}
                    onAdminClick={handleOpenModal}
                />
                {isModalOpen && <AdminModal {...adminModalProps} />}
            </>
        );
    }

    return (
        <div className="bg-[#1A1A1A]">
            <Header onAdminClick={handleOpenModal} onNavigate={handleNavigate} currentView={view} onOpenLocationModal={handleOpenLocationModal} />
            
            {view === 'home' ? (
                 <HomePage games={games} gamesToCheck={gamesToCheck} eventDetails={eventDetails} onVote={handleVote} onOpenLocationModal={handleOpenLocationModal} />
            ) : (
                <CoD2KeysPage />
            )}

            <Footer onAdminClick={handleOpenModal} />
            {isModalOpen && <AdminModal {...adminModalProps} />}
            {isLocationModalOpen && <LocationModal onClose={handleCloseLocationModal} />}
        </div>
    );
};

export default App;