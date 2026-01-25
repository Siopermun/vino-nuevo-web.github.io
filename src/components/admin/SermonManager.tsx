import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import SermonModal from './modals/SermonModal'; // Importar el modal
import { toast } from 'react-toastify';

const SermonManager = ({ pendingSermons, setPendingSermons, sermons, setSermons, handleSave, isLoading }: { pendingSermons: any, setPendingSermons: any, sermons: any, setSermons: any, handleSave: any, isLoading: any }) => {
    const [showSermonModal, setShowSermonModal] = useState(false);
    const [currentSermon, setCurrentSermon] = useState({ id: '', title: '', preacher: '', date: '', description: '', videoUrl: '' });
    const [isEditingSermon, setIsEditingSermon] = useState(false);
    const [editSermonIndex, setEditSermonIndex] = useState(null);

    const handleSermonChange = (e: any) => {
        setCurrentSermon({ ...currentSermon, [e.target.name]: e.target.value });
    };

    const handleShowSermonModal = (sermon = null, index = null) => {
        setIsEditingSermon(sermon !== null);
        setEditSermonIndex(index);
        setCurrentSermon(sermon ? { ...(sermon as any) } : { id: Date.now(), title: '', preacher: '', date: '', description: '', videoUrl: '' });
        setShowSermonModal(true);
    };

    const handleCloseSermonModal = () => {
        setShowSermonModal(false);
        setCurrentSermon({ id: '', title: '', preacher: '', date: '', description: '', videoUrl: '' });
    };

    const handleSaveSermon = async () => {
        let updatedPendingSermons = [...pendingSermons];
        if (isEditingSermon && editSermonIndex !== null) {
            updatedPendingSermons[editSermonIndex] = currentSermon;
        } else {
            updatedPendingSermons.push(currentSermon);
        }
        setPendingSermons(updatedPendingSermons);
        handleCloseSermonModal();
        toast.success('Prédica actualizada en cambios pendientes. Recuerda guardar para persistir.');
    };

    return (
        <>
            <CrudEditor
                items={pendingSermons}
                columns={[
                    { header: 'Título', accessor: 'title' },
                    { header: 'Predicador', accessor: 'preacher' },
                    { header: 'Fecha', accessor: 'date' },
                    { header: 'Descripción', accessor: 'description' },
                    { header: 'URL del Video', accessor: 'videoUrl' },
                ]}
                onAdd={() => handleShowSermonModal()}
                onEdit={(item: any, index: any) => handleShowSermonModal(item, index)}
                onDelete={(index: any) => {
                    const updatedPendingSermons = pendingSermons.filter((_: any, i: any) => i !== index);
                    setPendingSermons(updatedPendingSermons);
                    toast.success('Prédica eliminada de los cambios pendientes. Recuerda guardar para persistir.');
                }}
                itemName="Prédica"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('sermons', pendingSermons);
                    setSermons(pendingSermons);
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Prédicas
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setPendingSermons(sermons);
                    toast.info('Cambios de prédicas descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <SermonModal
                show={showSermonModal}
                onHide={handleCloseSermonModal}
                isEditing={isEditingSermon}
                currentSermon={currentSermon}
                onSermonChange={handleSermonChange}
                onSave={handleSaveSermon}
            />
        </>
    );
};

export default SermonManager;
