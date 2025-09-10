import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkA5_rbEEmFu7glDCilWdmaAm-ZMGYCnc",
  authDomain: "task7-59646.firebaseapp.com",
  projectId: "task7-59646",
  storageBucket: "task7-59646.firebasestorage.app",
  messagingSenderId: "353244740116",
  appId: "1:353244740116:web:24d4d2894feed152b2c501",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
