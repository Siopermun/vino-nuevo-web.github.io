import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TestimonioCard from '../components/TestimonioCard';

interface Testimony {
  id: number;
  name: string;
  story: string;
  image: string;
}

// Placeholder data for testimonies.
const testimoniesData: Testimony[] = [
  {
    id: 1,
    name: 'Ana María G.',
    story: 'Llegué a la iglesia buscando consuelo y encontré una familia. Dios restauró mi matrimonio y hoy sirvo con alegría.',
    image: 'https://placehold.co/80x80/png?text=Ana'
  },
  {
    id: 2,
    name: 'Roberto C.',
    story: 'Mi vida no tenía rumbo, pero a través de las enseñanzas de Vino Nuevo, encontré mi propósito en Cristo.',
    image: 'https://placehold.co/80x80/png?text=Roberto'
  },
  {
    id: 3,
    name: 'Familia R.',
    story: 'Nuestros hijos están creciendo en la fe gracias al ambiente sano y las actividades para niños que ofrece la iglesia.',
    image: 'https://placehold.co/80x80/png?text=Familia'
  }
];

const Testimonios: React.FC = () => {
  return (
    <>
      <div className="mt-5 hero-section text-center text-white d-flex align-items-center justify-content-center rounded-3 overflow-hidden">
        <Container>
          <h1 className="fw-bold mb-4 fs-3 fs-sm-2 fs-md-1">Testimonios de Fe</h1>
          <p className="col-lg-8 mx-auto mb-5 fs-6 fs-sm-5">
            Historias reales de cómo Dios está obrando milagros y transformando vidas.
          </p>
          <div className="mt-4">
                          <a href="/contacto" className="btn btn-light btn-sm">¡Comparte Tu Historia!</a>          </div>
          <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"Tu testimonio puede inspirar y fortalecer la fe de otros."</p>
        </Container>
      </div>
      <Container className="my-5">
        <title>Testimonios - Vino Nuevo en Odres Nuevo</title>
        <p className="lead text-center mb-5">
          "Cada testimonio es un faro de esperanza que ilumina el poder transformador de Dios."
        </p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {testimoniesData.map((testimony: Testimony) => (
            <TestimonioCard key={testimony.id} testimony={testimony} />
          ))}
        </Row>
        {/* Call to Action for Non-Christians */}
        <Row className="my-5 justify-content-center">
          <Col md={8} className="text-center">
            <p className="text-center lead text-muted mb-4">
              "La transformación de estas vidas es solo una muestra de lo que Dios puede hacer en la tuya."
            </p>
            <h2 className="mb-3">¿Aún no eres cristiano?</h2>
            <p className="lead mb-4">
              Te invitamos a conocer más sobre la fe en Jesús y cómo puede transformar tu vida.
              Estamos aquí para acompañarte en este camino.
            </p>
            <Button variant="primary" size="sm" href="/quienes-somos">
              Descubre Más Sobre Nuestra Fe
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Testimonios;
