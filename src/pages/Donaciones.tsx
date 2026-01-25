import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaHandsHelping, FaHandHoldingUsd, FaBox, FaPills, FaBook, FaGraduationCap, FaWhatsapp } from 'react-icons/fa';
import usePageTitle from '../hooks/usePageTitle'; // Import usePageTitle
import { CONTACT_INFO } from '../config'; // Assuming contact info is available

const Donaciones = () => {
  usePageTitle('Donaciones y Ofrendas - Vino Nuevo en Odres Nuevos'); // Add usePageTitle
  return (
    <Container className="my-5">
      <title>Donaciones y Ofrendas - Vino Nuevo en Odres Nuevos</title>

      {/* Hero Section for Donations */}
      <Row className="mb-5">
        <Col>
          <div className="donaciones-hero-section d-flex align-items-center justify-content-center text-center text-white">
            <div>
              <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Donaciones y Ofrendas</h1>
              <p className="px-4 fs-6 fs-sm-5">Tu apoyo transforma vidas y expande el Reino de Dios</p>
              <div className="mt-4">
                <a href="/donaciones" className="btn btn-light btn-lg">¡Haz tu Donación Ahora!</a>
              </div>
              <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"Tu generosidad siembra esperanza y cosecha bendiciones."</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Introduction Paragraphs */}
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}> {/* Maintain responsiveness */}
          <Card className="p-4 shadow-lg donation-intro-card card-book"> {/* Added custom class for styling */}
            <Card.Body>
              <p className="text-center fs-5">
                En el Ministerio Apostólico, Misionero y Profético "Vino Nuevo en Odres Nuevos", creemos firmemente en el poder de dar y recibir. Cada donación, grande o pequeña, material o monetaria, es una semilla plantada en tierra fértil que nos permite continuar con nuestra misión de llevar esperanza, fe y amor a la comunidad, tanto a nivel local como internacional.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8} className="text-center">
          <p className="fs-5 text-muted">
            "Dios ama al dador alegre, y cada contribución es un acto de adoración que bendice a muchos."
          </p>
        </Col>
      </Row>

      {/* Tipos de Ofrenda */}
      <Row className="justify-content-center mb-5 g-4">
        <Col md={10} lg={8} className="text-center">
          <h3 className="mb-4 fw-bold">¿Cómo puedes apoyar nuestro Ministerio?</h3>
          <p className="lead text-muted mb-4">
            "Tu generosidad es fundamental para que podamos seguir llevando el mensaje de esperanza y amor."
            Como congregación sin fines de lucro, dependemos de tu apoyo para continuar nuestra obra.
          </p>
        </Col>
        <Col xs={12}>
          <Row className="justify-content-center g-4">
            <Col sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm value-card-border-primary text-center">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Header className="bg-transparent border-0 pb-0">
                    <p className="small text-muted mb-0">"Cada uno dé como propuso en su corazón"</p>
                  </Card.Header>
                  <FaHandHoldingUsd size={40} className="text-success mb-3" />
                  <Card.Title className="h5">Ofrenda Monetaria</Card.Title>
                  <Card.Text className="small text-muted">Apoya económicamente nuestros proyectos.</Card.Text>
                  <div className="mt-auto"> {/* Push button to bottom */}
                    <Button
                      variant="primary" // Changed to primary
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Donaciones' y estoy interesado en realizar una ofrenda monetaria.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm mt-3"
                    >
                      <FaWhatsapp className="me-1" /> Contactar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm value-card-border-primary text-center">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Header className="bg-transparent border-0 pb-0">
                    <p className="small text-muted mb-0">"Cada uno dé como propuso en su corazón"</p>
                  </Card.Header>
                  <FaBox size={40} className="text-info mb-3" />
                  <Card.Title className="h5">Ropa y Comida</Card.Title>
                  <Card.Text className="small text-muted">Tu donación de ropa y alimentos ayuda directamente a familias necesitadas. ¡Cada prenda y plato cuenta!</Card.Text>
                  <div className="mt-auto"> {/* Push button to bottom */}
                    <Button
                      variant="primary" // Changed to primary
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Donaciones' y estoy interesado en donar ropa y comida.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm mt-3"
                    >
                      <FaWhatsapp className="me-1" /> Contactar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm value-card-border-primary text-center">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Header className="bg-transparent border-0 pb-0">
                    <p className="small text-muted mb-0">"Cada uno dé como propuso en su corazón"</p>
                  </Card.Header>
                  <FaPills size={40} className="text-danger mb-3" />
                  <Card.Title className="h5">Medicinas</Card.Title>
                  <Card.Text className="small text-muted">Proporciona ayuda vital a quienes no pueden acceder a tratamientos. ¡Un acto de compasión que salva vidas!</Card.Text>
                  <div className="mt-auto"> {/* Push button to bottom */}
                    <Button
                      variant="primary" // Changed to primary
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Donaciones' y estoy interesado en donar medicinas.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm mt-3"
                    >
                      <FaWhatsapp className="me-1" /> Contactar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm value-card-border-primary text-center">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Header className="bg-transparent border-0 pb-0">
                    <p className="small text-muted mb-0">"Cada uno dé como propuso en su corazón"</p>
                  </Card.Header>
                  <FaBook size={40} className="text-warning mb-3" />
                  <Card.Title className="h5">Biblias y Material</Card.Title>
                  <Card.Text className="small text-muted">Ayuda a sembrar la Palabra de Dios y recursos educativos para el crecimiento espiritual.</Card.Text>
                  <div className="mt-auto"> {/* Push button to bottom */}
                    <Button
                      variant="primary" // Changed to primary
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Donaciones' y estoy interesado en donar Biblias y material.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm mt-3"
                    >
                      <FaWhatsapp className="me-1" /> Contactar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm value-card-border-primary text-center">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Header className="bg-transparent border-0 pb-0">
                    <p className="small text-muted mb-0">"Cada uno dé como propuso en su corazón"</p>
                  </Card.Header>
                  <FaGraduationCap size={40} className="text-primary mb-3" />
                  <Card.Title className="h5">Cursos y Apoyo</Card.Title>
                  <Card.Text className="small text-muted">Tu contribución financia materiales y recursos para cursos y talleres, fomentando el crecimiento espiritual de nuestra comunidad.</Card.Text>
                  <div className="mt-auto"> {/* Push button to bottom */}
                    <Button
                      variant="primary" // Changed to primary
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Donaciones' y estoy interesado en donar material para cursos y apoyo.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm mt-3"
                    >
                      <FaWhatsapp className="me-1" /> Contactar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Opciones de Donación Monetaria */}
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}>
          <h3 className="text-center mb-4 fw-bold"><FaHandHoldingUsd className="me-2"/>Donaciones Económicas</h3>
          <p className="lead text-center text-muted mb-4">
            "Cada ofrenda monetaria es una semilla de fe que florecerá en bendiciones."
          </p>
          <Card className="shadow-sm p-4 text-center card-book">
            <Card.Body>
              <Card.Text className="fs-5">
                Puedes realizar tu ofrenda o donación a través de las siguientes vías:
              </Card.Text>
              <ul className="list-unstyled mb-4 fs-5">
                <li><strong>Transferencia Bancaria:</strong></li>
                <li>Banco: [Nombre del Banco]</li>
                <li>Cuenta Corriente: [Número de Cuenta]</li>
                <li>RIF/Cédula: [RIF/Cédula del Ministerio]</li>
                <li>Email: [Email del Ministerio]</li>
              </ul>
              <Card.Text className="fs-5">
                O si prefieres, utiliza nuestra plataforma de pago seguro:
              </Card.Text>
              <Button variant="success" href="/contacto" className="rounded-pill btn-lg mt-3">
                <FaHeart className="me-2" /> Donar con [Plataforma de Pago]
              </Button>
              <p className="mt-3 text-muted small">
                *Tus datos financieros están siempre seguros y protegidos.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contacto para Donaciones Materiales */}
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h3 className="text-center mb-4 fw-bold"><FaBox className="me-2"/>Donaciones Materiales</h3>
          <p className="lead text-center text-muted mb-4">
            "Tu aporte material es una extensión de amor que suple necesidades reales en nuestra comunidad."
          </p>
          <Card className="shadow-sm p-4 text-center card-book">
            <Card.Body>
              <Card.Text className="fs-5">
                Para coordinar la entrega de ropa, alimentos, medicinas, Biblias, material de apoyo o cursos, por favor, ponte en contacto con nosotros:
              </Card.Text>
                            <Button
                              variant="success"
                              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Donaciones Materiales' y me gustaría coordinar una donación física.")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-pill btn-lg mt-3"
                            >
                              <FaWhatsapp className="me-2" /> Enviar Mensaje por WhatsApp
                            </Button>              <p className="mt-3 text-muted small">
                Te estaremos esperando para recibir tu valiosa contribución. ¡Dios te bendiga!
              </p>
              <p className="mt-4 fs-5 fw-bold text-success"> {/* Added new phrase */}
                Gracias a tu apoyo, este mes ayudamos a más familias. ¡Impactando vidas juntos!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default Donaciones;
