import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaPlay, FaPlus } from 'react-icons/fa';

const Predicas = () => {
  const [predicasData, setPredicasData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [page, setPage] = useState(1);
  const [totalPredicas, setTotalPredicas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPredicas = (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    fetch(`http://localhost:3001/api/content/sermons?page=${pageNum}&limit=6`)
      .then(res => res.json())
      .then(data => {
        setPredicasData(prev => pageNum === 1 ? data.data : [...prev, ...data.data]);
        setTotalPredicas(data.total);
        setPage(pageNum);
      })
      .catch(err => console.error("Error fetching sermons:", err))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchPredicas(1);
  }, []);

  const getYoutubeVideoId = (youtubeUrl: any) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return null;
  };

  const getEmbedUrl = (youtubeUrl: any) => {
    const videoId = getYoutubeVideoId(youtubeUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl;
  };

  const getThumbnailUrl = (youtubeUrl: any) => {
    const videoId = getYoutubeVideoId(youtubeUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  const handleShowModal = (videoUrl: any) => {
    setSelectedVideoUrl(getEmbedUrl(videoUrl));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideoUrl('');
  };

  const handleLoadMore = () => {
    fetchPredicas(page + 1);
  };

  return (
    <Container className="my-5">
      <title>Prédicas - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="predicas-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Nuestras Prédicas</h1>
            <p className="px-4 fs-6 fs-sm-5">Aliméntate de la palabra de Dios.</p>
            <div className="mt-4">
              <a href="#lista-predicas" className="btn btn-light btn-sm">¡Escucha la Palabra!</a>
            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"La fe viene por el oír, y el oír, por la palabra de Dios."</p>
          </div>
        </Col>
      </Row>

      {loading && page === 1 && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando prédicas...</p>
        </div>
      )}

      {predicasData.length === 0 && !loading && (
        <Alert variant="info" className="text-center">No se encontraron prédicas.</Alert>
      )}

      {predicasData.length > 0 && (
        <>
          <Row id="lista-predicas" xs={1} md={2} lg={3} className="g-4">
            {predicasData && predicasData.map(predica => (
              <Col key={(predica as any).id}>
                <Card className="h-100 shadow card-book">
                  <Card.Img 
                    variant="top" 
                    src={getThumbnailUrl((predica as any).videoUrl)} 
                    alt={(predica as any).title} 
                    loading="lazy"
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => handleShowModal((predica as any).videoUrl)}
                  />
                  <Card.Body>
                    <Card.Title>{(predica as any).title}</Card.Title>
                    <div className="mb-2 text-muted">
                      <div><FaUser className="me-2" />{(predica as any).preacher}</div>
                      <div><FaCalendarAlt className="me-2" />{(predica as any).date}</div>
                    </div>
                    <Card.Text>
                      {(predica as any).description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button onClick={() => handleShowModal((predica as any).videoUrl)} variant="primary" className="w-100 rounded-pill btn-sm">
                      <FaPlay className="me-2" />
                      Ver Prédica
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <p className="text-center mt-5 lead text-muted">
            "Sumérgete en la sabiduría divina y fortalece tu espíritu con cada mensaje."
          </p>

          {predicasData.length < totalPredicas && (
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
                    Cargar Más Prédicas
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Reproduciendo Prédica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ratio ratio-16x9">
            <iframe
              src={selectedVideoUrl}
              title="Reproductor de video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Predicas;
