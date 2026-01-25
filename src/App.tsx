import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

// Centered Spinner component for the fallback
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
    <Spinner animation="border" variant="primary" />
  </div>
);

// Lazy-load all the page components
const Home = React.lazy(() => import('./pages/Home'));
const QuienesSomos = React.lazy(() => import('./pages/QuienesSomos'));
const Vision = React.lazy(() => import('./pages/Vision'));
const Mision = React.lazy(() => import('./pages/Mision'));
const Eventos = React.lazy(() => import('./pages/Eventos'));
const ProgramasSociales = React.lazy(() => import('./pages/ProgramasSociales'));
const Predicas = React.lazy(() => import('./pages/Predicas'));
const Galerias = React.lazy(() => import('./pages/Galerias'));
const PeliculasCristianas = React.lazy(() => import('./pages/PeliculasCristianas'));
const LibrosPDF = React.lazy(() => import('./pages/LibrosPDF'));
const Contacto = React.lazy(() => import('./pages/Contacto'));
const Biblia = React.lazy(() => import('./pages/Biblia'));
const CursosYTalleres = React.lazy(() => import('./pages/CursosYTalleres'));
const Testimonios = React.lazy(() => import('./pages/Testimonios'));
const Donaciones = React.lazy(() => import('./pages/Donaciones')); // Lazy-load Donaciones
const Admin = React.lazy(() => import('./pages/Admin'));
const EventDetails = React.lazy(() => import('./pages/EventDetails')); // Lazy-load EventDetails
const GalleryAlbumDetails = React.lazy(() => import('./pages/GalleryAlbumDetails')); // Lazy-load GalleryAlbumDetails

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/mision" element={<Mision />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:id" element={<EventDetails />} /> {/* New route for event details */}
            <Route path="/programas-sociales" element={<ProgramasSociales />} />
            <Route path="/predicas" element={<Predicas />} />
            <Route path="/galerias" element={<Galerias />} />
            <Route path="/galerias/:id" element={<GalleryAlbumDetails />} /> {/* New route for gallery album details */}
            <Route path="/peliculas-cristianas" element={<PeliculasCristianas />} />
            <Route path="/libros-pdf" element={<LibrosPDF />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/biblia" element={<Biblia />} />
            <Route path="/cursos-y-talleres" element={<CursosYTalleres />} />
            <Route path="/testimonios" element={<Testimonios />} />
            <Route path="/donaciones" element={<Donaciones />} /> {/* Add route for Donaciones */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
