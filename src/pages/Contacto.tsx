import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPaperPlane, FaDirections } from 'react-icons/fa';
import { CONTACT_INFO } from '../config';
import usePageTitle from '../hooks/usePageTitle';

const Contacto = () => {
  usePageTitle('Contacto - Vino Nuevo en Odres Nuevo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    let errors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
      isValid = false;
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      errors.email = 'El formato del correo electrónico no es válido.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es obligatorio.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(null);
    setFormErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (validateForm()) {
      const { name, email, message } = formData;
      const whatsappNumber = CONTACT_INFO.whatsappNumber;
      const whatsappMessage = `¡Hola! Mi nombre es ${name} y mi correo es ${email}. Te escribo desde la página de contacto con el siguiente mensaje: ${message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappUrl, '_blank');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus(null), 5000);

    } else {
      setStatus('error');
    }
  };

  return (
    <Container className="my-5">
      <title>Contacto - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section for Contact */}
      <Row className="mb-5">
        <Col>
          <div className="contact-hero-section d-flex align-items-center justify-content-center text-center text-white">
            <div>
              <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Ponte en Contacto con Nosotros</h1>
              <p className="px-4 fs-6 fs-sm-5">Nos encantaría saber de ti y responder a tus preguntas.</p>
              <div className="mt-4">
                <a href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent("Hola, te escribo desde la sección de 'Contacto' y me gustaría obtener más información.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm">¡Envíanos un Mensaje!</a>
              </div>
              <p className="text-center mt-3 fs-6 fs-sm-5 fst-italic">"Me buscarán y me encontrarán, cuando me busquen de todo corazón." <br/> - Jeremías 29:13</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Contact Info and Form Row */}
      <Row className="justify-content-center g-5 align-items-stretch">
        
        {/* Left Column: Location */}
        <Col md={10} lg={5} className="bg-light p-4 rounded shadow-sm value-card-border-primary h-100 d-flex flex-column">
          <div>
            <div className="mb-4">
              <h3 className="mb-3"><FaMapMarkerAlt className="me-2 text-primary"/>Nuestra Ubicación</h3>
              <p className="lead text-center">
                <strong>Dirección:</strong><br/>
                Parroquia Coche, La Rinconada, Urbanismo Cristo Rey, Calle Filipenses 4.13, Caracas, Venezuela.
              </p>
              <p className="text-muted small mt-2 text-center">
                ¡Encuéntranos fácilmente! Tu presencia es una bendición.
              </p>
              <p className="text-muted small mt-2">
                ¡Encuéntranos fácilmente! Tu presencia es una bendición.
              </p>
            </div>
            <div className="mb-4">
              <iframe
                src="https://maps.google.com/maps?q=10.5075,-66.93483&hl=es&z=14&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Ubicación de Vino Nuevo en Odres Nuevo"
              ></iframe>
            </div>
          </div>
          <Button variant="outline-primary" href="https://www.google.com/maps/dir/?api=1&destination=10.5075,-66.93483" target="_blank" rel="noopener noreferrer" className="w-100 rounded-pill mt-auto btn-sm">
            <FaDirections className="me-2" />
            Obtener Direcciones
          </Button>
        </Col>

        {/* Right Column: Contact Form */}
        <Col md={10} lg={6}>
          {status === 'success' && <Alert variant="success" className="text-center">¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.</Alert>}
          {status === 'error' && <Alert variant="danger" className="text-center">Por favor, corrige los errores en el formulario.</Alert>}

          <Form onSubmit={ handleSubmit } className="shadow p-4 p-lg-5 rounded bg-white value-card-border-primary h-100 d-flex flex-column">
            <div>
              <h3 className="text-center mb-4 text-primary"><FaEnvelope className="me-2" />Envíanos un Mensaje</h3>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!formErrors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@ejemplo.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!formErrors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={9}
                  placeholder="Escribe tu mensaje aquí..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!formErrors.message}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Button variant="primary" type="submit" className="w-100 rounded-pill mt-auto btn-sm">
              <FaPaperPlane className="me-2" />Enviar Mensaje
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;