import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { FaBookmark, FaQuoteRight } from 'react-icons/fa';

const VERSES_OF_THE_DAY = [
  {
    text: "Todo lo puedo en Cristo que me fortalece.",
    reference: "Filipenses 4:13"
  },
  {
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    reference: "Juan 3:16"
  },
  {
    text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
    reference: "Proverbios 3:5"
  },
  {
    text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
    reference: "Mateo 6:33"
  },
  {
    text: "Jehová es mi pastor; nada me faltará.",
    reference: "Salmos 23:1"
  },
  {
    text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
    reference: "Josué 1:9"
  }
];

const Biblia = () => {
  const [bookmarkStatus, setBookmarkStatus] = useState<string | null>(null);
  const [dailyVerse, setDailyVerse] = useState<{ text: string; reference: string } | null>(null);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const verseIndex = dayOfYear % VERSES_OF_THE_DAY.length;
    setDailyVerse(VERSES_OF_THE_DAY[verseIndex]);
  }, []);

  const handleBookmark = () => {
    // This will be implemented in Phase 2 with a database
    setBookmarkStatus('Versículo actual guardado como marcador (simulado).');
    setTimeout(() => setBookmarkStatus(null), 3000);
    console.log('Marcador añadido para el versículo actual.');
  };

  return (
    // NOTE: Replace this placeholder image with a specific image from Unsplash
    // that matches the "open Bible, serene nature" theme and your theological constraints.
    // Example: https://unsplash.com/s/photos/open-bible-nature
    <div className="mt-5 bible-page-background rounded-3 overflow-hidden"> 
      <Container className="my-5">
        <title>La Santa Biblia - Vino Nuevo en Odres Nuevos</title>
        <h1 className="text-center mb-4 fw-bold fs-3 fs-sm-2 text-strong-blue">La Santa Biblia</h1>
        <h2 className="text-center mb-5 fs-6 fs-sm-5"><span className="text-pure-black">Ministerio Apostólico, Misionero y Profético</span> <strong className="text-strong-blue">Vino Nuevo en Odres Nuevos</strong></h2>
        
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8}>
            <p className="text-center text-white fs-6 fs-sm-5">
              Por problemas de compatibilidad al intentar incrustar la Biblia directamente en la página, hemos optado por ofrecer un acceso directo a una versión online.
            </p>
            <p className="text-center fs-6 fs-sm-5 text-white-50 mt-3 mb-4">
              "La Palabra de Dios es viva y eficaz, ¡sumérgete en ella diariamente!"
            </p>
            <div className="text-center mb-4">
              <Button
                variant="primary"
                href="https://www.biblia.es/reina-valera-1960.php"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-pill btn-sm mt-3"
              >
                Leer la Biblia Reina Valera 1960 en Línea (biblia.es)
              </Button>
            </div>
            <p className="text-muted text-center mt-3 text-white-50 fs-6 fs-sm-5">
              Fuente externa confiable para el estudio de la Palabra de Dios.
            </p>
          </Col>
        </Row>

              {/* Versículo del Día Section */}
              <Row className="justify-content-center mb-5">
                <Col md={8} lg={6}>
                  <Card className="text-center p-4 shadow-sm border-0 card-verse-of-day">              <Card.Body>
                <h3 className="card-title mb-4 fw-bold">Versículo del Día para edificación</h3>
                <FaQuoteRight size={30} className="text-primary mb-3" />
                {dailyVerse ? (
                  <blockquote className="blockquote mb-0">
                    <p className="mb-0 fs-5">
                      {dailyVerse.text}
                    </p>
                    <footer className="blockquote-footer mt-2 fs-6">
                      {dailyVerse.reference}
                    </footer>
                  </blockquote>
                ) : (
                  <p>Cargando versículo...</p>
                )}
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="outline-primary" onClick={handleBookmark} className="rounded-pill mt-3 btn-sm">
                  <FaBookmark className="me-2" />
                  Guardar Versículo
                </Button>
                <p className="text-white mt-3 mb-0">
                  "Que la Palabra de Dios sea lámpara a tus pies y lumbrera a tu camino."
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        {/* Bookmark Status */}
        {bookmarkStatus && <Alert variant="info" className="text-center mt-3">{bookmarkStatus}</Alert>}
      </Container>
    </div>
  );
};

export default Biblia;

