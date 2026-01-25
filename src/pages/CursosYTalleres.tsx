import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaGraduationCap, FaUser, FaClock, FaPlus } from 'react-icons/fa';
import CourseEnrollmentModal from '../components/CourseEnrollmentModal'; // Import the new modal
import usePageTitle from '../hooks/usePageTitle';

const CursosYTalleres = () => {
  usePageTitle('Cursos y Talleres - Vino Nuevo en Odres Nuevo');
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchCourses = (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    fetch(`http://localhost:3001/api/content/courses?page=${pageNum}&limit=6`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setCoursesData(prev => pageNum === 1 ? (data.data || []) : [...prev, ...(data.data || [])]);
        setTotalCourses(data.total || 0);
        setPage(pageNum);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchCourses(1);
  }, []);

  const handleShowEnrollmentModal = (course: any) => {
    setSelectedCourse(course);
    setShowEnrollmentModal(true);
  };

  const handleCloseEnrollmentModal = () => {
    setShowEnrollmentModal(false);
    setSelectedCourse(null);
  };

  const handleLoadMore = () => {
    fetchCourses(page + 1);
  };

  if (loading && page === 1) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando cursos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">Error al cargar los cursos: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <title>Cursos y Talleres - Vino Nuevo en Odres Nuevo</title>

      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="cursos-hero-section">
            <h1 className="fw-bold fs-3 fs-sm-2 fs-md-1">Nuestros Cursos y Talleres</h1>
            <p className="px-4 fs-6 fs-sm-5">Invierte en tu crecimiento espiritual y personal.</p>
            <div className="mt-4">
              <a href="#lista-cursos" className="btn btn-light btn-sm">¡Explora Nuestros Programas!</a>
            </div>
            <p className="mt-3 fs-6 fs-sm-5 text-shadow-sm">"Capacítate para servir y crecer en el conocimiento de Dios."</p>
          </div>
        </Col>
      </Row>

      <p className="lead text-center mb-5">
        Invierte en tu crecimiento espiritual y personal con nuestra variedad de cursos y talleres diseñados para toda la familia.
      </p>
      <p className="text-center fs-5 text-muted mb-5">
        "Desarrolla tus dones y talentos para la gloria de Dios. ¡Hay un lugar para ti!"
      </p>
      <Row id="lista-cursos" xs={1} md={2} lg={3} className="g-4">
        {coursesData && coursesData.map(course => (
          <Col key={(course as any).id}>
            <Card className="h-100 shadow card-book">
              <Card.Img variant="top" src={(course as any).image} alt={(course as any).title} loading="lazy" />
              <Card.Body>
                <Card.Title>{(course as any).title}</Card.Title>
                <div className="mb-2 text-muted">
                  <div><FaUser className="me-2" />{(course as any).instructor}</div>
                  <div><FaClock className="me-2" />{(course as any).schedule}</div>
                </div>
                <Card.Text>
                  {(course as any).description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" className="w-100 rounded-pill btn-sm" onClick={() => handleShowEnrollmentModal(course)}>
                  <FaGraduationCap className="me-2" />
                  Inscribirse
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <p className="text-center mt-5 lead text-muted">
        "Nunca dejes de aprender y crecer. ¡El conocimiento de Dios te transformará!"
      </p>

      {coursesData.length < totalCourses && (
        <div className="text-center mt-4">
                        <Button onClick={handleLoadMore} variant="outline-primary" className="rounded-pill px-4 btn-sm" disabled={loadingMore}>            {loadingMore ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Cargando...
              </>
            ) : (
              <>
                <FaPlus className="me-2" />
                Cargar Más Cursos
              </>
            )}
          </Button>
        </div>
      )}

      {selectedCourse && (
        <CourseEnrollmentModal
          show={showEnrollmentModal}
          onHide={handleCloseEnrollmentModal}
          course={selectedCourse}
        />
      )}
    </Container>
  );
};

export default CursosYTalleres;