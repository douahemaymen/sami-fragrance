import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJr28fiVQGW3DkokZmQtDuW_aXYIarHDQ",
    authDomain: "sami-fragrance.firebaseapp.com",
    projectId: "sami-fragrance",
    databaseURL: "https://sami-fragrance-default-rtdb.firebaseio.com",
    storageBucket: "sami-fragrance.firebasestorage.app",
    messagingSenderId: "58764618672",
    appId: "1:58764618672:web:07cef75ea616b137880475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const AdminApp: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-400 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <>
            {currentUser ? (
                <AdminDashboard 
                    auth={auth} 
                    database={database} 
                    currentUser={currentUser}
                    onLogout={handleLogout}
                />
            ) : (
                <AdminLogin auth={auth} />
            )}
        </>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<AdminApp />);
}
