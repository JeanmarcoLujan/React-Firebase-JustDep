// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZrx2JI2g34lLDxG0N-F0ZuDB0lrrEG8w",
  authDomain: "justdep-59ff2.firebaseapp.com",
  projectId: "justdep-59ff2",
  storageBucket: "justdep-59ff2.appspot.com",
  messagingSenderId: "830752149139",
  appId: "1:830752149139:web:c9f3d2eeb718e4f6440766",
  measurementId: "G-4WEW2VKRXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // For Authentication
const db = getFirestore(app);

export { auth, db };
