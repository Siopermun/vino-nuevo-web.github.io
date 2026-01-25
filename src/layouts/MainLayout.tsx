import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton'; // Importar el nuevo botón de WhatsApp
import { Container } from 'react-bootstrap';

import ScrollToTopButton from '../components/ScrollToTopButton'; // Importar el nuevo botón de subir

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main className="flex-grow-1 py-4 pt-5">
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
      <WhatsAppButton /> {/* Mover el botón de WhatsApp debajo del botón de subir */}
      <ScrollToTopButton /> {/* Añadir el botón de subir */}
    </div>
  );
};

export default MainLayout;
