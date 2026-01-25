import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';
import { FaTrash, FaPlus, FaImage, FaVideo } from 'react-icons/fa'; // Added FaImage, FaVideo icons
import { toast } from 'react-toastify';

const GalleryAlbumModal = ({ show, onHide, isEditing, currentAlbum, onSave, uploadFile, token }: { show: any, onHide: any, isEditing: any, currentAlbum: any, onSave: any, uploadFile: any, token: any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [images, setImages] = useState<any[]>([]); // Array of { src: 'url', alt: 'text', videoUrl?: 'url_video' }
    const [imageFiles, setImageFiles] = useState<any[]>([]); // Temporary store for new files
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false); // For individual images
    const [newVideoUrl, setNewVideoUrl] = useState(''); // New state for video URL
    const [error, setError] = useState('');

    useEffect(() => {
        if (show && currentAlbum) {
            setTitle(currentAlbum.title || '');
            setDescription(currentAlbum.description || '');
            setCoverImageUrl(currentAlbum.coverImage || '');
            // Deep copy images to allow local edits, including videoUrl if present
            setImages(currentAlbum.images ? currentAlbum.images.map((img: any) => ({ ...img })) : []);
            setImageFiles([]); // Clear any old pending files
            setNewVideoUrl(''); // Reset video URL field
            setError('');
        } else if (!show) {
            // Reset state when modal is hidden
            setTitle('');
            setDescription('');
            setCoverImageFile(null);
            setCoverImageUrl('');
            setImages([]);
            setImageFiles([]);
            setNewVideoUrl(''); // Reset video URL field
            setError('');
        }
    }, [show, currentAlbum]);

    const handleCoverImageChange = (e: any) => {
        if (e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
            setCoverImageUrl(URL.createObjectURL(e.target.files[0])); // Instant preview
        }
    };

    const handleAlbumImageChange = (e: any) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImageFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
        }
    };

    const handleRemoveImage = (indexToRemove: any) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const handleRemoveNewImageFile = (indexToRemove: any) => {
        setImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleAddVideoUrl = () => {
        if (newVideoUrl.trim()) {
            // Basic YouTube URL check and ID extraction
            let videoId = newVideoUrl.trim();
            const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|\/(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            const match = newVideoUrl.match(youtubeRegex);
            if (match && match[1]) {
                videoId = match[1];
            } else {
                toast.error('URL de video de YouTube no válida.');
                return;
            }

            setImages((prevImages: any) => [...prevImages, { videoUrl: videoId, alt: `Video de YouTube: ${newVideoUrl.trim()}` }]);
            setNewVideoUrl('');
        }
    };

    const handleSaveAlbum = async () => {
        setError('');
        if (!title.trim() || !description.trim()) {
            setError('El título y la descripción del álbum son obligatorios.');
            return;
        }

        let finalCoverImageUrl = currentAlbum?.coverImage || ''; // Start with existing cover or empty
        if (coverImageFile) { // If a new file was selected
            setUploadingCover(true);
            const uploadedUrl = await uploadFile(coverImageFile, 'image'); // Pass file and type, token handled by uploadFile in Admin.tsx
            setUploadingCover(false);
            if (!uploadedUrl) {
                setError('Error al subir la imagen de portada.');
                return;
            }
            finalCoverImageUrl = uploadedUrl;
        } else if (!finalCoverImageUrl && images.length === 0 && imageFiles.length === 0) { // If no cover, no existing images, and no new images
            setError('La imagen de portada es obligatoria si no hay contenido en el álbum.');
            return;
        }


        // Upload new image files
        const uploadedImages = [];
        setUploadingImage(true);
        for (const file of imageFiles) {
            const uploadedUrl = await uploadFile(file, 'image'); // Pass file and type, token handled by uploadFile in Admin.tsx
            if (uploadedUrl) {
                uploadedImages.push({ src: uploadedUrl, alt: (file as any).name });
            } else {
                setError(`Error al subir la imagen: ${(file as any).name}`);
                setUploadingImage(false);
                return;
            }
        }
        setUploadingImage(false);

        const albumToSave = {
            id: currentAlbum?.id || Date.now(),
            title,
            description,
            coverImage: finalCoverImageUrl,
            images: [...images, ...uploadedImages] // Combine existing and new uploaded images/videos
        };

        onSave(albumToSave);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="xl"> {/* Increased size to 'xl' for more content */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Álbum de Galería' : 'Crear Nuevo Álbum de Galería'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Título del Álbum</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción del Álbum</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row className="mb-3 align-items-center">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Imagen de Portada</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleCoverImageChange} />
                                <Form.Text className="text-muted">Actual: {coverImageFile ? (coverImageFile as any).name : (coverImageUrl ? coverImageUrl.split('/').pop() : 'Ninguna')}</Form.Text>
                                {uploadingCover && <Spinner animation="border" size="sm" className="ms-2" />}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            {coverImageUrl && (
                                <div className="mt-2">
                                    <Form.Label>Previsualización de Portada:</Form.Label>
                                    <img src={coverImageUrl} alt="Portada actual" style={{ maxWidth: '150px', maxHeight: '150px', display: 'block', border: '1px solid #ddd', borderRadius: '4px' }} />
                                </div>
                            )}
                        </Col>
                    </Row>

                    <h5 className="mt-4 mb-3">Contenido del Álbum (Imágenes y Videos)</h5>
                    <Row className="mb-3">
                        {images.length === 0 && imageFiles.length === 0 ? (
                            <Col md={12} className="text-muted">No hay imágenes ni videos en este álbum.</Col>
                        ) : (
                            <>
                                {/* Display existing images and videos */}
                                {images.map((item, index) => (
                                    <Col xs={6} md={4} lg={3} key={index} className="mb-3">
                                        <Card>
                                            {(item as any).src && (
                                                                                                 <Card.Img variant="top" src={(item as any).src} alt={(item as any).alt} style={{ height: '120px', objectFit: 'cover' }} />                                            )}
                                            {(item as any).videoUrl && (
                                                <div className="embed-responsive embed-responsive-16by9 d-flex align-items-center justify-content-center bg-dark" style={{ height: '120px', overflow: 'hidden' }}>
                                                    <FaVideo color="white" size="3em" />
                                                </div>
                                            )}
                                            <Card.Body className="p-2">
                                                <Card.Text className="text-center text-muted" style={{ fontSize: '0.75em' }}>
                                                                                                         {(item as any).alt ? (item as any).alt.substring(0,20) + '...' : ((item as any).videoUrl ? 'Video' : 'Imagen')}                                                </Card.Text>
                                                <Button variant="danger" size="sm" className="w-100" onClick={() => handleRemoveImage(index)}>
                                                    <FaTrash /> Eliminar
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                                {/* Display newly selected image files */}
                                {imageFiles.map((file, index) => (
                                    <Col xs={6} md={4} lg={3} key={`new-img-${index}`} className="mb-3">
                                        <Card>
                                            <Card.Img variant="top" src={URL.createObjectURL(file)} alt={(file as any).name} style={{ height: '120px', objectFit: 'cover' }} />
                                            <Card.Body className="p-2">
                                                <Card.Text className="text-center text-muted" style={{ fontSize: '0.75em' }}>
                                                                                                         {(file as any).name.substring(0,20) + '...'} (Nueva)                                                </Card.Text>
                                                <Button variant="warning" size="sm" className="w-100" onClick={() => handleRemoveNewImageFile(index)}>
                                                    <FaTrash /> Quitar
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </>
                        )}
                    </Row>
                    
                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label><FaImage className="me-1" /> Añadir Nuevas Imágenes</Form.Label>
                                <Form.Control type="file" accept="image/*" multiple onChange={handleAlbumImageChange} />
                                {uploadingImage && <Spinner animation="border" size="sm" className="ms-2" />}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label><FaVideo className="me-1" /> Añadir Video (URL de YouTube)</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Pega la URL del video de YouTube aquí"
                                        value={newVideoUrl}
                                        onChange={(e) => setNewVideoUrl(e.target.value)}
                                    />
                                    <Button variant="info" onClick={handleAddVideoUrl} className="ms-2" disabled={!newVideoUrl.trim()}>
                                        <FaPlus className="me-1" /> Añadir Video
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSaveAlbum} disabled={uploadingCover || uploadingImage || !title.trim() || !description.trim()}>
                    {isEditing ? 'Guardar Cambios' : 'Crear Álbum'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GalleryAlbumModal;

