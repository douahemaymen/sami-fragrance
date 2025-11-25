import React, { useState } from 'react';
import { X, User, Phone, MapPin, ShoppingBag, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { database } from '../firebase.config';
import { ref, push } from 'firebase/database';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    total: number;
    onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen,
    onClose,
    cartItems,
    total,
    onSuccess
}) => {
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Préparer les données de réservation
            const reservationData = {
                customerName: formData.customerName,
                phone: formData.phone,
                address: formData.address,
                items: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total: total,
                status: 'pending',
                timestamp: Date.now(),
            };

            // Enregistrer dans Firebase
            const reservationsRef = ref(database, 'reservations');
            await push(reservationsRef, reservationData);

            // Afficher le succès
            setIsSuccess(true);

            // Réinitialiser après 2 secondes
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({ customerName: '', phone: '', address: '' });
                onSuccess();
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Error saving reservation:', error);
            alert('Erreur lors de l\'enregistrement de la réservation');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {isSuccess ? (
                    // Success State
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-green-600" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-2">Réservation Confirmée !</h3>
                        <p className="text-black/60">
                            Nous vous contacterons bientôt pour confirmer votre commande.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-black/5 p-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-black">Finaliser la Commande</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-black/70" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Customer Name */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Nom Complet *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={20} />
                                    <input
                                        type="text"
                                        required
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                        placeholder="Ahmed Ben Ali"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Téléphone *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={20} />
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                        placeholder="50 997 060"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Adresse de Livraison *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 text-black/40" size={20} />
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                                        placeholder="Avenue Habib Bourguiba, Tunis"
                                    />
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-black/5 rounded-xl p-4">
                                <h4 className="font-semibold text-black mb-3 flex items-center space-x-2">
                                    <ShoppingBag size={18} />
                                    <span>Résumé de la Commande</span>
                                </h4>
                                <ul className="space-y-2 mb-3">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="text-sm text-black/70 flex justify-between">
                                            <span>
                                                {item.name} <span className="text-black/50">x{item.quantity}</span>
                                            </span>
                                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)} DT</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-black/10 pt-3 flex justify-between items-center">
                                    <span className="font-bold text-black">Total:</span>
                                    <span className="text-xl font-bold text-black">{total.toFixed(2)} DT</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-gold-400 py-4 rounded-xl hover:bg-black/90 hover:text-gold-300 transition-all duration-300 font-bold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gold-400 border-t-transparent"></div>
                                        <span>Enregistrement...</span>
                                    </>
                                ) : (
                                    <span>Confirmer la Réservation</span>
                                )}
                            </button>

                            <p className="text-xs text-black/50 text-center">
                                En confirmant, vous acceptez que nous vous contactions pour finaliser votre commande.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
