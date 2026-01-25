import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import EventModal from './modals/EventModal';
import { toast } from 'react-toastify';

const EventManager = ({ pendingEvents, setPendingEvents, events, setEvents, handleSave, isLoading, uploadFile }: { pendingEvents: any, setPendingEvents: any, events: any, setEvents: any, handleSave: any, isLoading: any, uploadFile: any }) => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({ id: '', title: '', date: '', description: '', image: '' });
    const [isEditingEvent, setIsEditingEvent] = useState(false);
    const [editEventIndex, setEditEventIndex] = useState(null);
    const [eventImageUpload, setEventImageUpload] = useState(null);
    const [uploadingEventImage, setUploadingEventImage] = useState(false);

    const handleEventChange = (e: any) => {
        setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
    };

    const handleEventImageChange = (e: any) => {
        setEventImageUpload(e.target.files[0]);
    };

    const handleShowEventModal = (event = null, index = null) => {
        setIsEditingEvent(event !== null);
        setEditEventIndex(index);
        setCurrentEvent(event ? { ...(event as any) } : { id: Date.now(), title: '', date: '', description: '', image: '' });
        setEventImageUpload(null);
        setShowEventModal(true);
    };

    const handleCloseEventModal = () => {
        setShowEventModal(false);
        setCurrentEvent({ id: '', title: '', date: '', description: '', image: '' });
    };

    const handleSaveEvent = async () => {
        setUploadingEventImage(true);
        let updatedImageUrl = currentEvent.image;
        if (eventImageUpload) {
            updatedImageUrl = await uploadFile(eventImageUpload, 'image');
        }
        setUploadingEventImage(false);

        if (updatedImageUrl === null && eventImageUpload) {
            return;
        }

        let updatedPendingEvents = [...pendingEvents];
        const eventToSave = { ...currentEvent, image: updatedImageUrl || '' };

        if (isEditingEvent && editEventIndex !== null) {
            updatedPendingEvents[editEventIndex] = eventToSave;
        } else {
            updatedPendingEvents.push(eventToSave);
        }
        setPendingEvents(updatedPendingEvents);
        handleCloseEventModal();
        toast.success('Evento actualizado en cambios pendientes. Recuerda guardar para persistir.');
    };

    return (
        <>
            <CrudEditor
                items={pendingEvents}
                columns={[
                    { header: 'Título', accessor: 'title' },
                    { header: 'Fecha', accessor: 'date' },
                    { header: 'Descripción', accessor: 'description' },
                    { header: 'Imagen URL', accessor: 'image' },
                ]}
                onAdd={() => handleShowEventModal()}
                onEdit={(item: any, index: any) => handleShowEventModal(item, index)}
                onDelete={(index: any) => {
                    const updatedPendingEvents = pendingEvents.filter((_: any, i: any) => i !== index);
                    setPendingEvents(updatedPendingEvents);
                    toast.success('Evento eliminado de los cambios pendientes. Recuerda guardar para persistir.');
                }}
                itemName="Evento"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('events', pendingEvents);
                    setEvents(pendingEvents);
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Eventos
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setPendingEvents(events);
                    toast.info('Cambios de eventos descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <EventModal
                show={showEventModal}
                onHide={handleCloseEventModal}
                isEditing={isEditingEvent}
                currentEvent={currentEvent}
                onEventChange={handleEventChange}
                onEventImageChange={handleEventImageChange}
                onSave={handleSaveEvent}
                uploading={uploadingEventImage}
            />
        </>
    );
};

export default EventManager;
