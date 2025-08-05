import React from 'react';

interface IntroductionProps {
    onOpenLocationModal: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onOpenLocationModal }) => {
  return (
    <section id="intro" className="text-center py-20 md:py-32">
       <div className="p-1 rounded-full bg-gradient-to-br from-[#FF8C00] via-[#FFA500] to-[#66FF00] inline-block shadow-2xl shadow-[#66FF00]/20 animate-fade-in-down">
         <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#2A2A2A] flex items-center justify-center overflow-hidden">
            <img
              src="https://iili.io/F4XRcOb.md.png"
              alt="NadMaxnet Arena Logo"
              className="w-full h-full object-cover scale-[1.4]"
            />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold my-8 animate-fade-in-down animate-text-glow">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00]">
          Witamy w NadMaxnet Arena
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-[#F0F0F0]/90 mb-8 max-w-3xl mx-auto animate-fade-in-up">
        Twoim nowym centrum prywatnych imprez LAN Party dla fanów oldschoolu i nowych hitów!
      </p>
      <div className="flex flex-col items-center gap-6">
        <div className="p-0.5 rounded-lg bg-gradient-to-r from-[#FF8C00]/50 to-[#66FF00]/50 max-w-md mx-auto shadow-lg animate-pulse w-full">
            <div className="bg-[#1A1A1A] px-4 py-3 rounded-md">
                <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#66FF00]">Ważna informacja! </strong>
                <span className="block sm:inline text-[#F0F0F0]/80">Jeśli szukasz turnieju League of Legends, to spierdalaj, źle trafiłeś! Tutaj gramy w Cod'a XD</span>
            </div>
        </div>
        <button
          onClick={onOpenLocationModal}
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-[#32CD32] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#32CD32]/20 hover:shadow-lg hover:shadow-[#66FF00]/20"
        >
          Jak do nas dojechać?
        </button>
      </div>
    </section>
  );
};

export default Introduction;