import React, { useState, useEffect } from 'react';
import { database } from '../../firebase.config';
import { ref, onValue, update } from 'firebase/database';
import { Calendar, Phone, MapPin, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Reservation {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
    timestamp: number;
}

export const ReservationManager: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all');

    useEffect(() => {
        const reservationsRef = ref(database, 'reservations');
        const unsubscribe = onValue(reservationsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const reservationsList = Object.entries(data).map(([id, reservation]) => ({
                    id,
                    ...(reservation as Omit<Reservation, 'id'>),
                }));
                // Trier par date (plus récent en premier)
                reservationsList.sort((a, b) => b.timestamp - a.timestamp);
                setReservations(reservationsList);
            } else {
                setReservations([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = async (id: string, status: Reservation['status']) => {
        try {
            const reservationRef = ref(database, `reservations/${id}`);
            await update(reservationRef, { status });
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Erreur lors de la mise à jour du statut');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'confirmed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'delivered':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'confirmed':
                return 'Confirmée';
            case 'delivered':
                return 'Livrée';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };

    const filteredReservations = filter === 'all'
        ? reservations
        : reservations.filter(r => r.status === filter);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-4">Gestion des Réservations</h2>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { value: 'all', label: 'Toutes' },
                        { value: 'pending', label: 'En attente' },
                        { value: 'confirmed', label: 'Confirmées' },
                        { value: 'delivered', label: 'Livrées' },
                        { value: 'cancelled', label: 'Annulées' },
                    ].map((filterOption) => (
                        <button
                            key={filterOption.value}
                            onClick={() => setFilter(filterOption.value as any)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filter === filterOption.value
                                ? 'bg-gray-900 text-white'
                                : 'bg-black/5 text-black/70 hover:bg-black/10'
                                }`}
                        >
                            {filterOption.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reservations List */}
            <div className="space-y-4">
                {filteredReservations.length === 0 ? (
                    <div className="text-center py-12 text-black/50">
                        <Package size={48} className="mx-auto mb-4 opacity-30" />
                        <p>Aucune réservation trouvée</p>
                    </div>
                ) : (
                    filteredReservations.map((reservation) => (
                        <div
                            key={reservation.id}
                            className="border border-black/10 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                {/* Left Side - Info */}
                                <div className="flex-1 space-y-3">
                                    {/* Customer Info */}
                                    <div>
                                        <h3 className="text-lg font-bold text-black mb-2">{reservation.customerName}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-black/60">
                                            <div className="flex items-center space-x-2">
                                                <Phone size={16} />
                                                <span>{reservation.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin size={16} />
                                                <span>{reservation.address}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar size={16} />
                                                <span>{new Date(reservation.timestamp).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="bg-black/5 rounded-lg p-4">
                                        <h4 className="font-semibold text-black mb-2">Articles commandés:</h4>
                                        <ul className="space-y-1">
                                            {reservation.items.map((item, index) => (
                                                <li key={index} className="text-sm text-black/70 flex justify-between">
                                                    <span>
                                                        {item.name} <span className="text-black/50">x{item.quantity}</span>
                                                    </span>
                                                    <span className="font-medium">{(item.price * item.quantity).toFixed(2)} DT</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="border-t border-black/10 mt-3 pt-3 flex justify-between items-center">
                                            <span className="font-bold text-black">Total:</span>
                                            <span className="text-xl font-bold text-black">{reservation.total.toFixed(2)} DT</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Status & Actions */}
                                <div className="lg:w-64 space-y-3">
                                    {/* Status Badge */}
                                    <div className={`px-4 py-2 rounded-lg border text-center font-medium ${getStatusColor(reservation.status)}`}>
                                        {getStatusLabel(reservation.status)}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2">
                                        {reservation.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(reservation.id, 'confirmed')}
                                                    className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    <CheckCircle size={18} />
                                                    <span>Confirmer</span>
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(reservation.id, 'cancelled')}
                                                    className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <XCircle size={18} />
                                                    <span>Annuler</span>
                                                </button>
                                            </>
                                        )}
                                        {reservation.status === 'confirmed' && (
                                            <button
                                                onClick={() => updateStatus(reservation.id, 'delivered')}
                                                className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                <Package size={18} />
                                                <span>Marquer comme livrée</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
