import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import GalleryAlbumModal from './modals/GalleryAlbumModal'; // Importar el modal
import { toast } from 'react-toastify';

const GalleryManager = ({ pendingGalleryImages, setPendingGalleryImages, galleryImages, setGalleryImages, handleSave, isLoading, uploadFile, token }: { pendingGalleryImages: any, setPendingGalleryImages: any, galleryImages: any, setGalleryImages: any, handleSave: any, isLoading: any, uploadFile: any, token: any }) => {
    const [showGalleryAlbumModal, setShowGalleryAlbumModal] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [isEditingAlbum, setIsEditingAlbum] = useState(false);
    const [editAlbumIndex, setEditAlbumIndex] = useState(null);

    const handleShowGalleryAlbumModal = (album = null, index = null) => {
        setCurrentAlbum(album ? { ...(album as any) } : { id: Date.now(), title: '', description: '', coverImage: '', images: [] });
        setIsEditingAlbum(album !== null);
        setEditAlbumIndex(index);
        setShowGalleryAlbumModal(true);
    };

    const handleCloseGalleryAlbumModal = () => {
        setShowGalleryAlbumModal(false);
        setCurrentAlbum(null);
    };

    const handleSaveGalleryAlbum = async (albumToSave: any) => {
        let updatedPendingGalleryImages = [...pendingGalleryImages];
        if (isEditingAlbum && editAlbumIndex !== null) {
            updatedPendingGalleryImages[editAlbumIndex] = albumToSave;
        } else {
            updatedPendingGalleryImages.push(albumToSave);
        }
        setPendingGalleryImages(updatedPendingGalleryImages);
        handleCloseGalleryAlbumModal();
        toast.success('Álbum de galería actualizado en cambios pendientes. Recuerda guardar para persistir.');
    };
    
    return (
        <>
            <CrudEditor
                items={pendingGalleryImages}
                columns={[
                    { header: 'Título', accessor: 'title' },
                    { header: 'Descripción', accessor: 'description' },
                    { header: 'Imagen de Portada', cell: (item: any) => <img src={item.coverImage} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} /> },
                    { header: 'Imágenes', cell: (item: any) => `${item.images.length} imágenes` },
                ]}
                onAdd={() => handleShowGalleryAlbumModal()}
                onEdit={(item: any, index: any) => handleShowGalleryAlbumModal(item, index)}
                onDelete={(index: any) => {
                    const updatedPendingGalleryImages = pendingGalleryImages.filter((_: any, i: any) => i !== index);
                    setPendingGalleryImages(updatedPendingGalleryImages);
                    toast.success('Álbum eliminado de los cambios pendientes. Recuerda guardar para persistir.');
                }}
                itemName="Álbum de Galería"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('galleryImages', pendingGalleryImages);
                    setGalleryImages(pendingGalleryImages);
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Galería
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setPendingGalleryImages(galleryImages);
                    toast.info('Cambios de galería descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <GalleryAlbumModal
                show={showGalleryAlbumModal}
                onHide={handleCloseGalleryAlbumModal}
                isEditing={isEditingAlbum}
                currentAlbum={currentAlbum}
                onSave={handleSaveGalleryAlbum}
                uploadFile={uploadFile}
                token={token}
            />
        </>
    );
};

export default GalleryManager;
