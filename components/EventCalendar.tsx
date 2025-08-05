import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import Section from './Section';

interface EventCalendarProps {
  eventName: string;
  eventDate: Date;
  eventDuration: string;
}

const CountdownItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="p-0.5 rounded-lg bg-gradient-to-br from-[#FFA500] to-[#66FF00] shadow-lg shadow-[#66FF00]/20">
    <div className="flex flex-col items-center justify-center bg-[#2A2A2A] p-4 md:p-6 rounded-md w-24 h-24 md:w-32 md:h-32">
        <span className="text-4xl md:text-5xl font-bold text-[#66FF00]">{String(value).padStart(2, '0')}</span>
        <span className="text-sm uppercase tracking-widest text-[#F0F0F0]/70">{label}</span>
    </div>
  </div>
);

const EventCalendar: React.FC<EventCalendarProps> = ({ eventName, eventDate, eventDuration }) => {
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  return (
    <Section id="kalendarz" title={eventName} subtitle={`Data: ${eventDuration}`}>
      <p className="text-xl md:text-2xl text-[#F0F0F0] mb-8">Do rozpoczęcia pozostało:</p>
      <div className="flex justify-center gap-4 md:gap-8">
        <CountdownItem value={days} label="Dni" />
        <CountdownItem value={hours} label="Godzin" />
        <CountdownItem value={minutes} label="Minut" />
        <CountdownItem value={seconds} label="Sekund" />
      </div>
    </Section>
  );
};

export default EventCalendar;