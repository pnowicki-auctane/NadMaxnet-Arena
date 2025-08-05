
import React, { useState, useEffect } from 'react';
import { Game, EventDetails } from '../types';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Timestamp = firebase.firestore.Timestamp;


// Helper Components
const AdminInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-bold text-[#F0F0F0] block mb-2 text-left">{label}</label>
        <input {...props} className="w-full bg-[#1A1A1A] text-white p-3 rounded-md border border-[#32CD32]/30 focus:border-[#66FF00] focus:ring-2 focus:ring-[#66FF00]/50 outline-none transition-all" />
    </div>
);

const AdminButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button {...props} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-bold rounded-lg transition-all transform hover:scale-105 hover:brightness-125 shadow-lg shadow-[#FFA500]/20 disabled:opacity-50 disabled:cursor-not-allowed">
        {children}
    </button>
);

// --- Access Management ---
interface AccessManagementProps {
    initialPassword: string;
    onSave: (password: string) => Promise<void>;
}
const AccessManagement: React.FC<AccessManagementProps> = ({ initialPassword, onSave }) => {
    const [password, setPassword] = useState(initialPassword);

    useEffect(() => { setPassword(initialPassword); }, [initialPassword]);
    
    const handleSave = async () => {
        if (!password) {
            alert("Hasło nie może być puste.");
            return;
        }
        await onSave(password);
        alert('Sukces: Hasło dostępu do strony zostało zaktualizowane!');
    };

    return (
        <div className="bg-[#2A2A2A]/50 border border-[#32CD32]/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Zarządzanie Hasłem Dostępu do Strony</h3>
            <p className="text-sm text-[#F0F0F0]/70 mb-4">To hasło jest wymagane, aby wejść na stronę główną. Zmiana jest zapisywana na stałe w bazie danych.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminInput label="Nowe Hasło Strony" name="sitePassword" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
             <div className="mt-6 text-right">
                <AdminButton onClick={handleSave}>Zapisz Nowe Hasło</AdminButton>
            </div>
        </div>
    );
};


// --- Event Management ---
interface EventManagementProps {
    initialDetails: EventDetails;
    onSave: (updatedDetails: EventDetails) => Promise<void>;
}
const EventManagement: React.FC<EventManagementProps> = ({ initialDetails, onSave }) => {
    const [details, setDetails] = useState(initialDetails);

    useEffect(() => { setDetails(initialDetails); }, [initialDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const isNumberField = ['confirmedPlayers', 'interestedPlayers'].includes(name);
        setDetails(prev => ({ ...prev, [name]: isNumberField ? parseInt(value, 10) || 0 : value }));
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setDetails(prev => ({ ...prev, date: Timestamp.fromDate(new Date(e.target.value)) }));
    }

    const handleSave = async () => {
        await onSave(details);
        alert('Sukces: Szczegóły wydarzenia zostały zaktualizowane!');
    };
    
    const formatDateForInput = (date: firebase.firestore.Timestamp) => {
        try {
            const d = date.toDate();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        } catch(e) { return ''; }
    }

    return (
        <div className="bg-[#2A2A2A]/50 border border-[#32CD32]/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Zarządzanie Wydarzeniem</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminInput label="Nazwa Wydarzenia" name="name" type="text" value={details.name} onChange={handleChange} />
                <AdminInput label="Data i Czas Trwania (opis)" name="duration" type="text" value={details.duration} onChange={handleChange} />
                <AdminInput label="Data Rozpoczęcia (dla licznika)" name="date" type="datetime-local" value={formatDateForInput(details.date)} onChange={handleDateChange} />
                <AdminInput label="Liczba Potwierdzonych" name="confirmedPlayers" type="number" value={details.confirmedPlayers} onChange={handleChange} />
                <AdminInput label="Liczba Zainteresowanych" name="interestedPlayers" type="number" value={details.interestedPlayers} onChange={handleChange} />
            </div>
             <div className="mt-6 text-right">
                <AdminButton onClick={handleSave}>Zapisz Zmiany Wydarzenia</AdminButton>
            </div>
        </div>
    );
};

// --- Game Management ---
const emptyGameForm: Omit<Game, 'id'> = { name: '', description: '', imageUrl: '', upvotes: 0, downvotes: 0, downloadUrl: ''};
interface GameManagementProps {
    games: Game[];
    onAdd: (game: Omit<Game, 'id'>) => Promise<void>;
    onUpdate: (game: Game) => Promise<void>;
    onDelete: (gameId: string) => Promise<void>;
}
const GameManagement: React.FC<GameManagementProps> = ({ games, onAdd, onUpdate, onDelete }) => {
    const [formState, setFormState] = useState<Omit<Game, 'id'>>(emptyGameForm);
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEditClick = (game: Game) => {
        setEditingGame(game);
        setFormState({ name: game.name, description: game.description, imageUrl: game.imageUrl, upvotes: game.upvotes, downvotes: game.downvotes, downloadUrl: game.downloadUrl || '' });
    };

    const handleCancelEdit = () => {
        setEditingGame(null);
        setFormState(emptyGameForm);
    }

    const handleSubmit = async () => {
        if (!formState.name || !formState.imageUrl) {
            alert('Błąd: Nazwa gry i URL obrazka są wymagane.');
            return;
        }

        setIsLoading(true);
        try {
            if (editingGame) {
                await onUpdate({ ...editingGame, ...formState });
                alert(`Sukces: Gra "${formState.name}" została zaktualizowana!`);
            } else {
                await onAdd(formState);
                alert(`Sukces: Gra "${formState.name}" została dodana!`);
            }
            handleCancelEdit();
        } catch (error) {
            console.error("Error saving game:", error);
            alert((error as Error).message || "Wystąpił nieoczekiwany błąd podczas zapisywania gry.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = async (game: Game) => {
        if (window.confirm(`Czy na pewno chcesz usunąć grę "${game.name}"?`)) {
            await onDelete(game.id);
            alert(`Sukces: Gra "${game.name}" została usunięta!`);
        }
    };

    return (
        <div className="bg-[#2A2A2A]/50 border border-[#32CD32]/20 rounded-lg p-6">
            <div className="mb-8 p-4 bg-[#1A1A1A] rounded-md">
                <h3 className="font-semibold mb-3">{editingGame ? 'Edytuj Grę' : 'Dodaj Nową Grę'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Nazwa Gry" name="name" type="text" placeholder="Np. Quake III Arena" value={formState.name} onChange={handleInputChange}/>
                    <AdminInput label="Krótki Opis" name="description" type="text" placeholder="Gatunek: ..." value={formState.description} onChange={handleInputChange}/>
                    <AdminInput label="Link do Miniaturki" name="imageUrl" type="text" placeholder="Wymagany URL do obrazka..." value={formState.imageUrl} onChange={handleInputChange}/>
                    <AdminInput label="URL do Pobrania Gry (opcjonalnie)" name="downloadUrl" type="text" placeholder="Np. link z archive.org" value={formState.downloadUrl || ''} onChange={handleInputChange}/>
                </div>
                <div className="mt-4 text-right flex justify-end gap-4">
                     {editingGame && <button onClick={handleCancelEdit} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-gray-500/20 text-gray-300 font-bold rounded-lg transition-all hover:bg-gray-500/40">Anuluj</button>}
                     <AdminButton onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Przetwarzanie...' : (editingGame ? 'Zaktualizuj Grę' : 'Dodaj Grę')}
                     </AdminButton>
                </div>
            </div>
            
            <h3 className="font-semibold mb-3">Istniejące Gry Główne</h3>
            <div className="space-y-3">
                {games.map(game => (
                    <div key={game.id} className="bg-[#1A1A1A] p-3 rounded-md flex items-center justify-between gap-4">
                        <p className="font-medium">{game.name}</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleEditClick(game)} className="text-xs px-3 py-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition">Edytuj</button>
                            <button onClick={() => handleDeleteClick(game)} className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/40 transition">Usuń</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Games To Check Management ---
const checkEmptyGameForm: Omit<Game, 'id'> = { name: '', description: '', imageUrl: '', upvotes: 0, downvotes: 0, downloadUrl: ''};
interface GamesToCheckManagementProps {
    games: Game[];
    onAdd: (game: Omit<Game, 'id'>) => Promise<void>;
    onUpdate: (game: Game) => Promise<void>;
    onDelete: (gameId: string) => Promise<void>;
    onMove: (game: Game) => Promise<void>;
}
const GamesToCheckManagement: React.FC<GamesToCheckManagementProps> = ({ games, onAdd, onUpdate, onDelete, onMove }) => {
    const [formState, setFormState] = useState<Omit<Game, 'id'>>(checkEmptyGameForm);
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEditClick = (game: Game) => {
        setEditingGame(game);
        setFormState({ name: game.name, description: game.description, imageUrl: game.imageUrl, upvotes: game.upvotes, downvotes: game.downvotes, downloadUrl: game.downloadUrl || '' });
    };

    const handleCancelEdit = () => {
        setEditingGame(null);
        setFormState(checkEmptyGameForm);
    };

    const handleSubmit = async () => {
        if (!formState.name || !formState.imageUrl) {
            alert('Błąd: Nazwa gry i URL obrazka są wymagane.');
            return;
        }
        
        setIsLoading(true);
        try {
            if (editingGame) {
                await onUpdate({ ...editingGame, ...formState });
                alert(`Sukces: Gra do sprawdzenia "${formState.name}" została zaktualizowana!`);
            } else {
                await onAdd(formState);
                alert(`Sukces: Gra do sprawdzenia "${formState.name}" została dodana!`);
            }
            handleCancelEdit();
        } catch (error) {
            console.error("Error saving game to check:", error);
            alert((error as Error).message || "Wystąpił nieoczekiwany błąd.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = async (game: Game) => {
        if (window.confirm(`Czy na pewno chcesz usunąć "${game.name}" z listy do sprawdzenia?`)) {
            await onDelete(game.id);
            alert(`Sukces: Gra "${game.name}" została usunięta z listy do sprawdzenia.`);
        }
    };
    
    const handleMoveClick = async (game: Game) => {
        if (window.confirm(`Czy na pewno chcesz przenieść "${game.name}" do listy gier głównych?`)) {
            await onMove(game);
            alert(`Sukces: Gra "${game.name}" została przeniesiona do listy głównej!`);
        }
    }

    return (
        <div className="bg-[#2A2A2A]/50 border border-[#32CD32]/20 rounded-lg p-6">
            <div className="mb-8 p-4 bg-[#1A1A1A] rounded-md">
                <h3 className="font-semibold mb-3">{editingGame ? 'Edytuj Grę do Sprawdzenia' : 'Dodaj Grę do Sprawdzenia'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Nazwa Gry" name="name" value={formState.name} onChange={handleInputChange}/>
                    <AdminInput label="Krótki Opis" name="description" value={formState.description} onChange={handleInputChange}/>
                    <AdminInput label="Link do Miniaturki" name="imageUrl" value={formState.imageUrl} placeholder="Wymagany URL do obrazka..." onChange={handleInputChange}/>
                    <AdminInput label="URL do Pobrania Gry (opcjonalnie)" name="downloadUrl" type="text" placeholder="Np. link z archive.org" value={formState.downloadUrl || ''} onChange={handleInputChange}/>
                </div>
                <div className="mt-4 text-right flex justify-end gap-4">
                     {editingGame && <button onClick={handleCancelEdit} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-gray-500/20 text-gray-300 font-bold rounded-lg transition-all hover:bg-gray-500/40">Anuluj</button>}
                     <AdminButton onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Przetwarzanie...' : (editingGame ? 'Zaktualizuj' : 'Dodaj')}
                     </AdminButton>
                </div>
            </div>
            
            <h3 className="font-semibold mb-3">Istniejące Gry do Sprawdzenia</h3>
            <div className="space-y-3">
                {games.map(game => (
                    <div key={game.id} className="bg-[#1A1A1A] p-3 rounded-md flex flex-wrap items-center justify-between gap-4">
                        <p className="font-medium flex-grow">{game.name}</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleMoveClick(game)} className="text-xs px-3 py-1 rounded bg-green-500/20 text-green-300 hover:bg-green-500/40 transition">Przenieś do Głównych</button>
                            <button onClick={() => handleEditClick(game)} className="text-xs px-3 py-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition">Edytuj</button>
                            <button onClick={() => handleDeleteClick(game)} className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/40 transition">Usuń</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Voting Management ---
interface VotingManagementProps {
    games: Game[];
    onReset: (gameId: string) => Promise<void>;
}
const VotingManagement: React.FC<VotingManagementProps> = ({ games, onReset }) => {
    
    const handleResetVotesClick = async (game: Game) => {
        if (window.confirm(`Czy na pewno chcesz zresetować głosy dla gry "${game.name}"?`)) {
            await onReset(game.id);
            alert(`Sukces: Głosy dla gry "${game.name}" zostały zresetowane!`);
        }
    };

    return (
        <div className="bg-[#2A2A2A]/50 border border-[#32CD32]/20 rounded-lg p-6">
             <div className="space-y-3">
                {games.map(game => (
                    <div key={game.id} className="bg-[#1A1A1A] p-3 rounded-md flex flex-wrap items-center justify-between gap-4">
                        <p className="font-medium flex-1 min-w-[150px]">{game.name}</p>
                        <div className="flex gap-4 items-center">
                            <p className="text-sm"><span className="text-green-400 font-bold">{game.upvotes}</span> Głosów na TAK</p>
                            <p className="text-sm"><span className="text-red-400 font-bold">{game.downvotes}</span> Głosów na NIE</p>
                        </div>
                        <button onClick={() => handleResetVotesClick(game)} className="text-xs px-3 py-1 rounded bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40 transition">Resetuj Głosy</button>
                    </div>
                ))}
            </div>
             <div className="mt-6 text-right">
                <AdminButton disabled>Dodaj Nową Ankietę (wkrótce)</AdminButton>
            </div>
        </div>
    );
};


// --- Main Dashboard ---
interface AdminDashboardProps {
    games: Game[];
    gamesToCheck: Game[];
    eventDetails: EventDetails;
    sitePassword: string;
    onEventUpdate: (details: EventDetails) => Promise<void>;
    onGameAdd: (game: Omit<Game, 'id'>) => Promise<void>;
    onGameUpdate: (game: Game) => Promise<void>;
    onGameDelete: (gameId: string) => Promise<void>;
    onGameToCheckAdd: (game: Omit<Game, 'id'>) => Promise<void>;
    onGameToCheckUpdate: (game: Game) => Promise<void>;
    onGameToCheckDelete: (gameId: string) => Promise<void>;
    onMoveGameToMain: (game: Game) => Promise<void>;
    onResetVotes: (gameId: string) => Promise<void>;
    onSitePasswordUpdate: (newPassword: string) => Promise<void>;
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
    const { onLogout, games, gamesToCheck, eventDetails, onEventUpdate, onGameAdd, onGameUpdate, onGameDelete, onGameToCheckAdd, onGameToCheckUpdate, onGameToCheckDelete, onMoveGameToMain, onResetVotes, sitePassword, onSitePasswordUpdate } = props;
    const [activeTab, setActiveTab] = useState('event');
    
    const TabButton: React.FC<{tabId: string, children: React.ReactNode}> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-colors border-b-2 ${
                activeTab === tabId 
                ? 'border-[#66FF00] text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#66FF00]' 
                : 'border-transparent text-[#F0F0F0]/60 hover:text-white'
            }`}
        >
            {children}
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'event': return <EventManagement initialDetails={eventDetails} onSave={onEventUpdate} />;
            case 'games': return <GameManagement games={games} onAdd={onGameAdd} onUpdate={onGameUpdate} onDelete={onGameDelete} />;
            case 'gamesToCheck': return <GamesToCheckManagement games={gamesToCheck} onAdd={onGameToCheckAdd} onUpdate={onGameToCheckUpdate} onDelete={onGameToCheckDelete} onMove={onMoveGameToMain} />;
            case 'voting': return <VotingManagement games={games} onReset={onResetVotes} />;
            case 'access': return <AccessManagement initialPassword={sitePassword} onSave={onSitePasswordUpdate} />;
            default: return null;
        }
    };

    return (
        <div className="bg-transparent text-white p-2 sm:p-4">
             <header className="flex justify-between items-center mb-6 px-4 pt-4">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#66FF00]">
                    Panel Administracyjny
                </h1>
                <button onClick={onLogout} className="hidden sm:block text-sm text-[#F0F0F0]/70 hover:text-[#FF8C00] transition-colors">
                    Wyloguj &rarr;
                </button>
            </header>
            <div className="border-b border-[#32CD32]/20 px-2 sm:px-4">
                <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto">
                    <TabButton tabId="event">Wydarzenie</TabButton>
                    <TabButton tabId="games">Gry Główne</TabButton>
                    <TabButton tabId="gamesToCheck">Gry do Spr.</TabButton>
                    <TabButton tabId="voting">Głosowanie</TabButton>
                    <TabButton tabId="access">Dostęp</TabButton>
                </nav>
            </div>
            <main className="py-6 px-2 sm:px-4">
                <div className="animate-fade-in">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
