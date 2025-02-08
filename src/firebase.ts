// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiz_oinBSIbKVhgOEsWMO3iY5JD77F0Io",
  authDomain: "flux-base-b01ba.firebaseapp.com",
  projectId: "flux-base-b01ba",
  storageBucket: "flux-base-b01ba.firebasestorage.app",
  messagingSenderId: "670198035072",
  appId: "1:670198035072:web:0882e0ba53ebd89f8eec65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)