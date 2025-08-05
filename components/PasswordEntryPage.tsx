import React, { useState } from 'react';
import CogIcon from './icons/CogIcon';

interface PasswordEntryPageProps {
  correctPassword: string;
  onLoginSuccess: () => void;
  onAdminClick: () => void;
}

const PasswordEntryPage: React.FC<PasswordEntryPageProps> = ({ correctPassword, onLoginSuccess, onAdminClick }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            onLoginSuccess();
        } else {
            setError('Nieprawidłowe hasło.');
            setPassword('');
        }
    };

    return (
        <div className="bg-[#1A1A1A] text-[#F0F0F0] font-sans min-h-screen flex flex-col items-center justify-center p-4">
             <header className="absolute top-0 right-0 p-6">
                <button 
                    onClick={onAdminClick} 
                    className="text-[#F0F0F0] border-2 border-[#32CD32]/50 rounded-full p-2.5 hover:bg-[#32CD32]/20 hover:border-[#66FF00] transition-all"
                    aria-label="Panel Admina"
                >
                    <CogIcon />
                </button>
            </header>

            <main className="text-center animate-fade-in w-full max-w-md">
                <div className="p-1 rounded-full bg-gradient-to-br from-[#FF8C00] via-[#FFA500] to-[#66FF00] inline-block shadow-2xl shadow-[#66FF00]/20">
                    <div className="w-48 h-48 rounded-full bg-[#2A2A2A] flex items-center justify-center overflow-hidden">
                        <img
                          src="https://iili.io/F4XRcOb.md.png"
                          alt="NadMaxnet Arena Logo"
                          className="w-full h-full object-cover scale-[1.4]"
                        />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold my-8 animate-text-glow">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00]">
                      Witamy w NadMaxnet Arena
                    </span>
                </h1>

                <p className="text-lg text-[#F0F0F0]/80 mb-8">
                    Strona jest chroniona hasłem. Wprowadź hasło, aby kontynuować.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="site_password" className="sr-only">Hasło</label>
                        <input
                            type="password"
                            id="site_password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#2A2A2A] text-white text-center text-xl p-4 rounded-lg border-2 border-[#32CD32]/30 focus:border-[#66FF00] focus:ring-2 focus:ring-[#66FF00]/50 outline-none transition-all placeholder:text-gray-500"
                            placeholder="••••••••••"
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-bold rounded-lg transition-all transform hover:scale-105 hover:brightness-125 shadow-lg shadow-[#FFA500]/20"
                    >
                      WEJDŹ
                    </button>
                </form>
            </main>

            <footer className="absolute bottom-4 p-4 text-center text-[#F0F0F0]/60 text-sm">
                <p>&copy; {new Date().getFullYear()} NadMaxnet Arena. Wszelkie prawa zastrzeżone.</p>
                 <p className="mt-1 text-xs">Created by: Patryk Nowicki</p>
            </footer>
        </div>
    );
};

export default PasswordEntryPage;