import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "chapter-stitch",
  appId: "1:317598383635:web:782aa59817cc6ff49bc9e6",
  storageBucket: "chapter-stitch.firebasestorage.app",
  apiKey: "AIzaSyABGoElRotKwgXM7moxglW_vkXcB5lI2Rs",
  authDomain: "chapter-stitch.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "317598383635"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
