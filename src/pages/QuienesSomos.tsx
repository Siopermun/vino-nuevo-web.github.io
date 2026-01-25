import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaHeart, FaHandsHelping, FaLightbulb, FaPray } from 'react-icons/fa'; // Import some icons
import usePageTitle from '../hooks/usePageTitle';

const QuienesSomos = () => { // Renamed from QuienesSomosPage to QuienesSomos
  usePageTitle('Quiénes Somos - Vino Nuevo en Odres Nuevo');
  const [ministryContent, setMinistryContent] = useState({
    title: '',
    lead: '',
    ministryName: '',
    scope: ''
  });

  // Hardcoded values for "Nuestros Valores" section
  const ministryValues = [
    {
      id: 1,
      icon: <FaHeart size={40} className="text-primary mb-3" />,
      title: 'Amor Incondicional',
      description: 'Creemos en el amor de Dios que abarca a todos, y buscamos reflejar ese amor en nuestras acciones diarias y en nuestra comunidad.'
    },
    {
      id: 2,
      icon: <FaHandsHelping size={40} className="text-primary mb-3" />,
      title: 'Servicio al Prójimo',
      description: 'Estamos comprometidos con el servicio desinteresado a nuestra comunidad, siguiendo el ejemplo de Jesús.'
    },
    {
      id: 3,
      icon: <FaLightbulb size={40} className="text-primary mb-3" />,
      title: 'Verdad y Sabiduría',
      description: 'Buscamos la verdad en la Palabra de Dios y la aplicamos con sabiduría en cada aspecto de nuestras vidas.'
    },
    {
      id: 4,
      icon: <FaPray size={40} className="text-primary mb-3" />,
      title: 'Fe y Esperanza',
      description: 'Nuestra fe en Dios es la fuente de nuestra esperanza, inspirándonos a creer en un futuro mejor y a compartir esa esperanza.'
    },
  ];

  const [pastors, setPastors] = useState([]); // Pastors data will be fetched if needed elsewhere, keeping the state for now.

  useEffect(() => {
    // Fetch ministry content
    fetch('http://localhost:3001/api/content/quienesSomos')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setMinistryContent(data);
      })
      .catch(err => {
        console.error("Error fetching ministry content:", err);
      });

    // Fetch pastors (keeping this for consistency with the reverted state, though it's not rendered here anymore)
    fetch('http://localhost:3001/api/content/pastors')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched pastors data:', data);
        if (Array.isArray(data.data)) { // Acceder a data.data
          setPastors(data.data);
        } else {
          setPastors([]);
        }
      })
      .catch(err => {
        console.error("Error fetching pastors:", err);
        setPastors([]);
      });
  }, []);

  return (
    <Container className="my-5">
      <title>Quiénes Somos - Vino Nuevo en Odres Nuevo</title>
      
      {/* Hero Section for Ministry Information */}
      <Row className="mb-5">
        <Col>
          <div className="quienes-somos-hero-section d-flex align-items-center justify-content-center text-center text-white">
            <div>
              {ministryContent.title && <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">{ministryContent.title}</h1>}
              {ministryContent.lead && <p className="px-4 fs-6 fs-sm-5">{ministryContent.lead}</p>}
              {ministryContent.ministryName && (
                <p className="text-primary mt-4 fs-5 fs-sm-4">
                  {ministryContent.ministryName}
                </p>
              )}
              {ministryContent.scope && (
                <p className="px-4 fs-6 fs-sm-5">
                  {ministryContent.scope}
                </p>
              )}
              <div className="mt-4">
                <a href="/contacto" className="btn btn-light btn-sm">¡Únete a Nuestra Familia!</a>
              </div>
              <p className="mt-3 fs-5 text-shadow-sm">"Descubre el propósito de Dios para tu vida en nuestra comunidad."</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Pastors Section (currently reverted to original display) */}
      <Row className="justify-content-center text-center">
        <Col>
          <h2 className="mb-5">Nuestros Pastores</h2>
          <div className="mt-4 mb-4">
            <a href="/quienes-somos" className="btn btn-outline-primary btn-sm">Conoce al Equipo Pastoral</a>
          </div>
          <p className="lead text-muted">"Nuestros pastores guían con amor y sabiduría, siempre dispuestos a servir."</p>
        </Col>
      </Row>
      <Row className="justify-content-center g-4">
        {pastors.map(pastor => (
          <Col md={6} lg={4} key={(pastor as any).id}>
            <Card className="h-100 shadow-sm value-card-border-primary text-center">
              <div className="d-flex justify-content-center">
                <Image
                  src={(pastor as any).image || 'https://via.placeholder.com/250x250/800020/FFFFFF?text=Foto'}
                  alt={`Foto de ${(pastor as any).name}`}
                  roundedCircle
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  className="p-3"
                  loading="lazy"
                />
              </div>
              <Card.Body>
                <Card.Title className="h4">{(pastor as any).name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{(pastor as any).role}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Nuestros Valores Section */}
      <Row className="justify-content-center text-center my-5">
        <Col>
          <h2 className="mb-5 display-5 fw-bold">Nuestros Valores</h2>
        </Col>
      </Row>
      <Row className="justify-content-center g-4 mb-5">
        {ministryValues.map(value => (
          <Col xs={12} md={6} lg={3} key={value.id}>
            <Card className="h-100 shadow-sm value-card-border-primary p-4 d-flex flex-column align-items-center justify-content-center">
              {value.icon}
              <Card.Body>
                <Card.Title className="h5 fw-bold">{value.title}</Card.Title>
                <Card.Text className="text-muted">
                  {value.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
            </Row>
            <Row className="justify-content-center text-center my-5">
              <Col>
                <p className="lead text-muted mb-4">
                  "Nuestros valores son el cimiento de nuestra fe y comunidad. ¡Descubre cómo vivimos el evangelio!"
                </p>
                <a href="/programas-sociales" className="btn btn-primary btn-sm">¡Vívelos con Nosotros!</a>
              </Col>
            </Row>
          </Container>
        );
      };

export default QuienesSomos;
