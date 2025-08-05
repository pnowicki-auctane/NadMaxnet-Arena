import React, { useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';

interface LocationModalProps {
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ onClose }) => {
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
        className="relative w-full max-w-3xl bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-lg shadow-2xl border border-[#32CD32]/20 flex flex-col p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Zamknij okno dojazdu"
        >
          <CloseIcon />
        </button>
        
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#66FF00] mb-4">
              Jak dojechać do NadMaxnet Arena?
            </h2>
        </div>
        
        <div className="text-lg text-center text-[#F0F0F0] mt-4">
            <p className="mb-4">Nasza arena znajduje się pod adresem:</p>
            <p className="text-2xl font-semibold text-[#FFA500] mb-6">
              Pionierów 3, 68-205 Żary
            </p>
            <p className="mb-8">
              Łatwy dojazd i dostępny parking dla wszystkich uczestników.
            </p>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-[#66FF00] shadow-2xl shadow-[#66FF00]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2503.221580287119!2d15.13284057700259!3d51.62313670188056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470671a5c6785161%3A0x6758564e9a318e8!2sPionier%C3%B3w%203%2C%2068-205%20%C5%BBary%2C%20Poland!5e0!3m2!1sen!2sus!4v1719415849511!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja NadMaxnet Arena"
              ></iframe>
            </div>
        </div>
        <div className="mt-8 text-center">
            <button onClick={onClose} className="px-8 py-3 bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00] bg-[length:200%_auto] hover:bg-[right_center] text-white font-bold rounded-lg transition-all duration-500 transform hover:scale-105 shadow-lg shadow-[#66FF00]/20">
                Zamknij
            </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;