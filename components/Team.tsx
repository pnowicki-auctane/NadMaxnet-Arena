import React from 'react';
import Section from './Section';

const TeamMemberCard: React.FC<{ name: string; title: string; imageUrl: string; alt: string }> = ({ name, title, imageUrl, alt }) => (
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

const Team: React.FC = () => {
  return (
    <Section id="administracja" title="Administracja">
        <div className="flex flex-wrap items-start justify-center gap-12 md:gap-16">
          <TeamMemberCard
            name='Patryk "Spoceniec" Czernecki'
            title="Head Admin"
            imageUrl="https://iili.io/F4Xs81s.md.png"
            alt='Patryk "Spoceniec" Czernecki'
          />
          <TeamMemberCard
            name='Alek "8" Czernecki'
            title="Head Admin"
            imageUrl="https://iili.io/F4XmiSn.md.png"
            alt='Alek "8" Czernecki'
          />
          <TeamMemberCard
            name='Patryk "Papryk" Papryka'
            title="NadMaxnet Arena APP creator"
            imageUrl="https://iili.io/F4h9f6B.md.png"
            alt='Patryk "Papryk" Papryka'
          />
        </div>
    </Section>
  );
};

export default Team;