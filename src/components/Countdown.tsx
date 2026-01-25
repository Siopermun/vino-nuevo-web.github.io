import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  // Para una cuenta regresiva simbólica sin una fecha exacta
  const [message, setMessage] = useState("¡El tiempo se acaba, Cristo ya viene!");
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length === 3) return ".";
        return prevDots + ".";
      });
    }, 500); // Cambia los puntos cada 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center my-4">
      <p className="fs-2 fw-bold animate-pulse d-none d-sm-block" style={{ color: '#800020' }}>
        {message}{dots}
      </p>
      <p className="fs-3 fw-bold animate-pulse d-sm-none" style={{ color: '#800020' }}>
        {message}{dots}
      </p>
      <p className="lead fs-3 text-white-50">
        "Prepara tu corazón, el Rey está cerca."
      </p>
    </div>
  );
};

export default Countdown;
