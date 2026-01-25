import React from 'react';
import { Modal, Form, Button, Spinner, Row, Col } from 'react-bootstrap'; // Import Row, Col

const BookModal = ({ show, onHide, isEditing, currentBook, onBookChange, onBookFileChange, onSave, uploading }: { show: any, onHide: any, isEditing: any, currentBook: any, onBookChange: any, onBookFileChange: any, onSave: any, uploading: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered> {/* Added 'centered' for better UX */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Libro' : 'Añadir Nuevo Libro'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título del Libro</Form.Label>
                            <Form.Control type="text" name="title" value={currentBook.title} onChange={onBookChange} />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Autor</Form.Label>
                            <Form.Control type="text" name="author" value={currentBook.author} onChange={onBookChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Archivo PDF</Form.Label>
                            <Form.Control type="file" accept=".pdf" onChange={onBookFileChange} />
                            <Form.Text className="text-muted">Archivo actual: {currentBook.filename ? currentBook.filename.split('/').pop() : 'Ninguno'}</Form.Text>
                            {uploading && <Spinner animation="border" size="sm" className="ms-2" />}
                        </Form.Group>
                    </Col>
                </Row>
                {currentBook.coverImage && (
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Label>Portada Actual:</Form.Label>
                            <img src={currentBook.coverImage} alt="Portada del libro" style={{ maxWidth: '100px', height: 'auto', display: 'block', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave} disabled={uploading}>{isEditing ? 'Guardar Cambios' : 'Añadir Libro'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookModal;
