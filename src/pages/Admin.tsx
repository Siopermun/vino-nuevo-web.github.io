import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Nav, Table, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { FaHome, FaBook, FaCalendarAlt, FaMicrophoneAlt, FaFilm, FaGraduationCap, FaUsers, FaImage, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import HomeEditor from '../components/admin/HomeEditor';
import QuienesSomosEditor from '../components/admin/QuienesSomosEditor';
import CrudEditor from '../components/admin/CrudEditor';
import BookModal from '../components/admin/modals/BookModal';
import EventModal from '../components/admin/modals/EventModal';
import SermonModal from '../components/admin/modals/SermonModal';
import MovieModal from '../components/admin/modals/MovieModal';
import CourseModal from '../components/admin/modals/CourseModal';
import PastorModal from '../components/admin/modals/PastorModal';
import GalleryAlbumModal from '../components/admin/modals/GalleryAlbumModal';
import ErrorBoundary from '../components/ErrorBoundary'; // Añadir esta línea
import EventManager from '../components/admin/EventManager';
import BookManager from '../components/admin/BookManager';
import SermonManager from '../components/admin/SermonManager';
import MovieManager from '../components/admin/MovieManager';
import CourseManager from '../components/admin/CourseManager';
import PastorManager from '../components/admin/PastorManager';
import GalleryManager from '../components/admin/GalleryManager';
import ConfirmationModal from '../components/admin/modals/ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [activePage, setActivePage] = useState('home');
    const [content, setContent] = useState({});
    const [books, setBooks] = useState<any[]>([]);
    const [pendingBooks, setPendingBooks] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [pendingEvents, setPendingEvents] = useState<any[]>([]);
    const [sermons, setSermons] = useState<any[]>([]);
    const [pendingSermons, setPendingSermons] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [pendingMovies, setPendingMovies] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [pendingCourses, setPendingCourses] = useState<any[]>([]);
    const [pastors, setPastors] = useState<any[]>([]); // New state for pastors
    const [pendingPastors, setPendingPastors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showBookModal, setShowBookModal] = useState<boolean>(false);
    const [showSermonModal, setShowSermonModal] = useState<boolean>(false);
    const [showMovieModal, setShowMovieModal] = useState<boolean>(false);
    const [showPastorModal, setShowPastorModal] = useState<boolean>(false);
    const [showGalleryAlbumModal, setShowGalleryAlbumModal] = useState<boolean>(false);

    // State for confirmation modal
    const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
    const [confirmMessage, setConfirmMessage] = useState('');

    // State for pastor modal
    const [currentPastor, setCurrentPastor] = useState<any>({ id: '', name: '', role: '', image: '' });
    const [isEditingPastor, setIsEditingPastor] = useState<boolean>(false);
    const [editPastorIndex, setEditPastorIndex] = useState<number | null>(null);
    const [pastorImageUpload, setPastorImageUpload] = useState<any>(null); // For pastor image file upload
    const [uploadingPastorImage, setUploadingPastorImage] = useState<boolean>(false);

    // State for gallery album modal
    const [currentAlbum, setCurrentAlbum] = useState<any>(null);
    const [isEditingAlbum, setIsEditingAlbum] = useState<boolean>(false);
    const [editAlbumIndex, setEditAlbumIndex] = useState<number | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<any>(null); // For album cover image upload
    const [uploadingCover, setUploadingCover] = useState<boolean>(false); // For album cover image upload status
    const [galleryImages, setGalleryImages] = useState<any[]>([]); // This will now store albums, not individual images
    const [pendingGalleryImages, setPendingGalleryImages] = useState<any[]>([]);


    useEffect(() => {
        if (token) {
            setIsLoading(true);
            let endpoint;
            if (activePage === 'books') {
                endpoint = 'books';
            } else if (activePage === 'events') {
                endpoint = 'events';
            } else if (activePage === 'sermons') {
                endpoint = 'sermons';
            } else if (activePage === 'movies') {
                endpoint = 'movies';
            } else if (activePage === 'courses') {
                endpoint = 'courses';
            } else if (activePage === 'pastors') { // New endpoint for pastors
                endpoint = 'pastors';
            } else if (activePage === 'galleryImages') {
                endpoint = 'galleryImages';
            } else {
                endpoint = activePage;
            }

            const fetchUrl = `http://localhost:3001/api/content/${endpoint}?all=true&cachebuster=${Date.now()}`; // Add cachebuster
            fetch(fetchUrl) // Request all items for admin
                .then(res => {
                    console.log(`[Admin.tsx] Fetching: ${fetchUrl}`);
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    console.log(`[Admin.tsx] Raw data received for ${activePage}:`, data);
                    const receivedData = data.data || data; // Handle both paginated and non-paginated response
                    console.log(`[Admin.tsx] Processed receivedData for ${activePage} (length: ${receivedData.length}):`, receivedData);

                    if (activePage === 'books') {
                        setBooks((Array.isArray(receivedData) ? receivedData : []) as any[]);
                        console.log(`[Admin.tsx] setBooks called with length: ${receivedData.length}`);
                    } else if (activePage === 'events') {
                        setEvents((Array.isArray(receivedData) ? receivedData : []) as any[]);
                        console.log(`[Admin.tsx] setEvents called with length: ${receivedData.length}`);
                    } else if (activePage === 'sermons') {
                        setSermons((Array.isArray(receivedData) ? receivedData : []) as any[]);
                        console.log(`[Admin.tsx] setSermons called with length: ${receivedData.length}`);
                    } else if (activePage === 'movies') {
                        setMovies((Array.isArray(receivedData) ? receivedData : []) as any[]);
                        console.log(`[Admin.tsx] setMovies called with length: ${receivedData.length}`);
                    } else if (activePage === 'courses') {
                        setCourses((Array.isArray(receivedData) ? receivedData : []) as any[]);
                        console.log(`[Admin.tsx] setCourses called with length: ${receivedData.length}`);
                    } else if (activePage === 'pastors') {
                        setPastors((Array.isArray(receivedData) ? receivedData : []) as any[]);
                        console.log(`[Admin.tsx] setPastors called with length: ${receivedData.length}`);
                    } else if (activePage === 'galleryImages') {
                        const galleryData = Array.isArray(receivedData) ? receivedData.map(album => ({ ...album, images: album.images || [] })) : [];
                        setGalleryImages(galleryData as any[]);
                        console.log(`[Admin.tsx] setGalleryImages called with length: ${galleryData.length}`);
                    } else {
                        setContent(receivedData);
                        console.log(`[Admin.tsx] setContent called.`);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching content:", err);
                    setIsLoading(false);
                });
        }
    }, [token, activePage]);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) {
                throw new Error('Credenciales incorrectas');
            }
            const data = await res.json();
            localStorage.setItem('token', data.token);
            setToken(data.token);
        } catch (err) {
            setError((err as any).message);
        }
    };

    const handleLogout = () => {
        console.log('Logging out. Before:', localStorage.getItem('token'));
        localStorage.removeItem('token');
        setToken(null);
        console.log('Logging out. After:', localStorage.getItem('token'), token);
    };

    const handleContentChange = (e: any) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };
    
    // --- Upload Handlers ---
    const uploadFile = async (file: any, uploadEndpoint: any) => {
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading file with token:', token);

        try {
            const res = await fetch(`http://localhost:3001/api/upload/${uploadEndpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                let errorMessage = 'Error al subir el archivo.';
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await res.json();
                    errorMessage = errorData.error || errorMessage;
                } else {
                    errorMessage = await res.text();
                }
                throw new Error(errorMessage);
            }
            const data = await res.json();
            return data.url;
        } catch (err) {
            console.error('Error uploading file:', err);
            toast.error(`Error al subir ${uploadEndpoint}: ${(err as any).message}`); // Añadir este toast de error
            return null;
        }
    };


    const handleDeleteCourse = (index: any) => {
        setConfirmMessage('¿Estás seguro de que quieres eliminar este curso?');
        setConfirmAction(() => () => {
            const updatedPendingCourses = pendingCourses.filter((_, i) => i !== index);
            setPendingCourses(updatedPendingCourses);
            setShowConfirmModal(false);
            toast.success('Curso eliminado de los cambios pendientes. Recuerda guardar para persistir.');
        });
        setShowConfirmModal(true);
    };

    // --- Gallery Album CRUD Handlers ---
    const handleShowGalleryAlbumModal = (album = null, index = null) => {
        setCurrentAlbum(album ? { ...(album as any) } : { id: Date.now(), title: '', description: '', coverImage: '', images: [] });
        setIsEditingAlbum(album !== null);
        setEditAlbumIndex(index);
        setShowGalleryAlbumModal(true);
    };

    const handleCloseGalleryAlbumModal = () => {
        setShowGalleryAlbumModal(false);
        setCurrentAlbum(null);
    };

    const handleSaveGalleryAlbum = async (albumToSave: any) => {
        let updatedPendingGalleryImages = [...pendingGalleryImages];
        if (isEditingAlbum) {
        if (editAlbumIndex !== null) { updatedPendingGalleryImages[editAlbumIndex] = albumToSave as any; }
        } else {
            updatedPendingGalleryImages.push(albumToSave as any);
        }
        setPendingGalleryImages(updatedPendingGalleryImages);
        await handleSave('galleryImages', updatedPendingGalleryImages); // Guardar en el backend
        toast.success('Álbum de galería actualizado y guardado. Recuerda guardar para persistir.');
        handleCloseGalleryAlbumModal(); // Cerrar el modal después de guardar
    };

    const handleDeleteGalleryAlbum = (index: any) => {
        setConfirmMessage('¿Estás seguro de que quieres eliminar este álbum de la galería?');
        setConfirmAction(() => () => {
            const updatedPendingGalleryImages = pendingGalleryImages.filter((_, i) => i !== index);
            setPendingGalleryImages(updatedPendingGalleryImages);
            setShowConfirmModal(false);
            toast.success('Álbum de galería eliminado de los cambios pendientes. Recuerda guardar para persistir.');
        });
        setShowConfirmModal(true);
    };

    const handleSave = async (endpoint: any, body: any) => {
        toast.info('Guardando...');
        try {
            const res = await fetch(`http://localhost:3001/api/content/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error('Error al guardar');
            toast.success('¡Guardado con éxito!');
        } catch (err) {
            toast.error(`Error al guardar: ${(err as any).message}`);
        }
    };
    

    const renderEditForm = () => {
        if (isLoading) return <p>Cargando contenido...</p>;

        switch (activePage) {
            case 'home':
                return <HomeEditor content={content} handleContentChange={handleContentChange} handleSave={handleSave} isLoading={isLoading} />;
            case 'quienesSomos':
                return <QuienesSomosEditor content={content} handleContentChange={handleContentChange} handleSave={handleSave} isLoading={isLoading} />;
            case 'books':
                return (
                    <BookManager
                        pendingBooks={pendingBooks}
                        setPendingBooks={setPendingBooks}
                        books={books}
                        setBooks={setBooks}
                        handleSave={handleSave}
                        isLoading={isLoading}
                        uploadFile={uploadFile}
                    />
                );
            case 'events':
                return (
                    <EventManager
                        pendingEvents={pendingEvents}
                        setPendingEvents={setPendingEvents}
                        events={events}
                        setEvents={setEvents}
                        handleSave={handleSave}
                        isLoading={isLoading}
                        uploadFile={uploadFile}
                    />
                );
            case 'sermons':
                return (
                    <SermonManager
                        pendingSermons={pendingSermons}
                        setPendingSermons={setPendingSermons}
                        sermons={sermons}
                        setSermons={setSermons}
                        handleSave={handleSave}
                        isLoading={isLoading}
                    />
                );
            case 'movies':
                return (
                    <MovieManager
                        pendingMovies={pendingMovies}
                        setPendingMovies={setPendingMovies}
                        movies={movies}
                        setMovies={setMovies}
                        handleSave={handleSave}
                        isLoading={isLoading}
                        uploadFile={uploadFile}
                    />
                );
            case 'courses':
                return (
                    <CourseManager
                        pendingCourses={pendingCourses}
                        setPendingCourses={setPendingCourses}
                        courses={courses}
                        setCourses={setCourses}
                        handleSave={handleSave}
                        isLoading={isLoading}
                        uploadFile={uploadFile}
                    />
                );
            case 'pastors':
                return (
                    <PastorManager
                        pendingPastors={pendingPastors}
                        setPendingPastors={setPendingPastors}
                        pastors={pastors}
                        setPastors={setPastors}
                        handleSave={handleSave}
                        isLoading={isLoading}
                        uploadFile={uploadFile}
                    />
                );
            case 'galleryImages':
                return (
                    <GalleryManager
                        pendingGalleryImages={pendingGalleryImages}
                        setPendingGalleryImages={setPendingGalleryImages}
                        galleryImages={galleryImages}
                        setGalleryImages={setGalleryImages}
                        handleSave={handleSave}
                        isLoading={isLoading}
                        uploadFile={uploadFile}
                        token={token}
                    />
                );
            default:
                return <p>Por favor selecciona una página para editar.</p>;
        }
    };

    console.log('Admin component rendering. State:', { books, pendingBooks }); // Debugging log

    if (!token) {
        return (
            <Container className="my-5" style={{ maxWidth: '500px' }}>
                <Card className="p-4">
                    <h2 className="text-center mb-4">Panel de Administración</h2>
                    <Form onSubmit={handleLogin}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Iniciar Sesión</Button>
                    </Form>
                </Card>
            </Container>
        );
    }

        return (
            <ErrorBoundary>
                <Container fluid className="my-5">
                    <Row>
                        <Col md={3} lg={2} className="bg-dark text-white p-4" style={{ minHeight: '100vh' }}>
                            <h3 className="mb-4">Admin Panel</h3>
                            <Nav variant="pills" activeKey={activePage} onSelect={(k: string | null) => setActivePage(k || 'home')} className="flex-column admin-sidebar-nav">
                                <Nav.Item>
                                    <Nav.Link eventKey="home" className="admin-nav-link">
                                        <FaHome className="me-2" /> Página Principal
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="quienesSomos" className="admin-nav-link">
                                        <FaInfoCircle className="me-2" /> Quiénes Somos
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="books" className="admin-nav-link">
                                        <FaBook className="me-2" /> Libros PDF
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="events" className="admin-nav-link">
                                        <FaCalendarAlt className="me-2" /> Eventos
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sermons" className="admin-nav-link">
                                        <FaMicrophoneAlt className="me-2" /> Prédicas
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="movies" className="admin-nav-link">
                                        <FaFilm className="me-2" /> Películas
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="courses" className="admin-nav-link">
                                        <FaGraduationCap className="me-2" /> Cursos y Talleres
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="pastors" className="admin-nav-link">
                                        <FaUsers className="me-2" /> Pastores
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="galleryImages" className="admin-nav-link">
                                        <FaImage className="me-2" /> Galería de Imágenes
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button variant="outline-light" onClick={handleLogout} className="mt-auto w-100 admin-nav-link">
                                <FaSignOutAlt className="me-2" /> Cerrar Sesión
                            </Button>
                        </Col>
                        <Col md={9} lg={10} className="p-4">
                            <Card className="p-4">
                                {renderEditForm()}
                                {/* Save button for single content pages (home, quienesSomos) */}
                                {(activePage === 'home' || activePage === 'quienesSomos') && (
                                    <Button variant="primary" onClick={() => handleSave(activePage, content)} disabled={isLoading} className="mt-3">
                                        Guardar Cambios
                                    </Button>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
    
                        <ConfirmationModal
    
                            show={showConfirmModal}
    
                            onHide={() => setShowConfirmModal(false)}
    
                            onConfirm={confirmAction}
    
                            title="Confirmar Eliminación"
    
                            message={confirmMessage}
    
                        />
    
                    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />            </ErrorBoundary>
        );};

export default Admin;