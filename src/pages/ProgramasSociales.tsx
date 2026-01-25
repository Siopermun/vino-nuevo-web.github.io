import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHandHoldingHeart } from 'react-icons/fa';

// Placeholder data for social programs.
const programasData = [
  {
    id: 1,
    title: 'Comedor Comunitario "Pan de Vida"',
    description: 'Ofrecemos alimentos nutritivos a personas y familias de bajos recursos en nuestra comunidad, de lunes a viernes.',
    imageUrl: 'https://picsum.photos/id/219/400/300', // Placeholder image of food
  },
  {
    id: 2,
    title: 'Refuerzo Escolar "Semillitas"',
    description: 'Apoyo educativo gratuito para niños de primaria y secundaria, ayudándolos con sus tareas y preparándolos para un futuro brillante.',
    imageUrl: 'https://picsum.photos/id/225/400/300', // Placeholder image of children studying
  },
  {
    id: 3,
    title: 'Visitas a Asilos y Hospitales',
    description: 'Llevamos una palabra de aliento, oración y compañía a los ancianos y enfermos, recordándoles que no están solos.',
    imageUrl: 'https://picsum.photos/id/342/400/300', // Placeholder image of hands
  }
];

const ProgramasSociales = () => {
  return (
    <Container className="my-5">
      <title>Programas Sociales - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section for Social Programs Page */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center rounded-3 overflow-hidden">
        <Container>
          <h1 className="fw-bold mb-4 fs-3 fs-sm-2 fs-md-1">Nuestros Programas Sociales</h1>
          <p className="col-lg-8 mx-auto mb-3 fs-6 fs-sm-5">
            Manos que sirven, corazones que aman: transformando vidas en nuestra comunidad.
          </p>
          <div className="mt-2">
            <a href="/donaciones" className="btn btn-primary btn-sm">¡Colabora Ahora!</a>
          </div>
          <p className="mt-1 fs-6 fs-sm-5 text-shadow-sm">"Cada acto de amor y servicio refleja el corazón de Dios."</p>
        </Container>
      </div>



      <Row xs={1} md={2} lg={3} className="g-4 mt-5">
        {programasData.map(programa => (
          <Col key={programa.id}>
            <Card className="h-100 shadow card-book">
              <Card.Img variant="top" src={programa.imageUrl} alt={programa.title} />
              <Card.Body>
                <Card.Title>{programa.title}</Card.Title>
                <Card.Text>
                  {programa.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                                    <Button as="a" href="/donaciones" variant="outline-primary" className="btn-sm">
                                      <FaHandHoldingHeart className="me-2" />
                                      Participar o Donar
                                    </Button>              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center text-center mt-5">
        <Col>
          <p className="lead text-muted">
            "Tu participación y apoyo hacen posible que extendamos el amor de Cristo a quienes más lo necesitan."
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProgramasSociales;
