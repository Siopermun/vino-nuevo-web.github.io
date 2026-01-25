import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Show if scrolled beyond 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="primary" // Puedes cambiar el color si lo deseas
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Subir al inicio de la página"
      style={{
        zIndex: 1000,
        borderRadius: '50%',
        width: '40px', // Nuevo tamaño
        height: '40px', // Nuevo tamaño
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px', // Nuevo tamaño de fuente del icono
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        bottom: '70px', // Ajustado para que esté encima del botón de WhatsApp (40px alto + 20px bottom + 10px espacio)
        padding: '0', // Añadir para asegurar que no haya padding interno que lo deforme
      }}
    >
      <FaArrowUp />
    </Button>
  );
};

export default ScrollToTopButton;
