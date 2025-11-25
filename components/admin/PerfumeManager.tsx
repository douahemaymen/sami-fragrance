import React, { useState, useEffect } from 'react';
import { database } from '../../firebase.config';
import { ref, push, set, remove, onValue } from 'firebase/database';
import { uploadImageToCloudinary } from '../../cloudinary.config';
import { Plus, Edit2, Trash2, Upload, X, Save, Image as ImageIcon } from 'lucide-react';

interface Perfume {
    id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
    createdAt?: number;
}

export const PerfumeManager: React.FC = () => {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<Perfume>({
        name: '',
        price: 0,
        description: '',
        image: '',
        category: 'Homme',
        stock: 0,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        const perfumesRef = ref(database, 'perfumes');
        const unsubscribe = onValue(perfumesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const perfumesList = Object.entries(data).map(([id, perfume]) => ({
                    id,
                    ...(perfume as Omit<Perfume, 'id'>),
                }));
                setPerfumes(perfumesList);
            } else {
                setPerfumes([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.image;

            // Upload image to Cloudinary if a new image is selected
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile);
            }

            const perfumeData = {
                ...formData,
                image: imageUrl,
                createdAt: editingPerfume?.createdAt || Date.now(),
                updatedAt: Date.now(),
            };

            if (editingPerfume?.id) {
                // Update existing perfume
                const perfumeRef = ref(database, `perfumes/${editingPerfume.id}`);
                await set(perfumeRef, perfumeData);
            } else {
                // Add new perfume
                const perfumesRef = ref(database, 'perfumes');
                await push(perfumesRef, perfumeData);
            }

            // Reset form
            setFormData({
                name: '',
                price: 0,
                description: '',
                image: '',
                category: 'Homme',
                stock: 0,
            });
            setImageFile(null);
            setImagePreview('');
            setEditingPerfume(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving perfume:', error);
            alert('Erreur lors de l\'enregistrement du parfum');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (perfume: Perfume) => {
        setEditingPerfume(perfume);
        setFormData(perfume);
        setImagePreview(perfume.image);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce parfum ?')) {
            try {
                const perfumeRef = ref(database, `perfumes/${id}`);
                await remove(perfumeRef);
            } catch (error) {
                console.error('Error deleting perfume:', error);
                alert('Erreur lors de la suppression');
            }
        }
    };

    const openAddModal = () => {
        setEditingPerfume(null);
        setFormData({
            name: '',
            price: 0,
            description: '',
            image: '',
            category: 'Homme',
            stock: 0,
        });
        setImageFile(null);
        setImagePreview('');
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-black">Gestion des Parfums</h2>
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                    <Plus size={20} strokeWidth={2} />
                    <span className="font-medium">Ajouter un Parfum</span>
                </button>
            </div>

            {/* Perfumes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perfumes.map((perfume) => (
                    <div
                        key={perfume.id}
                        className="border border-black/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img
                                src={perfume.image}
                                alt={perfume.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(perfume)}
                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors shadow-sm"
                                >
                                    <Edit2 size={16} className="text-blue-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(perfume.id!)}
                                    className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors shadow-sm"
                                >
                                    <Trash2 size={16} className="text-red-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-black mb-1">{perfume.name}</h3>
                            <p className="text-sm text-black/60 mb-2 line-clamp-2">{perfume.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-black">{perfume.price} DT</span>
                                <span className="text-sm text-black/50">Stock: {perfume.stock}</span>
                            </div>
                            <div className="mt-2">
                                <span className="inline-block bg-black/5 text-black/70 text-xs px-3 py-1 rounded-full">
                                    {perfume.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b border-black/5 p-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-black">
                                {editingPerfume ? 'Modifier le Parfum' : 'Ajouter un Parfum'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-black/70" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Image du Parfum
                                </label>
                                <div className="border-2 border-dashed border-black/10 rounded-xl p-6 text-center hover:border-black/30 transition-colors">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-64 mx-auto rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview('');
                                                    setImageFile(null);
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <ImageIcon className="mx-auto mb-4 text-black/30" size={48} />
                                            <label className="cursor-pointer">
                                                <span className="bg-gray-900 text-white px-6 py-3 rounded-xl inline-flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                                                    <Upload size={20} />
                                                    <span>Choisir une image</span>
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Nom du Parfum *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                    placeholder="Ex: Dior Sauvage"
                                />
                            </div>

                            {/* Price & Stock */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-black/70 mb-2">
                                        Prix (DT) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black/70 mb-2">
                                        Stock *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Catégorie *
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                >
                                    <option value="Homme">Homme</option>
                                    <option value="Femme">Femme</option>
                                    <option value="Unisexe">Unisexe</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                                    placeholder="Décrivez le parfum..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            <span>Enregistrement...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            <span>{editingPerfume ? 'Mettre à jour' : 'Ajouter'}</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-4 border border-black/10 rounded-xl hover:bg-black/5 transition-all duration-300 font-medium"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
