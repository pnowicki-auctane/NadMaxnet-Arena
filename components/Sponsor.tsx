import React from 'react';
import Section from './Section';

const SponsorCard: React.FC<{ name: string; title: string; imageUrl: string; alt: string }> = ({ name, title, imageUrl, alt }) => (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-1 rounded-full bg-gradient-to-br from-[#FF8C00] to-[#66FF00] shadow-lg shadow-[#66FF00]/20">
            <div className="w-48 h-48 rounded-full bg-[#2A2A2A] flex items-center justify-center overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
        <div>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#66FF00]">{name}</p>
            <p className="text-xl text-[#F0F0F0] mt-1">{title}</p>
        </div>
    </div>
);

const Sponsor: React.FC = () => {
  return (
    <Section id="organizatorzy" title="Dzięki nim to organizujemy!">
      <div className="flex flex-wrap items-start justify-center gap-12 md:gap-16">
          <SponsorCard 
            name="Zbyszard aka Maxnet Daddy"
            title="Właściciel NadMaxnet Areny"
            imageUrl="https://iili.io/F4X0Lap.md.png"
            alt="Zbyszard aka Maxnet Daddy"
          />
          <SponsorCard 
            name="Zbyszka aka Zwyżka"
            title="Patronat"
            imageUrl="https://iili.io/F4XO3uf.md.png"
            alt="Zbyszka aka Zwyżka"
          />
        </div>
    </Section>
  );
};

export default Sponsor;