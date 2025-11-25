import React, { useState } from 'react';
import { Auth, User } from 'firebase/auth';
import { Database } from 'firebase/database';
import { AdminStats } from './admin/AdminStats';
import { PerfumeManager } from './admin/PerfumeManager';
import { ReservationManager } from './admin/ReservationManager';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X } from 'lucide-react';

type TabType = 'dashboard' | 'perfumes' | 'reservations';

interface AdminDashboardProps {
    auth: Auth;
    database: Database;
    currentUser: User;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ auth, database, currentUser, onLogout }) => {
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tabs = [
        { id: 'dashboard' as TabType, label: 'Tableau de Bord', icon: LayoutDashboard },
        { id: 'perfumes' as TabType, label: 'Parfums', icon: Package },
        { id: 'reservations' as TabType, label: 'Réservations', icon: ShoppingCart },
    ];

    const handleTabChange = (tabId: TabType) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-black/5 p-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg">SAMI Admin</span>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 h-full w-64 bg-white border-r border-black/5 shadow-sm z-50 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 h-full flex flex-col">
                    {/* Header with Close Button for Mobile */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-black">SAMI</h1>
                            <p className="text-sm text-black/50">Admin Dashboard</p>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 flex-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-gray-900 text-white shadow-sm'
                                    : 'text-black/70 hover:bg-black/5'
                                    }`}
                            >
                                <tab.icon size={20} strokeWidth={2} />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="pt-6 border-t border-black/5">
                        <button 
                            onClick={onLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                        >
                            <LogOut size={20} strokeWidth={2} />
                            <span className="font-medium">Déconnexion</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <header className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-sm lg:text-base text-black/60">
                        Gérez votre boutique de parfums en ligne
                    </p>
                </header>

                {/* Content */}
                <div>
                    {activeTab === 'dashboard' && (
                        <div>
                            <AdminStats />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                                    <h3 className="text-xl font-bold text-black mb-4">Activité Récente</h3>
                                    <p className="text-black/60">Les dernières activités apparaîtront ici...</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                                    <h3 className="text-xl font-bold text-black mb-4">Produits Populaires</h3>
                                    <p className="text-black/60">Les produits les plus vendus apparaîtront ici...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'perfumes' && <PerfumeManager />}

                    {activeTab === 'reservations' && <ReservationManager />}
                </div>
            </main>
        </div>
    );
};
