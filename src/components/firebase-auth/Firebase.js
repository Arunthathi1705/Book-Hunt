// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYX9oD-RdqwQKgWsacTEq0J-ifwqZg3cY",
  authDomain: "book-hunt-e638a.firebaseapp.com",
  projectId: "book-hunt-e638a",
  storageBucket: "book-hunt-e638a.firebasestorage.app",
  messagingSenderId: "346988783142",
  appId: "1:346988783142:web:0f8c02bdddb411ae8ba8e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
