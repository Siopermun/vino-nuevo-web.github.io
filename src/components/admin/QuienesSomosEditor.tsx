import React from 'react';
import { Form, Button } from 'react-bootstrap';

const QuienesSomosEditor = ({ content, handleContentChange, handleSave, isLoading }: { content: any, handleContentChange: any, handleSave: any, isLoading: any }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Título ("Nuestro Ministerio")</Form.Label>
                <Form.Control type="text" name="title" value={content.title || ''} onChange={handleContentChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Texto de "Lead"</Form.Label>
                <Form.Control type="text" name="lead" value={content.lead || ''} onChange={handleContentChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del Ministerio</Form.Label>
                <Form.Control type="text" name="ministryName" value={content.ministryName || ''} onChange={handleContentChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Alcance</Form.Label>
                <Form.Control type="text" name="scope" value={content.scope || ''} onChange={handleContentChange} />
            </Form.Group>
        </>
    );
};

export default QuienesSomosEditor;
