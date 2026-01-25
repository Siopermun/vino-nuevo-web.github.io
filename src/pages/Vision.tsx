// UNIQUE_COMMENT_TO_VERIFY_SAVE_APPLY_ISSUE_12345
import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { FaBullseye, FaHeart, FaCross, FaHandHoldingHeart, FaBookOpen, FaPaperPlane } from 'react-icons/fa';

const Vision = () => {
  return (
    <Container className="my-5">
      <title>Nuestra Visión - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="vision-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Nuestra Visión</h1>
            <p className="px-4 fs-6 fs-sm-5">Conoce el corazón y el propósito de nuestra iglesia.</p>
            <div className="mt-4">
                              <a href="/vision" className="btn btn-light btn-sm">Descubre Nuestro Propósito</a>            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"Dios tiene un plan asombroso para ti. ¡Queremos ayudarte a encontrarlo!"</p>
          </div>
        </Col>
      </Row>

      {/* Nuestra Visión Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <blockquote className="blockquote bg-light p-4 rounded shadow-sm">
            <p className="mb-0">"Yo pues, preso en el Señor, os ruego que anéis como es digno de la vocación con que fuisteis llamados, con toda humildad y mansedumbre, soportándoos con paciencia los unos a los otros en amor, solícitos en guardar la unidad del Espíritu en el vínculo de la paz; un cuerpo, y un Espíritu, como fuisteis también llamados en una misma esperanza de vuestra vocación; un Señor, una fe, un bautismo, un Dios y Padre de todos, el cual es sobre todos, y por todos, y en todos."</p>
            <footer className="blockquote-footer mt-2">Efesios 4:1-6</footer>
          </blockquote>
        </Col>
        <Col md={6}>
          <h2 className="mb-3"><FaBullseye className="me-2" />Nuestra Visión</h2>
          <p className="lead">
            Ser una luz transformadora en nuestra comunidad y más allá, alcanzando almas para Cristo y discipulándolas en su Palabra.
          </p>
          <p>
            Anhelamos ver a cada creyente empoderado por el Espíritu Santo, viviendo una vida de propósito, impactando sus entornos familiares, laborales y sociales. Buscamos establecer el Reino de Dios a través de un servicio apasionado, una adoración genuina y la proclamación valiente del evangelio.
          </p>
          <p>
            Queremos ser una iglesia relevante, que responda a las necesidades de la gente, ofreciendo esperanza, restauración y un camino hacia una relación viva con Jesús.
          </p>
          <div className="mt-4">
            <a href="/eventos" className="btn btn-primary btn-sm">¡Sé Parte de Nuestra Visión!</a>
          </div>
          <p className="mt-3 text-muted">"Juntos, hacemos la diferencia en el mundo."</p>
        </Col>
      </Row>

      {/* Nuestra Misión Section - Aggressive Debugging */}
      <Row className="mb-5">
        <Col md={12}> {/* Full width to ensure visibility */}
          <div className="mission-sub-hero-section" style={{ backgroundColor: 'red', border: '5px solid blue' }}> {/* Aggressive inline styling */}
            <h2 className="mb-3"><FaHeart className="me-2" />Nuestra Misión</h2>
            <p className="lead">
              Nuestra misión es glorificar a Dios al hacer discípulos de todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; y enseñándoles que guarden todas las cosas que Jesús nos ha mandado.
            </p>
            <Card className="card-book mission-card-content mt-4"> {/* Kept Card for testing, but outside direct content of sub-hero */}
              <Card.Body>
                <Card.Title className="text-center">Cómo cumplimos nuestra misión:</Card.Title>
                <ul className="list-unstyled text-start">
                  <li><FaHandHoldingHeart className="me-2" /><strong>Alcanzar:</strong> Llevar el evangelio a los perdidos.</li>
                  <li><FaBookOpen className="me-2" /><strong>Enseñar:</strong> Discipular a los creyentes en la Palabra de Dios.</li>
                  <li><FaPaperPlane className="me-2" /><strong>Enviar:</strong> Equipar y enviar a los creyentes para servir.</li>
                </ul>
              </Card.Body>
            </Card>
            <div className="mt-4 text-center">
              <a href="/programas-sociales" className="btn btn-primary btn-sm">¡Participa en Nuestra Misión!</a>
            </div>
            <p className="mt-3 text-white text-center">"Dios nos llama a transformar vidas. ¡Descubre cómo puedes unirte!"</p>
          </div>
        </Col>
      </Row>

      {/* Nuestros Valores Section */}
      <Row>
        <Col>
          <h2 className="text-center mb-4"><FaCross className="me-2" />Nuestros Valores</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            <Col>
              <Card className="h-100 text-center card-book">
                <Card.Body>
                  <Card.Title>Amor</Card.Title>
                  <Card.Text>
                    El amor es el centro de todo lo que hacemos. Amamos a Dios y amamos a nuestro prójimo.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 text-center card-book">
                <Card.Body>
                  <Card.Title>Fe</Card.Title>
                  <Card.Text>
                    Creemos en el poder de Dios para transformar vidas y confiamos en sus promesas.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 text-center card-book">
                <Card.Body>
                  <Card.Title>Servicio</Card.Title>
                  <Card.Text>
                    Servimos a otros con humildad y alegría, siguiendo el ejemplo de Jesús.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center text-center my-5">
        <Col>
          <p className="lead text-muted mb-4">
            "Nuestros valores nos guían. ¡Conócelos y vive una vida de propósito!"
          </p>
          <a href="/quienes-somos" className="btn btn-primary btn-sm">¡Conoce Más!</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Vision;