import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:3001/api/content/events')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const foundEvent = data.data.find((e: any) => e.id === parseInt(id as string));
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Evento no encontrado' as string | null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching event details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando detalles del evento...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="info">El evento solicitado no existe.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <title>{(event as any).title} - Vino Nuevo en Odres Nuevo</title>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow card-book">
            <Card.Img variant="top" src={(event as any).image} alt={(event as any).title} />
            <Card.Body>
              <Card.Title className="display-4">{(event as any).title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{(event as any).date}</Card.Subtitle>
              <Card.Text>
                {(event as any).description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetails;
