import React from 'react';
import { Modal, Form, Button, Spinner, Row, Col } from 'react-bootstrap'; // Import Row, Col

const PastorModal = ({ show, onHide, isEditing, currentPastor, onPastorChange, onPastorImageChange, onSave, uploading }: { show: any, onHide: any, isEditing: any, currentPastor: any, onPastorChange: any, onPastorImageChange: any, onSave: any, uploading: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg"> {/* Added 'centered' and 'size="lg"' for better UX */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Pastor' : 'Añadir Nuevo Pastor'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}> {/* Name on one side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Pastor</Form.Label>
                            <Form.Control type="text" name="name" value={currentPastor.name} onChange={onPastorChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}> {/* Role on the other side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control type="text" name="role" value={currentPastor.role} onChange={onPastorChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}> {/* Image upload on one side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen del Pastor</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={onPastorImageChange} />
                            <Form.Text className="text-muted">Imagen actual: {currentPastor.image ? currentPastor.image.split('/').pop() : 'Ninguna'}</Form.Text>
                            {uploading && <Spinner animation="border" size="sm" className="ms-2" />}
                        </Form.Group>
                    </Col>
                    <Col md={6}> {/* Image preview on the other side */}
                        {currentPastor.image && (
                            <div className="mt-2">
                                <Form.Label>Previsualización de Imagen:</Form.Label>
                                <img src={currentPastor.image} alt="Previsualización" style={{ maxWidth: '150px', maxHeight: '150px', display: 'block', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave} disabled={uploading}>{isEditing ? 'Guardar Cambios' : 'Añadir Pastor'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PastorModal;
