import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import CrudEditor from './CrudEditor';
import MovieModal from './modals/MovieModal'; // Importar el modal
import { toast } from 'react-toastify';

const MovieManager = ({ pendingMovies, setPendingMovies, movies, setMovies, handleSave, isLoading, uploadFile }: { pendingMovies: any, setPendingMovies: any, movies: any, setMovies: any, handleSave: any, isLoading: any, uploadFile: any }) => {
    const [showMovieModal, setShowMovieModal] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({ id: '', title: '', description: '', imageUrl: '', videoUrl: '' });
    const [isEditingMovie, setIsEditingMovie] = useState(false);
    const [editMovieIndex, setEditMovieIndex] = useState(null);
    const [movieImageUpload, setMovieImageUpload] = useState(null);
    const [uploadingMovieImage, setUploadingMovieImage] = useState(false);

    const handleMovieChange = (e: any) => {
        setCurrentMovie({ ...currentMovie, [e.target.name]: e.target.value });
    };

    const handleMovieImageChange = (e: any) => {
        setMovieImageUpload(e.target.files[0]);
    };

    const handleShowMovieModal = (movie = null, index = null) => {
        setIsEditingMovie(movie !== null);
        setEditMovieIndex(index);
        setCurrentMovie(movie ? { ...(movie as any) } : { id: Date.now(), title: '', description: '', imageUrl: '', videoUrl: '' });
        setMovieImageUpload(null);
        setShowMovieModal(true);
    };

    const handleCloseMovieModal = () => {
        setShowMovieModal(false);
        setCurrentMovie({ id: '', title: '', description: '', imageUrl: '', videoUrl: '' });
    };

    const handleSaveMovie = async () => {
        setUploadingMovieImage(true);
        let updatedImageUrl = currentMovie.imageUrl;
        if (movieImageUpload) {
            updatedImageUrl = await uploadFile(movieImageUpload, 'image');
        }
        setUploadingMovieImage(false);

        if (updatedImageUrl === null && movieImageUpload) {
            return;
        }

        let updatedPendingMovies = [...pendingMovies];
        const movieToSave = { ...currentMovie, imageUrl: updatedImageUrl || '' };

        if (isEditingMovie && editMovieIndex !== null) {
            updatedPendingMovies[editMovieIndex] = movieToSave;
        } else {
            updatedPendingMovies.push(movieToSave);
        }
        setPendingMovies(updatedPendingMovies);
        handleCloseMovieModal();
        toast.success('Película actualizada en cambios pendientes. Recuerda guardar para persistir.');
    };

    return (
        <>
            <CrudEditor
                items={pendingMovies}
                columns={[
                    { header: 'Título', accessor: 'title' },
                    { header: 'Descripción', accessor: 'description' },
                    { header: 'Imagen URL', accessor: 'imageUrl' },
                    { header: 'Video URL', accessor: 'videoUrl' },
                ]}
                onAdd={() => handleShowMovieModal()}
                onEdit={(item: any, index: any) => handleShowMovieModal(item, index)}
                onDelete={(index: any) => {
                    const updatedPendingMovies = pendingMovies.filter((_: any, i: any) => i !== index);
                    setPendingMovies(updatedPendingMovies);
                    toast.success('Película eliminada de los cambios pendientes. Recuerda guardar para persistir.');
                }}
                itemName="Película"
            />
            <Button
                variant="success"
                onClick={async () => {
                    await handleSave('movies', pendingMovies);
                    setMovies(pendingMovies);
                }}
                className="mt-3 me-2"
                disabled={isLoading}
            >
                Guardar Cambios de Películas
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setPendingMovies(movies);
                    toast.info('Cambios de películas descartados.');
                }}
                className="mt-3"
                disabled={isLoading}
            >
                Descartar Cambios
            </Button>

            <MovieModal
                show={showMovieModal}
                onHide={handleCloseMovieModal}
                isEditing={isEditingMovie}
                currentMovie={currentMovie}
                onMovieChange={handleMovieChange}
                onMovieImageChange={handleMovieImageChange}
                onSave={handleSaveMovie}
                uploading={uploadingMovieImage}
            />
        </>
    );
};

export default MovieManager;

