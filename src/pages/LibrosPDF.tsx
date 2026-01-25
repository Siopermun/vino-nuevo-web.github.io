import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Spinner, Modal } from 'react-bootstrap';
import { FaBookOpen, FaSearch, FaBookReader, FaDownload, FaPlus } from 'react-icons/fa';
import Draggable from 'react-draggable';

interface Book {
  filename: string;
  title: string;
  author: string;
  coverImage?: string; // Add coverImage property
}

const DraggableModalDialog = (props: any) => {
  return (
    <Draggable handle=".modal-header">
      <Modal.Dialog {...props} />
    </Draggable>
  );
};

const LibrosPDF = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // State for PDF Viewer Modal
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [selectedPdfTitle, setSelectedPdfTitle] = useState<string>('');

  const fetchBooks = (pageNum = 1, searchTerm = '') => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    // In a real application, you would add the search term to the query
    fetch(`http://localhost:3001/api/content/books?page=${pageNum}&limit=20`)
      .then(res => res.json())
      .then(data => {
        console.log('Data received in LibrosPDF:', data); // Debugging log
        setBooks(prev => pageNum === 1 ? (data.data || []) : [...prev, ...(data.data || [])]);
        setTotalBooks(data.total || 0);
        setPage(pageNum);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchBooks(1, searchTerm);
  }, [searchTerm]);

  const handleLoadMore = () => {
    fetchBooks(page + 1, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleShowPdfModal = (url: string, title: string) => {
    setSelectedPdfUrl(url);
    setSelectedPdfTitle(title);
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setSelectedPdfUrl(null);
    setSelectedPdfTitle('');
  };

  const getPdfUrl = (filename: string) => {
    if (filename.startsWith('/pdfs/')) {
      return filename;
    }
    return `/pdfs/${filename}`;
  };

  const filteredBooks = (books || []).filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('LibrosPDF rendering. State:', { books, searchTerm, filteredBooks, loading }); // Debugging log

  return (
    <Container className="my-5">
      <title>Libros PDF - Vino Nuevo en Odres Nuevo</title>
      
      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="libros-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Biblioteca de Libros</h1>
            <p className="px-4 fs-6 fs-sm-5">Explora nuestra colección de libros en formato PDF.</p>
            <div className="mt-4">
              <a href="/libros-pdf" className="btn btn-light btn-sm">¡Descubre Sabiduría Divina!</a>
            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"La lectura enriquece el alma y fortalece el espíritu."</p>
          </div>
        </Col>
      </Row>
      
      {/* Search Bar */}
      <Row className="justify-content-center mb-4 search-bar-section">
        <Col md={8} lg={6}>
          <p className="text-center lead text-muted mb-3">
            "Encuentra tesoros de conocimiento y fe para alimentar tu caminar cristiano."
          </p>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={loading}
            />
            <Button variant="primary" disabled={loading} className="btn-sm">
              <FaSearch className="me-1" /> Buscar
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {loading && page === 1 && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando libros...</p>
        </div>
      )}

      {!loading && filteredBooks.length === 0 && (
        <Alert variant="info" className="text-center">No se encontraron libros con el término de búsqueda.</Alert>
      )}

      {filteredBooks.length > 0 && (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredBooks.map(book => (
              <Col key={book.filename}> {/* Using filename as key */}
                <Card className="h-100 shadow text-center card-book">
                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div className="mb-3">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} className="book-cover-image mb-3" />
                      ) : (
                        <div className="book-placeholder mb-3 d-flex align-items-center justify-content-center">
                            <span className="h5 fw-bold text-light">Libro</span>
                        </div>
                      )}
                      <Card.Title className="h5 fw-bold">{book.title}</Card.Title>
                      {book.author && book.author !== "Autor Desconocido" && <Card.Subtitle className="text-muted small">Por {book.author}</Card.Subtitle>}
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-grid gap-2 d-md-block"> {/* Changed to d-grid gap-2 d-md-block for two buttons */}
                    <Button 
                      variant="primary" 
                      className="rounded-pill me-md-2 mb-2 mb-md-0 btn-sm" 
                      onClick={() => handleShowPdfModal(getPdfUrl(book.filename), book.title)}
                    >
                      <FaBookReader className="me-1" /> Leer en Línea
                    </Button>
                    <Button 
                      as="a"
                      href={getPdfUrl(book.filename)} 
                      download 
                      variant="outline-secondary" 
                      className="rounded-pill btn-sm"
                    >
                      <FaDownload className="me-1" /> Descargar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <p className="text-center mt-5 lead text-muted">
            "Sigue explorando nuestra biblioteca para nutrir tu mente y espíritu con la Palabra."
          </p>

          {books.length < totalBooks && (
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
                    Cargar Más Libros
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Draggable PDF Viewer Modal */}
      {selectedPdfUrl && (
          <Modal show={showPdfModal} onHide={handleClosePdfModal} dialogAs={DraggableModalDialog} centered size="xl" dialogClassName="draggable-pdf-modal">
            <Modal.Header closeButton className="modal-header">
              <Modal.Title>{selectedPdfTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0" style={{ height: '70vh' }}>
              <iframe
                src={selectedPdfUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={selectedPdfTitle}
              ></iframe>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                as="a"
                href={selectedPdfUrl} 
                download 
                variant="primary" 
                className="rounded-pill btn-sm"
              >
                <FaDownload className="me-1" /> Descargar PDF
              </Button>
              <Button variant="secondary" onClick={handleClosePdfModal} className="rounded-pill btn-sm">
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
      )}
    </Container>
  );
};

export default LibrosPDF;
