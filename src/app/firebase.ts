import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrFs39ACdeGHM5T26xjfe1SP_AUQbntDo",
  authDomain: "flux-398f9.firebaseapp.com",
  projectId: "flux-398f9",
  storageBucket: "flux-398f9.appspot.com",
  messagingSenderId: "19624600538",
  appId: "1:19624600538:web:614bb850c3d74e60bcd6e3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("🔥 Firebase инициализирован:", app);
console.log("🔥 Firestore подключен:", db);

export { db, collection, addDoc, getDocs, updateDoc, doc, getDoc, deleteDoc, onSnapshot, auth };
