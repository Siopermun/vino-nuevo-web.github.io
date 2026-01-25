import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_INFO } from '../config';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const WhatsAppButton: React.FC = () => {
  const navigate = useNavigate(); // Obtener la función de navegación

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage

    if (!token) {
      e.preventDefault(); // Prevenir la acción por defecto del enlace
      navigate('/admin'); // Redirigir a la página de administración
    }
    // Si hay token, el enlace se abrirá normalmente gracias al href
  };

  return (
    <a 
      href={CONTACT_INFO.whatsappLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={handleWhatsAppClick} // Añadir el manejador de clic
      style={{
        position: 'fixed',
        bottom: '20px', // Posición en la parte inferior
        right: '20px',
        backgroundColor: '#25D366', // Color de WhatsApp
        color: 'white',
        borderRadius: '50%',
        width: '40px', // Nuevo tamaño
        height: '40px', // Nuevo tamaño
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px', // Nuevo tamaño de fuente del icono
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        textDecoration: 'none', // Para eliminar el subrayado del enlace
      }}
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;