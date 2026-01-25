import React from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';

const GalleryImageModal = ({ show, onHide, isEditing, currentImage, onImageChange, onImageFileChange, onSave, uploading }: { show: any, onHide: any, isEditing: any, currentImage: any, onImageChange: any, onImageFileChange: any, onSave: any, uploading: any }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Editar Imagen de la Galería' : 'Añadir Nueva Imagen a la Galería'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Texto Alternativo (Alt Text)</Form.Label>
                    <Form.Control type="text" name="alt" value={currentImage.alt} onChange={onImageChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={onImageFileChange} />
                    <Form.Text className="text-muted">Imagen actual: {currentImage.src || 'Ninguna'}</Form.Text>
                    {currentImage.src && <img src={currentImage.src} alt="Previsualización" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }} />}
                    {uploading && <Spinner animation="border" size="sm" className="ms-2" />}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onSave} disabled={uploading}>{isEditing ? 'Guardar Cambios' : 'Añadir Imagen'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GalleryImageModal;
