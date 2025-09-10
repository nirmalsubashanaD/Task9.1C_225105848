// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkVutdOgB8eIoqLWFsZhav74jEz0WDfn4",
  authDomain: "addarticleimg.firebaseapp.com",
  projectId: "addarticleimg",
  storageBucket: "addarticleimg.firebasestorage.app",
  messagingSenderId: "658400417402",
  appId: "1:658400417402:web:260e947deac73a3d2a4dc3"
};

// ✅ Check if Firebase has already been initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export Firestore and Storage instances
export const db = getFirestore(app);
export const storage = getStorage(app);
