import React, { useState, useEffect, useCallback } from 'react';
import { keys } from '../services/keysService';
import CopyIcon from './icons/CopyIcon';
import ShuffleIcon from './icons/ShuffleIcon';

const CoD2KeysPage: React.FC = () => {
    const [currentKey, setCurrentKey] = useState('');
    const [copied, setCopied] = useState(false);

    const generateNewKey = useCallback(() => {
        let newKey = '';
        do {
            newKey = keys[Math.floor(Math.random() * keys.length)];
        } while (newKey === currentKey && keys.length > 1); // Avoid showing the same key twice in a row
        setCurrentKey(newKey);
    }, [currentKey]);

    useEffect(() => {
        generateNewKey();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount

    const handleCopy = () => {
        if (currentKey) {
            navigator.clipboard.writeText(currentKey).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <main className="container mx-auto px-4 py-32 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold my-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00]">
                    Klucze aktywacyjne do CoD2
                </span>
            </h1>
            <p className="text-lg text-[#F0F0F0]/70 mb-12 max-w-2xl mx-auto">
                Tutaj znajdziesz losowo generowany klucz CD-Key do Call of Duty 2 z naszej puli. Klucze nie są usuwane po wygenerowaniu, możesz generować wielokrotnie.
            </p>

            <div className="relative bg-[#2A2A2A] border-2 border-[#32CD32] rounded-lg p-8 max-w-2xl mx-auto shadow-2xl shadow-[#66FF00]/20">
                <p className="font-mono text-2xl md:text-4xl tracking-widest text-white">
                    {currentKey}
                </p>
                <button onClick={handleCopy} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 hover:text-white transition-colors h-10 w-20 flex items-center justify-center">
                    {copied ? <span className="text-sm text-green-400">Skopiowano!</span> : <CopyIcon />}
                </button>
            </div>

            <div className="mt-12">
                <button
                    onClick={generateNewKey}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00] bg-[length:200%_auto] hover:bg-[right_center] text-white font-bold rounded-lg transition-all duration-500 transform hover:scale-105 shadow-lg shadow-[#66FF00]/20"
                >
                    <ShuffleIcon />
                    Generuj Nowy Klucz
                </button>
            </div>
        </main>
    );
};

export default CoD2KeysPage;