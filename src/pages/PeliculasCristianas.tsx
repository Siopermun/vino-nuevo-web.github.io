import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form, InputGroup } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { FaSearch, FaPlus } from 'react-icons/fa';
import usePageTitle from '../hooks/usePageTitle';

// Custom Draggable Modal Dialog component
const DraggableModalDialog = (props: any) => {
  return (
    <Draggable handle=".modal-header">
      <Modal.Dialog {...props} />
    </Draggable>
  );
};

const PeliculasCristianas = () => {
  usePageTitle('Películas Cristianas - Vino Nuevo en Odres Nuevo');
  const [curatedMovies, setCuratedMovies] = useState([]); // State for curated movies from CMS
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]); // State for YouTube search results
  const [loadingCurated, setLoadingCurated] = useState(true);
  const [loadingYoutube, setLoadingYoutube] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>('');
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('películas cristianas completas');
  const [curatedPage, setCuratedPage] = useState<number>(1);
  const [totalCurated, setTotalCurated] = useState<number>(0);

  // Fetch curated movies from CMS
  const fetchCuratedMovies = (pageNum = 1) => {
    if (pageNum === 1) {
      setLoadingCurated(true);
    }
    fetch(`http://localhost:3001/api/content/movies?page=${pageNum}&limit=6`)
      .then(res => res.json())
      .then(data => {
        setCuratedMovies(prev => pageNum === 1 ? (data.data || []) : [...prev, ...(data.data || [])]);
        setTotalCurated(data.total || 0);
        setCuratedPage(pageNum);
      })
      .catch(err => {
        console.error("Error fetching curated movies:", err);
      })
      .finally(() => {
        setLoadingCurated(false);
      });
  };

  useEffect(() => {
    fetchCuratedMovies(1);
  }, []);

  // Function to fetch movies from YouTube API (existing logic)
  const fetchYoutubeMovies = async (query: string, pageCode: string | null = null, isNewSearch: boolean = false) => {
    const maxResults = 12;
    let backendApiUrl = `http://localhost:3001/api/youtube-search?query=${encodeURIComponent(query)}&maxResults=${maxResults}`;
    
    if (pageCode) {
      backendApiUrl += `&pageToken=${pageCode}`;
    }

    try {
      if (isNewSearch) {
        setLoadingYoutube(true);
        setYoutubeVideos([]);
        setNextPageToken(null);
      } else if (pageCode) {
        setLoadingMore(true);
      } else {
        setLoadingYoutube(true);
      }

      const response = await fetch(backendApiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.error || errorData.error || 'Error al conectar con el servidor backend.');
      }
      const data = await response.json();
      
      setYoutubeVideos((prevVideos: any) => {
        const existingVideoIds = new Set((prevVideos as any[]).map(v => v.id.videoId));
        const newUniqueVideos = data.items.filter((item: any) => item.id && item.id.videoId && !existingVideoIds.has(item.id.videoId));
        return [...prevVideos, ...newUniqueVideos];
      });
      setNextPageToken(data.nextPageToken || null);

    } catch (err: any) {
      setError(err.message);
      console.error("Error proxying YouTube API request:", err);
    } finally {
      setLoadingYoutube(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchYoutubeMovies(searchTerm, null, true);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchYoutubeMovies(searchTerm, null, true);
  };

  const handleShowVideoModal = (url: string, title: string) => {
    setSelectedVideoUrl(url);
    setSelectedVideoTitle(title);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideoUrl(null);
    setSelectedVideoTitle('');
  };

  const renderCuratedMovies = () => {
    if (loadingCurated) {
      return (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando películas destacadas...</p>
        </div>
      );
    }
    if (curatedMovies.length === 0) {
      return null; // Or a message like "No hay películas destacadas disponibles."
    }
    return (
      <>
        <h2 className="text-center mb-4 mt-5">Nuestras Películas Destacadas</h2>
        <p className="text-center lead text-muted mb-4">
          "Una selección cuidadosamente elegida para edificar tu fe y la de tu hogar."
        </p>
        <Row xs={1} md={2} lg={3} className="g-4 mb-5">
          {curatedMovies && curatedMovies.map((movie, index) => (
            <Col key={(movie as any).id || index}>
              <Card className="h-100 shadow clickable-card card-book" onClick={() => handleShowVideoModal((movie as any).videoUrl, (movie as any).title)}>
                <Card.Img variant="top" src={(movie as any).imageUrl} alt={(movie as any).title} loading="lazy" />
                <Card.Body>
                  <Card.Title className="h6">{(movie as any).title}</Card.Title>
                  <Card.Text>{(movie as any).description}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-grid">
                  <Button variant="primary" className="rounded-pill btn-sm" onClick={(e) => { e.stopPropagation(); handleShowVideoModal((movie as any).videoUrl, (movie as any).title); }}>Ver Película</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        {curatedMovies.length < totalCurated && (
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              onClick={() => fetchCuratedMovies(curatedPage + 1)}
              disabled={loadingCurated}
              className="rounded-pill px-4 btn-sm"
            >
              {loadingCurated ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Cargando Más...
                </>
              ) : (
                <>
                  <FaPlus className="me-2" />
                  Cargar Más Películas Destacadas
                </>
              )}
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderYoutubeResults = () => {
    if (loadingYoutube && youtubeVideos.length === 0) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Buscando en YouTube...</p>
        </div>
      );
    }
    if (error) {
      return <Alert variant="danger">Error: {error}</Alert>;
    }
    if (youtubeVideos.length === 0 && !loadingYoutube) {
      return <Alert variant="info">No se encontraron videos de YouTube con la búsqueda actual.</Alert>;
    }
    return (
      <>
        <h2 id="mas-peliculas" className="text-center mb-4 mt-5">Más Películas</h2>
        <p className="text-center lead text-muted mb-4">
          "Explora aún más contenido inspirador y de fe directamente desde YouTube."
        </p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {youtubeVideos && youtubeVideos.map((video, index) => (
            <Col key={`${(video as any).id.videoId}-${index}`}>
              <Card className="h-100 shadow clickable-card card-book" onClick={() => handleShowVideoModal(`https://www.youtube.com/embed/${(video as any).id.videoId}`, (video as any).snippet.title)}>
                <Card.Img variant="top" src={(video as any).snippet.thumbnails.medium.url} alt={(video as any).snippet.title} loading="lazy" />
                <Card.Body>
                  <Card.Title className="h6">{(video as any).snippet.title}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-grid">
                  <Button variant="primary" className="rounded-pill btn-sm" onClick={(e) => { e.stopPropagation(); handleShowVideoModal(`https://www.youtube.com/embed/${(video as any).id.videoId}`, (video as any).snippet.title); }}>Ver Video</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        
        {nextPageToken && (
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              onClick={() => fetchYoutubeMovies(searchTerm, nextPageToken)}
              disabled={loadingMore || loadingYoutube}
              className="rounded-pill px-4 btn-sm"
            >
              {loadingMore ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Cargando Más...
                </>
              ) : (
                <>
                  <FaPlus className="me-2" />
                  Cargar Más de YouTube
                </>
              )}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <Container className="my-5">
      <title>Películas Cristianas - Vino Nuevo en Odres Nuevo</title>
      
      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="peliculas-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Películas Cristianas</h1>
            <p className="px-4 fs-6 fs-sm-5">Disfruta de nuestra selección de películas y videos cristianos.</p>
            <div className="mt-4">
              <a href="#mas-peliculas" className="btn btn-light btn-sm">¡Explora el Cine Cristiano!</a>
            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"Historias de fe que inspiran y transforman vidas."</p>
          </div>
        </Col>
      </Row>
      
      {/* Search Bar for YouTube */}
      <Row className="justify-content-center mb-4 search-bar-section">
        <Col md={8} lg={6}>
          <p className="text-center lead text-muted mb-3">
            "Encuentra la película cristiana perfecta para ti y tu familia."
          </p>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar películas o videos en YouTube..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loadingYoutube || loadingMore}
              />
              <Button type="submit" variant="primary" disabled={loadingYoutube || loadingMore} className="btn-sm">
                <FaSearch className="me-1" /> Buscar
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {renderCuratedMovies()}
      {renderYoutubeResults()}

      {/* Draggable Video Modal */}
      {selectedVideoUrl && (
          <Modal show={showVideoModal} onHide={handleCloseVideoModal} dialogAs={DraggableModalDialog} centered dialogClassName="draggable-video-modal">
            <Modal.Header closeButton className="modal-header">
              <Modal.Title>{selectedVideoTitle}</Modal.Title>.
            </Modal.Header>
            <Modal.Body className="p-0">
              <div className="embed-responsive embed-responsive-16by9" onMouseDown={(e) => e.stopPropagation()}>
                <iframe
                  className="embed-responsive-item"
                  src={selectedVideoUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={selectedVideoTitle}
                  width="100%"
                  height="400px"
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
      )}
    </Container>
  );
};

export default PeliculasCristianas;
