import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const Mision = () => {
  return (
    <Container className="my-5">
      <title>Nuestra Misión - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section for Mission Page */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center rounded-3 overflow-hidden">
        <Container>
          <h1 className="fw-bold mb-4 fs-3 fs-sm-2 fs-md-1">Nuestra Misión</h1>
          <p className="col-lg-8 mx-auto mb-3 fs-6 fs-sm-5">
            Llevando el evangelio de Jesucristo y transformando vidas a través del servicio y el amor.
          </p>
          <div className="mt-2">
            <a href="/programas-sociales" className="btn btn-primary btn-sm">¡Participa en Nuestra Obra!</a>
          </div>
          <p className="mt-1 fs-6 fs-sm-5 text-shadow-sm">"Dios nos capacita para impactar nuestro mundo. ¡Únete!"</p>
        </Container>
      </div>

      <Row className="mt-5 align-items-stretch">
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm h-100" style={{ borderColor: '#800020', borderWidth: '2px', borderStyle: 'solid' }}>
            <Card.Body>
              <Card.Title className="text-center h4 mb-3">Nuestra Misión</Card.Title>
              <p className="lead">
                Nuestra misión es llevar el evangelio de Jesucristo a cada rincón, transformando vidas a través de la enseñanza de la Palabra, la alabanza y la adoración, y el servicio incondicional a nuestros hermanos.
              </p>
              <p>
                Nos enfocamos en predicar el evangelio a nuestros vecinos y en educarlos en el ámbito espiritual.
                Además, ofrecemos cursos gratuitos en la congregación para que aprendan un oficio, beneficiando a la comunidad (por ejemplo, dictamos cursos de reparación y mantenimiento de computadoras).
                También tenemos actividades y servicios dedicados a los niños.
              </p>
              <p>
                Nos comprometemos a nutrir a nuestros miembros en la fe, proporcionando herramientas para su crecimiento espiritual y equipándolos para ser discípulos efectivos de Cristo en su vida diaria. Fomentamos un ambiente de amor, aceptación y compañerismo, donde cada persona pueda encontrar su lugar y desarrollar sus dones.
              </p>
              <p>
                También nos dedicamos a extender el amor de Dios a través de obras de misericordia, programas de alcance social y apoyo a los más necesitados, demostrando el corazón de Cristo en acción.
              </p>
              <div className="mt-4 text-center">
                <a href="/programas-sociales" className="btn btn-primary btn-sm">¡Únete a Nuestra Misión!</a>
              </div>
              <p className="mt-3 text-muted">"Sé parte de algo grande. ¡Tu ayuda transforma vidas!"</p>
            </Card.Body>
          </Card>
        </Col>

      </Row>
      {/* Banner Section from Home */}
      <Container className="my-5">
        <div className="banner-section" style={{ backgroundImage: `url('/banner-background.jpg')` }}>
          <h3 className="text-white text-center">¡Únete a Nuestra Comunidad!</h3>
          <p className="text-white text-center">Descubre nuestras actividades y cómo puedes participar.</p>
          <div className="mt-4 text-center">
            <a href="/eventos" className="btn btn-warning btn-sm">¡Explora Nuestros Eventos!</a>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Mision;
