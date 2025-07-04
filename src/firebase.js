import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6pr6a6y63LvKpauCkonCqyV66WAeJEeg",
  authDomain: "petut-55f40.firebaseapp.com",
  projectId: "petut-55f40",
  storageBucket: "petut-55f40.firebasestorage.app",
  messagingSenderId: "724593819082",
  appId: "1:724593819082:web:7d5ab9881bc9de39c8a333",
  measurementId: "G-JDSBQXNWX0",
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
