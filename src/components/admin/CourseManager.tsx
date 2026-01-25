import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import CourseModal from './modals/CourseModal'; // Importar el modal
import { toast } from 'react-toastify';

const CourseManager = ({ pendingCourses, setPendingCourses, courses, setCourses, handleSave, isLoading, uploadFile }: { pendingCourses: any, setPendingCourses: any, courses: any, setCourses: any, handleSave: any, isLoading: any, uploadFile: any }) => {
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [currentCourse, setCurrentCourse] = useState({ id: '', title: '', description: '', instructor: '', schedule: '', image: '' });
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [editCourseIndex, setEditCourseIndex] = useState(null);
    const [courseImageUpload, setCourseImageUpload] = useState(null);
    const [uploadingCourseImage, setUploadingCourseImage] = useState(false);

    const handleCourseChange = (e: any) => {
        setCurrentCourse({ ...currentCourse, [e.target.name]: e.target.value });
    };

    const handleCourseImageChange = (e: any) => {
        setCourseImageUpload(e.target.files[0]);
    };

    const handleShowCourseModal = (course = null, index = null) => {
        setIsEditingCourse(course !== null);
        setEditCourseIndex(index);
        setCurrentCourse(course ? { ...(course as any) } : { id: Date.now(), title: '', description: '', instructor: '', schedule: '', image: '' });
        setCourseImageUpload(null);
        setShowCourseModal(true);
    };

    const handleCloseCourseModal = () => {
        setShowCourseModal(false);
        setCurrentCourse({ id: '', title: '', description: '', instructor: '', schedule: '', image: '' });
    };

    const handleSaveCourse = async () => {
        setUploadingCourseImage(true);
        let updatedImageUrl = currentCourse.image;
        if (courseImageUpload) {
            updatedImageUrl = await uploadFile(courseImageUpload, 'image');
        }
        setUploadingCourseImage(false);

        if (updatedImageUrl === null && courseImageUpload) {
            return;
        }

        let updatedPendingCourses = [...pendingCourses];
        const courseToSave = { ...currentCourse, image: updatedImageUrl || '' };

        if (isEditingCourse && editCourseIndex !== null) {
            updatedPendingCourses[editCourseIndex] = courseToSave;
        } else {
            updatedPendingCourses.push(courseToSave);
        }
        setPendingCourses(updatedPendingCourses);
        handleCloseCourseModal();
        toast.success('Curso actualizado en cambios pendientes. Recuerda guardar para persistir.');
    };

    return (
        <>
            <CrudEditor
                items={pendingCourses}
                columns={[
                    { header: 'Título', accessor: 'title' },
                    { header: 'Instructor', accessor: 'instructor' },
                    { header: 'Horario', accessor: 'schedule' },
                ]}
                onAdd={() => handleShowCourseModal()}
                onEdit={(item: any, index: any) => handleShowCourseModal(item, index)}
                onDelete={(index: any) => {
                    const updatedPendingCourses = pendingCourses.filter((_: any, i: any) => i !== index);
                    setPendingCourses(updatedPendingCourses);
                    toast.success('Curso eliminado de los cambios pendientes. Recuerda guardar para persistir.');
                }}
                itemName="Curso"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('courses', pendingCourses);
                    setCourses(pendingCourses);
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Cursos
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setPendingCourses(courses);
                    toast.info('Cambios de cursos descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <CourseModal
                show={showCourseModal}
                onHide={handleCloseCourseModal}
                isEditing={isEditingCourse}
                currentCourse={currentCourse}
                onCourseChange={handleCourseChange}
                onCourseImageChange={handleCourseImageChange}
                onSave={handleSaveCourse}
                uploading={uploadingCourseImage}
            />
        </>
    );
};

export default CourseManager;

