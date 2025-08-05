import React from 'react';
import Section from './Section';

interface PlayerStatusProps {
  confirmed: number;
  interested: number;
}

const StatusBox: React.FC<{ count: number; label: string; colorGradient: string }> = ({ count, label, colorGradient }) => (
    <div className="p-1 rounded-lg flex-1 shadow-lg shadow-black/20" style={{background: colorGradient}}>
        <div className="bg-[#2A2A2A] p-6 rounded-md h-full">
            <div className={`text-5xl font-bold bg-clip-text text-transparent`} style={{backgroundImage: colorGradient}}>{count}</div>
            <div className="text-lg text-[#F0F0F0] mt-2">{label}</div>
        </div>
    </div>
);

const PlayerStatus: React.FC<PlayerStatusProps> = ({ confirmed, interested }) => {
  return (
    <Section id="status" title="Kto zagra?">
        <div className="flex flex-col md:flex-row gap-8 max-w-2xl mx-auto">
            <StatusBox count={confirmed} label="Potwierdzonych Graczy" colorGradient="linear-gradient(to right, #32CD32, #66FF00)" />
            <StatusBox count={interested} label="Zainteresowanych Graczy" colorGradient="linear-gradient(to right, #FF8C00, #FFA500)" />
        </div>
    </Section>
  );
};

export default PlayerStatus;