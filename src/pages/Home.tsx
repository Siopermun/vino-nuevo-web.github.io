import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaBookOpen, FaInfoCircle } from 'react-icons/fa';
import ActionCard from '../components/ActionCard';
import Clock from '../components/Clock'; // Mantener si Clock se usa en otro lugar, pero lo quitaremos del JSX
import Countdown from '../components/Countdown'; // Importar el nuevo componente de cuenta regresiva
import usePageTitle from '../hooks/usePageTitle';
import { CONTACT_INFO } from '../config';

const Home = () => {
  usePageTitle('Iglesia Vino Nuevo en Odres Nuevo - Fe, Comunidad y Amor');
  const [content, setContent] = useState({ title: '', subtitle: '' });
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetch('http://localhost:3001/api/content/home')
        .then(res => res.json())
        .then(data => {
          setContent(data);
          console.log('Home content fetched:', data); // Log para verificar el contenido
        })
        .catch(err => console.error("Error fetching content:", err));
      hasFetched.current = true;
    }
  }, []);

  console.log('Rendering Home with content:', content); // Log para verificar el contenido antes del render

  return (
    <>
      {/* Hero Section */}
      <div className="mt-5 hero-section text-center text-white d-flex align-items-center justify-content-center rounded-3 overflow-hidden">
        <Container>
          <h1 className="fw-bold mb-3 hero-title" dangerouslySetInnerHTML={{ __html: content.title }}></h1>

          <Countdown />
          <p className="lead col-lg-8 mx-auto mb-3 fs-6 fs-sm-5">
            {content.subtitle}
          </p>
          <div className="mt-2 d-grid gap-2 d-md-block"> {/* Utilizar d-grid para apilar en móvil y gap para separación */}
            <a href="/quienes-somos" className="btn btn-primary btn-sm me-md-3 mb-2 mb-md-0">¡Conoce Más!</a> {/* Reducir a btn-sm, ajustar margen */}
            <a href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección 'Inicio' y estoy interesado en unirme a la comunidad.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm">¡Únete a la Comunidad!</a> {/* Reducir a btn-sm */}
          </div>

        </Container>
      </div>

            {/* Introduction Section */}
            <Container className="my-5">
              <Row className="justify-content-center">
                <Col md={10} lg={8} className="text-center">
                  <h2 className="mb-4">Una Iglesia para Toda la Familia</h2>
                  <p className="lead text-muted">
                    Somos una familia en Cristo, apasionada por su presencia y dedicada a compartir su amor incondicional. Aquí encontrarás enseñanzas bíblicas relevantes para tu vida, una adoración que inspira y amistades que perduran.
                  </p>
                  <div className="mt-4">
                    <a href="/vision" className="btn btn-primary btn-sm">¡Descubre Nuestras Creencias!</a>
                  </div>
                  <p className="mt-3 fs-5 text-muted">"Un lugar donde crecer en la fe y encontrar propósito."</p>
                </Col>
              </Row>
            </Container>
      
            {/* Banner Section */}
            <Container className="my-5">
              <div className="banner-section" style={{ backgroundImage: `url('/banner-background.jpg')` }}>
                <h3 className="text-white text-center">¡Únete a Nuestra Comunidad!</h3>
                <p className="text-white text-center">Descubre nuestras actividades y cómo puedes participar.</p>
                <div className="mt-4 text-center">
                  <a href="/eventos" className="btn btn-warning btn-sm">¡Explora Nuestros Eventos!</a>
                </div>
              </div>
            </Container>
            
            {/* Call to Action Cards */}
            <Container className="my-5">
              <Row xs={1} md={3} className="g-4">
                <Col>
                  <ActionCard
                    icon={<FaCalendarAlt size={50} className="text-primary mb-3" />}
                    title="Eventos"
                    text="Descubre nuestras próximas conferencias, campamentos y actividades especiales para toda la familia."
                    linkTo="/eventos"
                    buttonText="Ver Eventos"
                  />
                </Col>
                <Col>
                  <ActionCard
                    icon={<FaBookOpen size={50} className="text-primary mb-3" />}
                    title="Prédicas"
                    text="Aliméntate de la Palabra de Dios con nuestros mensajes más recientes, disponibles en video."
                    linkTo="/predicas"
                    buttonText="Ver Prédicas"
                  />
                </Col>
                <Col>
                  <ActionCard
                    icon={<FaInfoCircle size={50} className="text-primary mb-3" />}
                    title="Sobre Nosotros"
                    text="Conoce nuestra historia, en qué creemos y el propósito que Dios nos ha encomendado."
                    linkTo="/quienes-somos"
                    buttonText="Leer Más"
                  />
                </Col>
              </Row>
            </Container>    </>
  );
};

export default Home;
