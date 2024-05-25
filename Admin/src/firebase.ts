// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjXg5apFKNWbCn-QkDtjt3R6Jvduhy1zk",
  authDomain: "tutorai-b5ed7.firebaseapp.com",
  projectId: "tutorai-b5ed7",
  storageBucket: "tutorai-b5ed7.appspot.com",
  messagingSenderId: "373769861697",
  appId: "1:373769861697:web:7922a09e529a5ed515a4c0",
  measurementId: "G-T8N5GWXYFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
auth.useDeviceLanguage();

const ggProvider = new GoogleAuthProvider();

export { auth, db, ggProvider };