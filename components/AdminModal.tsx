
import React, { useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import CloseIcon from './icons/CloseIcon';
import { Game, EventDetails } from '../types';
import { auth } from '../App';

interface AdminModalProps {
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
    onClose: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

const AdminModal: React.FC<AdminModalProps> = (props) => {
    const { onClose, isLoggedIn, ...allDashboardProps } = props;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-lg shadow-2xl border border-[#32CD32]/20 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                    aria-label="Zamknij panel administracyjny"
                >
                    <CloseIcon />
                </button>
                <div className="overflow-y-auto">
                    {isLoggedIn ? (
                        <AdminDashboard {...allDashboardProps} />
                    ) : (
                        <AdminLogin auth={auth} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminModal;
