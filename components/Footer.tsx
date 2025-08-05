import React from 'react';

interface FooterProps {
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#32CD32]/20 py-8">
      <div className="container mx-auto px-4 text-center text-[#F0F0F0]/60">
        <p>&copy; {new Date().getFullYear()} NadMaxnet Arena. All rights reserved (and no LoL allowed).</p>
        <p className="mt-2 text-sm">Stworzone z pasji do grania. Created by: Patryk Nowicki</p>
        <div className="mt-4 text-sm">
          <button onClick={onAdminClick} className="text-[#F0F0F0]/80 hover:text-[#66FF00] transition-colors bg-transparent border-none cursor-pointer p-1">
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;