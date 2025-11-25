import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
