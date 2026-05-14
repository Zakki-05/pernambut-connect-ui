import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE-ilhPZMwGSQKrRLUJ0NPhr4d2vgjVvA",
  authDomain: "pernambut-connection.firebaseapp.com",
  projectId: "pernambut-connection",
  storageBucket: "pernambut-connection.firebasestorage.app",
  messagingSenderId: "234362565213",
  appId: "1:234362565213:web:fb045d2b5cde0b0fcb93b4",
  measurementId: "G-BG81E9S0Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);
export const handleRedirectResult = () => getRedirectResult(auth);