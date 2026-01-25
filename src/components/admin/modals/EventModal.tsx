import React from 'react';
import { Modal, Form, Button, Spinner, Row, Col } from 'react-bootstrap'; // Import Row, Col

const EventModal = ({ show, onHide, isEditing, currentEvent, onEventChange, onEventImageChange, onSave, uploading }: { show: any, onHide: any, isEditing: any, currentEvent: any, onEventChange: any, onEventImageChange: any, onSave: any, uploading: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg"> {/* Added 'centered' and 'size="lg"' for better UX */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Evento' : 'Añadir Nuevo Evento'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}> {/* Two columns for title and date */}
                        <Form.Group className="mb-3">
                            <Form.Label>Título del Evento</Form.Label>
                            <Form.Control type="text" name="title" value={currentEvent.title} onChange={onEventChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha (Ej: Sábado, 25 de Febrero, 2026 - 10:00 AM)</Form.Label>
                            <Form.Control type="text" name="date" value={currentEvent.date} onChange={onEventChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={currentEvent.description} onChange={onEventChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen del Evento</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={onEventImageChange} />
                            <Form.Text className="text-muted">Imagen actual: {currentEvent.image ? currentEvent.image.split('/').pop() : 'Ninguna'}</Form.Text>
                            {currentEvent.image && (
                                <div className="mt-2">
                                    <Form.Label>Previsualización de Imagen:</Form.Label>
                                    <img src={currentEvent.image} alt="Previsualización" style={{ maxWidth: '150px', maxHeight: '150px', display: 'block', border: '1px solid #ddd', borderRadius: '4px' }} />
                                </div>
                            )}
                            {uploading && <Spinner animation="border" size="sm" className="ms-2" />}
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave} disabled={uploading}>{isEditing ? 'Guardar Cambios' : 'Añadir Evento'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;
