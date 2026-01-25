import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'; // Import Row, Col

const SermonModal = ({ show, onHide, isEditing, currentSermon, onSermonChange, onSave }: { show: any, onHide: any, isEditing: any, currentSermon: any, onSermonChange: any, onSave: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg"> {/* Added 'centered' and 'size="lg"' for better UX */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Prédica' : 'Añadir Nueva Prédica'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}> {/* Two columns for title and preacher */}
                        <Form.Group className="mb-3">
                            <Form.Label>Título de la Prédica</Form.Label>
                            <Form.Control type="text" name="title" value={currentSermon.title} onChange={onSermonChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Predicador</Form.Label>
                            <Form.Control type="text" name="preacher" value={currentSermon.preacher} onChange={onSermonChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha (Ej: Domingo, 19 de Enero, 2025)</Form.Label>
                            <Form.Control type="text" name="date" value={currentSermon.date} onChange={onSermonChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={currentSermon.description} onChange={onSermonChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>URL del Video de YouTube</Form.Label>
                            <Form.Control type="text" name="videoUrl" value={currentSermon.videoUrl} onChange={onSermonChange} />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave}>{isEditing ? 'Guardar Cambios' : 'Añadir Prédica'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SermonModal;
