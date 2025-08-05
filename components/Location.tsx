import React from 'react';
import Section from './Section';

const Location: React.FC = () => {
  return (
    <Section id="dojazd" title="Jak dojechać do NadMaxnet Arena?">
      <div className="text-lg text-[#F0F0F0]">
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
    </Section>
  );
};

export default Location;