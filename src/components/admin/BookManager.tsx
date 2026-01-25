import React, { useState, useEffect } from 'react'; // Import useEffect
import { Button, Spinner, Form, Card } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import BookModal from './modals/BookModal';
import { toast } from 'react-toastify';

const BookManager = ({ pendingBooks, setPendingBooks, books, setBooks, handleSave, isLoading, uploadFile }: { pendingBooks: any, setPendingBooks: any, books: any, setBooks: any, handleSave: any, isLoading: any, uploadFile: any }) => { // Removed pendingBooks and setPendingBooks
    const [managedBooks, setManagedBooks] = useState(books); // Internal state for books
    const [showBookModal, setShowBookModal] = useState(false);
    const [currentBook, setCurrentBook] = useState({ filename: '', title: '', author: '', coverImage: '' });
    const [isEditingBook, setIsEditingBook] = useState(false);
    const [editBookIndex, setEditBookIndex] = useState(null);
    const [bookFileUpload, setBookFileUpload] = useState(null);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [bulkFiles, setBulkFiles] = useState([]);
    const [uploadingBulk, setUploadingBulk] = useState(false);

    // Update managedBooks when books prop changes (e.g., after initial fetch or a full save)
    useEffect(() => {
        setManagedBooks(books);
    }, [books]);

    const handleBookChange = (e: any) => {
        setCurrentBook({ ...currentBook, [e.target.name]: e.target.value });
    };

    const handleBookFileChange = (e: any) => {
        setBookFileUpload(e.target.files[0]);
    };

    const handleBulkFileChange = (e: any) => {
        setBulkFiles(Array.from(e.target.files));
    };

    const handleShowBookModal = (book: any = null, index: any = null) => {
        setIsEditingBook(book !== null);
        setEditBookIndex(index);
        setCurrentBook(book ? { ...(book as any) } : { filename: '', title: '', author: '', coverImage: '' });
        setBookFileUpload(null);
        setShowBookModal(true);
    };

    const handleCloseBookModal = () => {
        setShowBookModal(false);
        setCurrentBook({ filename: '', title: '', author: '', coverImage: '' });
    };

    const handleSaveBook = async () => {
        setUploadingPdf(true);
        let updatedFilename = currentBook.filename;
        let updatedCoverImage = currentBook.coverImage;

        if (bookFileUpload) {
            const uploadResult = await uploadFile(bookFileUpload, 'pdf');
            if (uploadResult === null) {
                setUploadingPdf(false);
                return;
            }
            updatedFilename = uploadResult.url;
            updatedCoverImage = uploadResult.coverImage;
        }
        setUploadingPdf(false);

        const bookToSave = { 
            ...currentBook, 
            filename: updatedFilename || '',
            coverImage: updatedCoverImage || '',
        };

        let updatedBooksList;
        if (isEditingBook) {
            updatedBooksList = managedBooks.map((book: any, idx: any) =>
                idx === editBookIndex ? bookToSave : book
            );
        } else {
            updatedBooksList = [...managedBooks, bookToSave];
        }
        setManagedBooks(updatedBooksList);
        handleCloseBookModal();
        toast.success('Libro añadido/actualizado. Recuerda guardar cambios.');
    };

    const handleBulkUpload = async () => {
        if (bulkFiles.length === 0) {
            toast.warn('Por favor, selecciona al menos un archivo para subir masivamente.');
            return;
        }
        setUploadingBulk(true);

        const formData = new FormData();
        bulkFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/upload/bulk-pdfs', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al subir archivos masivamente.');
            }

            const data = await response.json();
            setManagedBooks((prev: any) => [...prev, ...data.uploadedBooks]);
            setBulkFiles([]);
            toast.success(`${data.uploadedBooks.length} libros subidos y añadidos. Recuerda guardar cambios.`);

        } catch (error) {
            console.error('Error during bulk upload:', error);
            toast.error(`Error en la carga masiva: ${(error as any).message}`);
        } finally {
            setUploadingBulk(false);
        }
    };

    const handleDeleteBook = (index: any) => {
        const updatedBooksList = managedBooks.filter((_: any, i: any) => i !== index);
        setManagedBooks(updatedBooksList);
        toast.success('Libro eliminado. Recuerda guardar cambios.');
    };

    return (
        <>
            <Card className="mb-4 p-3">
                <Card.Title>Carga Masiva de Libros PDF</Card.Title>
                <Form.Group controlId="formBulkPdfUpload" className="mb-3">
                    <Form.Label>Selecciona múltiples archivos PDF</Form.Label>
                    <Form.Control type="file" accept=".pdf" multiple onChange={handleBulkFileChange} />
                </Form.Group>
                <Button 
                    variant="info" 
                    onClick={handleBulkUpload} 
                    disabled={bulkFiles.length === 0 || uploadingBulk || isLoading}
                >
                    {uploadingBulk ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            Subiendo...
                        </>
                    ) : (
                        `Añadir ${bulkFiles.length} Libros a Cambios Pendientes`
                    )}
                </Button>
            </Card>
            
            <CrudEditor
                items={managedBooks} // Now uses managedBooks
                columns={[
                    { header: 'Título', accessor: 'title' },
                    { header: 'Autor', accessor: 'author' },
                    { header: 'Nombre del Archivo', accessor: 'filename' },
                ]}
                onAdd={() => handleShowBookModal()}
                onEdit={(item: any, index: any) => handleShowBookModal(item, index)}
                onDelete={(index: any) => handleDeleteBook(index)} // Use new delete handler
                itemName="Libro"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('books', managedBooks); // Save managedBooks
                    setBooks(managedBooks); // Update parent state after save
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Libros
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setManagedBooks(books); // Reset to original prop value
                    toast.info('Cambios de libros descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <BookModal
                show={showBookModal}
                onHide={handleCloseBookModal}
                isEditing={isEditingBook}
                currentBook={currentBook}
                onBookChange={handleBookChange}
                onBookFileChange={handleBookFileChange}
                onSave={handleSaveBook} // This will now update managedBooks
                uploading={uploadingPdf}
            />
        </>
    );
};

export default BookManager;
