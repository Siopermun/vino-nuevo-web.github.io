import React from 'react';
import { Modal, Form, Button, Spinner, Row, Col } from 'react-bootstrap'; // Import Row, Col

const CourseModal = ({ show, onHide, isEditing, currentCourse, onCourseChange, onCourseImageChange, onSave, uploading }: { show: any, onHide: any, isEditing: any, currentCourse: any, onCourseChange: any, onCourseImageChange: any, onSave: any, uploading: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg"> {/* Added 'centered' and 'size="lg"' for better UX */}
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Curso' : 'Añadir Nuevo Curso'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título del Curso</Form.Label>
                            <Form.Control type="text" name="title" value={currentCourse.title} onChange={onCourseChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={currentCourse.description} onChange={onCourseChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}> {/* Instructor on one side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Instructor</Form.Label>
                            <Form.Control type="text" name="instructor" value={currentCourse.instructor} onChange={onCourseChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}> {/* Schedule on the other side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Horario (Ej: Martes 7:00 PM)</Form.Label>
                            <Form.Control type="text" name="schedule" value={currentCourse.schedule} onChange={onCourseChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}> {/* Image upload on one side */}
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen del Curso</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={onCourseImageChange} />
                            <Form.Text className="text-muted">Imagen actual: {currentCourse.image ? currentCourse.image.split('/').pop() : 'Ninguna'}</Form.Text>
                            {uploading && <Spinner animation="border" size="sm" className="ms-2" />}
                        </Form.Group>
                    </Col>
                    <Col md={6}> {/* Image preview on the other side */}
                        {currentCourse.image && (
                            <div className="mt-2">
                                <Form.Label>Previsualización de Imagen:</Form.Label>
                                <img src={currentCourse.image} alt="Previsualización" style={{ maxWidth: '150px', maxHeight: '150px', display: 'block', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave} disabled={uploading}>{isEditing ? 'Guardar Cambios' : 'Añadir Curso'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CourseModal;
