// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQci3uHcWH4GTFhjBD7mG4EP0mcR5IrZc",
  authDomain: "women2women-c21d3.firebaseapp.com",
  databaseURL: "https://women2women-c21d3-default-rtdb.firebaseio.com",
  projectId: "women2women-c21d3",
  storageBucket: "women2women-c21d3.appspot.com",
  messagingSenderId: "665449297113",
  appId: "1:665449297113:web:122d85d497215ea6cf3ac8",
  measurementId: "G-QKPF1ZSLNM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
