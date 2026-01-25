import React from 'react';
import { Form, Button } from 'react-bootstrap';

const HomeEditor = ({ content, handleContentChange, handleSave, isLoading }: { content: any, handleContentChange: any, handleSave: any, isLoading: any }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Título Principal (Hero Section)</Form.Label>
                <Form.Control as="textarea" rows={3} name="title" value={content.title || ''} onChange={handleContentChange} />
                <Form.Text>Puedes usar etiquetas HTML como `&lt;br /&gt;` para saltos de línea.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Subtítulo (Hero Section)</Form.Label>
                <Form.Control as="textarea" rows={3} name="subtitle" value={content.subtitle || ''} onChange={handleContentChange} />
            </Form.Group>
        </>
    );
};

export default HomeEditor;
