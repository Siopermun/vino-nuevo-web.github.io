import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';

const Eventos = () => {
  usePageTitle('Eventos - Vino Nuevo en Odres Nuevo');
  const [eventsData, setEventsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchEvents = (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    fetch(`http://localhost:3001/api/content/events?page=${pageNum}&limit=6`)
      .then(res => res.json())
      .then(data => {
        setEventsData(prev => pageNum === 1 ? data.data : [...prev, ...data.data]);
        setTotalEvents(data.total);
        setPage(pageNum);
      })
      .catch(err => console.error("Error fetching events:", err))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const handleLoadMore = () => {
    fetchEvents(page + 1);
  };

  return (
    <Container className="my-5">
      <title>Eventos - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="eventos-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Próximos Eventos</h1>
            <p className="px-4 fs-6 fs-sm-5">No te pierdas nuestras próximas actividades.</p>
            <div className="mt-4">
                              <a href="#lista-eventos" className="btn btn-light btn-sm">¡Ver Calendario Completo!</a>            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"¡La comunión con Dios y con los hermanos fortalece el alma!"</p>
          </div>
        </Col>
      </Row>

      {loading && page === 1 && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando eventos...</p>
        </div>
      )}

      {eventsData.length === 0 && !loading && (
        <Alert variant="info" className="text-center">No se encontraron eventos próximos.</Alert>
      )}

      {eventsData && eventsData.length > 0 && (
        <>
          <Row id="lista-eventos" xs={1} md={2} lg={3} className="g-4">
            {eventsData.map(event => (
              <Col key={(event as any).id}>
                <Card className="h-100 shadow card-book">
                  <Card.Img variant="top" src={(event as any).image} alt={(event as any).title} loading="lazy" />
                  <Card.Body>
                    <Card.Title>{(event as any).title}</Card.Title>
                    <div className="mb-2 text-muted">
                      <div><FaCalendarAlt className="me-2" />{(event as any).date}</div>
                    </div>
                    <Card.Text>
                      {(event as any).description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button as={Link as any} to={`/eventos/${(event as any).id}`} variant="primary" className="w-100 rounded-pill btn-sm">Más Información</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <p className="text-center mt-5 lead text-muted">
            "Cada evento es una oportunidad para crecer en la fe y compartir en comunidad. ¡Te esperamos!"
          </p>

          {eventsData.length < totalEvents && (
            <div className="text-center mt-4">
              <Button onClick={handleLoadMore} variant="outline-primary" className="rounded-pill px-4 btn-sm" disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    Cargando...
                  </>
                ) : (
                  <>
                    <FaPlus className="me-2" />
                    Cargar Más Eventos
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Eventos;
