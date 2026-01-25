import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import usePageTitle from '../hooks/usePageTitle';
import { LinkContainer } from 'react-router-bootstrap';

const GalleryAlbumDetails = () => {
  const { id } = useParams();
  console.log('GalleryAlbumDetails: ID del álbum de la URL:', id); // Nuevo log
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePageTitle(album ? `${(album as any).title} - Galerías - Vino Nuevo` : 'Cargando Álbum - Vino Nuevo');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:3001/api/content/galleryImages')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('GalleryAlbumDetails: Datos recibidos del backend:', data); // Nuevo log
        const foundAlbum = data.data.find((a: any) => a.id === parseInt(id as string));
        console.log('GalleryAlbumDetails: Álbum encontrado:', foundAlbum); // Nuevo log
        if (foundAlbum) {
          setAlbum(foundAlbum);
        } else {
          setError('Álbum no encontrado' as string | null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching album details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando álbum...</p>
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

  if (!album) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="info">El álbum solicitado no existe.</Alert>
      </Container>
    );
  }

  console.log('GalleryAlbumDetails: Álbum a renderizar:', album); // Nuevo log
  console.log('GalleryAlbumDetails: Imágenes del álbum a renderizar:', (album as any).images); // Nuevo log

  const getVideoEmbedUrl = (videoUrl: any) => {
    if (videoUrl.includes('youtube.com/watch?v=')) {
      const videoId = videoUrl.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1];
      const queryPosition = videoId.indexOf('?');
      if (queryPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, queryPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('vimeo.com/')) {
        const videoId = videoUrl.split('vimeo.com/')[1];
        return `https://player.vimeo.com/video/${videoId}`;
    }
    return null;
  };

  return (
    <Container className="my-5">
      <Breadcrumb>
        <LinkContainer to="/galerias">
          <Breadcrumb.Item>Galerías</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{(album as any).title}</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="text-center mb-4">{(album as any).title}</h1>
      {(album as any).description && <p className="lead text-center mb-5">{(album as any).description}</p>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {(album as any).images.map((item: any, index: any) => (
          <Col key={item.src || item.videoUrl || index}> {/* Use src or videoUrl as key for uniqueness */}
            <Card className="h-100 shadow card-book">
              {item.src && (
                <Card.Img variant="top" src={item.src} alt={item.alt} loading="lazy" />
              )}
              {item.videoUrl && (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={getVideoEmbedUrl((item as any).videoUrl) as string}
                    title={item.alt || "Video"}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {(item.alt || item.videoUrl) && (
                <Card.Body>
                  <Card.Text className="text-center">{item.alt || (item.videoUrl ? 'Video' : '')}</Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GalleryAlbumDetails;
