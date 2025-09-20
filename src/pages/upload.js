import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';

function SortableItem({ id, url, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative">
            <img src={url} alt={id} className="w-full rounded border shadow" />
            <button
                onClick={() => onDelete(id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
            >
                Suppr
            </button>
        </div>
    );
}

export default function UploadPage() {
    const [image, setImage] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [images, setImages] = useState([]); // tableau d'urls
    const router = useRouter();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else {
            fetchImages();
        }
    }, [token]);

    const fetchImages = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/list-images`);
            setImages(res.data.images);
        } catch (err) {
            console.error('Erreur chargement images');
        }
    };

    const handleUpload = async () => {
        if (!image) return alert('Sélectionne une image');
        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUploadedUrl(res.data.url);
            setImage(null);
            fetchImages();
        } catch (err) {
            alert('Échec upload');
        }
    };

    const handleDelete = async (filename) => {
        if (!window.confirm('Supprimer cette image ?')) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete/${filename}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setImages((prev) => prev.filter((url) => !url.includes(filename)));
        } catch (err) {
            alert('Erreur suppression');
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = images.findIndex((url) => url.includes(active.id));
            const newIndex = images.findIndex((url) => url.includes(over.id));

            const newImages = arrayMove(images, oldIndex, newIndex);
            setImages(newImages);

            // Envoie la nouvelle ordre au backend
            const filenames = newImages.map((url) => url.split('/').pop());
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/reorder`,
                    { filenames },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (err) {
                alert('Erreur sauvegarde ordre');
            }
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Uploader une image</h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full text-sm text-gray-600
               file:mr-4 file:py-2 file:px-4
               file:rounded file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
            />

            <button
                onClick={handleUpload}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
                Upload
            </button>
            

            <hr className="my-4" />

            <h3 className="text-xl font-medium text-gray-700">Galerie (Drag & Drop)</h3>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map((url) => url.split('/').pop())} strategy={verticalListSortingStrategy}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((url) => {
                            const filename = url.split('/').pop();
                            return <SortableItem key={filename} id={filename} url={url} onDelete={handleDelete} />;
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
