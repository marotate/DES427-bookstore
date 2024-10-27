// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYI66-SNSCmn-pdRBkfNjJoONUozT6uYY",
  authDomain: "bookstore-2abd0.firebaseapp.com",
  projectId: "bookstore-2abd0",
  storageBucket: "bookstore-2abd0.appspot.com",
  messagingSenderId: "364913230065",
  appId: "1:364913230065:web:21d2458954ad9a087ea950",
  //databaseURL: "https://bookstore-2abd0-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_auth = getAuth(FIREBASE_APP);
//export const FIREBASE_db = getDatabase(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);