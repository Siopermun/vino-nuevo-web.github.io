import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, onHide, onConfirm, title, message }: { show: any, onHide: any, onConfirm: any, title: any, message: any }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
