import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import usePageTitle from '../hooks/usePageTitle';
import { LinkContainer } from 'react-router-bootstrap'; // Importar LinkContainer
import { FaPlus } from 'react-icons/fa';

const Galerias = () => {
  usePageTitle('Álbumes de Galerías - Vino Nuevo en Odres Nuevo');
  const [galleryAlbums, setGalleryAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchAlbums = (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    fetch(`http://localhost:3001/api/content/galleryImages?page=${pageNum}&limit=6`)
      .then(res => {
        if (!res.ok) {
          // If response is not ok, it might not be valid JSON
          return res.text().then(text => { throw new Error(`HTTP error! status: ${res.status}, body: ${text}`); });
        }
        return res.json();
      })
      .then(data => {
        setGalleryAlbums(prev => pageNum === 1 ? (data.data || []) : [...prev, ...(data.data || [])]);
        setTotalAlbums(data.total || 0);
        setPage(pageNum);
      })
      .catch(err => {
        console.error("Error fetching gallery albums:", err);
        // Explicitly set to empty array on error to prevent undefined issues
        setGalleryAlbums([]);
        setTotalAlbums(0);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchAlbums(1);
  }, []);

  const handleLoadMore = () => {
    fetchAlbums(page + 1);
  };

  return (
    <Container className="my-5">
      <title>Álbumes de Galerías - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="galerias-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Nuestros Álbumes de Galerías</h1>
            <p className="px-4 fs-6 fs-sm-5">Explora nuestros momentos especiales.</p>
            <div className="mt-4">
              <a href="#lista-albumes" className="btn btn-light btn-sm">Galería de Imágenes</a>
            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"Cada imagen cuenta una historia de fe, gozo y comunión."</p>
          </div>
        </Col>
      </Row>

      {loading && page === 1 && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando álbumes...</p>
        </div>
      )}

      <Row id="lista-albumes" xs={1} md={2} lg={3} className="g-4">
        {galleryAlbums && galleryAlbums.map(album => (
          <Col key={(album as any).id}>
            <Card className="h-100 shadow card-book">
              <Card.Img 
                variant="top" 
                src={(album as any).coverImage || 'https://via.placeholder.com/400x250?text=No+Image'} 
                alt={(album as any).title} 
                loading="lazy" 
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body> {/* Mover contenido de overlay al Card.Body */}
                <Card.Title>{(album as any).title}</Card.Title>
                {(album as any).description && (
                  <Card.Text className="text-muted">
                    {(album as any).description}
                  </Card.Text>
                )}
              </Card.Body>
              <Card.Footer className="text-center"> {/* Botón en el footer */}
                <LinkContainer to={`/galerias/${(album as any).id}`}>
                  <Button variant="primary" className="rounded-pill btn-sm">
                    Ver Álbum
                  </Button>
                </LinkContainer>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <p className="text-center mt-5 lead text-muted">
        "Déjate inspirar por los momentos que celebramos juntos en la presencia de Dios."
      </p>

      {(galleryAlbums || []).length < totalAlbums && (
        <div className="text-center mt-4">
                        <Button onClick={handleLoadMore} variant="outline-primary" className="rounded-pill px-4 btn-sm" disabled={loadingMore}>            {loadingMore ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Cargando...
              </>
            ) : (
              <>
                <FaPlus className="me-2" />
                Cargar Más Álbumes
              </>
            )}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Galerias;
