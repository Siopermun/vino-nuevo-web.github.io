import React from 'react';
import { Modal, Form, Button, Spinner, Row, Col } from 'react-bootstrap'; // Import Row, Col

const MovieModal = ({ show, onHide, isEditing, currentMovie, onMovieChange, onMovieImageChange, onSave, uploading }: { show: any, onHide: any, isEditing: any, currentMovie: any, onMovieChange: any, onMovieImageChange: any, onSave: any, uploading: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg"> {/* Added 'centered' and 'size="lg"' for better UX */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Película' : 'Añadir Nueva Película'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título de la Película</Form.Label>
                            <Form.Control type="text" name="title" value={currentMovie.title} onChange={onMovieChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={currentMovie.description} onChange={onMovieChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}> {/* Image upload on one side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen de la Película</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={onMovieImageChange} />
                            <Form.Text className="text-muted">Imagen actual: {currentMovie.imageUrl ? currentMovie.imageUrl.split('/').pop() : 'Ninguna'}</Form.Text>
                            {uploading && <Spinner animation="border" size="sm" className="ms-2" />}
                        </Form.Group>
                    </Col>
                    <Col md={6}> {/* Image preview on the other side */}
                        {currentMovie.imageUrl && (
                            <div className="mt-2">
                                <Form.Label>Previsualización de Imagen:</Form.Label>
                                <img src={currentMovie.imageUrl} alt="Previsualización" style={{ maxWidth: '150px', maxHeight: '150px', display: 'block', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>URL del Video de YouTube</Form.Label>
                            <Form.Control type="text" name="videoUrl" value={currentMovie.videoUrl} onChange={onMovieChange} />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave} disabled={uploading}>{isEditing ? 'Guardar Cambios' : 'Añadir Película'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MovieModal;
