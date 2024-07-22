import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvRGqXRTvBNF6XykEkPIDTx9UBNwzPzFo",
  authDomain: "chat-710d4.firebaseapp.com",
  projectId: "chat-710d4",
  storageBucket: "chat-710d4.appspot.com",
  messagingSenderId: "801652716721",
  appId: "1:801652716721:web:c6a9c69ae073fd9434de90",
  measurementId: "G-7NTP08L3GX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
