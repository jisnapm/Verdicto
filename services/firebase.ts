
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAssCy_GJ-t5j_v9ndfGLcvErB78fwmGs0",
  authDomain: "verdicto-1d928.firebaseapp.com",
  projectId: "verdicto-1d928",
  storageBucket: "verdicto-1d928.firebasestorage.app",
  messagingSenderId: "753879009900",
  appId: "1:753879009900:web:737422bcd2a0fed4a52649",
  measurementId: "G-2GCQNJ0FMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
