import React, { useState, useEffect } from 'react';
import { View } from '../App';
import CogIcon from './icons/CogIcon';

interface HeaderProps {
    onAdminClick: () => void;
    onNavigate: (view: View) => void;
    currentView: View;
    onOpenLocationModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick, onNavigate, currentView, onOpenLocationModal }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const navLinks = [
        { id: 'kalendarz', label: 'Wydarzenie' },
        { id: 'gry', label: 'Gry' },
        { id: 'glosowanie', label: 'Głosowanie' },
        { id: 'losowanie', label: 'Kolejność' },
        { id: 'dojazd', label: 'Dojazd' },
    ];
    
    const handleAnchorLink = (anchorId: string) => {
        if (currentView !== 'home') {
            onNavigate('home');
            setTimeout(() => {
                document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A1A1A]/80 backdrop-blur-sm shadow-lg shadow-black/20' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a onClick={() => onNavigate('home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                    <img src="https://iili.io/F4XRcOb.md.png" alt="NadMaxnet Arena Logo" className="h-9 w-9 rounded-full object-cover" />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFA500] animate-text-glow">
                        NadMaxnet Arena
                    </span>
                </a>
                <div className="flex items-center space-x-6">
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a 
                                key={link.id} 
                                onClick={() => link.id === 'dojazd' ? onOpenLocationModal() : handleAnchorLink(link.id)} 
                                className="text-[#F0F0F0] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FFA500] to-[#66FF00] transition-colors pb-1 cursor-pointer"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                     <div className="hidden md:flex items-center space-x-4">
                        <a
                            onClick={() => onNavigate('cod2keys')}
                            className="cursor-pointer text-gray-900 font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFBF00] to-[#FFD700] hover:brightness-110 transition-all shadow-md animate-pulse-gold text-sm"
                            role="button"
                            aria-label="Przejdź do strony z kluczami do Call of Duty 2"
                        >
                            CD-Key CoD2
                        </a>
                        <button 
                            onClick={onAdminClick} 
                            className="text-[#F0F0F0] border-2 border-[#32CD32]/50 rounded-full p-2.5 hover:bg-[#32CD32]/20 hover:border-[#66FF00] transition-all"
                            aria-label="Panel Admina"
                        >
                            <CogIcon />
                        </button>
                    </div>
                </div>
                 {/* A simple menu button for mobile can be added here in the future */}
            </div>
        </header>
    );
};

export default Header;