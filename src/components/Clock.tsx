import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatDateTime = (date: Date): string => {
    const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = date.toLocaleDateString('es-ES', optionsDate);
    const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="hero-clock">
      <p className="fs-6">{formatDateTime(time)}</p>
    </div>
  );
};

export default Clock;
