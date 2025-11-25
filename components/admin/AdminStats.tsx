import React, { useState, useEffect } from 'react';
import { database } from '../../firebase.config';
import { ref, onValue } from 'firebase/database';
import { BarChart3, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

interface Stats {
    totalPerfumes: number;
    totalReservations: number;
    totalRevenue: number;
    recentOrders: number;
}

export const AdminStats: React.FC = () => {
    const [stats, setStats] = useState<Stats>({
        totalPerfumes: 0,
        totalReservations: 0,
        totalRevenue: 0,
        recentOrders: 0,
    });

    useEffect(() => {
        // Écouter les parfums
        const perfumesRef = ref(database, 'perfumes');
        const unsubscribePerfumes = onValue(perfumesRef, (snapshot) => {
            const data = snapshot.val();
            const count = data ? Object.keys(data).length : 0;
            setStats(prev => ({ ...prev, totalPerfumes: count }));
        });

        // Écouter les réservations
        const reservationsRef = ref(database, 'reservations');
        const unsubscribeReservations = onValue(reservationsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const reservations = Object.values(data) as any[];
                const total = reservations.length;
                const revenue = reservations.reduce((sum, res) => sum + (res.total || 0), 0);

                // Réservations des 7 derniers jours
                const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
                const recent = reservations.filter(res => res.timestamp > sevenDaysAgo).length;

                setStats(prev => ({
                    ...prev,
                    totalReservations: total,
                    totalRevenue: revenue,
                    recentOrders: recent,
                }));
            }
        });

        return () => {
            unsubscribePerfumes();
            unsubscribeReservations();
        };
    }, []);

    const statCards = [
        {
            title: 'Total Parfums',
            value: stats.totalPerfumes,
            icon: Package,
            color: 'bg-blue-500',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
        {
            title: 'Réservations',
            value: stats.totalReservations,
            icon: ShoppingCart,
            color: 'bg-green-500',
            bgLight: 'bg-green-50',
            textColor: 'text-green-600',
        },
        {
            title: 'Revenu Total',
            value: `${stats.totalRevenue.toFixed(2)} DT`,
            icon: TrendingUp,
            color: 'bg-purple-500',
            bgLight: 'bg-purple-50',
            textColor: 'text-purple-600',
        },
        {
            title: 'Commandes (7j)',
            value: stats.recentOrders,
            icon: BarChart3,
            color: 'bg-orange-500',
            bgLight: 'bg-orange-50',
            textColor: 'text-orange-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-all duration-300 group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-black/50 mb-2">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-black">
                                {typeof stat.value === 'number' ? stat.value : stat.value}
                            </h3>
                        </div>
                        <div className={`${stat.bgLight} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className={`${stat.textColor} w-6 h-6`} strokeWidth={2} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
