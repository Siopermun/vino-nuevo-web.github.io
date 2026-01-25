import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const CourseEnrollmentModal = ({ show, onHide, course }: { show: any, onHide: any, course: any }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!show) {
            // Reset form fields when modal closes
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setError('');
        }
    }, [show]);

    const handleEnroll = () => {
        if (!name || !email || !phone) {
            setError('Por favor, completa todos los campos obligatorios (Nombre, Email, Teléfono).');
            return;
        }

        // Placeholder WhatsApp number for the church
        const churchWhatsappNumber = '+1234567890'; // TODO: Replace with actual WhatsApp number

        const whatsappMessage = `¡Hola! Me gustaría inscribirme en el curso "${course.title}".\n\nMis datos son:\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje adicional: ${message || 'Ninguno'}`;
        const whatsappUrl = `https://wa.me/${churchWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Open WhatsApp link
        window.open(whatsappUrl, '_blank');

        onHide(); // Close the modal
        alert('Se ha abierto una conversación de WhatsApp con los datos de tu inscripción. Por favor, envía el mensaje para confirmar.');
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Inscripción al Curso: {course?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre Completo <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Número de Teléfono (WhatsApp) <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <Form.Text className="text-muted">
                            Nos contactaremos contigo a este número.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mensaje Adicional</Form.Label>
                        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleEnroll}>
                    Inscribirse (vía WhatsApp)
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CourseEnrollmentModal;
