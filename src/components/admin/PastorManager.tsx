import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import PastorModal from './modals/PastorModal'; // Importar el modal
import { toast } from 'react-toastify';

const PastorManager = ({ pendingPastors, setPendingPastors, pastors, setPastors, handleSave, isLoading, uploadFile }: { pendingPastors: any, setPendingPastors: any, pastors: any, setPastors: any, handleSave: any, isLoading: any, uploadFile: any }) => {
    const [showPastorModal, setShowPastorModal] = useState(false);
    const [currentPastor, setCurrentPastor] = useState({ id: '', name: '', role: '', image: '' });
    const [isEditingPastor, setIsEditingPastor] = useState(false);
    const [editPastorIndex, setEditPastorIndex] = useState(null);
    const [pastorImageUpload, setPastorImageUpload] = useState(null);
    const [uploadingPastorImage, setUploadingPastorImage] = useState(false);

    const handlePastorChange = (e: any) => {
        setCurrentPastor({ ...currentPastor, [e.target.name]: e.target.value });
    };

    const handlePastorImageChange = (e: any) => {
        setPastorImageUpload(e.target.files[0]);
    };

    const handleShowPastorModal = (pastor = null, index = null) => {
        setIsEditingPastor(pastor !== null);
        setEditPastorIndex(index);
        setCurrentPastor(pastor ? { ...(pastor as any) } : { id: Date.now(), name: '', role: '', image: '' });
        setPastorImageUpload(null);
        setShowPastorModal(true);
    };

    const handleClosePastorModal = () => {
        setShowPastorModal(false);
        setCurrentPastor({ id: '', name: '', role: '', image: '' });
    };

    const handleSavePastor = async () => {
        setUploadingPastorImage(true);
        let updatedImageUrl = currentPastor.image;
        if (pastorImageUpload) {
            updatedImageUrl = await uploadFile(pastorImageUpload, 'image');
        }
        setUploadingPastorImage(false);

        if (updatedImageUrl === null && pastorImageUpload) {
            return;
        }

        let updatedPendingPastors = [...pendingPastors];
        const pastorToSave = { ...currentPastor, image: updatedImageUrl || '' };

        if (isEditingPastor && editPastorIndex !== null) {
            updatedPendingPastors[editPastorIndex] = pastorToSave;
        } else {
            updatedPendingPastors.push(pastorToSave);
        }
        setPendingPastors(updatedPendingPastors);
        handleClosePastorModal();
        toast.success('Pastor actualizado en cambios pendientes. Recuerda guardar para persistir.');
    };

    return (
        <>
            <CrudEditor
                items={pendingPastors}
                columns={[
                    { header: 'Nombre', accessor: 'name' },
                    { header: 'Rol', accessor: 'role' },
                    { header: 'Imagen', accessor: 'image' },
                ]}
                onAdd={() => handleShowPastorModal()}
                onEdit={(item: any, index: any) => handleShowPastorModal(item, index)}
                onDelete={(index: any) => {
                    const updatedPendingPastors = pendingPastors.filter((_: any, i: any) => i !== index);
                    setPendingPastors(updatedPendingPastors);
                    toast.success('Pastor eliminado de los cambios pendientes. Recuerda guardar para persistir.');
                }}
                itemName="Pastor"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('pastors', pendingPastors);
                    setPastors(pendingPastors);
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Pastores
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setPendingPastors(pastors);
                    toast.info('Cambios de pastores descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <PastorModal
                show={showPastorModal}
                onHide={handleClosePastorModal}
                isEditing={isEditingPastor}
                currentPastor={currentPastor}
                onPastorChange={handlePastorChange}
                onPastorImageChange={handlePastorImageChange}
                onSave={handleSavePastor}
                uploading={uploadingPastorImage}
            />
        </>
    );
};

export default PastorManager;
