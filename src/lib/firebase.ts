import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvicrrGeXWndRdDTU0XbLOMrxWO603j1c",
  authDomain: "bireyselkurs-90d16.firebaseapp.com",
  projectId: "bireyselkurs-90d16",
  storageBucket: "bireyselkurs-90d16.firebasestorage.app",
  messagingSenderId: "424205334692",
  appId: "1:424205334692:web:b61895cf3006bc58f2ce31",
  measurementId: "G-9X07JEPJLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
