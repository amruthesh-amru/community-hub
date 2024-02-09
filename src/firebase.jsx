// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxxGsHhj9m8yvPnNN3DhPB95D9M-l0cVk",
  authDomain: "community-hub-auth.firebaseapp.com",
  projectId: "community-hub-auth",
  storageBucket: "community-hub-auth.appspot.com",
  messagingSenderId: "946408537620",
  appId: "1:946408537620:web:4bdce574ab4dbc55a0f101",
  measurementId: "G-BBJKXM0EK7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const imgDB = getStorage(app);
export { auth };
export { imgDB };
export const db = getFirestore(app);
