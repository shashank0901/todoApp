import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// my web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkvSya5mUdTRkBkWRKMw7mda7dd93WNIk",
  authDomain: "todo-app-1d208.firebaseapp.com",
  projectId: "todo-app-1d208",
  storageBucket: "todo-app-1d208.appspot.com",
  messagingSenderId: "1003473048199",
  appId: "1:1003473048199:web:e529819cc0ea36d3e9de22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// imported getAuth and getFirestore from firebase. and created these 2 objects which we will export
export const auth = getAuth(app);
export const db = getFirestore(app);
