import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 border-b border-[#32CD32]/20 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#66FF00] mb-2">
          {title}
        </h2>
        {subtitle && <p className="text-lg text-[#F0F0F0]/70 mb-12">{subtitle}</p>}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;